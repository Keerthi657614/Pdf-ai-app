# 🧠 DEVELOPER GUIDE – SmartDocs AI

## Project Structure
```
backend/
frontend/
utils/
tests/
data/
```

---

## Backend Modules

### pdf_processor.py
Extracts text using PyMuPDF and pdfplumber.
Handles metadata extraction and corrupted files.

### text_cleaner.py
Removes whitespace, headers, special characters.
Normalizes text.

### text_chunker.py
Creates overlapping chunks.
Supports token-based and sentence-based chunking.

### embeddings.py
Generates OpenAI embeddings.
Implements retry logic and rate limiting.

### vector_db.py
Manages ChromaDB persistent storage.
Supports CRUD operations.

### ingestion_pipeline.py
Orchestrates complete document ingestion workflow.

### search_engine.py
Performs similarity search.
Implements cosine scoring and filtering.

### qa_engine.py
Constructs prompt.
Injects context.
Generates context-aware answers.
Extracts citations.

### session_manager.py
Handles session persistence and history storage.

---

## RAG Workflow

1. Extract text from PDFs.
2. Clean and normalize.
3. Chunk text with overlap.
4. Generate embeddings.
5. Store vectors in ChromaDB.
6. Embed user query.
7. Retrieve top-k relevant chunks.
8. Inject context into GPT prompt.
9. Generate grounded response.

---

## Testing

All modules include unit tests.
Integration test validates complete ingestion-to-answer pipeline.

---

## Extending the System

To add new embedding model:
- Modify embeddings.py

To change chunk size:
- Update text_chunker.py

To modify prompt behavior:
- Edit qa_engine.py


Run:

