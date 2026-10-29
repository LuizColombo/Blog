import type { Project, ProjectGroup } from "@/types";

export const enterpriseProjects: Project[] = [
  {
    slug: "motor-credito",
    title: "Motor de Crédito",
    description:
      "Engine de análise de crédito B2B com integração Serasa, Quod e regras de negócio configuráveis.",
    longDescription:
      "Sistema de análise de crédito para concessão de limite a clientes B2B. Avalia comportamento interno (histórico de pagamentos, faturamento, inadimplência) e dados externos (Serasa PF/PJ, Quod) para recomendar limite e formas de pagamento. As regras de crédito são configuráveis pelo time comercial via painel administrativo, sem necessidade de código. Integração com workflow ZEEV para fluxo de aprovação multinível.",
    role: "Desenvolvedor Full Stack",
    company: "Grupo Vila Nova",
    period: "Nov 2025 – presente",
    tags: ["Laravel 12", "PHP 8.3", "React 19", "TypeScript", "Oracle", "Serasa", "Docker", "JWT"],
    screenshots: [
      "/projects/enterprise/motor-credito/motor_001.jpg",
      "/projects/enterprise/motor-credito/motor_002.jpg",
    ],
    highlights: [
      "Análise interna + externa (Serasa/Quod) consolidada em tela única para o analista",
      "Regras de crédito 100% configuráveis: score, limite, prazo, restrições por segmento",
      "RBAC granular com roles e permissões por rota (spatie/laravel-permission)",
    ],
    featured: true,
  },
  {
    slug: "zukkin",
    title: "Zukkin — Pesquisa de Preços via NF-e",
    description:
      "Plataforma para processamento de NF-e XML: extrai preços de produtos, cruza com ERP Oracle e envia CSV via FTP.",
    longDescription:
      "Solução desenvolvida para automatizar pesquisa de preços de mercado a partir de notas fiscais eletrônicas. O usuário faz upload do XML da NF-e, o sistema extrai os itens (EAN, preço, descrição), consulta o ERP Oracle para resolver o código interno do produto e gera um CSV no formato da plataforma Zukkin. O arquivo é enviado automaticamente via FTP. Backend em Go com PostgreSQL para histórico de uploads e Oracle read-only para lookup de EAN.",
    role: "Desenvolvedor Full Stack",
    company: "Grupo Vila Nova",
    period: "Nov 2025 – presente",
    tags: ["Go", "Chi", "PostgreSQL", "Oracle", "React 19", "TypeScript", "Docker", "FTP"],
    screenshots: [
      "/projects/enterprise/zukkin/zukkin_001.png",
      "/projects/enterprise/zukkin/zukkin_002.png",
      "/projects/enterprise/zukkin/zukkin_003.png",
      "/projects/enterprise/zukkin/zukkin_004.png",
      "/projects/enterprise/zukkin/zukkin_005.png",
    ],
    highlights: [
      "Pipeline automático: XML → parse → lookup Oracle ERP → CSV → FTP em um único upload",
      "Backend em Go com rate limiting por IP e autenticação JWT em cookie httpOnly",
      "Integração Oracle read-only via sijms/go-ora para resolução de EAN → código interno",
    ],
    featured: true,
  },
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
      "/projects/enterprise/wikivila/wikivila_001.jpg",
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
      "/projects/enterprise/vtex-focomix/focomix_001.jpg",
      "/projects/enterprise/vtex-focomix/focomix_002.jpg",
    ],
    highlights: [
      "Front headless full-custom consumindo as APIs de catálogo/checkout da VTEX — controle total de UX",
      "Fluxo de Call Center com SSO cross-domain via JWT assinado para impersonação de clientes B2B",
      "Pipeline de integração ERP Oracle → RabbitMQ → VTEX (multi-loja) via serviço Laravel dedicado",
    ],
    featured: true,
  },
];

export const personalProjects: Project[] = [
  {
    slug: "pokedex",
    title: "Pokédex",
    description:
      "Aplicação web para pesquisar Pokémons por nome, habitat ou tipo, consumindo a PokéAPI.",
    longDescription:
      "Projeto pessoal desenvolvido em ASP.NET Core MVC (.NET 6) para explorar a PokéAPI de forma interativa. Permite buscar Pokémons por nome ou ID, listar por habitat (cave, forest, sea, etc.) e filtrar por tipo (fire, water, grass, etc.), com paginação nos resultados e layout responsivo via Bootstrap. A aplicação roda com Docker sem precisar de .NET instalado localmente.",
    role: "Desenvolvedor",
    company: "Projeto pessoal",
    period: "Set 2025 – Abr 2026",
    tags: ["C#", ".NET 6", "ASP.NET Core MVC", "PokéAPI", "Bootstrap", "Docker"],
    screenshots: [
      "/projects/personal/pokedex/pokedex_001.png",
      "/projects/personal/pokedex/pokedex_002.png",
      "/projects/personal/pokedex/pokedex_003.png",
      "/projects/personal/pokedex/pokedex_004.png",
    ],
    highlights: [
      "Busca de Pokémon por nome ou ID com listagem paginada",
      "Filtros por habitat e tipo consumindo endpoints da PokéAPI",
      "Containerizado com Docker — sem dependência de .NET local para rodar",
    ],
    featured: true,
    repositoryUrl: "https://github.com/LuizColombo/pokedex",
  },
  {
    slug: "blockchain-api",
    title: "BlockchainApi",
    description:
      "Interface simples para consultar carteiras e transações usando dados públicos da Blockchain.com.",
    longDescription:
      "Projeto pessoal em HTML, CSS e JavaScript para consultar um endereço de carteira, buscar dados na Blockchain.com e exibir transações associadas de forma direta no navegador. A aplicação não possui backend separado: a lógica fica no frontend, com chamadas à API, exibição dos resultados e tratamento básico para casos como endereço inválido ou ausência de transações.",
    role: "Desenvolvedor",
    company: "Projeto pessoal",
    period: "2024",
    tags: ["HTML", "CSS", "JavaScript", "Blockchain.com API", "GitHub Pages"],
    screenshots: [
      "/projects/personal/blockchain-api/blockchain_001.png",
      "/projects/personal/blockchain-api/blockchain_002.png",
    ],
    highlights: [
      "Consulta de dados de carteiras a partir de um wallet address informado pelo usuário",
      "Listagem de transações associadas ao endereço pesquisado",
      "Aplicação estática com deploy via GitHub Pages e sem backend separado",
    ],
    featured: true,
    repositoryUrl: "https://github.com/LuizColombo/BlockchainApi",
    demoUrl: "https://luizcolombo.github.io/BlockchainApi/",
  },
];

export const projectGroups: ProjectGroup[] = [
  {
    id: "personal",
    title: "Projetos pessoais",
    description:
      "Experimentos, produtos próprios e estudos que viram ferramenta de verdade.",
    projects: personalProjects,
  },
  {
    id: "enterprise",
    title: "Projetos de empresa",
    description:
      "Soluções criadas em ambiente profissional, com contexto de negócio, integrações e operação real.",
    projects: enterpriseProjects,
  },
];

export const projects: Project[] = [...personalProjects, ...enterpriseProjects];
