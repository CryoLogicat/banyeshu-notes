import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "../../../components/Markdown";
import { getAllPosts, getPostBySlug } from "../../../lib/posts";

export function generateStaticParams() { return getAllPosts().map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="article-shell">
      <header className="article-topbar">
        <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true">半</span><span>半页书</span></Link>
        <Link className="back-link" href="/">← 返回笔记目录</Link>
      </header>
      <article>
        <header className="article-header">
          <p className="article-kicker">{post.category.toUpperCase()} / {post.date.replaceAll("-", ".")}</p>
          <h1 className="article-title">{post.title}</h1>
          <p className="article-description">{post.description}</p>
          <div className="article-info"><span>{post.readingTime} 分钟阅读</span><span>MARKDOWN SOURCE</span></div>
        </header>
        <Markdown source={post.content} />
      </article>
      <footer className="article-footer"><Link className="back-link" href="/">← 继续浏览全部笔记</Link></footer>
    </main>
  );
}
