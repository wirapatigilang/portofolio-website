"use client";

import React from "react";
import Image from "next/image";
import type { Photo } from "@/types";
import Badge from "@/components/ui/Badge";
import { motion } from "framer-motion";

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

export function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(photo)}
      className="group relative w-full overflow-hidden rounded-2xl bg-muted border border-foreground/5 outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
      aria-label={`Lihat foto ${photo.title}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {photo.src ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-5">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <h3 className="text-white font-bold text-lg line-clamp-1 tracking-tight">{photo.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <Badge variant={photo.category} label={photo.category} className="border-none bg-white/20 text-white dark:bg-white/20 dark:text-white" />
            <span className="text-white/80 text-sm font-medium">{photo.year}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
