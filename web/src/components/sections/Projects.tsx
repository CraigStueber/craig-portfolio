"use client";

import styles from "./Projects.module.css";

interface FeaturedProject {
  name: string;
  category: string;
  description: string;
  highlights: string[];
  liveUrl: string;
  tags: string[];
}
interface ElevatedProject {
  name: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
}
interface SecondaryProject {
  name: string;
  category: string;
  description: string;
  tags: string[];
}

const FEATURED: FeaturedProject = {
  name: "CodeRisk Advisor",
  category: "AI Safety / LLM Systems",
  description:
    "Multi-agent AI security review system for Python, JavaScript, and TypeScript code. Combines OWASP Top 10 vulnerability scanning with AI-specific behavioral risk detection using a panel of specialized LLM agents that synthesize findings into conversational developer guidance.",
  highlights: [
    "LangGraph pipeline orchestrating five specialized agents: VulnScanner, BehavioralRisk, Skeptic, Remediation, Synthesizer",
    "Skeptic agent actively disputes low-confidence findings to reduce false positives",
    "Token-by-token SSE streaming with real-time agent status updates in the UI",
    "Deployed on Google Cloud Run with LangSmith tracing for full observability",
  ],
  liveUrl: "https://coderisk.craigstueber.com",
  tags: [
    "LangGraph",
    "FastAPI",
    "Python",
    "OpenAI",
    "Anthropic",
    "Next.js",
    "TypeScript",
    "Google Cloud Run",
    "LangSmith",
    "SSE",
  ],
};
const ELEVATED: ElevatedProject = {
  name: "DanceCard",
  category: "Agentic System / Mobile Application",
  description:
    "Co-founded and led all engineering for a cross-platform social mobile application. Built an agentic onboarding system using CrewAI alongside a full React Native application -- owned architecture, data modeling, and delivery independently from concept to App Store.",
  highlights: [
    "Agentic onboarding system using CrewAI with constrained generation patterns to maintain consistent, safe outputs in a consumer-facing context",
    "Full cross-platform React Native application with real-time chat, event scheduling, and location-aware discovery across iOS and Android",
    "Full App Store and Google Play submission including TestFlight and Play Console policy compliance",
  ],
  tags: ["CrewAI", "React Native", "Supabase", "Expo", "TypeScript"],
};
const SECONDARY: SecondaryProject[] = [
  {
    name: "Dekaflow 2.0",
    category: "Enterprise Platform",
    description:
      "High-stakes enterprise platform managing natural gas scheduling workflows supporting billions in annual east coast energy movement. Built on a modern React and cloud stack integrating with a 25-year-old Java and SQL legacy system.",
    tags: [
      "React",
      "Next.js",
      "Java",
      "MongoDB",
      "Azure",
      "LangGraph",
      "TypeScript",
    ],
  },
  {
    name: "Hot Tomato Summer",
    category: "High-Traffic Platform",
    description:
      "Multi-city restaurant voting platform reaching 30,000+ users in two weeks with rule-based fraud detection and voting anomaly dashboards.",
    tags: ["React", "Redux", "Supabase", "Python", "Fingerprinting"],
  },
];

interface ProjectsProps {
  onOpenChat: () => void;
}

export default function Projects({ onOpenChat }: ProjectsProps) {
  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <p className="section-label">projects</p>
        <h2 className="section-heading">Notable Work</h2>

        {/* Featured project */}
        <div className={styles.featured}>
          <div className={styles.featuredBadge}>// featured</div>

          <div className={styles.featuredHeader}>
            <div>
              <h3 className={styles.featuredName}>{FEATURED.name}</h3>
              <span className={styles.featuredCategory}>
                {FEATURED.category}
              </span>
            </div>
            <a
              href={FEATURED.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveUrl}
            >
              live → {FEATURED.liveUrl.replace("https://", "")}
            </a>
          </div>

          <p className={styles.featuredDescription}>{FEATURED.description}</p>

          <ul className={styles.highlights}>
            {FEATURED.highlights.map((h, i) => (
              <li key={i} className={styles.highlight}>
                {h}
              </li>
            ))}
          </ul>

          <div className={styles.tags}>
            {FEATURED.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Elevated */}
        <div className={styles.elevated}>
          <div className={styles.elevatedBadge}>// notable</div>
          <div className={styles.elevatedHeader}>
            <div>
              <h3 className={styles.elevatedName}>{ELEVATED.name}</h3>
              <span className={styles.elevatedCategory}>
                {ELEVATED.category}
              </span>
            </div>
          </div>
          <p className={styles.elevatedDescription}>{ELEVATED.description}</p>
          <ul className={styles.highlights}>
            {ELEVATED.highlights.map((h, i) => (
              <li key={i} className={styles.highlight}>
                {h}
              </li>
            ))}
          </ul>
          <div className={styles.tags}>
            {ELEVATED.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Secondary grid */}
        <div className={styles.grid}>
          {SECONDARY.map((project) => (
            <div key={project.name} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardCategory}>{project.category}</span>
                <h3 className={styles.cardName}>{project.name}</h3>
              </div>
              <p className={styles.cardDescription}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <button className="ask-fred-btn" onClick={onOpenChat}>
            ask fred about projects →
          </button>
        </div>
      </div>
    </section>
  );
}
