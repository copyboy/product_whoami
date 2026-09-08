import {
  extractAstroHeadingIds,
  extractAstroHrefs,
  extractMarkdownLinks,
  markdownHeadingIds
} from './markdown.ts';
import { resolveRoutePath, type RouteContext } from './routes.ts';
import type { Finding, SourceFile } from './types.ts';

export interface LinkCheckContext {
  routes: RouteContext;
  pageTextByUrl: Map<string, string>;
  headingIdsByUrl: Map<string, Set<string>>;
  layoutIds: Set<string>;
}

const SKIPPED_SCHEMES = ['http://', 'https://', 'mailto:', 'tel://'];

export function resolveAgainstFileBase(value: string, file: SourceFile): string {
  let base: string;
  const blogMatch = file.path.match(/^src\/content\/blog\/(.+)\.mdx$/);
  const projectMatch = file.path.match(/^src\/content\/projects\/(.+)\.mdx$/);
  const pagesMatch = file.path.match(/^src\/pages\/(.+)\.astro$/);
  if (blogMatch) base = `/blog/${blogMatch[1]}`;
  else if (projectMatch) base = `/projects/${projectMatch[1]}`;
  else if (pagesMatch) base = `/${pagesMatch[1].replace(/(^|\/)index$/, '$1')}`;
  else base = '/';
  try {
    return new URL(value, `https://checks.local${base}`).pathname;
  } catch {
    return value;
  }
}

export function splitAnchor(url: string): { path: string; anchor: string } {
  const hashIndex = url.indexOf('#');
  if (hashIndex === -1) return { path: url, anchor: '' };
  return { path: url.slice(0, hashIndex), anchor: url.slice(hashIndex + 1) };
}

function targetHeadingIds(
  path: string,
  ctx: LinkCheckContext
): Set<string> | null {
  const contentIds = ctx.headingIdsByUrl.get(path);
  if (contentIds) return contentIds;
  const pageText = ctx.pageTextByUrl.get(path);
  if (pageText === undefined) return null;
  const ids = extractAstroHeadingIds({ path, text: pageText });
  for (const id of ctx.layoutIds) ids.add(id);
  return ids;
}

export function checkInternalLinks(
  files: SourceFile[],
  ctx: LinkCheckContext
): Finding[] {
  const findings: Finding[] = [];

  for (const file of files) {
    const isMdx = file.path.endsWith('.mdx');
    const refs = isMdx
      ? extractMarkdownLinks(file)
      : extractAstroHrefs(file);
    const ownIds = isMdx
      ? markdownHeadingIds(file)
      : extractAstroHeadingIds(file);
    const sameFileIds = new Set(ownIds);
    if (!isMdx) {
      for (const id of ctx.layoutIds) sameFileIds.add(id);
    }

    for (const ref of refs) {
      const raw = ref.value.trim();
      if (raw === '' || raw === '#') continue;
      if (SKIPPED_SCHEMES.some((scheme) => raw.startsWith(scheme))) continue;
      if (raw.startsWith('//')) continue;

      if (raw.startsWith('#')) {
        const anchor = raw.slice(1);
        if (!sameFileIds.has(anchor)) {
          findings.push({
            file: file.path,
            line: ref.line,
            rule: 'links/dead-anchor',
            message: `同页锚点 #${anchor} 在本文件中不存在（无对应标题或 id）`
          });
        }
        continue;
      }

      const { path: rawPath, anchor } = splitAnchor(raw);
      const path = rawPath.startsWith('/')
        ? rawPath
        : resolveAgainstFileBase(rawPath, file);
      if (!path.startsWith('/')) continue;

      if (!resolveRoutePath(path, ctx.routes)) {
        findings.push({
          file: file.path,
          line: ref.line,
          rule: 'links/dead-internal',
          message: `内链目标不存在: ${raw}`
        });
        continue;
      }

      if (anchor !== '') {
        const ids =
          path === fileBaseUrl(file)
            ? sameFileIds
            : targetHeadingIds(path, ctx);
        if (ids && !ids.has(anchor)) {
          findings.push({
            file: file.path,
            line: ref.line,
            rule: 'links/dead-anchor',
            message: `锚点 #${anchor} 在目标页 ${path} 中不存在`
          });
        }
      }
    }
  }

  return findings;
}

function fileBaseUrl(file: SourceFile): string {
  const blogMatch = file.path.match(/^src\/content\/blog\/(.+)\.mdx$/);
  if (blogMatch) return `/blog/${blogMatch[1]}`;
  const projectMatch = file.path.match(/^src\/content\/projects\/(.+)\.mdx$/);
  if (projectMatch) return `/projects/${projectMatch[1]}`;
  const pagesMatch = file.path.match(/^src\/pages\/(.+)\.astro$/);
  if (pagesMatch) {
    return `/${pagesMatch[1].replace(/(^|\/)index$/, '$1')}`;
  }
  return '';
}
