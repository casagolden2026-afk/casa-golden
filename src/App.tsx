import './App.css'
import { Link as ScrollLink } from 'react-scroll'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

function App() {
  // 갤러리 상태 관리
  const [currentGallery, setCurrentGallery] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // 각 방별 이미지 데이터
  const galleryData = {
    room1: [
      { src: '/casa-golden/image/room_1_01.png', alt: '침실 1 - 1' },
      { src: '/casa-golden/image/room_1_02.png', alt: '침실 1 - 2' },
      { src: '/casa-golden/image/room_1_03.png', alt: '침실 1 - 3' },
      { src: '/casa-golden/image/room_1_04.png', alt: '침실 1 - 4' },
    ],
    room2: [
      { src: '/casa-golden/image/room_2_01.png', alt: '침실 2 - 1' },
      { src: '/casa-golden/image/room_2_02.jpg', alt: '침실 2 - 2' },
      { src: '/casa-golden/image/room_2_03.jpg', alt: '침실 2 - 3' },
      { src: '/casa-golden/image/room_2_04.png', alt: '침실 2 - 4' },
    ],
    living: [
      { src: '/casa-golden/image/living_room_01.png', alt: '거실 - 1' },
      { src: '/casa-golden/image/living_room_02.png', alt: '거실 - 2' },
      { src: '/casa-golden/image/living_room_03.jpg', alt: '거실 - 3' },
      { src: '/casa-golden/image/living_room_04.jpg', alt: '거실 - 4' },
      { src: '/casa-golden/image/living_room_05.jpg', alt: '거실 - 5' },
    ],
    kitchen: [
      { src: '/casa-golden/image/kitchen_01.jpg', alt: '주방 - 1' },
      { src: '/casa-golden/image/kitchen_02.jpg', alt: '주방 - 2' },
      { src: '/casa-golden/image/kitchen_03.jpg', alt: '주방 - 3' },
      { src: '/casa-golden/image/kitchen_04.jpg', alt: '주방 - 4' },
      { src: '/casa-golden/image/kitchen_05.jpg', alt: '주방 - 5' },
      { src: '/casa-golden/image/kitchen_06.jpg', alt: '주방 - 6' },
      { src: '/casa-golden/image/kitchen_07.jpg', alt: '주방 - 7' },
      { src: '/casa-golden/image/kitchen_08.jpg', alt: '주방 - 8' },
    ],
    bathroom: [
      { src: '/casa-golden/image/bathroom_01.jpg', alt: '욕실 - 1' },
      { src: '/casa-golden/image/bathroom_02.jpg', alt: '욕실 - 2' },
      { src: '/casa-golden/image/bathroom_03.jpg', alt: '욕실 - 3' },
    ],
    utility: [
      { src: '/casa-golden/image/utility_room_01.jpg', alt: '세탁실 - 1' },
      { src: '/casa-golden/image/utility_room_02.jpg', alt: '세탁실 - 2' },
      { src: '/casa-golden/image/utility_room_03.jpg', alt: '세탁실 - 3' },
    ],
    outdoor: [
      { src: '/casa-golden/image/outdoor_view.jpg', alt: '외부 - 전경' },
      { src: '/casa-golden/image/outdoor_building.png', alt: '외부 - 건물' },
      { src: '/casa-golden/image/outdoor_elevator.png', alt: '외부 - 엘레베이터' },
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
  // 스크롤 offset 설정 (헤더 높이 고려)
  const SCROLL_OFFSET = -50
  // 스크롤 애니메이션 속도 (150ms = 빠른 반응)
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
                  홈
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
                  위치
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
                  시설/객실
                </ScrollLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Casa Golden</h1>
          <p className="hero-tagline">New Open (2026년 3월) | 신축 (2024년)</p>
          <p className="hero-description">따뜻하고 편안한 Casa-Golden이 마음에 드실거에요.(●'◡'●)</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">

        {/* Location Section */}
        <section className="location-section" id="location">
          <h2>📍 위치</h2>

          <div className="info-grid">
            <div className="info-item">
              <strong>홍대입구역</strong>
              <p>도보 5분</p>
            </div>
            <div className="info-item">
              <strong>버스정류장</strong>
              <p>도보 3분</p>
            </div>
            <div className="info-item">
              <strong>공항 접근</strong>
              <p>철도/버스 이용 편리</p>
            </div>
          </div>

          {/* Surroundings Subsection */}
          <div className="location-subsection">
            <h3>🏘️ 주변환경</h3>
            <ul className="amenities-list">
              <li>조용하고 평화로운 주택가에 위치</li>
              <li>24시간 편의점 : 도보 1분</li>
              <li>카페 3곳 : 도보 3분</li>
              <li>셀프 세탁방 : 도보 1분</li>
              <li>올리브영 (기념품) : 도보 1분</li>
            </ul>
          </div>

          {/* Subway Access Subsection */}
          <div className="location-subsection">
            <h3>🚝 홍대입구역에서 주요 관광지까지 이동 시간</h3>
            <p className="subway-intro">홍대입구역은 서울 교통의 중심이자 에너지가 시작되는 곳에 위치해 있습니다.</p>
            <div className="subway-grid">
              <div className="subway-item">
                <strong>을지로입구역</strong>
                <span>약 12분</span>
                <small>2호선 직행</small>
              </div>
              <div className="subway-item">
                <strong>여의도</strong>
                <span>약 16분</span>
                <small>2호선 → 9호선 환승</small>
              </div>
              <div className="subway-item">
                <strong>이태원</strong>
                <span>약 17분</span>
                <small>공항철도 → 6호선 환승</small>
              </div>
              <div className="subway-item">
                <strong>종로3가</strong>
                <span>약 20분</span>
                <small>2호선 → 1호선 환승</small>
              </div>
              <div className="subway-item">
                <strong>동대문</strong>
                <span>약 20분</span>
                <small>2호선 → 4호선 환승</small>
              </div>
              <div className="subway-item">
                <strong>경복궁, 안국</strong>
                <span>약 23분</span>
                <small>2호선 → 3호선 환승</small>
              </div>
              <div className="subway-item">
                <strong>명동</strong>
                <span>약 23분</span>
                <small>2호선 → 4호선/공항선</small>
              </div>
              <div className="subway-item">
                <strong>성수</strong>
                <span>약 26분</span>
                <small>2호선 직행</small>
              </div>
              <div className="subway-item">
                <strong>강남(신논현)</strong>
                <span>약 30분</span>
                <small>2호선 직행/환승</small>
              </div>
              <div className="subway-item">
                <strong>잠실</strong>
                <span>약 38분</span>
                <small>2호선 직행</small>
              </div>
            </div>
            <div className="highlight-box">
              <p>공항에서 내린 지 1시간 만에 짐을 풀고, 도보 5분 거리의 홍대 메인거리에서 맛집, 술집, 카페, 쇼핑 등 한국의 젊은 문화를 체험하며 커피 한 잔의 여유를 즐길 수 있는 완벽한 여행의 안식처가 될 거예요.</p>
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        <section className="rooms-section" id="facilities">
          <h2>🏠 게스트 이용 가능 공간/시설</h2>

          {/* Facilities Highlights */}
          <div className="facilities-summary">
            <div className="summary-card">
              <h3>🖼️ 편의시설</h3>
              <ul className="amenities-list">
                <li>8층 통창으로 즐기는 서울 &amp; 산 뷰</li>
                <li>엘레베이터</li>
                <li>무료 짐 보관</li>
                <li>무료 주차</li>
                <li>셀프체크인</li>
              </ul>
            </div>
            <div className="summary-card">
              <h3>🛏️ 침구 구성</h3>
              <ul className="amenities-list">
                <li>퀸사이즈 침대 2개</li>
                <li>퀸사이즈 바닥용 매트리스 1개</li>
              </ul>
            </div>
          </div>

          <div className="room-card">
            <h3>🪟️ 침실 1</h3>
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
              <li>퀸 사이즈 침대 1개</li>
              <li>헤어드라이기 &amp; 고데기</li>
              <li>원형거울 &amp; 화장대 &amp; 의자</li>
              <li>탁상조명</li>
              <li>멀티탭 (연장코드)</li>
            </ul>
          </div>

          <div className="room-card">
            <h3>🛏 침실 2</h3>
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
              <li>퀸 사이즈 침대 1개</li>
              <li>대형 옷장</li>
              <li>구름모양 거울</li>
              <li>탁상조명</li>
              <li>선풍기</li>
              <li>보드게임</li>
              <li>구급함</li>
              <li>멀티탭 (연장코드)</li>
            </ul>
          </div>

          <div className="room-card">
            <h3>✨ 거실</h3>
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
              <li>바닥용 퀸 사이즈 매트리스 1개와 이불 (침실 2의 옷장안에 구비)</li>
              <li>50인치 스마트 TV</li>
              <li>에어컨</li>
              <li>넓은 소파</li>
              <li>접이식 좌식 커피 테이블</li>
              <li>8층 통창 서울 시티 뷰</li>
              <li>전신거울</li>
              <li>무료 WiFi</li>
            </ul>
          </div>

          <div className="room-card">
            <h3>🍳 주방</h3>
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
              <li>냉장고</li>
              <li>인덕션</li>
              <li>전자레인지</li>
              <li>전기포트</li>
              <li>조리도구 &amp; 식기류</li>
            </ul>
          </div>

          <div className="room-card">
            <h3>🛁 욕실</h3>
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
              <li>수건</li>
              <li>샴푸, 컨디셔너, 바디워시, 핸드워시</li>
            </ul>
          </div>

          <div className="room-card">
            <h3>🧺 세탁실</h3>
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
              <li>세탁기 &amp; 건조기</li>
              <li>세제 &amp; 섬유유연제</li>
              <li>건조대</li>
              <li>재활용 분리수거함</li>
              <li>접이식 의자 2개</li>
            </ul>
          </div>

          <div className="room-card">
            <h3>🏢 건물/외부</h3>
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
              <li>호텔에서 바라본 서울 시 전경</li>
              <li>신축 건물 (2024년 완공)</li>
              <li>편의로운 엘레베이터 접근</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-info">
          <p>&copy; 2026 Casa Golden. 모든 권리 보유.</p>
          <p>문의: <a href="https://airbnb.com/h/casa-golden" target="_blank" rel="noopener noreferrer">https://airbnb.com/h/casa-golden</a></p>
        </div>
        <button className="cta-button" onClick={() => window.location.href = 'https://airbnb.com/h/casa-golden'}>
          지금 예약하기
        </button>
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
