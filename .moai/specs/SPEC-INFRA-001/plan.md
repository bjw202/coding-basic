---
id: SPEC-INFRA-001
document: plan
version: 1.0.0
---

# SPEC-INFRA-001 구현 계획

## 1. 구현 전략

### 접근 방식

Nextra 4.x 공식 문서의 content directory convention을 따라 Bottom-Up 방식으로 구현한다. 루트 설정 파일부터 시작하여 App Router 구성, 콘텐츠 구조 순서로 진행한다.

### 핵심 원칙

- Nextra 4.x의 content directory convention 준수
- Next.js 15 App Router 패턴 적용
- 최소 설정으로 최대 기능 활용 (Nextra 내장 기능 우선)
- 한국어 UI를 위한 테마 커스터마이징

## 2. 태스크 분해

### Milestone 1: 프로젝트 초기화 [Priority High]

| 순서 | 태스크 | 생성 파일 | 설명 |
|------|--------|-----------|------|
| 1.1 | package.json 생성 | `package.json` | 프로젝트 메타데이터, 의존성, 스크립트 정의 |
| 1.2 | TypeScript 설정 | `tsconfig.json` | strict 모드, JSX preserve, 경로 설정 |
| 1.3 | 의존성 설치 | `package-lock.json` | npm install 실행 |

### Milestone 2: Next.js + Nextra 설정 [Priority High]

| 순서 | 태스크 | 생성 파일 | 설명 |
|------|--------|-----------|------|
| 2.1 | Next.js 설정 | `next.config.mjs` | Nextra 플러그인 통합, content 디렉토리 지정 |
| 2.2 | MDX 컴포넌트 매핑 | `mdx-components.tsx` | Nextra 4.x 필수 파일, 기본 컴포넌트 매핑 |

### Milestone 3: App Router 구성 [Priority High]

| 순서 | 태스크 | 생성 파일 | 설명 |
|------|--------|-----------|------|
| 3.1 | 루트 레이아웃 | `app/layout.tsx` | Nextra docs 테마, 한국어 UI, 다크 모드, 사이드바 설정 |
| 3.2 | Catch-all 라우트 | `app/[[...mdxPath]]/page.tsx` | content 디렉토리 MDX 파일 렌더링 |

### Milestone 4: 콘텐츠 구조 생성 [Priority High]

| 순서 | 태스크 | 생성 파일 | 설명 |
|------|--------|-----------|------|
| 4.1 | 최상위 네비게이션 | `content/_meta.js` | 4개 주차 한국어 레이블 정의 |
| 4.2 | 홈페이지 | `content/index.mdx` | 부트캠프 소개 및 주차별 링크 |
| 4.3 | 1주차 구조 | `content/week1/_meta.js`, `content/week1/index.mdx` | 1주차 네비게이션 및 개요 |
| 4.4 | 2주차 구조 | `content/week2/_meta.js`, `content/week2/index.mdx` | 2주차 네비게이션 및 개요 |
| 4.5 | 3주차 구조 | `content/week3/_meta.js`, `content/week3/index.mdx` | 3주차 네비게이션 및 개요 |
| 4.6 | 4주차 구조 | `content/week4/_meta.js`, `content/week4/index.mdx` | 4주차 네비게이션 및 개요 |

### Milestone 5: 정적 자산 [Priority Medium]

| 순서 | 태스크 | 생성 파일 | 설명 |
|------|--------|-----------|------|
| 5.1 | Favicon | `public/favicon.ico` | 브라우저 탭 아이콘 |
| 5.2 | 로고 | `public/logo.svg` | 사이트 로고 SVG |

## 3. 의존성 (Dependencies)

### npm 패키지

**Production Dependencies:**

| 패키지 | 버전 범위 | 용도 |
|--------|-----------|------|
| `nextra` | `^4.6.0` | Nextra 문서 프레임워크 코어 |
| `nextra-theme-docs` | `^4.6.0` | Nextra 문서 테마 (사이드바, 검색, 다크 모드) |
| `next` | `^15.0.0` | Next.js App Router 프레임워크 |
| `react` | `^19.0.0` | React UI 라이브러리 |
| `react-dom` | `^19.0.0` | React DOM 렌더링 |

**Dev Dependencies:**

| 패키지 | 버전 범위 | 용도 |
|--------|-----------|------|
| `typescript` | `^5.0.0` | TypeScript 컴파일러 |
| `@types/react` | `^19.0.0` | React 타입 정의 |
| `@types/node` | `^20.0.0` | Node.js 타입 정의 |

### 태스크 간 의존성

```
Milestone 1 (프로젝트 초기화)
    └── Milestone 2 (Next.js + Nextra 설정)
        └── Milestone 3 (App Router 구성)
            └── Milestone 4 (콘텐츠 구조)

Milestone 5 (정적 자산) ── 독립적, 병렬 진행 가능
```

## 4. 기술 접근 방식

### 4.1 Nextra 4.x Content Directory Convention

Nextra 4.x는 `content/` 디렉토리를 문서 소스로 사용하는 새로운 컨벤션을 도입했다. 이전 3.x의 `pages/` 디렉토리 방식과 달리, App Router의 `app/` 디렉토리와 콘텐츠를 명확히 분리한다.

```
app/                    # App Router (레이아웃, 라우트만)
content/                # 문서 콘텐츠 (MDX, _meta.js)
```

### 4.2 한국어 UI 테마 설정

app/layout.tsx에서 Nextra docs 테마의 다음 항목을 한국어로 설정한다:

- 검색 placeholder: "검색..."
- 목차(TOC) 제목: "목차"
- 이전/다음 페이지 네비게이션 레이블
- 사이드바 토글 레이블
- 테마 전환 레이블

### 4.3 사이드바 자동 접기

`defaultMenuCollapseLevel: 1`과 `autoCollapse: true` 설정으로:
- 초기 로드 시 주차 섹션만 보이고, 세션 목록은 접혀있음
- 하나의 주차를 펼치면 다른 주차는 자동으로 접힘
- 집중 탐색 경험 제공

### 4.4 _meta.js 네비게이션 구조

각 디렉토리의 `_meta.js`는 기본 내보내기(default export) 객체를 사용하여 파일/디렉토리 이름을 한국어 레이블로 매핑한다.

## 5. 리스크 분석

### 리스크 1: Nextra 4.x API 변경 [Medium]

- **위험**: Nextra 4.x는 비교적 최신 메이저 버전으로, API가 변경될 수 있음
- **영향**: 테마 설정이나 content directory convention이 변경되면 설정 파일 수정 필요
- **대응**: Nextra 공식 문서와 릴리즈 노트를 참조하여 최신 API 확인. 버전을 `^4.6.0`으로 고정하여 breaking change 방지

### 리스크 2: 한국어 Pagefind 검색 품질 [Low]

- **위험**: CJK 토큰화가 한국어 형태소 분석과 완벽히 일치하지 않을 수 있음
- **영향**: 일부 검색어에서 기대와 다른 결과가 나올 수 있음
- **대응**: Pagefind는 CJK 기본 지원을 제공하므로 대부분의 케이스에서 동작. 필요시 검색 인덱스 설정 조정

### 리스크 3: Next.js 15 + React 19 호환성 [Low]

- **위험**: React 19의 실험적 기능이 Nextra 테마와 충돌할 수 있음
- **영향**: 빌드 에러 또는 런타임 경고 발생 가능
- **대응**: Nextra 4.6.x는 Next.js 15 + React 19 지원을 명시하므로 리스크가 낮음. 충돌 발생 시 Nextra GitHub Issues 참조

### 리스크 4: _meta.js 한국어 인코딩 [Low]

- **위험**: _meta.js 파일의 한국어 문자열이 빌드 시 인코딩 문제를 일으킬 수 있음
- **영향**: 사이드바에 깨진 문자 표시
- **대응**: 모든 파일을 UTF-8로 저장하고 ESM 모듈 형식 사용

## 6. 아키텍처 설계 방향

### 파일 구조 원칙

```
vibeclass-coding-1-month/
├── package.json                    # 프로젝트 루트 설정
├── next.config.mjs                 # Nextra 플러그인 통합
├── tsconfig.json                   # TypeScript 설정
├── mdx-components.tsx              # MDX 컴포넌트 (Nextra 필수)
├── app/                            # App Router (최소 파일만)
│   ├── layout.tsx                  # 테마 + 한국어 UI
│   └── [[...mdxPath]]/
│       └── page.tsx                # Content directory 라우팅
├── content/                        # 문서 콘텐츠 (Nextra가 관리)
│   ├── _meta.js                    # 최상위 네비게이션
│   ├── index.mdx                   # 홈페이지
│   ├── week1/                      # 1주차
│   ├── week2/                      # 2주차
│   ├── week3/                      # 3주차
│   └── week4/                      # 4주차
└── public/                         # 정적 자산
    ├── favicon.ico
    └── logo.svg
```

### 설계 결정

1. **Content Directory Convention**: Nextra 4.x 권장 방식 채택. app/ 디렉토리를 라우팅 전용으로 유지.
2. **ESM 모듈**: next.config.mjs와 _meta.js는 ESM 형식 사용.
3. **최소 커스터마이징**: Nextra 내장 기능(Mermaid, Pagefind, 다크 모드)을 최대한 활용하여 추가 의존성 최소화.
4. **한국어 우선**: 모든 UI 텍스트와 네비게이션 레이블을 한국어로 설정.
