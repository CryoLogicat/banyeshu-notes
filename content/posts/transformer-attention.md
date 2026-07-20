---
slug: transformer-attention
title: Transformer 注意力机制，终于看懂了
description: 从 Query、Key、Value 出发，建立一套直觉解释。
date: 2026-07-04
category: 人工智能
readingTime: 8
---
注意力机制解决的问题可以说得很朴素：处理当前位置时，模型应该参考上下文中的哪些信息？

## Query、Key 与 Value

可以把它想象成一次检索：

- **Query** 表示当前想寻找什么
- **Key** 表示每条信息适合被怎样匹配
- **Value** 是真正要取回的内容

Query 与所有 Key 计算相似度，经过缩放和 softmax 得到权重，再对 Value 做加权求和。

```text
Attention(Q, K, V) = softmax(QKᵀ / √d) V
```

## 为什么需要多头注意力

单个注意力头只能在一个表示空间里建立关系。多头注意力让模型可以同时关注不同类型的联系，例如语法依赖、指代关系和语义相似度。

## 真正要记住的直觉

注意力不是模型在“像人一样集中精神”，而是一种可学习的信息路由机制：根据当前问题，从上下文中动态组合需要的信息。
