MySQL 기초 완전정복

목표: MySQL의 설치부터 실전 쿼리까지 한 번에 정리하기 대상: 바이브코딩 수강생 (입문~중급)

📋 목차
MySQL 개요
설치 및 접속
데이터베이스와 테이블
데이터 타입
CRUD 기본 쿼리
조건과 정렬
집계 함수와 그룹화
JOIN - 테이블 연결
인덱스와 성능
실전 예제: 강의 플랫폼 DB 설계
1️⃣ MySQL 개요
MySQL이란?
┌─────────────────────────────────────────────────┐
│                    MySQL                         │
├─────────────────────────────────────────────────┤
│                                                  │
│   "세계에서 가장 많이 사용되는                    │
│    오픈소스 관계형 데이터베이스(RDBMS)"           │
│                                                  │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐   │
│   │  테이블   │ + │   SQL    │ + │  트랜잭션  │   │
│   │ (행+열)   │   │ (질의어) │   │  (ACID)   │   │
│   └──────────┘   └──────────┘   └──────────┘   │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
왜 MySQL인가?
장점	설명
무료 & 오픈소스	커뮤니티 에디션 무료 사용
검증된 안정성	20년+ 역사, 전 세계 기업 사용
쉬운 학습	SQL 표준에 가장 가까운 문법
거대한 생태계	풍부한 도구, 자료, 커뮤니티
높은 호환성	거의 모든 프로그래밍 언어 지원
관계형 데이터베이스 개념
데이터베이스 (Database)
  └── 테이블 (Table)
       ├── 컬럼 (Column) = 속성, 필드
       └── 로우 (Row) = 데이터, 레코드

예시: users 테이블

┌────┬──────────┬──────────────────┬────────┐
│ id │ name     │ email            │ role   │
├────┼──────────┼──────────────────┼────────┤
│  1 │ 김철수   │ kim@example.com  │ admin  │
│  2 │ 이영희   │ lee@example.com  │ user   │
│  3 │ 박민수   │ park@example.com │ user   │
└────┴──────────┴──────────────────┴────────┘
 ↑ 컬럼(열)                         ← 로우(행)

클릭하여 복사
복사
MySQL vs 다른 DB 비교
항목	MySQL	PostgreSQL	SQLite
용도	웹 서비스	복잡한 쿼리	임베디드/소규모
성능	읽기 빠름	쓰기 안정적	가벼움
설치	서버 필요	서버 필요	파일 1개
학습 난이도	⭐⭐	⭐⭐⭐	⭐
주요 사용처	WordPress, 쇼핑몰	금융, 데이터분석	모바일앱, 테스트
2️⃣ 설치 및 접속
macOS 설치
# Homebrew로 설치
brew install mysql

# MySQL 서비스 시작
brew services start mysql

# 보안 설정 (비밀번호 등)
mysql_secure_installation

# 접속
mysql -u root -p

복사
Ubuntu/Linux 설치
# 패키지 업데이트 및 설치
sudo apt update
sudo apt install mysql-server

# 서비스 시작
sudo systemctl start mysql
sudo systemctl enable mysql

# 보안 설정
sudo mysql_secure_installation

# 접속
sudo mysql -u root -p

복사
Windows 설치
1. https://dev.mysql.com/downloads/installer/ 접속
2. MySQL Installer 다운로드
3. "Developer Default" 선택 후 설치
4. root 비밀번호 설정
5. MySQL Workbench 또는 터미널로 접속

클릭하여 복사
복사
기본 접속 명령어
# 로컬 접속
mysql -u root -p

# 원격 서버 접속
mysql -h 서버주소 -u 사용자명 -p

# 특정 데이터베이스에 바로 접속
mysql -u root -p mydb

복사
접속 후 기본 명령어
-- 현재 사용자 확인
SELECT USER();

-- 서버 버전 확인
SELECT VERSION();

-- 데이터베이스 목록
SHOW DATABASES;

-- 접속 종료
EXIT;
-- 또는
QUIT;

복사
3️⃣ 데이터베이스와 테이블
데이터베이스 관리
-- 데이터베이스 생성
CREATE DATABASE myapp;

-- 한글 지원 (UTF-8) 데이터베이스 생성
CREATE DATABASE myapp
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- 데이터베이스 목록 확인
SHOW DATABASES;

-- 데이터베이스 선택 (사용)
USE myapp;

-- 현재 선택된 DB 확인
SELECT DATABASE();

-- 데이터베이스 삭제 (주의!)
DROP DATABASE myapp;

복사
테이블 생성
-- 기본 테이블 생성
CREATE TABLE users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(50) NOT NULL,
  email       VARCHAR(100) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  role        ENUM('admin', 'user', 'instructor') DEFAULT 'user',
  phone       VARCHAR(20),
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

복사
테이블 확인
-- 테이블 목록
SHOW TABLES;

-- 테이블 구조 확인
DESCRIBE users;
-- 또는
DESC users;

-- 테이블 생성 SQL 확인
SHOW CREATE TABLE users;

복사
테이블 수정
-- 컬럼 추가
ALTER TABLE users ADD COLUMN nickname VARCHAR(30);

-- 컬럼 수정
ALTER TABLE users MODIFY COLUMN nickname VARCHAR(50) NOT NULL;

-- 컬럼 이름 변경
ALTER TABLE users CHANGE COLUMN nickname display_name VARCHAR(50);

-- 컬럼 삭제
ALTER TABLE users DROP COLUMN display_name;

-- 테이블 이름 변경
ALTER TABLE users RENAME TO members;

-- 테이블 삭제 (주의!)
DROP TABLE users;

-- 테이블 데이터만 삭제 (구조 유지)
TRUNCATE TABLE users;

복사
4️⃣ 데이터 타입
숫자 타입
타입	범위	용도
TINYINT
클릭하여 복사
	-128 ~ 127	상태값, 플래그
INT
클릭하여 복사
	-21억 ~ 21억	ID, 수량, 일반 숫자
BIGINT
클릭하여 복사
	매우 큰 수	대규모 ID
DECIMAL(M,D)
클릭하여 복사
	정밀 소수	가격, 금액
FLOAT
클릭하여 복사
	부동소수점	근사값 (비추천)
BOOLEAN
클릭하여 복사
	0 또는 1	참/거짓 (TINYINT(1)
클릭하여 복사
)
-- 가격은 DECIMAL 사용 (정확한 계산)
price DECIMAL(10, 2)  -- 최대 99999999.99

-- ID는 INT 또는 BIGINT
id INT AUTO_INCREMENT PRIMARY KEY

복사
문자 타입
타입	최대 길이	용도
CHAR(N)
클릭하여 복사
	255자	고정 길이 (코드, 상태)
VARCHAR(N)
클릭하여 복사
	65,535자	가변 길이 (이름, 이메일)
TEXT
클릭하여 복사
	65,535자	긴 텍스트 (본문)
MEDIUMTEXT
클릭하여 복사
	1,600만자	매우 긴 텍스트
LONGTEXT
클릭하여 복사
	42억자	초대형 텍스트
ENUM(...)
클릭하여 복사
	정해진 값	선택지 (상태, 역할)
-- 일반적인 사용 패턴
name     VARCHAR(50)                             -- 이름
email    VARCHAR(100)                            -- 이메일
content  TEXT                                    -- 게시글 내용
role     ENUM('admin', 'user', 'instructor')     -- 역할 선택

복사
날짜/시간 타입
타입	형식	용도
DATE
클릭하여 복사
	2026-02-16	날짜만
TIME
클릭하여 복사
	14:30:00	시간만
DATETIME
클릭하여 복사
	2026-02-16 14:30:00	날짜+시간
TIMESTAMP
클릭하여 복사
	자동 UTC 변환	생성/수정 시간
-- 날짜/시간 자주 쓰는 패턴
created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
birth_date  DATE
start_time  TIME

복사
JSON 타입
-- JSON 컬럼 (MySQL 5.7+)
CREATE TABLE settings (
  id    INT PRIMARY KEY,
  data  JSON
);

-- JSON 데이터 삽입
INSERT INTO settings VALUES (1, '{"theme": "dark", "lang": "ko"}');

-- JSON 값 조회
SELECT data->'$.theme' FROM settings WHERE id = 1;
-- 결과: "dark"

SELECT JSON_EXTRACT(data, '$.lang') FROM settings WHERE id = 1;
-- 결과: "ko"

복사
5️⃣ CRUD 기본 쿼리
CREATE (삽입)
-- 단일 레코드 삽입
INSERT INTO users (name, email, password, role)
VALUES ('김철수', 'kim@example.com', 'hashed_pw', 'user');

-- 여러 레코드 한 번에 삽입
INSERT INTO users (name, email, password, role) VALUES
  ('이영희', 'lee@example.com', 'hashed_pw', 'user'),
  ('박민수', 'park@example.com', 'hashed_pw', 'instructor'),
  ('최지은', 'choi@example.com', 'hashed_pw', 'admin');

-- 특정 컬럼만 입력 (나머지는 기본값)
INSERT INTO users (name, email, password)
VALUES ('신유리', 'shin@example.com', 'hashed_pw');

복사
READ (조회)
-- 전체 조회
SELECT * FROM users;

-- 특정 컬럼만 조회
SELECT name, email, role FROM users;

-- 별칭(Alias) 사용
SELECT name AS 이름, email AS 이메일 FROM users;

-- 중복 제거
SELECT DISTINCT role FROM users;

-- 개수 제한
SELECT * FROM users LIMIT 10;

-- 건너뛰기 + 제한 (페이지네이션)
SELECT * FROM users LIMIT 10 OFFSET 20;
-- 또는
SELECT * FROM users LIMIT 20, 10;  -- OFFSET, LIMIT 순서

복사
UPDATE (수정)
-- 특정 레코드 수정
UPDATE users SET role = 'admin' WHERE id = 1;

-- 여러 컬럼 수정
UPDATE users SET name = '김철수(수정)', phone = '010-1234-5678' WHERE id = 1;

-- 조건에 맞는 모든 레코드 수정
UPDATE users SET role = 'user' WHERE role = 'instructor' AND created_at < '2025-01-01';

복사

⚠️ 주의: WHERE
클릭하여 복사
 절 없이 UPDATE
클릭하여 복사
 하면 모든 행이 수정됩니다!

DELETE (삭제)
-- 특정 레코드 삭제
DELETE FROM users WHERE id = 5;

-- 조건에 맞는 레코드 삭제
DELETE FROM users WHERE role = 'user' AND created_at < '2024-01-01';

-- 전체 삭제 (주의!)
DELETE FROM users;

-- 전체 삭제 + 자동증가 초기화
TRUNCATE TABLE users;

복사

⚠️ 주의: WHERE
클릭하여 복사
 절 없이 DELETE
클릭하여 복사
 하면 모든 행이 삭제됩니다!

6️⃣ 조건과 정렬
WHERE 조건절
-- 비교 연산자
SELECT * FROM users WHERE role = 'admin';
SELECT * FROM users WHERE id > 10;
SELECT * FROM users WHERE id != 1;
SELECT * FROM users WHERE id BETWEEN 5 AND 10;

-- 논리 연산자
SELECT * FROM users WHERE role = 'user' AND phone IS NOT NULL;
SELECT * FROM users WHERE role = 'admin' OR role = 'instructor';
SELECT * FROM users WHERE NOT role = 'user';

-- IN (여러 값 중 하나)
SELECT * FROM users WHERE role IN ('admin', 'instructor');

-- LIKE (패턴 매칭)
SELECT * FROM users WHERE name LIKE '김%';     -- '김'으로 시작
SELECT * FROM users WHERE email LIKE '%@gmail.com'; -- gmail로 끝남
SELECT * FROM users WHERE name LIKE '%철%';    -- '철' 포함

-- NULL 체크
SELECT * FROM users WHERE phone IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;

복사
ORDER BY 정렬
-- 오름차순 (기본)
SELECT * FROM users ORDER BY name ASC;

-- 내림차순
SELECT * FROM users ORDER BY created_at DESC;

-- 여러 기준으로 정렬
SELECT * FROM users ORDER BY role ASC, created_at DESC;

복사
실전 조합 예제
-- 최근 가입한 활성 사용자 10명
SELECT name, email, created_at
FROM users
WHERE role = 'user' AND phone IS NOT NULL
ORDER BY created_at DESC
LIMIT 10;

복사
7️⃣ 집계 함수와 그룹화
집계 함수
-- 전체 사용자 수
SELECT COUNT(*) AS total_users FROM users;

-- 역할별 사용자 수
SELECT role, COUNT(*) AS count FROM users GROUP BY role;

-- 결제 관련 집계
SELECT
  COUNT(*) AS 총결제건수,
  SUM(amount) AS 총매출,
  AVG(amount) AS 평균결제액,
  MAX(amount) AS 최대결제액,
  MIN(amount) AS 최소결제액
FROM payments
WHERE status = 'completed';

복사
GROUP BY (그룹화)
-- 월별 매출 통계
SELECT
  DATE_FORMAT(created_at, '%Y-%m') AS month,
  COUNT(*) AS 결제건수,
  SUM(amount) AS 매출
FROM payments
WHERE status = 'completed'
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month DESC;

-- 강의별 수강생 수
SELECT
  course_id,
  COUNT(*) AS 수강생수
FROM enrollments
WHERE status = 'confirmed'
GROUP BY course_id
ORDER BY 수강생수 DESC;

복사
HAVING (그룹 조건)
-- 수강생이 5명 이상인 강의만
SELECT
  course_id,
  COUNT(*) AS 수강생수
FROM enrollments
WHERE status = 'confirmed'
GROUP BY course_id
HAVING 수강생수 >= 5
ORDER BY 수강생수 DESC;

복사

WHERE vs HAVING: WHERE
클릭하여 복사
는 그룹화 전 필터, HAVING
클릭하여 복사
은 그룹화 후 필터

8️⃣ JOIN - 테이블 연결
JOIN이 필요한 이유
users 테이블          enrollments 테이블       courses 테이블
┌────┬──────┐        ┌────┬─────┬──────┐     ┌────┬────────────┐
│ id │ name │        │ id │ uid │ cid  │     │ id │ title      │
├────┼──────┤        ├────┼─────┼──────┤     ├────┼────────────┤
│  1 │ 김철수│        │  1 │  1  │  10  │     │ 10 │ Next.js    │
│  2 │ 이영희│        │  2 │  2  │  10  │     │ 20 │ React 기초  │
│  3 │ 박민수│        │  3 │  1  │  20  │     └────┴────────────┘
└────┴──────┘        └────┴─────┴──────┘

→ "김철수가 어떤 강의를 수강하는지?" 답하려면 3개 테이블을 연결해야 함

클릭하여 복사
복사
INNER JOIN (교집합)
-- 수강생과 강의 정보 함께 조회
SELECT
  u.name AS 수강생,
  c.title AS 강의명,
  e.status AS 상태
FROM enrollments e
INNER JOIN users u ON e.user_id = u.id
INNER JOIN courses c ON e.course_id = c.id;

복사
LEFT JOIN (왼쪽 기준)
-- 모든 사용자 + 수강 정보 (수강 없어도 표시)
SELECT
  u.name,
  c.title,
  e.status
FROM users u
LEFT JOIN enrollments e ON u.id = e.user_id
LEFT JOIN courses c ON e.course_id = c.id;

-- 수강 신청 안 한 사용자 찾기
SELECT u.name, u.email
FROM users u
LEFT JOIN enrollments e ON u.id = e.user_id
WHERE e.id IS NULL;

복사
JOIN 종류 비교
INNER JOIN: 양쪽 모두 있는 것만
┌───┐ ┌───┐
│ A │∩│ B │  → 교집합만
└───┘ └───┘

LEFT JOIN: 왼쪽 전부 + 오른쪽 매칭
┌─────┐───┐
│  A  │∩B │  → A 전부 + B 매칭
└─────┘───┘

RIGHT JOIN: 오른쪽 전부 + 왼쪽 매칭
┌───┌─────┐
│ A∩│  B  │  → B 전부 + A 매칭
└───└─────┘

클릭하여 복사
복사
실전 JOIN 예제
-- 강의별 수강생 목록 (강사 정보 포함)
SELECT
  c.title AS 강의명,
  i.name AS 강사명,
  u.name AS 수강생명,
  u.email AS 이메일,
  e.created_at AS 등록일
FROM courses c
INNER JOIN users i ON c.instructor_id = i.id
INNER JOIN enrollments e ON c.id = e.course_id
INNER JOIN users u ON e.user_id = u.id
WHERE e.status = 'confirmed'
ORDER BY c.title, e.created_at;

복사
9️⃣ 인덱스와 성능
인덱스란?
인덱스 없이 검색 (Full Table Scan):
┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐
│1 │2 │3 │4 │5 │6 │7 │8 │9 │10│  하나씩 전부 확인!
└──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘

인덱스로 검색 (Index Scan):
         [5]
        /   \
      [3]   [8]           바로 찾기!
      / \   / \
    [1][4][6][9]

클릭하여 복사
복사
인덱스 생성
-- 단일 컬럼 인덱스
CREATE INDEX idx_users_email ON users(email);

-- 복합 인덱스
CREATE INDEX idx_enrollments_user_course
ON enrollments(user_id, course_id);

-- 유니크 인덱스 (중복 불가)
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- 인덱스 확인
SHOW INDEX FROM users;

-- 인덱스 삭제
DROP INDEX idx_users_email ON users;

복사
인덱스를 걸어야 하는 컬럼
상황	예시
WHERE
클릭하여 복사
 조건에 자주 사용	email
클릭하여 복사
, status
클릭하여 복사

JOIN
클릭하여 복사
에 사용되는 외래키	user_id
클릭하여 복사
, course_id
클릭하여 복사

ORDER BY
클릭하여 복사
에 자주 사용	created_at
클릭하여 복사

UNIQUE
클릭하여 복사
 제약 조건	email
클릭하여 복사
쿼리 실행 계획 확인
-- EXPLAIN으로 쿼리 분석
EXPLAIN SELECT * FROM users WHERE email = 'kim@example.com';

-- 결과에서 확인할 것
-- type: ALL(풀스캔) → ref/range(인덱스) 가 좋음
-- rows: 스캔하는 행 수 (적을수록 좋음)
-- key: 사용된 인덱스 (NULL이면 인덱스 미사용)

복사
🔟 실전 예제: 강의 플랫폼 DB 설계
ERD (Entity-Relationship Diagram)
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   users      │     │  enrollments  │     │   courses    │
├─────────────┤     ├──────────────┤     ├─────────────┤
│ id (PK)      │──┐  │ id (PK)       │  ┌──│ id (PK)      │
│ name         │  └─▶│ user_id (FK)  │  │  │ title        │
│ email        │     │ course_id(FK) │◀─┘  │ instructor_id│
│ password     │     │ status        │     │ price        │
│ role         │     │ paid_amount   │     │ category_id  │
│ created_at   │     │ created_at    │     │ created_at   │
└─────────────┘     └──────────────┘     └─────────────┘
                                               │
                                               ▼
                                         ┌─────────────┐
                                         │  payments    │
                                         ├─────────────┤
                                         │ id (PK)      │
                                         │ enrollment_id│
                                         │ amount       │
                                         │ method       │
                                         │ status       │
                                         │ paid_at      │
                                         └─────────────┘

클릭하여 복사
복사
테이블 생성
-- 사용자
CREATE TABLE users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(50) NOT NULL,
  email       VARCHAR(100) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  role        ENUM('admin', 'user', 'instructor') DEFAULT 'user',
  phone       VARCHAR(20),
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- 카테고리
CREATE TABLE categories (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  name  VARCHAR(50) NOT NULL UNIQUE
);

-- 강의
CREATE TABLE courses (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  title          VARCHAR(200) NOT NULL,
  description    TEXT,
  instructor_id  INT NOT NULL,
  category_id    INT,
  price          DECIMAL(10, 2) DEFAULT 0,
  status         ENUM('draft', 'published', 'closed') DEFAULT 'draft',
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (instructor_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  INDEX idx_status (status),
  INDEX idx_instructor (instructor_id)
);

-- 수강 신청
CREATE TABLE enrollments (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL,
  course_id   INT NOT NULL,
  status      ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id),
  UNIQUE KEY uk_user_course (user_id, course_id),
  INDEX idx_status (status)
);

-- 결제
CREATE TABLE payments (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_id  INT NOT NULL,
  amount         DECIMAL(10, 2) NOT NULL,
  method         ENUM('card', 'transfer') NOT NULL,
  status         ENUM('pending', 'completed', 'refunded') DEFAULT 'pending',
  paid_at        DATETIME,
  created_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (enrollment_id) REFERENCES enrollments(id),
  INDEX idx_status (status)
);

복사
실전 쿼리 모음
-- 1. 대시보드: 오늘의 통계
SELECT
  (SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURDATE()) AS 신규가입,
  (SELECT COUNT(*) FROM enrollments WHERE DATE(created_at) = CURDATE()) AS 신규수강,
  (SELECT COALESCE(SUM(amount), 0) FROM payments
   WHERE status = 'completed' AND DATE(paid_at) = CURDATE()) AS 오늘매출;

-- 2. 인기 강의 TOP 5
SELECT
  c.title,
  COUNT(e.id) AS 수강생수,
  SUM(p.amount) AS 총매출
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id AND e.status = 'confirmed'
LEFT JOIN payments p ON e.id = p.enrollment_id AND p.status = 'completed'
GROUP BY c.id
ORDER BY 수강생수 DESC
LIMIT 5;

-- 3. 월별 매출 리포트
SELECT
  DATE_FORMAT(p.paid_at, '%Y-%m') AS 월,
  COUNT(*) AS 결제건수,
  SUM(p.amount) AS 매출,
  AVG(p.amount) AS 평균결제액
FROM payments p
WHERE p.status = 'completed'
GROUP BY DATE_FORMAT(p.paid_at, '%Y-%m')
ORDER BY 월 DESC
LIMIT 12;

-- 4. 서브쿼리: 수강 신청 3건 이상인 VIP 사용자
SELECT name, email
FROM users
WHERE id IN (
  SELECT user_id
  FROM enrollments
  WHERE status = 'confirmed'
  GROUP BY user_id
  HAVING COUNT(*) >= 3
);

복사
유용한 함수 모음
-- 문자열 함수
SELECT CONCAT(name, ' (', role, ')') FROM users;
SELECT SUBSTRING(email, 1, LOCATE('@', email) - 1) AS id FROM users;
SELECT LENGTH(name), CHAR_LENGTH(name) FROM users;  -- 바이트 vs 글자수

-- 날짜 함수
SELECT NOW();                                    -- 현재 시간
SELECT DATE_FORMAT(NOW(), '%Y년 %m월 %d일');       -- 포맷
SELECT DATEDIFF(NOW(), created_at) AS 가입일수 FROM users;
SELECT DATE_ADD(NOW(), INTERVAL 1 MONTH);         -- 1개월 후

-- 조건 함수
SELECT
  name,
  CASE role
    WHEN 'admin' THEN '관리자'
    WHEN 'instructor' THEN '강사'
    ELSE '일반'
  END AS 역할
FROM users;

-- NULL 처리
SELECT COALESCE(phone, '미입력') AS phone FROM users;
SELECT IFNULL(phone, '미입력') AS phone FROM users;

복사
📚 핵심 정리
개념	핵심
DDL	CREATE
클릭하여 복사
, ALTER
클릭하여 복사
, DROP
클릭하여 복사
 - 구조 정의
DML	SELECT
클릭하여 복사
, INSERT
클릭하여 복사
, UPDATE
클릭하여 복사
, DELETE
클릭하여 복사
 - 데이터 조작
WHERE	조건 필터 (=
클릭하여 복사
, LIKE
클릭하여 복사
, IN
클릭하여 복사
, IS NULL
클릭하여 복사
)
JOIN	테이블 연결 (INNER
클릭하여 복사
, LEFT
클릭하여 복사
, RIGHT
클릭하여 복사
)
GROUP BY	집계 (COUNT
클릭하여 복사
, SUM
클릭하여 복사
, AVG
클릭하여 복사
) + HAVING
클릭하여 복사

INDEX	조회 성능 향상 (자주 검색하는 컬럼에)
외래키	테이블 간 관계 설정 (FOREIGN KEY
클릭하여 복사
)

다음 단계: ORM을 사용하면 SQL을 직접 작성하지 않고 JavaScript/TypeScript 코드로 DB를 다룰 수 있습니다. → 06_ORM_실전가이드
클릭하여 복사
 참고