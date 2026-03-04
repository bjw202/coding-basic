12회차: CI/CD + Vercel + Cloudflare
학습 목표
CI/CD 개념과 필요성 이해
GitHub Actions를 활용한 자동화 파이프라인 구축
Vercel을 통한 Next.js 배포
Cloudflare DNS 및 CDN 설정
프로덕션 환경 최적화
1. CI/CD 개념
1.1 CI/CD란?
┌─────────────────────────────────────────────────────────┐
│                      CI/CD 개념                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   CI (Continuous Integration) - 지속적 통합             │
│   ┌─────────────────────────────────────────┐          │
│   │  코드 변경 시마다 자동으로:               │          │
│   │  • 빌드                                  │          │
│   │  • 테스트                                │          │
│   │  • 코드 품질 검사                         │          │
│   └─────────────────────────────────────────┘          │
│                                                         │
│   CD (Continuous Delivery/Deployment) - 지속적 배포     │
│   ┌─────────────────────────────────────────┐          │
│   │  CI 통과 후 자동으로:                     │          │
│   │  • 스테이징 환경 배포                     │          │
│   │  • 프로덕션 환경 배포                     │          │
│   └─────────────────────────────────────────┘          │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
1.2 CI/CD 파이프라인
코드 푸시              빌드                테스트             배포
   │                   │                   │                  │
   ▼                   ▼                   ▼                  ▼
┌──────┐          ┌──────┐           ┌──────┐          ┌──────┐
│ Git  │ ──────▶ │ Build │ ──────▶ │ Test │ ──────▶ │Deploy│
│ Push │          │      │           │      │          │      │
└──────┘          └──────┘           └──────┘          └──────┘
                     │                   │                  │
                     ▼                   ▼                  ▼
               npm install          Jest/Vitest         Vercel
               npm run build        Lint/Format          EC2
               Prisma generate      Type Check        Firebase

클릭하여 복사
복사
1.3 CI/CD 도구 비교
┌────────────────┬────────────────────────────────────────┐
│     도구       │              특징                       │
├────────────────┼────────────────────────────────────────┤
│ GitHub Actions │ GitHub 네이티브, 무료 티어 넉넉함      │
│ GitLab CI/CD   │ GitLab 내장, 자체 호스팅 가능          │
│ Jenkins        │ 오픈소스, 높은 자유도, 설정 복잡       │
│ CircleCI       │ 빠른 빌드, 유료 플랜 중심              │
│ Vercel         │ Next.js 최적화, Zero-config           │
└────────────────┴────────────────────────────────────────┘

클릭하여 복사
복사
2. GitHub Actions
2.1 기본 개념
┌─────────────────────────────────────────────────────────┐
│                   GitHub Actions 구조                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Workflow (워크플로우)                                 │
│   └── .github/workflows/*.yml 파일                     │
│                                                         │
│   Job (잡)                                              │
│   └── 워크플로우 내 실행 단위                           │
│   └── 병렬 또는 순차 실행 가능                          │
│                                                         │
│   Step (스텝)                                           │
│   └── 잡 내 개별 작업                                   │
│   └── 명령어 또는 액션 실행                             │
│                                                         │
│   Action (액션)                                         │
│   └── 재사용 가능한 작업 단위                           │
│   └── Marketplace에서 다양한 액션 사용 가능             │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
2.2 기본 워크플로우
# .github/workflows/ci.yml
name: CI

# 트리거 조건
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

# 환경 변수
env:
  NODE_VERSION: '20'

# 작업 정의
jobs:
  # 빌드 및 테스트
  build:
    name: Build and Test
    runs-on: ubuntu-latest

    steps:
      # 코드 체크아웃
      - name: Checkout code
        uses: actions/checkout@v4

      # Node.js 설정
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      # 의존성 설치
      - name: Install dependencies
        run: npm ci

      # Lint
      - name: Run ESLint
        run: npm run lint

      # 타입 체크
      - name: Type check
        run: npm run type-check

      # 테스트
      - name: Run tests
        run: npm test

      # 빌드
      - name: Build
        run: npm run build

복사
2.3 고급 워크플로우 (CI/CD 전체)
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # 1단계: 빌드 및 테스트
  build:
    name: Build and Test
    runs-on: ubuntu-latest
    outputs:
      should_deploy: ${{ steps.check.outputs.should_deploy }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

      - name: Build application
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

      # 빌드 결과물 캐시
      - name: Cache build
        uses: actions/cache@v4
        with:
          path: |
            .next
            node_modules
          key: build-${{ github.sha }}

      # main 브랜치 푸시인 경우에만 배포
      - name: Check deployment condition
        id: check
        run: |
          if [[ "${{ github.event_name }}" == "push" && "${{ github.ref }}" == "refs/heads/main" ]]; then
            echo "should_deploy=true" >> $GITHUB_OUTPUT
          else
            echo "should_deploy=false" >> $GITHUB_OUTPUT
          fi

  # 2단계: Docker 이미지 빌드 (선택사항)
  docker:
    name: Build Docker Image
    needs: build
    if: needs.build.outputs.should_deploy == 'true'
    runs-on: ubuntu-latest

    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # 3단계: EC2 배포
  deploy:
    name: Deploy to EC2
    needs: [build, docker]
    if: needs.build.outputs.should_deploy == 'true'
    runs-on: ubuntu-latest
    environment: production

    steps:
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd ~/my-project
            git pull origin main
            npm ci
            npx prisma generate
            npm run build
            pm2 restart my-app

      - name: Health check
        run: |
          sleep 10
          curl -f https://${{ secrets.DOMAIN }}/api/health || exit 1

      - name: Notify Slack
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Deployment ${{ job.status }}'
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

복사
2.4 GitHub Secrets 설정
GitHub 저장소 → Settings → Secrets and variables → Actions

필수 시크릿:
┌────────────────────────┬─────────────────────────────┐
│ Secret Name            │ 설명                        │
├────────────────────────┼─────────────────────────────┤
│ EC2_HOST               │ EC2 IP 또는 도메인          │
│ EC2_USER               │ ubuntu                      │
│ EC2_SSH_KEY            │ SSH 프라이빗 키 (.pem 내용) │
│ DATABASE_URL           │ 데이터베이스 URL            │
│ DOMAIN                 │ 도메인 (헬스체크용)         │
│ SLACK_WEBHOOK_URL      │ Slack 알림 (선택)          │
└────────────────────────┴─────────────────────────────┘

클릭하여 복사
복사
2.5 브랜치 보호 규칙
GitHub 저장소 → Settings → Branches → Add rule

규칙 설정:
□ Require a pull request before merging
  □ Require approvals: 1
□ Require status checks to pass before merging
  □ Require branches to be up to date
  □ Status checks: build (선택)
□ Require conversation resolution before merging
□ Do not allow bypassing the above settings

클릭하여 복사
복사
3. Vercel 배포
3.1 Vercel이란?
┌─────────────────────────────────────────────────────────┐
│                       Vercel                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Next.js를 만든 회사의 호스팅 플랫폼                    │
│                                                         │
│   특징:                                                 │
│   • Zero Configuration - 설정 없이 바로 배포           │
│   • 자동 HTTPS                                         │
│   • 글로벌 CDN (Edge Network)                          │
│   • 프리뷰 배포 (PR마다 별도 URL)                       │
│   • 서버리스 함수 지원                                  │
│   • 분석 및 모니터링                                    │
│                                                         │
│   무료 플랜:                                            │
│   • 개인 프로젝트 무제한                                │
│   • 월 100GB 대역폭                                    │
│   • 서버리스 함수 100GB-시간                           │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
3.2 Vercel 연동
1. https://vercel.com 가입 (GitHub 계정 연동)

2. New Project → Import Git Repository

3. 저장소 선택

4. 설정:
   - Framework Preset: Next.js (자동 감지)
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next

5. Environment Variables 추가:
   - DATABASE_URL
   - NEXTAUTH_URL
   - NEXTAUTH_SECRET
   - 기타 필요한 환경 변수

6. Deploy 클릭

클릭하여 복사
복사
3.3 Vercel 설정 파일
// vercel.json
{
  "buildCommand": "prisma generate && npm run build",
  "framework": "nextjs",
  "regions": ["icn1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/proxy/:path*",
      "destination": "https://external-api.com/:path*"
    }
  ]
}

복사
3.4 프리뷰 배포 활용
main 브랜치 → 프로덕션 배포 (your-app.vercel.app)

PR 생성 시 → 프리뷰 배포 (your-app-git-branch-name.vercel.app)

활용:
• PR 리뷰 시 실제 동작 확인
• QA 테스트
• 클라이언트 미리보기

클릭하여 복사
복사
3.5 Vercel CLI
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 프로젝트 연결
vercel link

# 프리뷰 배포
vercel

# 프로덕션 배포
vercel --prod

# 환경 변수 관리
vercel env ls
vercel env add DATABASE_URL
vercel env pull .env.local

# 로그 확인
vercel logs
vercel logs --follow

복사
4. Cloudflare 설정
4.1 Cloudflare란?
┌─────────────────────────────────────────────────────────┐
│                      Cloudflare                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   글로벌 CDN 및 보안 서비스                              │
│                                                         │
│   주요 기능:                                            │
│   • DNS 관리                                            │
│   • CDN (콘텐츠 캐싱)                                   │
│   • DDoS 방어                                           │
│   • SSL/TLS 암호화                                      │
│   • WAF (웹 애플리케이션 방화벽)                         │
│   • Workers (Edge 컴퓨팅)                               │
│   • Pages (정적 사이트 호스팅)                           │
│                                                         │
│   무료 플랜:                                            │
│   • 무제한 대역폭                                       │
│   • 무료 SSL                                            │
│   • 기본 DDoS 방어                                      │
│   • 기본 WAF 규칙                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
4.2 도메인 연결
1. Cloudflare 가입 (https://cloudflare.com)

2. Add a Site → 도메인 입력

3. 플랜 선택 (Free 가능)

4. DNS 레코드 확인/수정
   ┌────────┬────────────────┬─────────────────┬───────┐
   │ Type   │ Name           │ Content         │ Proxy │
   ├────────┼────────────────┼─────────────────┼───────┤
   │ A      │ @              │ EC2 IP          │ ✓     │
   │ A      │ www            │ EC2 IP          │ ✓     │
   │ CNAME  │ api            │ @               │ ✓     │
   └────────┴────────────────┴─────────────────┴───────┘

5. 네임서버 변경 (도메인 등록 업체에서)
   - ns1.cloudflare.com
   - ns2.cloudflare.com

6. 전파 대기 (최대 24시간, 보통 1-2시간)

클릭하여 복사
복사
4.3 Vercel과 Cloudflare 연동
Vercel 커스텀 도메인 설정:

1. Vercel 프로젝트 → Settings → Domains

2. 도메인 추가: yourdomain.com

3. DNS 설정 안내 확인

4. Cloudflare DNS에 추가:
   ┌────────┬────────────────┬─────────────────────────┬───────┐
   │ Type   │ Name           │ Content                 │ Proxy │
   ├────────┼────────────────┼─────────────────────────┼───────┤
   │ CNAME  │ @              │ cname.vercel-dns.com    │ ✗     │
   │ CNAME  │ www            │ cname.vercel-dns.com    │ ✗     │
   └────────┴────────────────┴─────────────────────────┴───────┘

   ※ Vercel 사용 시 프록시 OFF (회색 구름)
   ※ EC2 직접 배포 시 프록시 ON (주황 구름)

5. Vercel에서 도메인 검증 완료 확인

클릭하여 복사
복사
4.4 SSL/TLS 설정
Cloudflare 대시보드 → SSL/TLS

암호화 모드:
┌────────────────┬──────────────────────────────────────┐
│ 모드           │ 설명                                 │
├────────────────┼──────────────────────────────────────┤
│ Off            │ 암호화 없음 (비권장)                 │
│ Flexible       │ 브라우저↔CF만 HTTPS (비권장)        │
│ Full           │ 전체 HTTPS, 인증서 미검증            │
│ Full (Strict)  │ 전체 HTTPS, 인증서 검증 ✓           │
└────────────────┴──────────────────────────────────────┘

권장: Full (Strict)
→ 서버에 Let's Encrypt 인증서 설치 필요

Edge Certificates:
• Always Use HTTPS: ON
• Automatic HTTPS Rewrites: ON
• Minimum TLS Version: TLS 1.2

클릭하여 복사
복사
4.5 캐싱 설정
Cloudflare 대시보드 → Caching

Browser Cache TTL: Respect Existing Headers

Cache Rules (예시):
┌─────────────────────────────────────────────────────────┐
│ Rule 1: 정적 파일 장기 캐싱                              │
├─────────────────────────────────────────────────────────┤
│ When: URI Path contains "/_next/static/"               │
│ Then: Cache TTL - 1 year                               │
│       Browser TTL - 1 year                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Rule 2: 이미지 캐싱                                      │
├─────────────────────────────────────────────────────────┤
│ When: URI Path matches "\.(jpg|png|gif|webp|svg)$"     │
│ Then: Cache TTL - 1 month                              │
│       Browser TTL - 1 week                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Rule 3: API 캐시 제외                                    │
├─────────────────────────────────────────────────────────┤
│ When: URI Path starts with "/api/"                     │
│ Then: Bypass cache                                     │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
4.6 보안 설정
Cloudflare 대시보드 → Security

WAF (Web Application Firewall):
• Managed Rules: ON
• OWASP 규칙: ON (유료)

Bot Fight Mode: ON

Security Level: Medium

Challenge Passage: 30 minutes

Rate Limiting (예시):
┌─────────────────────────────────────────────────────────┐
│ Rule: API 요청 제한                                      │
├─────────────────────────────────────────────────────────┤
│ When: URI Path starts with "/api/"                     │
│ Rate: 100 requests per 1 minute                        │
│ Then: Block for 1 hour                                 │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
4.7 페이지 규칙 (Page Rules)
Cloudflare 대시보드 → Rules → Page Rules

무료: 3개까지

예시 규칙:

1. www → non-www 리다이렉트
   URL: www.yourdomain.com/*
   Setting: Forwarding URL (301)
   Destination: https://yourdomain.com/$1

2. API 캐시 우회
   URL: yourdomain.com/api/*
   Settings:
   - Cache Level: Bypass
   - Disable Apps: ON
   - Disable Performance: ON

3. 정적 파일 캐싱
   URL: yourdomain.com/_next/static/*
   Settings:
   - Cache Level: Cache Everything
   - Edge Cache TTL: 1 month

클릭하여 복사
복사
5. 고급 CI/CD 패턴
5.1 환경별 배포
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches:
      - main        # 프로덕션
      - develop     # 스테이징

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set environment
        id: env
        run: |
          if [[ "${{ github.ref }}" == "refs/heads/main" ]]; then
            echo "environment=production" >> $GITHUB_OUTPUT
            echo "vercel_flag=--prod" >> $GITHUB_OUTPUT
          else
            echo "environment=preview" >> $GITHUB_OUTPUT
            echo "vercel_flag=" >> $GITHUB_OUTPUT
          fi

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: ${{ steps.env.outputs.vercel_flag }}

복사
5.2 롤백 전략
# .github/workflows/rollback.yml
name: Rollback

on:
  workflow_dispatch:
    inputs:
      deployment_id:
        description: 'Vercel Deployment ID to rollback to'
        required: true

jobs:
  rollback:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - name: Install Vercel CLI
        run: npm i -g vercel

      - name: Rollback deployment
        run: |
          vercel promote ${{ inputs.deployment_id }} \
            --token ${{ secrets.VERCEL_TOKEN }} \
            --scope ${{ secrets.VERCEL_ORG_ID }}

      - name: Notify team
        uses: 8398a7/action-slack@v3
        with:
          status: custom
          custom_payload: |
            {
              text: "🔄 Rollback completed to deployment ${{ inputs.deployment_id }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

복사
5.3 카나리 배포
# .github/workflows/canary.yml
name: Canary Deploy

on:
  workflow_dispatch:

jobs:
  canary:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Deploy canary
        run: |
          # 10%의 트래픽으로 새 버전 테스트
          vercel deploy --prod --meta canary=true

      - name: Run smoke tests
        run: |
          npm run test:e2e

      - name: Promote or rollback
        run: |
          if [ "${{ job.status }}" == "success" ]; then
            echo "Promoting canary to production"
            vercel promote $DEPLOYMENT_URL --prod
          else
            echo "Rolling back canary"
            vercel rollback
          fi

복사
5.4 데이터베이스 마이그레이션 포함
# .github/workflows/deploy-with-migration.yml
name: Deploy with Migration

on:
  push:
    branches: [main]

jobs:
  migrate:
    name: Database Migration
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

  deploy:
    name: Deploy Application
    needs: migrate
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

복사
6. 모니터링 및 알림
6.1 GitHub Actions 알림
# Slack 알림
- name: Slack Notification
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    fields: repo,message,commit,author,action,workflow
    mention: 'here'
    if_mention: failure
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

# Discord 알림
- name: Discord Notification
  if: failure()
  uses: sarisia/actions-status-discord@v1
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK }}
    status: ${{ job.status }}

복사
6.2 Vercel 통합 모니터링
Vercel 대시보드:

1. Analytics
   - 실시간 트래픽
   - 지역별 방문자
   - 디바이스 통계

2. Speed Insights
   - Core Web Vitals
   - LCP, FID, CLS 측정
   - 페이지별 성능

3. Logs
   - 함수 실행 로그
   - 에러 추적
   - 실시간 모니터링

4. Integrations
   - Sentry (에러 추적)
   - LogRocket (세션 리플레이)
   - Datadog (APM)

클릭하여 복사
복사
6.3 헬스체크 API
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local',
    checks: {} as Record<string, boolean>,
  };

  try {
    // 데이터베이스 연결 확인
    await prisma.$queryRaw`SELECT 1`;
    checks.checks.database = true;
  } catch {
    checks.checks.database = false;
    checks.status = 'degraded';
  }

  const statusCode = checks.status === 'healthy' ? 200 : 503;

  return NextResponse.json(checks, { status: statusCode });
}

복사
7. 실습: 전체 파이프라인 구축
7.1 프로젝트 구조
my-nextjs-app/
├── .github/
│   └── workflows/
│       ├── ci.yml           # PR 테스트
│       ├── cd.yml           # 배포
│       └── codeql.yml       # 보안 스캔
├── app/
│   ├── api/
│   │   └── health/
│   │       └── route.ts
│   └── ...
├── prisma/
│   └── schema.prisma
├── vercel.json
├── package.json
└── ...

클릭하여 복사
복사
7.2 체크리스트
□ GitHub 저장소 설정
  □ 브랜치 보호 규칙
  □ Secrets 설정
  □ Actions 워크플로우

□ Vercel 설정
  □ 프로젝트 연결
  □ 환경 변수
  □ 커스텀 도메인

□ Cloudflare 설정
  □ DNS 레코드
  □ SSL 설정
  □ 캐싱 규칙
  □ 보안 설정

□ 모니터링
  □ 헬스체크 API
  □ 에러 추적 (Sentry)
  □ 알림 설정 (Slack/Discord)

클릭하여 복사
복사
정리
CI/CD 핵심 포인트

GitHub Actions

코드 푸시/PR 시 자동 빌드/테스트
환경별 배포 자동화
Secrets로 민감 정보 관리

Vercel

Next.js 최적화 호스팅
Zero-config 배포
프리뷰 배포로 PR 검증

Cloudflare

글로벌 CDN으로 성능 향상
무료 SSL 및 DDoS 방어
DNS 및 캐싱 관리
배포 플로우
개발자 → Git Push → GitHub Actions → 빌드/테스트
                         ↓
                    테스트 통과
                         ↓
                  Vercel 자동 배포
                         ↓
                  Cloudflare CDN
                         ↓
                      사용자

클릭하여 복사
복사
주요 명령어
# Vercel CLI
vercel                    # 프리뷰 배포
vercel --prod            # 프로덕션 배포
vercel logs              # 로그 확인

# GitHub Actions (로컬 테스트)
gh workflow run ci.yml   # 워크플로우 실행
gh run list              # 실행 목록
gh run view              # 상세 보기

복사
부트캠프 마무리
12주 과정 요약
회차	주제	핵심 내용
1	개발환경 세팅	IDE, 터미널, 확장 프로그램
2	프론트/백엔드 개념	SSR/CSR, Node.js, Express
3	HTTP/REST API	HTTP 메서드, REST 설계, CORS
4	React 기초	컴포넌트, Props, State, 이벤트
5	Next.js 기초	App Router, 라우팅, API Routes
6	비동기/디버깅	async/await, 에러 처리, 디버깅
7	PostgreSQL/Supabase	SQL, Prisma, RLS
8	MongoDB/Elasticsearch	NoSQL, 검색 엔진
9	OAuth/JWT/AI API	소셜 로그인, 인증, AI 연동
10	Docker	컨테이너, Dockerfile, Compose
11	AWS EC2 배포	SSH, Nginx, SSL, PM2
12	CI/CD	GitHub Actions, Vercel, Cloudflare
다음 학습 추천

심화 학습

TypeScript 고급 패턴
테스트 자동화 (Jest, Playwright)
마이크로서비스 아키텍처

실전 프로젝트

포트폴리오 사이트
SaaS 애플리케이션
오픈소스 기여

클라우드 심화

AWS 자격증 (SAA, DVA)
Kubernetes (EKS, GKE)
서버리스 아키텍처

수고하셨습니다! 🎉