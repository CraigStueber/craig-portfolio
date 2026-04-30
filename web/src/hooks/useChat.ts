import { useState, useCallback, useRef, useEffect } from "react";
import { sendChatMessage } from "@/lib/api";
import type { Message, SectionId } from "@/types";

interface UseChatOptions {
  sectionId: SectionId;
  initialMessages?: Message[];
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  send: (content: string) => Promise<void>;
  clear: () => void;
}

export function useChat({
  sectionId,
  initialMessages = [],
}: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLoadingRef = useRef(false);

  // Reset messages when section changes or modal reopens with new history
  useEffect(() => {
    setMessages(initialMessages);
    setError(null);
  }, [sectionId, initialMessages]);

  const send = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoadingRef.current) return;

      const userMessage: Message = { role: "user", content: content.trim() };
      const updatedMessages = [...messages, userMessage];

      setMessages(updatedMessages);
      setIsLoading(true);
      setError(null);
      isLoadingRef.current = true;

      try {
        const response = await sendChatMessage({
          section_id: sectionId,
          messages: updatedMessages,
        });

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response.content },
        ]);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        setError(message);
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    },
    [messages, sectionId],
  );

  const clear = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, send, clear };
}
