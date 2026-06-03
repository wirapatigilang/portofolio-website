import React from 'react';
import Image from 'next/image';
import type { Video } from '@/types';
import Badge from '@/components/ui/Badge';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-card border hover:shadow-lg transition-all duration-300">
      <button
        onClick={() => onClick(video)}
        className="group relative aspect-video w-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Putar video ${video.title}`}
      >
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No Thumbnail</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
      </button>

      <div className="flex flex-col flex-grow p-5">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-xl font-bold line-clamp-1 cursor-pointer hover:underline" onClick={() => onClick(video)}>{video.title}</h3>
          <Badge variant={video.category} label={video.category} />
        </div>
        <p className="text-muted-foreground text-sm flex-grow mb-4">
          {video.description}
        </p>
        <div className="flex flex-wrap items-center justify-between mt-auto">
          <span className="text-sm font-medium text-foreground/80">{video.role}</span>
          <span className="text-muted-foreground text-sm">{video.year}</span>
        </div>
      </div>
    </div>
  );
}
