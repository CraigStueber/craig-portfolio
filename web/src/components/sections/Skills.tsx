"use client";

import styles from "./Skills.module.css";

interface Language {
  name: string;
  years: number;
}

interface SkillGroup {
  label: string;
  skills: string[];
}

const LANGUAGES: Language[] = [
  { name: "html / css", years: 10 },
  { name: "javascript", years: 10 },
  { name: "react", years: 8 },
  { name: "php", years: 8 },
  { name: "python", years: 6 },
  { name: "typescript", years: 6 },
  { name: "java", years: 6 },
  { name: "node.js", years: 6 },
];

const MAX_YEARS = 10;

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "AI & LLM Systems",
    skills: [
      "LangGraph",
      "LangChain",
      "LangSmith",
      "CrewAI",
      "LlamaIndex",
      "PydanticAI",
      "DSPy",
      "OpenAI API",
      "Anthropic API",
      "Prompt Engineering",
      "RAG",
      "Behavioral Evaluation",
      "Guardrails & Output Control",
      "LLM Observability",
      "Agentic Workflow Design",
      "Weights & Biases",
    ],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      "Next.js",
      "React Native",
      "FastAPI",
      "Material UI",
      "Tailwind CSS",
      "Expo",
      "Redux",
      "Jotai",
      "React Query",
    ],
  },
  {
    label: "Infrastructure & Cloud",
    skills: [
      "Google Cloud Run",
      "Cloudflare Workers",
      "Cloudflare Pages",
      "Cloudflare Vectorize",
      "Azure OpenAI Service",
      "Azure AI Search",
      "Azure DevOps",
      "AWS (EC2, Lambda, S3)",
      "Docker",
      "Linux & Bash",
    ],
  },
  {
    label: "Data & Backend",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Redis",
      "SQL Server",
      "MySQL",
      "REST APIs",
      "WebSockets",
    ],
  },
  {
    label: "Testing & Quality",
    skills: [
      "Jest",
      "Test-Driven Development",
      "Integration Testing",
      "Prompt Regression Testing",
      "Behavioral Consistency Checks",
      "Multi-run Variance Analysis",
    ],
  },
  {
    label: "Accessibility",
    skills: [
      "WCAG 2.1",
      "ADA Remediation",
      "Semantic HTML",
      "Screen Reader Testing",
      "Color Contrast Audits",
    ],
  },
  {
    label: "Enterprise Tooling",
    skills: [
      "Power Automate",
      "GitHub Copilot Governance",
      "Microsoft 365",
      "Git",
      "Postman",
      "Swagger / OpenAPI",
    ],
  },
];

interface SkillsProps {
  onOpenChat: () => void;
}

export default function Skills({ onOpenChat }: SkillsProps) {
  return (
    <section id="skills" className={`${styles.section} section--alt`}>
      <div className="container">
        <p className="section-label">skills</p>
        <h2 className="section-heading">Technical Skills</h2>

        {/* Languages with bars */}
        <div className={styles.languagesBlock}>
          <h3 className={styles.groupLabel}>Languages</h3>
          <div className={styles.languages}>
            {LANGUAGES.map((lang) => {
              const pct = (lang.years / MAX_YEARS) * 100;
              return (
                <div key={lang.name} className={styles.language}>
                  <div className={styles.languageMeta}>
                    <span className={styles.languageName}>{lang.name}</span>
                    <span className={styles.languageYears}>{lang.years}yr</span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill groups */}
        <div className={styles.groups}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className={styles.group}>
              <h3 className={styles.groupLabel}>{group.label}</h3>
              <div className={styles.pills}>
                {group.skills.map((skill) => (
                  <span key={skill} className={styles.pill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <button className="ask-fred-btn" onClick={onOpenChat}>
            ask fred about skills →
          </button>
        </div>
      </div>
    </section>
  );
}
