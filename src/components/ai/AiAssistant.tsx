import { useRef, useState, useEffect, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { askAssistant, suggestedQuestions, AiAssistantError, type ChatMessage } from '../../services/ai';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm Ask Isra AI. Ask me anything about Isra's skills, projects, or availability — I only answer from her real portfolio info.",
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { id: makeId(), role: 'user', content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const reply = await askAssistant(nextMessages);
      setMessages((prev) => [...prev, { id: makeId(), role: 'assistant', content: reply }]);
    } catch (err) {
      const message =
        err instanceof AiAssistantError ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  function clearConversation() {
    setMessages([WELCOME]);
    setError(null);
  }

  return (
    <section id="ask-ai" className="container-xl py-24" aria-labelledby="ai-heading">
      <p className="section-eyebrow mb-3">Ask Isra AI</p>
      <h2 id="ai-heading" className="mb-3 text-3xl font-semibold sm:text-4xl">
        Talk to my portfolio
      </h2>
      <p className="mb-8 max-w-xl text-ink-dim">
        A small AI assistant grounded only in my real skills, projects and experience — ask it
        what a recruiter would want to know.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="card mx-auto flex max-w-2xl flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between border-b border-canvas-line px-5 py-3">
          <div className="flex items-center gap-2 font-mono text-xs text-ink-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
            Ask Isra AI
          </div>
          <button
            onClick={clearConversation}
            className="text-xs text-ink-faint transition-colors hover:text-signal"
          >
            Clear conversation
          </button>
        </div>

        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-label="Conversation with Ask Isra AI"
          className="flex h-96 flex-col gap-3 overflow-y-auto p-5"
        >
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>

        {error && (
          <p role="alert" className="border-t border-canvas-line px-5 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 border-t border-canvas-line px-5 py-3">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => void sendMessage(q)}
                className="rounded-full border border-canvas-line px-3 py-1 text-xs text-ink-dim transition-colors hover:border-signal hover:text-signal"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-canvas-line p-3">
          <label htmlFor="ai-input" className="sr-only">
            Ask a question about Isra
          </label>
          <input
            id="ai-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Isra's skills, projects, or availability…"
            className="flex-1 rounded-lg border border-canvas-line bg-canvas px-3.5 py-2.5 text-sm outline-none placeholder:text-ink-faint focus:border-signal"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </motion.div>
    </section>
  );
}