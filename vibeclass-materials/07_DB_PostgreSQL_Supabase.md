7회차: DB 개념 + PostgreSQL / Supabase

목표: 데이터베이스 기초 이해와 Supabase로 실제 DB 연동 실습: "유저/게시글" CRUD + RLS 개념 맛보기

📋 이번 시간 목차
데이터베이스 기초
관계형 DB 개념
SQL 기본 문법
PostgreSQL 소개
Supabase 시작하기
Next.js + Supabase 연동
RLS (Row Level Security)
실습: 게시판 DB 연동
1️⃣ 데이터베이스 기초
데이터베이스란?
데이터를 체계적으로 저장하는 시스템
검색, 수정, 삭제가 효율적
여러 사용자가 동시 접근 가능
DB 종류
종류	특징	예시
관계형 (RDBMS)	테이블 구조, SQL	MySQL, PostgreSQL, Oracle
문서 (Document)	JSON 형태	MongoDB
키-값 (Key-Value)	캐시에 적합	Redis
검색 엔진	전문 검색	Elasticsearch
언제 무엇을 쓸까?
정형화된 데이터 + 복잡한 관계 → PostgreSQL
유연한 스키마 + 빠른 개발     → MongoDB
캐시 + 세션                   → Redis
검색 + 로그                   → Elasticsearch

클릭하여 복사
복사
2️⃣ 관계형 DB 개념
테이블 구조
┌────────────────────────────────────────┐
│               users 테이블              │
├────────┬──────────┬───────────────────┤
│   id   │   name   │       email       │
├────────┼──────────┼───────────────────┤
│   1    │  홍길동   │ hong@example.com  │
│   2    │  김철수   │ kim@example.com   │
│   3    │  이영희   │ lee@example.com   │
└────────┴──────────┴───────────────────┘

클릭하여 복사
복사
용어 정리
용어	설명	예시
테이블	데이터 저장 단위	users, posts
컬럼	세로 항목 (필드)	id, name, email
로우	가로 항목 (레코드)	한 명의 사용자
스키마	테이블 구조 정의	컬럼명, 타입
기본키 (PK)	고유 식별자	id
외래키 (FK)	다른 테이블 참조	user_id
관계 유형
1:1 (일대일)
┌──────────┐      ┌──────────────┐
│  users   │──────│  profiles    │
│  id      │      │  user_id (FK)│
└──────────┘      └──────────────┘
한 사용자 = 한 프로필

1:N (일대다)
┌──────────┐      ┌──────────────┐
│  users   │──┬───│   posts      │
│  id      │  │   │  user_id (FK)│
└──────────┘  │   └──────────────┘
              └───│   posts      │
                  │  user_id (FK)│
                  └──────────────┘
한 사용자 = 여러 게시글

N:N (다대다)
┌──────────┐      ┌──────────────┐      ┌──────────┐
│  posts   │──────│ post_tags    │──────│   tags   │
│  id      │      │  post_id (FK)│      │   id     │
└──────────┘      │  tag_id (FK) │      └──────────┘
                  └──────────────┘
한 게시글 = 여러 태그
한 태그 = 여러 게시글

클릭하여 복사
복사
인덱스
-- 인덱스 없이: 전체 테이블 스캔 (느림)
-- 인덱스 있으면: 빠른 검색

CREATE INDEX idx_users_email ON users(email);

복사
3️⃣ SQL 기본 문법
데이터 조회 (SELECT)
-- 전체 조회
SELECT * FROM users;

-- 특정 컬럼만
SELECT id, name FROM users;

-- 조건 (WHERE)
SELECT * FROM users WHERE age > 20;
SELECT * FROM users WHERE name = '홍길동';
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- 정렬 (ORDER BY)
SELECT * FROM users ORDER BY created_at DESC;

-- 제한 (LIMIT)
SELECT * FROM users LIMIT 10;
SELECT * FROM users LIMIT 10 OFFSET 20;  -- 페이지네이션

-- 중복 제거
SELECT DISTINCT role FROM users;

-- 집계 함수
SELECT COUNT(*) FROM users;
SELECT AVG(age) FROM users;
SELECT MAX(age), MIN(age) FROM users;

-- 그룹화 (GROUP BY)
SELECT role, COUNT(*) FROM users GROUP BY role;

복사
데이터 삽입 (INSERT)
-- 단일 행
INSERT INTO users (name, email) VALUES ('홍길동', 'hong@example.com');

-- 여러 행
INSERT INTO users (name, email) VALUES
  ('김철수', 'kim@example.com'),
  ('이영희', 'lee@example.com');

-- 반환값 받기
INSERT INTO users (name, email)
VALUES ('박지민', 'park@example.com')
RETURNING id, name;

복사
데이터 수정 (UPDATE)
-- 특정 행 수정
UPDATE users SET name = '홍길동(수정)' WHERE id = 1;

-- 여러 컬럼 수정
UPDATE users
SET name = '홍길동', email = 'new@example.com'
WHERE id = 1;

-- 조건 수정
UPDATE posts SET status = 'archived' WHERE created_at < '2024-01-01';

복사
데이터 삭제 (DELETE)
-- 특정 행 삭제
DELETE FROM users WHERE id = 1;

-- 조건 삭제
DELETE FROM posts WHERE status = 'draft' AND created_at < '2024-01-01';

-- 전체 삭제 (주의!)
DELETE FROM users;
TRUNCATE TABLE users;  -- 더 빠름, 복구 불가

복사
JOIN (테이블 결합)
-- INNER JOIN (교집합)
SELECT users.name, posts.title
FROM users
INNER JOIN posts ON users.id = posts.user_id;

-- LEFT JOIN (왼쪽 기준)
SELECT users.name, posts.title
FROM users
LEFT JOIN posts ON users.id = posts.user_id;

-- 별칭 사용
SELECT u.name, p.title
FROM users u
JOIN posts p ON u.id = p.user_id
WHERE p.status = 'published';

복사
4️⃣ PostgreSQL 소개
PostgreSQL이란?
오픈소스 관계형 데이터베이스
가장 고급 기능 지원
JSON, 지리 데이터, 전문 검색 지원
PostgreSQL 특징
기능	설명
JSONB	JSON 데이터 저장/검색
배열	배열 타입 컬럼
Full-Text Search	전문 검색
UUID	고유 ID 생성
트리거/함수	서버 로직
데이터 타입
-- 숫자
INT, BIGINT, DECIMAL, FLOAT

-- 문자
VARCHAR(255), TEXT, CHAR(10)

-- 날짜/시간
DATE, TIME, TIMESTAMP, TIMESTAMPTZ

-- Boolean
BOOLEAN

-- JSON
JSON, JSONB

-- 기타
UUID, ARRAY, ENUM

복사
5️⃣ Supabase 시작하기
Supabase란?
오픈소스 Firebase 대안
PostgreSQL 기반
인증, 실시간, 스토리지 내장
Supabase 기능
기능	설명
Database	PostgreSQL
Auth	인증 시스템
Storage	파일 저장
Realtime	실시간 구독
Edge Functions	서버리스 함수
프로젝트 생성
supabase.com 가입
"New Project" 클릭
프로젝트 이름, 비밀번호 설정
리전 선택 (Northeast Asia 권장)
테이블 생성 (SQL Editor)
-- users 테이블
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- posts 테이블
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_status ON posts(status);

복사
6️⃣ Next.js + Supabase 연동
패키지 설치
npm install @supabase/supabase-js

복사
환경변수 설정
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

복사
Supabase 클라이언트 설정
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

복사
타입 정의
// types/database.ts
export interface User {
  id: string
  email: string
  name: string
  avatar_url: string | null
  created_at: string
}

export interface Post {
  id: string
  user_id: string
  title: string
  content: string | null
  status: string
  created_at: string
  updated_at: string
}

복사
CRUD 예제
import { supabase } from '@/lib/supabase'

// 조회 (Read)
async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// 상세 조회 + 관계
async function getPostWithUser(id: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      user:users (id, name, email)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// 생성 (Create)
async function createPost(post: { title: string; content: string; user_id: string }) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()

  if (error) throw error
  return data
}

// 수정 (Update)
async function updatePost(id: string, updates: Partial<Post>) {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// 삭제 (Delete)
async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

복사
7️⃣ RLS (Row Level Security)
RLS란?
행 수준 보안
사용자별로 접근 가능한 데이터 제한
서버 측에서 강제
RLS 활성화
-- RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 정책 생성: 모든 사용자 읽기 허용
CREATE POLICY "Public posts are visible to everyone"
ON posts FOR SELECT
USING (status = 'published');

-- 정책: 작성자만 수정/삭제
CREATE POLICY "Users can update own posts"
ON posts FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
ON posts FOR DELETE
USING (auth.uid() = user_id);

-- 정책: 로그인한 사용자만 작성
CREATE POLICY "Authenticated users can insert"
ON posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

복사
RLS 정책 예시
-- 1. 누구나 읽기
CREATE POLICY "Anyone can read"
ON posts FOR SELECT
USING (true);

-- 2. 본인 데이터만 읽기
CREATE POLICY "Users can view own data"
ON profiles FOR SELECT
USING (auth.uid() = user_id);

-- 3. 관리자는 모든 것 가능
CREATE POLICY "Admins have full access"
ON posts FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

복사
8️⃣ 실습: 게시판 DB 연동
테이블 생성
-- SQL Editor에서 실행

-- 프로필 테이블
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 게시글 테이블
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 정책
CREATE POLICY "Profiles are viewable by everyone"
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Published posts are viewable"
ON posts FOR SELECT USING (published = true);

CREATE POLICY "Authors can manage own posts"
ON posts FOR ALL USING (auth.uid() = author_id);

복사
API 구현
// app/api/posts/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // 서버 측에서는 서비스 키 사용
)

export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles (username, avatar_url)
    `)
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ posts: data })
}

export async function POST(request: Request) {
  const body = await request.json()

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: body.title,
      content: body.content,
      author_id: body.author_id,
      published: body.published ?? false
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ post: data }, { status: 201 })
}

복사
페이지 구현
// app/posts/page.tsx
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function PostsPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles (username)
    `)
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    return <div>에러: {error.message}</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">게시판</h1>

      <div className="space-y-4">
        {posts?.map(post => (
          <article
            key={post.id}
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <div className="text-sm text-gray-500 mt-2">
                {post.author?.username} · {new Date(post.created_at).toLocaleDateString()}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

복사
✅ 오늘 배운 것 정리
항목	내용
DB 기초	테이블, 컬럼, 로우, 관계
SQL	SELECT, INSERT, UPDATE, DELETE
PostgreSQL	고급 관계형 DB
Supabase	PostgreSQL + 인증 + 실시간
연동	Next.js + Supabase CRUD
RLS	행 수준 보안 정책
📚 과제

댓글 테이블 추가

posts와 1:N 관계
댓글 CRUD 구현

좋아요 기능

likes 테이블 (user_id, post_id)
좋아요 토글 API
🔗 참고 자료
Supabase 공식 문서
PostgreSQL 문서
SQL 튜토리얼

다음 시간: MongoDB + ElasticSearch 개요