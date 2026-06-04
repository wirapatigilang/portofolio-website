"use client";

import React from "react";
import Button from "@/components/ui/Button";
import type { ProjectCategory } from "@/types";

interface ProjectFilterProps {
  categories: ProjectCategory[];
  currentCategory: ProjectCategory | null;
  onChangeCategory: (category: ProjectCategory | null) => void;
}

export function ProjectFilter({ categories, currentCategory, onChangeCategory }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter proyek">
      <Button variant={currentCategory === null ? "primary" : "secondary"} size="sm" onClick={() => onChangeCategory(null)} aria-pressed={currentCategory === null}>
        All Projects
      </Button>
      {categories.map((category) => (
        <Button key={category} variant={currentCategory === category ? "primary" : "secondary"} size="sm" onClick={() => onChangeCategory(category)} aria-pressed={currentCategory === category}>
          {category}
        </Button>
      ))}
    </div>
  );
}
