import { useEffect, useState } from 'react'
import { ArrowUpRight, Leaf } from 'lucide-react'

const links = [['The World', '#world'], ['Skills', '#skills'], ['Projects', '#projects'], ['About', '#about'], ['Contact', '#contact']]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 20)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={'nav' + (solid ? ' solid' : '')}>
      <a href="#top" className="nav-logo" aria-label="Isra Oun — back to top">
        <Leaf size={16} aria-hidden="true" /> <span>ISRA <em>OUN</em></span>
      </a>
      <nav aria-label="Main">
        <ul>{links.map(([t, h]) => <li key={h}><a href={h}>{t}</a></li>)}</ul>
      </nav>
      <a className="pill" href="#contact">Let’s talk <ArrowUpRight size={14} aria-hidden="true" /></a>
    </header>
  )
}
