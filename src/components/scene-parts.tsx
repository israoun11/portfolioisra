import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const C = {
  emerald: '#0f6b57',
  emeraldLight: '#1fa38a',
  turquoise: '#2ec4b6',
  cream: '#f6efe2',
  charcoal: '#1d2326',
  burgundy: '#7a2338',
  pink: '#d9a3b0',
  lavender: '#b9a7d6',
  gold: '#f1c27d',
}

/** Floating island: grassy top + inverted rock cone, with tiny structures. */
export function Island({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  speed = 0.6,
  phase = 0,
  still = false,
  children,
}: {
  position?: [number, number, number]
  scale?: number
  speed?: number
  phase?: number
  still?: boolean
  children?: React.ReactNode
}) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (still || !ref.current) return
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * speed + phase) * 0.12
  })
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, -0.95, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[1.5, 1.9, 7]} />
        <meshStandardMaterial color="#3a3f45" roughness={0.95} flatShading />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[1.55, 1.45, 0.28, 24]} />
        <meshStandardMaterial color={C.emeraldLight} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[1.35, 1.5, 0.1, 24]} />
        <meshStandardMaterial color={C.emerald} roughness={0.9} />
      </mesh>
      {children}
    </group>
  )
}

export function Crystal({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  color = C.turquoise,
}) {
  return (
    <mesh position={position} scale={scale}>
      <octahedronGeometry args={[0.25, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} roughness={0.2} flatShading />
    </mesh>
  )
}

export function Tower({ position = [0, 0, 0] as [number, number, number], h = 0.9 }) {
  return (
    <group position={position}>
      <mesh position={[0, h / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.16, h, 8]} />
        <meshStandardMaterial color={C.cream} roughness={0.5} />
      </mesh>
      <mesh position={[0, h + 0.12, 0]}>
        <coneGeometry args={[0.2, 0.34, 8]} />
        <meshStandardMaterial color={C.turquoise} emissive={C.turquoise} emissiveIntensity={0.35} />
      </mesh>
    </group>
  )
}

/** Soft cloud = cluster of white spheres. No external textures. */
export function CloudPuff({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  opacity = 0.9,
  drift = 0,
}) {
  const ref = useRef<THREE.Group>(null)
  const blobs = useMemo(
    () => [
      [0, 0, 0, 1],
      [0.9, -0.1, 0.1, 0.75],
      [-0.9, -0.15, 0, 0.7],
      [0.4, 0.35, -0.1, 0.65],
      [-0.4, 0.3, 0.1, 0.6],
    ],
    [],
  )
  useFrame(({ clock }) => {
    if (!drift || !ref.current) return
    ref.current.position.x = position[0] + Math.sin(clock.elapsedTime * 0.1 * drift) * 0.6
  })
  return (
    <group ref={ref} position={position} scale={scale}>
      {blobs.map((b, i) => (
        <mesh key={i} position={[b[0], b[1], b[2]]} scale={[b[3] * 1.2, b[3] * 0.7, b[3]]}>
          <sphereGeometry args={[0.8, 16, 12]} />
          <meshStandardMaterial color="#fff8ee" transparent opacity={opacity} roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * A giant flower. `open` 0 → closed, 1 → fully bloomed (animated smoothly).
 */
export function Flower({
  position = [0, 0, 0] as [number, number, number],
  petals = 9,
  petalColor = C.turquoise,
  petalColor2 = C.emerald,
  core = C.gold,
  stemH = 2.2,
  open = false,
  animate = true,
  scale = 1,
}: {
  position?: [number, number, number]
  petals?: number
  petalColor?: string
  petalColor2?: string
  core?: string
  stemH?: number
  open?: boolean
  animate?: boolean
  scale?: number
}) {
  const tilts = useRef<THREE.Group[]>([])
  const head = useRef<THREE.Group>(null)
  const amount = useRef(0)
  useFrame(({ clock }, dt) => {
    const target = open ? 1 : 0.25
    amount.current = animate ? THREE.MathUtils.damp(amount.current, target, 4, dt) : target
    const a = amount.current
    tilts.current.forEach((g, i) => {
      if (!g) return
      const inner = i % 2 === 1
      g.rotation.x = -(1.35 - a * (inner ? 0.75 : 1.05))
    })
    if (head.current) {
      head.current.scale.setScalar(0.9 + a * 0.2)
      if (animate) head.current.rotation.y = clock.elapsedTime * 0.12
    }
  })
  const list = Array.from({ length: petals * 2 }, (_, i) => i)
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, stemH / 2, 0]}>
        <cylinderGeometry args={[0.07, 0.12, stemH, 10]} />
        <meshStandardMaterial color="#14705a" roughness={0.8} />
      </mesh>
      <mesh position={[0.35, stemH * 0.35, 0]} rotation={[0, 0, -0.9]} scale={[1, 0.15, 0.5]}>
        <sphereGeometry args={[0.6, 14, 10]} />
        <meshStandardMaterial color="#1a8b6f" roughness={0.7} />
      </mesh>
      <group ref={head} position={[0, stemH, 0]}>
        {list.map((i) => {
          const inner = i >= petals
          const idx = inner ? i - petals : i
          const angle = (idx / petals) * Math.PI * 2 + (inner ? Math.PI / petals : 0)
          return (
            <group key={i} rotation={[0, angle, 0]}>
              <group ref={(g) => { if (g) tilts.current[i] = g }}>
                <mesh position={[0, 0, inner ? 0.55 : 0.85]} scale={[inner ? 0.32 : 0.42, 0.07, inner ? 0.62 : 0.95]}>
                  <sphereGeometry args={[1, 18, 12]} />
                  <meshStandardMaterial
                    color={inner ? petalColor : petalColor2}
                    emissive={inner ? petalColor : petalColor2}
                    emissiveIntensity={inner ? 0.25 : 0.08}
                    roughness={0.35}
                    metalness={0.15}
                  />
                </mesh>
              </group>
            </group>
          )
        })}
        <mesh position={[0, 0.02, 0]}>
          <sphereGeometry args={[0.32, 20, 16]} />
          <meshStandardMaterial color={core} emissive={core} emissiveIntensity={0.5} roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}

export function Gear({
  position = [0, 0, 0] as [number, number, number],
  r = 0.4,
  speed = 0.6,
  color = C.gold,
  animate = true,
}) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (animate && ref.current) ref.current.rotation.z += dt * speed
  })
  const teeth = 10
  return (
    <group ref={ref} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[r, r, 0.12, 24]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} />
      </mesh>
      {Array.from({ length: teeth }, (_, i) => {
        const a = (i / teeth) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * r, Math.sin(a) * r, 0]} rotation={[0, 0, a]}>
            <boxGeometry args={[r * 0.35, r * 0.28, 0.12]} />
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.35} />
          </mesh>
        )
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.01]}>
        <cylinderGeometry args={[r * 0.3, r * 0.3, 0.16, 16]} />
        <meshStandardMaterial color={C.charcoal} />
      </mesh>
    </group>
  )
}
