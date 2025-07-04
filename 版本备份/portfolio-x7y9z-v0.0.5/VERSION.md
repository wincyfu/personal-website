# 作品集页面版本备份v0.0.5

**备份日期**: 2024年5月
**版本号**: v0.0.5
**版本说明**: 样式一致性优化版本

## 版本特性

- 优化"个人经历"模块标签样式与主站"文章教程"模块"查看详情"按钮保持一致
- 增大头部区域三行文字的字体大小，增强视觉冲击力
- 调整"个人经历"模块标题文字大小为text-xl，优化整体视觉效果

## 备份文件列表

- page.tsx - 作品集页面主组件
- README.md - 作品集页面说明文档
- portfolio.ts - 作品集数据文件
- ProjectCard.tsx - 项目卡片组件
- DecryptedText.jsx - 文字解密动画效果组件

## 回退方法

如需回退到此版本，请将备份文件复制回源代码对应位置：

```bash
# 作品集页面主组件
cp 版本备份/portfolio-x7y9z-v0.0.5/page.tsx src/app/portfolio-x7y9z/
# 作品集页面说明文档
cp 版本备份/portfolio-x7y9z-v0.0.5/README.md src/app/portfolio-x7y9z/
# 作品集数据文件
cp 版本备份/portfolio-x7y9z-v0.0.5/portfolio.ts src/data/
# 项目卡片组件
cp 版本备份/portfolio-x7y9z-v0.0.5/components/ProjectCard.tsx src/components/UI/
# 文字解密动画效果组件
cp 版本备份/portfolio-x7y9z-v0.0.5/components/DecryptedText.jsx src/components/UI/
``` 