# Vercel部署指南

## 项目信息
- **项目名称**: wincyfu
- **域名**: wincyfu.vercel.app
- **GitHub仓库**: wincyfu/personal-website

## 快速部署步骤

### 1. 通过Vercel CLI部署 (推荐)

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel --prod
```

### 2. 通过Vercel Dashboard部署

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入GitHub仓库: `wincyfu/personal-website`
4. 配置项目设置:
   - **Project Name**: wincyfu
   - **Framework**: Next.js
   - **Build Command**: npm run build
   - **Install Command**: npm install
   - **Output Directory**: .next

### 3. 环境变量设置

如果您的项目需要环境变量，请在Vercel Dashboard中设置：

```
NODE_ENV=production
```

### 4. 域名配置

部署完成后，您的网站将自动可以通过以下域名访问：
- `wincyfu.vercel.app` (主域名)
- `wincyfu-git-main-wincyfu.vercel.app` (Git分支域名)

## 部署优化配置

### vercel.json 配置说明

```json
{
  "version": 2,
  "name": "wincyfu",
  "alias": ["wincyfu.vercel.app"],
  "framework": "nextjs",
  "regions": ["hkg1", "sin1", "nrt1"]
}
```

### next.config.js 优化

- ✅ 启用图片优化
- ✅ 启用压缩
- ✅ 优化webpack配置
- ✅ 排除版本备份文件夹

## 部署前检查清单

- [ ] 确保所有依赖都在 `package.json` 中
- [ ] 检查 `npm run build` 是否成功
- [ ] 确认没有构建错误
- [ ] 检查环境变量是否正确设置

## 常见问题解决

### 1. 构建失败
```bash
# 本地测试构建
npm run build

# 清除缓存重新构建
rm -rf .next
npm run build
```

### 2. 图片加载问题
确保图片路径正确，并且图片文件在 `public/` 目录中

### 3. 路由问题
确保所有页面组件都正确导出

## 部署监控

部署完成后，您可以在Vercel Dashboard中监控：
- 构建日志
- 访问分析
- 性能指标
- 错误日志

## 更新部署

每次推送到main分支时，Vercel会自动重新部署您的网站。

---

**技术支持**: 如果遇到问题，请检查Vercel的构建日志获取详细错误信息。 