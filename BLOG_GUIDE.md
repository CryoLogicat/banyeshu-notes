# 半页书：写作与发布操作指南

这份文档用于记录 `半页书` 博客的日常写作、预览和发布方法。

## 1. 先了解两个仓库

博客由两个 GitHub 仓库共同发布：

| 仓库 | 用途 |
| --- | --- |
| [`CryoLogicat/banyeshu-notes`](https://github.com/CryoLogicat/banyeshu-notes) | 存放博客程序和 Markdown 文章，平时主要修改这里 |
| [`CryoLogicat/qunyaodu.github.io`](https://github.com/CryoLogicat/qunyaodu.github.io) | 存放个人主页，并负责把主页和博客合并发布到 `qydu.top` |

最终访问地址：

- 个人主页：<https://qydu.top/>
- 博客首页：<https://qydu.top/blog/>
- 文章地址：`https://qydu.top/blog/notes/<slug>/`

> 日常写文章只需要修改 `banyeshu-notes` 仓库，不要把 Markdown 文章写进主页仓库。

## 2. 文章放在哪里

所有文章都放在：

```text
content/posts/
```

每篇文章对应一个 `.md` 文件，例如：

```text
content/posts/react-mental-model.md
content/posts/git-rebase.md
content/posts/my-new-note.md
```

建议文件名使用小写英文和连字符：

```text
正确：transformer-attention.md
正确：python-async-notes.md
不推荐：我的学习笔记.md
不推荐：note 1.md
```

## 3. 新文章模板

创建一个新的 `.md` 文件，将下面的内容复制进去：

````markdown
---
slug: my-new-note
title: 我的新笔记
description: 用一两句话介绍这篇笔记的内容
date: 2026-07-20
category: 学习笔记
readingTime: 5
---

这里开始写正文。

## 第一个小节

普通段落可以直接书写。

### 更小的标题

- 列表项目一
- 列表项目二

> 这里是一段引用。

行内代码可以写成 `const value = 1`。

```ts
function hello(name: string) {
  return `Hello, ${name}`;
}
```
````

## 4. 文章信息字段

每篇文章最上方的 `---` 区域叫作 frontmatter，下面六个字段都需要保留。

### `slug`

文章网址中的唯一标识。例如：

```yaml
slug: react-mental-model
```

对应网址：

```text
https://qydu.top/blog/notes/react-mental-model/
```

要求：

- 每篇文章的 `slug` 不能重复。
- 建议只使用小写英文字母、数字和连字符。
- 文章发布后尽量不要修改，否则旧网址会失效。
- 文件名可以与 `slug` 相同，方便管理，但真正决定网址的是 `slug`。

### `title`

文章标题，会显示在首页文章列表和文章页顶部。

```yaml
title: React 的心智模型：从状态到界面
```

正文中不需要再写一级标题 `# 标题`。

### `description`

文章摘要，会显示在首页标题下方，也会用于网页的搜索和分享描述。

```yaml
description: 比 API 更重要的，是理解 React 如何看待一次渲染。
```

建议控制在一到两句话内。

### `date`

发布日期，必须使用 `YYYY-MM-DD` 格式：

```yaml
date: 2026-07-20
```

首页会按照日期从新到旧排序。

### `category`

文章分类：

```yaml
category: 人工智能
```

相同分类应使用完全相同的文字，例如不要同时使用“AI”和“人工智能”，否则它们会被识别成两个分类。

### `readingTime`

预计阅读时间，填写整数，单位是分钟：

```yaml
readingTime: 8
```

## 5. 当前支持的 Markdown 语法

目前博客支持：

- 二级标题：`## 标题`
- 三级标题：`### 标题`
- 普通段落
- 粗体：`**重要内容**`
- 行内代码：反引号包裹的内容
- 无序列表：`- 项目`
- 有序列表：`1. 项目`
- 引用：`> 引用内容`
- 围栏代码块：三个反引号
- 链接：`[链接文字](https://example.com)`

目前没有实现 Markdown 图片语法。如果需要在文章中插图，需要先扩展 `components/Markdown.tsx` 的图片渲染能力。

## 6. 方法一：直接在 GitHub 网页写文章

适合不想使用命令行时操作。

1. 打开 [`content/posts`](https://github.com/CryoLogicat/banyeshu-notes/tree/main/content/posts)。
2. 点击右上角 **Add file**。
3. 选择 **Create new file**。
4. 输入文件名，例如 `my-new-note.md`。
5. 粘贴“新文章模板”，修改文章信息和正文。
6. 点击页面右上角的 **Commit changes...**。
7. 提交目标选择 `main` 分支。
8. 确认提交。
9. 推送后会自动发布到 `qydu.top/blog/`，可以在 Actions 页面查看进度。

编辑已有文章时，直接打开对应 `.md` 文件，点击铅笔图标进行修改，然后提交即可。

## 7. 方法二：在本地写文章

### 第一次准备

确保已经安装 Node.js 22 或更高版本，然后进入博客项目目录：

```powershell
cd "E:\个人博客"
npm install
```

### 启动本地预览

```powershell
npm run dev
```

浏览器打开：

```text
http://localhost:3000/
```

在 `content/posts/` 中创建或修改 Markdown 文件后，刷新页面即可查看效果。

### 发布前检查

```powershell
npm run build
```

看到构建成功并列出所有文章地址后，再提交代码。

### 提交文章

下面以 `my-new-note.md` 为例：

```powershell
git add content/posts/my-new-note.md
git commit -m "Add my new note"
git push github main
```

如果同时修改了多个文件，可以先运行：

```powershell
git status
```

确认文件列表正确后再提交。

## 8. 更新或删除文章

### 更新文章

直接编辑原来的 `.md` 文件并重新提交。为了让旧链接继续有效，建议保持 `slug` 不变。

### 删除文章

删除对应的 `.md` 文件并提交，然后重新发布主页和博客。删除后该文章网址会变成 404。

## 9. 发布到 qydu.top/blog

将文章推送到 `banyeshu-notes/main` 后，发布会自动进行，不需要再手动操作主页仓库。

自动发布顺序如下：

1. `banyeshu-notes` 构建并发布博客项目。
2. 构建成功后，它会使用专用部署密钥把最新博客版本号写入主页仓库。
3. 主页仓库收到更新后自动运行 **Deploy Homepage and Blog**。
4. 主页工作流获取指定版本的博客，将它构建到 `/blog` 路径。
5. GitHub Pages 发布主页和博客。

可以依次查看两个工作流的进度：

1. [`banyeshu-notes / Deploy GitHub Pages`](https://github.com/CryoLogicat/banyeshu-notes/actions/workflows/pages.yml)
2. [`qunyaodu.github.io / Deploy Homepage and Blog`](https://github.com/CryoLogicat/qunyaodu.github.io/actions/workflows/pages.yml)

等待两个工作流都显示绿色对勾，再打开 <https://qydu.top/blog/> 检查文章。

如果自动触发失败，可以打开主页的 [`Deploy Homepage and Blog`](https://github.com/CryoLogicat/qunyaodu.github.io/actions/workflows/pages.yml)，点击 **Run workflow**，选择 `master` 后手动运行。

这个工作流会执行以下操作：

1. 获取最新版个人主页。
2. 获取 `banyeshu-notes` 的 `main` 分支。
3. 将博客构建到 `/blog` 路径。
4. 把主页和博客合并。
5. 发布到 GitHub Pages。

## 10. 完整的日常流程

最常用的操作可以记成下面五步：

1. 在 `content/posts/` 创建或修改 `.md` 文件。
2. 确认 frontmatter 六个字段完整。
3. 本地运行 `npm run build` 检查，或直接在 GitHub 网页提交。
4. 将修改推送到 `banyeshu-notes/main`。
5. 等待两个仓库的工作流自动完成，然后打开线上博客检查。

## 11. 常见问题

### 首页没有出现新文章

依次检查：

1. 文件是否位于 `content/posts/`。
2. 扩展名是否为 `.md`。
3. frontmatter 是否有上下两行 `---`。
4. 六个字段是否完整。
5. 修改是否已经推送到 `banyeshu-notes/main`。
6. 两个仓库的自动发布工作流是否都成功完成。

### GitHub Actions 构建失败

打开失败任务，展开 **Build blog for /blog**。常见原因包括：

- frontmatter 缺少字段。
- `readingTime` 不是数字。
- Markdown 文件编码异常。
- 文件中意外删除了 frontmatter 的 `---`。

修正文章后重新提交，再运行工作流。

### 中文出现乱码

保存 Markdown 文件时选择 **UTF-8** 编码，不要使用 ANSI 或其他本地编码。

VS Code 右下角会显示当前文件编码。点击编码名称后，可以选择 **Save with Encoding → UTF-8**。

### 文章网址打不开

确认网址结尾和 `slug` 一致：

```text
https://qydu.top/blog/notes/<slug>/
```

刚发布完成时可能需要等待几十秒。如果仍然是 404，重新检查工作流是否成功。

### 修改文章标题后网址会不会变化

不会。网址由 `slug` 决定，与 `title` 和文件名无关。

## 12. 快速入口

- [博客文章目录](https://github.com/CryoLogicat/banyeshu-notes/tree/main/content/posts)
- [博客仓库 Actions](https://github.com/CryoLogicat/banyeshu-notes/actions)
- [主页合并发布工作流](https://github.com/CryoLogicat/qunyaodu.github.io/actions/workflows/pages.yml)
- [线上博客](https://qydu.top/blog/)
- [线上个人主页](https://qydu.top/)
