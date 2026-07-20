import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000/";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: { default: "半页书｜个人学习笔记", template: "%s｜半页书" },
    description: "把学过的东西，写成可以返回的路。记录编程、工具与人工智能的个人学习笔记。",
    icons: { icon: new URL("favicon.svg", siteUrl), shortcut: new URL("favicon.svg", siteUrl) },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      siteName: "半页书",
      title: "半页书｜个人学习笔记",
      description: "把学过的东西，写成可以返回的路。",
      images: [{ url: "/og.png", width: 1536, height: 1024, alt: "半页书" }],
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
