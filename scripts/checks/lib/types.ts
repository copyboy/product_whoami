export interface Finding {
  file: string;
  line: number;
  rule: string;
  message: string;
}

export interface SourceFile {
  path: string;
  text: string;
}

export function formatFinding(finding: Finding): string {
  return `${finding.file}:${finding.line}: ${finding.rule}: ${finding.message}`;
}

export function sortFindings(findings: Finding[]): Finding[] {
  return [...findings].sort(
    (a, b) =>
      a.file.localeCompare(b.file) || a.line - b.line || a.rule.localeCompare(b.rule)
  );
}

export function lineOfOffset(text: string, offset: number): number {
  let line = 1;
  for (let i = 0; i < offset && i < text.length; i++) {
    if (text[i] === '\n') line++;
  }
  return line;
}
