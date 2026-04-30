"use client";

import styles from "./Education.module.css";

interface Degree {
  degree: string;
  field: string;
  major?: string;
  institution: string;
  years: string;
  status?: string;
  focus?: string[];
}

const DEGREES: Degree[] = [
  {
    degree: "Doctor of Philosophy",
    field: "Computer Science",
    institution: "National University",
    years: "2022 – 2026",
    status: "Doctoral Candidate · In Progress",
    focus: [
      "AI safety and behavioral reliability",
      "Security risks in AI-generated code",
      "Hybrid vulnerability scoring framework combining OWASP, CVSS, and AI-specific pattern detection",
    ],
  },
  {
    degree: "Master of Science",
    field: "Information Technology",
    institution: "Strayer University",
    years: "2020 – 2022",
    focus: [
      "IT management and information security management",
      "System design and architecture",
    ],
  },
  {
    degree: "Bachelor of Science",
    field: "Information Technology",
    major: "Software Development",
    institution: "Strayer University",
    years: "2017 – 2020",
  },
];

interface EducationProps {
  onOpenChat: () => void;
}

export default function Education({ onOpenChat }: EducationProps) {
  return (
    <section id="education" className={`${styles.section} section--alt`}>
      <div className="container">
        <p className="section-label">education</p>
        <h2 className="section-heading">Academic Background</h2>

        <div className={styles.degrees}>
          {DEGREES.map((degree, index) => (
            <div key={index} className={styles.degree}>
              <div className={styles.degreeHeader}>
                <div className={styles.degreeTitleBlock}>
                  <h3 className={styles.degreeTitle}>{degree.degree}</h3>
                  <span className={styles.degreeField}>{degree.field}</span>
                  {degree.major && (
                    <span className={styles.degreeMajor}>
                      Major · {degree.major}
                    </span>
                  )}
                </div>
                <div className={styles.degreeMeta}>
                  <span className={styles.degreeInstitution}>
                    {degree.institution}
                  </span>
                  <span className={styles.degreeYears}>{degree.years}</span>
                  {degree.status && (
                    <span className={styles.degreeStatus}>{degree.status}</span>
                  )}
                </div>
              </div>

              {degree.focus && (
                <ul className={styles.focusList}>
                  {degree.focus.map((item, i) => (
                    <li key={i} className={styles.focusItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="section-footer">
          <button className="ask-fred-btn" onClick={onOpenChat}>
            ask fred about education →
          </button>
        </div>
      </div>
    </section>
  );
}
