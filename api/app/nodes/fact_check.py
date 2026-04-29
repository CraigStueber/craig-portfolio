import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from app.state.portfolio_state import PortfolioState
from app.prompts.fact_check import FACT_CHECK_PROMPT
from app.config.settings import settings


async def fact_check_node(state: PortfolioState) -> dict:
    """
    Validates the draft response against FACTS_CONTEXT.

    Returns pass | flag | block with notes.
    A block result causes the guardrail node to replace the response
    with the safe fallback without an additional LLM call.

    Skipped entirely if enable_fact_check is False in settings.
    """
    if not settings.enable_fact_check:
        return {
            "fact_check_result": "pass",
            "fact_check_notes": "disabled via feature flag",
        }

    draft = state.get("draft_response", "")
    if not draft.strip():
        return {
            "fact_check_result": "pass",
            "fact_check_notes": "empty draft -- nothing to check",
        }

    llm = ChatOpenAI(
        model=settings.validation_model,
        api_key=settings.openai_api_key,
        temperature=0,
    )

    result = await llm.ainvoke([
        SystemMessage(content=FACT_CHECK_PROMPT),
        HumanMessage(content=f"DRAFT RESPONSE TO REVIEW:\n{draft}"),
    ])

    try:
        parsed = json.loads(result.content)
        return {
            "fact_check_result": parsed.get("result", "flag"),
            "fact_check_notes": parsed.get("notes", ""),
        }
    except json.JSONDecodeError:
        # If we cannot parse the fact check result treat it as a flag
        # so the guardrail node reviews the draft before it goes out
        return {
            "fact_check_result": "flag",
            "fact_check_notes": "fact check response was not valid JSON",
        }