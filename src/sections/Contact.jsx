import { useState } from 'react'
import Reveal from '../components/Reveal'
import MagneticButton from '../components/MagneticButton'

const EMAIL = 'israoun55@gmail.com' // placeholder — replace with the real inbox before launch

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/israoun11', detail: 'github.com/israoun11' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/isra-oun-a54727407',
    detail: 'linkedin.com/in/isra-oun-a54727407',
  },
  { label: 'CV', href: '/cv.pdf', detail: 'Download the full CV' },
  {
    label: 'Portfolio',
    href: 'https://portfolioisra-rho.vercel.app/',
    detail: 'portfolioisra-rho.vercel.app',
  },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable — the email is still visible and selectable
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-40">
      <Reveal>
        <p className="kicker mb-4 text-lg">Let&apos;s talk</p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-tightest text-charcoal sm:text-5xl md:text-6xl">
          <span className="bloom-text italic">Let&apos;s create something.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <MagneticButton
          as="button"
          type="button"
          onClick={copyEmail}
          className="group inline-flex items-baseline gap-3 border-b border-charcoal/20 pb-2 font-display text-2xl text-charcoal transition-colors duration-300 hover:border-burgundy hover:text-burgundy sm:text-3xl"
        >
          {EMAIL}
          <span className="text-xs font-sans text-charcoal/40 group-hover:text-burgundy">
            {copied ? 'Copied' : 'Click to copy'}
          </span>
        </MagneticButton>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-charcoal/10 sm:grid-cols-2">
        {LINKS.map((link, i) => (
          <Reveal key={link.label} delay={0.05 * i} className="bg-paper/60">
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              data-cursor-hover
              className="group flex items-center justify-between gap-4 px-7 py-6 transition-colors duration-300 hover:bg-ivory"
            >
              <div>
                <p className="font-display text-lg text-charcoal">{link.label}</p>
                <p className="mt-1 text-xs text-charcoal/45">{link.detail}</p>
              </div>
              <span className="text-charcoal/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-burgundy">
                ↗
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
