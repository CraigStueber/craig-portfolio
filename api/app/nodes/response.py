from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage
from app.state.portfolio_state import PortfolioState
from app.prompts.fred import build_fred_system_prompt
from app.config.settings import settings


async def response_node(state: PortfolioState) -> dict:
    """
    Generates Fred's draft response.

    Uses full FACTS_CONTEXT via the system prompt plus any additional
    context retrieved from Vectorize. Output goes to fact_check and
    drift_guard before it exits the graph -- never returned directly.
    """
    section_id = state.get("section_id")
    retrieved_context = state.get("retrieved_context", "")
    messages = state.get("messages", [])

    system_prompt = build_fred_system_prompt(section_id)

    if retrieved_context:
        system_prompt += f"\n\nADDITIONAL RETRIEVED CONTEXT:\n{retrieved_context}"

    llm = ChatOpenAI(
        model=settings.fred_model,
        api_key=settings.openai_api_key,
        temperature=0.3,
    )

    full_messages = [SystemMessage(content=system_prompt)] + list(messages)
    response = await llm.ainvoke(full_messages)

    return {"draft_response": response.content}