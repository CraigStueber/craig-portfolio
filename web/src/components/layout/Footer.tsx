import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Identity */}
        <div className={styles.identity}>
          <span className={styles.name}>craig stueber</span>
          <span className={styles.title}>Applied AI Engineer</span>
        </div>

        {/* Contact */}
        <div className={styles.contact}>
          <a href="mailto:craigstueber@gmail.com" className={styles.link}>
            craigstueber@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/craigstueber"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            linkedin.com/in/craigstueber
          </a>
          <a
            href="https://craigstueber.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            craigstueber.com
          </a>
        </div>

        <div className={styles.divider} />

        {/* Built with + copyright */}
        <div className={styles.bottom}>
          <span className={styles.builtWith}>
            built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.builtWithLink}
            >
              Next.js
            </a>
            {" · "}
            <a
              href="https://langchain-ai.github.io/langgraph/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.builtWithLink}
            >
              LangGraph
            </a>
            {" · deployed on "}
            <a
              href="https://pages.cloudflare.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.builtWithLink}
            >
              Cloudflare
            </a>
            {" · "}
            <a
              href="https://cloud.google.com/run"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.builtWithLink}
            >
              Cloud Run
            </a>
          </span>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} Craig Stueber
          </span>
        </div>
      </div>
    </footer>
  );
}
