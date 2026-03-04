---
id: SPEC-CONTENT-W4
title: "Week 4 Content Implementation Plan"
version: 1.0.0
status: draft
created: 2026-02-21
updated: 2026-02-21
author: MoAI
priority: high
---

## 구현 계획

### 개요

4주차 콘텐츠(Session 10~12)를 구현한다. DevOps 기초를 다루는 3개 세션의 MDX 파일을 작성하며, 각 세션은 통일된 6섹션 템플릿(학습 목표, 핵심 개념, 다이어그램, 코드 예제, 실습, 요약)을 따른다. Session 11이 가장 많은 내용을 다루므로 구현 시 가장 높은 비중을 차지한다.

---

## 마일스톤

### Primary Goal: Session 10 - Docker로 실행환경 만들기

**대상 파일**: `content/week4/session10.mdx`

**콘텐츠 아웃라인:**

1. **학습 목표**
   - Docker의 개념과 컨테이너 기반 개발의 장점을 이해한다
   - Dockerfile을 작성하여 Node.js/Next.js 앱을 이미지로 빌드할 수 있다
   - 멀티스테이지 빌드로 프로덕션 이미지를 최적화할 수 있다
   - Docker Compose로 멀티 컨테이너 환경을 구성할 수 있다

2. **핵심 개념**
   - 컨테이너 vs 가상 머신(VM) 비교
   - Docker 아키텍처: Docker Engine, Image, Container, Registry
   - 이미지 레이어(Layer) 캐싱 원리
   - Dockerfile 명령어: FROM, WORKDIR, COPY, RUN, EXPOSE, CMD, ENTRYPOINT
   - 멀티스테이지 빌드(Multi-stage Build) 패턴
   - .dockerignore 파일 역할과 작성법
   - Docker Compose: 서비스 정의, 네트워크, 볼륨
   - 포트 매핑(-p)과 볼륨 마운트(-v)

3. **Mermaid 다이어그램 (3개)**
   - D10-1: Docker 아키텍처 (flowchart) -- 이미지/컨테이너/레지스트리 관계
   - D10-2: 멀티스테이지 빌드 프로세스 (flowchart) -- Build Stage -> Production Stage
   - D10-3: Docker Compose 서비스 구성 (graph) -- app/db 서비스, 네트워크, 볼륨

4. **코드 예제 (6개)**
   - C10-1: 기본 Dockerfile (Node.js) -- `dockerfile`
   - C10-2: 멀티스테이지 Dockerfile -- `dockerfile`
   - C10-3: .dockerignore 파일 -- `text`
   - C10-4: docker-compose.yml -- `yaml`
   - C10-5: docker build/run 명령어 -- `bash`
   - C10-6: 포트 매핑/볼륨 마운트 예제 -- `bash`

5. **실습**
   - Step 1: Node.js/Next.js 프로젝트용 Dockerfile 작성
   - Step 2: 멀티스테이지 빌드로 이미지 크기 최적화 확인
   - Step 3: docker-compose.yml로 앱 + DB 환경 구성
   - Step 4: `docker compose up`으로 전체 서비스 실행 확인

6. **요약**
   - 핵심 키워드: Docker, Container, Image, Dockerfile, Multi-stage Build, Docker Compose, Volume, Port Mapping
   - 다음 세션(11회차) 예고: Docker로 만든 앱을 클라우드(AWS EC2)에 배포

---

### Secondary Goal: Session 12 - GitHub Actions CI/CD + Vercel/GCP + Cloudflare 도메인

**대상 파일**: `content/week4/session12.mdx`

**콘텐츠 아웃라인:**

1. **학습 목표**
   - CI(Continuous Integration)와 CD(Continuous Deployment)의 개념과 차이를 이해한다
   - GitHub Actions로 자동화된 빌드/테스트/배포 파이프라인을 구성할 수 있다
   - EC2 vs Vercel 배포 전략의 장단점을 비교할 수 있다
   - Cloudflare DNS/SSL을 설정하여 도메인을 연결할 수 있다

2. **핵심 개념**
   - CI/CD 개념: 지속적 통합 vs 지속적 배포
   - GitHub Actions 기본 구조: workflow, job, step, action
   - 트리거(trigger): push, pull_request, schedule
   - 배포 전략 비교: EC2 (SSH 기반) vs Vercel (Git 기반) vs GCP Cloud Run
   - 환경변수 관리: GitHub Secrets, .env 패턴
   - Cloudflare DNS: A/CNAME 레코드, 프록시 모드
   - SSL/TLS: Cloudflare Flexible vs Full vs Full (Strict)
   - WAF/방화벽 룰 기초

3. **Mermaid 다이어그램 (3개)**
   - D12-1: CI/CD 파이프라인 전체 흐름 (flowchart)
   - D12-2: GitHub Actions 워크플로우 (sequenceDiagram)
   - D12-3: DNS/도메인 연결 구조 (flowchart)

4. **코드 예제 (5개)**
   - C12-1: .github/workflows/deploy.yml -- `yaml`
   - C12-2: Vercel 설정 -- `json`
   - C12-3: Cloudflare DNS 설정 가이드 -- `text`
   - C12-4: 환경변수 관리 패턴 -- `yaml`
   - C12-5: SSH 기반 배포 스크립트 -- `bash`

5. **실습**
   - Step 1: GitHub Actions workflow 파일 작성 (build + test)
   - Step 2: main merge 시 자동 배포 트리거 구성
   - Step 3: Cloudflare DNS에 도메인 연결 시나리오 (또는 IP 기반 대체)
   - Step 4: 전체 CI/CD 파이프라인 동작 검증

6. **요약**
   - 핵심 키워드: CI/CD, GitHub Actions, Workflow, Vercel, Cloudflare, DNS, SSL/TLS, WAF
   - 부트캠프 전체 회고: 1~12회차 학습 여정 정리
   - 수료 후 학습 방향 안내: Kubernetes, Terraform, 모니터링(Prometheus/Grafana)

---

### Final Goal: Session 11 - AWS EC2 배포 올코스 + SSH/Nginx

**대상 파일**: `content/week4/session11.mdx`

> 참고: Session 11은 가장 많은 내용을 다루므로(EC2 + SSH + Nginx + SSL + S3 + pm2 + 보안) 마일스톤 우선순위는 마지막이나, 구현 시 가장 많은 시간과 주의가 필요하다.

**콘텐츠 아웃라인:**

1. **학습 목표**
   - AWS EC2 인스턴스를 생성하고 SSH로 접속할 수 있다
   - 리눅스 기본 명령어와 파일/폴더 권한을 이해한다
   - pm2로 Node.js 프로세스를 관리할 수 있다
   - Nginx 리버스프록시를 설정하고 Let's Encrypt HTTPS를 적용할 수 있다
   - S3에 정적 파일을 업로드하고, IAM 권한 최소화 원칙을 이해한다
   - 기본 보안 체크리스트를 점검할 수 있다

2. **핵심 개념**
   - AWS EC2 개요: 인스턴스 타입, AMI, 키 페어
   - 보안 그룹(Security Group): 인바운드/아웃바운드 규칙
   - SSH 키 기반 접속: 키 생성, 권한 설정(chmod 400)
   - 리눅스 기본 명령어: ls, cd, mkdir, chmod, chown, ps, top
   - 프로세스 관리: pm2 (ecosystem.config.js, 클러스터 모드, 로그)
   - Nginx: 리버스프록시 개념, server block, proxy_pass, upstream
   - HTTPS: Let's Encrypt, certbot, 인증서 자동 갱신
   - S3: 정적 파일 호스팅, 버킷 정책
   - RDS: (선택사항) 관리형 데이터베이스 소개
   - IAM: 최소 권한 원칙, 정책, 역할
   - 보안 체크리스트: 포트 제한, 키 관리, 업데이트 정책

3. **Mermaid 다이어그램 (3개)**
   - D11-1: AWS EC2 배포 아키텍처 (flowchart) -- 전체 인프라 구성도
   - D11-2: Nginx 리버스프록시 흐름 (sequenceDiagram) -- Client -> Nginx -> Node.js
   - D11-3: SSH 접속 + 보안그룹 (flowchart) -- 네트워크 보안 계층

4. **코드 예제 (6개)**
   - C11-1: SSH 접속 명령어 -- `bash`
   - C11-2: Nginx 설정파일 -- `nginx`
   - C11-3: pm2 ecosystem.config.js -- `javascript`
   - C11-4: Let's Encrypt certbot -- `bash`
   - C11-5: AWS CLI 기본 명령어 -- `bash`
   - C11-6: 보안그룹 설정 설명 -- `text`

5. **실습**
   - Step 1: EC2 인스턴스 생성 (프리 티어 t2.micro)
   - Step 2: SSH 키 페어로 접속, 기본 리눅스 환경 세팅
   - Step 3: Node.js 앱 배포 + pm2 프로세스 관리
   - Step 4: Nginx 리버스프록시 설정 + HTTPS 적용 (또는 IP 직접 접속 대안)
   - Step 5: 보안 체크리스트 점검

6. **요약**
   - 핵심 키워드: EC2, SSH, Security Group, Nginx, Reverse Proxy, Let's Encrypt, HTTPS, pm2, S3, IAM
   - 다음 세션(12회차) 예고: 수동 배포를 자동화하는 CI/CD 파이프라인

---

## 기술적 접근

### MDX 작성 가이드라인

- Nextra 4.x의 content directory convention을 따른다
- Mermaid 다이어그램은 ` ```mermaid ` fenced code block으로 작성한다
- 코드 블록에는 반드시 언어 식별자를 명시한다 (dockerfile, yaml, bash, javascript, nginx, json, text)
- 한국어 본문에 기술 용어 영어를 괄호로 병기한다: 예) 컨테이너(Container)
- 각 섹션은 `##` 레벨 헤딩으로 구분한다

### 다이어그램 작성 원칙

- Mermaid 문법 유효성을 최우선으로 확보한다
- 노드 레이블은 한국어로, 기술 용어는 영어 병기
- flowchart는 TD(top-down) 또는 LR(left-right) 방향 일관성 유지
- sequenceDiagram에서 participant 이름은 영어로, 메시지는 한국어/영어 혼합

### 코드 예제 작성 원칙

- DevOps 특성상 설정 파일(Dockerfile, YAML, Nginx conf)과 CLI 명령어가 주를 이룬다
- 각 코드 블록에 한국어 인라인 주석을 포함한다
- 실제 실행 가능한 수준의 예제를 목표로 한다
- 보안에 민감한 값(API Key, 비밀번호 등)은 placeholder로 표기한다

---

## 리스크 및 대응

| 리스크 | 영향 | 대응 방안 |
|--------|------|-----------|
| Session 11 분량 과다 | 학습자 집중력 저하 | 하위 섹션으로 명확히 분리, "한눈에 보기" 요약표 제공 |
| Mermaid 문법 오류 | 다이어그램 미렌더링 | 작성 후 Nextra dev 서버에서 렌더링 검증 필수 |
| AWS 프리 티어 초과 | 학습자 과금 | 프리 티어 범위 명시, 실습 후 리소스 정리 안내 |
| Docker Desktop 미설치 | 실습 불가 | 사전 요구사항으로 설치 링크 안내, 대안(Play with Docker) 제공 |
| 실제 도메인 미보유 | 도메인 실습 불가 | IP 직접 접속 대안, Cloudflare 시뮬레이션 시나리오 제공 |
| 보안 관련 내용 오해 | 취약한 설정 배포 위험 | 보안 체크리스트 필수 포함, 경고 Callout 활용 |

---

## 의존성

| 의존 항목 | SPEC ID | 상태 |
|-----------|---------|------|
| 사이트 인프라 (Nextra, 레이아웃, 네비게이션) | SPEC-INFRA-001 | draft |
| Week 4 _meta.js, index.mdx | SPEC-INFRA-001 | draft |
| Week 1~3 콘텐츠 (선수 학습) | SPEC-CONTENT-W1 ~ W3 | 미작성 |
