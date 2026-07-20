# 半页书

一个使用 Markdown 写作的个人学习笔记博客。

- 博客地址：<https://qydu.top/blog/>
- 文章目录：[`content/posts`](./content/posts)
- 完整操作说明：[`BLOG_GUIDE.md`](./BLOG_GUIDE.md)

## 本地运行

要求 Node.js 22 或更高版本。

```bash
npm install
npm run dev
```

浏览器打开 <http://localhost:3000/>。

## 构建检查

```bash
npm run build
```

博客会被构建为静态网页，并由 `qunyaodu.github.io` 仓库的 GitHub Actions 发布到 `/blog/`。
