"use client";

import "@xyflow/react/dist/style.css";

import { Fragment, createContext, useContext, useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Background,
  BackgroundVariant,
  BaseEdge,
  EdgeLabelRenderer,
  Handle,
  Position,
  ReactFlow,
  getBezierPath,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import type { ProjectFlow } from "@/types";
import { nodeKinds } from "./theme";
import { edgeSides, type Side } from "./flowGeometry";

const CELL_W = 240;
const CELL_H = 120;
const NODE_W = 176;
const NODE_H = 60;

type KindNodeData = { label: string; sub?: string; kind: keyof typeof nodeKinds; delay: number };
type FlowEdgeData = { delay: number; accent: string; label?: string; index: number };
type KindNode = Node<KindNodeData, "kind">;
type AnimatedEdge = Edge<FlowEdgeData, "animated">;

const RevealContext = createContext({ revealed: false, reduceMotion: false });

const sidePosition: Record<Side, Position> = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const hiddenHandle = "!opacity-0 !w-1 !h-1 !min-w-0 !min-h-0 !border-0";

function KindNodeView({ data }: NodeProps<KindNode>) {
  const { revealed, reduceMotion } = useContext(RevealContext);
  const kind = nodeKinds[data.kind];
  const Icon = kind.icon;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.7, y: 12 }}
      animate={revealed ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{ delay: data.delay, type: "spring", stiffness: 220, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-3 rounded-xl px-3 bg-[#13131f]/95 backdrop-blur border cursor-grab active:cursor-grabbing"
      style={{
        width: NODE_W,
        height: NODE_H,
        borderColor: `${kind.color}66`,
        boxShadow: `0 0 0 1px ${kind.color}14, 0 8px 24px -12px ${kind.color}88`,
      }}
    >
      {(["left", "right", "top", "bottom"] as Side[]).map((side) => (
        <Fragment key={side}>
          <Handle type="source" id={`s-${side}`} position={sidePosition[side]} className={hiddenHandle} />
          <Handle type="target" id={`t-${side}`} position={sidePosition[side]} className={hiddenHandle} />
        </Fragment>
      ))}
      <span
        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
        style={{ background: `${kind.color}1f`, color: kind.color }}
      >
        <Icon size={16} />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-white truncate">{data.label}</span>
        {data.sub && <span className="block text-[11px] text-slate-500 truncate">{data.sub}</span>}
      </span>
    </motion.div>
  );
}

function AnimatedEdgeView({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<AnimatedEdge>) {
  const { revealed, reduceMotion } = useContext(RevealContext);
  const [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const accent = data?.accent ?? "#8b5cf6";
  const delay = data?.delay ?? 0;

  return (
    <>
      <BaseEdge id={id} path={path} style={{ stroke: "#2d2d3d", strokeWidth: 2 }} />
      <motion.path
        d={path}
        fill="none"
        stroke={accent}
        strokeWidth={2}
        strokeOpacity={0.6}
        initial={reduceMotion ? false : { pathLength: 0 }}
        animate={revealed ? { pathLength: 1 } : undefined}
        transition={{ delay, duration: 0.6, ease: "easeOut" }}
      />
      {revealed && !reduceMotion && (
        <circle r={4} fill={accent} style={{ filter: `drop-shadow(0 0 6px ${accent})` }}>
          <animateMotion
            dur={`${2 + ((data?.index ?? 0) % 3) * 0.5}s`}
            begin={`${delay + 0.6}s`}
            repeatCount="indefinite"
            path={path}
          />
        </circle>
      )}
      {data?.label && (
        <EdgeLabelRenderer>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={revealed ? { opacity: 1 } : undefined}
            transition={{ delay: delay + 0.4 }}
            className="absolute pointer-events-none px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-300 bg-[#0a0a0f] border border-[#2d2d3d]"
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
          >
            {data.label}
          </motion.div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

const nodeTypes = { kind: KindNodeView };
const edgeTypes = { animated: AnimatedEdgeView };

export default function FlowDiagram({ flow, accent }: { flow: ProjectFlow; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useInView(ref, { once: true, margin: "-120px" });
  const reduceMotion = useReducedMotion() ?? false;

  const { nodes, edges } = useMemo(() => {
    // Nós aparecem da esquerda para a direita; cada aresta logo depois dos seus dois nós.
    const order = [...flow.nodes].sort((a, b) => a.col - b.col || a.row - b.row);
    const delayOf = new Map(order.map((node, i) => [node.id, i * 0.12]));
    const byId = new Map(flow.nodes.map((node) => [node.id, node]));

    const nodes: KindNode[] = flow.nodes.map((node) => ({
      id: node.id,
      type: "kind",
      position: { x: node.col * CELL_W, y: node.row * CELL_H },
      width: NODE_W,
      height: NODE_H,
      data: { label: node.label, sub: node.sub, kind: node.kind, delay: delayOf.get(node.id) ?? 0 },
    }));

    const edges: AnimatedEdge[] = flow.edges.flatMap((edge, index) => {
      const from = byId.get(edge.from);
      const to = byId.get(edge.to);
      if (!from || !to) return [];
      const sides = edgeSides(from, to);
      const delay = Math.max(delayOf.get(edge.from) ?? 0, delayOf.get(edge.to) ?? 0) + 0.2;
      return [
        {
          id: `${edge.from}-${edge.to}`,
          source: edge.from,
          target: edge.to,
          sourceHandle: `s-${sides.source}`,
          targetHandle: `t-${sides.target}`,
          type: "animated",
          data: { delay, accent, label: edge.label, index },
        },
      ];
    });

    return { nodes, edges };
  }, [flow, accent]);

  return (
    <RevealContext.Provider value={{ revealed, reduceMotion }}>
      <div ref={ref} className="h-[420px] md:h-[480px] w-full">
        <ReactFlow
          defaultNodes={nodes}
          defaultEdges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          colorMode="dark"
          fitView
          fitViewOptions={{ padding: 0.18 }}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          zoomOnPinch
          panOnScroll={false}
          preventScrolling={false}
          minZoom={0.4}
          maxZoom={1.6}
          style={{ background: "transparent" }}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} color="#2d2d3d" />
        </ReactFlow>
      </div>
    </RevealContext.Provider>
  );
}
