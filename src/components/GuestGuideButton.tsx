import { useTranslation } from 'react-i18next'
import { resolveGuestGuidePdfUrl } from '../data/guestGuidePdfMap'
import './GuestGuideButton.css'

interface GuestGuideButtonProps {
  language: string
}

export function GuestGuideButton({ language }: GuestGuideButtonProps) {
  const { t } = useTranslation()

  const openGuestGuide = () => {
    window.open(resolveGuestGuidePdfUrl(language), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="guest-guide-container">
      <button
        className="guest-guide-button"
        onClick={openGuestGuide}
        aria-label={t('location.guestGuideButton')}
      >
        <span className="guest-guide-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5L14.5 2H6zm8 1.5L18.5 8H14V3.5zM8 11h8v1.5H8V11zm0 3h8v1.5H8V14zm0 3h5v1.5H8V17z" />
          </svg>
        </span>
        <span>{t('location.guestGuideButton')}</span>
      </button>
    </div>
  )
}

