import styles from "./ChatMessage.module.css";
import typingStyles from "./TypingIndicator.module.css";

export default function TypingIndicator() {
  return (
    <div className={`${styles.wrapper} ${styles.fredWrapper}`}>
      <span className={styles.sender}>fred</span>
      <div className={`${styles.bubble} ${styles.fredBubble}`}>
        <div className={typingStyles.dots}>
          <span className={typingStyles.dot} />
          <span className={typingStyles.dot} />
          <span className={typingStyles.dot} />
        </div>
      </div>
    </div>
  );
}
