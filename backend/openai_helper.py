# import os
# import openai
# from dotenv import load_dotenv

# from utils.error_handler import APIError, logger

# load_dotenv()


# class OpenAIHelper:
#     def __init__(self):
#         api_key = os.getenv("OPENAI_API_KEY")
#         if not api_key:
#             raise APIError("OpenAI API key not configured")

#         openai.api_key = api_key

#     def get_completion(
#         self,
#         messages,
#         model="gpt-3.5-turbo",
#         temperature=0.2,
#         timeout=30
#     ):
#         try:
#             response = openai.ChatCompletion.create(
#                 model=model,
#                 messages=messages,
#                 temperature=temperature,
#                 request_timeout=timeout
#             )

#             return response["choices"][0]["message"]["content"]

#         # -------- OpenAI-specific errors --------
#         except openai.error.RateLimitError as e:
#             logger.error(f"OpenAI rate/quota error: {e}")
#             raise APIError(
#                 "OpenAI quota or rate limit exceeded. Please check your plan."
#             )

#         except openai.error.AuthenticationError:
#             logger.error("Invalid OpenAI API key")
#             raise APIError("Invalid OpenAI API key.")

#         except openai.error.Timeout:
#             logger.error("OpenAI request timed out")
#             raise APIError("OpenAI request timed out.")

#         except openai.error.OpenAIError as e:
#             logger.error(f"OpenAI SDK error: {e}")
#             raise APIError("OpenAI service error.")

#         # -------- Final fallback --------
#         except Exception as e:
#             logger.exception("Unexpected OpenAI error")
#             raise APIError("Unexpected OpenAI service error.")


import os
from google import genai
from google.api_core import exceptions
from dotenv import load_dotenv

from utils.error_handler import APIError, logger

load_dotenv()

class GeminiAIHelper:
    def __init__(self):
        # Use a descriptive environment variable name
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise APIError("Gemini API key not configured")

        # Initialize the new Google GenAI client
        self.client = genai.Client(api_key=api_key)

    def get_completion(
        self,
        prompt,
        model="gemini-3-flash-preview",
        temperature=0.2
    ):
        """
        Sends a prompt to the Gemini model and returns the text response.
        """
        try:
            # The new SDK uses client.models.generate_content
            response = self.client.models.generate_content(
                model=model,
                contents=prompt,
                config={
                    'temperature': temperature,
                }
            )

            if not response.text:
                raise APIError("Empty response received from Gemini.")

            return response.text

        # -------- Gemini-specific errors --------
        except exceptions.ResourceExhausted as e:
            logger.error(f"Gemini rate/quota error: {e}")
            raise APIError("Gemini quota or rate limit exceeded.")

        except exceptions.Unauthenticated as e:
            logger.error(f"Invalid Gemini API key: {e}")
            raise APIError("Invalid Gemini API key.")

        except exceptions.DeadlineExceeded as e:
            logger.error(f"Gemini request timed out: {e}")
            raise APIError("Gemini request timed out.")

        except exceptions.GoogleAPICallError as e:
            logger.error(f"Google API service error: {e}")
            raise APIError(f"Gemini service error: {e.message}")

        # -------- Final fallback --------
        except Exception as e:
            logger.exception("Unexpected Gemini error")
            raise APIError("An unexpected error occurred while calling the AI service.")
