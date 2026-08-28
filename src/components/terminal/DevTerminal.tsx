import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { profile, links, projects, skills } from '../../data/portfolioData';

interface Line {
  id: number;
  type: 'input' | 'output';
  text: string;
}

const COMMANDS = ['help', 'about', 'projects', 'skills', 'github', 'contact', 'clear'] as const;

function runCommand(command: string): string {
  switch (command) {
    case 'help':
      return `Available commands:\n\n${COMMANDS.filter((c) => c !== 'clear').join('\n')}\nclear`;
    case 'about':
      return `${profile.name} — ${profile.role}\nBased in ${profile.location}.\n${profile.tagline}`;
    case 'projects':
      return projects.map((p) => `• ${p.title} — ${p.githubUrl}`).join('\n');
    case 'skills':
      return skills.map((g) => `${g.category}: ${g.skills.join(', ')}`).join('\n');
    case 'github':
      return links.github;
    case 'contact':
      return `Email: ${links.email}\nLinkedIn: ${links.linkedin}\nGitHub: ${links.github}`;
    case '':
      return '';
    default:
      return `command not found: ${command}\ntype "help" to see available commands`;
  }
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return idCounter;
}

export function DevTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { id: nextId(), type: 'output', text: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const command = input.trim().toLowerCase();

    if (command === 'clear') {
      setLines([]);
      setInput('');
      setHistory((h) => [...h, command]);
      setHistoryIndex(null);
      return;
    }

    const output = runCommand(command);
    setLines((prev) => [
      ...prev,
      { id: nextId(), type: 'input', text: input },
      ...(output ? [{ id: nextId(), type: 'output' as const, text: output }] : []),
    ]);
    setHistory((h) => [...h, input]);
    setHistoryIndex(null);
    setInput('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp' && history.length > 0) {
      e.preventDefault();
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === 'ArrowDown' && historyIndex !== null) {
      e.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  }

  return (
    <section className="container-xl py-24" aria-labelledby="terminal-heading">
      <p className="section-eyebrow mb-3">Optional</p>
      <h2 id="terminal-heading" className="mb-3 text-3xl font-semibold sm:text-4xl">
        Developer terminal
      </h2>
      <p className="mb-8 max-w-xl text-ink-dim">
        A small easter egg for fellow developers — try <code className="font-mono text-signal">help</code>.
      </p>

      <div className="card mx-auto max-w-2xl overflow-hidden font-mono text-sm">
        <div className="flex items-center gap-1.5 border-b border-canvas-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-signal/70" aria-hidden />
          <span className="ml-3 text-xs text-ink-faint">isra@portfolio: ~</span>
        </div>

        <div className="h-72 overflow-y-auto px-4 py-3" role="log" aria-live="polite">
          {lines.map((line) => (
            <pre key={line.id} className="mb-1 whitespace-pre-wrap break-words">
              {line.type === 'input' ? (
                <span>
                  <span className="text-signal">$ </span>
                  {line.text}
                </span>
              ) : (
                <span className="text-ink-dim">{line.text}</span>
              )}
            </pre>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-canvas-line px-4 py-2.5">
          <label htmlFor="terminal-input" className="sr-only">
            Terminal command input
          </label>
          <span className="text-signal" aria-hidden>
            $
          </span>
          <input
            id="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command…"
            className="flex-1 bg-transparent outline-none placeholder:text-ink-faint"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </section>
  );
}