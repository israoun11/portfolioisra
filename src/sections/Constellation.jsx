import Reveal from '../components/Reveal'

/**
 * Repositories arranged in a ring around a central node, connected by
 * faint lines — a "digital constellation" instead of GitHub's own list
 * or a plain card grid. Falls back to a simple stacked list on narrow
 * screens where a ring layout would just be cramped.
 */
export default function Constellation({ repos, username }) {
  const shown = repos.slice(0, 8)
  const radius = 42 // percent of container

  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        {shown.map((_, i) => {
          const angle = (i / shown.length) * Math.PI * 2 - Math.PI / 2
          const x = 50 + Math.cos(angle) * radius
          const y = 50 + Math.sin(angle) * radius
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="#C9B6E4"
              strokeWidth="0.3"
              strokeDasharray="1.5 1.5"
              opacity="0.6"
            />
          )
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-burgundy/30 bg-burgundy text-center font-display text-[11px] italic leading-tight text-cream shadow-[0_10px_30px_-10px_rgba(110,33,64,0.5)]">
        @{username}
      </div>

      {shown.map((repo, i) => {
        const angle = (i / shown.length) * Math.PI * 2 - Math.PI / 2
        const left = 50 + Math.cos(angle) * radius
        const top = 50 + Math.sin(angle) * radius
        return (
          <div
            key={repo.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <Reveal delay={i * 0.04}>
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="group flex w-28 flex-col items-center gap-1.5 rounded-2xl border border-charcoal/10 bg-cream/90 px-3 py-3 text-center shadow-[0_14px_34px_-20px_rgba(43,30,35,0.4)] backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:border-burgundy/40"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-lilac group-hover:bg-burgundy" />
                <span className="w-full truncate font-display text-sm text-charcoal">{repo.name}</span>
                {typeof repo.stars === 'number' && repo.stars > 0 && (
                  <span className="text-[10px] text-charcoal/45">★ {repo.stars}</span>
                )}
              </a>
            </Reveal>
          </div>
        )
      })}
    </div>
  )
}
