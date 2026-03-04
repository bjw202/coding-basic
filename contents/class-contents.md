# 1주차 (코딩/웹 개발 기초 + 개발환경 세팅)

## 1회차: 개발환경 올인원 세팅

Cursor / VSCode 기본 세팅(Extensions, Formatter, Lint)
Warp(터미널), Opencode 개념/워크플로우
프로젝트 구조/폴더링, 환경변수(.env) 기본
실습: “Hello Fullstack” 로컬 실행 + Git 저장소 초기화

## 2회차: 프론트/백엔드 개념 + NodeJS 기초

FE/BE 역할, 렌더링 개념(SSR/CSR 맛보기)
NodeJS 런타임/모듈(CommonJS vs ESM)
실습: Node로 간단 API 서버 띄우기(Express/Fastify 중 택1)

## 3회차: HTTP/REST, JSON, CORS 핵심

HTTP 메서드/상태코드, REST 설계 감각
JSON 요청/응답, Postman/REST Client
CORS 동작 원리(Preflight) + 해결 전략
실습: 프론트 → 백엔드 호출, CORS 에러 재현/해결

# 2주차 (React/Next.js 기초 + 비동기/디버깅)

## 4회차: React 기초(상태/컴포넌트/이벤트)

컴포넌트 구조, props/state, 리스트 렌더링
실습: 대시보드 UI 1개 만들기(목록/필터/상세)

## 5회차: Next.js 기초(라우팅/서버액션/환경변수)

App Router 기준: 페이지/레이아웃/라우팅
서버/클라이언트 컴포넌트 개념, API Route
실습: Next에서 API 붙이고 화면에 출력

## 6회차: 비동기( Promise / async-await ) + 디버깅/로그

async/await 패턴, 에러 전파, 재시도 기본
디버깅 방법: 브레이크포인트, 네트워크 탭, 콘솔 로그 전략
실습: 의도적으로 에러 만들고 “원인 찾기 → 재현 → 고치기” 루틴 훈련

# 3주차 (DB/인증/AI API 연동)

## 7회차: DB 개념 + PostgreSQL / Supabase

DB 설계 기초(테이블/관계/인덱스 맛보기)
Postgres 기본 쿼리 + Supabase 연동
실습: “유저/게시글” CRUD + RLS 개념 맛보기

## 8회차: MongoDB + ElasticSearch 개요(언제 쓰나)

문서DB vs RDB 차이
검색엔진/색인 개념(ElasticSearch는 “검색/분석” 포지션)
실습(가벼운 형태): 검색/필터 요구사항을 RDB vs Mongo vs ES로 설계해보기

## 9회차: 카카오/구글 로그인(OAuth) + 세션/JWT

OAuth 흐름(Authorization Code) 이해
NextAuth(또는 직접 구현)로 처리 전략
실습: Google 로그인 붙이고, 로그인 후 보호 페이지 접근
+ 같은 회차 or 과제: 인공지능 API 호출/연동

API 키 관리, 서버에서 프록시 호출 원칙(키 노출 방지)
실습: AI API 1개 연결해서 “요약/분류/추천” 기능 추가

# 4주차 (Docker/배포/서버/보안/CI/CD/도메인)

## 10회차: Docker로 실행환경 만들기

Dockerfile, 멀티스테이지, .dockerignore
로컬에서 동일 환경 재현
실습: Next/Node를 컨테이너로 띄우고 compose까지

## 11회차: AWS EC2 배포 올코스 + SSH/Nginx

EC2 생성, 키/보안그룹, 리눅스 기본 명령/폴더 권한
SSH 접속, 프로세스 관리(pm2/systemd 중 택1)
Nginx 리버스프록시 + HTTPS(Let’s Encrypt)
S3(정적 파일), RDB(선택: RDS), IAM/권한 최소화, 기본 보안 체크리스트
실습: 실제 도메인 없이도 배포 동작 확인까지

## 12회차: GitHub Actions CI/CD + Vercel/GCP + Cloudflare 도메인

CI(build/test) → 배포(EC2 or Vercel) 전략 비교
GitHub Actions로 자동 배포 파이프라인 구성
Cloudflare DNS, SSL/TLS, 기본 보안(WAF/방화벽 룰 맛보기)
실습: main merge 시 자동 배포 + 도메인 연결 시나리오