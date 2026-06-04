import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer';
import { owner } from '@/data/owner';

describe('Footer', () => {
  it('renders a <footer> semantic element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays the owner name', () => {
    render(<Footer />);
    expect(screen.getByText(owner.name)).toBeInTheDocument();
  });

  it('displays a copyright notice with the current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    // The copyright paragraph contains the year in its text content
    const copyright = screen.getByRole('contentinfo').querySelector('p');
    expect(copyright?.textContent).toContain(year);
  });

  it('renders a social media nav landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('navigation', { name: /social media links/i })).toBeInTheDocument();
  });

  it('renders a link for every social platform in owner data', () => {
    render(<Footer />);
    owner.socialLinks.forEach((link) => {
      const anchor = screen.getByRole('link', { name: link.label });
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute('href', link.url);
    });
  });

  it('opens every social link in a new tab with noopener noreferrer', () => {
    render(<Footer />);
    owner.socialLinks.forEach((link) => {
      const anchor = screen.getByRole('link', { name: link.label });
      expect(anchor).toHaveAttribute('target', '_blank');
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('all social link anchors meet the 44×44px minimum touch target via Tailwind classes', () => {
    render(<Footer />);
    owner.socialLinks.forEach((link) => {
      const anchor = screen.getByRole('link', { name: link.label });
      // Verify the min-h and min-w classes are present
      expect(anchor.className).toMatch(/min-h-\[44px\]/);
      expect(anchor.className).toMatch(/min-w-\[44px\]/);
    });
  });
});
