import './App.css'
import { Link as ScrollLink } from 'react-scroll'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { LanguageModal } from './components/LanguageModal'

function App() {
  const { t, i18n } = useTranslation()
  const [currentGallery, setCurrentGallery] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)

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
        return '🇹🇼'
      case 'id':
        return '🇮🇩'
      case 'es':
        return '🇪🇸'
      default:
        return '🌐'
    }
  }

  // 각 방별 이미지 데이터
  const galleryData = {
    room1: [
      { src: '/casa-golden/image/room_1_01.png', alt: 'room1-1' },
      { src: '/casa-golden/image/room_1_02.png', alt: 'room1-2' },
      { src: '/casa-golden/image/room_1_03.png', alt: 'room1-3' },
      { src: '/casa-golden/image/room_1_04.png', alt: 'room1-4' },
    ],
    room2: [
      { src: '/casa-golden/image/room_2_01.png', alt: 'room2-1' },
      { src: '/casa-golden/image/room_2_02.jpg', alt: 'room2-2' },
      { src: '/casa-golden/image/room_2_03.jpg', alt: 'room2-3' },
      { src: '/casa-golden/image/room_2_04.png', alt: 'room2-4' },
    ],
    living: [
      { src: '/casa-golden/image/living_room_01.png', alt: 'living-1' },
      { src: '/casa-golden/image/living_room_02.png', alt: 'living-2' },
      { src: '/casa-golden/image/living_room_03.jpg', alt: 'living-3' },
      { src: '/casa-golden/image/living_room_04.jpg', alt: 'living-4' },
      { src: '/casa-golden/image/living_room_05.jpg', alt: 'living-5' },
    ],
    kitchen: [
      { src: '/casa-golden/image/kitchen_01.jpg', alt: 'kitchen-1' },
      { src: '/casa-golden/image/kitchen_02.jpg', alt: 'kitchen-2' },
      { src: '/casa-golden/image/kitchen_03.jpg', alt: 'kitchen-3' },
      { src: '/casa-golden/image/kitchen_04.jpg', alt: 'kitchen-4' },
      { src: '/casa-golden/image/kitchen_05.jpg', alt: 'kitchen-5' },
      { src: '/casa-golden/image/kitchen_06.jpg', alt: 'kitchen-6' },
      { src: '/casa-golden/image/kitchen_07.jpg', alt: 'kitchen-7' },
      { src: '/casa-golden/image/kitchen_08.jpg', alt: 'kitchen-8' },
    ],
    bathroom: [
      { src: '/casa-golden/image/bathroom_01.jpg', alt: 'bathroom-1' },
      { src: '/casa-golden/image/bathroom_02.jpg', alt: 'bathroom-2' },
      { src: '/casa-golden/image/bathroom_03.jpg', alt: 'bathroom-3' },
    ],
    utility: [
      { src: '/casa-golden/image/utility_room_01.jpg', alt: 'utility-1' },
      { src: '/casa-golden/image/utility_room_02.jpg', alt: 'utility-2' },
      { src: '/casa-golden/image/utility_room_03.jpg', alt: 'utility-3' },
    ],
    outdoor: [
      { src: '/casa-golden/image/outdoor_view.jpg', alt: 'outdoor-1' },
      { src: '/casa-golden/image/outdoor_building.png', alt: 'outdoor-2' },
      { src: '/casa-golden/image/outdoor_elevator.png', alt: 'outdoor-3' },
    ],
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
    return galleryData[currentGallery as keyof typeof galleryData] || []
  }

  const SCROLL_OFFSET = -60
  const SCROLL_DURATION = 150

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/casa-golden/logo/logo.png" alt="Casa Golden" className="logo-img" />
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

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>{t('hero.title')}</h1>
          <p className="hero-tagline">{t('hero.tagline')}</p>
          <p className="hero-description">{t('hero.description')}</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">

        {/* Location Section */}
        <section className="location-section" id="location">
          <h2>{t('location.title')}</h2>

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
            <div className="room-gallery">
              {galleryData.room1.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="room-gallery-thumb"
                  onClick={() => openGallery('room1', index)}
                />
              ))}
            </div>
            <ul className="amenities-list">
              {(t('facilities.bedroom1.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Bedroom 2 */}
          <div className="room-card">
            <h3>{t('facilities.bedroom2.title')}</h3>
            <div className="room-gallery">
              {galleryData.room2.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="room-gallery-thumb"
                  onClick={() => openGallery('room2', index)}
                />
              ))}
            </div>
            <ul className="amenities-list">
              {(t('facilities.bedroom2.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Living Room */}
          <div className="room-card">
            <h3>{t('facilities.living.title')}</h3>
            <div className="room-gallery">
              {galleryData.living.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="room-gallery-thumb"
                  onClick={() => openGallery('living', index)}
                />
              ))}
            </div>
            <ul className="amenities-list">
              {(t('facilities.living.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Kitchen */}
          <div className="room-card">
            <h3>{t('facilities.kitchen.title')}</h3>
            <div className="room-gallery">
              {galleryData.kitchen.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="room-gallery-thumb"
                  onClick={() => openGallery('kitchen', index)}
                />
              ))}
            </div>
            <ul className="amenities-list">
              {(t('facilities.kitchen.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Bathroom */}
          <div className="room-card">
            <h3>{t('facilities.bathroom.title')}</h3>
            <div className="room-gallery">
              {galleryData.bathroom.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="room-gallery-thumb"
                  onClick={() => openGallery('bathroom', index)}
                />
              ))}
            </div>
            <ul className="amenities-list">
              {(t('facilities.bathroom.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Utility Room */}
          <div className="room-card">
            <h3>{t('facilities.utility.title')}</h3>
            <div className="room-gallery">
              {galleryData.utility.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="room-gallery-thumb"
                  onClick={() => openGallery('utility', index)}
                />
              ))}
            </div>
            <ul className="amenities-list">
              {(t('facilities.utility.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Outdoor */}
          <div className="room-card">
            <h3>{t('facilities.outdoor.title')}</h3>
            <div className="room-gallery">
              {galleryData.outdoor.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="room-gallery-thumb"
                  onClick={() => openGallery('outdoor', index)}
                />
              ))}
            </div>
            <ul className="amenities-list">
              {(t('facilities.outdoor.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
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
