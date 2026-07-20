import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: number;
  content: string;
};

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

const notesDirectory = join(process.cwd(), "content", "posts");
const posts = readdirSync(notesDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file) => parsePost(readFileSync(join(notesDirectory, file), "utf8")))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getAllPosts() { return posts; }
export function getPostBySlug(slug: string) { return posts.find((post) => post.slug === slug); }
