"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Database, Zap } from "lucide-react";

const skills = [
  {
    icon: <Server size={20} />,
    title: "Backend",
    items: ["PHP / Laravel", "Go / Chi / Gin", "Node.js", "REST APIs", "Microserviços"],
  },
  {
    icon: <Database size={20} />,
    title: "Banco de dados",
    items: ["PostgreSQL", "Oracle", "MySQL", "Redis", "MongoDB"],
  },
  {
    icon: <Code2 size={20} />,
    title: "Frontend",
    items: ["React / Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
  },
  {
    icon: <Zap size={20} />,
    title: "Infra & Tools",
    items: ["Docker", "RabbitMQ", "AWS", "CI/CD", "Git"],
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
              Desenvolvedor backend com foco em construir sistemas que realmente funcionam
              — escaláveis, bem estruturados e fáceis de manter. Tenho experiência em
              ambientes de alta demanda onde performance e confiabilidade não são opcionais.
            </p>
            <p>
              Trabalho principalmente com PHP/Laravel e Go no backend, mas transito bem
              pelo stack completo quando necessário. Gosto de entender profundamente os
              problemas antes de começar a codar.
            </p>
            <p>
              Fora do trabalho, contribuo com projetos open source, estudo arquiteturas de
              sistema e escrevo sobre o que aprendo aqui neste blog.
            </p>

            <div className="pt-4">
              <a
                href="/curriculo.pdf"
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
            className="grid grid-cols-2 gap-4"
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
      </div>
    </section>
  );
}
