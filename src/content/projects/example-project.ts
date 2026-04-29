import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "sistema-erp",
    title: "Sistema ERP Empresarial",
    description: "Plataforma integrada de gestão empresarial com módulos de vendas, estoque e financeiro.",
    longDescription:
      "Sistema ERP completo desenvolvido para gestão de operações empresariais. Integra múltiplos módulos como controle de estoque em tempo real, gestão de pedidos, faturamento automático e dashboards analíticos. A solução processa milhares de transações diárias com alta disponibilidade.",
    role: "Desenvolvedor Backend",
    company: "Empresa Anterior",
    period: "Jan 2023 – Dez 2023",
    tags: ["PHP", "Laravel", "Oracle", "Redis", "Docker"],
    screenshots: [
      "/projects/erp/dashboard.png",
      "/projects/erp/orders.png",
    ],
    highlights: [
      "Redução de 40% no tempo de processamento de pedidos",
      "Integração com 3 ERPs legados via API REST",
      "Dashboard em tempo real para 200+ usuários simultâneos",
    ],
    featured: true,
  },
  {
    slug: "ecommerce-b2b",
    title: "Plataforma E-commerce B2B",
    description: "Portal de vendas B2B com catálogo dinâmico, tabelas de preço por cliente e integração logística.",
    longDescription:
      "Portal e-commerce voltado para vendas entre empresas, com regras complexas de precificação por segmento, aprovação de pedidos em múltiplas alçadas e integração com transportadoras para rastreamento em tempo real.",
    role: "Desenvolvedor Full Stack",
    company: "Empresa Atual",
    period: "Mar 2024 – presente",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "RabbitMQ", "AWS"],
    screenshots: [
      "/projects/b2b/catalog.png",
      "/projects/b2b/checkout.png",
    ],
    highlights: [
      "Suporte a 10k SKUs com busca full-text",
      "Pipeline de preços com 15+ regras de negócio",
      "Integração com VTEX, Magento e sistemas próprios",
    ],
    featured: true,
  },
];
