---
id: SPEC-CONTENT-ENHANCE
document: acceptance
version: "1.0.0"
status: planned
created: "2026-02-21"
---

# SPEC-CONTENT-ENHANCE: 인수 기준 체크리스트

## 전체 검증 원칙

모든 세션은 아래의 공통 기준(AC-GLOBAL)과 세션별 기준(AC-S##)을 모두 통과해야 한다.

---

## 공통 인수 기준 (AC-GLOBAL)

각 세션 파일에 대해 다음을 검증한다:

### Given — 기존 구현 조건

- Given 12개 세션 MDX 파일이 SPEC-CONTENT-W1~W4에 의해 구현 완료되어 있고
- Given 각 파일에 학습 목표, 핵심 개념, 코드 예시, 연습 문제, 요약 섹션이 존재할 때

### When — 이 SPEC의 편집이 적용되면

- When SPEC-CONTENT-ENHANCE에 정의된 6가지 요구사항(REQ-01~REQ-06)에 따라 내용이 추가되면

### Then — 다음 조건이 모두 참이어야 한다

| 기준 ID | 검증 항목 | 확인 방법 |
|---------|-----------|-----------|
| AC-G-01 | 파일이 삭제되거나 재생성되지 않았다 | `git diff --stat` — 파일 삭제 없음 확인 |
| AC-G-02 | 기존 텍스트가 수정/삭제되지 않았다 | `git diff` — 기존 라인에 `-` 표시 없음 |
| AC-G-03 | MDX 파일이 Nextra에서 빌드 오류 없이 컴파일된다 | `npm run build` 성공 |
| AC-G-04 | 추가된 모든 텍스트가 한국어로 작성되었다 | 육안 검토 |
| AC-G-05 | 추가된 내용이 멘토 어조를 사용한다 | 육안 검토 — "왜냐하면...", 공감 표현 존재 |
| AC-G-06 | 파일 맨 아래에 일괄 추가된 내용이 없다 | 육안 검토 — 내용이 관련 섹션 근처에 위치 |

---

## 세션별 인수 기준

### Session 1 (session1.mdx) — 개발환경 올인원 세팅

**REQ-05 — 빅 픽처 다이어그램**

```gherkin
Given session1.mdx에 "## 학습 목표" 섹션이 존재하고
When 편집이 완료되면
Then "## 전체 그림에서 이번 세션의 위치" 섹션이 학습 목표 다음에 존재하고
And IDE, 터미널, Git을 포함한 Mermaid 다이어그램이 렌더링되고
And 다이어그램 아래에 2~3문장 한국어 설명이 존재한다
```

**REQ-01 — "왜?" 설명**

```gherkin
Given "### 1. Cursor / VSCode 기본 세팅" 섹션이 존재하고
When 편집이 완료되면
Then VSCode/Cursor가 왜 필요한지 설명하는 "왜 필요한가?" 블록이 존재하고

Given "### 2. 터미널 기초 명령어" 또는 Warp 관련 섹션이 존재하고
When 편집이 완료되면
Then 터미널이 왜 개발자에게 필요한지 설명하는 내용이 존재하고

Given "### Git 초기 설정" 또는 Git 관련 섹션이 존재하고
When 편집이 완료되면
Then Git이 없던 시절의 문제를 설명하는 "왜?" 블록이 존재한다
```

**REQ-02 — 맥락 연결 콜아웃**

```gherkin
Given session1.mdx에 Git 관련 내용이 존재하고
When 편집이 완료되면
Then Session 10~12 (배포, CI/CD)와의 연결을 설명하는 "📎 연결 포인트" 콜아웃이 최소 1개 존재한다
```

**REQ-04 — 오해 교정 패턴**

```gherkin
Given 흔한 실수나 주의 사항 내용이 존재하고
When 편집이 완료되면
Then "왜 이런 실수를 하게 될까요?" 설명이 해당 위치에 존재한다
```

---

### Session 2 (session2.mdx) — Frontend/Backend + Node.js

```gherkin
Then 클라이언트-서버 관계를 보여주는 빅 픽처 다이어그램이 존재한다
Then "왜 프론트엔드와 백엔드를 분리하는가?" 설명이 존재한다
Then "Node.js는 왜 등장했는가?" (브라우저 밖의 JavaScript) 설명이 존재한다
Then Session 3 (HTTP)과의 연결 콜아웃이 최소 1개 존재한다
```

---

### Session 3 (session3.mdx) — HTTP/REST, JSON, CORS

```gherkin
Then HTTP Request/Response 사이클 빅 픽처 다이어그램이 존재한다
Then "왜 HTTP 메서드가 여러 개인가?" 설명이 존재한다
Then "CORS는 왜 존재하는가?" 보안 관점 설명이 존재한다
Then CORS 에러를 "서버 문제"로 오해하는 원인 교정 설명이 존재한다
Then REST API의 진화 흐름(단순 요청 → REST → RESTful)이 존재하거나 맥락 연결이 존재한다
```

---

### Session 4 (session4.mdx) — React 기초

```gherkin
Then React 컴포넌트 트리와 단방향 데이터 흐름 빅 픽처 다이어그램이 존재한다
Then "왜 컴포넌트 기반으로 개발하는가?" 설명이 존재한다
Then DOM 직접 조작 → jQuery → React 진화 흐름 설명이 존재한다
Then props와 state 혼동에 대한 오해 교정 설명이 존재한다
Then Session 5 (Next.js)와의 연결 콜아웃이 존재한다
```

---

### Session 5 (session5.mdx) — Next.js 기초

```gherkin
Then Next.js App Router 구조 빅 픽처 다이어그램이 존재한다
Then "왜 SSR/SSG가 필요한가?" (SEO, 초기 로드) 설명이 존재한다
Then CSR → SSR → SSG → ISR 진화 흐름 설명이 존재한다
Then Session 4 (React)와의 관계 연결 콜아웃이 존재한다
```

---

### Session 6 (session6.mdx) — 비동기 프로그래밍 + 디버깅

```gherkin
Then Call Stack + Event Loop + Callback Queue 흐름 빅 픽처 다이어그램이 존재한다
Then "JavaScript는 왜 싱글 스레드인가?" 설명이 존재한다
Then Callback → Promise → async/await 진화 흐름 설명이 존재한다
Then "async 함수가 더 빠른 것"이라는 오해 교정 설명이 존재한다
```

---

### Session 7 (session7.mdx) — Database + PostgreSQL/Supabase

```gherkin
Then Client → API → Database 데이터 흐름 빅 픽처 다이어그램이 존재한다
Then "왜 파일이 아닌 데이터베이스에 저장하는가?" 설명이 존재한다
Then 파일 저장 → 스프레드시트 → RDBMS 진화 흐름 설명이 존재한다
Then Session 8 (NoSQL)과의 연결 콜아웃이 존재한다
```

---

### Session 8 (session8.mdx) — MongoDB + ElasticSearch

```gherkin
Then SQL vs NoSQL 비교 빅 픽처 다이어그램이 존재한다
Then "왜 NoSQL이 등장했는가?" 설명이 존재한다
Then "왜 ElasticSearch가 일반 DB 검색을 대체하는가?" 설명이 존재한다
Then Session 7 (SQL DB)과의 차이점 연결 콜아웃이 존재한다
```

---

### Session 9 (session9.mdx) — OAuth + JWT + AI API

```gherkin
Then OAuth → JWT → API 인증 흐름 빅 픽처 다이어그램이 존재한다
Then 세션 기반 인증 → JWT → OAuth 진화 흐름 설명이 존재한다
Then "JWT는 암호화가 아니라 서명(Signature)"이라는 오해 교정 설명이 존재한다
Then "왜 비밀번호를 직접 저장하지 않는가?" 설명이 존재한다
```

---

### Session 10 (session10.mdx) — Docker

```gherkin
Then 로컬 → Docker 컨테이너 → 프로덕션 레이어 빅 픽처 다이어그램이 존재한다
Then 의존성 지옥 → 가상 머신 → Docker 진화 흐름 설명이 존재한다
Then "내 컴퓨터에서는 됐는데..." 문제 설명과 Docker의 해결 방식이 존재한다
Then "Docker는 가상 머신"이라는 오해 교정 설명이 존재한다
```

---

### Session 11 (session11.mdx) — AWS EC2 + Nginx

```gherkin
Then EC2 + Nginx + SSL + DNS 포함 클라우드 배포 빅 픽처 다이어그램이 존재한다
Then "왜 클라우드를 사용하는가?" (자체 서버 대비 장점) 설명이 존재한다
Then "왜 Nginx가 Node.js 앞단에 위치하는가?" (Reverse Proxy) 설명이 존재한다
```

---

### Session 12 (session12.mdx) — CI/CD + Domain

```gherkin
Then GitHub Actions CI/CD 파이프라인 전체 흐름 빅 픽처 다이어그램이 존재한다
Then "왜 수동 배포 대신 CI/CD를 사용하는가?" 설명이 존재한다
Then CI(Continuous Integration)와 CD(Continuous Delivery)의 개념 차이 교정이 존재한다
Then Session 10 (Docker) + Session 11 (EC2) 통합 연결 콜아웃이 존재한다
```

---

## 최종 완료 기준 (Definition of Done)

모든 세션이 세션별 인수 기준을 통과하고, 다음 조건이 충족되었을 때 이 SPEC은 완료(Completed) 상태가 된다:

- [ ] 12개 세션 모두 공통 인수 기준(AC-G-01~G-06) 통과
- [ ] 12개 세션 모두 세션별 기준 통과
- [ ] `npm run build` 전체 빌드 성공 (MDX 컴파일 오류 없음)
- [ ] 사용자(학습자) 관점에서 파일럿 Session 1 최종 검토 완료
- [ ] 빅 픽처 다이어그램 12개 — 모두 Mermaid로 렌더링 확인
- [ ] 멘토 어조 일관성 — 전 세션에 걸쳐 동일한 목소리(Voice) 유지
