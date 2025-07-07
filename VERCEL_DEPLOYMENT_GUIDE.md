# Vercel 部署完整指南

## 📋 项目信息
- **项目名称**: wincyfu
- **主域名**: https://wincyfu.vercel.app
- **GitHub仓库**: wincyfu/personal-website
- **框架**: Next.js 14.0.4
- **技术栈**: React 18 + TypeScript + TailwindCSS

---

## ⚡ 快速参考 (紧急部署)

### 🚨 部署前必检项
```javascript
// next.config.js - 必须包含这两行
outputFileTracing: false  // 防止堆栈溢出
config.cache = false      // 禁用webpack缓存
```

```bash
# .vercelignore - 必须排除这些文件夹
版本备份/     # 会导致构建失败
git-2.30.0/   # 大量无关文件
temp_*/       # 临时文件
```

### ⚡ 快速部署命令
```bash
# 标准部署流程 (复制粘贴即可)
git add .
git commit -m "描述更改"
git push origin main
vercel --prod
vercel alias <new-deployment-url> wincyfu.vercel.app
```

### 🚫 常见错误速查表
| 错误信息 | 原因 | 解决方案 |
|---------|------|----------|
| Maximum call stack size exceeded | 文件过多 | 设置 `outputFileTracing: false` |
| Build timeout | 备份文件夹过大 | 检查 `.vercelignore` |
| Image optimization error | Next.js图片问题 | 设置 `images: { unoptimized: true }` |

### 📋 快速检查清单
- [ ] `npm run build` 本地成功
- [ ] `.vercelignore` 排除备份文件夹  
- [ ] `next.config.js` 包含必要配置
- [ ] 推送到GitHub main分支

💡 **记住**: 90%的部署失败都是因为 `版本备份/` 文件夹没有被排除！

---

## 🚀 详细部署流程

### 方式一：通过Vercel CLI (推荐)
```bash
# 1. 安装Vercel CLI
npm i -g vercel

# 2. 登录Vercel
vercel login

# 3. 部署到生产环境
vercel --prod

# 4. 设置主域名 (如需要)
vercel alias <deployment-url> wincyfu.vercel.app
```

### 方式二：通过GitHub自动部署
1. 推送代码到GitHub main分支
2. Vercel会自动检测并部署

## ⚠️ 关键配置文件

### 1. Next.js 配置 (必须正确配置)
**文件**: `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 为Vercel部署优化图片配置
  images: {
    unoptimized: true,
    domains: ['wincyfu.vercel.app'],
  },
  // 生产环境启用严格模式
  reactStrictMode: true,
  // 🚨 完全禁用输出文件跟踪 (解决堆栈溢出) - 必须设置
  outputFileTracing: false,
  // 优化webpack配置
  webpack: (config, { dev, isServer }) => {
    // 🚨 禁用缓存 - 必须设置
    config.cache = false;
    
    // 排除版本备份文件夹
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /版本备份/,
    });
    
    // 生产环境优化
    if (!dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  // 压缩和优化
  compress: true,
  // 启用静态导出优化
  trailingSlash: false,
};

module.exports = nextConfig;
```

**🔑 关键配置说明**：
- `outputFileTracing: false` - **必须设置**，否则会出现"Maximum call stack size exceeded"错误
- `config.cache = false` - **必须设置**，禁用webpack缓存，避免构建问题
- 排除版本备份文件夹，防止文件过多导致构建失败

### 2. Vercel配置文件
**文件**: `vercel.json`

```json
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

**⚠️ 注意事项**：
- ❌ 不要设置 `regions` (多区域部署需要付费计划)
- ❌ 不要使用已弃用的 `name` 属性
- ❌ 不要设置复杂的 `builds` 和 `routes` (Next.js自动处理)

### 3. 文件排除配置 (非常重要)
**文件**: `.vercelignore`

```bash
# 🚨 版本备份文件夹 (必须排除，否则部署失败)
版本备份/
versions/
固定文件/
fixed_files/
temp_fix/
temp_convert/

# 🚨 Git 源码 (必须排除，文件过多)
git-2.30.0/

# 开发工具和缓存
.next/
node_modules/
.git/
.DS_Store
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 备份文件
*.backup
*.bak
*.tmp

# 测试文件
*.test.*
*test*

# 脚本文件
scripts/

# SSH 密钥
*.pub
ssh-keygen*

# 其他临时文件
_next/
.vercel/
```

## 🚫 常见错误详解

### 1. Maximum call stack size exceeded ⭐ 最常见
**错误原因**: 项目文件过多，Next.js文件跟踪导致堆栈溢出

**解决方案**:
```javascript
// next.config.js - 必须添加这两行
module.exports = {
  outputFileTracing: false, // 完全禁用文件跟踪
  webpack: (config) => {
    config.cache = false; // 禁用缓存
    return config;
  }
};
```

### 2. 构建超时或失败 ⭐ 第二常见
**错误原因**: 
- `版本备份/` 文件夹过大
- 不必要的文件被包含在部署中

**解决方案**:
1. 确保 `.vercelignore` 文件正确配置
2. 删除或移动大型备份文件夹
3. 检查项目根目录是否有大文件

### 3. 图片加载问题
**错误原因**: Next.js图片优化在Vercel上的兼容性问题

**解决方案**:
```javascript
// next.config.js
images: {
  unoptimized: true, // 禁用图片优化
  domains: ['wincyfu.vercel.app'], // 允许的域名
}
```

### 4. 部署成功但页面空白
**可能原因**:
- 环境变量缺失
- 路由配置问题
- 客户端渲染问题

**检查步骤**:
1. 查看Vercel构建日志
2. 检查浏览器控制台错误
3. 验证所有必需的环境变量

## 📁 文件同步规则

### ✅ 必须同步的文件
```
src/              # 源代码目录
public/           # 静态资源
package.json      # 依赖配置
package-lock.json # 锁定版本
next.config.js    # Next.js配置
vercel.json       # Vercel配置
.vercelignore     # 排除文件配置
tailwind.config.js # 样式配置
tsconfig.json     # TypeScript配置
```

### ❌ 绝对不能同步的文件/文件夹
```
版本备份/          # 🚨 备份文件夹 (会导致构建失败)
git-2.30.0/       # 🚨 Git源码 (大量无关文件)
.next/            # 构建输出 (自动生成)
node_modules/     # 依赖包 (自动安装)
.git/             # Git历史 (自动同步)
temp_*/           # 临时文件夹
fixed_files/      # 修复文件夹
scripts/          # 脚本文件夹 (如果不需要)
*.log             # 日志文件
*.backup          # 备份文件
ssh-keygen*       # SSH密钥文件
```

### ⚠️ 导致错误的文件 (重点关注)
```
版本备份/          # 🔥 文件过多，导致堆栈溢出 (最常见原因)
git-2.30.0/       # 🔥 大量文件，影响构建性能
大型图片文件 (>10MB) # 可能导致超时
包含特殊字符的文件名  # 可能导致路径问题
```

## 🔧 完整检查清单

### 代码检查
- [ ] `npm run build` 本地构建成功
- [ ] 所有TypeScript错误已修复
- [ ] 没有ESLint错误
- [ ] 图片路径正确 (使用相对路径)

### 配置检查
- [ ] `next.config.js` 包含 `outputFileTracing: false`
- [ ] `next.config.js` 包含 `config.cache = false`
- [ ] `.vercelignore` 正确排除 `版本备份/` 文件夹
- [ ] `vercel.json` 配置简洁有效
- [ ] 环境变量已在Vercel Dashboard设置

### 文件检查
- [ ] 删除或移动 `版本备份/` 文件夹
- [ ] 删除或移动 `git-2.30.0/` 文件夹
- [ ] 确认 `public/` 目录下的资源文件存在
- [ ] 检查是否有损坏的图片文件

## 📊 部署监控

### 成功指标
- ✅ 构建时间 < 60秒
- ✅ 所有页面成功生成
- ✅ 无构建错误或警告
- ✅ 主域名正确指向

### 🔧 故障排除命令
```bash
# 查看部署日志
vercel inspect <deployment-url> --logs

# 查看所有部署
vercel list

# 重新部署 (强制不使用缓存)
vercel --prod --force

# 查看当前部署状态
vercel list | head -5
```

## 🎯 最佳实践

### 1. 版本管理
- 每次部署前先推送到GitHub
- 使用有意义的commit信息
- 保持main分支稳定

### 2. 性能优化
- 定期清理不必要的文件
- 优化图片大小和格式
- 使用代码分割和懒加载

### 3. 监控和维护
- 定期检查Vercel使用情况
- 监控网站性能指标
- 及时更新依赖包

## 📞 紧急故障处理

如果遇到以下情况，可能需要联系Vercel支持：
- 构建时间异常长 (>10分钟)
- 频繁的部署失败
- 域名解析问题
- 配额超限问题

---

## 💡 经验总结

**最重要的三点**:
1. 🚨 **必须设置** `outputFileTracing: false` 和 `config.cache = false`
2. 🚨 **必须排除** `版本备份/` 和 `git-2.30.0/` 文件夹
3. 🚨 **必须确保** 本地 `npm run build` 成功

**记住**: 如果遇到部署问题，90%的情况下都是因为上面三点没有正确配置！

---

**最后更新**: 2025年7月4日  
**维护者**: WincyFu  
**版本**: v2.0 (合并版) 