import { asString, asStringArray, type ParsedFrontmatter } from './frontmatter.ts';
import type { Finding } from './types.ts';

export const DESCRIPTION_MAX_LENGTH = 300;

export interface FrontmatterCheckInput {
  file: string;
  parsed: ParsedFrontmatter;
}

export function checkFrontmatterRules(
  inputs: FrontmatterCheckInput[],
  today: string
): Finding[] {
  const findings: Finding[] = [];

  for (const { file, parsed } of inputs) {
    const { data, lines } = parsed;

    const pubDate = asString(data['pubDate']);
    if (pubDate === '') {
      findings.push({
        file,
        line: 1,
        rule: 'frontmatter/missing-pubDate',
        message: '缺少 pubDate 字段'
      });
    } else if (!/^\d{4}-\d{2}-\d{2}(T[\d:.]+Z)?$/.test(pubDate)) {
      findings.push({
        file,
        line: lines['pubDate'] ?? 1,
        rule: 'frontmatter/invalid-pubDate',
        message: `pubDate 不是 YYYY-MM-DD 日期: ${pubDate}`
      });
    } else if (pubDate.slice(0, 10) > today) {
      findings.push({
        file,
        line: lines['pubDate'] ?? 1,
        rule: 'frontmatter/future-pubDate',
        message: `pubDate 晚于今天（${today}）: ${pubDate}`
      });
    }

    const tags = asStringArray(data['tags']);
    if (tags.length === 0) {
      findings.push({
        file,
        line: lines['tags'] ?? 1,
        rule: 'frontmatter/empty-tags',
        message: 'tags 不能为空'
      });
    }

    const description = asString(data['description']);
    const descriptionLine = lines['description'] ?? 1;
    if (description.trim() === '') {
      findings.push({
        file,
        line: descriptionLine,
        rule: 'frontmatter/empty-description',
        message: 'description 不能为空'
      });
    } else if (description.length > DESCRIPTION_MAX_LENGTH) {
      findings.push({
        file,
        line: descriptionLine,
        rule: 'frontmatter/description-too-long',
        message: `description 超过 ${DESCRIPTION_MAX_LENGTH} 字符（实际 ${description.length}）`
      });
    }
  }

  return findings;
}
