# Tech Stack

## Core Framework

- **Next.js 14** — App Router, Static Site Generation (SSG) by default, Server Actions for contact form
- **TypeScript** — strict mode enabled
- **React 18** — with Server Components where applicable

## Styling & Animation

- **Tailwind CSS v3** — utility-first styling
- **Framer Motion** — scroll animations and page transitions

## Forms & Validation

- **React Hook Form** — form state management with minimal re-renders
- **Zod** — type-safe schema validation (shared between client and server)

## Email

- **Resend** — contact form email delivery via Next.js Server Action (no separate backend)
- **@react-email/components** — email template rendering

## Images

- **next/image** — automatic WebP/AVIF conversion, lazy loading, layout shift prevention

## Testing

- **Vitest** — test runner (jsdom environment)
- **@testing-library/react** + **@testing-library/user-event** — component rendering and interaction
- **fast-check** — property-based testing (PBT), minimum 100 runs per property
- **jest-axe** — automated accessibility testing
- **Playwright** — end-to-end tests
- **Lighthouse CI** — performance audits on every PR

## Deployment

- **Vercel** — hosting with Edge CDN for static assets
- Custom domain via Vercel DNS

---

## Common Commands

```bash
# Development
npm run dev

# Type checking (no emit)
npx tsc --noEmit

# Build
npm run build

# Run unit/property tests (single run, no watch)
npx vitest --run

# Run tests with coverage
npx vitest --run --coverage

# Run Playwright e2e tests
npx playwright test

# Lint
npm run lint
```
