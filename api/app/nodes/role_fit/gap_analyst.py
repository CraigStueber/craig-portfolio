import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from app.state.portfolio_state import PortfolioState
from app.prompts.role_fit import GAP_ANALYST_PROMPT
from app.config.settings import settings


async def gap_analyst_node(state: PortfolioState) -> dict:
    """
    Adversarial pass on the profile matcher output.
    Challenges overly generous matches and reclassifies where warranted.
    Updates fit_assessment with any reclassifications before synthesis.
    """
    jd_parsed = state.get("jd_parsed", {})
    fit_assessment = state.get("fit_assessment", {})

    if not jd_parsed or not fit_assessment:
        return {}

    llm = ChatOpenAI(
        model=settings.role_fit_model,
        api_key=settings.openai_api_key,
        temperature=0,
    )

    result = await llm.ainvoke([
        SystemMessage(content=GAP_ANALYST_PROMPT),
        HumanMessage(content=(
            f"JOB DESCRIPTION:\n{json.dumps(jd_parsed, indent=2)}\n\n"
            f"MATCH ASSESSMENT:\n{json.dumps(fit_assessment, indent=2)}"
        )),
    ])

    try:
        challenges = json.loads(result.content)
    except json.JSONDecodeError:
        # If gap analyst fails to parse, pass fit_assessment through unchanged
        return {}

    # Apply reclassifications to fit_assessment
    updated = dict(fit_assessment)
    for challenge in challenges.get("challenges", []):
        requirement = challenge.get("requirement")
        reclassification = challenge.get("suggested_reclassification")
        source_field = challenge.get("field")

        if not requirement or not reclassification or not source_field:
            continue

        # Find and move the item from its current field to the reclassified one
        source_list = updated.get(source_field, [])
        item = next(
            (i for i in source_list if i.get("requirement") == requirement),
            None,
        )

        if item:
            source_list.remove(item)
            if reclassification == "partial_match":
                updated.setdefault("partial_matches", []).append(item)
            elif reclassification == "gap":
                updated.setdefault("gaps", []).append({
                    "requirement": item.get("requirement"),
                    "notes": challenge.get("reason", "Reclassified by gap analyst"),
                })

    return {"fit_assessment": updated}