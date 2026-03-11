import { useEffect } from 'react'
import './VideoModal.css'
import {useTranslation} from "react-i18next";

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const { i18n } = useTranslation()

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Close video">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <video
          className="video-modal-video"
          controls
          autoPlay
          src={getCurrentVideoUrl()}
        />
      </div>
    </div>
  )
}

