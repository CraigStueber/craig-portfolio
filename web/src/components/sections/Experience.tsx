"use client";

import styles from "./Experience.module.css";

interface Role {
  title: string;
  subtitle?: string;
  company: string;
  years: string;
  location: string;
  bullets: string[];
  tags: string[];
}

interface EarlierExperience {
  summary: string;
  tags: string[];
}

const ROLES: Role[] = [
  {
    title: "Senior Full Stack Engineer",
    subtitle: "AI Systems Integration",
    company: "Berkshire Hathaway Energy (BHE GT&S)",
    years: "2025 – Present",
    location: "Richmond, VA",
    bullets: [
      "Tech lead and people lead for a team of 6 engineers building Dekaflow 2.0, a next-generation enterprise platform supporting billions in annual east coast energy movement.",
      "Led early-stage AI agent R&D designing a six-agent LangGraph pipeline for enterprise data understanding, translating complex operational data into actionable business insights.",
      "Built and owned full-stack features end to end across Next.js, Java, MongoDB, and Azure including gas flow scheduling, hourly quantity tracking, and a cross-cutting user preferences system.",
      "Led enterprise-wide GitHub Copilot deployment across 200+ engineers, establishing behavioral guardrails and governance practices for safe AI adoption.",
    ],
    tags: [
      "LangGraph",
      "LangSmith",
      "Next.js",
      "Java",
      "MongoDB",
      "Azure",
      "React",
      "TypeScript",
    ],
  },
  {
    title: "Senior Full Stack Developer",
    subtitle: "LLM-Integrated Systems",
    company: "Sauer Brands Inc",
    years: "2021 – 2025",
    location: "Richmond, VA",
    bullets: [
      "Sole engineer across 6 independent brand teams, building all customer-facing applications from 0 to 1 without product management support.",
      "Built an agentic customer service tool combining customer context with rep input to generate complete, ready-to-send response emails with recipient routing and CC recommendations.",
      "Replaced third-party tooling with in-house solutions, reducing external vendor costs by $250,000 annually.",
      "Ran controlled prompt A/B evaluations analyzing token sensitivity and regression risks across model versions prior to production rollout.",
    ],
    tags: [
      "React",
      "Supabase",
      "PostgreSQL",
      "Redis",
      "LLM Integration",
      "Power Automate",
      "TypeScript",
    ],
  },
  {
    title: "Co-Founder & Lead Engineer",
    company: "DanceCard",
    years: "2024 – 2025",
    location: "Richmond, VA",
    bullets: [
      "Designed an agentic onboarding system using CrewAI with constrained generation patterns to maintain consistent, safe outputs in a consumer-facing context.",
      "Owned full product architecture and technical direction for a cross-platform React Native and Supabase mobile application.",
      "Built real-time chat, event scheduling, and location-aware discovery across iOS and Android.",
      "Led full App Store and Google Play submission including TestFlight and Play Console policy compliance.",
    ],
    tags: ["CrewAI", "React Native", "Supabase", "Expo", "TypeScript"],
  },
  {
    title: "Full Stack Engineer",
    subtitle: "ML-Enhanced IoT Systems",
    company: "Talos IoT",
    years: "2021",
    location: "Glen Allen, VA",
    bullets: [
      "Integrated ML models for time-series anomaly detection and classification into backend services to identify sensor abnormalities and operational risks.",
      "Built real-time IoT monitoring dashboards using React, Python, and WebSockets, translating ML outputs into actionable insights for field operators.",
    ],
    tags: ["React", "Python", "WebSockets", "ML Integration"],
  },
];

interface EarlierRole {
  company: string;
  years: string;
  description: string;
}

const EARLIER_ROLES: EarlierRole[] = [
  {
    company: "Kurb Media",
    years: "2019 – 2020",
    description:
      "Frontend delivery across React, PHP, Shopify, and early AR prototypes. Managed requirements and delivery timelines directly with clients.",
  },
  {
    company: "PresenceLearning",
    years: "2020 – 2021",
    description:
      "Frontend modernization, email system consolidation, mobile UX improvements, and accessibility remediation.",
  },
  {
    company: "Soar365",
    years: "2021",
    description:
      "Full WCAG and ADA audit and remediation, Wix platform migration, and staff accessibility training.",
  },
  {
    company: "Freelance",
    years: "2017 – 2021",
    description:
      "Full-stack delivery for nonprofits, authors, and real estate clients. Owned requirements, scoping, and delivery without project management support.",
  },
];

const EARLIER_TAGS = [
  "React",
  "WordPress",
  "Shopify",
  "PHP",
  "Accessibility",
  "WCAG",
];

interface ExperienceProps {
  onOpenChat: () => void;
}

export default function Experience({ onOpenChat }: ExperienceProps) {
  return (
    <section id="experience" className={`${styles.section} section--alt`}>
      <div className="container">
        <p className="section-label">experience</p>
        <h2 className="section-heading">Work History</h2>

        <div className={styles.roles}>
          {ROLES.map((role, index) => (
            <div key={index} className={styles.role}>
              <div className={styles.roleHeader}>
                <div className={styles.roleTitleBlock}>
                  <h3 className={styles.roleTitle}>{role.title}</h3>
                  {role.subtitle && (
                    <span className={styles.roleSubtitle}>{role.subtitle}</span>
                  )}
                </div>
                <div className={styles.roleMeta}>
                  <span className={styles.roleCompany}>{role.company}</span>
                  <span className={styles.roleDetails}>
                    {role.years} · {role.location}
                  </span>
                </div>
              </div>

              <ul className={styles.bullets}>
                {role.bullets.map((bullet, i) => (
                  <li key={i} className={styles.bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className={styles.tags}>
                {role.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Earlier Experience */}
          <div className={styles.earlier}>
            <div className={styles.earlierHeader}>
              <h3 className={styles.earlierTitle}>Earlier Experience</h3>
              <span className={styles.earlierYears}>2017 – 2021</span>
            </div>

            <div className={styles.earlierRoles}>
              {EARLIER_ROLES.map((role) => (
                <div key={role.company} className={styles.earlierRole}>
                  <div className={styles.earlierRoleMeta}>
                    <span className={styles.earlierCompany}>
                      {role.company}
                    </span>
                    <span className={styles.earlierRoleYears}>
                      {role.years}
                    </span>
                  </div>
                  <p className={styles.earlierDescription}>
                    {role.description}
                  </p>
                </div>
              ))}
            </div>

            <div className={styles.tags}>
              {EARLIER_TAGS.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="section-footer">
          <button className="ask-fred-btn" onClick={onOpenChat}>
            ask fred about experience →
          </button>
        </div>
      </div>
    </section>
  );
}
