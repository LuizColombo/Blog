export type ProjectCategory = "personal" | "enterprise";

export type ProjectAccent = "violet" | "blue" | "emerald" | "amber" | "rose" | "cyan";

export type ProjectStatus = "Em produção" | "Em validação" | "Publicado";

export type FlowNodeKind = "user" | "front" | "service" | "queue" | "data" | "external";

export interface FlowNode {
  id: string;
  label: string;
  sub?: string;
  kind: FlowNodeKind;
  /** Posição em grade: coluna e linha (o diagrama converte em pixels). */
  col: number;
  row: number;
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface ProjectFlow {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface ProjectMetric {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Substitui o contador quando a métrica não é numérica (ex.: "SSE"). */
  text?: string;
}

export interface ProjectChart {
  /** "compare" = antes × depois (menor é melhor); "bars" = grandezas lado a lado. */
  type: "compare" | "bars";
  title: string;
  caption?: string;
  unit?: string;
  data: { label: string; value: number }[];
}

export interface Project {
  slug: string;
  title: string;
  /** Nome curto para cards e trilhos. */
  shortTitle: string;
  category: ProjectCategory;
  description: string;
  problem: string;
  solution: string;
  role: string;
  company: string;
  period: string;
  status: ProjectStatus;
  team?: boolean;
  accent: ProjectAccent;
  tags: string[];
  screenshots: string[];
  highlights: string[];
  metrics: ProjectMetric[];
  flow: ProjectFlow;
  chart?: ProjectChart;
  featured: boolean;
  repositoryUrl?: string;
  demoUrl?: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: string;
}
