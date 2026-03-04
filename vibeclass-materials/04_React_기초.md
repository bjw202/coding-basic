4회차: React 기초 (상태/컴포넌트/이벤트)

목표: React의 핵심 개념을 이해하고 실제 UI 컴포넌트 만들기 실습: 대시보드 UI 1개 만들기 (목록/필터/상세)

📋 이번 시간 목차
React란?
컴포넌트 기초
Props 이해하기
State와 상태 관리
이벤트 처리
조건부 렌더링
리스트 렌더링
실습: 대시보드 UI
1️⃣ React란?
React 소개
Facebook(Meta)이 만든 UI 라이브러리
컴포넌트 기반 개발
Virtual DOM으로 효율적 렌더링
세계에서 가장 인기 있는 프론트엔드 라이브러리
React의 핵심 철학

선언적(Declarative)

"어떻게" 대신 "무엇을" 표현
UI 상태를 선언하면 React가 렌더링

컴포넌트 기반(Component-Based)

UI를 독립적인 조각으로 분리
재사용 가능

단방향 데이터 흐름(One-way Data Flow)

데이터는 위에서 아래로
예측 가능한 상태 관리
JSX란?
JavaScript XML
JavaScript 안에서 HTML처럼 작성
React의 핵심 문법
// JSX
const element = <h1>Hello, React!</h1>

// JavaScript로 변환됨
const element = React.createElement('h1', null, 'Hello, React!')

복사
JSX 규칙
// 1. 반드시 하나의 루트 요소
// ❌ 에러
return (
  <h1>제목</h1>
  <p>내용</p>
)

// ✅ 정상
return (
  <div>
    <h1>제목</h1>
    <p>내용</p>
  </div>
)

// ✅ Fragment 사용
return (
  <>
    <h1>제목</h1>
    <p>내용</p>
  </>
)

// 2. class → className
<div className="container">

// 3. 태그는 반드시 닫기
<img src="..." alt="..." />
<br />

// 4. JavaScript 표현식은 {}
const name = "홍길동"
<h1>안녕하세요, {name}님!</h1>
<p>1 + 2 = {1 + 2}</p>

복사
2️⃣ 컴포넌트 기초
컴포넌트란?
UI의 독립적인 조각
재사용 가능
자체 로직과 스타일 포함
함수 컴포넌트
// 기본 컴포넌트
function Welcome() {
  return <h1>안녕하세요!</h1>
}

// 화살표 함수
const Welcome = () => {
  return <h1>안녕하세요!</h1>
}

// 컴포넌트 사용
function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  )
}

복사
컴포넌트 네이밍 규칙
// ✅ PascalCase (대문자로 시작)
function UserCard() { }
function NavigationBar() { }

// ❌ 소문자로 시작하면 HTML 태그로 인식
function userCard() { }  // 에러!

복사
컴포넌트 분리 기준
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────────┐ │
│ │ Sidebar     │ │ Main            │ │
│ │             │ │ ┌─────────────┐ │ │
│ │ - MenuItem  │ │ │ Card        │ │ │
│ │ - MenuItem  │ │ └─────────────┘ │ │
│ │ - MenuItem  │ │ ┌─────────────┐ │ │
│ │             │ │ │ Card        │ │ │
│ └─────────────┘ │ └─────────────┘ │ │
│                 └─────────────────┘ │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘

클릭하여 복사
복사
3️⃣ Props 이해하기
Props란?
Properties의 약자
부모 → 자식 데이터 전달
읽기 전용 (수정 불가)
Props 사용법
// 부모 컴포넌트
function App() {
  return (
    <div>
      <UserCard name="홍길동" age={25} />
      <UserCard name="김철수" age={30} />
    </div>
  )
}

// 자식 컴포넌트
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>나이: {props.age}세</p>
    </div>
  )
}

// 구조 분해 할당 (권장)
function UserCard({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>나이: {age}세</p>
    </div>
  )
}

복사
TypeScript로 Props 정의
// Props 타입 정의
interface UserCardProps {
  name: string
  age: number
  email?: string  // 선택적
}

function UserCard({ name, age, email }: UserCardProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{name}</h2>
      <p>나이: {age}세</p>
      {email && <p>이메일: {email}</p>}
    </div>
  )
}

복사
기본값 설정
interface ButtonProps {
  text: string
  variant?: 'primary' | 'secondary'
}

function Button({ text, variant = 'primary' }: ButtonProps) {
  const className = variant === 'primary'
    ? 'bg-blue-500 text-white'
    : 'bg-gray-200 text-gray-800'

  return (
    <button className={`px-4 py-2 rounded ${className}`}>
      {text}
    </button>
  )
}

복사
children Props
interface CardProps {
  title: string
  children: React.ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  )
}

// 사용
function App() {
  return (
    <Card title="공지사항">
      <p>첫 번째 내용</p>
      <p>두 번째 내용</p>
    </Card>
  )
}

복사
4️⃣ State와 상태 관리
State란?
컴포넌트의 변경 가능한 데이터
변경되면 자동으로 리렌더링
useState
클릭하여 복사
 훅으로 관리
useState 기본 사용법
import { useState } from 'react'

function Counter() {
  // [현재값, 변경함수] = useState(초기값)
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  )
}

복사
다양한 State 예시
function StateExamples() {
  // 숫자
  const [count, setCount] = useState(0)

  // 문자열
  const [name, setName] = useState('')

  // 불리언
  const [isOpen, setIsOpen] = useState(false)

  // 배열
  const [items, setItems] = useState<string[]>([])

  // 객체
  const [user, setUser] = useState({
    name: '',
    email: ''
  })

  // 객체 업데이트 (스프레드 필수)
  const updateName = (newName: string) => {
    setUser({ ...user, name: newName })
  }

  // 배열에 추가
  const addItem = (item: string) => {
    setItems([...items, item])
  }

  // 배열에서 제거
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return <div>...</div>
}

복사
State 주의사항
// ❌ 직접 수정 금지
count = count + 1          // 리렌더링 안 됨!
user.name = "홍길동"       // 리렌더링 안 됨!

// ✅ setter 함수 사용
setCount(count + 1)
setUser({ ...user, name: "홍길동" })

// 이전 값 기반 업데이트 (안전한 방법)
setCount(prev => prev + 1)
setItems(prev => [...prev, newItem])

복사
5️⃣ 이벤트 처리
이벤트 핸들러 기본
function EventExamples() {
  // 클릭
  const handleClick = () => {
    console.log('클릭!')
  }

  // 인라인
  return (
    <button onClick={() => console.log('클릭!')}>
      버튼 1
    </button>

    // 함수 참조 (권장)
    <button onClick={handleClick}>
      버튼 2
    </button>
  )
}

복사
이벤트 객체
function FormExample() {
  const [value, setValue] = useState('')

  // 이벤트 객체 사용
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()  // 기본 동작 방지
    console.log('제출:', value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="입력하세요"
      />
      <button type="submit">제출</button>
    </form>
  )
}

복사
자주 쓰는 이벤트
이벤트	설명	사용 예시
onClick
클릭하여 복사
	클릭	버튼, 링크
onChange
클릭하여 복사
	값 변경	input, select
onSubmit
클릭하여 복사
	폼 제출	form
onFocus
클릭하여 복사
	포커스	input
onBlur
클릭하여 복사
	포커스 해제	input
onKeyDown
클릭하여 복사
	키 누름	input
onMouseEnter
클릭하여 복사
	마우스 진입	hover 효과
onMouseLeave
클릭하여 복사
	마우스 이탈	hover 효과
매개변수 전달
function ItemList() {
  const items = ['사과', '바나나', '오렌지']

  // 매개변수가 필요한 경우 화살표 함수
  const handleDelete = (index: number) => {
    console.log('삭제:', index)
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item}
          <button onClick={() => handleDelete(index)}>
            삭제
          </button>
        </li>
      ))}
    </ul>
  )
}

복사
6️⃣ 조건부 렌더링
&& 연산자
function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn && <p>환영합니다!</p>}
      {!isLoggedIn && <p>로그인해주세요.</p>}
    </div>
  )
}

복사
삼항 연산자
function StatusBadge({ status }: { status: 'active' | 'inactive' }) {
  return (
    <span className={status === 'active' ? 'text-green-500' : 'text-red-500'}>
      {status === 'active' ? '활성' : '비활성'}
    </span>
  )
}

복사
복잡한 조건
function UserStatus({ status }: { status: string }) {
  // 조건이 많으면 별도 변수/함수로 분리
  const renderStatus = () => {
    switch (status) {
      case 'active':
        return <span className="text-green-500">활성</span>
      case 'pending':
        return <span className="text-yellow-500">대기</span>
      case 'inactive':
        return <span className="text-red-500">비활성</span>
      default:
        return <span className="text-gray-500">알 수 없음</span>
    }
  }

  return <div>{renderStatus()}</div>
}

복사
null 반환 (렌더링 안 함)
function AdminPanel({ isAdmin }: { isAdmin: boolean }) {
  if (!isAdmin) {
    return null  // 아무것도 렌더링 안 함
  }

  return <div>관리자 패널</div>
}

복사
7️⃣ 리스트 렌더링
map으로 리스트 렌더링
interface User {
  id: number
  name: string
  email: string
}

function UserList() {
  const users: User[] = [
    { id: 1, name: '홍길동', email: 'hong@example.com' },
    { id: 2, name: '김철수', email: 'kim@example.com' },
    { id: 3, name: '이영희', email: 'lee@example.com' },
  ]

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  )
}

복사
key의 중요성
// ❌ index를 key로 사용 (비권장)
{items.map((item, index) => (
  <li key={index}>{item}</li>
))}

// ✅ 고유한 id 사용 (권장)
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}

복사
필터와 정렬
function FilteredList() {
  const [filter, setFilter] = useState('')
  const users = [
    { id: 1, name: '홍길동', role: 'admin' },
    { id: 2, name: '김철수', role: 'user' },
    { id: 3, name: '이영희', role: 'admin' },
  ]

  // 필터링
  const filteredUsers = users.filter(user =>
    user.name.includes(filter) ||
    user.role.includes(filter)
  )

  return (
    <div>
      <input
        placeholder="검색..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name} - {user.role}</li>
        ))}
      </ul>
    </div>
  )
}

복사
8️⃣ 실습: 대시보드 UI
완성 화면
┌──────────────────────────────────────────────────┐
│ 🎯 사용자 대시보드                      [검색...]  │
├──────────────────────────────────────────────────┤
│ [전체] [활성] [대기] [비활성]                     │
├──────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────┐ │
│ │ 👤 홍길동                         🟢 활성    │ │
│ │ hong@example.com                             │ │
│ │ [상세보기]                                   │ │
│ └──────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────┐ │
│ │ 👤 김철수                         🟡 대기    │ │
│ │ kim@example.com                              │ │
│ │ [상세보기]                                   │ │
│ └──────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘

클릭하여 복사
복사
전체 코드

app/dashboard/page.tsx
클릭하여 복사
:

'use client'

import { useState } from 'react'

// 타입 정의
interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'pending' | 'inactive'
  joinDate: string
}

// 샘플 데이터
const USERS: User[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com', status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: '김철수', email: 'kim@example.com', status: 'pending', joinDate: '2024-02-20' },
  { id: 3, name: '이영희', email: 'lee@example.com', status: 'active', joinDate: '2024-03-10' },
  { id: 4, name: '박지민', email: 'park@example.com', status: 'inactive', joinDate: '2024-01-05' },
  { id: 5, name: '최수현', email: 'choi@example.com', status: 'active', joinDate: '2024-04-01' },
]

// 상태 뱃지 컴포넌트
function StatusBadge({ status }: { status: User['status'] }) {
  const config = {
    active: { label: '활성', color: 'bg-green-100 text-green-800' },
    pending: { label: '대기', color: 'bg-yellow-100 text-yellow-800' },
    inactive: { label: '비활성', color: 'bg-red-100 text-red-800' },
  }

  const { label, color } = config[status]

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}

// 사용자 카드 컴포넌트
function UserCard({
  user,
  onSelect,
}: {
  user: User
  onSelect: (user: User) => void
}) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👤</span>
          <h3 className="font-bold text-lg">{user.name}</h3>
        </div>
        <StatusBadge status={user.status} />
      </div>
      <p className="text-gray-500 mb-3">{user.email}</p>
      <button
        onClick={() => onSelect(user)}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        상세보기 →
      </button>
    </div>
  )
}

// 상세 모달 컴포넌트
function UserDetailModal({
  user,
  onClose,
}: {
  user: User | null
  onClose: () => void
}) {
  if (!user) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">사용자 상세정보</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-500">이름</label>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">이메일</label>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">상태</label>
            <p><StatusBadge status={user.status} /></p>
          </div>
          <div>
            <label className="text-sm text-gray-500">가입일</label>
            <p className="font-medium">{user.joinDate}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          닫기
        </button>
      </div>
    </div>
  )
}

// 메인 대시보드 컴포넌트
export default function Dashboard() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<User['status'] | 'all'>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // 필터링 로직
  const filteredUsers = USERS.filter(user => {
    // 검색 필터
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())

    // 상태 필터
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // 필터 버튼 데이터
  const filters = [
    { value: 'all' as const, label: '전체' },
    { value: 'active' as const, label: '활성' },
    { value: 'pending' as const, label: '대기' },
    { value: 'inactive' as const, label: '비활성' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🎯 사용자 대시보드
          </h1>
          <input
            type="text"
            placeholder="검색..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 필터 버튼 */}
        <div className="flex gap-2 mb-6">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === filter.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* 사용자 목록 */}
        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : (
            filteredUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onSelect={setSelectedUser}
              />
            ))
          )}
        </div>

        {/* 결과 수 */}
        <div className="mt-4 text-sm text-gray-500">
          총 {filteredUsers.length}명의 사용자
        </div>
      </div>

      {/* 상세 모달 */}
      <UserDetailModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  )
}

복사
✅ 오늘 배운 것 정리
항목	내용
React	UI 라이브러리, JSX 문법
컴포넌트	재사용 가능한 UI 조각
Props	부모 → 자식 데이터 전달
State	변경 가능한 데이터, useState
이벤트	onClick, onChange 등
조건부 렌더링	&&, 삼항 연산자
리스트 렌더링	map, key
📚 과제

대시보드 기능 확장

정렬 기능 추가 (이름순, 날짜순)
사용자 추가 폼 만들기
사용자 삭제 기능

새로운 컴포넌트 만들기

Todo List 컴포넌트
추가, 완료 체크, 삭제 기능
🔗 참고 자료
React 공식 문서
React 한글 문서
useState 완벽 가이드

다음 시간: Next.js 기초 (라우팅/서버액션/환경변수)