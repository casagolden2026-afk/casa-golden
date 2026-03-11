import React, { useEffect, useRef } from 'react'
import './GalleryImage.css'

interface GalleryImageProps {
  src: string
  alt: string
  onLoad: (src: string) => void
  onError: (src: string) => void
  isLoaded: boolean
  onClick: () => void
  observerRef: React.RefObject<IntersectionObserver | null>
}

export const GalleryImage: React.FC<GalleryImageProps> = ({
  src,
  alt,
  onLoad,
  onError,
  isLoaded,
  onClick,
  observerRef,
}) => {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const imageElement = imgRef.current
    const observer = observerRef.current

    if (imageElement && observer) {
      observer.observe(imageElement)
    }

    return () => {
      if (imageElement && observer) {
        observer.unobserve(imageElement)
      }
    }
  }, [observerRef])

  return (
    <div className="gallery-image-wrapper">
      {!isLoaded && <div className="image-loading-skeleton" />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`room-gallery-thumb ${isLoaded ? 'loaded' : ''}`}
        onClick={onClick}
        onLoad={() => onLoad(src)}
        onError={() => onError(src)}
        style={{ display: isLoaded !== false ? 'block' : 'none' }}
      />
    </div>
  )
}
