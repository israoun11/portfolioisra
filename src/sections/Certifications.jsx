import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SectionShell from '../components/SectionShell'
import { certifications } from '../data/certifications'

/**
 * "Floating Archive" — certificates as translucent documents that lift
 * and tilt on hover, rather than a flat list or grid of badges.
 */
export default function Certifications() {
  return (
    <SectionShell id="certificates" kicker="The floating archive" title="Kept, one document at a time.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: '1200px' }}>
        {certifications.map((cert, i) => (
          <Reveal as="div" key={`${cert.issuer}-${cert.title}`} delay={i * 0.05}>
            <DocumentCard cert={cert} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}

function DocumentCard({ cert }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -10, y: px * 14 })
  }

  const onMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, y: tilt.x !== 0 || tilt.y !== 0 ? -6 : 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 16 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`pearl-surface relative flex h-full min-h-[168px] flex-col justify-between rounded-2xl border p-6 ${
        cert.highlight ? 'border-burgundy/30' : 'border-charcoal/10'
      }`}
      data-cursor-hover
    >
      <div
        className="absolute right-5 top-5 h-2 w-2 rounded-full"
        style={{ background: cert.highlight ? '#6E2140' : '#C9B6E4' }}
      />
      <div>
        <p className="text-xs uppercase tracking-wide text-charcoal/45">{cert.issuer}</p>
        <p className="mt-2 font-display text-xl leading-snug text-charcoal">{cert.title}</p>
      </div>
      <p className="mt-4 text-xs text-charcoal/45">{cert.year}</p>
    </motion.div>
  )
}
