import { owner } from '@/data/owner';
import type { SocialLink } from '@/types';

// ============================================================
// Social platform icons (inline SVG for zero-dependency icons)
// ============================================================

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.69.75-.63.148-1.29.222-1.98.222H0V4.502h6.938zm-.34 5.65c.585 0 1.07-.14 1.44-.42.37-.28.55-.72.55-1.32 0-.33-.06-.61-.18-.83-.12-.22-.29-.4-.5-.53-.21-.13-.45-.22-.72-.27-.27-.05-.55-.08-.84-.08H3.62v3.45h2.98zm.16 5.9c.32 0 .62-.03.9-.09.28-.06.53-.16.74-.31.21-.15.38-.35.5-.6.12-.25.18-.57.18-.96 0-.76-.21-1.3-.64-1.62-.43-.32-.99-.48-1.69-.48H3.62v4.06h3.14zm9.64-10.05h5.44v1.4h-5.44V6zm2.72 10.05c.5 0 .93-.12 1.28-.36.35-.24.6-.64.74-1.2h2.56c-.41 1.34-1.04 2.3-1.9 2.87-.86.57-1.9.86-3.12.86-.85 0-1.62-.14-2.3-.42-.68-.28-1.26-.67-1.73-1.18-.47-.51-.83-1.12-1.08-1.83-.25-.71-.37-1.49-.37-2.34 0-.82.13-1.58.38-2.28.25-.7.61-1.3 1.08-1.81.47-.51 1.04-.9 1.71-1.18.67-.28 1.42-.42 2.25-.42.92 0 1.72.18 2.4.54.68.36 1.24.84 1.67 1.44.43.6.74 1.28.93 2.04.19.76.25 1.55.18 2.37h-7.6c.04.9.3 1.6.78 2.1.48.5 1.14.75 1.98.75zm1.9-5.9c-.44 0-.82.1-1.14.3-.32.2-.57.46-.75.78-.18.32-.3.66-.36 1.02h4.5c-.1-.88-.38-1.54-.84-1.98-.46-.44-1.02-.66-1.68-.66h.27z" />
    </svg>
  );
}

function VimeoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.48 4.807z" />
    </svg>
  );
}

// ============================================================
// Icon map
// ============================================================

const platformIcons: Record<SocialLink['platform'], React.ReactNode> = {
  LinkedIn: <LinkedInIcon />,
  GitHub: <GitHubIcon />,
  Instagram: <InstagramIcon />,
  YouTube: <YouTubeIcon />,
  Behance: <BehanceIcon />,
  Vimeo: <VimeoIcon />,
};

// ============================================================
// Footer component
// ============================================================

/**
 * Site-wide footer.
 *
 * - Displays Owner name, copyright notice, and social media links
 * - Uses semantic <footer> landmark element (Requirement 8.5)
 * - Social links open in a new tab with rel="noopener noreferrer" (Requirement 7.6)
 * - All interactive elements meet 44×44px minimum touch target (Requirement 8.6)
 * - Visible focus indicators on all links (Requirement 8.3)
 *
 * Validates: Requirements 7.6, 8.3, 8.5, 8.6
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Owner name + copyright */}
          <p className="text-sm text-foreground/60">
            &copy; {currentYear}{' '}
            <span className="font-medium text-foreground">{owner.name}</span>
            {'. '}
            All rights reserved.
          </p>

          {/* Social media links */}
          <nav aria-label="Social media links">
            <ul className="flex items-center gap-1" role="list">
              {owner.socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={
                      'inline-flex min-h-[44px] min-w-[44px] items-center justify-center ' +
                      'rounded-md text-foreground/60 transition-colors duration-150 ' +
                      'hover:text-foreground ' +
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2'
                    }
                  >
                    {platformIcons[link.platform]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
