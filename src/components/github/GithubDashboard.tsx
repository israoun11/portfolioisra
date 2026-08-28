import { useEffect, useState } from 'react';
import { fetchGithubUser, fetchGithubRepos } from '../../services/github';
import type { FetchState, GithubUser, GithubRepo } from '../../types/github';
import { Skeleton } from './Skeleton';

const USERNAME = 'israoun11';

export function GithubDashboard() {
  const [userState, setUserState] = useState<FetchState<GithubUser>>({ status: 'idle' });
  const [reposState, setReposState] = useState<FetchState<GithubRepo[]>>({ status: 'idle' });

  useEffect(() => {
    let cancelled = false;

    setUserState({ status: 'loading' });
    fetchGithubUser(USERNAME)
      .then((data) => !cancelled && setUserState({ status: 'success', data }))
      .catch(
        (err: Error) => !cancelled && setUserState({ status: 'error', message: err.message }),
      );

    setReposState({ status: 'loading' });
    fetchGithubRepos(USERNAME)
      .then((data) => !cancelled && setReposState({ status: 'success', data }))
      .catch(
        (err: Error) => !cancelled && setReposState({ status: 'error', message: err.message }),
      );

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="activity" className="container-xl py-24" aria-labelledby="activity-heading">
      <p className="section-eyebrow mb-3">Developer Activity</p>
      <h2 id="activity-heading" className="mb-10 text-3xl font-semibold sm:text-4xl">
        Live from GitHub
      </h2>

      <UserStats state={userState} />
      <RecentRepos state={reposState} />
    </section>
  );
}

function UserStats({ state }: { state: FetchState<GithubUser> }) {
  if (state.status === 'loading' || state.status === 'idle') {
    return (
      <div className="mb-10 grid grid-cols-3 gap-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <p role="alert" className="mb-10 text-sm text-red-400">
        Couldn't load GitHub stats: {state.message}
      </p>
    );
  }

  const { data } = state;
  const stats = [
    { label: 'Public repos', value: data.public_repos },
    { label: 'Followers', value: data.followers },
    { label: 'Following', value: data.following },
  ];

  return (
    <div className="mb-10 grid grid-cols-3 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="card p-4 text-center sm:p-6">
          <p className="font-mono text-2xl font-semibold text-signal sm:text-3xl">{s.value}</p>
          <p className="mt-1 text-xs text-ink-dim sm:text-sm">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function RecentRepos({ state }: { state: FetchState<GithubRepo[]> }) {
  if (state.status === 'loading' || state.status === 'idle') {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <p role="alert" className="text-sm text-red-400">
        Couldn't load repositories: {state.message}
      </p>
    );
  }

  const repos = state.data.slice(0, 6);

  if (repos.length === 0) {
    return <p className="text-ink-dim">No public repositories to show yet.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="card block p-5 transition-colors hover:border-signal"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-sm font-medium">{repo.name}</p>
            <span className="flex items-center gap-1 text-xs text-ink-faint">★ {repo.stargazers_count}</span>
          </div>
          {repo.description && <p className="mt-2 text-sm text-ink-dim">{repo.description}</p>}
          <div className="mt-3 flex items-center gap-3 text-xs text-ink-faint">
            {repo.language && <span>{repo.language}</span>}
            <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        </a>
      ))}
    </div>
  );
}