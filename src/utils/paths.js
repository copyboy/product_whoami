/**
 * 路径处理工具
 */

/**
 * 获取完整链接路径（带基础路径）
 * @param {string} path - 链接路径（如 '/blog'）
 * @returns {string} 完整链接
 */
export function getLink(path) {
  // 确保路径以 / 开头
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  // 使用Astro的环境变量来获取基础路径
  const baseUrl = import.meta.env.BASE_URL || '/';
  return baseUrl.endsWith('/') 
    ? baseUrl.slice(0, -1) + path 
    : baseUrl + path;
}

// 确保使用ES模块导出语法
export default {
  getLink
}; 