import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

class Embedder:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
        self.model = "models/gemini-embedding-001"

    async def embed_text(self, text: str) -> list[float]:
        try:
            result = self.client.models.embed_content(
                model=self.model,
                contents=text,
            )
            return result.embeddings[0].values
        except Exception as e:
            raise Exception(f"Error embedding text: {str(e)}")