import type { Metadata } from "next";
import { generateMetadata as generateAppMetadata } from "@/lib/utils";
import { owner } from "@/data/owner";
import { ContactClient } from "@/components/contact/ContactClient";

export const metadata: Metadata = generateAppMetadata({
  title: "Contact | Gilang Wirapati",
  description: "Hubungi Gilang Wirapati untuk kolaborasi mendiskusikan Software Project, Design, maupun Videography.",
  url: "https://gilangwirapati.com/contact",
});

export default function ContactPage() {
  return (
    <main>
      <ContactClient owner={owner} />
    </main>
  );
}
