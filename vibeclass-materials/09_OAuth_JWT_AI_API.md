9회차: OAuth 로그인 + JWT + AI API 연동
학습 목표
OAuth 2.0의 개념과 동작 원리 이해
NextAuth.js를 활용한 소셜 로그인 구현
JWT(JSON Web Token)의 구조와 사용법 학습
AI API(OpenAI, Gemini 등) 연동 방법 습득
1. 인증(Authentication) 기초
1.1 인증 vs 인가
┌─────────────────────────────────────────────────────────┐
│              인증(Authentication) vs 인가(Authorization)  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   인증 (Authentication) - "누구인가?"                    │
│   ┌─────────────────────────────────────────┐          │
│   │  사용자가 자신이 주장하는 사람이 맞는지 확인  │          │
│   │  예: 로그인, 비밀번호 확인, 생체 인증        │          │
│   └─────────────────────────────────────────┘          │
│                                                         │
│   인가 (Authorization) - "무엇을 할 수 있는가?"          │
│   ┌─────────────────────────────────────────┐          │
│   │  인증된 사용자가 특정 자원에 접근할 권한 확인  │          │
│   │  예: 관리자 페이지 접근, 파일 다운로드 권한    │          │
│   └─────────────────────────────────────────┘          │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
1.2 인증 방식 비교
┌─────────────────────────────────────────────────────────┐
│                     인증 방식 비교                        │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  세션 기반    │  서버에 세션 저장                        │
│              │  ✓ 서버가 상태 관리                      │
│              │  ✗ 서버 메모리 사용                      │
│              │  ✗ 수평 확장 어려움                      │
│              │                                          │
├──────────────┼──────────────────────────────────────────┤
│              │                                          │
│  토큰 기반    │  클라이언트에 토큰 저장                  │
│  (JWT)       │  ✓ 서버 무상태(Stateless)               │
│              │  ✓ 수평 확장 용이                        │
│              │  ✗ 토큰 탈취 시 위험                     │
│              │                                          │
├──────────────┼──────────────────────────────────────────┤
│              │                                          │
│  OAuth       │  제3자 인증 위임                         │
│              │  ✓ 비밀번호 관리 불필요                  │
│              │  ✓ 신뢰할 수 있는 인증                   │
│              │  ✓ 사용자 편의성                         │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘

클릭하여 복사
복사
2. OAuth 2.0 이해
2.1 OAuth란?
┌─────────────────────────────────────────────────────────┐
│                       OAuth 2.0                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  "Open Authorization"                                   │
│                                                         │
│  제3자 애플리케이션이 사용자의 자원에 접근할 수 있도록    │
│  권한을 위임하는 표준 프로토콜                           │
│                                                         │
│  예시:                                                  │
│  • "카카오로 로그인" → 카카오가 사용자 인증 수행         │
│  • "구글로 로그인" → 구글이 사용자 정보 제공             │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
2.2 OAuth 구성 요소
┌─────────────────────────────────────────────────────────┐
│                    OAuth 참여자                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Resource Owner (자원 소유자)                          │
│   └── 사용자 (카카오 회원)                              │
│                                                         │
│   Client (클라이언트)                                   │
│   └── 우리 애플리케이션 (바이브클래스)                   │
│                                                         │
│   Authorization Server (인가 서버)                      │
│   └── 인증 담당 (카카오 로그인 서버)                     │
│                                                         │
│   Resource Server (자원 서버)                           │
│   └── 사용자 정보 제공 (카카오 API)                      │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
2.3 OAuth 인증 흐름 (Authorization Code Grant)
┌─────────────────────────────────────────────────────────┐
│              OAuth 2.0 Authorization Code Flow           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  사용자          우리 앱           카카오 서버           │
│    │               │                  │                 │
│    │ ①로그인 클릭   │                  │                 │
│    │──────────────>│                  │                 │
│    │               │                  │                 │
│    │ ②카카오 로그인 페이지로 리다이렉트  │                 │
│    │<──────────────────────────────────│                 │
│    │               │                  │                 │
│    │ ③카카오 로그인 (ID/PW 입력)       │                 │
│    │──────────────────────────────────>│                 │
│    │               │                  │                 │
│    │ ④인증 코드와 함께 우리 앱으로 리다이렉트             │
│    │──────────────>│                  │                 │
│    │               │                  │                 │
│    │               │ ⑤인증 코드로 액세스 토큰 요청        │
│    │               │─────────────────>│                 │
│    │               │                  │                 │
│    │               │ ⑥액세스 토큰 발급 │                 │
│    │               │<─────────────────│                 │
│    │               │                  │                 │
│    │               │ ⑦토큰으로 사용자 정보 요청          │
│    │               │─────────────────>│                 │
│    │               │                  │                 │
│    │               │ ⑧사용자 정보 반환 │                 │
│    │               │<─────────────────│                 │
│    │               │                  │                 │
│    │ ⑨로그인 완료   │                  │                 │
│    │<──────────────│                  │                 │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
3. NextAuth.js 설정
3.1 설치
npm install next-auth

복사
3.2 기본 설정
// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    // 카카오 로그인
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),

    // 구글 로그인
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 이메일/비밀번호 로그인
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: '이메일', type: 'email' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호를 입력해주세요');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error('사용자를 찾을 수 없습니다');
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('비밀번호가 일치하지 않습니다');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  // 세션 전략 (JWT 사용)
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },

  // JWT 설정
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30일
  },

  // 콜백 함수들
  callbacks: {
    // JWT 토큰 생성/갱신 시
    async jwt({ token, user, account }) {
      // 최초 로그인 시 user 정보가 있음
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // OAuth 로그인 시 account 정보 저장
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }

      return token;
    },

    // 세션 조회 시
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },

    // OAuth 로그인 후 사용자 생성/연결
    async signIn({ user, account, profile }) {
      if (account?.provider === 'kakao' || account?.provider === 'google') {
        try {
          // 기존 사용자 확인 또는 생성
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // 새 사용자 생성
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name || '사용자',
                image: user.image,
                provider: account.provider,
                providerId: account.providerAccountId,
              },
            });
          }
        } catch (error) {
          console.error('사용자 생성 오류:', error);
          return false;
        }
      }
      return true;
    },
  },

  // 커스텀 페이지
  pages: {
    signIn: '/login',
    error: '/login',
  },

  // 비밀 키
  secret: process.env.NEXTAUTH_SECRET,
};

복사
3.3 API 라우트 설정
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

복사
3.4 타입 확장
// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      role?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role?: string;
    accessToken?: string;
    provider?: string;
  }
}

복사
3.5 환경 변수
# .env.local

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# 카카오
KAKAO_CLIENT_ID=your-kakao-rest-api-key
KAKAO_CLIENT_SECRET=your-kakao-client-secret

# 구글
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

복사
4. 로그인 UI 구현
4.1 로그인 페이지
// app/login/page.tsx
'use client';

import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 이메일/비밀번호 로그인
  async function handleCredentialsLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setErrorMessage(result.error);
      setIsLoading(false);
    } else {
      router.push(callbackUrl);
    }
  }

  // 소셜 로그인
  async function handleSocialLogin(provider: string) {
    setIsLoading(true);
    await signIn(provider, { callbackUrl });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">로그인</h2>
          <p className="mt-2 text-gray-600">계정에 로그인하세요</p>
        </div>

        {/* 에러 메시지 */}
        {(error || errorMessage) && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            {errorMessage || '로그인에 실패했습니다'}
          </div>
        )}

        {/* 소셜 로그인 버튼 */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialLogin('kakao')}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#FEE500] text-black font-medium rounded-lg
                     hover:bg-[#FDD800] transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.76 1.8 5.16 4.5 6.54-.2.72-.72 2.64-.84 3.06-.12.48.18.48.36.36.18-.06 2.64-1.8 3.72-2.52.72.12 1.5.18 2.28.18 5.52 0 10-3.48 10-7.8S17.52 3 12 3z"/>
            </svg>
            카카오로 로그인
          </button>

          <button
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-medium
                     rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google로 로그인
          </button>
        </div>

        {/* 구분선 */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        {/* 이메일 로그인 폼 */}
        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2
                       focus:ring-indigo-500 focus:border-transparent"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-3 border rounded-lg focus:ring-2
                       focus:ring-indigo-500 focus:border-transparent"
              placeholder="비밀번호"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg
                     hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="text-center text-gray-600">
          계정이 없으신가요?{' '}
          <a href="/register" className="text-indigo-600 hover:underline">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}

복사
4.2 세션 Provider
// app/providers.tsx
'use client';

import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

복사
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

복사
4.3 인증 상태 확인
// components/AuthStatus.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>로딩 중...</div>;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        로그인
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-700">
        {session.user.name || session.user.email}
      </span>
      {session.user.image && (
        <img
          src={session.user.image}
          alt="프로필"
          className="w-8 h-8 rounded-full"
        />
      )}
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        로그아웃
      </button>
    </div>
  );
}

복사
5. JWT (JSON Web Token) 이해
5.1 JWT 구조
┌─────────────────────────────────────────────────────────┐
│                      JWT 구조                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.                │
│   eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhvbmcifQ.      │
│   SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c          │
│                                                         │
│   ┌─────────────┐                                       │
│   │   Header    │  알고리즘, 토큰 타입                   │
│   │  (헤더)     │  { "alg": "HS256", "typ": "JWT" }     │
│   └─────────────┘                                       │
│         .                                               │
│   ┌─────────────┐                                       │
│   │   Payload   │  데이터 (클레임)                       │
│   │  (페이로드)  │  { "sub": "123", "name": "Hong" }    │
│   └─────────────┘                                       │
│         .                                               │
│   ┌─────────────┐                                       │
│   │  Signature  │  서명 (위변조 방지)                    │
│   │   (서명)    │  HMACSHA256(header + payload, secret)│
│   └─────────────┘                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
5.2 JWT 클레임
// JWT Payload 예시
{
  // 등록된 클레임 (Registered Claims)
  "iss": "https://vibeclass.kr",     // 발급자
  "sub": "user123",                   // 주제 (사용자 ID)
  "aud": "vibeclass-app",            // 대상
  "exp": 1735689600,                  // 만료 시간
  "iat": 1735603200,                  // 발급 시간
  "nbf": 1735603200,                  // 활성화 시간

  // 공개 클레임 (Public Claims)
  "name": "홍길동",
  "email": "hong@example.com",

  // 비공개 클레임 (Private Claims)
  "role": "admin",
  "permissions": ["read", "write"]
}

복사
5.3 JWT 생성 및 검증
// lib/jwt.ts
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

// JWT 생성
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: '7d',  // 7일
    issuer: 'vibeclass',
  });
}

// JWT 검증
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('JWT 검증 실패:', error);
    return null;
  }
}

// JWT 디코드 (검증 없이)
export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch {
    return null;
  }
}

복사
5.4 API 인증 미들웨어
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 보호된 경로
  const protectedPaths = ['/my', '/admin', '/instructor'];
  const isProtected = protectedPaths.some(path =>
    pathname.startsWith(path)
  );

  if (isProtected) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 관리자 페이지 권한 확인
    if (pathname.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/my/:path*', '/admin/:path*', '/instructor/:path*'],
};

복사
6. AI API 연동
6.1 OpenAI API
npm install openai

복사
// lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 텍스트 생성
export async function generateText(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: '당신은 친절하고 도움이 되는 AI 어시스턴트입니다.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 1000,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || '';
}

// 스트리밍 응답
export async function* streamText(prompt: string) {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'AI 어시스턴트입니다.' },
      { role: 'user', content: prompt },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}

// 임베딩 생성
export async function createEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
    dimensions: 1536,
  });

  return response.data[0].embedding;
}

// 이미지 생성
export async function generateImage(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard',
  });

  return response.data[0].url || '';
}

복사
6.2 Google Gemini API
npm install @google/generative-ai

복사
// lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 텍스트 생성
export async function generateText(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}

// 스트리밍 응답
export async function* streamText(prompt: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    yield chunk.text();
  }
}

// 이미지 분석
export async function analyzeImage(
  imageBase64: string,
  prompt: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBase64,
      },
    },
    { text: prompt },
  ]);

  const response = await result.response;
  return response.text();
}

// 채팅 (대화 이력 유지)
export async function chat(
  messages: { role: 'user' | 'model'; content: string }[]
) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const chat = model.startChat({
    history: messages.slice(0, -1).map(m => ({
      role: m.role,
      parts: [{ text: m.content }],
    })),
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);

  return result.response.text();
}

복사
6.3 AI 챗봇 API 구현
// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generateText, streamText } from '@/lib/gemini';
import { searchReports } from '@/lib/vectordb';

export async function POST(request: NextRequest) {
  // 인증 확인
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
  }

  try {
    const { message, stream = false } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '메시지를 입력해주세요' },
        { status: 400 }
      );
    }

    // RAG: 관련 문서 검색
    const relevantDocs = await searchReports(message, 3);

    // 컨텍스트 구성
    const context = relevantDocs
      .map(doc => `[${doc.topic}]\n${doc.content}`)
      .join('\n\n---\n\n');

    const prompt = `
당신은 바이브클래스의 AI 학습 도우미입니다.
다음 자료를 참고하여 학생의 질문에 친절하게 답변해주세요.

## 참고 자료
${context || '(관련 자료 없음)'}

## 학생 질문
${message}

## 답변 가이드
- 참고 자료를 기반으로 정확하게 답변하세요
- 자료에 없는 내용은 일반 지식으로 보충하되, 구분해서 안내하세요
- 코드 예시가 필요하면 포함해주세요
- 친절하고 이해하기 쉽게 설명하세요
`;

    // 스트리밍 응답
    if (stream) {
      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of streamText(prompt)) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (error) {
            controller.error(error);
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // 일반 응답
    const answer = await generateText(prompt);

    return NextResponse.json({
      answer,
      sources: relevantDocs.map(d => ({
        topic: d.topic,
        similarity: d.similarity,
      })),
    });
  } catch (error) {
    console.error('AI 응답 오류:', error);
    return NextResponse.json(
      { error: 'AI 응답 생성 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

복사
6.4 클라이언트 스트리밍 처리
// components/ChatBot.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스크롤 자동 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // 스트리밍 요청
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, stream: true }),
      });

      if (!response.ok) throw new Error('요청 실패');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      // 빈 어시스턴트 메시지 추가
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const { content } = JSON.parse(data);
              assistantMessage += content;

              // 마지막 메시지 업데이트
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: assistantMessage,
                };
                return newMessages;
              });
            } catch {}
          }
        }
      }
    } catch (error) {
      console.error('채팅 오류:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '죄송합니다. 오류가 발생했습니다.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg">
      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2
                     focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg
                     hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
}

복사
7. 보안 고려사항
7.1 API 키 관리
// ❌ 잘못된 예: 클라이언트에 API 키 노출
const apiKey = 'sk-xxx...';  // 절대 금지!

// ✅ 올바른 예: 서버 사이드에서만 사용
// .env.local (git에 커밋하지 않음)
OPENAI_API_KEY=sk-xxx...

// 서버 컴포넌트나 API Route에서만 접근
const apiKey = process.env.OPENAI_API_KEY;

복사
7.2 Rate Limiting
// lib/rateLimit.ts
import { LRUCache } from 'lru-cache';

const rateLimitCache = new LRUCache<string, number[]>({
  max: 500,
  ttl: 60 * 1000,  // 1분
});

export function rateLimit(
  key: string,
  limit: number = 10,
  window: number = 60000
): boolean {
  const now = Date.now();
  const requests = rateLimitCache.get(key) || [];

  // 윈도우 내 요청만 유지
  const validRequests = requests.filter(time => now - time < window);

  if (validRequests.length >= limit) {
    return false;  // 제한 초과
  }

  validRequests.push(now);
  rateLimitCache.set(key, validRequests);

  return true;  // 허용
}

복사
// API에서 사용
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || request.ip || 'anonymous';

  if (!rateLimit(`chat:${userId}`, 20, 60000)) {
    return NextResponse.json(
      { error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
      { status: 429 }
    );
  }

  // 정상 처리...
}

복사
7.3 입력 검증
// lib/validation.ts
import { z } from 'zod';

export const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, '메시지를 입력해주세요')
    .max(2000, '메시지가 너무 깁니다'),
  stream: z.boolean().optional().default(false),
});

// API에서 사용
const body = await request.json();
const result = chatMessageSchema.safeParse(body);

if (!result.success) {
  return NextResponse.json(
    { error: result.error.issues[0].message },
    { status: 400 }
  );
}

const { message, stream } = result.data;

복사
정리
핵심 포인트

OAuth 2.0

제3자 인증 위임 프로토콜
Authorization Code Flow가 가장 안전
NextAuth.js로 쉽게 구현 가능

JWT

무상태 인증 토큰
Header.Payload.Signature 구조
서명으로 위변조 방지

AI API 연동

서버 사이드에서만 API 키 사용
스트리밍으로 UX 개선
Rate Limiting 필수

보안

API 키는 환경변수로 관리
입력 검증 필수
Rate Limiting 적용
다음 단계
10회차에서는 Docker를 활용한 실행 환경 구성을 배웁니다