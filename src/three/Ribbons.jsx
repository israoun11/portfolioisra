import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function seededRandom(seed) {
  let t = seed
  return function () {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function buildRibbonGeometry(seed, radius) {
  const rand = seededRandom(seed)
  const points = []
  for (let i = 0; i < 6; i++) {
    const t = i / 5
    points.push(
      new THREE.Vector3(
        Math.sin(t * Math.PI * 2 + rand() * 2) * radius,
        (t - 0.5) * 3 + (rand() - 0.5) * 0.6,
        Math.cos(t * Math.PI * 1.5 + rand() * 2) * radius * 0.6
      )
    )
  }
  const curve = new THREE.CatmullRomCurve3(points)
  return new THREE.TubeGeometry(curve, 64, 0.02, 6, false)
}

const RIBBONS = [
  { seed: 91, radius: 3.4, color: '#6E2140' },
  { seed: 53, radius: 4.1, color: '#E3C79A' },
]

export default function Ribbons({ reducedMotion }) {
  const groupRef = useRef()
  const geometries = useMemo(() => RIBBONS.map((r) => buildRibbonGeometry(r.seed, r.radius)), [])

  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) return
    groupRef.current.rotation.y += delta * 0.03
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
  })

  return (
    <group ref={groupRef}>
      {RIBBONS.map((r, i) => (
        <mesh key={r.seed} geometry={geometries[i]}>
          <meshStandardMaterial color={r.color} roughness={0.3} metalness={0.4} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  )
}
