import { useTranslation } from 'react-i18next'
import './LanguageModal.css'

interface LanguageModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LanguageModal({ isOpen, onClose }: LanguageModalProps) {
  const { i18n, t } = useTranslation()

  const languages = [
    { code: 'ko', label: t('modal.korean'), emoji: '🇰🇷' },
    { code: 'en', label: t('modal.english'), emoji: '🇺🇸' },
    { code: 'ja', label: t('modal.japanese'), emoji: '🇯🇵' },
    { code: 'zh-CN', label: t('modal.chineseSimplified'), emoji: '🇨🇳' },
    { code: 'zh-TW', label: t('modal.chineseTraditional'), emoji: '🇹🇼' },
    { code: 'id', label: t('modal.indonesian'), emoji: '🇮🇩' },
    { code: 'es', label: t('modal.spanish'), emoji: '🇪🇸' },
  ]

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    localStorage.setItem('language', langCode)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="language-modal-overlay" onClick={onClose}>
      <div className="language-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="language-modal-header">
          <h3>{t('modal.selectLanguage')}</h3>
          <button className="language-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="language-modal-body">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${i18n.language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="language-emoji">{lang.emoji}</span>
              <span className="language-label">{lang.label}</span>
              {i18n.language === lang.code && <span className="language-checkmark">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

