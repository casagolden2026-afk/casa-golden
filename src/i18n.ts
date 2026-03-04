import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ko from './locales/ko.json'
import en from './locales/en.json'
import ja from './locales/ja.json'
import zh_CN from './locales/zh-CN.json'
import zh_TW from './locales/zh-TW.json'
import id from './locales/id.json'
import es from './locales/es.json'

// 브라우저의 기본 언어 감지
const detectBrowserLanguage = () => {
  const browserLang = navigator.language

  // 브라우저 언어를 지원하는 언어로 매핑
  if (browserLang.startsWith('ko')) return 'ko'
  if (browserLang.startsWith('ja')) return 'ja'
  if (browserLang === 'zh-CN' || browserLang.startsWith('zh-Hans')) return 'zh-CN'
  if (browserLang === 'zh-TW' || browserLang.startsWith('zh-Hant')) return 'zh-TW'
  if (browserLang.startsWith('id')) return 'id'
  if (browserLang.startsWith('es')) return 'es'
  if (browserLang.startsWith('en')) return 'en'

  // 지원하지 않는 언어는 영어로 기본값 설정
  return 'en'
}

const savedLanguage = localStorage.getItem('language')
const defaultLanguage = savedLanguage || detectBrowserLanguage()

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: ko },
      en: { translation: en },
      ja: { translation: ja },
      'zh-CN': { translation: zh_CN },
      'zh-TW': { translation: zh_TW },
      id: { translation: id },
      es: { translation: es },
    },
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React는 XSS 공격으로부터 이미 보호됨
    },
  })

export default i18n

