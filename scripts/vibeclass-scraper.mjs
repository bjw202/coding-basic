/**
 * vibeclass.kr Materials Scraper v4
 * - Kakao OAuth 팝업 창 처리
 * - 팝업 닫힌 후 materials 페이지로 복귀 대기
 * - "마크다운" 버튼 hover -> 링크 수집 -> 다운로드
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const SAVE_DIR = process.argv[2] || path.join(process.cwd(), 'vibeclass-materials');

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if ([301, 302, 303].includes(res.statusCode)) {
        file.close();
        try { fs.unlinkSync(destPath); } catch {}
        downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      try { fs.unlinkSync(destPath); } catch {}
      reject(err);
    });
  });
}

async function scrapeAndDownload(page, saveDir) {
  console.log('\n[스크래핑 시작] 페이지 분석 중...');
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(2000);

  // 스크린샷 저장
  await page.screenshot({ path: path.join(saveDir, '_01_materials_page.png'), fullPage: true });
  console.log('스크린샷 저장: _01_materials_page.png');

  // HTML 저장
  const html = await page.content();
  fs.writeFileSync(path.join(saveDir, '_page.html'), html);

  // "마크다운" 텍스트 포함 요소 탐색
  console.log('\n"마크다운" 버튼 탐색 중...');

  const mdElements = await page.evaluate(() => {
    const result = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const text = Array.from(el.childNodes)
        .filter(n => n.nodeType === 3)
        .map(n => n.textContent.trim())
        .join('');
      if (text.includes('마크다운')) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          result.push({
            tag: el.tagName,
            text: el.textContent.trim().substring(0, 80),
            href: el.tagName === 'A' ? el.href : '',
            className: el.className?.toString().substring(0, 100) || '',
            x: rect.x, y: rect.y,
          });
        }
      }
    }
    return result.slice(0, 30);
  });

  console.log(`"마크다운" 요소 ${mdElements.length}개 발견`);
  mdElements.forEach((el, i) => {
    console.log(`  [${i+1}] <${el.tag}> "${el.text}" href="${el.href}"`);
  });

  const collectedLinks = new Map();

  // 각 "마크다운" 요소에 hover
  for (let i = 0; i < Math.min(mdElements.length, 30); i++) {
    const elInfo = mdElements[i];
    try {
      // 좌표로 hover
      await page.mouse.move(elInfo.x + 5, elInfo.y + 5);
      await page.waitForTimeout(800);

      // hover 후 보이는 링크 수집
      const visibleLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a[href]'))
          .filter(a => {
            const r = a.getBoundingClientRect();
            return r.width > 0 && r.height > 0;
          })
          .map(a => ({ href: a.href, text: a.textContent.trim() }));
      });

      visibleLinks.forEach(l => {
        if (l.href && !collectedLinks.has(l.href)) {
          collectedLinks.set(l.href, { text: l.text, source: `hover_${i+1}` });
        }
      });

      // 직접 href가 있으면 추가
      if (elInfo.href) {
        collectedLinks.set(elInfo.href, { text: elInfo.text, source: 'direct' });
      }

      // hover 후 스크린샷 (처음 5개만)
      if (i < 5) {
        await page.screenshot({
          path: path.join(saveDir, `_hover_${i+1}.png`),
        });
      }

      // hover 해제
      await page.mouse.move(0, 0);
      await page.waitForTimeout(200);
    } catch (err) {
      console.log(`  hover ${i+1} 실패: ${err.message}`);
    }
  }

  // 전체 링크 수집
  const allLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]')).map(a => ({
      href: a.href, text: a.textContent.trim()
    }))
  );
  allLinks.forEach(l => {
    if (l.href && !collectedLinks.has(l.href)) {
      collectedLinks.set(l.href, { text: l.text, source: 'static' });
    }
  });

  // 마크다운 링크 필터
  const mdLinks = [];
  for (const [href, info] of collectedLinks) {
    const lower = href.toLowerCase();
    if (
      lower.endsWith('.md') ||
      lower.includes('.md?') ||
      lower.includes('raw.githubusercontent.com') ||
      (lower.includes('github.com') && lower.includes('/blob/'))
    ) {
      mdLinks.push({ href, ...info });
    }
  }

  console.log(`\n마크다운 링크 ${mdLinks.length}개:`);
  mdLinks.forEach((l, i) => console.log(`  [${i+1}] ${l.text || l.href}`));

  // 링크 목록 저장
  fs.writeFileSync(
    path.join(saveDir, '_links.json'),
    JSON.stringify({
      url: page.url(),
      timestamp: new Date().toISOString(),
      markdown_elements: mdElements,
      markdown_links: mdLinks,
      all_links_count: collectedLinks.size,
    }, null, 2)
  );

  if (mdLinks.length === 0) {
    console.log('\n마크다운 링크를 찾지 못했습니다.');
    console.log('_links.json 과 _hover_*.png 스크린샷을 확인하세요.');
    return;
  }

  // 다운로드
  console.log('\n파일 다운로드 중...\n');
  let ok = 0, fail = 0;

  for (const link of mdLinks) {
    const rawUrl = link.href
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/');

    let fileName;
    try {
      fileName = decodeURIComponent(path.basename(new URL(rawUrl).pathname));
    } catch {
      fileName = `material_${ok + fail + 1}.md`;
    }
    if (!fileName.endsWith('.md')) fileName += '.md';

    const destPath = path.join(saveDir, fileName);
    try {
      await downloadFile(rawUrl, destPath);
      ok++;
      console.log(`  OK  ${fileName}`);
    } catch (err) {
      fail++;
      console.log(`  ERR ${fileName}: ${err.message}`);
    }
  }

  console.log(`\n완료: ${ok}개 성공, ${fail}개 실패`);
}

async function main() {
  console.log(`\n저장 폴더: ${SAVE_DIR}`);
  fs.mkdirSync(SAVE_DIR, { recursive: true });

  let browser;
  try {
    browser = await chromium.launch({ headless: false, channel: 'chrome' });
  } catch {
    browser = await chromium.launch({ headless: false });
  }

  const context = await browser.newContext();

  // ★ 팝업 창 처리 (Kakao OAuth 팝업)
  let popupClosed = false;
  context.on('page', async (popup) => {
    const popupUrl = popup.url();
    console.log(`\n팝업 창 열림: ${popupUrl}`);
    console.log('카카오 로그인을 완료해주세요...');

    // 팝업이 닫힐 때 감지
    popup.on('close', () => {
      console.log('\n팝업 창 닫힘. 로그인 완료 확인 중...');
      popupClosed = true;
    });

    // 팝업 로드 허용 (닫지 않음)
    await popup.waitForLoadState('domcontentloaded').catch(() => {});
  });

  const page = await context.newPage();

  // 1. materials 페이지 접속
  console.log('\n[1] vibeclass.kr/materials 접속...');
  try {
    await page.goto('https://www.vibeclass.kr/materials', {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });
  } catch {
    // 리다이렉트 중이어도 계속 진행
  }

  // JS 리다이렉트 대기
  await page.waitForTimeout(3000);
  const urlAfterLoad = page.url();
  console.log(`    현재 URL: ${urlAfterLoad}`);

  // 2. 로그인 필요 여부 판단
  const onMaterials = urlAfterLoad.includes('vibeclass.kr/materials');
  if (!onMaterials) {
    console.log('\n[2] 로그인이 필요합니다.');
    console.log('    브라우저에서 카카오 로그인을 완료해주세요.');
    console.log('    (팝업 창이 열리면 그 창에서 로그인 진행)');
    console.log('    최대 5분 대기...\n');

    // materials 페이지로 복귀 대기
    try {
      await page.waitForURL('https://www.vibeclass.kr/materials*', { timeout: 300000 });
      console.log('    materials 페이지 감지됨!');
    } catch {
      // 팝업 로그인 후 수동으로 materials로 이동했을 경우
      console.log('    URL 감지 실패. 현재 페이지에서 계속...');
    }
  } else {
    // materials이지만 로그인 안 된 상태일 수 있음 - 잠깐 대기 후 다시 확인
    await page.waitForTimeout(1000);
    const urlCheck = page.url();
    if (!urlCheck.includes('vibeclass.kr/materials')) {
      console.log('\n[2] 로그인 리다이렉트 감지. 로그인을 완료해주세요...');
      await page.waitForURL('https://www.vibeclass.kr/materials*', { timeout: 300000 });
    }
  }

  // 3. 로그인 후 materials 페이지 안착
  console.log('\n[3] 자료실 페이지 로딩 중...');
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2000);

  const finalUrl = page.url();
  console.log(`    최종 URL: ${finalUrl}`);

  if (!finalUrl.includes('vibeclass.kr')) {
    console.log('예상치 못한 페이지. 수동으로 확인해주세요.');
    await page.waitForTimeout(10000);
    await browser.close();
    return;
  }

  // materials 페이지가 아니면 이동
  if (!finalUrl.includes('/materials')) {
    await page.goto('https://www.vibeclass.kr/materials', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
  }

  // 4. 스크래핑 실행
  await scrapeAndDownload(page, SAVE_DIR);

  console.log(`\n저장 위치: ${SAVE_DIR}`);
  console.log('5초 후 브라우저가 닫힙니다...');
  await page.waitForTimeout(5000);
  await browser.close();
}

main().catch(err => {
  console.error('\n오류:', err.message);
  console.error(err.stack);
  process.exit(1);
});
