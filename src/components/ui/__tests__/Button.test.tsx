import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fc from 'fast-check';
import Button from '../Button';
import CTAButton from '../CTAButton';

// ============================================================
// Unit tests — Button
// ============================================================

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('defaults to type="button" to prevent accidental form submission', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('applies primary variant classes by default', () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-foreground');
    expect(btn.className).toContain('text-background');
  });

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('border');
    expect(btn.className).toContain('border-foreground');
  });

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-transparent');
  });

  it('enforces minimum 44px touch target for sm size', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button').className).toContain('min-h-[44px]');
    expect(screen.getByRole('button').className).toContain('min-w-[44px]');
  });

  it('enforces minimum 44px touch target for md size', () => {
    render(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button').className).toContain('min-h-[44px]');
    expect(screen.getByRole('button').className).toContain('min-w-[44px]');
  });

  it('enforces minimum 44px touch target for lg size', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button').className).toContain('min-h-[44px]');
    expect(screen.getByRole('button').className).toContain('min-w-[44px]');
  });

  it('has visible focus indicator classes', () => {
    render(<Button>Focus</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('focus-visible:ring-2');
    expect(btn.className).toContain('focus-visible:ring-offset-2');
  });

  it('is disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('merges custom className with base classes', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button').className).toContain('custom-class');
  });

  it('forwards additional HTML button attributes', () => {
    render(<Button aria-label="custom label">Btn</Button>);
    expect(screen.getByRole('button', { name: 'custom label' })).toBeInTheDocument();
  });

  it('is keyboard accessible — can be activated with Enter key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Keyboard</Button>);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard accessible — can be activated with Space key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Space</Button>);
    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// ============================================================
// Unit tests — CTAButton
// ============================================================

describe('CTAButton', () => {
  it('renders as a button by default', () => {
    render(<CTAButton>Contact Me</CTAButton>);
    expect(screen.getByRole('button', { name: /contact me/i })).toBeInTheDocument();
  });

  it('renders as an anchor when href is provided', () => {
    render(<CTAButton href="/contact">Contact</CTAButton>);
    const link = screen.getByRole('link', { name: /contact/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('adds target="_blank" and rel="noopener noreferrer" for external links', () => {
    render(<CTAButton href="https://example.com" external>External</CTAButton>);
    const link = screen.getByRole('link', { name: /external/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not add target="_blank" for internal links', () => {
    render(<CTAButton href="/about">About</CTAButton>);
    const link = screen.getByRole('link', { name: /about/i });
    expect(link).not.toHaveAttribute('target', '_blank');
  });

  it('renders an arrow indicator (aria-hidden)', () => {
    const { container } = render(<CTAButton>Go</CTAButton>);
    const arrow = container.querySelector('[aria-hidden="true"]');
    expect(arrow).toBeInTheDocument();
    expect(arrow?.textContent).toBe('→');
  });

  it('enforces minimum 44px touch target', () => {
    render(<CTAButton>CTA</CTAButton>);
    // CTAButton delegates to Button which always has min-h/min-w classes
    const el = screen.getByRole('button', { name: /cta/i });
    expect(el.className).toContain('min-h-[44px]');
    expect(el.className).toContain('min-w-[44px]');
  });

  it('enforces minimum 44px touch target when rendered as anchor', () => {
    render(<CTAButton href="/contact">CTA Link</CTAButton>);
    const el = screen.getByRole('link', { name: /cta link/i });
    expect(el.className).toContain('min-h-[44px]');
    expect(el.className).toContain('min-w-[44px]');
  });

  it('has visible focus indicator when rendered as anchor', () => {
    render(<CTAButton href="/contact">Focus Link</CTAButton>);
    const el = screen.getByRole('link', { name: /focus link/i });
    expect(el.className).toContain('focus-visible:ring-2');
    expect(el.className).toContain('focus-visible:ring-offset-2');
  });

  it('calls onClick handler when clicked as button', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<CTAButton onClick={handleClick}>Click CTA</CTAButton>);
    await user.click(screen.getByRole('button', { name: /click cta/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// ============================================================
// Property-based tests
// ============================================================

describe('Button — property-based tests', () => {
  /**
   * Feature: portfolio-website, Property: Button touch target ≥44px for all variants and sizes
   * Validates: Requirements 8.6
   */
  it('all variant+size combinations always enforce ≥44px touch target classes', () => {
    const variants = ['primary', 'secondary', 'ghost'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;

    fc.assert(
      fc.property(
        fc.constantFrom(...variants),
        fc.constantFrom(...sizes),
        fc.string({ minLength: 1, maxLength: 30 }),
        (variant, size, label) => {
          const { container } = render(
            <Button variant={variant} size={size}>
              {label}
            </Button>
          );
          const btn = container.querySelector('button');
          if (!btn) return false;
          return (
            btn.className.includes('min-h-[44px]') &&
            btn.className.includes('min-w-[44px]')
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: portfolio-website, Property: Button always has visible focus indicator classes
   * Validates: Requirements 8.3
   */
  it('all variant+size combinations always include focus-visible ring classes', () => {
    const variants = ['primary', 'secondary', 'ghost'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;

    fc.assert(
      fc.property(
        fc.constantFrom(...variants),
        fc.constantFrom(...sizes),
        (variant, size) => {
          const { container } = render(
            <Button variant={variant} size={size}>
              Test
            </Button>
          );
          const btn = container.querySelector('button');
          if (!btn) return false;
          return (
            btn.className.includes('focus-visible:ring-2') &&
            btn.className.includes('focus-visible:ring-offset-2')
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: portfolio-website, Property: CTAButton always renders arrow indicator
   * Validates: Requirements 8.3, 8.6
   */
  it('CTAButton always renders an aria-hidden arrow indicator for any label', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (label) => {
          const { container } = render(<CTAButton>{label}</CTAButton>);
          const arrow = container.querySelector('[aria-hidden="true"]');
          return arrow !== null && arrow.textContent === '→';
        }
      ),
      { numRuns: 100 }
    );
  });
});
