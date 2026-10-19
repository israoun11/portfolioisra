import { tools } from '../data'

export default function Marquee() {
  return (
    <div className="logos">
      <span className="mono">Tools I build with</span>
      <div className="track">
        {[...tools, ...tools].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  )
}
