import os
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()

class Generator:
    def __init__(self, model_name: str = "llama-3.3-70b-versatile"):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY environment variable is required")

        self.client = AsyncGroq(api_key=api_key)
        self.model_name = model_name

    async def generate_response(self, question: str, context: str) -> str:
        """
        Generate answer using Groq LLM based on question and context
        """
        if not question.strip():
            return "Please provide a question."

        try:
            prompt = f"""You are a helpful assistant for a Physical AI and Humanoid Robotics textbook.

Context: {context}

Question: {question}

Please provide a comprehensive and accurate answer based on the given context.
If the context doesn't contain enough information to answer the question,
please say so and explain what additional information would be needed."""

            response = await self.client.chat.completions.create(
                model=self.model_name,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1024,
                temperature=0.7,
            )

            text = response.choices[0].message.content
            if text:
                return text
            else:
                return "Unable to generate a response. Please try again."

        except Exception as e:
            raise Exception(f"Error generating response: {str(e)}")

    async def generate_streaming_response(self, question: str, context: str):
        """
        Generate a streaming response
        """
        try:
            prompt = f"""You are a helpful assistant for a Physical AI and Humanoid Robotics textbook.

Context: {context}

Question: {question}

Please provide a comprehensive and accurate answer based on the given context.
If the context doesn't contain enough information to answer the question,
please say so and explain what additional information would be needed."""

            stream = await self.client.chat.completions.create(
                model=self.model_name,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1024,
                temperature=0.7,
                stream=True,
            )

            async for chunk in stream:
                text = chunk.choices[0].delta.content
                if text:
                    yield text

        except Exception as e:
            raise Exception(f"Error generating streaming response: {str(e)}")