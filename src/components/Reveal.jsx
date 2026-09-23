import { motion } from 'framer-motion'

/**
 * A single, consistent reveal treatment reused across sections, rather
 * than a different bespoke animation per block — the point is restraint.
 */
export default function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', style }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] }}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  )
}
