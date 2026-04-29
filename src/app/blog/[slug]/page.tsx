export const runtime = "edge";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/content/posts";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Voltar ao blog
        </Link>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {post.readingTime}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
            <p className="text-slate-500 leading-relaxed mb-6">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-[#1e1e2e] border border-[#2d2d3d] text-slate-500 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="h-px bg-[#2d2d3d]" />
          </header>

          <div className="space-y-5 text-slate-400 leading-relaxed">
            {post.content.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
