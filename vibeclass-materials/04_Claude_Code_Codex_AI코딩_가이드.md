Claude Code & OpenAI Codex AI 코딩 가이드
학습 목표
Claude Code CLI 설치 및 기본 사용법 습득
OpenAI Codex CLI 사용법 이해
효율적인 프롬프트 작성법 학습
Skills, Subagents, MCP 설정 이해
Part 1: Claude Code
1.1 Claude Code란?
┌─────────────────────────────────────────────────────────┐
│                     Claude Code                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Anthropic의 공식 에이전틱 코딩 도구                    │
│   터미널에서 실행되며 코드베이스를 이해하고               │
│   자연어 명령으로 코딩 작업을 수행                       │
│                                                         │
│   핵심 기능:                                            │
│   • 루틴 작업 자동 실행                                 │
│   • 복잡한 코드 설명                                    │
│   • Git 워크플로우 처리                                 │
│   • 코드베이스 전체 이해                                │
│   • 터미널, IDE, GitHub 통합                           │
│                                                         │
│   요금제:                                               │
│   • Pro ($20/월): 중간~높은 워크로드                    │
│   • Max5 ($100/월): 5배 토큰, 집중 작업용               │
│   • Max20 ($200/월): 20배 토큰, 자율 개발용             │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
1.2 설치
# macOS/Linux (권장)
curl -fsSL https://claude.ai/install.sh | bash

# Homebrew (macOS/Linux)
brew install --cask claude-code

# Windows (권장)
irm https://claude.ai/install.ps1 | iex

# WinGet (Windows)
winget install Anthropic.ClaudeCode

# npm (더 이상 권장하지 않음)
npm install -g @anthropic-ai/claude-code

# 버전 확인
claude --version
claude -v

복사
2. CLI 명령어 (공식 문서 기준)
2.1 기본 명령어
명령어	설명	예시
claude
클릭하여 복사
	대화형 REPL 시작	claude
클릭하여 복사

claude "query"
클릭하여 복사
	초기 프롬프트와 함께 시작	claude "이 프로젝트 설명해줘"
클릭하여 복사

claude -p "query"
클릭하여 복사
	SDK로 쿼리 후 종료	claude -p "이 함수 설명해줘"
클릭하여 복사

cat file | claude -p
클릭하여 복사
	파이프로 콘텐츠 처리	cat logs.txt | claude -p "분석해줘"
클릭하여 복사

claude -c
클릭하여 복사
	현재 디렉토리의 최근 대화 계속	claude -c
클릭하여 복사

claude -c -p "query"
클릭하여 복사
	SDK로 대화 계속	claude -c -p "타입 에러 확인해줘"
클릭하여 복사

claude -r "세션" "query"
클릭하여 복사
	ID나 이름으로 세션 재개	claude -r "auth-refactor" "PR 완료해줘"
클릭하여 복사

claude update
클릭하여 복사
	최신 버전으로 업데이트	claude update
클릭하여 복사

claude mcp
클릭하여 복사
	MCP 서버 설정	MCP 문서 참조
2.2 CLI 플래그 (전체)
플래그	설명	예시
--add-dir
클릭하여 복사
	추가 작업 디렉토리 접근 허용	claude --add-dir ../apps ../lib
클릭하여 복사

--agent
클릭하여 복사
	현재 세션의 에이전트 지정	claude --agent my-custom-agent
클릭하여 복사

--agents
클릭하여 복사
	JSON으로 커스텀 서브에이전트 정의	아래 예시 참조
--allowedTools
클릭하여 복사
	권한 없이 실행할 도구	"Bash(git log *)" "Read"
클릭하여 복사

--append-system-prompt
클릭하여 복사
	기본 시스템 프롬프트에 추가	claude --append-system-prompt "TypeScript 사용"
클릭하여 복사

--append-system-prompt-file
클릭하여 복사
	파일에서 시스템 프롬프트 추가	claude -p --append-system-prompt-file ./rules.txt
클릭하여 복사

--chrome
클릭하여 복사
	Chrome 브라우저 통합 활성화	claude --chrome
클릭하여 복사

--continue, -c
클릭하여 복사
	최근 대화 로드	claude --continue
클릭하여 복사

--dangerously-skip-permissions
클릭하여 복사
	모든 권한 프롬프트 건너뛰기 (주의!)	claude --dangerously-skip-permissions
클릭하여 복사

--debug
클릭하여 복사
	디버그 모드 활성화	claude --debug "api,mcp"
클릭하여 복사

--disable-slash-commands
클릭하여 복사
	스킬/슬래시 명령 비활성화	claude --disable-slash-commands
클릭하여 복사

--disallowedTools
클릭하여 복사
	사용 불가 도구 지정	"Bash(rm *)" "Edit"
클릭하여 복사

--fallback-model
클릭하여 복사
	오버로드 시 대체 모델	claude -p --fallback-model sonnet "query"
클릭하여 복사

--fork-session
클릭하여 복사
	세션 재개 시 새 ID 생성	claude --resume abc123 --fork-session
클릭하여 복사

--from-pr
클릭하여 복사
	GitHub PR에 연결된 세션 재개	claude --from-pr 123
클릭하여 복사

--ide
클릭하여 복사
	IDE 자동 연결	claude --ide
클릭하여 복사

--init
클릭하여 복사
	초기화 훅 실행 후 대화형 모드	claude --init
클릭하여 복사

--init-only
클릭하여 복사
	초기화 훅만 실행 후 종료	claude --init-only
클릭하여 복사

--input-format
클릭하여 복사
	입력 형식 지정	text
클릭하여 복사
, stream-json
클릭하여 복사

--json-schema
클릭하여 복사
	JSON Schema로 출력 검증	claude -p --json-schema '{...}' "query"
클릭하여 복사

--max-budget-usd
클릭하여 복사
	API 비용 제한	claude -p --max-budget-usd 5.00 "query"
클릭하여 복사

--max-turns
클릭하여 복사
	에이전틱 턴 수 제한	claude -p --max-turns 3 "query"
클릭하여 복사

--mcp-config
클릭하여 복사
	MCP 서버 JSON 로드	claude --mcp-config ./mcp.json
클릭하여 복사

--model
클릭하여 복사
	모델 설정	claude --model sonnet
클릭하여 복사
 또는 opus
클릭하여 복사

--no-chrome
클릭하여 복사
	Chrome 통합 비활성화	claude --no-chrome
클릭하여 복사

--output-format
클릭하여 복사
	출력 형식 지정	text
클릭하여 복사
, json
클릭하여 복사
, stream-json
클릭하여 복사

--permission-mode
클릭하여 복사
	권한 모드 시작	claude --permission-mode plan
클릭하여 복사

--print, -p
클릭하여 복사
	비대화형 모드로 응답 출력	claude -p "query"
클릭하여 복사

--remote
클릭하여 복사
	claude.ai에서 웹 세션 생성	claude --remote "로그인 버그 수정"
클릭하여 복사

--resume, -r
클릭하여 복사
	특정 세션 재개	claude --resume auth-refactor
클릭하여 복사

--session-id
클릭하여 복사
	특정 세션 ID 사용 (UUID)	claude --session-id "550e8400-..."
클릭하여 복사

--system-prompt
클릭하여 복사
	전체 시스템 프롬프트 교체	claude --system-prompt "Python 전문가"
클릭하여 복사

--system-prompt-file
클릭하여 복사
	파일에서 시스템 프롬프트 로드	claude -p --system-prompt-file ./prompt.txt
클릭하여 복사

--teleport
클릭하여 복사
	웹 세션을 로컬 터미널로 재개	claude --teleport
클릭하여 복사

--tools
클릭하여 복사
	사용 가능한 도구 제한	claude --tools "Bash,Edit,Read"
클릭하여 복사

--verbose
클릭하여 복사
	상세 로깅 활성화	claude --verbose
클릭하여 복사

--version, -v
클릭하여 복사
	버전 출력	claude -v
클릭하여 복사
2.3 --agents 플래그 형식
claude --agents '{
  "code-reviewer": {
    "description": "코드 리뷰 전문가. 코드 변경 후 사전에 사용.",
    "prompt": "당신은 시니어 코드 리뷰어입니다. 코드 품질, 보안, 모범 사례에 집중하세요.",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  },
  "debugger": {
    "description": "에러와 테스트 실패를 위한 디버깅 전문가.",
    "prompt": "당신은 전문 디버거입니다. 에러를 분석하고, 근본 원인을 찾고, 수정안을 제공하세요."
  }
}'

복사
필드	필수	설명
description
클릭하여 복사
	예	서브에이전트가 호출되어야 할 때의 자연어 설명
prompt
클릭하여 복사
	예	서브에이전트 행동을 안내하는 시스템 프롬프트
tools
클릭하여 복사
	아니오	사용 가능한 도구 배열 (예: ["Read", "Edit", "Bash"]
클릭하여 복사
)
model
클릭하여 복사
	아니오	모델 별칭: sonnet
클릭하여 복사
, opus
클릭하여 복사
, haiku
클릭하여 복사
, inherit
클릭하여 복사
3. 슬래시 명령어
3.1 내장 슬래시 명령어
명령어	설명
/help
클릭하여 복사
	사용 가능한 명령어 표시
/exit
클릭하여 복사
	세션 종료
/compact
클릭하여 복사
	컨텍스트 크기 줄이기
/bashes
클릭하여 복사
	백그라운드 프로세스 목록
/kill <id>
클릭하여 복사
	백그라운드 프로세스 중지
/commands
클릭하여 복사
	슬래시 명령어 목록
/hooks
클릭하여 복사
	설정된 훅 표시
/skills
클릭하여 복사
	사용 가능한 스킬 목록
/config
클릭하여 복사
	설정 인터랙티브 조정
/allowed-tools
클릭하여 복사
	권한 관리
/vim
클릭하여 복사
	vim 스타일 편집 활성화
/agents
클릭하여 복사
	특수 서브에이전트 생성
/mcp
클릭하여 복사
	MCP 서버 관리
/terminal-setup
클릭하여 복사
	Shift+Enter 단축키 설치
3.2 키보드 단축키
단축키	설명
Option+T
클릭하여 복사
 (macOS) / Alt+T
클릭하여 복사
 (Windows/Linux)	확장 사고 토글
Ctrl+O
클릭하여 복사
	상세 모드 (추론 출력 보기)
Shift+Enter
클릭하여 복사
	줄바꿈 (/terminal-setup 설치 후)
Ctrl+C
클릭하여 복사
	현재 작업 취소
Ctrl+L
클릭하여 복사
	화면 지우기
Esc
클릭하여 복사
 두 번	이전 메시지 편집
3.3 파일 참조 (@)
# 특정 파일 참조
@./src/components/Button.tsx

# 디렉토리 재귀 참조
@./src/api/

# 사용 예시
> @./src/utils.ts 이 파일을 리팩토링해줘

복사
4. 설정 파일
4.1 설정 계층 구조
~/.claude/settings.json         # 사용자 전역 설정
.claude/settings.json           # 프로젝트 설정 (git에 커밋)
.claude/settings.local.json     # 로컬 프로젝트 설정 (git 무시)

클릭하여 복사
복사
4.2 settings.json 예시
{
  "model": "sonnet",
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(git *)",
      "Read",
      "Edit"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)"
    ]
  },
  "hooks": {
    "afterEdit": "npm run format"
  }
}

복사
4.3 CLAUDE.md 파일
# CLAUDE.md

Claude Code가 자동으로 컨텍스트에 로드하는 특별한 파일입니다.

## 배치 위치
- 저장소 루트 (가장 일반적)
- 모노레포의 상위 디렉토리
- 홈 폴더: ~/.claude/CLAUDE.md (모든 세션에 적용)

## 내용 예시
# 프로젝트 개요
Next.js 14 기반 교육 플랫폼

## 기술 스택
- TypeScript strict 모드
- Tailwind CSS
- Prisma ORM

## 코딩 규칙
1. 함수형 컴포넌트만 사용
2. any 타입 사용 금지
3. 커밋 전 lint 필수

## 자동 생성
/init 명령어로 CLAUDE.md 자동 생성 가능

복사
5. 스킬 (Skills)
5.1 스킬이란?
커스텀 슬래시 명령 = 스킬

저장 위치:
- 프로젝트: .claude/commands/ 또는 .claude/skills/
- 개인: ~/.claude/commands/

파일명이 명령어 이름이 됨:
.claude/commands/review.md → /project:review
.claude/skills/review/SKILL.md → /review

클릭하여 복사
복사
5.2 스킬 만들기
# .claude/commands/fix-github-issue.md

GitHub 이슈 #$ARGUMENTS를 수정합니다.

1. 이슈 내용을 읽고 분석
2. 관련 코드 찾기
3. 수정 구현
4. 테스트 실행
5. 커밋 생성

복사
# 사용법
/project:fix-github-issue 1234

복사
5.3 스킬 vs 슬래시 명령어
구분	슬래시 명령어	에이전트 스킬
호출	사용자가 /명령어
클릭하여 복사
 입력	모델이 자동 판단
복잡도	단순 프롬프트, 단일 파일	복잡한 기능, 다중 파일
파일	.claude/commands/
클릭하여 복사
	.claude/skills/SKILL.md
클릭하여 복사
6. MCP (Model Context Protocol)
6.1 MCP 서버 설정
// ~/.claude/mcp.json 또는 .claude/mcp.json

{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-server-filesystem"]
    }
  }
}

복사
6.2 MCP 명령어
# MCP 서버 추가
claude mcp add github

# MCP 서버 목록
claude mcp list

# 특정 서버 정보
claude mcp get github

# 서버 제거
claude mcp remove github

복사
Part 2: OpenAI Codex
7.1 Codex란?
┌─────────────────────────────────────────────────────────┐
│                    OpenAI Codex CLI                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   OpenAI의 경량 코딩 에이전트                            │
│   터미널에서 실행되는 로컬 도구                          │
│                                                         │
│   지원 환경:                                            │
│   • macOS, Windows, Linux                              │
│                                                         │
│   기본 모델:                                            │
│   • macOS/Linux: gpt-5-codex                           │
│   • Windows: gpt-5                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
7.2 설치
# npm
npm i -g @openai/codex

# Homebrew
brew install --cask codex

# 로그인
codex login

# API 키로 로그인
printenv OPENAI_API_KEY | codex login --with-api-key

복사
8. Codex CLI 명령어
8.1 전역 플래그
플래그	타입	설명
--add-dir
클릭하여 복사
	path	추가 디렉토리에 쓰기 권한 부여
--ask-for-approval, -a
클릭하여 복사
	옵션	명령 실행 전 승인 시점 결정
--cd, -C
클릭하여 복사
	path	작업 디렉토리 설정
--config, -c
클릭하여 복사
	key=value	설정 값 오버라이드
--dangerously-bypass-approvals-and-sandbox
클릭하여 복사
	-	승인/샌드박스 건너뛰기 (위험!)
--full-auto
클릭하여 복사
	-	낮은 마찰 로컬 작업 단축키
--image, -i
클릭하여 복사
	path	이미지 파일 첨부
--model, -m
클릭하여 복사
	string	모델 오버라이드
--oss
클릭하여 복사
	-	로컬 오픈소스 모델 사용 (Ollama 필요)
--profile, -p
클릭하여 복사
	string	~/.codex/config.toml에서 프로필 로드
--sandbox, -s
클릭하여 복사
	옵션	샌드박스 정책 선택
--search
클릭하여 복사
	-	캐시 대신 실시간 웹 검색
8.2 승인 모드 (--ask-for-approval
클릭하여 복사
)
값	설명
untrusted
클릭하여 복사
	모든 명령에 승인 필요
on-failure
클릭하여 복사
	실패 시에만 승인
on-request
클릭하여 복사
	요청 시에만 승인
never
클릭하여 복사
	승인 없음
8.3 샌드박스 모드 (--sandbox
클릭하여 복사
)
값	설명
read-only
클릭하여 복사
	읽기만 가능
workspace-write
클릭하여 복사
	작업 공간에만 쓰기
danger-full-access
클릭하여 복사
	전체 접근 (위험!)
8.4 핵심 명령어
# 대화형 모드 시작
codex
codex "이 코드베이스 설명해줘"

# 비대화형 실행
codex exec "CI 실패 수정해줘"
codex e "버그 수정"

# 세션 재개
codex resume           # 세션 선택기
codex resume --last    # 가장 최근 세션
codex resume <ID>      # 특정 세션

# 세션 포크 (원본 유지하며 새 스레드)
codex fork

# 클라우드 작업
codex cloud exec --env ENV_ID "오픈 버그 요약"
codex cloud list

# diff 적용
codex apply

# 셸 자동완성 생성
codex completion bash
codex completion zsh
codex completion fish

# 기능 플래그 관리
codex features list
codex features enable <feature>
codex features disable <feature>

# MCP 관리
codex mcp add <name>
codex mcp list
codex mcp remove <name>

# 로그인/로그아웃
codex login
codex login --device-auth
codex login status
codex logout

복사
9. Codex 슬래시 명령어
명령어	설명
/permissions
클릭하여 복사
	Codex가 승인 없이 할 수 있는 것 설정
/apps
클릭하여 복사
	앱(커넥터) 브라우징 및 프롬프트에 삽입
/compact
클릭하여 복사
	토큰 절약을 위해 대화 요약
/diff
클릭하여 복사
	Git diff 표시 (추적 안 되는 파일 포함)
/exit
클릭하여 복사
 또는 /quit
클릭하여 복사
	CLI 종료
/feedback
클릭하여 복사
	Codex 관리자에게 로그 전송
/init
클릭하여 복사
	현재 디렉토리에 AGENTS.md 스캐폴드 생성
/logout
클릭하여 복사
	Codex에서 로그아웃
/mcp
클릭하여 복사
	MCP 도구 목록
/mention
클릭하여 복사
	파일을 대화에 첨부
/model
클릭하여 복사
	활성 모델 선택 (추론 레벨 조절 가능)
/ps
클릭하여 복사
	백그라운드 터미널 및 출력 표시
/fork
클릭하여 복사
	현재 대화를 새 스레드로 포크
/resume
클릭하여 복사
	저장된 대화 재개
/new
클릭하여 복사
	같은 CLI 세션 내에서 새 대화 시작
/review
클릭하여 복사
	작업 트리 리뷰 요청
/status
클릭하여 복사
	세션 설정 및 토큰 사용량 표시
10. Codex 설정
10.1 config.toml
# ~/.codex/config.toml

model = "gpt-5-codex"
sandbox = "workspace-write"
ask_for_approval = "on-failure"

[web_search]
mode = "live"  # 또는 "cached"

[profiles.strict]
sandbox = "read-only"
ask_for_approval = "untrusted"

복사
10.2 AGENTS.md
# AGENTS.md

Codex용 지속적 지침 파일 (Claude Code의 CLAUDE.md와 유사)

/init 명령으로 자동 생성 가능

## 프로젝트 규칙
- TypeScript 사용
- 테스트 필수

복사
11. 빠른 팁 모음
Claude Code 팁
# 파이프로 에러 분석
cat error.log | claude -p "이 에러 분석해줘"

# 이미지 첨부 (Codex)
codex -i screenshot.png "이 에러 설명해줘"

# @ 로 파일 퍼지 검색 (작성 중에)
# ! 로 셸 명령 실행

# 토큰 절약: 다른 작업은 별도 세션으로

복사
권장 설정
✓ 모든 변경사항 수락 전 검토
✓ 개별 권한 승인 사용 (일괄 X)
✓ .env 같은 민감한 파일 접근 거부
✓ 작업별 별도 세션으로 토큰 효율화
✓ 코드 포맷팅 훅 설정

클릭하여 복사
복사
12. 비교 요약
항목	Claude Code	OpenAI Codex
제작사	Anthropic	OpenAI
모델	Claude (Sonnet, Opus)	GPT-5-Codex, GPT-5
설정 파일	CLAUDE.md	AGENTS.md
설정 형식	JSON	TOML
MCP 지원	✅	✅
웹 세션	✅ (--remote
클릭하여 복사
)	✅ (Cloud)
브라우저 통합	Chrome (--chrome
클릭하여 복사
)	-
샌드박스	권한 모드	Seatbelt/Landlock
참고 자료
Claude Code
공식 문서
CLI 레퍼런스
GitHub
Discord
OpenAI Codex
공식 문서
CLI 레퍼런스
기능 가이드
GitHub