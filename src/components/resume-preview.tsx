import { UserRound } from "lucide-react";

export const resumeModels = ["Moderno", "Criativo", "Clássico", "Executivo", "Minimalista", "Elegante"] as const;
export const resumeColors = [
  { id: "blue", label: "Azul" }, { id: "emerald", label: "Esmeralda" },
  { id: "purple", label: "Roxo" }, { id: "rose", label: "Rosa" },
  { id: "amber", label: "Âmbar" }, { id: "graphite", label: "Grafite" },
] as const;

export const resumeSuggestions = resumeModels.map((model, i) => ({ model, color: resumeColors[i]?.id ?? "blue" }));

const modelLayouts: Record<string, string> = {
  Moderno: "modern", Criativo: "creative", Clássico: "classic",
  Executivo: "executive", Minimalista: "minimal", Elegante: "elegant",
};

export function ResumePreview({ model, color = "blue" }: { model: string; color?: string }) {
  return <div className={`resume-paper resume-${modelLayouts[model] ?? "modern"} theme-${color}`} role="img" aria-label={`Prévia do currículo ${model}`}>
    <aside className="resume-sidebar">
      <div className="resume-avatar"><UserRound /></div>
      <h4>CONTATO</h4><div className="resume-line" /><div className="resume-line short" /><div className="resume-line" />
      <h4>HABILIDADES</h4><div className="resume-line" /><div className="resume-line short" /><div className="resume-line" />
      <h4>FORMAÇÃO</h4><div className="resume-line" /><div className="resume-line short" />
    </aside>
    <div className="resume-body">
      <h3>SEU NOME AQUI</h3><p>Profissão / Cargo</p>
      <h4>OBJETIVO</h4><div className="resume-line" /><div className="resume-line short" />
      <h4>EXPERIÊNCIA</h4>
      {[0, 1, 2].map(i => <div className="resume-job" key={i}><div className="resume-line" /><div className="resume-line short" /><div className="resume-line" /></div>)}
      <h4>FORMAÇÃO</h4><div className="resume-line" /><div className="resume-line short" />
    </div>
  </div>;
}