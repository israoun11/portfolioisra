import * as THREE from 'three'

let cached = null

/**
 * An original, non-generic petal silhouette: a slightly asymmetric,
 * elongated almond shape with a subtle waist — built from bezier curves
 * rather than a primitive. One geometry instance is shared across every
 * petal in the sculpture (only position/rotation/scale differ per
 * instance), which keeps the whole "Blooming Code Sculpture" cheap to
 * render even with a couple dozen petals on screen.
 */
export function getPetalGeometry() {
  if (cached) return cached

  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo(0.32, 0.1, 0.42, 0.55, 0.22, 1.05)
  shape.bezierCurveTo(0.14, 1.32, -0.02, 1.42, -0.1, 1.3)
  shape.bezierCurveTo(-0.22, 1.12, -0.12, 0.55, -0.05, 0.22)
  shape.bezierCurveTo(-0.02, 0.1, 0, 0.04, 0, 0)

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.045,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 1,
    curveSegments: 10,
  })
  geometry.center()
  geometry.translate(0, 0.62, 0)
  geometry.computeVertexNormals()

  cached = geometry
  return geometry
}

/**
 * A faint rectangular mark on a few petals — the "subtle reference to
 * code / UI" the brief asks for, read as a tiny browser-window chrome
 * bar rather than literal text, quiet enough to feel like texture.
 */
let cachedGlyph = null
export function getGlyphGeometry() {
  if (cachedGlyph) return cachedGlyph
  cachedGlyph = new THREE.BoxGeometry(0.24, 0.03, 0.01)
  return cachedGlyph
}
