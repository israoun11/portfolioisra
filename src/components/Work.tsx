import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { projects } from '../data'

function useMedia(query: string) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const fn = () => setMatch(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [query])
  return match
}

export default function Work() {
  const railRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const desktop = useMedia('(min-width: 1000px)')

  const onScroll = () => {
    if (desktop) return
    const rail = railRef.current
    if (!rail) return
    const center = rail.scrollLeft + rail.clientWidth / 2
    let best = 0
    let dist = Infinity
    Array.from(rail.children).forEach((child, i) => {
      const el = child as HTMLElement
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center)
      if (d < dist) {
        dist = d
        best = i
      }
    })
    setActive(best)
  }

  const go = (dir: number) => {
    if (desktop) {
      setActive((a) => Math.min(projects.length - 1, Math.max(0, a + dir)))
      return
    }
    const rail = railRef.current
    if (!rail || !rail.children[0]) return
    const w = (rail.children[0] as HTMLElement).offsetWidth + 16
    rail.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  const cardStyle = (i: number): CSSProperties | undefined => {
    if (!desktop) return undefined
    const off = i - active
    const abs = Math.abs(off)
    return {
      transform: `translateX(calc(-50% + ${off * 300}px)) translateY(${abs * 22}px) scale(${1 - abs * 0.12})`,
      opacity: abs > 2 ? 0 : 1 - abs * 0.18,
      zIndex: 10 - abs,
      pointerEvents: abs > 2 ? 'none' : 'auto',
    }
  }

  return (
    <section id="work">
      <span className="mono rose">Selected work</span>
      <div className="whead">
        <h2 style={{ marginTop: 20 }}>
          Projects that <em>work.</em>
        </h2>
        <p>Real apps, built end to end. Live links where a project is public.</p>
      </div>
      <div className={'rail' + (desktop ? ' cf' : '')} ref={railRef} onScroll={onScroll}>
        {projects.map((p, i) => (
          <article className="pc" key={p.name} style={cardStyle(i)} onClick={() => desktop && i !== active && setActive(i)}>
            <span className="mono">{p.name}</span>
            <div className="art" style={{ background: p.gradient }}>
              {p.initial}
              <a className="glass" href={p.href} target="_blank" rel="noreferrer">
                {p.label}
              </a>
            </div>
            <small className="mono">{p.category}</small>
            <h3>{p.name}</h3>
            <p>{p.text}</p>
          </article>
        ))}
      </div>
      <div className="nav">
        <button className="glass" onClick={() => go(-1)} aria-label="Previous project">
          ←
        </button>
        <div className="dots">
          {projects.map((p, i) => (
            <i key={p.name} className={i === active ? 'on' : ''}></i>
          ))}
        </div>
        <button className="glass" onClick={() => go(1)} aria-label="Next project">
          →
        </button>
      </div>
    </section>
  )
}
