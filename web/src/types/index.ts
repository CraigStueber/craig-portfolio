// -------------------------------------------------------------------
// Section
// -------------------------------------------------------------------

export type SectionId =
  | "experience"
  | "education"
  | "projects"
  | "skills"
  | "research"
  | "writings"
  | null;

// -------------------------------------------------------------------
// Chat
// -------------------------------------------------------------------

export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  content: string;
}

export interface ChatRequest {
  section_id: SectionId;
  messages: Message[];
}

export interface ChatResponse {
  role: "assistant";
  content: string;
}

// -------------------------------------------------------------------
// Role Fit
// -------------------------------------------------------------------

export interface RoleFitRequest {
  jd_text: string;
}

export interface RoleFitResponse {
  content: string;
}

// -------------------------------------------------------------------
// Nav
// -------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
  sectionId: SectionId;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "experience", href: "#experience", sectionId: "experience" },
  { label: "projects", href: "#projects", sectionId: "projects" },
  { label: "skills", href: "#skills", sectionId: "skills" },
  { label: "research", href: "#research", sectionId: "research" },
  { label: "writings", href: "#writings", sectionId: "writings" },
  { label: "education", href: "#education", sectionId: "education" },
];
