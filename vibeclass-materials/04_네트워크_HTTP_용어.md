바이브코딩을 위한 네트워크 · HTTP 용어 심화

대상: 바이브코딩으로 웹/서버/API를 다루는 개발자·기획자
목표: 네트워크/HTTP를 정확히 이해해서 AI에게 사고 없이 지시하기

왜 네트워크/HTTP가 중요한가

바이브코딩 사고의 70%는 네트워크·HTTP 이해 부족에서 발생한다.

API 계약 파괴
인증/세션 오류
타임아웃·재시도 문제

👉 이 문서는 AI에게 정확히 말하기 위한 언어 정리다.

1️⃣ HTTP 기본 구조 (필수)
URL
요청 대상 주소
구성: scheme://host:port/path?query
클릭하여 복사
Method (메서드)
서버에 무엇을 할지 지시하는 동사
메서드	의미
GET	조회
POST	생성
PUT	전체 수정
PATCH	부분 수정
DELETE	삭제

바이브코딩 팁: "조회는 GET으로 유지" 같이 명시 가능

Header (헤더)
요청/응답의 메타데이터
예: 인증, 포맷, 캐시

자주 쓰는 헤더

Authorization
클릭하여 복사
Content-Type
클릭하여 복사
Accept
클릭하여 복사
User-Agent
클릭하여 복사
Body (바디)
실제 전송 데이터
보통 JSON 형식
{ "userId": 1, "name": "kim" }

복사
2️⃣ HTTP 상태 코드 (사고 방지 핵심)
코드	의미	바이브코딩 포인트
200	성공	정상 응답
201	생성됨	POST 성공
204	내용 없음	응답 바디 없음
400	잘못된 요청	검증 실패
401	인증 실패	로그인 필요
403	권한 없음	접근 차단
404	없음	리소스 없음
409	충돌	중복/경합
500	서버 오류	버그/장애
502	게이트웨이 오류	업스트림 문제
504	타임아웃	응답 지연

프롬프트 예: "검증 실패 시 400으로 통일"

3️⃣ REST API 핵심 개념
리소스(Resource)
API가 다루는 대상
예: /users
클릭하여 복사
, /orders/123
클릭하여 복사
멱등성(Idempotency)
여러 번 호출해도 결과가 같음
GET, PUT, DELETE는 멱등

결제 API는 멱등 키 필수

API 계약(Contract)
요청/응답 구조의 약속
프론트·백엔드 간 신뢰의 기반

"API 응답 스키마는 절대 변경하지 말 것"

4️⃣ 인증 / 인가 (사고 다발 구간)
인증(Authentication)
너 누구냐?
인가(Authorization)
너 이거 해도 되냐?
JWT
토큰 기반 인증 방식

프롬프트 예:

JWT 검증 로직은 유지하고, 응답 메시지만 수정해줘

복사
5️⃣ 세션 / 쿠키
쿠키(Cookie)
브라우저에 저장되는 작은 데이터
세션(Session)
서버에 저장되는 사용자 상태
Stateless / Stateful
Stateless: 서버가 상태 저장 안 함 (JWT)
Stateful: 서버가 상태 저장 (세션)
6️⃣ CORS (프론트 장애 1순위)
CORS란?
다른 도메인 요청을 제한하는 브라우저 보안 정책

자주 터지는 헤더

Access-Control-Allow-Origin
클릭하여 복사
Access-Control-Allow-Credentials
클릭하여 복사

바이브코딩 사고 포인트: "CORS는 서버 문제가 아닐 수도 있음"

7️⃣ 캐시 / 성능
캐시(Cache)
응답을 저장해서 재사용
Cache-Control
캐시 정책 헤더
옵션	의미
no-store	저장 금지
no-cache	재검증
max-age	유효 시간
8️⃣ 타임아웃 / 재시도
Timeout
응답을 기다리는 최대 시간
Retry
실패 시 다시 시도

재시도는 멱등 API만 허용

9️⃣ 프록시 / 게이트웨이
Reverse Proxy
클라이언트 앞단에서 요청을 대신 처리
예: Nginx
API Gateway
인증/라우팅/속도제한 담당
🔟 운영에서 반드시 알아야 할 용어
Rate Limit
요청 속도 제한
Throttling
과도한 요청을 늦춤
Circuit Breaker
장애 전파 차단 패턴
🎯 바이브코딩 실전 문장 변환

❌ "API 좀 고쳐줘"

⭕ "POST /orders API에서 400/409/500 상태 코드를 명확히 분리하고, 응답 스키마는 유지해줘"

마지막 요약
네트워크/HTTP는 프로그래밍 언어가 아니라 계약 언어
이 용어를 알면 AI에게 정확하고 안전하게 지시 가능

바이브코딩은 감이 아니라 용어 싸움이다.