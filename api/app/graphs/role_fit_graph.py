from langgraph.graph import StateGraph, END
from app.state.portfolio_state import PortfolioState
from app.nodes.role_fit.jd_parser import jd_parser_node
from app.nodes.role_fit.profile_matcher import profile_matcher_node
from app.nodes.role_fit.gap_analyst import gap_analyst_node
from app.nodes.role_fit.synthesizer import synthesizer_node
from app.nodes.guardrail import guardrail_node


def build_role_fit_graph():
    graph = StateGraph(PortfolioState)

    graph.add_node("jd_parser", jd_parser_node)
    graph.add_node("profile_matcher", profile_matcher_node)
    graph.add_node("gap_analyst", gap_analyst_node)
    graph.add_node("synthesizer", synthesizer_node)
    graph.add_node("guardrail", guardrail_node)

    graph.set_entry_point("jd_parser")

    graph.add_edge("jd_parser", "profile_matcher")
    graph.add_edge("profile_matcher", "gap_analyst")
    graph.add_edge("gap_analyst", "synthesizer")
    graph.add_edge("synthesizer", "guardrail")
    graph.add_edge("guardrail", END)

    return graph.compile()


role_fit_graph = build_role_fit_graph()