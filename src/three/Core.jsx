import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'

/**
 * The sculpture's core — part seed, part digital organism. An icosahedron
 * (an original choice over the generic sphere/torus/cube) wrapped in a
 * faint wireframe lattice, standing in for "code" without depicting a
 * laptop or browser chrome. It breathes gently and never stops turning.
 */
export default function Core({ reducedMotion }) {
  const groupRef = useRef()
  const glowRef = useRef()

  useFrame((state, delta) => {
    if (reducedMotion) return
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.06
    }
    if (glowRef.current) {
      const pulse = 0.85 + Math.sin(t * 1.4) * 0.15
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshPhysicalMaterial
          color="#F7EFEA"
          roughness={0.15}
          metalness={0.1}
          clearcoat={1}
          iridescence={0.4}
          iridescenceIOR={1.3}
          transmission={0.5}
          thickness={0.6}
          transparent
          opacity={0.85}
        />
        <Edges scale={1.01} threshold={12} color="#B68B5C" />
      </mesh>
      <mesh ref={glowRef} scale={0.85}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#E3C79A" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}
