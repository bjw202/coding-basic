---
id: SPEC-CONTENT-W4
title: "Week 4 Content Acceptance Criteria"
version: 1.0.0
status: draft
created: 2026-02-21
updated: 2026-02-21
author: MoAI
priority: high
---

## 인수 기준

### 시나리오 1: Dockerfile 유효성 및 Docker 콘텐츠 완성도

**Given** Session 10 (session10.mdx) 파일이 작성되었을 때
**When** 콘텐츠 구조를 검증하면
**Then** 다음 조건을 모두 만족해야 한다:
- 6개 섹션(학습 목표, 핵심 개념, 다이어그램, 코드 예제, 실습, 요약)이 순서대로 포함되어 있다
- Mermaid 다이어그램이 3개 포함되어 있다 (Docker 아키텍처, 멀티스테이지 빌드, Docker Compose 구성)
- 모든 Mermaid 다이어그램이 Nextra dev 서버에서 오류 없이 렌더링된다
- 기본 Dockerfile (Node.js)과 멀티스테이지 Dockerfile 코드 예제가 포함되어 있다
- Dockerfile 코드 예제에 `dockerfile` 언어 식별자가 지정되어 있다
- .dockerignore 파일 예제가 포함되어 있다
- docker-compose.yml 예제에 app + db 서비스 구성이 포함되어 있다
- 실습 섹션에 Docker 빌드부터 Compose 실행까지의 단계별 가이드가 있다
- 모든 코드 블록에 한국어 인라인 주석이 포함되어 있다

---

### 시나리오 2: AWS 배포 흐름 명확성 및 Session 11 완성도

**Given** Session 11 (session11.mdx) 파일이 작성되었을 때
**When** 배포 과정의 설명 흐름을 검증하면
**Then** 다음 조건을 모두 만족해야 한다:
- EC2 인스턴스 생성 -> SSH 접속 -> 앱 배포 -> Nginx 설정 -> HTTPS 적용의 순차적 학습 경로가 명확하다
- 6개 섹션(학습 목표, 핵심 개념, 다이어그램, 코드 예제, 실습, 요약)이 순서대로 포함되어 있다
- Mermaid 다이어그램이 3개 포함되어 있다 (EC2 아키텍처, Nginx 리버스프록시, SSH 보안그룹)
- 모든 Mermaid 다이어그램이 Nextra dev 서버에서 오류 없이 렌더링된다
- SSH 접속 명령어에 키 권한 설정(chmod 400)이 포함되어 있다
- Nginx 설정파일에 server block과 proxy_pass가 포함되어 있다
- pm2 ecosystem.config.js 예제가 포함되어 있다
- Let's Encrypt certbot 설치/발급/갱신 명령어가 포함되어 있다
- 보안 체크리스트(포트 제한, 키 관리 등)가 포함되어 있다
- 실제 도메인 없이도 IP 직접 접속으로 배포를 확인할 수 있는 대안이 명시되어 있다
- IAM 최소 권한 원칙에 대한 설명이 포함되어 있다

---

### 시나리오 3: CI/CD 파이프라인 완성도 및 Session 12 콘텐츠 검증

**Given** Session 12 (session12.mdx) 파일이 작성되었을 때
**When** CI/CD 파이프라인 콘텐츠를 검증하면
**Then** 다음 조건을 모두 만족해야 한다:
- 6개 섹션(학습 목표, 핵심 개념, 다이어그램, 코드 예제, 실습, 요약)이 순서대로 포함되어 있다
- Mermaid 다이어그램이 3개 포함되어 있다 (CI/CD 파이프라인, GitHub Actions 워크플로우, DNS 구조)
- 모든 Mermaid 다이어그램이 Nextra dev 서버에서 오류 없이 렌더링된다
- `.github/workflows/deploy.yml` 예제가 완전한 YAML 구조로 포함되어 있다
- GitHub Actions YAML에 build, test, deploy step이 모두 포함되어 있다
- CI(빌드/테스트)와 CD(배포) 개념이 분리되어 설명되어 있다
- EC2 vs Vercel 배포 전략 비교가 포함되어 있다
- Cloudflare DNS 설정 방법(A/CNAME 레코드)이 설명되어 있다
- SSL/TLS 설정(Flexible, Full, Full Strict 차이)이 설명되어 있다
- main 브랜치 merge 시 자동 배포가 트리거되는 시나리오가 실습에 포함되어 있다
- 요약 섹션에 부트캠프 전체 회고 및 수료 후 학습 방향이 안내되어 있다

---

### 시나리오 4: 콘텐츠 품질 및 일관성 검증

**Given** Session 10, 11, 12 전체 MDX 파일이 작성되었을 때
**When** 콘텐츠 품질을 전체적으로 검증하면
**Then** 다음 조건을 모두 만족해야 한다:
- 총 9개의 Mermaid 다이어그램이 포함되어 있다 (세션당 3개)
- 총 17개의 코드 예제가 포함되어 있다 (Session 10: 6개, Session 11: 6개, Session 12: 5개)
- 모든 코드 블록에 적절한 언어 식별자(dockerfile, yaml, bash, javascript, nginx, json, text)가 지정되어 있다
- 한국어 본문에 기술 용어가 영어로 병기되어 있다 (예: 컨테이너(Container))
- Week 1~3에서 다루지 않은 고급 개념(Kubernetes, Terraform, Ansible)이 사전 설명 없이 본문에 도입되지 않았다
- 각 세션의 요약에 핵심 키워드 목록이 정리되어 있다
- Session 10과 11의 요약에 다음 세션 예고가 포함되어 있다
- Session 12의 요약에 부트캠프 수료 후 학습 방향이 안내되어 있다
- 보안 관련 코드 예제에 placeholder 값이 사용되었다 (실제 비밀번호/키 미포함)
- `npm run dev` 실행 시 session10~12.mdx 페이지가 오류 없이 렌더링된다

---

### 시나리오 5: Nextra 빌드 검증

**Given** 모든 4주차 콘텐츠가 `content/week4/` 디렉토리에 작성되었을 때
**When** `npm run build` 명령을 실행하면
**Then** 다음 조건을 만족해야 한다:
- 빌드가 에러 없이 완료된다
- session10, session11, session12 페이지가 정적 HTML로 생성된다
- 사이드바에서 "4주차: DevOps와 배포" 하위에 3개 세션이 올바른 한국어 레이블로 표시된다
- Pagefind 인덱스에 4주차 콘텐츠가 포함되어 검색 가능하다

---

## Definition of Done

- [ ] `content/week4/session10.mdx` 작성 완료
- [ ] `content/week4/session11.mdx` 작성 완료
- [ ] `content/week4/session12.mdx` 작성 완료
- [ ] 각 세션에 6개 섹션 (학습 목표, 핵심 개념, 다이어그램, 코드 예제, 실습, 요약) 포함
- [ ] 총 9개 Mermaid 다이어그램 포함 및 렌더링 검증
- [ ] 총 17개 코드 예제 포함 및 언어 식별자 지정
- [ ] 한국어 본문 + 기술 용어 영어 병기 규칙 준수
- [ ] 보안 민감 정보 placeholder 처리
- [ ] `npm run dev`에서 3개 세션 페이지 오류 없이 렌더링
- [ ] `npm run build` 성공 (에러 및 타입 오류 없음)
