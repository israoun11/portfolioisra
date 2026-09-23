export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-10 pt-4 md:px-10">
      <div className="rule mb-6" />
      <div className="flex flex-col items-start justify-between gap-3 text-xs text-charcoal/45 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Isra Oun. Built with React, Three.js and GSAP.</p>
        <p>Tunisia</p>
      </div>
    </footer>
  )
}
