---
id: SPEC-DOCS-001
title: Vibeclass 콘텐츠 강화 계획 - 인수 기준
version: 1.0.0
status: Planned
created: 2026-03-04
updated: 2026-03-04
---

# SPEC-DOCS-001 인수 기준

> 추적성 태그: SPEC-DOCS-001 | 참조: spec.md, plan.md

---

## 인수 기준 개요

모든 인수 기준은 Given-When-Then (주어진 조건-동작-결과) 형식으로 작성되었습니다.

---

## AC-001: Week 0 사전 준비 섹션 접근성

**참조**: SPEC-DOCS-001-R001

### 시나리오 1: 신규 수강생의 첫 방문

```gherkin
Given 코딩 경험이 없는 신규 수강생이 사이트를 방문한다
When  메인 네비게이션을 확인한다
Then  "Week 0: 시작 전 준비" 섹션이 Week 1 이전에 표시되어야 한다
And   Week 0 섹션에 "바이브코딩 소개", "개발환경 준비", "AI 도구 입문" 하위 페이지가 있어야 한다
```

### 시나리오 2: Week 0 콘텐츠 존재 확인

```gherkin
Given 수강생이 Week 0 섹션에 접근한다
When  각 하위 페이지를 열어본다
Then  각 페이지는 다음을 포함해야 한다:
      - YAML frontmatter (title, description)
      - 학습 목표 섹션
      - 핵심 포인트 요약
And   다음 원본 자료가 통합되어 있어야 한다:
      - 바이브코딩이란, 컴퓨터와_대화하기, AI와_대화하기 (바이브코딩 소개)
      - 개발도구_설치_가이드, 에디터_터미널_연동 (개발환경 준비)
      - 터미널_기본_명령어, 기초_IT_용어_정리 (AI 도구 입문)
```

### 시나리오 3: 기존 Week 번호 비간섭

```gherkin
Given Week 0 섹션이 추가된 상태다
When  수강생이 "Week 1: 개발 기초"로 이동한다
Then  Week 1의 URL, 제목, 번호 매김이 변경되지 않아야 한다
And   Week 2, 3, 4도 동일하게 영향받지 않아야 한다
```

**완료 조건**:
- [ ] Week 0 네비게이션 항목 존재
- [ ] 3개 하위 페이지 접근 가능
- [ ] 원본 자료 6개 이상 통합
- [ ] Week 1-4 번호 유지

---

## AC-002: Session 강사 자료 링크

**참조**: SPEC-DOCS-001-R002

### 시나리오 4: Session 1 강사 자료 확인

```gherkin
Given 수강생이 Week 1의 Session 1 페이지를 읽고 있다
When  페이지 하단 "강사 자료" 섹션을 찾는다
Then  해당 섹션이 존재해야 한다
And   Category D의 "세션1_개발환경_설정" 자료 링크가 포함되어야 한다
And   관련 심화 학습 링크도 포함되어야 한다
```

### 시나리오 5: 모든 12개 세션 강사 자료 존재

```gherkin
Given 수강생이 임의의 세션(Session 1-12)을 열어본다
When  "강사 자료" 섹션을 확인한다
Then  모든 12개 세션에 "강사 자료" 섹션이 존재해야 한다
And   각 섹션은 해당 세션의 Category D 자료를 링크해야 한다
And   내부 링크가 404가 아니어야 한다 (유효한 링크)
```

### 시나리오 6: 심화 학습 연동 링크

```gherkin
Given 수강생이 Session 7 (DB/PostgreSQL)을 학습 중이다
When  "강사 자료" 섹션의 심화 학습 링크를 클릭한다
Then  "심화 학습" 부록의 PostgreSQL 가이드로 이동해야 한다
And   해당 페이지가 정상적으로 렌더링되어야 한다
```

**완료 조건**:
- [ ] 12개 세션 모두 "강사 자료" 섹션 보유
- [ ] 각 섹션 최소 1개 이상의 링크
- [ ] 모든 링크 유효 (404 없음)

---

## AC-003: AI 도구 부록 섹션

**참조**: SPEC-DOCS-001-R003

### 시나리오 7: AI 도구 섹션 존재 확인

```gherkin
Given 수강생이 사이트 네비게이션을 확인한다
When  "부록" 섹션을 클릭한다
Then  "AI 도구" 하위 섹션이 보여야 한다
And   최소 9개 페이지가 나열되어야 한다
```

### 시나리오 8: Claude Code 명령어 접근

```gherkin
Given 수강생이 Claude Code 명령어를 배우고 싶다
When  부록 > AI 도구 > "Claude Code 필수 명령어" 페이지를 연다
Then  Claude_Code_필수_명령어 원본 자료가 MDX 형식으로 표시되어야 한다
And   학습 목표, 핵심 포인트 섹션이 포함되어야 한다
```

### 시나리오 9: 프롬프트 자료 단일 출처

```gherkin
Given "AI 도구" 섹션에 실전_프롬프트_50선이 있다
When  사이트 전체를 검색한다
Then  동일한 내용이 다른 섹션에 중복되어 존재하지 않아야 한다
```

**완료 조건**:
- [ ] AI 도구 섹션 9개 이상 페이지
- [ ] 각 페이지 Nextra MDX 형식 준수
- [ ] 콘텐츠 중복 없음

---

## AC-004: 심화 학습 부록 섹션

**참조**: SPEC-DOCS-001-R004

### 시나리오 10: 고급 Node.js 콘텐츠 탐색

```gherkin
Given 수강생이 Node.js를 더 깊이 배우고 싶다
When  부록 > 심화 학습 섹션으로 이동한다
Then  "NodeJS 핵심" 페이지를 찾을 수 있어야 한다
And   "Express 완전정복" 페이지도 찾을 수 있어야 한다
```

### 시나리오 11: Python 3부작 순서 표시

```gherkin
Given 수강생이 심화 학습 섹션의 Python 자료를 찾는다
When  Python 관련 페이지 목록을 확인한다
Then  "Python 기초", "Python 중급", "Python 고급"이 순서대로 나열되어야 한다
And   각 페이지에 난이도 표시가 있어야 한다
```

### 시나리오 12: Session-심화학습 연계 확인

```gherkin
Given 수강생이 Session 8 (MongoDB)을 학습한 후 심화 학습을 원한다
When  Session 8의 심화 자료 링크를 클릭한다
Then  심화 학습 섹션의 관련 데이터베이스 가이드로 이동해야 한다
And   링크가 정상 작동해야 한다
```

**완료 조건**:
- [ ] 심화 학습 섹션 9개 이상 페이지
- [ ] Python 3부작 순서 명확
- [ ] Session과의 연계 링크 유효

---

## AC-005: 언어 가이드 부록 섹션

**참조**: SPEC-DOCS-001-R005

### 시나리오 13: JavaScript 완전 가이드 접근

```gherkin
Given 수강생이 JavaScript를 처음부터 체계적으로 배우고 싶다
When  부록 > 언어 가이드 > "JavaScript 기초부터 실전까지"를 연다
Then  JavaScript_기초부터_실전까지 원본 자료가 MDX 형식으로 표시되어야 한다
And   기초/중급/고급 섹션이 구분되어 있어야 한다
```

### 시나리오 14: Git 가이드 세션 연계

```gherkin
Given 수강생이 언어 가이드의 Git 자료를 보고 있다
When  관련 세션 링크를 확인한다
Then  Week 1 Session 1과의 연계 링크가 있어야 한다
```

**완료 조건**:
- [ ] 언어 가이드 섹션 5개 페이지
- [ ] 기존 세션과의 연계 링크 포함

---

## AC-006: 콘텐츠 형식 표준

**참조**: SPEC-DOCS-001-R006

### 시나리오 15: MDX 형식 준수

```gherkin
Given vibeclass-materials에서 마이그레이션된 모든 페이지가 있다
When  각 페이지를 렌더링한다
Then  다음 요소가 모두 포함되어야 한다:
      - YAML frontmatter (title, description 포함)
      - 학습 목표 섹션
      - 핵심 포인트 요약 섹션
And   코드 예제가 있는 경우 적절한 언어 하이라이팅이 적용되어야 한다
```

### 시나리오 16: 원본 파일 보존

```gherkin
Given 콘텐츠 마이그레이션이 완료된 상태다
When  vibeclass-materials/ 디렉토리를 확인한다
Then  원본 파일이 그대로 존재해야 한다
And   원본 파일 내용이 수정되지 않아야 한다
```

### 시나리오 17: 빌드 성공

```gherkin
Given 모든 Phase가 완료된 상태다
When  npm run build 명령을 실행한다
Then  빌드가 오류 없이 성공해야 한다
And   모든 신규 페이지가 정적 생성되어야 한다
```

**완료 조건**:
- [ ] 모든 MDX 파일 frontmatter 포함
- [ ] 원본 파일 미변경
- [ ] `npm run build` 성공

---

## AC-007: 성능 기준

### 시나리오 18: 페이지 로딩 성능

```gherkin
Given 모든 콘텐츠 추가가 완료된 상태다
When  임의의 신규 페이지에 접근한다
Then  첫 번째 콘텐츠 렌더링(FCP)이 3초 이내여야 한다
And   정적 생성 페이지로 제공되어야 한다 (SSG)
```

### 시나리오 19: 네비게이션 응답성

```gherkin
Given 수강생이 사이트를 탐색하고 있다
When  어떤 섹션이든 클릭해서 이동한다
Then  페이지 전환이 1초 이내로 완료되어야 한다 (클라이언트 사이드 라우팅)
```

**완료 조건**:
- [ ] FCP 3초 이내 (Lighthouse 기준)
- [ ] 모든 페이지 SSG 생성

---

## 완료 정의 (Definition of Done)

전체 SPEC-DOCS-001이 완료된 것으로 간주되려면 다음 조건을 모두 만족해야 합니다:

### 기능 완료 기준

- [ ] **P1**: Week 0 섹션 5개 파일 생성 및 네비게이션 등록
- [ ] **P2**: 12개 세션 모두 "강사 자료" 섹션 보유
- [ ] **P3**: AI 도구 섹션 9개 이상 페이지 생성
- [ ] **P4**: 심화 학습 섹션 9개 이상 페이지 생성
- [ ] **P5**: 언어 가이드 섹션 5개 페이지 생성
- [ ] **P6**: 학습 경로 인덱스 페이지 생성

### 품질 기준

- [ ] `npm run build` 빌드 오류 없음
- [ ] 모든 내부 링크 유효 (404 없음)
- [ ] 모든 페이지 MDX frontmatter 포함
- [ ] 원본 `vibeclass-materials/` 파일 미변경

### 콘텐츠 기준

- [ ] 59개 강사 자료 중 핵심 자료 (Category A, B, C, D, E, F, G, H, I) 모두 사이트에 포함
- [ ] 각 페이지 학습 목표 + 핵심 포인트 요약 포함
- [ ] 한국어 콘텐츠 일관성 유지

---

## 검증 방법

### 자동 검증

```bash
# 빌드 검증
npm run build

# 링크 유효성 검사 (next-link-checker 또는 유사 도구)
npx linkinator http://localhost:3000 --recurse

# MDX 형식 검증
npx mdx --check content/**/*.mdx
```

### 수동 검증 체크리스트

1. **네비게이션 검증**: 사이트 열어서 모든 섹션 클릭 확인
2. **콘텐츠 검증**: 각 신규 페이지 열어서 형식 확인
3. **링크 검증**: 강사 자료 링크 10개 이상 무작위 클릭
4. **성능 검증**: Chrome DevTools Lighthouse로 FCP 확인
5. **원본 보존 검증**: `git diff vibeclass-materials/` 실행 (변경 없어야 함)
