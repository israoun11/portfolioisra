import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { C, Flower, Gear } from './scene-parts'

export type Phase = 'idle' | 'shaking' | 'bloomed'

function Cable({ pts, color }: { pts: [number, number, number][]; color: string }) {
  const geo = useMemo(
    () => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p))), 32, 0.035, 6, false),
    [pts],
  )
  return (
    <mesh geometry={geo}>
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  )
}

function Machine({ phase, still }: { phase: Phase; still: boolean }) {
  const root = useRef<THREE.Group>(null)
  const head = useRef<THREE.Group>(null)
  const smoke = useRef<THREE.Group>(null)
  const bloom = useRef(0)
  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime
    if (root.current) {
      if (phase === 'shaking' && !still) {
        root.current.position.x = Math.sin(t * 60) * 0.05
        root.current.position.y = Math.abs(Math.sin(t * 47)) * 0.04
        root.current.rotation.z = Math.sin(t * 52) * 0.02
      } else {
        root.current.position.set(0, 0, 0)
        root.current.rotation.z = 0
      }
    }
    if (head.current) {
      const target = phase === 'bloomed' ? 0 : -0.7
      head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, target, 3, dt)
    }
    bloom.current = THREE.MathUtils.damp(bloom.current, phase === 'bloomed' ? 1 : 0, 3, dt)
    if (smoke.current && !still) {
      smoke.current.children.forEach((c, i) => {
        const p = (t * 0.4 + i * 0.33) % 1
        c.position.set(Math.sin(p * 6 + i) * 0.1, p * 1.2, 0)
        c.scale.setScalar(0.5 + p)
        ;((c as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = (1 - p) * (phase === 'shaking' ? 0.8 : 0.35)
      })
    }
  })
  return (
    <group ref={root}>
      {/* base */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[3.6, 0.5, 2]} />
        <meshStandardMaterial color={C.charcoal} roughness={0.7} />
      </mesh>
      <mesh position={[-1, 1.0, -0.2]}>
        <boxGeometry args={[1.2, 1.1, 1.2]} />
        <meshStandardMaterial color={C.emerald} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[1.1, 0.95, -0.2]}>
        <cylinderGeometry args={[0.45, 0.55, 0.9, 16]} />
        <meshStandardMaterial color={C.burgundy} roughness={0.5} metalness={0.3} />
      </mesh>
      <Gear position={[-1, 1.0, 0.45]} r={0.38} speed={phase === 'shaking' ? 4 : 0.5} animate={!still} />
      <Gear position={[1.1, 1.0, 0.4]} r={0.26} speed={phase === 'shaking' ? -5 : -0.7} color={C.turquoise} animate={!still} />
      {/* pipes and cables */}
      <mesh position={[0.05, 1.75, -0.2]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 2.3, 10]} />
        <meshStandardMaterial color={C.cream} metalness={0.4} roughness={0.4} />
      </mesh>
      <Cable color={C.pink} pts={[[-1.4, 0.5, 1], [-0.6, 0.15, 1.4], [0.2, 0.55, 1.2], [0.8, 0.2, 1.3], [1.5, 0.55, 1]]} />
      <Cable color={C.turquoise} pts={[[-1.6, 1.4, 0.3], [-1.9, 0.8, 0.9], [-1.2, 0.3, 1.3], [-0.2, 0.9, 1.0]]} />
      <Cable color={C.gold} pts={[[1.6, 1.3, 0.2], [2, 0.9, 0.8], [1.5, 0.3, 1.2], [0.6, 0.8, 1.0]]} />
      {/* desk + keyboard */}
      <mesh position={[0, 0.58, 0.55]}>
        <boxGeometry args={[1.5, 0.08, 0.6]} />
        <meshStandardMaterial color={C.cream} roughness={0.5} />
      </mesh>
      {/* flower growing out of the keyboard */}
      <Flower position={[0.55, 0.62, 0.55]} stemH={0.9} petals={7} petalColor={C.pink} petalColor2={C.burgundy} core={C.gold} open={phase === 'bloomed'} animate={!still} scale={0.55 + 0.001} />
      {/* monitor with error */}
      <group position={[0, 1.7, -0.9]} rotation={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.4, 0.9, 0.08]} />
          <meshStandardMaterial color={C.charcoal} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[1.25, 0.75]} />
          <meshStandardMaterial color="#3a0f1a" emissive={phase === 'bloomed' ? C.turquoise : '#ff5470'} emissiveIntensity={0.6} />
        </mesh>
        {[0.2, 0.05, -0.1, -0.25].map((y, i) => (
          <mesh key={i} position={[-0.25 + (i % 2) * 0.1, y, 0.06]}>
            <planeGeometry args={[0.6 - i * 0.08, 0.04]} />
            <meshBasicMaterial color={C.cream} />
          </mesh>
        ))}
      </group>
      {/* the button */}
      <mesh position={[-1.9, 0.52, 0.2]}>
        <cylinderGeometry args={[0.22, 0.26, 0.1, 18]} />
        <meshStandardMaterial color={C.gold} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-1.9, 0.62, 0.2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.08, 18]} />
        <meshStandardMaterial color="#ff5470" emissive="#ff5470" emissiveIntensity={0.5} />
      </mesh>
      {/* smoke */}
      <group ref={smoke} position={[1.1, 1.5, -0.2]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.14, 12, 10]} />
            <meshStandardMaterial color="#cfd6d8" transparent opacity={0.4} />
          </mesh>
        ))}
      </group>
      {/* the overconfident robot */}
      <group position={[0, 0.62, 0.55]}>
        <group position={[-0.45, 0, 0]} scale={0.9}>
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.45, 0.45, 0.35]} />
            <meshStandardMaterial color={C.cream} roughness={0.4} />
          </mesh>
          <group ref={head} position={[0, 0.75, 0]}>
            <mesh>
              <sphereGeometry args={[0.28, 20, 16]} />
              <meshStandardMaterial color={C.cream} roughness={0.35} />
            </mesh>
            <mesh position={[-0.1, 0.03, 0.24]}><sphereGeometry args={[0.06, 10, 8]} /><meshStandardMaterial color={C.charcoal} emissive={C.turquoise} emissiveIntensity={0.9} /></mesh>
            <mesh position={[0.1, 0.03, 0.24]}><sphereGeometry args={[0.06, 10, 8]} /><meshStandardMaterial color={C.charcoal} emissive={C.turquoise} emissiveIntensity={0.9} /></mesh>
            <mesh position={[0, 0.38, 0]}><cylinderGeometry args={[0.015, 0.015, 0.25, 6]} /><meshStandardMaterial color={C.charcoal} /></mesh>
            <mesh position={[0, 0.52, 0]}><sphereGeometry args={[0.05, 8, 8]} /><meshStandardMaterial color={C.pink} emissive={C.pink} emissiveIntensity={0.8} /></mesh>
          </group>
        </group>
      </group>
    </group>
  )
}


function FloatingWindows({ phase, still }: { phase: Phase; still: boolean }) {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!g.current || still) return
    g.current.rotation.y = clock.elapsedTime * (phase === 'shaking' ? 2.2 : 0.7)
  })
  return (
    <group ref={g} position={[0, 1.6, 0.4]}>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 2.3, Math.sin(i * 2) * 0.4, Math.sin(a) * 1.6]} rotation={[0, -a + Math.PI / 2, 0]}>
            <planeGeometry args={[0.7, 0.45]} />
            <meshStandardMaterial color="#0e3b3a" emissive={C.turquoise} emissiveIntensity={0.55} side={THREE.DoubleSide} />
          </mesh>
        )
      })}
    </group>
  )
}

function ErrorCreature({ phase, still }: { phase: Phase; still: boolean }) {
  const ref = useRef<THREE.Group>(null)
  const x = useRef(0)
  useFrame(({ clock }, dt) => {
    if (!ref.current) return
    const run = phase === 'bloomed' && !still
    if (phase === 'idle') x.current = 0
    if (run) x.current += dt * 1.8
    if (phase === 'bloomed' && still) x.current = 3.5
    ref.current.position.set(1.6 + x.current, 0.72 + Math.abs(Math.sin(clock.elapsedTime * 14)) * (run ? 0.08 : 0), 1.1)
    ref.current.visible = phase === 'bloomed' && x.current < 6
  })
  return (
    <group ref={ref} scale={0.9}>
      <mesh><sphereGeometry args={[0.14, 12, 10]} /><meshStandardMaterial color="#ff5470" emissive="#ff5470" emissiveIntensity={0.5} /></mesh>
      <mesh position={[0.06, 0.04, 0.11]}><sphereGeometry args={[0.03, 8, 8]} /><meshBasicMaterial color="#fff" /></mesh>
      <mesh position={[-0.06, 0.04, 0.11]}><sphereGeometry args={[0.03, 8, 8]} /><meshBasicMaterial color="#fff" /></mesh>
    </group>
  )
}

export default function RobotScene({ phase, still, mobile }: { phase: Phase; still: boolean; mobile: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 2.2, mobile ? 8.5 : 6.5], fov: 42 }}
      dpr={mobile ? [1, 1.5] : [1, 2]}
      frameloop={still ? 'demand' : 'always'}
      aria-hidden="true"
    >
      <color attach="background" args={['#0d1a1c']} />
      <fog attach="fog" args={['#0d1a1c', 9, 20]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 6, 5]} intensity={1.6} color="#fff1d6" />
      <pointLight position={[0, 2.5, 2]} intensity={10} color={C.turquoise} distance={10} />
      <group position={[0, -0.8, 0]}>
        <Machine phase={phase} still={still} />
        <FloatingWindows phase={phase} still={still} />
        <ErrorCreature phase={phase} still={still} />
      </group>
    </Canvas>
  )
}
