#!/bin/bash

echo "⚠️  这是 Figma 导出时生成的旧初始化脚本。当前项目已经可以直接运行，请优先查看 README.md。"
echo "如确实要创建一个全新的示例项目，再继续执行。"
echo ""

echo "🚀 开始创建情侣 App 本地项目..."

# 创建项目目录
PROJECT_NAME="couple-app"
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

echo "📁 创建项目结构..."
mkdir -p src/app/components/figma
mkdir -p src/imports
mkdir -p src/styles

echo "📝 创建配置文件..."

# 创建 package.json
cat > package.json << 'EOF'
{
  "name": "couple-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router": "^7.13.0",
    "lucide-react": "^0.487.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.7.0",
    "@tailwindcss/vite": "^4.1.12",
    "tailwindcss": "^4.1.12",
    "vite": "^6.3.5",
    "typescript": "^5.3.3",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0"
  }
}
EOF

# 创建 vite.config.ts
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
EOF

# 创建 tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}
EOF

# 创建 index.html
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>我们的小世界 - 菲菲 & 小明</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# 创建 src/main.tsx
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# 创建 .gitignore
cat > .gitignore << 'EOF'
node_modules
dist
.DS_Store
*.log
.env
.env.local
EOF

# 创建 README.md
cat > README.md << 'EOF'
# 菲菲 & 小明的情侣 App

## 安装依赖
```bash
npm install
# 或
pnpm install
```

## 运行开发服务器
```bash
npm run dev
# 或
pnpm run dev
```

## 构建生产版本
```bash
npm run build
```
EOF

echo "✅ 项目结构创建完成！"
echo ""
echo "📦 接下来请："
echo "1. 手动复制所有 src/ 目录下的文件到新项目"
echo "2. 运行: npm install"
echo "3. 运行: npm run dev"
echo ""
echo "项目位置: $(pwd)"
