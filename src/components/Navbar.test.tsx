import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('renders all primary navigation links', () => {
    render(<Navbar />);
    ['Home', 'About', 'Projects', 'Skills', 'Activity', 'Certificates', 'Contact'].forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });
  });

  it('toggles the mobile menu when the menu button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    expect(screen.queryByRole('list')).toBeInTheDocument(); // desktop list always in DOM

    const toggle = screen.getByLabelText('Open menu');
    await user.click(toggle);

    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });
});