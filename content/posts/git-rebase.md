---
slug: git-rebase
title: Git rebase：把历史整理成一条线
description: 工作原理、常见冲突，以及什么时候不应该使用它。
date: 2026-07-12
category: Git 与工具
readingTime: 5
---
`git rebase` 的核心并不是“合并分支”，而是把一组提交重新播放到新的基点之上。

## 它做了什么

假设功能分支从主分支的旧提交创建。主分支继续前进后，可以执行：

```bash
git switch feature
git rebase main
```

Git 会暂时取下功能分支的提交，把分支移动到 `main` 的最新位置，再依次应用那些提交。

## 为什么历史更整洁

rebase 之后，提交图看起来像一条直线，代码审查和定位问题都会更容易。但代价是原提交的哈希会改变。

## 安全边界

- 可以整理尚未共享的本地提交
- 不要随意重写其他人已经基于其工作的公共分支
- 冲突解决后用 `git rebase --continue` 继续
- 不确定时，先建立一个临时分支作为保险

> rebase 是历史编辑工具。整洁很有价值，但协作约定更重要。
