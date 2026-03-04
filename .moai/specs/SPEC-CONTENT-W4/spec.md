---
id: SPEC-CONTENT-W4
title: "Week 4 Content: DevOps and Deployment (Sessions 10-12)"
version: 1.0.0
status: implemented
created: 2026-02-21
updated: 2026-02-21
author: MoAI
priority: high
tags: [content, week4, devops, docker, aws, ec2, nginx, cicd, github-actions, cloudflare]
---

## HISTORY

| 버전 | 날짜 | 작성자 | 변경 내용 |
|------|------|--------|-----------|
| 1.0.0 | 2026-02-21 | MoAI | 초기 SPEC 작성 |

---

## 1. 개요

4주차 콘텐츠(10~12회차)를 작성한다. DevOps 기초를 다루며, Docker 컨테이너화(10회차), AWS EC2 배포 + Nginx/SSL(11회차), GitHub Actions CI/CD + 도메인 연결(12회차)로 구성된다. 각 세션은 학습 목표, 핵심 개념, Mermaid 다이어그램(세션당 2~3개), 코드 예제, 실습, 요약의 통일된 템플릿을 따른다. 모든 콘텐츠는 한국어로 작성하며, 기술 용어는 영어를 병기한다.

## 2. 환경 (Environment)

### 2.1 콘텐츠 대상 파일

| 파일 경로 | 세션 | 주제 |
|-----------|------|------|
| `content/week4/session10.mdx` | 10회차 | Docker로 실행환경 만들기 |
| `content/week4/session11.mdx` | 11회차 | AWS EC2 배포 올코스 + SSH/Nginx |
| `content/week4/session12.mdx` | 12회차 | GitHub Actions CI/CD + Vercel/GCP + Cloudflare 도메인 |

### 2.2 콘텐츠 프레임워크

- **형식**: MDX (Nextra 4.x content directory convention)
- **다이어그램**: Mermaid (Nextra 내장 지원)
- **코드 하이라이팅**: Nextra 내장 syntax highlighting
- **언어**: 한국어 본문, 기술 용어 영어 병기

### 2.3 전제 조건

- SPEC-INFRA-001 인프라 설정이 완료되어 있어야 한다
- `content/week4/` 디렉토리, `_meta.js`, `index.mdx`가 존재해야 한다

## 3. 가정 (Assumptions)

- A1: 학습자는 1~3주차(Session 1~9) 내용을 이수하여 HTML/CSS/JS, React, Next.js, 데이터베이스, 인증 기초 개념을 보유하고 있다.
- A2: 학습자는 터미널/CLI 기본 사용법에 익숙하다 (1회차에서 학습 완료).
- A3: Docker Desktop이 학습자 로컬 환경에 설치 가능하다 (Windows/macOS/Linux).
- A4: 실습에서 실제 AWS 계정이 필요하지만, 프리 티어 범위 내에서 수행 가능하다.
- A5: 실습에서 실제 도메인 없이도 배포 동작 확인이 가능하다 (IP 직접 접속 또는 로컬 테스트).
- A6: Mermaid 다이어그램은 Nextra의 fenced code block 문법으로 작성하며, 추가 플러그인이 불필요하다.

## 4. 요구사항 (Requirements)

### 모듈 R1: 세션 템플릿 준수

**R1.1 [Ubiquitous]**
시스템은 **항상** 각 세션 MDX 파일에 다음 6개 섹션을 순서대로 포함해야 한다: 학습 목표, 핵심 개념, 다이어그램, 코드 예제, 실습, 요약.

**R1.2 [Ubiquitous]**
시스템은 **항상** 각 세션에 2~3개의 Mermaid 다이어그램을 포함해야 한다.

**R1.3 [Ubiquitous]**
시스템은 **항상** 코드 예제에 적절한 언어 식별자(dockerfile, yaml, bash, javascript, nginx 등)와 인라인 주석을 포함해야 한다.

**R1.4 [Unwanted]**
시스템은 영어 전용 설명 없이 한국어 본문만 제공하는 상태를 **유지하지 않아야 한다** -- 기술 용어는 반드시 영어를 병기해야 한다.

### 모듈 R2: Session 10 - Docker로 실행환경 만들기

**R2.1 [Ubiquitous]**
시스템은 **항상** Docker의 핵심 개념(이미지, 컨테이너, 레지스트리, 레이어)을 설명해야 한다.

**R2.2 [Event-Driven]**
**WHEN** 학습자가 Dockerfile 섹션을 학습하면 **THEN** 기본 Dockerfile 작성법과 멀티스테이지 빌드(Multi-stage Build) 패턴을 이해할 수 있어야 한다.

**R2.3 [Event-Driven]**
**WHEN** 학습자가 실습 섹션을 완료하면 **THEN** Next.js/Node.js 애플리케이션을 Docker 컨테이너로 빌드하고 Docker Compose로 서비스를 구성할 수 있어야 한다.

**R2.4 [Ubiquitous]**
시스템은 **항상** .dockerignore 파일의 역할과 작성법을 설명해야 한다.

### 모듈 R3: Session 11 - AWS EC2 배포 올코스 + SSH/Nginx

**R3.1 [Ubiquitous]**
시스템은 **항상** EC2 인스턴스 생성, 키 페어, 보안 그룹(Security Group) 설정을 설명해야 한다.

**R3.2 [Event-Driven]**
**WHEN** 학습자가 SSH 접속 섹션을 학습하면 **THEN** SSH 키 기반 접속과 기본 리눅스 명령어(파일 탐색, 권한 관리)를 수행할 수 있어야 한다.

**R3.3 [Event-Driven]**
**WHEN** 학습자가 Nginx 섹션을 학습하면 **THEN** 리버스 프록시 설정과 Let's Encrypt를 통한 HTTPS 적용 방법을 이해해야 한다.

**R3.4 [Ubiquitous]**
시스템은 **항상** 프로세스 관리(pm2 또는 systemd), S3 정적 파일 호스팅, IAM 권한 최소화, 기본 보안 체크리스트를 다루어야 한다.

**R3.5 [State-Driven]**
**IF** 학습자가 실제 도메인을 보유하지 않은 상태라면 **THEN** IP 직접 접속으로 배포 동작 확인이 가능한 대안을 제시해야 한다.

### 모듈 R4: Session 12 - GitHub Actions CI/CD + Vercel/GCP + Cloudflare 도메인

**R4.1 [Ubiquitous]**
시스템은 **항상** CI(빌드/테스트)와 CD(배포) 개념을 분리하여 설명하고, EC2 vs Vercel 배포 전략을 비교해야 한다.

**R4.2 [Event-Driven]**
**WHEN** 학습자가 GitHub Actions 섹션을 학습하면 **THEN** `.github/workflows/deploy.yml` 파이프라인 구성 방법을 이해해야 한다.

**R4.3 [Event-Driven]**
**WHEN** 학습자가 도메인 섹션을 학습하면 **THEN** Cloudflare DNS 설정, SSL/TLS 구성, 기본 보안(WAF/방화벽 룰) 개념을 이해해야 한다.

**R4.4 [Event-Driven]**
**WHEN** 학습자가 실습을 완료하면 **THEN** main 브랜치 merge 시 자동 배포가 트리거되는 CI/CD 파이프라인 시나리오를 구성할 수 있어야 한다.

### 모듈 R5: 콘텐츠 품질 및 일관성

**R5.1 [Ubiquitous]**
시스템은 **항상** Mermaid 다이어그램이 Nextra에서 정상 렌더링되는 유효한 문법을 사용해야 한다.

**R5.2 [Ubiquitous]**
시스템은 **항상** 코드 예제가 구문 오류 없이 올바른 형식으로 작성되어야 한다.

**R5.3 [Unwanted]**
시스템은 Week 1~3에서 다루지 않은 고급 개념(Kubernetes, Terraform, Ansible 등)을 사전 설명 없이 도입**하지 않아야 한다**.

**R5.4 [Ubiquitous]**
시스템은 **항상** 각 세션의 요약 섹션에서 핵심 키워드를 정리하고 다음 세션 또는 부트캠프 수료 후 학습 방향을 안내해야 한다.

## 5. 명세 (Specifications)

### 5.1 세션별 예상 분량

| 세션 | 예상 분량 | 다이어그램 수 | 코드 예제 수 | 비고 |
|------|-----------|---------------|--------------|------|
| 10회차 | 중간 | 3 | 6 | Dockerfile, Compose 중심 |
| 11회차 | 높음 | 3 | 6 | EC2 + Nginx + SSL + S3 + 보안 (가장 많은 내용) |
| 12회차 | 중간 | 3 | 5 | GitHub Actions YAML, 도메인 설정 |

### 5.2 세션별 Mermaid 다이어그램 명세

**Session 10 다이어그램:**

| 번호 | 유형 | 제목 | 내용 |
|------|------|------|------|
| D10-1 | flowchart | Docker 아키텍처 | 이미지, 컨테이너, 레지스트리 관계 (Dockerfile -> Image -> Container, Registry) |
| D10-2 | flowchart | 멀티스테이지 빌드 프로세스 | Stage 1 (Build) -> Stage 2 (Production), 이미지 크기 최적화 흐름 |
| D10-3 | graph | Docker Compose 서비스 구성 | app 서비스, db 서비스, 네트워크, 볼륨 연결 구조 |

**Session 11 다이어그램:**

| 번호 | 유형 | 제목 | 내용 |
|------|------|------|------|
| D11-1 | flowchart | AWS EC2 배포 아키텍처 | 사용자 -> Route53/IP -> EC2 (Nginx -> Node.js App), S3, RDS 구성 |
| D11-2 | sequenceDiagram | Nginx 리버스프록시 흐름 | Client -> Nginx (80/443) -> Node.js (3000), SSL 핸드셰이크 포함 |
| D11-3 | flowchart | SSH 접속 + 보안그룹 | 로컬 PC -> SSH(22) -> EC2, 보안그룹 인바운드/아웃바운드 규칙 |

**Session 12 다이어그램:**

| 번호 | 유형 | 제목 | 내용 |
|------|------|------|------|
| D12-1 | flowchart | CI/CD 파이프라인 | Code Push -> Build -> Test -> Deploy (EC2 or Vercel) 전체 흐름 |
| D12-2 | sequenceDiagram | GitHub Actions 워크플로우 | Developer -> GitHub -> Actions Runner -> Build/Test -> Deploy Target |
| D12-3 | flowchart | DNS/도메인 연결 구조 | Domain -> Cloudflare DNS -> Origin Server (EC2/Vercel), SSL/TLS 계층 |

### 5.3 세션별 코드 예제 명세

**Session 10 코드 예제:**

| 번호 | 언어 | 제목 | 설명 |
|------|------|------|------|
| C10-1 | dockerfile | 기본 Dockerfile (Node.js) | FROM, WORKDIR, COPY, RUN, EXPOSE, CMD |
| C10-2 | dockerfile | 멀티스테이지 Dockerfile | Build stage + Production stage, 이미지 크기 비교 |
| C10-3 | text | .dockerignore | node_modules, .git, .env 등 제외 패턴 |
| C10-4 | yaml | docker-compose.yml | app + db 서비스, 포트, 볼륨, 환경변수 |
| C10-5 | bash | docker build/run 명령어 | 빌드, 실행, 로그 확인, 정리 명령어 |
| C10-6 | bash | 포트 매핑/볼륨 마운트 | -p, -v 플래그 사용 예제 |

**Session 11 코드 예제:**

| 번호 | 언어 | 제목 | 설명 |
|------|------|------|------|
| C11-1 | bash | SSH 접속 명령어 | ssh -i, 키 권한, 기본 리눅스 명령어 |
| C11-2 | nginx | Nginx 설정파일 | server block, proxy_pass, location |
| C11-3 | javascript | pm2 ecosystem.config.js | 앱 설정, 클러스터 모드, 환경변수 |
| C11-4 | bash | Let's Encrypt certbot | certbot 설치, 인증서 발급, 자동 갱신 |
| C11-5 | bash | AWS CLI 기본 | ec2 describe, s3 cp, 기본 명령어 |
| C11-6 | text | 보안그룹 설정 | 인바운드 규칙 (SSH:22, HTTP:80, HTTPS:443) |

**Session 12 코드 예제:**

| 번호 | 언어 | 제목 | 설명 |
|------|------|------|------|
| C12-1 | yaml | .github/workflows/deploy.yml | CI/CD 파이프라인 전체 구성 |
| C12-2 | json | Vercel 설정 | vercel.json 기본 설정, 환경변수 |
| C12-3 | text | Cloudflare DNS 설정 | A/CNAME 레코드, 프록시 설정 |
| C12-4 | yaml | 환경변수 관리 | GitHub Secrets, .env 관리 패턴 |
| C12-5 | bash | 배포 스크립트 | SSH 기반 배포 자동화, rsync |

## 6. 추적성 (Traceability)

| 요구사항 | 대상 파일 | 검증 방법 |
|----------|-----------|-----------|
| R1.1-R1.4 | session10~12.mdx | 템플릿 섹션 구조 확인, 다이어그램/코드 존재 여부 |
| R2.1-R2.4 | session10.mdx | Docker 개념 설명, Dockerfile/Compose 코드, 실습 포함 확인 |
| R3.1-R3.5 | session11.mdx | EC2/SSH/Nginx/SSL/S3/보안 내용 포함 확인 |
| R4.1-R4.4 | session12.mdx | CI/CD 개념, GitHub Actions YAML, DNS 설정, 실습 포함 확인 |
| R5.1-R5.4 | session10~12.mdx | Mermaid 문법 유효성, 코드 구문 검증, 요약 키워드 확인 |
