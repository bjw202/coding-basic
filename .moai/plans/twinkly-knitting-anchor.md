# Plan: 바이브코딩 1개월 부트캠프 학습 사이트

## Context

주니어 개발자 대상 1개월(4주, 12회차) 코딩 부트캠프 커리큘럼(`contents/class-contents.md`)을 기반으로, Nextra 4.x를 사용한 학습 사이트를 구축한다. 왼쪽 사이드바 네비게이션, 한국어 콘텐츠, Mermaid 다이어그램, 코드 예제를 포함하며, Vercel로 배포한다.

현재 프로젝트는 빈 상태(MoAI 설정만 존재)이므로 처음부터 scaffolding이 필요하다.

---

## Tech Stack

- **Framework**: Nextra 4.6.x (nextra-theme-docs)
- **Runtime**: Next.js 15.x + React 19.x
- **Language**: TypeScript
- **Diagrams**: Mermaid (Nextra 내장 지원)
- **Search**: Pagefind (Nextra 내장)
- **Deploy**: Vercel

---

## Project Structure

```
vibeclass-coding-1-month/
├── package.json
├── next.config.mjs
├── tsconfig.json
├── mdx-components.tsx
├── app/
│   ├── layout.tsx                    # Nextra 4 theme config (navbar, sidebar, footer)
│   └── [[...mdxPath]]/
│       └── page.tsx                  # Content directory catch-all route
├── content/
│   ├── _meta.js                      # Top-level sidebar: weeks
│   ├── index.mdx                     # Homepage: 커리큘럼 소개
│   ├── week1/
│   │   ├── _meta.js                  # Week 1 sidebar items
│   │   ├── index.mdx                 # 1주차 개요
│   │   ├── session1.mdx              # 1회차: 개발환경 올인원 세팅
│   │   ├── session2.mdx              # 2회차: 프론트/백엔드 + NodeJS 기초
│   │   └── session3.mdx              # 3회차: HTTP/REST, JSON, CORS
│   ├── week2/
│   │   ├── _meta.js
│   │   ├── index.mdx                 # 2주차 개요
│   │   ├── session4.mdx              # 4회차: React 기초
│   │   ├── session5.mdx              # 5회차: Next.js 기초
│   │   └── session6.mdx              # 6회차: 비동기 + 디버깅
│   ├── week3/
│   │   ├── _meta.js
│   │   ├── index.mdx                 # 3주차 개요
│   │   ├── session7.mdx              # 7회차: DB + PostgreSQL/Supabase
│   │   ├── session8.mdx              # 8회차: MongoDB + ElasticSearch
│   │   └── session9.mdx              # 9회차: OAuth + JWT + AI API
│   └── week4/
│       ├── _meta.js
│       ├── index.mdx                 # 4주차 개요
│       ├── session10.mdx             # 10회차: Docker
│       ├── session11.mdx             # 11회차: AWS EC2 + Nginx
│       └── session12.mdx             # 12회차: CI/CD + 도메인
└── public/
    ├── favicon.ico
    └── logo.svg
```

**Content Directory Convention**: Nextra 4의 content 디렉토리 방식 사용. MDX 파일은 `content/` 폴더에, App Router의 catch-all route가 이를 서빙.

---

## Sidebar Navigation

```
커리큘럼 소개
──────────────
> 1주차: 코딩/웹 개발 기초        (접혀있음, 클릭 시 펼침)
    1주차 개요
    1회차: 개발환경 올인원 세팅
    2회차: 프론트/백엔드 + NodeJS 기초
    3회차: HTTP/REST, JSON, CORS
> 2주차: React/Next.js 기초       (접혀있음)
    ...
> 3주차: DB/인증/AI API            (접혀있음)
    ...
> 4주차: Docker/배포/CI/CD         (접혀있음)
    ...
```

- `defaultMenuCollapseLevel: 1` (주차별 접혀있음)
- `autoCollapse: true` (다른 주차 열면 이전 주차 자동 접힘)

---

## Session MDX Template

각 회차 MDX 파일의 일관된 구조:

```
---
title: 'N회차: 제목'
description: '간단 설명'
---

# 제목

## 학습 목표
- 목표 1~3개

## 핵심 개념
### 개념 1
이론 설명 + Mermaid 다이어그램

### 개념 2
이론 설명 + Mermaid 다이어그램

## 코드 예제
### 예제 제목
코드 블록 + 라인별 설명

## 실습 과제
단계별 실습 + <details> 힌트

## 정리
핵심 개념 요약 테이블

## 다음 회차 예고
```

---

## Mermaid Diagram Plan (회차별)

| Session | Diagram Type | Visualize |
|---------|-------------|-----------|
| 1회차 | flowchart | 개발 도구 워크플로우 (Cursor -> Terminal -> Git -> Deploy) |
| 2회차 | flowchart, sequence | FE/BE 아키텍처, SSR vs CSR, Request 라이프사이클 |
| 3회차 | sequence, flowchart | HTTP Request/Response, CORS Preflight 흐름 |
| 4회차 | flowchart, state | Component 트리, State 업데이트 흐름, Props 데이터 플로우 |
| 5회차 | flowchart, sequence | App Router 구조, Server/Client 컴포넌트 렌더링 |
| 6회차 | sequence, state | Promise 체인, async/await 실행 순서, 에러 전파 |
| 7회차 | erDiagram, flowchart | User/Post ER 다이어그램, CRUD 흐름 |
| 8회차 | flowchart | RDB vs Document DB 비교, 검색 인덱스 흐름 |
| 9회차 | sequence, flowchart | OAuth Authorization Code 흐름, JWT 라이프사이클 |
| 10회차 | flowchart | Docker 레이어, Multi-stage 빌드, Compose 아키텍처 |
| 11회차 | flowchart, sequence | EC2 배포 토폴로지, Nginx 리버스프록시, HTTPS 인증서 |
| 12회차 | flowchart, sequence | CI/CD 파이프라인, GitHub Actions, DNS 흐름 |

---

## Implementation Phases

### Phase 1: Project Scaffolding

**생성할 파일:**
- `package.json` (next, react, nextra, nextra-theme-docs, typescript, pagefind)
- `next.config.mjs` (Nextra plugin + Turbopack alias)
- `tsconfig.json` (moduleResolution: bundler)
- `mdx-components.tsx` (nextra-theme-docs MDX components)
- `app/layout.tsx` (Navbar, Footer, Sidebar config, lang="ko")
- `app/[[...mdxPath]]/page.tsx` (catch-all route)

**검증:** `npm install && npm run dev` -> localhost:3000 로드 확인

### Phase 2: Navigation Structure

**생성할 파일:**
- `content/_meta.js` (top-level: 커리큘럼 소개, separator, week1~4)
- `content/week{1-4}/_meta.js` (각 주차 세션 목록)
- `content/index.mdx` (홈페이지 placeholder)
- `content/week{1-4}/index.mdx` (주차 개요 placeholder)
- `content/week{1-4}/session{1-12}.mdx` (12개 세션 placeholder)

**검증:** 사이드바 네비게이션 작동, 접힘/펼침 동작 확인

### Phase 3: Content Creation (회차별)

**순서:** 커리큘럼 순서대로 (1회차 -> 12회차)

각 회차별 작업:
1. WebSearch / Context7로 최신 기술 버전 조사
2. 학습 목표 작성
3. 핵심 개념 + Mermaid 다이어그램 작성
4. 실행 가능한 코드 예제 작성 (한국어 주석)
5. 실습 과제 + 힌트 작성
6. 정리 테이블 작성

**Batch 1**: Session 1-3 (Week 1 - Foundation)
**Batch 2**: Session 4-6 (Week 2 - React/Next.js)
**Batch 3**: Session 7-9 (Week 3 - DB/Auth/AI)
**Batch 4**: Session 10-12 (Week 4 - DevOps)

### Phase 4: Polish

- 홈페이지 완성 (과정 소개, 커리큘럼 테이블, 사전 준비물)
- 다크모드 Mermaid 다이어그램 확인
- 모바일 반응형 확인
- Pagefind 한국어 검색 테스트
- 12개 회차 포맷 일관성 최종 검토

### Phase 5: Vercel Deployment

- Git 저장소 초기화 + GitHub push
- Vercel 프로젝트 import
- Build command: `npm run build` (postbuild로 pagefind 자동 실행)
- 배포 확인 + 도메인 연결 (선택)

---

## Key Configuration Details

### next.config.mjs
```js
import nextra from 'nextra'
const withNextra = nextra({})
export default withNextra({
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.tsx'
    }
  }
})
```

### app/layout.tsx (핵심 설정)
- `lang="ko"`, `sidebar.defaultMenuCollapseLevel: 1`, `sidebar.autoCollapse: true`
- 한국어 UI 텍스트: editLink, toc.title, toc.backToTop

### _meta.js (sidebar)
```js
// content/_meta.js
export default {
  index: '커리큘럼 소개',
  '---': { type: 'separator' },
  week1: '1주차: 코딩/웹 개발 기초',
  week2: '2주차: React/Next.js 기초',
  week3: '3주차: DB/인증/AI API',
  week4: '4주차: Docker/배포/CI/CD'
}
```

---

## Content Research Strategy

각 회차 콘텐츠 작성 시:
1. **Context7 MCP**: Next.js, React, Express, Supabase, NextAuth 등 라이브러리 문서 조회
2. **WebSearch**: PostgreSQL, MongoDB, ElasticSearch, Docker, AWS, GitHub Actions 최신 버전 확인
3. **Version Pinning**: 각 회차 상단에 기준 버전 명시

---

## Verification Plan

1. **Phase 1 완료 후**: `npm run dev` -> localhost:3000 로드
2. **Phase 2 완료 후**: 사이드바 12개 세션 모두 접근 가능
3. **Phase 3 각 Batch 완료 후**: 해당 주차 모든 페이지 렌더링 + Mermaid 다이어그램 표시 확인
4. **Phase 4 완료 후**: 다크모드, 모바일, 검색 기능 전체 테스트
5. **Phase 5 완료 후**: Vercel 배포 URL에서 전체 사이트 동작 확인

---

## Total Files to Create: ~31 files

- Framework config: 6 files
- Navigation (_meta.js): 5 files
- Content (MDX): 17 files (1 homepage + 4 week overviews + 12 sessions)
- Static assets: 2 files (favicon, logo)
- postcss.config.mjs: 1 file (if needed)
