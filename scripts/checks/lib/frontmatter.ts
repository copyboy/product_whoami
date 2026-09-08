export type FrontmatterValue = string | string[] | boolean;

export interface ParsedFrontmatter {
  data: Record<string, FrontmatterValue>;
  lines: Record<string, number>;
  endLine: number;
}

const FRONTMATTER_OPEN = /^---[ \t]*\r?\n/;
const FRONTMATTER_CLOSE = /^[ \t]*---[ \t]*\r?(?:\n|$)/;

function splitFlowArray(raw: string): string[] {
  const inner = raw.trim().slice(1, -1);
  if (inner.trim() === '') return [];
  const items: string[] = [];
  let current = '';
  let quote: '"' | "'" | null = null;
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (quote) {
      if (ch === quote) {
        quote = null;
      } else {
        current += ch;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === ',') {
      items.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  items.push(current.trim());
  return items.filter((item) => item !== '').map(stripQuotes);
}

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2)
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function stripInlineComment(raw: string): string {
  let quote: '"' | "'" | null = null;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === '#' && i > 0 && /\s/.test(raw[i - 1])) {
      return raw.slice(0, i).trim();
    }
  }
  return raw.trim();
}

function parseScalar(raw: string): FrontmatterValue {
  const value = stripQuotes(raw);
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  return value;
}

export function parseFrontmatter(text: string): ParsedFrontmatter | null {
  const open = text.match(FRONTMATTER_OPEN);
  if (!open) return null;

  const lines = text.split(/\r?\n/);
  const data: Record<string, FrontmatterValue> = {};
  const lineNumbers: Record<string, number> = {};
  let endLine = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (FRONTMATTER_CLOSE.test(line)) {
      endLine = i + 1;
      break;
    }
    const match = line.match(/^([^\s:#][^:]*):\s?(.*)$/);
    if (!match) continue;
    const key = match[1].trim();
    const rawValue = match[2];
    if (rawValue.trim() === '') continue;
    const cleaned = stripInlineComment(rawValue);
    const trimmed = cleaned.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      data[key] = splitFlowArray(trimmed);
      lineNumbers[key] = i + 1;
      continue;
    }
    data[key] = parseScalar(trimmed);
    lineNumbers[key] = i + 1;
  }

  if (endLine === 0) return null;
  return { data, lines: lineNumbers, endLine };
}

export function asStringArray(value: FrontmatterValue | undefined): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') return [value];
  return [];
}

export function asString(value: FrontmatterValue | undefined): string {
  return typeof value === 'string' ? value : '';
}
