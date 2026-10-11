import { useState } from 'react'

const quotes = [
  'There are only 10 kinds of people: those who read binary and those who don’t.',
  'A bug is just a feature that hasn’t found its documentation yet.',
  'It’s not a bug. It’s a surprise flower.',
  'Real developers name their variables well… and their robots better.',
  'git commit -m "fixed it (probably)"',
]

/** A tiny, slightly hidden star near the planet. Click or press Enter. */
export default function EasterEgg() {
  const [i, setI] = useState<number | null>(null)
  return (
    <div className="egg">
      <button
        className="egg-star"
        aria-label="A tiny star. Tap to see what it says."
        onClick={() => setI((p) => (p === null ? 0 : (p + 1) % quotes.length))}
      >
        ✦
      </button>
      {i !== null && (
        <div className="egg-bubble" role="status">
          <strong>Secret star:</strong> {quotes[i]}
          <button className="egg-close" onClick={() => setI(null)} aria-label="Close secret message">×</button>
        </div>
      )}
    </div>
  )
}
