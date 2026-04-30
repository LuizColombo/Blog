"use client";

import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function RevealSection({ children, className }: { children: React.ReactNode; className?: string }) {
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

const tools = [
  { name: "Maltego", desc: "Montagem de investigações de carteiras digitais" },
  { name: "Breadcrumbs Investigate Crypto", desc: "Investigações de carteiras digitais" },
  { name: "Blockchain Explorer", desc: "Explorador de Bitcoin e Ethereum" },
  { name: "Arkham Intelligence", desc: "Explorador de Bitcoin e Ethereum" },
  { name: "BNB Smart Chain Explorer", desc: "Explorador de BSC" },
  { name: "Cloverpool Explorer", desc: "Explorador de Bitcoin" },
  { name: "BtcScan", desc: "Explorador de Bitcoin" },
  { name: "Blockchair", desc: "Explorador multi-chain" },
  { name: "Etherscan", desc: "Explorador de Ethereum" },
];

const fundamentals = [
  {
    id: "2.1",
    title: "Blockchain",
    body: "Banco de dados distribuído compartilhado entre nós de uma rede. Mantém registro seguro e descentralizado de transações — imutável por design. Cada bloco contém dados codificados do bloco anterior, formando uma cadeia que elimina a necessidade de terceiros confiáveis.",
  },
  {
    id: "2.2",
    title: "Bitcoin",
    body: "Moeda digital peer-to-peer, de código aberto e descentralizada. Todas as transações são registradas em livro-razão público. Novas transações são verificadas contra o blockchain para evitar gasto duplo — a rede global se torna o próprio intermediário.",
  },
  {
    id: "2.3",
    title: "Ethereum",
    body: "Plataforma de software global e descentralizada, projetada para ser escalável, programável, segura e descentralizada. Usa blockchain com blocos que contêm dados codificados do anterior — criando cadeia imutável. Permite contratos inteligentes e tokens.",
  },
  {
    id: "2.4",
    title: "Deep Web & Dark Web",
    body: "Deep Web: parte da Internet não indexada por mecanismos de busca, acessada via Tor. Dark Web: subconjunto da Deep Web com alto anonimato via criptografia — endereços .onion ocultam localização dos servidores. Ambiente para atividades legais e ilegais, sem regulamentação.",
  },
];

const stats = [
  { value: "113", label: "sites .onion analisados" },
  { value: "57", label: "carteiras identificadas" },
  { value: "24", label: "com movimentação significativa" },
  { value: "9", label: "ferramentas OSINT utilizadas" },
];

export default function TCCPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-200">
      {/* Nav */}
      <div className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#2d2d3d]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors"
          >
            <ArrowLeft size={14} /> Voltar ao portfólio
          </Link>
          <span className="text-xs text-slate-600 font-mono">TCC · PUC Minas · 2024</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-32">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="pt-20 pb-16"
        >
          <span className="inline-block text-xs font-mono px-3 py-1 rounded-full border border-violet-500/30 text-violet-400 bg-violet-500/5 mb-6">
            Trabalho de Conclusão de Curso
          </span>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Investigação de Criptoativos
            </span>{" "}
            <span className="text-white">à Luz da Perícia Computacional e da Inteligência Cibernética</span>
          </h1>

          <p className="text-slate-400 text-lg mb-8 max-w-3xl">
            Uma abordagem centrada em atividades ilícitas — rastreamento de transações em blockchains
            públicos, análise de carteiras em sites da Dark Web e uso de ferramentas OSINT para perícia
            forense computacional.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            {["Blockchain", "OSINT", "Perícia Forense", "Bitcoin", "Ethereum", "Dark Web", "Cibersegurança"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[#13131f] border border-[#2d2d3d] text-slate-400 font-mono"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Luiz Henrique Pires Colombo</span>
            <span className="text-[#2d2d3d]">·</span>
            <span>Orientador: Prof. João Benedito dos Santos Junior</span>
            <span className="text-[#2d2d3d]">·</span>
            <span>PUC Minas · 2024</span>
          </div>
        </motion.div>

        {/* Stats bar */}
        <RevealSection className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((s) => (
            <motion.div
              key={s.value}
              variants={fadeUp}
              className="p-5 rounded-xl bg-[#13131f] border border-[#2d2d3d] text-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent mb-1">
                {s.value}
              </div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </motion.div>
          ))}
        </RevealSection>

        {/* Abstract */}
        <RevealSection className="mb-20">
          <motion.div
            variants={fadeUp}
            className="p-8 rounded-2xl bg-[#13131f] border border-[#2d2d3d] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
            <span className="text-xs font-mono text-violet-400 mb-3 block">Resumo</span>
            <p className="text-slate-300 leading-relaxed">
              Este artigo examina técnicas para rastreamento de transações de criptoativos, motivado pela
              expansão desse mercado no setor criminal. Agências governamentais enfrentam necessidade
              crescente de monitorar transações vinculadas a crimes cibernéticos — lavagem de dinheiro,
              ocultação de ativos, fraudes e extorsão. O uso de chaves criptografadas dificulta o
              rastreamento, mas utilizando estratégias e ferramentas OSINT, é possível traçar origem e
              destino das transações e vinculá-las a suspeitos.
            </p>
          </motion.div>
        </RevealSection>

        {/* Seção 1 */}
        <Section number="01" title="Introdução">
          <p className="text-slate-400 leading-relaxed">
            Blockchain e criptomoedas trouxeram avanços significativos: transações rápidas, seguras e
            descentralizadas, maior transparência e acesso a sistemas financeiros globais. Contudo, a mesma
            estrutura descentralizada e anônima que as torna atrativas também as torna suscetíveis a usos
            mal-intencionados.
          </p>
          <div className="mt-6 p-5 rounded-xl bg-[#0a0a0f] border border-[#2d2d3d]">
            <p className="text-sm text-slate-500 leading-relaxed">
              Segundo relatório da{" "}
              <span className="text-violet-400">Kaspersky (2023)</span>, somente em 2022 foram registrados
              ataques que resultaram no roubo de aproximadamente{" "}
              <span className="text-white font-semibold">US$ 2,8 bilhões</span> em fundos de criptomoedas —
              destacando a magnitude do problema e a necessidade de rastreamento especializado.
            </p>
          </div>
        </Section>

        {/* Seção 2 */}
        <Section number="02" title="Fundamentos do Ecossistema">
          <div className="grid md:grid-cols-2 gap-4">
            {fundamentals.map((f) => (
              <RevealSection key={f.id}>
                <motion.div
                  variants={fadeUp}
                  className="p-5 rounded-xl bg-[#0a0a0f] border border-[#2d2d3d] hover:border-violet-500/30 transition-colors h-full"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">
                      {f.id}
                    </span>
                    <span className="font-semibold text-white">{f.title}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.body}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </Section>

        {/* Seção 3 */}
        <Section number="03" title="Estudo de Caso">
          <p className="text-slate-400 leading-relaxed mb-8">
            Um conjunto de <span className="text-white font-semibold">113 websites .onion</span> provenientes
            da DarkNet foi disponibilizado para análise, resultado de ações reais de Perícia Computacional e
            Inteligência Cibernética junto às Forças de Segurança e Lei. Os sites foram visitados via
            navegador Tor em ambiente Linux isolado.
          </p>

          <p className="text-xs font-mono text-slate-500 mb-4">Ferramentas OSINT utilizadas</p>
          <RevealSection className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {tools.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={i}
                className="p-4 rounded-xl bg-[#0a0a0f] border border-[#2d2d3d] hover:border-blue-500/30 transition-colors"
              >
                <p className="text-sm font-semibold text-white mb-1">{t.name}</p>
                <p className="text-xs text-slate-500">{t.desc}</p>
              </motion.div>
            ))}
          </RevealSection>
        </Section>

        {/* Seção 4 */}
        <Section number="04" title="Resultados e Discussões">
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { n: "57", label: "carteiras distintas extraídas dos sites", color: "from-violet-400 to-blue-400" },
              { n: "24", label: "carteiras com movimentações significativas", color: "from-blue-400 to-cyan-400" },
              { n: "5", label: "carteiras analisadas em profundidade", color: "from-violet-400 to-pink-400" },
            ].map((r) => (
              <RevealSection key={r.n}>
                <motion.div
                  variants={fadeUp}
                  className="p-6 rounded-xl bg-[#13131f] border border-[#2d2d3d] text-center"
                >
                  <div
                    className={`text-4xl font-bold bg-gradient-to-r ${r.color} bg-clip-text text-transparent mb-2`}
                  >
                    {r.n}
                  </div>
                  <p className="text-xs text-slate-500">{r.label}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <motion.div
              variants={fadeUp}
              className="p-6 rounded-xl bg-[#13131f] border border-[#2d2d3d]"
            >
              <p className="text-sm font-semibold text-white mb-2">Plataforma desenvolvida</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Como produto complementar ao estudo, foi desenvolvida uma plataforma web (HTML, CSS,
                JavaScript) denominada{" "}
                <span className="text-violet-400">Bitcoin Wallet Transaction Consulter</span> — permite
                consultar carteiras e transações Bitcoin com visualização de dados: número de transações,
                valores enviados/recebidos, saldo total e exportação para planilha XLSX.
              </p>
              <a
                href="https://luizcolombo.github.io/BlockchainApi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
              >
                Ver plataforma <ExternalLink size={13} />
              </a>
            </motion.div>
          </RevealSection>
        </Section>

        {/* Seção 5 */}
        <Section number="05" title="Considerações Finais">
          <div className="space-y-4">
            {[
              "Especialistas enfrentam desafios na análise de criptomoedas: anonimato e descentralização das redes blockchain dificultam rastreamento.",
              "Ausência de regulamentações específicas e falta de ferramentas tecnológicas adaptadas ao contexto nacional tornam o processo mais complicado.",
              "Monero impede qualquer forma de rastreamento — contrasta com Bitcoin e Ethereum, que permitem rastreabilidade até um determinado limite.",
              "Falhas na elaboração de solicitações judiciais por peritos e juízes podem retardar ou inviabilizar investigações ao chegar nas corretoras.",
              "É essencial padronizar solicitações de informações sobre criptoativos junto às corretoras, em conformidade com a LGPD.",
            ].map((point, i) => (
              <RevealSection key={i}>
                <motion.div
                  variants={fadeUp}
                  className="flex gap-4 p-5 rounded-xl bg-[#13131f] border border-[#2d2d3d]"
                >
                  <span className="text-violet-500/60 font-mono text-sm mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-slate-400 text-sm leading-relaxed">{point}</p>
                </motion.div>
              </RevealSection>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className="mb-20"
    >
      <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
        <span className="text-6xl font-black text-[#13131f] select-none leading-none font-mono">
          {number}
        </span>
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <div className="h-px w-16 bg-gradient-to-r from-violet-500 to-transparent mt-1" />
        </div>
      </motion.div>
      <motion.div variants={fadeUp}>{children}</motion.div>
    </motion.section>
  );
}
