"use client";

import ReactMarkdown from "react-markdown";
import styles from "./RoleFitResult.module.css";

interface RoleFitResultProps {
  content: string;
}

export default function RoleFitResult({ content }: RoleFitResultProps) {
  return (
    <div className={styles.result}>
      <div className={styles.resultHeader}>
        <span className={styles.badge}>// assessment complete</span>
      </div>
      <div className={styles.content}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
