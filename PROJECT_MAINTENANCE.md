# 项目维护文档

## SpotlightCard 组件架构说明

### 组件分布

项目中存在三个独立的 SpotlightCard 组件：

1. **全局通用组件**: `src/components/UI/SpotlightCard.tsx`
   - 使用范围：首页"AI辅助编码产品"
   - 浅色模式样式：`backgroundColor: '#F3F4F6'`（浅灰色背景）
   - CSS文件：`src/components/UI/SpotlightCard.css`
   - **重要**: CSS中设置了 `padding: 2rem`（32px）

2. **查看全部页面专用组件**: `src/app/all-designs/SpotlightCard.tsx`
   - 使用范围：查看全部页面(`/all-designs`)
   - 浅色模式样式：`backgroundColor: '#ffffff'`（白色背景）
   - CSS文件：`src/app/all-designs/SpotlightCard.css`
   - **重要**: CSS中设置了 `padding: 0`，内部使用自定义padding

3. **作品集专用组件**: `src/app/portfolio-x7y9z/SpotlightCard.tsx`
   - 使用范围：作品集页面(`/portfolio-x7y9z`)
   - 浅色模式样式：`backgroundColor: '#ffffff'`（白色背景）
   - CSS文件：`src/app/portfolio-x7y9z/SpotlightCard.css`

### 重要维护注意事项

⚠️ **样式完全隔离原则**
- 修改 `src/components/UI/SpotlightCard.tsx` 只影响：
  - 首页 AI辅助编码产品卡片
- 修改 `src/app/all-designs/SpotlightCard.tsx` 只影响：
  - 查看全部页面项目卡片
- 修改 `src/app/portfolio-x7y9z/SpotlightCard.tsx` 只影响：
  - 作品集页面项目卡片

⚠️ **CSS文件管理**
- 三个组件使用完全独立的CSS文件，避免样式冲突
- 修改CSS时需要明确影响范围
- **关键配置**:
  - 全局组件: `padding: 2rem`
  - 查看全部页面: `padding: 0`
  - 作品集页面: 独立配置

⚠️ **内部padding协调**
- **首页AIProducts**: 由于SpotlightCard CSS有32px padding，不添加额外内部padding
- **查看全部页面**: 由于SpotlightCard CSS是0 padding，使用自定义内部padding（pt-[16px] px-[14px] pb-0 和 px-[20px] pt-[24px] pb-[20px]）
- **作品集页面**: 使用独立的padding配置

### 历史问题记录

**问题1**: 修改查看全部页面影响首页卡片样式 (2025-01-25)
- **原因**: 误将全局SpotlightCard的浅色背景从`#F3F4F6`改为`#ffffff`
- **解决**: 恢复浅色模式背景色为`#F3F4F6`

**问题2**: SpotlightCard内部间距问题 (2025-01-25)
- **原因**: 将SpotlightCard.css中的`padding: 2rem`改为`padding: 0`，导致首页AI辅助编码产品卡片内容布局错乱
- **表现**: 文字标题和介绍文字大小不对，文字到卡片边缘距离不对，按钮到卡片底部间距不对
- **解决**: 恢复SpotlightCard.css中的`padding: 2rem`，移除AIProducts组件中的内部padding设置
- **影响**: 首页AI辅助编码产品卡片样式恢复正常，但查看全部页面受到影响

**问题3**: 全局SpotlightCard修改影响查看全部页面 (2025-01-25)
- **原因**: 查看全部页面使用全局SpotlightCard组件，修改全局组件影响了查看全部页面的样式
- **表现**: 查看全部页面的卡片样式被意外修改
- **解决**: 
  1. 为查看全部页面创建独立的SpotlightCard组件 (`src/app/all-designs/SpotlightCard.tsx`)
  2. 创建独立的CSS文件 (`src/app/all-designs/SpotlightCard.css`)，使用 `padding: 0`
  3. 恢复查看全部页面的内部padding设置
  4. 修改import路径，使用专用组件
- **影响**: 三个页面的SpotlightCard组件完全独立，互不影响

### 版本回退指南

如果出现类似问题，可以参考以下版本：
- **v1.5.9**: 稳定版本，包含原始的组件配置
- **v1.1.3**: 包含查看全部页面的正确样式配置

### 测试检查清单

修改任何SpotlightCard相关代码后，务必检查：
1. ✅ 首页AI辅助编码产品卡片样式正常
2. ✅ 查看全部页面项目卡片样式正常  
3. ✅ 作品集页面项目卡片样式正常
4. ✅ 深色/浅色模式切换正常
5. ✅ 中英文切换正常
6. ✅ 响应式布局正常
7. ✅ 三个页面的卡片样式互不影响

### 组件独立性验证

为确保组件完全独立，可以进行以下测试：
1. 修改 `src/components/UI/SpotlightCard.tsx` 的背景色，只有首页AI辅助编码产品受影响
2. 修改 `src/app/all-designs/SpotlightCard.tsx` 的背景色，只有查看全部页面受影响
3. 修改 `src/app/portfolio-x7y9z/SpotlightCard.tsx` 的背景色，只有作品集页面受影响

### 样式配置对照表

| 组件位置 | 深色模式背景 | 浅色模式背景 | 用途 |
|---------|-------------|-------------|------|
| `src/components/UI/` | `#171717` | `#F3F4F6` | 首页、查看全部页面 |
| `src/app/portfolio-x7y9z/` | `#171717` | `#ffffff` | 作品集页面 |

### 修改指南

1. **修改首页AI产品卡片样式**
   - 文件：`src/components/UI/SpotlightCard.tsx`
   - 影响：首页、查看全部页面

2. **修改作品集页面卡片样式**
   - 文件：`src/app/portfolio-x7y9z/SpotlightCard.tsx`
   - 影响：仅作品集页面

3. **添加新的卡片样式**
   - 建议：复制现有组件，创建新的专用组件
   - 避免：修改现有共享组件

### 最佳实践

1. **修改前备份**: 修改任何SpotlightCard组件前，先创建备份
2. **影响评估**: 明确修改会影响哪些页面
3. **测试验证**: 在所有相关页面测试修改效果
4. **文档更新**: 重大修改后更新此维护文档
5. **版本标记**: 为重要修改创建版本备份点

## 其他维护注意事项

### 项目时间硬编码问题

详见 `src/app/portfolio-x7y9z/README.md` 中的维护说明。

### 浏览次数数据版本控制

详见 `src/contexts/ProjectViewContext.tsx` 中的版本控制机制。 