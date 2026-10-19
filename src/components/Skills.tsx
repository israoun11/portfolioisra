import { useState } from 'react'
import { filters, skills } from '../data'

export default function Skills() {
  const [filter, setFilter] = useState('All')
  const list = skills.filter((s) => filter === 'All' || s.group === filter)
  const [first, ...rest] = list

  return (
    <section id="skills">
      <span className="mono rose">Expertise</span>
      <h2 style={{ marginTop: 22 }}>
        Stack meets <em>craft.</em>
      </h2>
      <div className="tabs" role="group" aria-label="Filter expertise">
        {filters.map((f) => (
          <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <div className="skwrap">
        <div className="grid">
          {rest.map((s) => (
            <div className="sk" key={s.name}>
              <span>→</span>
              <div>
                <div className="ini">{s.ini}</div>
                <b>{s.name}</b>
              </div>
            </div>
          ))}
        </div>
        {first && (
          <div className="feat glass">
            <span className="mono">The craft behind the code</span>
            <div className="badge">
              <b>✳</b>
            </div>
            <div>
              <div className="ini">{first.ini}</div>
              <h3>{first.name}</h3>
              <p>{first.desc}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
