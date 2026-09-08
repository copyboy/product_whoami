import { extractAstroImgSrcs, extractMarkdownImages } from './markdown.ts';
import { asString, type ParsedFrontmatter } from './frontmatter.ts';
import type { Finding, SourceFile } from './types.ts';

export interface ImageRef {
  source: 'heroImage' | 'body';
  value: string;
  file: string;
  line: number;
}

export type RemoteStatusFetcher = (url: string) => Promise<number | null>;

export function collectImageRefs(
  contentFiles: SourceFile[],
  frontmatters: Map<string, ParsedFrontmatter>
): ImageRef[] {
  const refs: ImageRef[] = [];

  for (const file of contentFiles) {
    const frontmatter = frontmatters.get(file.path);
    if (frontmatter) {
      const heroImage = asString(frontmatter.data['heroImage']);
      if (heroImage !== '') {
        refs.push({
          source: 'heroImage',
          value: heroImage,
          file: file.path,
          line: frontmatter.lines['heroImage'] ?? 1
        });
      }
    }

    const bodyRefs = file.path.endsWith('.mdx')
      ? extractMarkdownImages(file)
      : extractAstroImgSrcs(file);
    for (const ref of bodyRefs) {
      refs.push({
        source: 'body',
        value: ref.value.trim(),
        file: file.path,
        line: ref.line
      });
    }
  }

  return refs;
}

export function checkLocalImages(
  refs: ImageRef[],
  staticFiles: Set<string>
): { findings: Finding[]; remote: ImageRef[] } {
  const findings: Finding[] = [];
  const remote: ImageRef[] = [];

  for (const ref of refs) {
    if (/^https?:\/\//i.test(ref.value)) {
      remote.push(ref);
      continue;
    }
    if (ref.value.startsWith('data:')) continue;
    if (!ref.value.startsWith('/')) {
      findings.push({
        file: ref.file,
        line: ref.line,
        rule: 'images/unresolvable-path',
        message: `图片引用不是站点绝对路径也不可解析: ${ref.value}`
      });
      continue;
    }
    if (!staticFiles.has(ref.value)) {
      findings.push({
        file: ref.file,
        line: ref.line,
        rule: 'images/local-missing',
        message: `本地图片不存在于 public/: ${ref.value}`
      });
    }
  }

  return { findings, remote };
}

export async function checkRemoteImages(
  remoteRefs: ImageRef[],
  allowlist: ReadonlySet<string>,
  fetcher: RemoteStatusFetcher
): Promise<Finding[]> {
  const findings: Finding[] = [];
  for (const ref of remoteRefs) {
    if (allowlist.has(ref.value)) continue;
    const status = await fetcher(ref.value);
    if (status === null) {
      findings.push({
        file: ref.file,
        line: ref.line,
        rule: 'images/remote-unreachable',
        message: `远程图片不可达（网络失败或非 2xx）且未列入白名单: ${ref.value}`
      });
    } else if (status < 200 || status >= 300) {
      findings.push({
        file: ref.file,
        line: ref.line,
        rule: 'images/remote-not-ok',
        message: `远程图片 HTTP 状态非 2xx（${status}）且未列入白名单: ${ref.value}`
      });
    }
  }
  return findings;
}
