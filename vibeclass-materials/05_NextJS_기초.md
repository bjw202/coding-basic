5회차: Next.js 기초 (라우팅/서버액션/환경변수)

목표: Next.js App Router의 핵심 개념 이해와 실전 적용 실습: Next.js에서 API 붙이고 화면에 출력

📋 이번 시간 목차
Next.js란?
App Router 기초
라우팅 완전 정복
레이아웃과 페이지
서버 vs 클라이언트 컴포넌트
API Routes
Server Actions
실습: 게시판 만들기
1️⃣ Next.js란?
Next.js 소개
React 풀스택 프레임워크
Vercel에서 개발
프론트엔드 + 백엔드 한 번에
React vs Next.js
항목	React	Next.js
유형	라이브러리	프레임워크
라우팅	직접 설정	파일 기반
SSR	❌	✅ 기본 지원
API	❌	✅ API Routes
배포	복잡	Vercel 원클릭
Next.js 핵심 기능
파일 기반 라우팅 - 폴더 구조 = URL
서버 컴포넌트 - 기본값으로 서버 렌더링
API Routes - 백엔드 API 구축
자동 최적화 - 이미지, 폰트, 번들
미들웨어 - 요청 전처리
2️⃣ App Router 기초
프로젝트 구조
app/
├── layout.tsx       # 루트 레이아웃
├── page.tsx         # 홈페이지 (/)
├── globals.css      # 전역 스타일
│
├── about/
│   └── page.tsx     # /about
│
├── blog/
│   ├── page.tsx     # /blog
│   └── [slug]/
│       └── page.tsx # /blog/:slug
│
├── api/
│   └── users/
│       └── route.ts # /api/users
│
└── dashboard/
    ├── layout.tsx   # 대시보드 전용 레이아웃
    ├── page.tsx     # /dashboard
    └── settings/
        └── page.tsx # /dashboard/settings

클릭하여 복사
복사
핵심 파일 규칙
파일명	역할
page.tsx
클릭하여 복사
	페이지 (URL로 접근 가능)
layout.tsx
클릭하여 복사
	레이아웃 (공통 UI)
loading.tsx
클릭하여 복사
	로딩 UI
error.tsx
클릭하여 복사
	에러 UI
not-found.tsx
클릭하여 복사
	404 페이지
route.ts
클릭하여 복사
	API 엔드포인트
3️⃣ 라우팅 완전 정복
기본 라우팅
app/page.tsx          → /
app/about/page.tsx    → /about
app/contact/page.tsx  → /contact

클릭하여 복사
복사
중첩 라우팅
app/blog/page.tsx           → /blog
app/blog/posts/page.tsx     → /blog/posts
app/blog/posts/new/page.tsx → /blog/posts/new

클릭하여 복사
복사
동적 라우팅
// app/blog/[slug]/page.tsx → /blog/hello-world
interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  return <h1>게시글: {slug}</h1>
}

복사
다중 동적 세그먼트
// app/shop/[category]/[productId]/page.tsx
// → /shop/electronics/123

interface Props {
  params: Promise<{
    category: string
    productId: string
  }>
}

export default async function Product({ params }: Props) {
  const { category, productId } = await params
  return (
    <div>
      <p>카테고리: {category}</p>
      <p>상품 ID: {productId}</p>
    </div>
  )
}

복사
Catch-All 라우팅
// app/docs/[...slug]/page.tsx
// → /docs/a/b/c → slug = ['a', 'b', 'c']

interface Props {
  params: Promise<{ slug: string[] }>
}

export default async function Docs({ params }: Props) {
  const { slug } = await params
  return <p>경로: {slug.join('/')}</p>
}

복사
그룹 라우팅 (괄호)
app/
├── (marketing)/       # URL에 영향 없음
│   ├── about/
│   └── contact/
│
├── (auth)/
│   ├── login/
│   └── register/
│
└── (dashboard)/
    └── admin/

클릭하여 복사
복사
링크와 네비게이션
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Link 컴포넌트
<Link href="/about">소개</Link>
<Link href={`/blog/${slug}`}>게시글</Link>

// 프로그래밍 방식
'use client'
function NavigateButton() {
  const router = useRouter()

  return (
    <button onClick={() => router.push('/dashboard')}>
      대시보드로 이동
    </button>
  )
}

// 뒤로가기
router.back()

// 새로고침
router.refresh()

복사
4️⃣ 레이아웃과 페이지
루트 레이아웃
// app/layout.tsx (필수)
import './globals.css'

export const metadata = {
  title: '내 앱',
  description: '멋진 웹 애플리케이션',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <header>헤더</header>
        <main>{children}</main>
        <footer>푸터</footer>
      </body>
    </html>
  )
}

복사
중첩 레이아웃
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800">
        <nav>사이드바</nav>
      </aside>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}

복사
메타데이터
// 정적 메타데이터
export const metadata = {
  title: '페이지 제목',
  description: '페이지 설명',
  openGraph: {
    title: 'OG 제목',
    description: 'OG 설명',
    images: ['/og-image.png'],
  },
}

// 동적 메타데이터
export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
  }
}

복사
로딩 UI
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
    </div>
  )
}

복사
에러 처리
// app/dashboard/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="text-center p-8">
      <h2 className="text-xl font-bold text-red-500">
        오류가 발생했습니다
      </h2>
      <p className="text-gray-600 my-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        다시 시도
      </button>
    </div>
  )
}

복사
5️⃣ 서버 vs 클라이언트 컴포넌트
서버 컴포넌트 (기본값)
// 서버에서 렌더링 (기본값)
// DB 직접 접근, 시크릿 키 사용 가능
// useState, useEffect 사용 불가

async function ServerComponent() {
  const data = await db.users.findMany()  // DB 직접 접근!

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

복사
클라이언트 컴포넌트
'use client'  // ⬅️ 맨 위에 선언 필수

import { useState, useEffect } from 'react'

function ClientComponent() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 브라우저에서 실행
  }, [])

  return (
    <button onClick={() => setCount(count + 1)}>
      클릭: {count}
    </button>
  )
}

복사
언제 무엇을 쓸까?
필요한 기능	서버 컴포넌트	클라이언트 컴포넌트
DB 접근	✅	❌ (API 경유)
환경변수 (비공개)	✅	❌
파일 시스템	✅	❌
useState/useEffect	❌	✅
onClick 이벤트	❌	✅
브라우저 API	❌	✅
혼합 사용 패턴
// 서버 컴포넌트 (데이터 가져오기)
async function PostList() {
  const posts = await db.posts.findMany()

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      <LikeButton />  {/* 클라이언트 컴포넌트 */}
    </div>
  )
}

// 클라이언트 컴포넌트 (상호작용)
'use client'
function LikeButton() {
  const [liked, setLiked] = useState(false)
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️' : '🤍'}
    </button>
  )
}

복사
6️⃣ API Routes
기본 구조
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

// GET /api/users
export async function GET() {
  const users = [
    { id: 1, name: '홍길동' },
    { id: 2, name: '김철수' },
  ]

  return NextResponse.json(users)
}

// POST /api/users
export async function POST(request: NextRequest) {
  const body = await request.json()

  // 유효성 검사
  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: '필수 필드가 누락되었습니다.' },
      { status: 400 }
    )
  }

  // 사용자 생성 (DB 연동)
  // const user = await db.user.create({ data: body })

  return NextResponse.json(
    { message: '사용자가 생성되었습니다.', data: body },
    { status: 201 }
  )
}

복사
동적 라우트 API
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

interface Props {
  params: Promise<{ id: string }>
}

// GET /api/users/123
export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params

  // const user = await db.user.findUnique({ where: { id: parseInt(id) } })

  return NextResponse.json({ id, name: '홍길동' })
}

// PUT /api/users/123
export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params
  const body = await request.json()

  return NextResponse.json({
    message: `사용자 ${id}가 수정되었습니다.`,
    data: body,
  })
}

// DELETE /api/users/123
export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params

  return NextResponse.json({
    message: `사용자 ${id}가 삭제되었습니다.`,
  })
}

복사
쿼리 파라미터 받기
// GET /api/users?page=1&limit=10
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  return NextResponse.json({
    page: parseInt(page),
    limit: parseInt(limit),
  })
}

복사
7️⃣ Server Actions
Server Actions란?
서버에서 직접 실행되는 함수
form submit에 사용
클라이언트 → 서버 데이터 전송
기본 사용법
// app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  // DB에 저장
  // await db.user.create({ data: { name, email } })

  console.log('서버에서 실행:', { name, email })

  // 페이지 새로고침 (캐시 무효화)
  // revalidatePath('/users')

  return { success: true }
}

복사
폼에서 사용
// app/users/new/page.tsx
import { createUser } from '../actions'

export default function NewUserPage() {
  return (
    <form action={createUser}>
      <input
        type="text"
        name="name"
        placeholder="이름"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="이메일"
        required
      />
      <button type="submit">생성</button>
    </form>
  )
}

복사
클라이언트에서 호출
'use client'

import { useState } from 'react'
import { createUser } from '../actions'

export default function UserForm() {
  const [pending, setPending] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setPending(true)
    try {
      const result = await createUser(formData)
      if (result.success) {
        alert('생성 완료!')
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="name" placeholder="이름" />
      <input name="email" placeholder="이메일" />
      <button type="submit" disabled={pending}>
        {pending ? '처리 중...' : '생성'}
      </button>
    </form>
  )
}

복사
8️⃣ 실습: 게시판 만들기
파일 구조
app/
├── posts/
│   ├── page.tsx        # 게시글 목록
│   ├── new/
│   │   └── page.tsx    # 새 게시글 작성
│   └── [id]/
│       └── page.tsx    # 게시글 상세
├── api/
│   └── posts/
│       ├── route.ts    # GET (목록), POST (생성)
│       └── [id]/
│           └── route.ts # GET (상세), DELETE
└── actions.ts          # Server Actions

클릭하여 복사
복사
API Routes
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'

// 임시 데이터
let posts = [
  { id: 1, title: '첫 번째 게시글', content: '내용입니다.', createdAt: new Date().toISOString() },
  { id: 2, title: '두 번째 게시글', content: '또 다른 내용입니다.', createdAt: new Date().toISOString() },
]

export async function GET() {
  return NextResponse.json({ posts })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newPost = {
    id: posts.length + 1,
    title: body.title,
    content: body.content,
    createdAt: new Date().toISOString(),
  }

  posts.push(newPost)

  return NextResponse.json({ post: newPost }, { status: 201 })
}

복사
게시글 목록 페이지
// app/posts/page.tsx
import Link from 'next/link'

interface Post {
  id: number
  title: string
  createdAt: string
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch('http://localhost:3000/api/posts', {
    cache: 'no-store',  // 항상 최신 데이터
  })
  const data = await res.json()
  return data.posts
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">게시판</h1>
        <Link
          href="/posts/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          새 글 작성
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block p-4 border rounded-lg hover:bg-gray-50"
          >
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString('ko-KR')}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

복사
게시글 작성 페이지
// app/posts/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.get('title'),
          content: formData.get('content'),
        }),
      })

      if (res.ok) {
        router.push('/posts')
        router.refresh()
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">새 게시글 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">제목</label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">내용</label>
          <textarea
            name="content"
            required
            rows={10}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '저장 중...' : '게시글 작성'}
        </button>
      </form>
    </div>
  )
}

복사
✅ 오늘 배운 것 정리
항목	내용
App Router	파일 기반 라우팅 시스템
동적 라우팅	[slug], [...slug]
레이아웃	중첩 레이아웃, 메타데이터
서버 컴포넌트	DB 직접 접근, 기본값
클라이언트 컴포넌트	'use client', 상호작용
API Routes	RESTful API 구축
Server Actions	폼 처리, 서버 실행
📚 과제

게시판 완성하기

게시글 상세 페이지 구현
게시글 삭제 기능 추가
게시글 수정 기능 추가

에러/로딩 처리

loading.tsx 추가
error.tsx 추가
🔗 참고 자료
Next.js 공식 문서
App Router 가이드
Server Actions

다음 시간: 비동기 (Promise/async-await) + 디버깅