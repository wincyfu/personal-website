# 开发指南

本文档提供了关于如何扩展和维护WincyFu个人网站的详细说明。

## 环境配置

### 必要条件
- Node.js 18.x 或更高版本
- npm 9.x 或更高版本

### 推荐开发工具
- Visual Studio Code
- 推荐插件：
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - TypeScript Vue Plugin (Volar)

## 项目结构解释

```
/public                # 静态资源目录
  /fonts               # 自定义字体
  /images              # 图片资源
/src                   # 源代码目录
  /app                 # 页面路由（基于Next.js App Router）
    /about             # "关于我"页面
    /products          # "我的产品"页面
    /tutorials         # "文章教程"页面
    /achievements      # "个人成就"页面
    /contact           # "联系我"页面
    /layout.tsx        # 根布局组件
    /page.tsx          # 首页组件
  /components          # 组件目录
    /Content           # 内容相关组件
    /Footer            # 页脚组件
    /Header            # 头部组件
    /Nav               # 导航组件
  /contexts            # 上下文状态管理
    ThemeContext.tsx   # 主题上下文
```

## 主题系统

网站实现了深色和浅色主题切换功能。主题管理通过React Context API实现：

1. `ThemeContext.tsx` 负责管理和提供主题状态
2. 所有组件通过 `useTheme()` 钩子访问当前主题
3. 主题状态存储在localStorage中，保持用户偏好

要在组件中使用主题：

```tsx
'use client';
import { useTheme } from '@/contexts/ThemeContext';

const YourComponent = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  
  return (
    <div className={isDarkTheme ? 'bg-dark text-white' : 'bg-white text-dark'}>
      {/* 组件内容 */}
    </div>
  );
};
```

## 响应式设计

网站使用Tailwind CSS的响应式前缀实现不同设备的适配，主要断点如下：

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1440px (安全区域)

页面最大宽度为1920px，内容区安全宽度为1440px。

## 添加新页面

要添加新页面，按照以下步骤操作：

1. 在 `/src/app` 目录下创建新的文件夹，如 `/src/app/new-page`
2. 在该文件夹中创建 `page.tsx` 文件：

```tsx
'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';

export default function NewPage() {
  const { isDarkTheme } = useTheme();

  return (
    <main className={`min-h-screen mx-auto ${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-dark'} 
                      w-full max-w-[1920px] transition-colors duration-300`}>
      <div className="max-w-[1440px] mx-auto px-4">
        <Nav />
        
        {/* 页面内容 */}
        <section className="py-10 md:py-20">
          <h1 className={`text-3xl md:text-5xl font-bold mb-8 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
            新页面标题
          </h1>
          {/* 更多内容 */}
        </section>
      </div>
      <Footer />
    </main>
  );
}
```

3. 更新导航链接：在 `src/components/Nav/Nav.tsx` 中修改 `navItems` 数组

## 添加新组件

创建新组件的最佳实践：

1. 在适当的组件目录下创建新文件（如 `/src/components/Content/NewComponent.tsx`）
2. 使用标准模板：

```tsx
'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface NewComponentProps {
  // 组件属性定义
  title?: string;
}

const NewComponent = ({ title }: NewComponentProps) => {
  const { isDarkTheme } = useTheme();
  
  return (
    <section className="py-5 sm:py-10 md:py-16">
      <div className="text-center">
        <h2 className={`text-lg sm:text-2xl md:text-3xl font-sans mb-1 sm:mb-2 md:mb-4 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
          {title || '默认标题'}
        </h2>
        {/* 组件内容 */}
      </div>
    </section>
  );
};

export default NewComponent;
```

## 样式指南

为保持设计一致性，请遵循以下样式指南：

### 字体大小

- 标题：`text-lg` (移动端) -> `text-3xl` (桌面端)
- 副标题：`text-base` (移动端) -> `text-xl` (桌面端)
- 正文：`text-sm` (移动端) -> `text-base` (桌面端)
- 小字：`text-xs` 或 `text-[10px]` (移动端) -> `text-sm` (桌面端)

### 间距

- 区域间隔：`py-5` (移动端) -> `py-16` (桌面端)
- 内部间隔：`mb-4` (移动端) -> `mb-10` (桌面端)

### 颜色

使用项目预定义的颜色变量：

- 文本颜色：`text-white`/`text-dark`（主文本）, `text-text-gray`/`text-gray-500`（次要文本）
- 背景色：`bg-dark`/`bg-white`（主背景）, `bg-darker`/`bg-gray-100`（次要背景）
- 强调色：`text-primary`, `text-secondary`, `bg-primary`, `bg-secondary`

## 改进和优化计划

以下是未来开发和优化的重点方向：

1. **内容管理**：将静态内容移至CMS或数据文件
2. **性能优化**：图片优化、代码分割、懒加载
3. **动效增强**：添加更多交互动效和过渡效果
4. **SEO优化**：元标签、结构化数据、sitemap
5. **测试**：单元测试、E2E测试
6. **多语言支持**：中英文切换 