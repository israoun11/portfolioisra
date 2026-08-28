import { links } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-canvas-line py-8">
      <div className="container-xl flex flex-col items-center justify-between gap-3 text-sm text-ink-faint sm:flex-row">
        <p className="font-mono">© {new Date().getFullYear()} Isra Oun. Built with React &amp; TypeScript.</p>
        <div className="flex gap-4">
          <a href={links.github} className="hover:text-signal">
            GitHub
          </a>
          <a href={links.linkedin} className="hover:text-signal">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}