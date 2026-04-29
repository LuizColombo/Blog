export const runtime = "edge";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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
                <Calendar size={12} /> Em breve
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> — min
              </span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Post: {slug}
            </h1>
            <div className="h-px bg-[#2d2d3d]" />
          </header>

          <div className="prose prose-invert prose-violet max-w-none text-slate-400 leading-relaxed">
            <p>Conteúdo em breve.</p>
          </div>
        </article>
      </div>
    </main>
  );
}
