Node.js 데이터베이스 연동과 ORM 실전가이드

목표: Node.js에서 DB를 호출하는 방법과 ORM의 특징, 왜 사용하는지 이해하기 대상: 바이브코딩 수강생 (입문~중급)

📋 목차
Node.js에서 DB 연결하기
SQL 직접 호출 방식
ORM이란 무엇인가
왜 ORM을 사용하는가
Prisma 실전 가이드
Prisma CRUD 완전정복
관계(Relation) 다루기
마이그레이션과 스키마 관리
쿼리 빌더: Knex.js
ORM vs 쿼리빌더 vs Raw SQL 선택 가이드
1️⃣ Node.js에서 DB 연결하기
전체 그림
┌──────────────────────────────────────────────────────────┐
│                    Node.js 애플리케이션                     │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  방법 1: Raw SQL (직접 작성)                               │
│  ┌─────────┐                                              │
│  │ mysql2   │──── SQL 문자열 ────▶ MySQL                  │
│  │ pg       │──── SQL 문자열 ────▶ PostgreSQL             │
│  └─────────┘                                              │
│                                                           │
│  방법 2: 쿼리 빌더 (JavaScript로 SQL 생성)                  │
│  ┌─────────┐                                              │
│  │ Knex.js  │──── JS → SQL 변환 ──▶ MySQL/PG/SQLite      │
│  └─────────┘                                              │
│                                                           │
│  방법 3: ORM (객체로 DB 조작)                               │
│  ┌─────────┐                                              │
│  │ Prisma   │──── 모델 → SQL ────▶ MySQL/PG/SQLite/등    │
│  │ Drizzle  │──── 타입 → SQL ────▶ MySQL/PG/SQLite/등    │
│  └─────────┘                                              │
│                                                           │
└──────────────────────────────────────────────────────────┘

클릭하여 복사
복사
3가지 방식 비교
방식	예시	SQL 작성	학습 난이도	유연성
Raw SQL	mysql2, pg	직접 작성	⭐ (SQL 알아야 함)	⭐⭐⭐
쿼리 빌더	Knex.js	JS로 조합	⭐⭐	⭐⭐⭐
ORM	Prisma, Drizzle	자동 생성	⭐⭐	⭐⭐
2️⃣ SQL 직접 호출 방식
MySQL 연결 (mysql2)
npm install mysql2

복사
import mysql from 'mysql2/promise'

// 커넥션 풀 생성 (권장)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp',
  waitForConnections: true,
  connectionLimit: 10,      // 최대 동시 연결 수
})

// 기본 조회
async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM users WHERE role = ?', ['user'])
  return rows
}

// 삽입
async function createUser(name, email) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  )
  return result.insertId  // 생성된 ID
}

// 수정
async function updateUser(id, name) {
  const [result] = await pool.query(
    'UPDATE users SET name = ? WHERE id = ?',
    [name, id]
  )
  return result.affectedRows  // 수정된 행 수
}

복사
PostgreSQL 연결 (pg)
npm install pg

복사
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: 'postgresql://user:password@localhost:5432/myapp',
  max: 10,
})

// 기본 조회 ($1, $2로 파라미터)
async function getUsers() {
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE role = $1',
    ['user']
  )
  return rows
}

// 삽입 (RETURNING으로 결과 반환)
async function createUser(name, email) {
  const { rows } = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name',
    [name, email]
  )
  return rows[0]  // { id: 1, name: '김철수' }
}

복사
파라미터 바인딩의 중요성
// ❌ 위험: SQL 인젝션 가능!
const query = `SELECT * FROM users WHERE name = '${userName}'`
// userName이 "'; DROP TABLE users; --" 이면 테이블 삭제됨!

// ✅ 안전: 파라미터 바인딩 사용
const [rows] = await pool.query(
  'SELECT * FROM users WHERE name = ?',  // MySQL
  [userName]
)

const { rows } = await pool.query(
  'SELECT * FROM users WHERE name = $1',  // PostgreSQL
  [userName]
)

복사
커넥션 풀이란?
커넥션 풀 없이:
요청1 → 연결 생성 → 쿼리 → 연결 종료   (느림)
요청2 → 연결 생성 → 쿼리 → 연결 종료   (느림)
요청3 → 연결 생성 → 쿼리 → 연결 종료   (느림)

커넥션 풀 사용:
                ┌── 연결1 ◀── 요청1
풀 (미리 연결) ─┼── 연결2 ◀── 요청2    (빠름!)
                └── 연결3 ◀── 요청3
                요청 끝나면 연결을 풀에 반납

클릭하여 복사
복사
3️⃣ ORM이란 무엇인가
ORM (Object-Relational Mapping) 개념
ORM = 객체(Object)와 관계형 DB(Relational)를 연결(Mapping)하는 도구

┌─────────────────────┐         ┌─────────────────────┐
│   JavaScript 객체    │         │    DB 테이블          │
├─────────────────────┤         ├─────────────────────┤
│                      │         │                      │
│  const user = {      │  ◀═══▶  │  users 테이블         │
│    id: 1,            │   ORM   │  ┌────┬──────┬─────┐│
│    name: '김철수',    │  변환   │  │ id │ name │email││
│    email: 'kim@...'  │         │  │  1 │김철수 │kim@ ││
│  }                   │         │  └────┴──────┴─────┘│
│                      │         │                      │
└─────────────────────┘         └─────────────────────┘

SQL을 직접 쓰는 대신 JavaScript 코드로 DB를 조작!

클릭하여 복사
복사
ORM을 쓰면 어떻게 달라지나?
// ❌ Raw SQL: SQL 문자열을 직접 작성
const [rows] = await pool.query(`
  SELECT u.name, c.title
  FROM users u
  INNER JOIN enrollments e ON u.id = e.user_id
  INNER JOIN courses c ON e.course_id = c.id
  WHERE u.id = ? AND e.status = 'confirmed'
`, [userId])

// ✅ Prisma ORM: JavaScript 객체로 표현
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    enrollments: {
      where: { status: 'confirmed' },
      include: { course: true }
    }
  }
})
// → user.enrollments[0].course.title 로 접근

복사
Node.js ORM 종류
ORM	특징	타입 안전	인기도
Prisma	스키마 기반, 직관적	⭐⭐⭐	⭐⭐⭐
Drizzle	SQL에 가까운 문법	⭐⭐⭐	⭐⭐
TypeORM	데코레이터 기반	⭐⭐	⭐⭐
Sequelize	전통적 ORM	⭐	⭐⭐
Kysely	타입 안전 쿼리 빌더	⭐⭐⭐	⭐

바이브클래스는 Prisma를 사용합니다.

4️⃣ 왜 ORM을 사용하는가
ORM의 장점
1. 타입 안전성 (TypeScript)
// Prisma: 자동 타입 추론
const user = await prisma.user.findUnique({
  where: { id: 1 },
  select: { name: true, email: true }
})
// user의 타입: { name: string, email: string } | null
// → IDE에서 자동완성, 오타 시 컴파일 에러

// Raw SQL: 타입을 모름
const [rows] = await pool.query('SELECT naem FROM users WHERE id = ?', [1])
// 'naem' 오타를 잡지 못함 → 런타임에서야 발견

복사
2. SQL 인젝션 자동 방지
// ORM은 내부적으로 항상 파라미터 바인딩 사용
const user = await prisma.user.findMany({
  where: { name: userInput }  // 자동으로 안전하게 처리
})

복사
3. DB 독립성
// Prisma 스키마만 바꾸면 MySQL → PostgreSQL 전환 가능
// schema.prisma
datasource db {
  provider = "mysql"      // → "postgresql"로 변경
  url      = env("DATABASE_URL")
}

// 코드 변경 없이 다른 DB로 전환!

복사
4. 마이그레이션 관리
# 스키마 변경 → 자동으로 마이그레이션 SQL 생성
npx prisma migrate dev --name add_phone_field

# 생성된 마이그레이션:
# ALTER TABLE users ADD COLUMN phone VARCHAR(20);

# 팀원과 공유 → 같은 마이그레이션 적용
npx prisma migrate deploy

복사
5. 관계 탐색이 쉬움
// 한 번에 관련 데이터 모두 조회
const course = await prisma.course.findUnique({
  where: { id: 1 },
  include: {
    instructor: true,           // 강사 정보
    enrollments: {              // 수강 목록
      include: {
        user: true,             // 수강생 정보
        payments: true          // 결제 정보
      }
    }
  }
})

// course.instructor.name
// course.enrollments[0].user.email
// course.enrollments[0].payments[0].amount

복사
ORM의 단점
단점	설명	해결법
학습 비용	ORM 자체 문법 학습 필요	SQL 기초 먼저 학습
복잡한 쿼리	아주 복잡한 쿼리는 표현 어려움	Raw SQL 혼용
성능 오버헤드	불필요한 JOIN/SELECT 가능	select로 필요한 필드만
N+1 문제	반복 쿼리 발생 가능	include로 한 번에 조회
추상화 한계	DB 고유 기능 사용 제한	Raw SQL 혼용
N+1 문제란?
// ❌ N+1 문제: 강의 N개에 대해 N번 추가 쿼리
const courses = await prisma.course.findMany()
for (const course of courses) {
  // 각 강의마다 강사 조회 쿼리 실행 → 총 N+1회 쿼리!
  const instructor = await prisma.user.findUnique({
    where: { id: course.instructorId }
  })
}

// ✅ 해결: include로 한 번에 조회 (1회 쿼리)
const courses = await prisma.course.findMany({
  include: { instructor: true }
})
// courses[0].instructor.name → 추가 쿼리 없음

복사
5️⃣ Prisma 실전 가이드
Prisma란?
┌─────────────────────────────────────────────────┐
│                    Prisma                         │
├─────────────────────────────────────────────────┤
│                                                  │
│  "차세대 Node.js/TypeScript ORM"                 │
│                                                  │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐   │
│   │  Schema  │ + │  Client  │ + │ Migrate  │   │
│   │ (모델링) │   │ (쿼리)   │   │(마이그레) │   │
│   └──────────┘   └──────────┘   └──────────┘   │
│                                                  │
│   지원 DB: MySQL, PostgreSQL, SQLite, MongoDB    │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
설치 및 초기화
# 설치
npm install prisma @prisma/client

# 초기화 (MySQL 기준)
npx prisma init --datasource-provider mysql

복사
Prisma 스키마 작성
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// 사용자 모델
model User {
  id          Int          @id @default(autoincrement())
  name        String       @db.VarChar(50)
  email       String       @unique @db.VarChar(100)
  password    String       @db.VarChar(255)
  role        Role         @default(user)
  phone       String?      @db.VarChar(20)
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  // 관계
  courses     Course[]     @relation("InstructorCourses")
  enrollments Enrollment[]

  @@map("users")  // 실제 테이블명
}

// 강의 모델
model Course {
  id            Int          @id @default(autoincrement())
  title         String       @db.VarChar(200)
  description   String?      @db.Text
  price         Decimal      @default(0) @db.Decimal(10, 2)
  status        CourseStatus @default(draft)
  instructorId  Int
  createdAt     DateTime     @default(now())

  // 관계
  instructor    User         @relation("InstructorCourses", fields: [instructorId], references: [id])
  enrollments   Enrollment[]

  @@index([instructorId])
  @@map("courses")
}

// 수강 신청 모델
model Enrollment {
  id         Int              @id @default(autoincrement())
  userId     Int
  courseId   Int
  status     EnrollmentStatus @default(pending)
  createdAt  DateTime         @default(now())

  // 관계
  user       User    @relation(fields: [userId], references: [id])
  course     Course  @relation(fields: [courseId], references: [id])
  payments   Payment[]

  @@unique([userId, courseId])
  @@map("enrollments")
}

// 결제 모델
model Payment {
  id           Int           @id @default(autoincrement())
  enrollmentId Int
  amount       Decimal       @db.Decimal(10, 2)
  method       PaymentMethod
  status       PaymentStatus @default(pending)
  paidAt       DateTime?
  createdAt    DateTime      @default(now())

  enrollment   Enrollment    @relation(fields: [enrollmentId], references: [id])

  @@map("payments")
}

// Enum 정의
enum Role {
  admin
  user
  instructor
}

enum CourseStatus {
  draft
  published
  closed
}

enum EnrollmentStatus {
  pending
  confirmed
  cancelled
}

enum PaymentMethod {
  card
  transfer
}

enum PaymentStatus {
  pending
  completed
  refunded
}

복사
Prisma Client 생성 및 사용
# 클라이언트 생성 (스키마 변경 시마다)
npx prisma generate

복사
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

복사
6️⃣ Prisma CRUD 완전정복
CREATE (생성)
// 단일 생성
const user = await prisma.user.create({
  data: {
    name: '김철수',
    email: 'kim@example.com',
    password: 'hashed_password',
    role: 'user',
  }
})
// user.id → 자동 생성된 ID

// 관계와 함께 생성
const course = await prisma.course.create({
  data: {
    title: 'Next.js 풀스택',
    description: '처음부터 배포까지',
    price: 99000,
    instructor: {
      connect: { id: 1 }  // 기존 사용자와 연결
    }
  }
})

// 여러 개 한 번에 생성
const count = await prisma.user.createMany({
  data: [
    { name: '이영희', email: 'lee@example.com', password: 'hash1' },
    { name: '박민수', email: 'park@example.com', password: 'hash2' },
  ],
  skipDuplicates: true,  // 중복 무시
})
// count.count → 생성된 수

복사
READ (조회)
// 단일 조회 (고유 필드로)
const user = await prisma.user.findUnique({
  where: { id: 1 }
})
// 또는
const user = await prisma.user.findUnique({
  where: { email: 'kim@example.com' }
})

// 첫 번째 매칭 조회
const admin = await prisma.user.findFirst({
  where: { role: 'admin' }
})

// 여러 개 조회
const users = await prisma.user.findMany({
  where: { role: 'user' },
  orderBy: { createdAt: 'desc' },
  take: 10,      // LIMIT
  skip: 20,      // OFFSET
})

// 특정 필드만 선택
const names = await prisma.user.findMany({
  select: {
    name: true,
    email: true,
  }
})
// 타입: { name: string, email: string }[]

// 개수 조회
const count = await prisma.user.count({
  where: { role: 'user' }
})

복사
필터링 (WHERE 조건)
// 다양한 조건 연산자
const users = await prisma.user.findMany({
  where: {
    // 일치
    role: 'user',

    // 비교 연산자
    id: { gt: 10 },           // > 10
    id: { gte: 10 },          // >= 10
    id: { lt: 100 },          // < 100
    id: { lte: 100 },         // <= 100

    // 포함
    name: { contains: '김' },  // LIKE '%김%'
    name: { startsWith: '김' }, // LIKE '김%'
    name: { endsWith: '수' },   // LIKE '%수'

    // IN
    role: { in: ['admin', 'instructor'] },
    role: { notIn: ['user'] },

    // NULL 체크
    phone: null,              // IS NULL
    phone: { not: null },     // IS NOT NULL

    // AND (기본)
    AND: [
      { role: 'user' },
      { phone: { not: null } },
    ],

    // OR
    OR: [
      { role: 'admin' },
      { role: 'instructor' },
    ],

    // NOT
    NOT: { role: 'user' },
  }
})

복사
UPDATE (수정)
// 단일 수정
const user = await prisma.user.update({
  where: { id: 1 },
  data: { role: 'admin' },
})

// 여러 개 수정
const result = await prisma.user.updateMany({
  where: { role: 'instructor', createdAt: { lt: new Date('2025-01-01') } },
  data: { role: 'user' },
})
// result.count → 수정된 수

// 숫자 증감
const payment = await prisma.payment.update({
  where: { id: 1 },
  data: {
    amount: { increment: 1000 },   // +1000
    // amount: { decrement: 500 },  // -500
    // amount: { multiply: 1.1 },   // ×1.1
  }
})

// UPSERT (없으면 생성, 있으면 수정)
const user = await prisma.user.upsert({
  where: { email: 'kim@example.com' },
  update: { name: '김철수(수정)' },
  create: { name: '김철수', email: 'kim@example.com', password: 'hash' },
})

복사
DELETE (삭제)
// 단일 삭제
const deleted = await prisma.user.delete({
  where: { id: 5 },
})

// 여러 개 삭제
const result = await prisma.user.deleteMany({
  where: { role: 'user', createdAt: { lt: new Date('2024-01-01') } },
})
// result.count → 삭제된 수

복사
집계
// 그룹별 집계
const stats = await prisma.payment.groupBy({
  by: ['status'],
  _count: { _all: true },
  _sum: { amount: true },
  _avg: { amount: true },
  where: { createdAt: { gte: new Date('2026-01-01') } },
})
// [
//   { status: 'completed', _count: { _all: 50 }, _sum: { amount: 5000000 } },
//   { status: 'pending', _count: { _all: 10 }, _sum: { amount: 990000 } },
// ]

// 전체 집계
const totals = await prisma.payment.aggregate({
  _count: { _all: true },
  _sum: { amount: true },
  _avg: { amount: true },
  _max: { amount: true },
  _min: { amount: true },
  where: { status: 'completed' },
})

복사
7️⃣ 관계(Relation) 다루기
관계 종류
1:1 (일대일)
User ──── Profile
한 사용자에 하나의 프로필

1:N (일대다) ⭐ 가장 흔함
User ──┬── Enrollment
       ├── Enrollment
       └── Enrollment
한 사용자에 여러 수강 신청

N:M (다대다)
User ──┬──┬── Course
       │  └── Course
User ──┴──┬── Course
          └── Course
여러 사용자가 여러 강의 수강
(중간 테이블 필요: Enrollment)

클릭하여 복사
복사
Prisma에서 관계 정의
// 1:N 관계
model User {
  id          Int          @id @default(autoincrement())
  name        String
  enrollments Enrollment[] // 한 사용자 → 여러 수강
}

model Enrollment {
  id     Int  @id @default(autoincrement())
  userId Int
  user   User @relation(fields: [userId], references: [id])
  // userId가 User.id를 참조 (외래키)
}

복사
관계 데이터 조회 (include)
// 사용자 + 수강 정보 + 강의 정보 한 번에
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    enrollments: {
      where: { status: 'confirmed' },
      include: {
        course: {
          select: { title: true, price: true }
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    }
  }
})

// 결과 구조:
// user.name                              → '김철수'
// user.enrollments[0].course.title       → 'Next.js 풀스택'
// user.enrollments[0].payments[0].amount → 99000

복사
관계 데이터 생성 (connect, create)
// 기존 데이터 연결 (connect)
const enrollment = await prisma.enrollment.create({
  data: {
    user: { connect: { id: 1 } },        // 기존 사용자 연결
    course: { connect: { id: 10 } },      // 기존 강의 연결
    status: 'pending',
  }
})

// 새 데이터와 함께 생성 (create)
const user = await prisma.user.create({
  data: {
    name: '김철수',
    email: 'kim@example.com',
    password: 'hash',
    enrollments: {
      create: [
        { courseId: 10, status: 'confirmed' },
        { courseId: 20, status: 'pending' },
      ]
    }
  },
  include: { enrollments: true },
})

복사
8️⃣ 마이그레이션과 스키마 관리
마이그레이션이란?
마이그레이션 = DB 스키마 변경 이력 관리

v1: 사용자 테이블 생성
    ↓ migrate
v2: phone 컬럼 추가
    ↓ migrate
v3: 결제 테이블 생성
    ↓ migrate
v4: 인덱스 추가

→ 팀원 모두 같은 DB 구조를 유지할 수 있음!

클릭하여 복사
복사
Prisma 마이그레이션 명령어
# 1. 스키마 수정 (schema.prisma 파일 편집)

# 2. 마이그레이션 생성 + 적용 (개발)
npx prisma migrate dev --name add_phone_to_users
# → prisma/migrations/ 폴더에 SQL 파일 생성
# → DB에 자동 적용

# 3. 마이그레이션 적용 (운영)
npx prisma migrate deploy

# 4. DB 초기화 (개발용, 데이터 삭제됨!)
npx prisma migrate reset

# 5. 현재 DB 상태 확인
npx prisma migrate status

# 6. 클라이언트 재생성
npx prisma generate

복사
마이그레이션 파일 예시
prisma/migrations/
├── 20260101000000_init/
│   └── migration.sql         ← 초기 테이블 생성
├── 20260115000000_add_phone/
│   └── migration.sql         ← phone 컬럼 추가
└── migration_lock.toml       ← DB 엔진 잠금

클릭하여 복사
복사
-- 20260115000000_add_phone/migration.sql (자동 생성)
ALTER TABLE `users` ADD COLUMN `phone` VARCHAR(20);

복사
Prisma Studio (시각적 DB 관리)
# 브라우저에서 DB 조회/편집
npx prisma studio
# → http://localhost:5555 에서 열림

복사
9️⃣ 쿼리 빌더: Knex.js
Knex.js란?
┌─────────────────────────────────────────────────┐
│                   Knex.js                        │
├─────────────────────────────────────────────────┤
│                                                  │
│   "SQL을 JavaScript로 조립하는 쿼리 빌더"        │
│                                                  │
│   ORM처럼 모델 없음                               │
│   SQL보다 안전하고 편리                            │
│   복잡한 쿼리도 자유롭게 작성                      │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
설치 및 설정
npm install knex mysql2
# 또는
npm install knex pg

복사
import knex from 'knex'

const db = knex({
  client: 'mysql2',  // 또는 'pg'
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myapp',
  }
})

복사
Knex CRUD
// SELECT
const users = await db('users')
  .select('name', 'email')
  .where('role', 'user')
  .orderBy('created_at', 'desc')
  .limit(10)
  .offset(20)

// INSERT
const [id] = await db('users').insert({
  name: '김철수',
  email: 'kim@example.com',
  password: 'hash',
})

// UPDATE
const count = await db('users')
  .where('id', 1)
  .update({ name: '김철수(수정)' })

// DELETE
const count = await db('users')
  .where('id', 5)
  .del()

// JOIN
const enrollments = await db('enrollments as e')
  .join('users as u', 'e.user_id', 'u.id')
  .join('courses as c', 'e.course_id', 'c.id')
  .select('u.name', 'c.title', 'e.status')
  .where('e.status', 'confirmed')

// 집계
const stats = await db('payments')
  .select('status')
  .count('* as count')
  .sum('amount as total')
  .where('status', 'completed')
  .groupBy('status')

복사
Knex vs Prisma
// 같은 쿼리를 Knex와 Prisma로 비교

// Knex: SQL에 가까운 느낌
const users = await db('users')
  .join('enrollments', 'users.id', 'enrollments.user_id')
  .where('enrollments.status', 'confirmed')
  .select('users.name', db.raw('COUNT(*) as count'))
  .groupBy('users.id')

// Prisma: 객체 지향적
const users = await prisma.user.findMany({
  where: {
    enrollments: { some: { status: 'confirmed' } }
  },
  include: {
    _count: { select: { enrollments: true } }
  }
})

복사
🔟 ORM vs 쿼리빌더 vs Raw SQL 선택 가이드
비교 요약
항목	Raw SQL	쿼리 빌더 (Knex)	ORM (Prisma)
학습	SQL만 알면 됨	SQL + 라이브러리	스키마 + API
타입 안전	❌	❌ (부분적)	✅ 완벽
생산성	⭐	⭐⭐	⭐⭐⭐
유연성	⭐⭐⭐	⭐⭐⭐	⭐⭐
복잡한 쿼리	✅ 자유	✅ 자유	⚠️ 제한적
마이그레이션	❌ 수동	✅ 있음	✅ 있음
관계 탐색	❌ JOIN 직접	❌ JOIN 직접	✅ include
DB 교체	❌ 재작성	✅ 쉬움	✅ 쉬움
N+1 방지	수동	수동	✅ include
언제 무엇을 쓸까?
Raw SQL을 쓰는 경우:
├── DB 전문 지식이 있고 성능 최적화가 중요할 때
├── 매우 복잡한 분석 쿼리
├── DB 고유 기능을 직접 사용해야 할 때
└── 소규모 스크립트나 일회성 작업

쿼리 빌더를 쓰는 경우:
├── SQL을 잘 알고 있지만 안전하게 쓰고 싶을 때
├── 동적 쿼리 생성이 많을 때
├── ORM의 추상화가 과하다고 느낄 때
└── 여러 DB를 지원해야 할 때

ORM을 쓰는 경우 (대부분의 프로젝트에 권장):
├── TypeScript 프로젝트
├── CRUD 위주의 웹 서비스
├── 팀 개발 (일관된 코드 스타일)
├── 빠른 개발 속도가 중요할 때
└── 스키마 변경이 잦을 때

클릭하여 복사
복사
혼용 전략 (실전에서 가장 많이 씀)
// 기본: Prisma ORM 사용
const users = await prisma.user.findMany({
  where: { role: 'user' },
  include: { enrollments: true }
})

// 복잡한 쿼리: Raw SQL 사용
const monthlyStats = await prisma.$queryRaw`
  SELECT
    DATE_FORMAT(p.paid_at, '%Y-%m') AS month,
    COUNT(*) AS count,
    SUM(p.amount) AS total
  FROM payments p
  INNER JOIN enrollments e ON p.enrollment_id = e.id
  WHERE p.status = 'completed'
  GROUP BY DATE_FORMAT(p.paid_at, '%Y-%m')
  ORDER BY month DESC
  LIMIT 12
`

// 트랜잭션: 여러 작업을 하나로 묶기
const result = await prisma.$transaction(async (tx) => {
  // 1. 수강 상태 변경
  const enrollment = await tx.enrollment.update({
    where: { id: enrollmentId },
    data: { status: 'confirmed' },
  })

  // 2. 결제 기록 생성
  const payment = await tx.payment.create({
    data: {
      enrollmentId: enrollment.id,
      amount: 99000,
      method: 'card',
      status: 'completed',
      paidAt: new Date(),
    }
  })

  return { enrollment, payment }
})
// → 하나라도 실패하면 전부 롤백!

복사
📚 핵심 정리
DB 연동 방식 한눈에 보기
Node.js에서 DB 사용하기

1단계: DB 기초 이해
└── SQL 문법 (SELECT, INSERT, UPDATE, DELETE, JOIN)

2단계: 직접 연결 해보기
└── mysql2 또는 pg 라이브러리로 Raw SQL 체험

3단계: ORM으로 전환 ⭐
└── Prisma 스키마 작성 → 자동 타입 → CRUD

4단계: 실전 프로젝트
├── 기본 CRUD → Prisma
├── 복잡한 쿼리 → $queryRaw
└── 마이그레이션 → prisma migrate

클릭하여 복사
복사
ORM을 사용해야 하는 이유 정리
이유	설명
타입 안전성	컴파일 시점에 오류 발견, 자동완성
보안	SQL 인젝션 자동 방지
생산성	SQL 작성 시간 절약, 관계 탐색 쉬움
유지보수	스키마 변경 추적, 마이그레이션 관리
협업	일관된 코드 스타일, 타입 공유
DB 독립성	MySQL ↔ PostgreSQL 전환 용이

결론: SQL 기초를 먼저 익히고, 실전 프로젝트에서는 ORM(Prisma)을 사용하되, 복잡한 쿼리는 Raw SQL을 혼용하는 것이 가장 실용적인 접근입니다.