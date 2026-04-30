"use client";

import { useState, useRef, KeyboardEvent } from "react";
import styles from "./ChatInput.module.css";

interface ChatInputProps {
  onSend: (content: string) => void;
  isLoading: boolean;
  sectionId: string | null;
}

export default function ChatInput({
  onSend,
  isLoading,
  sectionId,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const placeholder = sectionId
    ? `ask about craig's ${sectionId}...`
    : "ask fred anything...";

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <div className={styles.inputBar}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder={placeholder}
        rows={1}
        disabled={isLoading}
      />
      <button
        className={styles.sendButton}
        onClick={handleSend}
        disabled={isLoading || !value.trim()}
        aria-label="Send message"
      >
        →
      </button>
    </div>
  );
}
