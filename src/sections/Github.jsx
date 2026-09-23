import Reveal from '../components/Reveal'
import SectionShell from '../components/SectionShell'
import Constellation from './Constellation'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { useIsMobile } from '../hooks/useIsMobile'
import { GITHUB_USERNAME } from '../data/projects'

export default function Github() {
  const { repos, status } = useGithubRepos()
  const isMobile = useIsMobile()

  return (
    <SectionShell id="github" kicker="Straight from GitHub" title="A small constellation, live.">
      <Reveal>
        <p className="max-w-editorial text-base leading-relaxed text-charcoal/70">
          This list is pulled directly from the GitHub REST API at{' '}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-charcoal/20 underline-offset-4 hover:text-burgundy"
          >
            github.com/{GITHUB_USERNAME}
          </a>
          . New public repositories appear here automatically — nothing on this page needs to be
          edited by hand when a new one is pushed.
        </p>
      </Reveal>

      <div className="mt-12">
        {status === 'loading' && <GithubSkeleton />}

        {status === 'error' && (
          <p className="text-sm text-charcoal/50">
            GitHub's data couldn't be reached just now. Please view the full list directly on{' '}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-charcoal/20 underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        )}

        {status === 'rate-limited' && (
          <p className="text-sm text-charcoal/50">
            GitHub's public API rate limit was reached for the moment. See the full, current list
            on{' '}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-charcoal/20 underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        )}

        {status === 'ready' && repos.length === 0 && (
          <p className="text-sm text-charcoal/50">No public repositories found.</p>
        )}

        {status === 'ready' && repos.length > 0 && (
          isMobile ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {repos.slice(0, 8).map((repo, i) => (
                <Reveal key={repo.id} delay={i * 0.04} as="li">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="group flex h-full flex-col justify-between rounded-2xl border border-charcoal/10 bg-paper/60 p-6 transition-colors duration-300 hover:border-burgundy/40"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg text-charcoal">{repo.name}</h3>
                        {typeof repo.stars === 'number' && repo.stars > 0 && (
                          <span className="shrink-0 text-xs text-charcoal/45">★ {repo.stars}</span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                        {repo.description || 'No description provided.'}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center justify-between text-xs text-charcoal/45">
                      <span>{repo.language || '—'}</span>
                      <span className="underline decoration-charcoal/20 underline-offset-4 group-hover:text-burgundy">
                        View repo
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Constellation repos={repos} username={GITHUB_USERNAME} />
          )
        )}
      </div>
    </SectionShell>
  )
}

function GithubSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-40 animate-pulse rounded-2xl border border-charcoal/10 bg-paper/50" />
      ))}
    </div>
  )
}
