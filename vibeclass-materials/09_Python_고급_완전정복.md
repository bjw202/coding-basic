Python 고급 완전정복

목표: 비동기 프로그래밍, 멀티스레딩, 디자인 패턴, 성능 최적화까지 한 번에 정리하기 대상: 바이브코딩 수강생 (고급, Python 중급 완전정복 이수자)

📋 목차
비동기 프로그래밍 (asyncio)
멀티스레딩과 멀티프로세싱
타입 시스템 심화
패턴 매칭 (match/case)
디자인 패턴
메타클래스와 디스크립터
성능 최적화
패키지 만들기
보안과 베스트 프랙티스
실전 프로젝트 예제
1️⃣ 비동기 프로그래밍 (asyncio)
동기 vs 비동기
┌─────────────────────────────────────────────────┐
│            동기 (Synchronous)                     │
├─────────────────────────────────────────────────┤
│                                                  │
│  작업1 ████████░░░░░░░░░░░░░░░░░░░░             │
│  작업2 ░░░░░░░░████████░░░░░░░░░░░░             │
│  작업3 ░░░░░░░░░░░░░░░░████████░░░░             │
│                                                  │
│  → 순서대로 하나씩 (총 24초)                      │
│                                                  │
├─────────────────────────────────────────────────┤
│            비동기 (Asynchronous)                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  작업1 ████████░░░░░░░░░░░░░░░░░░░░             │
│  작업2 ████████░░░░░░░░░░░░░░░░░░░░             │
│  작업3 ████████░░░░░░░░░░░░░░░░░░░░             │
│                                                  │
│  → 동시에 대기 (총 8초)                           │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
async/await 기본
import asyncio

# 비동기 함수 (코루틴) 정의
async def fetch_data(name, delay):
    print(f"[{name}] 데이터 요청 중...")
    await asyncio.sleep(delay)  # 비동기 대기 (I/O 시뮬레이션)
    print(f"[{name}] 데이터 수신 완료! ({delay}초)")
    return f"{name}_data"

# 순차 실행 (동기적)
async def sequential():
    result1 = await fetch_data("API1", 2)
    result2 = await fetch_data("API2", 3)
    result3 = await fetch_data("API3", 1)
    return [result1, result2, result3]
    # → 총 6초 소요

# 병렬 실행 (비동기)
async def parallel():
    results = await asyncio.gather(
        fetch_data("API1", 2),
        fetch_data("API2", 3),
        fetch_data("API3", 1),
    )
    return results
    # → 총 3초 소요 (가장 긴 작업 기준)

# 실행
asyncio.run(parallel())

# JavaScript 비교
# async function fetchData(name, delay) {
#     await new Promise(resolve => setTimeout(resolve, delay * 1000));
#     return `${name}_data`;
# }
# await Promise.all([fetchData("API1", 2), ...]);

복사
asyncio 핵심 패턴
import asyncio
import aiohttp  # pip install aiohttp

# 1. 여러 URL 동시 호출
async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.json()

async def fetch_all_urls(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        return results

# 사용
urls = [
    "https://api.example.com/courses",
    "https://api.example.com/students",
    "https://api.example.com/stats",
]
# results = asyncio.run(fetch_all_urls(urls))

# 2. 타임아웃 처리
async def fetch_with_timeout(url, timeout=5):
    try:
        result = await asyncio.wait_for(
            fetch_url(aiohttp.ClientSession(), url),
            timeout=timeout,
        )
        return result
    except asyncio.TimeoutError:
        print(f"타임아웃: {url}")
        return None

# 3. 세마포어 (동시 요청 수 제한)
semaphore = asyncio.Semaphore(5)  # 최대 5개 동시 실행

async def limited_fetch(session, url):
    async with semaphore:
        return await fetch_url(session, url)

# 4. 비동기 이터레이터
async def async_range(start, stop):
    for i in range(start, stop):
        await asyncio.sleep(0.1)
        yield i

async def main():
    async for num in async_range(0, 10):
        print(num, end=" ")

# 5. 비동기 컨텍스트 매니저
class AsyncDatabase:
    async def __aenter__(self):
        print("DB 연결")
        await asyncio.sleep(0.1)  # 연결 시뮬레이션
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        print("DB 연결 해제")
        await asyncio.sleep(0.1)

    async def query(self, sql):
        await asyncio.sleep(0.1)
        return [{"id": 1, "name": "김철수"}]

async def main():
    async with AsyncDatabase() as db:
        results = await db.query("SELECT * FROM users")
        print(results)

복사
asyncio.Queue (생산자-소비자 패턴)
async def producer(queue, items):
    """데이터 생산자"""
    for item in items:
        await queue.put(item)
        print(f"생산: {item}")
        await asyncio.sleep(0.5)
    await queue.put(None)  # 종료 신호

async def consumer(queue, name):
    """데이터 소비자"""
    while True:
        item = await queue.get()
        if item is None:
            await queue.put(None)  # 다른 소비자에게도 전달
            break
        print(f"[{name}] 소비: {item}")
        await asyncio.sleep(1)

async def main():
    queue = asyncio.Queue(maxsize=10)
    items = ["작업1", "작업2", "작업3", "작업4", "작업5"]

    await asyncio.gather(
        producer(queue, items),
        consumer(queue, "워커1"),
        consumer(queue, "워커2"),
    )

asyncio.run(main())

복사
2️⃣ 멀티스레딩과 멀티프로세싱
GIL과 동시성 전략
┌─────────────────────────────────────────────────┐
│       Python 동시성 전략 선택 가이드               │
├─────────────────────────────────────────────────┤
│                                                  │
│  I/O 바운드 작업 (네트워크, 파일, DB)             │
│  → asyncio 또는 threading                        │
│  예: API 호출, 파일 읽기, DB 쿼리                 │
│                                                  │
│  CPU 바운드 작업 (계산 집약)                       │
│  → multiprocessing                               │
│  예: 이미지 처리, 데이터 분석, 암호화             │
│                                                  │
│  ⚠️ GIL (Global Interpreter Lock)                │
│  → Python 스레드는 동시에 1개만 실행              │
│  → CPU 작업에는 멀티스레딩이 효과 없음             │
│  → I/O 대기 중에는 GIL 해제 → 스레드 효과적       │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
멀티스레딩 (threading)
from concurrent.futures import ThreadPoolExecutor
import requests
import time

# ThreadPoolExecutor (권장 방식)
def fetch_url(url):
    """URL에서 데이터 가져오기"""
    response = requests.get(url, timeout=10)
    return {"url": url, "status": response.status_code}

urls = [
    "https://httpbin.org/delay/1",
    "https://httpbin.org/delay/2",
    "https://httpbin.org/delay/1",
    "https://httpbin.org/delay/2",
]

# 순차 실행: ~6초
start = time.time()
results = [fetch_url(url) for url in urls]
print(f"순차: {time.time() - start:.1f}초")

# 멀티스레딩: ~2초
start = time.time()
with ThreadPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(fetch_url, urls))
print(f"병렬: {time.time() - start:.1f}초")

# submit + as_completed (완료되는 순서대로 처리)
from concurrent.futures import as_completed

with ThreadPoolExecutor(max_workers=4) as executor:
    futures = {executor.submit(fetch_url, url): url for url in urls}

    for future in as_completed(futures):
        url = futures[future]
        try:
            result = future.result()
            print(f"완료: {url} → {result['status']}")
        except Exception as e:
            print(f"에러: {url} → {e}")

복사
스레드 안전성
import threading

# ❌ 스레드 안전하지 않음
counter = 0

def unsafe_increment():
    global counter
    for _ in range(100_000):
        counter += 1  # 경쟁 조건 발생!

# ✅ Lock으로 스레드 안전하게
lock = threading.Lock()
safe_counter = 0

def safe_increment():
    global safe_counter
    for _ in range(100_000):
        with lock:
            safe_counter += 1

# threading.local (스레드별 독립 저장소)
thread_local = threading.local()

def worker():
    thread_local.value = threading.current_thread().name
    print(f"스레드: {thread_local.value}")

복사
멀티프로세싱 (multiprocessing)
from concurrent.futures import ProcessPoolExecutor
import math

# CPU 집약 작업 예시
def is_prime(n):
    """소수 판별"""
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

def count_primes(start, end):
    """범위 내 소수 개수"""
    return sum(1 for n in range(start, end) if is_prime(n))

# 범위를 나누어 병렬 처리
ranges = [(1, 250000), (250000, 500000), (500000, 750000), (750000, 1000000)]

# 순차 실행
start = time.time()
total = sum(count_primes(s, e) for s, e in ranges)
print(f"순차: {total}개 ({time.time() - start:.1f}초)")

# 멀티프로세싱
start = time.time()
with ProcessPoolExecutor(max_workers=4) as executor:
    results = executor.map(lambda r: count_primes(*r), ranges)
    total = sum(results)
print(f"병렬: {total}개 ({time.time() - start:.1f}초)")

복사
3️⃣ 타입 시스템 심화
고급 타입 힌트
from typing import (
    Optional, Union, Literal, TypeAlias,
    TypeVar, Generic, Protocol, TypedDict,
    Callable, Awaitable, overload,
)

# 1. 기본 타입 힌트 (Python 3.10+)
def process(data: str | None) -> list[str]:  # Union 대체
    if data is None:
        return []
    return data.split(",")

# 2. Literal (특정 값만 허용)
def set_role(user_id: int, role: Literal["user", "instructor", "admin"]) -> None:
    pass

set_role(1, "admin")      # ✅
# set_role(1, "superuser")  # mypy 에러!

# 3. TypedDict (딕셔너리 구조 정의)
class CourseDict(TypedDict):
    title: str
    price: int
    instructor: str
    is_published: bool

def create_course(data: CourseDict) -> None:
    print(f"강의 생성: {data['title']}")

# IDE가 키와 타입을 자동 완성/검증
create_course({"title": "Python", "price": 50000, "instructor": "조강사", "is_published": True})

# 4. TypeAlias (타입 별칭)
UserID: TypeAlias = int
CourseData: TypeAlias = dict[str, str | int | bool]
Handler: TypeAlias = Callable[[str, int], dict[str, any]]

복사
제네릭 (Generic)
from typing import TypeVar, Generic

T = TypeVar("T")

# 제네릭 클래스
class Repository(Generic[T]):
    """범용 저장소"""

    def __init__(self):
        self._items: dict[int, T] = {}
        self._next_id = 1

    def add(self, item: T) -> int:
        item_id = self._next_id
        self._items[item_id] = item
        self._next_id += 1
        return item_id

    def get(self, item_id: int) -> T | None:
        return self._items.get(item_id)

    def all(self) -> list[T]:
        return list(self._items.values())

# 타입 안전한 사용
from dataclasses import dataclass

@dataclass
class Student:
    name: str
    email: str

@dataclass
class Course:
    title: str
    price: int

student_repo: Repository[Student] = Repository()
course_repo: Repository[Course] = Repository()

student_repo.add(Student("김철수", "kim@example.com"))
course_repo.add(Course("Python", 50000))

# IDE가 반환 타입을 정확히 추론
student = student_repo.get(1)  # Student | None
course = course_repo.get(1)    # Course | None

복사
Protocol (구조적 타이핑)
from typing import Protocol, runtime_checkable

# Protocol: 덕 타이핑을 타입 시스템으로
@runtime_checkable
class Sendable(Protocol):
    """send() 메서드를 가진 모든 객체"""
    def send(self, message: str) -> bool: ...

class EmailSender:
    def send(self, message: str) -> bool:
        print(f"이메일: {message}")
        return True

class SmsSender:
    def send(self, message: str) -> bool:
        print(f"SMS: {message}")
        return True

# Protocol을 만족하는 모든 객체를 받을 수 있음
def notify(sender: Sendable, message: str) -> bool:
    return sender.send(message)

notify(EmailSender(), "안녕하세요")   # ✅
notify(SmsSender(), "안녕하세요")     # ✅

# runtime_checkable이면 isinstance 사용 가능
isinstance(EmailSender(), Sendable)   # True

복사
함수 오버로드
from typing import overload

@overload
def parse_data(raw: str) -> dict: ...

@overload
def parse_data(raw: bytes) -> dict: ...

@overload
def parse_data(raw: list) -> list[dict]: ...

def parse_data(raw):
    """입력 타입에 따라 다른 처리"""
    if isinstance(raw, str):
        import json
        return json.loads(raw)
    elif isinstance(raw, bytes):
        import json
        return json.loads(raw.decode("utf-8"))
    elif isinstance(raw, list):
        return [{"item": item} for item in raw]

복사
4️⃣ 패턴 매칭 (match/case)
기본 패턴 매칭 (Python 3.10+)
# match/case: 강력한 조건 분기 (switch보다 훨씬 강력)

def handle_command(command):
    match command.split():
        case ["quit"]:
            print("프로그램 종료")
        case ["hello", name]:
            print(f"안녕하세요, {name}님!")
        case ["add", *items]:
            print(f"추가: {', '.join(items)}")
        case _:
            print(f"알 수 없는 명령: {command}")

handle_command("hello 김철수")    # 안녕하세요, 김철수님!
handle_command("add 사과 바나나")  # 추가: 사과, 바나나
handle_command("quit")            # 프로그램 종료

복사
구조적 패턴 매칭
# 딕셔너리 패턴
def process_event(event):
    match event:
        case {"type": "click", "x": x, "y": y}:
            print(f"클릭: ({x}, {y})")
        case {"type": "keypress", "key": key}:
            print(f"키 입력: {key}")
        case {"type": "scroll", "direction": "up" | "down" as direction}:
            print(f"스크롤: {direction}")
        case _:
            print(f"알 수 없는 이벤트: {event}")

process_event({"type": "click", "x": 100, "y": 200})
# 클릭: (100, 200)
process_event({"type": "keypress", "key": "Enter"})
# 키 입력: Enter

# 클래스 패턴
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

@dataclass
class Circle:
    center: Point
    radius: float

@dataclass
class Rectangle:
    origin: Point
    width: float
    height: float

def describe_shape(shape):
    match shape:
        case Circle(center=Point(x, y), radius=r) if r > 0:
            print(f"원: 중심({x}, {y}), 반지름={r}")
        case Rectangle(origin=Point(x, y), width=w, height=h):
            print(f"사각형: ({x}, {y})에서 {w}x{h}")
        case _:
            print("알 수 없는 도형")

describe_shape(Circle(Point(0, 0), 5))
# 원: 중심(0, 0), 반지름=5

describe_shape(Rectangle(Point(10, 20), 100, 50))
# 사각형: (10, 20)에서 100x50

복사
API 응답 처리에 활용
def handle_api_response(response: dict):
    match response:
        case {"status": 200, "data": data}:
            return {"success": True, "data": data}
        case {"status": 401}:
            return {"success": False, "error": "인증이 필요합니다"}
        case {"status": 403}:
            return {"success": False, "error": "접근 권한이 없습니다"}
        case {"status": 404}:
            return {"success": False, "error": "리소스를 찾을 수 없습니다"}
        case {"status": status} if 500 <= status < 600:
            return {"success": False, "error": f"서버 에러 ({status})"}
        case _:
            return {"success": False, "error": "알 수 없는 응답"}

복사
5️⃣ 디자인 패턴
싱글톤 패턴
# 방법 1: 클래스 변수
class Database:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, connection_string="default"):
        if not hasattr(self, "_initialized"):
            self.connection_string = connection_string
            self._initialized = True

db1 = Database("mysql://localhost/mydb")
db2 = Database("다른 설정")
print(db1 is db2)                    # True (같은 인스턴스)
print(db2.connection_string)          # mysql://localhost/mydb (처음 설정 유지)

# 방법 2: 모듈 싱글톤 (더 파이썬스러움)
# config.py
# settings = {"debug": True, "db_url": "..."}
# → import config 하면 항상 같은 객체

복사
팩토리 패턴
from dataclasses import dataclass
from abc import ABC, abstractmethod

@dataclass
class Notification(ABC):
    recipient: str
    message: str

    @abstractmethod
    def send(self) -> bool:
        pass

class SmsNotification(Notification):
    def send(self) -> bool:
        print(f"SMS → {self.recipient}: {self.message}")
        return True

class KakaoNotification(Notification):
    def send(self) -> bool:
        print(f"카카오톡 → {self.recipient}: {self.message}")
        return True

class EmailNotification(Notification):
    def send(self) -> bool:
        print(f"이메일 → {self.recipient}: {self.message}")
        return True

# 팩토리 함수
def create_notification(
    channel: str, recipient: str, message: str
) -> Notification:
    factories = {
        "sms": SmsNotification,
        "kakao": KakaoNotification,
        "email": EmailNotification,
    }
    factory = factories.get(channel)
    if not factory:
        raise ValueError(f"지원하지 않는 채널: {channel}")
    return factory(recipient=recipient, message=message)

# 사용
notification = create_notification("kakao", "010-1234-5678", "수강 확정!")
notification.send()
# 카카오톡 → 010-1234-5678: 수강 확정!

복사
옵저버 패턴
class EventEmitter:
    """이벤트 발행/구독 시스템"""

    def __init__(self):
        self._listeners: dict[str, list] = {}

    def on(self, event: str, callback):
        """이벤트 구독"""
        if event not in self._listeners:
            self._listeners[event] = []
        self._listeners[event].append(callback)
        return self

    def off(self, event: str, callback):
        """이벤트 구독 해제"""
        if event in self._listeners:
            self._listeners[event].remove(callback)

    def emit(self, event: str, *args, **kwargs):
        """이벤트 발행"""
        for callback in self._listeners.get(event, []):
            callback(*args, **kwargs)

# 사용: 수강 신청 시스템
enrollment_events = EventEmitter()

# 리스너 등록
def send_welcome_sms(student, course):
    print(f"SMS: {student['name']}님, [{course['title']}] 수강을 환영합니다!")

def update_course_count(student, course):
    print(f"수강생 수 업데이트: {course['title']}")

def log_enrollment(student, course):
    print(f"[LOG] {student['name']} → {course['title']} 수강 등록")

enrollment_events.on("enrolled", send_welcome_sms)
enrollment_events.on("enrolled", update_course_count)
enrollment_events.on("enrolled", log_enrollment)

# 이벤트 발행
enrollment_events.emit(
    "enrolled",
    {"name": "김철수"},
    {"title": "Python 고급"},
)
# SMS: 김철수님, [Python 고급] 수강을 환영합니다!
# 수강생 수 업데이트: Python 고급
# [LOG] 김철수 → Python 고급 수강 등록

복사
전략 패턴
from typing import Protocol

class PricingStrategy(Protocol):
    def calculate(self, base_price: int) -> int: ...

class RegularPricing:
    def calculate(self, base_price: int) -> int:
        return base_price

class EarlyBirdPricing:
    """얼리버드 20% 할인"""
    def calculate(self, base_price: int) -> int:
        return int(base_price * 0.8)

class GroupPricing:
    """단체 할인 30%"""
    def calculate(self, base_price: int) -> int:
        return int(base_price * 0.7)

class VipPricing:
    """VIP 40% 할인"""
    def calculate(self, base_price: int) -> int:
        return int(base_price * 0.6)

class CourseOrder:
    def __init__(self, course_title: str, base_price: int):
        self.course_title = course_title
        self.base_price = base_price
        self._strategy: PricingStrategy = RegularPricing()

    def set_pricing(self, strategy: PricingStrategy):
        self._strategy = strategy
        return self

    def get_total(self) -> int:
        return self._strategy.calculate(self.base_price)

# 사용
order = CourseOrder("Python 고급", 100000)
print(f"정가: {order.get_total():,}원")            # 100,000원

order.set_pricing(EarlyBirdPricing())
print(f"얼리버드: {order.get_total():,}원")         # 80,000원

order.set_pricing(GroupPricing())
print(f"단체할인: {order.get_total():,}원")         # 70,000원

복사
6️⃣ 메타클래스와 디스크립터
메타클래스 기본
┌─────────────────────────────────────────────────┐
│              Python 객체 모델                     │
├─────────────────────────────────────────────────┤
│                                                  │
│  인스턴스 ──→ 클래스 ──→ 메타클래스               │
│  student      Student     type                   │
│                                                  │
│  "모든 것은 객체"                                 │
│  - student은 Student의 인스턴스                   │
│  - Student는 type의 인스턴스                      │
│  - type은 type의 인스턴스 (자기 자신!)            │
│                                                  │
└─────────────────────────────────────────────────┘

클릭하여 복사
복사
# 메타클래스: 클래스를 생성하는 클래스

class ModelMeta(type):
    """모델 클래스에 자동으로 테이블명 추가"""

    def __new__(mcs, name, bases, namespace):
        # 클래스 생성 시 자동 처리
        cls = super().__new__(mcs, name, bases, namespace)

        # 기본 클래스가 아닌 경우에만
        if bases:
            # 테이블명 자동 생성 (PascalCase → snake_case)
            if "table_name" not in namespace:
                import re
                cls.table_name = re.sub(
                    r"(?<!^)(?=[A-Z])", "_", name
                ).lower()

            # 필드 수집
            cls._fields = {
                key: value
                for key, value in namespace.items()
                if isinstance(value, Field)
            }

        return cls

class Field:
    def __init__(self, field_type, required=True):
        self.field_type = field_type
        self.required = required

class Model(metaclass=ModelMeta):
    pass

# 메타클래스가 자동으로 table_name과 _fields를 설정
class UserProfile(Model):
    name = Field(str)
    email = Field(str)
    age = Field(int, required=False)

print(UserProfile.table_name)  # "user_profile" (자동 생성)
print(UserProfile._fields)     # {"name": Field, "email": Field, "age": Field}

복사
디스크립터
# 디스크립터: 속성 접근을 커스터마이즈하는 프로토콜

class Validated:
    """타입 검증 디스크립터"""

    def __init__(self, expected_type, min_value=None, max_value=None):
        self.expected_type = expected_type
        self.min_value = min_value
        self.max_value = max_value

    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f"_{name}"

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name, None)

    def __set__(self, obj, value):
        if not isinstance(value, self.expected_type):
            raise TypeError(
                f"{self.name}은(는) {self.expected_type.__name__} 타입이어야 합니다"
            )
        if self.min_value is not None and value < self.min_value:
            raise ValueError(f"{self.name}은(는) {self.min_value} 이상이어야 합니다")
        if self.max_value is not None and value > self.max_value:
            raise ValueError(f"{self.name}은(는) {self.max_value} 이하여야 합니다")
        setattr(obj, self.private_name, value)

# 사용
class Course:
    title = Validated(str)
    price = Validated(int, min_value=0)
    max_students = Validated(int, min_value=1, max_value=100)

    def __init__(self, title, price, max_students):
        self.title = title
        self.price = price
        self.max_students = max_students

course = Course("Python", 50000, 30)   # ✅
# Course("Python", -1000, 30)          # ValueError: price은(는) 0 이상이어야 합니다
# Course("Python", "무료", 30)         # TypeError: price은(는) int 타입이어야 합니다

복사
__init_subclass__
클릭하여 복사
 (메타클래스의 간단한 대안)
# 메타클래스 없이 서브클래스 커스터마이즈
class Plugin:
    _registry = {}

    def __init_subclass__(cls, plugin_name=None, **kwargs):
        super().__init_subclass__(**kwargs)
        name = plugin_name or cls.__name__.lower()
        Plugin._registry[name] = cls
        cls.plugin_name = name

    @classmethod
    def get_plugin(cls, name):
        return cls._registry.get(name)

class ImageProcessor(Plugin, plugin_name="image"):
    def process(self, data):
        return f"이미지 처리: {data}"

class TextProcessor(Plugin, plugin_name="text"):
    def process(self, data):
        return f"텍스트 처리: {data}"

# 등록된 플러그인 확인
print(Plugin._registry)
# {"image": ImageProcessor, "text": TextProcessor}

processor = Plugin.get_plugin("image")()
print(processor.process("photo.jpg"))
# 이미지 처리: photo.jpg

복사
7️⃣ 성능 최적화
프로파일링
# 1. time으로 간단 측정
import time

start = time.perf_counter()
result = sum(range(10_000_000))
elapsed = time.perf_counter() - start
print(f"실행 시간: {elapsed:.4f}초")

# 2. cProfile (함수별 실행 시간)
import cProfile

def slow_function():
    total = 0
    for i in range(1_000_000):
        total += i ** 2
    return total

cProfile.run("slow_function()")
# 출력:
#   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
#   1       0.231    0.231    0.231    0.231   <string>:1(slow_function)

# 3. timeit (정확한 벤치마크)
import timeit

# 리스트 컴프리헨션 vs for 루프
t1 = timeit.timeit("[x**2 for x in range(1000)]", number=10000)
t2 = timeit.timeit("""
result = []
for x in range(1000):
    result.append(x**2)
""", number=10000)

print(f"컴프리헨션: {t1:.3f}초")  # 더 빠름
print(f"for 루프:   {t2:.3f}초")

# 4. memory_profiler (메모리 사용량)
# pip install memory-profiler
# @profile
# def memory_heavy():
#     big_list = [i for i in range(10_000_000)]
#     return sum(big_list)

복사
최적화 기법
# 1. 리스트 컴프리헨션 > for 루프
# ✅ 빠름
squares = [x ** 2 for x in range(10000)]

# ❌ 느림
squares = []
for x in range(10000):
    squares.append(x ** 2)

# 2. 제너레이터로 메모리 절약
# ❌ 메모리 많이 사용
total = sum([x ** 2 for x in range(10_000_000)])

# ✅ 메모리 절약
total = sum(x ** 2 for x in range(10_000_000))

# 3. 로컬 변수가 전역보다 빠름
# ❌
import math
def slow():
    return [math.sqrt(i) for i in range(10000)]

# ✅ (로컬 변수에 할당)
def fast():
    sqrt = math.sqrt  # 로컬 변수로 캐시
    return [sqrt(i) for i in range(10000)]

# 4. 문자열 결합: join > +
# ❌ 느림 (매번 새 문자열 생성)
result = ""
for word in words:
    result += word + " "

# ✅ 빠름
result = " ".join(words)

# 5. 딕셔너리/집합 lookup > 리스트 lookup
# ❌ O(n)
if item in big_list:
    pass

# ✅ O(1)
big_set = set(big_list)
if item in big_set:
    pass

# 6. __slots__으로 메모리 절약
class HeavyStudent:
    def __init__(self, name, age):
        self.name = name
        self.age = age

class LightStudent:
    __slots__ = ["name", "age"]  # __dict__ 대신 고정 슬롯 사용
    def __init__(self, name, age):
        self.name = name
        self.age = age

# LightStudent는 HeavyStudent보다 ~40% 메모리 절약

복사
functools 최적화 도구
from functools import lru_cache, cache, reduce

# 1. lru_cache (함수 결과 캐싱)
@lru_cache(maxsize=256)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

fibonacci(100)  # 즉시 반환 (재귀 없이 캐시에서)
fibonacci.cache_info()
# CacheInfo(hits=98, misses=101, maxsize=256, currsize=101)

# 2. cache (Python 3.9+, 무제한 캐시)
@cache
def expensive_computation(x):
    import time
    time.sleep(2)
    return x ** 2

expensive_computation(5)   # 2초 소요
expensive_computation(5)   # 즉시 반환 (캐시)

# 3. reduce (누적 연산)
numbers = [1, 2, 3, 4, 5]
product = reduce(lambda a, b: a * b, numbers)  # 120

복사
8️⃣ 패키지 만들기
프로젝트 구조
my-package/
├── pyproject.toml        # 패키지 설정 (표준)
├── README.md
├── LICENSE
├── src/
│   └── my_package/
│       ├── __init__.py
│       ├── core.py
│       └── utils.py
└── tests/
    ├── __init__.py
    ├── test_core.py
    └── test_utils.py

클릭하여 복사
복사
pyproject.toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "my-package"
version = "0.1.0"
description = "설명"
readme = "README.md"
requires-python = ">=3.10"
license = {text = "MIT"}
authors = [
    {name = "이름", email = "email@example.com"},
]
dependencies = [
    "requests>=2.28",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "mypy>=1.0",
]

[project.scripts]
my-cli = "my_package.cli:main"

복사
__init__.py
클릭하여 복사
# src/my_package/__init__.py
"""My Package - 패키지 설명"""

__version__ = "0.1.0"

from .core import MyClass, my_function
from .utils import helper

__all__ = ["MyClass", "my_function", "helper"]

복사
빌드와 배포
# 개발 모드 설치
pip install -e ".[dev]"

# 빌드
pip install build
python -m build
# → dist/my_package-0.1.0.tar.gz
# → dist/my_package-0.1.0-py3-none-any.whl

# PyPI에 업로드
pip install twine
twine upload dist/*

# 테스트 PyPI에 먼저 업로드 (테스트용)
twine upload --repository testpypi dist/*

복사
9️⃣ 보안과 베스트 프랙티스
보안 주의사항
# 1. 절대 eval/exec 사용 금지 (사용자 입력)
# ❌ 위험! 임의 코드 실행 가능
user_input = "os.system('rm -rf /')"
# eval(user_input)  # 절대 금지!

# ✅ 안전한 대안
import ast
result = ast.literal_eval("{'name': '김철수', 'age': 25}")

# 2. SQL 인젝션 방지
# ❌ 위험!
# query = f"SELECT * FROM users WHERE name = '{user_input}'"

# ✅ 파라미터 바인딩 사용
# cursor.execute("SELECT * FROM users WHERE name = %s", (user_input,))

# 3. 환경변수로 비밀 관리
import os
# ❌ 코드에 하드코딩
# API_KEY = "sk-1234567890"

# ✅ 환경변수
API_KEY = os.environ.get("API_KEY")
if not API_KEY:
    raise RuntimeError("API_KEY 환경변수가 설정되지 않았습니다")

# 4. 패스워드 해싱
import hashlib
import secrets

def hash_password(password: str) -> tuple[str, str]:
    salt = secrets.token_hex(32)
    hashed = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100000)
    return hashed.hex(), salt

def verify_password(password: str, hashed: str, salt: str) -> bool:
    new_hash = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100000)
    return new_hash.hex() == hashed

# 5. 안전한 임시 파일
import tempfile
with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=True) as f:
    f.write("임시 데이터")
    f.flush()
    # 사용 후 자동 삭제

복사
코드 품질 도구
# 타입 체크
pip install mypy
mypy src/

# 린터
pip install ruff
ruff check src/

# 포매터
pip install black
black src/

# 보안 검사
pip install bandit
bandit -r src/

# 의존성 취약점 검사
pip install pip-audit
pip-audit

복사
Python 베스트 프랙티스
# 1. EAFP 원칙 (Easier to Ask Forgiveness than Permission)
# ❌ LBYL (Look Before You Leap) - 비파이썬적
if key in dictionary:
    value = dictionary[key]
else:
    value = default

# ✅ EAFP - 파이썬스러움
try:
    value = dictionary[key]
except KeyError:
    value = default

# 더 간단하게
value = dictionary.get(key, default)

# 2. Walrus 연산자 (:=) Python 3.8+
# ❌ 반복 호출
data = fetch_data()
if data:
    process(data)

# ✅ 한 번만 호출
if data := fetch_data():
    process(data)

# 리스트 컴프리헨션에서
results = [
    processed
    for item in items
    if (processed := expensive_operation(item)) is not None
]

# 3. 구조적 언패킹
# 중첩 언패킹
data = ("김철수", (90, 85, 95))
name, (korean, english, math) = data

# * 언패킹
first, *middle, last = [1, 2, 3, 4, 5]
# first=1, middle=[2, 3, 4], last=5

# 딕셔너리 머지 (Python 3.9+)
merged = default_config | user_config | override_config

복사
🔟 실전 프로젝트 예제
예제 1: 비동기 API 서버 (FastAPI)
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from datetime import datetime

app = FastAPI(title="바이브클래스 API")

# Pydantic 모델 (자동 검증)
class StudentCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None

class StudentResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

class CourseCreate(BaseModel):
    title: str
    price: int
    max_students: int = 30

# 임시 저장소
students_db: dict[int, dict] = {}
next_id = 1

# API 엔드포인트
@app.post("/api/students", response_model=StudentResponse)
async def create_student(student: StudentCreate):
    global next_id
    student_data = {
        "id": next_id,
        **student.model_dump(),
        "created_at": datetime.now(),
    }
    students_db[next_id] = student_data
    next_id += 1
    return student_data

@app.get("/api/students")
async def list_students(skip: int = 0, limit: int = 20):
    all_students = list(students_db.values())
    return {
        "total": len(all_students),
        "students": all_students[skip : skip + limit],
    }

@app.get("/api/students/{student_id}", response_model=StudentResponse)
async def get_student(student_id: int):
    student = students_db.get(student_id)
    if not student:
        raise HTTPException(status_code=404, detail="수강생을 찾을 수 없습니다")
    return student

@app.delete("/api/students/{student_id}")
async def delete_student(student_id: int):
    if student_id not in students_db:
        raise HTTPException(status_code=404, detail="수강생을 찾을 수 없습니다")
    del students_db[student_id]
    return {"message": "삭제 완료"}

복사
# 실행
pip install fastapi uvicorn
uvicorn main:app --reload
# → http://localhost:8000/docs (자동 API 문서)

복사
예제 2: 비동기 웹 크롤러
import asyncio
import aiohttp
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class CrawlResult:
    url: str
    status: int
    title: str = ""
    content_length: int = 0
    elapsed: float = 0
    error: str = ""

class AsyncCrawler:
    def __init__(self, max_concurrent=5, timeout=10):
        self.semaphore = asyncio.Semaphore(max_concurrent)
        self.timeout = aiohttp.ClientTimeout(total=timeout)
        self.results: list[CrawlResult] = []

    async def fetch_one(self, session, url) -> CrawlResult:
        async with self.semaphore:
            start = asyncio.get_event_loop().time()
            try:
                async with session.get(url) as response:
                    text = await response.text()
                    elapsed = asyncio.get_event_loop().time() - start

                    # 간단한 제목 추출
                    title = ""
                    if "<title>" in text:
                        start_idx = text.index("<title>") + 7
                        end_idx = text.index("</title>")
                        title = text[start_idx:end_idx].strip()

                    return CrawlResult(
                        url=url,
                        status=response.status,
                        title=title,
                        content_length=len(text),
                        elapsed=elapsed,
                    )
            except Exception as e:
                return CrawlResult(
                    url=url, status=0, error=str(e),
                    elapsed=asyncio.get_event_loop().time() - start,
                )

    async def crawl(self, urls: list[str]) -> list[CrawlResult]:
        async with aiohttp.ClientSession(timeout=self.timeout) as session:
            tasks = [self.fetch_one(session, url) for url in urls]
            self.results = await asyncio.gather(*tasks)
            return self.results

    def print_report(self):
        print(f"\n{'='*60}")
        print(f"크롤링 결과 ({len(self.results)}개 URL)")
        print(f"{'='*60}")

        for r in sorted(self.results, key=lambda x: x.elapsed):
            status = f"✅ {r.status}" if r.status == 200 else f"❌ {r.status or r.error}"
            print(f"  {status} | {r.elapsed:.2f}초 | {r.title[:30] or r.url}")

        successful = [r for r in self.results if r.status == 200]
        total_time = sum(r.elapsed for r in self.results)
        print(f"\n성공: {len(successful)}/{len(self.results)}")
        print(f"총 소요: {total_time:.2f}초")

# 사용
async def main():
    crawler = AsyncCrawler(max_concurrent=5)
    urls = [
        "https://httpbin.org/delay/1",
        "https://httpbin.org/delay/2",
        "https://httpbin.org/status/404",
        "https://httpbin.org/get",
    ]
    await crawler.crawl(urls)
    crawler.print_report()

# asyncio.run(main())

복사
예제 3: 이벤트 기반 작업 스케줄러
import asyncio
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Callable, Awaitable
import heapq

@dataclass(order=True)
class ScheduledTask:
    run_at: datetime
    name: str = field(compare=False)
    callback: Callable[[], Awaitable] = field(compare=False)
    interval: timedelta | None = field(default=None, compare=False)

class TaskScheduler:
    def __init__(self):
        self._tasks: list[ScheduledTask] = []
        self._running = False

    def schedule(
        self, name: str, callback, delay: timedelta, repeat: bool = False
    ):
        task = ScheduledTask(
            run_at=datetime.now() + delay,
            name=name,
            callback=callback,
            interval=delay if repeat else None,
        )
        heapq.heappush(self._tasks, task)
        print(f"[스케줄] {name} → {task.run_at:%H:%M:%S}")

    async def run(self):
        self._running = True
        print("[스케줄러] 시작")

        while self._running and self._tasks:
            task = self._tasks[0]
            now = datetime.now()

            if now >= task.run_at:
                heapq.heappop(self._tasks)
                print(f"\n[실행] {task.name} ({now:%H:%M:%S})")

                try:
                    await task.callback()
                except Exception as e:
                    print(f"[에러] {task.name}: {e}")

                # 반복 작업이면 다시 스케줄
                if task.interval:
                    task.run_at = now + task.interval
                    heapq.heappush(self._tasks, task)
            else:
                wait = (task.run_at - now).total_seconds()
                await asyncio.sleep(min(wait, 1))

    def stop(self):
        self._running = False
        print("[스케줄러] 중지")

# 사용
async def check_health():
    print("  헬스체크 완료 ✅")

async def clean_cache():
    print("  캐시 정리 완료 🧹")

async def main():
    scheduler = TaskScheduler()

    scheduler.schedule("헬스체크", check_health, timedelta(seconds=5), repeat=True)
    scheduler.schedule("캐시정리", clean_cache, timedelta(seconds=10), repeat=True)

    # 30초 후 종료
    async def stop_scheduler():
        await asyncio.sleep(30)
        scheduler.stop()

    await asyncio.gather(
        scheduler.run(),
        stop_scheduler(),
    )

# asyncio.run(main())

복사
📚 핵심 정리
Python 고급 체크리스트
1단계: 비동기 프로그래밍
├── async/await, asyncio.gather
├── aiohttp (비동기 HTTP)
├── 세마포어, 큐
└── 비동기 이터레이터/컨텍스트 매니저

2단계: 동시성
├── ThreadPoolExecutor (I/O 바운드)
├── ProcessPoolExecutor (CPU 바운드)
├── GIL 이해
└── 스레드 안전성 (Lock)

3단계: 타입 시스템
├── Generic, Protocol
├── TypedDict, Literal
├── overload
└── mypy 활용

4단계: 디자인 패턴
├── 싱글톤, 팩토리
├── 옵저버, 전략
├── 메타클래스
└── 디스크립터

5단계: 성능/품질
├── 프로파일링 (cProfile, timeit)
├── 최적화 기법 (캐시, __slots__)
├── 패키지 배포 (pyproject.toml)
└── 보안 베스트 프랙티스

클릭하여 복사
복사
동시성 전략 빠른 참조
상황	추천 방법	이유
API 여러 개 호출	asyncio
클릭하여 복사
 + aiohttp
클릭하여 복사
	I/O 대기를 효율적으로
파일 여러 개 읽기	ThreadPoolExecutor
클릭하여 복사
	파일 I/O는 스레드 적합
이미지 처리 100장	ProcessPoolExecutor
클릭하여 복사
	CPU 바운드 → 멀티프로세스
웹 서버	FastAPI
클릭하여 복사
 (uvicorn)	비동기 내장
간단한 병렬 작업	asyncio.gather
클릭하여 복사
	가장 간결
대량 데이터 처리	multiprocessing.Pool
클릭하여 복사
	GIL 우회
Python 3.10+ 주요 기능 요약
버전	기능	예시
3.8	Walrus 연산자	if (n := len(a)) > 10:
클릭하여 복사

3.9	딕셔너리 머지	d1 | d2
클릭하여 복사

3.9	내장 타입 제네릭	list[int]
클릭하여 복사
 (typing 불필요)
3.10	패턴 매칭	match/case
클릭하여 복사

3.10	Union 축약	int | str
클릭하여 복사

3.11	예외 그룹	ExceptionGroup
클릭하여 복사

3.11	tomllib
클릭하여 복사
 내장	TOML 파싱
3.12	타입 매개변수	class Box[T]:
클릭하여 복사

3.12	f-string 중첩	f"{f'{x}'}"
클릭하여 복사

축하합니다! Python 기초 → 중급 → 고급 3부작을 모두 완료했습니다. 이제 FastAPI로 웹 서버를 만들거나, 데이터 분석, AI 프로젝트에 도전해보세요!