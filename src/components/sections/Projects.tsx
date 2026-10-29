"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Users } from "lucide-react";
import type { Project, ProjectCategory } from "@/types";
import { categoryLabels } from "@/content/projects";
import AnimatedCounter from "@/components/projects/AnimatedCounter";
import MiniFlow from "@/components/projects/MiniFlow";
import { accentHex } from "@/components/projects/theme";

type Filter = "all" | ProjectCategory;

/** Larguras no grid de 6 colunas; a ordem dos projetos fecha cada linha em 6. */
const BENTO_SPAN: Record<string, 2 | 3 | 4> = {
  "gestor-fretes": 4,
  "debito-pasta": 2,
  "monitoramento-noc": 2,
  "ra-agentes-ia": 4,
  "ipaas-middleware": 3,
  "motor-credito": 3,
  pokedex: 3,
  "blockchain-api": 3,
};

const spanClass = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
} as const;

function StatusDot({ status }: { status: Project["status"] }) {
  const color = status === "Em validação" ? "bg-amber-400" : "bg-emerald-400";
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
      <span className="relative flex w-2 h-2">
        <span className={`absolute inset-0 rounded-full ${color} opacity-60 animate-ping`} />
        <span className={`relative w-2 h-2 rounded-full ${color}`} />
      </span>
      {status}
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = accentHex[project.accent];
  const span = BENTO_SPAN[project.slug] ?? 2;
  const wide = span >= 3;
  const metric = project.metrics[0];

  function trackSpotlight(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`col-span-1 ${spanClass[span]}`}
    >
      <Link
        href={`/projetos/${project.slug}`}
        onMouseMove={trackSpotlight}
        className="group relative flex flex-col h-full rounded-2xl bg-[#13131f] border border-[#2d2d3d] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-transparent"
      >
        {/* spotlight que segue o cursor + borda acesa no hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), ${accent}22, transparent 60%)`,
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `inset 0 0 0 1px ${accent}88, 0 20px 50px -20px ${accent}66` }}
        />

        <div className={`relative border-b border-[#2d2d3d] bg-[#0d0d1a] ${wide ? "h-44" : "h-36"} px-4 py-3`}>
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(#2d2d3d 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative h-full">
            <MiniFlow flow={project.flow} accent={accent} compact={!wide} />
          </div>
        </div>

        <div className="relative flex flex-col flex-1 p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: accent }}>
              {categoryLabels[project.category]} · {project.period}
            </span>
            <StatusDot status={project.status} />
          </div>

          <h3 className="text-lg font-bold text-white leading-snug flex items-center gap-2">
            {project.shortTitle}
            {project.team && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded border border-[#2d2d3d] text-slate-400">
                <Users size={10} /> equipe
              </span>
            )}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mt-2 line-clamp-3">{project.description}</p>

          {metric && (
            <div className={`mt-4 flex gap-x-2 gap-y-1 ${wide ? "items-baseline" : "flex-col"}`}>
              <span className="text-3xl font-bold text-white whitespace-nowrap">
                <AnimatedCounter metric={metric} />
              </span>
              <span className="text-xs text-slate-500">{metric.label}</span>
            </div>
          )}

          <div className="mt-auto pt-4 flex items-end justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, wide ? 5 : 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[11px] bg-[#1e1e2e] border border-[#2d2d3d] text-slate-400 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span
              className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-[#2d2d3d] text-slate-400 transition-all duration-300 group-hover:text-white group-hover:rotate-45"
              style={{ background: "var(--card)" }}
            >
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "Todos", count: projects.length },
    ...(["enterprise", "personal"] as const).map((id) => ({
      id,
      label: categoryLabels[id],
      count: projects.filter((p) => p.category === id).length,
    })),
  ];
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projetos" className="relative py-24 px-6 bg-[#0d0d18] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]"
      />
      <div className="relative max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-violet-400 text-sm font-mono uppercase tracking-widest">02. projetos</span>
            <h2 className="text-4xl font-bold mt-2 text-white">O que construí</h2>
            <p className="text-slate-500 mt-3 max-w-xl">
              Sistemas em produção, com o problema que resolvem, a arquitetura e os números. Clique em um
              projeto para ver o case completo.
            </p>
          </div>

          <div className="flex gap-1 p-1 rounded-full bg-[#13131f] border border-[#2d2d3d] self-start md:self-auto">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`relative px-4 py-1.5 text-sm rounded-full transition-colors ${
                  filter === f.id ? "text-white" : "text-slate-400 hover:text-white"
                }`}
                aria-pressed={filter === f.id}
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">
                  {f.label} <span className="text-xs opacity-60">{f.count}</span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
