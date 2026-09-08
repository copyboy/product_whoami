import { describe, expect, it } from 'vitest';
import {
  asString,
  asStringArray,
  parseFrontmatter
} from './frontmatter.ts';

describe('parseFrontmatter', () => {
  it('解析标量、引号字符串与日期', () => {
    const text = [
      '---',
      'title: "带引号的标题"',
      "description: '单引号描述'",
      'pubDate: 2024-05-01',
      'draft: false',
      '---',
      ''
    ].join('\n');
    const parsed = parseFrontmatter(text);
    expect(parsed).not.toBeNull();
    expect(parsed?.data['title']).toBe('带引号的标题');
    expect(parsed?.data['description']).toBe('单引号描述');
    expect(parsed?.data['pubDate']).toBe('2024-05-01');
    expect(parsed?.data['draft']).toBe(false);
    expect(parsed?.endLine).toBe(6);
  });

  it('解析流式数组（含引号项与空格）', () => {
    const text = [
      '---',
      'tags: ["Web3", "DeFi", 中文标签]',
      'categories: [ "A" , "B" ]',
      '---',
      ''
    ].join('\n');
    const parsed = parseFrontmatter(text);
    expect(parsed?.data['tags']).toEqual(['Web3', 'DeFi', '中文标签']);
    expect(parsed?.data['categories']).toEqual(['A', 'B']);
  });

  it('记录键的行号（heroImage 在第 7 行）', () => {
    const text = [
      '---',
      'title: T',
      'description: D',
      'pubDate: 2024-01-01',
      'tags: ["A"]',
      'categories: ["C"]',
      'heroImage: "/x.png"',
      '---',
      ''
    ].join('\n');
    const parsed = parseFrontmatter(text);
    expect(parsed?.lines['heroImage']).toBe(7);
  });

  it('去除未加引号值后的行内注释，但保留引号内的 #', () => {
    const text = [
      '---',
      'slug: value # 注释',
      'title: "含 # 号的标题"',
      'tags: ["A"] # 数组后注释',
      '---',
      ''
    ].join('\n');
    const parsed = parseFrontmatter(text);
    expect(parsed?.data['slug']).toBe('value');
    expect(parsed?.data['title']).toBe('含 # 号的标题');
    expect(parsed?.data['tags']).toEqual(['A']);
  });

  it('无 frontmatter 或未闭合时返回 null', () => {
    expect(parseFrontmatter('正文，没有 frontmatter')).toBeNull();
    expect(parseFrontmatter('---\ntitle: 未闭合\n正文')).toBeNull();
  });

  it('缺失键不产生条目（用于存在性检查）', () => {
    const parsed = parseFrontmatter('---\ntitle: T\n---\n');
    expect(parsed?.data['description']).toBeUndefined();
    expect(asString(parsed?.data['description'])).toBe('');
    expect(asStringArray(parsed?.data['tags'])).toEqual([]);
  });

  it('超长 description 原样保留供长度校验', () => {
    const long = 'x'.repeat(301);
    const parsed = parseFrontmatter(`---\ndescription: "${long}"\n---\n`);
    expect(asString(parsed?.data['description'])).toHaveLength(301);
  });
});

describe('asStringArray', () => {
  it('数组原样、标量包装为单元素、缺失为空数组', () => {
    expect(asStringArray(['a', 'b'])).toEqual(['a', 'b']);
    expect(asStringArray('solo')).toEqual(['solo']);
    expect(asStringArray(undefined)).toEqual([]);
    expect(asStringArray(true)).toEqual([]);
  });
});
