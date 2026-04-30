from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from langchain_core.messages import HumanMessage, AIMessage

from app.graphs.fred_graph import fred_graph
from app.state.portfolio_state import PortfolioState

router = APIRouter()

VALID_SECTIONS = {
    "experience",
    "education",
    "projects",
    "skills",
    "research",
    "writings",
    None,
}


class MessageInput(BaseModel):
    role: str    # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    section_id: str | None = None
    messages: list[MessageInput]


class ChatResponse(BaseModel):
    role: str = "assistant"
    content: str


def to_langchain_messages(messages: list[MessageInput]) -> list:
    """
    Converts the frontend message format to LangChain message objects.
    Both user and assistant history are passed so Fred has full
    conversation context for drift detection and coherent follow-ups.
    """
    result = []
    for m in messages:
        if m.role == "user":
            result.append(HumanMessage(content=m.content))
        elif m.role == "assistant":
            result.append(AIMessage(content=m.content))
    return result


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if request.section_id not in VALID_SECTIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid section_id: {request.section_id}. "
                   f"Must be one of: {sorted(s for s in VALID_SECTIONS if s)}  or null."
        )

    if not request.messages:
        raise HTTPException(
            status_code=400,
            detail="messages cannot be empty"
        )

    lc_messages = to_langchain_messages(request.messages)

    if not any(isinstance(m, HumanMessage) for m in lc_messages):
        raise HTTPException(
            status_code=400,
            detail="At least one user message is required"
        )

    initial_state: PortfolioState = {
        "messages":         lc_messages,
        "intent":           "fred",
        "section_id":       request.section_id,
        "retrieved_context": "",
        "draft_response":   "",
        "final_response":   "",
        "jd_text":          None,
        "jd_parsed":        None,
        "fit_assessment":   None,
    }

    result = await fred_graph.ainvoke(initial_state)

    final = result.get("final_response", "")
    if not final:
        raise HTTPException(
            status_code=500,
            detail="No response generated"
        )

    return ChatResponse(content=final)