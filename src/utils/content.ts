/**
 * Extracts headings from markdown content
 * @param content - The markdown content
 * @returns An array of heading objects with depth, slug, and text
 */
export async function getHeadings(content: string) {
  // Regular expression to match markdown headings
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    headings.push({
      depth,
      slug,
      text
    });
  }

  return headings;
}

/**
 * Calculates the reading time for content
 * @param content - The text content
 * @param wordsPerMinute - Reading speed in words per minute (default: 200)
 * @returns A string representing the reading time
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200) {
  // Remove markdown syntax, code blocks, and other non-text content
  const cleanText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with just the text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // Remove images
    .replace(/#/g, '') // Remove heading markers
    .replace(/\*\*|\*|__|_/g, '') // Remove bold and italic markers
    .replace(/>\s?/g, '') // Remove blockquotes

  // Count words
  const words = cleanText.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return `${minutes} min read`;
} 