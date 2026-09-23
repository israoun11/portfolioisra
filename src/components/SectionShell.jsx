/**
 * Shared section scaffolding: consistent max-width, vertical rhythm and a
 * kicker label used only where it encodes real structure (which stage of
 * the story this section is).
 */
export default function SectionShell({ id, kicker, title, children, className = '' }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36 ${className}`}>
      {(kicker || title) && (
        <div className="mb-14 md:mb-20">
          {kicker && <p className="kicker mb-3 text-lg">{kicker}</p>}
          {title && (
            <h2 className="font-display text-4xl leading-[1.05] tracking-tightest text-charcoal md:text-5xl">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
