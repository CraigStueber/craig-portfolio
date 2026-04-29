import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from app.state.portfolio_state import PortfolioState
from app.prompts.role_fit import SYNTHESIZER_PROMPT
from app.config.settings import settings


async def synthesizer_node(state: PortfolioState) -> dict:
    """
    Writes the final role fit assessment from the match and gap analysis.
    Output goes to the guardrail node before it exits the graph.
    """
    jd_parsed = state.get("jd_parsed", {})
    fit_assessment = state.get("fit_assessment", {})

    if not jd_parsed or not fit_assessment:
        return {
            "draft_response": (
                "I was unable to generate a role fit assessment. "
                "Please ensure the job description contains enough detail and try again."
            )
        }

    llm = ChatOpenAI(
        model=settings.role_fit_model,
        api_key=settings.openai_api_key,
        temperature=0.3,
    )

    result = await llm.ainvoke([
        SystemMessage(content=SYNTHESIZER_PROMPT),
        HumanMessage(content=(
            f"JOB:\n{json.dumps(jd_parsed, indent=2)}\n\n"
            f"ASSESSMENT:\n{json.dumps(fit_assessment, indent=2)}"
        )),
    ])

    return {"draft_response": result.content}