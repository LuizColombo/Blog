"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  X,
  ZoomIn,
  ExternalLink,
} from "lucide-react";
import type { Project, ProjectGroup } from "@/types";
import { GitHubIcon } from "@/components/ui/BrandIcons";

function Lightbox({
  screenshots,
  title,
  initialIndex,
  onClose,
}: {
  screenshots: string[];
  title: string;
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length),
    [screenshots.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % screenshots.length),
    [screenshots.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X size={20} />
      </button>

      {/* counter */}
      <span className="absolute top-4 left-1/2 -translate-x-1/2 text-slate-400 text-sm font-mono">
        {current + 1} / {screenshots.length}
      </span>

      {/* image */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative w-[90vw] max-w-5xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={screenshots[current]}
          alt={`${title} screenshot ${current + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </motion.div>

      {/* nav */}
      {screenshots.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? "bg-violet-400" : "bg-slate-600"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

function ScreenshotCarousel({ screenshots, title }: { screenshots: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!screenshots.length) return null;

  return (
    <>
      <div className="relative aspect-video md:aspect-auto md:h-full md:min-h-[280px] overflow-hidden bg-[#0d0d1a] border-b md:border-b-0 md:border-r border-[#2d2d3d] group/carousel">
        <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm">
          Screenshot em breve
        </div>

        <Image
          src={screenshots[current]}
          alt={`${title} screenshot ${current + 1}`}
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {/* expand hint */}
        <button
          onClick={() => setLightboxIndex(current)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-black/20 cursor-zoom-in"
          aria-label="Expandir imagem"
        >
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs">
            <ZoomIn size={14} />
            Expandir
          </span>
        </button>

        {screenshots.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % screenshots.length); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === current ? "bg-violet-400" : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            screenshots={screenshots}
            title={title}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
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
      className="group grid h-full grid-cols-1 md:grid-cols-[3fr_2fr] rounded-2xl bg-[#13131f] border border-[#2d2d3d] hover:border-violet-500/30 transition-all shadow-2xl shadow-black/20 overflow-hidden"
    >
      <ScreenshotCarousel screenshots={project.screenshots} title={project.title} />

      <div className="flex flex-col justify-between p-6">
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

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="px-2 py-0.5 rounded border border-slate-700 text-slate-400">
            Papel: {project.role}
          </span>
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-700 text-slate-400 hover:text-white hover:border-violet-500/40 transition-colors"
            >
              <GitHubIcon size={12} />
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-700 text-slate-400 hover:text-white hover:border-violet-500/40 transition-colors"
            >
              <ExternalLink size={12} />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCarousel({ group }: { group: ProjectGroup }) {
  const [current, setCurrent] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = (index + group.projects.length) % group.projects.length;
      slideRefs.current[nextIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setCurrent(nextIndex);
    },
    [group.projects.length]
  );

  const updateCurrent = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const center = scroller.getBoundingClientRect().left + scroller.clientWidth / 2;
    const nearest = slideRefs.current.reduce(
      (best, slide, index) => {
        if (!slide) return best;

        const rect = slide.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - center);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY }
    );

    setCurrent(nearest.index);
  }, []);

  if (!group.projects.length) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-white">{group.title}</h3>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">{group.description}</p>
        </div>

        {group.projects.length > 1 && (
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              className="p-2 rounded-lg border border-[#2d2d3d] bg-[#13131f] text-slate-400 hover:text-white hover:border-violet-500/40 transition-colors"
              aria-label={`Projeto anterior em ${group.title}`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              className="p-2 rounded-lg border border-[#2d2d3d] bg-[#13131f] text-slate-400 hover:text-white hover:border-violet-500/40 transition-colors"
              aria-label={`Próximo projeto em ${group.title}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0d0d18] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#0d0d18] to-transparent" />

        <div
          ref={scrollerRef}
          onScroll={updateCurrent}
          className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-3 [scrollbar-width:none] md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {group.projects.map((project, index) => (
            <div
              key={project.slug}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className="min-w-0 shrink-0 basis-[88%] snap-center lg:basis-[82%]"
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>

      {group.projects.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {group.projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === current ? "w-8 bg-violet-400" : "w-2 bg-slate-700 hover:bg-slate-500"
              }`}
              aria-label={`Ir para ${project.title}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Projects({ groups }: { groups: ProjectGroup[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const visibleGroups = groups.filter((group) => group.projects.length > 0);

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
            Projetos pessoais e soluções desenvolvidas em ambientes profissionais. Quando há
            confidencialidade, compartilho prints e resumos funcionais.
          </p>
        </motion.div>

        <div className="space-y-16">
          {visibleGroups.map((group) => (
            <ProjectCarousel key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
