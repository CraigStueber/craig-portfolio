from langgraph.graph import StateGraph, END
from app.state.portfolio_state import PortfolioState
from app.nodes.retrieval import retrieval_node
from app.nodes.response import response_node
from app.nodes.fact_check import fact_check_node
from app.nodes.drift_guard import drift_guard_node
from app.nodes.guardrail import guardrail_node


def build_fred_graph():
    graph = StateGraph(PortfolioState)

    graph.add_node("retrieval", retrieval_node)
    graph.add_node("response", response_node)
    graph.add_node("fact_check", fact_check_node)
    graph.add_node("drift_guard", drift_guard_node)
    graph.add_node("guardrail", guardrail_node)

    graph.set_entry_point("retrieval")

    graph.add_edge("retrieval", "response")
    graph.add_edge("response", "fact_check")
    graph.add_edge("fact_check", "drift_guard")
    graph.add_edge("drift_guard", "guardrail")
    graph.add_edge("guardrail", END)

    return graph.compile()


fred_graph = build_fred_graph()