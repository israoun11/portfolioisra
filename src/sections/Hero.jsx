import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const contentRef = useRef(null)

  // A single deliberate GSAP moment: the hero copy drifts and softens as
  // the visitor scrolls away, tied directly to scroll position rather
  // than firing on its own.
  useEffect(() => {
    if (!contentRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: -18,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-center px-6 pb-16 pt-32 md:px-10">
      <div ref={contentRef} className="mx-auto w-full max-w-6xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          className="kicker mb-5 text-base md:text-lg"
        >
          
        </motion.p>

        <h1 className="mx-auto max-w-3xl overflow-hidden">
          <motion.span
            className="block font-display text-5xl tracking-tightest text-charcoal sm:text-6xl md:text-7xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
          >
            Isra Oun
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="mt-3 font-display text-xl italic text-burgundy md:text-2xl"
        >
          Full Stack JavaScript Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.19, 1, 0.22, 1] }}
          className="mx-auto mt-6 max-w-editorial text-base leading-relaxed text-charcoal/70 md:text-lg"
        >
          React, Next.js and Node.js, with a growing focus on AI integrations and
          interactive, three-dimensional interfaces — the sculpture behind this text
          is built from the same stack as the rest of the site.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.19, 1, 0.22, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <MagneticButton
            as="a"
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-sm text-cream"
          >
            See the work
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-7 py-3.5 text-sm text-charcoal"
          >
            Get in touch
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-charcoal/50 md:flex"
      >
        <span>Scroll — the sculpture begins to open</span>
        <span className="h-8 w-px bg-charcoal/30" />
      </motion.div>
    </section>
  )
}
