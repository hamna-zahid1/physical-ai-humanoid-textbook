import os
from typing import List
from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct, VectorParams, Distance
from dotenv import load_dotenv

load_dotenv()

class Retriever:
    def __init__(self, collection_name: str = "humanoid_textbook"):
        self.collection_name = collection_name

        # Initialize Qdrant client
        qdrant_url = os.getenv("QDRANT_URL")
        qdrant_api_key = os.getenv("QDRANT_API_KEY")

        if not qdrant_url:
            raise ValueError("QDRANT_URL environment variable is required")

        if qdrant_api_key:
            self.client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)
        else:
            self.client = QdrantClient(url=qdrant_url)

    async def search(self, query_embedding: List[float], top_k: int = 5):
        """
        Search Qdrant vector database for relevant chunks
        """
        if not query_embedding:
            return []

        try:
            search_result = self.client.query_points(
                collection_name=self.collection_name,
                query=query_embedding,
                limit=top_k
            ).points

            return search_result
        except Exception as e:
            raise Exception(f"Error searching Qdrant: {str(e)}")

    async def initialize_collection(self, vector_size: int = 3072):
        """
        Initialize the collection if it doesn't exist
        """
        try:
            collections = self.client.get_collections()
            collection_names = [col.name for col in collections.collections]

            if self.collection_name not in collection_names:
                self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE)
                )
        except Exception as e:
            raise Exception(f"Error initializing collection: {str(e)}")