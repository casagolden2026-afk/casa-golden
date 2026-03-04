import { useTranslation } from 'react-i18next'
import { useState, useEffect, useRef } from 'react'
import { heroImageData } from '../data/imageData'
import './HeroSection.css'

const AUTO_SCROLL_INTERVAL = 8000 // 8초
const DRAG_THRESHOLD = 50 // 드래그 최소 거리 (픽셀)

export function HeroSection() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  // 자동 이미지 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImageData.length)
    }, AUTO_SCROLL_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImageData.length) % heroImageData.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImageData.length)
  }

  // 터치 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  // 터치 중
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  // 터치 끝
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > DRAG_THRESHOLD
    const isRightSwipe = distance < -DRAG_THRESHOLD

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  // 마우스 드래그
  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX)
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    setTouchEnd(e.clientX)
    const distance = touchStart - e.clientX
    const isLeftSwipe = distance > DRAG_THRESHOLD
    const isRightSwipe = distance < -DRAG_THRESHOLD

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  return (
    <section className="hero" id="home">
      {/* 하단 점 버튼 네비게이션 - 이미지 위로 이동 */}
      <div className="hero-dots">
        {heroImageData.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div
        className="hero-slider"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          if (touchStart) {
            setTouchStart(0)
            setTouchEnd(0)
          }
        }}
      >
        {/* 슬라이더 이미지 */}
        <div className="hero-slider-images">
          {heroImageData.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`hero-slider-image ${index === currentIndex ? 'active' : ''}`}
              draggable={false}
            />
          ))}
        </div>

        {/* 콘텐츠 오버레이 */}
        <div className="hero-content">
          <h1>{t('hero.title')}</h1>
          <p className="hero-tagline">{t('hero.tagline')}</p>
          <p className="hero-description">{t('hero.description')}</p>
        </div>
      </div>
    </section>
  )
}

