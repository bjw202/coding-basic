Node.js 핵심 완전정복

목표: Node.js의 동작 원리부터 실전 활용까지 한 번에 정리하기 대상: 바이브코딩 수강생 (입문~중급)

📋 목차
Node.js 개요
설치 및 버전 관리
핵심 개념: 이벤트 루프
내장 모듈 총정리
파일 시스템 (fs)
경로 처리 (path)
HTTP 모듈
프로세스와 환경변수
npm 실전 가이드
자주 쓰는 유틸리티
1️⃣ Node.js 개요
Node.js란?
┌─────────────────────────────────────────────────┐
│                  Node.js                         │
├─────────────────────────────────────────────────┤
│                                                  │
│   "JavaScript를 서버에서 실행할 수 있게 해주는    │
│    런타임 환경"                                   │
│                                                  │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐   │
│   │  V8 엔진  │ + │  libuv   │ + │ 내장 API  │   │
│   │ (Chrome)  │   │(비동기IO)│   │ (fs,http) │   │
│   └──────────┘   └──────────┘   └──────────┘   │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
왜 Node.js인가?
장점	설명
JavaScript 통합	프론트와 백엔드 모두 JS로 개발
비동기 I/O	높은 동시 처리 성능
거대한 생태계	npm에 200만+ 패키지
빠른 개발	가볍고 유연한 구조
실시간 처리	WebSocket, SSE 등에 적합
Node.js vs 브라우저
항목	Node.js	브라우저
실행 환경	서버 (터미널)	클라이언트 (브라우저)
window
클릭하여 복사
	❌ 없음	✅ 있음
document
클릭하여 복사
	❌ 없음	✅ 있음
global
클릭하여 복사
 / globalThis
클릭하여 복사
	✅ 있음	✅ globalThis
클릭하여 복사

fs
클릭하여 복사
 (파일)	✅ 있음	❌ 없음
process
클릭하여 복사
	✅ 있음	❌ 없음
fetch
클릭하여 복사
	✅ (v18+)	✅ 있음
모듈	CJS + ESM	ESM
2️⃣ 설치 및 버전 관리
Node.js 설치
# macOS (Homebrew)
brew install node

# 또는 공식 사이트 다운로드
# https://nodejs.org/

# 버전 확인
node -v    # v22.x.x
npm -v     # 10.x.x

복사
nvm (Node Version Manager) - 추천!
# nvm 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# 터미널 재시작 후

# 사용 가능한 버전 확인
nvm ls-remote

# LTS 버전 설치
nvm install --lts

# 특정 버전 설치
nvm install 22
nvm install 20

# 버전 전환
nvm use 22
nvm use 20

# 기본 버전 설정
nvm alias default 22

# 현재 사용 중인 버전
nvm current

# 설치된 버전 목록
nvm ls

복사
왜 nvm을 쓰나?
프로젝트 A: Node.js 20 필요
프로젝트 B: Node.js 22 필요

nvm 없이 → 하나만 설치 가능, 전환 불가
nvm 사용 → 자유롭게 버전 전환!

cd project-a && nvm use 20
cd project-b && nvm use 22

클릭하여 복사
복사
.nvmrc 파일
# 프로젝트 루트에 .nvmrc 생성
echo "22" > .nvmrc

# 해당 폴더에서 자동 사용
nvm use
# Found '/path/to/project/.nvmrc' with version <22>

복사
3️⃣ 핵심 개념: 이벤트 루프
싱글 스레드 + 비동기
┌─────────────────────────────────────────────────────┐
│                  Node.js 이벤트 루프                   │
├─────────────────────────────────────────────────────┤
│                                                      │
│   ┌──────────┐                                       │
│   │ 요청 1   │──┐                                    │
│   │ 요청 2   │──┤                                    │
│   │ 요청 3   │──┤    ┌────────────────┐              │
│   │ 요청 4   │──┼───▶│   이벤트 루프   │              │
│   │ 요청 5   │──┤    │  (Event Loop)  │              │
│   │  ...     │──┘    └───────┬────────┘              │
│   └──────────┘               │                       │
│                              ▼                       │
│                    ┌──────────────────┐              │
│                    │  비동기 작업 큐   │              │
│                    │  (파일I/O, DB,   │              │
│                    │   네트워크 등)    │              │
│                    └──────────────────┘              │
│                              │                       │
│                              ▼                       │
│                    ┌──────────────────┐              │
│                    │   Worker Pool    │              │
│                    │  (libuv 스레드)  │              │
│                    └──────────────────┘              │
│                                                      │
└─────────────────────────────────────────────────────┘

클릭하여 복사
복사
동기 vs 비동기
// ❌ 동기 (블로킹) - 순서대로 실행, 기다림
console.log('1. 시작')
const data = fs.readFileSync('big-file.txt')  // 여기서 멈춤!
console.log('2. 파일 읽기 완료')
console.log('3. 끝')
// 출력: 1 → (대기...) → 2 → 3

// ✅ 비동기 (논블로킹) - 기다리지 않고 다음 실행
console.log('1. 시작')
fs.readFile('big-file.txt', (err, data) => {
  console.log('2. 파일 읽기 완료')  // 나중에 실행
})
console.log('3. 끝')
// 출력: 1 → 3 → 2

복사
Promise와 async/await
// 콜백 지옥 (옛날 방식) ❌
fs.readFile('a.txt', (err, a) => {
  fs.readFile('b.txt', (err, b) => {
    fs.readFile('c.txt', (err, c) => {
      console.log(a + b + c)  // 콜백 지옥!
    })
  })
})

// Promise 방식
fs.promises.readFile('a.txt')
  .then(a => fs.promises.readFile('b.txt').then(b => [a, b]))
  .then(([a, b]) => fs.promises.readFile('c.txt').then(c => [a, b, c]))
  .then(([a, b, c]) => console.log(a + b + c))

// async/await 방식 ✅ (가장 깔끔!)
async function readAll() {
  const a = await fs.promises.readFile('a.txt', 'utf-8')
  const b = await fs.promises.readFile('b.txt', 'utf-8')
  const c = await fs.promises.readFile('c.txt', 'utf-8')
  console.log(a + b + c)
}

// 병렬 실행 (더 빠름!)
async function readAllParallel() {
  const [a, b, c] = await Promise.all([
    fs.promises.readFile('a.txt', 'utf-8'),
    fs.promises.readFile('b.txt', 'utf-8'),
    fs.promises.readFile('c.txt', 'utf-8'),
  ])
  console.log(a + b + c)
}

복사
4️⃣ 내장 모듈 총정리
자주 쓰는 내장 모듈
모듈	용도	예시
fs
클릭하여 복사
	파일 읽기/쓰기	fs.readFile()
클릭하여 복사

path
클릭하여 복사
	경로 처리	path.join()
클릭하여 복사

http
클릭하여 복사
	HTTP 서버/클라이언트	http.createServer()
클릭하여 복사

https
클릭하여 복사
	HTTPS 요청	https.get()
클릭하여 복사

url
클릭하여 복사
	URL 파싱	new URL()
클릭하여 복사

os
클릭하여 복사
	운영체제 정보	os.platform()
클릭하여 복사

crypto
클릭하여 복사
	암호화	crypto.randomUUID()
클릭하여 복사

util
클릭하여 복사
	유틸리티	util.promisify()
클릭하여 복사

events
클릭하여 복사
	이벤트 처리	EventEmitter
클릭하여 복사

stream
클릭하여 복사
	스트림 처리	Readable
클릭하여 복사
, Writable
클릭하여 복사

child_process
클릭하여 복사
	외부 명령 실행	exec()
클릭하여 복사
, spawn()
클릭하여 복사

buffer
클릭하여 복사
	바이너리 데이터	Buffer.from()
클릭하여 복사
모듈 임포트 방식
// CommonJS (전통 방식)
const fs = require('fs')
const path = require('path')
const { readFile } = require('fs/promises')

// ES Modules (최신 방식) ✅
import fs from 'fs'
import path from 'path'
import { readFile } from 'fs/promises'

// Node.js 내장 모듈 프리픽스 (권장)
import fs from 'node:fs'
import path from 'node:path'
import { readFile } from 'node:fs/promises'

복사
5️⃣ 파일 시스템 (fs)
파일 읽기
import fs from 'node:fs/promises'

// 텍스트 파일 읽기
const text = await fs.readFile('data.txt', 'utf-8')
console.log(text)

// JSON 파일 읽기
const raw = await fs.readFile('data.json', 'utf-8')
const data = JSON.parse(raw)
console.log(data)

// 바이너리 파일 읽기 (이미지 등)
const buffer = await fs.readFile('image.png')
console.log(buffer.length, 'bytes')

복사
파일 쓰기
// 텍스트 파일 쓰기 (덮어쓰기)
await fs.writeFile('output.txt', '안녕하세요!')

// JSON 파일 쓰기
const data = { name: '홍길동', age: 25 }
await fs.writeFile('user.json', JSON.stringify(data, null, 2))

// 파일 끝에 추가
await fs.appendFile('log.txt', `[${new Date().toISOString()}] 로그 메시지\n`)

복사
디렉토리 다루기
// 디렉토리 생성
await fs.mkdir('new-folder')
await fs.mkdir('a/b/c', { recursive: true })  // 중첩 생성

// 디렉토리 읽기 (파일 목록)
const files = await fs.readdir('my-folder')
console.log(files)  // ['file1.txt', 'file2.txt', 'sub-folder']

// 상세 정보와 함께
const entries = await fs.readdir('my-folder', { withFileTypes: true })
for (const entry of entries) {
  console.log(`${entry.name} - ${entry.isDirectory() ? '폴더' : '파일'}`)
}

// 파일/디렉토리 삭제
await fs.unlink('file.txt')                     // 파일 삭제
await fs.rm('folder', { recursive: true })       // 폴더 삭제

복사
파일 정보 확인
// 파일 존재 여부 확인
try {
  await fs.access('file.txt')
  console.log('파일 존재')
} catch {
  console.log('파일 없음')
}

// 파일 상세 정보
const stats = await fs.stat('file.txt')
console.log({
  크기: stats.size,           // 바이트
  생성일: stats.birthtime,
  수정일: stats.mtime,
  폴더여부: stats.isDirectory(),
  파일여부: stats.isFile(),
})

복사
6️⃣ 경로 처리 (path)
자주 쓰는 path 메서드
import path from 'node:path'

// 경로 합치기 (OS에 맞게 자동 처리)
path.join('/users', 'hong', 'documents')
// macOS: '/users/hong/documents'
// Windows: '\\users\\hong\\documents'

// 절대 경로 만들기
path.resolve('src', 'index.js')
// '/현재폴더/src/index.js'

// 파일명 추출
path.basename('/home/user/file.txt')       // 'file.txt'
path.basename('/home/user/file.txt', '.txt')  // 'file'

// 확장자 추출
path.extname('photo.jpg')    // '.jpg'
path.extname('data.tar.gz')  // '.gz'

// 디렉토리 경로
path.dirname('/home/user/file.txt')  // '/home/user'

// 경로 파싱 (한 번에 분석)
path.parse('/home/user/file.txt')
// {
//   root: '/',
//   dir: '/home/user',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

복사
__dirname, __filename (ESM에서)
// CommonJS에서는 자동 제공
// __dirname  → 현재 파일의 디렉토리
// __filename → 현재 파일의 전체 경로

// ESM에서는 직접 만들어야 함
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(__dirname)   // /Users/hong/project/src
console.log(__filename)  // /Users/hong/project/src/index.js

복사
7️⃣ HTTP 모듈
기본 HTTP 서버 (Express 없이)
import http from 'node:http'

const server = http.createServer((req, res) => {
  // 요청 정보
  console.log(`${req.method} ${req.url}`)

  // 라우팅
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('<h1>안녕하세요!</h1>')
  }
  else if (req.method === 'GET' && req.url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify([
      { id: 1, name: '홍길동' },
      { id: 2, name: '김철수' },
    ]))
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('페이지를 찾을 수 없습니다.')
  }
})

server.listen(3000, () => {
  console.log('서버 실행: http://localhost:3000')
})

복사
POST 요청 처리
import http from 'node:http'

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/users') {
    let body = ''

    // 데이터 수신 (스트림)
    req.on('data', chunk => {
      body += chunk
    })

    // 수신 완료
    req.on('end', () => {
      const user = JSON.parse(body)
      console.log('새 사용자:', user)

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ success: true, data: user }))
    })
  }
})

server.listen(3000)

복사

이래서 Express를 씁니다! 위처럼 HTTP 모듈만 쓰면 라우팅, 파싱, 미들웨어 등을 모두 직접 구현해야 합니다.

8️⃣ 프로세스와 환경변수
process 객체
// 환경변수
console.log(process.env.NODE_ENV)     // 'development' 또는 'production'
console.log(process.env.DATABASE_URL) // 환경변수 값

// 현재 작업 디렉토리
console.log(process.cwd())  // '/Users/hong/project'

// Node.js 버전
console.log(process.version)  // 'v22.0.0'

// 플랫폼
console.log(process.platform)  // 'darwin' (macOS), 'win32', 'linux'

// 메모리 사용량
const mem = process.memoryUsage()
console.log(`RSS: ${Math.round(mem.rss / 1024 / 1024)}MB`)

// 커맨드라인 인자
// node app.js --port 3000 --name hello
console.log(process.argv)
// ['node 경로', 'app.js 경로', '--port', '3000', '--name', 'hello']

// 프로세스 종료
process.exit(0)  // 정상 종료
process.exit(1)  // 에러 종료

복사
.env 파일과 dotenv
# .env 파일 생성
DATABASE_URL=mysql://user:pass@localhost:3306/mydb
API_KEY=sk-abc123
PORT=3000
NODE_ENV=development

복사
// dotenv 사용
import 'dotenv/config'
// 또는
import dotenv from 'dotenv'
dotenv.config()

// 이제 process.env로 접근 가능
console.log(process.env.DATABASE_URL)
console.log(process.env.API_KEY)

복사
# dotenv 설치
npm install dotenv

복사
환경별 설정
# .env (공통)
APP_NAME=MyApp

# .env.development (개발)
DATABASE_URL=mysql://localhost:3306/dev_db
API_URL=http://localhost:3001

# .env.production (운영)
DATABASE_URL=mysql://prod-server:3306/prod_db
API_URL=https://api.myapp.com

복사
// 환경별 로드
import dotenv from 'dotenv'

const env = process.env.NODE_ENV || 'development'
dotenv.config({ path: `.env.${env}` })
dotenv.config()  // .env 공통 설정 (이미 있는 값은 덮어쓰지 않음)

복사
9️⃣ npm 실전 가이드
package.json 핵심 필드
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "내 프로젝트",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint ."
  },
  "dependencies": {
    "express": "^4.21.0",
    "dotenv": "^16.4.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0",
    "typescript": "^5.5.0"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}

복사
버전 표기법
버전: MAJOR.MINOR.PATCH (예: 4.21.3)

^4.21.3  → 4.x.x (MAJOR 고정, MINOR/PATCH 자동 업데이트)
~4.21.3  → 4.21.x (MAJOR/MINOR 고정, PATCH만 업데이트)
4.21.3   → 정확히 이 버전만
>=4.0.0  → 4.0.0 이상
*        → 모든 버전

클릭하여 복사
복사
scripts 활용
{
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon --watch src src/index.ts",
    "build": "tsc",
    "clean": "rm -rf dist",
    "prebuild": "npm run clean",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  }
}

복사
# 실행
npm run dev        # 개발 모드
npm start          # 운영 모드 (run 생략 가능)
npm test           # 테스트 (run 생략 가능)
npm run build      # 빌드 (prebuild 자동 실행)
npm run lint       # 린트

복사
유용한 npm 명령어
# 초기화
npm init -y

# 패키지 설치
npm install express              # 일반 의존성
npm install -D nodemon           # 개발 의존성
npm install -g pm2               # 전역 설치

# 패키지 정보
npm info express                 # 패키지 정보
npm view express versions        # 사용 가능한 버전

# 패키지 관리
npm outdated                     # 업데이트 가능한 패키지
npm update                       # 패키지 업데이트
npm audit                        # 보안 취약점 검사
npm audit fix                    # 취약점 자동 수정

# 정리
npm cache clean --force          # 캐시 정리
npm prune                        # 불필요한 패키지 제거

복사
🔟 자주 쓰는 유틸리티
crypto (암호화)
import crypto from 'node:crypto'

// 랜덤 UUID 생성
const uuid = crypto.randomUUID()
// 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'

// 랜덤 문자열 생성
const token = crypto.randomBytes(32).toString('hex')
// '4f3c2b1a...' (64자 16진수)

// 해시 생성 (비밀번호 등)
const hash = crypto.createHash('sha256')
  .update('비밀번호')
  .digest('hex')

// HMAC 생성 (서명 등)
const hmac = crypto.createHmac('sha256', 'secret-key')
  .update('데이터')
  .digest('hex')

복사
URL 처리
// URL 파싱
const url = new URL('https://vibeclass.kr/courses?page=1&limit=10#section')

console.log(url.hostname)      // 'vibeclass.kr'
console.log(url.pathname)      // '/courses'
console.log(url.search)        // '?page=1&limit=10'
console.log(url.hash)          // '#section'

// 쿼리 파라미터
console.log(url.searchParams.get('page'))   // '1'
console.log(url.searchParams.get('limit'))  // '10'

// 쿼리 파라미터 수정
url.searchParams.set('page', '2')
url.searchParams.append('sort', 'name')
console.log(url.toString())
// 'https://vibeclass.kr/courses?page=2&limit=10&sort=name#section'

복사
타이머
// setTimeout: 일정 시간 후 한 번 실행
setTimeout(() => {
  console.log('3초 후 실행!')
}, 3000)

// setInterval: 일정 간격으로 반복 실행
const intervalId = setInterval(() => {
  console.log('2초마다 실행!')
}, 2000)

// 정리 (메모리 누수 방지)
clearInterval(intervalId)

// Promise 기반 대기
import { setTimeout as sleep } from 'node:timers/promises'

async function example() {
  console.log('시작')
  await sleep(2000)  // 2초 대기
  console.log('2초 후')
}

복사
날짜 처리
// 현재 시간
const now = new Date()
console.log(now.toISOString())       // '2026-02-06T10:30:00.000Z'
console.log(now.toLocaleDateString('ko-KR'))  // '2026. 2. 6.'
console.log(now.toLocaleTimeString('ko-KR'))  // '오후 7:30:00'

// 타임스탬프
console.log(Date.now())  // 1770340200000 (밀리초)

// 날짜 포맷팅 (Intl)
const formatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
})
console.log(formatter.format(now))  // '2026년 2월 6일 금요일 오후 07:30'

복사
✅ 핵심 정리
항목	내용
Node.js	JavaScript 서버 런타임 (V8 + libuv)
버전 관리	nvm으로 프로젝트별 Node 버전 관리
이벤트 루프	싱글 스레드 + 비동기 I/O로 고성능
async/await	비동기 코드를 동기처럼 깔끔하게 작성
fs	파일 읽기/쓰기/삭제/폴더 관리
path	OS에 독립적인 경로 처리
process.env	환경변수 관리 (dotenv 활용)
npm	패키지 설치/관리/스크립트 실행
🔗 참고 자료
Node.js 공식 문서
Node.js 한국어 가이드
nvm GitHub
npm 공식 사이트

다음 자료: 02_Express_완전정복.md