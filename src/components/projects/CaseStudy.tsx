"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useSpring, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  ExternalLink,
  Hand,
  Lightbulb,
  Target,
  Users,
  ZoomIn,
} from "lucide-react";
import type { Project } from "@/types";
import { categoryLabels } from "@/content/projects";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import Lightbox from "@/components/ui/Lightbox";
import AnimatedCounter from "./AnimatedCounter";
import MetricChart from "./MetricChart";
import { accentHex, nodeKinds } from "./theme";

// React Flow mede o DOM: renderiza só no cliente.
const FlowDiagram = dynamic(() => import("./FlowDiagram"), {
  ssr: false,
  loading: () => <div className="h-[420px] md:h-[480px] animate-pulse rounded-xl bg-[#0d0d1a]" />,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ kicker, title, accent }: { kicker: string; title: string; accent: string }) {
  return (
    <motion.div variants={fadeUp} className="mb-6">
      <span className="text-xs font-mono uppercase tracking-widest" style={{ color: accent }}>
        {kicker}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">{title}</h2>
    </motion.div>
  );
}

function Gallery({ project }: { project: Project }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {project.screenshots.map((src, i) => (
          <motion.button
            key={src}
            variants={fadeUp}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative aspect-video rounded-xl overflow-hidden border border-[#2d2d3d] bg-[#0d0d1a] cursor-zoom-in ${
              i === 0 && project.screenshots.length % 2 === 1 ? "sm:col-span-2" : ""
            }`}
            aria-label={`Expandir screenshot ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${project.title} — tela ${i + 1}`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs">
                <ZoomIn size={14} /> Expandir
              </span>
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <Lightbox
            screenshots={project.screenshots}
            title={project.title}
            initialIndex={open}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function CaseStudy({ project, prev, next }: { project: Project; prev: Project; next: Project }) {
  const accent = accentHex[project.accent];
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const kindsInFlow = Array.from(new Set(project.flow.nodes.map((node) => node.kind)));

  return (
    <article className="relative overflow-x-clip">
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 origin-left z-[60]"
        style={{ scaleX: progress, background: `linear-gradient(90deg, ${accent}, #2563eb)` }}
      />

      {/* Hero */}
      <header className="relative px-6 pt-32 pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-30"
          style={{ background: accent }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(#2d2d3d 1px, transparent 1px), linear-gradient(90deg, #2d2d3d 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
          }}
        />

        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative max-w-5xl mx-auto">
          <motion.div variants={fadeUp}>
            <Link
              href="/#projetos"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-10"
            >
              <ArrowLeft size={14} /> Todos os projetos
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-5 text-xs">
            <span
              className="px-2.5 py-1 rounded-full font-mono uppercase tracking-wider"
              style={{ color: accent, background: `${accent}1a`, border: `1px solid ${accent}44` }}
            >
              {categoryLabels[project.category]}
            </span>
            <span className="px-2.5 py-1 rounded-full border border-[#2d2d3d] text-slate-400">{project.period}</span>
            <span className="px-2.5 py-1 rounded-full border border-[#2d2d3d] text-slate-400">{project.status}</span>
            {project.team && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#2d2d3d] text-slate-400">
                <Users size={12} /> Projeto em equipe
              </span>
            )}
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl">
            {project.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-400 mt-5 max-w-3xl leading-relaxed">
            {project.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mt-8 text-sm">
            <span className="inline-flex items-center gap-2 text-slate-400">
              <Briefcase size={15} /> {project.role} · {project.company}
            </span>
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#2d2d3d] text-slate-300 hover:text-white hover:border-violet-500/50 transition-colors"
              >
                <GitHubIcon size={14} /> Código
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#2d2d3d] text-slate-300 hover:text-white hover:border-violet-500/50 transition-colors"
              >
                <ExternalLink size={14} /> Demo
              </a>
            )}
          </motion.div>
        </motion.div>
      </header>

      <div className="px-6 pb-24 space-y-24">
        {/* Números */}
        <Reveal className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={fadeUp}
              className="relative rounded-2xl bg-[#13131f] border border-[#2d2d3d] p-6 overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20"
                style={{ background: accent }}
              />
              <p className="relative text-4xl font-bold text-white">
                <AnimatedCounter metric={metric} />
              </p>
              <p className="relative text-sm text-slate-400 mt-2">{metric.label}</p>
            </motion.div>
          ))}
        </Reveal>

        {/* Problema → solução */}
        <Reveal className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Target, title: "O problema", text: project.problem, color: "#f87171" },
            { icon: Lightbulb, title: "A solução", text: project.solution, color: accent },
          ].map(({ icon: Icon, title, text, color }) => (
            <motion.div key={title} variants={fadeUp} className="rounded-2xl bg-[#13131f] border border-[#2d2d3d] p-7">
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4"
                style={{ color, background: `${color}1a` }}
              >
                <Icon size={18} />
              </span>
              <h2 className="text-xl font-semibold text-white mb-3">{title}</h2>
              <p className="text-slate-400 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </Reveal>

        {/* Arquitetura */}
        <Reveal className="max-w-6xl mx-auto">
          <div className="max-w-5xl mx-auto">
            <SectionTitle kicker="Arquitetura" title="Como os dados fluem" accent={accent} />
          </div>
          <motion.div
            variants={fadeUp}
            className="relative rounded-3xl border border-[#2d2d3d] bg-[#0d0d1a] overflow-hidden"
            style={{ boxShadow: `0 40px 120px -60px ${accent}55` }}
          >
            <FlowDiagram flow={project.flow} accent={accent} />
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-[#2d2d3d] bg-[#13131f]/80">
              <div className="flex flex-wrap gap-4">
                {kindsInFlow.map((kind) => (
                  <span key={kind} className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full" style={{ background: nodeKinds[kind].color }} />
                    {nodeKinds[kind].label}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Hand size={12} /> arraste os blocos
              </span>
            </div>
          </motion.div>
        </Reveal>

        {/* Destaques + gráfico */}
        <Reveal
          className={`max-w-5xl mx-auto grid grid-cols-1 gap-8 ${project.chart ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}
        >
          <div>
            <SectionTitle kicker="Destaques técnicos" title="O que fez diferença" accent={accent} />
            <ol className="space-y-4">
              {project.highlights.map((highlight, i) => (
                <motion.li key={highlight} variants={fadeUp} className="flex gap-4">
                  <span
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
                    style={{ color: accent, background: `${accent}1a`, border: `1px solid ${accent}33` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-slate-300 leading-relaxed pt-1">{highlight}</p>
                </motion.li>
              ))}
            </ol>
          </div>
          {project.chart && (
            <motion.div variants={fadeUp} className="lg:pt-16">
              <MetricChart chart={project.chart} accent={accent} />
            </motion.div>
          )}
        </Reveal>

        {/* Telas */}
        {project.screenshots.length > 0 && (
          <Reveal className="max-w-5xl mx-auto">
            <SectionTitle kicker="Telas" title="Por dentro do sistema" accent={accent} />
            <Gallery project={project} />
          </Reveal>
        )}

        {/* Stack */}
        <Reveal className="max-w-5xl mx-auto">
          <SectionTitle kicker="Stack" title="Tecnologias" accent={accent} />
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                variants={fadeUp}
                whileHover={{ y: -3, borderColor: accent }}
                className="px-3 py-1.5 rounded-lg text-sm bg-[#13131f] border border-[#2d2d3d] text-slate-300 font-mono"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </Reveal>

        {/* Navegação entre cases */}
        <nav className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Outros projetos">
          {[
            { project: prev, label: "Anterior", icon: ArrowLeft, align: "text-left" },
            { project: next, label: "Próximo", icon: ArrowRight, align: "sm:text-right" },
          ].map(({ project: other, label, icon: Icon, align }) => (
            <Link
              key={label}
              href={`/projetos/${other.slug}`}
              className={`group rounded-2xl bg-[#13131f] border border-[#2d2d3d] p-6 transition-colors hover:border-violet-500/50 ${align}`}
            >
              <span className={`flex items-center gap-2 text-xs text-slate-500 ${align === "text-left" ? "" : "sm:justify-end"}`}>
                {label === "Anterior" && <Icon size={14} />}
                {label}
                {label === "Próximo" && <Icon size={14} className="transition-transform group-hover:translate-x-1" />}
              </span>
              <span className="block text-lg font-semibold text-white mt-2">{other.shortTitle}</span>
              <span className="block text-sm text-slate-500 mt-1 line-clamp-1">{other.description}</span>
            </Link>
          ))}
        </nav>
      </div>
    </article>
  );
}
