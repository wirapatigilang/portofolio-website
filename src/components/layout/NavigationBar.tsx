'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { owner } from '@/data/owner';

// ============================================================
// Navigation link definitions
// ============================================================

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Software Engineering', href: '/software' },
  { label: 'Creative Work', href: '/creative' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// ============================================================
// NavigationBar component
// ============================================================

/**
 * Sticky navigation bar with:
 * - Owner name/logo on the left linking to /
 * - 5 nav links on the right (desktop)
 * - Active link indicator via usePathname() (underline + different color, aria-current="page")
 * - Hamburger menu for mobile (≤768px): hides links, shows hamburger icon
 * - Toggle mobile menu: show/hide links in vertical layout
 *
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6
 */
export default function NavigationBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-foreground/10"
      role="banner"
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Navigasi utama"
      >
        <div className="flex h-16 items-center justify-between">
          {/* ── Logo / Owner name ── */}
          <Link
            href="/"
            className={
              'text-lg font-semibold tracking-tight text-foreground ' +
              'transition-opacity duration-150 hover:opacity-70 ' +
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 rounded-sm ' +
              'min-h-[44px] min-w-[44px] inline-flex items-center'
            }
            aria-label={`${owner.name} — kembali ke halaman utama`}
          >
            {owner.name}
          </Link>

          {/* ── Desktop navigation links ── */}
          <ul
            className="hidden md:flex items-center gap-1"
            role="list"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'relative inline-flex items-center min-h-[44px] px-3 py-2 text-sm font-medium rounded-sm',
                      'transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2',
                      active
                        ? 'text-foreground after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-foreground after:rounded-full'
                        : 'text-foreground/60 hover:text-foreground',
                    ].join(' ')}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Hamburger button (mobile only) ── */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className={
              'md:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-sm ' +
              'text-foreground transition-colors duration-150 hover:bg-foreground/10 ' +
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2'
            }
          >
            {/* Hamburger / Close icon */}
            <span className="sr-only">
              {mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            </span>
            {mobileMenuOpen ? (
              /* X icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Hamburger icon (three horizontal lines) */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-foreground/10 py-3"
          >
            <ul
              className="flex flex-col gap-1"
              role="list"
            >
              {NAV_LINKS.map(({ label, href }) => {
                const active = isActive(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeMobileMenu}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'flex items-center min-h-[44px] px-3 py-2 text-base font-medium rounded-sm',
                        'transition-colors duration-150',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2',
                        active
                          ? 'text-foreground border-l-2 border-foreground pl-[10px]'
                          : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5',
                      ].join(' ')}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
