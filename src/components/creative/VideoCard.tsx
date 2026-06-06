"use client";

import React from "react";
import Image from "next/image";
import type { Video } from "@/types";
import Badge from "@/components/ui/Badge";
import { motion } from "framer-motion";

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="flex flex-col overflow-hidden rounded-2xl bg-card border border-foreground/5 shadow-sm hover:shadow-xl hover:border-foreground/15 transition-all duration-300 h-full"
    >
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => onClick(video)}
        className="group relative aspect-video w-full overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        aria-label={`Putar video ${video.title}`}
      >
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No Thumbnail</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center">
          <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
      </motion.button>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3
            className="text-xl font-bold line-clamp-1 cursor-pointer hover:text-foreground/80 hover:underline transition-colors duration-300 tracking-tight"
            onClick={() => onClick(video)}
          >
            {video.title}
          </h3>
          <Badge variant={video.category} label={video.category} className="shrink-0" />
        </div>
        <p className="text-muted-foreground text-sm flex-grow mb-6 leading-relaxed">
          {video.description}
        </p>
        <div className="flex flex-wrap items-center justify-between mt-auto pt-4 border-t border-foreground/5 text-sm">
          <span className="font-semibold text-foreground/80">{video.role}</span>
          <span className="text-muted-foreground">{video.year}</span>
        </div>
      </div>
    </motion.div>
  );
}
