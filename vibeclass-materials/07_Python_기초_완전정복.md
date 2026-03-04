Python 기초 완전정복

목표: Python의 기본 문법부터 실전 활용까지 한 번에 정리하기 대상: 바이브코딩 수강생 (입문~중급)

📋 목차
Python 개요
설치 및 실행
변수와 데이터 타입
연산자와 문자열
조건문과 반복문
리스트, 튜플, 딕셔너리
함수
파일 입출력
모듈과 패키지
실전 프로젝트 예제
1️⃣ Python 개요
Python이란?
┌─────────────────────────────────────────────────┐
│                    Python                        │
├─────────────────────────────────────────────────┤
│                                                  │
│   "읽기 쉽고, 배우기 쉽고, 강력한                │
│    범용 프로그래밍 언어"                          │
│                                                  │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐   │
│   │ 간결한   │ + │ 풍부한   │ + │ 다양한   │   │
│   │  문법    │   │ 라이브러리│   │  활용분야 │   │
│   └──────────┘   └──────────┘   └──────────┘   │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
왜 Python인가?
장점	설명
쉬운 문법	영어 읽듯 자연스러운 코드
빠른 개발	적은 코드로 많은 일을 처리
거대한 생태계	40만+ 패키지 (PyPI)
다양한 활용	웹, AI, 데이터, 자동화, 게임 등
높은 수요	가장 인기 있는 프로그래밍 언어
Python 활용 분야
┌──────────────────────────────────────────────┐
│              Python 활용 분야                  │
├──────────────────────────────────────────────┤
│                                               │
│  🤖 AI/머신러닝     → TensorFlow, PyTorch     │
│  📊 데이터 분석     → Pandas, NumPy           │
│  🌐 웹 개발         → Django, FastAPI, Flask  │
│  🔧 자동화/스크립트 → 파일 정리, 크롤링        │
│  🎮 게임 개발       → Pygame                  │
│  📱 앱 개발         → Kivy                    │
│  🔬 과학/연구       → SciPy, Matplotlib       │
│                                               │
└──────────────────────────────────────────────┘

클릭하여 복사
복사
Python vs JavaScript 비교
항목	Python	JavaScript
용도	AI, 데이터, 백엔드, 자동화	웹 프론트/백엔드
실행	python script.py
클릭하여 복사
	node script.js
클릭하여 복사

들여쓰기	필수 (문법의 일부)	선택 (스타일)
세미콜론	없음	선택 (보통 사용)
중괄호	없음 (들여쓰기로 블록)	{ }
클릭하여 복사
 사용
패키지 관리	pip	npm
타입	동적 타입	동적 타입
문자열	'문자열'
클릭하여 복사
 또는 "문자열"
클릭하여 복사
	동일 + 백틱
# Python
if score >= 90:
    print("A등급")
else:
    print("다시 도전")

복사
// JavaScript
if (score >= 90) {
    console.log("A등급")
} else {
    console.log("다시 도전")
}

복사
2️⃣ 설치 및 실행
Python 설치
# macOS (Homebrew)
brew install python

# Ubuntu/Linux
sudo apt update
sudo apt install python3 python3-pip

# Windows
# https://www.python.org/downloads/ 에서 다운로드
# ⚠️ 설치 시 "Add Python to PATH" 반드시 체크!

# 버전 확인
python3 --version   # Python 3.12.x
pip3 --version      # pip 24.x

복사
실행 방법
# 1. 대화형 모드 (REPL)
python3
>>> print("안녕하세요!")
안녕하세요!
>>> 1 + 2
3
>>> exit()

# 2. 파일 실행
python3 hello.py

# 3. 한 줄 실행
python3 -c "print('Hello, World!')"

복사
가상환경 (Virtual Environment)
# 프로젝트별 독립적인 패키지 환경 만들기

# 가상환경 생성
python3 -m venv myenv

# 가상환경 활성화
source myenv/bin/activate        # macOS/Linux
# myenv\Scripts\activate         # Windows

# 패키지 설치 (가상환경 안에서)
pip install requests pandas

# 설치된 패키지 목록 저장
pip freeze > requirements.txt

# requirements.txt로 패키지 일괄 설치
pip install -r requirements.txt

# 가상환경 비활성화
deactivate

복사
첫 번째 프로그램
# hello.py
print("안녕하세요! Python 세계에 오신 것을 환영합니다!")
print("저는 바이브클래스 수강생입니다.")

name = input("이름을 입력하세요: ")
print(f"반갑습니다, {name}님!")

복사
python3 hello.py
# 안녕하세요! Python 세계에 오신 것을 환영합니다!
# 저는 바이브클래스 수강생입니다.
# 이름을 입력하세요: 김철수
# 반갑습니다, 김철수님!

복사
3️⃣ 변수와 데이터 타입
변수 선언
# Python은 타입을 자동으로 판단 (동적 타이핑)
name = "김철수"          # 문자열 (str)
age = 25                 # 정수 (int)
height = 175.5           # 실수 (float)
is_student = True        # 불리언 (bool)

# JavaScript와 비교
# const name = "김철수"   ← Python에는 const 없음
# let age = 25            ← Python에는 let/var 없음
# 그냥 변수명 = 값 으로 선언!

# 타입 확인
print(type(name))        # <class 'str'>
print(type(age))         # <class 'int'>
print(type(height))      # <class 'float'>
print(type(is_student))  # <class 'bool'>

복사
데이터 타입 종류
타입	예시	설명
int
클릭하여 복사
	42
클릭하여 복사
, -10
클릭하여 복사
, 0
클릭하여 복사
	정수 (크기 제한 없음!)
float
클릭하여 복사
	3.14
클릭하여 복사
, -0.5
클릭하여 복사
	실수 (소수점)
str
클릭하여 복사
	"안녕"
클릭하여 복사
, 'hello'
클릭하여 복사
	문자열
bool
클릭하여 복사
	True
클릭하여 복사
, False
클릭하여 복사
	참/거짓 (대문자 주의!)
None
클릭하여 복사
	None
클릭하여 복사
	값 없음 (JS의 null)
list
클릭하여 복사
	[1, 2, 3]
클릭하여 복사
	리스트 (JS의 배열)
tuple
클릭하여 복사
	(1, 2, 3)
클릭하여 복사
	튜플 (변경 불가 리스트)
dict
클릭하여 복사
	{"key": "value"}
클릭하여 복사
	딕셔너리 (JS의 객체)
set
클릭하여 복사
	{1, 2, 3}
클릭하여 복사
	집합 (중복 없음)
타입 변환
# 문자열 → 숫자
age_str = "25"
age = int(age_str)          # 25
price = float("99.9")       # 99.9

# 숫자 → 문자열
num = 100
text = str(num)             # "100"

# 입력값은 항상 문자열!
user_input = input("나이: ")   # "25" (문자열)
age = int(user_input)          # 25 (정수)

# 불리언 변환
bool(0)       # False
bool(1)       # True
bool("")      # False (빈 문자열)
bool("hello") # True (비어있지 않음)
bool([])      # False (빈 리스트)
bool([1])     # True
bool(None)    # False

복사
여러 변수 동시 할당
# 동시 할당
x, y, z = 1, 2, 3

# 값 교환 (Python만의 간결한 방법!)
a, b = 10, 20
a, b = b, a      # a=20, b=10
# JavaScript: [a, b] = [b, a]

# 같은 값 할당
x = y = z = 0

복사
4️⃣ 연산자와 문자열
산술 연산자
# 기본 사칙연산
10 + 3    # 13  (덧셈)
10 - 3    # 7   (뺄셈)
10 * 3    # 30  (곱셈)
10 / 3    # 3.3333...  (나눗셈 → 항상 float!)
10 // 3   # 3   (몫, 정수 나눗셈)
10 % 3    # 1   (나머지)
10 ** 3   # 1000 (거듭제곱, JS에서는 10 ** 3 동일)

# 주의: / 는 항상 float 반환
10 / 2    # 5.0 (not 5)
10 // 2   # 5   (정수 원하면 // 사용)

복사
비교 연산자
# 기본 비교
5 == 5     # True
5 != 3     # True
5 > 3      # True
5 >= 5     # True
5 < 10     # True
5 <= 5     # True

# 연쇄 비교 (Python만의 특별한 기능!)
1 < 5 < 10        # True (1 < 5 그리고 5 < 10)
10 <= 20 <= 30    # True
# JavaScript에서는 이렇게 못 함!

# is vs == (중요!)
a = [1, 2, 3]
b = [1, 2, 3]
a == b    # True  (값이 같은가?)
a is b    # False (같은 객체인가?)
# == 는 JS의 === 와 비슷
# is 는 JS의 === 와 다름 (객체 동일성)

복사
논리 연산자
# Python은 영어 단어 사용 (&&, || 가 아님!)
True and True     # True   (JS: &&)
True or False     # True   (JS: ||)
not True          # False  (JS: !)

# 조합
age = 25
is_student = True
if age >= 20 and is_student:
    print("성인 학생입니다")

복사
문자열 다루기
# 문자열 생성
name = "김철수"
greeting = '안녕하세요'
long_text = """여러 줄의
문자열을
작성할 수 있습니다"""

# f-string (포맷 문자열) ⭐ 가장 많이 사용
name = "김철수"
age = 25
print(f"이름: {name}, 나이: {age}세")
# 이름: 김철수, 나이: 25세
# JavaScript의 `이름: ${name}` 과 비슷!

# f-string 안에서 계산도 가능
print(f"내년 나이: {age + 1}세")
print(f"가격: {price:,.0f}원")  # 천단위 콤마

# 문자열 연산
"안녕" + " " + "하세요"   # "안녕 하세요" (연결)
"하하" * 3                # "하하하하하하" (반복)
len("안녕하세요")          # 5 (길이)

복사
문자열 메서드
text = "  Hello, World!  "

# 공백 제거
text.strip()           # "Hello, World!"
text.lstrip()          # "Hello, World!  "
text.rstrip()          # "  Hello, World!"

# 대소문자
text.strip().upper()   # "HELLO, WORLD!"
text.strip().lower()   # "hello, world!"
text.strip().title()   # "Hello, World!"

# 검색
"World" in text        # True
text.find("World")     # 9 (인덱스, 없으면 -1)
text.count("l")        # 3

# 분리와 결합
"a,b,c".split(",")         # ['a', 'b', 'c']
" ".join(["안녕", "하세요"]) # "안녕 하세요"

# 치환
"Hello World".replace("World", "Python")  # "Hello Python"

# 시작/끝 확인
"hello.py".endswith(".py")     # True
"hello.py".startswith("hello") # True

복사
문자열 인덱싱과 슬라이싱
text = "Python"
#       P y t h o n
#       0 1 2 3 4 5   (앞에서부터)
#      -6-5-4-3-2-1   (뒤에서부터)

# 인덱싱 (한 글자)
text[0]     # 'P'
text[-1]    # 'n'

# 슬라이싱 (범위)
text[0:3]   # 'Pyt' (0부터 3 직전까지)
text[2:]    # 'thon' (2부터 끝까지)
text[:3]    # 'Pyt' (처음부터 3 직전까지)
text[-3:]   # 'hon' (뒤에서 3글자)
text[::2]   # 'Pto' (2칸씩 건너뛰기)
text[::-1]  # 'nohtyP' (뒤집기)

복사
5️⃣ 조건문과 반복문
if 조건문
# 기본 if
score = 85

if score >= 90:
    print("A등급")
elif score >= 80:       # JavaScript의 else if
    print("B등급")
elif score >= 70:
    print("C등급")
else:
    print("F등급")

# ⚠️ 중요: 들여쓰기가 블록을 결정!
# Python은 { } 대신 들여쓰기(4칸 스페이스)를 사용

복사
삼항 연산자
# Python 삼항 연산자
age = 20
status = "성인" if age >= 18 else "미성년자"
# JavaScript: const status = age >= 18 ? "성인" : "미성년자"

복사
for 반복문
# 리스트 순회
fruits = ["사과", "바나나", "딸기"]
for fruit in fruits:
    print(fruit)

# range() 사용 (숫자 범위)
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):       # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8 (2씩 증가)
    print(i)

# 인덱스와 값 동시에 (enumerate)
names = ["김철수", "이영희", "박민수"]
for i, name in enumerate(names):
    print(f"{i+1}번: {name}")
# 1번: 김철수
# 2번: 이영희
# 3번: 박민수

# 딕셔너리 순회
scores = {"국어": 90, "영어": 85, "수학": 95}
for subject, score in scores.items():
    print(f"{subject}: {score}점")

복사
while 반복문
# 기본 while
count = 0
while count < 5:
    print(f"카운트: {count}")
    count += 1
# ⚠️ Python에는 count++ 없음! count += 1 사용

# 무한 루프 + break
while True:
    user_input = input("종료하려면 'q' 입력: ")
    if user_input == 'q':
        break
    print(f"입력: {user_input}")

복사
break, continue, else
# break: 반복 중단
for i in range(10):
    if i == 5:
        break          # 5에서 멈춤
    print(i)           # 0, 1, 2, 3, 4

# continue: 현재 반복 건너뛰기
for i in range(10):
    if i % 2 == 0:
        continue       # 짝수 건너뛰기
    print(i)           # 1, 3, 5, 7, 9

# for-else: 반복이 정상 완료되면 else 실행 (Python만의 기능!)
for i in range(5):
    if i == 10:
        break
else:
    print("break 없이 정상 완료!")  # 이것이 출력됨

복사
컴프리헨션 (Comprehension)
# 리스트 컴프리헨션 ⭐ Python의 꽃!
# 한 줄로 리스트 생성

# 기본
squares = [x ** 2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 조건 필터
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# 변환 + 필터
names = ["김철수", "이영희", "박", "최지은"]
long_names = [name for name in names if len(name) >= 3]
# ["김철수", "이영희", "최지은"]

# JavaScript 비교
# const squares = Array.from({length: 10}, (_, i) => i ** 2)
# const evens = [...Array(20).keys()].filter(x => x % 2 === 0)

# 딕셔너리 컴프리헨션
scores = {"국어": 90, "영어": 85, "수학": 95}
passed = {k: v for k, v in scores.items() if v >= 90}
# {"국어": 90, "수학": 95}

복사
6️⃣ 리스트, 튜플, 딕셔너리
리스트 (List) - JS의 배열
# 리스트 생성
fruits = ["사과", "바나나", "딸기"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]  # 다양한 타입 혼합 가능

# 인덱싱
fruits[0]     # "사과"
fruits[-1]    # "딸기"

# 슬라이싱
numbers[1:4]  # [2, 3, 4]
numbers[:3]   # [1, 2, 3]
numbers[::2]  # [1, 3, 5]

복사
리스트 메서드
fruits = ["사과", "바나나"]

# 추가
fruits.append("딸기")           # 끝에 추가 → ["사과", "바나나", "딸기"]
fruits.insert(1, "오렌지")      # 위치 지정 → ["사과", "오렌지", "바나나", "딸기"]
fruits.extend(["포도", "키위"])  # 여러 개 추가

# 삭제
fruits.remove("바나나")         # 값으로 삭제
deleted = fruits.pop()          # 마지막 요소 삭제 후 반환
deleted = fruits.pop(0)         # 인덱스로 삭제 후 반환
del fruits[0]                   # 인덱스로 삭제

# 검색
"사과" in fruits                # True (포함 여부)
fruits.index("사과")            # 0 (인덱스 찾기)
fruits.count("사과")            # 1 (개수)

# 정렬
numbers = [3, 1, 4, 1, 5, 9]
numbers.sort()                  # 오름차순 정렬 (원본 변경)
numbers.sort(reverse=True)      # 내림차순
sorted_nums = sorted(numbers)   # 새 리스트 반환 (원본 유지)

# 기타
numbers.reverse()               # 뒤집기
len(numbers)                    # 길이
sum(numbers)                    # 합계
min(numbers)                    # 최솟값
max(numbers)                    # 최댓값

복사
튜플 (Tuple) - 변경 불가 리스트
# 튜플 생성 (소괄호 또는 괄호 없이)
point = (3, 4)
rgb = 255, 128, 0    # 괄호 없이도 가능

# 읽기는 리스트와 동일
point[0]    # 3
point[1]    # 4

# 변경 불가!
point[0] = 5   # ❌ TypeError!

# 언패킹
x, y = point   # x=3, y=4
r, g, b = rgb  # r=255, g=128, b=0

# 언제 사용하나?
# - 변경되면 안 되는 데이터 (좌표, RGB, 설정값)
# - 딕셔너리의 키로 사용 가능 (리스트는 불가)
# - 함수에서 여러 값 반환 시

복사
딕셔너리 (Dictionary) - JS의 객체
# 딕셔너리 생성
user = {
    "name": "김철수",
    "age": 25,
    "email": "kim@example.com",
    "is_student": True,
}

# 값 조회
user["name"]              # "김철수"
user.get("name")          # "김철수"
user.get("phone", "없음") # "없음" (키 없을 때 기본값)

# 값 추가/수정
user["phone"] = "010-1234-5678"   # 추가
user["age"] = 26                   # 수정

# 삭제
del user["phone"]                  # 키로 삭제
removed = user.pop("email")       # 삭제 후 값 반환

# 확인
"name" in user                     # True (키 존재 확인)
len(user)                          # 키 개수

# 전체 조회
user.keys()      # dict_keys(['name', 'age', ...])
user.values()    # dict_values(['김철수', 26, ...])
user.items()     # dict_items([('name', '김철수'), ...])

# 순회
for key, value in user.items():
    print(f"{key}: {value}")

복사
딕셔너리 실전 활용
# 중첩 딕셔너리
course = {
    "title": "바이브코딩 입문",
    "instructor": {
        "name": "조강사",
        "email": "jo@vibeclass.kr",
    },
    "students": [
        {"name": "김철수", "score": 90},
        {"name": "이영희", "score": 85},
    ],
}

# 접근
course["instructor"]["name"]     # "조강사"
course["students"][0]["score"]   # 90

# 딕셔너리 합치기
defaults = {"theme": "light", "lang": "ko"}
custom = {"theme": "dark"}
settings = {**defaults, **custom}
# {"theme": "dark", "lang": "ko"}
# JavaScript의 {...defaults, ...custom} 과 동일!

복사
집합 (Set)
# 집합: 중복 없는 컬렉션
fruits = {"사과", "바나나", "딸기", "사과"}
print(fruits)   # {"사과", "바나나", "딸기"} (중복 제거)

# 리스트 → 집합 (중복 제거)
numbers = [1, 2, 2, 3, 3, 3]
unique = set(numbers)    # {1, 2, 3}
unique_list = list(set(numbers))  # [1, 2, 3]

# 집합 연산
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b    # {1, 2, 3, 4, 5, 6}  합집합
a & b    # {3, 4}               교집합
a - b    # {1, 2}               차집합
a ^ b    # {1, 2, 5, 6}         대칭차집합

복사
7️⃣ 함수
함수 정의
# 기본 함수
def greet(name):
    return f"안녕하세요, {name}님!"

result = greet("김철수")
print(result)   # 안녕하세요, 김철수님!

# JavaScript 비교
# function greet(name) {
#     return `안녕하세요, ${name}님!`
# }

복사
매개변수
# 기본값 매개변수
def greet(name, greeting="안녕하세요"):
    return f"{greeting}, {name}님!"

greet("김철수")              # "안녕하세요, 김철수님!"
greet("김철수", "반갑습니다")  # "반갑습니다, 김철수님!"

# 키워드 인자 (이름 지정)
def create_user(name, age, role="user"):
    return {"name": name, "age": age, "role": role}

user = create_user(name="김철수", role="admin", age=25)
# 순서 상관없이 이름으로 전달!

# 가변 인자 (*args)
def add_all(*numbers):
    return sum(numbers)

add_all(1, 2, 3)        # 6
add_all(1, 2, 3, 4, 5)  # 15

# 키워드 가변 인자 (**kwargs)
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="김철수", age=25, city="서울")
# name: 김철수
# age: 25
# city: 서울

복사
여러 값 반환
# 튜플로 여러 값 반환
def divide(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder   # 튜플 반환

q, r = divide(10, 3)
print(f"몫: {q}, 나머지: {r}")   # 몫: 3, 나머지: 1

# 딕셔너리로 반환
def get_user_stats(user_id):
    return {
        "total_courses": 5,
        "completed": 3,
        "in_progress": 2,
    }

stats = get_user_stats(1)
print(stats["completed"])   # 3

복사
람다 함수 (익명 함수)
# 한 줄 함수
square = lambda x: x ** 2
square(5)    # 25

# JavaScript 비교
# const square = (x) => x ** 2

# 정렬에서 자주 사용
students = [
    {"name": "김철수", "score": 85},
    {"name": "이영희", "score": 92},
    {"name": "박민수", "score": 78},
]

# 점수순 정렬
students.sort(key=lambda s: s["score"], reverse=True)
# [이영희(92), 김철수(85), 박민수(78)]

# map, filter
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x ** 2, numbers))       # [1, 4, 9, 16, 25]
evens = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4]

# 컴프리헨션이 더 파이썬스러움
squares = [x ** 2 for x in numbers]
evens = [x for x in numbers if x % 2 == 0]

복사
타입 힌트 (Type Hints)
# Python 3.5+ 타입 힌트 (강제는 아니지만 가독성 향상)

def greet(name: str) -> str:
    return f"안녕하세요, {name}님!"

def add(a: int, b: int) -> int:
    return a + b

def get_users() -> list[dict]:
    return [{"name": "김철수"}, {"name": "이영희"}]

# 선택적 타입
from typing import Optional

def find_user(user_id: int) -> Optional[dict]:
    # 사용자가 없으면 None 반환 가능
    return None

복사
8️⃣ 파일 입출력
파일 읽기
# 기본 파일 읽기
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()       # 전체 내용 읽기
    print(content)

# with 문: 파일을 자동으로 닫아줌 (try-finally 불필요)

# 한 줄씩 읽기
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())   # 줄바꿈 제거

# 모든 줄을 리스트로
with open("data.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()     # ['첫째 줄\n', '둘째 줄\n', ...]

복사
파일 쓰기
# 파일 쓰기 (덮어쓰기)
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("안녕하세요\n")
    f.write("바이브클래스입니다\n")

# 파일 추가 (append)
with open("log.txt", "a", encoding="utf-8") as f:
    f.write(f"[{datetime.now()}] 로그 메시지\n")

# 여러 줄 쓰기
lines = ["첫째 줄", "둘째 줄", "셋째 줄"]
with open("output.txt", "w", encoding="utf-8") as f:
    f.writelines([line + "\n" for line in lines])

복사
JSON 파일 다루기
import json

# JSON 읽기
with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    print(data["name"])

# JSON 쓰기
user = {"name": "김철수", "age": 25, "courses": ["Python", "Node.js"]}
with open("user.json", "w", encoding="utf-8") as f:
    json.dump(user, f, ensure_ascii=False, indent=2)
    # ensure_ascii=False: 한글 깨짐 방지
    # indent=2: 보기 좋은 형식

# 문자열 ↔ JSON
json_str = json.dumps(user, ensure_ascii=False)   # 딕셔너리 → JSON 문자열
data = json.loads(json_str)                        # JSON 문자열 → 딕셔너리

복사
CSV 파일 다루기
import csv

# CSV 읽기
with open("students.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['이름']}: {row['점수']}점")

# CSV 쓰기
students = [
    {"이름": "김철수", "점수": 90},
    {"이름": "이영희", "점수": 85},
]
with open("output.csv", "w", encoding="utf-8", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["이름", "점수"])
    writer.writeheader()
    writer.writerows(students)

복사
9️⃣ 모듈과 패키지
import 방법
# 모듈 전체 가져오기
import math
print(math.sqrt(16))    # 4.0
print(math.pi)          # 3.141592...

# 특정 함수만 가져오기
from math import sqrt, pi
print(sqrt(16))          # 4.0

# 별칭 사용
import datetime as dt
now = dt.datetime.now()

from collections import Counter as C

복사
주요 내장 모듈
# os: 운영체제 관련
import os
os.getcwd()                    # 현재 디렉토리
os.listdir(".")                # 파일 목록
os.path.exists("file.txt")    # 파일 존재 확인
os.path.join("dir", "file")   # 경로 결합
os.makedirs("new_dir", exist_ok=True)  # 폴더 생성

# datetime: 날짜/시간
from datetime import datetime, timedelta
now = datetime.now()
print(now.strftime("%Y년 %m월 %d일 %H:%M"))  # 2026년 02월 16일 14:30
tomorrow = now + timedelta(days=1)

# random: 무작위
import random
random.randint(1, 100)          # 1~100 랜덤 정수
random.choice(["a", "b", "c"]) # 리스트에서 랜덤 선택
random.shuffle(my_list)         # 리스트 섞기

# collections: 유용한 자료구조
from collections import Counter, defaultdict

words = ["apple", "banana", "apple", "cherry", "apple"]
counter = Counter(words)
print(counter)                  # Counter({'apple': 3, 'banana': 1, 'cherry': 1})
print(counter.most_common(2))   # [('apple', 3), ('banana', 1)]

# re: 정규표현식
import re
emails = re.findall(r'[\w.]+@[\w.]+', text)
is_valid = re.match(r'^010-\d{4}-\d{4}$', phone)

복사
pip 패키지 관리
# 패키지 설치
pip install requests
pip install pandas numpy matplotlib

# 특정 버전 설치
pip install requests==2.31.0

# 패키지 업그레이드
pip install --upgrade requests

# 패키지 제거
pip uninstall requests

# 설치된 패키지 목록
pip list

# requirements.txt 생성/설치
pip freeze > requirements.txt
pip install -r requirements.txt

복사
자주 쓰는 외부 패키지
패키지	용도	설치
requests
클릭하여 복사
	HTTP 요청 (API 호출)	pip install requests
클릭하여 복사

pandas
클릭하여 복사
	데이터 분석	pip install pandas
클릭하여 복사

numpy
클릭하여 복사
	수치 계산	pip install numpy
클릭하여 복사

matplotlib
클릭하여 복사
	그래프/차트	pip install matplotlib
클릭하여 복사

flask
클릭하여 복사
	웹 서버 (경량)	pip install flask
클릭하여 복사

fastapi
클릭하여 복사
	웹 API 서버	pip install fastapi
클릭하여 복사

beautifulsoup4
클릭하여 복사
	웹 크롤링	pip install beautifulsoup4
클릭하여 복사

python-dotenv
클릭하여 복사
	환경변수 관리	pip install python-dotenv
클릭하여 복사

openai
클릭하여 복사
	OpenAI API	pip install openai
클릭하여 복사
🔟 실전 프로젝트 예제
예제 1: API 호출하기
import requests

# 공개 API 호출
response = requests.get("https://jsonplaceholder.typicode.com/users")
users = response.json()

for user in users:
    print(f"{user['name']} - {user['email']}")

# POST 요청
data = {"title": "새 글", "body": "내용", "userId": 1}
response = requests.post(
    "https://jsonplaceholder.typicode.com/posts",
    json=data,
)
print(response.json())

# 헤더와 인증
response = requests.get(
    "https://api.example.com/data",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json",
    },
)

복사
예제 2: 파일 정리 자동화
import os
import shutil

# 다운로드 폴더 정리
download_dir = os.path.expanduser("~/Downloads")
categories = {
    "이미지": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    "문서":   [".pdf", ".doc", ".docx", ".txt", ".xlsx"],
    "동영상": [".mp4", ".avi", ".mov", ".mkv"],
    "압축":   [".zip", ".rar", ".7z", ".tar.gz"],
}

for filename in os.listdir(download_dir):
    filepath = os.path.join(download_dir, filename)

    if os.path.isdir(filepath):
        continue

    ext = os.path.splitext(filename)[1].lower()

    for category, extensions in categories.items():
        if ext in extensions:
            target_dir = os.path.join(download_dir, category)
            os.makedirs(target_dir, exist_ok=True)
            shutil.move(filepath, os.path.join(target_dir, filename))
            print(f"  {filename} → {category}/")
            break

print("정리 완료!")

복사
예제 3: 간단한 웹 서버 (Flask)
from flask import Flask, jsonify, request

app = Flask(__name__)

# 임시 데이터
courses = [
    {"id": 1, "title": "Python 기초", "price": 50000},
    {"id": 2, "title": "바이브코딩", "price": 99000},
]

# GET: 강의 목록 조회
@app.route("/api/courses", methods=["GET"])
def get_courses():
    return jsonify({"success": True, "courses": courses})

# GET: 강의 상세 조회
@app.route("/api/courses/<int:course_id>", methods=["GET"])
def get_course(course_id):
    course = next((c for c in courses if c["id"] == course_id), None)
    if not course:
        return jsonify({"error": "강의를 찾을 수 없습니다"}), 404
    return jsonify({"success": True, "course": course})

# POST: 강의 생성
@app.route("/api/courses", methods=["POST"])
def create_course():
    data = request.json
    new_course = {
        "id": len(courses) + 1,
        "title": data["title"],
        "price": data["price"],
    }
    courses.append(new_course)
    return jsonify({"success": True, "course": new_course}), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)

복사
# 실행
pip install flask
python3 app.py
# → http://localhost:5000/api/courses 접속

복사
예제 4: 데이터 분석 (Pandas)
import pandas as pd

# CSV 읽기
df = pd.read_csv("수강생.csv")

# 기본 정보
print(df.head())           # 처음 5행
print(df.shape)            # (행, 열) 크기
print(df.describe())       # 통계 요약
print(df.info())           # 컬럼 정보

# 필터링
high_scores = df[df["점수"] >= 90]
python_students = df[df["강의"] == "Python"]

# 그룹별 통계
stats = df.groupby("강의").agg(
    수강생수=("이름", "count"),
    평균점수=("점수", "mean"),
    최고점수=("점수", "max"),
).round(1)
print(stats)

# 새 컬럼 추가
df["등급"] = df["점수"].apply(
    lambda x: "A" if x >= 90 else "B" if x >= 80 else "C"
)

# 결과 저장
df.to_csv("결과.csv", index=False, encoding="utf-8-sig")

복사
예제 5: OpenAI API 연동
from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")

def ask_ai(question: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "당신은 친절한 프로그래밍 선생님입니다."},
            {"role": "user", "content": question},
        ],
        max_tokens=1000,
    )
    return response.choices[0].message.content

# 사용
answer = ask_ai("Python 리스트와 튜플의 차이점을 알려주세요")
print(answer)

복사
📚 핵심 정리
Python 기초 체크리스트
1단계: 기본 문법
├── 변수, 데이터 타입 (str, int, float, bool)
├── 연산자 (산술, 비교, 논리)
├── 조건문 (if/elif/else)
├── 반복문 (for, while)
└── 함수 (def, return, lambda)

2단계: 자료구조
├── 리스트 (list) - 순서 있는 변경 가능
├── 튜플 (tuple) - 순서 있는 변경 불가
├── 딕셔너리 (dict) - 키-값 쌍
├── 집합 (set) - 중복 없음
└── 컴프리헨션 - 한 줄 생성

3단계: 실전
├── 파일 입출력 (txt, json, csv)
├── 모듈과 패키지 (import, pip)
├── API 호출 (requests)
└── 에러 처리 (try/except)

클릭하여 복사
복사
JavaScript 개발자를 위한 빠른 전환 가이드
JS	Python	비고
const/let/var
클릭하여 복사
	그냥 x = 값
클릭하여 복사
	선언 키워드 없음
{ }
클릭하여 복사
	들여쓰기	4칸 스페이스
===
클릭하여 복사
	==
클릭하여 복사
	Python에 ===
클릭하여 복사
 없음
&&
클릭하여 복사
 / ||
클릭하여 복사
 / !
클릭하여 복사
	and
클릭하여 복사
 / or
클릭하여 복사
 / not
클릭하여 복사
	영어 단어
null
클릭하여 복사
 / undefined
클릭하여 복사
	None
클릭하여 복사
	하나만 존재
true
클릭하여 복사
 / false
클릭하여 복사
	True
클릭하여 복사
 / False
클릭하여 복사
	대문자 시작
console.log()
클릭하여 복사
	print()
클릭하여 복사
	
array.push()
클릭하여 복사
	list.append()
클릭하여 복사
	
array.length
클릭하여 복사
	len(list)
클릭하여 복사
	함수 사용
for (let i of arr)
클릭하여 복사
	for i in arr:
클릭하여 복사
	
arr.map(fn)
클릭하여 복사
	[fn(x) for x in arr]
클릭하여 복사
	컴프리헨션
arr.filter(fn)
클릭하여 복사
	[x for x in arr if 조건]
클릭하여 복사
	컴프리헨션
`${var}`
클릭하여 복사
	f"{var}"
클릭하여 복사
	f-string
() => {}
클릭하여 복사
	lambda:
클릭하여 복사
	한 줄만 가능
{...obj}
클릭하여 복사
	{**dict}
클릭하여 복사
	스프레드/언패킹
try/catch
클릭하여 복사
	try/except
클릭하여 복사
	
npm install
클릭하여 복사
	pip install
클릭하여 복사
	
require/import
클릭하여 복사
	import
클릭하여 복사
	

다음 단계: Python을 익혔다면 FastAPI로 웹 서버를 만들거나, Pandas로 데이터 분석에 도전해보세요!