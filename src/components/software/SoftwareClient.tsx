"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TechStackSection } from "./TechStackSection";
import { ProjectFilter } from "./ProjectFilter";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import EmptyState from "@/components/ui/EmptyState";
import { filterProjects } from "@/lib/utils";
import { projects as softwareProjects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";

const CATEGORIES: ProjectCategory[] = ["Web App", "Mobile App", "API", "Open Source"];

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const featuredProjectsHeadingVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function SoftwareClient() {
  const [currentCategory, setCurrentCategory] = useState<ProjectCategory | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => filterProjects(softwareProjects, currentCategory), [currentCategory]);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="mb-16"
      >
        <h1 className="text-4xl font-extrabold mb-4 mt-8 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
          Software Engineering
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          Building scalable digital products with modern technologies. Here is an overview of my tech stack and recent projects.
        </p>
      </motion.div>

      <TechStackSection />

      <section className="py-12">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={featuredProjectsHeadingVariants}
          className="text-3xl font-bold mb-8 text-foreground"
        >
          Featured Projects
        </motion.h2>

        <ProjectFilter categories={CATEGORIES} currentCategory={currentCategory} onChangeCategory={setCurrentCategory} />

        {filteredProjects.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ 
                    opacity: { duration: 0.35 },
                    layout: { type: "spring", stiffness: 350, damping: 35 },
                    scale: { duration: 0.3 },
                    y: { duration: 0.3 }
                  }}
                  className="h-full flex"
                >
                  <ProjectCard project={project} onClick={setSelectedProject} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState itemLabel="project" onReset={() => setCurrentCategory(null)} />
        )}
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
