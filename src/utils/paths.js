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
  return import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL.slice(0, -1) + path 
    : import.meta.env.BASE_URL + path;
}

export default {
  getLink
}; 