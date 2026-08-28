import { motion } from 'framer-motion';
import { timeline } from '../data/portfolioData';
import { StatusCard } from './StatusCard';

export function Timeline() {
  return (
    <section className="container-xl py-24" aria-labelledby="timeline-heading">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="section-eyebrow mb-3">Learning Journey</p>
          <h2 id="timeline-heading" className="mb-10 text-3xl font-semibold sm:text-4xl">
            How I got here
          </h2>

          <ol className="relative border-l border-canvas-line pl-6">
            {timeline.map((entry, i) => (
              <motion.li
                key={`${entry.period}-${entry.title}`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="mb-8 last:mb-0"
              >
                <span
                  className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-canvas bg-signal"
                  aria-hidden
                />
                <p className="font-mono text-xs uppercase tracking-wide text-signal">{entry.period}</p>
                <p className="mt-1 font-medium">{entry.title}</p>
                {entry.description && (
                  <p className="mt-1 text-sm text-ink-dim">{entry.description}</p>
                )}
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="flex items-start">
          <StatusCard />
        </div>
      </div>
    </section>
  );
}