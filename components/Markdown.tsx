import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return tokens.filter(Boolean).map((token, index) => {
    if (token.startsWith("`") && token.endsWith("`")) return <code key={index}>{token.slice(1, -1)}</code>;
    if (token.startsWith("**") && token.endsWith("**")) return <strong key={index}>{token.slice(2, -2)}</strong>;
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link && /^(https?:\/\/|\/)/.test(link[2])) return <a href={link[2]} key={index}>{link[1]}</a>;
    return token;
  });
}

export function Markdown({ source }: { source: string }) {
  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index += 1; continue; }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) code.push(lines[index++]);
      index += 1;
      blocks.push(<pre key={blocks.length}><code data-language={language || undefined}>{code.join("\n")}</code></pre>);
      continue;
    }

    if (line.startsWith("## ")) { blocks.push(<h2 key={blocks.length}>{inline(line.slice(3))}</h2>); index += 1; continue; }
    if (line.startsWith("### ")) { blocks.push(<h3 key={blocks.length}>{inline(line.slice(4))}</h3>); index += 1; continue; }
    if (line.startsWith("> ")) { blocks.push(<blockquote key={blocks.length}>{inline(line.slice(2))}</blockquote>); index += 1; continue; }

    if (/^- /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^- /.test(lines[index])) items.push(lines[index++].slice(2));
      blocks.push(<ul key={blocks.length}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ul>);
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\. /.test(lines[index])) items.push(lines[index++].replace(/^\d+\. /, ""));
      blocks.push(<ol key={blocks.length}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ol>);
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{2,3} |```|> |- |\d+\. )/.test(lines[index])) paragraph.push(lines[index++]);
    blocks.push(<p key={blocks.length}>{inline(paragraph.join(" "))}</p>);
  }

  return <div className="markdown">{blocks}</div>;
}
