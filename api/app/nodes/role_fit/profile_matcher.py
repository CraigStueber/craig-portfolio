import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from app.state.portfolio_state import PortfolioState
from app.prompts.role_fit import build_profile_matcher_prompt
from app.config.settings import settings


async def profile_matcher_node(state: PortfolioState) -> dict:
    """
    Maps Craig's profile against the parsed JD requirements.
    Produces strong_matches, partial_matches, and gaps.
    Output is consumed by gap_analyst_node.
    """
    jd_parsed = state.get("jd_parsed", {})
    if not jd_parsed:
        return {"fit_assessment": {}}

    llm = ChatOpenAI(
        model=settings.role_fit_model,
        api_key=settings.openai_api_key,
        temperature=0,
    )

    result = await llm.ainvoke([
        SystemMessage(content=build_profile_matcher_prompt()),
        HumanMessage(content=(
            f"JOB REQUIREMENTS:\n{json.dumps(jd_parsed, indent=2)}"
        )),
    ])

    try:
        return {"fit_assessment": json.loads(result.content)}
    except json.JSONDecodeError:
        return {"fit_assessment": {}}