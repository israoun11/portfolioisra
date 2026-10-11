import { lazy, useEffect, useRef, useState } from 'react'
import Defer from './Defer'
import { useIsMobile, useReducedMotion } from '../hooks/usePrefs'
import type { Phase } from './RobotScene'

const RobotScene = lazy(() => import('./RobotScene'))

export default function RobotSection() {
  const [phase, setPhase] = useState<Phase>('idle')
  const timer = useRef<number>()
  const still = useReducedMotion()
  const mobile = useIsMobile()
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const press = () => {
    if (phase !== 'idle') return
    setPhase('shaking')
    timer.current = window.setTimeout(() => setPhase('bloomed'), still ? 400 : 2600)
  }
  const reset = () => { window.clearTimeout(timer.current); setPhase('idle') }

  return (
    <section id="machine" className="section machine" aria-labelledby="machine-title">
      <div className="section-head light">
        <h2 id="machine-title">The Works-On-My-Machine Lab</h2>
        <p>A tiny robot developer. A very complicated machine. What could go wrong?</p>
      </div>
      <div className="machine-stage">
        <Defer label="Waking up the robot…">
          <RobotScene phase={phase} still={still} mobile={mobile} />
        </Defer>
        <div className="sign" aria-hidden="false">BUGS: 404 — SANITY NOT FOUND</div>
        <div className="bubble" role="status">
          {phase === 'idle' && <>“It works on my machine.”</>}
          {phase === 'shaking' && <>“Totally under control.” <em>(the machine is shaking)</em></>}
          {phase === 'bloomed' && <>A flower bloomed out of the computer. The robot looks at you.</>}
        </div>
        {phase === 'bloomed' && (
          <div className="sign sign-2">Have you tried turning the universe off and on again?</div>
        )}
        <p className="note">Works perfectly. Please do not touch anything.</p>
      </div>
      <div className="machine-actions">
        {phase === 'idle' && <button className="btn btn-primary" onClick={press}>Press the button anyway</button>}
        {phase === 'shaking' && <button className="btn btn-ghost" disabled>Pressing…</button>}
        {phase === 'bloomed' && <button className="btn btn-ghost" onClick={reset}>Restart the universe</button>}
      </div>
    </section>
  )
}
