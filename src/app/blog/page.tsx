import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { posts } from "@/content/posts";

export default function BlogPage() {
  return (
    <main className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Voltar ao início
        </Link>

        <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
        <p className="text-slate-500 mb-12">
          Notas e artigos sobre backend, sistemas e o que aprendo no caminho.
        </p>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 rounded-xl bg-[#13131f] border border-[#2d2d3d] hover:border-violet-500/40 transition-all group"
            >
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {post.readingTime}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-slate-500 text-sm">{post.excerpt}</p>
              <div className="flex gap-2 mt-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-[#1e1e2e] border border-[#2d2d3d] text-slate-500 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
