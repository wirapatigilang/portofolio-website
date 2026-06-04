import type { Metadata } from 'next';
import Image from 'next/image';
import { generateMetadata as generateAppMetadata } from '@/lib/utils';
import { owner } from '@/data/owner';
import { experiences } from '@/data/experience';
import CTAButton from '@/components/ui/CTAButton';

export const metadata: Metadata = generateAppMetadata({
  title: 'About | Gilang Wirapati',
  description: 'Mengenal lebih dekat Gilang Wirapati — pengalaman, perjalanan, dan filosofi kerja.',
  url: 'https://gilangwirapati.com/about',
});

// Format tanggal dari 'YYYY-MM' ke 'Bulan Tahun'
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'Sekarang';
  const [year, month] = dateString.split('-');
  const date = new Date(Number(year), Number(month) - 1);
  return new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(date);
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* ── header section ── */}
      <section className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        <div className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Tentang Saya
          </h1>
          <p className="mb-6 text-xl text-foreground/70">
            {owner.tagline}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <CTAButton href={`mailto:${owner.email}`}>Hubungi Saya</CTAButton>
            {owner.cvUrl && (
              <a
                href={owner.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-foreground/20 px-6 py-3 font-medium text-foreground transition-colors hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Unduh CV (Buka di tab baru)"
              >
                Unduh CV
              </a>
            )}
          </div>
        </div>
        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-full bg-foreground/5 ring-1 ring-foreground/10">
            <Image
              src={owner.profileImage}
              alt={`Foto ${owner.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* ── Biography & Philosophy section ── */}
      <section className="mb-20 space-y-12">
        <div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground">Biografi</h2>
          <div className="space-y-4 text-lg leading-relaxed text-foreground/80">
            {owner.biography.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        
        <div className="rounded-2xl bg-foreground/5 p-8 sm:p-10">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground">Filosofi</h2>
          <p className="text-xl italic leading-relaxed text-foreground/80">
            "{owner.philosophy}"
          </p>
        </div>
      </section>

      {/* ── Experience section ── */}
      <section>
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground">Pengalaman</h2>
        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
              <div className="md:col-span-1">
                <p className="text-sm font-medium uppercase tracking-wider text-foreground/60">
                  {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                </p>
                <div className="mt-2 text-sm text-foreground/50 capitalize">
                  {exp.type === 'work' ? 'Kerja' : 'Pendidikan'}
                </div>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-2xl font-bold text-foreground">{exp.title}</h3>
                <h4 className="mb-4 text-lg font-medium text-foreground/70">{exp.organization}</h4>
                <p className="text-lg leading-relaxed text-foreground/80">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
