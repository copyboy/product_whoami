export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}\s_-]/gu, '')
    .replace(/\s+/g, '-');
}

export function headingSlugSet(slugs: string[]): Set<string> {
  const seen = new Map<string, number>();
  const out = new Set<string>();
  for (const raw of slugs) {
    const count = seen.get(raw) ?? 0;
    seen.set(raw, count + 1);
    out.add(count === 0 ? raw : `${raw}-${count}`);
  }
  return out;
}
