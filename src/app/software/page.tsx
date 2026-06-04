import React from "react";
import { generateMetadata } from "@/lib/utils";
import { SoftwareClient } from "@/components/software/SoftwareClient";

export const metadata = generateMetadata({
  title: "Software Engineering | Gilang Wirapati",
  description: "Portofolio software engineering dan ragam proyek teknologi yang dikerjakan oleh Gilang Wirapati.",
  url: "/software",
});

export default function SoftwarePage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-extrabold mb-4 mt-8">Software Engineering</h1>
      <p className="text-xl text-muted-foreground mb-16 max-w-3xl">Building scalable digital products with modern technologies. Here is an overview of my tech stack and recent projects.</p>

      <SoftwareClient />
    </main>
  );
}
