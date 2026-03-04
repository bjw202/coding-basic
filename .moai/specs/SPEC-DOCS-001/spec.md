---
id: SPEC-DOCS-001
version: 1.0.0
status: Planned
created: 2026-03-04
updated: 2026-03-04
author: manager-spec
priority: High
---

# SPEC-DOCS-001: Vibeclass 콘텐츠 강화 계획

## HISTORY

| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 1.0.0 | 2026-03-04 | 초기 SPEC 작성 - 59개 강사 자료 기반 콘텐츠 구조화 계획 | manager-spec |

---

## 환경 (Environment)

### 프로젝트 컨텍스트

- **플랫폼**: Nextra 4.x 기반 Next.js 문서 사이트
- **현재 구조**: 4주 과정 (Week 1-4), 12개 세션 (Session 1-12)
- **강사 자료**: `vibeclass-materials/` 디렉토리 내 59개 파일, 9개 카테고리
- **대상 학습자**: 1개월 바이브코딩 집중 과정 수강생
- **저장소 위치**: `/Users/byunjungwon/Dev/Class-Projects/vibeclass-coding-1-month`

### 현재 콘텐츠 구조

```
content/
├── week1/ (Session 1-3: 개발환경, Frontend/Backend, HTTP/REST)
├── week2/ (Session 4-6: React, Next.js, Async/Debugging)
├── week3/ (Session 7-9: DB/PostgreSQL, MongoDB, OAuth/JWT/AI)
└── week4/ (Session 10-12: Docker, AWS EC2, CI/CD)
```

### 강사 자료 분류 (59개 파일)

| 카테고리 | 파일 수 | 설명 |
|---------|--------|------|
| A - 오리엔테이션 & 마인드셋 | 7개 | 바이브코딩이란, 컴퓨터와_대화하기, AI와_대화하기, 첫_프로젝트_만들기, 개발환경_이해하기, 에러와_친해지기, 실전_팁_모음 |
| B - 터미널 & 도구 | 4개 | 기초_IT_용어_정리, 터미널_기본_명령어, 바이브코딩_터미널_명령어, Vim_편집기_가이드 |
| C - 개발 도구 | 3개 | 개발도구_설치_가이드, 에디터_터미널_연동, 도구별_단축키 |
| D - 핵심 커리큘럼 | 12개 | 세션 1-12와 1:1 매핑 |
| E - 프로그래밍 언어 | 5개 | Python, JavaScript, Git, Claude Code, 브라우저 DevTools |
| F - AI 프롬프팅 | 5개 | Claude Code 명령어, 실전_프롬프트_50선, 고급_프롬프트_100선, 네트워크_HTTP_용어, HTTP_프롬프트_매핑표 |
| G - 아키텍처 & CLAUDE.md | 3개 | CLAUDE.MD_작성법, 규모별_CLAUDE.MD, API_설계_예제 |
| H - AI 코딩 운영 | 3개 | AI_코딩_운영_규칙, AI_사고_분석집, 코드리뷰_체크리스트 |
| I - 심화 백엔드 | 9개 | NodeJS_핵심, Express_완전정복, API_호출_실전가이드, MySQL, PostgreSQL, ORM, Python 3부작 |

---

## 가정 (Assumptions)

1. **기술 가정**: Nextra 4.x MDX 형식으로 모든 콘텐츠를 렌더링할 수 있다
2. **내용 가정**: `vibeclass-materials/` 내 모든 파일은 정상적으로 읽을 수 있는 한국어 마크다운이다
3. **구조 가정**: 기존 `_meta.js` 파일 패턴을 그대로 확장하여 새 섹션을 추가할 수 있다
4. **학습 가정**: Week 0 사전 준비 섹션을 추가해도 기존 Week 1-4 수강 흐름에 영향이 없다
5. **팀 가정**: 콘텐츠 마이그레이션은 단계적으로 진행 가능하며, 부분 완료 상태로도 배포 가능하다

---

## 요구사항 (Requirements)

### R-001: Week 0 사전 준비 섹션 생성

**[Ubiquitous]** 시스템은 신규 수강생이 본과정 시작 전 접근할 수 있는 Week 0 오리엔테이션 섹션을 항상 제공해야 한다.

**[Event-Driven]** WHEN 신규 수강생이 사이트를 방문할 때 THEN 시스템은 `week0` 섹션에서 3개 하위 섹션(바이브코딩 소개, 개발환경 준비, AI 도구 입문)을 찾을 수 있어야 한다.

**[State-Driven]** IF `week0` 섹션이 존재하면 THEN 시스템은 다음 파일을 포함해야 한다:
- `바이브코딩이란` (Category A)
- `컴퓨터와_대화하기` (Category A)
- `AI와_대화하기` (Category A)
- `개발도구_설치_가이드` (Category C)
- `에디터_터미널_연동` (Category C)
- `터미널_기본_명령어` (Category B)

**[Unwanted]** 시스템은 Week 0 섹션이 기존 Week 1-4 섹션 번호 매김에 혼란을 주어서는 안 된다.

### R-002: 세션 강화 - 강사 참고 자료 연동

**[Event-Driven]** WHEN 수강생이 임의의 세션(Session 1-12)을 읽을 때 THEN 각 세션은 해당 Category D 자료를 링크하는 "강사 자료" 섹션을 포함해야 한다.

**[State-Driven]** IF 수강생이 Session 1-12를 학습하는 중이라면 THEN 시스템은 연관 Category I 심화 자료에 대한 직접 링크를 제공해야 한다.

**[Ubiquitous]** 시스템은 모든 세션에서 동일한 "강사 자료" 섹션 구조를 유지해야 한다.

**[Unwanted]** 시스템은 강사 자료 링크가 외부 사이트로 연결되어서는 안 되며, 모두 내부 문서로 연결되어야 한다.

### R-003: AI 도구 부록 섹션 생성

**[Ubiquitous]** 시스템은 AI 도구 마스터리와 관련된 통합 "AI 도구" 부록 섹션을 제공해야 한다.

**[State-Driven]** IF "AI 도구" 섹션이 존재하면 THEN 다음 자료를 포함해야 한다:
- `Claude_Code_필수_명령어` (Category F)
- `실전_프롬프트_50선` (Category F)
- `고급_프롬프트_100선` (Category F)
- `CLAUDE.MD_작성법` (Category G)
- `규모별_CLAUDE.MD` (Category G)
- `AI_코딩_운영_규칙` (Category H)
- `AI_사고_분석집` (Category H)
- `코드리뷰_체크리스트` (Category H)
- `HTTP_프롬프트_매핑표` (Category F)

**[Unwanted]** 시스템은 "AI 도구" 섹션 내 콘텐츠가 중복 없이 단일 출처 원칙을 따르도록 해야 한다.

### R-004: 심화 학습 부록 섹션 생성

**[Ubiquitous]** 시스템은 백엔드 심화 학습을 위한 "심화 학습" 부록 섹션을 제공해야 한다.

**[State-Driven]** IF "심화 학습" 섹션이 존재하면 THEN 다음 자료를 포함해야 한다:
- `NodeJS_핵심` (Category I)
- `Express_완전정복` (Category I)
- `API_호출_실전가이드` (Category I)
- `MySQL` (Category I)
- `PostgreSQL` (Category I)
- `ORM` (Category I)
- `Python 기초/중급/고급` 3부작 (Category I)

**[Event-Driven]** WHEN 수강생이 심화 학습이 필요할 때 THEN 시스템은 수강생이 "심화 학습" 섹션에서 고급 Node.js 콘텐츠를 찾을 수 있어야 한다.

### R-005: 언어 가이드 부록 섹션 생성

**[Ubiquitous]** 시스템은 프로그래밍 언어 종합 가이드를 위한 "언어 가이드" 부록 섹션을 제공해야 한다.

**[State-Driven]** IF "언어 가이드" 섹션이 존재하면 THEN 다음 자료를 포함해야 한다:
- `JavaScript_기초부터_실전까지` (Category E)
- `Python_기초부터_실전까지` (Category E)
- `Git_GitHub_Actions` (Category E)
- `Claude_Code_Codex_AI코딩_가이드` (Category E)
- `브라우저_개발자도구_완벽가이드` (Category E)

### R-006: 콘텐츠 마이그레이션 형식 표준화

**[Event-Driven]** WHEN `vibeclass-materials/`의 콘텐츠가 추가될 때 THEN 시스템은 다음 Nextra MDX 형식으로 변환되어야 한다:
- YAML frontmatter (title, description 최소 포함)
- 학습 목표 섹션
- Mermaid 다이어그램 (복잡한 개념 시각화)
- 코드 예제 블록
- 핵심 포인트 요약 섹션

**[Ubiquitous]** 시스템은 모든 마이그레이션된 페이지가 Nextra의 `_meta.js` 네비게이션 시스템에 등록되어야 한다.

**[Unwanted]** 시스템은 원본 `vibeclass-materials/` 파일을 직접 수정하거나 삭제해서는 안 된다 (원본 보존 원칙).

### R-007: 학습 경로 및 인덱스 생성

**[Optional]** 가능하면 시스템은 수강생이 자신의 학습 단계에 맞는 콘텐츠를 쉽게 찾을 수 있도록 학습 경로 인덱스 페이지를 제공해야 한다.

**[State-Driven]** IF 학습 경로 인덱스가 존재하면 THEN 시스템은 선수 학습 체인과 교차 참조 인덱스를 포함해야 한다.

---

## 명세 (Specifications)

### 새로운 파일 구조

```
content/
├── week0/                          # NEW: 사전 준비 섹션
│   ├── _meta.js
│   ├── index.mdx                   # Week 0 소개
│   ├── vibe-coding-intro.mdx       # 바이브코딩이란
│   ├── dev-environment.mdx         # 개발환경 준비
│   └── ai-tools-intro.mdx          # AI 도구 입문
├── week1/ (기존 + 강사 자료 링크 추가)
├── week2/ (기존 + 강사 자료 링크 추가)
├── week3/ (기존 + 강사 자료 링크 추가)
├── week4/ (기존 + 강사 자료 링크 추가)
└── appendix/                       # NEW: 부록 섹션
    ├── _meta.js
    ├── ai-tools/                   # AI 도구 마스터리 (Category F, G, H)
    │   ├── _meta.js
    │   ├── index.mdx
    │   ├── claude-code-commands.mdx
    │   ├── prompts-50.mdx
    │   ├── prompts-100-advanced.mdx
    │   ├── claude-md-guide.mdx
    │   ├── claude-md-by-scale.mdx
    │   ├── ai-coding-rules.mdx
    │   ├── ai-thinking-analysis.mdx
    │   ├── code-review-checklist.mdx
    │   └── http-prompt-mapping.mdx
    ├── deep-dive/                  # 심화 학습 (Category I)
    │   ├── _meta.js
    │   ├── index.mdx
    │   ├── nodejs-core.mdx
    │   ├── express-complete.mdx
    │   ├── api-call-guide.mdx
    │   ├── mysql-guide.mdx
    │   ├── postgresql-guide.mdx
    │   ├── orm-guide.mdx
    │   ├── python-basics.mdx
    │   ├── python-intermediate.mdx
    │   └── python-advanced.mdx
    └── language-guides/            # 언어 가이드 (Category E)
        ├── _meta.js
        ├── index.mdx
        ├── javascript-complete.mdx
        ├── python-complete.mdx
        ├── git-github-actions.mdx
        ├── ai-coding-guide.mdx
        └── browser-devtools.mdx
```

### MDX 파일 표준 형식

```mdx
---
title: "페이지 제목"
description: "페이지 설명 (SEO용)"
---

import { Callout } from 'nextra/components'

# 페이지 제목

## 학습 목표

이 섹션을 마치면 다음을 할 수 있습니다:
- 목표 1
- 목표 2

## 내용 섹션

...

## 핵심 포인트 정리

<Callout type="info">
핵심 내용 요약
</Callout>
```

### 추적성 태그 (Traceability Tags)

- **SPEC-DOCS-001-R001**: Week 0 섹션 생성 요구사항
- **SPEC-DOCS-001-R002**: 세션 강화 요구사항
- **SPEC-DOCS-001-R003**: AI 도구 섹션 요구사항
- **SPEC-DOCS-001-R004**: 심화 학습 섹션 요구사항
- **SPEC-DOCS-001-R005**: 언어 가이드 섹션 요구사항
- **SPEC-DOCS-001-R006**: 콘텐츠 마이그레이션 표준 요구사항
- **SPEC-DOCS-001-R007**: 학습 경로 인덱스 요구사항
