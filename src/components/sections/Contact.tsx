"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

const socialLinks = [
  {
    icon: <GitHubIcon size={20} />,
    label: "GitHub",
    href: "https://github.com/LuizColombo",
    value: "@LuizColombo",
  },
  {
    icon: <LinkedInIcon size={20} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/luiz-henrique-colombo-ab5b551b3",
    value: "luiz-henrique-colombo",
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    href: "mailto:luiz.colombo@vilanova.com.br",
    value: "luiz.colombo@vilanova.com.br",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contato" className="py-24 px-6 bg-[#0d0d18]">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-violet-400 text-sm font-mono uppercase tracking-widest">
            04. contato
          </span>
          <h2 className="text-4xl font-bold mt-2 text-white">Vamos conversar</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Aberto para oportunidades, projetos freelance ou só trocar ideia sobre tecnologia.
            Me manda uma mensagem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto space-y-4"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-[#13131f] border border-[#2d2d3d] hover:border-violet-500/40 transition-all group"
            >
              <span className="text-violet-400">{link.icon}</span>
              <div>
                <p className="text-xs text-slate-500">{link.label}</p>
                <p className="text-sm text-white group-hover:text-violet-300 transition-colors">
                  {link.value}
                </p>
              </div>
            </a>
          ))}

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#13131f] border border-[#2d2d3d]">
            <span className="text-violet-400">
              <MapPin size={20} />
            </span>
            <div>
              <p className="text-xs text-slate-500">Localização</p>
              <p className="text-sm text-white">Poços de Caldas, MG · Remoto</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
