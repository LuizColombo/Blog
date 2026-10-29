"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingDown } from "lucide-react";
import type { ProjectChart } from "@/types";

function formatValue(value: number, unit?: string) {
  return `${value.toLocaleString("pt-BR")}${unit ? ` ${unit}` : ""}`;
}

export default function MetricChart({ chart, accent }: { chart: ProjectChart; accent: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const max = Math.max(...chart.data.map((d) => d.value));

  const first = chart.data[0]?.value ?? 0;
  const last = chart.data[chart.data.length - 1]?.value ?? 0;
  const reduction = chart.type === "compare" && first > 0 ? Math.round((1 - last / first) * 100) : null;

  return (
    <div ref={ref} className="rounded-2xl bg-[#13131f] border border-[#2d2d3d] p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-500">Em números</p>
          <h3 className="text-white font-semibold mt-1">{chart.title}</h3>
        </div>
        {reduction !== null && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 18 }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ color: accent, background: `${accent}1f`, border: `1px solid ${accent}55` }}
          >
            <TrendingDown size={13} />−{reduction}%
          </motion.span>
        )}
      </div>

      <div className="space-y-4">
        {chart.data.map((item, i) => {
          const isHighlight = chart.type === "compare" ? i === chart.data.length - 1 : i === 0;
          return (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">{item.label}</span>
                <span className="font-mono text-slate-300">{formatValue(item.value, chart.unit)}</span>
              </div>
              <div className="h-3 rounded-full bg-[#1e1e2e] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${Math.max((item.value / max) * 100, 2)}%` } : {}}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{
                    background: isHighlight
                      ? `linear-gradient(90deg, ${accent}, ${accent}aa)`
                      : "linear-gradient(90deg, #475569, #334155)",
                    boxShadow: isHighlight ? `0 0 16px ${accent}66` : undefined,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {chart.caption && <p className="text-xs text-slate-500 mt-5">{chart.caption}</p>}
    </div>
  );
}
