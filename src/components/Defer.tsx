import { Suspense, useEffect, useRef, useState } from 'react'

/** Mounts heavy 3D children only when near the viewport, with a loading state. */
export default function Defer({ children, label = 'Loading the magic…' }: { children: React.ReactNode; label?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setShow(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect() } },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="defer">
      {show ? <Suspense fallback={<Loader label={label} />}>{children}</Suspense> : <Loader label={label} />}
    </div>
  )
}

export function Loader({ label }: { label: string }) {
  return (
    <div className="loader" role="status">
      <span className="loader-orb" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
