import React from 'react'
import { GalleryImage } from './GalleryImage'
import './RoomGallery.css'

interface GalleryItem {
  src: string
  alt: string
}

interface RoomGalleryProps {
  images: GalleryItem[]
  imageLoadStatus: Record<string, boolean>
  onImageLoad: (src: string) => void
  onImageError: (src: string) => void
  onImageClick: (index: number) => void
  observerRef: React.RefObject<IntersectionObserver | null>
}

export const RoomGallery: React.FC<RoomGalleryProps> = ({
  images,
  imageLoadStatus,
  onImageLoad,
  onImageError,
  onImageClick,
  observerRef,
}) => {
  return (
    <div className="room-gallery">
      {images.map((image, index) => (
        <GalleryImage
          key={index}
          src={image.src}
          alt={image.alt}
          isLoaded={imageLoadStatus[image.src]}
          onLoad={onImageLoad}
          onError={onImageError}
          onClick={() => onImageClick(index)}
          observerRef={observerRef}
        />
      ))}
    </div>
  )
}

