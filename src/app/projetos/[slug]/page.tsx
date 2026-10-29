import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CaseStudy from "@/components/projects/CaseStudy";
import { getProjectBySlug, projects } from "@/content/projects";

// Só os slugs conhecidos existem: tudo vira HTML estático no build (sem edge runtime na Cloudflare).
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} · Luiz Colombo`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: {
      title,
      description: project.description,
      type: "article",
      url: `/projetos/${project.slug}`,
      images: ["/og.png"],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <CaseStudy project={project} prev={prev} next={next} />
      </main>
      <Footer />
    </>
  );
}
