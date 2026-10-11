import { useEffect, useState } from 'react'
import { FileText, Github, Mail, MessageCircle, Send } from 'lucide-react'
import {
  CONTACT_EMAIL, CV_URL, GITHUB_URL, LOCATION_LINE, mailtoHref, WHATSAPP_DISPLAY, WHATSAPP_URL,
} from '../config/site'
import { WorldArt } from './Art'

/** The CV button only becomes active when the PDF really exists at CV_URL. */
function useCvAvailable() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    let alive = true
    fetch(CV_URL, { method: 'HEAD' })
      .then((r) => alive && setOk(r.ok && (r.headers.get('content-type') || '').includes('pdf')))
      .catch(() => alive && setOk(false))
    return () => { alive = false }
  }, [])
  return ok
}

export default function Contact() {
  const cv = useCvAvailable()
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact-panel">
        <div className="contact-bg" aria-hidden="true"><WorldArt /></div>
        <div className="contact-glow" aria-hidden="true" />
        <div className="contact-inner">
          <p className="eyebrow">Get in touch</p>
          <h2 id="contact-title" className="h-big">Let’s build your world next.</h2>
          <p className="lead">Have a project, an internship or a junior role in mind — or just a wild idea? Write to me. I’d love to hear about the world you want to build.</p>

          <div className="actions">
            <a className="btn btn-primary" href={mailtoHref}><Send size={16} aria-hidden="true" /> Send message</a>
            {cv ? (
              <a className="btn btn-outline" href={CV_URL} target="_blank" rel="noopener noreferrer"><FileText size={16} aria-hidden="true" /> My CV</a>
            ) : (
              <button className="btn btn-outline" disabled aria-disabled="true" title="CV coming soon"><FileText size={16} aria-hidden="true" /> My CV <small className="soon">coming soon</small></button>
            )}
          </div>

          <ul className="contact-list">
            <li>
              <span className="ci" aria-hidden="true"><Mail size={18} /></span>
              <span><small>Email</small><a href={mailtoHref}>{CONTACT_EMAIL}</a></span>
            </li>
            <li>
              <span className="ci" aria-hidden="true"><MessageCircle size={18} /></span>
              <span><small>WhatsApp</small><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Chat with Isra on WhatsApp, ${WHATSAPP_DISPLAY}`}>{WHATSAPP_DISPLAY}</a></span>
            </li>
            <li>
              <span className="ci" aria-hidden="true"><Github size={18} /></span>
              <span><small>GitHub</small><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">github.com/israoun11</a></span>
            </li>
          </ul>
          <p className="contact-note">{LOCATION_LINE}</p>
        </div>
      </div>
      <footer className="footer">© {new Date().getFullYear()} Isra Oun · Built with React, TypeScript and Three.js</footer>
    </section>
  )
}
