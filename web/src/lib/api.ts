import type {
  ChatRequest,
  ChatResponse,
  RoleFitRequest,
  RoleFitResponse,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// -------------------------------------------------------------------
// Fred chat
// -------------------------------------------------------------------

export async function sendChatMessage(
  request: ChatRequest,
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error?.detail ?? `Chat request failed with status ${response.status}`,
    );
  }

  return response.json();
}

// -------------------------------------------------------------------
// Role fit
// -------------------------------------------------------------------

export async function submitRoleFit(
  request: RoleFitRequest,
): Promise<RoleFitResponse> {
  const response = await fetch(`${API_BASE_URL}/role-fit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error?.detail ?? `Role fit request failed with status ${response.status}`,
    );
  }

  return response.json();
}
