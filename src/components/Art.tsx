/* Original SVG artwork (placeholders for the Readdy images — replace via /public/assets/readdy/) */

export function FlowerArt({ petal, petal2, core, glow, n = 9 }: { petal: string; petal2: string; core: string; glow: string; n?: number }) {
  const id = Math.random().toString(36).slice(2, 7)
  return (
    <svg viewBox="0 0 400 300" className="flower-art" aria-hidden="true">
      <defs>
        <radialGradient id={`bg${id}`} cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor={glow} stopOpacity="0.55" /><stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`p${id}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={petal2} /><stop offset="1" stopColor={petal} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#bg${id})`} />
      {[[60, 60], [340, 50], [90, 200], [320, 190], [200, 25], [370, 130], [30, 130]].map(([x, y], i) => (
        <circle key={i} className="twinkle" style={{ animationDelay: `${i * 0.4}s` }} cx={x} cy={y} r={i % 2 ? 2 : 3} fill={petal} />
      ))}
      <g className="petals">
        {Array.from({ length: n }, (_, i) => (
          <ellipse key={i} className="petal" style={{ '--r': `${(360 / n) * i}deg` } as React.CSSProperties} cx="200" cy="82" rx="26" ry="62" fill={`url(#p${id})`} opacity={i % 2 ? 0.75 : 0.95} />
        ))}
        {Array.from({ length: n }, (_, i) => (
          <ellipse key={'b' + i} className="petal petal-in" style={{ '--r': `${(360 / n) * i + 360 / n / 2}deg` } as React.CSSProperties} cx="200" cy="108" rx="16" ry="38" fill={petal} opacity="0.9" />
        ))}
      </g>
      <circle cx="200" cy="145" r="20" fill={core} />
      <circle cx="200" cy="145" r="30" fill={core} opacity="0.25" />
    </svg>
  )
}

/** Dark, misty archipelago banner (placeholder for the "Welcome to my world" image). */
export function WorldArt({ warm = false }: { warm?: boolean }) {
  return (
    <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" className="world-art" aria-hidden="true">
      <defs>
        <linearGradient id="wsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={warm ? '#2d5d3a' : '#243f48'} /><stop offset="0.6" stopColor={warm ? '#1c3b2a' : '#14282f'} /><stop offset="1" stopColor="#0c171a" />
        </linearGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="14" /></filter>
        <filter id="blur2"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <rect width="1200" height="560" fill="url(#wsky)" />
      <g filter="url(#blur)" fill={warm ? '#f6d98a' : '#9cc6c9'} opacity="0.35">
        <ellipse cx="260" cy="120" rx="260" ry="50" /><ellipse cx="880" cy="90" rx="320" ry="60" /><ellipse cx="600" cy="300" rx="420" ry="50" />
      </g>
      {/* far islands */}
      <g fill="#10242a" opacity="0.8" filter="url(#blur2)">
        <path d="M820 150 q60 -50 130 0 l-30 70 q-35 30 -70 0z" /><path d="M980 240 q40 -30 90 0 l-20 50 q-25 20 -50 0z" /><path d="M420 200 q40 -30 90 0 l-20 55 q-25 20 -50 0z" />
      </g>
      {/* tree island */}
      <g fill="#0a1519">
        <path d="M700 330 q120 -40 260 0 q-20 80 -100 130 q-30 40 -60 0 q-80 -40 -100 -130z" />
        <path d="M830 330 v-120 q-40 -30 -60 -80 q40 10 60 30 q-10 -50 20 -90 q10 50 10 90 q30 -30 70 -30 q-30 40 -60 70 v130z" />
      </g>
      <g fill="#0a1519">
        <path d="M120 400 q100 -40 220 0 q-20 70 -90 110 q-20 30 -50 0 q-60 -40 -80 -110z" />
        <path d="M330 380 q60 -20 120 0 q-10 50 -50 80 q-20 20 -30 0 q-30 -30 -40 -80z" />
      </g>
      <g fill={warm ? '#f6c85f' : '#4fd1c0'} opacity="0.9">
        <circle cx="900" cy="240" r="3" /><circle cx="760" cy="200" r="2" /><circle cx="330" cy="330" r="2.5" /><circle cx="540" cy="150" r="2" /><circle cx="1010" cy="170" r="2" />
      </g>
      <rect width="1200" height="560" fill="url(#wsky)" opacity="0.15" />
    </svg>
  )
}

export function HeroCharacterFallback() {
  return <img className="hero-char" src="/assets/character/hero-character.svg" alt="Placeholder illustration of Isra at her desk" />
}
