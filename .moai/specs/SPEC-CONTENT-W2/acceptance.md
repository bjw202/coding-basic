---
id: SPEC-CONTENT-W2
type: acceptance
version: "1.0.0"
created: "2026-02-21"
updated: "2026-02-21"
---

# SPEC-CONTENT-W2: Acceptance Criteria

## 개요

Week 2 콘텐츠(Session 4-6)의 인수 기준을 정의한다. 템플릿 준수, 다이어그램 렌더링, 코드 유효성, 실습 과제, 한국어 콘텐츠 품질을 검증하는 시나리오를 포함한다.

---

## Scenario 1: 세션 템플릿 구조 준수 검증

### AC-W2-001: 모든 세션이 6개 섹션 템플릿을 따른다

```gherkin
Given Week 2의 세션 파일(session4.mdx, session5.mdx, session6.mdx)이 존재할 때
When 각 세션 파일의 섹션 구조를 확인하면
Then 다음 6개 섹션이 순서대로 포함되어 있어야 한다:
  | 순서 | 섹션명 |
  | 1 | 학습 목표 |
  | 2 | 핵심 개념 |
  | 3 | 다이어그램 |
  | 4 | 코드 예제 |
  | 5 | 실습 |
  | 6 | 요약 |
And 학습 목표는 3-5개 불릿 항목으로 구성되어야 한다
And 요약 섹션에 핵심 키워드 정리와 다음 세션 미리보기가 포함되어야 한다
```

### AC-W2-002: Week 2 내비게이션 파일이 올바르게 구성된다

```gherkin
Given content/week2/_meta.js 파일이 존재할 때
When 파일 내용을 확인하면
Then 다음 항목이 올바른 순서로 정의되어 있어야 한다:
  | key | label |
  | index | Week 2 개요 또는 동등한 한국어 라벨 |
  | session4 | Session 4에 대한 한국어 라벨 |
  | session5 | Session 5에 대한 한국어 라벨 |
  | session6 | Session 6에 대한 한국어 라벨 |
And 각 라벨은 한국어로 작성되어야 한다
```

### AC-W2-003: Week 2 개요 페이지가 완성도를 갖춘다

```gherkin
Given content/week2/index.mdx 파일이 존재할 때
When 파일 내용을 확인하면
Then Week 2 전체 학습 목표가 포함되어야 한다
And Session 4, 5, 6 각각의 간략한 소개가 포함되어야 한다
And 선수 지식(Week 1 복습 포인트)이 안내되어야 한다
```

---

## Scenario 2: Mermaid 다이어그램 렌더링 및 품질 검증

### AC-W2-004: 각 세션에 필수 다이어그램이 포함된다

```gherkin
Given Week 2의 각 세션 파일이 존재할 때
When 세션별 Mermaid 코드 블록 수를 카운트하면
Then 각 세션에 최소 2개, 최대 3개의 Mermaid 다이어그램이 포함되어야 한다
And Session 4에는 다음 다이어그램 유형이 포함되어야 한다:
  | 유형 | 주제 |
  | flowchart | 컴포넌트 트리 구조 |
  | flowchart 또는 graph | props/state 데이터 흐름 |
  | stateDiagram-v2 | React 렌더링 사이클 |
And Session 5에는 다음 다이어그램 유형이 포함되어야 한다:
  | 유형 | 주제 |
  | flowchart | App Router 파일 구조 |
  | flowchart | 서버 vs 클라이언트 컴포넌트 비교 |
  | sequenceDiagram | API Route 요청 흐름 |
And Session 6에는 다음 다이어그램 유형이 포함되어야 한다:
  | 유형 | 주제 |
  | stateDiagram-v2 | Promise 상태 머신 |
  | flowchart | async/await 실행 흐름 |
  | sequenceDiagram | 에러 전파 경로 |
```

### AC-W2-005: Mermaid 다이어그램이 올바르게 렌더링된다

```gherkin
Given 모든 Mermaid 다이어그램 코드 블록이 작성되었을 때
When npm run dev로 개발 서버를 실행하고 각 세션 페이지를 브라우저에서 열면
Then 모든 Mermaid 다이어그램이 시각적으로 올바르게 렌더링되어야 한다
And 다이어그램에 Mermaid 구문 오류가 없어야 한다
And 다이어그램 내 모든 텍스트 라벨은 영어로 작성되어 있어야 한다
And 다이어그램 전후에 한국어 설명이 포함되어야 한다
```

---

## Scenario 3: 코드 예제 유효성 검증

### AC-W2-006: 각 세션에 필수 코드 예제가 포함된다

```gherkin
Given Week 2의 각 세션 파일이 존재할 때
When 세션별 코드 블록 수를 카운트하면
Then 각 세션에 최소 5개의 코드 예제가 포함되어야 한다
And Session 4에는 다음 코드 예제가 포함되어야 한다:
  | 주제 |
  | 함수형 컴포넌트 정의 |
  | useState Hook 사용 |
  | useEffect Hook 사용 |
  | props 전달 |
  | 리스트 렌더링 map() |
  | 이벤트 핸들링 / 조건부 렌더링 |
And Session 5에는 다음 코드 예제가 포함되어야 한다:
  | 주제 |
  | page.tsx / layout.tsx |
  | 동적 라우팅 [slug] |
  | 서버 컴포넌트 async |
  | 클라이언트 컴포넌트 'use client' |
  | API Route handler |
  | 환경변수 사용 |
And Session 6에는 다음 코드 예제가 포함되어야 한다:
  | 주제 |
  | Promise 기본 |
  | async/await |
  | try/catch |
  | Promise.all |
  | fetch with error handling |
  | console 메서드 |
```

### AC-W2-007: 코드 예제의 문법 및 형식이 올바르다

```gherkin
Given 모든 코드 예제가 fenced code block으로 작성되었을 때
When 코드 블록의 언어 식별자를 확인하면
Then 모든 코드 블록에 적절한 언어 식별자(jsx, tsx, javascript, typescript, bash 중 하나)가 지정되어 있어야 한다
And 코드 내 주석은 영어로 작성되어 있어야 한다
And React/Next.js 코드 예제는 React 19 / Next.js 15 App Router 문법을 따라야 한다
And 명백한 문법 오류(닫히지 않은 괄호, 잘못된 import 등)가 없어야 한다
```

---

## Scenario 4: 실습 과제 검증

### AC-W2-008: 각 세션에 적절한 실습 과제가 포함된다

```gherkin
Given Week 2의 각 세션 파일이 존재할 때
When 실습 섹션의 내용을 확인하면
Then Session 4에는 대시보드 UI(목록/필터/상세) 만들기 과제가 포함되어야 한다
And Session 4 실습에 단계별 가이드(기초/중급/심화)가 제공되어야 한다
And Session 5에는 API 연결 및 데이터 출력 과제가 포함되어야 한다
And Session 5 실습에 단계별 가이드가 제공되어야 한다
And Session 6에는 의도적 에러 발생 및 디버깅 루틴 훈련 과제가 포함되어야 한다
And Session 6 실습에 최소 3가지 에러 시나리오(네트워크/타입/비동기)가 제공되어야 한다
```

### AC-W2-009: 실습 과제가 세션 학습 내용과 연계된다

```gherkin
Given 각 세션의 핵심 개념과 코드 예제가 작성되었을 때
When 실습 과제의 요구 기술을 분석하면
Then 실습에 필요한 모든 기술이 해당 세션의 핵심 개념 또는 코드 예제에서 다뤄져 있어야 한다
And 실습 과제에서 아직 배우지 않은 개념을 요구하지 않아야 한다
```

---

## Scenario 5: 한국어 콘텐츠 품질 검증

### AC-W2-010: 한국어 콘텐츠가 품질 기준을 충족한다

```gherkin
Given Week 2의 모든 MDX 파일이 작성되었을 때
When 한국어 콘텐츠 품질을 검토하면
Then 모든 본문 설명, 학습 목표, 실습 지시사항이 한국어로 작성되어 있어야 한다
And 존댓말(합니다체)로 통일되어 있어야 한다
And 기술 용어(Component, State, Props, Hook, Router 등)는 영어 원문이 유지되어야 한다
And 기술 용어 최초 등장 시 한국어 설명이 병기되어야 한다
And 부자연스러운 한국어 표현이나 문법 오류가 없어야 한다
And 초보자 친화적 문체(친절한 톤, 비유적 설명)가 사용되어야 한다
```

### AC-W2-011: 세션 간 연결성이 유지된다

```gherkin
Given Week 2의 모든 세션이 작성되었을 때
When 세션 간 연결성을 확인하면
Then Session 4 도입부에 Week 1 선수 지식(HTML/CSS/JS, Node.js)이 언급되어야 한다
And Session 5 도입부에 Session 4의 React 기초가 선수 지식으로 언급되어야 한다
And Session 6 도입부에 Session 3(HTTP/REST)과 Session 5(Next.js)가 선수 지식으로 언급되어야 한다
And 각 세션의 요약 섹션에 다음 세션 미리보기가 포함되어야 한다
And Session 6의 요약에 Week 3(데이터베이스/Supabase) 미리보기가 포함되어야 한다
```

---

## Definition of Done

Week 2 콘텐츠가 완료되려면 다음 조건을 모두 충족해야 한다:

- [ ] `content/week2/_meta.js` 생성 완료 (AC-W2-002)
- [ ] `content/week2/index.mdx` 생성 완료 (AC-W2-003)
- [ ] `content/week2/session4.mdx` 생성 완료 - 6개 섹션 템플릿 준수 (AC-W2-001)
- [ ] `content/week2/session5.mdx` 생성 완료 - 6개 섹션 템플릿 준수 (AC-W2-001)
- [ ] `content/week2/session6.mdx` 생성 완료 - 6개 섹션 템플릿 준수 (AC-W2-001)
- [ ] 세션당 2-3개 Mermaid 다이어그램 포함 (AC-W2-004)
- [ ] 모든 다이어그램 렌더링 오류 없음 (AC-W2-005)
- [ ] 세션당 최소 5개 코드 예제 포함 (AC-W2-006)
- [ ] 코드 예제 문법 및 형식 검증 통과 (AC-W2-007)
- [ ] 세션별 실습 과제 포함 (AC-W2-008)
- [ ] 실습-학습내용 연계성 검증 통과 (AC-W2-009)
- [ ] 한국어 콘텐츠 품질 기준 충족 (AC-W2-010)
- [ ] 세션 간 연결성 유지 (AC-W2-011)
- [ ] `npm run dev`로 모든 페이지 정상 렌더링 확인

## 검증 방법

| 검증 항목 | 방법 | 도구 |
|----------|------|------|
| 템플릿 구조 | 수동 검토 + Grep 패턴 매칭 | Grep, Read |
| Mermaid 렌더링 | 브라우저에서 시각적 확인 | npm run dev, Chrome |
| 코드 문법 | 언어 식별자 확인 + 구문 검토 | Grep, Read |
| 한국어 품질 | 수동 검토 | Read |
| 세션 연결성 | 선수지식/미리보기 키워드 검색 | Grep |
| 빌드 성공 | 프로덕션 빌드 | npm run build |

## Traceability

| 인수 기준 | 관련 요구사항 |
|----------|-------------|
| AC-W2-001, AC-W2-002, AC-W2-003 | REQ-W2-STRUCTURE |
| AC-W2-004, AC-W2-005 | REQ-W2-DIAGRAM |
| AC-W2-006, AC-W2-007 | REQ-W2-CODE |
| AC-W2-008, AC-W2-009 | REQ-W2-EXERCISE |
| AC-W2-010, AC-W2-011 | REQ-W2-QUALITY |
