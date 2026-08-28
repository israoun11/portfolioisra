import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GithubDashboard } from './GithubDashboard';

const mockUser = {
  login: 'israoun11',
  name: 'Isra Oun',
  avatar_url: '',
  bio: null,
  public_repos: 5,
  followers: 3,
  following: 2,
  html_url: 'https://github.com/israoun11',
  location: 'Tunisia',
  blog: null,
};

function jsonResponse(body: unknown, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as Response);
}

describe('GithubDashboard', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows real GitHub stats after a successful fetch', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('/repos')) return jsonResponse([]);
        return jsonResponse(mockUser);
      }),
    );

    render(<GithubDashboard />);

    await waitFor(() => expect(screen.getByText('5')).toBeInTheDocument());
    expect(screen.getByText('Followers')).toBeInTheDocument();
  });

  it('shows an error state when the GitHub API fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => jsonResponse({}, false, 500)),
    );

    render(<GithubDashboard />);

    await waitFor(() => expect(screen.getAllByRole('alert').length).toBeGreaterThan(0));
  });
});