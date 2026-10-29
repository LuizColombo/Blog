"use client";

import { useReducedMotion } from "framer-motion";
import type { ProjectFlow } from "@/types";
import { nodeKinds } from "./theme";
import { edgeSides, type Side } from "./flowGeometry";

const CELL_W = 150;
const CELL_H = 64;
const NODE_W = 112;
const NODE_H = 30;
const PAD = 12;

const DOT_R = 18;

function anchor(cx: number, cy: number, side: Side, compact: boolean) {
  const halfW = compact ? DOT_R : NODE_W / 2;
  const halfH = compact ? DOT_R : NODE_H / 2;
  switch (side) {
    case "left":
      return { x: cx - halfW, y: cy };
    case "right":
      return { x: cx + halfW, y: cy };
    case "top":
      return { x: cx, y: cy - halfH };
    case "bottom":
      return { x: cx, y: cy + halfH };
  }
}

function curve(a: { x: number; y: number }, b: { x: number; y: number }, vertical: boolean) {
  if (vertical) {
    const my = (a.y + b.y) / 2;
    return `M${a.x},${a.y} C${a.x},${my} ${b.x},${my} ${b.x},${b.y}`;
  }
  const mx = (a.x + b.x) / 2;
  return `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
}

/**
 * Versão leve (SVG puro) do diagrama, para os cards da home.
 * `compact`: card estreito — o texto ficaria ilegível, então os nós viram círculos coloridos por tipo.
 */
export default function MiniFlow({
  flow,
  accent,
  compact = false,
}: {
  flow: ProjectFlow;
  accent: string;
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const byId = new Map(flow.nodes.map((node) => [node.id, node]));
  const cellW = compact ? 96 : CELL_W;
  const cellH = compact ? 64 : CELL_H;
  const boxW = compact ? DOT_R * 2 : NODE_W;
  const boxH = compact ? DOT_R * 2 : NODE_H;
  const center = (col: number, row: number) => ({ x: col * cellW, y: row * cellH });

  const xs = flow.nodes.map((n) => n.col * cellW);
  const ys = flow.nodes.map((n) => n.row * cellH);
  const minX = Math.min(...xs) - boxW / 2 - PAD;
  const minY = Math.min(...ys) - boxH / 2 - PAD;
  const width = Math.max(...xs) - Math.min(...xs) + boxW + PAD * 2;
  const height = Math.max(...ys) - Math.min(...ys) + boxH + PAD * 2;

  return (
    <svg
      viewBox={`${minX} ${minY} ${width} ${height}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Diagrama do fluxo do projeto"
    >
      {flow.edges.map((edge, i) => {
        const from = byId.get(edge.from);
        const to = byId.get(edge.to);
        if (!from || !to) return null;
        const sides = edgeSides(from, to);
        const a = anchor(center(from.col, from.row).x, center(from.col, from.row).y, sides.source, compact);
        const b = anchor(center(to.col, to.row).x, center(to.col, to.row).y, sides.target, compact);
        const d = curve(a, b, sides.source === "top" || sides.source === "bottom");
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <path d={d} fill="none" stroke="#2d2d3d" strokeWidth={compact ? 3 : 1.5} />
            <path
              d={d}
              fill="none"
              stroke={accent}
              strokeOpacity={0.35}
              strokeWidth={compact ? 3 : 1.5}
              strokeDasharray={compact ? "8 10" : "4 6"}
            />
            {!reduceMotion && (
              <circle r={compact ? 6 : 3} fill={accent}>
                <animateMotion dur={`${2.2 + (i % 3) * 0.4}s`} repeatCount="indefinite" path={d} begin={`${i * 0.35}s`} />
              </circle>
            )}
          </g>
        );
      })}

      {flow.nodes.map((node) => {
        const { x, y } = center(node.col, node.row);
        const kind = nodeKinds[node.kind];
        if (compact) {
          return (
            <g key={node.id}>
              <circle cx={x} cy={y} r={DOT_R} fill="#0d0d1a" stroke={kind.color} strokeOpacity={0.6} strokeWidth={2.5} />
              <circle cx={x} cy={y} r={7} fill={kind.color} />
              <title>{node.label}</title>
            </g>
          );
        }
        return (
          <g key={node.id}>
            <rect
              x={x - NODE_W / 2}
              y={y - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx={8}
              fill="#0d0d1a"
              stroke={kind.color}
              strokeOpacity={0.45}
            />
            <circle cx={x - NODE_W / 2 + 12} cy={y} r={3.5} fill={kind.color} />
            <text
              x={x - NODE_W / 2 + 22}
              y={y + 4}
              fontSize={11}
              fill="#cbd5e1"
              fontFamily="var(--font-geist-sans), sans-serif"
            >
              {node.label.length > 15 ? `${node.label.slice(0, 14)}…` : node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
