import type { Metadata } from 'next';
import { generateMetadata as generateAppMetadata } from '@/lib/utils';
import { owner } from '@/data/owner';
import HeroSection from '@/components/home/HeroSection';
import DomainSwitcher from '@/components/home/DomainSwitcher';
import BioSection from '@/components/home/BioSection';

export const metadata: Metadata = generateAppMetadata({
  title: 'Gilang Wirapati — Software Engineer & Creative Portfolio',
  description: owner.bio,
  url: 'https://gilangwirapati.com',
});

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection owner={owner} />
      
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 mb-16">
        <DomainSwitcher />
      </div>
      
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <hr className="border-foreground/10" />
      </div>

      <BioSection />
    </div>
  );
}
