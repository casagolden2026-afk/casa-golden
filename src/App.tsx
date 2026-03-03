import './App.css'

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/casa-golden/public/logo/logo.png" alt="Casa Golden Logo" className="logo-img" />
            <span className="logo-text">Casa Golden</span>
          </div>
          <nav>
            <ul className="nav-links">
              <li><a href="#home">홈</a></li>
              <li><a href="#rooms">객실</a></li>
              <li><a href="#facilities">시설</a></li>
              <li><a href="#contact">연락처</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Casa Golden</h1>
          <p>편안한 휴식과 최고의 서비스를 경험하세요</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <p>
            Casa Golden은 고객님께 최고 수준의 숙박 경험을 제공하기 위해 준비된 프리미엄 숙소입니다.
            현대적인 시설과 따뜻한 서비스로 여러분의 특별한 시간을 만들어드리겠습니다.
          </p>
          <h2>환영합니다</h2>
        </section>

        {/* Features */}
        <section className="features" id="facilities">
          <div className="feature-card">
            <div className="feature-icon">🛏️</div>
            <h3>편안한 객실</h3>
            <p>최신식 침구와 아늑한 인테리어로 편안한 휴식을 제공합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🍳</div>
            <h3>주방 시설</h3>
            <p>완비된 주방에서 자유롭게 요리할 수 있습니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3>프리미엄 서비스</h3>
            <p>24시간 고객 지원과 맞춤형 서비스를 제공합니다.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>좋은 위치</h3>
            <p>주요 관광지와 교통편까지 쉽게 이동할 수 있는 위치입니다.</p>
          </div>
        </section>

        {/* CTA */}
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <button className="cta-button" onClick={() => window.location.href = 'https://airbnb.com/h/casa-golden'}>
            지금 예약하기
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer" id="contact">
        <p>&copy; 2026 Casa Golden. 모든 권리 보유.</p>
        <p>문의: https://airbnb.com/h/casa-golden | airbnb message</p>
      </footer>
    </div>
  )
}

export default App
