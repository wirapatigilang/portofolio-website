"use client";

import React from "react";
import Badge from "@/components/ui/Badge";
import { motion } from "framer-motion";

const TECH_STACK_CATEGORIES = [
  {
    name: "Web Development",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Laravel", "Breeze"],
  },
  {
    name: "Database",
    items: ["PostgreSQL", "MySQL", "Prisma"],
  },
  {
    name: "Tools",
    items: ["Git", "Figma", "Postman"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export function TechStackSection() {
  return (
    <section className="py-12" aria-labelledby="tech-stack-heading">
      <motion.h2
        id="tech-stack-heading"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-foreground"
      >
        Technologies & Tools
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {TECH_STACK_CATEGORIES.map((category) => (
          <motion.div
            key={category.name}
            variants={categoryVariants}
            className="flex flex-col gap-4 p-6 rounded-2xl bg-card border border-foreground/5 shadow-sm hover:shadow-md hover:border-foreground/10 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-foreground/80 border-b border-foreground/5 pb-2">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {category.items.map((item) => (
                <motion.div
                  key={item}
                  variants={badgeVariants}
                  whileHover={{
                    scale: 1.06,
                    y: -2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-default"
                >
                  <Badge variant="default" label={item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
