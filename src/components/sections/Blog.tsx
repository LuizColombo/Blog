"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { Post } from "@/types";
import { posts as defaultPosts } from "@/content/posts";

function PostCard({ post, index }: { post: Post; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block p-6 rounded-xl bg-[#13131f] border border-[#2d2d3d] hover:border-violet-500/40 transition-all group"
      >
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readingTime}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors mb-2">
          {post.title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded bg-[#1e1e2e] border border-[#2d2d3d] text-slate-500 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
          <ArrowRight
            size={16}
            className="text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all"
          />
        </div>
      </Link>
    </motion.article>
  );
}

export default function Blog({ posts = defaultPosts }: { posts?: Post[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="text-violet-400 text-sm font-mono uppercase tracking-widest">
              03. blog
            </span>
            <h2 className="text-4xl font-bold mt-2 text-white">Últimos posts</h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-1 text-sm text-slate-400 hover:text-violet-300 transition-colors"
          >
            Ver todos <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="text-sm text-slate-400 hover:text-violet-300 transition-colors"
          >
            Ver todos os posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
