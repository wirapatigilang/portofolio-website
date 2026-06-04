# Project Structure

```
src/
├── app/                        # Next.js App Router pages and layouts
│   ├── layout.tsx              # Root layout — NavigationBar, Footer, fonts, global CSS
│   ├── page.tsx                # Home (/)
│   ├── software/
│   │   └── page.tsx            # Software Engineering (/software)
│   ├── creative/
│   │   ├── page.tsx            # Creative Work (/creative)
│   │   └── [slug]/page.tsx     # Video detail page
│   ├── about/
│   │   └── page.tsx            # About (/about)
│   ├── contact/
│   │   └── page.tsx            # Contact (/contact)
│   ├── api/
│   │   └── contact/route.ts    # Server Action — sends email via Resend
│   ├── sitemap.ts              # Dynamic sitemap.xml generation
│   ├── robots.ts               # robots.txt generation
│   ├── error.tsx               # Root error boundary
│   └── not-found.tsx           # Custom 404 page
│
├── components/
│   ├── layout/
│   │   ├── NavigationBar.tsx   # Sticky nav, hamburger menu, active link indicator
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx     # Name, profile image, tagline
│   │   ├── DomainSwitcher.tsx  # Two domain entry points
│   │   └── BioSection.tsx      # Short bio + CTA
│   ├── software/
│   │   ├── ProjectCard.tsx     # Project summary card with thumbnail
│   │   ├── ProjectModal.tsx    # Full project detail modal
│   │   ├── TechStackSection.tsx
│   │   └── ProjectFilter.tsx   # Category filter buttons
│   ├── creative/
│   │   ├── PhotoGallery.tsx    # Grid/masonry photo layout
│   │   ├── Lightbox.tsx        # Full-res photo overlay with prev/next nav
│   │   ├── VideoCard.tsx       # Video thumbnail + metadata card
│   │   ├── VideoPlayer.tsx     # Embed player with fallback link
│   │   └── CreativeFilter.tsx
│   ├── about/
│   │   ├── Timeline.tsx        # Career/education entries, descending order
│   │   └── AchievementsSection.tsx  # Conditionally rendered if data exists
│   ├── contact/
│   │   ├── ContactForm.tsx     # React Hook Form + Zod, Server Action submit
│   │   └── SocialLinks.tsx
│   └── ui/                     # Shared primitives
│       ├── Button.tsx          # Variants: primary, secondary, ghost; min 44x44px touch target
│       ├── Badge.tsx           # Tech stack / category pill
│       ├── EmptyState.tsx      # Shown when filter returns no results
│       └── CTAButton.tsx
│
├── data/                       # Static content — edit here to update portfolio
│   ├── owner.ts                # Name, bio, tagline, photo, email, social links, CV URL
│   ├── projects.ts             # Software projects
│   ├── photos.ts               # Photo metadata (thumbnail + full-res paths, category)
│   ├── videos.ts               # Video metadata (embedUrl, externalUrl, tools, role)
│   └── experience.ts           # Career/education timeline + achievements
│
├── lib/
│   ├── email.ts                # Resend helper
│   ├── validations.ts          # Zod schemas (contactFormSchema)
│   └── utils.ts                # filterProjects, filterPhotos, filterVideos,
│                               # sortExperience, generateMetadata
│
└── types/
    └── index.ts                # All shared TypeScript types
```

## Conventions

- **Pages are SSG by default** — no `export const dynamic` needed unless opting into dynamic rendering.
- **Data lives in `src/data/`** — never fetch from an external CMS; update `.ts` files directly.
- **Shared primitives go in `src/components/ui/`** — domain-specific components go in their own subfolder.
- **Zod schemas in `src/lib/validations.ts`** are the single source of truth for form types — derive TypeScript types from them with `z.infer<>`.
- **Tests co-located** in `__tests__/` folders next to the code they test.
- **Property-based tests** use `fast-check` and are tagged with `Feature: portfolio-website, Property N: description` in the test name.
- **All images** use `next/image` — never a plain `<img>` tag.
- **All interactive elements** must have visible focus indicators and meet 44×44px minimum touch target size.
