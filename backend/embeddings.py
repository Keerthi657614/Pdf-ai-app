import time
import json
import hashlib
from datetime import datetime
import google.generativeai as genai
from dotenv import load_dotenv
import os


class EmbeddingGenerator:
    def __init__(self, model_name="models/text-embedding-004", cache_path="data/embedding_cache.json"):
        load_dotenv()
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise RuntimeError("GEMINI_API_KEY not found")

        genai.configure(api_key=api_key)

        self.model_name = model_name
        self.cache_path = cache_path
        self.cache = self._load_cache()

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

    def _retry_request(self, func, retries=3):
        delay = 1
        for i in range(retries):
            try:
                return func()
            except Exception as e:
                if i == retries - 1:
                    raise RuntimeError(str(e))
                time.sleep(delay)
                delay *= 2

    def generate_embedding(self, text):
        if not text.strip():
            raise ValueError("Empty text")

        key = self._hash_text(text)

        if key in self.cache:
            return self.cache[key]

        def api_call():
            return genai.embed_content(
                model=self.model_name,
                content=text
            )

        response = self._retry_request(api_call)

        embedding = response["embedding"]

        if not embedding:
            raise RuntimeError("Invalid embedding")

        self.cache[key] = embedding
        self._save_cache()

        return embedding

    def generate_batch_embeddings(self, chunks):
        results = []

        for chunk in chunks:
            emb = self.generate_embedding(chunk["text"])
            results.append({"chunk": chunk, "embedding": emb})

        return results

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
