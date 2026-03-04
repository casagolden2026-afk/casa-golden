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
// en: 영국(en-GB), 캐나다(en-CA), 호주(en-AU), 미국(en-US) 등
// es: 스페인(es-ES), 멕시코(es-MX), 아르헨티나(es-AR) 등 남미 국가
// zh-CN: 중국(zh-CN), 싱가포르(zh-SG) 등 간체 중국어 지역
// zh-TW: 대만(zh-TW), 홍콩(zh-HK), 마카오(zh-MO) 등 번체 중국어 지역
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
  const browserLang = navigator.language

  // 1. 정확한 일치 확인 (예: ko, en, ja)
  if (browserLang in SUPPORTED_LANGUAGES) {
    return browserLang as keyof typeof SUPPORTED_LANGUAGES as string
  }

  // 2. 특수 케이스: 중국어 번체/간체 지역별 매핑
  // 대만(zh-TW), 홍콩(zh-HK), 마카오(zh-MO) -> 번체 중국어
  // 중국 및 싱가포르(zh-SG) -> 간체 중국어
  if (browserLang.startsWith('zh')) {
    const traditionalRegions = ['TW', 'HK', 'MO']
    const regionCode = browserLang.split('-')[1]?.toUpperCase()

    if (traditionalRegions.includes(regionCode) || browserLang.startsWith('zh-Hant')) {
      return 'zh-TW'
    }
    return 'zh-CN'
  }

  // 3. 언어 코드로 시작하는지 확인 (예: en-US -> en, en-GB -> en, es-MX -> es)
  const browserLangBase = browserLang.split('-')[0]
  for (const [lang] of Object.entries(SUPPORTED_LANGUAGES)) {
    if (lang.split('-')[0] === browserLangBase) {
      return lang
    }
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

