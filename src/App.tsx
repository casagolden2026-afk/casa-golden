import './App.css'
import { Link as ScrollLink } from 'react-scroll'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { LanguageModal } from './components/LanguageModal'
import { RoomGallery } from './components/RoomGallery'
import { VideoModal } from './components/VideoModal'
import { MapModal } from './components/MapModal'
import { HeroSection } from './components/HeroSection'
import { GuestGuideButton } from './components/GuestGuideButton'
import { imageData } from './data/imageData.ts'

function App() {
  const { t, i18n } = useTranslation()
  const [currentGallery, setCurrentGallery] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)
  const [imageLoadStatus, setImageLoadStatus] = useState<Record<string, boolean>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  // 언어별 오시는 길 영상 URL 매핑
  const videoUrlMap: Record<string, string> = {
    ko: 'video/CasaGolden_how_to_find_us_ko_480.mp4',
    en: 'video/CasaGolden_how_to_find_us_en_480.mp4',
    ja: 'video/CasaGolden_how_to_find_us_jp_480.mp4',
    'zh-CN': 'video/CasaGolden_how_to_find_us_cn_sc_480.mp4',
    'zh-TW': 'video/CasaGolden_how_to_find_us_cn_tc_480.mp4',
    id: 'video/CasaGolden_how_to_find_us_id_480.mp4',
    es: 'video/CasaGolden_how_to_find_us_es_480.mp4',
  }

  // 현재 언어에 맞는 영상 URL 반환 (없으면 영어)
  const getCurrentVideoUrl = () => {
    return videoUrlMap[i18n.language] || videoUrlMap['en']
  }

  // 현재 언어 이모지 반환
  const getLanguageEmoji = () => {
    switch (i18n.language) {
      case 'ko':
        return '🇰🇷'
      case 'en':
        return '🇺🇸'
      case 'ja':
        return '🇯🇵'
      case 'zh-CN':
        return '🇨🇳'
      case 'zh-TW':
        return '🇹🇼·🇭🇰'
      case 'id':
        return '🇮🇩'
      case 'es':
        return '🇪🇸'
      default:
        return '🌐'
    }
  }


  const openGallery = (galleryName: string, index: number = 0) => {
    setCurrentGallery(galleryName)
    setCurrentIndex(index)
  }

  const closeGallery = () => {
    setCurrentGallery(null)
  }

  const getCurrentImages = () => {
    if (!currentGallery) return []
    return imageData[currentGallery as keyof typeof imageData] || []
  }

  // 이미지 로딩 완료 처리
  const handleImageLoad = (imageSrc: string) => {
    setImageLoadStatus(prev => ({
      ...prev,
      [imageSrc]: true,
    }))
  }

  // 이미지 로딩 실패 처리
  const handleImageError = (imageSrc: string) => {
    setImageLoadStatus(prev => ({
      ...prev,
      [imageSrc]: false,
    }))
  }

  // Intersection Observer 설정 (Lazy Loading 처리)
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target instanceof HTMLImageElement) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src && !img.src) {
              img.src = img.dataset.src
              img.loading = 'lazy'
              observerRef.current?.unobserve(img)
            }
          }
        })
      },
      { rootMargin: '50px' }
    )

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const SCROLL_OFFSET = -70 // 헤더 높이만큼 오프셋 조정
  const SCROLL_DURATION = 150

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <img src="logo/logo.png" alt="Casa Golden" className="logo-img" />
          </div>
          <nav>
            <ul className="nav-links">
              <li>
                <ScrollLink
                  to="home"
                  duration={SCROLL_DURATION}
                  offset={SCROLL_OFFSET}
                  activeClass="active"
                  spy={true}
                  style={{ cursor: 'pointer' }}
                >
                  {t('header.home')}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="location"
                  duration={SCROLL_DURATION}
                  offset={SCROLL_OFFSET}
                  activeClass="active"
                  spy={true}
                  style={{ cursor: 'pointer' }}
                >
                  {t('header.location')}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="facilities"
                  smooth={true}
                  duration={SCROLL_DURATION}
                  offset={SCROLL_OFFSET}
                  activeClass="active"
                  spy={true}
                  style={{ cursor: 'pointer' }}
                >
                  {t('header.facilities')}
                </ScrollLink>
              </li>
            </ul>
          </nav>
          <button
            className="language-button"
            onClick={() => setIsLanguageModalOpen(true)}
            title="Change language"
          >
            {getLanguageEmoji()}
          </button>
        </div>
      </header>

      {/* Language Modal */}
      <LanguageModal isOpen={isLanguageModalOpen} onClose={() => setIsLanguageModalOpen(false)} />

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc={getCurrentVideoUrl()}
      />

      {/* Map Modal */}
      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="main-content">

        {/* Location Section */}
        <section className="location-section" id="location">
          <h2>{t('location.title')}</h2>

          {/* Direction Video Section */}
          <div className="video-section">
            <h3>{t('location.howToFindUs')}</h3>
            <div className="action-buttons-container">
              <button
                  className="action-button"
                  onClick={() => setIsVideoModalOpen(true)}
              >
                {t('location.watchVideo')}
              </button>
              <button
                  className="action-button"
                  onClick={() => setIsMapModalOpen(true)}
              >
                {t('location.viewMap')}
              </button>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <strong>{t('location.hongdaeStation')}</strong>
              <p>{t('location.hongdaeStationDistance')}</p>
            </div>
            <div className="info-item">
              <strong>{t('location.busStop')}</strong>
              <p>{t('location.busStopDistance')}</p>
            </div>
            <div className="info-item">
              <strong>{t('location.hongdaeHotplace')}</strong>
              <p>{t('location.hongdaeHotplaceDesc')}</p>
            </div>
            <div className="info-item">
              <strong>{t('location.airportAccess')}</strong>
              <p>{t('location.airportAccessDesc')}</p>
            </div>
          </div>

          {/* Surroundings Subsection */}
          <div className="location-subsection">
            <h3>{t('location.surroundings')}</h3>
            <ul className="amenities-list">
              {(t('location.surroundingsItems', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Subway Access Subsection */}
          <div className="location-subsection">
            <h3>{t('location.subway')}</h3>
            <p className="subway-intro">{t('location.subwayIntro')}</p>
            <div className="subway-grid">
              {Object.entries(t('location.destinations', { returnObjects: true }) as Record<string, any>).map(
                ([key, dest]: [string, any]) => (
                  <div key={key} className="subway-item">
                    <strong>{dest.name}</strong>
                    <span>{dest.time}</span>
                    <small>{dest.route}</small>
                  </div>
                )
              )}
            </div>
            <div className="highlight-box">
              <p>{t('location.highlight')}</p>
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        <section className="rooms-section" id="facilities">
          <h2>{t('facilities.title')}</h2>

          {/* Facilities Highlights */}
          <div className="facilities-summary">
            <div className="summary-card">
              <h3>{t('facilities.amenities')}</h3>
              <ul className="amenities-list">
                {(t('facilities.amenitiesItems', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="summary-card">
              <h3>{t('facilities.bedding')}</h3>
              <ul className="amenities-list">
                {(t('facilities.beddingItems', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bedroom 1 */}
          <div className="room-card">
            <h3>{t('facilities.bedroom1.title')}</h3>
            <RoomGallery
              images={imageData.room1}
              imageLoadStatus={imageLoadStatus}
              onImageLoad={handleImageLoad}
              onImageError={handleImageError}
              onImageClick={(index) => openGallery('room1', index)}
              observerRef={observerRef}
            />
            <ul className="amenities-list">
              {(t('facilities.bedroom1.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Bedroom 2 */}
          <div className="room-card">
            <h3>{t('facilities.bedroom2.title')}</h3>
            <RoomGallery
              images={imageData.room2}
              imageLoadStatus={imageLoadStatus}
              onImageLoad={handleImageLoad}
              onImageError={handleImageError}
              onImageClick={(index) => openGallery('room2', index)}
              observerRef={observerRef}
            />
            <ul className="amenities-list">
              {(t('facilities.bedroom2.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Living Room */}
          <div className="room-card">
            <h3>{t('facilities.living.title')}</h3>
            <RoomGallery
              images={imageData.living}
              imageLoadStatus={imageLoadStatus}
              onImageLoad={handleImageLoad}
              onImageError={handleImageError}
              onImageClick={(index) => openGallery('living', index)}
              observerRef={observerRef}
            />
            <ul className="amenities-list">
              {(t('facilities.living.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Kitchen */}
          <div className="room-card">
            <h3>{t('facilities.kitchen.title')}</h3>
            <RoomGallery
              images={imageData.kitchen}
              imageLoadStatus={imageLoadStatus}
              onImageLoad={handleImageLoad}
              onImageError={handleImageError}
              onImageClick={(index) => openGallery('kitchen', index)}
              observerRef={observerRef}
            />
            <ul className="amenities-list">
              {(t('facilities.kitchen.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Bathroom */}
          <div className="room-card">
            <h3>{t('facilities.bathroom.title')}</h3>
            <RoomGallery
              images={imageData.bathroom}
              imageLoadStatus={imageLoadStatus}
              onImageLoad={handleImageLoad}
              onImageError={handleImageError}
              onImageClick={(index) => openGallery('bathroom', index)}
              observerRef={observerRef}
            />
            <ul className="amenities-list">
              {(t('facilities.bathroom.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Utility Room */}
          <div className="room-card">
            <h3>{t('facilities.utility.title')}</h3>
            <RoomGallery
              images={imageData.utility}
              imageLoadStatus={imageLoadStatus}
              onImageLoad={handleImageLoad}
              onImageError={handleImageError}
              onImageClick={(index) => openGallery('utility', index)}
              observerRef={observerRef}
            />
            <ul className="amenities-list">
              {(t('facilities.utility.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Outdoor */}
          <div className="room-card">
            <h3>{t('facilities.outdoor.title')}</h3>
            <RoomGallery
              images={imageData.outdoor}
              imageLoadStatus={imageLoadStatus}
              onImageLoad={handleImageLoad}
              onImageError={handleImageError}
              onImageClick={(index) => openGallery('outdoor', index)}
              observerRef={observerRef}
            />
            <ul className="amenities-list">
              {(t('facilities.outdoor.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <GuestGuideButton language={i18n.language} />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-info">
            <p>{t('footer.copyright')}</p>
            <p>
              {t('footer.inquiry')} <a href="https://airbnb.com/h/casa-golden" target="_blank" rel="noopener noreferrer">https://airbnb.com/h/casa-golden</a>
            </p>
          </div>
          <button className="cta-button" onClick={() => window.location.href = 'https://airbnb.com/h/casa-golden'}>
            {t('footer.bookNow')}
          </button>
        </div>
      </footer>

      {/* Lightbox Gallery */}
      {currentGallery && (
        <Lightbox
          slides={getCurrentImages()}
          open={currentGallery !== null}
          index={currentIndex}
          close={closeGallery}
          on={{
            view: ({ index }) => setCurrentIndex(index),
          }}
        />
      )}
    </div>
  )
}

export default App
