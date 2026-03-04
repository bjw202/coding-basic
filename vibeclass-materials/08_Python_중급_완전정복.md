Python 중급 완전정복

목표: Python의 객체지향, 에러 처리, 고급 문법까지 한 번에 정리하기 대상: 바이브코딩 수강생 (중급, Python 기초 완전정복 이수자)

📋 목차
에러 처리 (try/except)
클래스와 객체지향
상속과 다형성
매직 메서드
데코레이터
제너레이터와 이터레이터
컨텍스트 매니저
정규표현식
테스트 작성
실전 프로젝트 예제
1️⃣ 에러 처리 (try/except)
에러의 종류
┌─────────────────────────────────────────────────┐
│              Python 에러 계층 구조                │
├─────────────────────────────────────────────────┤
│                                                  │
│  BaseException                                   │
│  ├── SystemExit                                  │
│  ├── KeyboardInterrupt                           │
│  └── Exception  ← 대부분의 에러는 여기            │
│      ├── ValueError     (잘못된 값)               │
│      ├── TypeError      (잘못된 타입)             │
│      ├── KeyError       (없는 딕셔너리 키)        │
│      ├── IndexError     (인덱스 범위 초과)        │
│      ├── FileNotFoundError (파일 없음)            │
│      ├── ZeroDivisionError (0으로 나눔)           │
│      ├── AttributeError (없는 속성)               │
│      └── IOError        (입출력 에러)             │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
try/except 기본
# 기본 에러 처리
try:
    result = 10 / 0
except ZeroDivisionError:
    print("0으로 나눌 수 없습니다!")

# JavaScript 비교
# try {
#     const result = 10 / 0;
# } catch (error) {
#     console.log("에러 발생!");
# }

# 여러 에러 처리
try:
    number = int(input("숫자 입력: "))
    result = 100 / number
    print(f"결과: {result}")
except ValueError:
    print("숫자를 입력해주세요!")
except ZeroDivisionError:
    print("0은 입력할 수 없습니다!")
except Exception as e:
    print(f"예상치 못한 에러: {e}")

복사
try/except/else/finally
try:
    f = open("data.txt", "r")
    content = f.read()
except FileNotFoundError:
    print("파일이 없습니다!")
else:
    # 에러가 없을 때만 실행
    print(f"파일 내용: {content}")
finally:
    # 에러 여부와 관계없이 항상 실행
    print("작업 종료")

# 실전 패턴: API 호출
import requests

def fetch_data(url):
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()  # HTTP 에러 시 예외 발생
    except requests.ConnectionError:
        print("서버에 연결할 수 없습니다")
        return None
    except requests.Timeout:
        print("요청 시간이 초과되었습니다")
        return None
    except requests.HTTPError as e:
        print(f"HTTP 에러: {e}")
        return None
    else:
        return response.json()

복사
에러 정보 활용
try:
    data = {"name": "김철수"}
    print(data["age"])
except KeyError as e:
    print(f"없는 키: {e}")          # 없는 키: 'age'
    print(f"에러 타입: {type(e)}")   # <class 'KeyError'>

# traceback 출력 (디버깅용)
import traceback

try:
    result = 1 / 0
except Exception:
    traceback.print_exc()
    # Traceback (most recent call last):
    #   File "...", line 2, in <module>
    #     result = 1 / 0
    # ZeroDivisionError: division by zero

복사
커스텀 예외
# 사용자 정의 예외
class CourseError(Exception):
    """강의 관련 에러 기본 클래스"""
    pass

class CourseNotFoundError(CourseError):
    """강의를 찾을 수 없을 때"""
    def __init__(self, course_id):
        self.course_id = course_id
        super().__init__(f"강의 ID {course_id}를 찾을 수 없습니다")

class EnrollmentError(CourseError):
    """수강 신청 관련 에러"""
    pass

# 사용
def enroll_course(user_id, course_id):
    course = find_course(course_id)
    if not course:
        raise CourseNotFoundError(course_id)

    if course["is_full"]:
        raise EnrollmentError("수강 인원이 가득 찼습니다")

    return {"success": True}

# 처리
try:
    result = enroll_course(1, 999)
except CourseNotFoundError as e:
    print(f"에러: {e}")
    print(f"강의 ID: {e.course_id}")
except EnrollmentError as e:
    print(f"수강 신청 실패: {e}")

복사
assert (개발 중 검증)
# assert: 조건이 False면 AssertionError 발생
# 개발/디버깅 시 사용 (운영에서는 -O 옵션으로 비활성화)

def calculate_discount(price, rate):
    assert 0 <= rate <= 1, f"할인율은 0~1 사이여야 합니다 (입력값: {rate})"
    assert price > 0, "가격은 0보다 커야 합니다"
    return price * (1 - rate)

calculate_discount(10000, 0.2)   # 8000.0
calculate_discount(10000, 1.5)   # AssertionError!

복사
2️⃣ 클래스와 객체지향
객체지향 프로그래밍 개요
┌─────────────────────────────────────────────────┐
│           객체지향 프로그래밍 (OOP)                │
├─────────────────────────────────────────────────┤
│                                                  │
│  "현실 세계를 코드로 모델링하는 방법"              │
│                                                  │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│  │  캡슐화   │   │  상속     │   │ 다형성   │    │
│  │ 데이터+   │   │ 코드     │   │ 같은 이름 │    │
│  │ 메서드를  │   │ 재사용   │   │ 다른 동작 │    │
│  │ 하나로    │   │          │   │          │    │
│  └──────────┘   └──────────┘   └──────────┘    │
│                                                  │
│  클래스 = 설계도 (붕어빵 틀)                      │
│  객체   = 실체   (붕어빵)                         │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
클래스 기본
# 클래스 정의
class Student:
    """수강생 클래스"""

    # 클래스 변수 (모든 인스턴스가 공유)
    platform = "바이브클래스"

    # 생성자 (__init__)
    def __init__(self, name, email):
        # 인스턴스 변수 (각 객체마다 고유)
        self.name = name
        self.email = email
        self.courses = []

    # 인스턴스 메서드
    def enroll(self, course_name):
        self.courses.append(course_name)
        print(f"{self.name}님이 [{course_name}]을 수강 신청했습니다")

    def get_info(self):
        return f"{self.name} ({self.email}) - 수강 {len(self.courses)}개"

# 객체 생성
student1 = Student("김철수", "kim@example.com")
student2 = Student("이영희", "lee@example.com")

# 메서드 호출
student1.enroll("Python 기초")
student1.enroll("바이브코딩")
print(student1.get_info())  # 김철수 (kim@example.com) - 수강 2개

# 클래스 변수 접근
print(Student.platform)      # 바이브클래스
print(student1.platform)     # 바이브클래스

복사
# JavaScript 비교
# class Student {
#     static platform = "바이브클래스";
#
#     constructor(name, email) {
#         this.name = name;
#         this.email = email;
#         this.courses = [];
#     }
#
#     enroll(courseName) {
#         this.courses.push(courseName);
#     }
# }

복사
self의 이해
# self = 자기 자신 (JS의 this)
# Python에서는 메서드의 첫 번째 인자로 반드시 self를 명시

class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):       # self 필수!
        self.count += 1
        return self              # 메서드 체이닝 가능

    def get_count(self):
        return self.count

c = Counter()
c.increment().increment().increment()  # 체이닝
print(c.get_count())                    # 3

복사
프로퍼티 (property)
class Course:
    def __init__(self, title, price):
        self.title = title
        self._price = price    # _ 접두사 = 내부용 (관례)

    # getter
    @property
    def price(self):
        return self._price

    # setter
    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("가격은 0 이상이어야 합니다")
        self._price = value

    # 읽기 전용 프로퍼티
    @property
    def display_price(self):
        return f"{self._price:,}원"

# 사용
course = Course("Python 기초", 50000)
print(course.price)           # 50000
print(course.display_price)   # 50,000원

course.price = 60000          # setter 호출
course.price = -1000          # ValueError!

복사
접근 제어 (네이밍 관례)
class User:
    def __init__(self, name, password):
        self.name = name         # public (자유롭게 접근)
        self._email = ""         # protected (내부/서브클래스용, 관례)
        self.__password = password  # private (이름 맹글링)

    def check_password(self, pw):
        return self.__password == pw

user = User("김철수", "secret123")
print(user.name)          # "김철수" ✅
print(user._email)        # "" ✅ (접근 가능하지만 관례상 자제)
# print(user.__password)  # ❌ AttributeError!
print(user._User__password)  # "secret123" (이름 맹글링 - 접근은 가능하지만 금지)

# ⚠️ Python에는 진정한 private이 없음 (관례에 의존)
# JavaScript의 #private와 다름

복사
클래스 메서드와 정적 메서드
class Course:
    _total_courses = 0

    def __init__(self, title, category):
        self.title = title
        self.category = category
        Course._total_courses += 1

    # 인스턴스 메서드: self로 인스턴스 접근
    def get_info(self):
        return f"[{self.category}] {self.title}"

    # 클래스 메서드: cls로 클래스 접근
    @classmethod
    def get_total(cls):
        return cls._total_courses

    # 클래스 메서드: 대안 생성자 패턴
    @classmethod
    def from_dict(cls, data):
        return cls(data["title"], data["category"])

    # 정적 메서드: self/cls 없음 (유틸리티 함수)
    @staticmethod
    def validate_title(title):
        return len(title) >= 2

# 사용
c1 = Course("Python 기초", "프로그래밍")
c2 = Course.from_dict({"title": "바이브코딩", "category": "AI"})

print(Course.get_total())                # 2
print(Course.validate_title("P"))        # False
print(Course.validate_title("Python"))   # True

복사
데이터 클래스 (dataclass)
from dataclasses import dataclass, field
from datetime import datetime

# 일반 클래스로 작성하면 반복이 많음
# class Student:
#     def __init__(self, name, age, email):
#         self.name = name
#         self.age = age
#         self.email = email

# dataclass: __init__, __repr__, __eq__ 등을 자동 생성
@dataclass
class Student:
    name: str
    age: int
    email: str
    courses: list = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)

    def enroll(self, course):
        self.courses.append(course)

# 자동 생성된 기능들
s1 = Student("김철수", 25, "kim@example.com")
s2 = Student("김철수", 25, "kim@example.com")

print(s1)           # Student(name='김철수', age=25, ...) ← __repr__ 자동
print(s1 == s2)     # True ← __eq__ 자동
s1.enroll("Python")

# 불변(immutable) 데이터 클래스
@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(3.0, 4.0)
# p.x = 5.0  # ❌ FrozenInstanceError!

복사
3️⃣ 상속과 다형성
상속 기본
# 부모 클래스 (기본 클래스)
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.role = "user"

    def get_info(self):
        return f"[{self.role}] {self.name} ({self.email})"

    def can_access(self, resource):
        return resource == "public"

# 자식 클래스 (파생 클래스)
class Instructor(User):
    def __init__(self, name, email, specialty):
        super().__init__(name, email)  # 부모 생성자 호출
        self.specialty = specialty
        self.role = "instructor"
        self.courses = []

    def create_course(self, title):
        self.courses.append(title)
        return f"강의 [{title}] 생성 완료"

    # 메서드 오버라이딩 (재정의)
    def can_access(self, resource):
        return resource in ["public", "instructor", "course_management"]

class Admin(User):
    def __init__(self, name, email):
        super().__init__(name, email)
        self.role = "admin"

    def can_access(self, resource):
        return True  # 관리자는 모든 곳에 접근 가능

# 사용
user = User("김철수", "kim@example.com")
instructor = Instructor("조강사", "jo@vibeclass.kr", "Python")
admin = Admin("관리자", "admin@vibeclass.kr")

print(user.get_info())        # [user] 김철수 (kim@example.com)
print(instructor.get_info())  # [instructor] 조강사 (jo@vibeclass.kr)
instructor.create_course("Python 기초")

# 다형성: 같은 메서드, 다른 동작
for person in [user, instructor, admin]:
    print(f"{person.name}: 관리자페이지 접근 = {person.can_access('admin')}")
# 김철수: 관리자페이지 접근 = False
# 조강사: 관리자페이지 접근 = False
# 관리자: 관리자페이지 접근 = True

복사
isinstance와 issubclass
instructor = Instructor("조강사", "jo@vibeclass.kr", "Python")

# isinstance: 객체가 특정 클래스의 인스턴스인지 확인
isinstance(instructor, Instructor)  # True
isinstance(instructor, User)        # True  (상속 관계도 True!)
isinstance(instructor, Admin)       # False

# issubclass: 클래스 간 상속 관계 확인
issubclass(Instructor, User)    # True
issubclass(Admin, User)         # True
issubclass(User, Instructor)    # False

복사
다중 상속과 MRO
class Notifiable:
    """알림 기능"""
    def send_notification(self, message):
        print(f"알림: {message} → {self.email}")

class Loggable:
    """로깅 기능"""
    def log(self, action):
        print(f"[LOG] {self.name}: {action}")

# 다중 상속 (Mixin 패턴)
class InstructorPro(User, Notifiable, Loggable):
    def __init__(self, name, email):
        super().__init__(name, email)
        self.role = "instructor_pro"

    def create_course(self, title):
        self.log(f"강의 생성: {title}")
        self.send_notification(f"새 강의 [{title}] 생성됨")
        return title

# 사용
pro = InstructorPro("조강사", "jo@vibeclass.kr")
pro.create_course("Python 중급")
# [LOG] 조강사: 강의 생성: Python 중급
# 알림: 새 강의 [Python 중급] 생성됨 → jo@vibeclass.kr

# MRO (Method Resolution Order) 확인
print(InstructorPro.__mro__)
# (InstructorPro, User, Notifiable, Loggable, object)

복사
추상 클래스 (ABC)
from abc import ABC, abstractmethod

# 추상 클래스: 직접 인스턴스 생성 불가, 반드시 상속받아 구현
class PaymentGateway(ABC):
    """결제 게이트웨이 인터페이스"""

    @abstractmethod
    def process_payment(self, amount: int) -> dict:
        """결제 처리 (반드시 구현해야 함)"""
        pass

    @abstractmethod
    def refund(self, transaction_id: str) -> bool:
        """환불 처리 (반드시 구현해야 함)"""
        pass

    # 일반 메서드 (공통 로직)
    def format_amount(self, amount: int) -> str:
        return f"{amount:,}원"

# 구현 클래스
class PaySsam(PaymentGateway):
    def process_payment(self, amount):
        print(f"결제선생: {self.format_amount(amount)} 결제 처리")
        return {"success": True, "gateway": "payssam"}

    def refund(self, transaction_id):
        print(f"결제선생: {transaction_id} 환불 처리")
        return True

# gateway = PaymentGateway()  # ❌ TypeError! 추상 클래스는 인스턴스 생성 불가
gateway = PaySsam()
gateway.process_payment(50000)  # 결제선생: 50,000원 결제 처리

복사
4️⃣ 매직 메서드
매직 메서드 개요
┌─────────────────────────────────────────────────┐
│         매직 메서드 (Dunder Methods)              │
├─────────────────────────────────────────────────┤
│                                                  │
│  __로 시작하고 끝나는 특수 메서드                  │
│  Python의 내장 동작을 커스터마이즈                  │
│                                                  │
│  __init__    → 생성자                             │
│  __str__     → print() / str()                   │
│  __repr__    → 디버깅 표현                        │
│  __len__     → len()                             │
│  __eq__      → ==                                │
│  __lt__      → <                                 │
│  __add__     → +                                 │
│  __getitem__ → obj[key]                          │
│  __contains__→ in                                │
│  __iter__    → for 순회                           │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
실전 예제: 강의 목록 클래스
class CourseList:
    """강의 목록을 관리하는 커스텀 컬렉션"""

    def __init__(self, courses=None):
        self._courses = list(courses) if courses else []

    # print() 출력
    def __str__(self):
        titles = [c["title"] for c in self._courses]
        return f"강의 목록 ({len(self)}개): {', '.join(titles)}"

    # 디버깅 표현 (개발자용)
    def __repr__(self):
        return f"CourseList({self._courses!r})"

    # len()
    def __len__(self):
        return len(self._courses)

    # 인덱싱 obj[i]
    def __getitem__(self, index):
        return self._courses[index]

    # in 연산자
    def __contains__(self, title):
        return any(c["title"] == title for c in self._courses)

    # + 연산자 (목록 합치기)
    def __add__(self, other):
        return CourseList(self._courses + other._courses)

    # for 순회
    def __iter__(self):
        return iter(self._courses)

    # == 비교
    def __eq__(self, other):
        return self._courses == other._courses

# 사용
courses = CourseList([
    {"title": "Python 기초", "price": 50000},
    {"title": "바이브코딩", "price": 99000},
])

print(courses)              # 강의 목록 (2개): Python 기초, 바이브코딩
print(len(courses))         # 2
print(courses[0])           # {"title": "Python 기초", "price": 50000}
print("Python 기초" in courses)  # True

for course in courses:
    print(f"  - {course['title']}: {course['price']:,}원")

복사
enter / exit (with 문 지원)
class Timer:
    """실행 시간 측정 컨텍스트 매니저"""

    def __enter__(self):
        import time
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        self.elapsed = time.time() - self.start
        print(f"실행 시간: {self.elapsed:.4f}초")
        return False  # 예외를 전파 (True면 억제)

# 사용
with Timer():
    total = sum(range(1_000_000))
# 실행 시간: 0.0312초

복사
5️⃣ 데코레이터
데코레이터 개념
┌─────────────────────────────────────────────────┐
│               데코레이터 (Decorator)              │
├─────────────────────────────────────────────────┤
│                                                  │
│  함수를 감싸서 추가 기능을 부여하는 패턴           │
│                                                  │
│  @데코레이터                                      │
│  def 원본함수():                                  │
│      ...                                         │
│                                                  │
│  실행 순서:                                       │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│  │ 데코레이터│ → │ 원본함수  │ → │ 데코레이터│    │
│  │ (전처리)  │   │ (실행)   │   │ (후처리)  │    │
│  └──────────┘   └──────────┘   └──────────┘    │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
기본 데코레이터
import functools
import time

# 실행 시간 측정 데코레이터
def timer(func):
    @functools.wraps(func)  # 원본 함수 정보 유지
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"[{func.__name__}] 실행 시간: {elapsed:.4f}초")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "완료"

result = slow_function()
# [slow_function] 실행 시간: 1.0012초

복사
인자를 받는 데코레이터
# 재시도 데코레이터
def retry(max_attempts=3, delay=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"[{func.__name__}] 시도 {attempt} 실패: {e}")
                    print(f"  {delay}초 후 재시도...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=2)
def fetch_api_data(url):
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    return response.json()

복사
실전 데코레이터 예제
# 1. 로깅 데코레이터
def log_call(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        args_repr = [repr(a) for a in args]
        kwargs_repr = [f"{k}={v!r}" for k, v in kwargs.items()]
        signature = ", ".join(args_repr + kwargs_repr)
        print(f"호출: {func.__name__}({signature})")
        result = func(*args, **kwargs)
        print(f"반환: {func.__name__} → {result!r}")
        return result
    return wrapper

@log_call
def add(a, b):
    return a + b

add(3, 5)
# 호출: add(3, 5)
# 반환: add → 8

# 2. 캐시 데코레이터 (Python 내장)
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

fibonacci(100)  # 즉시 계산 (캐시 덕분에)

# 3. 권한 검증 데코레이터 (웹 앱 패턴)
def require_role(role):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(user, *args, **kwargs):
            if user.get("role") != role:
                raise PermissionError(
                    f"{role} 권한이 필요합니다 (현재: {user.get('role')})"
                )
            return func(user, *args, **kwargs)
        return wrapper
    return decorator

@require_role("admin")
def delete_user(admin, user_id):
    return f"사용자 {user_id} 삭제 완료"

admin = {"name": "관리자", "role": "admin"}
user = {"name": "김철수", "role": "user"}

delete_user(admin, 123)   # "사용자 123 삭제 완료"
delete_user(user, 123)    # PermissionError!

복사
데코레이터 쌓기
# 여러 데코레이터를 동시에 적용 (아래에서 위로 실행)
@timer
@log_call
@retry(max_attempts=3)
def process_data(data):
    return data.upper()

# 실행 순서: retry → log_call → timer → process_data

복사
6️⃣ 제너레이터와 이터레이터
이터레이터 프로토콜
# 이터레이터: __iter__와 __next__를 가진 객체
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

# 사용
for num in Countdown(5):
    print(num, end=" ")
# 5 4 3 2 1

복사
제너레이터 함수
# 제너레이터: yield를 사용하는 함수
# 값을 하나씩 생성 (메모리 절약)

def countdown(start):
    while start > 0:
        yield start    # 값을 반환하고 일시 중지
        start -= 1

# 사용
for num in countdown(5):
    print(num, end=" ")
# 5 4 3 2 1

# 리스트 vs 제너레이터 (메모리 차이)
# 리스트: 모든 값을 메모리에 저장
big_list = [x ** 2 for x in range(1_000_000)]  # 메모리 많이 사용

# 제너레이터: 값을 하나씩 생성 (거의 메모리 안 씀)
big_gen = (x ** 2 for x in range(1_000_000))   # () 사용!

복사
제너레이터 실전 활용
# 1. 대용량 파일 읽기
def read_large_file(filepath):
    """파일을 한 줄씩 읽는 제너레이터"""
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            yield line.strip()

# 10GB 파일도 문제없이 처리
for line in read_large_file("huge_log.txt"):
    if "ERROR" in line:
        print(line)

# 2. 페이지네이션
def fetch_pages(base_url, per_page=20):
    """API 데이터를 페이지별로 가져오는 제너레이터"""
    page = 1
    while True:
        response = requests.get(f"{base_url}?page={page}&per_page={per_page}")
        data = response.json()

        if not data:
            break

        yield from data  # yield from: 이터러블의 각 요소를 yield
        page += 1

# 모든 페이지를 자동으로 순회
for item in fetch_pages("https://api.example.com/courses"):
    print(item["title"])

# 3. 무한 시퀀스
def infinite_id():
    """무한 ID 생성기"""
    n = 1
    while True:
        yield n
        n += 1

id_gen = infinite_id()
print(next(id_gen))  # 1
print(next(id_gen))  # 2
print(next(id_gen))  # 3

복사
제너레이터 표현식
# 리스트 컴프리헨션 → [] = 즉시 모든 값 생성
squares_list = [x ** 2 for x in range(1000)]

# 제너레이터 표현식 → () = 필요할 때 값 생성
squares_gen = (x ** 2 for x in range(1000))

# 함수에 바로 전달
total = sum(x ** 2 for x in range(1000))   # 괄호 생략 가능
max_val = max(len(name) for name in names)

복사
7️⃣ 컨텍스트 매니저
with 문의 원리
# with 문: 리소스의 안전한 획득과 해제

# 파일 처리 (가장 흔한 예)
with open("data.txt", "r") as f:
    content = f.read()
# ← 여기서 파일이 자동으로 닫힘 (에러가 발생해도!)

# with 없이 작성하면:
f = open("data.txt", "r")
try:
    content = f.read()
finally:
    f.close()   # 반드시 닫아야 함

복사
contextlib으로 간단하게 만들기
from contextlib import contextmanager
import time

@contextmanager
def timer(label="작업"):
    """실행 시간 측정 컨텍스트 매니저"""
    start = time.time()
    print(f"[{label}] 시작...")
    try:
        yield  # ← with 블록의 코드가 여기서 실행
    finally:
        elapsed = time.time() - start
        print(f"[{label}] 완료 ({elapsed:.4f}초)")

# 사용
with timer("데이터 처리"):
    data = [x ** 2 for x in range(1_000_000)]
# [데이터 처리] 시작...
# [데이터 처리] 완료 (0.0815초)

@contextmanager
def temporary_directory():
    """임시 디렉토리 생성/삭제"""
    import tempfile
    import shutil

    tmpdir = tempfile.mkdtemp()
    try:
        yield tmpdir
    finally:
        shutil.rmtree(tmpdir)

with temporary_directory() as tmpdir:
    # tmpdir에서 작업
    pass
# ← 자동 삭제됨

복사
여러 컨텍스트 매니저 동시 사용
# 여러 파일을 동시에
with open("input.txt", "r") as fin, open("output.txt", "w") as fout:
    for line in fin:
        fout.write(line.upper())

# Python 3.10+ 괄호 사용 가능
with (
    open("input.txt", "r") as fin,
    open("output.txt", "w") as fout,
    open("log.txt", "a") as flog,
):
    for line in fin:
        fout.write(line.upper())
        flog.write(f"처리: {line.strip()}\n")

복사
8️⃣ 정규표현식
기본 패턴
import re

# 기본 패턴 문자
# .   → 아무 문자 1개
# \d  → 숫자 (0-9)
# \w  → 문자+숫자+언더스코어 (a-z, A-Z, 0-9, _)
# \s  → 공백 (스페이스, 탭, 줄바꿈)
# ^   → 문자열 시작
# $   → 문자열 끝
# *   → 0회 이상 반복
# +   → 1회 이상 반복
# ?   → 0회 또는 1회
# {n} → 정확히 n회
# []  → 문자 클래스

# 매칭 확인
pattern = r"^\d{3}-\d{4}-\d{4}$"
re.match(pattern, "010-1234-5678")  # Match 객체 (매칭됨)
re.match(pattern, "01012345678")     # None (매칭 안 됨)

복사
주요 함수
text = "김철수 전화번호는 010-1234-5678이고, 이영희는 010-9876-5432입니다."

# match: 문자열 시작에서 매칭
re.match(r"김철수", text)  # Match (시작이 "김철수"이므로)

# search: 전체에서 첫 번째 매칭
result = re.search(r"\d{3}-\d{4}-\d{4}", text)
print(result.group())   # "010-1234-5678"

# findall: 모든 매칭 찾기
phones = re.findall(r"\d{3}-\d{4}-\d{4}", text)
print(phones)  # ["010-1234-5678", "010-9876-5432"]

# sub: 치환
masked = re.sub(r"(\d{3})-(\d{4})-(\d{4})", r"\1-****-\3", text)
print(masked)  # "김철수 전화번호는 010-****-5678이고, ..."

# split: 분리
parts = re.split(r"[,;]\s*", "사과, 바나나; 딸기, 포도")
print(parts)  # ['사과', '바나나', '딸기', '포도']

복사
실전 패턴 모음
# 이메일 검증
email_pattern = r"^[\w.-]+@[\w.-]+\.\w+$"
re.match(email_pattern, "user@example.com")   # ✅
re.match(email_pattern, "invalid-email")       # ❌

# 전화번호 검증 (한국)
phone_pattern = r"^01[0-9]-?\d{3,4}-?\d{4}$"
re.match(phone_pattern, "010-1234-5678")  # ✅
re.match(phone_pattern, "01012345678")     # ✅

# URL 추출
url_pattern = r"https?://[\w./-]+"
urls = re.findall(url_pattern, "사이트: https://vibeclass.kr 방문하세요")

# HTML 태그 제거
clean_text = re.sub(r"<[^>]+>", "", "<p>안녕하세요</p><br>")
# "안녕하세요"

# 비밀번호 검증 (8자 이상, 대/소문자+숫자+특수문자)
def validate_password(pw):
    if len(pw) < 8:
        return False
    if not re.search(r"[A-Z]", pw):
        return False
    if not re.search(r"[a-z]", pw):
        return False
    if not re.search(r"\d", pw):
        return False
    if not re.search(r"[!@#$%^&*]", pw):
        return False
    return True

복사
그룹과 명명된 그룹
# 그룹: ()로 감싸기
pattern = r"(\d{4})-(\d{2})-(\d{2})"
match = re.match(pattern, "2026-02-20")

match.group(0)   # "2026-02-20" (전체)
match.group(1)   # "2026" (첫 번째 그룹)
match.group(2)   # "02"
match.group(3)   # "20"

# 명명된 그룹: (?P<이름>패턴)
pattern = r"(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})"
match = re.match(pattern, "2026-02-20")

match.group("year")    # "2026"
match.group("month")   # "02"
match.group("day")     # "20"

# groupdict()로 딕셔너리 변환
match.groupdict()  # {"year": "2026", "month": "02", "day": "20"}

복사
9️⃣ 테스트 작성
unittest 기본
import unittest

# 테스트 대상 함수
def calculate_discount(price, rate):
    if not 0 <= rate <= 1:
        raise ValueError("할인율은 0~1 사이여야 합니다")
    return int(price * (1 - rate))

# 테스트 클래스
class TestDiscount(unittest.TestCase):

    def test_basic_discount(self):
        """기본 할인 계산"""
        self.assertEqual(calculate_discount(10000, 0.1), 9000)
        self.assertEqual(calculate_discount(10000, 0.5), 5000)

    def test_no_discount(self):
        """할인 없음"""
        self.assertEqual(calculate_discount(10000, 0), 10000)

    def test_full_discount(self):
        """100% 할인"""
        self.assertEqual(calculate_discount(10000, 1), 0)

    def test_invalid_rate(self):
        """잘못된 할인율"""
        with self.assertRaises(ValueError):
            calculate_discount(10000, 1.5)

        with self.assertRaises(ValueError):
            calculate_discount(10000, -0.1)

if __name__ == "__main__":
    unittest.main()

복사
# 실행
python -m unittest test_discount.py -v
# test_basic_discount ... ok
# test_full_discount ... ok
# test_invalid_rate ... ok
# test_no_discount ... ok
# Ran 4 tests in 0.001s
# OK

복사
pytest (더 간결한 테스트)
# pip install pytest
import pytest

def calculate_discount(price, rate):
    if not 0 <= rate <= 1:
        raise ValueError("할인율은 0~1 사이여야 합니다")
    return int(price * (1 - rate))

# 함수 이름이 test_로 시작하면 자동 인식
def test_basic_discount():
    assert calculate_discount(10000, 0.1) == 9000
    assert calculate_discount(10000, 0.5) == 5000

def test_no_discount():
    assert calculate_discount(10000, 0) == 10000

def test_invalid_rate():
    with pytest.raises(ValueError):
        calculate_discount(10000, 1.5)

# 파라미터화 테스트
@pytest.mark.parametrize("price, rate, expected", [
    (10000, 0.1, 9000),
    (10000, 0.2, 8000),
    (10000, 0.5, 5000),
    (50000, 0.3, 35000),
])
def test_various_discounts(price, rate, expected):
    assert calculate_discount(price, rate) == expected

# 픽스처 (테스트 전 준비)
@pytest.fixture
def sample_courses():
    return [
        {"title": "Python 기초", "price": 50000},
        {"title": "바이브코딩", "price": 99000},
    ]

def test_course_count(sample_courses):
    assert len(sample_courses) == 2

def test_course_price(sample_courses):
    assert sample_courses[0]["price"] == 50000

복사
# 실행
pytest test_discount.py -v
# test_basic_discount PASSED
# test_no_discount PASSED
# test_invalid_rate PASSED
# test_various_discounts[10000-0.1-9000] PASSED
# test_various_discounts[10000-0.2-8000] PASSED
# ...

복사
🔟 실전 프로젝트 예제
예제 1: 웹 크롤러
import requests
from bs4 import BeautifulSoup

def crawl_news(url):
    """뉴스 기사 크롤링"""
    response = requests.get(url, headers={
        "User-Agent": "Mozilla/5.0"
    })
    soup = BeautifulSoup(response.text, "html.parser")

    articles = []
    for item in soup.select(".news-item"):
        title = item.select_one(".title")
        link = item.select_one("a")

        if title and link:
            articles.append({
                "title": title.get_text(strip=True),
                "url": link.get("href"),
            })

    return articles

# 사용
# articles = crawl_news("https://example.com/news")
# for article in articles:
#     print(f"- {article['title']}")

복사
예제 2: CLI 도구 만들기
import argparse
import json

def main():
    parser = argparse.ArgumentParser(description="수강생 관리 도구")
    subparsers = parser.add_subparsers(dest="command")

    # 목록 조회 명령어
    subparsers.add_parser("list", help="수강생 목록 조회")

    # 추가 명령어
    add_parser = subparsers.add_parser("add", help="수강생 추가")
    add_parser.add_argument("name", help="수강생 이름")
    add_parser.add_argument("--email", required=True, help="이메일")

    # 검색 명령어
    search_parser = subparsers.add_parser("search", help="수강생 검색")
    search_parser.add_argument("query", help="검색어")

    args = parser.parse_args()

    # 데이터 파일 로드
    try:
        with open("students.json", "r", encoding="utf-8") as f:
            students = json.load(f)
    except FileNotFoundError:
        students = []

    if args.command == "list":
        for i, s in enumerate(students, 1):
            print(f"{i}. {s['name']} ({s['email']})")

    elif args.command == "add":
        students.append({"name": args.name, "email": args.email})
        with open("students.json", "w", encoding="utf-8") as f:
            json.dump(students, f, ensure_ascii=False, indent=2)
        print(f"추가 완료: {args.name}")

    elif args.command == "search":
        results = [s for s in students if args.query in s["name"]]
        for s in results:
            print(f"- {s['name']} ({s['email']})")

if __name__ == "__main__":
    main()

복사
# 사용법
python student_cli.py add "김철수" --email "kim@example.com"
python student_cli.py list
python student_cli.py search "김"

복사
예제 3: 간단한 ORM 패턴
class Model:
    """간단한 ORM 기본 클래스"""
    _store = {}

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        cls._store = {}
        cls._next_id = 1

    def save(self):
        if not hasattr(self, "id") or self.id is None:
            self.id = self.__class__._next_id
            self.__class__._next_id += 1
        self.__class__._store[self.id] = self
        return self

    @classmethod
    def find(cls, id):
        return cls._store.get(id)

    @classmethod
    def all(cls):
        return list(cls._store.values())

    @classmethod
    def where(cls, **conditions):
        results = []
        for obj in cls._store.values():
            if all(getattr(obj, k, None) == v for k, v in conditions.items()):
                results.append(obj)
        return results

    def delete(self):
        self.__class__._store.pop(self.id, None)

# 사용
class Student(Model):
    def __init__(self, name, email, course=None):
        self.id = None
        self.name = name
        self.email = email
        self.course = course

    def __repr__(self):
        return f"Student({self.name}, {self.email})"

# CRUD 작업
Student("김철수", "kim@example.com", "Python").save()
Student("이영희", "lee@example.com", "Python").save()
Student("박민수", "park@example.com", "Node.js").save()

print(Student.all())
# [Student(김철수, ...), Student(이영희, ...), Student(박민수, ...)]

print(Student.find(1))
# Student(김철수, kim@example.com)

print(Student.where(course="Python"))
# [Student(김철수, ...), Student(이영희, ...)]

복사
📚 핵심 정리
Python 중급 체크리스트
1단계: 에러 처리
├── try/except/else/finally 패턴
├── 커스텀 예외 클래스
└── assert로 개발 중 검증

2단계: 객체지향 프로그래밍
├── 클래스, 인스턴스, self
├── 프로퍼티 (@property)
├── 클래스/정적 메서드
├── 상속과 다형성
├── 추상 클래스 (ABC)
└── 데이터 클래스 (@dataclass)

3단계: 고급 문법
├── 데코레이터 (@)
├── 제너레이터 (yield)
├── 컨텍스트 매니저 (with)
└── 정규표현식 (re)

4단계: 품질
├── unittest / pytest
├── 파라미터화 테스트
└── 픽스처 (fixture)

클릭하여 복사
복사
매직 메서드 빠른 참조
메서드	호출 시점	예시
__init__
클릭하여 복사
	객체 생성	Student()
클릭하여 복사

__str__
클릭하여 복사
	print()
클릭하여 복사
, str()
클릭하여 복사
	print(obj)
클릭하여 복사

__repr__
클릭하여 복사
	디버깅	repr(obj)
클릭하여 복사

__len__
클릭하여 복사
	len()
클릭하여 복사
	len(obj)
클릭하여 복사

__getitem__
클릭하여 복사
	인덱싱	obj[0]
클릭하여 복사

__contains__
클릭하여 복사
	in
클릭하여 복사
 연산	x in obj
클릭하여 복사

__eq__
클릭하여 복사
	==
클릭하여 복사
 비교	a == b
클릭하여 복사

__lt__
클릭하여 복사
	<
클릭하여 복사
 비교	a < b
클릭하여 복사

__add__
클릭하여 복사
	+
클릭하여 복사
 연산	a + b
클릭하여 복사

__iter__
클릭하여 복사
	for
클릭하여 복사
 순회	for x in obj
클릭하여 복사

__enter__
클릭하여 복사
	with
클릭하여 복사
 진입	with obj:
클릭하여 복사

__exit__
클릭하여 복사
	with
클릭하여 복사
 종료	
__call__
클릭하여 복사
	함수처럼 호출	obj()
클릭하여 복사

다음 단계: Python 고급 완전정복에서 비동기 프로그래밍, 멀티스레딩, 디자인 패턴, 성능 최적화를 학습합니다!