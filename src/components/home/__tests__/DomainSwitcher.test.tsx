import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DomainSwitcher from '../DomainSwitcher';

// ============================================================
// Mock next/link — renders a plain <a> so href is testable
// ============================================================

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// ============================================================
// Mock framer-motion — renders children directly without animation
// ============================================================

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      [key: string]: unknown;
    }) => {
      // Strip framer-motion-specific props before passing to DOM
      const {
        variants: _v,
        initial: _i,
        animate: _a,
        whileHover: _wh,
        transition: _t,
        ...domProps
      } = props;
      return <div {...domProps}>{children}</div>;
    },
  },
}));

// ============================================================
// Unit tests — Requirement 1.2: Two domain entry points visible
// ============================================================

describe('DomainSwitcher — two domain entry points (Req 1.2)', () => {
  it('renders exactly two domain entry point links', () => {
    render(<DomainSwitcher />);
    // Both links have aria-label starting with "Lihat portofolio"
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });

  it('renders a link labeled "Software Engineering"', () => {
    render(<DomainSwitcher />);
    const link = screen.getByRole('link', {
      name: /software engineering/i,
    });
    expect(link).toBeInTheDocument();
  });

  it('renders a link labeled "Creative Work"', () => {
    render(<DomainSwitcher />);
    const link = screen.getByRole('link', {
      name: /creative work/i,
    });
    expect(link).toBeInTheDocument();
  });

  it('renders the "Software Engineering" label text visibly', () => {
    render(<DomainSwitcher />);
    expect(screen.getByText('Software Engineering')).toBeInTheDocument();
  });

  it('renders the "Creative Work" label text visibly', () => {
    render(<DomainSwitcher />);
    expect(screen.getByText('Creative Work')).toBeInTheDocument();
  });
});

// ============================================================
// Unit tests — Requirement 1.3: Links navigate to correct domain pages
// ============================================================

describe('DomainSwitcher — correct navigation links (Req 1.3)', () => {
  it('Software Engineering link points to /software', () => {
    render(<DomainSwitcher />);
    const link = screen.getByRole('link', { name: /software engineering/i });
    expect(link).toHaveAttribute('href', '/software');
  });

  it('Creative Work link points to /creative', () => {
    render(<DomainSwitcher />);
    const link = screen.getByRole('link', { name: /creative work/i });
    expect(link).toHaveAttribute('href', '/creative');
  });
});

// ============================================================
// Unit tests — Accessibility (Req 8.3, 8.6)
// ============================================================

describe('DomainSwitcher — accessibility', () => {
  it('renders a <section> with an accessible label', () => {
    render(<DomainSwitcher />);
    const section = screen.getByRole('region', { name: /pilih domain/i });
    expect(section).toBeInTheDocument();
  });

  it('each link has a descriptive aria-label', () => {
    render(<DomainSwitcher />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
      expect(link.getAttribute('aria-label')!.length).toBeGreaterThan(0);
    });
  });

  it('each link has visible focus indicator classes (focus-visible:ring-2)', () => {
    render(<DomainSwitcher />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link.className).toContain('focus-visible:ring-2');
      expect(link.className).toContain('focus-visible:ring-offset-2');
    });
  });

  it('each link meets minimum 44px touch target (min-h-[44px])', () => {
    render(<DomainSwitcher />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link.className).toContain('min-h-[44px]');
    });
  });

  it('decorative SVG icons are aria-hidden', () => {
    render(<DomainSwitcher />);
    const svgs = document.querySelectorAll('svg');
    svgs.forEach((svg) => {
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });
});

// ============================================================
// Unit tests — Content
// ============================================================

describe('DomainSwitcher — content', () => {
  it('renders a description for Software Engineering', () => {
    render(<DomainSwitcher />);
    // Description text is present somewhere in the component
    expect(
      screen.getByText(/proyek web & mobile/i)
    ).toBeInTheDocument();
  });

  it('renders a description for Creative Work', () => {
    render(<DomainSwitcher />);
    expect(
      screen.getByText(/fotografi, videografi/i)
    ).toBeInTheDocument();
  });
});
