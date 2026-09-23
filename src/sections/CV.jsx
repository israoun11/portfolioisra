import Reveal from '../components/Reveal'
import SectionShell from '../components/SectionShell'
import MagneticButton from '../components/MagneticButton'

// Replace /public/cv.pdf with a new file of the same name to update the
// CV everywhere on the site — nothing here needs to change.
const CV_PATH = '/cv.pdf'

export default function CV() {
  return (
    <SectionShell id="cv" kicker="On paper" title="The CV, in full.">
      <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-8">
        <Reveal className="md:col-span-5">
          <p className="max-w-editorial text-base leading-relaxed text-charcoal/70">
            A single, honest page: the technologies I use, the certificate I hold, and the
            education behind it. No inflated titles, no invented roles.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <MagneticButton
              as="a"
              href={CV_PATH}
              download
              className="inline-flex items-center gap-2 rounded-full bg-burgundy px-7 py-3.5 text-sm text-ivory"
            >
              Download CV
            </MagneticButton>
            <MagneticButton
              as="a"
              href={CV_PATH}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-charcoal/70 underline decoration-charcoal/20 underline-offset-4 hover:text-burgundy"
            >
              Open in new tab
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-paper/60 shadow-[0_20px_60px_-30px_rgba(33,29,27,0.35)]">
            <object data={CV_PATH} type="application/pdf" className="h-[70vh] w-full" aria-label="Isra Oun's CV preview">
              <div className="flex h-[50vh] flex-col items-center justify-center gap-3 p-8 text-center">
                <p className="text-sm text-charcoal/60">
                  Your browser can't preview PDFs inline here.
                </p>
                <a href={CV_PATH} className="text-sm text-burgundy underline underline-offset-4">
                  Open the CV directly
                </a>
              </div>
            </object>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
