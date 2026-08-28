// Vercel Serverless Function — NOT a custom backend/server you run or manage.
// Deployed automatically by Vercel from this /api directory. It only exists
// to keep the AI provider's API key out of the browser bundle.
//
// Required environment variable (set in Vercel Project Settings → Environment
// Variables, never committed to git):
//   ANTHROPIC_API_KEY

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildAiKnowledgeBase } from './portfolioData';

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;

// Very small in-memory rate limiter (per serverless instance, best-effort only).
const requestLog = new Map<string, number[]>();
const RATE_LIMIT = 15; // requests
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] as string) ?? 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'AI assistant is not configured.' });
  }

  const body = req.body as { messages?: IncomingMessage[] };
  const messages = Array.isArray(body?.messages) ? body.messages : [];

  if (messages.length === 0 || messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: 'Invalid message history.' });
  }
  for (const m of messages) {
    if (!['user', 'assistant'].includes(m.role) || typeof m.content !== 'string') {
      return res.status(400).json({ error: 'Invalid message format.' });
    }
    if (m.content.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: 'Message too long.' });
    }
  }

  const systemPrompt = `You are "Ask Isra AI", a friendly assistant embedded in Isra Oun's developer portfolio.
Answer ONLY using the information below. If a question cannot be answered from this
information, say you don't have that detail and suggest the visitor use the Contact section.
Never invent skills, projects, experience, or dates. Keep answers concise (2-4 sentences)
and written in a warm, professional tone suitable for recruiters.

PORTFOLIO KNOWLEDGE BASE:
${buildAiKnowledgeBase()}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 400,
        system: systemPrompt,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Anthropic API error', response.status, errorBody);
      // TEMPORARY DEBUG: shows the real reason in the browser so we can fix it fast.
      // Remove the "debug" field once the assistant works again.
      return res.status(502).json({ error: 'AI provider error.', debug: errorBody });
    }

    const data = await response.json();
    const textBlock = data.content?.find((c: { type: string }) => c.type === 'text');
    const reply = textBlock?.text ?? "Sorry, I couldn't generate a response.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Unexpected /api/ask error', err);
    return res.status(500).json({ error: 'Unexpected error contacting the AI provider.' });
  }
}