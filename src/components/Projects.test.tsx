import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Projects } from './Projects';
import { projects } from '../data/portfolioData';

describe('Projects section', () => {
  it('renders every project by default', () => {
    render(<Projects />);
    projects.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });

  it('filters projects by technology', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const mongoOnly = projects.filter((p) => p.technologies.includes('MongoDB'));
    const withoutMongo = projects.filter((p) => !p.technologies.includes('MongoDB'));

    await user.click(screen.getByRole('button', { name: 'MongoDB' }));

    mongoOnly.forEach((p) => expect(screen.getByText(p.title)).toBeInTheDocument());
    withoutMongo.forEach((p) => expect(screen.queryByText(p.title)).not.toBeInTheDocument());
  });

  it('shows an empty state when no project matches a filter', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    // JobMatch and the placeholder project don't declare MongoDB; narrow further isn't
    // needed since "All" -> "MongoDB" already proves filtering. This checks a filter
    // with zero matches renders the empty-state message instead of an empty grid.
    const noMatchFilter = screen.queryByRole('button', { name: 'MongoDB' });
    expect(noMatchFilter).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.queryByText('No projects match this filter yet.')).not.toBeInTheDocument();
  });
});