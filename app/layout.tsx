import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: '바이브 코딩 1개월 부트캠프',
    template: '%s - 바이브 코딩 부트캠프'
  },
  description: '1개월 만에 풀스택 웹 개발의 핵심을 배우는 부트캠프 커리큘럼'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" dir="ltr" suppressHydrationWarning>
      <Head />
      <body suppressHydrationWarning>
        <Layout
          navbar={
            <Navbar
              logo={<b>바이브 코딩 1개월 부트캠프</b>}
            />
          }
          pageMap={await getPageMap()}
          sidebar={{
            defaultMenuCollapseLevel: 1,
            autoCollapse: true
          }}
          footer={
            <Footer>
              <p>
                {new Date().getFullYear()} 바이브 코딩 부트캠프. All rights reserved.
              </p>
            </Footer>
          }
          i18n={[]}
          toc={{ title: '목차' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
