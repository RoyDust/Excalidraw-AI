# Smart Excalidraw

使用AI将自然语言转换成Excalidraw格式数据的网站，支持在画布上自由编辑和调整样式。

## 技术栈

- **框架**: Next.js 16 + React 19 + TypeScript
- **UI组件**: shadcn/ui + Tailwind CSS 4
- **状态管理**: Zustand
- **数据获取**: @tanstack/react-query
- **画图功能**: Excalidraw
- **代码编辑**: Monaco Editor
- **身份验证**: Supabase Auth
- **后端服务**: Supabase + Prisma
- **代码质量**: ESLint + Prettier

## 项目结构

```
my-app/
├── app/                    # Next.js 路由
│   ├── canvas/            # 画布页面
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 组件
│   ├── ExcalidrawCanvas.tsx
│   ├── CodeEditor.tsx
│   └── DynamicCanvas.tsx
├── lib/                   # 工具函数和配置
│   ├── supabase.ts       # Supabase 客户端
│   ├── queryClient.ts    # React Query 配置
│   └── utils.ts          # 通用工具
├── store/                 # Zustand 状态管理
│   ├── useDiagramStore.ts
│   └── useAuthStore.ts
├── hooks/                 # 自定义 Hooks
│   └── useDiagrams.ts
├── types/                 # TypeScript 类型定义
│   ├── excalidraw.ts
│   └── supabase.ts
├── prisma/               # Prisma 数据库配置
│   └── schema.prisma
└── styles/               # 样式文件
    └── excalidraw.css
```

## 快速开始

1. 安装依赖

```bash
pnpm install
```

2. 配置环境变量

复制 `.env.example` 到 `.env` 并配置：

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. 启动开发服务器

```bash
pnpm dev
```

4. 构建生产版本

```bash
pnpm build
pnpm start
```

## 项目功能

### 已实现的基础框架

- ✅ Next.js 16 项目结构
- ✅ TypeScript 类型系统
- ✅ shadcn/ui 组件库配置
- ✅ Tailwind CSS 样式系统
- ✅ Zustand 状态管理
- ✅ React Query 数据获取
- ✅ Supabase 集成准备
- ✅ Prisma ORM 配置
- ✅ Excalidraw 画布组件
- ✅ Monaco Editor 代码编辑器
- ✅ ESLint + Prettier 代码质量

### 待实现的功能

- 🔄 AI自然语言转换逻辑
- 🔄 Supabase认证流程
- 🔄 数据库CRUD操作
- 🔄 图表保存和加载
- 🔄 实时协作功能
- 🔄 导出功能（图片、JSON）

## 开发说明

- 所有业务逻辑尚未实现，当前为纯框架搭建
- Excalidraw和Monaco Editor已集成但无具体功能
- 画布页面使用了动态导入以避免SSR问题
- 使用 `components/DynamicCanvas` 包装客户端组件

## 许可证

MIT
