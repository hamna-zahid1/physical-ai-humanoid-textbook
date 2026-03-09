import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

class Generator:
    def __init__(self, model_name: str = "meta-llama/Llama-3.1-8B-Instruct:cerebras"):
        api_key = os.getenv("HF_TOKEN")
        if not api_key:
            raise ValueError("HF_TOKEN environment variable is required")

        self.client = AsyncOpenAI(
            base_url="https://router.huggingface.co/v1",
            api_key=api_key,
        )
        self.model_name = model_name

    def _build_messages(self, question: str, context: str) -> list:
        system_prompt = (
            "You are a helpful assistant for a Physical AI and Humanoid Robotics textbook. "
            "Answer questions using only the provided context. "
            "If the user sends a greeting or casual message, respond warmly and briefly. "
            "If the context is insufficient to answer a specific question, say so clearly and concisely. "
            "Do not speculate or repeat unrelated information from the context."
        )

        # Detect greetings / non-questions
        is_conversational = not context.strip() or len(question.strip().split()) <= 5 and "?" not in question

        if is_conversational:
            user_content = question
        else:
            user_content = f"Context:\n{context}\n\nQuestion: {question}"

        return [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content},
        ]

    async def generate_response(self, question: str, context: str) -> str:
        if not question.strip():
            return "Please provide a question."

        try:
            response = await self.client.chat.completions.create(
                model=self.model_name,
                messages=self._build_messages(question, context),
                max_tokens=512,
                temperature=0.4,
            )

            text = response.choices[0].message.content
            return text.strip() if text else "Unable to generate a response. Please try again."

        except Exception as e:
            raise Exception(f"Error generating response: {str(e)}")

    async def generate_streaming_response(self, question: str, context: str):
        try:
            stream = await self.client.chat.completions.create(
                model=self.model_name,
                messages=self._build_messages(question, context),
                max_tokens=512,
                temperature=0.4,
                stream=True,
            )

            async for chunk in stream:
                text = chunk.choices[0].delta.content
                if text:
                    yield text

        except Exception as e:
            raise Exception(f"Error generating streaming response: {str(e)}")