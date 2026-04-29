import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from app.state.portfolio_state import PortfolioState
from app.prompts.drift_guard import DRIFT_GUARD_PROMPT
from app.config.settings import settings


async def drift_guard_node(state: PortfolioState) -> dict:
    """
    Detects persona drift in the draft response across the conversation arc.

    Looks at the last 6 messages (3 turns) -- enough context to catch
    gradual drift without loading the full history into every validation call.

    Skipped entirely if enable_drift_guard is False in settings.
    """
    if not settings.enable_drift_guard:
        return {
            "drift_flag": False,
            "drift_notes": "disabled via feature flag",
        }

    draft = state.get("draft_response", "")
    messages = state.get("messages", [])

    if not draft.strip():
        return {"drift_flag": False, "drift_notes": "empty draft"}

    # Last 6 messages gives us ~3 turns of conversation context
    recent_messages = messages[-6:] if len(messages) > 6 else messages
    conversation_summary = "\n".join([
        f"{m.type.upper()}: {m.content}"
        for m in recent_messages
        if hasattr(m, "content") and isinstance(m.content, str)
    ])

    llm = ChatOpenAI(
        model=settings.validation_model,
        api_key=settings.openai_api_key,
        temperature=0,
    )

    result = await llm.ainvoke([
        SystemMessage(content=DRIFT_GUARD_PROMPT),
        HumanMessage(content=(
            f"RECENT CONVERSATION:\n{conversation_summary}\n\n"
            f"DRAFT RESPONSE:\n{draft}"
        )),
    ])

    try:
        parsed = json.loads(result.content)
        return {
            "drift_flag": parsed.get("drift_detected", False),
            "drift_notes": parsed.get("notes", ""),
        }
    except json.JSONDecodeError:
        return {
            "drift_flag": False,
            "drift_notes": "drift guard response was not valid JSON",
        }