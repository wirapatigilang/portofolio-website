import React from 'react';
import Image from 'next/image';
import type { Photo } from '@/types';
import Badge from '@/components/ui/Badge';

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

export function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <button
      onClick={() => onClick(photo)}
      className="group relative w-full overflow-hidden rounded-xl bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Lihat foto ${photo.title}`}
    >
      <div className="relative aspect-[4/5] w-full">
        {photo.src ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg line-clamp-1">{photo.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <Badge variant={photo.category} label={photo.category} className="border-none" />
          <span className="text-white/80 text-sm">{photo.year}</span>
        </div>
      </div>
    </button>
  );
}
