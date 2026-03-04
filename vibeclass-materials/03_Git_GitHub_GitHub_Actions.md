Git, GitHub, GitHub Actions 완벽 가이드
학습 목표
Git의 기본 개념과 핵심 명령어 습득
GitHub를 활용한 협업 워크플로우 이해
GitHub Actions로 CI/CD 파이프라인 구축
1. Git 기초
1.1 Git이란?
┌─────────────────────────────────────────────────────────┐
│                        Git                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   "분산 버전 관리 시스템"                                │
│                                                         │
│   핵심 기능:                                            │
│   • 파일 변경 이력 추적                                  │
│   • 이전 버전으로 복원                                   │
│   • 여러 명이 동시 작업 가능                             │
│   • 브랜치로 독립적 작업                                 │
│                                                         │
│   왜 필요한가?                                          │
│   • "최종.zip", "진짜최종.zip" 지옥 탈출                │
│   • 누가 언제 무엇을 변경했는지 추적                     │
│   • 실수해도 이전 상태로 복구 가능                       │
│   • 팀원들과 충돌 없이 협업                              │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
1.2 Git 설치 및 초기 설정
# macOS
brew install git

# Ubuntu
sudo apt install git

# Windows
# https://git-scm.com/download/win

# 버전 확인
git --version

# 사용자 정보 설정 (필수!)
git config --global user.name "홍길동"
git config --global user.email "hong@example.com"

# 기본 브랜치명 설정
git config --global init.defaultBranch main

# 설정 확인
git config --list

# 에디터 설정
git config --global core.editor "code --wait"  # VS Code

복사
1.3 Git 기본 개념
┌─────────────────────────────────────────────────────────┐
│                    Git의 3가지 영역                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Working Directory     Staging Area      Repository   │
│   (작업 디렉토리)        (스테이징)        (저장소)      │
│                                                         │
│   [파일 수정]  ─────▶  [git add]  ─────▶  [git commit] │
│                                                         │
│   실제 작업하는         커밋 준비          변경 이력     │
│   폴더                  영역               저장소        │
│                                                         │
└─────────────────────────────────────────────────────────┘

커밋(Commit): 변경사항의 스냅샷 (저장 포인트)
브랜치(Branch): 독립적인 작업 흐름
HEAD: 현재 작업 중인 커밋을 가리키는 포인터

클릭하여 복사
복사
2. Git 필수 명령어
2.1 저장소 생성
# 새 저장소 생성
git init
git init my-project  # 폴더 생성하며 초기화

# 원격 저장소 복제
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git my-folder  # 다른 폴더명

# SSH로 복제
git clone git@github.com:user/repo.git

복사
2.2 기본 워크플로우
# 상태 확인 (자주 사용!)
git status

# 변경사항 확인
git diff                    # 스테이징 전 변경사항
git diff --staged           # 스테이징된 변경사항
git diff HEAD               # 모든 변경사항

# 스테이징 (커밋 준비)
git add 파일명              # 특정 파일
git add .                   # 모든 변경 파일
git add *.js                # 패턴 매칭
git add -p                  # 대화형 추가 (일부만)

# 스테이징 취소
git restore --staged 파일명
git reset HEAD 파일명       # 옛날 방식

# 커밋
git commit -m "커밋 메시지"
git commit                  # 에디터에서 메시지 작성
git commit -am "메시지"     # add + commit (추적 중인 파일만)

# 커밋 수정 (마지막 커밋만)
git commit --amend -m "새 메시지"
git commit --amend          # 파일 추가 후 커밋 수정

복사
2.3 커밋 이력 확인
# 로그 보기
git log
git log --oneline           # 한 줄로
git log --oneline -10       # 최근 10개
git log --graph             # 그래프로
git log --graph --oneline --all  # 모든 브랜치 그래프
git log -p                  # 변경 내용 포함
git log --stat              # 변경 통계
git log --author="홍길동"   # 특정 작성자
git log --since="2024-01-01"  # 특정 날짜 이후
git log -- 파일명           # 특정 파일 이력

# 특정 커밋 보기
git show 커밋해시
git show HEAD               # 최신 커밋
git show HEAD~1             # 이전 커밋

# 파일별 수정 이력
git blame 파일명

복사
2.4 브랜치
# 브랜치 목록
git branch                  # 로컬 브랜치
git branch -r               # 원격 브랜치
git branch -a               # 모든 브랜치

# 브랜치 생성
git branch 브랜치명

# 브랜치 이동
git checkout 브랜치명
git switch 브랜치명         # 새로운 방식 (권장)

# 생성하면서 이동
git checkout -b 브랜치명
git switch -c 브랜치명      # 새로운 방식

# 브랜치 이름 변경
git branch -m 새이름
git branch -m 옛이름 새이름

# 브랜치 삭제
git branch -d 브랜치명      # 병합된 브랜치만
git branch -D 브랜치명      # 강제 삭제

복사
2.5 병합 (Merge)
# 브랜치 병합 (현재 브랜치에 다른 브랜치 병합)
git checkout main
git merge feature-branch

# Fast-forward 병합 (기록 없음)
git merge feature-branch

# Non-fast-forward 병합 (병합 커밋 생성)
git merge --no-ff feature-branch

# 충돌 해결 후
git add .
git commit  # 또는 git merge --continue

# 병합 취소
git merge --abort

# Squash 병합 (여러 커밋을 하나로)
git merge --squash feature-branch
git commit -m "feature 병합"

복사
2.6 리베이스 (Rebase)
# 리베이스 (커밋을 다른 브랜치 위로 이동)
git checkout feature-branch
git rebase main

# 대화형 리베이스 (커밋 정리)
git rebase -i HEAD~3        # 최근 3개 커밋 정리

# 대화형 리베이스 명령어
# pick   - 커밋 유지
# reword - 메시지 수정
# edit   - 커밋 수정
# squash - 이전 커밋과 합치기 (메시지 유지)
# fixup  - 이전 커밋과 합치기 (메시지 버리기)
# drop   - 커밋 삭제

# 리베이스 중단
git rebase --abort

# 리베이스 충돌 해결 후 계속
git add .
git rebase --continue

복사
2.7 원격 저장소
# 원격 저장소 확인
git remote -v

# 원격 저장소 추가
git remote add origin https://github.com/user/repo.git

# 원격 저장소 URL 변경
git remote set-url origin 새URL

# 원격 저장소 제거
git remote remove origin

# 푸시 (업로드)
git push origin main
git push -u origin main     # 업스트림 설정 (이후 git push만으로 가능)
git push --force            # 강제 푸시 (주의!)
git push --force-with-lease # 더 안전한 강제 푸시

# 풀 (다운로드 + 병합)
git pull origin main
git pull                    # 업스트림 설정된 경우

# 페치 (다운로드만, 병합 안 함)
git fetch origin
git fetch --all

# 원격 브랜치 삭제
git push origin --delete 브랜치명

복사
2.8 되돌리기
# 작업 디렉토리 변경 취소 (수정 버리기)
git restore 파일명
git checkout -- 파일명      # 옛날 방식

# 스테이징 취소
git restore --staged 파일명
git reset HEAD 파일명       # 옛날 방식

# 커밋 되돌리기 (새 커밋 생성)
git revert 커밋해시
git revert HEAD             # 마지막 커밋 되돌리기
git revert HEAD~3..HEAD     # 최근 3개 커밋 되돌리기

# 커밋 리셋 (이력 수정 - 주의!)
git reset --soft HEAD~1     # 커밋만 취소 (스테이징 유지)
git reset --mixed HEAD~1    # 커밋+스테이징 취소 (기본값)
git reset --hard HEAD~1     # 모든 변경 취소 (위험!)

# 특정 파일만 복원
git checkout 커밋해시 -- 파일명

복사
2.9 Stash (임시 저장)
# 변경사항 임시 저장
git stash
git stash save "작업 중 메시지"
git stash -u                # untracked 파일 포함

# stash 목록
git stash list

# stash 적용
git stash pop               # 적용 + 삭제
git stash apply             # 적용만
git stash apply stash@{0}   # 특정 stash

# stash 삭제
git stash drop stash@{0}
git stash clear             # 전체 삭제

# stash 내용 확인
git stash show
git stash show -p           # 상세 변경사항

복사
2.10 태그
# 태그 목록
git tag
git tag -l "v1.*"           # 패턴 검색

# 태그 생성
git tag v1.0.0                      # 경량 태그
git tag -a v1.0.0 -m "버전 1.0.0"   # 주석 태그 (권장)
git tag -a v1.0.0 커밋해시          # 특정 커밋에 태그

# 태그 푸시
git push origin v1.0.0
git push origin --tags      # 모든 태그

# 태그 삭제
git tag -d v1.0.0
git push origin --delete v1.0.0

# 태그로 체크아웃
git checkout v1.0.0
git checkout -b release-v1 v1.0.0

복사
3. GitHub 사용법
3.1 GitHub 계정 및 SSH 설정
# SSH 키 생성
ssh-keygen -t ed25519 -C "your-email@example.com"

# SSH 에이전트에 키 추가
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 공개 키 복사 (GitHub에 등록)
cat ~/.ssh/id_ed25519.pub
# 또는
pbcopy < ~/.ssh/id_ed25519.pub  # macOS

# GitHub 연결 테스트
ssh -T git@github.com

복사
3.2 저장소 생성 및 연결
# 새 프로젝트 시작
mkdir my-project
cd my-project
git init

# GitHub에서 저장소 생성 후 연결
git remote add origin git@github.com:username/my-project.git

# 첫 커밋 및 푸시
git add .
git commit -m "Initial commit"
git push -u origin main

복사
3.3 브랜치 전략
┌─────────────────────────────────────────────────────────┐
│                   Git Flow 전략                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   main (production)                                     │
│   ├── 배포 가능한 안정 버전                              │
│   │                                                     │
│   develop (개발)                                        │
│   ├── 개발 중인 다음 버전                                │
│   │                                                     │
│   feature/* (기능)                                      │
│   ├── 새 기능 개발                                      │
│   ├── develop에서 분기 → develop으로 병합               │
│   │                                                     │
│   release/* (릴리스)                                    │
│   ├── 배포 준비                                         │
│   │                                                     │
│   hotfix/* (긴급 수정)                                  │
│   └── main에서 분기 → main, develop으로 병합            │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│               GitHub Flow (단순화)                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   main                                                  │
│   └── 항상 배포 가능한 상태                              │
│                                                         │
│   feature-branch                                        │
│   ├── main에서 분기                                     │
│   ├── 작업 완료 후 PR 생성                              │
│   ├── 코드 리뷰                                         │
│   └── main으로 병합 → 자동 배포                         │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
3.4 Pull Request (PR) 워크플로우
# 1. 브랜치 생성 및 작업
git checkout -b feature/new-feature

# 2. 작업 및 커밋
git add .
git commit -m "feat: 새 기능 추가"

# 3. 원격에 푸시
git push -u origin feature/new-feature

# 4. GitHub에서 PR 생성
#    - base: main ← compare: feature/new-feature
#    - 제목, 설명 작성
#    - 리뷰어 지정

# 5. 리뷰 및 수정
git add .
git commit -m "fix: 리뷰 반영"
git push

# 6. PR 병합 (GitHub에서)
#    - Merge commit: 모든 커밋 유지
#    - Squash and merge: 하나의 커밋으로
#    - Rebase and merge: 리베이스 후 병합

# 7. 로컬 정리
git checkout main
git pull
git branch -d feature/new-feature

복사
3.5 이슈와 프로젝트
# 이슈 템플릿 (.github/ISSUE_TEMPLATE/bug_report.md)
---
name: 버그 리포트
about: 버그를 신고해주세요
---

## 버그 설명
버그에 대한 명확한 설명

## 재현 방법
1. '...'로 이동
2. '...'를 클릭
3. 에러 발생

## 예상 동작
정상적으로 어떻게 동작해야 하는지

## 스크린샷
해당되는 경우 스크린샷 첨부

## 환경
- OS: [예: macOS]
- 브라우저: [예: Chrome 120]

복사
# PR 템플릿 (.github/pull_request_template.md)
## 변경 사항
-

## 관련 이슈
- closes #

## 테스트
- [ ] 로컬에서 테스트 완료
- [ ] 새로운 테스트 추가

## 체크리스트
- [ ] 코드 스타일 준수
- [ ] 문서 업데이트
- [ ] 커밋 메시지 규칙 준수

복사
4. GitHub Actions
4.1 GitHub Actions 개념
┌─────────────────────────────────────────────────────────┐
│                   GitHub Actions                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   자동화 워크플로우 플랫폼                               │
│                                                         │
│   구성 요소:                                            │
│   ├── Workflow: 자동화 프로세스 (.yml 파일)             │
│   ├── Event: 워크플로우 트리거 (push, PR 등)            │
│   ├── Job: 워크플로우 내 실행 단위                      │
│   ├── Step: Job 내 개별 작업                            │
│   ├── Action: 재사용 가능한 작업 단위                   │
│   └── Runner: 워크플로우 실행 환경                      │
│                                                         │
│   무료 사용량 (Public 저장소는 무제한):                  │
│   • 2,000분/월 (Linux)                                 │
│   • 500MB 스토리지                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
4.2 기본 워크플로우 구조
# .github/workflows/ci.yml
name: CI  # 워크플로우 이름

# 트리거 이벤트
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  workflow_dispatch:  # 수동 실행 허용

# 환경 변수
env:
  NODE_VERSION: '20'

# 작업 정의
jobs:
  build:
    name: Build and Test
    runs-on: ubuntu-latest  # 실행 환경

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

      # 테스트 실행
      - name: Run tests
        run: npm test

      # 빌드
      - name: Build
        run: npm run build

복사
4.3 트리거 이벤트
on:
  # Push 이벤트
  push:
    branches:
      - main
      - 'release/**'
    tags:
      - 'v*'
    paths:
      - 'src/**'
      - '!src/**/*.md'  # 제외

  # Pull Request 이벤트
  pull_request:
    types: [opened, synchronize, reopened]
    branches: [main]

  # 스케줄 (Cron)
  schedule:
    - cron: '0 0 * * *'  # 매일 자정

  # 수동 실행
  workflow_dispatch:
    inputs:
      environment:
        description: '배포 환경'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

  # 다른 워크플로우에서 호출
  workflow_call:
    inputs:
      config-path:
        required: true
        type: string

복사
4.4 Jobs와 Steps
jobs:
  # 첫 번째 Job
  build:
    runs-on: ubuntu-latest
    outputs:
      artifact-path: ${{ steps.build.outputs.path }}

    steps:
      - uses: actions/checkout@v4

      - name: Build
        id: build
        run: |
          npm run build
          echo "path=./dist" >> $GITHUB_OUTPUT

  # 두 번째 Job (build 완료 후 실행)
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Deploy
        run: echo "Deploying ${{ needs.build.outputs.artifact-path }}"

  # 병렬 실행
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - run: npm test

복사
4.5 Secrets와 환경 변수
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production  # 환경 설정 사용

    steps:
      - name: Deploy
        env:
          API_KEY: ${{ secrets.API_KEY }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          echo "Deploying..."
          # secrets는 로그에 마스킹됨

복사
GitHub 설정:
Settings → Secrets and variables → Actions

Repository secrets: 저장소 전용
Environment secrets: 환경별 (production, staging 등)
Organization secrets: 조직 전체

클릭하여 복사
복사
4.6 캐싱
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      # npm 캐시 (setup-node에 내장)
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      # 커스텀 캐시
      - name: Cache dependencies
        uses: actions/cache@v4
        with:
          path: |
            ~/.npm
            node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - run: npm ci

복사
4.7 아티팩트
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - run: npm run build

      # 아티팩트 업로드
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: dist/
          retention-days: 7

  deploy:
    needs: build
    runs-on: ubuntu-latest

    steps:
      # 아티팩트 다운로드
      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: build-output
          path: dist/

      - run: ls -la dist/

복사
4.8 실전 CI/CD 워크플로우
# .github/workflows/ci-cd.yml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  # 린트 및 타입 체크
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  # 테스트
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci
      - run: npm test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        if: always()

  # 빌드
  build:
    runs-on: ubuntu-latest
    needs: [lint, test]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci
      - run: npm run build

      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: .next/

  # 배포 (main 브랜치만)
  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production

    steps:
      - uses: actions/checkout@v4

      - uses: actions/download-artifact@v4
        with:
          name: build
          path: .next/

      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd ~/app
            git pull
            npm ci
            npm run build
            pm2 restart app

      # Slack 알림
      - name: Notify Slack
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          fields: repo,message,commit,author
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}

복사
4.9 재사용 가능한 워크플로우
# .github/workflows/reusable-build.yml
name: Reusable Build

on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: '20'
    secrets:
      npm-token:
        required: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
          cache: 'npm'

      - run: npm ci
      - run: npm run build

복사
# 다른 워크플로우에서 호출
jobs:
  call-build:
    uses: ./.github/workflows/reusable-build.yml
    with:
      node-version: '20'
    secrets:
      npm-token: ${{ secrets.NPM_TOKEN }}

복사
5. 커밋 메시지 컨벤션
5.1 Conventional Commits
<type>(<scope>): <subject>

<body>

<footer>

클릭하여 복사
복사
# Type (필수)
feat:     새로운 기능
fix:      버그 수정
docs:     문서 변경
style:    코드 포맷팅 (세미콜론 등)
refactor: 리팩토링
test:     테스트 추가/수정
chore:    빌드/설정 변경
perf:     성능 개선
ci:       CI 설정 변경

# 예시
feat(auth): 카카오 로그인 추가

- 카카오 OAuth 프로바이더 설정
- 로그인 버튼 UI 추가

closes #123

# Breaking Change
feat!: API 응답 형식 변경

BREAKING CHANGE: 응답 구조가 변경되었습니다.
이전: { data: ... }
이후: { result: { data: ... } }

복사
5.2 커밋 메시지 검사 (commitlint)
# 설치
npm install -D @commitlint/cli @commitlint/config-conventional

# 설정 (commitlint.config.js)
module.exports = {
  extends: ['@commitlint/config-conventional']
};

# Husky로 Git Hook 설정
npm install -D husky
npx husky install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

복사
6. .gitignore
# 의존성
node_modules/
vendor/

# 빌드 결과물
dist/
build/
.next/
out/

# 환경 설정
.env
.env.local
.env.*.local

# 로그
*.log
npm-debug.log*

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# 테스트
coverage/

# 캐시
.cache/
.parcel-cache/
.turbo/

# 임시 파일
*.tmp
*.temp

복사
정리
Git 필수 명령어
# 기본 워크플로우
git status
git add .
git commit -m "메시지"
git push

# 브랜치
git branch 이름
git switch 이름
git merge 이름

# 원격
git pull
git fetch
git push -u origin 브랜치

# 되돌리기
git restore 파일
git revert 커밋
git reset --hard HEAD~1

복사
GitHub Actions 핵심
.github/workflows/
클릭하여 복사
 폴더에 YAML 파일
on:
클릭하여 복사
 트리거 이벤트 정의
jobs:
클릭하여 복사
 실행할 작업 정의
steps:
클릭하여 복사
 개별 단계 정의
uses:
클릭하여 복사
 재사용 가능한 액션 사용
다음 학습 추천
Git 고급 (cherry-pick, bisect, worktree)
GitHub Pages
GitHub Packages
GitHub Codespaces