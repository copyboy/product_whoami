import type { Finding } from './types.ts';

export function countSitemapUrls(sitemapXml: string): number {
  return (sitemapXml.match(/<loc>/g) ?? []).length;
}

export function builtPagePaths(distFiles: string[]): string[] {
  return distFiles.filter((file) => file.endsWith('/index.html') || file === 'index.html');
}

export function checkSitemapReconciliation(
  sitemapXmls: string[],
  distFiles: string[]
): Finding[] {
  const locCount = sitemapXmls.reduce((sum, xml) => sum + countSitemapUrls(xml), 0);
  const pageCount = builtPagePaths(distFiles).length;
  if (locCount !== pageCount) {
    return [
      {
        file: 'dist/sitemap-*.xml',
        line: 1,
        rule: 'artifacts/sitemap-count-mismatch',
        message: `sitemap URL 数（${locCount}）与构建页面数（${pageCount}）不一致`
      }
    ];
  }
  return [];
}

export interface SearchIndexEntry {
  slug: string;
}

export function checkSearchIndexCoverage(
  entries: SearchIndexEntry[],
  nonDraftBlogSlugs: string[]
): Finding[] {
  const indexed = new Set(entries.map((entry) => entry.slug));
  const expected = new Set(nonDraftBlogSlugs);
  const missing = [...expected].filter((slug) => !indexed.has(slug)).sort();
  const extra = [...indexed].filter((slug) => !expected.has(slug)).sort();
  const findings: Finding[] = [];
  if (missing.length > 0) {
    findings.push({
      file: 'dist/api/search.json',
      line: 1,
      rule: 'artifacts/search-index-missing-posts',
      message: `search-index 缺少 ${missing.length} 篇非草稿文章: ${missing.join(', ')}`
    });
  }
  if (extra.length > 0) {
    findings.push({
      file: 'dist/api/search.json',
      line: 1,
      rule: 'artifacts/search-index-extra-posts',
      message: `search-index 含 ${extra.length} 条不存在/草稿的条目: ${extra.join(', ')}`
    });
  }
  return findings;
}

export function checkRssLatest(
  rssXml: string,
  latestSlugs: string[]
): Finding[] {
  const missing = latestSlugs.filter(
    (slug) => !rssXml.includes(`/blog/${slug}`)
  );
  if (missing.length > 0) {
    return [
      {
        file: 'dist/api/rss.xml',
        line: 1,
        rule: 'artifacts/rss-missing-latest',
        message: `RSS 缺少最新文章: ${missing.join(', ')}`
      }
    ];
  }
  return [];
}
