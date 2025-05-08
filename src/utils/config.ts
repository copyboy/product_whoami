/**
 * Configuration Tools
 * Convenient for accessing and using configuration items in the application
 */

import originalSiteConfigFromFile from '../config/site.json'; // 重命名导入以避免混淆

// Configuration type definition
// SiteConfig 现在代表了 site.json 的完整结构
export interface SiteConfig {
  site: SiteSubConfig; // 使用下面的 SiteSubConfig
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

// site.json 中 'site' 对象的类型
export interface SiteSubConfig {
  title: string;
  description: string;
  url: string; // 这是 site.json 中的原始 URL，可能是占位符或本地开发 URL
  author: string;
  email: string;
  logo: string;
  homeTitle: string;
  homeSubtitle: string;
  blogSubtitle: string;
  projectSubtitle: string;
  brandTitle: string;
}

// getSiteConfig 函数返回的类型，包含了动态的 url 和 base
export interface DynamicSiteConfig extends SiteSubConfig {
  base: string; // 新增：动态计算的 base 路径
  // 'url' 属性将是动态计算的最终部署 URL
}


export interface NavItem {
  text: string;
  href: string;
}

/**
 * Get all configurations from site.json (original static config)
 */
export function getConfig(): SiteConfig {
  return originalSiteConfigFromFile as SiteConfig;
}

/**
 * Get site basic configuration with dynamic URL and base path.
 * This function is intended for use in astro.config.mjs and places where deployed URL/base is needed.
 * @returns {DynamicSiteConfig} Site configuration with dynamic URL and base path.
 */
export function getSiteConfig(): DynamicSiteConfig {
  const deployEnv = process.env.DEPLOY_ENV || 'LOCAL';
  // 从 GitHub Actions 环境变量中获取仓库名称和用户名
  // 请确保在 GitHub Actions workflow 中设置了这些变量，或者在此处提供默认值
  const githubRepoName = process.env.GITHUB_REPO_NAME || 'product_whoami'; // <<-- TODO: 替换为你的 GitHub demo 仓库名
  const githubActor = process.env.GITHUB_ACTOR || 'copyboy'; // <<-- TODO: 替换为你的 GitHub 用户名

  // 从 site.json 中获取基础站点配置
  const baseSiteDetails = { ...originalSiteConfigFromFile.site };

  let dynamicUrl: string;
  let dynamicBase: string;

  switch (deployEnv) {
    case 'DEMO_GITHUB_PAGES':
      // 假设 GitHub Pages 部署到 https://<username>.github.io/<repo-name>/
      // 如果你的 GitHub Pages 使用自定义域名，请相应修改 url 和 base
      dynamicUrl = `https://${githubActor}.github.io`;
      dynamicBase = `/${githubRepoName}`;
      break;
    case 'MAIN_CLOUDFLARE':
      dynamicUrl = originalSiteConfigFromFile.site.url; // <--- 修改点：直接从 site.json 读取
      dynamicBase = '/';
      break;
    default: // LOCAL or other environments
      // 对于本地开发，可以使用 site.json 中的 URL，或 Astro 的默认开发服务器地址
      dynamicUrl = originalSiteConfigFromFile.site.url || 'http://localhost:4321';
      dynamicBase = '/';
      break;
  }

  return {
    ...baseSiteDetails, // 保留 site.json 中的 title, description, author 等
    url: dynamicUrl,    // 使用动态生成的 URL
    base: dynamicBase,  // 添加动态生成的 base 路径
  };
}

/**
 * Get Giscus comment configuration (from site.json)
 */
export function getGiscusConfig() {
  return originalSiteConfigFromFile.giscus;
}

/**
 * Get SEO configuration (from site.json)
 */
export function getSeoConfig() {
  return originalSiteConfigFromFile.seo;
}

/**
 * Get social media configuration (from site.json)
 */
export function getSocialConfig() {
  return originalSiteConfigFromFile.social;
}

/**
 * Get feature switch configuration (from site.json)
 */
export function getFeaturesConfig() {
  return originalSiteConfigFromFile.features;
}

/**
 * Get navigation configuration (from site.json)
 */
export function getNavigationConfig() {
  return (originalSiteConfigFromFile as any).navigation || { header: [], footer: [] };
}

/**
 * Check if a specific feature is enabled (from site.json)
 * @param featureName Feature name
 * @returns Whether the feature is enabled
 */
export function isFeatureEnabled(featureName: keyof SiteConfig['features']): boolean {
  return originalSiteConfigFromFile.features[featureName] === true;
}

/**
 * Format page title.
 * This will use the site title from site.json (via the modified getSiteConfig).
 * @param pageTitle Page title
 * @returns Formatted complete title
 */
export function formatPageTitle(pageTitle: string): string {
  // getSiteConfig() 现在返回 DynamicSiteConfig，它包含了原始的 title
  const siteDetails = getSiteConfig();
  return `${pageTitle} | ${siteDetails.title}`;
}

export default {
  getConfig, // 返回原始 site.json 内容
  getSiteConfig, // 返回包含动态 url 和 base 的站点配置
  getGiscusConfig,
  getSeoConfig,
  getSocialConfig,
  getFeaturesConfig,
  getNavigationConfig,
  isFeatureEnabled,
  formatPageTitle
};