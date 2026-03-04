API 호출 실전 가이드

목표: 다양한 방법으로 외부/내부 API를 호출하고 데이터를 활용하는 능력 기르기 실습: fetch, axios, 날씨 API, 공공데이터 API, AI API 연동

📋 목차
API 호출 기초
fetch API (내장)
axios 라이브러리
에러 처리 패턴
날씨 API 연동
공공데이터 API 연동
AI API 연동 (OpenAI)
카카오/네이버 API
API 호출 고급 패턴
Express에서 외부 API 프록시
1️⃣ API 호출 기초
API 호출이란?
┌──────────────┐         ┌──────────────┐
│   내 서버     │ ──────▶ │  외부 API     │
│  (Express)   │ ◀────── │  서버         │
└──────────────┘         └──────────────┘

1. 내 서버에서 요청(Request) 보냄
2. 외부 API가 데이터로 응답(Response)
3. 받은 데이터를 가공해서 활용

클릭하여 복사
복사
서버 → 서버 vs 브라우저 → 서버
[브라우저 → 서버]
- CORS 제한 있음
- API 키 노출 위험
- 직접 호출 제한적

[서버 → 서버]
- CORS 제한 없음 ✅
- API 키 안전하게 사용 ✅
- 자유롭게 호출 가능 ✅

클릭하여 복사
복사

중요: API 키가 필요한 호출은 반드시 **서버(백엔드)**에서!

호출 방법 비교
방법	Node.js	브라우저	특징
fetch	✅ (v18+)	✅	내장, 표준
axios	✅	✅	외부 패키지, 편리
node-fetch	✅	❌	Node.js 전용 (레거시)
http/https	✅	❌	Node.js 내장, 저수준
got	✅	❌	Node.js 전용, 고급
2️⃣ fetch API (내장)
기본 사용법
// GET 요청 (가장 기본)
const response = await fetch('https://jsonplaceholder.typicode.com/users')
const users = await response.json()
console.log(users)

복사
GET 요청 상세
// 쿼리 파라미터 포함
const params = new URLSearchParams({
  page: '1',
  limit: '10',
  search: '홍길동'
})

const response = await fetch(`https://api.example.com/users?${params}`)

// 응답 확인
console.log(response.status)      // 200
console.log(response.ok)          // true (200-299)
console.log(response.statusText)  // 'OK'

// 응답 헤더
console.log(response.headers.get('content-type'))

// JSON 파싱
const data = await response.json()
console.log(data)

복사
POST 요청
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: '새 게시글',
    body: '내용입니다',
    userId: 1
  })
})

const newPost = await response.json()
console.log(newPost)
// { id: 101, title: '새 게시글', body: '내용입니다', userId: 1 }

복사
PUT/PATCH/DELETE 요청
// PUT (전체 수정)
const putResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 1,
    title: '수정된 제목',
    body: '수정된 내용',
    userId: 1
  })
})

// PATCH (부분 수정)
const patchResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: '제목만 수정'
  })
})

// DELETE
const deleteResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE'
})
console.log(deleteResponse.ok)  // true

복사
인증 헤더 포함
// Bearer Token
const response = await fetch('https://api.example.com/me', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
})

// API Key
const response2 = await fetch('https://api.example.com/data', {
  headers: {
    'X-API-Key': process.env.API_KEY
  }
})

복사
타임아웃 설정
// AbortController로 타임아웃 구현
const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 5000)  // 5초

try {
  const response = await fetch('https://api.example.com/data', {
    signal: controller.signal
  })
  const data = await response.json()
  console.log(data)
} catch (err) {
  if (err.name === 'AbortError') {
    console.log('요청 시간 초과!')
  } else {
    throw err
  }
} finally {
  clearTimeout(timeout)
}

복사
다양한 응답 형식
// JSON
const json = await response.json()

// 텍스트
const text = await response.text()

// Blob (파일)
const blob = await response.blob()

// ArrayBuffer (바이너리)
const buffer = await response.arrayBuffer()

복사
3️⃣ axios 라이브러리
설치
npm install axios

복사
기본 사용법
import axios from 'axios'

// GET
const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
console.log(data)

// POST
const { data: newUser } = await axios.post('https://api.example.com/users', {
  name: '홍길동',
  email: 'hong@example.com'
})

// PUT
await axios.put('https://api.example.com/users/1', {
  name: '홍길동(수정)'
})

// DELETE
await axios.delete('https://api.example.com/users/1')

복사
axios vs fetch 비교
// fetch - 에러 체크 필요
const response = await fetch('/api/users')
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`)
}
const data = await response.json()

// axios - 자동 에러 처리, 자동 JSON 파싱 ✅
const { data } = await axios.get('/api/users')

복사
기능	fetch	axios
자동 JSON 파싱	❌ (수동 .json()
클릭하여 복사
)	✅ 자동
에러 처리	❌ (status 확인 필요)	✅ 4xx/5xx 자동 throw
타임아웃	❌ (AbortController 필요)	✅ timeout
클릭하여 복사
 옵션
인터셉터	❌	✅ 요청/응답 가로채기
요청 취소	✅ AbortController	✅ CancelToken
설치 필요	❌ 내장	✅ npm install
번들 크기	0	~13KB
axios 인스턴스 (추천!)
// lib/api.js
import axios from 'axios'

// API별 인스턴스 생성
const weatherAPI = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 5000,
  params: {
    appid: process.env.WEATHER_API_KEY,
    units: 'metric',
    lang: 'kr'
  }
})

const openaiAPI = axios.create({
  baseURL: 'https://api.openai.com/v1',
  timeout: 30000,
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
})

// 사용 예시
const { data } = await weatherAPI.get('/weather', {
  params: { q: 'Seoul' }
})

export { weatherAPI, openaiAPI }

복사
인터셉터 (요청/응답 가로채기)
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.example.com'
})

// 요청 인터셉터 - 모든 요청에 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = process.env.API_TOKEN
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log(`[API 요청] ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 - 에러 로깅
api.interceptors.response.use(
  (response) => {
    console.log(`[API 응답] ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    if (error.response) {
      console.error(`[API 에러] ${error.response.status}: ${error.response.data?.message}`)
    } else {
      console.error(`[네트워크 에러] ${error.message}`)
    }
    return Promise.reject(error)
  }
)

export default api

복사
4️⃣ 에러 처리 패턴
fetch 에러 처리
async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options)

    // HTTP 에러 확인
    if (!response.ok) {
      const errorBody = await response.json().catch(() => null)
      throw new Error(
        errorBody?.message || `HTTP ${response.status}: ${response.statusText}`
      )
    }

    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('요청이 취소되었습니다.')
    }
    if (error.name === 'TypeError') {
      throw new Error('네트워크 연결을 확인해주세요.')
    }
    throw error
  }
}

// 사용
try {
  const data = await fetchWithErrorHandling('https://api.example.com/data')
  console.log(data)
} catch (error) {
  console.error('API 호출 실패:', error.message)
}

복사
axios 에러 처리
try {
  const { data } = await axios.get('https://api.example.com/data')
  console.log(data)
} catch (error) {
  if (error.response) {
    // 서버가 응답을 반환한 경우 (4xx, 5xx)
    console.error('응답 에러:', error.response.status)
    console.error('에러 데이터:', error.response.data)
  } else if (error.request) {
    // 요청은 보냈지만 응답이 없는 경우
    console.error('응답 없음 (네트워크 문제)')
  } else {
    // 요청 설정 중 에러
    console.error('요청 설정 에러:', error.message)
  }
}

복사
재시도 패턴
async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json()
    } catch (error) {
      console.log(`시도 ${i + 1}/${retries} 실패: ${error.message}`)

      if (i === retries - 1) throw error  // 마지막 시도면 에러 던짐

      // 대기 (지수 백오프)
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
    }
  }
}

// 사용: 최대 3번 재시도, 1초 → 2초 → 4초 간격
const data = await fetchWithRetry('https://api.example.com/data', {}, 3, 1000)

복사
5️⃣ 날씨 API 연동
OpenWeatherMap API
가입: https://openweathermap.org/api
무료 플랜: 60회/분, 현재 날씨 제공

클릭하여 복사
복사
Express에서 날씨 API 연동
// routes/weather.js
import { Router } from 'express'

const router = Router()
const API_KEY = process.env.OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

// 도시 이름으로 날씨 조회
// GET /api/weather?city=Seoul
router.get('/', async (req, res) => {
  try {
    const { city = 'Seoul' } = req.query

    const params = new URLSearchParams({
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'kr'
    })

    const response = await fetch(`${BASE_URL}/weather?${params}`)

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({
          success: false,
          error: '도시를 찾을 수 없습니다.'
        })
      }
      throw new Error(`날씨 API 오류: ${response.status}`)
    }

    const data = await response.json()

    // 필요한 데이터만 추출
    const weather = {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      wind: data.wind.speed,
      timestamp: new Date(data.dt * 1000).toISOString()
    }

    res.json({ success: true, data: weather })
  } catch (error) {
    console.error('날씨 조회 오류:', error)
    res.status(500).json({
      success: false,
      error: '날씨 정보를 가져올 수 없습니다.'
    })
  }
})

// 5일 예보
// GET /api/weather/forecast?city=Seoul
router.get('/forecast', async (req, res) => {
  try {
    const { city = 'Seoul' } = req.query

    const params = new URLSearchParams({
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
      cnt: '40'
    })

    const response = await fetch(`${BASE_URL}/forecast?${params}`)
    if (!response.ok) throw new Error(`API 오류: ${response.status}`)

    const data = await response.json()

    // 일별로 그룹핑 (3시간 단위 → 일별)
    const dailyMap = {}
    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0]
      if (!dailyMap[date]) {
        dailyMap[date] = {
          date,
          temps: [],
          descriptions: [],
          icons: []
        }
      }
      dailyMap[date].temps.push(item.main.temp)
      dailyMap[date].descriptions.push(item.weather[0].description)
      dailyMap[date].icons.push(item.weather[0].icon)
    })

    const forecast = Object.values(dailyMap).map(day => ({
      date: day.date,
      tempMin: Math.round(Math.min(...day.temps)),
      tempMax: Math.round(Math.max(...day.temps)),
      description: day.descriptions[Math.floor(day.descriptions.length / 2)],
      icon: `https://openweathermap.org/img/wn/${day.icons[0]}@2x.png`
    }))

    res.json({ success: true, data: forecast })
  } catch (error) {
    console.error('예보 조회 오류:', error)
    res.status(500).json({ success: false, error: '예보를 가져올 수 없습니다.' })
  }
})

export default router

복사
테스트
# 서울 현재 날씨
curl http://localhost:3000/api/weather?city=Seoul

# 부산 날씨
curl http://localhost:3000/api/weather?city=Busan

# 서울 5일 예보
curl http://localhost:3000/api/weather/forecast?city=Seoul

복사
6️⃣ 공공데이터 API 연동
공공데이터 포털
가입: https://www.data.go.kr
무료, 다양한 공공 API 제공

클릭하여 복사
복사
한국 관광 정보 API 예시
// routes/tourism.js
import { Router } from 'express'

const router = Router()
const SERVICE_KEY = process.env.TOUR_API_KEY
const BASE_URL = 'http://apis.data.go.kr/B551011/KorService1'

// 관광지 검색
// GET /api/tourism/search?keyword=서울타워
router.get('/search', async (req, res) => {
  try {
    const { keyword, page = '1', size = '10' } = req.query

    if (!keyword) {
      return res.status(400).json({
        success: false,
        error: '검색어(keyword)를 입력해주세요.'
      })
    }

    const params = new URLSearchParams({
      serviceKey: SERVICE_KEY,
      keyword,
      pageNo: page,
      numOfRows: size,
      MobileOS: 'ETC',
      MobileApp: 'MyApp',
      _type: 'json'
    })

    const response = await fetch(`${BASE_URL}/searchKeyword1?${params}`)
    const data = await response.json()

    const items = data.response?.body?.items?.item || []
    const totalCount = data.response?.body?.totalCount || 0

    const results = items.map(item => ({
      title: item.title,
      address: item.addr1,
      tel: item.tel,
      image: item.firstimage,
      mapX: item.mapx,
      mapY: item.mapy,
      contentId: item.contentid,
      contentTypeId: item.contenttypeid
    }))

    res.json({
      success: true,
      data: results,
      pagination: {
        page: parseInt(page),
        size: parseInt(size),
        total: totalCount
      }
    })
  } catch (error) {
    console.error('관광 정보 검색 오류:', error)
    res.status(500).json({ success: false, error: '검색 중 오류가 발생했습니다.' })
  }
})

export default router

복사
공공데이터 API 호출 팁
// 1. 인코딩 주의 (서비스키에 특수문자 포함)
// URLSearchParams가 자동 인코딩하므로 이미 인코딩된 키는 주의

// 2. XML vs JSON
// _type: 'json' 파라미터로 JSON 응답 요청

// 3. 응답 구조 확인
// data.response.header.resultCode === '0000' 이면 성공
if (data.response.header.resultCode !== '0000') {
  throw new Error(data.response.header.resultMsg)
}

// 4. 항목이 1개일 때 배열이 아닌 경우 처리
const items = data.response?.body?.items?.item
const itemArray = Array.isArray(items) ? items : items ? [items] : []

복사
7️⃣ AI API 연동 (OpenAI)
OpenAI API 호출
npm install openai
# 또는 fetch로 직접 호출 가능

복사
fetch로 직접 호출
// routes/ai.js
import { Router } from 'express'

const router = Router()
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

// 텍스트 생성
// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { message, model = 'gpt-4o-mini' } = req.body

    if (!message) {
      return res.status(400).json({
        success: false,
        error: '메시지를 입력해주세요.'
      })
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: '당신은 친절한 AI 어시스턴트입니다. 한국어로 답변해주세요.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'OpenAI API 오류')
    }

    const data = await response.json()
    const answer = data.choices[0].message.content

    res.json({
      success: true,
      data: {
        answer,
        model: data.model,
        usage: data.usage
      }
    })
  } catch (error) {
    console.error('AI 응답 오류:', error)
    res.status(500).json({ success: false, error: 'AI 응답 생성 실패' })
  }
})

// 이미지 생성
// POST /api/ai/image
router.post('/image', async (req, res) => {
  try {
    const { prompt, size = '1024x1024' } = req.body

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: '이미지 설명을 입력해주세요.'
      })
    }

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size,
        quality: 'standard'
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || '이미지 생성 오류')
    }

    const data = await response.json()

    res.json({
      success: true,
      data: {
        url: data.data[0].url,
        revisedPrompt: data.data[0].revised_prompt
      }
    })
  } catch (error) {
    console.error('이미지 생성 오류:', error)
    res.status(500).json({ success: false, error: '이미지 생성 실패' })
  }
})

// 텍스트 스트리밍 (SSE)
// POST /api/ai/stream
router.post('/stream', async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ error: '메시지를 입력해주세요.' })
    }

    // SSE 헤더 설정
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'AI 어시스턴트입니다.' },
          { role: 'user', content: message }
        ],
        stream: true
      })
    })

    // 스트림 전달
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n').filter(line => line.trim() !== '')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') {
            res.write('data: [DONE]\n\n')
            break
          }

          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices[0]?.delta?.content
            if (content) {
              res.write(`data: ${JSON.stringify({ content })}\n\n`)
            }
          } catch {}
        }
      }
    }

    res.end()
  } catch (error) {
    console.error('스트리밍 오류:', error)
    res.status(500).json({ error: '스트리밍 실패' })
  }
})

export default router

복사
테스트
# AI 채팅
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "자바스크립트의 장점 3가지를 알려주세요"}'

# 이미지 생성
curl -X POST http://localhost:3000/api/ai/image \
  -H "Content-Type: application/json" \
  -d '{"prompt": "귀여운 고양이가 노트북으로 코딩하는 일러스트"}'

# 스트리밍
curl -X POST http://localhost:3000/api/ai/stream \
  -H "Content-Type: application/json" \
  -d '{"message": "Node.js란 무엇인가요?"}'

복사
8️⃣ 카카오/네이버 API
카카오 로컬 검색 API
// routes/search.js
import { Router } from 'express'

const router = Router()
const KAKAO_REST_KEY = process.env.KAKAO_REST_API_KEY

// 장소 검색
// GET /api/search/places?query=강남역맛집
router.get('/places', async (req, res) => {
  try {
    const { query, page = '1', size = '15' } = req.query

    if (!query) {
      return res.status(400).json({ success: false, error: '검색어를 입력하세요.' })
    }

    const params = new URLSearchParams({ query, page, size })
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?${params}`,
      {
        headers: {
          'Authorization': `KakaoAK ${KAKAO_REST_KEY}`
        }
      }
    )

    if (!response.ok) throw new Error(`카카오 API 오류: ${response.status}`)

    const data = await response.json()

    const places = data.documents.map(place => ({
      name: place.place_name,
      category: place.category_name,
      address: place.road_address_name || place.address_name,
      phone: place.phone,
      url: place.place_url,
      x: place.x,
      y: place.y,
      distance: place.distance
    }))

    res.json({
      success: true,
      data: places,
      pagination: {
        total: data.meta.total_count,
        isEnd: data.meta.is_end
      }
    })
  } catch (error) {
    console.error('장소 검색 오류:', error)
    res.status(500).json({ success: false, error: '검색 실패' })
  }
})

export default router

복사
네이버 검색 API
// routes/naver.js
import { Router } from 'express'

const router = Router()
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET

// 뉴스 검색
// GET /api/naver/news?query=AI
router.get('/news', async (req, res) => {
  try {
    const { query, display = '10', start = '1', sort = 'sim' } = req.query

    if (!query) {
      return res.status(400).json({ success: false, error: '검색어를 입력하세요.' })
    }

    const params = new URLSearchParams({ query, display, start, sort })
    const response = await fetch(
      `https://openapi.naver.com/v1/search/news.json?${params}`,
      {
        headers: {
          'X-Naver-Client-Id': NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
        }
      }
    )

    if (!response.ok) throw new Error(`네이버 API 오류: ${response.status}`)

    const data = await response.json()

    const news = data.items.map(item => ({
      title: item.title.replace(/<[^>]*>/g, ''),  // HTML 태그 제거
      description: item.description.replace(/<[^>]*>/g, ''),
      link: item.originallink || item.link,
      pubDate: item.pubDate
    }))

    res.json({
      success: true,
      data: news,
      total: data.total
    })
  } catch (error) {
    console.error('뉴스 검색 오류:', error)
    res.status(500).json({ success: false, error: '검색 실패' })
  }
})

export default router

복사
9️⃣ API 호출 고급 패턴
병렬 호출 (Promise.all)
// 여러 API를 동시에 호출
app.get('/api/dashboard', async (req, res) => {
  try {
    const [weather, news, users] = await Promise.all([
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=KEY').then(r => r.json()),
      fetch('https://newsapi.org/v2/top-headlines?country=kr&apiKey=KEY').then(r => r.json()),
      fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json())
    ])

    res.json({
      success: true,
      data: { weather, news, users }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: '데이터 로딩 실패' })
  }
})

복사
부분 실패 허용 (Promise.allSettled)
// 일부 API가 실패해도 나머지 데이터는 반환
app.get('/api/dashboard', async (req, res) => {
  const results = await Promise.allSettled([
    fetch('https://api.weather.com/data').then(r => r.json()),
    fetch('https://api.news.com/data').then(r => r.json()),
    fetch('https://api.users.com/data').then(r => r.json())
  ])

  const [weather, news, users] = results.map(result =>
    result.status === 'fulfilled' ? result.value : null
  )

  res.json({
    success: true,
    data: {
      weather: weather || { error: '날씨 데이터 로딩 실패' },
      news: news || { error: '뉴스 데이터 로딩 실패' },
      users: users || { error: '사용자 데이터 로딩 실패' }
    }
  })
})

복사
캐싱
// 간단한 인메모리 캐시
const cache = new Map()

function withCache(key, ttl = 60000) {
  return async (fetchFn) => {
    const cached = cache.get(key)

    if (cached && Date.now() - cached.timestamp < ttl) {
      console.log(`[캐시 히트] ${key}`)
      return cached.data
    }

    console.log(`[캐시 미스] ${key}`)
    const data = await fetchFn()
    cache.set(key, { data, timestamp: Date.now() })
    return data
  }
}

// 사용 예시: 5분 캐시
app.get('/api/weather', async (req, res) => {
  const { city = 'Seoul' } = req.query

  const data = await withCache(`weather:${city}`, 5 * 60 * 1000)(async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
    return response.json()
  })

  res.json({ success: true, data })
})

복사
Rate Limiting (API 호출 제한)
// 간단한 Rate Limiter
class RateLimiter {
  constructor(maxRequests, interval) {
    this.maxRequests = maxRequests
    this.interval = interval
    this.requests = []
  }

  async waitForSlot() {
    const now = Date.now()
    this.requests = this.requests.filter(time => now - time < this.interval)

    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0]
      const waitTime = this.interval - (now - oldestRequest)
      console.log(`Rate limit: ${waitTime}ms 대기`)
      await new Promise(resolve => setTimeout(resolve, waitTime))
    }

    this.requests.push(Date.now())
  }
}

// 분당 60회 제한
const limiter = new RateLimiter(60, 60000)

async function rateLimitedFetch(url, options) {
  await limiter.waitForSlot()
  return fetch(url, options)
}

복사
🔟 Express에서 외부 API 프록시
API 프록시 패턴
┌──────────┐       ┌──────────────┐       ┌──────────────┐
│ 프론트엔드 │ ────▶ │  Express 서버 │ ────▶ │  외부 API     │
│ (브라우저) │ ◀──── │  (프록시)     │ ◀──── │  서버         │
└──────────┘       └──────────────┘       └──────────────┘

장점:
1. API 키를 서버에 숨김 ✅
2. CORS 문제 해결 ✅
3. 응답 가공 가능 ✅
4. 캐싱 가능 ✅
5. Rate Limiting 가능 ✅

클릭하여 복사
복사
전체 프록시 서버 예시
// index.js - 통합 API 프록시 서버
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'

import weatherRouter from './routes/weather.js'
import aiRouter from './routes/ai.js'
import searchRouter from './routes/search.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('public'))

// API 라우트
app.use('/api/weather', weatherRouter)
app.use('/api/ai', aiRouter)
app.use('/api/search', searchRouter)

// 메인 페이지
app.get('/', (req, res) => {
  res.json({
    name: 'API 프록시 서버',
    endpoints: {
      weather: 'GET /api/weather?city=Seoul',
      forecast: 'GET /api/weather/forecast?city=Seoul',
      aiChat: 'POST /api/ai/chat { message: "..." }',
      aiImage: 'POST /api/ai/image { prompt: "..." }',
      places: 'GET /api/search/places?query=강남역'
    }
  })
})

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not Found' })
})

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ success: false, error: err.message })
})

app.listen(PORT, () => {
  console.log(`API 서버 실행: http://localhost:${PORT}`)
})

복사
.env 파일
PORT=3000
OPENWEATHER_API_KEY=your_openweather_key
OPENAI_API_KEY=sk-your_openai_key
KAKAO_REST_API_KEY=your_kakao_rest_key
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret
TOUR_API_KEY=your_tour_api_key

복사
프론트엔드에서 프록시 서버 호출
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API 테스트</title>
  <style>
    body { font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    button { padding: 8px 16px; margin: 4px; cursor: pointer; }
    pre { background: #f4f4f4; padding: 16px; border-radius: 8px; overflow-x: auto; }
    input { padding: 8px; width: 300px; }
    .section { margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>API 테스트 페이지</h1>

  <div class="section">
    <h2>날씨 API</h2>
    <input type="text" id="city" placeholder="도시명 (예: Seoul)" value="Seoul">
    <button onclick="getWeather()">날씨 조회</button>
    <pre id="weather-result">결과가 여기에 표시됩니다</pre>
  </div>

  <div class="section">
    <h2>AI 챗봇</h2>
    <input type="text" id="ai-message" placeholder="질문을 입력하세요">
    <button onclick="askAI()">질문하기</button>
    <pre id="ai-result">결과가 여기에 표시됩니다</pre>
  </div>

  <div class="section">
    <h2>장소 검색</h2>
    <input type="text" id="place-query" placeholder="장소 검색 (예: 강남역 맛집)">
    <button onclick="searchPlaces()">검색</button>
    <pre id="search-result">결과가 여기에 표시됩니다</pre>
  </div>

  <script>
    async function getWeather() {
      const city = document.getElementById('city').value
      const res = await fetch(`/api/weather?city=${city}`)
      const data = await res.json()
      document.getElementById('weather-result').textContent = JSON.stringify(data, null, 2)
    }

    async function askAI() {
      const message = document.getElementById('ai-message').value
      document.getElementById('ai-result').textContent = '응답 생성 중...'

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      const data = await res.json()
      document.getElementById('ai-result').textContent = JSON.stringify(data, null, 2)
    }

    async function searchPlaces() {
      const query = document.getElementById('place-query').value
      const res = await fetch(`/api/search/places?query=${encodeURIComponent(query)}`)
      const data = await res.json()
      document.getElementById('search-result').textContent = JSON.stringify(data, null, 2)
    }
  </script>
</body>
</html>

복사
✅ 핵심 정리
항목	내용
fetch	Node.js 18+ 내장, 표준 API
axios	편의 기능 풍부 (인터셉터, 자동 JSON)
에러 처리	try-catch + 상태 코드 확인 필수
API 키	반드시 서버 사이드에서 관리 (.env)
프록시 패턴	Express에서 외부 API 중계 (보안+CORS 해결)
병렬 호출	Promise.all로 동시 요청
캐싱	반복 호출 줄이기 (메모리/Redis)
Rate Limiting	API 호출 횟수 제한 관리
🔗 참고 자료
MDN - Fetch API
axios 공식 문서
OpenWeatherMap API
공공데이터 포털
OpenAI API 문서
카카오 API
네이버 API

다음 자료: 04_SQLite3_DB_연동.md