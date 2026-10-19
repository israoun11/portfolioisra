import creativeImg from '../assets/creative.jpg'

export function Why() {
  return (
    <section>
      <span className="mono rose">Why work with me</span>
      <h2 style={{ marginTop: 22 }}>
        You bring the idea. <em>I build it.</em>
      </h2>
      <div className="why">
        <div className="wc glass">
          <span className="mono rose">Teams and startups</span>
          <h3>
            For <em>products.</em>
          </h3>
          <p>A junior developer who ships complete features: interface, API, data and tests.</p>
          <div className="pills">
            <span>React</span>
            <span>TypeScript</span>
            <span>Node</span>
          </div>
          <a className="btn out" href="#contact">
            Hire me <span>→</span>
          </a>
        </div>
        <div className="wc glass">
          <span className="mono rose">Small businesses</span>
          <h3>
            For <em>brands.</em>
          </h3>
          <p>A fast, responsive site that shows your products clearly and works on every phone.</p>
          <div className="pills">
            <span>Storefronts</span>
            <span>Landing pages</span>
            <span>Responsive</span>
          </div>
          <a className="btn out" href="#contact">
            Start a project <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}


export function Systems() {
  return (
    <section id="systems">
      <span className="mono rose">What I’ve built</span>
      <h2 style={{ marginTop: 22 }}>
        Beyond the <em>interface.</em>
      </h2>
      <p style={{ color: 'var(--mute)' }}>The systems behind every screen.</p>
      <div className="sys">
        <div className="sc glass">
          <div>
            <span className="mono rose">React / TypeScript</span>
            <h3>Interfaces</h3>
            <p>Responsive component-based apps, with motion and 3D where it helps.</p>
          </div>
          <b>Frontend</b>
        </div>
        <div className="sc glass">
          <div>
            <span className="mono rose">Express / MongoDB</span>
            <h3>APIs and data</h3>
            <p>REST APIs with Zod validation, Atlas databases and image uploads.</p>
          </div>
          <b>Backend</b>
        </div>
        <div className="sc glass">
          <div>
            <span className="mono rose">Vitest / GitHub Actions</span>
            <h3>Tests and CI</h3>
            <p>Automated checks that run on every push, so changes stay safe.</p>
          </div>
          <b>Quality</b>
        </div>
      </div>
    </section>
  )
}
