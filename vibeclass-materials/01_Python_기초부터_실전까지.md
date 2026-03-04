Python 기초부터 실전까지
학습 목표
Python 기본 문법과 자료형 이해
함수, 클래스, 모듈 활용법 습득
파일 처리와 예외 처리 학습
실전 프로젝트 적용 능력 배양
1. Python 소개
1.1 Python이란?
┌─────────────────────────────────────────────────────────┐
│                      Python                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   "읽기 쉽고 배우기 쉬운 프로그래밍 언어"                 │
│                                                         │
│   특징:                                                 │
│   • 간결하고 읽기 쉬운 문법                              │
│   • 인터프리터 언어 (컴파일 불필요)                       │
│   • 동적 타이핑                                         │
│   • 풍부한 표준 라이브러리                               │
│   • 크로스 플랫폼 (Windows, Mac, Linux)                 │
│                                                         │
│   활용 분야:                                            │
│   • 웹 개발 (Django, FastAPI, Flask)                   │
│   • 데이터 분석 (Pandas, NumPy)                        │
│   • 인공지능/머신러닝 (TensorFlow, PyTorch)             │
│   • 자동화/스크립팅                                     │
│   • 과학 계산                                           │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
1.2 Python 설치
# macOS (Homebrew)
brew install python@3.12

# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip

# Windows
# https://www.python.org/downloads/ 에서 다운로드

# 버전 확인
python3 --version
pip3 --version

# 가상환경 생성 (권장)
python3 -m venv myenv
source myenv/bin/activate  # macOS/Linux
myenv\Scripts\activate     # Windows

복사
1.3 첫 번째 프로그램
# hello.py
print("Hello, Python!")

# 실행
# python3 hello.py

복사
2. 기본 문법
2.1 변수와 자료형
# 변수 선언 (타입 명시 불필요)
name = "홍길동"          # 문자열 (str)
age = 25                 # 정수 (int)
height = 175.5           # 실수 (float)
is_student = True        # 불리언 (bool)
nothing = None           # None (null과 유사)

# 타입 확인
print(type(name))        # <class 'str'>
print(type(age))         # <class 'int'>

# 타입 변환
str_num = "123"
num = int(str_num)       # 문자열 → 정수
float_num = float(num)   # 정수 → 실수
text = str(num)          # 정수 → 문자열

# 다중 할당
x, y, z = 1, 2, 3
a = b = c = 0

# 변수 교환
x, y = y, x

복사
2.2 문자열 (String)
# 문자열 생성
single = '작은 따옴표'
double = "큰 따옴표"
multi = """여러 줄
문자열"""

# 문자열 연결
first = "Hello"
second = "World"
result = first + " " + second  # "Hello World"

# 문자열 반복
stars = "*" * 10  # "**********"

# 인덱싱 (0부터 시작)
text = "Python"
print(text[0])    # 'P'
print(text[-1])   # 'n' (뒤에서 첫 번째)

# 슬라이싱 [시작:끝:간격]
print(text[0:3])  # 'Pyt' (0, 1, 2)
print(text[2:])   # 'thon' (2부터 끝까지)
print(text[:3])   # 'Pyt' (처음부터 2까지)
print(text[::2])  # 'Pto' (2칸 간격)
print(text[::-1]) # 'nohtyP' (역순)

# 문자열 메서드
msg = "  Hello Python  "
print(msg.strip())         # "Hello Python" (양쪽 공백 제거)
print(msg.upper())         # "  HELLO PYTHON  "
print(msg.lower())         # "  hello python  "
print(msg.replace("Python", "World"))  # "  Hello World  "
print(msg.split())         # ['Hello', 'Python']
print("Hello Python".split(" "))  # ['Hello', 'Python']

# 문자열 검색
text = "Hello Python"
print("Python" in text)    # True
print(text.find("Python")) # 6 (시작 인덱스)
print(text.count("o"))     # 2

# 문자열 포맷팅
name = "홍길동"
age = 25

# f-string (Python 3.6+, 권장)
print(f"이름: {name}, 나이: {age}")
print(f"내년 나이: {age + 1}")
print(f"가격: {1234567:,}원")      # "가격: 1,234,567원"
print(f"비율: {0.1234:.2%}")       # "비율: 12.34%"

# format() 메서드
print("이름: {}, 나이: {}".format(name, age))
print("이름: {n}, 나이: {a}".format(n=name, a=age))

# % 포맷팅 (옛날 방식)
print("이름: %s, 나이: %d" % (name, age))

복사
2.3 숫자 연산
# 기본 연산
a, b = 10, 3
print(a + b)   # 13 (덧셈)
print(a - b)   # 7 (뺄셈)
print(a * b)   # 30 (곱셈)
print(a / b)   # 3.333... (나눗셈, 항상 float)
print(a // b)  # 3 (몫, 정수 나눗셈)
print(a % b)   # 1 (나머지)
print(a ** b)  # 1000 (거듭제곱)

# 복합 대입 연산자
x = 10
x += 5   # x = x + 5 → 15
x -= 3   # x = x - 3 → 12
x *= 2   # x = x * 2 → 24
x //= 5  # x = x // 5 → 4

# 내장 함수
print(abs(-5))       # 5 (절대값)
print(round(3.7))    # 4 (반올림)
print(round(3.14159, 2))  # 3.14 (소수점 2자리)
print(min(1, 2, 3))  # 1
print(max(1, 2, 3))  # 3
print(sum([1, 2, 3]))  # 6
print(pow(2, 3))     # 8 (2의 3승)

# math 모듈
import math
print(math.sqrt(16))    # 4.0 (제곱근)
print(math.ceil(3.1))   # 4 (올림)
print(math.floor(3.9))  # 3 (내림)
print(math.pi)          # 3.141592...
print(math.e)           # 2.718281...

복사
2.4 불리언과 비교 연산
# 비교 연산자
a, b = 10, 5
print(a == b)   # False (같음)
print(a != b)   # True (다름)
print(a > b)    # True (크다)
print(a < b)    # False (작다)
print(a >= b)   # True (크거나 같다)
print(a <= b)   # False (작거나 같다)

# 논리 연산자
x, y = True, False
print(x and y)  # False (둘 다 True여야 True)
print(x or y)   # True (하나라도 True면 True)
print(not x)    # False (반대)

# 연산자 우선순위: not > and > or
print(True or False and False)   # True (and 먼저)
print((True or False) and False) # False

# Falsy 값 (False로 평가되는 값)
print(bool(0))       # False
print(bool(""))      # False (빈 문자열)
print(bool([]))      # False (빈 리스트)
print(bool({}))      # False (빈 딕셔너리)
print(bool(None))    # False

# Truthy 값
print(bool(1))       # True
print(bool("hello")) # True
print(bool([1, 2]))  # True

# is vs ==
a = [1, 2, 3]
b = [1, 2, 3]
c = a
print(a == b)  # True (값이 같음)
print(a is b)  # False (다른 객체)
print(a is c)  # True (같은 객체)

복사
3. 자료구조
3.1 리스트 (List)
# 리스트 생성
fruits = ["사과", "바나나", "오렌지"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]  # 다양한 타입 가능
empty = []

# 인덱싱과 슬라이싱
print(fruits[0])      # "사과"
print(fruits[-1])     # "오렌지"
print(fruits[1:3])    # ["바나나", "오렌지"]

# 리스트 수정
fruits[0] = "딸기"    # ["딸기", "바나나", "오렌지"]

# 요소 추가
fruits.append("포도")         # 끝에 추가
fruits.insert(1, "키위")      # 1번 인덱스에 삽입
fruits.extend(["망고", "레몬"])  # 여러 요소 추가

# 요소 제거
fruits.remove("바나나")  # 값으로 제거
del fruits[0]            # 인덱스로 제거
popped = fruits.pop()    # 마지막 요소 제거 후 반환
popped = fruits.pop(0)   # 0번 인덱스 제거 후 반환
fruits.clear()           # 모든 요소 제거

# 리스트 검색
fruits = ["사과", "바나나", "오렌지", "바나나"]
print("바나나" in fruits)      # True
print(fruits.index("바나나"))  # 1 (첫 번째 인덱스)
print(fruits.count("바나나"))  # 2

# 리스트 정렬
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()            # 오름차순 정렬 (원본 변경)
numbers.sort(reverse=True)  # 내림차순 정렬
sorted_nums = sorted(numbers)  # 새 리스트 반환 (원본 유지)

# 리스트 복사
original = [1, 2, 3]
copy1 = original.copy()    # 얕은 복사
copy2 = list(original)     # 얕은 복사
copy3 = original[:]        # 얕은 복사

import copy
deep_copy = copy.deepcopy(original)  # 깊은 복사

# 리스트 연산
a = [1, 2, 3]
b = [4, 5, 6]
print(a + b)       # [1, 2, 3, 4, 5, 6]
print(a * 2)       # [1, 2, 3, 1, 2, 3]
print(len(a))      # 3

# 리스트 컴프리헨션 (List Comprehension)
# 기본 형태: [표현식 for 변수 in 반복가능객체]
squares = [x**2 for x in range(1, 6)]  # [1, 4, 9, 16, 25]

# 조건 포함
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]

# 중첩 반복
matrix = [[i*j for j in range(1, 4)] for i in range(1, 4)]
# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# 조건 표현식
result = [x if x > 0 else 0 for x in [-1, 2, -3, 4]]  # [0, 2, 0, 4]

복사
3.2 튜플 (Tuple)
# 튜플 생성 (변경 불가능한 리스트)
point = (10, 20)
colors = ("red", "green", "blue")
single = (1,)  # 요소 1개일 때 콤마 필수

# 인덱싱과 슬라이싱
print(point[0])     # 10
print(colors[1:])   # ("green", "blue")

# 튜플 언패킹
x, y = point        # x=10, y=20
a, b, c = colors    # a="red", b="green", c="blue"

# 확장 언패킹
first, *rest = [1, 2, 3, 4, 5]  # first=1, rest=[2, 3, 4, 5]
first, *middle, last = [1, 2, 3, 4, 5]  # first=1, middle=[2, 3, 4], last=5

# 튜플 메서드
nums = (1, 2, 2, 3, 2)
print(nums.count(2))   # 3
print(nums.index(3))   # 3

# 튜플 활용
# 함수에서 여러 값 반환
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

minimum, maximum, average = get_stats([1, 2, 3, 4, 5])

# 딕셔너리 키로 사용 가능 (리스트는 불가)
locations = {
    (37.5, 127.0): "서울",
    (35.1, 129.0): "부산"
}

복사
3.3 딕셔너리 (Dictionary)
# 딕셔너리 생성
person = {
    "name": "홍길동",
    "age": 25,
    "city": "서울"
}

# 다른 생성 방법
person2 = dict(name="김철수", age=30)
empty = {}

# 값 접근
print(person["name"])        # "홍길동"
print(person.get("name"))    # "홍길동"
print(person.get("phone", "없음"))  # "없음" (기본값)

# 값 수정/추가
person["age"] = 26           # 수정
person["phone"] = "010-1234-5678"  # 추가

# 값 제거
del person["phone"]
removed = person.pop("city")  # "서울" 반환 후 제거
person.clear()               # 모든 요소 제거

# 딕셔너리 순회
person = {"name": "홍길동", "age": 25}

for key in person:
    print(f"{key}: {person[key]}")

for key in person.keys():
    print(key)

for value in person.values():
    print(value)

for key, value in person.items():
    print(f"{key}: {value}")

# 딕셔너리 메서드
print(person.keys())    # dict_keys(['name', 'age'])
print(person.values())  # dict_values(['홍길동', 25])
print(person.items())   # dict_items([('name', '홍길동'), ('age', 25)])

# 딕셔너리 병합
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = {**dict1, **dict2}  # {"a": 1, "b": 2, "c": 3, "d": 4}
dict1.update(dict2)          # dict1에 dict2 병합

# 딕셔너리 컴프리헨션
squares = {x: x**2 for x in range(1, 6)}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 조건 포함
even_squares = {x: x**2 for x in range(10) if x % 2 == 0}
# {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# 중첩 딕셔너리
students = {
    "student1": {"name": "홍길동", "score": 90},
    "student2": {"name": "김철수", "score": 85}
}
print(students["student1"]["name"])  # "홍길동"

복사
3.4 집합 (Set)
# 집합 생성 (중복 없음, 순서 없음)
fruits = {"사과", "바나나", "오렌지"}
numbers = set([1, 2, 2, 3, 3, 3])  # {1, 2, 3}
empty = set()  # 빈 집합 ({}는 빈 딕셔너리)

# 요소 추가/제거
fruits.add("포도")
fruits.remove("바나나")    # 없으면 에러
fruits.discard("키위")     # 없어도 에러 없음
popped = fruits.pop()      # 임의의 요소 제거

# 집합 연산
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)   # {1, 2, 3, 4, 5, 6} (합집합)
print(a & b)   # {3, 4} (교집합)
print(a - b)   # {1, 2} (차집합)
print(a ^ b)   # {1, 2, 5, 6} (대칭차집합)

# 메서드 버전
print(a.union(b))
print(a.intersection(b))
print(a.difference(b))
print(a.symmetric_difference(b))

# 부분집합/상위집합
small = {1, 2}
big = {1, 2, 3, 4}
print(small.issubset(big))    # True
print(big.issuperset(small))  # True
print(small.isdisjoint({5, 6}))  # True (겹치는 요소 없음)

# 집합 컴프리헨션
squares = {x**2 for x in range(10)}

복사
4. 제어문
4.1 조건문 (if)
# 기본 if 문
age = 20
if age >= 18:
    print("성인입니다")

# if-else
if age >= 18:
    print("성인입니다")
else:
    print("미성년자입니다")

# if-elif-else
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

# 중첩 조건문
num = 15
if num > 0:
    if num % 2 == 0:
        print("양수이면서 짝수")
    else:
        print("양수이면서 홀수")
else:
    print("0 또는 음수")

# 조건 표현식 (삼항 연산자)
age = 20
status = "성인" if age >= 18 else "미성년자"

# 다중 조건
x = 5
if 0 < x < 10:  # Python 특유의 연속 비교
    print("0과 10 사이")

# 조건문에서의 in 연산자
fruits = ["사과", "바나나", "오렌지"]
if "사과" in fruits:
    print("사과가 있습니다")

# match-case (Python 3.10+)
command = "start"
match command:
    case "start":
        print("시작합니다")
    case "stop":
        print("중지합니다")
    case "restart":
        print("재시작합니다")
    case _:  # 기본값 (else와 유사)
        print("알 수 없는 명령")

복사
4.2 반복문 (for, while)
# for 반복문
fruits = ["사과", "바나나", "오렌지"]
for fruit in fruits:
    print(fruit)

# range 함수
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):     # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2): # 0, 2, 4, 6, 8
    print(i)

for i in range(5, 0, -1): # 5, 4, 3, 2, 1
    print(i)

# enumerate (인덱스와 값 함께)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

for index, fruit in enumerate(fruits, start=1):  # 1부터 시작
    print(f"{index}: {fruit}")

# zip (여러 리스트 동시 순회)
names = ["홍길동", "김철수", "이영희"]
ages = [25, 30, 28]
for name, age in zip(names, ages):
    print(f"{name}: {age}세")

# 딕셔너리 순회
person = {"name": "홍길동", "age": 25}
for key, value in person.items():
    print(f"{key}: {value}")

# while 반복문
count = 0
while count < 5:
    print(count)
    count += 1

# break와 continue
for i in range(10):
    if i == 3:
        continue  # 3은 건너뛰기
    if i == 7:
        break     # 7에서 종료
    print(i)

# else 절 (반복이 정상 종료되면 실행)
for i in range(5):
    if i == 10:
        break
else:
    print("반복 완료")  # break 없이 끝나면 실행

# 중첩 반복문
for i in range(1, 10):
    for j in range(1, 10):
        print(f"{i} x {j} = {i*j:2d}", end="  ")
    print()

# 무한 루프
while True:
    user_input = input("종료하려면 'q' 입력: ")
    if user_input == 'q':
        break

복사
5. 함수
5.1 함수 정의와 호출
# 기본 함수
def greet():
    print("안녕하세요!")

greet()  # 호출

# 매개변수가 있는 함수
def greet_name(name):
    print(f"안녕하세요, {name}님!")

greet_name("홍길동")

# 반환값이 있는 함수
def add(a, b):
    return a + b

result = add(3, 5)  # 8

# 여러 값 반환
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)

minimum, maximum, total = get_stats([1, 2, 3, 4, 5])

# 기본 매개변수
def greet(name, greeting="안녕하세요"):
    print(f"{greeting}, {name}님!")

greet("홍길동")                    # "안녕하세요, 홍길동님!"
greet("김철수", "반갑습니다")      # "반갑습니다, 김철수님!"

# 키워드 인자
def create_user(name, age, city="서울"):
    return {"name": name, "age": age, "city": city}

user = create_user(age=25, name="홍길동")  # 순서 상관없음

복사
5.2 가변 인자
# *args (위치 인자를 튜플로)
def sum_all(*args):
    total = 0
    for num in args:
        total += num
    return total

print(sum_all(1, 2, 3))       # 6
print(sum_all(1, 2, 3, 4, 5)) # 15

# **kwargs (키워드 인자를 딕셔너리로)
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="홍길동", age=25, city="서울")

# 혼합 사용
def func(a, b, *args, **kwargs):
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"kwargs={kwargs}")

func(1, 2, 3, 4, 5, x=10, y=20)
# a=1, b=2
# args=(3, 4, 5)
# kwargs={'x': 10, 'y': 20}

# 언패킹으로 인자 전달
numbers = [1, 2, 3]
print(sum_all(*numbers))  # sum_all(1, 2, 3)

info = {"name": "홍길동", "age": 25}
print_info(**info)  # print_info(name="홍길동", age=25)

복사
5.3 람다 함수
# 람다 함수 (익명 함수)
# lambda 매개변수: 표현식

# 기본 사용
add = lambda a, b: a + b
print(add(3, 5))  # 8

# 정렬에 활용
students = [
    {"name": "홍길동", "score": 85},
    {"name": "김철수", "score": 92},
    {"name": "이영희", "score": 78}
]

# 점수로 정렬
students.sort(key=lambda x: x["score"])
students.sort(key=lambda x: x["score"], reverse=True)  # 내림차순

# map과 함께
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, numbers))  # [1, 4, 9, 16, 25]

# filter와 함께
evens = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4]

# reduce와 함께
from functools import reduce
total = reduce(lambda a, b: a + b, numbers)  # 15

복사
5.4 스코프와 클로저
# 스코프 (변수 유효 범위)
global_var = "전역 변수"

def outer():
    outer_var = "외부 함수 변수"

    def inner():
        inner_var = "내부 함수 변수"
        print(global_var)   # 접근 가능
        print(outer_var)    # 접근 가능
        print(inner_var)    # 접근 가능

    inner()

# global 키워드
count = 0

def increment():
    global count  # 전역 변수 수정 선언
    count += 1

increment()
print(count)  # 1

# nonlocal 키워드
def outer():
    x = 10

    def inner():
        nonlocal x  # 외부 함수 변수 수정 선언
        x += 1

    inner()
    return x

print(outer())  # 11

# 클로저
def make_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15

복사
5.5 데코레이터
# 기본 데코레이터
def my_decorator(func):
    def wrapper():
        print("함수 실행 전")
        func()
        print("함수 실행 후")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
# 함수 실행 전
# Hello!
# 함수 실행 후

# 인자가 있는 함수용 데코레이터
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("함수 실행 전")
        result = func(*args, **kwargs)
        print("함수 실행 후")
        return result
    return wrapper

@my_decorator
def add(a, b):
    return a + b

result = add(3, 5)

# 실용적인 예: 실행 시간 측정
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 실행 시간: {end - start:.4f}초")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "완료"

slow_function()

# 데코레이터에 인자 전달
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("World")  # 3번 출력

복사
6. 클래스와 객체
6.1 클래스 기초
# 클래스 정의
class Dog:
    # 클래스 변수 (모든 인스턴스 공유)
    species = "개"

    # 생성자
    def __init__(self, name, age):
        # 인스턴스 변수
        self.name = name
        self.age = age

    # 인스턴스 메서드
    def bark(self):
        print(f"{self.name}가 멍멍!")

    def info(self):
        return f"{self.name}, {self.age}살"

# 인스턴스 생성
dog1 = Dog("바둑이", 3)
dog2 = Dog("흰둥이", 5)

# 메서드 호출
dog1.bark()           # "바둑이가 멍멍!"
print(dog1.info())    # "바둑이, 3살"

# 속성 접근
print(dog1.name)      # "바둑이"
print(Dog.species)    # "개"

복사
6.2 상속
# 부모 클래스
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        pass

    def info(self):
        return f"이름: {self.name}"

# 자식 클래스
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # 부모 생성자 호출
        self.breed = breed

    def speak(self):
        return f"{self.name}가 멍멍!"

    def info(self):
        return f"{super().info()}, 품종: {self.breed}"

class Cat(Animal):
    def speak(self):
        return f"{self.name}가 야옹!"

# 사용
dog = Dog("바둑이", "진돗개")
cat = Cat("나비")

print(dog.speak())  # "바둑이가 멍멍!"
print(cat.speak())  # "나비가 야옹!"
print(dog.info())   # "이름: 바둑이, 품종: 진돗개"

# 다중 상속
class A:
    def method(self):
        return "A"

class B:
    def method(self):
        return "B"

class C(A, B):  # A가 우선
    pass

c = C()
print(c.method())  # "A"

복사
6.3 캡슐화
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner           # public
        self._balance = balance      # protected (관례)
        self.__secret = "비밀"       # private (네임 맹글링)

    # getter
    @property
    def balance(self):
        return self._balance

    # setter
    @balance.setter
    def balance(self, amount):
        if amount < 0:
            raise ValueError("잔액은 음수일 수 없습니다")
        self._balance = amount

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount
            return amount
        return 0

account = BankAccount("홍길동", 10000)
print(account.balance)     # 10000 (getter)
account.balance = 20000    # setter
account.deposit(5000)
print(account.balance)     # 25000

복사
6.4 특수 메서드 (매직 메서드)
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # 문자열 표현
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    # 연산자 오버로딩
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    # 비교
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __lt__(self, other):
        return (self.x**2 + self.y**2) < (other.x**2 + other.y**2)

    # 길이
    def __len__(self):
        return int((self.x**2 + self.y**2)**0.5)

    # 불리언
    def __bool__(self):
        return self.x != 0 or self.y != 0

    # 인덱싱
    def __getitem__(self, index):
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        raise IndexError("Index out of range")

v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(v1)           # Vector(3, 4)
print(v1 + v2)      # Vector(4, 6)
print(v1 * 2)       # Vector(6, 8)
print(v1 == v2)     # False
print(len(v1))      # 5
print(v1[0])        # 3

복사
6.5 클래스 메서드와 정적 메서드
class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    # 인스턴스 메서드
    def display(self):
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

    # 클래스 메서드 (cls = 클래스 자체)
    @classmethod
    def from_string(cls, date_string):
        year, month, day = map(int, date_string.split("-"))
        return cls(year, month, day)

    @classmethod
    def today(cls):
        import datetime
        t = datetime.date.today()
        return cls(t.year, t.month, t.day)

    # 정적 메서드 (self, cls 없음)
    @staticmethod
    def is_valid_date(year, month, day):
        return 1 <= month <= 12 and 1 <= day <= 31

# 사용
date1 = Date(2024, 1, 15)
date2 = Date.from_string("2024-06-20")
date3 = Date.today()

print(date1.display())               # "2024-01-15"
print(Date.is_valid_date(2024, 13, 1))  # False

복사
7. 모듈과 패키지
7.1 모듈 가져오기
# 전체 모듈 가져오기
import math
print(math.sqrt(16))

# 별칭 사용
import pandas as pd
import numpy as np

# 특정 함수만 가져오기
from math import sqrt, pi
print(sqrt(16))
print(pi)

# 모든 것 가져오기 (비권장)
from math import *

# 자체 모듈 만들기
# mymodule.py
def greet(name):
    return f"Hello, {name}!"

PI = 3.14159

# 다른 파일에서 사용
from mymodule import greet, PI

복사
7.2 패키지 구조
mypackage/
├── __init__.py
├── module1.py
├── module2.py
└── subpackage/
    ├── __init__.py
    └── module3.py

클릭하여 복사
복사
# 패키지 가져오기
from mypackage import module1
from mypackage.subpackage import module3

# __init__.py에서 공개 API 정의
# mypackage/__init__.py
from .module1 import function1
from .module2 import function2

# 사용
from mypackage import function1, function2

복사
7.3 주요 표준 라이브러리
# os - 운영체제 인터페이스
import os
print(os.getcwd())           # 현재 디렉토리
print(os.listdir("."))       # 파일 목록
os.makedirs("new_dir", exist_ok=True)  # 디렉토리 생성
os.path.exists("file.txt")   # 파일 존재 확인
os.path.join("dir", "file")  # 경로 결합

# sys - 시스템 관련
import sys
print(sys.version)           # Python 버전
print(sys.argv)              # 명령줄 인자
sys.exit()                   # 프로그램 종료

# datetime - 날짜/시간
from datetime import datetime, timedelta
now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M:%S"))
tomorrow = now + timedelta(days=1)

# json - JSON 처리
import json
data = {"name": "홍길동", "age": 25}
json_str = json.dumps(data, ensure_ascii=False)  # 객체 → JSON
parsed = json.loads(json_str)  # JSON → 객체

# re - 정규표현식
import re
pattern = r"\d+"
text = "가격은 1000원입니다"
matches = re.findall(pattern, text)  # ['1000']

# random - 난수
import random
print(random.random())        # 0~1 사이 실수
print(random.randint(1, 10))  # 1~10 사이 정수
print(random.choice([1, 2, 3]))  # 무작위 선택
random.shuffle([1, 2, 3])     # 리스트 섞기

# collections - 특수 자료구조
from collections import Counter, defaultdict, deque
counter = Counter("hello")    # {'l': 2, 'h': 1, 'e': 1, 'o': 1}
dd = defaultdict(list)        # 기본값이 있는 딕셔너리
dq = deque([1, 2, 3])         # 양방향 큐

복사
8. 파일 처리
8.1 파일 읽기/쓰기
# 파일 쓰기
with open("example.txt", "w", encoding="utf-8") as f:
    f.write("Hello, World!\n")
    f.write("안녕하세요!")

# 파일 읽기
with open("example.txt", "r", encoding="utf-8") as f:
    content = f.read()        # 전체 읽기
    print(content)

with open("example.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()     # 줄 단위 리스트
    for line in lines:
        print(line.strip())

with open("example.txt", "r", encoding="utf-8") as f:
    for line in f:            # 한 줄씩 읽기 (메모리 효율적)
        print(line.strip())

# 파일 추가
with open("example.txt", "a", encoding="utf-8") as f:
    f.write("\n추가된 내용")

# 파일 모드
# 'r' - 읽기 (기본값)
# 'w' - 쓰기 (덮어쓰기)
# 'a' - 추가
# 'x' - 배타적 생성 (파일 있으면 에러)
# 'b' - 바이너리 모드 ('rb', 'wb')

복사
8.2 JSON 파일 처리
import json

# JSON 파일 쓰기
data = {
    "name": "홍길동",
    "age": 25,
    "skills": ["Python", "JavaScript"]
}

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# JSON 파일 읽기
with open("data.json", "r", encoding="utf-8") as f:
    loaded_data = json.load(f)
    print(loaded_data["name"])

복사
8.3 CSV 파일 처리
import csv

# CSV 쓰기
data = [
    ["이름", "나이", "도시"],
    ["홍길동", 25, "서울"],
    ["김철수", 30, "부산"]
]

with open("data.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(data)

# CSV 읽기
with open("data.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)

# 딕셔너리로 처리
with open("data.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["이름"], row["나이"])

복사
9. 예외 처리
9.1 try-except
# 기본 예외 처리
try:
    result = 10 / 0
except ZeroDivisionError:
    print("0으로 나눌 수 없습니다")

# 여러 예외 처리
try:
    x = int(input("숫자 입력: "))
    result = 10 / x
except ValueError:
    print("숫자를 입력해주세요")
except ZeroDivisionError:
    print("0으로 나눌 수 없습니다")
except Exception as e:
    print(f"오류 발생: {e}")

# else와 finally
try:
    result = 10 / 2
except ZeroDivisionError:
    print("0으로 나눌 수 없습니다")
else:
    print(f"결과: {result}")  # 예외 없을 때만 실행
finally:
    print("항상 실행")        # 항상 실행

# 예외 정보 얻기
try:
    x = 1 / 0
except Exception as e:
    print(f"에러 타입: {type(e).__name__}")
    print(f"에러 메시지: {e}")

    import traceback
    traceback.print_exc()  # 전체 스택 트레이스

복사
9.2 예외 발생시키기
# raise로 예외 발생
def divide(a, b):
    if b == 0:
        raise ValueError("0으로 나눌 수 없습니다")
    return a / b

try:
    divide(10, 0)
except ValueError as e:
    print(e)

# 사용자 정의 예외
class CustomError(Exception):
    def __init__(self, message, code):
        super().__init__(message)
        self.code = code

def check_age(age):
    if age < 0:
        raise CustomError("나이는 음수일 수 없습니다", 400)
    if age > 150:
        raise CustomError("유효하지 않은 나이입니다", 400)

try:
    check_age(-5)
except CustomError as e:
    print(f"에러: {e}, 코드: {e.code}")

# assert (디버깅용)
def calculate_average(numbers):
    assert len(numbers) > 0, "리스트가 비어있습니다"
    return sum(numbers) / len(numbers)

복사
10. 실전 프로젝트 예제
10.1 간단한 할 일 관리 앱
import json
from datetime import datetime

class TodoApp:
    def __init__(self, filename="todos.json"):
        self.filename = filename
        self.todos = self.load_todos()

    def load_todos(self):
        try:
            with open(self.filename, "r", encoding="utf-8") as f:
                return json.load(f)
        except FileNotFoundError:
            return []

    def save_todos(self):
        with open(self.filename, "w", encoding="utf-8") as f:
            json.dump(self.todos, f, ensure_ascii=False, indent=2)

    def add(self, title):
        todo = {
            "id": len(self.todos) + 1,
            "title": title,
            "completed": False,
            "created_at": datetime.now().isoformat()
        }
        self.todos.append(todo)
        self.save_todos()
        print(f"✅ 추가됨: {title}")

    def list(self):
        if not self.todos:
            print("할 일이 없습니다.")
            return

        print("\n📋 할 일 목록:")
        for todo in self.todos:
            status = "✓" if todo["completed"] else "○"
            print(f"  [{status}] {todo['id']}. {todo['title']}")

    def complete(self, todo_id):
        for todo in self.todos:
            if todo["id"] == todo_id:
                todo["completed"] = True
                self.save_todos()
                print(f"✅ 완료: {todo['title']}")
                return
        print("해당 할 일을 찾을 수 없습니다.")

    def delete(self, todo_id):
        for i, todo in enumerate(self.todos):
            if todo["id"] == todo_id:
                removed = self.todos.pop(i)
                self.save_todos()
                print(f"🗑️ 삭제됨: {removed['title']}")
                return
        print("해당 할 일을 찾을 수 없습니다.")

def main():
    app = TodoApp()

    while True:
        print("\n명령어: add, list, complete, delete, quit")
        command = input("입력: ").strip().lower()

        if command == "add":
            title = input("할 일: ")
            app.add(title)
        elif command == "list":
            app.list()
        elif command == "complete":
            todo_id = int(input("완료할 번호: "))
            app.complete(todo_id)
        elif command == "delete":
            todo_id = int(input("삭제할 번호: "))
            app.delete(todo_id)
        elif command == "quit":
            print("종료합니다.")
            break
        else:
            print("알 수 없는 명령어입니다.")

if __name__ == "__main__":
    main()

복사
10.2 웹 API 호출
import requests
import json

def get_weather(city):
    """날씨 정보 조회 (OpenWeatherMap API)"""
    API_KEY = "your-api-key"
    url = f"https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric",
        "lang": "kr"
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # 에러 시 예외 발생

        data = response.json()
        return {
            "city": data["name"],
            "temp": data["main"]["temp"],
            "description": data["weather"][0]["description"]
        }
    except requests.RequestException as e:
        print(f"API 호출 실패: {e}")
        return None

# 사용
weather = get_weather("Seoul")
if weather:
    print(f"{weather['city']}: {weather['temp']}°C, {weather['description']}")

복사
정리
Python 핵심 포인트

기본 문법

들여쓰기로 블록 구분
동적 타이핑
f-string 포맷팅

자료구조

리스트, 튜플, 딕셔너리, 집합
컴프리헨션 문법

함수

*args, **kwargs
람다 함수
데코레이터

클래스

상속과 다형성
특수 메서드
@property, @classmethod, @staticmethod

실용 기능

예외 처리 (try-except)
파일 I/O (with 문)
모듈과 패키지
다음 학습 추천
웹 프레임워크: FastAPI, Django, Flask
데이터 분석: Pandas, NumPy, Matplotlib
머신러닝: scikit-learn, TensorFlow, PyTorch