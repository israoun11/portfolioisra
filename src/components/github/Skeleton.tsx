export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-canvas-line/60 ${className}`}
      role="presentation"
    />
  );
}