import { useEffect, useState } from 'react'

const links: [string, string][] = [
  ['about', 'About'],
  ['work', 'Work'],
  ['skills', 'Expertise'],
  ['mood', 'Mood'],
  ['systems', 'Systems'],
  ['contact', 'Contact'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const els = links.map(([id]) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <header>
        <a className="logo" href="#top">
          <i>Io</i>Isra Oun
        </a>
        <nav className="dnav glass" aria-label="Main">
          {links.map(([id, label]) => (
            <a key={id} href={'#' + id} className={active === id ? 'on' : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div className="socials">
          <a href="https://github.com/israoun11" aria-label="GitHub" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <a href="https://linkedin.com/in/isra-oun-a54727407" aria-label="LinkedIn" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.63 4.74 6.05V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z" />
            </svg>
          </a>
        </div>
        <button className="menu-btn glass" onClick={() => setOpen(true)} aria-label="Open menu">
          Menu <span>☰</span>
        </button>
      </header>
      <div className={'menu' + (open ? ' open' : '')}>
        <button className="glass" onClick={() => setOpen(false)}>
          Close ✕
        </button>
        {links.map(([id, label]) => (
          <a key={id} href={'#' + id} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
