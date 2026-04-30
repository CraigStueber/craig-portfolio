"use client";

import styles from "./Writings.module.css";

interface Article {
  title: string;
  summary: string;
  date: string;
  url: string;
}

const BOOK = {
  title: "The Comfortable Apocalypse",
  subtitle: "When Survival Isn't the Problem — Irrelevance Is",
  status: "Forthcoming · Nonfiction",
  thesis:
    "The central risk of the AI age is not domination or rebellion, but displacement. As automation removes friction from daily life, it quietly erodes the cognitive and emotional capacities that effort once built — memory, judgment, curiosity, creativity, identity, and agency. The danger is not hostile AI, but a world where thinking becomes optional and human participation fades without resistance.",
};

const ARTICLES: Article[] = [
  {
    title:
      "Why Most AI Failures Aren't Model Failures — They're Integration Failures",
    summary: "Why production breaks assumptions, not models.",
    date: "2026-01",
    url: "https://medium.com/@craigstueber/why-most-ai-failures-arent-model-failures-they-re-integration-failures-fdec486f67ba",
  },
  {
    title: "Security Reviews Don't Catch AI Failures. Here's Why.",
    summary:
      "The review passed. The system failed. Those two things can both be true.",
    date: "2026-02",
    url: "https://medium.com/@craigstueber/security-reviews-dont-catch-ai-failures-here-s-why-2dfb2fb39aa4",
  },
  {
    title: "How to Actually Implement AI Agents in the Real World",
    summary: "What the tutorials skip and production demands.",
    date: "2026-03",
    url: "https://medium.com/@craigstueber/how-to-actually-implement-ai-agents-in-the-real-world-1292d6ecc79d",
  },
];

const MEDIUM_PROFILE = "https://medium.com/@craigstueber";

interface WritingsProps {
  onOpenChat: () => void;
}

export default function Writings({ onOpenChat }: WritingsProps) {
  return (
    <section id="writings" className={styles.section}>
      <div className="container">
        <p className="section-label">writings</p>
        <h2 className="section-heading">Published Work</h2>

        {/* Book */}
        <div className={styles.book}>
          <span className={styles.bookBadge}>// book</span>
          <div className={styles.bookHeader}>
            <div>
              <h3 className={styles.bookTitle}>{BOOK.title}</h3>
              <p className={styles.bookSubtitle}>{BOOK.subtitle}</p>
            </div>
            <span className={styles.bookStatus}>{BOOK.status}</span>
          </div>
          <p className={styles.bookThesis}>{BOOK.thesis}</p>
        </div>

        {/* Articles */}
        <div className={styles.articles}>
          <div className={styles.articlesHeader}>
            <span className={styles.articlesLabel}>
              Medium · Applied AI Essays
            </span>
          </div>

          <div className={styles.articleList}>
            {ARTICLES.map((article) => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.article}
              >
                <div className={styles.articleMain}>
                  <span className={styles.articleTitle}>{article.title}</span>
                  <span className={styles.articleSummary}>
                    {article.summary}
                  </span>
                </div>
                <div className={styles.articleRight}>
                  <span className={styles.articleDate}>{article.date}</span>
                  <span className={styles.articleArrow}>→</span>
                </div>
              </a>
            ))}
          </div>

          <a
            href={MEDIUM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mediumLink}
          >
            read all essays on medium →
          </a>
        </div>

        <div className="section-footer">
          <button className="ask-fred-btn" onClick={onOpenChat}>
            ask fred about writings →
          </button>
        </div>
      </div>
    </section>
  );
}
