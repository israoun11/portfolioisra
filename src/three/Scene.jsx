import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import Petal from './Petal'
import Core from './Core'
import Bubbles from './Bubbles'
import Ribbons from './Ribbons'
import CameraRig from './CameraRig'
import { buildBloomStages, PETAL_COUNT_DESKTOP, PETAL_COUNT_MOBILE, SKILL_LABELS } from './bloomStages'
import { useIsMobile } from '../hooks/useIsMobile'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * The Blooming Code Sculpture — the portfolio's one original, recurring
 * visual symbol. A closed bud in the hero opens into a full bloom, its
 * petals later drifting out to become a "skill garden," then a project
 * gallery, before returning to a full bloom for the closing scene.
 */
export default function Scene() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const scrollRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const activeStageRef = useRef('bud')

  const count = isMobile ? PETAL_COUNT_MOBILE : PETAL_COUNT_DESKTOP
  const petals = useMemo(() => buildBloomStages(count), [count])

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isMobile || reducedMotion) return
    const onMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [isMobile, reducedMotion])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={isMobile ? [1, 1.4] : [1, 2]}
        camera={{ position: [0, 0.15, 7.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#F3E3E8', 5, 15]} />

        <ambientLight intensity={0.7} color="#FBF3EC" />
        <directionalLight position={[4, 5, 3]} intensity={1.15} color="#FFF6EE" />
        <directionalLight position={[-4, -1.5, -3]} intensity={0.45} color="#C9B6E4" />
        <pointLight position={[0, 0, 2]} intensity={0.5} color="#E3C79A" distance={6} />

        <Suspense fallback={null}>
          <CameraRig reducedMotion={reducedMotion} />
          <Core reducedMotion={reducedMotion} />

          {petals.map((data, i) => (
            <Petal
              key={i}
              data={data}
              scrollRef={scrollRef}
              activeStageRef={activeStageRef}
              skillLabel={i < SKILL_LABELS.length ? SKILL_LABELS[i] : null}
              reducedMotion={reducedMotion}
              showGlyph={i % 3 === 0}
            />
          ))}

          <Bubbles count={isMobile ? 5 : 11} reducedMotion={reducedMotion} mouseRef={mouseRef} />
          {!isMobile && <Ribbons reducedMotion={reducedMotion} />}

          <Sparkles
            count={isMobile ? 25 : 60}
            scale={[9, 7, 6]}
            size={2}
            speed={reducedMotion ? 0 : 0.2}
            opacity={0.4}
            color="#F1B8C4"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
