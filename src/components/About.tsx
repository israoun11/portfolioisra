import { motion } from 'framer-motion';
import { profile } from '../data/portfolioData';

export function About() {
  return (
    <section id="about" className="container-xl py-24" aria-labelledby="about-heading">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <p className="section-eyebrow mb-3">About</p>
        <h2 id="about-heading" className="text-3xl font-semibold sm:text-4xl">
          A developer who learns by building
        </h2>
        <p className="mt-5 leading-relaxed text-ink-dim">{profile.about}</p>
      </motion.div>
    </section>
  );
}