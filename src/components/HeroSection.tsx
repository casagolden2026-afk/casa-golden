import { useTranslation } from 'react-i18next'
import { useState, useEffect, useRef, useCallback } from 'react'
import { heroImageData } from '../data/imageData'
import './HeroSection.css'

const AUTO_SCROLL_INTERVAL = 8000 // 8초
const DRAG_THRESHOLD = 50 // 드래그 최소 거리 (픽셀)

export function HeroSection() {
  const { t } = useTranslation()
  const totalSlides = heroImageData.length
  const extendedSlides = [heroImageData[totalSlides - 1], ...heroImageData, heroImageData[0]]

  const [currentIndex, setCurrentIndex] = useState(1)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [sliderWidth, setSliderWidth] = useState(0)

  const sliderRef = useRef<HTMLDivElement>(null)
  const dragStartXRef = useRef(0)
  const dragOffsetRef = useRef(0)
  const activePointerIdRef = useRef<number | null>(null)
  const transitionFrameRef = useRef<number | null>(null)

  const restoreTransition = useCallback(() => {
    if (transitionFrameRef.current !== null) {
      window.cancelAnimationFrame(transitionFrameRef.current)
    }

    transitionFrameRef.current = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true)
      transitionFrameRef.current = null
    })
  }, [])

  useEffect(() => {
    return () => {
      if (transitionFrameRef.current !== null) {
        window.cancelAnimationFrame(transitionFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const sliderElement = sliderRef.current

    if (!sliderElement) {
      return
    }

    const updateSliderWidth = () => {
      setSliderWidth(sliderElement.clientWidth)
    }

    updateSliderWidth()

    const resizeObserver = new ResizeObserver(() => {
      updateSliderWidth()
    })

    resizeObserver.observe(sliderElement)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const goToNext = useCallback(() => {
    if (isDragging || isTransitioning || sliderWidth === 0) {
      return
    }

    dragOffsetRef.current = 0
    setDragOffset(0)
    setIsTransitionEnabled(true)
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }, [isDragging, isTransitioning, sliderWidth])

  const goToSlide = useCallback(
    (index: number) => {
      if (isDragging || isTransitioning) {
        return
      }

      dragOffsetRef.current = 0
      setDragOffset(0)
      setIsTransitionEnabled(false)
      setCurrentIndex(index + 1)
      restoreTransition()
    },
    [isDragging, isTransitioning, restoreTransition],
  )

  useEffect(() => {
    if (isDragging || isTransitioning || sliderWidth === 0) {
      return
    }

    const interval = window.setInterval(() => {
      goToNext()
    }, AUTO_SCROLL_INTERVAL)

    return () => {
      window.clearInterval(interval)
    }
  }, [goToNext, isDragging, isTransitioning, sliderWidth])

  const startDrag = useCallback(
    (clientX: number, pointerId: number) => {
      if (isTransitioning || sliderWidth === 0) {
        return
      }

      dragStartXRef.current = clientX
      dragOffsetRef.current = 0
      activePointerIdRef.current = pointerId
      setIsDragging(true)
      setIsTransitionEnabled(false)
      setDragOffset(0)
      sliderRef.current?.setPointerCapture(pointerId)
    },
    [isTransitioning, sliderWidth],
  )

  const updateDrag = useCallback((clientX: number) => {
    const nextOffset = clientX - dragStartXRef.current
    dragOffsetRef.current = nextOffset
    setDragOffset(nextOffset)
  }, [])

  const finishDrag = useCallback((pointerId: number) => {
    if (!isDragging) {
      return
    }

    const sliderElement = sliderRef.current

    if (sliderElement?.hasPointerCapture(pointerId)) {
      sliderElement.releasePointerCapture(pointerId)
    }

    activePointerIdRef.current = null
    setIsDragging(false)

    const movedDistance = dragOffsetRef.current

    if (Math.abs(movedDistance) >= DRAG_THRESHOLD) {
      dragOffsetRef.current = 0
      setDragOffset(0)
      setIsTransitionEnabled(true)
      setIsTransitioning(true)
      setCurrentIndex((prev) => (movedDistance < 0 ? prev + 1 : prev - 1))
      return
    }

    if (movedDistance !== 0) {
      setIsTransitionEnabled(true)
      setIsTransitioning(true)
    }

    dragOffsetRef.current = 0
    setDragOffset(0)
  }, [isDragging])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) {
      return
    }

    startDrag(e.clientX, e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || activePointerIdRef.current !== e.pointerId) {
      return
    }

    updateDrag(e.clientX)
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== e.pointerId) {
      return
    }

    finishDrag(e.pointerId)
  }

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== e.pointerId) {
      return
    }

    finishDrag(e.pointerId)
  }

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'transform') {
      return
    }

    if (currentIndex === 0) {
      setIsTransitionEnabled(false)
      setCurrentIndex(totalSlides)
      restoreTransition()
    } else if (currentIndex === totalSlides + 1) {
      setIsTransitionEnabled(false)
      setCurrentIndex(1)
      restoreTransition()
    }

    setIsTransitioning(false)
  }

  if (totalSlides === 0) {
    return null
  }

  const activeDotIndex = (currentIndex - 1 + totalSlides) % totalSlides
  const trackTransform =
    sliderWidth > 0
      ? `translate3d(${-(currentIndex * sliderWidth) + dragOffset}px, 0, 0)`
      : `translate3d(${-((currentIndex * 100) / extendedSlides.length)}%, 0, 0)`
  const slideSize = `${100 / extendedSlides.length}%`

  return (
    <section className="hero" id="home">
      {/* 하단 점 버튼 네비게이션 - 이미지 위로 이동 */}
      <div className="hero-dots">
        {heroImageData.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === activeDotIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div
        className={`hero-slider ${isDragging ? 'dragging' : ''}`}
        ref={sliderRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* 슬라이더 이미지 */}
        <div
          className={`hero-slider-images ${isTransitionEnabled ? 'animating' : ''}`}
          style={{
            width: `${extendedSlides.length * 100}%`,
            transform: trackTransform,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((image, index) => (
            <img
              key={`${image.src}-${index}`}
              src={image.src}
              alt={image.alt}
              className="hero-slider-image"
              style={{
                flex: `0 0 ${slideSize}`,
                width: slideSize,
                minWidth: slideSize,
                maxWidth: slideSize,
              }}
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

