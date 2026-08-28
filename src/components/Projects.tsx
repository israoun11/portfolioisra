import { useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';

const FILTERS = ['All', 'React', 'JavaScript', 'Node.js', 'MongoDB'] as const;
type Filter = (typeof FILTERS)[number];

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = useMemo(
    () =>
      filter === 'All' ? projects : projects.filter((p) => p.technologies.includes(filter)),
    [filter],
  );

  return (
    <section id="projects" className="container-xl py-24" aria-labelledby="projects-heading">
      <p className="section-eyebrow mb-3">Projects</p>
      <h2 id="projects-heading" className="mb-8 text-3xl font-semibold sm:text-4xl">
        Selected work
      </h2>

      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                active
                  ? 'border-signal bg-signal/10 text-signal'
                  : 'border-canvas-line text-ink-dim hover:text-ink'
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink-dim">No projects match this filter yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}