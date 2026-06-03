'use client';

import React, { useState, useMemo } from 'react';
import { PhotoCard } from './PhotoCard';
import { PhotoModal } from './PhotoModal';
import { VideoCard } from './VideoCard';
import { VideoModal } from './VideoModal';
import { CreativeFilter } from './CreativeFilter';
import EmptyState from '@/components/ui/EmptyState';
import { filterPhotos, filterVideos } from '@/lib/utils';
import { photos } from '@/data/photos';
import { videos } from '@/data/videos';
import type { Photo, PhotoCategory, Video, VideoCategory } from '@/types';

const PHOTO_CATEGORIES: PhotoCategory[] = ['Portrait', 'Landscape', 'Event', 'Street', 'Product'];
const VIDEO_CATEGORIES: VideoCategory[] = ['Cinematic', 'Commercial', 'Event', 'Short Film', 'Motion Graphics'];

export function CreativeClient() {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  
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
      <div className="flex border-b mb-12">
        <button
          className={`pb-4 px-6 text-xl font-semibold transition-colors ${
            activeTab === 'photos'
              ? 'border-b-2 border-foreground text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('photos')}
        >
          Photography
        </button>
        <button
          className={`pb-4 px-6 text-xl font-semibold transition-colors ${
            activeTab === 'videos'
              ? 'border-b-2 border-foreground text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('videos')}
        >
          Videography
        </button>
      </div>

      {activeTab === 'photos' && (
        <section aria-label="Photo Gallery">
          <CreativeFilter<PhotoCategory>
            categories={PHOTO_CATEGORIES}
            currentCategory={photoCategory}
            onChangeCategory={setPhotoCategory}
            label="Filter foto"
          />

          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPhotos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} onClick={setSelectedPhoto} />
              ))}
            </div>
          ) : (
            <EmptyState
              itemLabel="foto"
              onReset={() => setPhotoCategory(null)}
            />
          )}

          <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        </section>
      )}

      {activeTab === 'videos' && (
        <section aria-label="Video Gallery">
          <CreativeFilter<VideoCategory>
            categories={VIDEO_CATEGORIES}
            currentCategory={videoCategory}
            onChangeCategory={setVideoCategory}
            label="Filter video"
          />

          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} onClick={setSelectedVideo} />
              ))}
            </div>
          ) : (
            <EmptyState
              itemLabel="video"
              onReset={() => setVideoCategory(null)}
            />
          )}

          <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        </section>
      )}
    </>
  );
}
