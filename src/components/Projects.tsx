import { ArrowUpRight, Github } from 'lucide-react'
import { projects, GITHUB_URL, type Project } from '../config/site'
import SlotImage from './SlotImage'

function Cover({ p }: { p: Project }) {
  const { sky, sky2, ground, accent } = p.palette
  const id = `c-${p.id}`
  return (
    <svg viewBox="0 0 400 240" className="proj-img" role="img" aria-label={`Illustrated cover for ${p.title}`}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={sky} /><stop offset="1" stopColor={sky2} /></linearGradient></defs>
      <rect width="400" height="240" fill={`url(#${id})`} />
      <rect x="70" y="40" width="260" height="150" rx="10" fill={ground} opacity="0.92" />
      <rect x="70" y="40" width="260" height="18" rx="9" fill={ground} />
      {[88, 96, 104].map((x, i) => <circle key={i} cx={x} cy="49" r="3" fill={accent} />)}
      <rect x="90" y="80" width="110" height="10" rx="5" fill={sky} />
      <rect x="90" y="100" width="80" height="7" rx="3" fill={sky} opacity="0.5" />
      <rect x="90" y="150" width="62" height="20" rx="10" fill={accent} />
      <circle cx="268" cy="120" r="40" fill={sky2} opacity="0.85" /><circle cx="268" cy="120" r="22" fill={accent} opacity="0.9" />
    </svg>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="head-row">
        <div>
          <h2 id="projects-title" className="h-big">Builds, shipped and still alive.</h2>
          <p className="lead">A few islands from the archipelago. Real products, real code, real care.</p>
        </div>
        <a className="text-link" href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> More on GitHub</a>
      </div>
      <ul className="proj-grid">
        {projects.map((p) => (
          <li key={p.id} className="proj">
            <div className="proj-media">
              <SlotImage srcs={[`/assets/projects/${p.id}.jpg`, `/assets/projects/${p.id}.png`]} alt={`${p.title} preview`} className="proj-img" lazy fallback={<Cover p={p} />} />
              <span className="proj-tag">{p.category}</span>
              <h3>{p.title}</h3>
            </div>
            <p>{p.description}</p>
            <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            <div className="proj-actions">
              {p.live ? <a className="btn btn-primary btn-sm" href={p.live} target="_blank" rel="noopener noreferrer">View project <ArrowUpRight size={14} aria-hidden="true" /></a> : <span className="proj-status">{p.status}</span>}
              {p.source && <a className="btn btn-ghost btn-sm" href={p.source} target="_blank" rel="noopener noreferrer">View source <Github size={14} aria-hidden="true" /></a>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
