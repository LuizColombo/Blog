"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ProjectMetric } from "@/types";

function format(metric: ProjectMetric, value: number) {
  const number = value.toLocaleString("pt-BR", {
    minimumFractionDigits: metric.decimals ?? 0,
    maximumFractionDigits: metric.decimals ?? 0,
  });
  return `${metric.prefix ?? ""}${number}${metric.suffix ?? ""}`;
}

export default function AnimatedCounter({ metric }: { metric: ProjectMetric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || metric.text) return;
    if (reduceMotion) {
      el.textContent = format(metric, metric.value);
      return;
    }
    // Escreve direto no DOM: evita um re-render por frame da animação.
    const controls = animate(0, metric.value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        el.textContent = format(metric, value);
      },
    });
    return () => controls.stop();
  }, [inView, metric, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {metric.text ?? format(metric, 0)}
    </span>
  );
}
