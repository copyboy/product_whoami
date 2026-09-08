import { expect, test, type Page } from '@playwright/test';

interface SearchEntry {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  categories: string[];
}

const MISSING_PATH = '/this-page-does-not-exist-playwright-smoke-9f3d';

/**
 * 冒烟错误监视器 —— 「每条路径 console 零 error」断言的边界实现（Decision
 * 记录于计划 Phase 1）：
 * - console.error（应用代码调用）与 pageerror（未捕获异常）：全量计入；
 * - 同源 >=400 响应与同源请求失败：计入（运行时级首方坏链/坏资源，比
 *   纯 console 通道更强）；
 * - 浏览器对资源加载失败的 console 噪声（"Failed to load resource"）不
 *   走 console 通道，由同源 response/requestfailed 通道精确接管；
 * - 跨域资源加载失败属于外链可达性（设计 §5 → L5 巡检范畴），冒烟不计，
 *   以保证断言确定性（不受远程 CDN 抖动影响）。
 */
class SmokeErrorMonitor {
  private readonly problems: string[] = [];

  constructor(
    private readonly page: Page,
    private readonly options: { allowedStatusPaths?: string[] } = {}
  ) {
    page.on('console', msg => {
      if (msg.type() !== 'error') return;
      if (/^Failed to load resource/.test(msg.text())) return;
      this.problems.push(`console.error: ${msg.text()}`);
    });
    page.on('pageerror', err => {
      this.problems.push(`pageerror: ${err.message}`);
    });
    page.on('response', res => {
      const allowed = this.options.allowedStatusPaths?.some(p =>
        res.url().includes(p)
      );
      if (allowed) return;
      if (this.isFirstParty(res.url()) && res.status() >= 400) {
        this.problems.push(`http ${res.status()}: ${res.url()}`);
      }
    });
    page.on('requestfailed', req => {
      if (this.isFirstParty(req.url())) {
        this.problems.push(
          `requestfailed: ${req.url()} (${
            req.failure()?.errorText ?? 'unknown'
          })`
        );
      }
    });
  }

  private isFirstParty(url: string): boolean {
    return new URL(url).origin === new URL(this.page.url()).origin;
  }

  expectClean(): void {
    expect(
      this.problems,
      '页面必须零 error（console.error / pageerror / 同源请求失败）'
    ).toEqual([]);
  }
}

async function fetchFirstEntry(request: {
  get: (url: string) => Promise<{ status: () => number; json: () => Promise<unknown> }>;
}): Promise<SearchEntry> {
  const resp = await request.get('/api/search.json');
  expect(resp.status(), '/api/search.json 必须可访问').toBe(200);
  const entries = (await resp.json()) as SearchEntry[];
  if (!entries[0]) {
    throw new Error('/api/search.json 必须至少含一篇非 draft 文章');
  }
  return entries[0];
}

test('首页返回 200 且渲染关键内容', async ({ page }) => {
  const monitor = new SmokeErrorMonitor(page);
  const resp = await page.goto('/');
  expect(resp?.status()).toBe(200);
  await expect(page.locator('h1').first()).toHaveText(/.+/);
  monitor.expectClean();
});

test('任一博客文章详情渲染且正文非空', async ({ page, request }) => {
  const monitor = new SmokeErrorMonitor(page);
  const target = await fetchFirstEntry(request);
  const resp = await page.goto(`/blog/${target.slug}`);
  expect(resp?.status()).toBe(200);
  await expect(page.locator('article h1')).toHaveText(target.title);
  await expect(page.locator('article .prose')).toHaveText(/.{80,}/);
  monitor.expectClean();
});

test('/web3/roadmap 可达且关键内容渲染', async ({ page }) => {
  const monitor = new SmokeErrorMonitor(page);
  const resp = await page.goto('/web3/roadmap');
  expect(resp?.status()).toBe(200);
  await expect(page.locator('h1')).toContainText('ROADMAP');
  await expect(page.getByText('PHASES', { exact: true })).toBeVisible();
  monitor.expectClean();
});

test('/search 输入关键词后出现结果列表', async ({ page, request }) => {
  const monitor = new SmokeErrorMonitor(page);
  const keyword = (await fetchFirstEntry(request)).title;
  const resp = await page.goto('/search');
  expect(resp?.status()).toBe(200);

  const input = page.locator('#search-input');
  await expect(input).toBeVisible();
  // React island（client:visible）水合存在竞态：水合完成前 fill 不触发
  // onChange，用 toPass 重试直至水合后的受控输入真正生效。
  await expect(async () => {
    await input.fill('');
    await input.fill(keyword);
  }).toPass();
  await expect(page.getByText(/results matching/)).toBeVisible();
  await expect(
    page.locator('a[href^="/blog/"]').filter({ hasText: /.+/ }).first()
  ).toBeVisible();
  monitor.expectClean();
});

test('任一分类页可达且列出文章', async ({ page }) => {
  const monitor = new SmokeErrorMonitor(page);
  const resp = await page.goto('/categories');
  expect(resp?.status()).toBe(200);
  const firstCategoryLink = page
    .locator('#main-content a[href^="/categories/"]')
    .first();
  const href = await firstCategoryLink.getAttribute('href');
  if (!href) {
    throw new Error('分类索引页必须存在至少一个分类链接');
  }
  const categoryResp = await page.goto(href);
  expect(categoryResp?.status()).toBe(200);
  await expect(page.locator('#main-content h1').first()).toHaveText(/.+/);
  await expect(
    page.locator('#main-content a[href^="/blog/"]').first()
  ).toBeVisible();
  monitor.expectClean();
});

test('不存在路径返回 404 状态', async ({ page }) => {
  const monitor = new SmokeErrorMonitor(page, {
    allowedStatusPaths: [MISSING_PATH],
  });
  const resp = await page.goto(MISSING_PATH);
  expect(resp?.status()).toBe(404);
  await expect(page.getByText('Page Not Found')).toBeVisible();
  monitor.expectClean();
});
