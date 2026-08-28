import type { GithubUser, GithubRepo } from '../types/github';

const GITHUB_API = 'https://api.github.com';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

function readCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
  } catch {
    // sessionStorage unavailable (e.g. private mode) — fail silently, caching is best-effort
  }
}

async function githubFetch<T>(path: string, cacheKey: string): Promise<T> {
  const cached = readCache<T>(cacheKey);
  if (cached) return cached;

  const res = await fetch(`${GITHUB_API}${path}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error('GitHub API rate limit reached. Please try again in a few minutes.');
    }
    if (res.status === 404) {
      throw new Error('GitHub profile not found.');
    }
    throw new Error(`GitHub API error (${res.status}).`);
  }

  const data = (await res.json()) as T;
  writeCache(cacheKey, data);
  return data;
}

export function fetchGithubUser(username: string): Promise<GithubUser> {
  return githubFetch<GithubUser>(`/users/${username}`, `gh-user-${username}`);
}

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  const repos = await githubFetch<GithubRepo[]>(
    `/users/${username}/repos?sort=updated&per_page=100`,
    `gh-repos-${username}`,
  );
  return repos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
}