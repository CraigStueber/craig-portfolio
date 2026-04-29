import json
from pathlib import Path


FACTS_DIR = Path(__file__).parent

SECTION_FOCUS_INSTRUCTIONS: dict[str | None, str] = {
    "experience": (
        "You are currently helping a visitor explore Craig's work experience and engineering career. "
        "Focus your responses on his roles, what he built, owned, and delivered. "
        "If asked about other areas, answer accurately but naturally point toward the relevant section."
    ),
    "education": (
        "You are currently helping a visitor explore Craig's educational background. "
        "Focus on his degrees, doctoral research trajectory, and academic context. "
        "If asked about other areas, answer accurately but naturally point toward the relevant section."
    ),
    "projects": (
        "You are currently helping a visitor explore Craig's notable projects, "
        "particularly CodeRisk Advisor and the portfolio site architecture. "
        "Focus on technical decisions, architecture, and outcomes. "
        "If asked about other areas, answer accurately but naturally point toward the relevant section."
    ),
    "skills": (
        "You are currently helping a visitor explore Craig's technical skills. "
        "Map skills to concrete evidence -- don't just list them. "
        "If asked about other areas, answer accurately but naturally point toward the relevant section."
    ),
    "research": (
        "You are currently helping a visitor explore Craig's doctoral research. "
        "Focus on his dissertation, the hybrid vulnerability scoring framework, and his research methodology. "
        "If asked about other areas, answer accurately but naturally point toward the relevant section."
    ),
    "writings": (
        "You are currently helping a visitor explore Craig's writing. "
        "This includes The Comfortable Apocalypse (forthcoming book) and his Medium articles on applied AI. "
        "If asked about other areas, answer accurately but naturally point toward the relevant section."
    ),
    None: (
        "You are helping a visitor explore Craig Stueber's full professional profile. "
        "You have access to all facts about Craig and can discuss any area of his background."
    ),
}


def load_facts() -> dict:
    files = {
        "personal":   "facts.personal.json",
        "experience": "facts.experience.json",
        "education":  "facts.education.json",
        "projects":   "facts.projects.json",
        "skills":     "facts.skills.json",
        "research":   "facts.research.json",
        "writings":   "facts.writings.json",
    }

    facts = {}
    for key, filename in files.items():
        path = FACTS_DIR / filename
        if path.exists():
            with open(path) as f:
                facts[key] = json.load(f)
        else:
            facts[key] = {}

    return facts


def build_facts_context(facts: dict) -> str:
    """
    Builds the full authoritative facts string injected into every agent call.
    section_id shapes focus via prompt instruction, not by limiting this context.
    """
    return f"""AUTHORITATIVE FACTS ABOUT CRAIG STUEBER
These facts are verified ground truth. They override any retrieved context on conflict.
Do not invent, extrapolate, or inflate any credential, date, title, or claim not present here.

EXPERIENCE:
{json.dumps(facts.get("experience", {}), indent=2)}

EDUCATION:
{json.dumps(facts.get("education", {}), indent=2)}

PROJECTS:
{json.dumps(facts.get("projects", {}), indent=2)}

SKILLS:
{json.dumps(facts.get("skills", {}), indent=2)}

RESEARCH:
{json.dumps(facts.get("research", {}), indent=2)}

WRITINGS:
{json.dumps(facts.get("writings", {}), indent=2)}

PERSONAL (surface only if directly asked):
{json.dumps(facts.get("personal", {}), indent=2)}""".strip()


def get_section_focus(section_id: str | None) -> str:
    return SECTION_FOCUS_INSTRUCTIONS.get(
        section_id,
        SECTION_FOCUS_INSTRUCTIONS[None],
    )


# Singletons -- loaded once at startup, imported everywhere
FACTS = load_facts()
FACTS_CONTEXT = build_facts_context(FACTS)