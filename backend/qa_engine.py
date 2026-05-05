import re
import logging
from typing import List, Dict
from backend.openai_helper import GeminiAIHelper
from utils.error_handler import retry_on_failure, APIError

logger = logging.getLogger(__name__)

class QAEngine:
    def __init__(self):
        self.client = GeminiAIHelper()

    def format_context(self, chunks: List[Dict]) -> str:
        return "\n\n".join(
            f"[Source: {c['source_file']}, Page: {c['page_number']}]\n{c['chunk_text']}"
            for c in chunks
        )

    def parse_citations(self, text: str):
        return [
            {"source_file": f, "page_number": int(p)}
            for f, p in re.findall(r"\[Source:\s*(.*?),\s*Page:\s*(\d+)\]", text)
        ]

    @retry_on_failure(retries=3, delay=5)
    def _call_llm(self, messages):
        prompt = "\n".join(
            f"{m['role'].upper()}: {m['content']}"
            for m in messages
        )
        return self.client.get_completion(prompt)

    def generate_answer(self, question, chunks, history=None):
        if not chunks:
            return {"answer": "No data found", "citations": []}

        context = self.format_context(chunks)

        messages = [{
            "role": "system",
            "content": "Answer only using context. Add citations like [Source: file.pdf, Page: X]"
        }]

        if history:
            for h in history[-3:]:
                messages.append({"role": "user", "content": h["question"]})
                messages.append({"role": "assistant", "content": h["answer"]})

        messages.append({
            "role": "user",
            "content": f"Context:\n{context}\n\nQ: {question}"
        })

        try:
            text = self._call_llm(messages)
            return {
                "answer": text,
                "citations": self.parse_citations(text)
            }

        except APIError:
            return {"answer": "AI error", "citations": []}
