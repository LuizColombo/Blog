export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[#2d2d3d]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} Luiz Colombo. Feito com Next.js + Tailwind.</p>
        <p className="font-mono text-xs">luiz.dev</p>
      </div>
    </footer>
  );
}
