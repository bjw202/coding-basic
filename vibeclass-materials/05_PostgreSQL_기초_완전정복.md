PostgreSQL 기초 완전정복

목표: PostgreSQL의 특징과 MySQL과의 차이점, 실전 활용법 정리하기 대상: 바이브코딩 수강생 (입문~중급)

📋 목차
PostgreSQL 개요
설치 및 접속
MySQL과 다른 점
데이터베이스와 스키마
PostgreSQL 전용 데이터 타입
CRUD 기본 쿼리
고급 쿼리 기능
JSON 활용
전문 검색과 확장
실전 예제: Supabase와 함께 쓰기
1️⃣ PostgreSQL 개요
PostgreSQL이란?
┌─────────────────────────────────────────────────┐
│                 PostgreSQL                       │
├─────────────────────────────────────────────────┤
│                                                  │
│   "세계에서 가장 진보된                           │
│    오픈소스 관계형 데이터베이스"                   │
│                                                  │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐   │
│   │  MVCC    │ + │   JSON   │ + │  확장성   │   │
│   │ (동시성) │   │ (NoSQL)  │   │(Extension)│   │
│   └──────────┘   └──────────┘   └──────────┘   │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
왜 PostgreSQL인가?
장점	설명
SQL 표준 준수	가장 표준에 가까운 SQL 구현
고급 데이터 타입	JSON, 배열, 범위, 벡터 등
확장 시스템	pgvector, PostGIS 등 수백 개 확장
MVCC	읽기/쓰기 간섭 없는 동시 처리
데이터 무결성	강력한 제약조건과 트랜잭션
무료 & 제한 없음	상용 기능도 모두 무료
PostgreSQL이 강한 분야
┌──────────────────────────────────────────────┐
│              PostgreSQL 활용 분야              │
├──────────────────────────────────────────────┤
│                                               │
│  🏦 금융/핀테크    → ACID 트랜잭션, 정밀 계산  │
│  📊 데이터 분석    → 윈도우 함수, CTE          │
│  🗺️ 지리 정보     → PostGIS 확장              │
│  🤖 AI/벡터 검색  → pgvector 확장              │
│  📱 BaaS 플랫폼   → Supabase 기반             │
│  🏢 엔터프라이즈   → 복잡한 비즈니스 로직       │
│                                               │
└──────────────────────────────────────────────┘

클릭하여 복사
복사
2️⃣ 설치 및 접속
macOS 설치
# Homebrew로 설치
brew install postgresql@16

# 서비스 시작
brew services start postgresql@16

# 접속 (기본 사용자)
psql postgres

복사
Ubuntu/Linux 설치
# 패키지 설치
sudo apt update
sudo apt install postgresql postgresql-contrib

# 서비스 시작
sudo systemctl start postgresql
sudo systemctl enable postgresql

# postgres 사용자로 접속
sudo -u postgres psql

복사
기본 접속 명령어
# 로컬 접속
psql -U postgres

# 특정 데이터베이스 접속
psql -U postgres -d myapp

# 원격 서버 접속
psql -h 서버주소 -U 사용자명 -d 데이터베이스명

# 접속 URL 형식 (Node.js에서도 사용)
psql "postgresql://user:password@localhost:5432/myapp"

복사
psql 내부 명령어
-- MySQL과 다른 psql 전용 명령어들!

\l          -- 데이터베이스 목록 (SHOW DATABASES 대신)
\c myapp    -- 데이터베이스 전환 (USE myapp 대신)
\dt         -- 테이블 목록 (SHOW TABLES 대신)
\d users    -- 테이블 구조 (DESCRIBE users 대신)
\di         -- 인덱스 목록
\df         -- 함수 목록
\du         -- 사용자/역할 목록

\x          -- 확장 출력 토글 (세로로 보기)
\timing     -- 쿼리 실행 시간 표시
\q          -- 종료 (EXIT 대신)

복사
3️⃣ MySQL과 다른 점
핵심 차이점 비교
항목	MySQL	PostgreSQL
접속 도구	mysql
클릭하여 복사
	psql
클릭하여 복사

DB 목록	SHOW DATABASES
클릭하여 복사
	\l
클릭하여 복사

테이블 목록	SHOW TABLES
클릭하여 복사
	\dt
클릭하여 복사

구조 확인	DESCRIBE table
클릭하여 복사
	\d table
클릭하여 복사

DB 선택	USE dbname
클릭하여 복사
	\c dbname
클릭하여 복사

자동증가	AUTO_INCREMENT
클릭하여 복사
	SERIAL
클릭하여 복사
 / GENERATED
클릭하여 복사

문자열 따옴표	'문자열'
클릭하여 복사
 또는 "문자열"
클릭하여 복사
	'문자열'
클릭하여 복사
만 (쌍따옴표는 식별자용)
문자열 연결	CONCAT()
클릭하여 복사
	`
LIMIT	LIMIT 10, 20
클릭하여 복사
	LIMIT 20 OFFSET 10
클릭하여 복사

IF 함수	IF(조건, 참, 거짓)
클릭하여 복사
	없음 → CASE WHEN
클릭하여 복사
 사용
ENUM	ENUM('a','b')
클릭하여 복사
	CREATE TYPE
클릭하여 복사
 별도 정의
Boolean	TINYINT(1)
클릭하여 복사
	진짜 BOOLEAN
클릭하여 복사

날짜 차이	DATEDIFF()
클릭하여 복사
	age()
클릭하여 복사
 또는 -
클릭하여 복사
 연산자
자동증가 ID
-- MySQL
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50)
);

-- PostgreSQL
CREATE TABLE users (
  id SERIAL PRIMARY KEY,          -- 전통적 방식
  name VARCHAR(50)
);

-- PostgreSQL (최신 방식, 권장)
CREATE TABLE users (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(50)
);

복사
ENUM 타입
-- MySQL: 컬럼에 직접 정의
CREATE TABLE users (
  role ENUM('admin', 'user', 'instructor')
);

-- PostgreSQL: 타입을 먼저 만들고 사용
CREATE TYPE user_role AS ENUM ('admin', 'user', 'instructor');
CREATE TABLE users (
  role user_role DEFAULT 'user'
);

복사
따옴표 규칙
-- PostgreSQL에서 따옴표 규칙 (매우 중요!)

-- 작은따옴표: 문자열 값
SELECT * FROM users WHERE name = '김철수';

-- 쌍따옴표: 식별자 (테이블명, 컬럼명)
SELECT "Name" FROM "Users";  -- 대소문자 구분 시

-- 주의: 쌍따옴표로 문자열 쓰면 에러!
SELECT * FROM users WHERE name = "김철수";  -- ❌ 에러!

복사
4️⃣ 데이터베이스와 스키마
데이터베이스 관리
-- 데이터베이스 생성
CREATE DATABASE myapp;

-- UTF-8 데이터베이스 생성
CREATE DATABASE myapp
  ENCODING 'UTF8'
  LC_COLLATE 'ko_KR.UTF-8'
  LC_CTYPE 'ko_KR.UTF-8'
  TEMPLATE template0;

-- 데이터베이스 삭제
DROP DATABASE myapp;

-- 데이터베이스 전환 (psql에서)
\c myapp

복사
스키마 (MySQL에 없는 개념)
PostgreSQL 구조:
  서버 (Cluster)
    └── 데이터베이스 (Database)
         └── 스키마 (Schema)        ← MySQL에 없음!
              └── 테이블 (Table)

스키마 = 테이블을 논리적으로 그룹화하는 폴더

클릭하여 복사
복사
-- 스키마 생성
CREATE SCHEMA app;
CREATE SCHEMA auth;

-- 스키마 안에 테이블 생성
CREATE TABLE app.courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL
);

CREATE TABLE auth.users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE
);

-- 기본 스키마는 public
SELECT * FROM public.users;
-- = SELECT * FROM users;  (public 생략 가능)

복사
사용자와 권한
-- 사용자 생성
CREATE USER myuser WITH PASSWORD 'mypassword';

-- 데이터베이스 권한 부여
GRANT ALL PRIVILEGES ON DATABASE myapp TO myuser;

-- 스키마 권한 부여
GRANT USAGE ON SCHEMA public TO myuser;
GRANT ALL ON ALL TABLES IN SCHEMA public TO myuser;

-- 사용자 확인
\du

복사
5️⃣ PostgreSQL 전용 데이터 타입
배열 (Array)
-- 배열 컬럼 생성
CREATE TABLE courses (
  id    SERIAL PRIMARY KEY,
  title VARCHAR(200),
  tags  TEXT[]                -- 문자열 배열
);

-- 배열 데이터 삽입
INSERT INTO courses (title, tags)
VALUES ('Next.js 마스터', ARRAY['nextjs', 'react', 'fullstack']);
-- 또는
VALUES ('Next.js 마스터', '{"nextjs", "react", "fullstack"}');

-- 배열 조회
SELECT title, tags[1] AS first_tag FROM courses;

-- 배열에 특정 값 포함 확인
SELECT * FROM courses WHERE 'react' = ANY(tags);
SELECT * FROM courses WHERE tags @> ARRAY['react'];

복사
UUID
-- UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- UUID를 PK로 사용
CREATE TABLE users (
  id    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name  VARCHAR(50)
);

-- 삽입 (자동 생성)
INSERT INTO users (name) VALUES ('김철수');
-- id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'

복사
JSONB (바이너리 JSON)
-- JSONB 컬럼 (JSON보다 빠름, 인덱스 가능)
CREATE TABLE settings (
  id    SERIAL PRIMARY KEY,
  data  JSONB NOT NULL DEFAULT '{}'
);

-- 상세 내용은 8장 JSON 활용 참고

복사
범위 타입 (Range)
-- 날짜 범위
CREATE TABLE schedules (
  id     SERIAL PRIMARY KEY,
  title  VARCHAR(100),
  period DATERANGE
);

INSERT INTO schedules (title, period)
VALUES ('1기', '[2026-03-01, 2026-04-30]');

-- 특정 날짜가 범위에 포함되는지 확인
SELECT * FROM schedules WHERE period @> '2026-03-15'::date;

-- 범위 겹침 확인
SELECT * FROM schedules WHERE period && '[2026-04-01, 2026-05-01]';

복사
데이터 타입 비교표
타입	MySQL 대응	설명
SERIAL
클릭하여 복사
	INT AUTO_INCREMENT
클릭하여 복사
	자동증가 정수
BOOLEAN
클릭하여 복사
	TINYINT(1)
클릭하여 복사
	진짜 true/false
TEXT[]
클릭하여 복사
	없음	배열
UUID
클릭하여 복사
	CHAR(36)
클릭하여 복사
	고유 식별자
JSONB
클릭하여 복사
	JSON
클릭하여 복사
	바이너리 JSON (인덱스 가능)
DATERANGE
클릭하여 복사
	없음	날짜 범위
INET
클릭하여 복사
	VARCHAR
클릭하여 복사
	IP 주소
MONEY
클릭하여 복사
	DECIMAL
클릭하여 복사
	통화
BYTEA
클릭하여 복사
	BLOB
클릭하여 복사
	바이너리 데이터
6️⃣ CRUD 기본 쿼리
INSERT (삽입)
-- 기본 삽입
INSERT INTO users (name, email, role)
VALUES ('김철수', 'kim@example.com', 'user');

-- 삽입 후 결과 반환 (MySQL에 없는 기능!)
INSERT INTO users (name, email, role)
VALUES ('이영희', 'lee@example.com', 'user')
RETURNING id, name, created_at;
-- → 삽입된 id를 바로 알 수 있음

-- 충돌 시 처리 (UPSERT)
INSERT INTO users (email, name)
VALUES ('kim@example.com', '김철수(수정)')
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;
-- → email이 이미 있으면 UPDATE, 없으면 INSERT

복사
SELECT (조회)
-- MySQL과 대부분 동일
SELECT * FROM users WHERE role = 'admin';

-- 문자열 연결 (PostgreSQL 방식)
SELECT name || ' (' || email || ')' AS info FROM users;
-- MySQL: CONCAT(name, ' (', email, ')')

-- 날짜 계산
SELECT name, age(created_at) AS 가입기간 FROM users;
-- 결과: "1 year 3 mons 15 days"

SELECT name, NOW() - created_at AS 가입경과 FROM users;
-- 결과: interval 형식

복사
UPDATE (수정)
-- 기본 수정
UPDATE users SET name = '김철수(수정)' WHERE id = 1;

-- 수정 후 결과 반환 (MySQL에 없는 기능!)
UPDATE users SET role = 'admin' WHERE id = 1
RETURNING id, name, role;

-- 다른 테이블 참조해서 수정
UPDATE enrollments e
SET status = 'cancelled'
FROM users u
WHERE e.user_id = u.id AND u.role = 'deactivated';

복사
DELETE (삭제)
-- 기본 삭제
DELETE FROM users WHERE id = 5;

-- 삭제 후 결과 반환
DELETE FROM users WHERE id = 5
RETURNING id, name, email;

-- 다른 테이블 참조해서 삭제
DELETE FROM enrollments
USING users
WHERE enrollments.user_id = users.id AND users.role = 'deactivated';

복사

RETURNING 절: PostgreSQL만의 강력한 기능으로, INSERT/UPDATE/DELETE 후 결과를 바로 받을 수 있어 추가 SELECT가 불필요합니다.

7️⃣ 고급 쿼리 기능
CTE (Common Table Expression)
-- WITH 절로 복잡한 쿼리를 단계별로 작성
WITH monthly_revenue AS (
  SELECT
    DATE_TRUNC('month', paid_at) AS month,
    SUM(amount) AS revenue
  FROM payments
  WHERE status = 'completed'
  GROUP BY DATE_TRUNC('month', paid_at)
),
monthly_enrollments AS (
  SELECT
    DATE_TRUNC('month', created_at) AS month,
    COUNT(*) AS new_enrollments
  FROM enrollments
  GROUP BY DATE_TRUNC('month', created_at)
)
SELECT
  r.month,
  r.revenue,
  e.new_enrollments
FROM monthly_revenue r
LEFT JOIN monthly_enrollments e ON r.month = e.month
ORDER BY r.month DESC;

복사
윈도우 함수
-- 순위 매기기
SELECT
  name,
  SUM(amount) AS 총매출,
  RANK() OVER (ORDER BY SUM(amount) DESC) AS 매출순위
FROM instructors i
JOIN courses c ON i.id = c.instructor_id
JOIN enrollments e ON c.id = e.course_id
JOIN payments p ON e.id = p.enrollment_id
WHERE p.status = 'completed'
GROUP BY i.id, name;

-- 누적 합계
SELECT
  DATE_TRUNC('month', paid_at) AS month,
  SUM(amount) AS 월매출,
  SUM(SUM(amount)) OVER (ORDER BY DATE_TRUNC('month', paid_at)) AS 누적매출
FROM payments
WHERE status = 'completed'
GROUP BY DATE_TRUNC('month', paid_at);

-- 이전 행 비교 (전월 대비)
SELECT
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) AS 전월매출,
  revenue - LAG(revenue) OVER (ORDER BY month) AS 증감
FROM monthly_revenue;

복사
LATERAL JOIN
-- 각 강의의 최근 수강생 3명씩 조회
SELECT c.title, recent.*
FROM courses c
CROSS JOIN LATERAL (
  SELECT u.name, e.created_at
  FROM enrollments e
  JOIN users u ON e.user_id = u.id
  WHERE e.course_id = c.id
  ORDER BY e.created_at DESC
  LIMIT 3
) recent;

복사
FILTER 절
-- 조건별 집계를 한 쿼리에서 처리
SELECT
  COUNT(*) AS 전체,
  COUNT(*) FILTER (WHERE status = 'confirmed') AS 확정,
  COUNT(*) FILTER (WHERE status = 'pending') AS 대기,
  COUNT(*) FILTER (WHERE status = 'cancelled') AS 취소
FROM enrollments;
-- MySQL이었다면 CASE WHEN을 3번 써야 함

복사
8️⃣ JSON 활용
JSON vs JSONB
항목	JSON	JSONB
저장	텍스트 그대로	바이너리 변환
인덱스	❌	✅ GIN 인덱스
속도 (읽기)	느림	빠름
속도 (쓰기)	빠름	약간 느림
키 순서 보존	✅	❌
중복 키	허용	마지막 값만 유지
권장	거의 안 씀	대부분 JSONB 사용
JSONB 기본 사용
-- 테이블 생성
CREATE TABLE user_settings (
  user_id  INT PRIMARY KEY,
  settings JSONB DEFAULT '{}'
);

-- 데이터 삽입
INSERT INTO user_settings VALUES (1, '{
  "theme": "dark",
  "language": "ko",
  "notifications": {
    "email": true,
    "sms": false,
    "push": true
  },
  "interests": ["nextjs", "react", "ai"]
}');

복사
JSONB 조회
-- 값 추출 (-> 연산자: JSON 반환)
SELECT settings->'theme' FROM user_settings WHERE user_id = 1;
-- 결과: "dark" (따옴표 포함)

-- 값 추출 (->> 연산자: 텍스트 반환)
SELECT settings->>'theme' FROM user_settings WHERE user_id = 1;
-- 결과: dark (따옴표 없음)

-- 중첩 값 추출
SELECT settings->'notifications'->>'email' FROM user_settings;
-- 결과: true

-- 경로로 추출
SELECT settings #>> '{notifications, email}' FROM user_settings;
-- 결과: true

-- 배열 요소 접근
SELECT settings->'interests'->>0 FROM user_settings;
-- 결과: nextjs

복사
JSONB 수정
-- 키 추가/수정
UPDATE user_settings
SET settings = settings || '{"theme": "light"}'
WHERE user_id = 1;

-- 중첩 값 수정
UPDATE user_settings
SET settings = jsonb_set(settings, '{notifications, sms}', 'true')
WHERE user_id = 1;

-- 키 삭제
UPDATE user_settings
SET settings = settings - 'theme'
WHERE user_id = 1;

-- 중첩 키 삭제
UPDATE user_settings
SET settings = settings #- '{notifications, push}'
WHERE user_id = 1;

복사
JSONB 검색 및 인덱스
-- 특정 키-값 포함 여부 (@> 연산자)
SELECT * FROM user_settings
WHERE settings @> '{"theme": "dark"}';

-- 배열에 값 포함 확인
SELECT * FROM user_settings
WHERE settings->'interests' ? 'react';

-- GIN 인덱스 (JSONB 검색 성능 향상)
CREATE INDEX idx_settings ON user_settings USING GIN (settings);

-- 특정 경로에 인덱스
CREATE INDEX idx_theme ON user_settings USING BTREE ((settings->>'theme'));

복사
9️⃣ 전문 검색과 확장
전문 검색 (Full-Text Search)
-- 한국어 전문 검색 (기본)
SELECT * FROM courses
WHERE to_tsvector('simple', title) @@ to_tsquery('simple', 'Next.js');

-- 검색 인덱스 생성
CREATE INDEX idx_courses_search
ON courses USING GIN (to_tsvector('simple', title || ' ' || COALESCE(description, '')));

-- 검색 쿼리
SELECT title, ts_rank(
  to_tsvector('simple', title || ' ' || COALESCE(description, '')),
  to_tsquery('simple', '바이브 & 코딩')
) AS rank
FROM courses
WHERE to_tsvector('simple', title || ' ' || COALESCE(description, ''))
  @@ to_tsquery('simple', '바이브 & 코딩')
ORDER BY rank DESC;

복사
주요 확장 (Extensions)
-- 설치된 확장 목록
SELECT * FROM pg_available_extensions;

-- 확장 설치
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";     -- UUID 생성
CREATE EXTENSION IF NOT EXISTS "pgcrypto";       -- 암호화
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- 유사 문자열 검색

복사
pgvector (AI 벡터 검색)
-- 벡터 확장 설치
CREATE EXTENSION IF NOT EXISTS vector;

-- 벡터 컬럼이 있는 테이블
CREATE TABLE documents (
  id        SERIAL PRIMARY KEY,
  content   TEXT,
  embedding VECTOR(1536)    -- OpenAI 임베딩 차원
);

-- 벡터 인덱스 (HNSW)
CREATE INDEX ON documents
USING hnsw (embedding vector_cosine_ops);

-- 유사도 검색 (코사인 유사도)
SELECT content,
       1 - (embedding <=> '[0.1, 0.2, ...]') AS similarity
FROM documents
ORDER BY embedding <=> '[0.1, 0.2, ...]'
LIMIT 5;

복사

pgvector는 바이브클래스 AI 챗봇의 RAG 시스템에서도 사용됩니다.

🔟 실전 예제: Supabase와 함께 쓰기
Supabase란?
┌─────────────────────────────────────────────┐
│              Supabase                        │
├─────────────────────────────────────────────┤
│                                              │
│   "Firebase의 오픈소스 대안"                  │
│   PostgreSQL 기반 BaaS (Backend as a Service)│
│                                              │
│   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  │
│   │ DB   │  │ Auth │  │Storage│  │ Edge │  │
│   │(PgSQL)│  │(인증)│  │(파일) │  │(함수)│  │
│   └──────┘  └──────┘  └──────┘  └──────┘  │
│                                              │
└─────────────────────────────────────────────┘

클릭하여 복사
복사
Supabase에서 PostgreSQL 사용
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

// SELECT
const { data: users } = await supabase
  .from('users')
  .select('id, name, email')
  .eq('role', 'user')
  .order('created_at', { ascending: false })
  .limit(10)

// INSERT (RETURNING 자동 적용)
const { data: newUser } = await supabase
  .from('users')
  .insert({ name: '김철수', email: 'kim@example.com' })
  .select()  // RETURNING *

// UPSERT (ON CONFLICT)
const { data } = await supabase
  .from('settings')
  .upsert({ user_id: 1, theme: 'dark' })
  .select()

// JSONB 필터
const { data: darkUsers } = await supabase
  .from('user_settings')
  .select()
  .contains('settings', { theme: 'dark' })

복사
RLS (Row Level Security)
-- 행 수준 보안: 사용자가 자신의 데이터만 볼 수 있게
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- 정책 생성: 자신의 수강 정보만 조회 가능
CREATE POLICY "Users can view own enrollments"
ON enrollments FOR SELECT
USING (user_id = auth.uid());

-- 정책 생성: 자신만 수강 신청 가능
CREATE POLICY "Users can insert own enrollments"
ON enrollments FOR INSERT
WITH CHECK (user_id = auth.uid());

복사
📚 핵심 정리
MySQL vs PostgreSQL 선택 가이드
MySQL을 선택하는 경우:
├── 빠른 읽기 성능이 중요할 때
├── 간단한 CRUD 위주 서비스
├── WordPress, PHP 생태계
└── 학습 비용을 최소화하고 싶을 때

PostgreSQL을 선택하는 경우:
├── 복잡한 쿼리/분석이 필요할 때
├── JSON 데이터를 많이 다룰 때
├── AI/벡터 검색이 필요할 때 (pgvector)
├── Supabase를 사용할 때
└── 데이터 무결성이 매우 중요할 때

클릭하여 복사
복사
PostgreSQL만의 핵심 기능
기능	설명
RETURNING	INSERT/UPDATE/DELETE 결과 즉시 반환
UPSERT	ON CONFLICT
클릭하여 복사
 - 충돌 시 자동 UPDATE
JSONB	인덱스 가능한 JSON + 다양한 연산자
배열	TEXT[]
클릭하여 복사
, INT[]
클릭하여 복사
 등 네이티브 배열
CTE	WITH
클릭하여 복사
 절 (MySQL 8.0+에도 있음)
윈도우 함수	RANK
클릭하여 복사
, LAG
클릭하여 복사
, SUM OVER
클릭하여 복사

FILTER	조건별 집계
스키마	논리적 테이블 그룹화
확장	pgvector, PostGIS 등

다음 단계: SQL을 직접 작성하지 않고 JavaScript/TypeScript로 DB를 다루려면 ORM을 사용합니다. → 06_ORM_실전가이드
클릭하여 복사
 참고