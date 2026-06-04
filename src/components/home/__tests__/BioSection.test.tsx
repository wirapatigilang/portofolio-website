import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BioSection from '../BioSection';
import { owner } from '@/data/owner';

// ============================================================
// Unit tests — BioSection
// ============================================================

describe('BioSection', () => {
  it('renders a section landmark with an accessible label', () => {
    render(<BioSection />);
    expect(
      screen.getByRole('region', { name: /tentang saya/i })
    ).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(<BioSection />);
    expect(
      screen.getByRole('heading', { name: /tentang saya/i })
    ).toBeInTheDocument();
  });

  it('displays the owner bio text', () => {
    render(<BioSection />);
    expect(screen.getByText(owner.bio)).toBeInTheDocument();
  });

  it('bio text is at most 3 sentences', () => {
    // Split on sentence-ending punctuation followed by whitespace or end-of-string
    const sentences = owner.bio
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim().length > 0);
    expect(sentences.length).toBeLessThanOrEqual(3);
  });

  it('renders a CTA link that points to /contact', () => {
    render(<BioSection />);
    const ctaLink = screen.getByRole('link', { name: /hubungi saya/i });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute('href', '/contact');
  });

  it('CTA link does not open in a new tab (internal navigation)', () => {
    render(<BioSection />);
    const ctaLink = screen.getByRole('link', { name: /hubungi saya/i });
    expect(ctaLink).not.toHaveAttribute('target', '_blank');
  });

  it('CTA link has an arrow indicator (aria-hidden)', () => {
    const { container } = render(<BioSection />);
    const arrow = container.querySelector('[aria-hidden="true"]');
    expect(arrow).toBeInTheDocument();
    expect(arrow?.textContent).toBe('→');
  });

  it('CTA link meets minimum 44px touch target requirement', () => {
    render(<BioSection />);
    const ctaLink = screen.getByRole('link', { name: /hubungi saya/i });
    expect(ctaLink.className).toContain('min-h-[44px]');
    expect(ctaLink.className).toContain('min-w-[44px]');
  });

  it('CTA link has visible focus indicator classes', () => {
    render(<BioSection />);
    const ctaLink = screen.getByRole('link', { name: /hubungi saya/i });
    expect(ctaLink.className).toContain('focus-visible:ring-2');
    expect(ctaLink.className).toContain('focus-visible:ring-offset-2');
  });
});
