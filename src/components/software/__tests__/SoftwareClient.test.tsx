import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SoftwareClient } from "../SoftwareClient";

// Mock the data
vi.mock("@/data/projects", () => ({
  softwareProjects: [
    {
      id: "p1",
      name: "Web Project 1",
      description: "Desc",
      fullDescription: "Full",
      challenges: "C",
      solutions: "S",
      techStack: ["React"],
      category: "Web App",
      featured: true,
    },
    {
      id: "p2",
      name: "Mobile App 1",
      description: "Desc 2",
      fullDescription: "Full 2",
      challenges: "C",
      solutions: "S",
      techStack: ["Flutter"],
      category: "Mobile App",
      featured: true,
    },
  ],
}));

describe("SoftwareClient", () => {
  it("filters projects based on category", async () => {
    render(<SoftwareClient />);

    // Initially shows all
    expect(screen.getByText("Web Project 1")).toBeInTheDocument();
    expect(screen.getByText("Mobile App 1")).toBeInTheDocument();

    // Click filter for Mobile App
    const mobileFilter = screen.getByRole("button", { name: "Mobile App" });
    await userEvent.click(mobileFilter);

    expect(screen.queryByText("Web Project 1")).not.toBeInTheDocument();
    expect(screen.getByText("Mobile App 1")).toBeInTheDocument();
  });

  it("shows EmptyState when no projects match", async () => {
    render(<SoftwareClient />);

    // Click Open Source filter (has no items in mock)
    const emptyFilter = screen.getByRole("button", { name: "Open Source" });
    await userEvent.click(emptyFilter);

    expect(screen.getByText(/Tidak ada proyek ditemukan untuk kategori Open Source/i)).toBeInTheDocument();
  });

  it("opens ProjectModal when ProjectCard is clicked", async () => {
    render(<SoftwareClient />);

    // Check modal is absent
    const dialogsBefore = screen.queryAllByRole("dialog");
    expect(dialogsBefore.length).toBe(0);

    // Click project 1
    const card = screen.getByRole("button", { name: /Lihat detail proyek Web Project 1/i });
    await userEvent.click(card);

    // Dialog should appear
    const dialogsAfter = screen.queryAllByRole("dialog");
    expect(dialogsAfter.length).toBe(1);

    // Check specific modal text (heading)
    expect(screen.getByRole("heading", { level: 2, name: "Web Project 1" })).toBeInTheDocument();
  });
});
