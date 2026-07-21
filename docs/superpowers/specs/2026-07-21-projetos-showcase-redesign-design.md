# Redesign da seção de Projetos — Palco + Trilho

**Data:** 2026-07-21
**Componente:** `src/components/sections/Projects.tsx`
**Status:** aprovado para implementação

## Problema

A seção de projetos usa **carrossel dentro de carrossel**:

1. Carrossel externo (troca de projeto) — setas no topo + barra de progresso embaixo.
2. Carrossel interno (screenshots do projeto) — setas dentro da imagem + bolinhas.

Resultado: dois pares de setas e duas fileiras de indicadores competindo na mesma tela; o usuário não sabe qual controle faz o quê. Somado a isso: o card vizinho vaza pela direita (peek poluído), screenshots com `object-cover` cortam a imagem feio, e o split horizontal aperta o texto.

## Objetivo

Cada projeto com destaque próprio na tela, um por vez, com **um único modelo de navegação**. Adicionar 2 projetos de empresa (WikiVila, Loja VTEX Focomix) além dos existentes.

## Solução — Layout "Palco + Trilho" (Opção A)

Escolhida entre 3 direções (A palco+trilho, B seções alternadas full-width, C abas spotlight). A venceu por eliminar o carrossel aninhado mantendo destaque por projeto.

### Estrutura por grupo

```
[ Header do grupo: kicker + título + descrição ]

┌─────────────────── PALCO ───────────────────┐
│  [ screenshot grande ]   │  empresa · período │
│  [ tira de miniaturas ]  │  TÍTULO            │
│                          │  descrição         │
│                          │  DESTAQUES (lista) │
│                          │  tags              │
│                          │  papel · links     │
└──────────────────────────────────────────────┘

[ TRILHO: miniatura projeto 1 | 2 | 3 | 4 ]  ← clique troca o palco
```

- **Palco**: mostra 1 projeto. Coluna esquerda (~1.35fr) = screenshot grande + tira de miniaturas das screenshots *daquele* projeto (troca a imagem grande). Coluna direita (~1fr) = metadados, descrição, destaques, tags, papel, links.
- **Trilho**: miniaturas dos projetos do grupo. Clicar → o projeto vira o palco. O ativo fica destacado (borda violeta). É o **único** controle de troca de projeto — não há carrossel externo, setas de projeto nem scroll-snap.
- **Lightbox**: reaproveitado do código atual; abre ao expandir a screenshot grande.

### Responsivo
- **Desktop**: palco em grid 2 colunas; trilho em grid de 4 (ou N) colunas.
- **Mobile**: palco em coluna única (print em cima, texto embaixo); trilho em scroll horizontal de miniaturas.

### Navegação — modelo único
- Trocar de **projeto** = clicar no trilho.
- Trocar de **screenshot** dentro do projeto = clicar na tira de miniaturas (setas opcionais na imagem grande como conveniência, mas indicador único).
- Expandir screenshot = lightbox.

## Componentes

Refatorar `Projects.tsx`:

- **`ProjectStage`** (novo) — substitui `ProjectCarousel`. Estado: `activeProjectIndex`. Renderiza header do grupo + palco do projeto ativo + trilho. Sem scroll-snap, sem setas de projeto.
- **`StageMedia`** (novo, ou parte de ProjectStage) — screenshot grande + tira de miniaturas; estado `activeShotIndex`; abre lightbox.
- **`StageInfo`** (novo, ou parte de ProjectStage) — metadados/descrição/destaques/tags/papel/links (reaproveita markup do `ProjectCard` atual).
- **`ThumbnailRail`** (novo) — miniaturas dos projetos; `onSelect(index)`.
- **`Lightbox`** — mantido como está.
- **Remover**: `ProjectCarousel`, `ScreenshotCarousel`, `ProjectCard` (absorvidos), lógica de scroll-snap/`updateCurrent`/`slideRefs`.

`Projects` (export default) continua recebendo `groups: ProjectGroup[]` e renderiza um `ProjectStage` por grupo. Sem mudança de contrato externo.

## Dados

`src/types/index.ts` — **sem mudança** (já cobre tudo: slug, title, description, longDescription, role, company, period, tags, screenshots, highlights, featured, repositoryUrl?, demoUrl?).

`src/content/projects/example-project.ts` — adicionar 2 projetos em `enterpriseProjects`:

### WikiVila
- **title:** WikiVila — Base de Conhecimento Interna
- **stack/tags:** Go 1.25, chi, PostgreSQL, Nuxt 4, Keycloak, TipTap, Docker
- **descrição:** wiki interna estilo Notion pra Vila Nova — setores, permissões granulares, comentários, favoritos, busca full-text.
- **destaques:**
  - Migração de auth caseiro (JWT+bcrypt) para Keycloak/OIDC em produção sem perder dados
  - Busca full-text em português com `tsvector` ponderado + fuzzy trigram (`pg_trgm`)
  - Editor rich-text (TipTap) com lock de edição por documento
- **role:** Desenvolvedor Full Stack · **company:** Grupo Vila Nova · **period:** 2026 · **interno** (sem repo/demo público)

### Loja VTEX Focomix
- **title:** Loja VTEX Focomix — Storefront Headless B2B
- **stack/tags:** React 19, Vite, TypeScript, Tailwind 4, VTEX IO, VTEX APIs, Node.js
- **descrição:** storefront headless B2B da Focomix sobre VTEX (não é Store Framework); front próprio consumindo APIs de catálogo/checkout, checkout/login nativos VTEX.
- **destaques:**
  - Front headless full-custom consumindo APIs de catálogo/checkout da VTEX (controle total de UX)
  - Fluxo de Call Center com SSO cross-domain via JWT assinado (impersonação B2B)
  - Pipeline de integração ERP Oracle → RabbitMQ → VTEX (multi-loja) via serviço Laravel dedicado
- **role:** Desenvolvedor Full Stack · **company:** Grupo Vila Nova · **period:** 2025–presente · **interno**

Textos são rascunho — usuário revisa antes/depois da implementação.

## Screenshots

Capturar via Chrome (claude-in-chrome) na sessão logada do usuário; salvar em `public/projects/<slug>/`.

- WikiVila → `https://wikivila.vilanova.com.br` (auth Keycloak — usuário loga)
- Focomix → `https://focomix.vilanova.com.br` (B2B — usuário loga se preciso)
- Motor de Crédito / Zukkin → URLs internas a fornecer pelo usuário
- Placeholder elegante (gradiente + "Screenshot em breve") enquanto não houver print — substitui o `object-cover` cru atual por enquadramento melhor.

## Fora de escopo (YAGNI)

- Página individual por projeto (`/projetos/[slug]`) — não agora.
- Filtro/busca de projetos, ordenação — não agora.
- Mudança nos outros componentes de seção (Hero, About, etc).
- Refactor de tipos.

## Verificação

- `npm run lint` limpo.
- `npm run build` sem erro.
- Verificação visual no dev server (desktop + mobile viewport) via Chrome: troca de projeto pelo trilho, troca de screenshot pela tira, lightbox, responsivo.
