import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const API = "https://api.pagou.ai";
const PRICE_CENTS = 1990;

function key() {
  const k = process.env["STRIPE_LIVE_API_KEY"];
  if (!k) throw new Error("Pagamento não configurado.");
  return k;
}

export const createPix = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ name: z.string().trim().min(3).max(255), email: z.string().trim().email().max(255), cpf: z.string().transform(v => v.replace(/\D/g, "")).pipe(z.string().length(11)) }).parse(d))
  .handler(async ({ data }) => {
    const res = await fetch(`${API}/v2/transactions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key()}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        external_ref: `cp_${crypto.randomUUID()}`,
        amount: PRICE_CENTS, currency: "BRL", method: "pix",
        buyer: { name: data.name, email: data.email, document: { type: "CPF", number: data.cpf } },
        products: [{ name: "Currículo Pro - Acesso Vitalício", price: PRICE_CENTS, quantity: 1 }],
      }),
    });
    const json = (await res.json().catch(() => null)) as any;
    if (!res.ok || !json?.data?.pix?.qr_code) {
      console.error("pagou create error", res.status, JSON.stringify(json));
      return { error: "Não foi possível gerar o PIX agora. Tente novamente em instantes." as string };
    }
    return { id: String(json.data.id), qrCode: String(json.data.pix.qr_code), expiresAt: (json.data.pix.expiration_date ?? null) as string | null };
  });

export const getPixStatus = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ id: z.string().min(1).max(100) }).parse(d))
  .handler(async ({ data }) => {
    const res = await fetch(`${API}/v2/transactions/${encodeURIComponent(data.id)}`, { headers: { Authorization: `Bearer ${key()}` } });
    const json = (await res.json().catch(() => null)) as any;
    return { status: String(json?.data?.status ?? "pending") };
  });
