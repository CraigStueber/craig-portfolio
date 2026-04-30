"use client";

import { useState, useRef, useCallback } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Research from "@/components/sections/Research";
import Writings from "@/components/sections/Writings";
import Education from "@/components/sections/Education";
import ChatModal from "@/components/chat/ChatModal";
import type { SectionId, Message } from "@/types";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<SectionId>(null);

  // History map -- keyed by section_id, persists across modal opens
  const historyMap = useRef<Record<string, Message[]>>({});

  const openChat = useCallback((sectionId: SectionId) => {
    setActiveSectionId(sectionId);
    setModalOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setModalOpen(false);
  }, []);

  const saveHistory = useCallback(
    (sectionId: SectionId, messages: Message[]) => {
      const key = sectionId ?? "global";
      historyMap.current[key] = messages;
    },
    [],
  );

  const getHistory = (sectionId: SectionId): Message[] => {
    const key = sectionId ?? "global";
    return historyMap.current[key] ?? [];
  };

  return (
    <>
      <Header />
      <main>
        <Hero onOpenChat={() => openChat(null)} />
        <Experience onOpenChat={() => openChat("experience")} />
        <Projects onOpenChat={() => openChat("projects")} />
        <Skills onOpenChat={() => openChat("skills")} />
        <Research onOpenChat={() => openChat("research")} />
        <Writings onOpenChat={() => openChat("writings")} />
        <Education onOpenChat={() => openChat("education")} />
      </main>
      <Footer />
      <ChatModal
        isOpen={modalOpen}
        sectionId={activeSectionId}
        initialMessages={getHistory(activeSectionId)}
        onClose={closeChat}
        onSaveHistory={(messages) => saveHistory(activeSectionId, messages)}
      />
    </>
  );
}
