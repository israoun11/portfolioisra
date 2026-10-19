export const tools = ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Vite', 'Three.js', 'Vitest', 'Git', 'Vercel']

export type Skill = { ini: string; name: string; group: string; desc: string }
export const skills: Skill[] = [
  { ini: 'Re', name: 'React', group: 'Frontend', desc: 'Component-driven, responsive interfaces.' },
  { ini: 'Ts', name: 'TypeScript', group: 'Frontend', desc: 'Typed code that stays maintainable.' },
  { ini: 'Vi', name: 'Vite', group: 'Frontend', desc: 'Fast builds and a quick dev loop.' },
  { ini: 'Fm', name: 'Framer Motion', group: 'Frontend', desc: 'Motion that explains what changed.' },
  { ini: '3D', name: 'Three.js', group: 'Frontend', desc: '3D scenes in the browser.' },
  { ini: 'No', name: 'Node.js', group: 'Backend', desc: 'JavaScript on the server.' },
  { ini: 'Ex', name: 'Express', group: 'Backend', desc: 'REST APIs and middleware.' },
  { ini: 'Mo', name: 'MongoDB', group: 'Backend', desc: 'Data models on Atlas.' },
  { ini: 'Zo', name: 'Zod', group: 'Backend', desc: 'Schema validation for inputs.' },
  { ini: 'Cl', name: 'Cloudinary', group: 'Backend', desc: 'Image uploads with Multer.' },
  { ini: 'Vt', name: 'Vitest', group: 'Quality', desc: 'Fast unit tests.' },
  { ini: 'Rt', name: 'Testing Library', group: 'Quality', desc: 'Tests that act like a user.' },
  { ini: 'CI', name: 'GitHub Actions', group: 'Quality', desc: 'Checks on every push.' },
  { ini: 'Gi', name: 'Git', group: 'Toolkit', desc: 'Version control and branching.' },
  { ini: 'Ve', name: 'Vercel', group: 'Toolkit', desc: 'Deploys and serverless functions.' },
  { ini: 'Ge', name: 'Gemini API', group: 'Toolkit', desc: 'AI features through a serverless function.' },
  { ini: 'Op', name: 'OpenAI API', group: 'Toolkit', desc: 'AI-powered development.' },
]

export const filters = ['All', 'Frontend', 'Backend', 'Quality', 'Toolkit']

export type Project = {
  initial: string
  name: string
  category: string
  text: string
  gradient: string
  label: string
  href: string
}
export const projects: Project[] = [
  { initial: 'M', name: 'Maison D’Isra', category: 'Frontend', text: 'A pastry storefront with a warm, product-first layout.', gradient: 'linear-gradient(150deg,#e8a6b8,#c98398)', label: 'Open site', href: 'https://pastry-front.vercel.app/' },
  { initial: 'F', name: 'Foodly', category: 'Frontend', text: 'A food web app deployed on Vercel.', gradient: 'linear-gradient(150deg,#f0c29a,#d98a6b)', label: 'Open site', href: 'https://foodly-kappa-blue.vercel.app/' },
  { initial: 'T', name: 'Travel e-commerce', category: 'Full-stack', text: 'React, Express, MongoDB Atlas, Zod and Cloudinary uploads.', gradient: 'linear-gradient(150deg,#a99be0,#7b6bb5)', label: 'View code', href: 'https://github.com/israoun11' },
  { initial: 'J', name: 'JobMatch', category: 'Full-stack', text: 'A job-matching app on React, Node, Express and MongoDB.', gradient: 'linear-gradient(150deg,#9fb4ea,#6f86cf)', label: 'View code', href: 'https://github.com/israoun11' },
  { initial: '3D', name: 'Isra’s Digital Planet', category: '3D portfolio', text: 'React, TypeScript and Three.js, with tests and CI.', gradient: 'linear-gradient(150deg,#8fd0b5,#4aa385)', label: 'Open site', href: 'https://portfolioisra-rho.vercel.app/' },
]

export const cvUrl: string = (import.meta.env.VITE_CV_DATA_URL as string | undefined) ?? import.meta.env.BASE_URL + 'Isra_Oun_CV_EN.pdf'

type Host = { claude?: { use?: (name: string) => Promise<{ save: (o: { filename: string; data: Blob }) => Promise<unknown> } | null> } }

async function saveWithHost(): Promise<boolean> {
  const host = (window as unknown as Host).claude
  if (!host?.use || !cvUrl.startsWith('data:')) return false
  try {
    const dl = await host.use('downloads')
    if (!dl) return false
    const bin = atob(cvUrl.split(',')[1])
    const bytes = Uint8Array.from(bin, (ch) => ch.charCodeAt(0))
    await dl.save({ filename: 'Isra_Oun_CV_EN.pdf', data: new Blob([bytes], { type: 'application/pdf' }) })
    return true
  } catch {
    return false
  }
}

export async function downloadCv() {
  if (await saveWithHost()) return
  const a = document.createElement('a')
  a.href = cvUrl
  a.download = 'Isra_Oun_CV_EN.pdf'
  document.body.appendChild(a)
  a.click()
  a.remove()
}
export const EMAIL = 'israoun00@gmail.com'

export type Mood = { id: string; name: string; colors: [string, string, string] }
export const moods: Mood[] = [
  { id: 'lavender', name: 'Lavender', colors: ['#9d8ccf', '#7b6bb5', '#b3566f'] },
  { id: 'rose', name: 'Rose petal', colors: ['#e69ab5', '#c25a80', '#7b6bb5'] },
  { id: 'peach', name: 'Peach fizz', colors: ['#f0a878', '#d9773f', '#b3566f'] },
  { id: 'mint', name: 'Mint cream', colors: ['#6fcfb0', '#2f9e82', '#b3566f'] },
]
