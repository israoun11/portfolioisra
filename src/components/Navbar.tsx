import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#activity', label: 'Activity' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-canvas-line/80 bg-canvas/80 backdrop-blur-md">
      <nav className="container-xl flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#home" className="font-mono text-sm font-medium text-signal">
          isra<span className="text-ink">.dev</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-ink-dim transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <a href="#ask-ai" className="btn-primary text-sm">
            Ask AI
          </a>
        </div>

        <button
          className="rounded-md p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
          <span className="mt-1 block h-0.5 w-5 bg-current" />
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-canvas-line px-5 pb-6 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-ink-dim hover:bg-canvas-raised hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between gap-4">
            <ThemeToggle />
            <a href="#ask-ai" onClick={() => setOpen(false)} className="btn-primary text-sm">
              Ask AI
            </a>
          </div>
        </div>
      )}
    </header>
  );
}