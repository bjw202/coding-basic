---
id: SPEC-CONTENT-W3
title: "Week 3 Implementation Plan"
version: 1.0.0
status: draft
created: 2026-02-21
updated: 2026-02-21
author: MoAI
priority: critical
---

## 1. 구현 전략 개요

3주차는 부트캠프에서 **가장 높은 복잡도**를 가진 주차이다. 세 회차가 각각 근본적으로 다른 기술 도메인(RDB, NoSQL, 인증/AI)을 다루며, 특히 9회차는 두 개의 대형 주제를 포함한다.

### 핵심 도전 과제

| 도전 과제 | 대응 전략 |
|-----------|-----------|
| 3개 기술 도메인의 이질성 | 각 세션을 독립적으로 구현하되, DB 관련 7-8회차는 연속성 유지 |
| 9회차 이중 주제 (OAuth + AI API) | Part A / Part B 명확 분리, 중간 요약 삽입 |
| 토큰 소비 위험 (최고 복잡도 주) | 코드 예제 길이 제한, 개념 설명 깊이 조절 |
| 다이어그램 밀도 (총 8~9개) | Mermaid 구문 사전 설계로 렌더링 오류 최소화 |

## 2. 마일스톤

### Primary Goal: Session 7 (DB + PostgreSQL/Supabase)

구현 순서와 근거:

1. **DB 기초 개념 작성** - 데이터베이스란 무엇인가, 왜 필요한가
2. **관계형 DB 설계 기초** - 테이블, 관계(1:N), 인덱스 맛보기
3. **ER Diagram 작성** - users/posts 관계를 Mermaid erDiagram으로 시각화
4. **PostgreSQL SQL 쿼리** - CREATE TABLE, CRUD 쿼리 예제
5. **SQL 쿼리 실행 흐름 Flowchart** - 클라이언트 -> 파서 -> 옵티마이저 -> 실행 -> 결과
6. **Supabase 소개 및 아키텍처 Diagram** - BaaS 개념, 아키텍처 구조
7. **Supabase 연동 코드** - 클라이언트 초기화, CRUD 함수
8. **RLS 개념 및 정책 예시** - Row-Level Security 맛보기
9. **실습 작성** - 유저/게시글 CRUD 단계별 실습
10. **요약 작성** - 핵심 포인트 + 8회차 미리보기

#### 콘텐츠 깊이 조절

| 주제 | 깊이 | 근거 |
|------|------|------|
| DB 기초 개념 | 중간 | 처음 접하는 개념이므로 충분한 비유와 설명 |
| 테이블/관계/인덱스 | 기본 | 인덱스는 "존재와 목적" 수준만, 성능 튜닝 제외 |
| PostgreSQL SQL | 중간 | CRUD 4개 연산에 집중, JOIN은 간단한 예시만 |
| Supabase 연동 | 중간 | 초기화 + CRUD에 집중, Edge Functions 등 고급 기능 제외 |
| RLS | 맛보기 | 개념 + SQL 예시 1개, 실제 적용은 범위 밖 |

#### Mermaid 다이어그램 상세 설계

**Diagram 1: ER Diagram (유저-게시글 관계)**
```
erDiagram
    USERS {
        int id PK
        string name
        string email
        timestamp created_at
    }
    POSTS {
        int id PK
        string title
        text content
        int user_id FK
        timestamp created_at
    }
    USERS ||--o{ POSTS : "작성"
```

**Diagram 2: SQL 쿼리 실행 흐름 (Flowchart)**
- 노드: 클라이언트(SQL 입력) -> SQL 파서 -> 쿼리 옵티마이저 -> 실행 엔진 -> 결과 반환
- 방향: Top-Down (TD)

**Diagram 3: Supabase 아키텍처 (Flowchart)**
- 노드: 클라이언트 SDK -> API Gateway -> (PostgreSQL, Auth, Storage, Realtime) 병렬 구조
- 방향: Left-Right (LR)

#### 코드 예제 범위

| 예제 | 언어 | 예상 라인 수 |
|------|------|-------------|
| CREATE TABLE (users, posts) | SQL | 15-20 |
| SELECT/INSERT/UPDATE/DELETE | SQL | 20-25 |
| Supabase 클라이언트 초기화 | TypeScript | 8-12 |
| Supabase CRUD 함수 | TypeScript | 25-35 |
| RLS 정책 예시 | SQL | 8-12 |

---

### Secondary Goal: Session 8 (MongoDB + ElasticSearch)

구현 순서:

1. **문서 DB vs RDB 비교** - 핵심 차이점을 대비 구조로 설명
2. **RDB vs MongoDB 비교 Diagram** - 테이블/행/열 vs 컬렉션/문서/필드
3. **MongoDB 핵심 개념** - Document, Collection, 스키마리스 특성
4. **MongoDB 기본 연산 코드** - insertOne, find, 쿼리 패턴
5. **SQL vs MongoDB 쿼리 비교 테이블** - 동일 작업을 두 문법으로 비교
6. **ElasticSearch 포지셔닝** - "DB가 아닌 검색/분석 엔진"으로서의 역할
7. **ES 색인 프로세스 Flowchart** - 문서 -> 분석기 -> 역색인 -> 검색
8. **ES 개념 코드** - 인덱스 생성, 문서 색인, 검색 요청 (의사코드/JSON)
9. **DB 선택 의사결정 트리 Flowchart** - 데이터 구조화 여부, 관계 복잡도, 검색 요구사항 분기
10. **비교 설계 실습** - 동일 요구사항을 RDB/MongoDB/ES로 설계
11. **요약** - 핵심 포인트 + 9회차 미리보기

#### 콘텐츠 깊이 조절

| 주제 | 깊이 | 근거 |
|------|------|------|
| RDB vs NoSQL 비교 | 중간 | 7회차 RDB 지식을 활용한 대비 학습 |
| MongoDB 기본 연산 | 기본~중간 | CRUD 수준, Aggregation Pipeline 제외 |
| ElasticSearch | 개념만 | 설치/운영 없이 "언제 왜 쓰는가" 포지셔닝 |
| DB 선택 가이드 | 중간 | 의사결정 트리로 실용적 판단 기준 제공 |

#### Mermaid 다이어그램 상세 설계

**Diagram 4: RDB vs MongoDB 데이터 모델 비교**
- 좌: Database -> Table -> Row -> Column 계층
- 우: Database -> Collection -> Document -> Field 계층
- 방향: Left-Right (LR), 대비 구조

**Diagram 5: ElasticSearch 색인 프로세스**
- 노드: 원본 문서 -> 분석기(토크나이저) -> 역색인(Inverted Index) 생성 -> 검색 쿼리 매칭 -> 결과 반환
- 방향: Top-Down (TD)

**Diagram 6: DB 선택 의사결정 트리**
- 분기: 데이터 구조화됨? -> (Y) 관계 복잡? -> (Y) RDB / (N) 둘 다 가능
- 분기: 데이터 구조화됨? -> (N) 유연한 스키마 필요? -> (Y) MongoDB
- 분기: 전문 검색/분석? -> (Y) ElasticSearch (+ 주 DB와 병행)
- 방향: Top-Down (TD)

#### 코드 예제 범위

| 예제 | 언어 | 예상 라인 수 |
|------|------|-------------|
| MongoDB insertOne/find | JavaScript | 15-20 |
| SQL vs MongoDB 쿼리 비교 | SQL + JS | 비교 테이블 형식 |
| ES 인덱스/검색 개념 | JSON | 15-20 |
| 설계 비교 테이블 | Markdown 테이블 | 비교 표 형식 |

---

### Tertiary Goal: Session 9 Part A (OAuth + JWT)

**9회차 토큰 관리 전략**: 9회차는 부트캠프에서 가장 콘텐츠가 많은 세션이다. Part A와 Part B를 명확히 분리하고, 각 Part의 코드 예제 길이를 엄격히 제한한다.

구현 순서:

1. **학습 목표** - Part A + Part B 통합 목표 (5~6개 불릿)
2. **인증 vs 인가 개념** - Authentication과 Authorization의 차이
3. **OAuth 2.0 흐름** - Authorization Code 방식 상세 설명
4. **OAuth Sequence Diagram** - 사용자/클라이언트/인증서버/리소스서버 간 흐름
5. **세션 vs JWT 비교** - 서버 세션 방식과 토큰 방식의 장단점
6. **JWT 구조 Diagram** - Header.Payload.Signature 시각화
7. **NextAuth.js 설정 코드** - 기본 설정 + Google Provider
8. **보호 라우트 코드** - 미들웨어 또는 getServerSession 활용
9. **실습 A** - Google 로그인 연동 + 보호 페이지 접근 단계별 가이드
10. **중간 요약 + 구분선** - Part A 핵심 정리

#### Mermaid 다이어그램 상세 설계

**Diagram 7: OAuth Authorization Code 흐름 (Sequence Diagram)**
- 참여자: 사용자(브라우저), 클라이언트(Next.js), 인증서버(Google), 리소스서버
- 흐름: 로그인 요청 -> 인증 페이지 리다이렉트 -> 사용자 동의 -> Authorization Code 반환 -> Code로 Token 교환 -> 리소스 접근
- 유형: sequenceDiagram

**Diagram 8: JWT 토큰 구조**
- 구성: Header(alg: HS256, typ: JWT) + Payload(sub, name, iat, exp) + Signature(HMAC)
- 방향: Left-Right (LR), 3-파트 시각화

#### 코드 예제 범위

| 예제 | 언어 | 예상 라인 수 |
|------|------|-------------|
| NextAuth.js 설정 | TypeScript | 20-30 |
| Google OAuth Provider | TypeScript | 10-15 |
| JWT 생성/검증 개념 | TypeScript | 15-20 |
| 보호 라우트 | TypeScript | 15-20 |

---

### Final Goal: Session 9 Part B (AI API)

구현 순서:

1. **AI API 호출 기본 원리** - REST API로서의 AI 서비스
2. **API 키 관리 원칙** - 환경변수, .env 파일, 키 노출 방지
3. **서버 프록시 호출 패턴** - 왜 서버를 거쳐야 하는가
4. **AI API 프록시 Sequence Diagram** - 브라우저 -> API Route -> AI API
5. **환경변수 설정 코드** - .env.local 예시
6. **API Route 프록시 코드** - Next.js Route Handler에서 AI API 호출
7. **프론트엔드 호출 코드** - 내 서버 API 호출 (AI API 직접 호출 X)
8. **AI 활용 사례** - 요약/분류/추천 기능 개요
9. **실습 B** - AI API 연결하여 요약/분류/추천 중 1개 구현
10. **통합 요약** - Part A + Part B 핵심 포인트 + 4주차 미리보기

#### Mermaid 다이어그램 상세 설계

**Diagram 9: AI API 프록시 호출 흐름 (Sequence Diagram)**
- 참여자: 브라우저, Next.js API Route, AI API 서버
- 흐름: 사용자 입력 -> API Route 요청 -> 서버에서 API 키 포함 AI API 호출 -> 응답 가공 -> 클라이언트 반환
- 핵심 포인트: API 키가 서버에서만 사용됨을 강조

#### 코드 예제 범위

| 예제 | 언어 | 예상 라인 수 |
|------|------|-------------|
| .env.local 설정 | dotenv | 3-5 |
| API Route 프록시 | TypeScript | 25-35 |
| 프론트엔드 호출 | TypeScript | 15-20 |
| AI API 응답 처리 | TypeScript | 10-15 |

---

## 3. 기술적 접근

### 3.1 콘텐츠 작성 원칙

- **한국어 우선**: 모든 설명은 한국어로 작성하되, 기술 용어는 영문 유지
- **비유 활용**: 주니어 개발자를 위해 일상 비유로 개념 도입 (예: DB = 체계적 서류 캐비닛)
- **점진적 복잡도**: 각 세션 내에서 기초 -> 중간 -> 응용 순서로 전개
- **실습 중심**: 모든 코드 예제는 실습에서 직접 사용 가능한 수준

### 3.2 9회차 토큰 관리 전략

9회차는 두 개의 대형 주제를 다루므로 다음 전략으로 토큰 소비를 관리한다:

| 전략 | 세부 내용 |
|------|-----------|
| Part 분리 | Part A (OAuth/JWT)와 Part B (AI API)를 독립 섹션으로 분리 |
| 코드 길이 제한 | Part A 코드: 최대 80라인, Part B 코드: 최대 75라인 |
| 개념 설명 압축 | 동일 패턴 반복 시 "위와 동일한 방식으로" 참조 |
| 다이어그램 효율 | Sequence Diagram으로 복잡한 흐름을 텍스트 대신 시각화 |
| 중간 요약 삽입 | Part A 완료 후 3줄 요약으로 인지 부하 리셋 |

### 3.3 세션 간 연결성

| 연결 | 설명 |
|------|------|
| 7회차 -> 8회차 | RDB 지식을 기반으로 NoSQL 대비 학습 |
| 7회차 -> 9회차 | Supabase 인증 기능을 OAuth 학습의 도입부로 활용 |
| 8회차 -> 9회차 | DB 선택 -> 실제 서비스 구축 (인증 + AI)으로 확장 |
| 2주차 -> 3주차 | Next.js API Route, React 컴포넌트 지식을 전제 |

## 4. 리스크 및 대응

| 리스크 | 가능성 | 영향 | 대응 |
|--------|--------|------|------|
| 9회차 콘텐츠 과다 | 높음 | 학습 부담 증가 | Part A/B 분리, 코드 길이 제한, 중간 요약 |
| Mermaid 렌더링 오류 | 중간 | 다이어그램 미표시 | 사전 구문 검증, 복잡도 최소화 |
| AI API 벤더 종속 | 중간 | 특정 서비스 필수 의존 | 일반적 REST 패턴으로 작성, 벤더 추상화 |
| ElasticSearch 깊이 조절 | 낮음 | 범위 초과 | "개념 이해" 수준 명확히 한정 |
| 코드 예제 동작 불가 | 중간 | 학습자 혼란 | Supabase 무료 티어 기준 검증, 환경 설정 가이드 포함 |

## 5. 전문가 상담 권장사항

| 도메인 | 에이전트 | 상담 사유 |
|--------|----------|-----------|
| Backend | expert-backend | DB 설계, SQL 쿼리, API Route, OAuth 구현 패턴 검토 |
| Frontend | expert-frontend | 보호 라우트 UI, AI API 응답 렌더링 패턴 |
| Security | expert-security | OAuth 흐름 정확성, API 키 관리 모범 사례, JWT 보안 |
