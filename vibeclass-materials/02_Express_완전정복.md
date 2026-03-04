Express 완전정복

목표: Express로 실전 웹 서버를 처음부터 끝까지 만들 수 있게 되기 실습: CRUD API 서버 + 미들웨어 + 에러 처리 + 파일 업로드

📋 목차
Express 시작하기
라우팅 완전 정리
미들웨어 이해하기
요청(Request) 다루기
응답(Response) 다루기
정적 파일 서빙
템플릿 엔진 (EJS)
에러 처리
파일 업로드
실전 CRUD API 프로젝트
1️⃣ Express 시작하기
프로젝트 세팅
# 폴더 생성
mkdir my-express-app
cd my-express-app

# npm 초기화
npm init -y

# Express 설치
npm install express

# 개발 도구 설치
npm install -D nodemon

# 추가 유용 패키지
npm install cors dotenv morgan

복사
package.json 설정
{
  "name": "my-express-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.0",
    "express": "^4.21.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}

복사
첫 번째 서버
// index.js
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3000

// ===== 기본 미들웨어 =====
app.use(cors())                          // CORS 허용
app.use(morgan('dev'))                   // 요청 로그
app.use(express.json())                  // JSON 바디 파싱
app.use(express.urlencoded({ extended: true }))  // Form 데이터 파싱

// ===== 라우트 =====
app.get('/', (req, res) => {
  res.json({
    message: '서버가 정상 작동 중입니다!',
    timestamp: new Date().toISOString()
  })
})

// ===== 서버 시작 =====
app.listen(PORT, () => {
  console.log(`서버 실행: http://localhost:${PORT}`)
})

복사
# 실행
npm run dev

복사
2️⃣ 라우팅 완전 정리
기본 라우팅
// HTTP 메서드별 라우트
app.get('/users', (req, res) => { /* 조회 */ })
app.post('/users', (req, res) => { /* 생성 */ })
app.put('/users/:id', (req, res) => { /* 전체 수정 */ })
app.patch('/users/:id', (req, res) => { /* 부분 수정 */ })
app.delete('/users/:id', (req, res) => { /* 삭제 */ })

// 모든 메서드에 대응
app.all('/secret', (req, res) => {
  res.json({ message: '모든 메서드 처리' })
})

복사
라우트 파라미터
// 기본 파라미터
app.get('/users/:id', (req, res) => {
  console.log(req.params.id)  // '123'
  // GET /users/123
})

// 여러 파라미터
app.get('/users/:userId/posts/:postId', (req, res) => {
  console.log(req.params.userId)   // '1'
  console.log(req.params.postId)   // '42'
  // GET /users/1/posts/42
})

// 선택적 파라미터
app.get('/users/:id?', (req, res) => {
  if (req.params.id) {
    // 특정 사용자 조회
  } else {
    // 전체 사용자 조회
  }
})

복사
Router 분리 (모듈화)
// routes/users.js
import { Router } from 'express'

const router = Router()

// /api/users
router.get('/', (req, res) => {
  res.json({ message: '사용자 목록' })
})

// /api/users/:id
router.get('/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id}` })
})

// /api/users
router.post('/', (req, res) => {
  res.json({ message: '사용자 생성', data: req.body })
})

// /api/users/:id
router.put('/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 수정` })
})

// /api/users/:id
router.delete('/:id', (req, res) => {
  res.json({ message: `사용자 ${req.params.id} 삭제` })
})

export default router

복사
// routes/posts.js
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: '게시글 목록' })
})

router.get('/:id', (req, res) => {
  res.json({ message: `게시글 ${req.params.id}` })
})

router.post('/', (req, res) => {
  res.json({ message: '게시글 생성' })
})

export default router

복사
// index.js (메인 파일)
import express from 'express'
import usersRouter from './routes/users.js'
import postsRouter from './routes/posts.js'

const app = express()

app.use(express.json())

// 라우터 연결
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.listen(3000)

복사
라우트 체이닝
// 같은 경로에 여러 메서드
app.route('/users')
  .get((req, res) => { res.json({ action: '목록 조회' }) })
  .post((req, res) => { res.json({ action: '생성' }) })

app.route('/users/:id')
  .get((req, res) => { res.json({ action: '상세 조회' }) })
  .put((req, res) => { res.json({ action: '수정' }) })
  .delete((req, res) => { res.json({ action: '삭제' }) })

복사
3️⃣ 미들웨어 이해하기
미들웨어란?
요청(Request) ──▶ 미들웨어1 ──▶ 미들웨어2 ──▶ 미들웨어3 ──▶ 라우트 핸들러
                    │              │              │
                  로그 출력      인증 확인       데이터 파싱     응답 전송

클릭하여 복사
복사
// 미들웨어 기본 구조
function myMiddleware(req, res, next) {
  // 작업 수행
  console.log(`${req.method} ${req.url}`)

  // 다음 미들웨어로 전달
  next()
}

// 미들웨어 등록
app.use(myMiddleware)

복사
미들웨어 종류
// 1. 전역 미들웨어 (모든 요청에 적용)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// 2. 경로별 미들웨어
app.use('/api', (req, res, next) => {
  console.log('API 요청 감지')
  next()
})

// 3. 라우트별 미들웨어
function authCheck(req, res, next) {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ error: '인증이 필요합니다' })
  }
  next()
}

app.get('/api/profile', authCheck, (req, res) => {
  res.json({ user: '홍길동' })
})

// 4. 여러 미들웨어 체이닝
app.get('/api/admin', authCheck, adminCheck, (req, res) => {
  res.json({ message: '관리자 페이지' })
})

복사
자주 쓰는 내장/외부 미들웨어
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

// JSON 바디 파싱
app.use(express.json())
// Content-Type: application/json 요청의 바디를 파싱

// URL 인코딩 파싱
app.use(express.urlencoded({ extended: true }))
// Content-Type: application/x-www-form-urlencoded (HTML 폼)

// 정적 파일 서빙
app.use(express.static('public'))
// public/ 폴더의 파일을 직접 접근 가능

// CORS 허용
app.use(cors())
// 다른 도메인에서의 요청 허용

// 요청 로그
app.use(morgan('dev'))
// GET /api/users 200 15.234 ms - 45

// 특정 출처만 CORS 허용
app.use(cors({
  origin: ['http://localhost:3000', 'https://myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

복사
커스텀 미들웨어 예시
// 요청 시간 측정 미들웨어
function timing(req, res, next) {
  const start = Date.now()

  // 응답이 끝날 때 실행
  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`${req.method} ${req.url} - ${duration}ms`)
  })

  next()
}

// 인증 미들웨어
function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: '토큰이 필요합니다' })
  }

  // 토큰 검증 로직
  try {
    const user = verifyToken(token)  // JWT 검증
    req.user = user  // 요청 객체에 사용자 정보 추가
    next()
  } catch (err) {
    return res.status(401).json({ error: '유효하지 않은 토큰입니다' })
  }
}

// 권한 확인 미들웨어
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: '권한이 없습니다' })
    }
    next()
  }
}

// 사용 예시
app.get('/api/admin', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: '관리자 전용 데이터' })
})

복사
4️⃣ 요청(Request) 다루기
req 객체 주요 속성
app.post('/api/users', (req, res) => {
  // URL 파라미터 (/users/:id)
  console.log(req.params)      // { id: '123' }

  // 쿼리 스트링 (/users?page=1&limit=10)
  console.log(req.query)       // { page: '1', limit: '10' }

  // 요청 바디 (POST, PUT 데이터)
  console.log(req.body)        // { name: '홍길동', email: 'hong@test.com' }

  // 요청 헤더
  console.log(req.headers)     // { 'content-type': 'application/json', ... }
  console.log(req.headers.authorization)  // 'Bearer eyJhbG...'

  // HTTP 메서드
  console.log(req.method)      // 'POST'

  // 요청 URL
  console.log(req.url)         // '/api/users?page=1'
  console.log(req.path)        // '/api/users'
  console.log(req.originalUrl) // '/api/users?page=1'

  // 클라이언트 IP
  console.log(req.ip)          // '127.0.0.1'

  // 프로토콜
  console.log(req.protocol)    // 'http' 또는 'https'

  // 호스트
  console.log(req.hostname)    // 'localhost'
})

복사
쿼리 파라미터 활용 (검색, 필터, 페이지네이션)
// GET /api/users?page=2&limit=10&sort=name&order=asc&role=admin
app.get('/api/users', (req, res) => {
  const {
    page = '1',
    limit = '10',
    sort = 'id',
    order = 'asc',
    role,
    search
  } = req.query

  const pageNum = parseInt(page)
  const limitNum = parseInt(limit)
  const offset = (pageNum - 1) * limitNum

  let filteredUsers = [...users]

  // 역할 필터
  if (role) {
    filteredUsers = filteredUsers.filter(u => u.role === role)
  }

  // 검색
  if (search) {
    filteredUsers = filteredUsers.filter(u =>
      u.name.includes(search) || u.email.includes(search)
    )
  }

  // 정렬
  filteredUsers.sort((a, b) => {
    if (order === 'asc') return a[sort] > b[sort] ? 1 : -1
    return a[sort] < b[sort] ? 1 : -1
  })

  // 페이지네이션
  const total = filteredUsers.length
  const paged = filteredUsers.slice(offset, offset + limitNum)

  res.json({
    success: true,
    data: paged,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum)
    }
  })
})

복사
5️⃣ 응답(Response) 다루기
res 객체 주요 메서드
// JSON 응답 (가장 많이 사용)
res.json({ success: true, data: users })

// 상태 코드 + JSON
res.status(201).json({ message: '생성 완료' })
res.status(404).json({ error: '찾을 수 없음' })
res.status(500).json({ error: '서버 오류' })

// 텍스트 응답
res.send('Hello World')

// HTML 응답
res.send('<h1>안녕하세요</h1>')

// 상태 코드만 (바디 없음)
res.sendStatus(204)  // No Content

// 리다이렉트
res.redirect('/login')
res.redirect(301, '/new-url')

// 파일 다운로드
res.download('/path/to/file.pdf')
res.download('/path/to/file.pdf', 'custom-name.pdf')

// 파일 전송
res.sendFile('/absolute/path/to/file.html')

// 헤더 설정
res.set('X-Custom-Header', 'value')
res.set({
  'Content-Type': 'application/json',
  'X-Request-Id': '12345'
})

// 쿠키 설정
res.cookie('token', 'abc123', {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,  // 1일
  secure: true
})

// 쿠키 삭제
res.clearCookie('token')

복사
표준 응답 헬퍼 만들기
// helpers/response.js

// 성공 응답
export function success(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data
  })
}

// 생성 성공 응답
export function created(res, data) {
  return res.status(201).json({
    success: true,
    message: '생성되었습니다.',
    data
  })
}

// 에러 응답
export function error(res, message, statusCode = 500) {
  return res.status(statusCode).json({
    success: false,
    error: message
  })
}

// 사용 예시
import { success, created, error } from './helpers/response.js'

app.get('/api/users', (req, res) => {
  success(res, users)
})

app.post('/api/users', (req, res) => {
  if (!req.body.name) {
    return error(res, '이름은 필수입니다.', 400)
  }
  const newUser = { id: Date.now(), ...req.body }
  users.push(newUser)
  created(res, newUser)
})

복사
6️⃣ 정적 파일 서빙
기본 설정
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// public 폴더의 파일을 직접 접근 가능하게
app.use(express.static(path.join(__dirname, 'public')))

복사
폴더 구조
my-express-app/
├── public/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── logo.png
├── index.js
└── package.json

클릭하여 복사
복사
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Express 앱</title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <h1>Express 정적 파일 서빙</h1>
  <img src="/images/logo.png" alt="로고">
  <script src="/js/main.js"></script>
</body>
</html>

복사
접근 URL:
http://localhost:3000/              → public/index.html
http://localhost:3000/css/style.css → public/css/style.css
http://localhost:3000/images/logo.png → public/images/logo.png

클릭하여 복사
복사
7️⃣ 템플릿 엔진 (EJS)
EJS 설치 및 설정
npm install ejs

복사
// index.js
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// EJS 설정
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// 정적 파일
app.use(express.static(path.join(__dirname, 'public')))

// 라우트
app.get('/', (req, res) => {
  res.render('index', {
    title: '홈페이지',
    user: { name: '홍길동' },
    items: ['항목1', '항목2', '항목3']
  })
})

app.get('/about', (req, res) => {
  res.render('about', { title: '소개' })
})

app.listen(3000)

복사
EJS 템플릿 문법
<!-- views/index.ejs -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title><%= title %></title>
</head>
<body>
  <!-- 변수 출력 (HTML 이스케이프) -->
  <h1>안녕하세요, <%= user.name %>님!</h1>

  <!-- HTML 그대로 출력 (주의: XSS 위험) -->
  <%- '<strong>굵은 글씨</strong>' %>

  <!-- 조건문 -->
  <% if (user.name) { %>
    <p>로그인됨: <%= user.name %></p>
  <% } else { %>
    <p>로그인이 필요합니다.</p>
  <% } %>

  <!-- 반복문 -->
  <ul>
    <% items.forEach(item => { %>
      <li><%= item %></li>
    <% }) %>
  </ul>

  <!-- 부분 템플릿 포함 -->
  <%- include('partials/header') %>
  <%- include('partials/footer') %>
</body>
</html>

복사
레이아웃 패턴
<!-- views/partials/header.ejs -->
<header style="background: #333; color: white; padding: 1rem;">
  <nav>
    <a href="/" style="color: white;">홈</a>
    <a href="/about" style="color: white;">소개</a>
    <a href="/users" style="color: white;">사용자</a>
  </nav>
</header>

<!-- views/partials/footer.ejs -->
<footer style="background: #333; color: white; padding: 1rem; text-align: center;">
  <p>&copy; 2026 My Express App</p>
</footer>

<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head><title><%= title %></title></head>
<body>
  <%- include('partials/header') %>

  <main style="padding: 2rem;">
    <h1><%= title %></h1>
    <p>메인 콘텐츠</p>
  </main>

  <%- include('partials/footer') %>
</body>
</html>

복사
8️⃣ 에러 처리
기본 에러 처리
// 404 처리 (모든 라우트 아래에 위치)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: '요청한 페이지를 찾을 수 없습니다.'
  })
})

// 전역 에러 핸들러 (매개변수 4개 필수!)
app.use((err, req, res, next) => {
  console.error('에러 발생:', err)

  res.status(err.status || 500).json({
    success: false,
    error: err.message || '서버 내부 오류가 발생했습니다.'
  })
})

복사
비동기 에러 처리
// ❌ 비동기 에러가 잡히지 않는 경우
app.get('/api/data', async (req, res) => {
  const data = await fetchData()  // 에러 발생 시 서버 크래시!
  res.json(data)
})

// ✅ try-catch로 에러 처리
app.get('/api/data', async (req, res, next) => {
  try {
    const data = await fetchData()
    res.json(data)
  } catch (err) {
    next(err)  // 에러 핸들러로 전달
  }
})

// ✅ 더 깔끔한 방법: 래퍼 함수
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// 사용
app.get('/api/data', asyncHandler(async (req, res) => {
  const data = await fetchData()  // 에러가 자동으로 에러 핸들러로 전달
  res.json(data)
}))

app.get('/api/users', asyncHandler(async (req, res) => {
  const users = await getUsers()
  res.json({ success: true, data: users })
}))

복사
커스텀 에러 클래스
// errors/AppError.js
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
  }
}

export class NotFoundError extends AppError {
  constructor(message = '리소스를 찾을 수 없습니다.') {
    super(message, 404)
  }
}

export class BadRequestError extends AppError {
  constructor(message = '잘못된 요청입니다.') {
    super(message, 400)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = '인증이 필요합니다.') {
    super(message, 401)
  }
}

// 사용 예시
import { NotFoundError, BadRequestError } from './errors/AppError.js'

app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id))

  if (!user) {
    throw new NotFoundError('사용자를 찾을 수 없습니다.')
  }

  res.json({ success: true, data: user })
}))

복사
9️⃣ 파일 업로드
multer 설치 및 설정
npm install multer

복사
import multer from 'multer'
import path from 'node:path'

// 저장 위치 및 파일명 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')  // uploads 폴더에 저장
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    const ext = path.extname(file.originalname)
    cb(null, `${uniqueName}${ext}`)
  }
})

// 파일 필터 (이미지만 허용)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('이미지 파일만 업로드 가능합니다.'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024  // 5MB 제한
  }
})

// 단일 파일 업로드
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '파일이 없습니다.' })
  }

  res.json({
    success: true,
    file: {
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: `/uploads/${req.file.filename}`
    }
  })
})

// 여러 파일 업로드
app.post('/api/upload-multiple', upload.array('files', 5), (req, res) => {
  const files = req.files.map(file => ({
    filename: file.filename,
    originalname: file.originalname,
    size: file.size,
    url: `/uploads/${file.filename}`
  }))

  res.json({ success: true, files })
})

// 업로드 파일 서빙
app.use('/uploads', express.static('uploads'))

복사
curl로 파일 업로드 테스트
# 단일 파일
curl -X POST http://localhost:3000/api/upload \
  -F "file=@/path/to/image.jpg"

# 여러 파일
curl -X POST http://localhost:3000/api/upload-multiple \
  -F "files=@image1.jpg" \
  -F "files=@image2.png"

복사
🔟 실전 CRUD API 프로젝트
프로젝트 구조
todo-api/
├── index.js           # 서버 진입점
├── routes/
│   └── todos.js       # 할일 라우트
├── middleware/
│   └── logger.js      # 로거 미들웨어
├── helpers/
│   └── response.js    # 응답 헬퍼
├── data/
│   └── todos.json     # 데이터 파일
├── public/
│   └── index.html     # API 문서
├── package.json
└── .env

클릭하여 복사
복사
전체 코드
// index.js
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import todosRouter from './routes/todos.js'
import 'dotenv/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// 미들웨어
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// 라우트
app.use('/api/todos', todosRouter)

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not Found' })
})

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ success: false, error: err.message })
})

app.listen(PORT, () => {
  console.log(`서버 실행: http://localhost:${PORT}`)
})

복사
// routes/todos.js
import { Router } from 'express'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, '..', 'data', 'todos.json')

const router = Router()

// 데이터 읽기/쓰기 헬퍼
async function readTodos() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeTodos(todos) {
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2))
}

// 전체 조회
router.get('/', async (req, res) => {
  const todos = await readTodos()
  const { completed, search } = req.query

  let filtered = todos

  if (completed !== undefined) {
    filtered = filtered.filter(t => t.completed === (completed === 'true'))
  }

  if (search) {
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
  }

  res.json({ success: true, count: filtered.length, data: filtered })
})

// 특정 조회
router.get('/:id', async (req, res) => {
  const todos = await readTodos()
  const todo = todos.find(t => t.id === parseInt(req.params.id))

  if (!todo) {
    return res.status(404).json({ success: false, error: '할일을 찾을 수 없습니다.' })
  }

  res.json({ success: true, data: todo })
})

// 생성
router.post('/', async (req, res) => {
  const { title } = req.body

  if (!title || !title.trim()) {
    return res.status(400).json({ success: false, error: '제목은 필수입니다.' })
  }

  const todos = await readTodos()
  const newTodo = {
    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  }

  todos.push(newTodo)
  await writeTodos(todos)

  res.status(201).json({ success: true, data: newTodo })
})

// 수정
router.put('/:id', async (req, res) => {
  const todos = await readTodos()
  const index = todos.findIndex(t => t.id === parseInt(req.params.id))

  if (index === -1) {
    return res.status(404).json({ success: false, error: '할일을 찾을 수 없습니다.' })
  }

  const { title, completed } = req.body
  todos[index] = {
    ...todos[index],
    ...(title !== undefined && { title: title.trim() }),
    ...(completed !== undefined && { completed }),
    updatedAt: new Date().toISOString()
  }

  await writeTodos(todos)
  res.json({ success: true, data: todos[index] })
})

// 삭제
router.delete('/:id', async (req, res) => {
  const todos = await readTodos()
  const index = todos.findIndex(t => t.id === parseInt(req.params.id))

  if (index === -1) {
    return res.status(404).json({ success: false, error: '할일을 찾을 수 없습니다.' })
  }

  const deleted = todos.splice(index, 1)[0]
  await writeTodos(todos)

  res.json({ success: true, data: deleted })
})

export default router

복사
API 테스트
# 전체 조회
curl http://localhost:3000/api/todos

# 할일 생성
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Express 공부하기"}'

# 검색
curl "http://localhost:3000/api/todos?search=Express"

# 완료 처리
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# 삭제
curl -X DELETE http://localhost:3000/api/todos/1

복사
✅ 핵심 정리
항목	내용
Express	Node.js의 가장 인기 있는 웹 프레임워크
라우팅	app.get/post/put/delete + Router 모듈화
미들웨어	요청-응답 사이의 처리 함수 체인
req 객체	params, query, body, headers 등
res 객체	json(), send(), status(), redirect() 등
에러 처리	asyncHandler + 전역 에러 핸들러
EJS	서버 사이드 템플릿 엔진
multer	파일 업로드 미들웨어
🔗 참고 자료
Express 공식 문서
Express 한국어 가이드
MDN - Express 튜토리얼

다음 자료: 03_API_호출_실전가이드.md