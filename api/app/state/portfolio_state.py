from typing import Annotated, TypedDict
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages


class PortfolioState(TypedDict):
    # --- Conversation ---
    # add_messages reducer handles append-only updates across graph nodes
    # so each node that adds to messages does not overwrite prior turns
    messages: Annotated[list[BaseMessage], add_messages]

    # --- Routing + context ---
    intent: str
    # "fred" | "role_fit"

    section_id: str | None
    # "experience" | "education" | "projects" | "skills" | "research" | "writings" | None
    # None means the user is at the global/hero level -- full facts, no focus instruction

    # --- Retrieval ---
    retrieved_context: str
    # Raw text returned from Cloudflare Vectorize
    # Empty string if Vectorize is unavailable -- Fred falls back to FACTS_CONTEXT

    # --- Generation ---
    draft_response: str
    # Output from the response node, before validation
    # Never returned to the client directly

    # --- Fact check ---
    fact_check_result: str
    # "pass" | "flag" | "block"
    # block routes to safe fallback in guardrail node without an LLM call

    fact_check_notes: str
    # Populated when result is "flag" or "block"
    # Passed to guardrail node as context for rewrite decisions

    # --- Drift guard ---
    drift_flag: bool
    # True if persona drift was detected in the draft response

    drift_notes: str
    # What drift was detected -- passed to guardrail node

    # --- Role fit specific ---
    jd_text: str | None
    # Raw job description text submitted by the visitor

    jd_parsed: dict | None
    # Structured output from jd_parser node
    # { title, required_skills, preferred_skills, required_experience_years,
    #   key_responsibilities, domain }

    fit_assessment: dict | None
    # Structured output from profile_matcher node
    # { strong_matches, partial_matches, gaps }

    # --- Final ---
    final_response: str
    # Set by guardrail node -- this is what exits the graph and returns to the API