import heroImg from '../assets/hero.webp'

export default function Hero() {
  return (
    <section className="hero">
      <div className="row mono">
        <span>Welcome to my world</span>
        <span>Based in Gabès →</span>
      </div>
      <div className="tagwrap">
        <p className="tag">Built line by line.</p>
        <a className="lets" href="#contact">
          Let’s talk →
        </a>
      </div>
      <div className="stage">
        <div className="outline" aria-hidden="true">
          ISRA
        </div>
        <img className="portrait" src={heroImg} alt="Isra Oun" width={820} height={1214} />
        <div className="stat glass">
          <div>
            <b>30+</b>
            <span className="mono">Projects built</span>
          </div>
          <div>
            <b>5</b>
            <span className="mono">Featured</span>
          </div>
        </div>
        <span className="mono rose">Strategy into code</span>
      </div>
      <div className="copy">
        <span className="mono rose cl">Strategy into code</span>
        <h1>
          Full-stack developer building <em>digital worlds.</em>
        </h1>
        <p>React and TypeScript on the front, Node and MongoDB behind it. Open to junior roles and internships, remote welcome.</p>
        <a className="btn" href="#work">
          Explore my work <span>⟶</span>
        </a>
        <div className="foot mono">
          <span>Isra Oun / Portfolio</span>
          <span>Scroll to discover ↓</span>
        </div>
      </div>
    </section>
  )
}
