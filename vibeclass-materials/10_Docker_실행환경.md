10회차: Docker로 실행환경 만들기
학습 목표
Docker의 개념과 필요성 이해
Dockerfile 작성법 학습
멀티스테이지 빌드로 이미지 최적화
Docker Compose로 다중 컨테이너 관리
1. Docker 개념
1.1 Docker란?
┌─────────────────────────────────────────────────────────┐
│                      Docker란?                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   "애플리케이션을 컨테이너로 패키징하여                    │
│    어디서든 동일하게 실행할 수 있게 해주는 플랫폼"         │
│                                                         │
│   핵심 문제 해결:                                        │
│   • "내 컴퓨터에서는 되는데..." 문제 해결                 │
│   • 개발/테스트/운영 환경 일관성 보장                     │
│   • 애플리케이션 배포 및 확장 용이                        │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
1.2 가상머신 vs 컨테이너
가상머신 (VM)                    컨테이너 (Docker)
┌────────────────────┐          ┌────────────────────┐
│    Application     │          │    Application     │
├────────────────────┤          ├────────────────────┤
│    Guest OS        │          │   Container Engine │
├────────────────────┤          │     (Docker)       │
│    Hypervisor      │          ├────────────────────┤
├────────────────────┤          │     Host OS        │
│    Host OS         │          ├────────────────────┤
├────────────────────┤          │    Hardware        │
│    Hardware        │          └────────────────────┘
└────────────────────┘

• VM: 전체 OS를 포함 (무겁고 느림)
• Container: OS 커널 공유 (가볍고 빠름)

비교:
┌─────────────┬──────────────┬──────────────┐
│             │      VM      │   Container  │
├─────────────┼──────────────┼──────────────┤
│ 시작 시간    │  분 단위     │  초 단위     │
│ 이미지 크기  │  GB 단위     │  MB 단위     │
│ 메모리 사용  │  높음        │  낮음        │
│ 격리 수준    │  강함        │  적당함      │
│ 이식성      │  낮음        │  높음        │
└─────────────┴──────────────┴──────────────┘

클릭하여 복사
복사
1.3 Docker 핵심 개념
┌─────────────────────────────────────────────────────────┐
│                   Docker 핵심 용어                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Image (이미지)                                        │
│   └── 컨테이너를 만들기 위한 읽기 전용 템플릿             │
│   └── 애플리케이션 + 실행에 필요한 모든 것 포함           │
│                                                         │
│   Container (컨테이너)                                  │
│   └── 이미지를 실행한 인스턴스                          │
│   └── 격리된 환경에서 애플리케이션 실행                  │
│                                                         │
│   Dockerfile                                            │
│   └── 이미지를 만들기 위한 설명서(레시피)                │
│   └── 베이스 이미지, 명령어, 설정 등 포함                │
│                                                         │
│   Registry (레지스트리)                                 │
│   └── 이미지를 저장하고 공유하는 저장소                  │
│   └── Docker Hub, GitHub Container Registry 등          │
│                                                         │
└─────────────────────────────────────────────────────────┘

이미지와 컨테이너의 관계:
┌──────────┐     docker run     ┌────────────┐
│  Image   │ ─────────────────> │ Container  │
│  (설계도) │                    │ (실제 건물) │
└──────────┘                    └────────────┘
     │
     │  하나의 이미지로 여러 컨테이너 생성 가능
     │
     ├──────────────────> Container 1
     ├──────────────────> Container 2
     └──────────────────> Container 3

클릭하여 복사
복사
1.4 Docker 설치
# macOS (Docker Desktop)
brew install --cask docker

# Ubuntu
sudo apt update
sudo apt install docker.io docker-compose
sudo usermod -aG docker $USER  # 재로그인 필요

# 설치 확인
docker --version
docker compose version

복사
2. Docker 기본 명령어
2.1 이미지 관련 명령어
# 이미지 검색
docker search nginx

# 이미지 다운로드 (pull)
docker pull nginx
docker pull node:20-alpine
docker pull postgres:16

# 로컬 이미지 목록
docker images
docker image ls

# 이미지 삭제
docker rmi nginx
docker image rm node:20-alpine

# 사용하지 않는 이미지 정리
docker image prune -a

복사
2.2 컨테이너 관련 명령어
# 컨테이너 실행
docker run nginx                    # 포그라운드 실행
docker run -d nginx                 # 백그라운드 실행 (detached)
docker run -d --name web nginx      # 이름 지정
docker run -d -p 8080:80 nginx      # 포트 매핑 (호스트:컨테이너)
docker run -d -p 3000:3000 \
  -e NODE_ENV=production \          # 환경변수
  --name myapp myapp:latest

# 실행 중인 컨테이너 목록
docker ps
docker ps -a                        # 모든 컨테이너 (중지 포함)

# 컨테이너 로그
docker logs myapp
docker logs -f myapp                # 실시간 로그 (follow)
docker logs --tail 100 myapp        # 마지막 100줄

# 컨테이너 내부 접속
docker exec -it myapp /bin/sh       # 셸 접속
docker exec -it myapp bash          # bash 접속
docker exec myapp ls /app           # 단일 명령 실행

# 컨테이너 중지/시작/재시작
docker stop myapp
docker start myapp
docker restart myapp

# 컨테이너 삭제
docker rm myapp                     # 중지된 컨테이너 삭제
docker rm -f myapp                  # 실행 중인 컨테이너 강제 삭제

# 모든 중지된 컨테이너 삭제
docker container prune

복사
2.3 볼륨과 네트워크
# 볼륨 (데이터 영속성)
docker run -v /host/path:/container/path nginx    # 바인드 마운트
docker run -v myvolume:/data nginx                # 네임드 볼륨

docker volume ls                    # 볼륨 목록
docker volume create myvolume       # 볼륨 생성
docker volume rm myvolume           # 볼륨 삭제

# 네트워크
docker network ls                   # 네트워크 목록
docker network create mynet         # 네트워크 생성
docker run --network mynet nginx    # 네트워크에 연결

# 컨테이너 간 통신 (같은 네트워크)
docker run -d --name db --network mynet postgres
docker run -d --name app --network mynet myapp
# app에서 db:5432로 접속 가능

복사
3. Dockerfile 작성
3.1 Dockerfile 기본 구조
# 베이스 이미지
FROM node:20-alpine

# 메타데이터
LABEL maintainer="your@email.com"
LABEL version="1.0"

# 환경변수 설정
ENV NODE_ENV=production
ENV PORT=3000

# 작업 디렉토리 설정
WORKDIR /app

# 파일 복사
COPY package*.json ./

# 명령어 실행
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 포트 노출 (문서화 목적)
EXPOSE 3000

# 컨테이너 시작 시 실행할 명령
CMD ["node", "server.js"]

복사
3.2 주요 명령어 설명
# FROM - 베이스 이미지 지정
FROM node:20-alpine         # 가벼운 Alpine Linux 기반
FROM node:20-slim           # Debian slim 버전
FROM node:20                # 전체 Debian 버전

# WORKDIR - 작업 디렉토리 설정
WORKDIR /app                # 이후 명령어는 /app에서 실행

# COPY vs ADD
COPY package.json .         # 파일 복사 (권장)
COPY src/ ./src/           # 디렉토리 복사
ADD https://... /app/      # URL에서 다운로드 가능 (비권장)
ADD archive.tar.gz /app/   # 압축 자동 해제

# RUN - 빌드 시 명령어 실행
RUN npm install            # 패키지 설치
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*   # 캐시 정리

# ENV - 환경변수 설정
ENV NODE_ENV=production
ENV DATABASE_URL=postgres://...

# ARG - 빌드 시 변수 (런타임에는 없음)
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}

# EXPOSE - 포트 문서화 (실제 개방은 -p 옵션으로)
EXPOSE 3000
EXPOSE 80 443

# CMD vs ENTRYPOINT
CMD ["npm", "start"]              # 기본 명령 (덮어쓰기 가능)
ENTRYPOINT ["node"]               # 고정 명령
CMD ["server.js"]                 # ENTRYPOINT의 인자

# USER - 실행 사용자 지정 (보안)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# HEALTHCHECK - 헬스체크
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

복사
3.3 Node.js 애플리케이션 Dockerfile
# Dockerfile
FROM node:20-alpine

# 보안: 루트가 아닌 사용자 사용
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

WORKDIR /app

# 의존성 먼저 설치 (캐시 활용)
COPY package.json package-lock.json ./
RUN npm ci --only=production

# 소스 복사
COPY --chown=nextjs:nodejs . .

# 빌드
RUN npm run build

# 사용자 변경
USER nextjs

# 포트 및 환경변수
EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

# 시작 명령
CMD ["npm", "start"]

복사
3.4 .dockerignore 파일
# .dockerignore

# 의존성 (컨테이너에서 새로 설치)
node_modules
npm-debug.log

# 빌드 결과물
.next
dist
build

# 개발 도구
.git
.gitignore
.vscode
*.md
!README.md

# 환경 설정
.env
.env.local
.env.*.local

# 테스트
coverage
__tests__
*.test.js
*.spec.js

# 기타
.DS_Store
Thumbs.db
*.log

복사
4. 멀티스테이지 빌드
4.1 왜 멀티스테이지인가?
단일 스테이지 문제:
┌─────────────────────────────────────────┐
│  Final Image (1GB+)                     │
│  ├── Node.js Runtime                    │
│  ├── Source Code                        │
│  ├── node_modules (dev + prod)          │
│  ├── Build Tools (TypeScript, etc.)     │
│  └── Build Artifacts                    │
└─────────────────────────────────────────┘

멀티스테이지 결과:
┌─────────────────────────────────────────┐
│  Final Image (~200MB)                   │
│  ├── Node.js Runtime                    │
│  ├── node_modules (prod only)           │
│  └── Build Artifacts only               │
└─────────────────────────────────────────┘

클릭하여 복사
복사
4.2 멀티스테이지 Dockerfile (Node.js)
# ===== 1단계: 의존성 설치 =====
FROM node:20-alpine AS deps

WORKDIR /app

# 의존성 파일만 복사
COPY package.json package-lock.json ./

# 모든 의존성 설치 (빌드에 필요한 devDependencies 포함)
RUN npm ci


# ===== 2단계: 빌드 =====
FROM node:20-alpine AS builder

WORKDIR /app

# 의존성 복사
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 환경변수 설정 (빌드 시)
ENV NEXT_TELEMETRY_DISABLED=1

# 빌드
RUN npm run build


# ===== 3단계: 프로덕션 실행 =====
FROM node:20-alpine AS runner

WORKDIR /app

# 프로덕션 환경
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 보안: 비루트 사용자
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 필요한 파일만 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Next.js standalone 빌드 결과 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

복사
4.3 Next.js standalone 설정
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // 독립 실행형 빌드
  // ... 기타 설정
};

module.exports = nextConfig;

복사
4.4 멀티스테이지 Dockerfile (Python/FastAPI)
# ===== 빌드 스테이지 =====
FROM python:3.12-slim AS builder

WORKDIR /app

# 가상환경 생성
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# 의존성 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


# ===== 프로덕션 스테이지 =====
FROM python:3.12-slim AS runner

WORKDIR /app

# 가상환경 복사
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# 소스 코드 복사
COPY . .

# 보안: 비루트 사용자
RUN useradd --create-home appuser
USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

복사
5. Docker Compose
5.1 Docker Compose란?
┌─────────────────────────────────────────────────────────┐
│                   Docker Compose                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   여러 컨테이너를 정의하고 함께 실행하는 도구              │
│                                                         │
│   ┌─────────┐   ┌─────────┐   ┌─────────┐              │
│   │   App   │──▶│   DB    │   │  Redis  │              │
│   └─────────┘   └─────────┘   └─────────┘              │
│        │             │             │                    │
│        └─────────────┼─────────────┘                    │
│                      │                                  │
│              docker-compose.yml                         │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
5.2 docker-compose.yml 기본 구조
# docker-compose.yml
version: '3.8'

services:
  # 웹 애플리케이션
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      - db
      - redis
    restart: unless-stopped

  # PostgreSQL 데이터베이스
  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  # Redis 캐시
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

# 볼륨 정의
volumes:
  postgres_data:
  redis_data:

# 네트워크 정의 (선택사항)
networks:
  default:
    name: myapp-network

복사
5.3 Docker Compose 명령어
# 컨테이너 시작
docker compose up              # 포그라운드
docker compose up -d           # 백그라운드 (detached)
docker compose up --build      # 이미지 다시 빌드

# 컨테이너 중지
docker compose down            # 컨테이너 중지 및 삭제
docker compose down -v         # 볼륨도 함께 삭제

# 상태 확인
docker compose ps              # 실행 중인 컨테이너
docker compose logs            # 로그 확인
docker compose logs -f app     # 특정 서비스 로그 실시간

# 컨테이너 접속
docker compose exec app sh     # 셸 접속
docker compose exec db psql -U user mydb  # DB 접속

# 스케일링
docker compose up -d --scale app=3   # app 컨테이너 3개 실행

# 설정 확인
docker compose config          # 최종 설정 출력

복사
5.4 개발/운영 환경 분리
# docker-compose.yml (기본/공통)
version: '3.8'

services:
  app:
    build: .
    environment:
      - NODE_ENV=${NODE_ENV:-development}

복사
# docker-compose.override.yml (개발 환경 - 자동 로드)
version: '3.8'

services:
  app:
    build:
      context: .
      target: development    # 멀티스테이지의 특정 스테이지
    ports:
      - "3000:3000"
    volumes:
      - .:/app               # 소스 코드 마운트 (핫 리로드)
      - /app/node_modules    # node_modules 제외
    environment:
      - DEBUG=true

복사
# docker-compose.prod.yml (운영 환경)
version: '3.8'

services:
  app:
    build:
      context: .
      target: production
    restart: always
    environment:
      - NODE_ENV=production
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: '0.5'
          memory: 512M

복사
# 개발 환경 실행 (docker-compose.yml + docker-compose.override.yml)
docker compose up

# 운영 환경 실행
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

복사
5.5 풀스택 예제 (Next.js + PostgreSQL + Redis)
# docker-compose.yml
version: '3.8'

services:
  # Next.js 앱
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://vibeclass:secret@db:5432/vibeclass
      - REDIS_URL=redis://redis:6379
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    restart: unless-stopped

  # PostgreSQL
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: vibeclass
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: vibeclass
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # 초기화 스크립트
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U vibeclass"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  # Redis
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    restart: unless-stopped

  # Nginx (리버스 프록시)
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:

복사
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }
    }
}

복사
6. Docker 베스트 프랙티스
6.1 이미지 최적화
# ✅ 좋은 예: 레이어 캐시 활용
# 변경이 적은 것부터 복사
COPY package*.json ./
RUN npm ci
COPY . .

# ❌ 나쁜 예: 매번 전체 빌드
COPY . .
RUN npm ci

복사
# ✅ 좋은 예: 명령어 결합으로 레이어 수 줄이기
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# ❌ 나쁜 예: 불필요한 레이어 생성
RUN apt-get update
RUN apt-get install -y curl

복사
6.2 보안
# ✅ 비루트 사용자 사용
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# ✅ 최소한의 베이스 이미지
FROM node:20-alpine     # ~180MB
# 대신
FROM node:20            # ~1GB

# ✅ 민감한 정보는 빌드 시 ARG, 런타임에 환경변수
ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc && \
    npm ci && \
    rm .npmrc

# ✅ 불필요한 파일 제외 (.dockerignore)

복사
6.3 헬스체크
# HTTP 헬스체크
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# 프로세스 체크
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node healthcheck.js || exit 1

복사
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // DB 연결 확인
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: String(error) },
      { status: 503 }
    );
  }
}

복사
7. 실습: 풀스택 앱 Docker화
7.1 프로젝트 구조
my-fullstack-app/
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── .dockerignore
├── nginx/
│   └── nginx.conf
├── package.json
├── next.config.js
├── prisma/
│   └── schema.prisma
└── src/
    └── ...

클릭하여 복사
복사
7.2 개발 환경 실행
# 개발 환경 시작
docker compose up -d

# 로그 확인
docker compose logs -f app

# DB 마이그레이션
docker compose exec app npx prisma migrate dev

# 종료
docker compose down

복사
7.3 운영 빌드 및 배포
# 이미지 빌드
docker build -t myapp:latest .

# 레지스트리에 푸시
docker tag myapp:latest ghcr.io/username/myapp:latest
docker push ghcr.io/username/myapp:latest

# 운영 환경 실행
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

복사
정리
핵심 포인트

Docker 개념

컨테이너로 일관된 실행 환경 제공
이미지(템플릿)와 컨테이너(인스턴스)

Dockerfile

FROM, COPY, RUN, CMD 등 명령어
레이어 캐시를 고려한 구성
.dockerignore로 불필요한 파일 제외

멀티스테이지 빌드

빌드와 실행 환경 분리
최종 이미지 크기 최소화

Docker Compose

다중 컨테이너 오케스트레이션
개발/운영 환경 설정 분리
주요 명령어
# 이미지
docker build -t myapp .
docker images
docker rmi myapp

# 컨테이너
docker run -d -p 3000:3000 myapp
docker ps
docker logs -f container_id
docker exec -it container_id sh

# Compose
docker compose up -d
docker compose down
docker compose logs -f

복사
다음 단계
11회차에서는 AWS EC2에 Docker 컨테이너를 배포합니다