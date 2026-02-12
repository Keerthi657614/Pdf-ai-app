# 📘 SmartDocs AI – Intelligent Multi-Document Q&A System (RAG-Based)

## 🚀 Project Overview

SmartDocs AI is a full-stack Retrieval-Augmented Generation (RAG) system that enables users to upload multiple PDF documents and ask context-aware questions.

The system extracts text from PDFs, preprocesses it, creates embeddings, stores them in ChromaDB, retrieves relevant chunks using cosine similarity, and generates grounded responses using OpenAI.

All responses are generated strictly from retrieved document context with structured source attribution.

---

## 🏗️ System Architecture
```
User  
↓  
React Frontend (smartdocs-frontend)  
↓  
Python Backend API  
↓  
PDF Processing Pipeline  
↓  
Embedding Generation (OpenAI)  
↓  
ChromaDB (Persistent Vector Storage)  
↓  
Similarity Search  
↓  
Context-Aware GPT Response  
```
---

## 🎯 Key Features

- Multi-PDF upload
- Text extraction (PyMuPDF + pdfplumber)
- Token-based chunking with overlap
- 1536-dimensional OpenAI embeddings
- Persistent ChromaDB storage
- Cosine similarity search
- Threshold filtering
- Context-aware response generation
- Structured citation extraction
- Source contribution visualization
- Session management
- Export Q&A history
- Unit + Integration testing (pytest)

---

## 🛠️ Tech Stack

### Backend
- Python 3.8+
- OpenAI API
- ChromaDB
- PyMuPDF
- pdfplumber
- tiktoken
- python-dotenv
- pytest
- FastAPI (or your API framework)

### Frontend
- React (Vite / CRA)
- Axios / Fetch API

---

## ⚙️ Local Setup

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```
Create .env:
```
OPENAI_API_KEY=your_key_here

```
Run backend:
```
uvicorn main:app --reload
```

Backend runs at:
```
http://localhost:8000
```
Frontend
```
cd smartdocs-frontend
npm install
npm run dev
```

Set environment variable:
```
VITE_API_BASE_URL=http://localhost:8000
```

Frontend runs at:
```
http://localhost:5173
```


👤 Author

Keerthi Mittapalli
