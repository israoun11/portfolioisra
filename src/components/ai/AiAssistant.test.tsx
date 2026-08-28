import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { AiAssistant } from './AiAssistant';

function jsonResponse(body: unknown, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    json: () => Promise.resolve(body),
  } as Response);
}

describe('AiAssistant', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows the welcome message and suggested questions on load', () => {
    render(<AiAssistant />);
    expect(screen.getByText(/Ask Isra AI/i)).toBeInTheDocument();
    expect(screen.getByText('What technologies does Isra use?')).toBeInTheDocument();
  });

  it('sends a question and displays the assistant reply', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => jsonResponse({ reply: 'Isra works with React, TypeScript and Node.js.' })),
    );
    const user = userEvent.setup();
    render(<AiAssistant />);

    await user.click(screen.getByText('What technologies does Isra use?'));

    await waitFor(() =>
      expect(screen.getByText('Isra works with React, TypeScript and Node.js.')).toBeInTheDocument(),
    );
  });

  it('shows an error message when the assistant call fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => jsonResponse({ error: 'down' }, false, 500)),
    );
    const user = userEvent.setup();
    render(<AiAssistant />);

    const input = screen.getByLabelText('Ask a question about Isra');
    await user.type(input, 'Is Isra hireable?');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  });

  it('clears the conversation back to the welcome message', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => jsonResponse({ reply: 'Yes, open to remote roles.' })),
    );
    const user = userEvent.setup();
    render(<AiAssistant />);

    await user.click(screen.getByText('Is Isra available for remote work?'));
    await waitFor(() => expect(screen.getByText('Yes, open to remote roles.')).toBeInTheDocument());

    await user.click(screen.getByText('Clear conversation'));
    expect(screen.queryByText('Yes, open to remote roles.')).not.toBeInTheDocument();
    expect(screen.getByText(/only answer from her real portfolio info/i)).toBeInTheDocument();
  });
});