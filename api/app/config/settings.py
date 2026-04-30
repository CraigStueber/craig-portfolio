from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",  # ignore LangSmith and any other env vars not defined here
    )

    # --- LLM ---
    openai_api_key: str

    fred_model: str = "gpt-4.1-mini"
    role_fit_model: str = "gpt-4.1-mini"
    validation_model: str = "gpt-4.1-mini"

    # --- API ---
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    allowed_origins: list[str] = [
        "https://craigstueber.com",
        "http://localhost:3000",
        "http://localhost:5173",
    ]

    # --- Feature flags ---
    enable_fact_check: bool = True
    enable_drift_guard: bool = True
    enable_guardrail: bool = True


settings = Settings()