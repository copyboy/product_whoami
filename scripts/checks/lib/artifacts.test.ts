import { describe, expect, it } from 'vitest';
import {
  builtPagePaths,
  checkRssLatest,
  checkSearchIndexCoverage,
  checkSitemapReconciliation,
  countSitemapUrls
} from './artifacts.ts';

describe('countSitemapUrls', () => {
  it('统计 <loc> 出现次数（单行 XML 亦正确）', () => {
    expect(
      countSitemapUrls(
        '<?xml version="1.0"?><urlset><url><loc>https://a/</loc></url><url><loc>https://b/</loc></url></urlset>'
      )
    ).toBe(2);
    expect(countSitemapUrls('<urlset></urlset>')).toBe(0);
  });
});

describe('checkSitemapReconciliation', () => {
  const files = ['index.html', 'about/index.html', 'blog/x/index.html'];

  it('URL 数与页面数一致则通过', () => {
    const xml = '<urlset><url><loc>a</loc></url><url><loc>b</loc></url><url><loc>c</loc></url></urlset>';
    expect(checkSitemapReconciliation([xml], files)).toEqual([]);
  });

  it('数量不一致报 artifacts/sitemap-count-mismatch', () => {
    const xml = '<urlset><url><loc>a</loc></url></urlset>';
    const findings = checkSitemapReconciliation([xml], files);
    expect(findings).toHaveLength(1);
    expect(findings[0].rule).toBe('artifacts/sitemap-count-mismatch');
    expect(findings[0].message).toContain('1');
    expect(findings[0].message).toContain('3');
  });

  it('多分片 sitemap 求和后对账', () => {
    const files = ['index.html', 'a/index.html'];
    const s1 = '<urlset><url><loc>1</loc></url></urlset>';
    const s2 = '<urlset><url><loc>2</loc></url></urlset>';
    expect(checkSitemapReconciliation([s1, s2], files)).toEqual([]);
  });

  it('builtPagePaths 只认 index.html（排除 404.html 等非目录页）', () => {
    expect(builtPagePaths(['index.html', '404.html', 'x/y/index.html'])).toEqual([
      'index.html',
      'x/y/index.html'
    ]);
  });
});

describe('checkSearchIndexCoverage', () => {
  it('slug 集合完全一致则通过（双向）', () => {
    expect(
      checkSearchIndexCoverage([{ slug: 'a' }, { slug: 'b' }], ['a', 'b'])
    ).toEqual([]);
  });

  it('缺文章与多文章分别报错并列出 slug', () => {
    const findings = checkSearchIndexCoverage([{ slug: 'a' }, { slug: 'ghost' }], ['a', 'b']);
    expect(findings.map((f) => f.rule)).toEqual([
      'artifacts/search-index-missing-posts',
      'artifacts/search-index-extra-posts'
    ]);
    expect(findings[0].message).toContain('b');
    expect(findings[1].message).toContain('ghost');
  });
});

describe('checkRssLatest', () => {
  const rss = '<rss><channel><item><link>https://s/blog/alpha</link></item><item><link>https://s/blog/beta</link></item></channel></rss>';

  it('包含最新文章则通过（子串匹配站点前缀链接）', () => {
    expect(checkRssLatest(rss, ['alpha', 'beta'])).toEqual([]);
  });

  it('缺失最新文章报 artifacts/rss-missing-latest', () => {
    const findings = checkRssLatest(rss, ['alpha', 'gamma']);
    expect(findings).toHaveLength(1);
    expect(findings[0].rule).toBe('artifacts/rss-missing-latest');
    expect(findings[0].message).toContain('gamma');
  });
});
