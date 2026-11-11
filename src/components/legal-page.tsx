import { Link } from "@tanstack/react-router";
import { ArrowLeft, FileText } from "lucide-react";
import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-foreground"><FileText size={20} className="text-primary" /> Currículo<span className="text-primary">Pro</span></Link>
          <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={14} /> Voltar</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-extrabold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Última atualização: {updated}</p>
        <article className="legal-content mt-8 space-y-4 text-[15px] leading-relaxed text-foreground/90 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_a]:text-primary [&_a]:underline">
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
