import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BrushCleaning, Check, ChevronLeft, ChevronRight, FileText, Hammer, LockKeyhole, LoaderCircle, Paintbrush, PenTool, ShieldCheck, Sparkles, Store, Utensils, Bot, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { LowifyCheckout } from "@/components/lowify-checkout";
import { ResumePreview, resumeColors, resumeSuggestions } from "@/components/resume-preview";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Análise de Currículo | Currículo Pro" },
    { name: "description", content: "Personalize seu perfil, escolha seu modelo profissional e conheça o acesso vitalício do Currículo Pro." },
    { property: "og:title", content: "Análise de Currículo | Currículo Pro" },
    { property: "og:description", content: "Seu próximo passo começa com um currículo profissional. Escolha seu modelo no Currículo Pro." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Index,
});

const questions = [
  { title: "Qual é a sua área de atuação?", divider: "Ou digite a sua", placeholder: "Ex: Engenharia Civil...", options: ["Serviços Gerais / Limpeza", "Construção Civil / Obras", "Comércio / Varejo", "Alimentação / Restaurante"], icons: [BrushCleaning, Hammer, Store, Utensils] },
  { title: "Quanto tempo de experiência?", divider: "Ou digite o tempo exato", placeholder: "Ex: 6 meses, 10 anos...", options: ["Sem experiência (1º emprego)", "Alguns meses (Até 1 ano)", "De 1 a 3 anos", "Mais de 3 anos"], icons: [] },
  { title: "Qual o seu maior desafio no currículo?", divider: "Outro motivo", placeholder: "Digite aqui...", options: ["Robôs do RH me barram (Filtro ATS)", "Design feio ou desatualizado", "Não sei resumir minha experiência"], icons: [Bot, Paintbrush, PenTool] },
  { title: "Qual seu nível de escolaridade atual?", divider: "Outra formação", placeholder: "Ex: Curso profissionalizante...", options: ["Ensino Médio", "Ensino Técnico", "Ensino Superior (Cursando/Completo)", "Pós-graduação / Especialização"], icons: [] },
];

function Index() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [custom, setCustom] = useState(["", "", "", ""]);
  const [modelIndex, setModelIndex] = useState(0);
  const [color, setColor] = useState("blue");
  const [checkout, setCheckout] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shellRef = useRef<HTMLElement | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    if (step > 0) shellRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);
  const question = questions[step];
  const selectedModel = resumeSuggestions[modelIndex]?.model ?? "Moderno";
  const customValue = custom[step] ?? "";
  const progress = step >= 5 ? 100 : (step + 1) * 20;
  const advance = (value: string) => {
    if (step < 4) { setAnswers(prev => prev.map((answer, i) => i === step ? value : answer)); setStep(step + 1); }
    else { setStep(5); timer.current = setTimeout(() => setStep(6), 2400); }
  };
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClickUntil = useRef(0);
  const selectSuggestion = (index: number) => {
    setModelIndex(index);
    setColor(resumeSuggestions[index]?.color ?? "blue");
  };
  const moveModel = (direction: number) => selectSuggestion((modelIndex + direction + resumeSuggestions.length) % resumeSuggestions.length);

  return <div className="funnel-page">
    <header className="funnel-header">
      <a href="/" className="brand"><span className="brand-icon"><FileText size={22} /></span><span>Currículo<span className="text-primary">Pro</span></span></a>
      <h1>Currículo pronto em 3 minutos</h1>
      <p>Crie um currículo profissional rapidamente e emita seu PDF instantaneamente.</p>
    </header>
    <main className="funnel-shell" ref={shellRef}>
      <div className="progress-track" role="progressbar" aria-label="Progresso do perfil" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><div className={`progress-fill progress-${progress}`} /></div>
      <div className={`funnel-content ${step === 6 ? "result-content" : ""}`}>
        {step < 5 && <div className="step-caption"><span>SEU PERFIL PROFISSIONAL</span><span>0{step + 1} <span className="text-muted-foreground">/ 05</span></span></div>}
        {question && <section className="step-section" key={step}>
          <h2>{question.title}</h2>
          <div className="options-list">{question.options.map((option, i) => {
            const Icon = question.icons[i];
            return <Button key={option} variant="outline" className={`option-button ${answers[step] === option ? "selected-option" : ""}`} onClick={() => advance(option)}>
              {Icon && <span className={`option-icon option-tone-${i}`}><Icon size={17} /></span>}<span className="option-label">{option}</span><ChevronRight className="option-chevron" />
            </Button>;
          })}</div>
          <div className="divider"><span>{question.divider}</span></div>
          <form className="custom-form" onSubmit={e => { e.preventDefault(); if (customValue.trim()) advance(customValue.trim()); }}>
            <input aria-label={question.divider} placeholder={question.placeholder} value={customValue} onChange={e => setCustom(prev => prev.map((value, i) => i === step ? e.target.value : value))} />
            <Button size="icon" type="submit" aria-label="Continuar com minha resposta" disabled={!customValue.trim()}><ArrowRight /></Button>
          </form>
        </section>}
        {step === 4 && <section className="step-section model-section">
          <div className="text-center"><span className="eyebrow">Pré-visualização</span><h2>Qual visual mais combina com você?</h2><p className="model-subtitle">Escolha o Design que mais combina com você</p></div>
          <div className="model-picker">
            <div className="phone-mockup"><div className="phone-island" /><div className="phone-header"><FileText size={12} /> Currículo Pro</div>
              <div className="phone-preview">
                <Button variant="ghost" className="preview-select" aria-label={`Selecionar modelo ${selectedModel}`}
                  onPointerDown={e => { if (!e.isPrimary || e.button !== 0) return; swipeStart.current = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId); }}
                  onPointerUp={e => {
                    const start = swipeStart.current;
                    swipeStart.current = null;
                    if (!start) return;
                    const dx = e.clientX - start.x;
                    const dy = e.clientY - start.y;
                    if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) { suppressClickUntil.current = Date.now() + 400; moveModel(dx < 0 ? 1 : -1); }
                  }}
                  onPointerCancel={() => { swipeStart.current = null; }}
                  onClick={() => { if (Date.now() >= suppressClickUntil.current) advance(selectedModel); }}><ResumePreview model={selectedModel} color={color} /></Button>
                <div className="model-controls"><Button variant="ghost" size="icon" aria-label="Modelo anterior" onClick={() => moveModel(-1)}><ChevronLeft /></Button><strong>{selectedModel}</strong><Button variant="ghost" size="icon" aria-label="Próximo modelo" onClick={() => moveModel(1)}><ChevronRight /></Button></div>
              </div>
            </div>
            <div className="color-palette" aria-label="Cor do currículo">{resumeColors.map(item => <Button key={item.id} variant="ghost" size="icon" className={`color-swatch swatch-${item.id} ${color === item.id ? "active-swatch" : ""}`} title={item.label} aria-label={item.label} aria-pressed={color === item.id} onClick={() => setColor(item.id)}>{color === item.id && <Check size={13} />}</Button>)}</div>
          </div>
          <div className="model-dots" aria-label="Sugestões de currículo">{resumeSuggestions.map((item, i) => <Button variant="ghost" key={item.model} className={`model-dot ${modelIndex === i ? "active-dot" : ""}`} title={item.model} aria-label={`Ver modelo ${item.model}`} aria-pressed={modelIndex === i} onClick={() => selectSuggestion(i)} />)}</div>
        </section>}
        {step === 5 && <section className="loading-section" aria-live="polite"><div className="loading-icon"><LoaderCircle size={42} /></div><h2>Processando dados</h2><p>Preparando o formato {selectedModel} para {answers[0] || "sua área"}...</p></section>}
        {step === 6 && <section className="step-section offer-section">
          <div className="profile-summary"><p>Profissionais de <strong>{answers[0] || "sua área"}</strong> com histórico de <strong>{answers[1] || "sua experiência"}</strong> aumentam em até <strong>60% suas chances</strong> ao utilizarem modelos profissionais validados.</p></div>
          <div className="offer-title"><span className="eyebrow">Oferta exclusiva</span><h2>Desbloqueie seu Acesso</h2></div>
          <div className="premium-showcase"><div className="premium-track" aria-hidden="true">{[...resumeSuggestions, ...resumeSuggestions].map((item, i) => <div className="mini-resume" key={i}><ResumePreview model={item.model} color={item.color} /></div>)}</div><div className="premium-lock"><span><LockKeyhole size={22} /></span><strong>MODELOS PREMIUM</strong></div></div>
          <ul className="benefits"><li><Check /><span>Acesso vitalício a <strong>todos os modelos</strong> (Moderno, Criativo, ATS e mais)</span></li><li><Check /><span>Downloads ilimitados em <strong>Alta Resolução (PDF)</strong></span></li><li><Check /><span>Sem cobranças mensais. <strong>Pagamento único.</strong></span></li></ul>
          <Button className="offer-cta" onClick={() => { setCheckout(true); }}>Liberar Templates Agora <Zap size={17} /></Button>
          <p className="secure-note"><ShieldCheck size={12} /> Pagamento 100% Seguro via PIX/Cartão</p>
        </section>}
      </div>
      {step < 5 && <footer className="funnel-nav"><Button variant="ghost" className={step === 0 ? "invisible" : ""} onClick={() => setStep(step - 1)}><ArrowLeft /> Voltar</Button>{step === 4 && <Button className="nav-next" onClick={() => advance(selectedModel)}>Continuar <ArrowRight /></Button>}</footer>}
    </main>
    <p className="page-trust"><ShieldCheck size={14} /> Seu próximo passo profissional começa aqui.</p>
    <Dialog open={checkout} onOpenChange={setCheckout}><DialogContent className="flex flex-col gap-2 p-3 w-[96vw] max-w-lg h-[92vh]"><DialogTitle className="text-center text-lg font-extrabold">Finalize seu pagamento</DialogTitle><DialogDescription className="sr-only">Checkout seguro de pagamento</DialogDescription><LowifyCheckout /></DialogContent></Dialog>
  </div>;
}
