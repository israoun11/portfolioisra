export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export class AiAssistantError extends Error {}

/**
 * Sends the conversation to the /api/ask serverless function (see /api/ask.ts).
 * The AI provider's API key lives only in the Vercel environment on that
 * function — it is never present in this client bundle.
 */
export async function askAssistant(messages: ChatMessage[]): Promise<string> {
  const res = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messages.map(({ role, content }) => ({ role, content })),
    }),
  });

  if (!res.ok) {
    if (res.status === 429) {
      throw new AiAssistantError('Too many questions at once — please wait a moment and try again.');
    }
    throw new AiAssistantError('The assistant is temporarily unavailable. Please try again shortly.');
  }

  const data = (await res.json()) as { reply?: string; error?: string };
  if (!data.reply) {
    throw new AiAssistantError(data.error ?? 'The assistant did not return a response.');
  }
  return data.reply;
}

export const suggestedQuestions = [
  'What technologies does Isra use?',
  "What is Isra's strongest project?",
  'Is Isra available for remote work?',
  'What makes her a good junior developer?',
  'How can I contact her?',
];