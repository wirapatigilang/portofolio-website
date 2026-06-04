import type { Metadata } from "next";
import { generateMetadata as generateAppMetadata } from "@/lib/utils";
import { owner } from "@/data/owner";
import ContactForm from "@/components/contact/ContactForm";
import { Mail, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = generateAppMetadata({
  title: "Contact | Gilang Wirapati",
  description: "Hubungi Gilang Wirapati untuk kolaborasi mendiskusikan Software Project, Design, maupun Videography.",
  url: "https://gilangwirapati.com/contact",
});

// ============================================================
// ContactPage component (Server Component)
// ============================================================

export default function ContactPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-20 sm:px-6 lg:px-8 md:flex-row md:items-center text-foreground">
      {/* ── Left Side: Contact Information ── */}
      <section className="flex-1 space-y-10" aria-labelledby="contact-heading">
        <div className="space-y-4">
          <h1 id="contact-heading" className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Mari Berkolaborasi
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-foreground/70">Punya ide proyek, tawaran pekerjaan, atau sekadar ingin menyapa? Silakan isi formulir atau hubungi saya langsung melalui platform di bawah ini.</p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          {/* Email Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/50">Email Utama</h2>
            <a
              href={`mailto:${owner.email}`}
              className="group flex items-center gap-3 text-lg font-medium text-foreground transition-all hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background rounded-md"
              aria-label="Kirim email ke Gilang"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 group-hover:bg-blue-500/10 transition-colors">
                <Mail className="h-5 w-5 text-foreground/70 group-hover:text-blue-500 transition-colors" />
              </div>
              <span>{owner.email}</span>
            </a>
          </div>

          {/* Social Media Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/50">Media Sosial</h2>
            <ul className="flex flex-wrap gap-3">
              {owner.socialLinks.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-foreground/10 hover:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
                    aria-label={social.label}
                  >
                    {social.platform}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Right Side: Contact Form ── */}
      <section className="w-full md:w-[480px] shrink-0" aria-label="Formulir Kontak">
        <div className="relative rounded-3xl bg-background/50 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          {/* Decorative Background Blurs */}
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl -z-10 pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl -z-10 pointer-events-none"></div>

          {/* Memanggil komponen form Anda */}
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
