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
      <SoftwareClient />
    </main>
  );
}
