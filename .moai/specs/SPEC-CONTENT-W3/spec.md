---
id: SPEC-CONTENT-W3
title: "Week 3 Content: Database, Auth, and AI (Sessions 7-9)"
version: 1.0.0
status: implemented
created: 2026-02-21
updated: 2026-02-21
author: MoAI
priority: critical
tags: [content, week3, database, postgresql, supabase, mongodb, elasticsearch, oauth, jwt, ai-api]
---

## HISTORY

| 버전 | 날짜 | 작성자 | 변경 내용 |
|------|------|--------|-----------|
| 1.0.0 | 2026-02-21 | MoAI | 초기 SPEC 작성 |

---

## 1. 개요

3주차 콘텐츠(7~9회차)를 위한 MDX 페이지를 작성한다. 3주차는 부트캠프 전체에서 **가장 높은 복잡도**를 가지며, 데이터베이스(RDB/NoSQL), 인증(OAuth/JWT), AI API 연동이라는 근본적으로 다른 3개 기술 도메인을 다룬다. 특히 9회차는 OAuth + AI API라는 2개의 대형 주제를 포함하므로 콘텐츠 깊이 조절이 핵심이다.

### 대상 파일

| 파일 | 내용 |
|------|------|
| `content/week3/session7.mdx` | DB 개념 + PostgreSQL / Supabase |
| `content/week3/session8.mdx` | MongoDB + ElasticSearch 개요 |
| `content/week3/session9.mdx` | OAuth/JWT + AI API 연동 |

### 콘텐츠 템플릿 (전 회차 공통)

모든 세션 MDX 파일은 다음 6개 섹션을 포함해야 한다:

1. 학습 목표 (Learning Objectives)
2. 핵심 개념 (Core Concepts)
3. 다이어그램 (Mermaid Diagrams) - 세션당 2~3개
4. 코드 예제 (Code Examples)
5. 실습 (Exercises)
6. 요약 (Summary)

## 2. 환경 (Environment)

### 2.1 기술 스택

SPEC-INFRA-001에 정의된 인프라 위에서 콘텐츠를 작성한다.

| 기술 | 용도 (콘텐츠 관점) |
|------|---------------------|
| MDX | 세션 콘텐츠 작성 포맷 |
| Mermaid | ER 다이어그램, Flowchart, Sequence Diagram 렌더링 |
| Nextra 4.x | MDX 렌더링 및 코드 블록 구문 강조 |

### 2.2 콘텐츠에서 다루는 기술 (학습 대상)

| 기술 | 세션 | 학습 범위 |
|------|------|-----------|
| PostgreSQL | 7회차 | 테이블 설계, 기본 SQL 쿼리 (CRUD) |
| Supabase | 7회차 | 클라이언트 초기화, CRUD 함수, RLS 개념 |
| MongoDB | 8회차 | 문서 DB 개념, 기본 CRUD 연산 |
| ElasticSearch | 8회차 | 검색엔진/색인 개념 (포지션 이해 수준) |
| OAuth 2.0 | 9회차 | Authorization Code 흐름 |
| NextAuth.js | 9회차 | Google OAuth 연동, 보호 라우트 |
| JWT | 9회차 | 토큰 구조, 생성/검증 개념 |
| AI API | 9회차 | 서버 프록시 호출, 환경변수 키 관리 |

## 3. 가정 (Assumptions)

- A1: 독자는 1~2주차(HTML/CSS/JS, React, Next.js, 비동기 프로그래밍)를 학습한 상태이다.
- A2: 코드 예제는 학습용으로 단순화하며, 프로덕션 수준의 보안/에러 처리는 범위 밖이다.
- A3: Supabase 무료 티어를 기준으로 실습을 설계한다.
- A4: ElasticSearch는 개념 이해 수준이며 직접 설치/운영 실습은 포함하지 않는다.
- A5: AI API 실습은 특정 벤더(OpenAI 등)에 종속되지 않는 일반적인 패턴으로 작성한다.
- A6: 9회차는 두 주제(OAuth + AI API)를 명확히 분리된 섹션으로 구성하여 학습 부담을 관리한다.
- A7: Mermaid 다이어그램은 Nextra 내장 렌더링을 사용하며, 별도의 이미지 파일을 생성하지 않는다.

## 4. 요구사항 (Requirements)

### 모듈 R1: 7회차 - DB 개념 + PostgreSQL / Supabase

**R1.1 [Ubiquitous]**
session7.mdx는 **항상** 학습 목표, 핵심 개념, 다이어그램, 코드 예제, 실습, 요약의 6개 섹션을 포함해야 한다.

**R1.2 [Ubiquitous]**
핵심 개념 섹션은 **항상** 다음 주제를 순서대로 다뤄야 한다: (1) 데이터베이스란 무엇인가, (2) 관계형 DB 설계 기초 (테이블, 관계, 인덱스 개념), (3) PostgreSQL 기본 SQL 쿼리, (4) Supabase 소개 및 연동, (5) RLS(Row-Level Security) 개념 맛보기.

**R1.3 [Ubiquitous]**
다이어그램 섹션은 **항상** 다음 3개의 Mermaid 다이어그램을 포함해야 한다: (1) ER Diagram - 유저-게시글 관계, (2) Flowchart - SQL 쿼리 실행 흐름, (3) Diagram - Supabase 아키텍처 구조.

**R1.4 [Ubiquitous]**
코드 예제 섹션은 **항상** 다음을 포함해야 한다: (1) CREATE TABLE 문 (users, posts 테이블), (2) SELECT/INSERT/UPDATE/DELETE 쿼리, (3) Supabase 클라이언트 초기화 코드, (4) Supabase CRUD 함수 예제, (5) RLS 정책 SQL 예시.

**R1.5 [Ubiquitous]**
실습 섹션은 **항상** "유저/게시글" CRUD 실습을 포함하되, 단계별 지시사항과 예상 결과를 명시해야 한다.

### 모듈 R2: 8회차 - MongoDB + ElasticSearch 개요

**R2.1 [Ubiquitous]**
session8.mdx는 **항상** 6개 섹션 템플릿을 준수해야 한다.

**R2.2 [Ubiquitous]**
핵심 개념 섹션은 **항상** 다음 주제를 다뤄야 한다: (1) 문서 DB vs 관계형 DB 차이점 비교, (2) MongoDB 핵심 개념 (Document, Collection, Query), (3) ElasticSearch의 포지셔닝 (검색/분석 엔진), (4) 검색엔진 색인(indexing) 개념, (5) DB 유형별 적합한 사용 사례.

**R2.3 [Ubiquitous]**
다이어그램 섹션은 **항상** 다음 3개의 Mermaid 다이어그램을 포함해야 한다: (1) RDB vs MongoDB 데이터 모델 비교 다이어그램, (2) ElasticSearch 색인 프로세스 Flowchart, (3) DB 선택 의사결정 트리 Flowchart.

**R2.4 [Ubiquitous]**
코드 예제 섹션은 **항상** 다음을 포함해야 한다: (1) MongoDB insertOne/find 기본 연산, (2) SQL vs MongoDB 쿼리 비교 테이블, (3) ElasticSearch 인덱스/검색 개념 코드 (의사코드 수준), (4) RDB/MongoDB/ES 설계 비교 테이블.

**R2.5 [Event-Driven]**
**WHEN** 실습 섹션에 도달하면 **THEN** 학습자가 동일한 데이터 요구사항을 RDB, MongoDB, ElasticSearch 각각으로 설계해보는 비교 실습을 제공해야 한다.

### 모듈 R3: 9회차 Part A - OAuth + 세션/JWT

**R3.1 [Ubiquitous]**
session9.mdx는 **항상** 6개 섹션 템플릿을 준수하되, 핵심 개념과 코드 예제를 "Part A: 인증 (OAuth/JWT)"와 "Part B: AI API 연동"으로 명확히 분리해야 한다.

**R3.2 [Ubiquitous]**
Part A 핵심 개념은 **항상** 다음을 다뤄야 한다: (1) 인증 vs 인가 개념, (2) OAuth 2.0 Authorization Code 흐름, (3) 세션 기반 인증 vs JWT 토큰 기반 인증 비교, (4) JWT 토큰 구조 (Header, Payload, Signature), (5) NextAuth.js(또는 Auth.js)를 활용한 구현 전략.

**R3.3 [Ubiquitous]**
Part A 다이어그램은 **항상** 다음을 포함해야 한다: (1) OAuth Authorization Code 흐름 Sequence Diagram, (2) JWT 토큰 구조 다이어그램.

**R3.4 [Ubiquitous]**
Part A 코드 예제는 **항상** 다음을 포함해야 한다: (1) NextAuth.js 설정 파일, (2) Google OAuth Provider 구성, (3) JWT 생성/검증 개념 코드, (4) 보호 라우트(Protected Route) 구현 예제.

**R3.5 [Event-Driven]**
**WHEN** Part A 실습 섹션에 도달하면 **THEN** Google 로그인을 연동하고, 로그인 후 보호 페이지에 접근하는 실습을 단계별로 제공해야 한다.

### 모듈 R4: 9회차 Part B - AI API 연동

**R4.1 [Ubiquitous]**
Part B 핵심 개념은 **항상** 다음을 다뤄야 한다: (1) AI API 호출의 기본 원리, (2) API 키 관리 원칙 (환경변수, 키 노출 방지), (3) 서버 프록시 호출 패턴 (클라이언트 -> 내 서버 -> AI API), (4) 요약/분류/추천 기능의 AI 활용 사례.

**R4.2 [Ubiquitous]**
Part B 다이어그램은 **항상** AI API 프록시 호출 흐름 Sequence Diagram을 포함해야 한다.

**R4.3 [Ubiquitous]**
Part B 코드 예제는 **항상** 다음을 포함해야 한다: (1) 환경변수 키 관리 (.env 설정), (2) Next.js API Route를 활용한 서버 프록시 함수, (3) AI API 호출 및 응답 처리 코드, (4) 프론트엔드에서 프록시 API 호출 예제.

**R4.4 [Event-Driven]**
**WHEN** Part B 실습 섹션에 도달하면 **THEN** AI API 1개를 연결하여 "요약" 또는 "분류" 또는 "추천" 기능 중 하나를 구현하는 실습을 제공해야 한다.

**R4.5 [Unwanted]**
Part B 코드 예제는 특정 AI 벤더의 SDK에 직접 의존하는 클라이언트 사이드 코드를 **포함하지 않아야 한다** (API 키 노출 방지 원칙).

### 모듈 R5: 3주차 공통 품질 기준

**R5.1 [Ubiquitous]**
모든 세션 파일(session7~9.mdx)은 **항상** 한국어로 작성하되, 기술 용어(PostgreSQL, MongoDB, OAuth, JWT 등)는 영문 원문을 유지해야 한다.

**R5.2 [Ubiquitous]**
모든 Mermaid 다이어그램(총 8~9개)은 **항상** Nextra 내장 렌더링으로 정상 표시되어야 하며, 다이어그램 노드 텍스트는 한국어로 작성해야 한다.

**R5.3 [Ubiquitous]**
모든 코드 예제는 **항상** 적절한 언어 식별자(sql, javascript, typescript, json 등)가 포함된 구문 강조 코드 블록을 사용해야 한다.

**R5.4 [Ubiquitous]**
각 세션의 요약 섹션은 **항상** 핵심 학습 내용을 3~5개 불릿 포인트로 정리하고, 다음 회차 미리보기를 포함해야 한다.

**R5.5 [State-Driven]**
**IF** 9회차 콘텐츠의 전체 길이가 다른 세션 대비 현저히 길어지면 **THEN** Part A와 Part B 사이에 시각적 구분선(---) 및 중간 요약을 삽입하여 학습 흐름을 분절해야 한다.

## 5. 명세 (Specifications)

### 5.1 Mermaid 다이어그램 명세

| 세션 | 다이어그램 | 유형 | 주요 노드/관계 |
|------|------------|------|----------------|
| 7회차 | 유저-게시글 ER | erDiagram | users(id, name, email) -- posts(id, title, content, user_id) |
| 7회차 | SQL 쿼리 실행 흐름 | flowchart TD | 클라이언트 -> SQL 파서 -> 옵티마이저 -> 실행 엔진 -> 결과 반환 |
| 7회차 | Supabase 아키텍처 | flowchart LR | 클라이언트 SDK -> API Gateway -> PostgreSQL, Auth, Storage, Realtime |
| 8회차 | RDB vs MongoDB 비교 | flowchart LR | 테이블/행/열 vs 컬렉션/문서/필드 대비 구조 |
| 8회차 | ES 색인 프로세스 | flowchart TD | 문서 입력 -> 분석기(토크나이저) -> 역색인 생성 -> 검색 쿼리 매칭 |
| 8회차 | DB 선택 의사결정 트리 | flowchart TD | 데이터 구조화? -> 관계 복잡? -> 전문 검색? 분기 |
| 9회차 | OAuth 흐름 | sequenceDiagram | 사용자, 클라이언트, 인증서버, 리소스서버 간 Authorization Code 교환 |
| 9회차 | JWT 구조 | flowchart LR | Header(alg, typ) + Payload(sub, name, iat) + Signature 구조 |
| 9회차 | AI API 프록시 | sequenceDiagram | 브라우저 -> Next.js API Route -> AI API -> 응답 역순 |

### 5.2 코드 예제 언어 및 범위

| 세션 | 언어 | 예제 범위 |
|------|------|-----------|
| 7회차 | SQL | CREATE TABLE, SELECT, INSERT, UPDATE, DELETE |
| 7회차 | TypeScript | Supabase 클라이언트 초기화, CRUD 함수 |
| 7회차 | SQL | RLS 정책 (CREATE POLICY) |
| 8회차 | JavaScript | MongoDB insertOne, find, 쿼리 패턴 |
| 8회차 | JSON | ElasticSearch 인덱스/검색 요청 구조 |
| 9회차 | TypeScript | NextAuth.js 설정, Google OAuth Provider |
| 9회차 | TypeScript | JWT 개념 코드, 보호 라우트 |
| 9회차 | TypeScript | .env 설정, API Route 프록시, AI API 호출 |

### 5.3 9회차 콘텐츠 구조 (이중 주제)

```
session9.mdx
├── 학습 목표 (Part A + Part B 통합)
├── Part A: 인증 (OAuth/JWT)
│   ├── 핵심 개념 A
│   ├── 다이어그램 A (OAuth 흐름, JWT 구조)
│   ├── 코드 예제 A (NextAuth, Google OAuth, JWT, 보호 라우트)
│   └── 실습 A (Google 로그인 연동)
├── --- (시각적 구분선 + 중간 요약)
├── Part B: AI API 연동
│   ├── 핵심 개념 B
│   ├── 다이어그램 B (프록시 호출 흐름)
│   ├── 코드 예제 B (환경변수, 프록시, AI API 호출)
│   └── 실습 B (AI 요약/분류/추천 기능)
└── 요약 (Part A + Part B 통합)
```

## 6. 추적성 (Traceability)

| 요구사항 | 관련 파일 | 검증 방법 |
|----------|-----------|-----------|
| R1.1-R1.5 | content/week3/session7.mdx | 6개 섹션 존재, ER/Flowchart 렌더링, SQL+TS 코드 블록 검증 |
| R2.1-R2.5 | content/week3/session8.mdx | 6개 섹션 존재, 비교 다이어그램 렌더링, 설계 비교 실습 검증 |
| R3.1-R3.5 | content/week3/session9.mdx (Part A) | Part A/B 분리 구조, OAuth Sequence Diagram, NextAuth 코드 검증 |
| R4.1-R4.5 | content/week3/session9.mdx (Part B) | 프록시 Sequence Diagram, 서버사이드 전용 코드, 클라이언트 API 키 미노출 |
| R5.1-R5.5 | session7~9.mdx 전체 | 한국어 작성, Mermaid 렌더링, 구문 강조, 요약 불릿 포인트 |
