# 版本管理说明

本项目使用简单的脚本来管理不同版本。目前有四个主要版本：

- **v1.0**：基础版本，包含所有核心功能
- **v1.1**：在v1.0基础上进行细节优化
- **v1.2**：优化导航栏和头部区域，添加AI工具推荐页面
- **v1.2.2**：添加SpotlightCard组件，改进"关于我"区域

## 版本切换

### 从v1.2.2回退到v1.2.1

如果需要回退到v1.2.1版本，只需运行：

```bash
./restore-v1.2.1.sh
```

这将从备份中恢复所有v1.2.1版本的文件，包括源代码、配置和文档。

### 从v1.2.1回退到v1.1

如果需要回退到v1.1版本，只需运行：

```bash
./restore-v1.1.sh
```

这将从备份中恢复所有v1.1版本的文件，包括源代码、配置和文档。

### 从v1.1回退到v1.0

如果需要回退到v1.0版本，只需运行：

```bash
./restore-v1.0.sh
```

这将从备份中恢复所有v1.0版本的文件，包括源代码、配置和文档。

### 备份当前版本

如果对当前版本做了新的修改，想要保存为新版本，可参考`backup-v1.0.sh`或`backup-v1.1.sh`的模式创建新的备份脚本。

## 版本差异

### v1.0 vs v1.1 vs v1.2 vs v1.2.2

- **v1.0**：基础功能实现，包括响应式设计、主题切换、页面结构等
- **v1.1**：在v1.0基础上进行细节优化：
  - 导航栏：优化布局和交互
  - 头部区域：调整视觉效果和响应性
  - 内容区域：完善内容展示
  - 二级页面：优化布局和用户体验
- **v1.2**：在v1.1基础上进行更多优化：
  - 导航栏：添加首页选项，改进交互体验
  - 头部区域：HELLO字体更新为OPPOSans 240px字号，添加头部图片
  - 二级页面：创建AI工具推荐页面及其子页面
- **v1.2.2**：在v1.2基础上添加新组件和改进：
  - 添加SpotlightCard组件：实现鼠标跟随光晕效果
  - 优化"关于我"区域：添加机器人图标，改进内容排版
  - 改进主题切换逻辑：确保内容在不同主题下可见
  - 视觉增强：调整边框、间距和动画效果

## 版本目录结构

备份的版本存储在项目的`backup/`目录下，各版本包含以下内容：

```
backup/v1.0/ 或 backup/v1.1/ 或 backup/v1.2.2/
  ├── src/            # 源代码
  ├── public/         # 静态资源
  ├── README.md       # 项目说明
  ├── CHANGELOG.md    # 更新日志
  ├── DEVELOPMENT.md  # 开发指南
  ├── VERSION         # 版本标记
  ├── next.config.js  # Next.js配置
  └── tailwind.config.js  # Tailwind CSS配置
```

## 开发建议

1. 进行重大更改前，先备份当前版本
2. 每次发布新版本时，更新`VERSION`文件和`CHANGELOG.md`
3. 保持版本之间的兼容性，避免破坏性更改 