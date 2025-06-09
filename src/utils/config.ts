/**
 * Configuration Tools
 * Convenient for accessing and using configuration items in the application
 */

import siteConfig from '../config/site.json';

// Configuration type definition
export interface SiteConfig {
  site: {
    title: string;
    description: string;
    url: string;
    author: string;
    location: string;
    email: string;
    logo: string;
    homeTitle: string;
    homeSubtitle: string;
    blogSubtitle: string;
    projectSubtitle: string;
    brandTitle: string;
  };
  giscus: {
    enabled: boolean;
    repo: string;
    repoId: string;
    category: string;
    categoryId: string;
    mapping: string;
    strict: string;
    theme: string;
    reactionsEnabled: boolean;
    emitMetadata: boolean;
    inputPosition: string;
    lang: string;
    loading: string;
  };
  seo: {
    openGraph: {
      twitterCreator: string;
      defaultImageWidth: number;
      defaultImageHeight: number;
    };
    analytics: {
      googleAnalyticsId: string;
      baiduAnalyticsId: string;
    };
  };
  social: {
    twitter?: string;
    github: string;
    linkedin: string;
  };
  features: {
    darkMode: boolean;
    tableOfContents: boolean;
    readingTime: boolean;
    search: boolean;
    comments: boolean;
  };
  navigation?: {
    header: NavItem[];
    footer: NavItem[];
  };
}

export interface NavItem {
  text: string;
  href: string;
}

/**
 * Get all configurations
 */
export function getConfig(): SiteConfig {
  return siteConfig as SiteConfig;
}

/**
 * Get site basic configuration
 */
export function getSiteConfig() {
  return siteConfig.site;
}

/**
 * Get Giscus comment configuration
 */
export function getGiscusConfig() {
  return siteConfig.giscus;
}

/**
 * Get SEO configuration
 */
export function getSeoConfig() {
  return siteConfig.seo;
}

/**
 * Get social media configuration
 */
export function getSocialConfig() {
  return siteConfig.social;
}

/**
 * Get feature switch configuration
 */
export function getFeaturesConfig() {
  return siteConfig.features;
}

/**
 * Get navigation configuration
 */
export function getNavigationConfig() {
  return (siteConfig as any).navigation || { header: [], footer: [] };
}

/**
 * Check if a specific feature is enabled
 * @param featureName Feature name
 * @returns Whether the feature is enabled
 */
export function isFeatureEnabled(featureName: keyof SiteConfig['features']): boolean {
  return siteConfig.features[featureName] === true;
}

/**
 * Format page title
 * @param pageTitle Page title
 * @returns Formatted complete title
 */
export function formatPageTitle(pageTitle: string): string {
  const site = getSiteConfig();
  return `${pageTitle} | ${site.title}`;
}

export default {
  getConfig,
  getSiteConfig,
  getGiscusConfig,
  getSeoConfig,
  getSocialConfig,
  getFeaturesConfig,
  getNavigationConfig,
  isFeatureEnabled,
  formatPageTitle
}; 