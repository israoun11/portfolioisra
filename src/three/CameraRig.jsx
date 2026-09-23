import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// One camera "shot" per section — a cinematic path through the scene
// rather than a static, front-on view of the sculpture.
const SHOTS = [
  { trigger: '#home', x: 0, y: 0.15, z: 7.4, fov: 42 },
  { trigger: '#about', x: 1.6, y: 0.5, z: 6, fov: 40 },
  { trigger: '#skills', x: -1.8, y: 0.1, z: 4.6, fov: 48 },
  { trigger: '#projects', x: 0, y: -0.4, z: 9.2, fov: 52 },
  { trigger: '#certificates', x: 1.1, y: 0.35, z: 7.2, fov: 38 },
  { trigger: '#cv', x: -0.8, y: 0, z: 6.4, fov: 40 },
  { trigger: '#contact', x: 0, y: 0.1, z: 7.6, fov: 42 },
]

export default function CameraRig({ reducedMotion }) {
  const { camera } = useThree()
  const state = useRef({ x: 0, y: 0.15, z: 7.4, fov: 42 })

  useEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      SHOTS.forEach((shot) => {
        if (!document.querySelector(shot.trigger)) return
        gsap.to(state.current, {
          x: shot.x,
          y: shot.y,
          z: shot.z,
          fov: shot.fov,
          ease: 'none',
          scrollTrigger: {
            trigger: shot.trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      })
    })
    return () => ctx.revert()
  }, [reducedMotion])

  useFrame((_, delta) => {
    const lerp = Math.min(1, delta * 3)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.current.x, lerp)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.current.y, lerp)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, state.current.z, lerp)
    camera.fov = THREE.MathUtils.lerp(camera.fov, state.current.fov, lerp)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  })

  return null
}
