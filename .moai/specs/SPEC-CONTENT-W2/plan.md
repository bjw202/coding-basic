---
id: SPEC-CONTENT-W2
type: plan
version: "1.0.0"
created: "2026-02-21"
updated: "2026-02-21"
---

# SPEC-CONTENT-W2: Implementation Plan

## 개요

Week 2 콘텐츠(Session 4-6)를 구현하기 위한 상세 계획서이다. 각 세션별 콘텐츠 아웃라인, Mermaid 다이어그램 사양, 코드 예제 목록, 실습 과제 명세를 포함한다.

---

## Milestone 1: 인프라 파일 (Primary Goal)

### 1.1 `content/week2/_meta.js`

```js
export default {
  index: "Week 2 개요",
  session4: "Session 4: React 기초",
  session5: "Session 5: Next.js 기초",
  session6: "Session 6: 비동기 + 디버깅"
}
```

### 1.2 `content/week2/index.mdx`

Week 2 개요 페이지 구성:

- Week 2 학습 목표 요약 (React, Next.js, 비동기/디버깅)
- 각 세션 간략 소개 (Session 4, 5, 6)
- 선수 지식 안내 (Week 1 내용 복습 포인트)
- Week 2 완료 후 달성 역량 명시

---

## Milestone 2: Session 4 - React 기초 (Primary Goal)

### 2.1 콘텐츠 아웃라인

#### 학습 목표 (3-5개)

1. React 컴포넌트의 개념과 구조를 이해한다
2. props와 state를 활용하여 데이터를 관리할 수 있다
3. JSX 문법으로 UI를 선언적으로 작성할 수 있다
4. 이벤트 핸들링과 조건부 렌더링을 구현할 수 있다
5. 리스트 데이터를 map()으로 렌더링할 수 있다

#### 핵심 개념 섹션

1. **React란 무엇인가** - UI 라이브러리 개념, 선언적 프로그래밍, 컴포넌트 기반 아키텍처
2. **컴포넌트 구조** - 함수형 컴포넌트, JSX 문법, 컴포넌트 합성
3. **Props** - 부모에서 자식으로 데이터 전달, props의 읽기 전용 특성, 기본값 설정
4. **State** - useState Hook, 상태 변경과 리렌더링, 상태 끌어올리기(lifting state up)
5. **이벤트 핸들링** - onClick, onChange 등 이벤트 처리, 이벤트 객체
6. **리스트 렌더링과 조건부 렌더링** - map(), key prop, 삼항 연산자, && 연산자
7. **useEffect** - 사이드 이펙트, 의존성 배열, 클린업 함수

### 2.2 Mermaid 다이어그램 사양

#### Diagram 4-1: Component Tree Structure (flowchart)

```
flowchart TD
  App --> Header
  App --> Dashboard
  Dashboard --> FilterBar
  Dashboard --> ItemList
  ItemList --> ItemCard1[ItemCard]
  ItemList --> ItemCard2[ItemCard]
  ItemList --> ItemCard3[ItemCard]
  App --> Footer
```

- 목적: React 컴포넌트 계층 구조 시각화
- 실습 대시보드 UI의 컴포넌트 트리 예시

#### Diagram 4-2: Props and State Data Flow (flowchart LR)

```
flowchart LR
  ParentState["Parent State<br/>(items, filter)"] -->|props| ChildA["FilterBar<br/>(props: filter, onFilterChange)"]
  ParentState -->|props| ChildB["ItemList<br/>(props: filteredItems)"]
  ChildA -->|callback| ParentState
  ChildB -->|props| Grandchild["ItemCard<br/>(props: item)"]
```

- 목적: props를 통한 데이터 하향 전달, 콜백을 통한 이벤트 상향 전달 시각화

#### Diagram 4-3: React Rendering Cycle (stateDiagram-v2)

```
stateDiagram-v2
  [*] --> Initial_Render
  Initial_Render --> Mounted: DOM Created
  Mounted --> Re_Render: State Change / Props Change
  Re_Render --> Virtual_DOM_Diff: Reconciliation
  Virtual_DOM_Diff --> DOM_Update: Patch Changes
  DOM_Update --> Mounted: Updated
  Mounted --> Unmounted: Component Removed
  Unmounted --> [*]
```

- 목적: React 컴포넌트 생명주기와 렌더링 사이클 이해

### 2.3 코드 예제 목록

| # | 파일명/제목 | 언어 | 설명 |
|---|-----------|------|------|
| 1 | Functional Component | tsx | 기본 함수형 컴포넌트 정의와 JSX 반환 |
| 2 | useState Hook | tsx | 카운터 예제로 상태 관리 기초 |
| 3 | useEffect Hook | tsx | 마운트 시 데이터 fetch, 의존성 배열 |
| 4 | Props Passing | tsx | 부모-자식 컴포넌트 간 props 전달 |
| 5 | List Rendering with map() | tsx | 배열 데이터를 리스트로 렌더링, key prop |
| 6 | Event Handling & Conditional Rendering | tsx | onClick, onChange 이벤트, 조건부 UI |

### 2.4 실습 과제 사양

**대시보드 UI 만들기 (목록/필터/상세)**

- **기초 단계**: App, Header, ItemList, ItemCard 컴포넌트 분리
- **중급 단계**: useState로 아이템 목록 상태 관리, map()으로 리스트 렌더링
- **심화 단계**: FilterBar 컴포넌트 추가, 필터 상태 관리, 조건부 렌더링으로 상세 보기
- **보너스**: useEffect로 외부 JSON 데이터 로드

#### 요약 섹션

- 핵심 키워드: Component, JSX, Props, State, useState, useEffect, map(), key, Event Handler
- 다음 세션 미리보기: Session 5에서 Next.js App Router로 React 앱을 실제 웹 프레임워크에서 동작시킵니다

---

## Milestone 3: Session 5 - Next.js 기초 (Primary Goal)

### 3.1 콘텐츠 아웃라인

#### 학습 목표 (3-5개)

1. Next.js App Router의 파일 기반 라우팅을 이해한다
2. 서버 컴포넌트와 클라이언트 컴포넌트의 차이를 구분할 수 있다
3. 동적 라우팅(Dynamic Routes)을 구현할 수 있다
4. API Route를 생성하고 데이터를 처리할 수 있다
5. 환경변수를 안전하게 관리할 수 있다

#### 핵심 개념 섹션

1. **Next.js란 무엇인가** - React 메타프레임워크, 풀스택 기능, App Router 소개
2. **파일 기반 라우팅** - page.tsx, layout.tsx, loading.tsx, error.tsx 역할
3. **동적 라우팅** - [slug] 패턴, params 사용, 중첩 라우트
4. **서버 컴포넌트 vs 클라이언트 컴포넌트** - 기본값이 서버 컴포넌트, 'use client' 지시어, 언제 어떤 것을 사용하는지
5. **API Route** - route.ts 파일, GET/POST 핸들러, Request/Response 객체
6. **환경변수** - .env.local, NEXT_PUBLIC_ 접두사, 서버 전용 vs 클라이언트 노출

### 3.2 Mermaid 다이어그램 사양

#### Diagram 5-1: App Router File Structure (flowchart TD)

```
flowchart TD
  app["app/"] --> layout["layout.tsx<br/>(Root Layout)"]
  app --> page["page.tsx<br/>(Home: /)"]
  app --> users["users/"]
  users --> users_page["page.tsx<br/>(/users)"]
  users --> users_id["[id]/"]
  users_id --> users_id_page["page.tsx<br/>(/users/:id)"]
  app --> api["api/"]
  api --> api_users["users/"]
  api_users --> route["route.ts<br/>(API Handler)"]
```

- 목적: 디렉터리 구조와 URL 경로 매핑 시각화

#### Diagram 5-2: Server vs Client Components (flowchart LR)

```
flowchart LR
  subgraph Server["Server Components (Default)"]
    SC1["Data Fetching<br/>async/await"]
    SC2["Database Access<br/>Direct Query"]
    SC3["Sensitive Data<br/>API Keys, Tokens"]
  end
  subgraph Client["Client Components ('use client')"]
    CC1["User Interaction<br/>onClick, onChange"]
    CC2["Browser APIs<br/>localStorage, window"]
    CC3["State & Effects<br/>useState, useEffect"]
  end
  Server -->|"Rendered on Server"| HTML["HTML to Browser"]
  Client -->|"Hydrated on Client"| Interactive["Interactive UI"]
```

- 목적: 서버/클라이언트 컴포넌트 사용 시나리오 비교

#### Diagram 5-3: API Route Request Flow (sequenceDiagram)

```
sequenceDiagram
  participant Browser
  participant NextServer as Next.js Server
  participant APIRoute as API Route Handler
  participant DB as External API / DB

  Browser->>NextServer: GET /api/users
  NextServer->>APIRoute: Route to handler
  APIRoute->>DB: Fetch data
  DB-->>APIRoute: Return data
  APIRoute-->>NextServer: JSON Response
  NextServer-->>Browser: HTTP 200 + JSON
```

- 목적: API Route 요청-응답 흐름 시각화

### 3.3 코드 예제 목록

| # | 파일명/제목 | 언어 | 설명 |
|---|-----------|------|------|
| 1 | page.tsx & layout.tsx | tsx | 기본 페이지와 레이아웃 구조 |
| 2 | Dynamic Route [slug] | tsx | 동적 라우팅 params 사용 |
| 3 | Server Component (async) | tsx | 서버 컴포넌트에서 데이터 fetch |
| 4 | Client Component ('use client') | tsx | 클라이언트 컴포넌트, useState 사용 |
| 5 | API Route Handler | ts | GET/POST API 엔드포인트 구현 |
| 6 | Environment Variables | tsx | .env.local, NEXT_PUBLIC_ 접두사 활용 |

### 3.4 실습 과제 사양

**Next.js에서 API 연결 후 화면 출력**

- **Step 1**: API Route 생성 (`app/api/items/route.ts`) - 하드코딩된 JSON 데이터 반환
- **Step 2**: 서버 컴포넌트에서 fetch로 API 호출 및 데이터 표시
- **Step 3**: 클라이언트 컴포넌트로 전환 - useState + useEffect로 동일 기능 구현
- **Step 4**: 동적 라우팅으로 개별 아이템 상세 페이지 구현
- **보너스**: 환경변수로 API URL 관리

#### 요약 섹션

- 핵심 키워드: App Router, page.tsx, layout.tsx, [slug], Server Component, Client Component, 'use client', API Route, route.ts, Environment Variables
- 다음 세션 미리보기: Session 6에서 비동기 프로그래밍과 디버깅 기법을 학습합니다

---

## Milestone 4: Session 6 - 비동기 + 디버깅 (Primary Goal)

### 4.1 콘텐츠 아웃라인

#### 학습 목표 (3-5개)

1. Promise의 개념과 3가지 상태(pending/fulfilled/rejected)를 이해한다
2. async/await 패턴으로 비동기 코드를 작성할 수 있다
3. try/catch를 활용한 에러 처리와 에러 전파를 이해한다
4. 브라우저 DevTools의 디버깅 기능을 활용할 수 있다
5. 체계적인 디버깅 루틴(원인 찾기 -> 재현 -> 고치기)을 수행할 수 있다

#### 핵심 개념 섹션

1. **콜백에서 Promise로** - 콜백 헬 문제, Promise의 등장 배경
2. **Promise 기초** - new Promise, resolve/reject, .then/.catch/.finally
3. **async/await** - async 함수 선언, await 키워드, 동기적 코딩 스타일로 비동기 처리
4. **에러 처리** - try/catch, 에러 전파, 재시도(retry) 기본 패턴
5. **Promise.all / Promise.race** - 병렬 실행, 경쟁 조건
6. **fetch API와 에러 핸들링** - HTTP 요청, response.ok 체크, 네트워크 에러 처리
7. **디버깅 전략** - console 메서드(log/debug/error/table), 브레이크포인트, 네트워크 탭
8. **체계적 디버깅 루틴** - 원인 찾기 -> 재현 -> 고치기 3단계 프로세스

### 4.2 Mermaid 다이어그램 사양

#### Diagram 6-1: Promise State Machine (stateDiagram-v2)

```
stateDiagram-v2
  [*] --> Pending: new Promise()
  Pending --> Fulfilled: resolve(value)
  Pending --> Rejected: reject(error)
  Fulfilled --> [*]: .then(callback)
  Rejected --> [*]: .catch(callback)
  note right of Pending: Waiting for result...
  note right of Fulfilled: Success!
  note right of Rejected: Error occurred
```

- 목적: Promise의 3가지 상태와 전이 시각화

#### Diagram 6-2: Async/Await Execution Flow (flowchart TD)

```
flowchart TD
  Start["Start Function"] --> Step1["console.log('1')"]
  Step1 --> Await1["await fetchUser()"]
  Await1 -->|"Paused: control returns<br/>to event loop"| EventLoop["Event Loop<br/>(other tasks run)"]
  EventLoop -->|"Promise resolved"| Resume["Resume execution"]
  Resume --> Step2["console.log('2: user data')"]
  Step2 --> Await2["await fetchPosts(user)"]
  Await2 -->|"Paused again"| EventLoop
  EventLoop -->|"Promise resolved"| Resume2["Resume"]
  Resume2 --> Step3["console.log('3: posts data')"]
  Step3 --> End["Function complete"]
```

- 목적: async/await 실행 흐름과 이벤트 루프 관계 시각화

#### Diagram 6-3: Error Propagation Path (sequenceDiagram)

```
sequenceDiagram
  participant UI as UI Component
  participant Fetch as fetchData()
  participant API as API Server

  UI->>Fetch: Call async function
  Fetch->>API: HTTP Request
  API-->>Fetch: 500 Internal Error
  Fetch->>Fetch: throw new Error()

  alt try/catch exists
    Fetch-->>UI: Error caught, show message
  else no error handling
    Fetch-->>UI: Uncaught error, app crashes
  end
```

- 목적: 에러 전파 경로와 try/catch의 역할 시각화

### 4.3 코드 예제 목록

| # | 파일명/제목 | 언어 | 설명 |
|---|-----------|------|------|
| 1 | Promise Basics | javascript | new Promise, resolve, reject, .then/.catch |
| 2 | async/await Pattern | typescript | async 함수 선언, await로 순차 실행 |
| 3 | try/catch Error Handling | typescript | 에러 잡기, 에러 메시지 표시 |
| 4 | Promise.all Parallel Execution | typescript | 여러 비동기 작업 동시 실행 |
| 5 | fetch with Error Handling | typescript | HTTP 요청, response.ok 체크, 네트워크 에러 |
| 6 | Console Methods | javascript | console.log/debug/error/table 활용 전략 |
| 7 | Breakpoint Debugging | - | DevTools 브레이크포인트 설정 가이드 (스크린샷/설명) |

### 4.4 실습 과제 사양

**의도적 에러 만들고 디버깅 루틴 훈련**

- **Step 1: 원인 찾기** - 의도적으로 에러가 발생하는 코드 제공 (잘못된 API URL, 타입 에러, 비동기 순서 문제)
- **Step 2: 재현** - DevTools 네트워크 탭, 콘솔 에러 메시지 분석, 브레이크포인트로 실행 흐름 추적
- **Step 3: 고치기** - 에러 원인 수정, try/catch 추가, 재시도 로직 구현

에러 시나리오:
1. **네트워크 에러**: 존재하지 않는 API URL로 fetch 시도
2. **타입 에러**: undefined 객체의 속성 접근 시도
3. **비동기 순서 에러**: await 누락으로 인한 Promise 객체 직접 사용

#### 요약 섹션

- 핵심 키워드: Promise, pending, fulfilled, rejected, async, await, try/catch, Promise.all, fetch, console, breakpoint, DevTools
- 다음 세션 미리보기: Session 7에서 데이터베이스와 Supabase를 활용한 CRUD 작업을 학습합니다

---

## Milestone 5: 최종 검증 (Secondary Goal)

- 모든 MDX 파일이 통일된 템플릿 구조를 준수하는지 확인
- Mermaid 다이어그램이 올바르게 렌더링되는지 `npm run dev`로 확인
- 코드 예제의 문법 오류가 없는지 확인
- 한국어 콘텐츠의 자연스러운 문체 확인
- Session 간 연결성(미리보기/선수지식) 확인

---

## 기술 접근 방식

- **프레임워크**: Nextra 4.x MDX 콘텐츠 규칙 준수
- **다이어그램**: Mermaid 구문, Nextra 내장 렌더러 사용
- **코드 예제**: React 19 + Next.js 15 App Router 기준
- **언어**: TypeScript/TSX 기본, 필요시 JavaScript 병기
- **문체**: 합니다체, 초보자 친화적 톤

## 리스크 및 대응

| 리스크 | 영향 | 대응 |
|--------|------|------|
| Mermaid 다이어그램 한국어 렌더링 이슈 | 다이어그램 깨짐 | 다이어그램 내 라벨은 영어로 작성, 본문에서 한국어 설명 |
| 코드 예제 분량 과다 | 학습자 피로감 | 핵심 예제 위주로 정리, 보너스는 선택사항으로 표시 |
| 세션 간 난이도 점프 | 학습자 이탈 | 각 세션 도입부에 선수 지식 복습 포인트 명시 |
| Next.js API 변경 | 코드 예제 비호환 | Next.js 15 안정 버전 기준으로 작성, 버전 명시 |

## Traceability

| 태그 | 관련 SPEC |
|------|----------|
| SPEC-CONTENT-W2 | spec.md, plan.md, acceptance.md |
