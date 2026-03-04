import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapModal.css'

// Vite 환경에서 Leaflet 아이콘 경로 수정
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Leaflet 기본 아이콘 설정
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

interface MapModalProps {
  isOpen: boolean
  onClose: () => void
}

// 마커 아이콘 설정 함수 - SVG 기반 아이콘 사용
const createMarkerIcon = (color: string) => {
  const colorMap: Record<string, string> = {
    gold: '#F4C430',     // 골드 (Casa Golden)
    orange: '#ea580c',   // 주황 (홍대입구역)
    green: '#16a34a',    // 초록 (버스정류장)
    purple: '#8b5cf6',   // 보라색 (공항 직행 버스)
  }

  const fillColor = colorMap[color] || colorMap.gold

  // SVG 마커 생성
  const svgIcon = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.4 12.5 28.5 12.5 28.5S25 20.9 25 12.5C25 5.6 19.4 0 12.5 0z" 
            fill="${fillColor}" stroke="#fff" stroke-width="2"/>
      <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
    </svg>
  `

  return new L.DivIcon({
    html: svgIcon,
    className: 'custom-marker-icon',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })
}

const START_LAT = 37.558450
const START_LNG = 126.927672


// 지도 컨트롤러 컴포넌트 - 선택된 위치로 이동
function MapController({ selectedLocation, resetToInitial }: { selectedLocation: string | null; resetToInitial: boolean }) {
  const map = useMap()

  useEffect(() => {
    if (selectedLocation) {
      // 선택된 마커의 위치로 이동
      const location = LOCATIONS_CONST.find(loc => loc.id === selectedLocation)
      if (location && location.lat !== null && location.lng !== null) {
        map.setView([location.lat, location.lng], 17, {
          animate: true,
          duration: 0.5,
        })
      }
    } else if (resetToInitial) {
      // 초기 위치로 되돌리기
      map.setView([START_LAT, START_LNG], 16, {
        animate: true,
        duration: 0.5,
      })
    }
  }, [selectedLocation, resetToInitial, map])

  return null
}

// LOCATIONS를 상수로 정의 (MapController에서 사용하기 위해)
const LOCATIONS_CONST = [
  {
    id: 'casaGolden',
    lat: 37.5582144,
    lng: 126.9297467,
    color: 'gold',
  },
  {
    id: 'subwayOut',
    lat: 37.556847,
    lng: 126.927557,
    color: 'orange',
  },
  {
    id: 'airportBusStop',
    lat: 37.557579,
    lng: 126.924724,
    color: 'purple',
  },
  {
    id: 'busStop',
    lat: 37.558008,
    lng: 126.928799, // 향후 수정 필요
    color: 'green',
  },
] as const

export function MapModal({ isOpen, onClose }: MapModalProps) {
  const { t } = useTranslation()
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const markerRefs = useRef<{ [key: string]: L.Marker | null }>({})

  const LOCATIONS = useMemo(
      () =>
        LOCATIONS_CONST.map(location => ({
          ...location,
          name: t(`location.mapPopup.name.${location.id}`) || location.id,
          description: t(`location.mapPopup.desc.${location.id}`) || "",
        })),
      [t],
  )

  const markerIcons = useMemo(
      () => ({
        gold: createMarkerIcon('gold'),
        orange: createMarkerIcon('orange'),
        green: createMarkerIcon('green'),
        purple: createMarkerIcon('purple'),
      }),
      [],
  )

  const handleClose = useCallback(() => {
    setSelectedLocation(null)
    onClose()
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    if (isOpen) document.addEventListener('keydown', handleEscKey)

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  return (
      <div className="map-modal-overlay" onClick={handleClose}>
        <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="map-modal-close" onClick={handleClose} aria-label="Close map">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="map-modal-header">
            <h2>{t('location.mapTitle') || 'Casa Golden - 위치 안내'}</h2>
          </div>

          <div className="map-container-wrapper">
            <MapContainer
                key={isOpen ? 'open' : 'closed'}
                center={[START_LAT, START_LNG] as [number, number]}
                zoom={16}
                scrollWheelZoom={true}
                className="map-container"
            >
              <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  subdomains={['a', 'b', 'c']}
                  maxZoom={19}
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              <MapController selectedLocation={selectedLocation} resetToInitial={isOpen && selectedLocation === null} />

              {LOCATIONS.filter(location => location.lat !== null && location.lng !== null).map((location) => (
                  <Marker
                      key={location.id}
                      position={[location.lat, location.lng] as [number, number]}
                      icon={markerIcons[location.color as keyof typeof markerIcons]}
                      ref={(ref) => {
                        markerRefs.current[location.id] = ref
                      }}
                      eventHandlers={{
                        click: () => {
                          setSelectedLocation(location.id)
                        },
                      }}
                  >
                    <Popup>
                      <div className="map-popup">
                        <strong>{location.name}</strong>
                        <p>{location.description}</p>
                      </div>
                    </Popup>
                  </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="map-legend">
            {LOCATIONS.filter(location => location.lat !== null && location.lng !== null).map((location) => (
              <button
                key={location.id}
                className={`legend-button ${selectedLocation === location.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedLocation(location.id)
                  // 마커의 팝업 열기
                  const marker = markerRefs.current[location.id]
                  if (marker) {
                    marker.openPopup()
                  }
                }}
              >
                <span className={`legend-color`} style={{backgroundColor: location.color}}></span>
                <span className="legend-text">
                  <strong>{location.name}</strong>
                  <small>{location.description}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
  )
}