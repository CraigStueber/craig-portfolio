import { useState, useCallback, useRef } from "react";
import { sendChatMessage } from "@/lib/api";
import type { Message, SectionId } from "@/types";

interface UseChatOptions {
  sectionId: SectionId;
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  send: (content: string) => Promise<void>;
  clear: () => void;
}

export function useChat({ sectionId }: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ref to track if a request is in flight -- prevents duplicate sends
  const isLoadingRef = useRef(false);

  const send = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoadingRef.current) return;

      const userMessage: Message = { role: "user", content: content.trim() };

      // Optimistically add the user message before the API call
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

        // Remove the optimistically added user message on failure
        // so the user can retry without duplicate messages
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    },
    [messages, sectionId]
  );

  const clear = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, send, clear };
}