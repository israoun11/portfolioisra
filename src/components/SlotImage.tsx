import { useState } from 'react'

/** Tries each src in order; shows `fallback` if all fail. Drop your own images in /public/assets/... */
export default function SlotImage({
  srcs, alt, className, fallback, width, height, lazy,
}: {
  srcs: string[]; alt: string; className?: string; fallback?: React.ReactNode
  width?: number; height?: number; lazy?: boolean
}) {
  const [i, setI] = useState(0)
  if (i >= srcs.length) return <>{fallback ?? null}</>
  return (
    <img
      className={className} src={srcs[i]} alt={alt} width={width} height={height}
      loading={lazy ? 'lazy' : undefined} onError={() => setI(i + 1)}
    />
  )
}
