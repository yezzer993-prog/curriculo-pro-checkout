import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { company } from "@/components/site-footer";

const url = "https://curriculo-pro-checkout.lovable.app/termos";
export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso | CurrículoPro" },
      { name: "description", content: "Termos de Uso da plataforma CurrículoPro, operada por ADS FLOW LTDA." },
      { property: "og:title", content: "Termos de Uso | CurrículoPro" },
      { property: "og:description", content: "Regras de uso da ferramenta CurrículoPro para criação de currículos em PDF." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: Termos,
});

function Termos() {
  return (
    <LegalPage title="Termos de Uso" updated="11 de novembro de 2026">
      <p>Estes Termos de Uso regulam o acesso e a utilização da plataforma <strong>CurrículoPro</strong>, operada por <strong>{company.name}</strong>, inscrita no CNPJ sob o nº {company.cnpj}, com sede em {company.address}. Ao utilizar a plataforma, você declara ter lido e concordado com estes termos.</p>
      <h2>1. O serviço</h2>
      <p>O CurrículoPro é uma ferramenta digital que auxilia o usuário a criar, formatar e estruturar um currículo profissional por meio de um guia passo a passo, com a escolha de modelos visuais e a emissão do arquivo final em formato PDF, pronto para impressão ou envio a recrutadores.</p>
      <h2>2. Contratação e pagamento</h2>
      <p>O acesso aos modelos e ao download do currículo em PDF é liberado mediante pagamento único de <strong>R$ 15,29</strong>, sem assinatura ou cobranças recorrentes. O pagamento é processado por plataforma de pagamento parceira, e a liberação ocorre imediatamente após a confirmação do pagamento.</p>
      <h2>3. Responsabilidades do usuário</h2>
      <ul>
        <li>O usuário é o único responsável pela veracidade, exatidão e atualização das informações inseridas no currículo.</li>
        <li>É proibido inserir conteúdo falso, ofensivo, ilícito ou que viole direitos de terceiros.</li>
        <li>O usuário deve manter seus dados de contato corretos para receber o acesso e o suporte.</li>
      </ul>
      <h2>4. Direitos de uso</h2>
      <p>Após a compra, o usuário recebe licença pessoal, intransferível e não exclusiva para utilizar os modelos e os arquivos gerados para fins próprios de busca de emprego. É vedada a revenda, redistribuição ou reprodução comercial dos modelos, layouts e demais elementos da plataforma, que são de propriedade de {company.name}.</p>
      <h2>5. Limitação de responsabilidade</h2>
      <p>O CurrículoPro é uma ferramenta de apoio e não garante contratação, entrevistas ou aprovação em processos seletivos. {company.name} não se responsabiliza por decisões tomadas por empresas ou recrutadores.</p>
      <h2>6. Cancelamento e reembolso</h2>
      <p>As condições de cancelamento e reembolso estão descritas na <a href="/reembolso">Política de Reembolso</a>.</p>
      <h2>7. Alterações</h2>
      <p>Estes termos podem ser atualizados a qualquer momento. A versão vigente estará sempre disponível nesta página.</p>
      <h2>8. Contato e foro</h2>
      <p>Dúvidas podem ser enviadas para <a href={`mailto:${company.email}`}>{company.email}</a>. Fica eleito o foro da comarca de São Paulo - SP, ressalvado o direito do consumidor de ajuizar ações em seu domicílio.</p>
    </LegalPage>
  );
}
