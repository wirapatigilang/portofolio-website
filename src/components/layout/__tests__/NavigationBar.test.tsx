import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationBar from '../NavigationBar';
import { owner } from '@/data/owner';

// ============================================================
// Mock next/navigation
// ============================================================

const mockUsePathname = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

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
// Helpers
// ============================================================

function renderNav(pathname = '/') {
  mockUsePathname.mockReturnValue(pathname);
  return render(<NavigationBar />);
}

// ============================================================
// Unit tests — Requirement 2.1: sticky/fixed positioning
// ============================================================

describe('NavigationBar — sticky positioning (Req 2.1)', () => {
  it('renders a <header> element as the root', () => {
    renderNav();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('header has sticky and top-0 classes for always-visible behaviour', () => {
    renderNav();
    const header = screen.getByRole('banner');
    expect(header.className).toContain('sticky');
    expect(header.className).toContain('top-0');
  });

  it('header has a high z-index class (z-50)', () => {
    renderNav();
    const header = screen.getByRole('banner');
    expect(header.className).toContain('z-50');
  });
});

// ============================================================
// Unit tests — Requirement 2.6: Owner name/logo on the left
// ============================================================

describe('NavigationBar — owner logo link (Req 2.6)', () => {
  it('renders the owner name as a link', () => {
    renderNav();
    const logoLink = screen.getByRole('link', { name: new RegExp(owner.name, 'i') });
    expect(logoLink).toBeInTheDocument();
  });

  it('owner name link points to /', () => {
    renderNav();
    const logoLink = screen.getByRole('link', { name: new RegExp(owner.name, 'i') });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('owner name link has an accessible aria-label mentioning the owner name', () => {
    renderNav();
    const logoLink = screen.getByRole('link', { name: new RegExp(owner.name, 'i') });
    expect(logoLink).toHaveAttribute('aria-label');
    expect(logoLink.getAttribute('aria-label')).toContain(owner.name);
  });
});

// ============================================================
// Unit tests — Requirement 2.2: 5 navigation links present
// ============================================================

describe('NavigationBar — navigation links (Req 2.2)', () => {
  it('renders a nav element with accessible label', () => {
    renderNav();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders a link to Home (/)', () => {
    renderNav();
    const links = screen.getAllByRole('link', { name: /^home$/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveAttribute('href', '/');
  });

  it('renders a link to Software Engineering (/software)', () => {
    renderNav();
    const links = screen.getAllByRole('link', { name: /software engineering/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveAttribute('href', '/software');
  });

  it('renders a link to Creative Work (/creative)', () => {
    renderNav();
    const links = screen.getAllByRole('link', { name: /creative work/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveAttribute('href', '/creative');
  });

  it('renders a link to About (/about)', () => {
    renderNav();
    const links = screen.getAllByRole('link', { name: /^about$/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveAttribute('href', '/about');
  });

  it('renders a link to Contact (/contact)', () => {
    renderNav();
    const links = screen.getAllByRole('link', { name: /^contact$/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveAttribute('href', '/contact');
  });
});

// ============================================================
// Unit tests — Requirement 2.3: Active link indicator
// ============================================================

describe('NavigationBar — active link indicator (Req 2.3)', () => {
  it('marks the Home link as aria-current="page" when on /', () => {
    renderNav('/');
    const homeLinks = screen.getAllByRole('link', { name: /^home$/i });
    const activeLink = homeLinks.find(
      (l) => l.getAttribute('aria-current') === 'page'
    );
    expect(activeLink).toBeDefined();
  });

  it('marks the Software Engineering link as aria-current="page" when on /software', () => {
    renderNav('/software');
    const links = screen.getAllByRole('link', { name: /software engineering/i });
    const activeLink = links.find(
      (l) => l.getAttribute('aria-current') === 'page'
    );
    expect(activeLink).toBeDefined();
  });

  it('marks the Creative Work link as aria-current="page" when on /creative', () => {
    renderNav('/creative');
    const links = screen.getAllByRole('link', { name: /creative work/i });
    const activeLink = links.find(
      (l) => l.getAttribute('aria-current') === 'page'
    );
    expect(activeLink).toBeDefined();
  });

  it('marks the About link as aria-current="page" when on /about', () => {
    renderNav('/about');
    const links = screen.getAllByRole('link', { name: /^about$/i });
    const activeLink = links.find(
      (l) => l.getAttribute('aria-current') === 'page'
    );
    expect(activeLink).toBeDefined();
  });

  it('marks the Contact link as aria-current="page" when on /contact', () => {
    renderNav('/contact');
    const links = screen.getAllByRole('link', { name: /^contact$/i });
    const activeLink = links.find(
      (l) => l.getAttribute('aria-current') === 'page'
    );
    expect(activeLink).toBeDefined();
  });

  it('does not mark Home as active when on /software', () => {
    renderNav('/software');
    const homeLinks = screen.getAllByRole('link', { name: /^home$/i });
    const activeHomeLink = homeLinks.find(
      (l) => l.getAttribute('aria-current') === 'page'
    );
    expect(activeHomeLink).toBeUndefined();
  });

  it('active link has visually distinct class (text-foreground)', () => {
    renderNav('/about');
    const links = screen.getAllByRole('link', { name: /^about$/i });
    const activeLink = links.find(
      (l) => l.getAttribute('aria-current') === 'page'
    );
    expect(activeLink?.className).toContain('text-foreground');
  });
});

// ============================================================
// Unit tests — Requirement 2.4: Hamburger menu on mobile
// ============================================================

describe('NavigationBar — hamburger menu (Req 2.4)', () => {
  it('renders a hamburger button', () => {
    renderNav();
    const hamburger = screen.getByRole('button', { name: /buka menu navigasi/i });
    expect(hamburger).toBeInTheDocument();
  });

  it('hamburger button has aria-expanded="false" initially', () => {
    renderNav();
    const hamburger = screen.getByRole('button', { name: /buka menu navigasi/i });
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('hamburger button has aria-controls pointing to mobile-menu', () => {
    renderNav();
    const hamburger = screen.getByRole('button', { name: /buka menu navigasi/i });
    expect(hamburger).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  it('hamburger button enforces minimum 44×44px touch target', () => {
    renderNav();
    const hamburger = screen.getByRole('button', { name: /buka menu navigasi/i });
    expect(hamburger.className).toContain('min-h-[44px]');
    expect(hamburger.className).toContain('min-w-[44px]');
  });

  it('hamburger button has visible focus indicator classes', () => {
    renderNav();
    const hamburger = screen.getByRole('button', { name: /buka menu navigasi/i });
    expect(hamburger.className).toContain('focus-visible:ring-2');
    expect(hamburger.className).toContain('focus-visible:ring-offset-2');
  });
});

// ============================================================
// Unit tests — Requirement 2.5: Toggle mobile menu
// ============================================================

describe('NavigationBar — mobile menu toggle (Req 2.5)', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('mobile menu is not visible initially', () => {
    render(<NavigationBar />);
    expect(screen.queryByRole('list', { hidden: false })).not.toHaveAttribute(
      'id',
      'mobile-menu'
    );
    // The mobile-menu div should not be in the DOM when closed
    expect(document.getElementById('mobile-menu')).toBeNull();
  });

  it('opens mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup();
    render(<NavigationBar />);
    const hamburger = screen.getByRole('button', { name: /buka menu navigasi/i });
    await user.click(hamburger);
    expect(document.getElementById('mobile-menu')).toBeInTheDocument();
  });

  it('sets aria-expanded="true" when menu is open', async () => {
    const user = userEvent.setup();
    render(<NavigationBar />);
    const hamburger = screen.getByRole('button', { name: /buka menu navigasi/i });
    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows all 5 nav links in mobile menu when open', async () => {
    const user = userEvent.setup();
    render(<NavigationBar />);
    await user.click(screen.getByRole('button', { name: /buka menu navigasi/i }));

    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();

    // All 5 links should be present in the mobile menu
    const links = mobileMenu!.querySelectorAll('a');
    expect(links.length).toBe(5);
  });

  it('closes mobile menu when hamburger is clicked again', async () => {
    const user = userEvent.setup();
    render(<NavigationBar />);
    const hamburger = screen.getByRole('button', { name: /buka menu navigasi/i });

    // Open
    await user.click(hamburger);
    expect(document.getElementById('mobile-menu')).toBeInTheDocument();

    // Close
    await user.click(screen.getByRole('button', { name: /tutup menu navigasi/i }));
    expect(document.getElementById('mobile-menu')).toBeNull();
  });

  it('closes mobile menu when a nav link is clicked', async () => {
    const user = userEvent.setup();
    render(<NavigationBar />);

    // Open menu
    await user.click(screen.getByRole('button', { name: /buka menu navigasi/i }));
    expect(document.getElementById('mobile-menu')).toBeInTheDocument();

    // Click a link inside the mobile menu
    const mobileMenu = document.getElementById('mobile-menu');
    const aboutLink = mobileMenu!.querySelector('a[href="/about"]');
    expect(aboutLink).toBeInTheDocument();
    await user.click(aboutLink!);

    expect(document.getElementById('mobile-menu')).toBeNull();
  });

  it('mobile menu links are displayed in vertical layout (flex-col)', async () => {
    const user = userEvent.setup();
    render(<NavigationBar />);
    await user.click(screen.getByRole('button', { name: /buka menu navigasi/i }));

    const mobileMenu = document.getElementById('mobile-menu');
    const list = mobileMenu!.querySelector('ul');
    expect(list?.className).toContain('flex-col');
  });

  it('mobile menu links enforce minimum 44×44px touch target', async () => {
    const user = userEvent.setup();
    render(<NavigationBar />);
    await user.click(screen.getByRole('button', { name: /buka menu navigasi/i }));

    const mobileMenu = document.getElementById('mobile-menu');
    const links = mobileMenu!.querySelectorAll('a');
    links.forEach((link) => {
      expect(link.className).toContain('min-h-[44px]');
    });
  });

  it('mobile menu active link has aria-current="page"', async () => {
    mockUsePathname.mockReturnValue('/about');
    const user = userEvent.setup();
    render(<NavigationBar />);
    await user.click(screen.getByRole('button', { name: /buka menu navigasi/i }));

    const mobileMenu = document.getElementById('mobile-menu');
    const aboutLink = mobileMenu!.querySelector('a[href="/about"]');
    expect(aboutLink).toHaveAttribute('aria-current', 'page');
  });
});

// ============================================================
// Unit tests — Accessibility
// ============================================================

describe('NavigationBar — accessibility', () => {
  it('all desktop nav links have visible focus indicator classes', () => {
    renderNav('/');
    // Get the desktop nav (hidden on mobile via md:flex)
    const nav = screen.getByRole('navigation');
    const links = nav.querySelectorAll('a');
    links.forEach((link) => {
      expect(link.className).toContain('focus-visible:ring-2');
      expect(link.className).toContain('focus-visible:ring-offset-2');
    });
  });

  it('hamburger SVG icons are aria-hidden', () => {
    renderNav();
    const hamburger = screen.getByRole('button', { name: /buka menu navigasi/i });
    const svg = hamburger.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('hamburger button has a screen-reader-only text label', () => {
    renderNav();
    const hamburger = screen.getByRole('button', { name: /buka menu navigasi/i });
    const srOnly = hamburger.querySelector('.sr-only');
    expect(srOnly).toBeInTheDocument();
  });
});
