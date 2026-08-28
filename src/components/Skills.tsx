import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';

export function Skills() {
  return (
    <section id="skills" className="container-xl py-24" aria-labelledby="skills-heading">
      <p className="section-eyebrow mb-3">Skills</p>
      <h2 id="skills-heading" className="mb-10 text-3xl font-semibold sm:text-4xl">
        Toolkit
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="card p-5"
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-signal">
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-canvas-line px-2.5 py-1 text-xs text-ink-dim"
                >
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}