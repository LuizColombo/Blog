# Redesign da seção de Projetos (Palco + Trilho) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o carrossel-dentro-de-carrossel da seção de projetos por um layout "palco + trilho" (1 projeto em destaque, troca por miniaturas), e adicionar WikiVila e Loja VTEX Focomix aos projetos de empresa.

**Architecture:** Refatorar `src/components/sections/Projects.tsx` — trocar `ProjectCarousel`/`ScreenshotCarousel`/`ProjectCard` por `ProjectStage` (palco do projeto ativo + trilho de miniaturas). Sub-componentes ficam no mesmo arquivo (padrão atual). `Lightbox` é reaproveitado. Sem mudança em `types/index.ts`. Dados novos em `example-project.ts`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, framer-motion, lucide-react, next/image.

**Convenções deste plano:**
- **Sem test runner** no projeto (só `dev`/`build`/`lint`). Verificação = `npm run lint` + `npm run build` + checagem visual no Chrome. Não há passos de unit test.
- **Commits**: os passos de commit seguem a regra da casa — só executar após OK do Luiz. Um commit por task (mudança lógica única), Conventional Commits.
- Rodar comandos a partir de `/var/www/html/personal/Blog`.

---

### Task 1: Adicionar WikiVila e Loja VTEX Focomix aos projetos de empresa

Projetos novos entram no layout ANTIGO sem quebrar — valida os dados isoladamente antes do refactor visual.

**Files:**
- Modify: `src/content/projects/example-project.ts` (array `enterpriseProjects`, após o objeto `zukkin`, antes do fechamento `]` na linha ~52)

- [ ] **Step 1: Adicionar os dois objetos ao array `enterpriseProjects`**

Inserir após o objeto `zukkin` (que termina com `featured: true,` + `},`), antes do `];`:

```ts
  {
    slug: "wikivila",
    title: "WikiVila — Base de Conhecimento Interna",
    description:
      "Wiki interna estilo Notion para a Vila Nova: setores, permissões granulares, busca full-text e edição colaborativa.",
    longDescription:
      "Base de conhecimento interna da Vila Nova para acabar com documentação dispersa e sem controle de acesso. Organiza conteúdo por setores, com permissões granulares por documento, comentários, favoritos e busca full-text em português. Backend em Go servindo API REST e a SPA Nuxt no mesmo container; PostgreSQL com extensões de busca; autenticação via Keycloak (OIDC) compartilhado entre os sistemas internos.",
    role: "Desenvolvedor Full Stack",
    company: "Grupo Vila Nova",
    period: "2026 – presente",
    tags: ["Go", "chi", "PostgreSQL", "Nuxt 4", "Keycloak", "TipTap", "Docker"],
    screenshots: [
      "/projects/enterprise/wikivila/wikivila_001.png",
      "/projects/enterprise/wikivila/wikivila_002.png",
      "/projects/enterprise/wikivila/wikivila_003.png",
    ],
    highlights: [
      "Migração de auth caseiro (JWT + bcrypt) para Keycloak/OIDC em produção, sem perder dados",
      "Busca full-text em português com tsvector ponderado + fuzzy matching trigram (pg_trgm)",
      "Editor rich-text (TipTap) com lock de edição por documento para evitar conflito de escrita",
    ],
    featured: true,
  },
  {
    slug: "vtex-focomix",
    title: "Loja VTEX Focomix — Storefront Headless B2B",
    description:
      "Storefront headless B2B da Focomix sobre a plataforma VTEX — front próprio consumindo as APIs de catálogo e checkout.",
    longDescription:
      "Loja B2B da Focomix rodando sobre a VTEX, mas sem usar Store Framework: um frontend headless próprio em React/Vite que consome diretamente as APIs de catálogo e checkout da VTEX, mantendo checkout e login nativos por compliance de pagamento. Inclui fluxo de Call Center onde atendentes impersonam clientes B2B para montar pedidos, e um pipeline de integração que alimenta o catálogo/preço/estoque a partir do ERP Oracle.",
    role: "Desenvolvedor Full Stack",
    company: "Grupo Vila Nova",
    period: "2025 – presente",
    tags: ["React 19", "Vite", "TypeScript", "Tailwind 4", "VTEX IO", "VTEX API", "Node.js"],
    screenshots: [
      "/projects/enterprise/vtex-focomix/focomix_001.png",
      "/projects/enterprise/vtex-focomix/focomix_002.png",
      "/projects/enterprise/vtex-focomix/focomix_003.png",
    ],
    highlights: [
      "Front headless full-custom consumindo as APIs de catálogo/checkout da VTEX — controle total de UX",
      "Fluxo de Call Center com SSO cross-domain via JWT assinado para impersonação de clientes B2B",
      "Pipeline de integração ERP Oracle → RabbitMQ → VTEX (multi-loja) via serviço Laravel dedicado",
    ],
    featured: true,
  },
```

- [ ] **Step 2: Verificar lint**

Run: `npm run lint`
Expected: sem erros (0 problems).

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build conclui sem erro de tipo. Imagens ausentes NÃO quebram build (next/image resolve em runtime; `onError` já esconde).

- [ ] **Step 4: Commit** *(após OK do Luiz)*

```bash
git add src/content/projects/example-project.ts
git commit -m "feat(projects): add WikiVila and Focomix VTEX store to enterprise projects"
```

---

### Task 2: Refatorar Projects.tsx para o layout Palco + Trilho

Substitui `ProjectCarousel`, `ScreenshotCarousel` e `ProjectCard` por `ProjectStage` + `StageMedia` + `ThumbnailRail`. Mantém `Lightbox`.

**Files:**
- Modify: `src/components/sections/Projects.tsx` (reescrita das linhas 128–433 — de `ScreenshotCarousel` até o fim; `Lightbox` nas linhas 18–126 fica intacto)

- [ ] **Step 1: Remover `ScreenshotCarousel`, `ProjectCard` e `ProjectCarousel`**

Apagar os três componentes (linhas 128–399 no arquivo atual): `function ScreenshotCarousel`, `function ProjectCard`, `function ProjectCarousel`. Manter `Lightbox` (18–126) e o `export default function Projects` (que será reescrito no Step 4).

- [ ] **Step 2: Ajustar imports do topo**

O bloco de imports (linhas 1–16) deve ficar exatamente assim (remove `AnimatePresence`? não — `Lightbox` usa via wrapper; mantém. Remove nada de lucide ainda usado):

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
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
```

(Removido `useEffect`, `useCallback` do import de react — `Lightbox` usa `useEffect`/`useCallback`, então **manter** esses dois. Import correto:)

```tsx
import { useRef, useState, useEffect, useCallback } from "react";
```

- [ ] **Step 3: Adicionar `StageMedia` e `ThumbnailRail` logo após `Lightbox`**

Inserir após o fechamento do `Lightbox` (linha 126):

```tsx
function StageMedia({ screenshots, title }: { screenshots: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const hasShots = screenshots.length > 0;

  return (
    <div className="p-4 md:border-r border-[#2d2d3d] flex flex-col">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-[#0d0d1a] border border-[#2d2d3d] group/shot">
        <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm">
          Screenshot em breve
        </div>

        {hasShots && (
          <Image
            src={screenshots[current]}
            alt={`${title} screenshot ${current + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 55vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}

        {hasShots && (
          <button
            onClick={() => setLightboxIndex(current)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/shot:opacity-100 transition-opacity bg-black/20 cursor-zoom-in"
            aria-label="Expandir imagem"
          >
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs">
              <ZoomIn size={14} />
              Expandir
            </span>
          </button>
        )}
      </div>

      {screenshots.length > 1 && (
        <div className="flex gap-2 mt-3">
          {screenshots.map((src, i) => (
            <button
              key={src}
              onClick={() => setCurrent(i)}
              className={`relative flex-1 aspect-video rounded-md overflow-hidden bg-[#0d0d1a] border transition-colors ${
                i === current ? "border-violet-500" : "border-[#2d2d3d] hover:border-slate-600"
              }`}
              aria-label={`Ver screenshot ${i + 1}`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </button>
          ))}
        </div>
      )}

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
    </div>
  );
}

function ThumbnailRail({
  projects,
  activeIndex,
  onSelect,
}: {
  projects: Project[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  if (projects.length < 2) return null;

  return (
    <div className="mt-4 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {projects.map((project, index) => (
        <button
          key={project.slug}
          type="button"
          onClick={() => onSelect(index)}
          className={`min-w-[160px] md:min-w-0 text-left rounded-xl border p-2 transition-all ${
            index === activeIndex
              ? "border-violet-500 shadow-[0_0_0_1px_var(--accent)]"
              : "border-[#2d2d3d] hover:border-slate-600"
          }`}
          aria-label={`Ver ${project.title}`}
          aria-current={index === activeIndex}
        >
          <div className="relative aspect-video rounded-md overflow-hidden bg-[#0d0d1a] border border-[#2d2d3d] mb-2">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-blue-500/10" />
            {project.screenshots[0] && (
              <Image
                src={project.screenshots[0]}
                alt=""
                fill
                className="object-cover"
                sizes="200px"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
          </div>
          <p className="text-xs font-semibold text-white truncate">{project.title}</p>
          <p className="text-[10px] text-slate-500 truncate">{project.company}</p>
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Verificar lint (parcial — ainda falta ProjectStage)**

Run: `npm run lint`
Expected: pode acusar `ProjectStage` ainda não definido / `Projects` quebrado — normal, será corrigido no próximo step. Se acusar erro NOS componentes novos (StageMedia/ThumbnailRail), corrigir antes de seguir.

- [ ] **Step 5: Adicionar `ProjectStage` e reescrever `export default Projects`**

Inserir `ProjectStage` após `ThumbnailRail`, e substituir o `export default function Projects` inteiro:

```tsx
function ProjectStage({ group }: { group: ProjectGroup }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const project = group.projects[activeIndex] ?? group.projects[0];

  if (!project) return null;

  return (
    <div ref={ref} className="space-y-1">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-white">{group.title}</h3>
        <p className="text-slate-500 text-sm mt-2 max-w-2xl">{group.description}</p>
      </div>

      <motion.article
        key={project.slug}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] rounded-2xl bg-[#13131f] border border-[#2d2d3d] overflow-hidden shadow-2xl shadow-black/20"
      >
        <StageMedia screenshots={project.screenshots} title={project.title} />

        <div className="flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
              <Building2 size={13} />
              <span>{project.company}</span>
              <span>·</span>
              <span>{project.period}</span>
            </div>

            <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
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

      <ThumbnailRail
        projects={group.projects}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
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
            <ProjectStage key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Verificar lint**

Run: `npm run lint`
Expected: 0 erros. Se acusar `ChevronLeft`/`ChevronRight` não usados (o palco não usa mais setas de projeto), remover ambos do import de lucide-react. `Lightbox` usa `ChevronLeft`/`ChevronRight` internamente → **manter** os dois no import. Confirmar: se lint acusar unused, é porque `Lightbox` os usa e não deveria acusar; caso acuse, revisar.

- [ ] **Step 7: Verificar build**

Run: `npm run build`
Expected: build OK, sem erro de tipo.

- [ ] **Step 8: Commit** *(após OK do Luiz)*

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat(projects): replace nested carousels with stage + thumbnail rail layout"
```

---

### Task 3: Capturar screenshots via Chrome e salvar no projeto

Interativo — depende do Luiz estar logado nos apps internos. Executar na sessão com as ferramentas claude-in-chrome.

**Files:**
- Create: `public/projects/enterprise/wikivila/wikivila_001.png` … `_003.png`
- Create: `public/projects/enterprise/vtex-focomix/focomix_001.png` … `_003.png`
- Create/Update: `public/projects/enterprise/motor-credito/*` e `public/projects/enterprise/zukkin/*` (se Luiz fornecer URLs)

- [ ] **Step 1: Confirmar URLs e login com o Luiz**

Perguntar: URLs internas de Motor de Crédito e Zukkin; confirmar que está logado em `wikivila.vilanova.com.br` e `focomix.vilanova.com.br` no Chrome.

- [ ] **Step 2: Carregar ferramentas do Chrome**

Um único ToolSearch: `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__read_page,mcp__claude-in-chrome__tabs_create_mcp`

- [ ] **Step 3: Para cada app — navegar, capturar as melhores telas, salvar**

Abrir aba nova, navegar à URL, capturar 2-3 telas boas (dashboard/listagem/detalhe) e salvar em `public/projects/enterprise/<slug>/<slug>_00N.png`. Evitar botões que disparam dialog. Se cair em tela de login, avisar o Luiz e parar.

- [ ] **Step 4: Ajustar quantidade de screenshots no data file se necessário**

Se um projeto tiver menos prints que os 3 listados, ajustar o array `screenshots` em `example-project.ts` pra bater com os arquivos reais (evita miniatura quebrada).

- [ ] **Step 5: Verificar visual no dev server**

O `npm run dev` já roda. Abrir `http://localhost:3000/#projetos` no Chrome, conferir que os prints aparecem no palco, trilho e lightbox.

- [ ] **Step 6: Commit** *(após OK do Luiz)*

```bash
git add public/projects/enterprise
git commit -m "feat(projects): add screenshots for enterprise projects"
```

---

### Task 4: Verificação final (visual + responsivo)

**Files:** nenhum (só verificação)

- [ ] **Step 1: Lint + build limpos**

Run: `npm run lint && npm run build`
Expected: ambos sem erro.

- [ ] **Step 2: Checagem visual desktop**

No Chrome em `http://localhost:3000/#projetos`: clicar cada miniatura do trilho → palco troca; clicar tira de miniaturas → screenshot grande troca; expandir → lightbox abre/fecha (Esc, setas, clique fora); ambos os grupos (Pessoais + Empresa) renderizam.

- [ ] **Step 3: Checagem visual mobile**

Redimensionar viewport pra ~375px: palco vira coluna única (print em cima, texto embaixo); trilho vira scroll horizontal; nada estoura a largura da tela.

- [ ] **Step 4: Confirmar remoção de código morto**

`grep -n "ProjectCarousel\|ScreenshotCarousel\|ProjectCard\|scrollIntoView\|snap-x" src/components/sections/Projects.tsx`
Expected: sem resultados (todo o carrossel antigo foi removido).

---

## Self-Review (do plano vs spec)

- **Cobertura do spec:** layout palco+trilho → Task 2; roster + conteúdo novos → Task 1; screenshots → Task 3; verificação (lint/build/visual/responsivo) → Task 4; sem mudança em types → confirmado (nenhuma task toca `types/index.ts`); remoção de código morto → Task 4 Step 4. ✓
- **Placeholders:** nenhum "TBD"/"TODO"; todo código está completo nos steps.
- **Consistência de tipos:** `StageMedia({screenshots,title})`, `ThumbnailRail({projects,activeIndex,onSelect})`, `ProjectStage({group})` — assinaturas usadas batem com as chamadas em `ProjectStage`/`Projects`. `Lightbox` mantém a assinatura original `{screenshots,title,initialIndex,onClose}`, chamada igual em `StageMedia`. Slugs de screenshots (`wikivila`, `vtex-focomix`) batem entre `example-project.ts` (Task 1) e os paths de captura (Task 3).
