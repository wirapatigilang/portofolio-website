'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Photo } from '@/types';
import Button from '@/components/ui/Button';

interface PhotoModalProps {
  photo: Photo | null;
  onClose: () => void;
}

export function PhotoModal({ photo, onClose }: PhotoModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Mengkonversi format album (array) atau satu gambar (string)
  const images = photo ? (Array.isArray(photo.fullSrc) ? photo.fullSrc : [photo.fullSrc]) : [];

  // Reset indeks ke awal jika modal ditutup atau berganti foto
  useEffect(() => {
    setCurrentIndex(0);
  }, [photo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      
      // Navigasi keyboard pada album
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
      }
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    if (photo) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, onClose, images.length]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Tampilan penuh foto ${photo.title}`}
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
        onClick={onClose}
        aria-label="Tutup foto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </Button>

      {/* Navigasi Kiri */}
      {images.length > 1 && currentIndex > 0 && (
        <button 
          className="absolute left-4 z-50 p-2 text-white/50 hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full bg-black/20 hover:bg-black/40"
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          aria-label="Gambar sebelumnya"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
      )}

      {/* Navigasi Kanan */}
      {images.length > 1 && currentIndex < images.length - 1 && (
        <button 
          className="absolute right-4 z-50 p-2 text-white/50 hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full bg-black/20 hover:bg-black/40"
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          aria-label="Gambar berikutnya"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      )}

      <div className="relative z-10 w-full h-full max-w-6xl max-h-[85vh] m-4 flex flex-col items-center justify-center pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          {images.length > 0 ? (
            <Image
              src={images[currentIndex]}
              alt={`${photo.alt} - Bagian ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              No Image Data
            </div>
          )}
        </div>
        <div className="absolute bottom-[-50px] left-0 right-0 py-3 text-center text-white pointer-events-auto flex flex-col items-center gap-1">
          <h3 className="text-xl font-bold">{photo.title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm bg-black/40 px-2 py-0.5 rounded-full">{photo.category}</span>
            <span className="text-white/70 text-sm">•</span>
            <span className="text-white/70 text-sm">{photo.year}</span>
            {images.length > 1 && (
              <>
                <span className="text-white/70 text-sm">•</span>
                <span className="text-white/90 text-sm font-medium tracking-widest bg-white/20 px-2 rounded-full">
                  {currentIndex + 1} / {images.length}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
