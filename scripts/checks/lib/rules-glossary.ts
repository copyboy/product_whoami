import { extractGlossaryTerms } from './markdown.ts';
import type { Finding, SourceFile } from './types.ts';

export function checkGlossaryClosure(
  files: SourceFile[],
  dictionary: Readonly<Record<string, string>>
): Finding[] {
  const findings: Finding[] = [];

  for (const file of files) {
    for (const ref of extractGlossaryTerms(file)) {
      const term = ref.value.trim();
      if (term === '') continue;
      if (!(term in dictionary)) {
        findings.push({
          file: file.path,
          line: ref.line,
          rule: 'glossary/dangling-term',
          message: `<GlossaryTerm term="${term}"> 未在 src/data/glossary.ts 词典注册`
        });
      }
    }
  }

  return findings;
}
