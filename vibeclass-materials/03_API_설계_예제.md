API 설계 잘/못된 예제 + Claude 지시 비교

목적: API 설계 품질 차이가 왜 장애로 이어지는지 한 번에 이해하고,
바로 Claude Code에 안전하게 지시하는 문장까지 제공

0) 이 문서 사용법
아래에서 상황(로그인/주문/검색/업로드 등)을 고른다
잘못된 예제를 보고 “무엇이 위험한지” 체크한다
잘된 예제처럼 바꾸되, Claude에게는 지시 문장을 그대로 복붙한다
1) 로그인 API
❌ 잘못된 설계
엔드포인트: POST /login
클릭하여 복사
성공 응답:
{ "ok": true, "token": "...", "user": {"id": 1} }

복사
실패 응답(인증 실패/검증 실패/권한 없음 전부 동일):
{ "ok": false, "msg": "fail" }

복사
문제점
상태코드가 의미 없음(항상 200)
실패 원인이 구분되지 않아 프론트/운영에서 대응 불가
에러 계약이 불명확
✅ 잘된 설계
엔드포인트: POST /auth/login
클릭하여 복사
요청:
{ "email": "a@b.com", "password": "***" }

복사
성공(200):
{ "accessToken": "...", "user": {"id": 1, "name": "Kim"} }

복사
검증 실패(400):
{ "error": {"code": "VALIDATION_ERROR", "message": "email is required"} }

복사
인증 실패(401):
{ "error": {"code": "UNAUTHORIZED", "message": "invalid credentials"} }

복사
🤖 Claude 지시 비교
❌ 위험한 지시
로그인 API를 더 깔끔하게 만들어줘

복사
✅ 안전한 지시
src/auth 범위만 수정해줘. 기존 성공 응답 스키마(accessToken, user)는 유지하고,
실패를 400(검증), 401(인증)으로 구분해줘. 에러 응답은 { error: { code, message } }로 통일해줘.

복사
2) 주문 생성 API (POST)
❌ 잘못된 설계
POST /orders/create
클릭하여 복사
응답(항상 200):
{ "result": "ok", "orderId": 123 }

복사
문제점
REST 규칙 위반(동사 사용)
중복 생성/재시도 시 주문이 여러 번 생성될 수 있음
충돌/재고 부족 등 상태 구분 불가
✅ 잘된 설계
POST /orders
클릭하여 복사
요청에 멱등키:
헤더: Idempotency-Key: <uuid>
클릭하여 복사
성공(201):
{ "order": {"id": 123, "status": "CREATED"} }

복사
중복/충돌(409):
{ "error": {"code": "CONFLICT", "message": "duplicate order"} }

복사
🤖 Claude 지시 비교
❌ 위험한 지시
주문 생성 로직을 성능 좋게 개선해줘

복사
✅ 안전한 지시
POST /orders는 201을 반환하도록 유지하고, Idempotency-Key를 지원해 중복 생성이 없게 해줘.
재고 부족/중복은 409로 분리하고, 응답 스키마(order.id, order.status)는 변경하지 말아줘.

복사
3) 검색 API (GET) + 페이지네이션
❌ 잘못된 설계
POST /search
클릭하여 복사
요청 바디에 검색 조건
응답:
{ "list": [ ... ], "next": "abc" }

복사
문제점
캐시/링크 공유가 어려움
페이지네이션 규칙 불명확
✅ 잘된 설계
GET /products?query=shoes&page=1&limit=20
클릭하여 복사
응답(200):
{ "items": [ ... ], "page": 1, "limit": 20, "total": 312 }

복사
🤖 Claude 지시 비교
❌ 위험한 지시
검색 API를 더 직관적으로 바꿔줘

복사
✅ 안전한 지시
GET /products의 쿼리 파라미터(query,page,limit)는 유지하고,
응답은 items,page,limit,total 형태로 고정해줘. 기존 클라이언트가 깨지지 않게 필드명 변경은 금지야.

복사
4) 파일 업로드 API
❌ 잘못된 설계
POST /uploadFile
클릭하여 복사
업로드 성공 시 파일 URL만 반환
문제점
파일 메타데이터(크기/타입) 검증 부재
보안(확장자 위장) 이슈
업로드 실패 원인 불명
✅ 잘된 설계
POST /files
클릭하여 복사
 (multipart/form-data)
검증 실패(400), 권한(403)
성공(201):
{ "file": {"id": "f_123", "url": "...", "mime": "image/png", "size": 34567} }

복사
🤖 Claude 지시 비교
❌ 위험한 지시
업로드 기능을 간단하게 해줘

복사
✅ 안전한 지시
POST /files 업로드에서 mime/size 검증을 추가하고, 실패는 400으로 반환해줘.
업로드 성공 응답은 file.id,url,mime,size 구조를 유지해줘. 확장자만 믿지 말고 mime 기반으로 검사해줘.

복사
5) 에러 응답 표준 (사내 표준 추천)
❌ 잘못된 에러
{ "msg": "error" }

복사
✅ 표준 에러
{ "error": {"code": "SOME_ERROR", "message": "human readable message"} }

복사
🤖 Claude 표준화 지시
프로젝트 전체에서 에러 응답을 { error: { code, message } }로 통일해줘.
다만 성공 응답 스키마는 절대 변경하지 말고, API 계약을 깨지 않게 단계적으로 적용해줘.

복사
6) 레드플래그(바로 장애 나는 패턴) 체크리스트
 성공/실패가 모두 200
 응답 키 이름을 "더 깔끔하게" 변경
 에러 구조가 제각각
 POST 재시도 시 중복 생성 가능
 페이지네이션 규칙 불명확
 업로드 검증 없음
마지막 한 줄

API는 코드가 아니라 계약이다. Claude에게는 “멋지게”가 아니라 “계약을 유지하면서”를 지시해야 사고가 안 난다.