import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Edges } from '@react-three/drei'
import * as THREE from 'three'
import { STAGE_ORDER, BREAKPOINTS } from './stages'

export default function Panel({ index, stages, scrollRef, mouseRef, highQuality, reducedMotion }) {
  const ref = useRef()
  const target = useMemo(() => new THREE.Object3D(), [])

  useFrame((_, delta) => {
    const p = scrollRef.current

    let segment = 0
    for (let s = 0; s < BREAKPOINTS.length - 1; s++) {
      if (p >= BREAKPOINTS[s]) segment = s
    }
    const segStart = BREAKPOINTS[segment]
    const segEnd = BREAKPOINTS[segment + 1] ?? 1
    const localT = segEnd > segStart ? THREE.MathUtils.clamp((p - segStart) / (segEnd - segStart), 0, 1) : 0
    const eased = localT * localT * (3 - 2 * localT)

    const from = stages[STAGE_ORDER[segment]][index]
    const to = stages[STAGE_ORDER[Math.min(segment + 1, STAGE_ORDER.length - 1)]][index]

    const parallaxX = reducedMotion ? 0 : mouseRef.current.y * 0.12
    const parallaxY = reducedMotion ? 0 : mouseRef.current.x * 0.12

    target.position.set(
      THREE.MathUtils.lerp(from.position[0], to.position[0], eased),
      THREE.MathUtils.lerp(from.position[1], to.position[1], eased),
      THREE.MathUtils.lerp(from.position[2], to.position[2], eased)
    )
    target.rotation.set(
      THREE.MathUtils.lerp(from.rotation[0], to.rotation[0], eased) + parallaxX,
      THREE.MathUtils.lerp(from.rotation[1], to.rotation[1], eased) + parallaxY,
      THREE.MathUtils.lerp(from.rotation[2], to.rotation[2], eased)
    )
    const s = THREE.MathUtils.lerp(from.scale, to.scale, eased)
    target.scale.set(s, s, s)

    if (ref.current) {
      const lerpFactor = Math.min(1, delta * (reducedMotion ? 8 : 4))
      ref.current.position.lerp(target.position, lerpFactor)
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, target.rotation.x, lerpFactor)
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, target.rotation.y, lerpFactor)
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, target.rotation.z, lerpFactor)
      ref.current.scale.lerp(target.scale, lerpFactor)
    }
  })

  return (
    <group ref={ref}>
      <RoundedBox args={[1, 1.4, 0.045]} radius={0.06} smoothness={highQuality ? 4 : 1}>
        <meshPhysicalMaterial
          color="#fbf8f4"
          transparent
          opacity={0.3}
          roughness={0.18}
          metalness={0.04}
          clearcoat={highQuality ? 1 : 0}
          clearcoatRoughness={0.15}
          side={THREE.DoubleSide}
        />
        <Edges scale={1.001} threshold={15} color="#a98456" />
      </RoundedBox>
    </group>
  )
}
