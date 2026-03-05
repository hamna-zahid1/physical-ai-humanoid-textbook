import uuid
import os
import asyncio
import logging
from pathlib import Path
from typing import List
import hashlib
from rag.embedder import Embedder
from rag.retriever import Retriever
import markdown

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def read_markdown_files(docs_dir: str = "../../book/docs") -> List[dict]:
    """
    Read all markdown files from the specified directory and extract content
    """
    docs_dir = Path(docs_dir).resolve()

    if not docs_dir.exists():
        raise FileNotFoundError(f"Directory {docs_dir} does not exist")

    markdown_files = docs_dir.glob("**/*.md")
    documents = []

    for md_file in markdown_files:
        relative_path = md_file.relative_to(docs_dir)

        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Convert markdown to plain text for embedding
        html_content = markdown.markdown(content)
        # Simple HTML tag removal for basic plaintext extraction
        plain_text = html_content.replace('<p>', ' ').replace('</p>', ' ')
        plain_text = plain_text.replace('<h1>', ' ').replace('</h1>', ' ')
        plain_text = plain_text.replace('<h2>', ' ').replace('</h2>', ' ')
        plain_text = plain_text.replace('<h3>', ' ').replace('</h3>', ' ')
        plain_text = plain_text.replace('<li>', ' ').replace('</li>', ' ')
        plain_text = plain_text.replace('<ul>', ' ').replace('</ul>', ' ')
        plain_text = plain_text.replace('<strong>', ' ').replace('</strong>', ' ')
        plain_text = plain_text.replace('<em>', ' ').replace('</em>', ' ')
        # Remove multiple spaces
        import re
        plain_text = re.sub(r'\s+', ' ', plain_text).strip()

        documents.append({
            "id": hashlib.md5(f"{relative_path}_{content[:100]}".encode()).hexdigest(),
            "text": plain_text,
            "source": str(relative_path),
            "content": content  # Store original content too
        })

    return documents

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 100) -> List[str]:
    """
    Split text into overlapping chunks
    """
    if not text.strip():
        return []

    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size

        # If this is the last chunk and it's smaller than chunk_size, include it
        if end >= len(text):
            chunk_text = text[start:].strip()
            if chunk_text:
                chunks.append(chunk_text)
            break

        # Find a good breaking point (try to break at sentence or word boundary)
        chunk = text[start:end]
        last_period = chunk.rfind('.')
        last_newline = chunk.rfind('\n')
        last_space = chunk.rfind(' ')

        # Prioritize breaking at sentence end, then newline, then space
        if last_period > overlap:
            actual_end = start + last_period + 1
        elif last_newline > overlap:
            actual_end = start + last_newline
        elif last_space > overlap:
            actual_end = start + last_space
        else:
            actual_end = end  # Fallback to exact chunk size

        chunk_text = text[start:actual_end].strip()
        if chunk_text:  # Only add non-empty chunks
            chunks.append(chunk_text)

        start = actual_end - overlap  # Move start with overlap

    return [chunk for chunk in chunks if chunk.strip()]  # Filter out empty chunks

async def ingest_documents():
    """
    Main ingestion function to read markdown files, chunk them, embed them, and store in Qdrant
    """
    print("Starting document ingestion...")

    # Read all markdown files
    print("Reading markdown files...")
    documents = await read_markdown_files()
    print(f"Found {len(documents)} documents")

    if not documents:
        print("No documents found to ingest.")
        return

    # Initialize embedder and retriever
    embedder = Embedder()
    retriever = Retriever()

    # Initialize the collection
    print("Initializing Qdrant collection...")
    await retriever.initialize_collection()

    # Process each document
    total_chunks = 0
    for i, doc in enumerate(documents):
        print(f"Processing document {i+1}/{len(documents)}: {doc['source']}")

        # Chunk the document content
        chunks = chunk_text(doc['content'])

        # Embed each chunk
        for j, chunk in enumerate(chunks):
            print(f"  Embedding chunk {j+1}/{len(chunks)}")
            embedding = await embedder.embed_text(chunk)

            # Prepare point for Qdrant
            point = {
                "id": str(uuid.uuid4()),
                "vector": embedding,
                "payload": {
                    "text": chunk,
                    "source": doc['source'],
                    "chunk_index": j
                }
            }

            # Upsert to Qdrant (we'll collect points and upsert in batches for efficiency)
            # For now, we'll upsert one by one
            try:
                retriever.client.upsert(
                    collection_name=retriever.collection_name,
                    points=[{
                        "id": point["id"],
                        "vector": point["vector"],
                        "payload": point["payload"]
                    }]
                )
                total_chunks += 1
            except Exception as e:
                print(f"Error upserting chunk {point['id']}: {str(e)}")

    print(f"Ingestion completed! Added {total_chunks} chunks to the database.")

if __name__ == "__main__":
    asyncio.run(ingest_documents())