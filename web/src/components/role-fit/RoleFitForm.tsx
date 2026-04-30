"use client";

import { useState, useEffect, useRef } from "react";
import { submitRoleFit } from "@/lib/api";
import RoleFitResult from "./RoleFitResult";
import styles from "./RoleFitForm.module.css";

type State = "idle" | "loading" | "result" | "error";

const THINKING_MESSAGES = [
  "parsing job description...",
  "mapping against craig's profile...",
  "identifying strong matches...",
  "running gap analysis...",
  "challenging the assessment...",
  "still thinking...",
  "synthesizing findings...",
  "almost there...",
  "finalizing assessment...",
];

export default function RoleFitForm() {
  const [state, setState] = useState<State>("idle");
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [thinkingMsg, setThinkingMsg] = useState(THINKING_MESSAGES[0]);
  const thinkingInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const msgIndex = useRef(0);

  const startThinking = () => {
    msgIndex.current = 0;
    setThinkingMsg(THINKING_MESSAGES[0]);
    thinkingInterval.current = setInterval(() => {
      msgIndex.current = Math.min(
        msgIndex.current + 1,
        THINKING_MESSAGES.length - 1,
      );
      setThinkingMsg(THINKING_MESSAGES[msgIndex.current]);
    }, 4000);
  };

  const stopThinking = () => {
    if (thinkingInterval.current) {
      clearInterval(thinkingInterval.current);
      thinkingInterval.current = null;
    }
  };

  useEffect(() => {
    return () => stopThinking();
  }, []);

  const handleSubmit = async () => {
    if (!jdText.trim() || state === "loading") return;

    setState("loading");
    setError("");
    startThinking();

    try {
      const response = await submitRoleFit({ jd_text: jdText });
      setResult(response.content);
      setState("result");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setState("error");
    } finally {
      stopThinking();
    }
  };

  const handleReset = () => {
    setState("idle");
    setJdText("");
    setResult("");
    setError("");
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.intro}>
          <p className="section-label">role fit</p>
          <h1 className={styles.heading}>How well does Craig fit your role?</h1>
          <p className={styles.subheading}>
            Paste a job description below for an honest, structured assessment.
            Gaps are included. That&apos;s the point.
          </p>
          <p className={styles.warning}>
            ⚠ Assessment typically takes 20–40 seconds. The result is worth the
            wait.
          </p>
        </div>

        {/* Form */}
        {(state === "idle" || state === "error" || state === "loading") && (
          <div className={styles.formBlock}>
            <textarea
              className={styles.textarea}
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="paste job description here..."
              rows={12}
              disabled={state === "loading"}
            />

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.formFooter}>
              <span className={styles.hint}>
                {jdText.trim().length > 0
                  ? `${jdText.trim().length} characters`
                  : "minimum 50 characters required"}
              </span>
              <button
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={state === "loading" || jdText.trim().length < 50}
              >
                {state === "loading" ? "running..." : "run assessment →"}
              </button>
            </div>
          </div>
        )}

        {/* Result */}
        {state === "result" && (
          <>
            <RoleFitResult content={result} />
            <div className={styles.resetBlock}>
              <button className={styles.resetButton} onClick={handleReset}>
                ← run another assessment
              </button>
            </div>
          </>
        )}
      </div>
      {/* Loading overlay */}
      {state === "loading" && (
        <div className={styles.overlay}>
          <div className={styles.overlayCard}>
            <div className={styles.thinkingDots}>
              <span className={styles.thinkingDot} />
              <span className={styles.thinkingDot} />
              <span className={styles.thinkingDot} />
            </div>
            <span className={styles.thinkingMsg}>{thinkingMsg}</span>
            <p className={styles.overlayWarning}>
              This typically takes 20–40 seconds.
              <br />
              The result is worth the wait.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
