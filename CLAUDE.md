@AGENTS.md

# Blog Pessoal — Luiz Colombo

Portfolio pessoal + blog técnico. Deploy alvo: Cloudflare Pages (ou Vercel).

## Stack

- **Next.js 16.2.4** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — animações scroll-reveal e stagger
- **lucide-react** — ícones (sem ícones de marca: GitHub/LinkedIn usam SVG em `src/components/ui/BrandIcons.tsx`)
- **next-mdx-remote + gray-matter** — instalados, prontos pra posts MDX
- **clsx + tailwind-merge** — utilitário `cn()` em `src/lib/utils.ts`

## Estrutura

```
src/
├── app/
│   ├── layout.tsx              # metadata SEO pt-BR
│   ├── page.tsx                # home single-page (Navbar + 5 seções + Footer)
│   ├── projetos/[slug]/page.tsx # case study estático (generateStaticParams, dynamicParams=false)
│   ├── globals.css             # dark theme, CSS vars, scrollbar custom
│   └── blog/
│       ├── page.tsx            # lista de posts
│       └── [slug]/page.tsx     # post (params é Promise — await obrigatório)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # sticky blur, mobile menu animado
│   │   └── Footer.tsx
│   ├── projects/               # CaseStudy, FlowDiagram (React Flow), MiniFlow (SVG), MetricChart, AnimatedCounter
│   ├── sections/
│   │   ├── Hero.tsx            # stagger animation, gradient blobs, grid overlay
│   │   ├── About.tsx           # skills 4 cards, scroll reveal
│   │   ├── Projects.tsx        # bento grid + filtro; card leva ao case
│   │   ├── Blog.tsx            # preview 3 posts recentes
│   │   └── Contact.tsx         # social links + form
│   └── ui/
│       └── BrandIcons.tsx      # GitHubIcon, LinkedInIcon (SVG direto)
├── content/projects/
│   └── index.ts                # Project[] — problema/solução, métricas, gráfico e fluxo (React Flow)
└── types/index.ts              # interfaces Project e Post
```

## Paleta (CSS vars em globals.css)

| Var | Valor |
|-----|-------|
| `--background` | `#0a0a0f` |
| `--card` | `#13131f` |
| `--muted` | `#1e1e2e` |
| `--border` | `#2d2d3d` |
| `--accent` | `#7c3aed` (violet) |
| `--accent-2` | `#2563eb` (blue) |

## Comandos

```bash
npm run dev          # dev server (porta 3000)
npm run dev -- --port 3001   # porta específica
npm run build        # build de produção
npm run lint         # lint
```

## Gotchas importantes

- **Next.js 16**: `params` e `searchParams` são `Promise` — sempre `await params`.
- **lucide-react** nesta versão não tem `Github` nem `Linkedin` — usar `BrandIcons.tsx`.
- **Framer Motion Variants**: tipar como `Variants` do framer-motion; `ease` não aceita `string` puro no type, precisa do import correto.
- **Tailwind v4**: config via `@theme inline` no CSS, não `tailwind.config.js`.

## Conteúdo a personalizar

1. `src/content/projects/index.ts` — projetos (cada um com `flow`, `metrics` e `chart` opcional)
2. `public/projects/<slug>/` — screenshots dos projetos (formato `.png`)
3. `src/components/sections/Hero.tsx` — nome, título, bio
4. `src/components/sections/About.tsx` — skills reais, bio longa
5. `src/components/sections/Contact.tsx` — URLs reais do GitHub/LinkedIn
6. `src/app/layout.tsx` — metadata SEO final
7. `public/curriculo.pdf` — CV para download

## Deploy Cloudflare Pages

Site 100% estático (`output: "export"` no `next.config.ts`) — sem adapter, sem edge runtime.

- Build command (painel da Cloudflare): `npm run build`
- Output directory: `out` (definido no `wrangler.toml`, `pages_build_output_dir`)
- Push na `main` = deploy automático.
- Toda rota dinâmica precisa de `generateStaticParams` + `dynamicParams = false`; nada de route handler, cookies, headers ou Server Actions.
- Imagens: `images.unoptimized` (sem servidor não há otimização do Next).
- Testar como em produção: `npm run build && npx wrangler pages dev out`.
