# 📘 SmartDocs AI – Intelligent Multi-Document Q&A System

A full-stack Retrieval-Augmented Generation (RAG) application that enables users to upload multiple PDF documents and ask intelligent, context-aware questions with source attribution.

## ✨ Features

- **Multi-PDF Upload** - Handle multiple documents simultaneously
- **Intelligent Q&A** - Ask questions and get answers grounded in document content
- **Smart Text Processing** - PDF extraction and preprocessing with PyMuPDF and pdfplumber
- **Semantic Search** - Token-based chunking with cosine similarity matching
- **Advanced Embeddings** - 1536-dimensional OpenAI embeddings for semantic understanding
- **Persistent Storage** - ChromaDB for reliable vector database storage
- **Source Attribution** - Know exactly which documents your answers come from
- **Session Management** - Track and export Q&A history
- **Comprehensive Testing** - Unit and integration tests with pytest

## 🏗️ Architecture
```
┌─────────────────────────────────────┐
│         React Frontend              │
│       (smartdocs-frontend)          │
└─────────────────────┬───────────────┘
                      │
                      ▼
┌─────────────────────────────────────┐
│           FastAPI Backend           │
│            (Python 3.8+)            │
└─────────────────────┬───────────────┘
                      │
                      ▼
┌─────────────────────────────────────┐
│      PDF Processing Pipeline        │
├─────────────────────────────────────┤
│  • Text Extraction (PyMuPDF)        │
│  • Text Cleaning & Normalization    │
│  • Tokenization (tiktoken)          │
│  • Overlapping Chunking             │
└─────────────────────┬───────────────┘
                      │
                      ▼
┌─────────────────────────────────────┐
│        OpenAI Embeddings API        │
│     (text-embedding-ada-002)        │
│        1536-Dimensional Vectors     │
└─────────────────────┬───────────────┘
                      │
                      ▼
┌─────────────────────────────────────┐
│             ChromaDB                │
│        (Persistent Vector DB)       │
└─────────────────────┬───────────────┘
                      │
                      ▼
┌─────────────────────────────────────┐
│      Similarity Search Engine       │
│        (Cosine Similarity)          │
├─────────────────────────────────────┤
│  • Top-K Retrieval                  │
│  • Threshold Filtering              │
│  • Context Window Expansion         │
└─────────────────────┬───────────────┘
                      │
                      ▼
┌─────────────────────────────────────┐
│   Context-Aware Response Generator  │
│              (GPT-4)                │
│  • Prompt Engineering               │
│  • Citation Extraction              │
│  • Source Attribution               │
└─────────────────────────────────────┘
```
## 🛠️ Tech Stack

### Backend
- **Python 3.8+**
- **FastAPI** - Modern Python web framework
- **OpenAI API** - Embeddings and LLM
- **ChromaDB** - Vector database
- **PyMuPDF** - PDF text extraction
- **pdfplumber** - Advanced PDF parsing
- **tiktoken** - Token counting
- **pytest** - Testing framework
- **python-dotenv** - Environment management

### Frontend
- **React 18+** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **JavaScript (ES6+)**

## 📁 Project Structure
```
Pdf-ai-app/
│
├── backend/                     # Python FastAPI backend
│   ├── main.py
│   ├── pdf_processor.py
│   ├── text_cleaner.py
│   ├── text_chunker.py
│   ├── embeddings.py
│   ├── vector_db.py
│   ├── ingestion_pipeline.py
│   ├── search_engine.py
│   ├── qa_engine.py
│   ├── session_manager.py
│   └── batch_processor.py
│
├── smartdocs-frontend/          # React frontend application
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   ├── package.json
│   └── vite.config.js
│
├── utils/                       # Shared utility modules
│   └── error_handler.py
│
├── data/                        # ChromaDB storage & sample data
│   └── chroma_db/
│
├── uploads/                     # Uploaded PDF storage
│
├── tests/                       # Unit & integration tests
│   ├── test_pdf_processor.py
│   ├── test_text_cleaner.py
│   ├── test_chunker.py
│   ├── test_embeddings.py
│   ├── test_vector_db.py
│   ├── test_search_engine.py
│   └── test_integration.py
│
├── requirements.txt             # Python dependencies
├── .env.example                 # Environment variable template
├── README.md                    # Project overview
├── USER_GUIDE.md                # End-user documentation
├── DEVELOPER_GUIDE.md           # Developer documentation
└── DEPLOYMENT.md                # Deployment instructions
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- OpenAI API key

### Backend Setup


# Navigate to root directory
```bash
cd Pdf-ai-app
```
# Create virtual environment
```bash
python -m venv venv
```
# Activate virtual environment
# On Windows:
```
venv\Scripts\activate
```
# On macOS/Linux:
```
source venv/bin/activate
```
# Install dependencies
```
pip install -r requirements.txt
```
Configure environment variables:
# Create .env file
```
echo OPENAI_API_KEY=your_api_key_here > .env
```
Run the backend:

```bash
uvicorn backend.main:app --reload
Backend API available at: http://localhost:8000
```
Frontend Setup
```bash
# Navigate to frontend directory
cd smartdocs-frontend
```
# Install dependencies
```
npm install
```
# Set environment variable
```
echo VITE_API_BASE_URL=http://localhost:8000 > .env.local
```
# Start development server
```
npm run dev
Frontend available at: http://localhost:5173
```
🧪 Testing
Run the test suite to verify all components:

```bash
# Run all tests
pytest
```
# Run specific test file
```
pytest test_embeddings.py -v
```
# Run with coverage
```
pytest --cov=backend tests/
```
Available tests:

test_embeddings.py - OpenAI embedding functionality
test_extraction.py - PDF text extraction
test_text_chunking.py - Text chunking logic
test_text_cleaning.py - Text preprocessing
test_vector_db.py - ChromaDB operations
test_search_engine.py - Similarity search
test_qa_engine.py - Q&A generation
test_ingestion_pipeline.py - Full pipeline
test_openai_connection.py - API connectivity
```
#📖 Documentation
```
USER_GUIDE.md - How to use the application
DEVELOPER_GUIDE.md - Development setup and architecture details

##🔧 API Endpoints

Main Endpoints
POST /upload - Upload PDF documents
POST /query - Submit a question
GET /history - Retrieve Q&A history
DELETE /clear - Clear session data
See DEVELOPER_GUIDE.md for detailed API documentation.

##🌟 Key Implementation Details

Text Processing Pipeline
Extraction - PyMuPDF extracts raw text from PDFs
Cleaning - Remove special characters, extra whitespace
Chunking - Split text into overlapping chunks (token-based)
Embedding - Convert chunks to 1536-dim vectors
Storage - Store in ChromaDB with metadata
Query Processing
Vectorization - Convert query to embedding
Search - Find top-k similar chunks (cosine similarity)
Threshold Filtering - Filter low-relevance results
Context Building - Compile relevant chunks
Generation - GPT-4 generates response with citations
Source Attribution
All responses include:

Exact source document names
Relevant chunk snippets
Confidence scores
Page references (when available)

##🔐 Security Notes

Store API keys in .env file (never commit!)
Use environment variables for sensitive data
Validate all file uploads
Implement rate limiting in production
Use HTTPS for API communications

##**🤝 Contributing**

Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request


**👤 Author**

Keerthi Mittapalli

**💬 Support**
For issues, questions, or suggestions, please open a GitHub issue or refer to the documentation files.
- ✅ Has proper formatting and organization
