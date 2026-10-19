import { useState } from 'react'
import cardImg from '../assets/card.jpg'

export default function About() {
  const [on, setOn] = useState(false)
  return (
    <section className="about" id="about">
      <span className="mono rose">About Isra</span>
      <h2 style={{ marginTop: 22 }}>
        Building things from <em>scratch.</em>
      </h2>
      <div className="about3">
        <div>
          <h3>Hi, I’m Isra.</h3>
          <p>I’m a full-stack developer with a MERN stack, TypeScript and a habit of shipping: more than 30 practice projects and several complete apps built end to end.</p>
          <p>My real education came from building things from scratch.</p>
          <p>I care about interfaces that feel good to use and code that has tests behind it, from the React screen to the Express API and the database.</p>
          <a className="btn out" href="https://github.com/israoun11">
            GitHub <span>↗</span>
          </a>
        </div>
        <div className="idwrap">
          <button className={'flip' + (on ? ' on' : '')} onClick={() => setOn((v) => !v)} aria-label="Flip the developer ID card">
            <div className="clip">
              <i></i>
            </div>
            <div className="in">
              <div className="face front">
                <div className="fhead">
                  <span className="mono">Developer ID</span>
                  <span>✳</span>
                </div>
                <div className="fph">
                  <img src={cardImg} alt="Isra Oun" />
                  <div className="stick">
                    LET’S
                    <br />
                    BUILD
                  </div>
                </div>
                <div className="fbody">
                  <h3>Isra Oun</h3>
                  <p>Full-stack developer</p>
                </div>
                <div className="kv">
                  <span>Based in</span>
                  <b>Gabès</b>
                  <span>Stack</span>
                  <b>MERN + TS</b>
                </div>
                <div className="code">
                  <div className="bar"></div>
                  <i>Isra.</i>
                </div>
                <div className="hint mono">Hover or tap to flip ↻</div>
              </div>
              <div className="face back">
                <span className="mono">The code behind the story</span>
                <div className="badge">
                  <b>✳</b>
                </div>
                <h3>Code that connects.</h3>
                <ul>
                  <li>Full-stack developer</li>
                  <li>React and TypeScript</li>
                  <li>Node, Express and MongoDB</li>
                  <li>Tests with Vitest</li>
                  <li>CI with GitHub Actions</li>
                </ul>
                <i className="sg">Isra.</i>
              </div>
            </div>
          </button>
          <span className="cap mono">A little personality. A lot of code.</span>
        </div>
        <div className="afacts">
      <div className="mono rose alabel">
        A little more about me
      </div>
      <div className="facts">
        <div>
          Based in<b>Gabès, Tunisia</b>
        </div>
        <div>
          Languages<b>Arabic, English, French</b>
        </div>
        <div>
          Focus<b>React and TypeScript</b>
        </div>
        <div>
          Looking for<b>Junior roles, remote OK</b>
        </div>
      </div>
      <span className="q">“Clean code that works, and interfaces people enjoy.”</span>
        </div>
      </div>
    </section>
  )
}
