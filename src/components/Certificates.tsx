import { certificates } from '../data/portfolioData';

export function Certificates() {
  return (
    <section id="certificates" className="container-xl py-24" aria-labelledby="certificates-heading">
      <p className="section-eyebrow mb-3">Certificates</p>
      <h2 id="certificates-heading" className="mb-10 text-3xl font-semibold sm:text-4xl">
        Certifications
      </h2>

      <ul className="grid gap-4 sm:grid-cols-2">
        {certificates.map((c) => (
          <li
            key={c.title}
            className="card flex flex-col gap-1 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-signal/60 hover:shadow-[0_16px_32px_-16px_rgba(232,163,172,0.35)]"
          >
            <p className="font-medium">{c.title}</p>
            <p className="text-sm text-ink-dim">{c.organization}</p>
            <p className="font-mono text-xs text-ink-faint">{c.date}</p>
            {c.credentialUrl && (
              <a href={c.credentialUrl} className="mt-2 text-sm text-signal hover:underline">
                View credential
              </a>
            )}
            {c.isPlaceholder && (
              <span className="mt-2 w-fit rounded-full border border-canvas-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                Placeholder
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}