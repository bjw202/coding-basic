---
id: SPEC-CONTENT-ENHANCE
document: plan
version: "1.0.0"
status: planned
created: "2026-02-21"
---

# SPEC-CONTENT-ENHANCE: 구현 계획

## 1. 목표 요약

12개 세션 MDX 파일(W1~W4)에 "왜?"와 맥락 설명을 추가하는 콘텐츠 심화 작업.
기존 콘텐츠를 재작성하지 않고, 6가지 요구사항(REQ-01~REQ-06)에 따라 내용을 추가(Additive)한다.

---

## 2. 마일스톤

### Primary Goal: 파일럿 완료 및 패턴 확정

**Session 1 파일럿**

- 대상 파일: `content/week1/session1.mdx`
- 작업:
  - [ ] 빅 픽처 Mermaid 다이어그램 추가 (REQ-05)
  - [ ] 각 주요 개념에 "왜 필요한가?" 설명 추가 (REQ-01)
  - [ ] 맥락 연결 콜아웃 추가 (REQ-02)
  - [ ] 오해 교정 패턴 추가 (REQ-04)
  - [ ] 멘토 어조 검증 (REQ-06)
- 완료 기준: 사용자 검토 및 패턴 승인

---

### Secondary Goal: 1주차 나머지 + 2주차 완료

**Session 2 (session2.mdx) — Frontend/Backend + Node.js**

- [ ] 빅 픽처: Client ↔ Server ↔ Node.js 관계도
- [ ] "왜?" — 왜 프론트엔드와 백엔드를 분리하는가?
- [ ] "왜?" — Node.js는 왜 등장했는가? (브라우저 밖의 JS)
- [ ] 맥락 연결: Session 3 (HTTP)과의 연결
- [ ] 멘토 어조 검증

**Session 3 (session3.mdx) — HTTP/REST, JSON, CORS**

- [ ] 빅 픽처: HTTP Request/Response 사이클 전체
- [ ] "왜?" — HTTP 메서드가 왜 여러 개인가? (GET/POST/PUT/DELETE)
- [ ] "왜?" — CORS가 왜 존재하는가? (보안 관점)
- [ ] 진화 흐름: 단순 요청 → REST → RESTful API
- [ ] 오해 교정: CORS 에러는 "서버 문제"라는 오해

**Session 4 (session4.mdx) — React 기초**

- [ ] 빅 픽처: React 컴포넌트 트리와 단방향 데이터 흐름
- [ ] "왜?" — 왜 컴포넌트 기반으로 개발하는가? (재사용성, 유지보수)
- [ ] "왜?" — 왜 state가 필요한가? (DOM 직접 조작의 문제)
- [ ] 진화 흐름: DOM 직접 조작 → jQuery → React
- [ ] 오해 교정: props vs state 혼동

**Session 5 (session5.mdx) — Next.js 기초**

- [ ] 빅 픽처: Next.js App Router 구조 (Client → Server Component 경계)
- [ ] "왜?" — 왜 SSR/SSG가 필요한가? (SEO, 초기 로드 성능)
- [ ] 맥락 연결: Session 4 React와의 관계
- [ ] 진화 흐름: CSR → SSR → SSG → ISR

**Session 6 (session6.mdx) — 비동기 프로그래밍 + 디버깅**

- [ ] 빅 픽처: Call Stack + Event Loop + Callback Queue 흐름도
- [ ] "왜?" — JavaScript는 왜 싱글 스레드인가?
- [ ] 진화 흐름: Callback → Promise → async/await (핵심)
- [ ] 오해 교정: async 함수는 "빠른" 함수라는 오해

---

### Final Goal: 3주차 + 4주차 완료

**Session 7 (session7.mdx) — Database + PostgreSQL/Supabase**

- [ ] 빅 픽처: Client → API → Database 데이터 흐름 전체
- [ ] "왜?" — 왜 파일이 아닌 데이터베이스에 저장하는가?
- [ ] "왜?" — 왜 관계형 DB(Relational DB)를 먼저 배우는가?
- [ ] 진화 흐름: 파일 저장 → 스프레드시트 → RDBMS

**Session 8 (session8.mdx) — MongoDB + ElasticSearch**

- [ ] 빅 픽처: SQL vs NoSQL 사용 사례 비교 아키텍처
- [ ] "왜?" — 왜 NoSQL이 등장했는가? (유연한 스키마, 수평 확장)
- [ ] "왜?" — ElasticSearch는 왜 일반 DB 검색으로 대체할 수 없는가?
- [ ] 맥락 연결: Session 7 (SQL DB)과의 차이점

**Session 9 (session9.mdx) — OAuth + JWT + AI API**

- [ ] 빅 픽처: 인증 흐름 전체 (브라우저 → OAuth Provider → JWT → API)
- [ ] 진화 흐름: 세션 기반 인증 → JWT → OAuth (핵심)
- [ ] "왜?" — 왜 비밀번호를 직접 저장하지 않는가?
- [ ] 오해 교정: JWT는 "암호화"가 아니라 "서명(Signature)"이라는 점

**Session 10 (session10.mdx) — Docker**

- [ ] 빅 픽처: 로컬 개발 → Docker 컨테이너 → 프로덕션 레이어 구조
- [ ] 진화 흐름: 의존성 지옥 → 가상 머신 → Docker 컨테이너 (핵심)
- [ ] "왜?" — "내 컴퓨터에서는 됐는데..." 문제를 해결하는 방법
- [ ] 오해 교정: Docker는 가상 머신이 아니라 프로세스 격리

**Session 11 (session11.mdx) — AWS EC2 + Nginx**

- [ ] 빅 픽처: Cloud 배포 아키텍처 (EC2, Nginx, SSL, DNS)
- [ ] "왜?" — 왜 자체 서버(on-premise) 대신 클라우드를 사용하는가?
- [ ] "왜?" — Nginx는 왜 Node.js 앞단에 위치하는가? (Reverse Proxy)
- [ ] 오해 교정: EC2 = 단순히 "원격 컴퓨터"라는 과소평가

**Session 12 (session12.mdx) — CI/CD + Domain**

- [ ] 빅 픽처: GitHub Actions CI/CD 파이프라인 전체 흐름
- [ ] "왜?" — 왜 수동 배포 대신 CI/CD를 사용하는가?
- [ ] 맥락 연결: Session 10 (Docker)와 Session 11 (EC2)의 통합
- [ ] 오해 교정: CI와 CD는 다른 개념 (Continuous Integration vs Delivery)

---

### Optional Goal: 전체 검토 및 정렬

- [ ] 12개 세션 전체를 읽어 "연결 포인트" 콜아웃의 일관성 검토
- [ ] 빅 픽처 다이어그램 스타일 통일성 검토
- [ ] 멘토 어조 일관성 최종 검토
- [ ] MDX 파일 렌더링 오류 확인

---

## 3. 기술 접근 방식

### 3.1 편집 전략

모든 편집은 **Edit 도구**를 사용하여 **기존 내용을 보존**하는 방식으로 수행한다.

```
올바른 방식:
old_string: "## 핵심 개념\n\n### 1. Cursor / VSCode 기본 세팅"
new_string: "## 핵심 개념\n\n### 빅 픽처\n\n[새 다이어그램]\n\n### 1. Cursor / VSCode 기본 세팅"

금지 방식:
- 파일 전체를 Write로 덮어쓰기
- 기존 텍스트를 포함하지 않은 new_string 사용
```

### 3.2 빅 픽처 다이어그램 표준 형식

모든 세션의 빅 픽처 섹션은 다음 형식을 따른다:

```mdx
---

## 전체 그림에서 이번 세션의 위치

```mermaid
graph LR
    ... (세션별 맞춤 다이어그램)
```

> 이번 세션에서는 [강조 요소]를 중심으로 학습합니다. [2~3문장 설명]
```

### 3.3 "왜 필요한가?" 블록 표준 형식

```mdx
> **왜 [개념명]이 필요할까요?**
> [문제 상황 설명 — 이 개념이 없었을 때 어떤 문제가 있었는가?]
> [해결 방향 — 이 개념이 어떻게 그 문제를 해결하는가?]
```

### 3.4 맥락 연결 콜아웃 표준 형식

```mdx
> **📎 연결 포인트 — [연결 대상 세션]**
> [연결 설명 — 이 개념이 다른 세션의 어떤 개념과 연결되는가?]
```

### 3.5 오해 교정 블록 표준 형식

```mdx
> **왜 이런 실수를 하게 될까요?**
> [인지적 원인 — 왜 초보자의 뇌가 그렇게 생각하는지]
> [올바른 멘탈 모델 — 어떻게 생각해야 맞는지]
```

---

## 4. 리스크 및 대응

| 리스크 | 가능성 | 대응 방안 |
|--------|--------|-----------|
| MDX 문법 오류로 렌더링 실패 | 중간 | 각 파일 편집 후 Nextra 빌드 확인 |
| 기존 콘텐츠 실수로 삭제 | 낮음 | Edit 도구 사용 원칙 준수, diff 검토 |
| 멘토 어조가 일관되지 않음 | 중간 | 파일럿(Session 1) 패턴을 기준으로 통일 |
| 세션 간 연결 포인트 누락 | 중간 | Optional Goal 단계에서 전체 검토 |
| 추가 내용이 기존 흐름을 방해함 | 낮음 | Read-First 원칙으로 맥락 파악 후 삽입 |

---

## 5. 의존성

- **선행 완료**: SPEC-CONTENT-W1, W2, W3, W4 (12개 세션 파일 존재 확인 완료)
- **인프라**: SPEC-INFRA-001 (Nextra 프로젝트 구조, Mermaid 렌더링)
- **병렬 가능**: 서로 다른 세션 파일은 동시 편집 가능 (동일 파일 동시 편집 금지)
