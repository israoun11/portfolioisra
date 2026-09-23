import Reveal from '../components/Reveal'
import SectionShell from '../components/SectionShell'
import { education } from '../data/certifications'
import { languages } from '../data/skills'

export default function About() {
  return (
    <SectionShell id="about" kicker="A little about me" title="Still early, already building.">
      <div className="grid gap-14 md:grid-cols-5 md:gap-10">
        <div className="md:col-span-3">
          <Reveal>
            <p className="max-w-editorial text-lg leading-relaxed text-charcoal/80 md:text-xl">
              I'm a 23-year-old full-stack developer from Tunisia, working mainly with React,
              Next.js and Node.js. I finished a Full Stack JavaScript certificate in June 2026,
              and since then I've been building — dashboards, small platforms, interactive
              frontends — as a way of actually learning the craft rather than just reading about it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-editorial text-lg leading-relaxed text-charcoal/80 md:text-xl">
              What pulls me in lately is the space where interfaces stop feeling flat: motion,
              3D, and AI woven into ordinary web apps. This portfolio is partly a resume and
              partly a sandbox for that — a place to be precise about the details most people
              scroll past.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-editorial text-lg leading-relaxed text-charcoal/80 md:text-xl">
              I'm early in my career, and I say that plainly rather than dress it up. What I can
              promise is attention — to code, to layout, to the small interaction that makes
              something feel considered instead of assembled.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-2 md:pl-6">
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-charcoal/10 bg-paper/70 p-7">
              <h3 className="font-display text-xl text-charcoal">Education</h3>
              <ul className="mt-5 space-y-4">
                {education.map((item) => (
                  <li key={item.school} className="border-l border-burgundy/40 pl-4">
                    <p className="text-sm text-charcoal/85">{item.school}</p>
                    <p className="text-xs text-charcoal/50">{item.period}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-6 rounded-2xl border border-charcoal/10 bg-paper/70 p-7">
              <h3 className="font-display text-xl text-charcoal">Languages</h3>
              <ul className="mt-5 space-y-3">
                {languages.map((lang) => (
                  <li key={lang.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-charcoal/85">{lang.name}</span>
                      <span className="text-charcoal/45">{lang.level}</span>
                    </div>
                    <div className="h-[3px] w-full rounded-full bg-charcoal/10">
                      <div
                        className="h-full rounded-full bg-rose"
                        style={{ width: `${lang.value}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  )
}
