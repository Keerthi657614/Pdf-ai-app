import os
import json
import hashlib
from sentence_transformers import SentenceTransformer


class EmbeddingGenerator:
    def __init__(self, cache_path="data/embedding_cache.json"):
        # ✅ Local embedding model (fast + reliable)
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

        self.cache_path = cache_path
        self.cache = self._load_cache()

    # ---------------- CACHE ----------------
    def _load_cache(self):
        try:
            with open(self.cache_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except:
            return {}

    def _save_cache(self):
        os.makedirs(os.path.dirname(self.cache_path), exist_ok=True)
        with open(self.cache_path, "w", encoding="utf-8") as f:
            json.dump(self.cache, f)

    def _hash_text(self, text):
        return hashlib.sha256(text.encode()).hexdigest()

    # ---------------- EMBEDDING ----------------
    def generate_embedding(self, text):
        if not text or not text.strip():
            raise ValueError("Empty text")

        key = self._hash_text(text)

        # ✅ Use cache
        if key in self.cache:
            return self.cache[key]

        # ✅ Generate embedding locally
        embedding = self.model.encode(text).tolist()

        if not embedding:
            raise RuntimeError("Embedding generation failed")

        # ✅ Save to cache
        self.cache[key] = embedding
        self._save_cache()

        return embedding

    # ---------------- BATCH ----------------
    def generate_batch_embeddings(self, chunks):
        results = []

        for chunk in chunks:
            emb = self.generate_embedding(chunk["text"])
            results.append({
                "chunk": chunk,
                "embedding": emb
            })

        return results

    # ---------------- PREPARE FOR DB ----------------
    def prepare_embedding_data(self, embedded_chunks):
        final = []

        for item in embedded_chunks:
            chunk = item["chunk"]
            emb = item["embedding"]

            final.append({
                "embedding_vector": emb,
                "text": chunk.get("text"),
                "metadata": chunk
            })

        return final
