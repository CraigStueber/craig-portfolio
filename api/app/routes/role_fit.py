from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.graphs.role_fit_graph import role_fit_graph
from app.state.portfolio_state import PortfolioState

router = APIRouter()


class RoleFitRequest(BaseModel):
    jd_text: str


class RoleFitResponse(BaseModel):
    content: str


@router.post("/role-fit", response_model=RoleFitResponse)
async def role_fit(request: RoleFitRequest):
    if not request.jd_text or not request.jd_text.strip():
        raise HTTPException(
            status_code=400,
            detail="jd_text cannot be empty"
        )

    if len(request.jd_text.strip()) < 50:
        raise HTTPException(
            status_code=400,
            detail="Job description is too short to evaluate. Please paste the full description."
        )

    initial_state: PortfolioState = {
        "messages": [],
        "intent": "role_fit",
        "section_id": None,
        "retrieved_context": "",
        "draft_response": "",
        "fact_check_result": "pass",
        "fact_check_notes": "",
        "drift_flag": False,
        "drift_notes": "",
        "jd_text": request.jd_text,
        "jd_parsed": None,
        "fit_assessment": None,
        "final_response": "",
    }

    result = await role_fit_graph.ainvoke(initial_state)

    final = result.get("final_response", "")
    if not final:
        raise HTTPException(
            status_code=500,
            detail="No assessment generated"
        )

    return RoleFitResponse(content=final)