from typing import Annotated, TypedDict
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages


class PortfolioState(TypedDict):
    # Conversation history
    messages: Annotated[list[BaseMessage], add_messages]

    # Routing + context
    intent: str
    section_id: str | None

    # Retrieval
    retrieved_context: str

    # Generation
    draft_response: str

    # Final
    final_response: str

    # Role fit specific
    jd_text: str | None
    jd_parsed: dict | None
    fit_assessment: dict | None