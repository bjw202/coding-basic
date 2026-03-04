---
spec-id: SPEC-CONTENT-W1
version: "1.0.0"
---

# SPEC-CONTENT-W1 Acceptance Criteria

## AC-01: 세션 템플릿 구조 검증

### Scenario 1: 모든 세션이 6개 템플릿 섹션을 포함한다

```gherkin
Given 1주차 MDX 파일이 생성되었을 때 (session1.mdx, session2.mdx, session3.mdx)
When 각 파일의 H2(##) 헤더를 검사하면
Then 다음 6개 섹션이 순서대로 존재해야 한다:
  | 순서 | 섹션 이름 |
  | 1 | 학습 목표 |
  | 2 | 핵심 개념 |
  | 3 | 다이어그램 |
  | 4 | 코드 예제 |
  | 5 | 실습 |
  | 6 | 요약 |
```

### Scenario 2: 각 세션의 학습 목표가 적절한 개수를 가진다

```gherkin
Given 각 세션 MDX 파일이 존재할 때
When "학습 목표" 섹션의 불릿 항목 수를 확인하면
Then 각 세션에 4~5개의 학습 목표 항목이 포함되어야 한다
```

---

## AC-02: 세션 간 연결성 검증

### Scenario 3: 요약 섹션에 다음 세션 미리보기가 포함된다

```gherkin
Given session1.mdx 또는 session2.mdx 파일이 존재할 때
When "요약" 섹션의 내용을 확인하면
Then 다음 세션의 주제를 미리 소개하는 텍스트가 포함되어야 한다
```

### Scenario 4: Session 3에 1주차 전체 회고가 포함된다

```gherkin
Given session3.mdx 파일이 존재할 때
When "요약" 섹션의 내용을 확인하면
Then 1주차 전체 학습 경로 회고 내용이 포함되어야 한다
And 2주차 미리보기가 포함되어야 한다
```

---

## AC-03: Mermaid 다이어그램 검증

### Scenario 5: 각 세션에 필요한 수의 Mermaid 다이어그램이 존재한다

```gherkin
Given 각 세션 MDX 파일이 존재할 때
When 파일 내 ```mermaid 코드 블록의 수를 세면
Then 다음 조건을 충족해야 한다:
  | 세션 | 최소 다이어그램 수 |
  | session1.mdx | 2 |
  | session2.mdx | 3 |
  | session3.mdx | 3 |
```

### Scenario 6: Mermaid 다이어그램이 올바른 문법을 사용한다

```gherkin
Given 각 세션의 Mermaid 코드 블록이 존재할 때
When Mermaid 문법을 검증하면
Then 모든 다이어그램이 다음 유효한 다이어그램 유형 중 하나를 사용해야 한다:
  - flowchart (TD 또는 LR)
  - sequenceDiagram
And 닫히지 않은 괄호나 잘못된 화살표 문법이 없어야 한다
```

### Scenario 7: Session 3의 sequence diagram이 올바른 참여자를 포함한다

```gherkin
Given session3.mdx의 HTTP 요청-응답 sequence diagram이 존재할 때
When 다이어그램의 참여자(participant)를 확인하면
Then Client와 Server 참여자가 존재해야 한다
And 요청과 응답 화살표가 양방향으로 존재해야 한다
```

---

## AC-04: 코드 예제 검증

### Scenario 8: 코드 블록에 언어 식별자가 지정되어 있다

```gherkin
Given 각 세션 MDX 파일이 존재할 때
When 모든 코드 블록(``` 으로 시작)을 검사하면
Then mermaid를 제외한 모든 코드 블록에 언어 식별자가 포함되어야 한다
  (javascript, bash, json, text 중 하나)
```

### Scenario 9: JavaScript 코드 예제가 구문적으로 유효하다

```gherkin
Given 각 세션의 JavaScript 코드 블록이 존재할 때
When 코드의 구문 유효성을 검사하면
Then 구문 오류(SyntaxError)가 없어야 한다
And 선언되지 않은 변수를 참조하는 코드가 없어야 한다
```

### Scenario 10: 각 세션이 지정된 수의 코드 예제를 포함한다

```gherkin
Given 각 세션 MDX 파일이 존재할 때
When mermaid를 제외한 코드 블록의 수를 확인하면
Then 다음 조건을 충족해야 한다:
  | 세션 | 최소 코드 예제 수 |
  | session1.mdx | 4 |
  | session2.mdx | 3 |
  | session3.mdx | 4 |
```

---

## AC-05: 실습 과제 검증

### Scenario 11: 각 세션에 실습 과제가 포함되어 있다

```gherkin
Given 각 세션 MDX 파일이 존재할 때
When "실습" 섹션의 내용을 확인하면
Then 각 세션에 최소 2개 이상의 실습 과제가 포함되어야 한다
And 각 실습에는 목표 설명이 포함되어야 한다
And 각 실습에는 단계별 지시사항이 포함되어야 한다
```

### Scenario 12: 실습에 난이도 표시가 있다

```gherkin
Given 각 세션의 실습 과제가 존재할 때
When 실습 항목의 제목을 확인하면
Then 각 실습에 난이도 표시(기본/도전)가 포함되어야 한다
```

### Scenario 13: Session 3 실습이 이전 세션 결과물을 활용한다

```gherkin
Given session3.mdx의 실습 과제가 존재할 때
When 실습 내용을 확인하면
Then Session 2에서 만든 Express 서버를 확장하는 내용이 포함되어야 한다
And CORS 에러를 재현하고 해결하는 과정이 포함되어야 한다
```

---

## AC-06: 콘텐츠 품질 검증

### Scenario 14: 모든 설명 텍스트가 한국어로 작성되어 있다

```gherkin
Given 각 세션 MDX 파일이 존재할 때
When 본문 텍스트의 언어를 확인하면
Then 설명 텍스트는 한국어로 작성되어야 한다
And 기술 용어는 영어 원문이 병기되어야 한다
  (예: "서버(Server)", "클라이언트(Client)")
```

### Scenario 15: 초보자 친화적 어조가 사용된다

```gherkin
Given 각 세션 MDX 파일이 존재할 때
When 본문의 어조를 확인하면
Then 경어체(~합니다, ~입니다)가 사용되어야 한다
And 전문 용어를 처음 사용할 때 비유나 설명이 제공되어야 한다
And 명령형 어투("~하세요", "~해 봅시다")로 실습을 안내해야 한다
```

### Scenario 16: 코드 블록에 한국어 주석 또는 설명이 포함된다

```gherkin
Given 각 세션의 코드 블록이 존재할 때
When 코드 블록 전후의 텍스트를 확인하면
Then 각 코드 블록 앞 또는 뒤에 한국어 설명 텍스트가 있어야 한다
And 주요 코드 블록 내부에 한국어 주석(// 또는 /* */)이 포함되어야 한다
```

---

## AC-07: 파일 구조 검증

### Scenario 17: MDX 파일이 올바른 경로에 존재한다

```gherkin
Given SPEC-CONTENT-W1 구현이 완료되었을 때
When content/week1/ 디렉토리를 확인하면
Then 다음 파일이 존재해야 한다:
  | 파일 경로 |
  | content/week1/session1.mdx |
  | content/week1/session2.mdx |
  | content/week1/session3.mdx |
```

### Scenario 18: MDX 파일이 적절한 분량을 가진다

```gherkin
Given 각 세션 MDX 파일이 존재할 때
When 파일의 콘텐츠 길이를 확인하면
Then 각 파일은 최소 200줄 이상이어야 한다
And 각 파일의 콘텐츠는 6,000~10,000 토큰 범위에 해당해야 한다
```

---

## Definition of Done

- [ ] session1.mdx, session2.mdx, session3.mdx 파일이 `content/week1/`에 생성됨
- [ ] 모든 세션이 6개 템플릿 섹션을 포함함
- [ ] Session 1: 2개 Mermaid 다이어그램, 4개 코드 예제, 2개 실습
- [ ] Session 2: 3개 Mermaid 다이어그램, 3개 코드 예제, 2개 실습
- [ ] Session 3: 3개 Mermaid 다이어그램, 4개 코드 예제, 2개 실습
- [ ] 모든 Mermaid 다이어그램이 올바른 문법으로 렌더링됨
- [ ] 모든 코드 예제가 구문적으로 유효함
- [ ] 한국어 콘텐츠 + 영어 기술 용어 병기 규칙 준수
- [ ] 초보자 친화적 경어체 어조 사용
- [ ] 세션 간 연결성 확보 (미리보기, 이전 세션 참조)
- [ ] 각 세션 콘텐츠 6,000~10,000 토큰 범위

---

## Traceability

| Acceptance Criteria | 연결 요구사항 |
|--------------------|-------------|
| AC-01 | REQ-01 (세션 템플릿 구조) |
| AC-02 | REQ-01, REQ-05 (템플릿 구조, 품질) |
| AC-03 | REQ-02 (다이어그램 요구사항) |
| AC-04 | REQ-03 (코드 예제 요구사항) |
| AC-05 | REQ-04 (실습 과제 요구사항) |
| AC-06 | REQ-05 (콘텐츠 품질) |
| AC-07 | REQ-01 (파일 구조) |
