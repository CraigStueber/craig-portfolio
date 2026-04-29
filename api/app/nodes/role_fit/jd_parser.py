import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from app.state.portfolio_state import PortfolioState
from app.prompts.role_fit import JD_PARSER_PROMPT
from app.config.settings import settings


async def jd_parser_node(state: PortfolioState) -> dict:
    """
    Parses the raw job description text into a structured dict.
    Output is consumed by profile_matcher_node.
    """
    jd_text = state.get("jd_text", "")
    if not jd_text or not jd_text.strip():
        return {"jd_parsed": {}}

    llm = ChatOpenAI(
        model=settings.role_fit_model,
        api_key=settings.openai_api_key,
        temperature=0,
    )

    result = await llm.ainvoke([
        SystemMessage(content=JD_PARSER_PROMPT),
        HumanMessage(content=jd_text),
    ])

    try:
        return {"jd_parsed": json.loads(result.content)}
    except json.JSONDecodeError:
        return {"jd_parsed": {}}