3회차: HTTP/REST, JSON, CORS 핵심

목표: 웹 통신의 기본 원리와 API 설계 감각 익히기 실습: 프론트 → 백엔드 호출, CORS 에러 재현 및 해결

📋 이번 시간 목차
HTTP 기초
HTTP 메서드
HTTP 상태 코드
REST API 설계
JSON 데이터 형식
CORS 이해와 해결
실습: API 테스트 도구
1️⃣ HTTP 기초
HTTP란?
HyperText Transfer Protocol
웹에서 데이터를 주고받는 규칙(프로토콜)
클라이언트-서버 통신의 기본
요청(Request)과 응답(Response)
클라이언트 (브라우저)              서버
       │                          │
       │  ──── Request ────▶     │
       │       (요청)             │
       │                          │
       │  ◀──── Response ────    │
       │        (응답)            │

클릭하여 복사
복사
HTTP 요청 구조
GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbG...
Content-Type: application/json
Accept: application/json

{
  "name": "홍길동"
}

복사
부분	설명	예시
메서드	요청 종류	GET, POST, PUT, DELETE
경로	요청 URL	/api/users
헤더	메타 정보	Authorization, Content-Type
바디	전송 데이터	JSON, Form 데이터
HTTP 응답 구조
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache

{
  "success": true,
  "data": [...]
}

복사
부분	설명	예시
상태 코드	결과 상태	200, 404, 500
상태 메시지	설명	OK, Not Found
헤더	메타 정보	Content-Type, Set-Cookie
바디	응답 데이터	JSON, HTML
2️⃣ HTTP 메서드
CRUD와 HTTP 메서드
작업	HTTP 메서드	설명	예시
Create	POST	생성	회원가입, 게시글 작성
Read	GET	조회	목록 보기, 상세 보기
Update	PUT/PATCH	수정	프로필 수정
Delete	DELETE	삭제	계정 탈퇴
각 메서드 상세
GET - 조회
GET /api/users?page=1&limit=10
GET /api/users/123

복사
데이터 조회에 사용
바디 없음
URL에 쿼리 파라미터로 조건 전달
캐싱 가능
POST - 생성
POST /api/users
Content-Type: application/json

{
  "name": "홍길동",
  "email": "hong@example.com"
}

복사
새 리소스 생성
바디에 데이터 포함
멱등성 없음 (여러 번 호출 → 여러 개 생성)
PUT - 전체 수정
PUT /api/users/123
Content-Type: application/json

{
  "name": "홍길동",
  "email": "new@example.com",
  "phone": "010-1234-5678"
}

복사
리소스 전체 교체
모든 필드 포함해야 함
멱등성 있음 (여러 번 호출해도 같은 결과)
PATCH - 부분 수정
PATCH /api/users/123
Content-Type: application/json

{
  "phone": "010-9999-9999"
}

복사
리소스 일부 수정
변경할 필드만 포함
DELETE - 삭제
DELETE /api/users/123

복사
리소스 삭제
보통 바디 없음
멱등성 있음
멱등성(Idempotency)이란?
같은 요청을 여러 번 해도 결과가 같음
GET, PUT, DELETE → 멱등
POST → 비멱등
3️⃣ HTTP 상태 코드
상태 코드 분류
범위	분류	의미
1xx	Informational	정보 (거의 안 씀)
2xx	Success	성공
3xx	Redirection	리다이렉션
4xx	Client Error	클라이언트 오류
5xx	Server Error	서버 오류
자주 쓰는 상태 코드
2xx 성공
코드	이름	설명	사용 예시
200	OK	성공	일반적인 성공 응답
201	Created	생성됨	POST로 리소스 생성
204	No Content	내용 없음	DELETE 성공 (바디 없음)
3xx 리다이렉션
코드	이름	설명
301	Moved Permanently	영구 이동
302	Found	임시 이동
304	Not Modified	캐시 사용
4xx 클라이언트 오류
코드	이름	설명	사용 예시
400	Bad Request	잘못된 요청	필수 파라미터 누락
401	Unauthorized	인증 필요	로그인 안 함
403	Forbidden	권한 없음	관리자 전용
404	Not Found	없음	존재하지 않는 URL
409	Conflict	충돌	중복 이메일
422	Unprocessable Entity	처리 불가	유효성 검사 실패
429	Too Many Requests	요청 과다	속도 제한
5xx 서버 오류
코드	이름	설명
500	Internal Server Error	서버 내부 오류
502	Bad Gateway	게이트웨이 오류
503	Service Unavailable	서비스 불가
504	Gateway Timeout	게이트웨이 타임아웃
실제 응답 예시
// 성공 (200)
return NextResponse.json(
  { success: true, data: users },
  { status: 200 }
)

// 생성 성공 (201)
return NextResponse.json(
  { success: true, data: newUser },
  { status: 201 }
)

// 잘못된 요청 (400)
return NextResponse.json(
  { success: false, error: '이메일은 필수입니다.' },
  { status: 400 }
)

// 인증 필요 (401)
return NextResponse.json(
  { success: false, error: '로그인이 필요합니다.' },
  { status: 401 }
)

// 권한 없음 (403)
return NextResponse.json(
  { success: false, error: '관리자 권한이 필요합니다.' },
  { status: 403 }
)

// 없음 (404)
return NextResponse.json(
  { success: false, error: '사용자를 찾을 수 없습니다.' },
  { status: 404 }
)

// 서버 오류 (500)
return NextResponse.json(
  { success: false, error: '서버 오류가 발생했습니다.' },
  { status: 500 }
)

복사
4️⃣ REST API 설계
REST란?
REpresentational State Transfer
API 설계 원칙/스타일
자원(Resource) 중심 설계
REST 원칙
자원 기반 URL
HTTP 메서드로 행위 표현
무상태(Stateless)
일관된 인터페이스
URL 설계 규칙
✅ 좋은 예시
GET    /api/users           # 전체 목록
GET    /api/users/123       # 특정 사용자
POST   /api/users           # 사용자 생성
PUT    /api/users/123       # 사용자 수정
DELETE /api/users/123       # 사용자 삭제

GET    /api/users/123/posts # 특정 사용자의 게시글
GET    /api/posts?author=123  # 쿼리 파라미터

클릭하여 복사
복사
❌ 나쁜 예시
GET    /api/getUsers        # 동사 사용 ❌
GET    /api/user/123        # 복수형 일관성 ❌
POST   /api/createUser      # 동사 사용 ❌
GET    /api/users/delete/123 # GET으로 삭제 ❌

클릭하여 복사
복사
REST API 설계 가이드
규칙	설명	예시
명사 사용	동사 대신 명사	/users (O) /getUsers (X)
복수형	컬렉션은 복수형	/users (O) /user (X)
소문자	전부 소문자	/users (O) /Users (X)
하이픈	단어 구분은 하이픈	/user-profiles (O)
계층 관계	슬래시로 표현	/users/123/posts
필터는 쿼리	필터/검색/정렬	/users?role=admin
버전 관리
/api/v1/users
/api/v2/users

# 또는 헤더로
Accept: application/vnd.api+json; version=2

클릭하여 복사
복사
페이지네이션
GET /api/users?page=1&limit=20
GET /api/users?offset=0&limit=20
GET /api/users?cursor=abc123

클릭하여 복사
복사

응답 예시:

{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}

복사
5️⃣ JSON 데이터 형식
JSON이란?
JavaScript Object Notation
데이터 교환 형식
사람이 읽기 쉬움
거의 모든 언어에서 지원
기본 문법
{
  "string": "문자열",
  "number": 123,
  "float": 3.14,
  "boolean": true,
  "null": null,
  "array": [1, 2, 3],
  "object": {
    "nested": "중첩 객체"
  }
}

복사
주의 사항
// ❌ 잘못된 JSON
{
  name: "홍길동",        // 키에 따옴표 필수
  'email': "test",      // 작은따옴표 ❌
  age: 25,              // 마지막 콤마 ❌ (일부 파서)
}

// ✅ 올바른 JSON
{
  "name": "홍길동",
  "email": "test@example.com",
  "age": 25
}

복사
JavaScript에서 JSON 다루기
// 객체 → JSON 문자열
const user = { name: '홍길동', age: 25 }
const jsonString = JSON.stringify(user)
// '{"name":"홍길동","age":25}'

// JSON 문자열 → 객체
const parsed = JSON.parse(jsonString)
// { name: '홍길동', age: 25 }

// 예쁘게 출력
console.log(JSON.stringify(user, null, 2))
/*
{
  "name": "홍길동",
  "age": 25
}
*/

복사
API 요청/응답 예시
// 요청 (fetch)
const response = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',  // ⬅️ 중요!
  },
  body: JSON.stringify({
    name: '홍길동',
    email: 'hong@example.com'
  })
})

// 응답 파싱
const data = await response.json()
console.log(data)

복사
표준 응답 형식 제안
// 성공
{
  "success": true,
  "data": {
    "id": 1,
    "name": "홍길동"
  }
}

// 목록
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "totalPages": 5
  }
}

// 에러
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "이메일 형식이 올바르지 않습니다.",
    "details": {
      "field": "email"
    }
  }
}

복사
6️⃣ CORS 이해와 해결
CORS란?
Cross-Origin Resource Sharing
다른 출처(도메인)에서 리소스 요청 허용/차단
브라우저 보안 정책
출처(Origin)란?
https://vibeclass.kr:443/courses
 ↑        ↑           ↑
프로토콜  호스트        포트

이 세 가지가 모두 같아야 "같은 출처"

클릭하여 복사
복사
Same-Origin vs Cross-Origin
현재 페이지: https://vibeclass.kr

// Same-Origin (같은 출처)
https://vibeclass.kr/api/users  ✅
https://vibeclass.kr/courses    ✅

// Cross-Origin (다른 출처)
http://vibeclass.kr/api     ❌ (프로토콜 다름)
https://api.vibeclass.kr    ❌ (호스트 다름)
https://vibeclass.kr:8080   ❌ (포트 다름)
https://example.com/api     ❌ (도메인 다름)

클릭하여 복사
복사
CORS 에러 발생
┌──────────────┐        ┌──────────────┐
│  프론트엔드   │        │   백엔드      │
│ localhost:3000│ ─────▶ │ localhost:3001│
└──────────────┘        └──────────────┘
        │                      │
        │   CORS Error! ❌     │
        └──────────────────────┘

클릭하여 복사
복사

브라우저 콘솔 에러:

Access to fetch at 'http://localhost:3001/api/users'
from origin 'http://localhost:3000' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.

클릭하여 복사
복사
CORS 동작 원리
단순 요청 (Simple Request)
GET, HEAD, POST
특정 헤더만 사용
브라우저                           서버
   │                               │
   │  1. 요청 + Origin 헤더         │
   │ ─────────────────────────▶   │
   │                               │
   │  2. 응답 + CORS 헤더          │
   │ ◀─────────────────────────   │
   │                               │
   │  3. 헤더 확인 후 허용/차단      │

클릭하여 복사
복사
프리플라이트 요청 (Preflight)
PUT, DELETE, PATCH
Content-Type: application/json
커스텀 헤더 사용
브라우저                           서버
   │                               │
   │  1. OPTIONS 요청 (허용?)       │
   │ ─────────────────────────▶   │
   │                               │
   │  2. 허용 헤더 응답            │
   │ ◀─────────────────────────   │
   │                               │
   │  3. 실제 요청 전송            │
   │ ─────────────────────────▶   │
   │                               │
   │  4. 실제 응답                 │
   │ ◀─────────────────────────   │

클릭하여 복사
복사
CORS 해결 방법
방법 1: 서버에서 CORS 헤더 추가 (Express)
import express from 'express'
import cors from 'cors'

const app = express()

// 모든 출처 허용 (개발용)
app.use(cors())

// 특정 출처만 허용 (운영용)
app.use(cors({
  origin: ['https://vibeclass.kr', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true  // 쿠키 허용
}))

복사
방법 2: Next.js API Route에서 헤더 추가
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const response = NextResponse.json({ data: 'hello' })

  // CORS 헤더 추가
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')

  return response
}

// OPTIONS 요청 처리 (Preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
}

복사
방법 3: Next.js Middleware
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

  return response
}

export const config = {
  matcher: '/api/:path*',
}

복사
방법 4: Next.js Config (rewrites)
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/external/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
}

복사
7️⃣ 실습: API 테스트 도구
Thunder Client (VS Code Extension)
VS Code에서 "Thunder Client" 설치
왼쪽 사이드바에서 번개 아이콘 클릭
"New Request" 클릭
Postman
postman.com 다운로드
컬렉션 만들기
요청 저장 및 공유 가능
curl 명령어
# GET 요청
curl http://localhost:3001/api/users

# POST 요청
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"홍길동"}'

# PUT 요청
curl -X PUT http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"홍길동(수정)"}'

# DELETE 요청
curl -X DELETE http://localhost:3001/api/users/1

# 헤더 확인
curl -I http://localhost:3001/api/users

# 상세 출력
curl -v http://localhost:3001/api/users

복사
실습: CORS 에러 재현 및 해결
Step 1: 백엔드 서버 (3001번 포트)
// server.js (CORS 없는 버전)
import express from 'express'

const app = express()
app.use(express.json())

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from API' })
})

app.listen(3001, () => {
  console.log('Server running on 3001')
})

복사
Step 2: 프론트엔드 (3000번 포트)
// Next.js 페이지
'use client'
import { useState } from 'react'

export default function CorsTest() {
  const [result, setResult] = useState('')

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/data')
      const data = await res.json()
      setResult(JSON.stringify(data))
    } catch (error) {
      setResult('CORS 에러 발생!')
      console.error(error)
    }
  }

  return (
    <div>
      <button onClick={fetchData}>API 호출</button>
      <p>{result}</p>
    </div>
  )
}

복사
Step 3: CORS 에러 확인 (브라우저 콘솔)
Step 4: 해결 (cors 미들웨어 추가)
import cors from 'cors'
app.use(cors())

복사
✅ 오늘 배운 것 정리
항목	내용
HTTP	요청/응답 구조, 헤더, 바디
HTTP 메서드	GET, POST, PUT, PATCH, DELETE
상태 코드	2xx, 4xx, 5xx 의미
REST	자원 기반 URL 설계 원칙
JSON	데이터 교환 형식, 직렬화/파싱
CORS	동작 원리, 해결 방법
📚 과제

REST API 설계해보기

"온라인 서점" API URL 설계
책, 저자, 주문, 리뷰 자원
각 자원별 CRUD 엔드포인트

CORS 실습

Express 서버와 Next.js 프론트 분리
CORS 에러 재현 후 해결

API 테스트 컬렉션 만들기

Thunder Client 또는 Postman
모든 CRUD 요청 저장
🔗 참고 자료
MDN - HTTP 개요
REST API 설계 가이드
MDN - CORS
HTTP 상태 코드

다음 시간: React 기초 (상태/컴포넌트/이벤트)