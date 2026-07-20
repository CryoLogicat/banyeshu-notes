import Link from "next/link";
import { getAllPosts } from "../lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const categories = Array.from(
    posts.reduce((counts, post) => {
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
      return counts;
    }, new Map<string, number>()),
  );

  return (
    <main className="site-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="半页书首页">
          <span className="brand-mark" aria-hidden="true">半</span>
          <span>半页书</span>
        </Link>
        <nav className="nav" aria-label="主导航">
          <a href="#notes">笔记</a>
          <a href="#categories">分类</a>
          <a href="#about">关于</a>
        </nav>
        <div className="status"><span aria-hidden="true" />NOTES ONLINE</div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">PERSONAL KNOWLEDGE LOG / 2026</p>
          <h1>半页<span>书</span></h1>
          <p className="subtitle">把学过的东西，写成可以返回的路。</p>
        </div>
        <aside className="hero-side" aria-label="站点摘要">
          <p className="prompt">
            guest@banyeshu:~$ <b>ls ./notes</b><br />
            react/ git/ ai/ systems/<br />
            guest@banyeshu:~$ <span className="cursor" aria-hidden="true" />
          </p>
          <div className="hero-counts">
            <div><strong>{String(posts.length).padStart(2, "0")}</strong><span>PUBLISHED NOTES</span></div>
            <div><strong>{String(categories.length).padStart(2, "0")}</strong><span>KNOWLEDGE PATHS</span></div>
          </div>
        </aside>
      </section>

      <div className="content-grid">
        <section id="notes">
          <h2 className="section-title"><span>01 /</span> 最近笔记</h2>
          <div className="notes-list">
            {posts.map((post, index) => (
              <Link className="note-card" href={`/notes/${post.slug}`} key={post.slug}>
                <div className="note-meta">
                  <span>N.{String(posts.length - index).padStart(3, "0")}</span>
                  <time dateTime={post.date}>{post.date.replaceAll("-", ".")}</time>
                </div>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <div className="note-tags"><span>{post.category}</span><span>{post.readingTime} 分钟阅读</span></div>
                </div>
                <span className="note-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <aside className="sidebar">
          <section id="categories">
            <h2 className="section-title"><span>02 /</span> 分类</h2>
            <div className="tag-list">
              {categories.map(([name, count]) => <span className="tag" key={name}>{name}<em>{String(count).padStart(2, "0")}</em></span>)}
            </div>
          </section>
          <section id="about">
            <h2 className="section-title"><span>03 /</span> 关于</h2>
            <div className="about-card">
              <div className="prompt">// README.md</div>
              <p>这里记录编程、工具和人工智能的学习笔记。不追求面面俱到，只把真正理解过的东西留下来。</p>
              <div className="signature">— 一个持续学习的普通人</div>
            </div>
          </section>
        </aside>
      </div>

      <footer className="footer"><span>© 2026 半页书 · BUILT FROM MARKDOWN</span><span>KEEP LEARNING / KEEP WRITING</span></footer>
    </main>
  );
}
