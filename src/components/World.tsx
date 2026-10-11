import { lazy, useEffect, useRef, useState } from 'react'
import Defer from './Defer'
import { WorldArt } from './Art'
import SlotImage from './SlotImage'
import { useIsMobile, useReducedMotion } from '../hooks/usePrefs'
import type { Phase } from './RobotScene'

const RobotScene = lazy(() => import('./RobotScene'))

export default function World() {
  const [phase, setPhase] = useState<Phase>('idle')
  const timer = useRef<number>()
  const still = useReducedMotion()
  const mobile = useIsMobile()
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const press = () => {
    if (phase !== 'idle') return
    setPhase('shaking')
    timer.current = window.setTimeout(() => setPhase('bloomed'), still ? 400 : 2800)
  }
  const reset = () => { window.clearTimeout(timer.current); setPhase('idle') }

  return (
    <section id="world" className="world" aria-labelledby="world-title">
      <div className="world-banner">
        <SlotImage srcs={['/assets/readdy/world.jpg', '/assets/readdy/world.png']} alt="" className="world-art" fallback={<WorldArt />} />
        <div className="world-fade" aria-hidden="true" />
        <div className="world-copy">
          <p className="eyebrow">Welcome to my world</p>
          <h2 id="world-title" className="h-big">A whole universe built from curiosity, coffee and clean code.</h2>
          <p className="lead">Floating islands, giant flowers and one very confident robot. Scroll down — and please don’t touch anything.</p>
        </div>
      </div>

      <div className="robot-wrap">
        <div className="robot-stage">
          <Defer label="Waking up the robot…"><RobotScene phase={phase} still={still} mobile={mobile} /></Defer>
          <div className="robot-sign">BUGS: 404 — SANITY NOT FOUND</div>
          <p className="robot-note">Works perfectly. Please do not touch anything.</p>
          <div className="robot-bubble" role="status">
            {phase === 'idle' && <>“It works on my machine.”</>}
            {phase === 'shaking' && <>“Everything is under control.” <em>(the machine disagrees)</em></>}
            {phase === 'bloomed' && <>The computer became a flower. An error creature fled the scene.</>}
          </div>
          {phase === 'bloomed' && <div className="robot-sign robot-sign2">Have you tried turning the universe off and on again?</div>}
        </div>
        <div className="actions center">
          {phase === 'idle' && <button className="btn btn-primary" onClick={press}>Press the shiny button</button>}
          {phase === 'shaking' && <button className="btn btn-ghost" disabled>Pressing…</button>}
          {phase === 'bloomed' && <button className="btn btn-ghost" onClick={reset}>Restart the universe</button>}
        </div>
      </div>
    </section>
  )
}
