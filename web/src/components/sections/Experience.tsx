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
      "Tech lead and people lead for a team of 6 engineers building Dekaflow 2.0, transitioning $100B+ in annual energy movement from on-prem to cloud.",
      "Led early-stage AI agent R&D designing a six-agent LangGraph pipeline for enterprise data understanding, decreasing business stakeholder analysis time by 90%.",
      "Built and owned full-stack features end to end across Next.js, Java, MongoDB, and Azure supporting gas flow scheduling, hourly quantity tracking, and a cross-cutting user preferences system, saving 10K+ hours monthly on operations.",
      "Led enterprise-wide GitHub Copilot deployment across 200+ engineers, establishing behavioral guardrails and governance practices, reducing AI-introduced defects in production codebases.",
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
      "Sole engineer across 6 independent brand teams, building all customer-facing applications from 0 to 1, delivering 140+ features across all brands.",
      "Developed customer service tool used daily by 10 reps, reducing critical issue resolution time from 36+ hours to 6-8 hours.",
      "Automated priority classification of service requests, routing emergency-tier messages without manual triage and eliminating bottlenecks across 100+ daily incoming requests.",
      "Built LLM-integrated pipelines for classification, summarization, and automated routing with controlled prompt A/B evaluations, saving the IT team 180+ hours monthly on customer processing.",
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
    years: "2019 – 2021",
    description:
      "Delivered 50+ client projects across React, PHP, WordPress, Shopify, and early AR prototypes. Managed requirements and delivery timelines directly with clients, delivering 100% of projects on time.",
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
    years: "2017 – 2019",
    description:
      "Built and delivered 10+ full-stack web applications for clients in publishing, real estate, and nonprofit industries. Owned requirements, scoping, and delivery -- secured 100% of clients through word-of-mouth referrals.",
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
