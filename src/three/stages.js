// Deterministic pseudo-random generator (mulberry32) so the sculpture's
// layout is stable across reloads instead of reshuffling every visit.
function seededRandom(seed) {
  let t = seed
  return function () {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export const STAGE_ORDER = ['lattice', 'grid', 'stack', 'constellation', 'ribbon']

// Scroll-progress breakpoints where each stage is "fully arrived".
// Segment between two entries is where the sculpture is mid-transformation.
export const BREAKPOINTS = [0, 0.24, 0.48, 0.7, 1]

/**
 * Builds the five sculptural arrangements the atelier moves through:
 *   lattice        — hero: a loose open cloud, raw and unresolved
 *   grid           — about / skills: organised into a catalog
 *   stack          — projects: a fanned deck of glass "windows"
 *   constellation  — certifications / github: arranged in orbit
 *   ribbon         — cv / contact: a rising helix, a closing signature
 */
export function buildStages(count) {
  const rand = seededRandom(1337)
  const stages = { lattice: [], grid: [], stack: [], constellation: [], ribbon: [] }
  const cols = Math.ceil(Math.sqrt(count))

  for (let i = 0; i < count; i++) {
    stages.lattice.push({
      position: [(rand() - 0.5) * 9.5, (rand() - 0.5) * 6.5, (rand() - 0.5) * 5 - 1.5],
      rotation: [rand() * Math.PI, rand() * Math.PI, rand() * Math.PI],
      scale: 0.5 + rand() * 0.55,
    })

    const col = i % cols
    const row = Math.floor(i / cols)
    stages.grid.push({
      position: [(col - cols / 2 + 0.5) * 1.2, (row - cols / 2 + 0.5) * 1.05, Math.sin(i * 0.7) * 0.5 - 1.8],
      rotation: [0.08, 0.22, 0],
      scale: 0.58,
    })

    stages.stack.push({
      position: [Math.sin(i * 0.45) * 0.4, (i - count / 2) * 0.06, -i * 0.09 + 1],
      rotation: [0, 0.16 + i * 0.012, (i % 5) * 0.018 - 0.045],
      scale: 0.88,
    })

    const angle = (i / count) * Math.PI * 2
    const radius = 3 + (i % 3) * 0.4
    stages.constellation.push({
      position: [Math.cos(angle) * radius, Math.sin(angle * 1.3) * 1.7, Math.sin(angle) * radius - 1.2],
      rotation: [angle * 0.3, angle, 0],
      scale: 0.48,
    })

    const t = i / count
    const helixAngle = t * Math.PI * 6
    stages.ribbon.push({
      position: [Math.cos(helixAngle) * 2.3, t * 7.5 - 3.7, Math.sin(helixAngle) * 2.3 - 1.3],
      rotation: [helixAngle * 0.2, helixAngle, Math.PI / 2],
      scale: 0.58,
    })
  }

  return stages
}
