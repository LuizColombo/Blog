import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Post } from "@/types";

const posts: Post[] = [
  {
    slug: "primeiros-passos-go",
    title: "Do PHP ao Go: o que mudou na minha forma de pensar",
    excerpt:
      "Depois de anos escrevendo PHP, minha transição para Go trouxe insights sobre tipagem, concorrência e como estruturar sistemas que escalam.",
    date: "28 Abr 2025",
    readingTime: "8 min",
    tags: ["Go", "PHP", "Arquitetura"],
    content: "",
  },
  {
    slug: "rabbitmq-laravel-na-pratica",
    title: "RabbitMQ + Laravel na prática: padrões que funcionam",
    excerpt:
      "Como estruturo filas de mensagens em projetos Laravel reais, evitando os erros comuns e garantindo resiliência em produção.",
    date: "15 Abr 2025",
    readingTime: "12 min",
    tags: ["Laravel", "RabbitMQ", "Queue"],
    content: "",
  },
  {
    slug: "postgresql-performance",
    title: "Queries lentas no PostgreSQL: diagnóstico e otimização",
    excerpt:
      "Um guia prático sobre EXPLAIN ANALYZE, índices que valem a pena e quando desnormalizar é a resposta certa.",
    date: "02 Abr 2025",
    readingTime: "10 min",
    tags: ["PostgreSQL", "Performance", "SQL"],
    content: "",
  },
];

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
