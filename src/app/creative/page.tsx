import React from 'react';
import { generateMetadata } from '@/lib/utils';
import { CreativeClient } from '@/components/creative/CreativeClient';

export const metadata = generateMetadata({
  title: 'Creative Work | Gilang Wirapati',
  description: "Gilang Wirapati's Creative Portfolio: A Visual Gallery of Photo & Video.",
  url: '/creative',
});

export default function CreativePage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-7xl">
      <CreativeClient />
    </main>
  );
}
