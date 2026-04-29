import type { Project } from "@/types";

export const projects: Project[] = [
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
      "/projects/motor-credito/motor_001.png",
      "/projects/motor-credito/motor_002.png",
      "/projects/motor-credito/motor_003.png",
      "/projects/motor-credito/motor_004.png",
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
      "/projects/zukkin/zukkin_001.png",
      "/projects/zukkin/zukkin_002.png",
      "/projects/zukkin/zukkin_003.png",
      "/projects/zukkin/zukkin_004.png",
      "/projects/zukkin/zukkin_005.png",
    ],
    highlights: [
      "Pipeline automático: XML → parse → lookup Oracle ERP → CSV → FTP em um único upload",
      "Backend em Go com rate limiting por IP e autenticação JWT em cookie httpOnly",
      "Integração Oracle read-only via sijms/go-ora para resolução de EAN → código interno",
    ],
    featured: true,
  },
];
