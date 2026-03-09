from sentence_transformers import SentenceTransformer
import asyncio

class Embedder:
    def __init__(self):
        self.model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

    async def embed_text(self, text: str) -> list[float]:
        try:
            # Run in executor since sentence_transformers is synchronous
            loop = asyncio.get_event_loop()
            embedding = await loop.run_in_executor(
                None,
                lambda: self.model.encode(text).tolist()
            )
            return embedding
        except Exception as e:
            raise Exception(f"Error embedding text: {str(e)}")