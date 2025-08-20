import mermaid from 'mermaid';
import { useCallback, useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
  id?: string;
}

// 扩展全局事件类型
declare global {
  interface DocumentEventMap {
    'theme-change': CustomEvent<{ theme: 'light' | 'dark' }>;
  }
}

export default function MermaidDiagram({ chart, id = 'mermaid-diagram' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  // 检测当前主题
  const detectTheme = useCallback(() => {
    if (typeof window !== 'undefined') {
      const htmlElement = document.documentElement;
      // 首先检查localStorage中的主题设置
      const savedTheme = localStorage.getItem('theme');
      let isDarkMode = false;
      
      if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
      } else {
        // 如果没有保存的主题，检查DOM类名和系统偏好
        isDarkMode = htmlElement.classList.contains('dark') || 
                    htmlElement.getAttribute('data-theme') === 'dark' ||
                    window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      console.log('Mermaid: Theme detected -', {
        savedTheme,
        hasClassDark: htmlElement.classList.contains('dark'),
        dataTheme: htmlElement.getAttribute('data-theme'),
        systemPrefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
        finalIsDark: isDarkMode
      });
      
      setIsDark(isDarkMode);
      return isDarkMode;
    }
    return false;
  }, []);

  // 获取主题配置
  const getThemeConfig = useCallback((isDarkTheme: boolean) => {
    if (isDarkTheme) {
      return {
        theme: 'dark',
        themeVariables: {
          primaryColor: '#3b82f6',
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#1e40af',
          lineColor: '#6b7280',
          sectionBkgColor: '#1f2937',
          altSectionBkgColor: '#374151',
          gridColor: '#4b5563',
          secondaryColor: '#10b981',
          tertiaryColor: '#f59e0b',
          background: '#111827',
          mainBkg: '#1f2937',
          secondBkg: '#374151',
          tertiaryBkg: '#4b5563',
          // 节点样式
          cScale0: '#1f2937',
          cScale1: '#374151',
          cScale2: '#4b5563',
          // 文字颜色
          labelTextColor: '#ffffff',
          // 边框颜色
          edgeLabelBackground: '#1f2937',
          // 流程图特定
          clusterBkg: '#1f2937',
          clusterBorder: '#4b5563'
        }
      };
    } else {
      return {
        theme: 'default',
        themeVariables: {
          primaryColor: '#3b82f6',
          primaryTextColor: '#1f2937',
          primaryBorderColor: '#1e40af',
          lineColor: '#374151',
          sectionBkgColor: '#f9fafb',
          altSectionBkgColor: '#f3f4f6',
          gridColor: '#d1d5db',
          secondaryColor: '#10b981',
          tertiaryColor: '#f59e0b',
          background: '#ffffff',
          mainBkg: '#ffffff',
          secondBkg: '#f9fafb',
          tertiaryBkg: '#f3f4f6',
          // 节点样式
          cScale0: '#f9fafb',
          cScale1: '#f3f4f6',
          cScale2: '#e5e7eb',
          // 文字颜色
          labelTextColor: '#1f2937',
          // 边框颜色
          edgeLabelBackground: '#ffffff',
          // 流程图特定
          clusterBkg: '#f9fafb',
          clusterBorder: '#d1d5db'
        }
      };
    }
  }, []);

  // 渲染图表
  const renderDiagram = useCallback(async (currentTheme: boolean) => {
    if (!containerRef.current) return;

    try {
      // 重新初始化mermaid with new theme
      mermaid.initialize({
        startOnLoad: false,
        ...getThemeConfig(currentTheme)
      });

      // Generate unique ID for this diagram
      const diagramId = `${id}-${Date.now()}-${currentTheme ? 'dark' : 'light'}`;
      
      // Render the diagram
      const result = await mermaid.render(diagramId, chart);
      if (containerRef.current) {
        containerRef.current.innerHTML = result.svg;
      }
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      if (containerRef.current) {
        const errorClass = currentTheme 
          ? "text-red-400 bg-red-900/20 border-red-800" 
          : "text-red-600 bg-red-50 border-red-200";
        containerRef.current.innerHTML = `<pre class="${errorClass} p-4 rounded border">${chart}</pre>`;
      }
    }
  }, [chart, id, getThemeConfig]);

  // 初始化和主题变化监听
  useEffect(() => {
    const currentTheme = detectTheme();
    renderDiagram(currentTheme);

    // 监听自定义主题变化事件 (网站的主要主题切换方式)
    const handleThemeChange = (event: CustomEvent<{ theme: 'light' | 'dark' }>) => {
      const newTheme = event.detail.theme === 'dark';
      console.log('Mermaid: Theme change event received!', {
        eventDetail: event.detail,
        newTheme,
        currentIsDark: isDark,
        willUpdate: newTheme !== isDark
      });
      
      // 强制更新，即使状态相同也重新渲染
      setIsDark(newTheme);
      renderDiagram(newTheme);
    };

    // 监听DOM类名变化 (备用方案)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme')) {
          const newTheme = detectTheme();
          if (newTheme !== isDark) {
            setIsDark(newTheme);
            renderDiagram(newTheme);
          }
        }
      });
    });

    if (typeof window !== 'undefined') {
      // 监听自定义主题变化事件
      document.addEventListener('theme-change', handleThemeChange);
      
      // 监听document.documentElement的属性变化 (备用)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme']
      });

      // 监听系统主题变化
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleMediaChange = () => {
        const newTheme = detectTheme();
        if (newTheme !== isDark) {
          setIsDark(newTheme);
          renderDiagram(newTheme);
        }
      };
      
      mediaQuery.addEventListener('change', handleMediaChange);

      return () => {
        document.removeEventListener('theme-change', handleThemeChange);
        observer.disconnect();
        mediaQuery.removeEventListener('change', handleMediaChange);
      };
    }
  }, [detectTheme, renderDiagram, isDark]);

  return (
    <div 
      ref={containerRef}
      className="mermaid-container my-6 flex justify-center transition-colors duration-300"
      style={{ minHeight: '200px' }}
    />
  );
}
