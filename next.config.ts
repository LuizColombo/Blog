import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático: `next build` gera a pasta `out/`, servida direto pela Cloudflare Pages.
  output: "export",
  images: {
    // Sem servidor não há otimização de imagem do Next.
    unoptimized: true,
  },
};

export default nextConfig;
