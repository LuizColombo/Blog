import type { FlowNode } from "@/types";

export type Side = "left" | "right" | "top" | "bottom";

/** Escolhe de que lado sai e entra a aresta conforme a posição relativa dos nós. */
export function edgeSides(from: FlowNode, to: FlowNode): { source: Side; target: Side } {
  if (to.col > from.col) return { source: "right", target: "left" };
  if (to.col < from.col) return { source: "left", target: "right" };
  return to.row >= from.row ? { source: "bottom", target: "top" } : { source: "top", target: "bottom" };
}
