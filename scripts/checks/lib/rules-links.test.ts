import { describe, expect, it } from 'vitest';
import { buildRouteContext } from './routes.ts';
import { checkInternalLinks, type LinkCheckContext } from './rules-links.ts';
import { markdownHeadingIds } from './markdown.ts';
import {
  fixtureSource,
  loadFixtureFiles
} from '../test-fixtures/helpers.ts';
import { formatFinding } from './types.ts';

function buildFixtureContext(files: ReturnType<typeof loadFixtureFiles>) {
  const slugs = files.map((file) => file.path.split('/').pop()!.replace(/\.mdx$/, ''));
  const routes = buildRouteContext({
    literalRoutes: ['/web3/report'],
    staticFiles: new Set<string>(),
    blogSlugs: slugs,
    nonDraftBlogCount: slugs.length,
    projectSlugs: [],
    blogTags: [],
    projectTags: [],
    blogCategories: [],
    blogSubjectsByCategory: [],
    phaseIds: []
  });
  const headingIdsByUrl = new Map<string, Set<string>>();
  for (const file of files) {
    const slug = file.path.split('/').pop()!.replace(/\.mdx$/, '');
    headingIdsByUrl.set(`/blog/${slug}`, markdownHeadingIds(file));
  }
  const ctx: LinkCheckContext = {
    routes,
    pageTextByUrl: new Map(),
    headingIdsByUrl,
    layoutIds: new Set()
  };
  return ctx;
}

describe('checkInternalLinks（fixture 目录）', () => {
  const files = loadFixtureFiles('links');
  const ctx = buildFixtureContext(files);
  const findings = checkInternalLinks(files, ctx);

  it('死链报出精确文件与行号', () => {
    const dead = findings.filter((f) => f.rule === 'links/dead-internal');
    expect(dead).toHaveLength(1);
    expect(dead[0].file).toBe('test-fixtures/links/blog-dead-link.mdx');
    expect(dead[0].line).toBe(9);
    expect(dead[0].message).toContain('/blog/does-not-exist');
    expect(formatFinding(dead[0])).toBe(
      'test-fixtures/links/blog-dead-link.mdx:9: links/dead-internal: 内链目标不存在: /blog/does-not-exist'
    );
  });

  it('跨页死锚点报出精确文件与行号', () => {
    const deadAnchor = findings.filter((f) => f.rule === 'links/dead-anchor');
    expect(deadAnchor).toHaveLength(1);
    expect(deadAnchor[0].file).toBe('test-fixtures/links/blog-dead-anchor.mdx');
    expect(deadAnchor[0].line).toBe(9);
    expect(deadAnchor[0].message).toContain('#no-such-anchor');
  });

  it('合法内链与代码块内死链不产生 finding', () => {
    const byFile = new Map(findings.map((f) => [f.file, f]));
    expect(byFile.has('test-fixtures/links/blog-ok.mdx')).toBe(false);
    expect(byFile.has('test-fixtures/links/blog-code-block.mdx')).toBe(false);
    expect(byFile.has('test-fixtures/links/target.mdx')).toBe(false);
  });

  it('外链不参与内链检查', () => {
    const file = fixtureSource(
      'fixture/external.mdx',
      '[外链](https://example.com) [邮件](mailto:a@b.c) [协议相对](//cdn.example.com/x)'
    );
    expect(checkInternalLinks([file], ctx)).toEqual([]);
  });
});

describe('checkInternalLinks（同页锚点与相对链接）', () => {
  const routes = buildRouteContext({
    literalRoutes: ['/about'],
    staticFiles: new Set<string>(),
    blogSlugs: ['foo'],
    nonDraftBlogCount: 1,
    projectSlugs: [],
    blogTags: [],
    projectTags: [],
    blogCategories: [],
    blogSubjectsByCategory: [],
    phaseIds: []
  });
  const ctx: LinkCheckContext = {
    routes,
    pageTextByUrl: new Map(),
    headingIdsByUrl: new Map(),
    layoutIds: new Set()
  };

  it('同页锚点命中标题 slug 则合法', () => {
    const file = fixtureSource(
      'fixture/self.mdx',
      '## 真实标题\n\n[跳转](#真实标题) [缺失](#nope)'
    );
    const findings = checkInternalLinks([file], ctx);
    expect(findings).toHaveLength(1);
    expect(findings[0].rule).toBe('links/dead-anchor');
    expect(findings[0].line).toBe(3);
    expect(findings[0].message).toContain('#nope');
  });

  it('相对链接按浏览器语义解析（/blog/foo 下的 ./x → /x）', () => {
    const file = fixtureSource(
      'fixture/rel.mdx',
      '[相对](./problem-solving)'
    );
    const findings = checkInternalLinks([file], ctx);
    expect(findings).toHaveLength(1);
    expect(findings[0].rule).toBe('links/dead-internal');
    expect(findings[0].message).toContain('./problem-solving');
  });

  it('astro 页面同页锚点依赖 id="..." 字面量', () => {
    const page = fixtureSource(
      'fixture/404.astro',
      '<a href="#main-content">Skip</a>\n<a href="#phase1">P1</a>\n<section id="phase1"></section>'
    );
    const findings = checkInternalLinks([page], ctx);
    expect(findings).toHaveLength(1);
    expect(findings[0].rule).toBe('links/dead-anchor');
    expect(findings[0].line).toBe(1);
    expect(findings[0].message).toContain('#main-content');
  });

  it('布局组件提供的 id 可满足同页锚点（渲染后存在于页面）', () => {
    const page = fixtureSource(
      'fixture/404-layout.astro',
      '<a href="#main-content">Skip</a>'
    );
    const ctxWithLayout: LinkCheckContext = {
      ...ctx,
      layoutIds: new Set(['main-content'])
    };
    expect(checkInternalLinks([page], ctxWithLayout)).toEqual([]);
  });

  it('跨页 astro 锚点结合目标页 id 与布局 id 校验', () => {
    const page = fixtureSource(
      'fixture/linker.astro',
      '<a href="/about">ok</a>'
    );
    const ctxWithPage: LinkCheckContext = {
      ...ctx,
      pageTextByUrl: new Map([['/about', '<section id="team"></section>']]),
      layoutIds: new Set(['main-content'])
    };
    const good = fixtureSource(
      'fixture/linker2.astro',
      '<a href="/about#team">ok</a><a href="/about#main-content">ok</a>'
    );
    const bad = fixtureSource(
      'fixture/linker3.astro',
      '<a href="/about#nope">bad</a>'
    );
    expect(checkInternalLinks([page, good], ctxWithPage)).toEqual([]);
    const findings = checkInternalLinks([bad], ctxWithPage);
    expect(findings).toHaveLength(1);
    expect(findings[0].rule).toBe('links/dead-anchor');
  });
});
