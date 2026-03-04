Claude Code (클로드 코드) 필수 명령어 문서 (한글 버전)

대상: Claude Code CLI 기반 바이브코딩 / 실무 자동화 목표: 코드 탐색 → 수정 → 테스트 → 커밋까지 터미널에서 한 번에

0. Claude Code 한 줄 설명
Claude Code는 프로젝트 전체 코드를 이해하고 함께 수정해주는 AI CLI 도구
명령은 👉 자연어(영어 권장)로 지시
설명은 한글로 이해, 지시는 영어로 하는 게 가장 안정적
1. 설치 및 기본 설정
설치
npm install -g @anthropic-ai/claude-code

복사
버전 확인
claude --version

복사
로그인 / API 키 설정
claude auth login

복사

또는

export ANTHROPIC_API_KEY=sk-xxxx

복사
2. 프로젝트에서 기본 사용 흐름
cd 프로젝트폴더
claude

복사

👉 이후부터는 대화형 세션 (이 안에서 자연어로 계속 지시)

3. 가장 많이 쓰는 핵심 명령 (의도별)
3-1. 프로젝트 / 코드 설명 요청
이 프로젝트 구조를 설명해줘
(explain this project)

복사
이 파일이 무슨 역할인지 설명해줘
(explain src/server.ts)

복사
3-2. 코드 수정 (바이브코딩 핵심)
이 코드를 더 읽기 쉽게 리팩토링해줘
(refactor this file to be more readable)

복사
이 함수에 에러 처리를 추가해줘
(add error handling to this function)

복사
콜백을 async/await 구조로 바꿔줘
(convert this to async/await)

복사
3-3. 기능 추가 요청
JWT 기반 로그인 API를 추가해줘
(add login API using JWT)

복사
이 API에 페이지네이션을 추가해줘
(add pagination to this endpoint)

복사
zod로 입력값 검증을 추가해줘
(add validation with zod)

복사
4. 범위 제한 (사고 방지 필수)
src/api 폴더만 보고 작업해줘
(look only at src/api)

복사
src 폴더 안의 파일만 수정해줘
(only modify files under src/)

복사
node_modules, dist는 무시해줘
(ignore node_modules and dist)

복사
5. 테스트 / 디버깅 활용
이 파일에 대한 유닛 테스트를 작성해줘
(write unit tests for this file)

복사
실패한 테스트를 고쳐줘
(fix failing tests)

복사
아래 에러 로그를 분석해줘
(analyze this error log)

복사

에러 로그 붙일 때 패턴

아래는 에러 로그야:
<로그 붙여넣기>

복사
6. Git 연계 (실무에서 매우 유용)
변경 사항 요약
변경된 내용을 요약해줘
(summarize changes)

복사
커밋 메시지 생성
컨벤션에 맞는 커밋 메시지를 만들어줘
(generate a conventional commit message)

복사
PR 설명 생성
PR 설명을 작성해줘
(write a PR description)

복사
7. 잘 먹히는 명령 스타일 (중요)
설명은 하지 말고 코드만 수정해줘
(do not explain, just modify the code)

복사
변경은 최소한으로 해줘
(keep changes minimal)

복사
기존 코드 스타일을 유지해줘
(follow existing code style)

복사
8. 여러 파일 동시에 작업할 때
UserService가 사용되는 모든 곳을 찾아줘
(search for all usages of UserService)

복사
관련된 모든 참조를 함께 수정해줘
(update all references accordingly)

복사
9. Claude Code + 터미널 실전 패턴
npm test

복사

(실패 로그 복사)

claude

복사
이 테스트 실패 로그를 기준으로 문제를 해결해줘

복사
10. 바이브코딩 추천 워크플로우
claude
클릭하여 복사
 실행
"이 프로젝트를 설명해줘"
원하는 기능을 자연어로 명확히 지시
"변경은 최소한으로 해줘"
테스트 실행
커밋 메시지 생성
직접 git commit
클릭하여 복사
11. 자주 쓰는 치트 문장 (복붙용)
차근차근 생각해서 처리해줘
(think step by step)

복사
운영 환경을 기준으로 고려해줘
(assume production environment)

복사
엣지 케이스도 고려해줘
(consider edge cases)

복사
가독성을 최우선으로 해줘
(optimize for readability)

복사
⚠️ 주의사항 (실무 중요)
큰 변경은 반드시 범위 제한부터
자동 수정 후 git diff
클릭하여 복사
로 직접 확인
한 번에 많은 요구 ❌ → 기능 단위로 요청
한 줄 요약

Claude Code는 자동 코딩기가 아니라 같이 일하는 시니어 개발자 말은 명확하게, 범위는 좁게, 검증은 사람이