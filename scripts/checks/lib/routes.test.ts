import { describe, expect, it } from 'vitest';
import { buildRouteContext, resolveRoutePath } from './routes.ts';

function makeContext() {
  return buildRouteContext({
    literalRoutes: ['/', '/about', '/web3/report', '/api/rss.xml'],
    staticFiles: ['/favicon.ico', '/chinaneighbor.png'],
    blogSlugs: ['a-post', 'b-post'],
    nonDraftBlogCount: 25,
    projectSlugs: ['chinaneighbor'],
    blogTags: ['Web3', 'DeFi', 'Web Development'],
    projectTags: ['React'],
    blogCategories: ['Tech Notes'],
    blogSubjectsByCategory: [
      ['Tech Notes', 'General'],
      ['Tech Notes', 'Block Chain']
    ],
    phaseIds: [1, 2, 3, 4, 5]
  });
}

describe('buildRouteContext', () => {
  it('按站点惯例 slugify 标签/分类/主题', () => {
    const ctx = makeContext();
    expect(ctx.tagSlugs).toEqual(
      new Set(['web3', 'defi', 'web-development', 'react'])
    );
    expect(ctx.categorySlugs).toEqual(new Set(['tech-notes']));
    expect(ctx.categorySubjectSlugs).toEqual(
      new Set(['tech-notes/general', 'tech-notes/block-chain'])
    );
  });

  it('concept 路由 = 非草稿博客标签小写；分页按 10 篇向上取整', () => {
    const ctx = makeContext();
    expect(ctx.conceptSlugs).toEqual(new Set(['web3', 'defi', 'web development']));
    expect(ctx.blogLastPage).toBe(3);
  });
});

describe('resolveRoutePath', () => {
  const ctx = makeContext();

  it('字面路由与静态文件', () => {
    expect(resolveRoutePath('/', ctx)).toBe(true);
    expect(resolveRoutePath('/about', ctx)).toBe(true);
    expect(resolveRoutePath('/web3/report', ctx)).toBe(true);
    expect(resolveRoutePath('/api/rss.xml', ctx)).toBe(true);
    expect(resolveRoutePath('/favicon.ico', ctx)).toBe(true);
    expect(resolveRoutePath('/no-such.png', ctx)).toBe(false);
  });

  it('博客详情与分页边界（2..lastPage 合法，1 与越界非法）', () => {
    expect(resolveRoutePath('/blog/a-post', ctx)).toBe(true);
    expect(resolveRoutePath('/blog/does-not-exist', ctx)).toBe(false);
    expect(resolveRoutePath('/blog/2', ctx)).toBe(true);
    expect(resolveRoutePath('/blog/3', ctx)).toBe(true);
    expect(resolveRoutePath('/blog/1', ctx)).toBe(false);
    expect(resolveRoutePath('/blog/4', ctx)).toBe(false);
    expect(resolveRoutePath('/blog/abc', ctx)).toBe(false);
  });

  it('项目 / 标签 / 分类 / 主题 / 概念 / 阶段', () => {
    expect(resolveRoutePath('/projects/chinaneighbor', ctx)).toBe(true);
    expect(resolveRoutePath('/projects/nope', ctx)).toBe(false);
    expect(resolveRoutePath('/tags/web-development', ctx)).toBe(true);
    expect(resolveRoutePath('/tags/nope', ctx)).toBe(false);
    expect(resolveRoutePath('/categories/tech-notes', ctx)).toBe(true);
    expect(resolveRoutePath('/categories/tech-notes/block-chain', ctx)).toBe(true);
    expect(resolveRoutePath('/categories/tech-notes/nope', ctx)).toBe(false);
    expect(resolveRoutePath('/web3/concept/web3', ctx)).toBe(true);
    expect(resolveRoutePath('/web3/concept/nope', ctx)).toBe(false);
    expect(resolveRoutePath('/web3/phase/3', ctx)).toBe(true);
    expect(resolveRoutePath('/web3/phase/9', ctx)).toBe(false);
  });
});
