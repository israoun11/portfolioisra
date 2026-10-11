import { motion } from 'framer-motion'
import { Code2, Compass, LayoutGrid } from 'lucide-react'
import EasterEgg from './EasterEgg'
import { useReducedMotion } from '../hooks/usePrefs'

const stats = [['+30', 'Projects built'], ['6', 'Live websites'], ['∞', 'Curiosity']]

export default function Hero() {
  const still = useReducedMotion()
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-inner">
        <motion.div className="hero-copy" initial={still ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="eyebrow">Full-Stack Developer</p>
          <h1 id="hero-title">ISRA <em>OUN</em></h1>
          <p className="hero-line">I build digital worlds, <em>one line of code</em> at a time.</p>
          <p className="hero-sub">Creative full-stack engineer crafting immersive, high-performance web experiences — from the first pixel to the last API call.</p>
          <div className="actions">
            <a className="btn btn-primary" href="#world"><Compass size={16} aria-hidden="true" /> Explore my world</a>
            <a className="btn btn-outline" href="#projects"><LayoutGrid size={16} aria-hidden="true" /> View my projects</a>
          </div>
          <dl className="hero-stats">
            {stats.map(([n, l]) => <div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}
          </dl>
        </motion.div>

        <figure className="hero-card">
          <span className="hero-tile" aria-hidden="true"><Code2 size={22} /></span>
          <div className="hero-window">
            <img
              src="/assets/readdy/hero.jpg"
              alt="Illustration of Isra, a developer, working at a desk on a floating island among giant flowers, with her cat"
              width={1170} height={1288} fetchPriority="high"
            />
            <figcaption className="hero-caption">
              <span>Station · Floating Isle 07</span>
              <strong>Building something wonderful right now</strong>
            </figcaption>
          </div>
        </figure>
      </div>
      <EasterEgg />
    </section>
  )
}
