2회차: 프론트/백엔드 개념 + Node.js 기초

목표: 프론트엔드와 백엔드의 역할을 명확히 이해하고, Node.js로 첫 API 서버 띄우기 실습: Node.js로 간단 API 서버 만들기 (Express)

📋 이번 시간 목차
프론트엔드 vs 백엔드
렌더링 개념 (SSR/CSR/SSG)
Node.js란?
모듈 시스템 (CommonJS vs ESM)
npm 패키지 관리
실습: Express API 서버
1️⃣ 프론트엔드 vs 백엔드
웹 애플리케이션 구조
┌─────────────────┐         ┌─────────────────┐         ┌──────────────┐
│   사용자 (User)  │ ──────▶ │  프론트엔드 (FE) │ ──────▶ │  백엔드 (BE)  │
│                 │ ◀────── │   (브라우저)     │ ◀────── │   (서버)     │
└─────────────────┘         └─────────────────┘         └──────────────┘
                                                              │
                                                              ▼
                                                        ┌──────────────┐
                                                        │  데이터베이스  │
                                                        │     (DB)     │
                                                        └──────────────┘

클릭하여 복사
복사
프론트엔드 (Frontend)
항목	내용
역할	사용자에게 보이는 화면 담당
위치	브라우저에서 실행
기술	HTML, CSS, JavaScript, React, Vue
주요 작업	UI 렌더링, 사용자 입력 처리, API 호출
백엔드 (Backend)
항목	내용
역할	데이터 처리, 비즈니스 로직, 인증
위치	서버에서 실행
기술	Node.js, Python, Java, Go
주요 작업	API 제공, DB 연동, 인증/인가
풀스택 (Fullstack)
프론트엔드 + 백엔드 모두 개발
Next.js는 풀스택 프레임워크
프론트: React 컴포넌트
백엔드: API Routes, Server Actions
실제 흐름 예시: 로그인
1. [FE] 사용자가 이메일/비밀번호 입력
2. [FE] "로그인" 버튼 클릭
3. [FE] → [BE] POST /api/login 요청 (이메일, 비밀번호)
4. [BE] DB에서 사용자 확인
5. [BE] 비밀번호 검증
6. [BE] JWT 토큰 생성
7. [BE] → [FE] 토큰 + 사용자 정보 응답
8. [FE] 토큰 저장, 대시보드로 이동

클릭하여 복사
복사
2️⃣ 렌더링 개념 (SSR/CSR/SSG)
렌더링이란?
코드 → 화면으로 변환하는 과정
HTML을 어디서 만드느냐에 따라 구분
CSR (Client-Side Rendering)
서버                          브라우저
  │                              │
  │  1. 빈 HTML + JS 전송         │
  │ ─────────────────────────▶  │
  │                              │ 2. JS 실행
  │                              │ 3. API 호출
  │  4. 데이터 응답               │
  │ ◀─────────────────────────  │
  │                              │ 5. 화면 그리기

클릭하여 복사
복사
장점	단점
페이지 전환 빠름	초기 로딩 느림
서버 부하 적음	SEO 불리
인터랙션 좋음	흰 화면 (로딩 중)

사용 예: 대시보드, 관리자 페이지

SSR (Server-Side Rendering)
서버                          브라우저
  │ 1. 요청                      │
  │ ◀─────────────────────────  │
  │                              │
  │ 2. DB 조회                   │
  │ 3. HTML 생성                 │
  │                              │
  │  4. 완성된 HTML 전송          │
  │ ─────────────────────────▶  │
  │                              │ 5. 바로 표시
  │                              │ 6. JS 연결 (Hydration)

클릭하여 복사
복사
장점	단점
SEO 좋음	서버 부하 높음
초기 로딩 빠름	매 요청마다 렌더링
동적 콘텐츠	페이지 전환 느림

사용 예: 블로그 상세, 상품 상세 (SEO 필요)

SSG (Static Site Generation)
빌드 시점                    배포 후
    │                          │
    │ 1. 모든 페이지             │
    │    HTML 미리 생성         │
    │                          │
    ▼                          │
  정적 파일들                   │  요청 시 바로 전송
  (HTML, CSS, JS)  ───────────▶ │
                               │
                               ▼
                            브라우저

클릭하여 복사
복사
장점	단점
가장 빠름	빌드 시간 필요
CDN 캐싱 완벽	실시간 데이터 어려움
서버 부하 없음	페이지 많으면 빌드 오래 걸림

사용 예: 블로그, 문서 사이트, 랜딩 페이지

Next.js에서의 적용
// CSR - 클라이언트 컴포넌트
'use client'
export default function Dashboard() {
  const [data, setData] = useState(null)
  useEffect(() => { fetch('/api/...') }, [])
  return <div>{data}</div>
}

// SSR - 서버 컴포넌트 (기본값)
export default async function ProductPage({ params }) {
  const product = await db.product.findUnique({ where: { id: params.id } })
  return <div>{product.name}</div>
}

// SSG - generateStaticParams
export async function generateStaticParams() {
  const posts = await db.post.findMany()
  return posts.map(post => ({ slug: post.slug }))
}

복사
3️⃣ Node.js란?
정의
JavaScript 런타임 (실행 환경)
브라우저 밖에서 JavaScript 실행 가능
V8 엔진 (Chrome과 동일) 기반
특징
특징	설명
비동기 I/O	대기 없이 다른 작업 처리
이벤트 기반	이벤트 루프로 동작
싱글 스레드	하나의 스레드로 많은 요청 처리
npm	거대한 패키지 생태계
설치 확인
# Node.js 버전 확인
node -v   # v20.x.x

# npm 버전 확인
npm -v    # 10.x.x

# Node.js 설치 (없다면)
# macOS
brew install node

# 또는 nvm으로 버전 관리
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

복사
Node.js vs 브라우저 JavaScript
항목	Node.js	브라우저
DOM	❌ 없음	✅ 있음
window	❌ 없음	✅ 있음
document	❌ 없음	✅ 있음
fs (파일 시스템)	✅ 있음	❌ 없음
http	✅ 있음	fetch API
process	✅ 있음	❌ 없음
REPL 사용해보기
# Node.js REPL 시작
node

# 계산
> 1 + 2
3

# 변수
> const name = "Node"
undefined
> console.log(`Hello, ${name}!`)
Hello, Node!

# 종료
> .exit

복사
파일 실행
# hello.js 생성
echo "console.log('Hello, Node.js!')" > hello.js

# 실행
node hello.js
# 출력: Hello, Node.js!

복사
4️⃣ 모듈 시스템 (CommonJS vs ESM)
모듈이란?
코드를 기능별로 분리한 파일
다른 파일에서 가져다 사용
CommonJS (CJS)
Node.js 기본 모듈 시스템
require
클릭하여 복사
와 module.exports
클릭하여 복사
 사용
// math.js (내보내기)
function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

module.exports = { add, subtract }
// 또는
// exports.add = add

// app.js (가져오기)
const { add, subtract } = require('./math')
// 또는
// const math = require('./math')

console.log(add(1, 2))      // 3
console.log(subtract(5, 3)) // 2

복사
ES Modules (ESM)
표준 JavaScript 모듈
import
클릭하여 복사
와 export
클릭하여 복사
 사용
브라우저에서도 동작
// math.js (내보내기)
export function add(a, b) {
  return a + b
}

export function subtract(a, b) {
  return a - b
}

// 기본 내보내기
export default function multiply(a, b) {
  return a * b
}

// app.js (가져오기)
import multiply, { add, subtract } from './math.js'

console.log(add(1, 2))       // 3
console.log(multiply(2, 3))  // 6

복사
ESM 사용 설정

방법 1: package.json에 type 추가

{
  "name": "my-project",
  "type": "module"
}

복사

방법 2: 파일 확장자 사용

.mjs
클릭하여 복사
 → ESM
.cjs
클릭하여 복사
 → CommonJS
비교
항목	CommonJS	ES Modules
문법	require
클릭하여 복사
 / module.exports
클릭하여 복사
	import
클릭하여 복사
 / export
클릭하여 복사

로딩	동기 (순서대로)	비동기 가능
표준	Node.js 전용	JavaScript 표준
브라우저	❌ (번들러 필요)	✅
Top-level await	❌	✅
Next.js에서는?
ESM 권장
TypeScript도 ESM 스타일 사용
// Next.js / TypeScript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  // ...
}

복사
5️⃣ npm 패키지 관리
npm이란?
Node Package Manager
패키지(라이브러리) 설치/관리 도구
세계 최대 패키지 저장소
프로젝트 초기화
# 새 프로젝트 초기화
npm init

# 대화형 질문 건너뛰기
npm init -y

복사
package.json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "내 프로젝트",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "tsc",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "typescript": "^5.0.0"
  }
}

복사
패키지 설치
# 일반 의존성 (배포에 필요)
npm install express
npm i express          # 축약형

# 개발 의존성 (개발에만 필요)
npm install -D nodemon
npm i -D typescript

# 전역 설치 (모든 프로젝트에서 사용)
npm install -g pm2

# 특정 버전 설치
npm install express@4.18.2

# package.json 기반 전체 설치
npm install
npm i

복사
패키지 제거
npm uninstall express
npm remove express    # 동일
npm rm express        # 동일

복사
자주 쓰는 npm 명령어
명령어	설명
npm init -y
클릭하여 복사
	프로젝트 초기화
npm install
클릭하여 복사
	의존성 설치
npm i <패키지>
클릭하여 복사
	패키지 설치
npm i -D <패키지>
클릭하여 복사
	개발 의존성 설치
npm run <스크립트>
클릭하여 복사
	스크립트 실행
npm update
클릭하여 복사
	패키지 업데이트
npm list
클릭하여 복사
	설치된 패키지 목록
npm outdated
클릭하여 복사
	업데이트 가능한 패키지
npm vs yarn vs pnpm
항목	npm	yarn	pnpm
속도	보통	빠름	가장 빠름
디스크	많이 사용	많이 사용	적게 사용
lock 파일	package-lock.json	yarn.lock	pnpm-lock.yaml
# yarn 사용
yarn add express
yarn dev

# pnpm 사용
pnpm add express
pnpm dev

복사
6️⃣ 실습: Express API 서버
Express란?
Node.js의 가장 인기 있는 웹 프레임워크
가볍고 유연함
라우팅, 미들웨어 지원
Step 1: 프로젝트 생성
# 폴더 생성 및 이동
mkdir express-api
cd express-api

# npm 초기화
npm init -y

# ESM 설정 (package.json에 추가)
# "type": "module" 추가

# Express 설치
npm install express

# 개발 도구 설치
npm install -D nodemon

복사
Step 2: package.json 수정
{
  "name": "express-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}

복사
Step 3: 서버 코드 작성

index.js
클릭하여 복사
:

import express from 'express'

// Express 앱 생성
const app = express()
const PORT = 3001

// JSON 파싱 미들웨어
app.use(express.json())

// 임시 데이터베이스 (메모리)
let users = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
  { id: 2, name: '김철수', email: 'kim@example.com' },
  { id: 3, name: '이영희', email: 'lee@example.com' }
]

// 루트 라우트
app.get('/', (req, res) => {
  res.json({
    message: 'Express API 서버에 오신 것을 환영합니다!',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      health: '/api/health'
    }
  })
})

// 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

// ========== 사용자 CRUD ==========

// 전체 사용자 조회 (GET)
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    count: users.length,
    data: users
  })
})

// 특정 사용자 조회 (GET)
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const user = users.find(u => u.id === id)

  if (!user) {
    return res.status(404).json({
      success: false,
      error: '사용자를 찾을 수 없습니다.'
    })
  }

  res.json({
    success: true,
    data: user
  })
})

// 사용자 생성 (POST)
app.post('/api/users', (req, res) => {
  const { name, email } = req.body

  // 유효성 검사
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'name과 email은 필수입니다.'
    })
  }

  // 새 사용자 생성
  const newUser = {
    id: users.length + 1,
    name,
    email
  }
  users.push(newUser)

  res.status(201).json({
    success: true,
    message: '사용자가 생성되었습니다.',
    data: newUser
  })
})

// 사용자 수정 (PUT)
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  const userIndex = users.findIndex(u => u.id === id)

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: '사용자를 찾을 수 없습니다.'
    })
  }

  // 사용자 정보 업데이트
  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email })
  }

  res.json({
    success: true,
    message: '사용자가 수정되었습니다.',
    data: users[userIndex]
  })
})

// 사용자 삭제 (DELETE)
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const userIndex = users.findIndex(u => u.id === id)

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: '사용자를 찾을 수 없습니다.'
    })
  }

  const deletedUser = users.splice(userIndex, 1)[0]

  res.json({
    success: true,
    message: '사용자가 삭제되었습니다.',
    data: deletedUser
  })
})

// 404 처리
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: '요청한 리소스를 찾을 수 없습니다.'
  })
})

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`)
})

복사
Step 4: 서버 실행
# 개발 모드 (자동 재시작)
npm run dev

# 또는 일반 실행
npm start

복사
Step 5: API 테스트

터미널에서 curl 또는 Thunder Client / Postman 사용:

# 루트
curl http://localhost:3001/

# 전체 사용자 조회
curl http://localhost:3001/api/users

# 특정 사용자 조회
curl http://localhost:3001/api/users/1

# 사용자 생성
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "박지민", "email": "park@example.com"}'

# 사용자 수정
curl -X PUT http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "홍길동(수정)"}'

# 사용자 삭제
curl -X DELETE http://localhost:3001/api/users/1

복사
✅ 오늘 배운 것 정리
항목	내용
FE/BE	프론트엔드와 백엔드의 역할 구분
렌더링	CSR, SSR, SSG의 차이와 사용 시점
Node.js	JavaScript 런타임, 서버에서 JS 실행
모듈	CommonJS vs ESM 차이
npm	패키지 설치 및 관리
Express	기본 API 서버 구현 (CRUD)
📚 과제

Express 서버 확장하기

/api/posts
클릭하여 복사
 엔드포인트 추가 (게시글 CRUD)
검색 기능 추가: /api/users?name=홍
클릭하여 복사

Fastify로 같은 API 만들어보기 (선택)

npm install fastify

복사

Thunder Client로 모든 API 테스트하고 스크린샷

🔗 참고 자료
Node.js 공식 문서
Express 공식 문서
MDN - JavaScript 모듈
npm 공식 사이트

다음 시간: HTTP/REST, JSON, CORS 핵심