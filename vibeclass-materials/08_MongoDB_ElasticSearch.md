8회차: MongoDB + Elasticsearch 개요
학습 목표
문서 데이터베이스(NoSQL)와 관계형 데이터베이스의 차이 이해
MongoDB의 기본 개념과 CRUD 작업 학습
Elasticsearch의 검색 엔진 및 색인 개념 이해
각 데이터베이스의 적합한 사용 사례 파악
1. RDB vs NoSQL 비교
1.1 관계형 데이터베이스 (RDB)
┌─────────────────────────────────────────────────────────┐
│                    관계형 데이터베이스                      │
├─────────────────────────────────────────────────────────┤
│  • 테이블 기반 구조 (행과 열)                              │
│  • 고정된 스키마 (미리 정의된 구조)                         │
│  • SQL 쿼리 언어 사용                                     │
│  • ACID 트랜잭션 보장                                     │
│  • 정규화를 통한 데이터 중복 최소화                         │
│  • JOIN을 통한 테이블 간 관계 표현                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사

RDB 예시 (사용자와 주문)

-- 사용자 테이블
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- 주문 테이블 (외래키로 관계 표현)
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT REFERENCES users(id),
    product VARCHAR(100),
    price DECIMAL(10,2),
    created_at TIMESTAMP
);

-- JOIN으로 데이터 조회
SELECT u.name, o.product, o.price
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.id = 1;

복사
1.2 문서 데이터베이스 (NoSQL)
┌─────────────────────────────────────────────────────────┐
│                    문서 데이터베이스                       │
├─────────────────────────────────────────────────────────┤
│  • 문서(Document) 기반 구조 (JSON/BSON)                   │
│  • 유연한 스키마 (스키마리스)                              │
│  • 쿼리 언어가 DB마다 다름                                │
│  • BASE 특성 (가용성 중시)                                │
│  • 비정규화 (데이터 중복 허용)                             │
│  • 임베딩/참조를 통한 관계 표현                            │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사

NoSQL 예시 (같은 데이터)

// MongoDB 문서 - 데이터가 하나의 문서에 포함됨
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "홍길동",
  "email": "hong@example.com",
  "orders": [
    {
      "product": "노트북",
      "price": 1500000,
      "created_at": ISODate("2024-01-15")
    },
    {
      "product": "마우스",
      "price": 50000,
      "created_at": ISODate("2024-01-16")
    }
  ]
}

복사
1.3 비교 표
특성	RDB (PostgreSQL)	NoSQL (MongoDB)
데이터 모델	테이블 (행/열)	문서 (JSON)
스키마	고정 스키마	유연한 스키마
확장 방식	수직 확장 (Scale-up)	수평 확장 (Scale-out)
관계 표현	JOIN	임베딩/참조
트랜잭션	ACID 보장	문서 단위 원자성
쿼리 언어	SQL	MongoDB Query Language
적합한 경우	정형 데이터, 복잡한 관계	비정형 데이터, 빠른 개발
2. MongoDB 기초
2.1 MongoDB 핵심 개념
┌─────────────────────────────────────────────────────────┐
│                     MongoDB 구조                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Database (데이터베이스)                                │
│   └── Collection (컬렉션) ≈ 테이블                       │
│       └── Document (문서) ≈ 행(Row)                     │
│           └── Field (필드) ≈ 열(Column)                 │
│                                                         │
└─────────────────────────────────────────────────────────┘

예시:
  ecommerce (Database)
  ├── users (Collection)
  │   ├── { _id: 1, name: "홍길동", email: "..." }
  │   └── { _id: 2, name: "김철수", email: "..." }
  ├── products (Collection)
  │   └── { _id: 1, name: "노트북", price: 1500000 }
  └── orders (Collection)
      └── { _id: 1, user_id: 1, items: [...] }

클릭하여 복사
복사
2.2 BSON 데이터 타입
// MongoDB가 지원하는 데이터 타입
{
  // 기본 타입
  "string": "Hello World",
  "number": 42,
  "double": 3.14,
  "boolean": true,
  "null": null,

  // MongoDB 특수 타입
  "_id": ObjectId("507f1f77bcf86cd799439011"),  // 12바이트 고유 ID
  "date": ISODate("2024-01-15T09:00:00Z"),
  "timestamp": Timestamp(1705312800, 1),

  // 복합 타입
  "array": [1, 2, 3, "four"],
  "object": { "nested": "value" },

  // 바이너리 데이터
  "binary": BinData(0, "base64encoded...")
}

복사
2.3 MongoDB CRUD 작업
Create (생성)
// 단일 문서 삽입
db.users.insertOne({
  name: "홍길동",
  email: "hong@example.com",
  age: 25,
  tags: ["developer", "fullstack"],
  createdAt: new Date()
});

// 다중 문서 삽입
db.users.insertMany([
  { name: "김철수", email: "kim@example.com", age: 30 },
  { name: "이영희", email: "lee@example.com", age: 28 }
]);

복사
Read (조회)
// 전체 조회
db.users.find();

// 조건 조회
db.users.find({ age: { $gte: 25 } });  // age >= 25

// 특정 필드만 조회 (프로젝션)
db.users.find(
  { age: { $gte: 25 } },
  { name: 1, email: 1, _id: 0 }  // name, email만 반환
);

// 정렬과 제한
db.users.find()
  .sort({ age: -1 })  // 나이 내림차순
  .limit(10)          // 10개만
  .skip(5);           // 5개 건너뛰기

// 단일 문서 조회
db.users.findOne({ email: "hong@example.com" });

복사
Update (수정)
// 단일 문서 수정
db.users.updateOne(
  { email: "hong@example.com" },  // 조건
  {
    $set: { age: 26 },           // 필드 수정
    $push: { tags: "mongodb" }   // 배열에 추가
  }
);

// 다중 문서 수정
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { status: "young" } }
);

// 문서 교체
db.users.replaceOne(
  { email: "hong@example.com" },
  { name: "홍길동", email: "hong@example.com", age: 26, replaced: true }
);

복사
Delete (삭제)
// 단일 문서 삭제
db.users.deleteOne({ email: "hong@example.com" });

// 다중 문서 삭제
db.users.deleteMany({ status: "inactive" });

// 조건 없이 전체 삭제 (주의!)
db.users.deleteMany({});

복사
2.4 MongoDB 쿼리 연산자
// 비교 연산자
db.users.find({
  age: { $eq: 25 },    // 같음
  age: { $ne: 25 },    // 같지 않음
  age: { $gt: 25 },    // 초과
  age: { $gte: 25 },   // 이상
  age: { $lt: 25 },    // 미만
  age: { $lte: 25 },   // 이하
  age: { $in: [25, 30, 35] },     // 포함
  age: { $nin: [25, 30, 35] }     // 미포함
});

// 논리 연산자
db.users.find({
  $and: [
    { age: { $gte: 20 } },
    { age: { $lte: 30 } }
  ]
});

db.users.find({
  $or: [
    { status: "active" },
    { role: "admin" }
  ]
});

// 요소 연산자
db.users.find({
  email: { $exists: true },      // 필드 존재 여부
  age: { $type: "number" }       // 타입 확인
});

// 배열 연산자
db.users.find({
  tags: { $all: ["developer", "fullstack"] },  // 모두 포함
  tags: { $size: 3 },                          // 배열 크기
  "tags.0": "developer"                        // 인덱스 접근
});

// 정규식
db.users.find({
  email: { $regex: /@example\.com$/, $options: "i" }
});

복사
2.5 Aggregation Pipeline
// 집계 파이프라인 예제
db.orders.aggregate([
  // 1단계: 필터링
  { $match: { status: "completed" } },

  // 2단계: 그룹화
  { $group: {
    _id: "$userId",
    totalAmount: { $sum: "$amount" },
    orderCount: { $sum: 1 },
    avgAmount: { $avg: "$amount" }
  }},

  // 3단계: 정렬
  { $sort: { totalAmount: -1 } },

  // 4단계: 제한
  { $limit: 10 },

  // 5단계: 프로젝션
  { $project: {
    userId: "$_id",
    totalAmount: 1,
    orderCount: 1,
    _id: 0
  }}
]);

// Lookup (JOIN과 유사)
db.orders.aggregate([
  {
    $lookup: {
      from: "users",           // 조인할 컬렉션
      localField: "userId",    // 현재 컬렉션의 필드
      foreignField: "_id",     // 대상 컬렉션의 필드
      as: "userInfo"           // 결과 필드명
    }
  },
  { $unwind: "$userInfo" }     // 배열을 풀어서 문서로
]);

복사
2.6 인덱스
// 단일 필드 인덱스
db.users.createIndex({ email: 1 });  // 1: 오름차순

// 복합 인덱스
db.users.createIndex({ lastName: 1, firstName: 1 });

// 유니크 인덱스
db.users.createIndex({ email: 1 }, { unique: true });

// 텍스트 인덱스 (전문 검색)
db.articles.createIndex({ title: "text", content: "text" });

// 인덱스 조회
db.users.getIndexes();

// 실행 계획 확인
db.users.find({ email: "hong@example.com" }).explain("executionStats");

복사
3. Node.js에서 MongoDB 사용
3.1 MongoDB 드라이버 설치
npm install mongodb

복사
3.2 연결 및 CRUD
// lib/mongodb.ts
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'myapp';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDB(): Promise<Db> {
  if (db) return db;

  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);

  console.log('MongoDB 연결 성공');
  return db;
}

export async function disconnectDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

// 컬렉션 헬퍼
export async function getCollection<T extends Document>(
  name: string
): Promise<Collection<T>> {
  const database = await connectDB();
  return database.collection<T>(name);
}

복사
// services/userService.ts
import { ObjectId } from 'mongodb';
import { getCollection } from '@/lib/mongodb';

interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
}

export async function createUser(userData: Omit<User, '_id' | 'createdAt'>) {
  const users = await getCollection<User>('users');

  const result = await users.insertOne({
    ...userData,
    createdAt: new Date()
  });

  return result.insertedId;
}

export async function getUserById(id: string) {
  const users = await getCollection<User>('users');
  return users.findOne({ _id: new ObjectId(id) });
}

export async function getUserByEmail(email: string) {
  const users = await getCollection<User>('users');
  return users.findOne({ email });
}

export async function updateUser(id: string, updates: Partial<User>) {
  const users = await getCollection<User>('users');

  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );

  return result.modifiedCount > 0;
}

export async function deleteUser(id: string) {
  const users = await getCollection<User>('users');
  const result = await users.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

export async function searchUsers(query: string, limit = 10) {
  const users = await getCollection<User>('users');

  return users.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { email: { $regex: query, $options: 'i' } }
    ]
  })
  .limit(limit)
  .toArray();
}

복사
3.3 Mongoose ODM 사용
npm install mongoose

복사
// lib/mongoose.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Mongoose 연결 성공');
  } catch (error) {
    console.error('Mongoose 연결 실패:', error);
    throw error;
  }
}

복사
// models/User.ts
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, '이름은 필수입니다'],
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, '유효한 이메일을 입력하세요']
  },
  age: {
    type: Number,
    min: [0, '나이는 0 이상이어야 합니다'],
    max: [150, '나이는 150 이하여야 합니다']
  },
  tags: [{ type: String }]
}, {
  timestamps: true  // createdAt, updatedAt 자동 생성
});

// 인덱스 정의
userSchema.index({ email: 1 });
userSchema.index({ name: 'text' });

// 인스턴스 메서드
userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email
  };
};

// 정적 메서드
userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email });
};

// 미들웨어 (pre/post 훅)
userSchema.pre('save', function(next) {
  console.log('사용자 저장 전:', this.name);
  next();
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

복사
// 사용 예시
import { User } from '@/models/User';
import { connectDB } from '@/lib/mongoose';

// 생성
await connectDB();
const user = await User.create({
  name: '홍길동',
  email: 'hong@example.com',
  age: 25,
  tags: ['developer']
});

// 조회
const foundUser = await User.findById(user._id);
const allUsers = await User.find({ age: { $gte: 20 } });

// 수정
await User.findByIdAndUpdate(user._id, { age: 26 }, { new: true });

// 삭제
await User.findByIdAndDelete(user._id);

복사
4. Elasticsearch 개요
4.1 Elasticsearch란?
┌─────────────────────────────────────────────────────────┐
│                    Elasticsearch                         │
├─────────────────────────────────────────────────────────┤
│  • 분산형 검색 및 분석 엔진                               │
│  • Apache Lucene 기반                                    │
│  • 실시간에 가까운 검색 (Near Real-Time)                  │
│  • RESTful API 인터페이스                                │
│  • 수평 확장 가능 (클러스터링)                            │
│  • JSON 문서 저장                                        │
└─────────────────────────────────────────────────────────┘

주요 사용 사례:
• 전문 검색 (Full-text Search)
• 로그 및 이벤트 데이터 분석
• 실시간 애플리케이션 모니터링
• 지리적 정보 검색
• 보안 분석

클릭하여 복사
복사
4.2 핵심 개념
┌─────────────────────────────────────────────────────────┐
│                 Elasticsearch 구조                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Cluster (클러스터)                                     │
│   └── Node (노드) - ES 인스턴스                         │
│       └── Index (인덱스) ≈ 데이터베이스                  │
│           └── Document (문서) ≈ 행(Row)                 │
│               └── Field (필드) ≈ 열(Column)             │
│                                                         │
│   Shard (샤드) - 인덱스를 분할한 단위                    │
│   Replica (레플리카) - 샤드의 복제본                     │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
4.3 역색인 (Inverted Index)
일반 인덱스 (Forward Index):
┌──────────┬─────────────────────────────────┐
│ Document │ Terms                           │
├──────────┼─────────────────────────────────┤
│ Doc 1    │ "바이브코딩은 재미있다"          │
│ Doc 2    │ "AI 코딩이 재미있다"             │
│ Doc 3    │ "바이브코딩 배우기"              │
└──────────┴─────────────────────────────────┘

역색인 (Inverted Index):
┌───────────┬─────────────────┐
│ Term      │ Documents       │
├───────────┼─────────────────┤
│ 바이브코딩 │ Doc 1, Doc 3    │
│ 재미있다   │ Doc 1, Doc 2    │
│ AI        │ Doc 2           │
│ 코딩      │ Doc 2           │
│ 배우기    │ Doc 3           │
└───────────┴─────────────────┘

→ "바이브코딩" 검색 시 즉시 Doc 1, Doc 3 반환 가능!

클릭하여 복사
복사
4.4 분석기 (Analyzer)
텍스트 분석 과정:
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   원본 텍스트: "The Quick Brown FOX jumps!"             │
│                         ↓                               │
│   Character Filter (문자 필터)                          │
│   → HTML 태그 제거, 특수문자 변환 등                     │
│                         ↓                               │
│   Tokenizer (토크나이저)                                │
│   → ["The", "Quick", "Brown", "FOX", "jumps!"]         │
│                         ↓                               │
│   Token Filter (토큰 필터)                              │
│   → 소문자 변환, 불용어 제거, 형태소 분석 등             │
│                         ↓                               │
│   결과: ["quick", "brown", "fox", "jumps"]             │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
4.5 기본 REST API
# 클러스터 상태 확인
GET /_cluster/health

# 인덱스 생성
PUT /products
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "name": { "type": "text" },
      "price": { "type": "integer" },
      "description": { "type": "text" },
      "category": { "type": "keyword" },
      "created_at": { "type": "date" }
    }
  }
}

# 문서 색인 (추가)
POST /products/_doc/1
{
  "name": "MacBook Pro",
  "price": 2000000,
  "description": "애플 노트북 프로 모델",
  "category": "laptop",
  "created_at": "2024-01-15"
}

# 문서 조회
GET /products/_doc/1

# 검색
GET /products/_search
{
  "query": {
    "match": {
      "description": "노트북"
    }
  }
}

# 문서 수정
POST /products/_update/1
{
  "doc": {
    "price": 1900000
  }
}

# 문서 삭제
DELETE /products/_doc/1

# 인덱스 삭제
DELETE /products

복사
4.6 검색 쿼리 DSL
// Match Query (전문 검색)
{
  "query": {
    "match": {
      "description": "바이브코딩 강의"
    }
  }
}

// Term Query (정확한 일치)
{
  "query": {
    "term": {
      "category": "laptop"
    }
  }
}

// Bool Query (복합 조건)
{
  "query": {
    "bool": {
      "must": [
        { "match": { "description": "노트북" } }
      ],
      "filter": [
        { "range": { "price": { "gte": 1000000, "lte": 2000000 } } },
        { "term": { "category": "laptop" } }
      ],
      "should": [
        { "match": { "name": "맥북" } }
      ],
      "must_not": [
        { "term": { "status": "discontinued" } }
      ]
    }
  }
}

// Range Query (범위)
{
  "query": {
    "range": {
      "price": {
        "gte": 1000000,
        "lte": 2000000
      }
    }
  }
}

// Multi-match (여러 필드 검색)
{
  "query": {
    "multi_match": {
      "query": "노트북",
      "fields": ["name^2", "description"]  // name에 2배 가중치
    }
  }
}

// Fuzzy Query (오타 허용)
{
  "query": {
    "fuzzy": {
      "name": {
        "value": "맥북",
        "fuzziness": "AUTO"
      }
    }
  }
}

복사
4.7 집계 (Aggregations)
// 집계 쿼리
{
  "size": 0,  // 문서는 반환하지 않음
  "aggs": {
    // 카테고리별 개수
    "categories": {
      "terms": {
        "field": "category"
      }
    },
    // 가격 통계
    "price_stats": {
      "stats": {
        "field": "price"
      }
    },
    // 가격대별 히스토그램
    "price_histogram": {
      "histogram": {
        "field": "price",
        "interval": 500000
      }
    },
    // 날짜별 집계
    "sales_over_time": {
      "date_histogram": {
        "field": "created_at",
        "calendar_interval": "month"
      }
    }
  }
}

복사
5. Node.js에서 Elasticsearch 사용
5.1 클라이언트 설치
npm install @elastic/elasticsearch

복사
5.2 기본 사용법
// lib/elasticsearch.ts
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USER || 'elastic',
    password: process.env.ELASTICSEARCH_PASSWORD || ''
  }
});

export default client;

복사
// services/searchService.ts
import client from '@/lib/elasticsearch';

interface Product {
  name: string;
  price: number;
  description: string;
  category: string;
}

// 인덱스 생성
export async function createProductIndex() {
  const exists = await client.indices.exists({ index: 'products' });

  if (!exists) {
    await client.indices.create({
      index: 'products',
      body: {
        settings: {
          analysis: {
            analyzer: {
              korean: {
                type: 'custom',
                tokenizer: 'nori_tokenizer'  // 한국어 형태소 분석
              }
            }
          }
        },
        mappings: {
          properties: {
            name: { type: 'text', analyzer: 'korean' },
            price: { type: 'integer' },
            description: { type: 'text', analyzer: 'korean' },
            category: { type: 'keyword' }
          }
        }
      }
    });
  }
}

// 문서 색인
export async function indexProduct(id: string, product: Product) {
  await client.index({
    index: 'products',
    id,
    body: product,
    refresh: true  // 즉시 검색 가능하도록
  });
}

// 검색
export async function searchProducts(query: string, filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const must: any[] = [];
  const filter: any[] = [];

  // 전문 검색
  if (query) {
    must.push({
      multi_match: {
        query,
        fields: ['name^2', 'description'],
        fuzziness: 'AUTO'
      }
    });
  }

  // 필터
  if (filters?.category) {
    filter.push({ term: { category: filters.category } });
  }

  if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
    filter.push({
      range: {
        price: {
          ...(filters?.minPrice !== undefined && { gte: filters.minPrice }),
          ...(filters?.maxPrice !== undefined && { lte: filters.maxPrice })
        }
      }
    });
  }

  const result = await client.search({
    index: 'products',
    body: {
      query: {
        bool: {
          must: must.length > 0 ? must : [{ match_all: {} }],
          filter
        }
      },
      highlight: {
        fields: {
          name: {},
          description: {}
        }
      }
    }
  });

  return result.hits.hits.map(hit => ({
    id: hit._id,
    score: hit._score,
    ...hit._source as Product,
    highlights: hit.highlight
  }));
}

// 자동완성
export async function autocomplete(prefix: string) {
  const result = await client.search({
    index: 'products',
    body: {
      query: {
        match_phrase_prefix: {
          name: prefix
        }
      },
      _source: ['name'],
      size: 5
    }
  });

  return result.hits.hits.map(hit => (hit._source as { name: string }).name);
}

복사
6. 언제 무엇을 사용할까?
6.1 선택 가이드
┌─────────────────────────────────────────────────────────┐
│                    데이터베이스 선택                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   PostgreSQL (RDB) 선택:                                │
│   ✓ 복잡한 관계가 있는 데이터                           │
│   ✓ 트랜잭션이 중요한 경우 (금융, 결제)                 │
│   ✓ 데이터 무결성이 최우선                              │
│   ✓ 복잡한 JOIN 쿼리가 필요                             │
│   ✓ 정형화된 데이터 구조                                │
│                                                         │
│   MongoDB 선택:                                         │
│   ✓ 유연한 스키마가 필요                                │
│   ✓ 빠른 개발 속도                                      │
│   ✓ 문서 단위의 데이터 (블로그, CMS)                    │
│   ✓ 수평 확장이 필요                                    │
│   ✓ 지리공간 데이터                                     │
│                                                         │
│   Elasticsearch 선택:                                   │
│   ✓ 전문 검색 (Full-text Search)                       │
│   ✓ 로그/이벤트 분석                                    │
│   ✓ 실시간 데이터 분석                                  │
│   ✓ 검색 자동완성                                       │
│   ✓ 분석 대시보드                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
6.2 하이브리드 아키텍처
실제 서비스에서는 여러 데이터베이스를 조합해서 사용:

┌─────────────────────────────────────────────────────────┐
│                    E-Commerce 예시                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   사용자/주문 데이터                                     │
│   └── PostgreSQL (관계형, 트랜잭션)                     │
│                                                         │
│   상품 카탈로그                                          │
│   └── MongoDB (유연한 속성, 빈번한 변경)                 │
│                                                         │
│   상품 검색                                              │
│   └── Elasticsearch (전문 검색, 필터링)                  │
│                                                         │
│   세션/캐시                                              │
│   └── Redis (인메모리, 빠른 접근)                        │
│                                                         │
└─────────────────────────────────────────────────────────┘

데이터 동기화:
PostgreSQL/MongoDB → (Change Data Capture) → Elasticsearch

클릭하여 복사
복사
7. 실습: 상품 검색 시스템
7.1 프로젝트 구조
product-search/
├── lib/
│   ├── mongodb.ts
│   └── elasticsearch.ts
├── services/
│   ├── productService.ts    # MongoDB CRUD
│   └── searchService.ts     # Elasticsearch 검색
├── app/
│   └── api/
│       ├── products/
│       │   └── route.ts
│       └── search/
│           └── route.ts
└── scripts/
    └── sync.ts              # 데이터 동기화

클릭하여 복사
복사
7.2 상품 서비스 (MongoDB)
// services/productService.ts
import { ObjectId } from 'mongodb';
import { getCollection } from '@/lib/mongodb';
import { indexProduct, deleteProduct } from './searchService';

interface Product {
  _id?: ObjectId;
  name: string;
  price: number;
  description: string;
  category: string;
  createdAt: Date;
}

export async function createProduct(data: Omit<Product, '_id' | 'createdAt'>) {
  const products = await getCollection<Product>('products');

  const result = await products.insertOne({
    ...data,
    createdAt: new Date()
  });

  // Elasticsearch에도 색인
  const product = await products.findOne({ _id: result.insertedId });
  if (product) {
    await indexProduct(result.insertedId.toString(), {
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category
    });
  }

  return result.insertedId;
}

export async function updateProduct(id: string, data: Partial<Product>) {
  const products = await getCollection<Product>('products');

  await products.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );

  // Elasticsearch 재색인
  const product = await products.findOne({ _id: new ObjectId(id) });
  if (product) {
    await indexProduct(id, {
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category
    });
  }
}

복사
7.3 검색 API
// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { searchProducts, autocomplete } from '@/services/searchService';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || undefined;
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const type = searchParams.get('type');  // 'search' | 'autocomplete'

  try {
    if (type === 'autocomplete') {
      const suggestions = await autocomplete(query);
      return NextResponse.json({ suggestions });
    }

    const results = await searchProducts(query, {
      category,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('검색 오류:', error);
    return NextResponse.json(
      { error: '검색 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

복사
정리
핵심 포인트

RDB vs NoSQL

RDB: 정형 데이터, 복잡한 관계, ACID 트랜잭션
NoSQL: 유연한 스키마, 수평 확장, 빠른 개발

MongoDB

문서 기반 NoSQL 데이터베이스
JSON과 유사한 BSON 형식
유연한 스키마로 빠른 개발 가능

Elasticsearch

분산형 검색/분석 엔진
역색인으로 빠른 전문 검색
로그 분석, 실시간 검색에 적합

실무에서는 하이브리드

각 DB의 장점을 조합
데이터 동기화 전략 필요
다음 단계
9회차에서는 인증(OAuth, JWT)과 AI API 연동을 배웁니다