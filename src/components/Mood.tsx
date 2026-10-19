import { useEffect, useState } from 'react'
import { moods } from '../data'

const petals = [0, 72, 144, 216, 288]

export default function Mood() {
  const [mood, setMood] = useState('lavender')

  useEffect(() => {
    const root = document.documentElement
    if (mood === 'lavender') root.removeAttribute('data-mood')
    else root.setAttribute('data-mood', mood)
  }, [mood])

  return (
    <section className="mood" id="mood">
      <span className="mono rose">Make it yours</span>
      <h2 style={{ marginTop: 22 }}>
        Pick your <em>mood.</em>
      </h2>
      <div className="moodgrid">
        <div>
          <p style={{ maxWidth: '40ch' }}>Choose a palette and the whole portfolio changes with you. A good interface should feel a little personal.</p>
          <div className="swatches" role="group" aria-label="Choose a palette">
            {moods.map((m) => (
              <button key={m.id} aria-pressed={mood === m.id} onClick={() => setMood(m.id)}>
                <span className="dots" aria-hidden="true">
                  {m.colors.map((c) => (
                    <i key={c} style={{ background: c }}></i>
                  ))}
                </span>
                {m.name}
              </button>
            ))}
          </div>
          <p className="mono note">Tap a palette. Everything on this page follows.</p>
        </div>
        <div className="board" aria-hidden="true">
          <div className="bc b1 glass">
            <div className="aa">Aa</div>
            <small className="mono">Instrument Serif</small>
          </div>
          <div className="bc b2 glass">
            <div className="strip">
              <i style={{ background: 'var(--pur2)' }}></i>
              <i style={{ background: 'var(--pur)' }}></i>
              <i style={{ background: 'var(--rose)' }}></i>
              <i style={{ background: 'var(--peach)' }}></i>
            </div>
            <small className="mono">My palette</small>
          </div>
          <div className="bc b3 glass">
            <svg viewBox="0 0 100 100">
              {petals.map((a) => (
                <ellipse key={a} cx="50" cy="27" rx="11" ry="21" fill="var(--pur2)" opacity=".9" transform={`rotate(${a} 50 50)`} />
              ))}
              <circle cx="50" cy="50" r="9" fill="var(--rose)" />
            </svg>
          </div>
          <div className="bc b4 glass">
            <div className="script">Made with love, and a lot of CSS.</div>
            <small className="mono">Isra.</small>
          </div>
          <div className="stickers">
            <span>🌸 3D flower garden</span>
            <span>🧁 pastry brand sites</span>
            <span>✨ glass and gradients</span>
            <span>💜 soft palettes</span>
          </div>
        </div>
      </div>
    </section>
  )
}
