---
slug: react-mental-model
title: React 的心智模型：从状态到界面
description: 比 API 更重要的，是理解 React 如何看待一次渲染。
date: 2026-07-18
category: 前端开发
readingTime: 6
---
React 最值得学习的并不是某一个 Hook，而是它背后的心智模型：**界面是状态在某一时刻的快照**。

## 渲染不是“修改页面”

当组件执行时，React 会根据当前的 props 和 state 计算出一份新的 UI 描述。它并不会要求我们手动寻找 DOM 节点并修改内容。

```tsx
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

每次点击都会请求一次新的渲染。`count` 在每次渲染中都是固定的值，而不是不断变化的全局变量。

## 状态应该尽可能少

如果一个值可以由现有的 props 或 state 计算得到，就不需要再把它存进 state。重复状态会带来同步问题。

- 保留最小且完整的状态集合
- 在渲染期间计算派生值
- 把状态放在真正需要它的最近公共父组件中

> 先问“什么是事实来源”，再问“应该写几个 useState”。

## 一句话总结

把组件理解为一个函数：输入是状态，输出是界面。围绕这个模型组织代码，React 会变得简单很多。
