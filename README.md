# Casa Golden - 숙소 소개 페이지

현대적인 프리미엄 숙소 Casa Golden의 공식 소개 페이지입니다.

## 🚀 프로젝트 구조

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빠른 빌드 도구
- **GitHub Pages** - 호스팅 플랫폼

## 📋 설치 및 실행

### 사전 요구사항
- Node.js 20.19 이상
- npm 또는 yarn

### 로컬 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로젝트 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 📁 디렉토리 구조

```
casa-golden/
├── public/              # 정적 파일
│   ├── image/          # 숙소 사진
│   ├── logo/           # 로고 파일
│   └── video/          # 안내 동영상
├── src/
│   ├── App.tsx         # 메인 컴포넌트
│   ├── App.css         # 스타일
│   ├── index.css       # 전역 스타일
│   └── main.tsx        # 진입점
├── .github/workflows/  # GitHub Actions 자동 배포
└── vite.config.ts      # Vite 설정
```

## 🌐 GitHub Pages 배포

### 자동 배포 설정

1. GitHub 리포지토리 생성
2. 코드 푸시 (main 브랜치)
3. GitHub Actions가 자동으로 빌드 및 배포

### 배포된 사이트
https://joony.github.io/casa-golden/

## 🎨 주요 섹션

- **Header** - 로고 및 네비게이션
- **Hero** - 숙소 대표 이미지 및 슬로건
- **Welcome** - 환영 인사 섹션
- **Features** - 숙소의 주요 특징 (객실, 시설, 서비스 등)
- **CTA** - 예약 버튼
- **Footer** - 연락처 정보

## 📱 반응형 디자인

모바일, 태블릿, 데스크톱 전 장치에 최적화되었습니다.

## 🔧 개발 가이드

### 컴포넌트 추가
새로운 섹션을 추가하려면 `src/App.tsx`에 컴포넌트를 작성하고 `src/App.css`에 스타일을 추가하세요.

### 이미지 최적화
`public/image/` 디렉토리에 저장된 이미지를 사용합니다.

### 스타일 수정
`src/App.css`에서 전체 레이아웃 스타일을 관리합니다.

## 📧 문의

이메일: info@casagolden.com

## 📄 라이선스

All rights reserved © 2026 Casa Golden

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
