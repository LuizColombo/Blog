"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight, Bot, BrainCircuit, Plug, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import type { ProjectFlow, ProjectMetric } from "@/types";
import AnimatedCounter from "@/components/projects/AnimatedCounter";
import MiniFlow from "@/components/projects/MiniFlow";

const workflow: ProjectFlow = {
  nodes: [
    { id: "me", label: "Eu", kind: "user", col: 0, row: 1 },
    { id: "cc", label: "Claude Code", kind: "service", col: 1, row: 1 },
    { id: "brain", label: "Segundo cérebro", kind: "data", col: 1, row: 2.4 },
    { id: "agents", label: "Subagentes", kind: "service", col: 2, row: 0 },
    { id: "skills", label: "Skills próprias", kind: "service", col: 2, row: 1 },
    { id: "mcp", label: "MCP", kind: "external", col: 2, row: 2 },
    { id: "out", label: "Código revisado", kind: "front", col: 3, row: 1 },
  ],
  edges: [
    { from: "me", to: "cc" },
    { from: "cc", to: "brain" },
    { from: "cc", to: "agents" },
    { from: "cc", to: "skills" },
    { from: "cc", to: "mcp" },
    { from: "agents", to: "out" },
    { from: "skills", to: "out" },
  ],
};

const stats: ProjectMetric[] = [
  { value: 7, label: "subagentes por stack" },
  { value: 10, label: "skills próprias" },
  { value: 3, label: "integrações MCP" },
];

const pillars = [
  {
    icon: Bot,
    title: "Subagentes por stack",
    text: "Go, Laravel, PHP, React e revisão de código — cada um conhece os padrões dos projetos da casa.",
  },
  {
    icon: Terminal,
    title: "Skills próprias",
    text: "O que se repete virou comando: commits granulares, chamados de suporte, reintegração de produto na VTEX, registro no ClickUp.",
  },
  {
    icon: Plug,
    title: "Conectado ao dia a dia",
    text: "Via MCP o agente lê e atualiza o ClickUp, acompanha o Jenkins e testa as telas no navegador.",
  },
  {
    icon: BrainCircuit,
    title: "Memória de longo prazo",
    text: "Um segundo cérebro no Obsidian guarda o estado de cada projeto, as decisões e as pegadinhas — o contexto não se perde entre sessões.",
  },
  {
    icon: ShieldCheck,
    title: "Guard rails",
    text: "Tudo é produção: teste, migration e deploy só rodam com confirmação. TDD e code review antes de qualquer commit.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function AIAgents() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="relative mt-20 rounded-3xl p-px bg-gradient-to-br from-violet-500/50 via-[#2d2d3d] to-blue-500/40"
    >
      <div className="relative rounded-[calc(1.5rem-1px)] bg-[#0d0d18] overflow-hidden p-6 md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-violet-600/20 blur-[100px]"
        />

        <div className="relative grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          <div>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-violet-300 bg-violet-500/10 border border-violet-500/30"
            >
              <Sparkles size={13} /> Engenharia com agentes de IA
            </motion.span>
            <motion.h3 variants={fadeUp} className="text-3xl font-bold text-white mt-4 leading-tight">
              Eu não programo sozinho — <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">orquestro agentes</span>.
            </motion.h3>
            <motion.p variants={fadeUp} className="text-slate-400 mt-4 leading-relaxed">
              No Grupo Vila Nova uso o Claude Code como par de programação no dia a dia: montei subagentes
              especializados, skills para os fluxos que se repetem e integrações com as ferramentas do time.
              A IA executa; eu desenho, reviso e decido.
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 mt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-[#13131f] border border-[#2d2d3d] p-3">
                  <p className="text-2xl font-bold text-white">
                    <AnimatedCounter metric={stat} />
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="relative rounded-2xl border border-[#2d2d3d] bg-[#0a0a0f] h-64 md:h-72 p-4"
          >
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl opacity-60"
              style={{ backgroundImage: "radial-gradient(#2d2d3d 1px, transparent 1px)", backgroundSize: "16px 16px" }}
            />
            <div className="relative h-full">
              <MiniFlow flow={workflow} accent="#8b5cf6" />
            </div>
          </motion.div>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-10">
          {pillars.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-xl bg-[#13131f] border border-[#2d2d3d] p-4 hover:border-violet-500/40 transition-colors"
            >
              <Icon size={18} className="text-violet-400" />
              <p className="text-sm font-semibold text-white mt-3">{title}</p>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="relative mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#2d2d3d] bg-[#13131f]/60 px-5 py-4"
        >
          <p className="text-sm text-slate-400">
            E também construo IA <span className="text-white">para a empresa</span>: plataforma de agentes, feed de
            conhecimento para LLMs e um iPaaS pensado para ser operado por IA.
          </p>
          <Link
            href="/projetos/ra-agentes-ia"
            className="inline-flex items-center gap-1 text-sm font-medium text-violet-400 hover:text-violet-300 shrink-0"
          >
            Ver a plataforma RA <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
