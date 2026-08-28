// Vercel Serverless Function — NOT a custom backend/server you run or manage.
// Deployed automatically by Vercel from this /api directory. It only exists
// to keep the AI provider's API key out of the browser bundle.
//
// Required environment variable (set in Vercel Project Settings → Environment
// Variables, never committed to git):
//   GEMINI_API_KEY  — get a free key at https://aistudio.google.com/apikey

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildAiKnowledgeBase } from '../src/data/portfolioData.js';

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;
const GEMINI_MODEL = 'gemini-1.5-flash';

const requestLog = new Map<string, number[]>();
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const ip = (req.headers['x-forwarded-for'] as string) ?? 'unknown';
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'AI assistant is not configured. Missing GEMINI_API_KEY.' });
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

    const knowledgeBase = buildAiKnowledgeBase();
    const systemPrompt =
      'You are "Ask Isra AI", a friendly assistant embedded in Isra Oun\'s developer portfolio. ' +
      'Answer ONLY using the information below. If a question cannot be answered from this ' +
      'information, say you don\'t have that detail and suggest the visitor use the Contact section. ' +
      'Never invent skills, projects, experience, or dates. Keep answers concise (2-4 sentences) ' +
      'and written in a warm, professional tone suitable for recruiters.\n\n' +
      'PORTFOLIO KNOWLEDGE BASE:\n' +
      knowledgeBase;

    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const url =
      'https://generativelanguage.googleapis.com/v1beta/models/' +
      GEMINI_MODEL +
      ':generateContent';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { maxOutputTokens: 400 },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Gemini API error', response.status, errorBody);
      return res.status(502).json({ error: 'AI provider error.', debug: errorBody });
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't generate a response.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Unexpected /api/ask error', err);
    const message = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: 'Unexpected server error.', debug: message });
  }
}