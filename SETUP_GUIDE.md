# 本地安装指南 - 菲菲 & 小明的情侣 App

> 注意：这份文档是 Figma 导出时生成的旧安装说明，仅作为历史参考。当前项目已经整理为可直接运行的 npm + Vite + PWA 项目，请优先查看 `README.md`。

## 第一步：创建项目文件夹

在你的电脑上创建一个新文件夹 `couple-app`，然后在这个文件夹中创建以下文件：

---

## 文件 1: package.json

创建文件 `package.json`，复制以下内容：

```json
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
```

---

## 文件 2: index.html

创建文件 `index.html`（在根目录）：

```html
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
```

---

## 文件 3: vite.config.ts

创建文件 `vite.config.ts`：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

## 文件 4: tsconfig.json

创建文件 `tsconfig.json`：

```json
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
```

---

## 第二步：创建 src 文件夹结构

在 `couple-app` 文件夹中创建以下目录结构：

```
couple-app/
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   ├── routes.tsx
│   │   └── components/
│   │       ├── Layout.tsx
│   │       ├── HomePage.tsx
│   │       ├── DiaryPage.tsx
│   │       ├── NotesPage.tsx
│   │       ├── TodoPage.tsx
│   │       ├── AnniversariesPage.tsx
│   │       ├── PhotosPage.tsx
│   │       └── figma/
│   │           └── ImageWithFallback.tsx
│   ├── imports/
│   │   └── image.png (猫咪图片)
│   └── styles/
│       ├── index.css
│       └── theme.css
```

---

## 第三步：安装依赖并运行

在 `couple-app` 文件夹中打开终端，运行：

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

---

## 所有源代码文件将在下面列出...

（由于内容较多，我会分别发送每个文件的内容）
