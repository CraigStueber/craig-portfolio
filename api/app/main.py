from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import settings
from app.routes.health import router as health_router
from app.routes.chat import router as chat_router
from app.routes.role_fit import router as role_fit_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    from app.graphs.fred_graph import fred_graph
    from app.graphs.role_fit_graph import role_fit_graph
    from app.facts.loader import FACTS_CONTEXT

    assert fred_graph is not None, "Fred graph failed to compile"
    assert role_fit_graph is not None, "Role fit graph failed to compile"
    assert FACTS_CONTEXT, "FACTS_CONTEXT is empty -- check facts JSON files"

    print("Fred graph compiled successfully")
    print("Role fit graph compiled successfully")
    print(f"Facts context loaded -- {len(FACTS_CONTEXT)} characters")

    yield


app = FastAPI(
    title="Portfolio Agent API",
    description="LangGraph-powered backend for craigstueber.com",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_origin_regex=r"https://.*\.pages\.dev",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(chat_router)
app.include_router(role_fit_router)