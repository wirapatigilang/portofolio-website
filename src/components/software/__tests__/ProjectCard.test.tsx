import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectCard } from "../ProjectCard";
import type { Project } from "@/types";
import { describe, it, expect, vi } from "vitest";

const mockProject: Project = {
  id: "p1",
  name: "Test Project",
  description: "This is a short description for the test project.",
  fullDescription: "This is a much longer description that would go into the modal.",
  challenges: "Some challenges",
  solutions: "Some solutions",
  techStack: ["React", "Next.js", "Tailwind"],
  category: "Web App",
  thumbnail: "/test-thumbnail.jpg",
  featured: true,
};

describe("ProjectCard", () => {
  it("renders all required fields properly (Property 11)", () => {
    render(<ProjectCard project={mockProject} onClick={vi.fn()} />);

    // Renders the name
    expect(screen.getByText("Test Project")).toBeInTheDocument();

    // Renders the description
    expect(screen.getByText("This is a short description for the test project.")).toBeInTheDocument();

    // Renders the category badge
    expect(screen.getByText("Web App")).toBeInTheDocument();

    // Renders the tech stack badges
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();

    // Renders the thumbnail image
    const img = screen.getByAltText(/Thumbnail proyek Test Project/i);
    expect(img).toBeInTheDocument();
  });

  it("renders a placeholder when thumbnail is not provided", () => {
    const projectWithoutThumbnail = { ...mockProject, thumbnail: undefined };
    const { container } = render(<ProjectCard project={projectWithoutThumbnail} onClick={vi.fn()} />);

    const svgPlaceholder = container.querySelector("svg");
    expect(svgPlaceholder).toBeInTheDocument();
  });

  it("calls onClick when the card is clicked", async () => {
    const handleClick = vi.fn();
    render(<ProjectCard project={mockProject} onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /Lihat detail proyek/i });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockProject);
  });

  it("truncates description if it exceeds 150 characters", () => {
    const longDescription = "a".repeat(200);
    const longProject = { ...mockProject, description: longDescription };

    render(<ProjectCard project={longProject} onClick={vi.fn()} />);

    const truncated = "a".repeat(147) + "...";
    expect(screen.getByText(truncated)).toBeInTheDocument();
  });
});
