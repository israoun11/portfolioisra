import { motion } from 'framer-motion';
import { profile, links } from '../data/portfolioData';

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-grid pt-16"
      aria-label="Introduction"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,163,172,0.18),transparent_60%)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-signal/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-accent-violet/15 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="container-xl relative py-20">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-canvas-line px-3 py-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
          {profile.status}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 font-mono text-lg text-signal sm:text-xl"
        >
          {profile.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 max-w-xl text-base text-ink-dim sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <motion.a
            href="#projects"
            className="btn-primary"
            whileHover={{ y: -3, boxShadow: '0 12px 24px -8px rgba(232,163,172,0.5)' }}
            whileTap={{ y: 0 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href={links.github}
            className="btn-secondary"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
          >
            GitHub
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-secondary"
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
          >
            Contact Me
          </motion.a>
          {links.cvUrl && (
            <motion.a
              href={links.cvUrl}
              className="btn-secondary"
              download
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              Download CV
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  );
}