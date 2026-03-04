import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ko from './locales/ko.json'
import en from './locales/en.json'
import ja from './locales/ja.json'
import zh_CN from './locales/zh-CN.json'
import zh_TW from './locales/zh-TW.json'
import id from './locales/id.json'
import es from './locales/es.json'

// 지원하는 언어 목록
const SUPPORTED_LANGUAGES = {
  ko: 'ko',
  en: 'en',
  ja: 'ja',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  id: 'id',
  es: 'es',
} as const

// 브라우저의 기본 언어 감지
const detectBrowserLanguage = (): string => {
  // 1. 정확한 일치 확인
  if (navigator.language in SUPPORTED_LANGUAGES) {
    return navigator.language as keyof typeof SUPPORTED_LANGUAGES as string
  }

  // 2. 언어 코드로 시작하는지 확인 (예: en-US -> en)
  const browserLangBase = navigator.language.split('-')[0]
  for (const [lang] of Object.entries(SUPPORTED_LANGUAGES)) {
    if (lang.split('-')[0] === browserLangBase) {
      return lang
    }
  }

  // 3. 특수 케이스: 중국어 번체/간체
  if (navigator.language.startsWith('zh')) {
    // navigator.language가 zh-TW 또는 zhant* 형태면 번체, 나머지는 간체
    if (navigator.language === 'zh-TW' || navigator.language.startsWith('zh-Hant')) {
      return 'zh-TW'
    }
    return 'zh-CN'
  }

  // 4. 기본값: 영어
  return 'en'
}

// localStorage 마이그레이션: 이전 'language' key를 'userLanguageSelected'로 변환
const migrateOldLanguageSettings = () => {
  const oldKey = 'language'
  const newKey = 'userLanguageSelected'

  // 이미 새 키가 있으면 마이그레이션 불필요
  if (localStorage.getItem(newKey)) {
    return
  }

  // 이전 키가 있으면 새 키로 이동
  const oldLanguage = localStorage.getItem(oldKey)
  if (oldLanguage) {
    localStorage.setItem(newKey, oldLanguage)
    localStorage.removeItem(oldKey) // 이전 키 제거 (선택사항)
  }
}

// 마이그레이션 실행
migrateOldLanguageSettings()

// 초기 언어 설정
// - 사용자가 명시적으로 선택한 언어가 있으면 그것 사용 (localStorage key: 'userLanguageSelected')
// - 없으면 브라우저 기본 언어 사용
const userSelectedLanguage = localStorage.getItem('userLanguageSelected')
const defaultLanguage = userSelectedLanguage || detectBrowserLanguage()

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
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React는 XSS 공격으로부터 이미 보호됨
    },
    react: {
      useSuspense: false, // SSR 환경에서의 안정성
    },
  })

export default i18n

