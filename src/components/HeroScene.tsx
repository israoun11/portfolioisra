import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { C, CloudPuff, Crystal, Flower, Island, Tower } from './scene-parts'

function Rig({ children, still }: { children: React.ReactNode; still: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ pointer }) => {
    if (still || !ref.current) return
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, pointer.x * 0.1, 0.04)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -pointer.y * 0.05, 0.04)
  })
  return <group ref={ref}>{children}</group>
}

/** The framed "Floating Isle 07" window: bright sky, teal crystal islands, big blossom top-left. */
export default function HeroScene({ still, mobile }: { still: boolean; mobile: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 45 }}
      dpr={mobile ? [1, 1.5] : [1, 2]}
      frameloop={still ? 'demand' : 'always'}
      gl={{ antialias: !mobile }}
      aria-hidden="true"
    >
      <color attach="background" args={['#86c5ec']} />
      <fog attach="fog" args={['#d9eef5', 12, 30]} />
      <ambientLight intensity={1.0} color="#fff6e6" />
      <directionalLight position={[5, 8, 5]} intensity={1.8} color="#fff1d6" />
      <pointLight position={[-4, 2, 3]} intensity={16} color={C.turquoise} distance={14} />
      <Rig still={still}>
        <Flower position={[-3.6, 0.9, 0.5]} stemH={0.1} petals={9} petalColor="#58d6d0" petalColor2="#1b7a62" core={C.gold} open animate={!still} scale={1.5} />
        <Island position={[3.4, 1.9, -3]} scale={1.1} phase={1} still={still}>
          <Tower position={[0, 0.1, 0]} h={1.6} /><Tower position={[0.5, 0.1, 0.2]} h={1.1} /><Crystal position={[-0.6, 0.4, 0]} scale={1.4} />
        </Island>
        <Island position={[0.3, 2.6, -5]} scale={0.5} phase={2} still={still}><Crystal position={[0, 0.4, 0]} /></Island>
        <Island position={[-1, -2.4, -1]} scale={0.9} phase={3} still={still}>
          <Flower position={[0, 0.1, 0]} stemH={1.2} petals={7} petalColor={C.pink} petalColor2={C.burgundy} core={C.cream} open animate={!still} scale={0.8} />
        </Island>
        <CloudPuff position={[-2, -0.5, -4]} scale={1.8} drift={1} />
        <CloudPuff position={[4, -2, -3]} scale={2} drift={-1} />
        <CloudPuff position={[0, 3.8, -8]} scale={2.4} opacity={0.8} />
        <CloudPuff position={[-5, 3, -7]} scale={1.6} opacity={0.7} />
      </Rig>
      <Sparkles count={mobile ? 20 : 50} scale={[12, 8, 6]} size={3} speed={still ? 0 : 0.3} color="#fff6d6" opacity={0.9} />
    </Canvas>
  )
}
