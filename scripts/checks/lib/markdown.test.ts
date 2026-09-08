import { describe, expect, it } from 'vitest';
import {
  extractAstroHeadingIds,
  extractAstroHrefs,
  extractGlossaryTerms,
  extractMarkdownHeadings,
  extractMarkdownImages,
  extractMarkdownLinks,
  markdownHeadingIds,
  stripCodeFences
} from './markdown.ts';
import { fixtureSource } from '../test-fixtures/helpers.ts';

describe('stripCodeFences', () => {
  it('清空围栏内容但保留行数', () => {
    const text = 'a\n```md\n[死链](/blog/x)\n```\nb';
    const blanked = stripCodeFences(text);
    expect(blanked.text.split('\n')).toHaveLength(5);
    expect(blanked.text).not.toContain('/blog/x');
    expect(blanked.text.split('\n')[0]).toBe('a');
    expect(blanked.text.split('\n')[4]).toBe('b');
  });
});

describe('extractMarkdownLinks', () => {
  it('提取链接并给出正确行号，跳过图片与代码块', () => {
    const file = fixtureSource(
      'fixture/links.mdx',
      [
        '---',
        'title: T',
        '---',
        '',
        '[外链](https://example.com) 与 [内链](/blog/a)',
        '![图片](/img.png)',
        '```md',
        '[示例](/blog/fenced)',
        '```',
        '[带标题](/blog/b "标题")'
      ].join('\n')
    );
    const links = extractMarkdownLinks(file);
    expect(links).toEqual([
      { value: 'https://example.com', line: 5 },
      { value: '/blog/a', line: 5 },
      { value: '/blog/b', line: 10 }
    ]);
  });
});

describe('extractMarkdownImages', () => {
  it('只提取图片语法', () => {
    const file = fixtureSource(
      'fixture/imgs.mdx',
      '![第一张](/a.png)\n[链接不是图](/blog/x)\n![第二张](/b.png)'
    );
    expect(extractMarkdownImages(file)).toEqual([
      { value: '/a.png', line: 1 },
      { value: '/b.png', line: 3 }
    ]);
  });
});

describe('extractMarkdownHeadings', () => {
  it('生成与 rehype-slug 一致风格的 slug（中文与英文）', () => {
    const file = fixtureSource(
      'fixture/headings.mdx',
      '## 已知章节\n### Another Section\n## 重复\n## 重复!'
    );
    expect(extractMarkdownHeadings(file)).toEqual([
      '已知章节',
      'another-section',
      '重复',
      '重复'
    ]);
  });

  it('重复标题生成 -1 后缀 id', () => {
    const file = fixtureSource('fixture/dup.mdx', '## A\n## A');
    expect(markdownHeadingIds(file)).toEqual(
      new Set(['a', 'a-1'])
    );
  });

  it('代码块内的 # 行不算标题', () => {
    const file = fixtureSource(
      'fixture/fence-heading.mdx',
      '```\n## 不是标题\n```\n## 是标题'
    );
    expect(extractMarkdownHeadings(file)).toEqual(['是标题']);
  });
});

describe('extractAstroHrefs', () => {
  it('提取静态 href，跳过含模板插值的行', () => {
    const file = fixtureSource(
      'fixture/page.astro',
      [
        '<a href="/blog">静态</a>',
        '<a href={`/blog/${slug}`}>模板</a>',
        '<a href="#section">锚点</a>'
      ].join('\n')
    );
    expect(extractAstroHrefs(file)).toEqual([
      { value: '/blog', line: 1 },
      { value: '#section', line: 3 }
    ]);
  });
});

describe('extractAstroHeadingIds', () => {
  it('收集 id="..." 字面量', () => {
    const file = fixtureSource(
      'fixture/ids.astro',
      '<section id="phase1"></section>\n<div id={`x${y}`}></div>\n<main id="main-content"></main>'
    );
    expect(extractAstroHeadingIds(file)).toEqual(
      new Set(['phase1', 'main-content'])
    );
  });
});

describe('extractGlossaryTerms', () => {
  it('mdx 跳过代码块内的组件示例，astro 原样提取', () => {
    const mdx = fixtureSource(
      'fixture/glossary.mdx',
      '<GlossaryTerm term="DeFi" /> 在正文中。\n```md\n<GlossaryTerm term="FakeInFence" />\n```'
    );
    expect(extractGlossaryTerms(mdx)).toEqual([{ value: 'DeFi', line: 1 }]);

    const astro = fixtureSource(
      'fixture/glossary.astro',
      '<GlossaryTerm term="UTXO" class="x" />'
    );
    expect(extractGlossaryTerms(astro)).toEqual([{ value: 'UTXO', line: 1 }]);
  });
});
