import { useTranslation } from 'react-i18next'
import './LanguageButton.css'

interface LanguageButtonProps {
  onClick: () => void
}

export function LanguageButton({ onClick }: LanguageButtonProps) {
  const { i18n } = useTranslation()

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

  return (
    <button
      className="language-button"
      onClick={onClick}
      title="Change language"
    >
      {getLanguageEmoji()}
    </button>
  )
}

