"use client";

import { useEffect, useCallback } from "react";
import ChatThread from "./ChatThread";
import ChatInput from "./ChatInput";
import { useChat } from "@/hooks/useChat";
import styles from "./ChatModal.module.css";
import type { SectionId, Message } from "@/types";

const FRED_INTRO: Record<string, string> = {
  experience:
    "Ask me anything about Craig's engineering career and work history.",
  projects:
    "Want to go deeper on any of Craig's projects? I can walk through the architecture, decisions, and outcomes.",
  skills:
    "Ask me about any skill -- I'll map it to real evidence, not just tell you Craig has it.",
  research:
    "Ask me about Craig's doctoral research or his broader thinking on AI safety and evaluation.",
  writings:
    "Ask me about The Comfortable Apocalypse, any of Craig's Medium essays, or the ideas behind them.",
  education:
    "Ask me about Craig's academic background and how it connects to his engineering work.",
};

const DEFAULT_INTRO =
  "I'm Fred -- Craig's professional representative. Ask me anything about his background, work, or thinking.";

interface ChatModalProps {
  isOpen: boolean;
  sectionId: SectionId;
  initialMessages: Message[];
  onClose: () => void;
  onSaveHistory: (messages: Message[]) => void;
}

export default function ChatModal({
  isOpen,
  sectionId,
  initialMessages,
  onClose,
  onSaveHistory,
}: ChatModalProps) {
  const { messages, isLoading, error, send } = useChat({
    sectionId,
    initialMessages,
  });

  // Save history when modal closes
  const handleClose = useCallback(() => {
    onSaveHistory(messages);
    onClose();
  }, [messages, onClose, onSaveHistory]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const intro = sectionId
    ? (FRED_INTRO[sectionId] ?? DEFAULT_INTRO)
    : DEFAULT_INTRO;

  const introMessage: Message = {
    role: "assistant",
    content: intro,
  };

  const displayMessages = messages.length > 0 ? messages : [introMessage];

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={handleClose} />

      {/* Modal */}
      <div className={styles.modal} role="dialog" aria-modal="true">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.fredLabel}>fred</span>
            {sectionId && (
              <>
                <span className={styles.headerDivider}>·</span>
                <span className={styles.sectionLabel}>{sectionId}</span>
              </>
            )}
          </div>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>

        {/* Thread */}
        <ChatThread messages={displayMessages} isLoading={isLoading} />

        {/* Error */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Input */}
        <ChatInput onSend={send} isLoading={isLoading} sectionId={sectionId} />
      </div>
    </>
  );
}
