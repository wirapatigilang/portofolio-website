import type { Metadata } from 'next';
import { generateMetadata as generateAppMetadata } from '@/lib/utils';
import { owner } from '@/data/owner';
import { experiences } from '@/data/experience';
import { AboutClient } from '@/components/about/AboutClient';

export const metadata: Metadata = generateAppMetadata({
  title: 'About | Gilang Wirapati',
  description: 'Mengenal lebih dekat Gilang Wirapati — pengalaman, perjalanan, dan filosofi kerja.',
  url: 'https://gilangwirapati.com/about',
});

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <AboutClient owner={owner} experiences={experiences} />
    </main>
  );
}
