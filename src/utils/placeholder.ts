// 根据标签和标题生成智能占位符
export interface PlaceholderConfig {
  gradient: string;
  icon: string;
  label: string;
}

// 渐变色配置
const gradients = [
  'from-blue-500 to-purple-600',      // 蓝紫渐变
  'from-green-500 to-teal-600',       // 绿青渐变  
  'from-orange-500 to-red-600',       // 橙红渐变
  'from-pink-500 to-rose-600',        // 粉红渐变
  'from-indigo-500 to-blue-600',      // 靛蓝渐变
  'from-purple-500 to-indigo-600',    // 紫靛渐变
  'from-teal-500 to-green-600',       // 青绿渐变
  'from-yellow-500 to-orange-600',    // 黄橙渐变
  'from-cyan-500 to-blue-600',        // 青蓝渐变
  'from-emerald-500 to-teal-600',     // 翠绿渐变
];

// 标签到图标和渐变的映射
const tagMappings: Record<string, { icon: string; gradient: string; label: string }> = {
  // 技术栈
  'astro': { icon: 'rocket', gradient: 'from-orange-500 to-red-600', label: 'Astro框架' },
  'react': { icon: 'component', gradient: 'from-blue-500 to-cyan-600', label: 'React应用' },
  'typescript': { icon: 'code', gradient: 'from-blue-600 to-indigo-700', label: 'TypeScript' },
  'javascript': { icon: 'code', gradient: 'from-yellow-500 to-orange-600', label: 'JavaScript' },
  'tailwind css': { icon: 'palette', gradient: 'from-teal-500 to-blue-600', label: 'TailwindCSS' },
  'tailwind-css': { icon: 'palette', gradient: 'from-teal-500 to-blue-600', label: 'TailwindCSS' },
  
  // 内容类型
  'blog': { icon: 'document-text', gradient: 'from-green-500 to-teal-600', label: '博客文章' },
  'tutorial': { icon: 'academic-cap', gradient: 'from-purple-500 to-indigo-600', label: '教程指南' },
  'guide': { icon: 'map', gradient: 'from-emerald-500 to-green-600', label: '使用指南' },
  'documentation': { icon: 'book-open', gradient: 'from-blue-500 to-purple-600', label: '技术文档' },
  
  // 部署相关
  'cloudflare': { icon: 'cloud', gradient: 'from-orange-500 to-yellow-500', label: 'Cloudflare' },
  'deployment': { icon: 'server', gradient: 'from-indigo-500 to-purple-600', label: '部署配置' },
  '部署': { icon: 'server', gradient: 'from-indigo-500 to-purple-600', label: '部署配置' },
  '静态网站': { icon: 'globe-alt', gradient: 'from-green-500 to-blue-600', label: '静态网站' },
  '域名配置': { icon: 'link', gradient: 'from-purple-500 to-pink-600', label: '域名配置' },
  '性能优化': { icon: 'lightning-bolt', gradient: 'from-yellow-500 to-red-600', label: '性能优化' },
  
  // 默认分类
  'project': { icon: 'collection', gradient: 'from-gray-500 to-slate-600', label: '项目展示' },
  'article': { icon: 'document', gradient: 'from-slate-500 to-gray-600', label: '技术文章' },
};

// 字符串哈希函数
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  return Math.abs(hash);
}

// 根据标签和标题生成占位符配置
export function generatePlaceholder(tags: string[], title: string): PlaceholderConfig {
  // 首先尝试根据标签匹配
  for (const tag of tags) {
    const normalizedTag = tag.toLowerCase().trim();
    if (tagMappings[normalizedTag]) {
      return tagMappings[normalizedTag];
    }
  }
  
  // 如果没有匹配的标签，根据标题生成
  const titleLower = title.toLowerCase();
  
  // 检查标题中是否包含特定关键词
  for (const [key, config] of Object.entries(tagMappings)) {
    if (titleLower.includes(key)) {
      return config;
    }
  }
  
  // 根据标题哈希选择渐变色
  const hash = hashString(title);
  const gradientIndex = hash % gradients.length;
  const gradient = gradients[gradientIndex];
  
  // 根据内容类型选择默认图标
  let icon = 'document';
  let label = '技术文章';
  
  if (titleLower.includes('项目') || titleLower.includes('project')) {
    icon = 'collection';
    label = '项目展示';
  } else if (titleLower.includes('指南') || titleLower.includes('guide') || titleLower.includes('教程')) {
    icon = 'map';
    label = '指南教程';
  } else if (titleLower.includes('配置') || titleLower.includes('部署') || titleLower.includes('deploy')) {
    icon = 'cog';
    label = '配置部署';
  } else if (titleLower.includes('开发') || titleLower.includes('dev') || titleLower.includes('代码')) {
    icon = 'code';
    label = '开发技术';
  }
  
  return {
    gradient,
    icon,
    label
  };
}

// 获取图标名称映射
export const iconNames: Record<string, string> = {
  'rocket': 'rocket',
  'component': 'cube',
  'code': 'code',
  'palette': 'color-swatch',
  'document-text': 'document-text',
  'academic-cap': 'academic-cap',
  'map': 'map',
  'book-open': 'book-open',
  'cloud': 'cloud',
  'server': 'server',
  'globe-alt': 'globe-alt',
  'link': 'link',
  'lightning-bolt': 'lightning-bolt',
  'collection': 'collection',
  'document': 'document',
  'cog': 'cog',
  'cube': 'cube',
  'color-swatch': 'color-swatch',
}; 