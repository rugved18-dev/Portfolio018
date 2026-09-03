export type ChatMessage = {
  role: 'user' | 'model';
  text: string;
};

export type AskResponse = {
  response: string;
};

export type AskError = {
  error: string;
};

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function askEngineer(
  question: string,
  history: ChatMessage[]
): Promise<AskResponse> {
  const apiUrl = `${SUPABASE_URL}/functions/v1/ask-engineer`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ question, history }),
  });

  if (!response.ok) {
    const errorBody: AskError = await response.json().catch(() => ({ error: 'AI assistant is temporarily unavailable.' }));
    throw new Error(errorBody.error ?? 'AI assistant is temporarily unavailable.');
  }

  const data: AskResponse = await response.json();

  if (!data || typeof data.response !== 'string') {
    throw new Error('AI assistant is temporarily unavailable.');
  }

  return data;
}
