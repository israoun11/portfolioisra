import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import MagneticButton from '../components/MagneticButton'

const ACCENTS = {
  burgundy: { bg: '#6E2140', tint: '#F3E1E8' },
  gold: { bg: '#B68B5C', tint: '#F1E7D6' },
  rose: { bg: '#D98CA0', tint: '#F8E8ED' },
  charcoal: { bg: '#2B1E23', tint: '#EAE2E8' },
}

/**
 * A project is presented as a "floating browser exhibit" — tilting
 * gently toward the cursor like an object you're circling in a small
 * gallery — rather than a screenshot, since real product photography
 * isn't part of the brief.
 */
export default function ProjectCard({ project, index, reverse }) {
  const accent = ACCENTS[project.accent] ?? ACCENTS.burgundy
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -6, y: px * 8 })
  }
  const onMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <Reveal delay={0.05} className="border-t border-charcoal/10 py-16 first:border-t-0 md:py-20">
      <div className={`grid items-center gap-10 md:grid-cols-12 md:gap-8 ${reverse ? '' : ''}`}>
        <div className={`md:col-span-7 ${reverse ? 'md:order-2' : ''}`} style={{ perspective: '1400px' }}>
          <motion.div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: 'spring', stiffness: 140, damping: 14 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="group relative overflow-hidden rounded-2xl border border-charcoal/10 shadow-[0_25px_70px_-30px_rgba(43,30,35,0.4)]"
          >
            <div
              className="absolute inset-0"
              style={{ backgroundColor: accent.tint }}
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-2 border-b border-charcoal/10 bg-cream/60 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-charcoal/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-charcoal/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-charcoal/15" />
              <span className="ml-3 truncate rounded-full bg-cream px-3 py-1 text-xs text-charcoal/50">
                {project.live.replace('https://', '')}
              </span>
            </div>
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="relative flex aspect-[16/10] items-center justify-center overflow-hidden px-8"
            >
              <span
                className="font-display text-[22vw] italic leading-none md:text-[9rem]"
                style={{ color: accent.bg, opacity: 0.9 }}
              >
                {project.name.charAt(0)}
              </span>
            </a>
          </motion.div>
        </div>

        <div className={`md:col-span-5 ${reverse ? 'md:order-1' : ''}`}>
          <p className="kicker mb-3 text-base">{String(index + 1).padStart(2, '0')} — {project.tagline}</p>
          <h3 className="font-display text-3xl tracking-tightest text-charcoal md:text-4xl">{project.name}</h3>
          <p className="mt-4 max-w-editorial text-base leading-relaxed text-charcoal/70">
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="rounded-full border border-charcoal/12 px-3 py-1 text-xs text-charcoal/60">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center gap-5">
            <MagneticButton
              as="a"
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm text-cream"
            >
              Live demo
            </MagneticButton>
            <MagneticButton
              as="a"
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-charcoal/70 underline decoration-charcoal/20 underline-offset-4 hover:text-burgundy"
            >
              View code
            </MagneticButton>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
