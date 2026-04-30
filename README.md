# craig-portfolio

Portfolio site for [craigstueber.com](https://craigstueber.com) — a live demonstration of applied AI architecture built for Staff Engineer and Applied AI Architect recruiting.

## Architecture

```
web/        Next.js 16 SPA — Cloudflare Pages
api/        FastAPI + LangGraph — Google Cloud Run
workers/    Cloudflare Pages Functions — edge proxy
```

### How it works

The site is a long-scroll portfolio with section-scoped AI agents. Each section (Experience, Projects, Skills, Research, Writings, Education) has a chat modal powered by **Fred** — a LangGraph agent that knows Craig's full professional background.

Fred's graph runs five nodes on every response:

```
retrieval → response → fact_check → drift_guard → guardrail
```

- **retrieval** — context retrieval layer (Cloudflare Vectorize, deferred)
- **response** — generates Fred's draft response using full FACTS_CONTEXT
- **fact_check** — validates draft against authoritative facts, returns pass / flag / block
- **drift_guard** — detects persona erosion across conversation turns
- **guardrail** — shared exit node, strips hallucinations, enforces third-person Fred persona

A separate **Role Fit** graph accepts a job description and runs:

```
jd_parser → profile_matcher → gap_analyst → synthesizer → guardrail
```

### Key design decisions

- `section_id` shapes Fred's tone and focus via prompt instruction — it is never a data access boundary. Full facts are always injected.
- Session history is isolated per section in React local state. History persists within a session but does not cross section boundaries.
- Validation nodes (fact_check, drift_guard, guardrail) can be disabled via feature flags for local development.
- LangSmith tracing is enabled for all graph runs in production.

## Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Frontend      | Next.js 16, TypeScript, CSS Modules |
| Font          | Geist Mono                          |
| Backend       | FastAPI, LangGraph, Python 3.12     |
| LLM           | OpenAI gpt-4.1-mini                 |
| Observability | LangSmith                           |
| Hosting (web) | Cloudflare Pages                    |
| Hosting (api) | Google Cloud Run                    |
| Edge proxy    | Cloudflare Workers                  |

## Local Development

### API

```bash
cd api
source .venv/Scripts/activate   # Windows Git Bash
# source .venv/bin/activate     # Mac / Linux
uvicorn app.main:app --reload
```

Runs on `http://localhost:8000`

### Web

```bash
cd web
npm run dev
```

Runs on `http://localhost:3000`

### Environment variables

**`api/.env`**

```
OPENAI_API_KEY=sk-...
LANGCHAIN_API_KEY=...
LANGSMITH_TRACING=true
LANGSMITH_ENDPOINT=https://api.smith.langchain.com
LANGSMITH_PROJECT=portfolio-agent-api
```

**`web/.env.local`**

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Project Structure

```
craig-portfolio/
├── api/
│   └── app/
│       ├── config/         settings + env
│       ├── facts/          authoritative JSON facts files
│       ├── graphs/         fred_graph, role_fit_graph
│       ├── nodes/          retrieval, response, fact_check, drift_guard, guardrail
│       │   └── role_fit/   jd_parser, profile_matcher, gap_analyst, synthesizer
│       ├── prompts/        all system prompts
│       ├── routes/         chat, role_fit, health
│       ├── services/       openai_client
│       └── state/          PortfolioState TypedDict
│
├── web/
│   └── src/
│       ├── app/            Next.js App Router pages
│       ├── components/
│       │   ├── chat/       ChatModal, ChatThread, ChatMessage, ChatInput
│       │   ├── layout/     Header, Nav, Footer
│       │   ├── role-fit/   RoleFitForm, RoleFitResult
│       │   └── sections/   Hero, Experience, Projects, Skills, Research, Writings, Education
│       ├── hooks/          useChat
│       ├── lib/            api.ts
│       └── types/          SectionId, Message, NavItem
│
└── docs/
    └── architecture.md
```

## Deployment

**API — Google Cloud Run**

```bash
cd api
gcloud run deploy portfolio-agent-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

**Web — Cloudflare Pages**

Connect the GitHub repo to Cloudflare Pages with these build settings:

```
Build command:    npm run build
Build output:     out
Root directory:   web
```

## Author

Craig Stueber — [craigstueber.com](https://craigstueber.com) — [craigstueber@gmail.com](mailto:craigstueber@gmail.com)
