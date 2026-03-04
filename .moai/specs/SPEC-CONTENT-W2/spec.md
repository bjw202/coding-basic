---
id: SPEC-CONTENT-W2
version: "1.0.0"
status: implemented
created: "2026-02-21"
updated: "2026-02-21"
author: MoAI
priority: high
tags: [content, week2, react, nextjs, async, debugging, mdx, mermaid]
---

# SPEC-CONTENT-W2: Week 2 Content (Sessions 4-6)

## HISTORY

| 버전 | 날짜 | 작성자 | 변경 내용 |
|------|------|--------|----------|
| 1.0.0 | 2026-02-21 | MoAI | 초기 SPEC 작성 |

## 개요

Week 2는 React와 Next.js 기초, 비동기 프로그래밍 및 디버깅을 다루는 3개 세션(Session 4-6)의 MDX 콘텐츠를 작성한다. Nextra 4.x 문서 사이트에서 주니어 개발자를 대상으로 한국어로 작성되며, 각 세션은 통일된 템플릿 구조를 따른다.

### 대상 파일

| 파일 | 설명 |
|------|------|
| `content/week2/_meta.js` | Week 2 사이드바 내비게이션 설정 |
| `content/week2/index.mdx` | Week 2 개요 페이지 |
| `content/week2/session4.mdx` | Session 4: React 기초 |
| `content/week2/session5.mdx` | Session 5: Next.js 기초 |
| `content/week2/session6.mdx` | Session 6: 비동기 + 디버깅 |

---

## 요구사항

### REQ-W2-STRUCTURE: 콘텐츠 구조 및 템플릿 준수

시스템은 **항상** 각 세션 MDX 페이지가 다음 6개 섹션을 순서대로 포함해야 한다:

1. 학습 목표 (Learning Objectives) - 불릿 리스트 형식
2. 핵심 개념 (Core Concepts) - 점진적 난이도의 상세 설명
3. 다이어그램 (Mermaid Diagrams) - 세션당 2-3개 시각적 다이어그램
4. 코드 예제 (Code Examples) - 실행 가능한 실용 코드 스니펫
5. 실습 (Exercises) - 난이도별 실습 과제
6. 요약 (Summary) - 핵심 정리 및 다음 세션 미리보기

**WHEN** `content/week2/index.mdx` 파일이 생성될 때 **THEN** Week 2 전체 학습 목표와 각 세션 개요를 포함해야 한다.

**WHEN** `content/week2/_meta.js` 파일이 생성될 때 **THEN** Session 4, 5, 6의 한국어 표시 라벨과 올바른 순서를 정의해야 한다.

### REQ-W2-DIAGRAM: Mermaid 다이어그램 요구사항

시스템은 **항상** 각 세션에 최소 2개, 최대 3개의 Mermaid 다이어그램을 포함해야 한다.

**Session 4 다이어그램:**

- **WHEN** 컴포넌트 트리 구조를 설명할 때 **THEN** flowchart 형식의 React 컴포넌트 계층 구조 다이어그램을 제공해야 한다.
- **WHEN** 데이터 흐름을 설명할 때 **THEN** props/state 데이터 흐름을 보여주는 diagram을 제공해야 한다.
- **WHEN** 렌더링 과정을 설명할 때 **THEN** React 렌더링 사이클을 보여주는 state diagram을 제공해야 한다.

**Session 5 다이어그램:**

- **WHEN** App Router 구조를 설명할 때 **THEN** 파일 구조와 라우팅 매핑을 보여주는 flowchart를 제공해야 한다.
- **WHEN** 서버/클라이언트 컴포넌트를 설명할 때 **THEN** 차이점을 비교하는 diagram을 제공해야 한다.
- **WHEN** API Route 요청 흐름을 설명할 때 **THEN** 클라이언트-서버 간 요청/응답을 보여주는 sequence diagram을 제공해야 한다.

**Session 6 다이어그램:**

- **WHEN** Promise 개념을 설명할 때 **THEN** pending/fulfilled/rejected 상태를 보여주는 state diagram을 제공해야 한다.
- **WHEN** async/await 실행 흐름을 설명할 때 **THEN** 동기/비동기 실행 순서를 비교하는 flowchart를 제공해야 한다.
- **WHEN** 에러 전파를 설명할 때 **THEN** try/catch 에러 전파 경로를 보여주는 sequence diagram을 제공해야 한다.

시스템은 Mermaid 다이어그램 내 텍스트에 **한국어를 사용하지 않아야 한다**. 모든 다이어그램 노드 라벨과 설명은 영어로 작성하되, 다이어그램 전후 본문 설명은 한국어로 작성한다.

### REQ-W2-CODE: 코드 예제 요구사항

시스템은 **항상** 각 세션에 최소 5개의 코드 예제를 포함해야 한다.

**Session 4 코드 예제:**

- **WHEN** 컴포넌트 구조를 학습할 때 **THEN** 함수형 컴포넌트 정의, JSX 문법을 보여주는 예제를 제공해야 한다.
- **WHEN** 상태 관리를 학습할 때 **THEN** `useState`, `useEffect` 활용 예제를 제공해야 한다.
- **WHEN** 데이터 전달을 학습할 때 **THEN** props 전달 및 리스트 렌더링 `map()` 예제를 제공해야 한다.
- **WHEN** 사용자 상호작용을 학습할 때 **THEN** 이벤트 핸들링, 조건부 렌더링 예제를 제공해야 한다.

**Session 5 코드 예제:**

- **WHEN** 라우팅을 학습할 때 **THEN** `page.tsx`, `layout.tsx`, 동적 라우팅 `[slug]` 예제를 제공해야 한다.
- **WHEN** 서버/클라이언트 컴포넌트를 학습할 때 **THEN** 서버 컴포넌트(async), 클라이언트 컴포넌트(`'use client'`) 예제를 제공해야 한다.
- **WHEN** API를 학습할 때 **THEN** API Route handler, 환경변수 사용 예제를 제공해야 한다.

**Session 6 코드 예제:**

- **WHEN** 비동기 기초를 학습할 때 **THEN** Promise 기본, async/await 패턴 예제를 제공해야 한다.
- **WHEN** 에러 처리를 학습할 때 **THEN** try/catch, Promise.all, fetch with error handling 예제를 제공해야 한다.
- **WHEN** 디버깅 기법을 학습할 때 **THEN** console.log/debug/error 전략, 브레이크포인트 설정 예제를 제공해야 한다.

시스템은 코드 예제에서 **항상** 적절한 언어 식별자(`jsx`, `tsx`, `javascript`, `typescript`)를 fenced code block에 사용해야 한다.

시스템은 코드 예제에서 **항상** 영어로 코드 주석을 작성해야 한다.

### REQ-W2-EXERCISE: 실습 과제 요구사항

시스템은 **항상** 각 세션에 난이도가 구분된 실습 과제를 포함해야 한다.

**Session 4 실습:**

- **WHEN** Session 4 실습 섹션에 도달할 때 **THEN** 대시보드 UI(목록/필터/상세) 만들기 과제를 제공해야 한다.
- 실습은 단계별로 구성하며, 기초 단계(컴포넌트 분리)에서 심화 단계(상태 관리 및 필터링)까지 점진적으로 진행한다.

**Session 5 실습:**

- **WHEN** Session 5 실습 섹션에 도달할 때 **THEN** Next.js에서 API를 연결하고 화면에 데이터를 출력하는 과제를 제공해야 한다.
- 실습은 API Route 생성, 클라이언트에서 데이터 fetch, 화면 렌더링 순서로 구성한다.

**Session 6 실습:**

- **WHEN** Session 6 실습 섹션에 도달할 때 **THEN** 의도적으로 에러를 발생시키고 "원인 찾기 -> 재현 -> 고치기" 루틴을 훈련하는 과제를 제공해야 한다.
- 실습은 일반적인 에러 시나리오(네트워크 에러, 타입 에러, 비동기 에러)를 포함한다.

### REQ-W2-QUALITY: 품질 및 한국어 콘텐츠 요구사항

시스템은 **항상** 다음 품질 기준을 충족해야 한다:

- 모든 본문 설명, 학습 목표, 실습 지시사항은 한국어로 작성한다.
- 기술 용어(Component, State, Props, Hook, Router, API Route 등)는 영어 원문을 유지하되, 필요시 한국어 설명을 병기한다.
- 초보자 친화적 문체를 사용한다: 존댓말(합니다체), 친절한 톤, 비유적 설명 포함.
- 각 세션의 학습 목표는 3-5개 항목으로 구성한다.
- 각 세션의 요약 섹션은 핵심 키워드 정리와 다음 세션 미리보기를 포함한다.

**IF** 콘텐츠에 잘못된 한국어 문법이나 부자연스러운 표현이 포함될 경우 **THEN** 해당 콘텐츠는 품질 기준에 부적합하다.

**가능하면** 각 핵심 개념 설명에 실생활 비유나 시각적 메타포를 활용하여 이해를 돕는다.

---

## 제약 조건

- Nextra 4.x 콘텐츠 디렉터리 규칙을 따른다.
- Mermaid 다이어그램은 Nextra 내장 렌더러를 사용한다 (별도 플러그인 불필요).
- 코드 예제는 React 19, Next.js 15 App Router 기준으로 작성한다.
- 모든 코드 예제는 TypeScript/TSX를 기본으로 하되, 초보자 이해를 위해 JavaScript 버전을 병기할 수 있다.
- Session 4는 Week 1의 HTML/CSS/JS, Node.js 기초 지식을 전제한다.
- Session 5는 Session 4의 React 기초 지식을 전제한다.
- Session 6는 Session 3의 HTTP/REST 지식과 Session 5의 Next.js 기초를 전제한다.

## Traceability

| SPEC ID | 관련 파일 | 요구사항 |
|---------|----------|---------|
| SPEC-CONTENT-W2 | content/week2/_meta.js | REQ-W2-STRUCTURE |
| SPEC-CONTENT-W2 | content/week2/index.mdx | REQ-W2-STRUCTURE |
| SPEC-CONTENT-W2 | content/week2/session4.mdx | REQ-W2-STRUCTURE, REQ-W2-DIAGRAM, REQ-W2-CODE, REQ-W2-EXERCISE, REQ-W2-QUALITY |
| SPEC-CONTENT-W2 | content/week2/session5.mdx | REQ-W2-STRUCTURE, REQ-W2-DIAGRAM, REQ-W2-CODE, REQ-W2-EXERCISE, REQ-W2-QUALITY |
| SPEC-CONTENT-W2 | content/week2/session6.mdx | REQ-W2-STRUCTURE, REQ-W2-DIAGRAM, REQ-W2-CODE, REQ-W2-EXERCISE, REQ-W2-QUALITY |
