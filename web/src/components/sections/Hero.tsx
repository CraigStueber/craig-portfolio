"use client";

import Image from "next/image";
import styles from "./Hero.module.css";

interface HeroProps {
  onOpenChat: () => void;
}

export default function Hero({ onOpenChat }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Status row */}
        <div className={styles.statusRow}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>
            available for new opportunities
          </span>
        </div>

        {/* Name + Title + Avatar */}
        <div className={styles.nameRow}>
          <div className={styles.nameBlock}>
            <h1 className={styles.name}>Craig Stueber</h1>
            <p className={styles.title}>Applied AI Engineer</p>
            {/* Bio + Quote */}
            <div className={styles.bioBlock}>
              <p className={styles.bio}>
                Builds and ships production LLM systems end to end. Doctoral
                researcher in AI safety. 
              </p>
              <p className={styles.quote}>
                &ldquo;Work hard and be nice to people.&rdquo;
              </p>
            </div>
          </div>
          <div className={styles.avatarWrapper}>
            <Image
              src="/craigVar.jpg"
              alt="Craig Stueber"
              width={100}
              height={100}
              className={styles.avatar}
              priority
            />
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Current role + Education */}
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>current role</span>
            <span className={styles.metaValue}>BHE GT&amp;S</span>
            <span className={styles.metaSubValue}>since 2025</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>research</span>
            <span className={styles.metaValue}>Doctoral Candidate</span>
            <span className={styles.metaSubValue}>National University</span>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Current role + Education */}
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>current role</span>
            <span className={styles.metaValue}>BHE GT&amp;S</span>
            <span className={styles.metaSubValue}>since 2025</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>research</span>
            <span className={styles.metaValue}>Doctoral Candidate</span>
            <span className={styles.metaSubValue}>National University</span>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Contact */}
        <div className={styles.contactBlock}>
          <a
            href="mailto:craigstueber@gmail.com"
            className={styles.contactLink}
          >
            craigstueber@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/craigstueber"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
          >
            linkedin.com/in/craigstueber
          </a>
        </div>

        {/* Ask Fred */}
        <div className={styles.footer}>
          <button className="ask-fred-btn" onClick={onOpenChat}>
            ask fred anything →
          </button>
        </div>
      </div>
    </section>
  );
}
