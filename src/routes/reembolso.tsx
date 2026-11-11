import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { company } from "@/components/site-footer";

const url = "https://curriculo-pro-checkout.lovable.app/reembolso";
export const Route = createFileRoute("/reembolso")({
  head: () => ({
    meta: [
      { title: "Política de Reembolso | CurrículoPro" },
      { name: "description", content: "Garantia de 7 dias para cancelamento e reembolso integral, conforme o Art. 49 do CDC." },
      { property: "og:title", content: "Política de Reembolso e Cancelamento | CurrículoPro" },
      { property: "og:description", content: "Saiba como solicitar cancelamento e reembolso em até 7 dias." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: Reembolso,
});

function Reembolso() {
  return (
    <LegalPage title="Política de Reembolso e Cancelamento" updated="11 de novembro de 2026">
      <p>Em conformidade com o <strong>Art. 49 do Código de Defesa do Consumidor</strong> (Lei nº 8.078/1990), as compras realizadas no CurrículoPro, operado por {company.name} (CNPJ {company.cnpj}), contam com direito de arrependimento.</p>
      <h2>1. Prazo de garantia</h2>
      <p>Você tem <strong>7 (sete) dias corridos</strong>, contados a partir da data da compra, para solicitar o cancelamento e o <strong>reembolso integral</strong> do valor pago, sem necessidade de justificativa.</p>
      <h2>2. Como solicitar</h2>
      <p>Envie um e-mail para <a href={`mailto:${company.email}`}>{company.email}</a> informando os dados da compra: nome completo, e-mail utilizado, data e forma de pagamento.</p>
      <h2>3. Prazo de devolução</h2>
      <ul>
        <li>PIX: o valor é devolvido na mesma conta de origem após a análise da solicitação.</li>
        <li>Cartão de crédito: o estorno é solicitado à operadora e pode aparecer em até duas faturas, conforme as regras do emissor.</li>
      </ul>
      <h2>4. Após o prazo</h2>
      <p>Solicitações feitas após 7 dias corridos da compra não são elegíveis ao reembolso por arrependimento, sem prejuízo dos demais direitos previstos no CDC.</p>
      <h2>5. Contato</h2>
      <p>{company.name} — {company.address}. Suporte: <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
    </LegalPage>
  );
}
