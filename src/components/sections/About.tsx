"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Database, BarChart2, Workflow, Activity } from "lucide-react";
import AIAgents from "./AIAgents";

const skills = [
  {
    icon: <Server size={20} />,
    title: "Backend",
    items: ["Go / chi / Gin", "PHP / Laravel (Octane, Horizon)", "Python / FastAPI", "C# / .NET Core", "Node.js"],
  },
  {
    icon: <Code2 size={20} />,
    title: "Frontend",
    items: ["React 19 / Vite / Next.js", "TanStack Router · Query", "Vue 3 / Nuxt", "Tailwind / shadcn / Radix", "Framer Motion / React Flow"],
  },
  {
    icon: <Database size={20} />,
    title: "Bancos de dados",
    items: ["Oracle (ERP)", "PostgreSQL", "MariaDB / SQL Server", "MongoDB / Redis"],
  },
  {
    icon: <Workflow size={20} />,
    title: "Integração & Mensageria",
    items: ["RabbitMQ", "VTEX / B2B SaaS", "APIs REST / OpenAPI", "Keycloak (OIDC / RBAC)", "Integração de ERPs"],
  },
  {
    icon: <BarChart2 size={20} />,
    title: "Dados & BI",
    items: ["Power BI (DAX/M)", "SSIS / SSAS", "ECharts / visx", "Power Apps"],
  },
  {
    icon: <Activity size={20} />,
    title: "Infra & Observabilidade",
    items: ["Docker / Compose", "Jenkins (CI/CD)", "Prometheus / Alertmanager", "Git"],
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-violet-400 text-sm font-mono uppercase tracking-widest">
            01. sobre mim
          </span>
          <h2 className="text-4xl font-bold mt-2 text-white">Quem sou eu</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 text-slate-400 leading-relaxed"
          >
            <p>
              Bacharel em Ciência da Computação pela PUC Minas, sou desenvolvedor Full Stack
              com forte viés analítico. Atualmente no Grupo Vila Nova, atuo na integração de
              ERPs e e-commerce B2B, construindo sistemas em Go, Laravel, Python e React
              conectados por RabbitMQ ao ERP Oracle — e trabalho no dia a dia com agentes de IA.
            </p>
            <p>
              Tenho background sólido em ecossistema .NET — no Grupo Curimbaba construí
              pipelines de dados e dashboards analíticos com Power BI (DAX/M), SSIS, SSAS
              e Oracle. Antes disso, passei pela Alterdata Software gerenciando ERPs e
              desenvolvendo relatórios em Power BI.
            </p>
            <p>
              Fluente em inglês, apaixonado por resolver problemas complexos através da
              tecnologia para otimizar processos reais.
            </p>

            <div className="pt-4">
              <a
                href="/Luiz_Henrique_Colombo_CV.pdf"
                download
                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                Download CV →
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="p-5 rounded-xl bg-[#13131f] border border-[#2d2d3d] hover:border-violet-500/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-violet-400 mb-3">
                  {skill.icon}
                  <span className="font-semibold text-sm text-white">{skill.title}</span>
                </div>
                <ul className="space-y-1">
                  {skill.items.map((item) => (
                    <li key={item} className="text-xs text-slate-500">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <AIAgents />
      </div>
    </section>
  );
}
