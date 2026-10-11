import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { C, CloudPuff, Crystal, Flower, Gear, Island } from './scene-parts'

type Pos = [number, number, number]

function Hit({ onSelect, label, children }: { onSelect: () => void; label: string; children: React.ReactNode }) {
  return (
    <group
      onClick={(e) => { e.stopPropagation(); onSelect() }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = '')}
      name={label}
    >
      {children}
    </group>
  )
}

/* Station 2 — the mystery portal lab */
function PortalLab({ active, still }: { active: boolean; still: boolean }) {
  const disc = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const k = useRef(0.4)
  useFrame(({ clock }, dt) => {
    k.current = THREE.MathUtils.damp(k.current, active ? 1 : 0.4, 4, dt)
    if (disc.current) {
      disc.current.scale.setScalar(0.8 + k.current * 0.25)
      ;(disc.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + k.current * 1.1
      if (!still) disc.current.rotation.z = clock.elapsedTime * 0.6
    }
    if (ring.current && !still) ring.current.rotation.z = -clock.elapsedTime * 0.25
  })
  return (
    <group>
      {/* mini flowers around */}
      <Flower position={[-1.1, 0.12, 0.5]} stemH={0.9} petals={6} petalColor={C.pink} petalColor2={C.burgundy} core={C.cream} open={active} animate={!still} scale={0.9} />
      <Flower position={[1.15, 0.12, 0.3]} stemH={1.2} petals={7} petalColor={C.lavender} petalColor2={C.emerald} open={active} animate={!still} scale={0.9} />
      {/* portal */}
      <group position={[0, 1.35, -0.2]}>
        <mesh ref={ring}>
          <torusGeometry args={[0.95, 0.11, 14, 48]} />
          <meshStandardMaterial color={C.charcoal} metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.78, 0.04, 10, 48]} />
          <meshStandardMaterial color={C.turquoise} emissive={C.turquoise} emissiveIntensity={1} />
        </mesh>
        <mesh ref={disc}>
          <circleGeometry args={[0.76, 32]} />
          <meshStandardMaterial color="#0b3b36" emissive={C.lavender} emissiveIntensity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <Gear position={[-0.9, 0.55, 0.9]} r={0.32} speed={0.9} animate={!still} />
      <Gear position={[-0.4, 0.4, 1.1]} r={0.22} speed={-1.3} color={C.pink} animate={!still} />
      <Gear position={[1.0, 0.5, 0.95]} r={0.28} speed={-0.7} color={C.turquoise} animate={!still} />
      <Crystal position={[-0.6, 0.35, -0.7]} scale={1.3} />
      <Crystal position={[0.7, 0.4, -0.8]} scale={1} color={C.lavender} />
      {/* tiny robots */}
      {[[-0.1, 0.3, 1.0], [0.5, 0.3, 0.7]].map((p, i) => (
        <Float key={i} speed={still ? 0 : 2} floatIntensity={0.25} rotationIntensity={0}>
          <group position={p as Pos} scale={0.8}>
            <mesh><boxGeometry args={[0.2, 0.2, 0.2]} /><meshStandardMaterial color={C.cream} /></mesh>
            <mesh position={[0, 0.17, 0]}><sphereGeometry args={[0.1, 12, 10]} /><meshStandardMaterial color={C.turquoise} emissive={C.turquoise} emissiveIntensity={0.7} /></mesh>
          </group>
        </Float>
      ))}
      {/* broken code bits */}
      {[[-1.3, 1.9, 0.2], [1.3, 1.7, 0.1], [0.2, 2.6, 0]].map((p, i) => (
        <Float key={i} speed={still ? 0 : 1.5} floatIntensity={0.5}>
          <mesh position={p as Pos} rotation={[0.4, 0.6, 0.2 * i]}>
            <boxGeometry args={[0.28, 0.1, 0.05]} />
            <meshStandardMaterial color={C.cream} emissive={C.turquoise} emissiveIntensity={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

/* Station 3 — inventor's garden */
function Workshop({ active, still }: { active: boolean; still: boolean }) {
  const belt = useRef<THREE.Group>(null)
  const wings = useRef<THREE.Group[]>([])
  useFrame(({ clock }) => {
    if (still) return
    const t = clock.elapsedTime
    if (belt.current) {
      belt.current.children.forEach((c, i) => {
        c.position.x = ((t * (active ? 0.7 : 0.35) + i * 0.5) % 2) - 1
      })
    }
    wings.current.forEach((w, i) => {
      if (w) w.rotation.z = Math.sin(t * 9 + i * 2) * 0.7
    })
  })
  return (
    <group>
      <Flower position={[0, 0.12, -0.4]} stemH={2} petals={8} petalColor={C.pink} petalColor2={C.burgundy} core={C.gold} open={active} animate={!still} scale={1} />
      {/* conveyor */}
      <mesh position={[0, 0.3, 0.95]}>
        <boxGeometry args={[2.2, 0.1, 0.5]} />
        <meshStandardMaterial color={C.charcoal} roughness={0.6} />
      </mesh>
      <group ref={belt} position={[0, 0.5, 0.95]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[i * 0.5 - 1, 0, 0]}>
            <boxGeometry args={[0.22, 0.22, 0.22]} />
            <meshStandardMaterial color={i % 2 ? C.turquoise : C.gold} emissive={i % 2 ? C.turquoise : C.gold} emissiveIntensity={0.3} />
          </mesh>
        ))}
      </group>
      <Gear position={[-1.2, 0.45, 0.95]} r={0.22} speed={0.8} animate={!still} />
      <Gear position={[1.2, 0.45, 0.95]} r={0.22} speed={-0.8} color={C.turquoise} animate={!still} />
      {/* runes */}
      {[[-1.2, 1.7, 0.4], [1.2, 2.1, 0.3], [-0.6, 2.7, 0.1], [0.8, 2.9, 0]].map((p, i) => (
        <Float key={i} speed={still ? 0 : 1.2} floatIntensity={0.6}>
          <mesh position={p as Pos} rotation={[0, 0, i]}>
            <torusGeometry args={[0.16, 0.025, 8, 24]} />
            <meshStandardMaterial color={C.gold} emissive={C.gold} emissiveIntensity={0.8} />
          </mesh>
        </Float>
      ))}
      {/* butterflies */}
      {[[-0.9, 1.4, 0.7], [0.9, 1.9, 0.6]].map((p, i) => (
        <Float key={i} speed={still ? 0 : 2} floatIntensity={1} rotationIntensity={0.2}>
          <group position={p as Pos} scale={0.8}>
            {[-1, 1].map((s, j) => (
              <group key={s} scale={[s, 1, 1]} ref={(g) => { if (g) wings.current[i * 2 + j] = g }}>
                <mesh position={[0.17, 0, 0]} scale={[1, 1.3, 0.1]}>
                  <circleGeometry args={[0.16, 14]} />
                  <meshStandardMaterial color={i ? C.lavender : C.turquoise} emissive={i ? C.lavender : C.turquoise} emissiveIntensity={0.5} side={THREE.DoubleSide} />
                </mesh>
              </group>
            ))}
          </group>
        </Float>
      ))}
    </group>
  )
}

export default function GardenScene({
  active,
  onSelect,
  still,
  mobile,
}: {
  active: number | null
  onSelect: (i: number) => void
  still: boolean
  mobile: boolean
}) {
  const spread = mobile ? 3.4 : 5
  const sc = mobile ? 0.85 : 1.15
  return (
    <Canvas
      camera={{ position: [0, 1.6, mobile ? 14.5 : 12], fov: mobile ? 52 : 42 }}
      dpr={mobile ? [1, 1.5] : [1, 2]}
      frameloop={still ? 'demand' : 'always'}
      gl={{ antialias: !mobile }}
      aria-hidden="true"
    >
      <color attach="background" args={['#cfeee6']} />
      <fog attach="fog" args={['#cfeee6', 16, 34]} />
      <ambientLight intensity={1.1} color="#fff6e6" />
      <directionalLight position={[4, 8, 6]} intensity={1.8} color="#fff1d6" />
      <pointLight position={[0, 3, 4]} intensity={14} color={C.turquoise} distance={16} />

      {[0, 1, 2].map((i) => {
        const x = (i - 1) * spread
        return (
          <group key={i} position={[x, -0.6, 0]} scale={sc}>
            <Hit onSelect={() => onSelect(i)} label={`station-${i}`}>
              <Island scale={1.15} phase={i * 1.7} still={still}>
                {i === 0 && (
                  <Flower position={[0, 0.12, 0]} stemH={2.6} petals={10} petalColor={C.turquoise} petalColor2={C.emerald} core={C.gold} open={active === 0} animate={!still} scale={1.15} />
                )}
                {i === 1 && <PortalLab active={active === 1} still={still} />}
                {i === 2 && <Workshop active={active === 2} still={still} />}
              </Island>
            </Hit>
            {active === i && !still && (
              <Sparkles count={36} scale={[3.5, 4, 3.5]} position={[0, 1.4, 0]} size={4} speed={0.6} color={i === 2 ? '#f1c27d' : '#7ff0df'} />
            )}
          </group>
        )
      })}
      <CloudPuff position={[-9, -3.6, -3]} scale={2.4} drift={1} />
      <CloudPuff position={[8, -3.8, -4]} scale={2.8} drift={-1} />
      <CloudPuff position={[0, -4.6, -2]} scale={3} />
    </Canvas>
  )
}
