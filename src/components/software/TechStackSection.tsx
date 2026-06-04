import React from "react";
import Badge from "@/components/ui/Badge";

const TECH_STACK_CATEGORIES = [
  {
    name: "Web Development",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Laravel", "Breeze"],
  },
//   {
//     name: "Backend",
//     items: ["Node.js", "Python"],
//   },
  {
    name: "Database",
    items: ["PostgreSQL", "MySQL", "Prisma"],
  },
  {
    name: "Tools",
    items: ["Git", "Figma", "Postman"],
  },
];

export function TechStackSection() {
  return (
    <section className="py-12" aria-labelledby="tech-stack-heading">
      <h2 id="tech-stack-heading" className="text-3xl font-bold mb-8">
        Technologies & Tools
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TECH_STACK_CATEGORIES.map((category) => (
          <div key={category.name} className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-foreground/80">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Badge key={item} variant="default" label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
