import { lazy, useState } from 'react'
import Defer from './Defer'
import { useIsMobile, useReducedMotion } from '../hooks/usePrefs'

const GardenScene = lazy(() => import('./GardenScene'))

const stations = [
  {
    name: 'The Frontend Blossom',
    blurb: 'Where interfaces bloom: components, types and styles.',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Tailwind CSS'],
  },
  {
    name: 'The Mystery Portal',
    blurb: 'A curious lab behind the flowers, where data and servers come to life.',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    name: 'The Inventor’s Garden',
    blurb: 'Workflow tools I’m actively learning and using in my projects.',
    skills: ['Git & GitHub', 'GitHub Actions & CI/CD', 'Vitest & React Testing Library', 'Gemini API integration'],
  },
]

export default function Garden() {
  const [active, setActive] = useState<number | null>(null)
  const still = useReducedMotion()
  const mobile = useIsMobile()
  const s = active === null ? null : stations[active]
  return (
    <section id="garden" className="section garden" aria-labelledby="garden-title">
      <div className="section-head">
        <h2 id="garden-title">The Giant Flower Garden</h2>
        <p>Every flower is a family of skills. Tap or click one to make it bloom.</p>
      </div>
      <div className="garden-stage">
        <Defer label="Planting the garden…">
          <GardenScene active={active} onSelect={setActive} still={still} mobile={mobile} />
        </Defer>
      </div>
      <div className="garden-tabs" role="group" aria-label="Skill flowers">
        {stations.map((st, i) => (
          <button key={st.name} className={'tab' + (active === i ? ' on' : '')} aria-pressed={active === i} onClick={() => setActive(active === i ? null : i)}>
            {st.name}
          </button>
        ))}
      </div>
      <div className="garden-panel" aria-live="polite">
        {s ? (
          <>
            <h3>{s.name}</h3>
            <p>{s.blurb}</p>
            <ul className="chips">
              {s.skills.map((k) => <li key={k}>{k}</li>)}
            </ul>
          </>
        ) : (
          <p className="muted">Pick a flower to discover its technologies.</p>
        )}
      </div>
    </section>
  )
}
