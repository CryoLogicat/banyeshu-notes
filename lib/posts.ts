import reactMentalModel from "../content/posts/react-mental-model.md?raw";
import gitRebase from "../content/posts/git-rebase.md?raw";
import transformerAttention from "../content/posts/transformer-attention.md?raw";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: number;
  content: string;
};

const sourceFiles = [reactMentalModel, gitRebase, transformerAttention];

function parsePost(source: string): Post {
  const normalized = source.replace(/^\uFEFF/, "").replaceAll("\r\n", "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Markdown note is missing frontmatter");

  const meta = Object.fromEntries(
    match[1].split("\n").map((line) => {
      const divider = line.indexOf(":");
      return [line.slice(0, divider).trim(), line.slice(divider + 1).trim()];
    }),
  );

  return {
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    date: meta.date,
    category: meta.category,
    readingTime: Number(meta.readingTime),
    content: match[2].trim(),
  };
}

const posts = sourceFiles.map(parsePost).sort((a, b) => b.date.localeCompare(a.date));

export function getAllPosts() { return posts; }
export function getPostBySlug(slug: string) { return posts.find((post) => post.slug === slug); }
