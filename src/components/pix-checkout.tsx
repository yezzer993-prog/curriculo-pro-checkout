import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useServerFn } from "@tanstack/react-start";
import { Check, Copy, LoaderCircle, LockKeyhole, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPix, getPixStatus } from "@/lib/pix.functions";

type Pix = { id: string; qrCode: string; expiresAt: string | null };

export function PixCheckout() {
  const create = useServerFn(createPix);
  const status = useServerFn(getPixStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pix, setPix] = useState<Pix | null>(null);
  const [img, setImg] = useState("");
  const [paid, setPaid] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { if (pix) QRCode.toDataURL(pix.qrCode, { width: 240, margin: 1 }).then(setImg); }, [pix]);
  useEffect(() => {
    if (!pix || paid) return;
    const t = setInterval(async () => {
      try { const r = await status({ data: { id: pix.id } }); if (r.status === "paid") setPaid(true); } catch { /* tenta de novo */ }
    }, 5000);
    return () => clearInterval(t);
  }, [pix, paid, status]);

  if (paid) return <div className="pix-result"><div className="checkout-mark"><Check size={22} /></div><p className="text-center font-bold">Pagamento confirmado!</p><p className="text-center text-sm text-muted-foreground">Enviamos seu acesso e recibo para o seu e-mail.</p></div>;

  if (pix) return <div className="pix-result">
    {img ? <img src={img} alt="QR code do PIX" className="pix-qr" /> : <LoaderCircle className="animate-spin mx-auto" />}
    <p className="text-center text-sm text-muted-foreground">Escaneie no app do seu banco ou copie o código abaixo.</p>
    <Button variant="outline" onClick={() => { navigator.clipboard.writeText(pix.qrCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>{copied ? <Check /> : <Copy />} {copied ? "Copiado!" : "Copiar código PIX"}</Button>
    <p className="secure-note"><LoaderCircle size={11} className="animate-spin" /> Aguardando pagamento...</p>
  </div>;

  return <form className="checkout-form" onSubmit={async e => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true); setError("");
    try {
      const r = await create({ data: { name: String(f.get("name")), email: String(f.get("email")), cpf: String(f.get("cpf")) } });
      if ("error" in r && r.error) setError(r.error); else setPix(r as Pix);
    } catch { setError("Confira seu nome, e-mail e CPF e tente novamente."); }
    setLoading(false);
  }}>
    <label htmlFor="checkout-name">Seu nome completo</label><input id="checkout-name" name="name" autoComplete="name" placeholder="Ex: João da Silva" required minLength={3} />
    <label htmlFor="checkout-email">Seu melhor e-mail</label><input id="checkout-email" name="email" type="email" autoComplete="email" placeholder="Ex: joao@email.com" required />
    <label htmlFor="checkout-cpf">Seu CPF</label><input id="checkout-cpf" name="cpf" inputMode="numeric" placeholder="000.000.000-00" required pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" />
    <Button type="submit" className="pix-cta" disabled={loading}>{loading ? <LoaderCircle className="animate-spin" /> : <Zap />} Gerar PIX de R$ 19,90</Button>
    {error && <p className="payment-notice" role="alert">{error}</p>}
    <p className="secure-note"><LockKeyhole size={11} /> Pagamento seguro via PIX</p>
  </form>;
}
