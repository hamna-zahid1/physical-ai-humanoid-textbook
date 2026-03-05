#!/usr/bin/env python3
"""
Script to run the FastAPI RAG chatbot server
"""

import uvicorn
import argparse
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    parser = argparse.ArgumentParser(description="Run the Physical AI Humanoid Textbook RAG Chatbot server")
    parser.add_argument("--host", default="0.0.0.0", help="Host to bind to (default: 0.0.0.0)")
    parser.add_argument("--port", type=int, default=8000, help="Port to bind to (default: 8000)")
    parser.add_argument("--reload", action="store_true", help="Enable auto-reload on code changes")

    args = parser.parse_args()

    print(f"Starting Physical AI Humanoid Textbook RAG Chatbot server on {args.host}:{args.port}")
    print("Loading environment variables...")

    # Check required environment variables
    required_vars = ["GOOGLE_API_KEY", "QDRANT_URL"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]

    if missing_vars:
        print(f"Warning: Missing required environment variables: {', '.join(missing_vars)}")
        print("Please set them in your .env file or environment")

    uvicorn.run(
        "main:app",
        host=args.host,
        port=args.port,
        reload=args.reload,
        log_level="info"
    )

if __name__ == "__main__":
    main()