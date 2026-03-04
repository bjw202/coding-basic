---
id: SPEC-DOCS-001
title: Vibeclass 콘텐츠 강화 계획 - 구현 계획
version: 1.0.0
status: Planned
created: 2026-03-04
updated: 2026-03-04
---

# SPEC-DOCS-001 구현 계획

> 추적성 태그: SPEC-DOCS-001 | 우선순위: High

## 개요

59개 강사 자료(`vibeclass-materials/`)를 기존 Nextra 4.x 문서 사이트 구조에 통합하는 계획입니다. 하이브리드 접근법으로 4개 영역을 강화합니다:

1. **Week 0 신설**: 사전 준비 오리엔테이션 섹션
2. **Session 1-12 강화**: 강사 참고 자료 링크 임베드
3. **AI 도구 부록 신설**: AI 프롬프팅 + CLAUDE.md 가이드
4. **심화 학습 + 언어 가이드 부록 신설**: 백엔드 심화 자료

---

## 기술 접근 방식

### Nextra 4.x 구조 이해

- `_meta.js`: 각 섹션의 네비게이션 순서 및 제목 정의
- `.mdx` 파일: MDX 형식 콘텐츠 (frontmatter + Markdown + JSX)
- `nextra/components`: Callout, Tabs, Steps 등 내장 컴포넌트 활용
- `content/` 루트의 `_meta.js`에 신규 섹션 등록 필요

### 마이그레이션 원칙

1. **원본 보존**: `vibeclass-materials/` 파일은 수정하지 않음
2. **MDX 변환**: 마크다운 → MDX + frontmatter + Nextra 컴포넌트
3. **한국어 유지**: 모든 콘텐츠는 한국어로 유지
4. **단계적 배포**: 각 Phase별로 독립적으로 배포 가능

---

## 구현 마일스톤

### Phase 1 (우선순위 높음): Week 0 섹션 생성

**목표**: 신규 수강생을 위한 사전 준비 오리엔테이션 섹션 생성

**참조**: SPEC-DOCS-001-R001

**생성 파일 목록** (5개 신규 파일):

```
content/week0/
├── _meta.js                    # 섹션 네비게이션 등록
├── index.mdx                   # Week 0 소개 페이지
├── vibe-coding-intro.mdx       # 바이브코딩이란 + 컴퓨터와_대화하기 + AI와_대화하기 통합
├── dev-environment.mdx         # 개발도구_설치_가이드 + 에디터_터미널_연동 통합
└── terminal-basics.mdx         # 터미널_기본_명령어 + 기초_IT_용어_정리 통합
```

**작업 상세**:
- `content/_meta.js`에 `week0` 섹션 등록 (week1 이전에 위치)
- Category A 자료 중 핵심 3개 + Category B, C 자료 통합
- Mermaid 다이어그램으로 학습 흐름 시각화

**완료 조건**:
- [ ] `content/week0/` 디렉토리 5개 파일 생성
- [ ] `content/_meta.js`에 week0 등록
- [ ] 각 MDX 파일 frontmatter 포함
- [ ] 학습 목표 섹션 포함
- [ ] 빌드 오류 없음

---

### Phase 2 (우선순위 높음): Session 1-12 강사 자료 링크 추가

**목표**: 기존 12개 세션 파일에 "강사 자료" 섹션 추가

**참조**: SPEC-DOCS-001-R002

**수정 파일 목록** (12개 기존 파일 업데이트):

| 세션 | 파일 경로 | 연결할 Category D 자료 |
|------|----------|----------------------|
| Session 1 | `content/week1/session1.mdx` | 세션1_개발환경_설정 |
| Session 2 | `content/week1/session2.mdx` | 세션2_프론트엔드백엔드_NodeJS |
| Session 3 | `content/week1/session3.mdx` | 세션3_HTTP_REST_JSON_CORS |
| Session 4 | `content/week2/session4.mdx` | 세션4_React |
| Session 5 | `content/week2/session5.mdx` | 세션5_Nextjs |
| Session 6 | `content/week2/session6.mdx` | 세션6_비동기_디버깅 |
| Session 7 | `content/week3/session7.mdx` | 세션7_DB_PostgreSQL_Supabase |
| Session 8 | `content/week3/session8.mdx` | 세션8_MongoDB_ElasticSearch |
| Session 9 | `content/week3/session9.mdx` | 세션9_OAuth_JWT_AI_API |
| Session 10 | `content/week4/session10.mdx` | 세션10_Docker |
| Session 11 | `content/week4/session11.mdx` | 세션11_AWS_EC2 |
| Session 12 | `content/week4/session12.mdx` | 세션12_CICD_도메인 |

**추가할 섹션 템플릿**:
```mdx
## 강사 자료

<Callout type="info">
이 세션의 강사 참고 자료입니다.
</Callout>

- [강사 강의 노트 - Session N](/appendix/deep-dive/...)
- 관련 심화 학습 링크
```

**완료 조건**:
- [ ] 12개 세션 파일 모두 "강사 자료" 섹션 추가
- [ ] Category I 심화 자료 연결 링크 포함
- [ ] 기존 콘텐츠 손상 없음
- [ ] 내부 링크 모두 유효

---

### Phase 3 (우선순위 중간): AI 도구 부록 섹션 생성

**목표**: Category F, G, H 자료를 통합한 "AI 도구" 부록 섹션 생성

**참조**: SPEC-DOCS-001-R003

**생성 파일 목록** (10개 신규 파일):

```
content/appendix/ai-tools/
├── _meta.js
├── index.mdx                       # AI 도구 섹션 소개
├── claude-code-commands.mdx        # Claude_Code_필수_명령어
├── prompts-50.mdx                  # 실전_프롬프트_50선
├── prompts-100-advanced.mdx        # 고급_프롬프트_100선
├── claude-md-guide.mdx             # CLAUDE.MD_작성법
├── claude-md-by-scale.mdx          # 규모별_CLAUDE.MD
├── ai-coding-rules.mdx             # AI_코딩_운영_규칙
├── ai-thinking-analysis.mdx        # AI_사고_분석집
├── code-review-checklist.mdx       # 코드리뷰_체크리스트
└── http-prompt-mapping.mdx         # HTTP_프롬프트_매핑표
```

**완료 조건**:
- [ ] `content/appendix/` 디렉토리 구조 생성
- [ ] `content/appendix/_meta.js` 생성
- [ ] 10개 파일 생성 (index.mdx 포함)
- [ ] `content/_meta.js`에 appendix 섹션 등록
- [ ] 각 파일 Nextra 형식 준수

---

### Phase 4 (우선순위 중간): 심화 학습 부록 섹션 생성

**목표**: Category I 자료를 통합한 "심화 학습" 부록 섹션 생성

**참조**: SPEC-DOCS-001-R004

**생성 파일 목록** (10개 신규 파일):

```
content/appendix/deep-dive/
├── _meta.js
├── index.mdx                       # 심화 학습 섹션 소개
├── nodejs-core.mdx                 # NodeJS_핵심
├── express-complete.mdx            # Express_완전정복
├── api-call-guide.mdx              # API_호출_실전가이드
├── mysql-guide.mdx                 # MySQL
├── postgresql-guide.mdx            # PostgreSQL
├── orm-guide.mdx                   # ORM
├── python-basics.mdx               # Python_기초
├── python-intermediate.mdx         # Python_중급
└── python-advanced.mdx             # Python_고급
```

**완료 조건**:
- [ ] 10개 파일 생성
- [ ] Phase 2에서 추가된 세션 링크와 연동 확인
- [ ] Python 3부작 순서 명확히 표시
- [ ] 각 파일 난이도 표시 (기초/중급/고급)

---

### Phase 5 (우선순위 낮음): 언어 가이드 부록 섹션 생성

**목표**: Category E 자료를 통합한 "언어 가이드" 부록 섹션 생성

**참조**: SPEC-DOCS-001-R005

**생성 파일 목록** (6개 신규 파일):

```
content/appendix/language-guides/
├── _meta.js
├── index.mdx                       # 언어 가이드 섹션 소개
├── javascript-complete.mdx         # JavaScript_기초부터_실전까지
├── python-complete.mdx             # Python_기초부터_실전까지
├── git-github-actions.mdx          # Git_GitHub_Actions
├── ai-coding-guide.mdx             # Claude_Code_Codex_AI코딩_가이드
└── browser-devtools.mdx            # 브라우저_개발자도구_완벽가이드
```

**완료 조건**:
- [ ] 6개 파일 생성
- [ ] JavaScript, Python 완전 가이드 명확히 구분
- [ ] Git 자료와 Week 1 Session 1 연계 링크

---

### Phase 6 (우선순위 낮음): 학습 경로 및 인덱스 페이지

**목표**: 수강생이 학습 수준에 맞는 콘텐츠를 쉽게 탐색할 수 있는 학습 경로 인덱스

**참조**: SPEC-DOCS-001-R007

**생성 파일 목록** (1개 신규 파일):

```
content/
└── learning-paths.mdx              # 학습 경로 전체 인덱스
```

**완료 조건**:
- [ ] 초급/중급/고급 학습 경로 정의
- [ ] 선수 학습 체인 시각화 (Mermaid)
- [ ] 전체 콘텐츠 교차 참조 인덱스

---

## 아키텍처 설계 방향

### 네비게이션 구조 설계

```javascript
// content/_meta.js (업데이트 후)
export default {
  week0: {
    title: "Week 0: 시작 전 준비",
    type: "folder"
  },
  index: "홈",
  week1: "Week 1: 개발 기초",
  week2: "Week 2: 프론트엔드",
  week3: "Week 3: 백엔드 & DB",
  week4: "Week 4: 배포",
  appendix: {
    title: "부록",
    type: "folder"
  }
}
```

### 콘텐츠 마이그레이션 워크플로우

```
vibeclass-materials/{파일}.md
    ↓ (분석)
원본 마크다운 파악
    ↓ (변환)
MDX frontmatter 추가
    ↓ (구조화)
학습 목표 + 핵심 포인트 추가
    ↓ (시각화)
Mermaid 다이어그램 추가 (해당 시)
    ↓ (등록)
_meta.js에 추가
    ↓ (검증)
빌드 테스트
```

---

## 위험 요소 및 대응 방안

| 위험 요소 | 심각도 | 대응 방안 |
|----------|--------|----------|
| MDX 형식 변환 오류 (마크다운 문법 불일치) | 중간 | 빌드 후 즉시 확인, 단계적 배포 |
| Nextra `_meta.js` 설정 누락 | 높음 | 각 Phase 완료 후 네비게이션 검증 |
| 내부 링크 깨짐 | 중간 | Phase 2 완료 후 링크 검증 스크립트 실행 |
| 파일 이름 충돌 | 낮음 | 명확한 네이밍 컨벤션 사전 정의 |
| 콘텐츠 중복 | 낮음 | 단일 출처 원칙 적용, 중복 체크 |

---

## 예상 작업 범위 요약

| Phase | 우선순위 | 신규 파일 | 수정 파일 | 핵심 작업 |
|-------|---------|---------|---------|---------|
| P1: Week 0 | 높음 | 5개 | 1개 (`content/_meta.js`) | 오리엔테이션 섹션 생성 |
| P2: 세션 강화 | 높음 | 0개 | 12개 | 강사 자료 링크 추가 |
| P3: AI 도구 | 중간 | 10개 | 1개 (`appendix/_meta.js`) | AI 도구 부록 생성 |
| P4: 심화 학습 | 중간 | 10개 | 0개 | 백엔드 심화 부록 생성 |
| P5: 언어 가이드 | 낮음 | 6개 | 0개 | 언어 가이드 부록 생성 |
| P6: 학습 경로 | 낮음 | 1개 | 0개 | 인덱스 페이지 생성 |
| **합계** | | **32개** | **14개** | **총 46개 파일** |

---

## 다음 단계

이 SPEC 완료 후 진행:

1. `/moai:2-run SPEC-DOCS-001` 명령으로 Phase 1부터 순차 구현
2. 각 Phase 완료 후 `npm run build`로 빌드 검증
3. Phase 6 완료 후 `/moai:3-sync SPEC-DOCS-001`으로 문서 동기화
