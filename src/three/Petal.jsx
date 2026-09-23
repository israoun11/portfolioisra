import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { getPetalGeometry, getGlyphGeometry } from './petalGeometry'
import { STAGE_ORDER, BREAKPOINTS } from './bloomStages'

const geometry = getPetalGeometry()
const glyphGeometry = getGlyphGeometry()

export default function Petal({ data, scrollRef, activeStageRef, skillLabel, reducedMotion, showGlyph }) {
  const pivotRef = useRef()
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [labelVisible, setLabelVisible] = useState(false)
  const target = useMemo(() => ({ radial: 0, open: 0, y: 0, scale: 0 }), [])

  useFrame((state, delta) => {
    const p = scrollRef.current
    let segment = 0
    for (let s = 0; s < BREAKPOINTS.length - 1; s++) {
      if (p >= BREAKPOINTS[s]) segment = s
    }
    const segStart = BREAKPOINTS[segment]
    const segEnd = BREAKPOINTS[segment + 1] ?? 1
    const localT = segEnd > segStart ? THREE.MathUtils.clamp((p - segStart) / (segEnd - segStart), 0, 1) : 0
    const eased = localT * localT * (3 - 2 * localT)

    const fromKey = STAGE_ORDER[segment]
    const toKey = STAGE_ORDER[Math.min(segment + 1, STAGE_ORDER.length - 1)]
    const from = data.stages[fromKey]
    const to = data.stages[toKey]

    target.radial = THREE.MathUtils.lerp(from.radial, to.radial, eased)
    target.open = THREE.MathUtils.lerp(from.open, to.open, eased)
    target.y = THREE.MathUtils.lerp(from.y, to.y, eased)
    target.scale = THREE.MathUtils.lerp(from.scale, to.scale, eased)

    if (skillLabel) {
      const wantVisible = toKey === 'garden' || fromKey === 'garden'
      if (wantVisible !== labelVisible) setLabelVisible(wantVisible)
    }

    const t = reducedMotion ? 0 : state.clock.elapsedTime
    const wobble = reducedMotion ? 0 : Math.sin(t * 0.5 + data.theta * 3) * 0.05
    const hoverBoost = hovered ? 1.18 : 1

    const radial = target.radial * hoverBoost
    const x = Math.cos(data.theta + wobble) * radial
    const z = Math.sin(data.theta + wobble) * radial
    const y = target.y + (reducedMotion ? 0 : Math.sin(t * 0.6 + data.theta) * 0.06)

    if (pivotRef.current) {
      const lerpFactor = Math.min(1, delta * 4.5)
      pivotRef.current.position.lerp(new THREE.Vector3(x, y, z), lerpFactor)
      pivotRef.current.rotation.y = THREE.MathUtils.lerp(pivotRef.current.rotation.y, data.theta, lerpFactor)
    }
    if (meshRef.current) {
      const lerpFactor = Math.min(1, delta * 4.5)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, target.open, lerpFactor)
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, data.zTilt, lerpFactor)
      const s = target.scale * hoverBoost
      meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), lerpFactor)
    }
  })

  return (
    <group ref={pivotRef}>
      <group
        ref={meshRef}
        onPointerOver={skillLabel ? () => setHovered(true) : undefined}
        onPointerOut={skillLabel ? () => setHovered(false) : undefined}
      >
        <mesh geometry={geometry} castShadow={false} receiveShadow={false}>
          <meshPhysicalMaterial
            color={data.color}
            roughness={0.22}
            metalness={0.05}
            clearcoat={0.6}
            clearcoatRoughness={0.25}
            iridescence={0.55}
            iridescenceIOR={1.25}
            iridescenceThicknessRange={[100, 380]}
            transmission={0.1}
            thickness={0.3}
            side={THREE.DoubleSide}
            emissive={hovered ? data.color : '#000000'}
            emissiveIntensity={hovered ? 0.25 : 0}
          />
        </mesh>
        {showGlyph && (
          <mesh geometry={glyphGeometry} position={[0, 0.65, 0.03]}>
            <meshStandardMaterial color="#2B1E23" transparent opacity={0.18} />
          </mesh>
        )}
      </group>

      {skillLabel && labelVisible && (
        <Html center distanceFactor={7} position={[0, 1.5, 0]} occlude={false}>
          <div
            className={`pointer-events-none select-none whitespace-nowrap rounded-full border px-3 py-1 font-sans text-[11px] tracking-wide transition-all duration-300 ${
              hovered
                ? 'scale-110 border-burgundy bg-burgundy text-cream opacity-100'
                : 'border-charcoal/15 bg-cream/90 text-charcoal/70 opacity-90'
            }`}
          >
            {skillLabel}
          </div>
        </Html>
      )}
    </group>
  )
}
