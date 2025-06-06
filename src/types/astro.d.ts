/**
 * Global component type definitions
 */
declare namespace Astro {
  /**
   * Article card component properties
   */
  interface ArticleCardProps {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    heroImage?: string;
    tags?: string[];
    author?: string;
    slug: string;
  }

  /**
   * Search result card component properties
   */
  interface SearchResultCardProps {
    title: string;
    description: string;
    pubDate: Date;
    slug: string;
    tags?: string[];
    author?: string;
  }

  /**
   * Theme toggle component properties
   */
  interface ThemeToggleProps {
    buttonClassName?: string;
    iconSize?: number;
  }

  /**
   * Custom event types
   */
  interface CustomEventMap {
    'theme-change': CustomEvent<{ theme: 'light' | 'dark' }>;
  }
}

/**
 * Extend Window interface to add custom events
 */
interface DocumentEventMap {
  'theme-change': CustomEvent<{ theme: 'light' | 'dark' }>;
} 