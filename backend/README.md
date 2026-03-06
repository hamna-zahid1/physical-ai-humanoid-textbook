---
title: Physical AI Backend
emoji: 🤖
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
---

# Physical AI Humanoid Textbook RAG Chatbot Backend

This is a FastAPI-based RAG (Retrieval-Augmented Generation) chatbot backend for the Physical AI Humanoid Textbook project. It uses Google's Gemini models for embeddings and generation, with Qdrant as the vector database.

## Features

- FastAPI web server with CORS support
- RAG pipeline for question answering
- Rate limiting (10 requests per minute)
- Streaming responses
- Health check endpoint
- Document ingestion from markdown files

## Architecture

- `main.py`: FastAPI application with endpoints
- `rag/embedder.py`: Handles text embedding using Google Gemini
- `rag/retriever.py`: Searches Qdrant vector database
- `rag/generator.py`: Generates answers using Gemini
- `ingest.py`: Script to ingest markdown documents into Qdrant

## Setup

### Option 1: Local Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Copy `.env.example` to `.env` and fill in the required values:
```bash
cp .env.example .env
# Then edit .env with your actual API keys
```

3. Set up environment variables:
- `GOOGLE_API_KEY`: Your Google API key for accessing Gemini models
- `QDRANT_URL`: URL to your Qdrant instance
- `QDRANT_API_KEY`: API key for Qdrant (if required)

### Option 2: Docker Setup

1. Make sure you have Docker and Docker Compose installed
2. Copy `.env.example` to `.env` and fill in the required values
3. Run the services:
```bash
docker-compose up -d
```

This will start both the Qdrant vector database and the RAG chatbot service.

## Usage

### Running the Server Locally

```bash
cd backend
python run_server.py
```

Or with auto-reload for development:
```bash
python run_server.py --reload
```

The server will be available at http://localhost:8000

### Endpoints

- `GET /health`: Health check endpoint
- `POST /chat`: Chat endpoint accepting JSON with `{"question": "your question", "context": "optional context"}`

### Ingesting Documents

To ingest markdown documents from the book/docs directory:

```bash
python ingest.py
```

This will read all markdown files, chunk them, embed them using Google's text-embedding-004 model, and store them in Qdrant.

## API Example

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the key concepts in physical AI?", "context": ""}'
```

## Development

To run in development mode with auto-reload:
```bash
python run_server.py --reload
```

To run tests (when added):
```bash
pytest
```