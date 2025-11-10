# Apple UI 风格 AI 样式生成指南

> 精简版设计规范 | 专为AI代码生成优化
>
> 核心原则: 简洁、优雅、直观、注重细节

---

## 🎨 视觉设计核心理念

### 1. 设计哲学
- **简洁至上**: 去除一切不必要的装饰元素
- **内容为王**: 让内容成为视觉焦点
- **深度与层次**: 使用微妙阴影和模糊创造空间感
- **优雅的细节**: 精致而不张扬的视觉处理
- **功能性导向**: 设计服务于功能，不喧宾夺主

### 2. 视觉特征
- 现代扁平化 + 极简拟物化
- 大量留白 (促进内容呼吸感)
- 圆角矩形 (标准 8px 圆角)
- 细线条分割线 (最小化视觉干扰)
- 高对比度文本 (确保可读性)
- 柔和、浅淡的阴影 (仅在必要时使用)

---

## 🎨 颜色系统

### 语义化颜色
```css
/* 文本颜色 */
--text-primary: #000000;        /* 主要文本 */
--text-secondary: rgba(0,0,0,0.6); /* 次要文本 */
--text-tertiary: rgba(0,0,0,0.35);  /* 辅助文本 */

/* 功能颜色 */
--brand-blue: #007AFF;          /* Apple蓝 - 按钮、链接 */
--success-green: #34C759;       /* 成功状态 */
--warning-orange: #FF9500;      /* 警告状态 */
--error-red: #FF3B30;           /* 错误状态 */

/* 背景色 */
--bg-primary: #FFFFFF;          /* 主背景 */
--bg-secondary: #F2F2F7;        /* 次背景 */
--bg-tertiary: #F1F1F1;         /* 卡片背景 */

/* 边框 */
--border-light: rgba(60,60,67,0.36); /* 半透明分割线 */
```

### 颜色使用原则
- 优先使用语义化变量，避免硬编码颜色
- 保持高对比度 (WCAG AA 4.5:1)
- 浅色/深色主题自动适配
- 状态色有明确语义 (成功=绿, 警告=橙, 错误=红)

---

## 📝 排版系统

### 字体层级
| 类型 | 大小 | 字重 | 使用场景 |
|------|------|------|----------|
| **Display 1** | 34px | 700 | 主标题、Logo |
| **Display 2** | 28px | 400/600 | 页面标题 |
| **Headline** | 22px | 400 | 区块标题 |
| **Body** | 17px | 400 | 正文内容 |
| **Subhead** | 15px | 400 | 辅助信息 |
| **Caption** | 13px | 600 | 标签、脚注 |

### 排版原则
- 使用 Apple 系统字体 (SF Pro Display/Text)
- 正文行高 1.47，标题行高 1.2-1.3
- 标题使用 600/700 字重突出层次
- 正文使用 400 标准字重
- 避免超过 6 级字体大小
- 文字可缩放至 200% 无横向滚动

---

## 📏 间距系统

### 基线网格
```
基础单位: 8px
- 4px:  紧密元素
- 8px:  组件内元素
- 16px: 组件间标准间距
- 24px: 区块分隔
- 32px: 页面大区块
- 48px+: 页面边距
```

### 间距使用指南
- 按钮内边距: 水平 24px, 垂直 8-12px
- 表单字段间距: 13px
- 卡片内边距: 16-24px
- 页面Gutter: 16px (移动端), 20-25px (桌面端)
- 网格间距: 8-25px (响应式递增)

---

## 🔘 组件设计规范

### 按钮 (Buttons)
```css
/* 主要按钮 */
.btn-primary {
    min-height: 44px;        /* 最小触控尺寸 */
    padding: 8px 24px;
    background: #007AFF;
    color: white;
    border-radius: 8px;
    font-size: 17px;
    font-weight: 600;
    border: none;
}

/* 次要按钮 */
.btn-secondary {
    background: transparent;
    border: 1px solid #007AFF;
    color: #007AFF;
}
```

### 输入框 (Inputs)
```css
.input {
    height: 44px;            /* 标准高度 */
    padding: 0 12px;
    border: 1px solid #D1D1D6;
    border-radius: 8px;
    font-size: 17px;
}

.input:focus {
    border-color: #007AFF;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
}
```

### 卡片 (Cards)
```css
.card {
    background: white;
    border-radius: 12px;
    padding: 16-24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### 导航 (Navigation)
```css
.nav {
    padding: 19px 25px;
    background: white;
    border-bottom: 1px solid rgba(60,60,67,0.36);
}
```

### 图标尺寸
- 小: 12-16px
- 标准: 20px
- 大: 24-32px
- 特大: 48px

---

## 📱 响应式规范

### 断点
```css
/* 移动优先策略 */
.container {
    /* 基础: 移动端 */
    padding: 0 16px;
}

/* 小屏及以上 (414px) */
@media (min-width: 414px) {
    .container { padding: 0 20px; }
}

/* 平板及以上 (768px) */
@media (min-width: 768px) {
    .container { padding: 0 25px; }
}

/* 桌面端 (1024px+) */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
}
```

### 响应式原则
- 移动端优先 (Mobile First)
- 触控目标最小 44×44px
- 桌面端使用侧边栏或顶部导航
- 图片响应式适配
- 文字大小在小屏可适当缩小 (最多 10%)

---

## ✨ 动画与交互

### 动画时长
```css
:root {
    --duration-quick: 150ms;     /* 快速反馈 */
    --duration-normal: 250ms;    /* 标准过渡 */
    --duration-slow: 350ms;      /* 页面切换 */
    --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### 动画原则
- 快速交互用 150ms
- 组件过渡用 250ms
- 页面切换用 350ms
- 使用 ease-out 缓动
- 动画支持用户减少动画偏好
- 微交互增强反馈 (hover, active, focus)

### 悬停效果
```css
.interactive:hover {
    opacity: 0.8;
    transform: translateY(-1px);
    transition: all 150ms ease-out;
}
```

### 焦点状态
- 所有交互元素有明确焦点指示
- 使用 outline 或 box-shadow
- 支持键盘导航
- Tab 顺序符合逻辑

---

## 🎯 交互设计原则

### 1. 直观性
- 元素外观暗示其功能 (拟态)
- 按钮看起来可点击
- 链接有下划线或颜色区分
- 图标含义清晰明确

### 2. 反馈性
- 点击有视觉反馈 (按压效果)
- 加载有进度指示
- 操作有成功/失败提示
- 状态变化有动画过渡

### 3. 一致性
- 同类元素外观一致
- 交互行为一致
- 视觉语言一致
- 术语使用一致

### 4. 容错性
- 重要操作需确认
- 撤销/恢复功能
- 错误提示友好
- 防误触设计

### 5. 效率
- 常用功能快速访问
- 减少操作步骤
- 智能默认值
- 自动保存

---

## ♿ 可访问性

### 基本要求
- 文本对比度 ≥ 4.5:1
- 所有图片有 alt 文本
- 表单有 label 标签
- 语义化 HTML 标签
- ARIA 属性用于复杂组件
- 键盘可完全操作
- 颜色不是唯一信息载体

### 实现方式
```html
<!-- 按钮 -->
<button aria-label="下载应用" aria-expanded="false">
    下载
</button>

<!-- 输入框 -->
<label for="email">邮箱</label>
<input
    id="email"
    type="email"
    aria-required="true"
    aria-describedby="email-error"
/>
<div id="email-error" role="alert" aria-live="polite">
    邮箱格式不正确
</div>

<!-- 进度条 -->
<div
    role="progressbar"
    aria-valuenow="75"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="下载进度 75%"
>
    75%
</div>
```

---

## 🏗️ 布局模式

### 标准页面结构
```
┌─────────────────────────┐
│     Header (44px)        │
├─────────────────────────┤
│                         │
│      Main Content       │  ← 可滚动区域
│                         │
│                         │
└─────────────────────────┘
```

### 桌面端布局
```
┌──────┬──────────────────┐
│Sidebar│   Main Content   │
│(260px)│                 │
│       │                 │
│       │                 │
└──────┴──────────────────┘
```

### 列表布局
```
┌─────────────────────────┐
│ [Icon] Title        >   │
│      Subtitle           │
├─────────────────────────┤
│ [Icon] Title        >   │
│      Subtitle           │
└─────────────────────────┘
```

### 网格布局
```
┌──────┬──────┬──────┐
│ Item │ Item │ Item │
├──────┼──────┼──────┤
│ Item │ Item │ Item │
└──────┴──────┴──────┘
```

---

## 🎨 Apple 设计语言核心

### 1. 深度 (Depth)
- 使用 z-index 创建层次
- 卡片有轻微阴影
- 前景内容有微妙模糊背景
- 模态框有半透明遮罩

### 2. 清晰 (Clarity)
- 充足留白
- 清晰的信息层次
- 易读的字体大小
- 高对比度

### 3. 依从 (Deference)
- 设计服务于内容
- 不抢夺用户注意力
- 装饰元素适度
- 视觉焦点明确

---

## 📋 AI 生成检查清单

### 样式生成时必须检查:
- [ ] 使用语义化 CSS 变量
- [ ] 最小触控区域 44×44px
- [ ] 圆角使用 8px 或 12px
- [ ] 文本对比度 ≥ 4.5:1
- [ ] 悬停/焦点状态有反馈
- [ ] 响应式布局完整
- [ ] 动画时长符合规范
- [ ] 语义化 HTML 标签
- [ ] ARIA 属性完整
- [ ] 键盘可访问

### 颜色使用检查:
- [ ] 避免硬编码颜色值
- [ ] 使用语义化变量
- [ ] 状态色符合规范
- [ ] 深色模式支持

### 排版检查:
- [ ] 字体大小符合层级
- [ ] 字重使用正确 (400/600/700)
- [ ] 行高 ≥ 1.4
- [ ] 标题层次清晰

---

## 🚀 快速参考

### 常用 CSS 变量
```css
/* 颜色 */
var(--text-primary)
var(--text-secondary)
var(--brand-blue)
var(--bg-primary)
var(--border-light)

/* 字体 */
var(--font-display-1)   /* 34px/700 */
var(--font-display-2)   /* 28px/400 */
var(--font-headline)    /* 22px/400 */
var(--font-body)        /* 17px/400 */

/* 间距 */
var(--space-xs)   /* 8px */
var(--space-sm)   /* 16px */
var(--space-md)   /* 24px */
var(--space-lg)   /* 32px */

/* 动画 */
var(--duration-quick)   /* 150ms */
var(--duration-normal)  /* 250ms */
var(--ease-out)         /* cubic-bezier(...) */
```

### 标准间距
```css
.component {
    padding: 16px;        /* 标准内边距 */
    margin-bottom: 24px;  /* 标准外边距 */
    gap: 8px;             /* 元素间距 */
}
```

---

## 总结

Apple UI 风格的核心是 **简洁而不简单**。通过精心设计的层次、合适的间距、恰当的动画，创造出既美观又实用的界面。

**关键原则**:
1. **简洁** - 去除一切不必要
2. **清晰** - 信息层次明确
3. **深度** - 创造空间感
4. **依从** - 设计服务内容
5. **一致** - 保持统一语言

---

**版本**: v1.0
**适用**: Apple 风格 UI 生成
**维护**: Claude Code (Anthropic)