@echo off
echo Setting up Physical AI Humanoid Textbook RAG Chatbot Backend...

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Upgrading pip...
python -m pip install --upgrade pip

echo Installing dependencies...
pip install -r requirements.txt

echo Setup complete!
echo To run the server: python run_server.py
echo To ingest documents: python ingest.py
pause