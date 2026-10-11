/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — the only file you need to edit for links
 * ─────────────────────────────────────────────────────────────
 */

export const CONTACT_EMAIL = 'Israoun00@gmail.com'

export const MAIL_SUBJECT = 'Let’s Work Together — Isra Oun'
export const LOCATION_LINE = 'Planet Earth · Remote friendly'

/** WhatsApp: display text + wa.me link (digits only, with country code). */
export const WHATSAPP_DISPLAY = '+216 23474833'
export const WHATSAPP_URL = 'https://wa.me/21623474833'

/** Put your real CV PDF at public/cv/Isra-Oun-CV.pdf (served as /cv/Isra-Oun-CV.pdf). */
export const CV_URL = '/cv/Isra-Oun-CV.pdf'

export const GITHUB_URL = 'https://github.com/israoun11'
export const PORTFOLIO_URL = 'https://portfolioisra-rho.vercel.app/'

export const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}`

export type Project = {
  id: string
  title: string
  kicker: string
  category: string
  description: string
  tags: string[]
  /** Live URL — null when there is no public deployment */
  live: string | null
  /** Public repository URL — null until you add a valid one */
  source: string | null
  status?: string
  palette: { sky: string; sky2: string; ground: string; accent: string }
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    category: 'Creative Development',
    title: 'Personal Developer Portfolio',
    kicker: 'My first world',
    description:
      'My developer portfolio: a place to show my skills, experiments and projects as I keep learning.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    live: PORTFOLIO_URL,
    source: null,
    palette: { sky: '#0f6b57', sky2: '#2ec4b6', ground: '#f6efe2', accent: '#d9a3b0' },
  },
  {
    id: 'maison',
    category: 'Brand & E-commerce',
    title: 'Maison D’Isra',
    kicker: 'Pastry & bakery',
    description:
      'A refined website for a pastry and bakery brand, built around a warm, elegant visual identity.',
    tags: ['React', 'Tailwind CSS', 'Responsive UI'],
    live: 'https://pastry-front.vercel.app/',
    source: null,
    palette: { sky: '#7a2338', sky2: '#d9a3b0', ground: '#f6efe2', accent: '#f1c27d' },
  },
  {
    id: 'foodly',
    category: 'Food & Web',
    title: 'Foodly',
    kicker: 'Food web project',
    description: 'A food-related web project focused on a clean, appetising browsing experience.',
    tags: ['React', 'JavaScript', 'Responsive UI'],
    live: 'https://foodly-kappa-blue.vercel.app/',
    source: null,
    palette: { sky: '#1d2326', sky2: '#2ec4b6', ground: '#e9f5ee', accent: '#f08a5d' },
  },
  {
    id: 'travel',
    category: 'E-commerce',
    title: 'Travel E-commerce Application',
    kicker: 'Frontend + backend',
    description:
      'A travel-products shop that combines a frontend with a backend. No public deployment yet — I’m happy to walk through it.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    live: null,
    source: null,
    status: 'Not deployed publicly yet',
    palette: { sky: '#3c2f5f', sky2: '#b9a7d6', ground: '#f6efe2', accent: '#2ec4b6' },
  },
]
