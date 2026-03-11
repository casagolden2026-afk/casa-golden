const guestGuidePdfMap = {
  ko: 'casa_golden_guest_guide_ko.pdf',
  en: 'casa_golden_guest_guide_en.pdf',
  ja: 'casa_golden_guest_guide_jp.pdf',
  'zh-CN': 'casa_golden_guest_guide_cn_sc.pdf',
  'zh-TW': 'casa_golden_guest_guide_cn_tc.pdf',
  id: 'casa_golden_guest_guide_id.pdf',
  es: 'casa_golden_guest_guide_en.pdf',
} as const

export type GuestGuideLanguage = keyof typeof guestGuidePdfMap

const DEFAULT_GUIDE_LANGUAGE: GuestGuideLanguage = 'en'

function isGuestGuideLanguage(language: string): language is GuestGuideLanguage {
  return Object.prototype.hasOwnProperty.call(guestGuidePdfMap, language)
}

function resolveGuestGuideLanguage(language: string): GuestGuideLanguage {
  if (isGuestGuideLanguage(language)) {
    return language
  }

  const baseLanguage = language.split('-')[0]
  if (isGuestGuideLanguage(baseLanguage)) {
    return baseLanguage
  }

  return DEFAULT_GUIDE_LANGUAGE
}

export function resolveGuestGuidePdfUrl(language: string): string {
  const resolvedLanguage = resolveGuestGuideLanguage(language)
  return `${import.meta.env.BASE_URL}guide/${guestGuidePdfMap[resolvedLanguage]}`
}

