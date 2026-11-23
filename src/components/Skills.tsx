import { useState } from 'react'

type Skill = { ini: string; name: string; group: string; desc: string }

// The complete stack, defined here so this section does not depend on any other file.
const skills: Skill[] = [
  // Frontend
  { ini: 'Re', name: 'React', group: 'Frontend', desc: 'Component-driven, responsive interfaces.' },
  { ini: 'Ts', name: 'TypeScript', group: 'Frontend', desc: 'Typed code that stays maintainable.' },
  { ini: 'JS', name: 'JavaScript', group: 'Frontend', desc: 'The language behind everything I build.' },
  { ini: 'H5', name: 'HTML5', group: 'Frontend', desc: 'Semantic, accessible structure.' },
  { ini: 'C3', name: 'CSS3', group: 'Frontend', desc: 'Layouts, motion and responsive design.' },
  { ini: 'Tw', name: 'Tailwind CSS', group: 'Frontend', desc: 'Utility-first, consistent styling.' },
  { ini: 'Vi', name: 'Vite', group: 'Frontend', desc: 'Fast builds and a quick dev loop.' },
  { ini: 'Nx', name: 'Next.js', group: 'Frontend', desc: 'Routing and rendering for React apps.' },
  { ini: 'Fm', name: 'Framer Motion', group: 'Frontend', desc: 'Motion that explains what changed.' },
  { ini: '3D', name: 'Three.js', group: 'Frontend', desc: '3D scenes in the browser.' },
  // Backend
  { ini: 'No', name: 'Node.js', group: 'Backend', desc: 'JavaScript on the server.' },
  { ini: 'Ex', name: 'Express.js', group: 'Backend', desc: 'REST APIs and middleware.' },
  { ini: 'Mo', name: 'MongoDB', group: 'Backend', desc: 'Data models on Atlas.' },
  { ini: 'Mg', name: 'Mongoose', group: 'Backend', desc: 'Schemas and models for MongoDB.' },
  { ini: 'Pg', name: 'PostgreSQL', group: 'Backend', desc: 'Relational data and SQL queries.' },
  { ini: 'Pr', name: 'Prisma', group: 'Backend', desc: 'Type-safe access to the database.' },
  { ini: 'Sb', name: 'Supabase', group: 'Backend', desc: 'Hosted Postgres, auth and storage.' },
  { ini: 'Sq', name: 'SQL', group: 'Backend', desc: 'Queries, joins and reporting.' },
  { ini: 'Zo', name: 'Zod', group: 'Backend', desc: 'Schema validation for inputs.' },
  { ini: 'Jw', name: 'JWT', group: 'Backend', desc: 'Token-based authentication.' },
  { ini: 'Rs', name: 'REST APIs', group: 'Backend', desc: 'Clean, consistent endpoints.' },
  { ini: 'Sw', name: 'Swagger', group: 'Backend', desc: 'API documentation that stays in sync.' },
  { ini: 'Cl', name: 'Cloudinary', group: 'Backend', desc: 'Image uploads with Multer.' },
  // AI integration
  { ini: 'Ge', name: 'Gemini API', group: 'AI', desc: 'AI features through a serverless function.' },
  { ini: 'Op', name: 'OpenAI API', group: 'AI', desc: 'Calling models from backend code.' },
  // Testing
  { ini: 'Vt', name: 'Vitest', group: 'Quality', desc: 'Fast unit tests.' },
  { ini: 'Rt', name: 'Testing Library', group: 'Quality', desc: 'Tests that act like a user.' },
  { ini: 'CI', name: 'GitHub Actions', group: 'Quality', desc: 'Checks on every push.' },
  // Tools and cloud
  { ini: 'Gi', name: 'Git', group: 'Toolkit', desc: 'Version control and branching.' },
  { ini: 'Hb', name: 'GitHub', group: 'Toolkit', desc: 'Repositories, reviews and workflows.' },
  { ini: 'Do', name: 'Docker', group: 'Toolkit', desc: 'Beginner level, learning step by step.' },
  { ini: 'Ve', name: 'Vercel', group: 'Toolkit', desc: 'Deploys and serverless functions.' },
  { ini: 'Rn', name: 'Render', group: 'Toolkit', desc: 'Hosting for APIs and web services.' },
]

const filters = ['All', 'Frontend', 'Backend', 'AI', 'Quality', 'Toolkit']

// Compact cards, scoped to this section only.
const compactCss = `
.skc .grid{gap:10px}
.skc .sk{min-height:96px;padding:12px 12px 10px;border-radius:20px}
.skc .sk>span{font-size:12px;line-height:1}
.skc .sk .ini{font-size:30px;line-height:1}
.skc .sk b{display:block;margin-top:4px;font-size:13px;font-weight:500;line-height:1.2}
@media (max-width:559px){.skc .grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (min-width:560px) and (max-width:999px){.skc .grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (min-width:1000px){.skc .skwrap .grid{grid-template-columns:repeat(5,minmax(0,1fr))}}
`

export default function Skills() {
  const [filter, setFilter] = useState('All')
  const list = skills.filter((s) => filter === 'All' || s.group === filter)
  const [first, ...rest] = list

  return (
    <section id="skills" className="skc">
      <style>{compactCss}</style>
      <span className="mono rose">Expertise</span>
      <h2 style={{ marginTop: 22 }}>
        Stack meets <em>craft.</em>
      </h2>
      <div className="tabs" role="group" aria-label="Filter expertise">
        {filters.map((f) => (
          <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <div className="skwrap" key={filter}>
        <div className="grid">
          {rest.map((s) => (
            <div className="sk" key={s.name}>
              <span>→</span>
              <div>
                <div className="ini">{s.ini}</div>
                <b>{s.name}</b>
              </div>
            </div>
          ))}
        </div>
        {first && (
          <div className="feat glass">
            <span className="mono">The craft behind the code</span>
            <div>
              <div className="ini">{first.ini}</div>
              <h3>{first.name}</h3>
              <p>{first.desc}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}