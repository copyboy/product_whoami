import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ParsedFrontmatter } from '../lib/frontmatter.ts';
import { parseFrontmatter } from '../lib/frontmatter.ts';
import type { SourceFile } from '../lib/types.ts';

const FIXTURE_ROOT = join(process.cwd(), 'scripts', 'checks', 'test-fixtures');

export function frontmattersOf(
  files: SourceFile[]
): Map<string, ParsedFrontmatter> {
  const map = new Map<string, ParsedFrontmatter>();
  for (const file of files) {
    const parsed = parseFrontmatter(file.text);
    if (parsed) map.set(file.path, parsed);
  }
  return map;
}

export function loadFixtureFiles(rel: string): SourceFile[] {
  const dir = join(FIXTURE_ROOT, rel);
  return readdirSync(dir)
    .filter((name) => name.endsWith('.mdx'))
    .sort()
    .map((name) => ({
      path: `test-fixtures/${rel}/${name}`,
      text: readFileSync(join(dir, name), 'utf8')
    }));
}

export function loadFixture(rel: string): SourceFile {
  return {
    path: `test-fixtures/${rel}`,
    text: readFileSync(join(FIXTURE_ROOT, rel), 'utf8')
  };
}

export function fixtureSource(path: string, text: string): SourceFile {
  return { path, text };
}
