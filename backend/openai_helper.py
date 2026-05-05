import os
import google.generativeai as genai
from dotenv import load_dotenv

from utils.error_handler import APIError, logger

load_dotenv()

class GeminiAIHelper:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise APIError("Gemini API key not configured")

        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    def get_completion(self, prompt, temperature=0.2):
        try:
            response = self.model.generate_content(
                prompt,
                generation_config={"temperature": temperature}
            )

            if hasattr(response, "text") and response.text:
                return response.text

            return response.candidates[0].content.parts[0].text

        except Exception as e:
            logger.exception("Gemini error")
            raise APIError("Gemini API failed")
