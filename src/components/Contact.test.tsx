import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Contact } from './Contact';
import { links } from '../data/portfolioData';

describe('Contact section', () => {
  it('renders a mailto link, a LinkedIn link and a GitHub link', () => {
    render(<Contact />);

    expect(screen.getByText('Email Me').closest('a')).toHaveAttribute(
      'href',
      `mailto:${links.email}`,
    );
    expect(screen.getByText('LinkedIn').closest('a')).toHaveAttribute('href', links.linkedin);
    expect(screen.getByText('GitHub').closest('a')).toHaveAttribute('href', links.github);
  });
});