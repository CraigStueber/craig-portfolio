import ReactMarkdown from "react-markdown";
import styles from "./ChatMessage.module.css";
import type { Message } from "@/types";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`${styles.wrapper} ${isUser ? styles.userWrapper : styles.fredWrapper}`}
    >
      {!isUser && <span className={styles.sender}>fred</span>}
      <div
        className={`${styles.bubble} ${isUser ? styles.userBubble : styles.fredBubble}`}
      >
        {isUser ? (
          message.content
        ) : (
          <div className={styles.markdown}>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
      {isUser && <span className={styles.sender}>you</span>}
    </div>
  );
}
