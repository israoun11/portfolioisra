import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function seededRandom(seed) {
  let t = seed
  return function () {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const COLORS = ['#F1B8C4', '#C9B6E4', '#F7EFEA', '#F3C9A6']

export default function Bubbles({ count = 10, reducedMotion, mouseRef }) {
  const groupRef = useRef()

  const bubbles = useMemo(() => {
    const rand = seededRandom(777)
    return Array.from({ length: count }).map((_, i) => ({
      position: [(rand() - 0.5) * 8, (rand() - 0.5) * 5, (rand() - 0.5) * 5 - 1],
      size: 0.08 + rand() * 0.16,
      speed: 0.15 + rand() * 0.25,
      offset: rand() * Math.PI * 2,
      color: COLORS[i % COLORS.length],
    }))
  }, [count])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((mesh, i) => {
      const b = bubbles[i]
      if (!b) return
      mesh.position.y = b.position[1] + (reducedMotion ? 0 : Math.sin(t * b.speed + b.offset) * 0.4)
      mesh.position.x = b.position[0] + (reducedMotion ? 0 : Math.cos(t * b.speed * 0.7 + b.offset) * 0.25)
      if (!reducedMotion && mouseRef) {
        mesh.position.x += mouseRef.current.x * 0.15
        mesh.position.y += mouseRef.current.y * 0.1
      }
    })
  })

  return (
    <group ref={groupRef}>
      {bubbles.map((b, i) => (
        <mesh key={i} position={b.position}>
          <sphereGeometry args={[b.size, 16, 16]} />
          <meshPhysicalMaterial
            color={b.color}
            transparent
            opacity={0.28}
            roughness={0.05}
            metalness={0}
            transmission={0.4}
            thickness={0.4}
            clearcoat={1}
          />
        </mesh>
      ))}
    </group>
  )
}
