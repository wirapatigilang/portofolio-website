import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroSection from "../HeroSection";

// ============================================================
// Mock framer-motion — avoids animation side-effects in tests
// ============================================================

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement> & { [key: string]: unknown }) => (
      <div className={className} {...rest}>
        {children}
      </div>
    ),
    h1: ({ children, className, ...rest }: React.HTMLAttributes<HTMLHeadingElement> & { [key: string]: unknown }) => (
      <h1 className={className} {...rest}>
        {children}
      </h1>
    ),
    p: ({ children, className, ...rest }: React.HTMLAttributes<HTMLParagraphElement> & { [key: string]: unknown }) => (
      <p className={className} {...rest}>
        {children}
      </p>
    ),
  },
}));

// ============================================================
// Mock next/image — renders a plain <img> so src/alt are testable
// ============================================================

vi.mock("next/image", () => ({
  default: ({ src, alt, fill: _fill, sizes: _sizes, priority: _priority, className, ...rest }: { src: string; alt: string; fill?: boolean; sizes?: string; priority?: boolean; className?: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    // @ts-expect-error test assertion
    <img src={src} alt={alt} className={className} priority={_priority ? "" : undefined} {...rest} />
  ),
}));

// ============================================================
// Test data
// ============================================================

const mockOwner = {
  name: "Gilang Wirapati",
  tagline: "Software Engineer & Creative — membangun produk digital dan karya visual yang bermakna.",
  profileImage: "/images/profile/gilang-wirapati.jpg",
};

function renderHero(overrides?: Partial<typeof mockOwner>) {
  return render(<HeroSection owner={{ ...mockOwner, ...overrides }} />);
}

// ============================================================
// Unit tests — Requirement 1.1: Hero section content
// ============================================================

describe("HeroSection — owner name (Req 1.1)", () => {
  it("renders the owner name as an h1 heading", () => {
    renderHero();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(mockOwner.name);
  });

  it("renders exactly one h1 element", () => {
    renderHero();
    const h1Elements = document.querySelectorAll("h1");
    expect(h1Elements.length).toBe(1);
  });
});

describe("HeroSection — profile image (Req 1.1)", () => {
  it("renders the profile image", () => {
    renderHero();
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });

  it("profile image has a descriptive alt text containing the owner name", () => {
    renderHero();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt");
    expect(img.getAttribute("alt")).toContain(mockOwner.name);
  });

  it("profile image uses the correct src from owner data", () => {
    renderHero();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockOwner.profileImage);
  });
});

describe("HeroSection — tagline (Req 1.1)", () => {
  it("renders the tagline text", () => {
    renderHero();
    expect(screen.getByText(mockOwner.tagline)).toBeInTheDocument();
  });
});

describe("HeroSection — domain labels (Req 1.1)", () => {
  it('displays "Software Engineering" domain label', () => {
    renderHero();
    expect(screen.getByText("Software Engineering")).toBeInTheDocument();
  });

  it('displays "Creative Work" domain label', () => {
    renderHero();
    expect(screen.getByText("Creative Work")).toBeInTheDocument();
  });
});

// ============================================================
// Unit tests — Requirement 1.6: Performance / LCP
// ============================================================

describe("HeroSection — performance (Req 1.6)", () => {
  it("profile image has priority attribute for LCP optimisation", () => {
    renderHero();
    // The mock passes through all extra props; priority should be present
    const img = screen.getByRole("img");
    // priority is a boolean prop — it will be rendered as an attribute in the mock
    expect(img).toHaveAttribute("priority");
  });
});

// ============================================================
// Unit tests — Accessibility (Req 8.4, 8.5)
// ============================================================

describe("HeroSection — accessibility", () => {
  it("renders a <section> landmark with an accessible label", () => {
    renderHero();
    const section = screen.getByRole("region", { name: /perkenalan/i });
    expect(section).toBeInTheDocument();
  });

  it("domain badges container has an accessible label", () => {
    renderHero();
    const badgesContainer = screen.getByRole("group", { hidden: true });
    // Fallback: check aria-label attribute directly
    const el = document.querySelector('[aria-label="Bidang keahlian"]');
    expect(el).toBeInTheDocument();
  });
});
