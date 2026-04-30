from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from app.state.portfolio_state import PortfolioState
from app.prompts.guardrail import GUARDRAIL_PROMPT
from app.config.settings import settings

SAFE_FALLBACK = (
    "I don't have reliable information on that. "
    "For direct questions Craig can be reached at "
    "craigstueber@gmail.com or linkedin.com/in/craigstueber."
)


async def guardrail_node(state: PortfolioState) -> dict:
    """
    Single exit guardrail on the Fred graph.
    Catches first-person drift, fabricated credentials, and off-topic content.
    Runs on every response but is fast -- temperature=0, classification task.
    Skipped entirely if enable_guardrail is False in settings.
    """
    draft = state.get("draft_response", "")

    if not draft.strip():
        return {"final_response": SAFE_FALLBACK}

    if not settings.enable_guardrail:
        return {"final_response": draft}

    llm = ChatOpenAI(
        model=settings.validation_model,
        api_key=settings.openai_api_key,
        temperature=0,
    )

    result = await llm.ainvoke([
        SystemMessage(content=GUARDRAIL_PROMPT),
        HumanMessage(content=f"RESPONSE TO CHECK:\n{draft}"),
    ])

    return {"final_response": result.content}