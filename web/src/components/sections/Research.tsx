"use client";

import styles from "./Research.module.css";

interface FrameworkLayer {
  name: string;
  description: string;
}

interface ResearchInterest {
  area: string;
  description: string;
}

const FRAMEWORK_LAYERS: FrameworkLayer[] = [
  {
    name: "OWASP Top 10 Classification",
    description:
      "Classifies vulnerabilities using the OWASP Top 10 taxonomy of critical application security risks",
  },
  {
    name: "AI-Specific Vulnerability Pattern Layer",
    description:
      "Identifies vulnerability characteristics arising from the probabilistic and training-data-dependent nature of LLM code generation",
  },
  {
    name: "CVSS v3.1 Severity Quantification",
    description:
      "Scores vulnerability severity using CVSS metrics modified to reflect elevated risk characteristics of AI-generated outputs",
  },
];

const RESEARCH_INTERESTS: ResearchInterest[] = [
  {
    area: "AI Behavioral Reliability & Drift",
    description:
      "How and why LLM behavior degrades over time, across prompt variations, and under adversarial input.",
  },
  {
    area: "Human Agency & Automation",
    description:
      "How frictionless automation quietly erodes cognitive capacity, judgment, and identity over time.",
  },
  {
    area: "AI Integration Failure Modes",
    description:
      "Why most AI failures occur at the integration layer rather than the model layer.",
  },
  {
    area: "Human-in-the-Loop System Design",
    description:
      "HITL as an architectural decision rather than a safety declaration -- requires real oversight infrastructure to function.",
  },
  {
    area: "Prompt Architecture as a Safety Control",
    description:
      "How system prompt structure, constraint layering, and meta-prompts reduce hallucination and drift in production systems.",
  },
  {
    area: "Evaluation Methodology for AI Systems",
    description:
      "Why accuracy is an insufficient metric for production AI -- behavioral observability and drift detection as evaluation primitives.",
  },
];

interface ResearchProps {
  onOpenChat: () => void;
}

export default function Research({ onOpenChat }: ResearchProps) {
  return (
    <section id="research" className={`${styles.section} section--alt`}>
      <div className="container">
        <p className="section-label">research</p>
        <h2 className="section-heading">Doctoral Research</h2>

        {/* Dissertation block */}
        <div className={styles.dissertation}>
          <div className={styles.dissertationHeader}>
            <div className={styles.dissertationTitleBlock}>
              <span className={styles.dissertationBadge}>// dissertation</span>
              <h3 className={styles.dissertationTitle}>
                Evaluating the Security of AI-Generated Code: A Quantitative
                Study Using a Custom Scoring Framework
              </h3>
            </div>
            <div className={styles.dissertationMeta}>
              <span className={styles.dissertationInstitution}>
                National University
              </span>
              <span className={styles.dissertationStatus}>
                Doctoral Candidate · In Progress
              </span>
            </div>
          </div>

          <p className={styles.dissertationThesis}>
            Designs and validates a reproducible hybrid vulnerability scoring
            framework to detect and measure security risks in AI-generated code
            before deployment. Addresses a validated gap in the literature -- no
            systematic evaluation framework existed for assessing AI-generated
            code security across diverse programming tasks and contexts.
          </p>

          <div className={styles.frameworkLayers}>
            <span className={styles.frameworkLabel}>framework layers</span>
            {FRAMEWORK_LAYERS.map((layer, i) => (
              <div key={i} className={styles.layer}>
                <span className={styles.layerMarker}>
                  // {String(i + 1).padStart(2, "0")}
                </span>
                <div className={styles.layerContent}>
                  <span className={styles.layerName}>{layer.name}</span>
                  <span className={styles.layerDescription}>
                    {layer.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-footer">
          <button className="ask-fred-btn" onClick={onOpenChat}>
            ask fred about research →
          </button>
        </div>
      </div>
    </section>
  );
}
