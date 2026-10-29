import { Cpu, Database, Globe, Layers, Monitor, User, type LucideIcon } from "lucide-react";
import type { FlowNodeKind, ProjectAccent } from "@/types";

export const accentHex: Record<ProjectAccent, string> = {
  violet: "#8b5cf6",
  blue: "#3b82f6",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  cyan: "#06b6d4",
};

export const nodeKinds: Record<FlowNodeKind, { label: string; color: string; icon: LucideIcon }> = {
  user: { label: "Usuário", color: "#e2e8f0", icon: User },
  front: { label: "Front-end", color: "#60a5fa", icon: Monitor },
  service: { label: "Serviço", color: "#a78bfa", icon: Cpu },
  queue: { label: "Fila", color: "#fbbf24", icon: Layers },
  data: { label: "Dados", color: "#34d399", icon: Database },
  external: { label: "Externo", color: "#f472b6", icon: Globe },
};
