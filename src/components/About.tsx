import { WorldArt } from './Art'
import SlotImage from './SlotImage'

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="about-img">
        <img src='https://public.readdy.ai/ai/img_res/f647d2ec53d97f24498427202c78b7de.jpg' alt="A cosy floating workshop with a small robot and a glowing flower"  />
      </div>
      <div className="about-copy">
        <p className="eyebrow">About Isra</p>
        <h2 id="about-title" className="h-big">Equal parts engineer and daydreamer.</h2>
        <p>I’m Isra, a junior full-stack developer who loves turning ideas into interactive digital experiences. I build interfaces with React and TypeScript, and the systems behind them with Node.js, Express and MongoDB.</p>
        <p>My days move between two worlds: the precision of TypeScript and clean architecture, and the playfulness of animation, atmosphere and tiny delightful details. I care about accessibility and the small moments that make people smile.</p>
        <p>I’m curious, committed and always learning — and ready to contribute to a team.</p>
      </div>
    </section>
  )
}
