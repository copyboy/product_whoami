import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { checkGlossaryClosure } from './rules-glossary.ts';
import { glossaryDefinitions } from '../../../src/data/glossary.ts';
import { fixtureSource } from '../test-fixtures/helpers.ts';
import { formatFinding } from './types.ts';

describe('checkGlossaryClosure', () => {
  const dictionary = { DeFi: '定义', UTXO: '定义' };

  it('悬空 term 报出文件与行号', () => {
    const file = fixtureSource(
      'fixture/glossary-dangling.mdx',
      '正文 <GlossaryTerm term="DeFi" /> 合法。\n悬空 <GlossaryTerm term="NoSuchTerm" /> 报错。'
    );
    const findings = checkGlossaryClosure([file], dictionary);
    expect(findings).toHaveLength(1);
    expect(findings[0].file).toBe('fixture/glossary-dangling.mdx');
    expect(findings[0].line).toBe(2);
    expect(findings[0].rule).toBe('glossary/dangling-term');
    expect(findings[0].message).toContain('NoSuchTerm');
    expect(formatFinding(findings[0])).toBe(
      'fixture/glossary-dangling.mdx:2: glossary/dangling-term: <GlossaryTerm term="NoSuchTerm"> 未在 src/data/glossary.ts 词典注册'
    );
  });

  it('代码块内的组件示例不参与检查', () => {
    const file = fixtureSource(
      'fixture/glossary-fenced.mdx',
      '```md\n<GlossaryTerm term="NotRegistered" />\n```'
    );
    expect(checkGlossaryClosure([file], dictionary)).toEqual([]);
  });
});

describe('glossary 词典数据（GlossaryTerm.astro 抽取等价断言）', () => {
  it('词条数与键唯一性', () => {
    const keys = Object.keys(glossaryDefinitions);
    expect(keys.length).toBe(88);
    expect(new Set(keys).size).toBe(keys.length);
    for (const [key, value] of Object.entries(glossaryDefinitions)) {
      expect(key.length).toBeGreaterThan(0);
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    }
  });

  it('与抽取前内联词典逐键等价（规范化 JSON sha256 校验）', () => {
    const sorted: Record<string, string> = {};
    for (const key of Object.keys(glossaryDefinitions).sort()) {
      sorted[key] = glossaryDefinitions[key];
    }
    const normalized = JSON.stringify(sorted);
    const hash = createHash('sha256').update(normalized).digest('hex');
    expect(hash).toBe(
      'be0eb32d027177955d0a0b1569461a8d75e7fe45c5dffabe78a68b261c6f8559'
    );
  });

  it('特殊形态键（中文、含空格、含点号）保留完整', () => {
    expect(glossaryDefinitions['字节码']).toContain('EVM');
    expect(glossaryDefinitions['Account Abstraction']).toContain('ERC-4337');
    expect(glossaryDefinitions['EIP1559']).toContain('1559');
  });
});
