"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import type { Project } from "@/types";

function ScreenshotCarousel({ screenshots, title }: { screenshots: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  if (!screenshots.length) return null;

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-[#0d0d1a] border border-[#2d2d3d]">
      <Image
        src={screenshots[current]}
        alt={`${title} screenshot ${current + 1}`}
        fill
        className="object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Placeholder when no real image */}
      <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm">
        Screenshot em breve
      </div>

      {screenshots.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % screenshots.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === current ? "bg-violet-400" : "bg-slate-600"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group grid md:grid-cols-2 gap-8 p-6 rounded-2xl bg-[#13131f] border border-[#2d2d3d] hover:border-violet-500/30 transition-all"
    >
      <ScreenshotCarousel screenshots={project.screenshots} title={project.title} />

      <div className="flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
            <Building2 size={13} />
            <span>{project.company}</span>
            <span>·</span>
            <span>{project.period}</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.longDescription}</p>

          <div className="mb-4">
            <p className="text-xs text-violet-400 font-mono uppercase tracking-wide mb-2">
              Destaques
            </p>
            <ul className="space-y-1">
              {project.highlights.map((h) => (
                <li key={h} className="text-xs text-slate-500 flex gap-2">
                  <span className="text-violet-500 mt-0.5">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs bg-[#1e1e2e] border border-[#2d2d3d] text-slate-400 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="px-2 py-0.5 rounded border border-slate-700 text-slate-400">
            Papel: {project.role}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projetos" className="py-24 px-6 bg-[#0d0d18]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-violet-400 text-sm font-mono uppercase tracking-widest">
            02. projetos
          </span>
          <h2 className="text-4xl font-bold mt-2 text-white">O que construí</h2>
          <p className="text-slate-500 mt-3 max-w-lg">
            Projetos desenvolvidos em ambientes profissionais. Por questões de confidencialidade,
            compartilho prints e resumos funcionais.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
