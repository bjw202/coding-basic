/**
 * vibeclass.kr Materials Extractor
 * - 기존 로그인 세션 재사용 (persistent context)
 * - 각 자료 페이지를 Playwright로 방문해서 렌더링된 마크다운 내용 추출
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SAVE_DIR = process.argv[2] || path.join(process.cwd(), 'vibeclass-materials');
const USER_DATA_DIR = path.join(process.cwd(), '.playwright-profile');
const LINKS_FILE = path.join(SAVE_DIR, '_links.json');

// 텍스트를 마크다운으로 정리 (최소한의 변환)
function cleanContent(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function extractPageContent(page) {
  // 페이지가 완전히 로드될 때까지 대기
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);

  // 스피너가 사라질 때까지 대기 (최대 10초)
  await page.waitForFunction(
    () => !document.querySelector('.animate-spin'),
    { timeout: 10000 }
  ).catch(() => {});

  // 마크다운 콘텐츠 추출 시도 (여러 셀렉터 순서대로)
  const selectors = [
    'article',
    '[class*="prose"]',
    '[class*="markdown"]',
    '[class*="content"]',
    'main .container',
    'main > div > div',
    'main',
  ];

  for (const selector of selectors) {
    try {
      const el = await page.$(selector);
      if (el) {
        const text = await el.innerText();
        if (text && text.length > 200) {
          return { text, selector };
        }
      }
    } catch {}
  }

  // 폴백: body 전체 텍스트
  const bodyText = await page.evaluate(() => document.body.innerText);
  return { text: bodyText, selector: 'body' };
}

async function main() {
  // links.json에서 URL 목록 로드
  if (!fs.existsSync(LINKS_FILE)) {
    console.error(`_links.json 파일이 없습니다: ${LINKS_FILE}`);
    process.exit(1);
  }

  const linksData = JSON.parse(fs.readFileSync(LINKS_FILE, 'utf-8'));
  const mdLinks = linksData.markdown_links;
  console.log(`\n총 ${mdLinks.length}개 자료 페이지 추출 시작`);
  console.log(`저장 폴더: ${SAVE_DIR}\n`);

  // 기존 파일 삭제 (이전 HTML 파일들)
  const existingMd = fs.readdirSync(SAVE_DIR)
    .filter(f => f.endsWith('.md') && !f.startsWith('_'));
  console.log(`이전 파일 ${existingMd.length}개 삭제 중...`);
  existingMd.forEach(f => fs.unlinkSync(path.join(SAVE_DIR, f)));

  // persistent context로 브라우저 실행 (쿠키 유지)
  let browser;
  let context;

  if (fs.existsSync(USER_DATA_DIR)) {
    console.log('저장된 프로필 사용 (재로그인 불필요)...');
    try {
      context = await chromium.launchPersistentContext(USER_DATA_DIR, {
        headless: true, // 백그라운드로 실행
        channel: 'chrome',
      });
    } catch {
      context = await chromium.launchPersistentContext(USER_DATA_DIR, {
        headless: true,
      });
    }
  } else {
    // 새 세션 - 로그인 필요
    console.log('새 세션 - 로그인이 필요합니다...');
    try {
      context = await chromium.launchPersistentContext(USER_DATA_DIR, {
        headless: false,
        channel: 'chrome',
      });
    } catch {
      context = await chromium.launchPersistentContext(USER_DATA_DIR, {
        headless: false,
      });
    }

    const loginPage = await context.newPage();
    await loginPage.goto('https://www.vibeclass.kr/materials');
    await loginPage.waitForTimeout(2000);

    if (!loginPage.url().includes('/materials')) {
      console.log('브라우저에서 카카오 로그인을 완료해주세요...');
      await loginPage.waitForURL('**/materials**', { timeout: 300000 });
    }
    await loginPage.waitForLoadState('networkidle').catch(() => {});
    await loginPage.close();
  }

  const page = await context.newPage();
  let ok = 0, fail = 0;

  for (let i = 0; i < mdLinks.length; i++) {
    const link = mdLinks[i];
    const url = link.href;

    // 파일명 추출
    let fileName;
    try {
      fileName = decodeURIComponent(path.basename(new URL(url).pathname));
    } catch {
      fileName = `material_${i + 1}.md`;
    }
    if (!fileName.endsWith('.md')) fileName += '.md';

    const destPath = path.join(SAVE_DIR, fileName);

    process.stdout.write(`  [${i + 1}/${mdLinks.length}] ${fileName}... `);

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

      // 로그인 세션 만료 확인
      await page.waitForTimeout(500);
      const currentUrl = page.url();
      if (!currentUrl.includes('vibeclass.kr/materials')) {
        console.log(`\n로그인 세션 만료. URL: ${currentUrl}`);
        console.log('브라우저에서 다시 로그인해주세요...');
        await page.waitForURL('**/materials**', { timeout: 300000 });
      }

      const { text, selector } = await extractPageContent(page);

      if (text && text.length > 100) {
        fs.writeFileSync(destPath, text, 'utf-8');
        ok++;
        console.log(`OK (${text.length}자, ${selector})`);
      } else {
        fail++;
        console.log('SKIP (내용 없음)');
      }

    } catch (err) {
      fail++;
      console.log(`ERR: ${err.message.split('\n')[0]}`);
    }

    // 너무 빠른 요청 방지
    await page.waitForTimeout(300);
  }

  console.log(`\n완료: ${ok}개 성공, ${fail}개 실패`);
  console.log(`저장 위치: ${SAVE_DIR}`);

  // 샘플 출력
  const sampleFile = fs.readdirSync(SAVE_DIR)
    .filter(f => f.endsWith('.md') && !f.startsWith('_'))[0];
  if (sampleFile) {
    console.log(`\n=== 샘플 (${sampleFile}) ===`);
    const sample = fs.readFileSync(path.join(SAVE_DIR, sampleFile), 'utf-8');
    console.log(sample.substring(0, 500));
    console.log('...');
  }

  await context.close();
}

main().catch(err => {
  console.error('\n오류:', err.message);
  process.exit(1);
});
