from app.state.portfolio_state import PortfolioState


async def retrieval_node(state: PortfolioState) -> dict:
    """
    Retrieval node -- currently a pass-through.

    Vectorize integration is deferred. Fred operates entirely from
    FACTS_CONTEXT injected via the system prompt which covers all
    authoritative data. This node is kept in the graph so Vectorize
    can be wired in later without touching the graph structure.
    """
    return {"retrieved_context": ""}