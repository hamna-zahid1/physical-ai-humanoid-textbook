from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import asyncio
import os
import json
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from rag.embedder import Embedder
from rag.retriever import Retriever
from rag.generator import Generator
from starlette.requests import Request

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="Physical AI Humanoid Textbook RAG Chatbot", version="1.0.0")

# Add rate limit handler
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str
    context: Optional[str] = ""

class ChatResponse(BaseModel):
    response: str

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.post("/chat")
@limiter.limit("10/minute")
async def chat(request: Request, body: ChatRequest):
    async def event_generator():
        try:
            embedder = Embedder()
            retriever = Retriever()
            generator = Generator()

            if not body.context:          # ✅ body, not request
                question_embedding = await embedder.embed_text(body.question)  # ✅
                relevant_chunks = await retriever.search(question_embedding)
                context = "\n".join([
                    chunk.payload.get('text', '') 
                    for chunk in relevant_chunks 
                    if hasattr(chunk, 'payload')
                ])
            else:
                context = body.context    # ✅

            response = await generator.generate_response(body.question, context)  # ✅
            yield f"data: {json.dumps({'response': response})}\n\n"

        except Exception as e:
            yield f"data: {json.dumps({'error': f'Error processing chat request: {str(e)}'})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)