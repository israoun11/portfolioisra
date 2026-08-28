// Vercel Serverless Function — NOT a custom backend/server you run or manage.
// Deployed automatically by Vercel from this /api directory. It only exists
// to keep the AI provider's API key out of the browser bundle.
//
// Required environment variable (set in Vercel Project Settings → Environment
// Variables, never committed to git):
//   GEMINI_API_KEY  — get a free key at https://aistudio.google.com/apikey

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { buildAiKnowledgeBase } from '../src/data/portfolioData.js';

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;

const requestLog = new Map<string, number[]>();
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );

  timestamps.push(now);
  requestLog.set(ip, timestamps);

  return timestamps.length > RATE_LIMIT;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');

      return res.status(405).json({
        error: 'Method not allowed',
      });
    }

    const forwardedFor = req.headers['x-forwarded-for'];

    const ip =
      typeof forwardedFor === 'string'
        ? forwardedFor.split(',')[0].trim()
        : 'unknown';

    if (isRateLimited(ip)) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('Missing GEMINI_API_KEY');

      return res.status(500).json({
        error: 'AI assistant is not configured.',
      });
    }

    const body = req.body as {
      messages?: IncomingMessage[];
    };

    const messages = Array.isArray(body?.messages)
      ? body.messages
      : [];

    if (messages.length === 0 || messages.length > MAX_MESSAGES) {
      return res.status(400).json({
        error: 'Invalid message history.',
      });
    }

    for (const message of messages) {
      if (
        !['user', 'assistant'].includes(message.role) ||
        typeof message.content !== 'string'
      ) {
        return res.status(400).json({
          error: 'Invalid message format.',
        });
      }

      if (message.content.length > MAX_MESSAGE_LENGTH) {
        return res.status(400).json({
          error: 'Message too long.',
        });
      }
    }

    const knowledgeBase = buildAiKnowledgeBase();

    const systemPrompt = `
You are "Ask Isra AI", a friendly AI assistant embedded in Isra Oun's developer portfolio.

Your job is to answer questions about Isra using ONLY the portfolio information provided below.

IMPORTANT RULES:
- Never invent skills, projects, experience, education, certifications, dates, or technologies.
- If the requested information is not available, clearly say that you don't have that information.
- If appropriate, suggest using the Contact section.
- Keep answers concise, around 2-4 sentences.
- Be friendly, professional, and helpful.
- You are speaking to recruiters, employers, and visitors.
- Do not claim that Isra has professional experience unless it is explicitly present in the knowledge base.

PORTFOLIO KNOWLEDGE BASE:

${knowledgeBase}
`;

    const ai = new GoogleGenAI({
      apiKey,
    });

    const contents = messages.map((message) => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [
        {
          text: message.content,
        },
      ],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',

      contents,

      config: {
        systemInstruction: systemPrompt,
        temperature: 0.4,
        maxOutputTokens: 300,
      },
    });

    const reply = response.text?.trim();

    if (!reply) {
      console.error('Gemini returned an empty response');

      return res.status(500).json({
        error: 'AI returned an empty response.',
      });
    }

    return res.status(200).json({
      reply,
    });
  } catch (error) {
    console.error('Unexpected /api/ask error:', error);

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    return res.status(500).json({
      error: 'Unexpected server error.',
      debug: message,
    });
  }
}