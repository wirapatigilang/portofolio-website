import React from 'react';
import { generateMetadata } from '@/lib/utils';
import { CreativeClient } from '@/components/creative/CreativeClient';

export const metadata = generateMetadata({
  title: 'Creative Work | Gilang Wirapati',
  description: 'Galeri fotografi dan karya videografi oleh Gilang Wirapati.',
  url: '/creative',
});

export default function CreativePage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-7xl">
      <h1 className="text-4xl font-extrabold mb-4 mt-8">Creative Work</h1>
      <p className="text-xl text-muted-foreground mb-16 max-w-3xl">
        Kumpulan karya visual yang mengabadikan momen dan bercerita melalui lensa kamera. 
        Mencakup bidang fotografi dan produksi video.
      </p>

      <CreativeClient />
    </main>
  );
}
