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
    href: "https://github.com/",
    value: "@luizcolombo",
  },
  {
    icon: <LinkedInIcon size={20} />,
    label: "LinkedIn",
    href: "https://linkedin.com/in/",
    value: "luizcolombo",
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

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
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
                <p className="text-sm text-white">Brasil · Remoto</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Formulário em breve. Use o email por enquanto!");
              }}
            >
              <div>
                <label className="block text-xs text-slate-500 mb-1">Nome</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 rounded-lg bg-[#13131f] border border-[#2d2d3d] text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-[#13131f] border border-[#2d2d3d] text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Mensagem</label>
                <textarea
                  rows={4}
                  placeholder="Sobre o que você quer conversar?"
                  className="w-full px-4 py-3 rounded-lg bg-[#13131f] border border-[#2d2d3d] text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Enviar mensagem
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
