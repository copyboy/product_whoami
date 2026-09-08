import { defineConfig, devices } from '@playwright/test';

// L4 E2E 冒烟配置（quality-system WI4）。
// 说明：config 位于仓库根而非 e2e/ 下，因 Playwright 仅从 CWD 解析
// playwright.config.ts；roadmap 完成定义要求裸 `npx playwright test`
// 入口可用，故 testDir 显式指向 e2e/（设计文档 §3 的目录示意以此为准入化）。
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'retain-on-failure',
  },
  expect: {
    timeout: 10_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // 冒烟依赖构建产物：command 串联 build + preview，保证「跑 e2e 必然先出
    // 新鲜 dist」，杜绝打到旧产物/空产物的残余风险（Decision 记录于计划）。
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321',
    timeout: 300_000,
    reuseExistingServer: !process.env.CI,
  },
});
