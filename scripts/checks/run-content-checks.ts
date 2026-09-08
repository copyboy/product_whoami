import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parseFrontmatter, asStringArray, type ParsedFrontmatter } from './lib/frontmatter.ts';
import { buildRouteContext } from './lib/routes.ts';
import { checkInternalLinks, type LinkCheckContext } from './lib/rules-links.ts';
import {
  checkLocalImages,
  checkRemoteImages,
  collectImageRefs,
  type RemoteStatusFetcher
} from './lib/rules-images.ts';
import { markdownHeadingIds, extractAstroHeadingIds } from './lib/markdown.ts';
import {
  checkFrontmatterRules,
  type FrontmatterCheckInput
} from './lib/rules-frontmatter.ts';
import { checkGlossaryClosure } from './lib/rules-glossary.ts';
import { glossaryDefinitions } from '../../src/data/glossary.ts';
import {
  checkRssLatest,
  checkSearchIndexCoverage,
  checkSitemapReconciliation
} from './lib/artifacts.ts';
import { asString } from './lib/frontmatter.ts';
import { formatFinding, sortFindings, type Finding, type SourceFile } from './lib/types.ts';
import type { SearchIndexEntry } from './lib/artifacts.ts';

const ROOT = resolveRepoRoot();
const CHECKS_DIR = join(ROOT, 'scripts', 'checks');
const ALLOWLIST_PATH = join(CHECKS_DIR, 'remote-image-allowlist.json');

function resolveRepoRoot(): string {
  let dir = import.meta.dirname ?? process.cwd();
  for (let i = 0; i < 6; i++) {
    if (existsSync(join(dir, 'package.json'))) return dir;
    dir = join(dir, '..');
  }
  return process.cwd();
}

function walkFiles(dir: string, exts: string[]): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walkFiles(full, exts));
    } else if (exts.some((ext) => entry.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

function toRepoRel(path: string): string {
  return relative(ROOT, path).replaceAll('\\', '/');
}

function literalRoutesFromPages(pageFiles: string[]): Set<string> {
  const routes = new Set<string>();
  for (const file of pageFiles) {
    const rel = toRepoRel(file).replace(/^src\/pages\//, '');
    if (rel.startsWith('404')) continue;
    let route = rel.replace(/\.(astro|ts|mdx|md)$/, '');
    if (route.includes('[')) {
      if (/\[\.\.\.[^\]]+\]$/.test(route)) {
        route = route.replace(/\[\.\.\.[^\]]+\]$/, '');
        const base = ('/' + route.replace(/(^|\/)index$/, '$1')).replace(/\/+$/, '');
        routes.add(base === '' ? '/' : base);
      }
      continue;
    }
    route = route.replace(/(^|\/)index$/, '$1');
    routes.add(('/' + route).replace(/\/+$/, '') || '/');
  }
  return routes;
}

function staticFilesFromPublic(): Set<string> {
  const files = walkFiles(join(ROOT, 'public'), ['']);
  return new Set(files.map((file) => '/' + toRepoRel(file).replace(/^public\//, '')));
}

interface ContentEntry {
  path: string;
  collection: 'blog' | 'projects';
  slug: string;
  source: SourceFile;
  frontmatter: ReturnType<typeof parseFrontmatter>;
}

function loadContentEntries(): ContentEntry[] {
  const entries: ContentEntry[] = [];
  for (const collection of ['blog', 'projects'] as const) {
    const files = walkFiles(join(ROOT, 'src', 'content', collection), ['.mdx']);
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      const slug = file.slice(file.lastIndexOf('/') + 1, -4);
      entries.push({
        path: toRepoRel(file),
        collection,
        slug,
        source: { path: toRepoRel(file), text },
        frontmatter: parseFrontmatter(text)
      });
    }
  }
  return entries;
}

function loadAllowlist(): Set<string> {
  if (!existsSync(ALLOWLIST_PATH)) return new Set();
  const parsed = JSON.parse(readFileSync(ALLOWLIST_PATH, 'utf8')) as {
    allowlist?: { url: string }[];
  };
  return new Set((parsed.allowlist ?? []).map((entry) => entry.url));
}

function makeRemoteFetcher(timeoutMs: number): RemoteStatusFetcher {
  return async (url) => {
    try {
      const head = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: AbortSignal.timeout(timeoutMs)
      });
      if (head.status === 405) {
        const get = await fetch(url, {
          method: 'GET',
          redirect: 'follow',
          headers: { Range: 'bytes=0-0' },
          signal: AbortSignal.timeout(timeoutMs)
        });
        return get.status;
      }
      return head.status;
    } catch {
      return null;
    }
  };
}

export function buildLinkCheckContext(
  entries: ContentEntry[],
  pageFiles: string[]
): LinkCheckContext {
  const blogEntries = entries.filter((entry) => entry.collection === 'blog');
  const projectEntries = entries.filter((entry) => entry.collection === 'projects');

  const isNonDraft = (entry: ContentEntry) =>
    entry.frontmatter?.data['draft'] !== true;

  const blogTags = new Set<string>();
  const projectTags = new Set<string>();
  const categories = new Set<string>();
  const subjectsByCategory: [string, string][] = [];

  for (const entry of blogEntries) {
    const data = entry.frontmatter?.data ?? {};
    const tags = asStringArray(data['tags']);
    if (isNonDraft(entry)) {
      tags.forEach((tag) => blogTags.add(tag));
      const cats = asStringArray(data['categories']);
      cats.forEach((category) => categories.add(category));
      const subject = typeof data['subject'] === 'string' ? data['subject'] : '';
      for (const category of cats) {
        subjectsByCategory.push([category, subject || 'General']);
      }
    }
  }
  for (const entry of projectEntries) {
    asStringArray(entry.frontmatter?.data['tags']).forEach((tag) =>
      projectTags.add(tag)
    );
  }

  const nonDraftBlogCount = blogEntries.filter(isNonDraft).length;

  let phaseIds: (string | number)[] = [];
  const roadmapPath = join(ROOT, 'src', 'data', 'web3-roadmap-data.json');
  if (existsSync(roadmapPath)) {
    const roadmap = JSON.parse(readFileSync(roadmapPath, 'utf8')) as {
      phases?: { id: number }[];
    };
    phaseIds = (roadmap.phases ?? []).map((phase) => phase.id);
  }

  const routes = buildRouteContext({
    literalRoutes: literalRoutesFromPages(pageFiles),
    staticFiles: staticFilesFromPublic(),
    blogSlugs: blogEntries.map((entry) => entry.slug),
    nonDraftBlogCount,
    projectSlugs: projectEntries.map((entry) => entry.slug),
    blogTags,
    projectTags,
    blogCategories: categories,
    blogSubjectsByCategory: subjectsByCategory,
    phaseIds
  });

  const headingIdsByUrl = new Map<string, Set<string>>();
  for (const entry of entries) {
    headingIdsByUrl.set(
      `/${entry.collection}/${entry.slug}`,
      markdownHeadingIds(entry.source)
    );
  }

  const pageTextByUrl = new Map<string, string>();
  for (const file of pageFiles) {
    const rel = toRepoRel(file);
    let route = rel.replace(/^src\/pages\//, '').replace(/\.astro$/, '');
    if (route.includes('[')) continue;
    route = route.replace(/(^|\/)index$/, '$1');
    const url = ('/' + route).replace(/\/+$/, '') || '/';
    pageTextByUrl.set(url, readFileSync(file, 'utf8'));
  }

  const layoutIds = new Set<string>();
  const layoutDir = join(ROOT, 'src', 'layouts');
  for (const file of walkFiles(layoutDir, ['.astro'])) {
    const text = readFileSync(file, 'utf8');
    for (const id of extractAstroHeadingIds({ path: toRepoRel(file), text })) {
      layoutIds.add(id);
    }
  }

  return { routes, pageTextByUrl, headingIdsByUrl, layoutIds };
}

export async function runContentChecks(options: {
  fetchRemote: boolean;
  remoteTimeoutMs: number;
  distDir?: string;
}): Promise<Finding[]> {
  const contentEntries = loadContentEntries();
  const pageFiles = walkFiles(join(ROOT, 'src', 'pages'), ['.astro']);
  const pageSources: SourceFile[] = pageFiles.map((file) => ({
    path: toRepoRel(file),
    text: readFileSync(file, 'utf8')
  }));

  const ctx = buildLinkCheckContext(contentEntries, pageFiles);

  const mdxFiles = contentEntries.map((entry) => entry.source);
  const scannedFiles = [...mdxFiles, ...pageSources];

  const frontmatters = new Map<string, ParsedFrontmatter>();
  for (const entry of contentEntries) {
    if (entry.frontmatter) {
      frontmatters.set(entry.path, entry.frontmatter);
    }
  }

  const findings: Finding[] = [];

  findings.push(...checkInternalLinks(scannedFiles, ctx));

  const imageRefs = collectImageRefs(mdxFiles, frontmatters);
  const localImageResult = checkLocalImages(imageRefs, ctx.routes.staticFiles);
  findings.push(...localImageResult.findings);

  if (options.fetchRemote) {
    const allowlist = loadAllowlist();
    findings.push(
      ...(await checkRemoteImages(
        localImageResult.remote,
        allowlist,
        makeRemoteFetcher(options.remoteTimeoutMs)
      ))
    );
  }

  const frontmatterInputs: FrontmatterCheckInput[] = contentEntries
    .filter((entry) => entry.frontmatter)
    .map((entry) => ({
      file: entry.path,
      parsed: entry.frontmatter as ParsedFrontmatter
    }));
  findings.push(
    ...checkFrontmatterRules(frontmatterInputs, new Date().toISOString().slice(0, 10))
  );

  findings.push(...checkGlossaryClosure(scannedFiles, glossaryDefinitions));

  findings.push(...checkBuildArtifacts(contentEntries, options.distDir ?? join(ROOT, 'dist')));

  return sortFindings(findings);
}

function checkBuildArtifacts(
  entries: ContentEntry[],
  distDir: string
): Finding[] {
  if (!existsSync(distDir)) {
    return [
      {
        file: 'dist/',
        line: 1,
        rule: 'artifacts/no-dist',
        message: '构建产物 dist/ 不存在——产物对账依赖 astro build 输出，请先运行 npm run build'
      }
    ];
  }

  const findings: Finding[] = [];

  const distFiles = walkFiles(distDir, ['']);
  const distRel = distFiles.map((file) => toRepoRel(file).replace(/^dist\//, ''));

  const sitemapXmls: string[] = [];
  for (const file of distRel) {
    if (/^sitemap-\d+\.xml$/.test(file)) {
      sitemapXmls.push(readFileSync(join(distDir, file), 'utf8'));
    }
  }
  findings.push(...checkSitemapReconciliation(sitemapXmls, distRel));

  const searchIndexPath = join(distDir, 'api', 'search.json');
  const nonDraftBlogSlugs = entries
    .filter(
      (entry) =>
        entry.collection === 'blog' && entry.frontmatter?.data['draft'] !== true
    )
    .map((entry) => entry.slug);
  if (existsSync(searchIndexPath)) {
    const searchEntries = JSON.parse(
      readFileSync(searchIndexPath, 'utf8')
    ) as SearchIndexEntry[];
    findings.push(
      ...checkSearchIndexCoverage(searchEntries, nonDraftBlogSlugs)
    );
  } else {
    findings.push({
      file: 'dist/api/search.json',
      line: 1,
      rule: 'artifacts/search-index-missing',
      message: 'search-index 产物不存在（dist/api/search.json）'
    });
  }

  const rssPath = join(distDir, 'api', 'rss.xml');
  if (existsSync(rssPath)) {
    const rssXml = readFileSync(rssPath, 'utf8');
    const latestSlugs = [...entries]
      .filter((entry) => entry.collection === 'blog')
      .map((entry) => ({
        slug: entry.slug,
        pubDate: Date.parse(asString(entry.frontmatter?.data['pubDate']))
      }))
      .sort((a, b) => b.pubDate - a.pubDate)
      .slice(0, 3)
      .map((entry) => entry.slug);
    findings.push(...checkRssLatest(rssXml, latestSlugs));
  } else {
    findings.push({
      file: 'dist/api/rss.xml',
      line: 1,
      rule: 'artifacts/rss-missing',
      message: 'RSS 产物不存在（dist/api/rss.xml）'
    });
  }

  return findings;
}

function parseArgs(argv: string[]): {
  fetchRemote: boolean;
  remoteTimeoutMs: number;
  distDir?: string;
} {
  const distIndex = argv.indexOf('--dist');
  return {
    fetchRemote: !argv.includes('--skip-remote-fetch'),
    remoteTimeoutMs: 5000,
    distDir:
      distIndex !== -1 && argv[distIndex + 1]
        ? join(process.cwd(), argv[distIndex + 1])
        : undefined
  };
}

async function main(): Promise<number> {
  const options = parseArgs(process.argv.slice(2));
  const findings = await runContentChecks(options);

  if (findings.length === 0) {
    console.log('content-checks: PASS（0 findings）');
    return 0;
  }
  for (const finding of findings) {
    console.log(formatFinding(finding));
  }
  console.error(`content-checks: FAIL（${findings.length} findings）`);
  return 1;
}

const isDirectRun =
  process.argv[1] !== undefined &&
  (process.argv[1].endsWith('run-content-checks.ts') ||
    process.argv[1].endsWith('run-content-checks'));

if (isDirectRun) {
  main().then((code) => process.exit(code));
}
