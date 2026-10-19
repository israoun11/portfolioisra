import { useEffect, useRef, useState } from 'react'
import { EMAIL, cvUrl } from '../data'

type Line = { t: string; c?: string }

const jokes = [
  'It works on my machine.',
  'Why do developers like dark mode? Because light attracts bugs.',
  'A SQL query walks into a bar, sees two tables and asks: can I join you?',
  'There are 10 kinds of people: those who read binary and those who don’t.',
  'I would tell you a UDP joke, but you might not get it.',
]

const chips = ['help', 'whoami', 'skills', 'projects', 'joke', 'coffee', 'sudo hire isra']

function bloom() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const emojis = ['🌸', '💜', '✨', '🌷', '💻']
  for (let i = 0; i < 28; i++) {
    window.setTimeout(() => {
      const s = document.createElement('span')
      s.className = 'fl'
      s.textContent = emojis[i % emojis.length]
      s.style.left = Math.random() * 95 + 'vw'
      s.style.animationDuration = 2.6 + Math.random() * 1.6 + 's'
      document.body.appendChild(s)
      window.setTimeout(() => s.remove(), 4500)
    }, i * 90)
  }
}

function downloadCv() {
  const a = document.createElement('a')
  a.href = cvUrl
  a.download = 'Isra_Oun_CV_EN.pdf'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([{ t: 'Welcome to Isra’s world. Type help, or tap a command below.', c: 'hi' }])
  const [value, setValue] = useState('')
  const outRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const jokeIndex = useRef(0)

  useEffect(() => {
    const el = outRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((id) => window.clearTimeout(id))
  }, [])

  const add = (t: string, c?: string) => setLines((prev) => [...prev, { t, c }])
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }
  const say = (arr: string[], c?: string) => arr.forEach((t, i) => later(() => add(t, c), i * 80))

  const commands: Record<string, () => void> = {
    help: () =>
      say([
        'Commands:',
        '  whoami    who is Isra',
        '  skills    what I build with',
        '  projects  what I have built',
        '  contact   how to reach me',
        '  cv        download my CV',
        '  joke      a developer joke',
        '  coffee    fuel check',
        '  clear     clean the screen',
        '  sudo hire isra   try it',
      ]),
    whoami: () =>
      say([
        'Isra Oun, full-stack developer in Gabès, Tunisia.',
        'React and TypeScript on the front, Node and MongoDB behind it.',
        'Looking for junior roles and internships, remote welcome.',
      ]),
    skills: () =>
      say([
        'Frontend: React, TypeScript, Vite, Framer Motion, Three.js',
        'Backend:  Node.js, Express, MongoDB, Zod, Cloudinary',
        'Quality:  Vitest, Testing Library, GitHub Actions',
        'Toolkit:  Git, Vercel, Gemini API, OpenAI API',
      ]),
    projects: () =>
      say([
        '1. Maison D’Isra: pastry storefront',
        '2. Foodly: food web app',
        '3. Travel e-commerce: React, Express, MongoDB',
        '4. JobMatch: job-matching app',
        '5. Isra’s Digital Planet: 3D portfolio',
      ]),
    contact: () =>
      say([
        `email:    ${EMAIL}`,
        'whatsapp: +216 23 474 833',
        'github:   github.com/israoun11',
        'linkedin: linkedin.com/in/isra-oun-a54727407',
      ]),
    cv: () => {
      say(['Preparing Isra_Oun_CV_EN.pdf...'])
      downloadCv()
    },
    joke: () => {
      add(jokes[jokeIndex.current % jokes.length], 'hi')
      jokeIndex.current += 1
    },
    coffee: () =>
      say([
        'Brewing...',
        '   ( (',
        '    ) )',
        '  .______.',
        '  |      |]',
        '  \\      /',
        "   `----'",
        'Coffee ready. Bug count: unchanged. Mood: better.',
      ]),
    clear: () => setLines([]),
    'sudo hire isra': () => {
      say(['[sudo] checking skills...', 'React ............ ok', 'TypeScript ....... ok', 'Node + MongoDB ... ok', 'Tests ............ ok', 'Coffee level ..... low (refilling)'])
      later(() => {
        add('ACCESS GRANTED. Offer letter loading... 100%', 'ok')
        add(`Next step: ${EMAIL}`, 'ok')
        bloom()
      }, 650)
    },
  }

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ')
    if (!cmd) return
    add('isra@world ~ % ' + raw.trim(), 'cmd')
    if (Object.prototype.hasOwnProperty.call(commands, cmd)) commands[cmd]()
    else add('command not found: ' + cmd + '. Try help.')
  }

  return (
    <section id="fun">
      <span className="mono rose">Just for fun</span>
      <h2 style={{ marginTop: 22 }}>
        Talk to my <em>terminal.</em>
      </h2>
      <p style={{ color: 'var(--mute)', maxWidth: '44ch' }}>Type a command, or tap one. There is a secret one too, and it ends well for me.</p>
      <div className="term">
        <div className="tbar">
          <i></i>
          <i></i>
          <i></i>
          <span>isra@world</span>
        </div>
        <div className="tout" ref={outRef} role="log" aria-live="polite">
          {lines.map((l, i) => (
            <div key={i} className={'tl' + (l.c ? ' ' + l.c : '')}>
              {l.t}
            </div>
          ))}
        </div>
        <div className="tin">
          <b>isra@world ~ %</b>
          <input
            type="text"
            aria-label="Type a command"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="type help"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                run(value)
                setValue('')
              }
            }}
          />
        </div>
        <div className="tchips">
          {chips.map((c) => (
            <button key={c} className={c.startsWith('sudo') ? 'hot' : undefined} onClick={() => run(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
