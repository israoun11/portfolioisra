import { useRef } from 'react'

/**
 * Wraps a button/link so it drifts slightly toward the cursor on hover —
 * one of the small, expensive-feeling interaction details from the brief.
 * No-ops gracefully on touch devices.
 */
export default function MagneticButton({ as: Tag = 'button', className = '', children, ...props }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.32}px)`
  }

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`transition-transform duration-300 ease-editorial ${className}`}
      data-cursor-hover
      {...props}
    >
      {children}
    </Tag>
  )
}
