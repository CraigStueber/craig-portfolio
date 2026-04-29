from openai import AsyncOpenAI
from app.config.settings import settings


# Shared async client -- imported by any service that needs direct OpenAI access
# Nodes use ChatOpenAI from langchain_openai for LLM calls
# This client is available for any non-LangChain OpenAI calls if needed
client = AsyncOpenAI(api_key=settings.openai_api_key)