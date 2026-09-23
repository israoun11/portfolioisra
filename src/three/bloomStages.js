function seededRandom(seed) {
  let t = seed
  return function () {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

// One state per section — the sculpture's story from top to bottom.
export const STAGE_ORDER = ['bud', 'bloom', 'garden', 'gallery', 'archive', 'editorial', 'finale']

// Scroll-progress anchors, roughly proportional to each section's length.
export const BREAKPOINTS = [0, 0.07, 0.21, 0.35, 0.65, 0.79, 0.87]

export const PETAL_COUNT_DESKTOP = 13
export const PETAL_COUNT_MOBILE = 8

// Palette the petals draw from — feminine, curated, never a full rainbow.
export const PETAL_PALETTE = ['#F1B8C4', '#C9B6E4', '#E3C79A', '#D98CA0', '#B9A6D9', '#F3C9A6']

// The first few petals double as labelled "skill garden" badges.
export const SKILL_LABELS = ['React', 'Node.js', 'MongoDB', 'Three.js', 'AI APIs', 'Tailwind CSS', 'GitHub Actions']

/**
 * Builds per-petal choreography: for each of the seven stages, how far
 * each petal extends from the core (radial), how open it is (openAngle,
 * the petal's flare rotation), its vertical offset and its scale.
 * theta (fixed placement angle around the core) is returned separately
 * since it never changes — only how the petal inhabits that angle does.
 */
export function buildBloomStages(count) {
  const rand = seededRandom(4242)
  const petals = []

  for (let i = 0; i < count; i++) {
    const theta = (i / count) * Math.PI * 2 + rand() * 0.12
    const zTilt = (rand() - 0.5) * 0.5
    const color = PETAL_PALETTE[i % PETAL_PALETTE.length]

    const stages = {
      bud: { radial: 0.14, open: -1.15, y: 0.05 + rand() * 0.05, scale: 0.62 },
      bloom: { radial: 0.58, open: 0.32, y: 0, scale: 1 },
      garden: { radial: 1.75, open: 0.62, y: Math.sin(i * 1.7) * 0.5, scale: 0.82 },
      gallery: { radial: 2.7, open: 0.95, y: (i - count / 2) * 0.32, scale: 1.05 },
      archive: { radial: 1.15, open: 0.48, y: -0.25, scale: 0.55 },
      editorial: { radial: 0.85, open: 0.4, y: 0.1, scale: 0.55 },
      finale: { radial: 0.62, open: 0.34, y: 0, scale: 1 },
    }

    petals.push({ theta, zTilt, color, stages })
  }

  return petals
}

export function seededRand(seed) {
  return seededRandom(seed)
}
