import { lineOfOffset, type SourceFile } from './types.ts';
import { headingSlugSet, slugifyHeading } from './slug.ts';

export interface BlankedText {
  text: string;
}

export function stripCodeFences(text: string): BlankedText {
  const lines = text.split(/\r?\n/);
  let inside = false;
  const blanked = lines.map((line) => {
    if (/^\s*```/.test(line)) {
      inside = !inside;
      return '';
    }
    return inside ? '' : line;
  });
  return { text: blanked.join('\n') };
}

function stripInlineCode(text: string): string {
  return text.replace(/`[^`\n]*`/g, (match) => ' '.repeat(match.length));
}

export interface ExtractedRef {
  value: string;
  line: number;
}

function collectMatches(
  text: string,
  regex: RegExp,
  group: number
): ExtractedRef[] {
  const refs: ExtractedRef[] = [];
  for (const match of text.matchAll(regex)) {
    refs.push({
      value: match[group],
      line: lineOfOffset(text, match.index ?? 0)
    });
  }
  return refs;
}

const MARKDOWN_LINK = /(?<!!)\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g;
const MARKDOWN_IMAGE = /!\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g;
const ASTRO_HREF = /href="([^"]+)"/g;
const ASTRO_IMG_SRC = /<img\b[^>]*?\ssrc="([^"]+)"/g;
const ASTRO_ID = /\bid="([^"]+)"/g;
const GLOSSARY_TERM = /<GlossaryTerm\b[^>]*?\bterm="([^"]+)"/g;
const MD_HEADING = /^(#{1,6})\s+(.+?)\s*#*\s*$/;

export function extractMarkdownLinks(file: SourceFile): ExtractedRef[] {
  const { text } = stripCodeFences(file.text);
  return collectMatches(stripInlineCode(text), MARKDOWN_LINK, 2);
}

export function extractMarkdownImages(file: SourceFile): ExtractedRef[] {
  const { text } = stripCodeFences(file.text);
  return collectMatches(stripInlineCode(text), MARKDOWN_IMAGE, 2);
}

export function extractMarkdownHeadings(file: SourceFile): string[] {
  const { text } = stripCodeFences(file.text);
  const slugs: string[] = [];
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(MD_HEADING);
    if (match) slugs.push(slugifyHeading(match[2]));
  }
  return slugs;
}

export function markdownHeadingIds(file: SourceFile): Set<string> {
  return headingSlugSet(extractMarkdownHeadings(file));
}

function withoutTemplateLines(text: string): string {
  return text
    .split(/\r?\n/)
    .map((line) => (line.includes('${') ? ' '.repeat(line.length) : line))
    .join('\n');
}

export function extractAstroHrefs(file: SourceFile): ExtractedRef[] {
  const blanked = withoutTemplateLines(stripInlineCode(file.text));
  return collectMatches(blanked, ASTRO_HREF, 1);
}

export function extractAstroImgSrcs(file: SourceFile): ExtractedRef[] {
  const blanked = withoutTemplateLines(stripInlineCode(file.text));
  return collectMatches(blanked, ASTRO_IMG_SRC, 1);
}

export function extractAstroHeadingIds(file: SourceFile): Set<string> {
  return new Set(
    collectMatches(stripInlineCode(file.text), ASTRO_ID, 1).map((r) => r.value)
  );
}

export function extractGlossaryTerms(file: SourceFile): ExtractedRef[] {
  const source =
    file.path.endsWith('.mdx')
      ? stripCodeFences(file.text).text
      : file.text;
  return collectMatches(stripInlineCode(source), GLOSSARY_TERM, 1);
}
