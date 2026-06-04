import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import Badge from '../Badge';
import type {
  ProjectCategory,
  PhotoCategory,
  VideoCategory,
} from '@/types/index';

// ============================================================
// Unit tests — Badge
// ============================================================

describe('Badge', () => {
  it('renders the label text', () => {
    render(<Badge label="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders as a <span> element', () => {
    const { container } = render(<Badge label="TypeScript" />);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('applies default (neutral) variant classes when no variant is provided', () => {
    const { container } = render(<Badge label="Node.js" />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('bg-foreground/10');
    expect(span?.className).toContain('text-foreground');
  });

  it('applies default variant classes when variant="default"', () => {
    const { container } = render(<Badge label="Docker" variant="default" />);
    const span = container.querySelector('span');
    expect(span?.className).toContain('bg-foreground/10');
  });

  // ── ProjectCategory ───────────────────────────────────────

  it('applies blue color for "Web App" category', () => {
    const { container } = render(<Badge label="Web App" variant="Web App" />);
    expect(container.querySelector('span')?.className).toContain('bg-blue-100');
  });

  it('applies purple color for "Mobile App" category', () => {
    const { container } = render(<Badge label="Mobile App" variant="Mobile App" />);
    expect(container.querySelector('span')?.className).toContain('bg-purple-100');
  });

  it('applies green color for "API" category', () => {
    const { container } = render(<Badge label="API" variant="API" />);
    expect(container.querySelector('span')?.className).toContain('bg-green-100');
  });

  it('applies orange color for "Open Source" category', () => {
    const { container } = render(<Badge label="Open Source" variant="Open Source" />);
    expect(container.querySelector('span')?.className).toContain('bg-orange-100');
  });

  // ── PhotoCategory ─────────────────────────────────────────

  it('applies pink color for "Portrait" category', () => {
    const { container } = render(<Badge label="Portrait" variant="Portrait" />);
    expect(container.querySelector('span')?.className).toContain('bg-pink-100');
  });

  it('applies teal color for "Landscape" category', () => {
    const { container } = render(<Badge label="Landscape" variant="Landscape" />);
    expect(container.querySelector('span')?.className).toContain('bg-teal-100');
  });

  it('applies yellow color for "Event" category', () => {
    const { container } = render(<Badge label="Event" variant="Event" />);
    expect(container.querySelector('span')?.className).toContain('bg-yellow-100');
  });

  it('applies gray color for "Street" category', () => {
    const { container } = render(<Badge label="Street" variant="Street" />);
    expect(container.querySelector('span')?.className).toContain('bg-gray-100');
  });

  it('applies indigo color for "Product" category', () => {
    const { container } = render(<Badge label="Product" variant="Product" />);
    expect(container.querySelector('span')?.className).toContain('bg-indigo-100');
  });

  // ── VideoCategory ─────────────────────────────────────────

  it('applies slate color for "Cinematic" category', () => {
    const { container } = render(<Badge label="Cinematic" variant="Cinematic" />);
    expect(container.querySelector('span')?.className).toContain('bg-slate-100');
  });

  it('applies amber color for "Commercial" category', () => {
    const { container } = render(<Badge label="Commercial" variant="Commercial" />);
    expect(container.querySelector('span')?.className).toContain('bg-amber-100');
  });

  it('applies rose color for "Short Film" category', () => {
    const { container } = render(<Badge label="Short Film" variant="Short Film" />);
    expect(container.querySelector('span')?.className).toContain('bg-rose-100');
  });

  it('applies cyan color for "Motion Graphics" category', () => {
    const { container } = render(<Badge label="Motion Graphics" variant="Motion Graphics" />);
    expect(container.querySelector('span')?.className).toContain('bg-cyan-100');
  });

  // ── Pill shape & typography ───────────────────────────────

  it('always renders with rounded-full pill shape', () => {
    const { container } = render(<Badge label="pill" />);
    expect(container.querySelector('span')?.className).toContain('rounded-full');
  });

  it('always renders with text-xs font size', () => {
    const { container } = render(<Badge label="small" />);
    expect(container.querySelector('span')?.className).toContain('text-xs');
  });

  it('merges custom className with base classes', () => {
    const { container } = render(<Badge label="custom" className="my-custom-class" />);
    expect(container.querySelector('span')?.className).toContain('my-custom-class');
    expect(container.querySelector('span')?.className).toContain('rounded-full');
  });
});

// ============================================================
// Property-based tests — Badge
// ============================================================

describe('Badge — property-based tests', () => {
  const projectCategories: ProjectCategory[] = [
    'Web App',
    'Mobile App',
    'API',
    'Open Source',
  ];
  const photoCategories: PhotoCategory[] = [
    'Portrait',
    'Landscape',
    'Event',
    'Street',
    'Product',
  ];
  const videoCategories: VideoCategory[] = [
    'Cinematic',
    'Commercial',
    'Event',
    'Short Film',
    'Motion Graphics',
  ];
  const allCategories = [
    ...projectCategories,
    ...photoCategories,
    ...videoCategories,
  ] as const;

  /**
   * Feature: portfolio-website, Property: Badge always renders label text for any string input
   * Validates: Requirements 3.2, 3.3
   */
  it('always renders the provided label text for any non-empty string', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 60 }),
        (label) => {
          const { unmount } = render(<Badge label={label} />);
          const span = document.querySelector('span');
          const result = span?.textContent === label;
          unmount();
          return result;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: portfolio-website, Property: Badge always has pill shape for all category variants
   * Validates: Requirements 3.2, 3.3
   */
  it('always renders with rounded-full pill shape for all category variants', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allCategories),
        fc.string({ minLength: 1, maxLength: 30 }),
        (category, label) => {
          const { container, unmount } = render(
            <Badge label={label} variant={category} />
          );
          const span = container.querySelector('span');
          const result =
            span !== null && span.className.includes('rounded-full');
          unmount();
          return result;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: portfolio-website, Property: Badge always has a non-empty color class for all category variants
   * Validates: Requirements 3.2, 3.3
   */
  it('always applies a category-specific color class for all known category variants', () => {
    // Each category should produce a class that differs from the default neutral style
    const defaultClass = 'bg-foreground/10';

    fc.assert(
      fc.property(
        fc.constantFrom(...allCategories),
        (category) => {
          const { container, unmount } = render(
            <Badge label={category} variant={category} />
          );
          const span = container.querySelector('span');
          // Category badges must NOT use the default neutral background
          const result =
            span !== null && !span.className.includes(defaultClass);
          unmount();
          return result;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: portfolio-website, Property: Badge default variant always uses neutral style
   * Validates: Requirements 3.2, 3.3
   */
  it('default variant always uses neutral foreground-based color for any label', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 60 }),
        (label) => {
          const { container, unmount } = render(
            <Badge label={label} variant="default" />
          );
          const span = container.querySelector('span');
          const result =
            span !== null && span.className.includes('bg-foreground/10');
          unmount();
          return result;
        }
      ),
      { numRuns: 100 }
    );
  });
});
