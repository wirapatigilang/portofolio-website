"use client";

import React from "react";
import type { ProjectCategory } from "@/types";
import { motion } from "framer-motion";

interface ProjectFilterProps {
  categories: ProjectCategory[];
  currentCategory: ProjectCategory | null;
  onChangeCategory: (category: ProjectCategory | null) => void;
}

export function ProjectFilter({ categories, currentCategory, onChangeCategory }: ProjectFilterProps) {
  const filterOptions = [null, ...categories];

  return (
    <div className="flex flex-wrap gap-3 mb-8" role="group" aria-label="Filter proyek">
      {filterOptions.map((category) => {
        const isActive = currentCategory === category;
        const label = category === null ? "All Projects" : category;

        return (
          <button
            key={category ?? "all"}
            onClick={() => onChangeCategory(category)}
            aria-pressed={isActive}
            className={`relative min-h-[44px] min-w-[44px] px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground cursor-pointer ${
              isActive
                ? "text-background"
                : "text-foreground/75 border border-foreground/15 hover:border-foreground hover:text-foreground bg-transparent"
            }`}
          >
            <span className="relative z-10">{label}</span>
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                className="absolute inset-0 bg-foreground rounded-full -z-0"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
