---
id: SPEC-INFRA-001
document: acceptance
version: 1.0.0
---

# SPEC-INFRA-001 인수 기준

## 1. 테스트 시나리오

### Scenario 1: 개발 서버 정상 시작

```gherkin
Given package.json에 모든 의존성이 정의되어 있고
  And npm install이 성공적으로 완료되었을 때
When npm run dev 명령을 실행하면
Then 개발 서버가 에러 없이 시작되고
  And http://localhost:3000에서 홈페이지가 렌더링되어야 한다
  And 콘솔에 TypeScript 타입 에러가 출력되지 않아야 한다
```

### Scenario 2: 사이드바 네비게이션 4주차 한국어 표시

```gherkin
Given 개발 서버가 실행 중이고
  And content/_meta.js에 4개 주차가 한국어 레이블로 정의되어 있을 때
When 사용자가 브라우저에서 사이트를 방문하면
Then 좌측 사이드바에 다음 4개 주차 섹션이 한국어로 표시되어야 한다:
  | 순서 | 레이블 |
  | 1 | 1주차: 웹 개발 기초 |
  | 2 | 2주차: React와 Next.js |
  | 3 | 3주차: 데이터베이스, 인증, AI |
  | 4 | 4주차: DevOps와 배포 |
  And 모든 주차 섹션이 기본적으로 접혀 있어야 한다
```

### Scenario 3: 홈페이지 정상 렌더링

```gherkin
Given 개발 서버가 실행 중이고
  And content/index.mdx가 홈페이지 콘텐츠를 포함하고 있을 때
When 사용자가 http://localhost:3000에 접속하면
Then 부트캠프 제목과 소개 텍스트가 한국어로 표시되어야 한다
  And 4개 주차에 대한 요약 또는 링크가 제공되어야 한다
  And 페이지가 정상적으로 렌더링되어 레이아웃 깨짐이 없어야 한다
```

### Scenario 4: 다크 모드 토글 동작

```gherkin
Given 개발 서버가 실행 중이고
  And 사용자가 사이트를 라이트 모드로 보고 있을 때
When 사용자가 네비게이션 바의 다크 모드 토글 버튼을 클릭하면
Then 사이트 전체가 다크 모드 색상으로 전환되어야 한다
  And 텍스트, 배경, 사이드바가 모두 다크 테마를 적용해야 한다
  And 토글을 다시 클릭하면 라이트 모드로 복원되어야 한다
```

### Scenario 5: 사이드바 자동 접기 동작

```gherkin
Given 개발 서버가 실행 중이고
  And 사이드바에 4개 주차 섹션이 모두 접혀 있을 때
When 사용자가 "1주차: 웹 개발 기초" 섹션을 클릭하면
Then 1주차의 세션 목록(1회차, 2회차, 3회차)이 펼쳐져야 한다
  And 다른 주차 섹션은 접힌 상태를 유지해야 한다
When 사용자가 이어서 "2주차: React와 Next.js" 섹션을 클릭하면
Then 2주차의 세션 목록(4회차, 5회차, 6회차)이 펼쳐져야 한다
  And 1주차 섹션이 자동으로 접혀야 한다 (autoCollapse)
```

### Scenario 6: 프로덕션 빌드 성공

```gherkin
Given package.json에 모든 의존성이 정의되어 있고
  And 모든 콘텐츠 파일이 올바른 위치에 존재할 때
When npm run build 명령을 실행하면
Then 빌드가 에러 없이 완료되어야 한다
  And .next 디렉토리에 정적 HTML 파일이 생성되어야 한다
  And TypeScript 컴파일 에러가 없어야 한다
```

### Scenario 7: 주차별 개요 페이지 접근

```gherkin
Given 개발 서버가 실행 중이고
  And content/week1/index.mdx가 1주차 개요 콘텐츠를 포함할 때
When 사용자가 사이드바에서 "1주차: 웹 개발 기초"를 클릭하면
Then /week1 경로로 이동하여 1주차 개요 페이지가 표시되어야 한다
  And 페이지에 1주차 학습 목표와 세션 요약이 포함되어야 한다
  And 사이드바에서 현재 위치가 하이라이트되어야 한다
```

### Scenario 8: 모바일 반응형 레이아웃

```gherkin
Given 개발 서버가 실행 중일 때
When 사용자가 모바일 뷰포트(375px 너비)로 사이트에 접속하면
Then 사이드바가 기본적으로 숨겨져야 한다
  And 햄버거 메뉴 아이콘이 표시되어야 한다
  And 콘텐츠가 화면 너비에 맞게 조정되어야 한다
When 사용자가 햄버거 메뉴를 탭하면
Then 사이드바가 오버레이 형태로 표시되어야 한다
```

## 2. 품질 게이트 기준

### 빌드 품질

| 기준 | 조건 | 검증 방법 |
|------|------|-----------|
| TypeScript 에러 | 0개 | `npx tsc --noEmit` |
| 빌드 성공 | 에러 없음 | `npm run build` |
| 개발 서버 시작 | 에러 없음 | `npm run dev` |

### 파일 완성도

| 기준 | 조건 | 검증 방법 |
|------|------|-----------|
| 루트 설정 파일 | 4개 존재 | package.json, next.config.mjs, tsconfig.json, mdx-components.tsx |
| App Router 파일 | 2개 존재 | app/layout.tsx, app/[[...mdxPath]]/page.tsx |
| 콘텐츠 구조 | 10개 존재 | _meta.js x5, index.mdx x5 |
| 정적 자산 | 2개 존재 | public/favicon.ico, public/logo.svg |

### UI/UX 품질

| 기준 | 조건 | 검증 방법 |
|------|------|-----------|
| 한국어 UI | 사이드바, 검색, TOC 한국어 | 브라우저 확인 |
| 다크 모드 | 토글 동작 | 브라우저 확인 |
| 모바일 반응형 | 375px 뷰포트 정상 | DevTools 반응형 모드 |
| 사이드바 접기 | autoCollapse 동작 | 브라우저 확인 |

## 3. 검증 방법

### 자동 검증

```bash
# 1. 의존성 설치 확인
npm install

# 2. TypeScript 타입 체크
npx tsc --noEmit

# 3. 프로덕션 빌드
npm run build

# 4. 개발 서버 시작 (수동 확인 필요)
npm run dev
```

### 수동 검증 체크리스트

- [ ] 개발 서버가 http://localhost:3000에서 정상 시작
- [ ] 홈페이지가 한국어로 렌더링
- [ ] 사이드바에 4개 주차가 한국어로 표시
- [ ] 주차 섹션 클릭 시 세션 목록 펼침/접기 동작
- [ ] autoCollapse: 다른 주차 클릭 시 이전 주차 자동 접기
- [ ] 다크 모드 토글 정상 동작
- [ ] 모바일 뷰포트에서 반응형 레이아웃 확인
- [ ] 각 주차 개요 페이지(/week1 ~ /week4) 접근 가능
- [ ] favicon과 로고 정상 표시
- [ ] npm run build 에러 없이 완료

## 4. Definition of Done

SPEC-INFRA-001은 다음 조건이 모두 충족될 때 완료로 간주한다:

1. **모든 파일 생성**: spec.md 5.1 섹션에 명시된 18개 파일이 모두 존재
2. **빌드 성공**: `npm run build`가 에러 없이 완료
3. **개발 서버 정상**: `npm run dev`로 시작 후 홈페이지 렌더링 확인
4. **한국어 UI**: 사이드바, 네비게이션 레이블이 한국어로 표시
5. **사이드바 동작**: defaultMenuCollapseLevel과 autoCollapse 정상 작동
6. **다크 모드**: 라이트/다크 테마 전환 정상 작동
7. **반응형**: 모바일 뷰포트에서 레이아웃 정상
8. **TypeScript 에러 없음**: `npx tsc --noEmit` 통과
