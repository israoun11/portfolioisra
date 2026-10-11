import { useState } from 'react'
import { Code2, Database, Sparkles } from 'lucide-react'
import { FlowerArt } from './Art'

const cards = [
  { n: '01', title: 'Frontend', sub: 'The Blooming Canopy', icon: Code2, tone: 'teal',
    art: { petal: '#9fe8de', petal2: '#1f8f7e', core: '#f1c27d', glow: '#2ec4b6', n: 10 },
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind CSS'] },
  { n: '02', title: 'Backend', sub: 'The Root Network', icon: Database, tone: 'rose',
    art: { petal: '#e0678f', petal2: '#5b1530', core: '#f6efe2', glow: '#b04d7a', n: 8 },
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'] },
  { n: '03', title: 'AI & Dev Tools', sub: 'The Wandering Spores', icon: Sparkles, tone: 'blue',
    art: { petal: '#b9c8ff', petal2: '#4a5fc1', core: '#d9a3b0', glow: '#7d8ff0', n: 9 },
    skills: ['Git & GitHub', 'GitHub Actions & CI/CD', 'Vitest & React Testing Library', 'Gemini API integration'] },
]
const marquee = ['React', 'TypeScript', 'Node.js', 'Tailwind', 'MongoDB', 'Express', 'Gemini API']

export default function Skills() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <h2 id="skills-title" className="h-big">Skills grown like giant flowers.</h2>
      <p className="lead">In this world, every ability is a flower. Three bloom the brightest — each with its own shape, glow and little constellation of tools.</p>
      <ul className="skill-grid">
        {cards.map((c, i) => {
          const Icon = c.icon
          const on = open === i
          return (
            <li key={c.title}>
              <button className={`skill-card ${c.tone}` + (on ? ' on' : '')} aria-expanded={on} onClick={() => setOpen(on ? null : i)}>
                <span className="skill-num" aria-hidden="true">{c.n}</span>
                <span className="skill-icon" aria-hidden="true"><Icon size={18} /></span>
                <FlowerArt {...c.art} />
                <span className="skill-label">
                  <small>{c.sub}</small>
                  <strong>{c.title}</strong>
                </span>
                <span className={'skill-chips' + (on ? ' show' : '')}>
                  {c.skills.map((s) => <span key={s}>{s}</span>)}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="marquee" aria-label="Main technologies">
        <ul>{[...marquee, ...marquee].map((m, i) => <li key={i} aria-hidden={i >= marquee.length}>{m} <b>✦</b></li>)}</ul>
      </div>
    </section>
  )
}
