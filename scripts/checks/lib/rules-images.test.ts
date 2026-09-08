import { describe, expect, it, vi } from 'vitest';
import {
  checkLocalImages,
  checkRemoteImages,
  collectImageRefs,
  type ImageRef,
  type RemoteStatusFetcher
} from './rules-images.ts';
import {
  fixtureSource,
  frontmattersOf,
  loadFixture,
  loadFixtureFiles
} from '../test-fixtures/helpers.ts';

const STATIC_FILES = new Set(['/chinaneighbor.png', '/favicon.ico']);

describe('collectImageRefs + checkLocalImages（fixture 目录）', () => {
  const files = [
    ...loadFixtureFiles('images'),
    ...loadFixtureFiles('links')
  ];
  const frontmatters = frontmattersOf(files);
  const refs = collectImageRefs(files, frontmatters);
  const result = checkLocalImages(refs, STATIC_FILES);

  it('缺失的本地图报出精确文件与行号', () => {
    const missing = result.findings.filter(
      (f) => f.rule === 'images/local-missing'
    );
    expect(missing).toHaveLength(2);
    expect(missing.map((f) => `${f.file}:${f.line}`)).toEqual([
      'test-fixtures/images/body-image.mdx:11',
      'test-fixtures/images/hero-local-missing.mdx:7'
    ]);
  });

  it('存在的本地图不产生 finding', () => {
    expect(
      result.findings.some((f) => f.message.includes('chinaneighbor.png'))
    ).toBe(false);
    expect(
      result.findings.some((f) => f.message.includes('favicon.ico'))
    ).toBe(false);
  });

  it('远程引用被分流到 remote 列表等待网络检查', () => {
    const remoteValues = result.remote.map((ref) => ref.value);
    expect(remoteValues).toContain('https://images.example.com/allowlisted.png');
    expect(remoteValues).toContain(
      'https://images.example.com/allowlisted-3.png'
    );
    expect(
      result.findings.some((f) => f.rule.startsWith('images/remote'))
    ).toBe(false);
  });
});

describe('checkRemoteImages', () => {
  const refs: ImageRef[] = [
    {
      source: 'heroImage',
      value: 'https://cdn.example.com/in-allowlist.png',
      file: 'a.mdx',
      line: 3
    },
    {
      source: 'heroImage',
      value: 'https://cdn.example.com/ok.png',
      file: 'b.mdx',
      line: 4
    },
    {
      source: 'body',
      value: 'https://cdn.example.com/broken.png',
      file: 'c.mdx',
      line: 5
    },
    {
      source: 'body',
      value: 'https://cdn.example.com/offline.png',
      file: 'd.mdx',
      line: 6
    }
  ];
  const allowlist = new Set(['https://cdn.example.com/in-allowlist.png']);

  it('白名单跳过且不发起请求；200 合法；非 2xx 与网络失败分别报错', async () => {
    const fetcher = vi.fn(async (url: string) => {
      if (url.endsWith('ok.png')) return 200;
      if (url.endsWith('broken.png')) return 404;
      return null;
    }) as unknown as RemoteStatusFetcher;

    const findings = await checkRemoteImages(refs, allowlist, fetcher);

    expect(fetcher).not.toHaveBeenCalledWith(
      'https://cdn.example.com/in-allowlist.png'
    );
    expect(findings).toHaveLength(2);
    expect(findings[0]).toMatchObject({
      file: 'c.mdx',
      line: 5,
      rule: 'images/remote-not-ok'
    });
    expect(findings[1]).toMatchObject({
      file: 'd.mdx',
      line: 6,
      rule: 'images/remote-unreachable'
    });
  });

  it('全部白名单化时不发起任何网络请求（离线安全）', async () => {
    const fetcher = vi.fn(async () => 200);
    const findings = await checkRemoteImages(
      refs.slice(0, 1),
      allowlist,
      fetcher as unknown as RemoteStatusFetcher
    );
    expect(findings).toEqual([]);
    expect(fetcher).not.toHaveBeenCalled();
  });
});

describe('非绝对路径的正文图片', () => {
  it('相对路径报 images/unresolvable-path', () => {
    const files = [fixtureSource('fixture/rel-img.mdx', '![相对](./local.png)')];
    const refs = collectImageRefs(files, new Map());
    const result = checkLocalImages(refs, STATIC_FILES);
    expect(result.findings).toHaveLength(1);
    expect(result.findings[0].rule).toBe('images/unresolvable-path');
    expect(result.findings[0].line).toBe(1);
  });
});

describe('heroImage 行号来自 frontmatter', () => {
  it('缺 heroImage 的文件不产生引用', () => {
    const file = loadFixture('images/hero-local-ok.mdx');
    const refs = collectImageRefs([file], frontmattersOf([file]));
    expect(refs.filter((ref) => ref.source === 'heroImage')).toHaveLength(1);
    expect(refs[0].line).toBe(7);
  });
});
