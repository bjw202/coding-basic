---
id: SPEC-INFRA-001
title: Nextra Site Infrastructure Setup
version: 1.0.0
status: draft
created: 2026-02-21
updated: 2026-02-21
author: MoAI
priority: high
tags: [infrastructure, nextra, nextjs, setup]
---

## HISTORY

| 버전 | 날짜 | 작성자 | 변경 내용 |
|------|------|--------|-----------|
| 1.0.0 | 2026-02-21 | MoAI | 초기 SPEC 작성 |

---

## 1. 개요

1개월(4주, 12회차) 코딩 부트캠프를 위한 Nextra 4.x 기반 문서 사이트의 인프라를 구축한다. 이 SPEC은 콘텐츠 페이지(session1~12.mdx)를 제외한 사이트 인프라 설정만을 다루며, 콘텐츠는 별도의 SPEC-CONTENT-W1 ~ SPEC-CONTENT-W4에서 처리한다.

## 2. 환경 (Environment)

### 2.1 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Nextra | 4.6.x | 문서 사이트 프레임워크 (nextra-theme-docs) |
| Next.js | 15.x | React 메타프레임워크 (App Router) |
| React | 19.x | UI 컴포넌트 라이브러리 |
| TypeScript | 5.x | 타입 안전 JavaScript |
| Mermaid | Built-in (Nextra) | MDX 콘텐츠 내 다이어그램 렌더링 |
| Pagefind | Built-in (Nextra) | 한국어 지원 전문 검색 |
| Node.js | 20.x+ | JavaScript 런타임 |
| npm | 10.x+ | 패키지 매니저 |

### 2.2 배포 환경

- **호스팅**: Vercel (Next.js 네이티브 지원)
- **빌드**: SSG (Static Site Generation) 기본
- **CDN**: Vercel Edge Network

### 2.3 전제 조건

- Node.js 20.x 이상이 설치되어 있어야 한다
- npm 10.x 이상이 설치되어 있어야 한다
- Git이 설치되어 있어야 한다

## 3. 가정 (Assumptions)

- A1: Nextra 4.6.x는 Next.js 15.x App Router와 완전히 호환된다.
- A2: Pagefind는 한국어 CJK 토큰화를 기본 지원하여 추가 설정이 필요하지 않다.
- A3: Mermaid 다이어그램은 Nextra 내장 기능으로 별도 패키지 설치가 불필요하다.
- A4: 모든 콘텐츠 페이지는 MDX 형식으로 작성되며, 콘텐츠 작성은 이 SPEC 범위 밖이다.
- A5: Vercel 배포는 zero-config로 작동하며, 별도의 vercel.json이 필요하지 않다.

## 4. 요구사항 (Requirements)

### 모듈 R1: 프로젝트 초기화 및 패키지 설정

**R1.1 [Ubiquitous]**
시스템은 **항상** package.json에 nextra, nextra-theme-docs, next, react, react-dom, typescript 의존성을 포함해야 한다.

**R1.2 [Ubiquitous]**
시스템은 **항상** dev, build, start 스크립트를 package.json에 정의해야 한다.

**R1.3 [Ubiquitous]**
시스템은 **항상** TypeScript 설정(tsconfig.json)에서 strict 모드를 활성화해야 한다.

**R1.4 [Event-Driven]**
**WHEN** `npm install` 명령이 실행되면 **THEN** 모든 의존성이 충돌 없이 설치되어야 한다.

### 모듈 R2: Next.js 및 Nextra 설정

**R2.1 [Ubiquitous]**
시스템은 **항상** next.config.mjs에서 Nextra 플러그인을 통해 content 디렉토리를 문서 소스로 지정해야 한다.

**R2.2 [Ubiquitous]**
시스템은 **항상** mdx-components.tsx 파일을 통해 Nextra 4.x의 MDX 컴포넌트 매핑을 제공해야 한다.

**R2.3 [Event-Driven]**
**WHEN** `npm run dev` 명령이 실행되면 **THEN** 개발 서버가 에러 없이 시작되고 홈페이지가 렌더링되어야 한다.

**R2.4 [Event-Driven]**
**WHEN** `npm run build` 명령이 실행되면 **THEN** 프로덕션 빌드가 에러 없이 완료되어야 한다.

### 모듈 R3: 레이아웃 및 테마 설정

**R3.1 [Ubiquitous]**
시스템은 **항상** app/layout.tsx에서 Nextra docs 테마를 한국어 UI로 설정해야 한다.

**R3.2 [Ubiquitous]**
시스템은 **항상** 사이드바 설정에서 `defaultMenuCollapseLevel: 1`과 `autoCollapse: true`를 적용해야 한다.

**R3.3 [State-Driven]**
**IF** 사용자가 다크 모드 토글을 클릭하면 **THEN** 라이트/다크 테마가 전환되어야 한다.

**R3.4 [Ubiquitous]**
시스템은 **항상** 모바일 반응형 레이아웃을 제공해야 한다.

### 모듈 R4: 콘텐츠 구조 및 네비게이션

**R4.1 [Ubiquitous]**
시스템은 **항상** content/_meta.js에서 4개 주차를 한국어 레이블로 정의해야 한다.

**R4.2 [Ubiquitous]**
시스템은 **항상** 각 주차 디렉토리(week1~week4)에 _meta.js와 index.mdx를 포함해야 한다.

**R4.3 [Ubiquitous]**
시스템은 **항상** content/index.mdx를 홈페이지로 제공해야 한다.

**R4.4 [Event-Driven]**
**WHEN** 사용자가 사이드바에서 주차 섹션을 클릭하면 **THEN** 해당 주차의 세션 목록이 펼쳐지고 다른 주차는 자동으로 접혀야 한다.

**R4.5 [Ubiquitous]**
시스템은 **항상** 각 주차 _meta.js에서 세션 파일명을 한국어 레이블로 매핑해야 한다.

### 모듈 R5: 정적 자산 및 배포

**R5.1 [Ubiquitous]**
시스템은 **항상** public/ 디렉토리에 favicon.ico와 logo.svg를 포함해야 한다.

**R5.2 [Optional]**
**가능하면** Pagefind 검색이 한국어 콘텐츠를 정확히 인덱싱하여 검색 결과를 제공해야 한다.

**R5.3 [Unwanted]**
시스템은 빌드 시 TypeScript 타입 에러를 **발생시키지 않아야 한다**.

**R5.4 [Unwanted]**
시스템은 빌드 출력에 소스맵이나 개발용 디버그 정보를 **포함하지 않아야 한다** (프로덕션 빌드 기준).

## 5. 명세 (Specifications)

### 5.1 생성할 파일 목록

| 파일 경로 | 용도 |
|-----------|------|
| `package.json` | 프로젝트 의존성 및 스크립트 |
| `next.config.mjs` | Nextra 플러그인 통합 Next.js 설정 |
| `tsconfig.json` | TypeScript 컴파일러 옵션 |
| `mdx-components.tsx` | Nextra 4.x MDX 컴포넌트 매핑 |
| `app/layout.tsx` | 루트 레이아웃 (Nextra 테마 설정, 한국어 UI, 다크 모드, 사이드바) |
| `app/[[...mdxPath]]/page.tsx` | Catch-all 라우트 (content 디렉토리 MDX 렌더링) |
| `content/_meta.js` | 최상위 네비게이션 (4개 주차, 한국어 레이블) |
| `content/index.mdx` | 홈페이지 |
| `content/week1/_meta.js` | 1주차 세션 네비게이션 (한국어) |
| `content/week1/index.mdx` | 1주차 개요 페이지 |
| `content/week2/_meta.js` | 2주차 세션 네비게이션 (한국어) |
| `content/week2/index.mdx` | 2주차 개요 페이지 |
| `content/week3/_meta.js` | 3주차 세션 네비게이션 (한국어) |
| `content/week3/index.mdx` | 3주차 개요 페이지 |
| `content/week4/_meta.js` | 4주차 세션 네비게이션 (한국어) |
| `content/week4/index.mdx` | 4주차 개요 페이지 |
| `public/favicon.ico` | 브라우저 탭 아이콘 |
| `public/logo.svg` | 사이트 로고 |

### 5.2 의존성 패키지

| 패키지 | 버전 | 유형 |
|--------|------|------|
| `nextra` | `^4.6.0` | dependencies |
| `nextra-theme-docs` | `^4.6.0` | dependencies |
| `next` | `^15.0.0` | dependencies |
| `react` | `^19.0.0` | dependencies |
| `react-dom` | `^19.0.0` | dependencies |
| `typescript` | `^5.0.0` | devDependencies |
| `@types/react` | `^19.0.0` | devDependencies |
| `@types/node` | `^20.0.0` | devDependencies |

### 5.3 사이드바 네비게이션 구조

```
바이브 코딩 1개월 부트캠프 (홈)
├── 1주차: 웹 개발 기초
│   ├── 1주차 개요
│   ├── 1회차: 개발 환경 설정
│   ├── 2회차: 프론트엔드/백엔드 + Node.js 기초
│   └── 3회차: HTTP/REST, JSON, CORS
├── 2주차: React와 Next.js
│   ├── 2주차 개요
│   ├── 4회차: React 기초
│   ├── 5회차: Next.js 기초
│   └── 6회차: 비동기 프로그래밍 + 디버깅
├── 3주차: 데이터베이스, 인증, AI
│   ├── 3주차 개요
│   ├── 7회차: 데이터베이스 + PostgreSQL/Supabase
│   ├── 8회차: MongoDB + ElasticSearch
│   └── 9회차: OAuth + JWT + AI API
└── 4주차: DevOps와 배포
    ├── 4주차 개요
    ├── 10회차: Docker
    ├── 11회차: AWS EC2 + Nginx
    └── 12회차: CI/CD + 도메인
```

## 6. 추적성 (Traceability)

| 요구사항 | 관련 파일 | 검증 방법 |
|----------|-----------|-----------|
| R1.1-R1.4 | package.json, tsconfig.json | npm install 성공 여부 |
| R2.1-R2.4 | next.config.mjs, mdx-components.tsx | npm run dev/build 성공 여부 |
| R3.1-R3.4 | app/layout.tsx | 브라우저 렌더링 확인 |
| R4.1-R4.5 | content/_meta.js, content/week*/_meta.js | 사이드바 네비게이션 검증 |
| R5.1-R5.4 | public/*, 빌드 출력 | 정적 자산 존재 및 빌드 검증 |
