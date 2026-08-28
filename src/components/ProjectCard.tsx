import { motion } from 'framer-motion';
import type { Project } from '../types/portfolio';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6 }}
      className="card group flex flex-col overflow-hidden transition-shadow duration-300 hover:border-signal/60 hover:shadow-[0_20px_40px_-16px_rgba(232,163,172,0.35)]"
    >
      <div className="aspect-video overflow-hidden bg-canvas-raised">
        <img
          src={project.imageUrl}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-semibold">{project.title}</h3>
          {project.isPlaceholder && (
            <span className="shrink-0 rounded-full border border-canvas-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
              Placeholder
            </span>
          )}
        </div>

        <p className="text-sm text-ink-dim">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.technologies.map((t) => (
            <li key={t} className="rounded-md bg-canvas-raised px-2 py-0.5 font-mono text-[11px] text-signal">
              {t}
            </li>
          ))}
        </ul>

        {project.features.length > 0 && (
          <ul className="mt-4 space-y-1 text-xs text-ink-faint">
            {project.features.slice(0, 3).map((f) => (
              <li key={f}>· {f}</li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex gap-4 pt-5 text-sm">
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-signal hover:underline">
            GitHub →
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-signal hover:underline">
              Live demo →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}