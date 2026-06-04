'use client';

import React, { useEffect } from 'react';
import type { Video } from '@/types';
import Button from '@/components/ui/Button';

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (video) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      
      <div className="relative z-10 w-full max-w-5xl bg-card border rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b bg-card/95">
          <h2 id="video-modal-title" className="text-xl font-bold line-clamp-1">
            {video.title}
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            aria-label="Tutup video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </Button>
        </div>

        <div className="p-0 bg-black">
          <div className="relative w-full aspect-video">
            <iframe
              src={video.embedUrl}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            ></iframe>
          </div>
        </div>

        <div className="p-6 bg-card flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Peran: <span className="font-normal text-muted-foreground">{video.role}</span></p>
            <p className="font-semibold text-sm mt-1">Tools: <span className="font-normal text-muted-foreground">{video.tools.join(', ')}</span></p>
          </div>
          {video.externalUrl && (
            <Button asChild>
              <a href={video.externalUrl} target="_blank" rel="noopener noreferrer">
                Lihat di Platform Asli
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
