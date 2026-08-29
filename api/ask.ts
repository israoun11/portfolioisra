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
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  const timestamps = (requestLog.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS
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
    // --------------------------------------------------
    // Method check
    // --------------------------------------------------

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');

      return res.status(405).json({
        error: 'Method not allowed',
      });
    }

    // --------------------------------------------------
    // Rate limiting
    // --------------------------------------------------

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

    // --------------------------------------------------
    // Gemini API key
    // --------------------------------------------------

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('Missing GEMINI_API_KEY');

      return res.status(500).json({
        error: 'AI assistant is not configured.',
      });
    }

    // --------------------------------------------------
    // Validate request body
    // --------------------------------------------------

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

    // --------------------------------------------------
    // Portfolio knowledge
    // --------------------------------------------------

    const knowledgeBase = buildAiKnowledgeBase();

    const systemInstruction = `
You are "Ask Isra AI", a friendly AI assistant embedded in Isra Oun's developer portfolio.

Your job is to answer questions about Isra using ONLY the portfolio information provided below.

IMPORTANT RULES:

- Never invent skills, projects, experience, education, certifications, dates, or technologies.
- Never claim professional experience unless it is explicitly stated in the portfolio knowledge base.
- If the information is not available, clearly say that you don't have that detail.
- When appropriate, suggest that the visitor use the Contact section.
- Keep answers concise, around 2-4 sentences.
- Be friendly, warm, professional, and helpful.
- You are speaking to recruiters, employers, and portfolio visitors.

PORTFOLIO KNOWLEDGE BASE:

${knowledgeBase}
`;

    // --------------------------------------------------
    // Build conversation
    // --------------------------------------------------

    const conversation = messages
      .map((message) => {
        const speaker =
          message.role === 'assistant'
            ? 'Assistant'
            : 'Visitor';

        return `${speaker}: ${message.content}`;
      })
      .join('\n\n');

    const latestMessage =
      messages[messages.length - 1].content;

    // --------------------------------------------------
    // Gemini Interactions API
    // --------------------------------------------------

    const ai = new GoogleGenAI({
      apiKey,
    });

    const interaction = await ai.interactions.create({
      model: 'gemini-3.6-flash',

      system_instruction: systemInstruction,

      input: `
Here is the conversation so far:

${conversation}

Answer the visitor's latest message:

${latestMessage}
      `.trim(),
    });

    // --------------------------------------------------
    // Extract response
    // --------------------------------------------------

    const reply = interaction.output_text?.trim();

    if (!reply) {
      console.error(
        'Gemini returned an empty response:',
        interaction
      );

      return res.status(500).json({
        error: 'AI returned an empty response.',
      });
    }

    // --------------------------------------------------
    // Success
    // --------------------------------------------------

    return res.status(200).json({
      reply,
    });
  } catch (error) {
    console.error(
      'Unexpected /api/ask error:',
      error
    );

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