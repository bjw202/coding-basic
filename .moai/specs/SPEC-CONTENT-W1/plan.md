---
spec-id: SPEC-CONTENT-W1
version: "1.0.0"
---

# SPEC-CONTENT-W1 Implementation Plan

## 구현 전략

### 접근 방식

각 세션 MDX 파일을 순차적으로 생성하되, 세션 간 연결성(이전 세션 참조, 다음 세션 미리보기)을 보장한다. 콘텐츠는 6개 템플릿 섹션 구조를 일관되게 따르며, 초보자 친화적 어조로 작성한다.

### 파일 생성 순서

1. `content/week1/session1.mdx` - 개발환경 올인원 세팅
2. `content/week1/session2.mdx` - 프론트/백엔드 개념 + Node.js 기초
3. `content/week1/session3.mdx` - HTTP/REST, JSON, CORS 핵심

순차 생성 이유: Session 2는 Session 1에서 설정한 환경을 전제하고, Session 3은 Session 2에서 만든 서버를 기반으로 실습을 진행하기 때문이다.

---

## Milestone 1: Session 1 - 개발환경 올인원 세팅 (Primary Goal)

### 파일: `content/week1/session1.mdx`

#### 1. 학습 목표

- 개발에 필요한 도구(IDE, 터미널, Git)의 역할을 이해한다
- Cursor / VS Code를 설치하고 기본 설정을 구성한다
- 터미널의 기본 명령어를 사용할 수 있다
- Git 저장소를 초기화하고 첫 커밋을 만들 수 있다
- 프로젝트 폴더 구조와 환경변수의 개념을 이해한다

#### 2. 핵심 개념 소주제

- **2.1 IDE 세팅**: Cursor / VS Code 설치, 필수 Extensions (Prettier, ESLint, Live Server), Formatter/Lint 설정
- **2.2 터미널 기초**: Warp(터미널) 소개, 기본 명령어 (cd, ls, mkdir, touch, rm), Opencode 개념/워크플로우
- **2.3 프로젝트 구조**: 폴더링 컨벤션, package.json의 역할, node_modules 이해
- **2.4 환경변수**: .env 파일의 목적, .gitignore에 .env 추가 이유, 보안 관점 설명
- **2.5 Git 기초**: Git의 역할, init/add/commit/push 기본 흐름, GitHub 연동 개요

#### 3. Mermaid 다이어그램 상세

**다이어그램 1: 개발환경 구성도 (flowchart TD)**
- 최상위: "개발자 (Developer)"
- 2단: IDE (Cursor/VS Code), Terminal (Warp), Version Control (Git)
- 3단: Extensions, CLI Commands, GitHub
- 각 노드 간 화살표로 워크플로우 연결

**다이어그램 2: Git 기본 워크플로우 (flowchart LR)**
- Working Directory --> Staging Area --> Local Repository --> Remote Repository
- 각 단계에 git add, git commit, git push 명령어 표시

#### 4. 코드 예제 상세

| 번호 | 파일/명령 | 언어 | 내용 |
|------|-----------|------|------|
| 1 | settings.json | json | VS Code 기본 설정 (formatter, tabSize, autoSave) |
| 2 | .gitignore | text | node_modules, .env, .next 등 무시 패턴 |
| 3 | npm init | bash | package.json 초기화 명령 및 결과 |
| 4 | .env | text | 기본 환경변수 구조 (PORT, DATABASE_URL 예시) |

#### 5. 실습 상세

**실습 1 (기본): "Hello Fullstack" 프로젝트 생성**
- 프로젝트 폴더 생성
- npm init -y 실행
- index.js에 console.log("Hello Fullstack!") 작성
- node index.js로 실행 확인

**실습 2 (도전): Git 저장소 초기화 및 첫 커밋**
- git init
- .gitignore 생성
- git add / git commit
- (선택) GitHub 원격 저장소 연결

#### 6. 요약

- 개발환경 3요소 (IDE, Terminal, Git) 정리
- 다음 세션 미리보기: "프론트엔드와 백엔드의 개념을 배우고, Node.js로 첫 서버를 만들어 봅니다"

---

## Milestone 2: Session 2 - 프론트/백엔드 개념 + Node.js 기초 (Primary Goal)

### 파일: `content/week1/session2.mdx`

#### 1. 학습 목표

- 프론트엔드와 백엔드의 역할과 차이를 이해한다
- SSR과 CSR의 기본 개념을 파악한다
- Node.js 런타임의 특성을 이해한다
- CommonJS와 ESM 모듈 시스템의 차이를 안다
- Express로 간단한 API 서버를 만들 수 있다

#### 2. 핵심 개념 소주제

- **2.1 FE/BE 역할**: 프론트엔드(화면, 사용자 인터랙션)와 백엔드(데이터, 비즈니스 로직)의 역할 분리, 비유를 통한 설명 (레스토랑: 홀 = FE, 주방 = BE)
- **2.2 렌더링 개념**: SSR(Server-Side Rendering)과 CSR(Client-Side Rendering) 맛보기, 각 방식의 장단점
- **2.3 Node.js 런타임**: Node.js란 무엇인가, 브라우저 밖에서 JavaScript 실행, 이벤트 기반 비동기 I/O 개요
- **2.4 모듈 시스템**: CommonJS (require/module.exports) vs ESM (import/export), package.json의 "type": "module" 설정

#### 3. Mermaid 다이어그램 상세

**다이어그램 1: 클라이언트-서버 아키텍처 (flowchart LR)**
- Browser (클라이언트) -- HTTP 요청 --> Server (백엔드)
- Server -- HTTP 응답 --> Browser
- Server -- Query --> Database
- Database -- Data --> Server

**다이어그램 2: SSR vs CSR 비교 (flowchart TD)**
- SSR 경로: 요청 -> 서버에서 HTML 완성 -> 완성된 페이지 전달
- CSR 경로: 요청 -> 빈 HTML + JS 전달 -> 브라우저에서 렌더링

**다이어그램 3: Node.js 이벤트 루프 (flowchart TD)**
- Call Stack, Event Queue, Node APIs 간의 관계 시각화
- 비동기 작업의 처리 흐름

#### 4. 코드 예제 상세

| 번호 | 파일/명령 | 언어 | 내용 |
|------|-----------|------|------|
| 1 | CommonJS vs ESM | javascript | require vs import 문법 비교 (2개 코드 블록) |
| 2 | server.js | javascript | Express 기본 서버 (app.get, app.listen) |
| 3 | routes.js | javascript | GET/POST 라우트 핸들러 + req/res 객체 설명 |

#### 5. 실습 상세

**실습 1 (기본): Express 서버 만들기**
- npm install express
- server.js 작성 (포트 3000)
- GET / 엔드포인트 구현
- 브라우저에서 localhost:3000 접속 확인

**실습 2 (도전): JSON 응답 API 만들기**
- GET /api/users 엔드포인트 추가
- 하드코딩된 사용자 배열 반환
- Postman 또는 브라우저에서 JSON 응답 확인

#### 6. 요약

- 프론트엔드/백엔드 역할 정리
- Node.js + Express로 서버를 만드는 핵심 흐름
- 다음 세션 미리보기: "HTTP의 동작 원리와 REST API 설계를 배우고, CORS 문제를 해결합니다"

---

## Milestone 3: Session 3 - HTTP/REST, JSON, CORS 핵심 (Primary Goal)

### 파일: `content/week1/session3.mdx`

#### 1. 학습 목표

- HTTP 프로토콜의 기본 구조(메서드, 상태코드)를 이해한다
- REST API 설계 원칙을 파악한다
- JSON 데이터 형식의 구조를 이해하고 활용할 수 있다
- CORS의 동작 원리와 해결 전략을 안다
- 프론트엔드에서 백엔드 API를 호출할 수 있다

#### 2. 핵심 개념 소주제

- **2.1 HTTP 기초**: HTTP 메서드 (GET, POST, PUT, DELETE), 상태코드 (200, 201, 400, 404, 500), 요청/응답 구조 (Header, Body)
- **2.2 REST API 설계**: 리소스 기반 URL 설계, CRUD와 HTTP 메서드 매핑, RESTful 설계 원칙 (명사형 URL, 적절한 상태코드)
- **2.3 JSON 데이터**: JSON 구조 (키-값 쌍, 배열, 중첩), JSON.stringify / JSON.parse, Content-Type: application/json
- **2.4 CORS**: 동일 출처 정책(Same-Origin Policy), CORS 에러가 발생하는 이유, Preflight 요청 (OPTIONS), cors 미들웨어를 이용한 해결

#### 3. Mermaid 다이어그램 상세

**다이어그램 1: HTTP 요청-응답 (sequence diagram)**
- 참여자: Client, Server
- Client -> Server: HTTP Request (Method, URL, Headers, Body)
- Server -> Client: HTTP Response (Status Code, Headers, Body)
- 주요 상태코드 표시

**다이어그램 2: REST API 설계 (flowchart TD)**
- Resource: /users
- GET /users (목록 조회)
- GET /users/:id (단건 조회)
- POST /users (생성)
- PUT /users/:id (수정)
- DELETE /users/:id (삭제)

**다이어그램 3: CORS Preflight (sequence diagram)**
- 참여자: Browser, Frontend(localhost:3000), Backend(localhost:4000)
- Browser -> Backend: OPTIONS (Preflight Request)
- Backend -> Browser: 200 OK + CORS Headers
- Browser -> Backend: Actual Request (GET/POST)
- Backend -> Browser: Response + CORS Headers

#### 4. 코드 예제 상세

| 번호 | 파일/명령 | 언어 | 내용 |
|------|-----------|------|------|
| 1 | fetch 호출 | javascript | fetch API로 GET/POST 요청 보내기 |
| 2 | cors 미들웨어 | javascript | Express cors 패키지 설정 (기본, 특정 origin 허용) |
| 3 | CRUD API | javascript | HTTP 메서드별 Express 핸들러 (GET, POST, PUT, DELETE) |
| 4 | JSON 파싱 | javascript | JSON.stringify, JSON.parse, express.json() 미들웨어 |

#### 5. 실습 상세

**실습 1 (기본): REST API 서버 확장**
- Session 2에서 만든 서버에 CRUD 엔드포인트 추가
- Postman 또는 REST Client로 각 엔드포인트 테스트
- 상태코드 확인 (200, 201, 404)

**실습 2 (도전): CORS 에러 재현 및 해결**
- 간단한 HTML 프론트엔드 파일 생성 (포트 3000)
- 백엔드 서버를 별도 포트(4000)에서 실행
- fetch로 API 호출 시 CORS 에러 확인
- cors 미들웨어 추가 후 문제 해결 확인

#### 6. 요약

- HTTP/REST/JSON/CORS 핵심 정리
- 1주차 전체 회고: "개발환경 -> 서버 생성 -> API 통신"의 학습 경로 정리
- 다음 주 미리보기: "React를 배우고 프론트엔드 UI를 만들어 봅니다"

---

## 기술적 접근

### 콘텐츠 작성 원칙

1. **점진적 복잡도**: 각 세션 내에서도 쉬운 개념부터 어려운 개념으로 진행
2. **비유 활용**: 기술 개념을 일상 비유로 먼저 설명 (예: HTTP = 편지, REST = 주소 체계)
3. **코드 → 설명 순서**: 코드를 먼저 보여준 후 한 줄씩 설명하는 방식 활용
4. **세션 간 연결**: 이전 세션에서 만든 코드를 다음 세션에서 확장

### Mermaid 다이어그램 작성 규칙

- flowchart 방향: 복잡도에 따라 TD(Top-Down) 또는 LR(Left-Right) 선택
- 노드 텍스트: 한국어 설명 (필요시 영어 병기)
- 색상/스타일: Nextra 기본 테마에 맞춤 (별도 스타일 지정 없음)
- 라벨: 화살표 위에 동작이나 프로토콜 명시

### MDX 작성 규칙

- H1(#): 세션 제목 (예: "# Session 1: 개발환경 올인원 세팅")
- H2(##): 6개 템플릿 섹션 헤더
- H3(###): 소주제
- 코드 블록: 언어 식별자 필수 (```javascript, ```bash, ```json)
- Mermaid: ```mermaid fenced code block
- 강조: **굵게** 처리, 영어 용어 한국어(영어) 표기

---

## 리스크 및 대응

| 리스크 | 가능성 | 영향 | 대응 방안 |
|--------|--------|------|-----------|
| Mermaid 다이어그램 렌더링 실패 | 낮음 | 높음 | Nextra 내장 Mermaid 지원 확인, 복잡한 구문 회피 |
| 콘텐츠 분량 초과/부족 | 중간 | 중간 | 세션당 6,000~10,000 토큰 목표 유지, 핵심만 포함 |
| 코드 예제 구문 오류 | 중간 | 높음 | 구문 검증 수행, 실행 가능성 확인 |
| 세션 간 일관성 부족 | 낮음 | 중간 | 템플릿 구조 엄격 준수, 어조/서체 통일 |

---

## Traceability

| 항목 | SPEC 연결 |
|------|----------|
| Milestone 1 | REQ-01, REQ-02, REQ-03, REQ-04, REQ-05 |
| Milestone 2 | REQ-01, REQ-02, REQ-03, REQ-04, REQ-05 |
| Milestone 3 | REQ-01, REQ-02, REQ-03, REQ-04, REQ-05 |
