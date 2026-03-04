---
id: SPEC-CONTENT-W3
title: "Week 3 Acceptance Criteria"
version: 1.0.0
status: draft
created: 2026-02-21
updated: 2026-02-21
author: MoAI
priority: critical
---

## 1. 인수 기준 개요

3주차 콘텐츠(7~9회차)의 완성도를 검증하기 위한 인수 기준이다. 각 시나리오는 Given-When-Then 형식으로 작성되며, 세션별 콘텐츠 완성도와 9회차의 이중 주제 처리를 중점적으로 검증한다.

---

## 2. 인수 시나리오

### Scenario 1: 7회차 DB + PostgreSQL/Supabase 콘텐츠 완성도

**Given** `content/week3/session7.mdx` 파일이 존재하고
**And** 해당 파일이 학습 목표, 핵심 개념, 다이어그램, 코드 예제, 실습, 요약의 6개 섹션을 포함하고 있을 때

**When** 핵심 개념 섹션을 검증하면

**Then** 다음 주제가 순서대로 포함되어야 한다:
  - 데이터베이스 기초 개념 (왜 필요한가)
  - 관계형 DB 설계 기초 (테이블, 관계, 인덱스 맛보기)
  - PostgreSQL 기본 SQL 쿼리 (CRUD)
  - Supabase 소개 및 연동
  - RLS(Row-Level Security) 개념

**And** 다음 3개의 Mermaid 다이어그램이 정상 렌더링되어야 한다:
  - ER Diagram: users-posts 관계 (erDiagram 형식)
  - Flowchart: SQL 쿼리 실행 흐름 (flowchart TD)
  - Diagram: Supabase 아키텍처 구조 (flowchart LR)

**And** 다음 코드 예제가 적절한 언어 식별자와 함께 포함되어야 한다:
  - `sql` 블록: CREATE TABLE (users, posts), SELECT/INSERT/UPDATE/DELETE, RLS 정책
  - `typescript` 블록: Supabase 클라이언트 초기화, CRUD 함수

**And** 실습 섹션에 유저/게시글 CRUD 실습이 단계별 지시사항과 함께 포함되어야 한다

**And** 요약 섹션에 3~5개 핵심 포인트와 8회차 미리보기가 포함되어야 한다

---

### Scenario 2: 8회차 MongoDB + ElasticSearch 콘텐츠 완성도

**Given** `content/week3/session8.mdx` 파일이 존재하고
**And** 해당 파일이 6개 섹션 템플릿을 준수할 때

**When** 핵심 개념 섹션을 검증하면

**Then** 다음 주제가 포함되어야 한다:
  - 문서 DB vs 관계형 DB 차이점 비교
  - MongoDB 핵심 개념 (Document, Collection, Query)
  - ElasticSearch의 포지셔닝 (검색/분석 엔진)
  - 검색엔진 색인(indexing) 개념
  - DB 유형별 적합한 사용 사례

**And** 다음 3개의 Mermaid 다이어그램이 정상 렌더링되어야 한다:
  - RDB vs MongoDB 데이터 모델 비교 다이어그램
  - ElasticSearch 색인 프로세스 Flowchart
  - DB 선택 의사결정 트리 Flowchart

**And** 다음 코드 예제/비교 테이블이 포함되어야 한다:
  - `javascript` 블록: MongoDB insertOne/find 기본 연산
  - SQL vs MongoDB 쿼리 비교 테이블 (Markdown 테이블 형식)
  - `json` 블록: ElasticSearch 인덱스/검색 개념 코드
  - RDB/MongoDB/ES 설계 비교 테이블

**And** 실습 섹션에 동일 요구사항을 RDB, MongoDB, ES로 설계 비교하는 실습이 포함되어야 한다

**And** 요약 섹션에 3~5개 핵심 포인트와 9회차 미리보기가 포함되어야 한다

---

### Scenario 3: 9회차 Part A - OAuth/JWT 인증 콘텐츠 완성도

**Given** `content/week3/session9.mdx` 파일이 존재하고
**And** 해당 파일이 Part A (인증)와 Part B (AI API)로 명확히 분리되어 있을 때

**When** Part A 섹션을 검증하면

**Then** 핵심 개념에 다음이 포함되어야 한다:
  - 인증(Authentication) vs 인가(Authorization) 개념 설명
  - OAuth 2.0 Authorization Code 흐름 상세 설명
  - 세션 기반 인증 vs JWT 토큰 기반 인증 비교
  - JWT 토큰 구조 (Header, Payload, Signature)
  - NextAuth.js(또는 Auth.js) 활용 구현 전략

**And** 다음 2개의 Mermaid 다이어그램이 정상 렌더링되어야 한다:
  - OAuth Authorization Code 흐름 (sequenceDiagram) - 사용자, 클라이언트, 인증서버, 리소스서버 참여자 포함
  - JWT 토큰 구조 다이어그램 - Header, Payload, Signature 3-파트 시각화

**And** 다음 코드 예제가 `typescript` 블록으로 포함되어야 한다:
  - NextAuth.js 설정 파일
  - Google OAuth Provider 구성
  - JWT 생성/검증 개념 코드
  - 보호 라우트(Protected Route) 구현

**And** 실습 A 섹션에 Google 로그인 연동 및 보호 페이지 접근 실습이 단계별로 제공되어야 한다

---

### Scenario 4: 9회차 Part B - AI API 연동 콘텐츠 완성도

**Given** `content/week3/session9.mdx`의 Part B 섹션이 Part A 이후에 시각적 구분선(---)과 함께 배치되어 있을 때

**When** Part B 섹션을 검증하면

**Then** 핵심 개념에 다음이 포함되어야 한다:
  - AI API 호출의 기본 원리 (REST API 기반)
  - API 키 관리 원칙 (환경변수, 키 노출 방지)
  - 서버 프록시 호출 패턴 (클라이언트 -> 내 서버 -> AI API)
  - 요약/분류/추천 기능의 AI 활용 사례

**And** AI API 프록시 호출 흐름 Sequence Diagram이 정상 렌더링되어야 한다:
  - 참여자: 브라우저, Next.js API Route, AI API 서버
  - API 키가 서버에서만 사용됨이 시각적으로 명확해야 한다

**And** 다음 코드 예제가 포함되어야 한다:
  - `.env.local` 환경변수 설정 예시
  - `typescript` 블록: Next.js API Route 프록시 함수
  - `typescript` 블록: AI API 호출 및 응답 처리
  - `typescript` 블록: 프론트엔드에서 프록시 API 호출

**And** 모든 AI API 호출 코드가 서버사이드(API Route)에서만 실행되어야 하며, 클라이언트 사이드에서 AI API를 직접 호출하는 코드가 없어야 한다

**And** 실습 B 섹션에 AI API를 연결하여 요약/분류/추천 중 1개 기능을 구현하는 실습이 제공되어야 한다

---

### Scenario 5: 9회차 이중 주제 구조 및 학습 흐름

**Given** `content/week3/session9.mdx` 파일이 부트캠프에서 가장 콘텐츠가 많은 세션일 때

**When** 전체 파일 구조를 검증하면

**Then** 다음 구조가 유지되어야 한다:
  - 학습 목표: Part A + Part B 통합 (5~6개 불릿 포인트)
  - Part A: 인증 (OAuth/JWT) - 핵심 개념, 다이어그램, 코드 예제, 실습
  - 구분선(---) + Part A 중간 요약 (3줄 이내)
  - Part B: AI API 연동 - 핵심 개념, 다이어그램, 코드 예제, 실습
  - 통합 요약: Part A + Part B 핵심 포인트 + 4주차 미리보기

**And** Part A와 Part B 사이에 시각적 구분선(---)이 존재해야 한다

**And** 통합 요약에 Part A와 Part B의 핵심 내용이 각각 포함되어야 한다

---

### Scenario 6: 3주차 공통 품질 기준 충족

**Given** `content/week3/session7.mdx`, `session8.mdx`, `session9.mdx` 3개 파일 모두가 존재할 때

**When** 3주차 전체 콘텐츠의 품질을 검증하면

**Then** 모든 세션이 한국어로 작성되되, 기술 용어(PostgreSQL, MongoDB, ElasticSearch, OAuth, JWT, API 등)는 영문 원문을 유지해야 한다

**And** 모든 Mermaid 다이어그램(총 8~9개)이 Nextra 내장 렌더링으로 정상 표시되어야 하며, 다이어그램 노드 텍스트는 한국어로 작성되어야 한다

**And** 모든 코드 예제가 적절한 언어 식별자(sql, javascript, typescript, json 등)와 함께 구문 강조 코드 블록을 사용해야 한다

**And** 각 세션의 요약에 3~5개 핵심 포인트와 다음 회차 미리보기가 포함되어야 한다

**And** `npm run build` 실행 시 session7~9.mdx에서 빌드 에러가 발생하지 않아야 한다

---

## 3. 품질 게이트

### Definition of Done

| 항목 | 기준 |
|------|------|
| 파일 존재 | session7.mdx, session8.mdx, session9.mdx 3개 파일 모두 존재 |
| 템플릿 준수 | 모든 세션이 6개 섹션 템플릿 준수 |
| Mermaid 렌더링 | 8~9개 다이어그램 모두 정상 렌더링 (npm run dev로 확인) |
| 코드 구문 강조 | 모든 코드 블록에 언어 식별자 존재 |
| 한국어 작성 | 본문 한국어, 기술 용어 영문 유지 |
| 빌드 성공 | npm run build 에러 없이 완료 |
| 9회차 구조 | Part A/B 분리, 구분선, 중간 요약 존재 |

### 검증 방법

| 방법 | 대상 | 검증 내용 |
|------|------|-----------|
| 빌드 테스트 | 전체 | `npm run build` 성공 여부 |
| 브라우저 확인 | 다이어그램 | `npm run dev`로 Mermaid 렌더링 확인 |
| 수동 리뷰 | 콘텐츠 | 6개 섹션 존재, 한국어 작성, 기술 정확성 |
| 구조 검증 | 9회차 | Part A/B 분리, 구분선, 통합 요약 확인 |
| Grep 검증 | 코드 블록 | 코드 펜스에 언어 식별자 존재 확인 |
