# 菲菲 & 小明的小世界

一个情侣专属 PWA 小应用，包含共同日记、小纸条、纪念日、待办事项和照片墙。

## 技术栈

- React 18
- TypeScript
- React Router 7
- Tailwind CSS 4
- Vite 6
- vite-plugin-pwa

## 本地开发

```bash
npm install
npm run dev
```

开发服务启动后，打开终端里显示的本地地址，通常是：

```text
http://localhost:5173/
```

## 常用命令

```bash
npm run dev        # 启动开发服务器
npm run typecheck  # TypeScript 类型检查
npm run build      # 生产构建
npm run preview    # 预览生产构建
```

## Supabase 同步

登录账号在 Supabase Auth 中创建：

```text
feifei@little-world.local  ->  feifei
ming@little-world.local    ->  ming
```

App 登录页使用账号名 `feifei` / `ming`，密码由 Supabase Auth 校验。

需要配置环境变量：

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

数据库表和 Realtime 配置在：

```text
supabase/schema.sql
```

## 当前功能

- 待办事项：新增、完成、删除、本地保存
- 小纸条：选择发送者、发送、删除、本地保存
- 共同日记：新增、删除、本地保存
- 纪念日：新增、删除、倒计时、本地保存
- 照片墙：本地上传、压缩、删除、本地保存
- PWA：manifest、图标、service worker、自动更新

## 本地数据

当前数据存储在浏览器 `localStorage` 中，key 统一定义在：

```text
src/app/lib/storageKeys.ts
```

这适合 PWA 原型和单设备使用。后续如果需要双人同步，可以把这些 hook 迁移到 Supabase、Firebase 或自建后端。

## PWA

PWA 配置在：

```text
vite.config.ts
```

图标文件在：

```text
public/pwa-192x192.png
public/pwa-512x512.png
```

## 部署

推荐部署到 Vercel、Netlify 或 Cloudflare Pages。

通用配置：

```text
Build command: npm run build
Output directory: dist
```
