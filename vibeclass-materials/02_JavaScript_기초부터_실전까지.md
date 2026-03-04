JavaScript 기초부터 실전까지
학습 목표
JavaScript 기본 문법과 자료형 이해
함수, 객체, 클래스 활용법 습득
비동기 프로그래밍 (Promise, async/await) 학습
모던 JavaScript (ES6+) 문법 익히기
1. JavaScript 소개
1.1 JavaScript란?
┌─────────────────────────────────────────────────────────┐
│                     JavaScript                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   "웹의 프로그래밍 언어"                                 │
│                                                         │
│   특징:                                                 │
│   • 브라우저에서 실행되는 유일한 프로그래밍 언어          │
│   • 인터프리터 언어 (JIT 컴파일)                         │
│   • 동적 타이핑                                         │
│   • 프로토타입 기반 객체지향                             │
│   • 이벤트 기반, 비동기 프로그래밍                       │
│                                                         │
│   활용 분야:                                            │
│   • 프론트엔드 (React, Vue, Angular)                   │
│   • 백엔드 (Node.js, Express, NestJS)                  │
│   • 모바일 앱 (React Native, Ionic)                    │
│   • 데스크톱 앱 (Electron)                              │
│   • 서버리스 (AWS Lambda, Vercel)                      │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
1.2 실행 환경
// 브라우저 개발자 도구 콘솔에서 실행
console.log("Hello, JavaScript!");

// Node.js에서 실행
// node hello.js

// HTML에 포함
// <script src="script.js"></script>

복사
2. 기본 문법
2.1 변수 선언
// var (구식, 사용 비권장)
var name = "홍길동";

// let (재할당 가능)
let age = 25;
age = 26;  // OK

// const (재할당 불가, 권장)
const PI = 3.14159;
// PI = 3.14;  // Error!

// const로 선언한 객체/배열의 내용은 수정 가능
const user = { name: "홍길동" };
user.name = "김철수";  // OK
user.age = 25;         // OK
// user = {};           // Error!

const numbers = [1, 2, 3];
numbers.push(4);       // OK
// numbers = [];        // Error!

복사
2.2 자료형
// 원시 타입 (Primitive Types)
const str = "문자열";           // String
const num = 42;                 // Number
const float = 3.14;             // Number (정수와 실수 구분 없음)
const bool = true;              // Boolean
const empty = null;             // Null
const notDefined = undefined;   // Undefined
const bigNum = 9007199254740991n;  // BigInt
const sym = Symbol("id");       // Symbol

// 타입 확인
console.log(typeof str);        // "string"
console.log(typeof num);        // "number"
console.log(typeof bool);       // "boolean"
console.log(typeof null);       // "object" (역사적 버그)
console.log(typeof undefined);  // "undefined"
console.log(typeof {});         // "object"
console.log(typeof []);         // "object"
console.log(Array.isArray([])); // true

// 타입 변환
const strNum = "123";
console.log(Number(strNum));    // 123
console.log(parseInt("123.45")); // 123
console.log(parseFloat("123.45")); // 123.45
console.log(String(123));       // "123"
console.log(Boolean(1));        // true
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean("hello"));  // true

복사
2.3 문자열
// 문자열 생성
const single = '작은 따옴표';
const double = "큰 따옴표";
const backtick = `백틱 (템플릿 리터럴)`;

// 템플릿 리터럴 (권장)
const name = "홍길동";
const age = 25;
console.log(`이름: ${name}, 나이: ${age}`);

// 여러 줄 문자열
const multiLine = `
  첫 번째 줄
  두 번째 줄
  세 번째 줄
`;

// 문자열 메서드
const text = "Hello, JavaScript!";
console.log(text.length);          // 18
console.log(text.toUpperCase());   // "HELLO, JAVASCRIPT!"
console.log(text.toLowerCase());   // "hello, javascript!"
console.log(text.indexOf("Java")); // 7
console.log(text.includes("Java")); // true
console.log(text.startsWith("Hello")); // true
console.log(text.endsWith("!"));   // true
console.log(text.slice(0, 5));     // "Hello"
console.log(text.slice(7));        // "JavaScript!"
console.log(text.split(", "));     // ["Hello", "JavaScript!"]
console.log(text.replace("JavaScript", "World")); // "Hello, World!"
console.log("  trim  ".trim());    // "trim"
console.log(text.charAt(0));       // "H"
console.log(text[0]);              // "H"

// 문자열은 불변 (immutable)
let str = "hello";
str[0] = "H";  // 동작 안 함
str = "Hello"; // 새 문자열 할당은 가능

복사
2.4 숫자 연산
// 기본 연산
const a = 10, b = 3;
console.log(a + b);   // 13
console.log(a - b);   // 7
console.log(a * b);   // 30
console.log(a / b);   // 3.333...
console.log(a % b);   // 1 (나머지)
console.log(a ** b);  // 1000 (거듭제곱)

// 증가/감소 연산자
let x = 5;
console.log(x++);  // 5 (후위: 먼저 반환, 후에 증가)
console.log(x);    // 6
console.log(++x);  // 7 (전위: 먼저 증가, 후에 반환)

// 복합 대입 연산자
let y = 10;
y += 5;   // y = y + 5
y -= 3;   // y = y - 3
y *= 2;   // y = y * 2
y /= 4;   // y = y / 4

// Math 객체
console.log(Math.PI);          // 3.141592...
console.log(Math.round(3.7));  // 4
console.log(Math.floor(3.7));  // 3 (내림)
console.log(Math.ceil(3.2));   // 4 (올림)
console.log(Math.abs(-5));     // 5
console.log(Math.sqrt(16));    // 4
console.log(Math.pow(2, 3));   // 8
console.log(Math.min(1, 2, 3)); // 1
console.log(Math.max(1, 2, 3)); // 3
console.log(Math.random());    // 0~1 사이 난수

// 특수 숫자 값
console.log(Infinity);         // 무한대
console.log(-Infinity);        // 음의 무한대
console.log(NaN);              // Not a Number
console.log(isNaN("hello" * 2)); // true
console.log(Number.isNaN(NaN)); // true
console.log(Number.isFinite(100)); // true

복사
2.5 비교와 논리 연산
// 비교 연산자
console.log(5 == "5");   // true (값만 비교, 타입 변환)
console.log(5 === "5");  // false (값과 타입 모두 비교) ★권장
console.log(5 != "5");   // false
console.log(5 !== "5");  // true ★권장
console.log(5 > 3);      // true
console.log(5 >= 5);     // true

// 논리 연산자
console.log(true && false);  // false (AND)
console.log(true || false);  // true (OR)
console.log(!true);          // false (NOT)

// 단축 평가 (Short-circuit Evaluation)
const name = null;
console.log(name || "기본값");  // "기본값"
console.log(name && name.length);  // null (에러 방지)

// Nullish Coalescing (??)
const value = null;
console.log(value ?? "기본값");  // "기본값"
console.log(0 ?? "기본값");      // 0 (0은 null/undefined가 아님)
console.log(0 || "기본값");      // "기본값" (||는 0을 falsy로 처리)

// Optional Chaining (?.)
const user = { name: "홍길동" };
console.log(user?.address?.city);  // undefined (에러 없음)
console.log(user.address?.city);   // undefined
// console.log(user.address.city); // Error!

// Falsy 값
// false, 0, -0, 0n, "", null, undefined, NaN

// Truthy 값
// 위의 falsy가 아닌 모든 값
// 주의: "0", "false", [], {} 는 truthy

복사
3. 자료구조
3.1 배열 (Array)
// 배열 생성
const fruits = ["사과", "바나나", "오렌지"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null];
const empty = [];

// 인덱싱
console.log(fruits[0]);     // "사과"
console.log(fruits.at(-1)); // "오렌지" (마지막 요소)

// 배열 수정
fruits[0] = "딸기";
fruits.push("포도");        // 끝에 추가
fruits.unshift("키위");     // 앞에 추가
fruits.pop();               // 마지막 제거
fruits.shift();             // 첫 번째 제거
fruits.splice(1, 1);        // 인덱스 1에서 1개 제거
fruits.splice(1, 0, "망고"); // 인덱스 1에 삽입

// 배열 메서드 (원본 유지)
const nums = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(nums.slice(1, 4));    // [1, 4, 1]
console.log(nums.concat([7, 8])); // [3, 1, 4, 1, 5, 9, 2, 6, 7, 8]
console.log(nums.join("-"));      // "3-1-4-1-5-9-2-6"
console.log(nums.includes(4));    // true
console.log(nums.indexOf(1));     // 1
console.log(nums.lastIndexOf(1)); // 3

// 배열 메서드 (원본 변경)
const arr = [3, 1, 4];
arr.sort();                  // [1, 3, 4]
arr.reverse();               // [4, 3, 1]
arr.fill(0);                 // [0, 0, 0]

// 숫자 정렬 (주의!)
const nums2 = [10, 2, 30, 4];
nums2.sort((a, b) => a - b);  // 오름차순: [2, 4, 10, 30]
nums2.sort((a, b) => b - a);  // 내림차순: [30, 10, 4, 2]

// 스프레드 연산자
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
const copy = [...arr1];              // 복사

// 구조 분해 할당
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

const [a, , c] = [1, 2, 3];  // a = 1, c = 3 (2 건너뜀)

복사
3.2 배열 고차 함수
const numbers = [1, 2, 3, 4, 5];

// map - 변환
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

const users = [
  { name: "홍길동", age: 25 },
  { name: "김철수", age: 30 }
];
const names = users.map(user => user.name);
// ["홍길동", "김철수"]

// filter - 필터링
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

const adults = users.filter(user => user.age >= 20);

// find - 찾기 (첫 번째 일치)
const found = numbers.find(n => n > 3);  // 4

// findIndex - 인덱스 찾기
const index = numbers.findIndex(n => n > 3);  // 3

// reduce - 누적
const sum = numbers.reduce((acc, cur) => acc + cur, 0);
// 15

const max = numbers.reduce((acc, cur) => Math.max(acc, cur), -Infinity);
// 5

// 객체로 변환
const counts = ["a", "b", "a", "c", "a", "b"].reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});
// { a: 3, b: 2, c: 1 }

// every - 모든 요소가 조건 만족?
const allPositive = numbers.every(n => n > 0);  // true

// some - 하나라도 조건 만족?
const hasEven = numbers.some(n => n % 2 === 0);  // true

// forEach - 반복 (반환값 없음)
numbers.forEach((n, index) => {
  console.log(`${index}: ${n}`);
});

// 메서드 체이닝
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .reduce((acc, cur) => acc + cur, 0);
// (2 + 4) * 2 = 12... 아니, filter 후 [2,4], map 후 [4,8], reduce = 12

복사
3.3 객체 (Object)
// 객체 생성
const person = {
  name: "홍길동",
  age: 25,
  city: "서울",
  greet() {
    console.log(`안녕하세요, ${this.name}입니다.`);
  }
};

// 속성 접근
console.log(person.name);      // "홍길동"
console.log(person["name"]);   // "홍길동"
const key = "age";
console.log(person[key]);      // 25

// 속성 추가/수정/삭제
person.email = "hong@example.com";
person.age = 26;
delete person.city;

// 메서드 호출
person.greet();

// 객체 순회
for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}

Object.keys(person).forEach(key => {
  console.log(`${key}: ${person[key]}`);
});

Object.entries(person).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// 객체 메서드
console.log(Object.keys(person));    // ["name", "age", "email", "greet"]
console.log(Object.values(person));  // ["홍길동", 26, "hong@...", function]
console.log(Object.entries(person)); // [["name", "홍길동"], ...]
console.log("name" in person);       // true
console.log(person.hasOwnProperty("name")); // true

// 객체 병합
const defaults = { theme: "light", lang: "ko" };
const userSettings = { theme: "dark" };
const settings = { ...defaults, ...userSettings };
// { theme: "dark", lang: "ko" }

const merged = Object.assign({}, defaults, userSettings);

// 구조 분해 할당
const { name, age, city = "미지정" } = person;
// name = "홍길동", age = 26, city = "미지정" (기본값)

const { name: userName, age: userAge } = person;
// 다른 변수명으로 할당

// 중첩 구조 분해
const user = {
  name: "홍길동",
  address: {
    city: "서울",
    zip: "12345"
  }
};
const { address: { city: userCity } } = user;
// userCity = "서울"

// 단축 속성명
const x = 10, y = 20;
const point = { x, y };  // { x: 10, y: 20 }

// 계산된 속성명
const propName = "score";
const obj = {
  [propName]: 100,
  [`${propName}Double`]: 200
};
// { score: 100, scoreDouble: 200 }

복사
3.4 Map과 Set
// Map - 키-값 쌍 (어떤 타입이든 키로 사용 가능)
const map = new Map();
map.set("name", "홍길동");
map.set(1, "one");
map.set({ id: 1 }, "object key");

console.log(map.get("name"));  // "홍길동"
console.log(map.has("name"));  // true
console.log(map.size);         // 3
map.delete("name");
map.clear();  // 모든 요소 제거

// Map 초기화
const map2 = new Map([
  ["name", "홍길동"],
  ["age", 25]
]);

// Map 순회
map2.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

for (const [key, value] of map2) {
  console.log(`${key}: ${value}`);
}

// Set - 중복 없는 값의 집합
const set = new Set();
set.add(1);
set.add(2);
set.add(2);  // 중복 무시
set.add(3);

console.log(set.has(2));  // true
console.log(set.size);    // 3
set.delete(2);
set.clear();

// Set 초기화
const set2 = new Set([1, 2, 2, 3, 3, 3]);
console.log([...set2]);  // [1, 2, 3]

// 배열 중복 제거
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];  // [1, 2, 3]

// 집합 연산
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

// 합집합
const union = new Set([...a, ...b]);  // {1, 2, 3, 4}

// 교집합
const intersection = new Set([...a].filter(x => b.has(x)));  // {2, 3}

// 차집합
const difference = new Set([...a].filter(x => !b.has(x)));  // {1}

복사
4. 제어문
4.1 조건문
// if-else
const age = 20;
if (age >= 18) {
  console.log("성인");
} else {
  console.log("미성년자");
}

// if-else if-else
const score = 85;
let grade;
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}

// 삼항 연산자
const status = age >= 18 ? "성인" : "미성년자";

// 중첩 삼항 (복잡하면 if 사용 권장)
const result = score >= 90 ? "A" : score >= 80 ? "B" : "C";

// switch
const day = new Date().getDay();
switch (day) {
  case 0:
    console.log("일요일");
    break;
  case 6:
    console.log("토요일");
    break;
  default:
    console.log("평일");
}

// switch fall-through
switch (day) {
  case 0:
  case 6:
    console.log("주말");
    break;
  default:
    console.log("평일");
}

복사
4.2 반복문
// for
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// for...of (배열, 문자열 등 이터러블)
const fruits = ["사과", "바나나", "오렌지"];
for (const fruit of fruits) {
  console.log(fruit);
}

for (const char of "Hello") {
  console.log(char);
}

// for...in (객체의 키)
const person = { name: "홍길동", age: 25 };
for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}

// while
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}

// do...while
let num = 0;
do {
  console.log(num);
  num++;
} while (num < 5);

// break와 continue
for (let i = 0; i < 10; i++) {
  if (i === 3) continue;  // 3 건너뛰기
  if (i === 7) break;     // 7에서 종료
  console.log(i);
}

// 레이블 (중첩 반복문 탈출)
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer;
    console.log(i, j);
  }
}

복사
5. 함수
5.1 함수 선언 방식
// 함수 선언문 (호이스팅 됨)
function greet(name) {
  return `안녕하세요, ${name}님!`;
}

// 함수 표현식
const greet2 = function(name) {
  return `안녕하세요, ${name}님!`;
};

// 화살표 함수 (ES6+)
const greet3 = (name) => {
  return `안녕하세요, ${name}님!`;
};

// 화살표 함수 간소화
const greet4 = name => `안녕하세요, ${name}님!`;
const add = (a, b) => a + b;
const getObject = () => ({ key: "value" });  // 객체 반환 시 괄호

// 즉시 실행 함수 (IIFE)
(function() {
  console.log("즉시 실행!");
})();

(() => {
  console.log("화살표 함수 IIFE");
})();

복사
5.2 매개변수
// 기본 매개변수
function greet(name = "손님") {
  console.log(`안녕하세요, ${name}님!`);
}
greet();        // "안녕하세요, 손님님!"
greet("홍길동"); // "안녕하세요, 홍길동님!"

// 나머지 매개변수
function sum(...numbers) {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}
console.log(sum(1, 2, 3, 4, 5));  // 15

function printInfo(first, second, ...rest) {
  console.log(first, second, rest);
}
printInfo(1, 2, 3, 4, 5);  // 1, 2, [3, 4, 5]

// 스프레드로 인자 전달
const nums = [1, 2, 3];
console.log(Math.max(...nums));  // 3

// 구조 분해 매개변수
function printUser({ name, age, city = "미지정" }) {
  console.log(`${name}, ${age}세, ${city}`);
}
printUser({ name: "홍길동", age: 25 });

function printCoord([x, y]) {
  console.log(`x: ${x}, y: ${y}`);
}
printCoord([10, 20]);

복사
5.3 화살표 함수와 this
// 일반 함수의 this
const obj1 = {
  name: "객체",
  regularFunc: function() {
    console.log(this.name);  // "객체"
  },
  arrowFunc: () => {
    console.log(this.name);  // undefined (상위 스코프의 this)
  }
};

// 콜백에서의 this 문제
const obj2 = {
  name: "홍길동",
  friends: ["김철수", "이영희"],

  // 문제: 일반 함수는 this가 바뀜
  printFriends1: function() {
    this.friends.forEach(function(friend) {
      console.log(this.name + "의 친구: " + friend);
      // this가 undefined (strict mode) 또는 전역 객체
    });
  },

  // 해결 1: 화살표 함수 사용
  printFriends2: function() {
    this.friends.forEach(friend => {
      console.log(this.name + "의 친구: " + friend);
      // 화살표 함수는 상위 this 유지
    });
  },

  // 해결 2: bind 사용
  printFriends3: function() {
    this.friends.forEach(function(friend) {
      console.log(this.name + "의 친구: " + friend);
    }.bind(this));
  }
};

복사
5.4 클로저
// 클로저: 함수가 선언된 환경의 변수를 기억
function createCounter() {
  let count = 0;  // 외부에서 직접 접근 불가

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.decrement());  // 1
console.log(counter.getCount());   // 1

// 클로저 활용: 팩토리 함수
function createMultiplier(n) {
  return function(x) {
    return x * n;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// 주의: 반복문과 클로저
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 3, 3, 3 출력 (var는 함수 스코프)

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 0, 1, 2 출력 (let은 블록 스코프)

복사
6. 클래스
6.1 클래스 기초
// 클래스 선언
class Person {
  // 생성자
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 인스턴스 메서드
  greet() {
    console.log(`안녕하세요, ${this.name}입니다.`);
  }

  // getter
  get info() {
    return `${this.name}, ${this.age}세`;
  }

  // setter
  set info(value) {
    [this.name, this.age] = value.split(", ");
    this.age = parseInt(this.age);
  }

  // 정적 메서드
  static createAnonymous() {
    return new Person("익명", 0);
  }

  // 정적 속성
  static species = "Homo sapiens";
}

// 인스턴스 생성
const person = new Person("홍길동", 25);
person.greet();
console.log(person.info);  // getter
person.info = "김철수, 30";  // setter

// 정적 메서드/속성
const anonymous = Person.createAnonymous();
console.log(Person.species);

복사
6.2 상속
// 부모 클래스
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name}이(가) 소리를 냅니다.`);
  }
}

// 자식 클래스
class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // 부모 생성자 호출
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name}이(가) 멍멍!`);
  }

  fetch() {
    console.log(`${this.name}이(가) 공을 가져옵니다.`);
  }
}

class Cat extends Animal {
  speak() {
    super.speak();  // 부모 메서드 호출
    console.log("(야옹)");
  }
}

const dog = new Dog("바둑이", "진돗개");
dog.speak();  // "바둑이이(가) 멍멍!"
dog.fetch();

const cat = new Cat("나비");
cat.speak();  // "나비이(가) 소리를 냅니다." + "(야옹)"

// instanceof
console.log(dog instanceof Dog);     // true
console.log(dog instanceof Animal);  // true
console.log(dog instanceof Cat);     // false

복사
6.3 Private 필드 (ES2022+)
class BankAccount {
  // Private 필드 (#으로 시작)
  #balance = 0;
  #pin;

  constructor(initialBalance, pin) {
    this.#balance = initialBalance;
    this.#pin = pin;
  }

  // Private 메서드
  #validatePin(pin) {
    return this.#pin === pin;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }

  withdraw(amount, pin) {
    if (!this.#validatePin(pin)) {
      throw new Error("잘못된 PIN");
    }
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return amount;
    }
    return 0;
  }

  getBalance(pin) {
    if (this.#validatePin(pin)) {
      return this.#balance;
    }
    throw new Error("잘못된 PIN");
  }
}

const account = new BankAccount(10000, "1234");
account.deposit(5000);
console.log(account.getBalance("1234"));  // 15000
// console.log(account.#balance);  // SyntaxError

복사
7. 비동기 프로그래밍
7.1 콜백
// 콜백 기본
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "홍길동" };
    callback(data);
  }, 1000);
}

fetchData(data => {
  console.log("데이터:", data);
});

// 콜백 지옥
getUser(userId, user => {
  getPosts(user.id, posts => {
    getComments(posts[0].id, comments => {
      // 계속 중첩...
    });
  });
});

복사
7.2 Promise
// Promise 생성
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve({ id: 1, name: "홍길동" });
    } else {
      reject(new Error("데이터 로드 실패"));
    }
  }, 1000);
});

// Promise 사용
promise
  .then(data => {
    console.log("성공:", data);
    return data.name;
  })
  .then(name => {
    console.log("이름:", name);
  })
  .catch(error => {
    console.error("에러:", error);
  })
  .finally(() => {
    console.log("완료");
  });

// Promise 체이닝
function getUser(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id: userId, name: "홍길동" }), 100);
  });
}

function getPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, title: "글1" }]), 100);
  });
}

getUser(1)
  .then(user => getPosts(user.id))
  .then(posts => console.log(posts))
  .catch(error => console.error(error));

// Promise 정적 메서드
Promise.all([
  fetch("/api/users"),
  fetch("/api/posts")
]).then(([usersRes, postsRes]) => {
  // 모든 Promise가 성공해야 실행
});

Promise.allSettled([
  fetch("/api/users"),
  fetch("/api/posts")
]).then(results => {
  // 성공/실패 상관없이 모든 결과 반환
  results.forEach(result => {
    if (result.status === "fulfilled") {
      console.log(result.value);
    } else {
      console.log(result.reason);
    }
  });
});

Promise.race([
  fetch("/api/fast"),
  fetch("/api/slow")
]).then(firstResult => {
  // 가장 먼저 완료된 Promise의 결과
});

Promise.any([
  fetch("/api/maybe-fail-1"),
  fetch("/api/maybe-fail-2")
]).then(firstSuccess => {
  // 가장 먼저 성공한 Promise의 결과
});

// 즉시 해결/거부
Promise.resolve(42).then(value => console.log(value));
Promise.reject(new Error("실패")).catch(err => console.log(err));

복사
7.3 async/await
// async 함수
async function fetchUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("에러:", error);
    throw error;
  }
}

// 사용
async function main() {
  try {
    const user = await fetchUser(1);
    console.log(user);
  } catch (error) {
    console.error("메인 에러:", error);
  }
}

main();

// 병렬 실행
async function fetchAll() {
  // 순차 실행 (느림)
  const user = await fetchUser(1);
  const posts = await fetchPosts(1);

  // 병렬 실행 (빠름)
  const [user2, posts2] = await Promise.all([
    fetchUser(1),
    fetchPosts(1)
  ]);
}

// 화살표 함수 + async
const fetchData = async () => {
  const response = await fetch("/api/data");
  return response.json();
};

// 반복문에서 async/await
async function processItems(items) {
  // 순차 처리
  for (const item of items) {
    await processItem(item);
  }

  // 병렬 처리
  await Promise.all(items.map(item => processItem(item)));
}

// 최상위 await (ES2022+, 모듈에서만)
// const data = await fetch("/api/data");

복사
7.4 Fetch API
// GET 요청
async function getUsers() {
  const response = await fetch("/api/users");
  const users = await response.json();
  return users;
}

// POST 요청
async function createUser(userData) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// PUT 요청
async function updateUser(id, userData) {
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  return response.json();
}

// DELETE 요청
async function deleteUser(id) {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  return response.ok;
}

// 에러 처리 래퍼
async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

복사
8. 모듈
8.1 ES 모듈
// math.js - 내보내기
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// 기본 내보내기 (파일당 하나)
export default function multiply(a, b) {
  return a * b;
}

// main.js - 가져오기
import multiply, { PI, add, subtract } from "./math.js";
// multiply: default export
// PI, add, subtract: named exports

console.log(PI);
console.log(add(1, 2));
console.log(multiply(3, 4));

// 별칭 사용
import { add as sum } from "./math.js";
console.log(sum(1, 2));

// 전체 가져오기
import * as math from "./math.js";
console.log(math.PI);
console.log(math.add(1, 2));

// 동적 import
async function loadModule() {
  const module = await import("./math.js");
  console.log(module.add(1, 2));
}

// 조건부 import
if (condition) {
  const module = await import("./feature.js");
}

복사
8.2 모듈 패턴
// 재내보내기 (index.js)
export { User } from "./user.js";
export { Post } from "./post.js";
export * from "./utils.js";

// 사용
import { User, Post, formatDate } from "./models/index.js";

// 배럴 파일
// components/index.js
export { Button } from "./Button";
export { Input } from "./Input";
export { Modal } from "./Modal";

// 사용
import { Button, Input, Modal } from "./components";

복사
9. 에러 처리
9.1 try-catch
// 기본 에러 처리
try {
  const data = JSON.parse(invalidJson);
} catch (error) {
  console.error("에러 발생:", error.message);
} finally {
  console.log("항상 실행");
}

// 에러 객체
try {
  throw new Error("커스텀 에러");
} catch (error) {
  console.log(error.name);     // "Error"
  console.log(error.message);  // "커스텀 에러"
  console.log(error.stack);    // 스택 트레이스
}

// 에러 타입
try {
  // ReferenceError: 정의되지 않은 변수
  console.log(undefinedVar);

  // TypeError: 타입 오류
  null.someMethod();

  // SyntaxError: 문법 오류 (런타임에 잡히지 않음)
  // eval("if (");

  // RangeError: 범위 오류
  new Array(-1);
} catch (error) {
  if (error instanceof ReferenceError) {
    console.log("참조 에러");
  } else if (error instanceof TypeError) {
    console.log("타입 에러");
  }
}

복사
9.2 커스텀 에러
// 커스텀 에러 클래스
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}

// 사용
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("이름은 필수입니다", "name");
  }
  if (!user.email) {
    throw new ValidationError("이메일은 필수입니다", "email");
  }
}

try {
  validateUser({ name: "" });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`${error.field}: ${error.message}`);
  }
}

// 비동기 에러 처리
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) {
      throw new HttpError("데이터 로드 실패", response.status);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      console.log(`HTTP ${error.statusCode}: ${error.message}`);
    } else {
      console.log("네트워크 에러:", error.message);
    }
    throw error;  // 상위로 전파
  }
}

복사
10. 유용한 패턴
10.1 디바운스와 스로틀
// 디바운스: 연속 호출 중 마지막만 실행
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 사용: 검색 입력
const handleSearch = debounce((query) => {
  console.log("검색:", query);
}, 300);

input.addEventListener("input", (e) => handleSearch(e.target.value));

// 스로틀: 일정 시간 간격으로 실행
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 사용: 스크롤 이벤트
const handleScroll = throttle(() => {
  console.log("스크롤 위치:", window.scrollY);
}, 100);

window.addEventListener("scroll", handleScroll);

복사
10.2 메모이제이션
// 메모이제이션: 결과 캐싱
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 사용
const expensiveOperation = memoize((n) => {
  console.log("계산 중...");
  return n * n;
});

console.log(expensiveOperation(5));  // "계산 중..." 출력, 25
console.log(expensiveOperation(5));  // 캐시에서 바로 25 반환

복사
정리
JavaScript 핵심 포인트

변수와 타입

let, const 사용 (var 지양)
=== 사용 (== 지양)
템플릿 리터럴

함수

화살표 함수
구조 분해 할당
스프레드/나머지 연산자

비동기

Promise
async/await
에러 처리

클래스

constructor, extends
private 필드 (#)

모듈

import/export
동적 import
다음 학습 추천
TypeScript
React, Vue, Angular
Node.js, Express
웹 API (DOM, BOM)