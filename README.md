# X_Blog - 工具收集网站

一个现代化的工具收集网站，使用 Next.js 14 和 React 18 构建。

## 功能特性

- 🎨 **现代化UI设计** - 采用玻璃态效果和渐变色彩
- 🌓 **主题切换** - 支持日间/夜间模式自由切换
- 🔤 **字体自定义** - 提供多种字体选择（Inter, Outfit, Poppins）
- 📁 **分类管理** - 自由添加和管理工具分类
- 🔧 **工具管理** - 添加、浏览和搜索各类工具
- 📱 **响应式设计** - 完美适配各种设备尺寸
- 🚀 **静态导出** - 可部署到 Cloudflare Pages 等静态托管平台

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI**: React 18
- **样式**: Tailwind CSS
- **语言**: TypeScript
- **数据存储**: JSON 文件
- **字体**: Google Fonts (Inter, Outfit, Poppins)

## 快速开始

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 开发模式

\`\`\`bash
npm run dev
\`\`\`

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

\`\`\`bash
npm run build
\`\`\`

构建后的静态文件将输出到 `out` 目录。

## 部署到 Cloudflare Pages

1. 将代码推送到 GitHub 仓库
2. 在 Cloudflare Pages 中连接该仓库
3. 设置构建命令: \`npm run build\`
4. 设置输出目录: \`out\`
5. 点击部署

## 项目结构

\`\`\`
x_blog/
├── app/                    # Next.js App Router 页面
│   ├── api/               # API 路由
│   ├── categories/        # 分类相关页面
│   ├── tools/             # 工具相关页面
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── ThemeProvider.tsx  # 主题提供者
│   ├── Header.tsx         # 页头
│   ├── Footer.tsx         # 页脚
│   ├── ToolCard.tsx       # 工具卡片
│   └── ...
├── lib/                   # 工具函数和服务
│   ├── dataService.ts     # 数据服务
│   └── types.ts           # TypeScript 类型定义
├── data/                  # JSON 数据文件
│   ├── categories.json    # 分类数据
│   └── tools.json         # 工具数据
└── public/                # 静态资源
\`\`\`

## 使用说明

### 添加分类

1. 点击首页的"添加分类"按钮
2. 填写分类名称、描述和选择图标
3. 提交表单

### 添加工具

1. 点击首页的"添加工具"按钮
2. 填写工具信息（名称、描述、链接、分类等）
3. 可选择添加标签和设置为推荐工具
4. 提交表单

### 浏览工具

- 首页按分类展示所有工具
- 点击工具卡片查看详细信息
- 使用搜索栏快速查找工具

## 自定义

### 修改主题颜色

编辑 `tailwind.config.ts` 中的颜色配置：

\`\`\`typescript
colors: {
  primary: { ... },
  accent: { ... },
}
\`\`\`

### 添加新字体

1. 在 `app/layout.tsx` 中导入 Google 字体
2. 在 `tailwind.config.ts` 中添加字体配置
3. 在 `components/FontSelector.tsx` 中添加选项

## License

MIT
