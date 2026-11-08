import { useState } from "react";
import { LockKeyhole, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHECKOUT_URL = "https://pay.lowify.com.br/checkout";
const PRODUCT_ID = "lHO2WM";

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export function buildLowifyUrl(data: { name: string; email: string; phone: string }, currentSearch = "") {
  const url = new URL(CHECKOUT_URL);
  new URLSearchParams(currentSearch).forEach((value, key) => url.searchParams.set(key, value));
  const phone = data.phone.replace(/\D/g, "");
  url.searchParams.set("product_id", PRODUCT_ID);
  url.searchParams.set("name", data.name.trim());
  url.searchParams.set("email", data.email.trim());
  url.searchParams.set("phone", phone);
  url.searchParams.set("whatsapp", phone);
  return url.toString();
}

export function LowifyCheckout() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return <form className="checkout-form" onSubmit={e => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const digits = phone.replace(/\D/g, "");
    if (name.split(/\s+/).length < 2) return setError("Informe seu nome completo.");
    if (digits.length !== 11 || digits[2] !== "9") return setError("Informe o celular no formato (DDD) 9XXXX-XXXX.");
    setError(""); setLoading(true);
    window.location.href = buildLowifyUrl({ name, email, phone: digits }, window.location.search);
  }}>
    <label htmlFor="checkout-name">Seu nome completo</label><input id="checkout-name" name="name" autoComplete="name" placeholder="Ex: João da Silva" required minLength={3} />
    <label htmlFor="checkout-email">Seu melhor e-mail</label><input id="checkout-email" name="email" type="email" autoComplete="email" placeholder="Ex: joao@email.com" required />
    <label htmlFor="checkout-phone">Seu WhatsApp</label><input id="checkout-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="(DDD) 90000-0000" required value={phone} onChange={e => setPhone(maskPhone(e.target.value))} />
    <Button type="submit" className="pix-cta" disabled={loading}><Zap /> Ir para o pagamento</Button>
    {error && <p className="payment-notice" role="alert">{error}</p>}
    <p className="secure-note"><LockKeyhole size={11} /> Pagamento seguro via PIX</p>
  </form>;
}
