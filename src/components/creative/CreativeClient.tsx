"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhotoCard } from "./PhotoCard";
import { PhotoModal } from "./PhotoModal";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";
import { CreativeFilter } from "./CreativeFilter";
import EmptyState from "@/components/ui/EmptyState";
import { filterPhotos, filterVideos } from "@/lib/utils";
import { photos } from "@/data/photos";
import { videos } from "@/data/videos";
import type { Photo, PhotoCategory, Video, VideoCategory } from "@/types";

const PHOTO_CATEGORIES: PhotoCategory[] = ["Portrait", "Landscape", "Event", "Street", "Product"];
const VIDEO_CATEGORIES: VideoCategory[] = ["Cinematic", "Commercial", "Event", "Short Film", "Motion Graphics"];

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function CreativeClient() {
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  // States for Photos
  const [photoCategory, setPhotoCategory] = useState<PhotoCategory | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // States for Videos
  const [videoCategory, setVideoCategory] = useState<VideoCategory | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filteredPhotos = useMemo(() => filterPhotos(photos, photoCategory), [photoCategory]);
  const filteredVideos = useMemo(() => filterVideos(videos, videoCategory), [videoCategory]);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="mb-16"
      >
        <h1 className="text-4xl font-extrabold mb-4 mt-8 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-transparent">
          Creative Work
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          A collection of visual works that capture moments and tell stories through the camera lens. Covering photography and video production.
        </p>
      </motion.div>

      {/* Tab Switcher */}
      <div className="flex border-b border-foreground/10 mb-12 relative">
        <button
          className={`pb-4 px-6 text-xl font-semibold transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-t-md ${
            activeTab === "photos" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("photos")}
        >
          <span className="relative z-10">Photography</span>
          {activeTab === "photos" && (
            <motion.div
              layoutId="activeTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground z-0"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
        <button
          className={`pb-4 px-6 text-xl font-semibold transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-t-md ${
            activeTab === "videos" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("videos")}
        >
          <span className="relative z-10">Videography</span>
          {activeTab === "videos" && (
            <motion.div
              layoutId="activeTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground z-0"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      </div>

      {activeTab === "photos" && (
        <section aria-label="Photo Gallery">
          <CreativeFilter<PhotoCategory>
            categories={PHOTO_CATEGORIES}
            currentCategory={photoCategory}
            onChangeCategory={setPhotoCategory}
            label="Filter foto"
          />

          {filteredPhotos.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredPhotos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      opacity: { duration: 0.3 },
                      layout: { type: "spring", stiffness: 350, damping: 35 },
                    }}
                    className="w-full h-full"
                  >
                    <PhotoCard photo={photo} onClick={setSelectedPhoto} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState itemLabel="photo" onReset={() => setPhotoCategory(null)} />
          )}
        </section>
      )}

      {activeTab === "videos" && (
        <section aria-label="Video Gallery">
          <CreativeFilter<VideoCategory>
            categories={VIDEO_CATEGORIES}
            currentCategory={videoCategory}
            onChangeCategory={setVideoCategory}
            label="Filter video"
          />

          {filteredVideos.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredVideos.map((video) => (
                  <motion.div
                    key={video.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{
                      opacity: { duration: 0.35 },
                      layout: { type: "spring", stiffness: 350, damping: 35 },
                    }}
                    className="w-full h-full"
                  >
                    <VideoCard video={video} onClick={setSelectedVideo} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState itemLabel="video" onReset={() => setVideoCategory(null)} />
          )}
        </section>
      )}

      <AnimatePresence>
        {selectedPhoto && (
          <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedVideo && (
          <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
