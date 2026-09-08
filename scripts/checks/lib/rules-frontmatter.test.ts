import { describe, expect, it } from 'vitest';
import { checkFrontmatterRules } from './rules-frontmatter.ts';
import { parseFrontmatter } from './frontmatter.ts';
import { formatFinding } from './types.ts';

const TODAY = '2026-09-09';

function makeFile(body: string) {
  return { file: 'fixture/post.mdx', parsed: parseFrontmatter(body)! };
}

describe('checkFrontmatterRules', () => {
  it('合法 frontmatter 无 finding', () => {
    const input = makeFile(
      '---\ntitle: T\ndescription: 合法描述\npubDate: 2026-09-08\ntags: ["A"]\n---\n'
    );
    expect(checkFrontmatterRules([input], TODAY)).toEqual([]);
  });

  it('未来 pubDate 报出文件与行号', () => {
    const input = makeFile(
      '---\ntitle: T\ndescription: D\npubDate: 2026-09-10\ntags: ["A"]\n---\n'
    );
    const findings = checkFrontmatterRules([input], TODAY);
    expect(findings).toHaveLength(1);
    expect(findings[0].rule).toBe('frontmatter/future-pubDate');
    expect(findings[0].line).toBe(4);
    expect(formatFinding(findings[0])).toBe(
      'fixture/post.mdx:4: frontmatter/future-pubDate: pubDate 晚于今天（2026-09-09）: 2026-09-10'
    );
  });

  it('空 tags 报错；非空 tags 通过', () => {
    const empty = makeFile(
      '---\ntitle: T\ndescription: D\npubDate: 2026-01-01\ntags: []\n---\n'
    );
    const findings = checkFrontmatterRules([empty], TODAY);
    expect(findings).toHaveLength(1);
    expect(findings[0].rule).toBe('frontmatter/empty-tags');
    expect(findings[0].line).toBe(5);
  });

  it('缺失 tags 与空数组等效报错', () => {
    const missing = makeFile(
      '---\ntitle: T\ndescription: D\npubDate: 2026-01-01\n---\n'
    );
    const findings = checkFrontmatterRules([missing], TODAY);
    expect(findings.map((f) => f.rule)).toEqual(['frontmatter/empty-tags']);
  });

  it('空 description 报错', () => {
    const input = makeFile(
      '---\ntitle: T\ndescription: ""\npubDate: 2026-01-01\ntags: ["A"]\n---\n'
    );
    const findings = checkFrontmatterRules([input], TODAY);
    expect(findings[0].rule).toBe('frontmatter/empty-description');
    expect(findings[0].line).toBe(3);
  });

  it('301 字符 description 报 description-too-long；300 字符通过', () => {
    const long = makeFile(
      `---\ntitle: T\ndescription: "${'x'.repeat(301)}"\npubDate: 2026-01-01\ntags: ["A"]\n---\n`
    );
    const findings = checkFrontmatterRules([long], TODAY);
    expect(findings).toHaveLength(1);
    expect(findings[0].rule).toBe('frontmatter/description-too-long');
    expect(findings[0].line).toBe(3);
    expect(findings[0].message).toContain('实际 301');

    const edge = makeFile(
      `---\ntitle: T\ndescription: "${'x'.repeat(300)}"\npubDate: 2026-01-01\ntags: ["A"]\n---\n`
    );
    expect(checkFrontmatterRules([edge], TODAY)).toEqual([]);
  });

  it('非日期格式 pubDate 报 invalid-pubDate', () => {
    const input = makeFile(
      '---\ntitle: T\ndescription: D\npubDate: 昨天\ntags: ["A"]\n---\n'
    );
    const findings = checkFrontmatterRules([input], TODAY);
    expect(findings[0].rule).toBe('frontmatter/invalid-pubDate');
  });
});
