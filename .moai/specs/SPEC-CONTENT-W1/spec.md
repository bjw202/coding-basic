---
id: SPEC-CONTENT-W1
version: "1.0.0"
status: implemented
created: "2026-02-21"
updated: "2026-02-21"
author: MoAI
priority: high
tags: content, week1, sessions, mdx, curriculum
---

# SPEC-CONTENT-W1: 1주차 콘텐츠 (Session 1-3)

## HISTORY

| 버전 | 날짜 | 작성자 | 변경 내용 |
|------|------|--------|-----------|
| 1.0.0 | 2026-02-21 | MoAI | 초기 SPEC 작성 |

---

## 1. Environment (환경)

### 1.1 프로젝트 컨텍스트

- **프로젝트**: Vibe Coding 1-Month Bootcamp - Nextra 4.x 기반 문서 사이트
- **대상 독자**: 프로그래밍 경험이 없는 주니어 개발자 (한국어 사용자)
- **기술 스택**: Nextra 4.6.x, Next.js 15.x, React 19.x, TypeScript 5.x
- **콘텐츠 형식**: MDX (Markdown + React Components)
- **다이어그램**: Mermaid (Nextra 내장 지원)

### 1.2 파일 위치

| 파일 | 경로 |
|------|------|
| Session 1 | `content/week1/session1.mdx` |
| Session 2 | `content/week1/session2.mdx` |
| Session 3 | `content/week1/session3.mdx` |

### 1.3 관련 SPEC

- SPEC-INFRA-001: 인프라 설정 (Nextra 프로젝트 구조, _meta.js 등)

---

## 2. Assumptions (가정)

- A1: Nextra 4.x 프로젝트 인프라(layout.tsx, _meta.js, next.config.mjs)가 SPEC-INFRA-001에 의해 사전 구성되어 있다.
- A2: Mermaid 다이어그램은 Nextra의 내장 fenced code block 렌더링을 사용한다 (추가 플러그인 불필요).
- A3: 독자는 기본적인 컴퓨터 사용 능력만 갖추고 있으며, 프로그래밍 경험은 전혀 없다.
- A4: 모든 설명 텍스트는 한국어로 작성하며, 기술 용어(예: Git, HTTP, REST)는 영어 원문을 유지한다.
- A5: 코드 예제는 구문적으로 유효하고 실제 실행 가능한 수준이어야 한다.
- A6: 각 세션 MDX 페이지는 6,000~10,000 토큰 분량의 풍부한 콘텐츠를 포함한다.

---

## 3. Requirements (요구사항)

### REQ-01: 세션 템플릿 구조 (Ubiquitous)

시스템은 **항상** 각 세션 MDX 페이지에 다음 6개 섹션을 순서대로 포함해야 한다:

1. **학습 목표** (Learning Objectives): 불릿 리스트 형태의 세션 학습 성과
2. **핵심 개념** (Core Concepts): 점진적 복잡도를 가진 상세 설명
3. **다이어그램** (Mermaid Diagrams): 세션당 2~3개의 시각적 다이어그램
4. **코드 예제** (Code Examples): 구문 강조와 주석이 포함된 실행 가능한 코드
5. **실습** (Exercises): 난이도별 실습 과제
6. **요약** (Summary): 핵심 내용 정리 및 다음 세션 미리보기

### REQ-02: 다이어그램 요구사항 (Event-Driven)

**WHEN** 세션 페이지가 렌더링될 때 **THEN** 다음 Mermaid 다이어그램이 정상적으로 표시되어야 한다:

**Session 1 다이어그램:**
- 개발환경 구성도 (flowchart): IDE, Terminal, Git, Node.js의 관계를 시각화
- Git 워크플로우 (flowchart): init, add, commit, push의 기본 흐름

**Session 2 다이어그램:**
- 클라이언트-서버 아키텍처 (flowchart): 브라우저, 서버, 데이터베이스 간 요청/응답 흐름
- SSR vs CSR 비교 (flowchart): 렌더링 방식의 차이를 시각화
- Node.js 이벤트 루프 (flowchart): 이벤트 루프의 동작 원리

**Session 3 다이어그램:**
- HTTP 요청-응답 (sequence diagram): 클라이언트와 서버 간 HTTP 통신 과정
- REST API 설계 (flowchart): 리소스 기반 URL 설계 패턴
- CORS Preflight (sequence diagram): 브라우저, 프론트엔드, 백엔드 간 CORS 처리 흐름

### REQ-03: 코드 예제 요구사항 (State-Driven)

**IF** 세션에 코드 예제가 포함되면 **THEN** 다음 조건을 충족해야 한다:

- 모든 코드 예제는 구문적으로 유효해야 한다
- 적절한 언어 식별자(json, javascript, bash 등)로 syntax highlighting을 적용한다
- 각 코드 블록에는 한국어 주석 또는 설명 텍스트가 포함된다
- 초보자가 이해할 수 있도록 단계별로 설명한다

**Session 1 코드 예제:**
- VS Code `settings.json` 기본 설정
- `.gitignore` 파일 작성
- `package.json` 초기화 (`npm init`)
- `.env` 환경변수 파일 기본 구조

**Session 2 코드 예제:**
- CommonJS `require` vs ESM `import` 비교
- Express 기본 서버 생성 및 실행
- 라우트 핸들러 작성 (GET, POST)

**Session 3 코드 예제:**
- `fetch` API를 이용한 HTTP 요청
- Express CORS 미들웨어 설정
- HTTP 메서드별 요청/응답 예제 (GET, POST, PUT, DELETE)
- JSON 파싱 및 응답 처리

### REQ-04: 실습 과제 요구사항 (Event-Driven)

**WHEN** 학습자가 실습 섹션에 도달하면 **THEN** 다음 요건을 충족하는 실습 과제가 제공되어야 한다:

- 각 세션에 최소 2개 이상의 실습 과제를 포함한다
- 난이도 표시를 제공한다 (기본/도전)
- 실습 목표와 예상 결과를 명확히 기술한다
- 초보자가 단계별로 따라할 수 있는 지시사항을 포함한다

**Session 1 실습:** "Hello Fullstack" 로컬 실행 + Git 저장소 초기화
**Session 2 실습:** Node.js로 간단 API 서버 띄우기
**Session 3 실습:** 프론트엔드에서 백엔드 API 호출, CORS 에러 재현/해결

### REQ-05: 콘텐츠 품질 요구사항 (Ubiquitous)

시스템은 **항상** 다음 품질 기준을 준수해야 한다:

- 모든 설명 텍스트는 한국어로 작성하되, 기술 용어는 영어 원문을 병기한다 (예: "서버(Server)")
- 초보자 친화적 어조를 사용한다 (경어체, 친절한 설명)
- 각 개념은 비유나 실생활 예시를 통해 설명한다
- 이전 세션의 내용을 참조하여 점진적 학습 경로를 제공한다
- MDX 파일은 Nextra 4.x의 fenced code block 문법을 준수한다

---

## 4. Specifications (세부 명세)

### 4.1 Session 1: 개발환경 올인원 세팅

| 항목 | 내용 |
|------|------|
| 파일 | `content/week1/session1.mdx` |
| 학습 목표 수 | 4~5개 |
| 핵심 개념 소주제 | Cursor/VSCode 기본 세팅, Warp 터미널, 프로젝트 구조/폴더링, 환경변수(.env) 기본 |
| 다이어그램 수 | 2개 (개발환경 구성도, Git 워크플로우) |
| 코드 예제 수 | 4개 (settings.json, .gitignore, package.json, .env) |
| 실습 | "Hello Fullstack" 실행 + Git 초기화 |
| 목표 토큰 | 6,000~10,000 |

### 4.2 Session 2: 프론트/백엔드 개념 + Node.js 기초

| 항목 | 내용 |
|------|------|
| 파일 | `content/week1/session2.mdx` |
| 학습 목표 수 | 4~5개 |
| 핵심 개념 소주제 | FE/BE 역할, 렌더링 개념(SSR/CSR), Node.js 런타임, 모듈 시스템(CommonJS vs ESM) |
| 다이어그램 수 | 3개 (클라이언트-서버, SSR vs CSR, Node.js 이벤트 루프) |
| 코드 예제 수 | 3개 (CommonJS vs ESM, Express 서버, 라우트 핸들러) |
| 실습 | Node.js로 간단 API 서버 띄우기 |
| 목표 토큰 | 6,000~10,000 |

### 4.3 Session 3: HTTP/REST, JSON, CORS 핵심

| 항목 | 내용 |
|------|------|
| 파일 | `content/week1/session3.mdx` |
| 학습 목표 수 | 4~5개 |
| 핵심 개념 소주제 | HTTP 메서드/상태코드, REST 설계, JSON 요청/응답, CORS 동작 원리 |
| 다이어그램 수 | 3개 (HTTP 요청-응답, REST API 설계, CORS Preflight) |
| 코드 예제 수 | 4개 (fetch API, CORS 미들웨어, HTTP 메서드별 예제, JSON 파싱) |
| 실습 | 프론트엔드-백엔드 호출 + CORS 에러 재현/해결 |
| 목표 토큰 | 6,000~10,000 |

### 4.4 콘텐츠 작성 규칙

- **제목 수준**: H1(#)은 세션 제목, H2(##)는 6개 템플릿 섹션, H3(###)은 소주제
- **다이어그램 문법**: Mermaid fenced code block (` ```mermaid `)
- **코드 블록**: 언어 식별자 포함 (` ```javascript `, ` ```bash `, ` ```json `)
- **강조 표현**: 핵심 용어는 **굵게**, 처음 등장하는 영어 용어는 한국어(영어) 형태로 표기
- **이모지**: 사용하지 않음

---

## Traceability

| 요구사항 | plan.md 연결 | acceptance.md 연결 |
|----------|-------------|-------------------|
| REQ-01 | Milestone 1 | AC-01, AC-02 |
| REQ-02 | Milestone 1 (각 세션별) | AC-03 |
| REQ-03 | Milestone 1 (각 세션별) | AC-04 |
| REQ-04 | Milestone 1 (각 세션별) | AC-05 |
| REQ-05 | 전체 | AC-06 |
