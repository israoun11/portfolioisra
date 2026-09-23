import { useEffect, useState } from 'react'
import axios from 'axios'
import { GITHUB_USERNAME } from '../data/projects'

const CACHE_KEY = `gh-repos-${GITHUB_USERNAME}`
const CACHE_TTL = 1000 * 60 * 30 // 30 minutes — keeps us friendly to GitHub's rate limit

/**
 * Fetches Isra's public repositories directly from the GitHub REST API.
 * No token is used (and none is needed for public data), so there is no
 * secret to protect — this hook is safe to run entirely in the browser.
 *
 * Results are cached in localStorage for CACHE_TTL so repeat visits and
 * re-renders don't re-hit the (unauthenticated, 60 req/hr) rate limit.
 * If the request fails, we fall back to a stale cache when one exists.
 */
export function useGithubRepos() {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error | rate-limited

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const cached = readCache()
        if (cached) {
          if (!cancelled) {
            setRepos(cached)
            setStatus('ready')
          }
          return
        }

        const { data } = await axios.get(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
          {
            params: { per_page: 100, sort: 'updated' },
            headers: { Accept: 'application/vnd.github+json' },
          }
        )

        const cleaned = data
          .filter((r) => !r.fork && !r.private)
          .map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            url: r.html_url,
            homepage: r.homepage || null,
            stars: r.stargazers_count,
            language: r.language,
            topics: r.topics || [],
            updatedAt: r.pushed_at,
          }))
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))

        writeCache(cleaned)

        if (!cancelled) {
          setRepos(cleaned)
          setStatus('ready')
        }
      } catch (err) {
        const rateLimited = err?.response?.status === 403
        const stale = readCache(true)
        if (!cancelled) {
          if (stale) {
            setRepos(stale)
            setStatus('ready')
          } else {
            setStatus(rateLimited ? 'rate-limited' : 'error')
          }
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { repos, status }
}

function readCache(ignoreExpiry = false) {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { timestamp, data } = JSON.parse(raw)
    if (!ignoreExpiry && Date.now() - timestamp > CACHE_TTL) return null
    return data
  } catch {
    return null
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }))
  } catch {
    // localStorage unavailable (private browsing, etc.) — fine to skip caching
  }
}
