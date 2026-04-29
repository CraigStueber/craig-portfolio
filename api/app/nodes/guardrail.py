from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from app.state.portfolio_state import PortfolioState
from app.prompts.guardrail import GUARDRAIL_PROMPT
from app.config.settings import settings

SAFE_FALLBACK = (
    "I don't have reliable information on that. "
    "For direct questions, Craig can be reached at "
    "craigstueber@gmail.com or linkedin.com/in/craigstueber."
)


async def guardrail_node(state: PortfolioState) -> dict:
    """
    Final exit node on every graph.

    Three paths:
    1. Hard block -- fact_check returned "block". Skip the LLM call entirely,
       return the safe fallback immediately.
    2. Clean pass -- no issues flagged and guardrail is disabled in settings.
       Return the draft unchanged with no additional LLM call.
    3. Review pass -- fact check flagged or drift detected. Run the guardrail
       LLM call to rewrite or replace as needed.
    """
    draft = state.get("draft_response", "")
    fact_check_result = state.get("fact_check_result", "pass")
    fact_check_notes = state.get("fact_check_notes", "")
    drift_flag = state.get("drift_flag", False)
    drift_notes = state.get("drift_notes", "")

    # Path 1 -- hard block, no LLM call needed
    if fact_check_result == "block":
        return {"final_response": SAFE_FALLBACK}

    # Path 2 -- clean pass, no issues, guardrail disabled in dev
    if (
        not settings.enable_guardrail
        and fact_check_result == "pass"
        and not drift_flag
    ):
        return {"final_response": draft}

    # Path 3 -- review pass
    issues = []
    if fact_check_result == "flag":
        issues.append(f"Fact check flagged: {fact_check_notes}")
    if drift_flag:
        issues.append(f"Drift detected: {drift_notes}")

    issue_context = (
        "\n".join(issues)
        if issues
        else "No specific issues flagged -- perform final review pass."
    )

    llm = ChatOpenAI(
        model=settings.validation_model,
        api_key=settings.openai_api_key,
        temperature=0,
    )

    result = await llm.ainvoke([
        SystemMessage(content=GUARDRAIL_PROMPT),
        HumanMessage(content=(
            f"ISSUES NOTED:\n{issue_context}\n\n"
            f"DRAFT RESPONSE:\n{draft}"
        )),
    ])

    return {"final_response": result.content}