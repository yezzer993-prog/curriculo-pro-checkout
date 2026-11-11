import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { company } from "@/components/site-footer";

const url = "https://curriculo-pro-checkout.lovable.app/privacidade";
export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | CurrículoPro" },
      { name: "description", content: "Como o CurrículoPro coleta, usa e protege seus dados, em conformidade com a LGPD." },
      { property: "og:title", content: "Política de Privacidade | CurrículoPro" },
      { property: "og:description", content: "Tratamento de dados pessoais no CurrículoPro conforme a LGPD." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: Privacidade,
});

function Privacidade() {
  return (
    <LegalPage title="Política de Privacidade" updated="11 de novembro de 2026">
      <p>Esta Política descreve como <strong>{company.name}</strong> (CNPJ {company.cnpj}), controladora dos dados, trata as informações pessoais dos usuários do CurrículoPro, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD).</p>
      <h2>1. Dados coletados</h2>
      <ul>
        <li>Dados inseridos no guia do currículo: área de atuação, tempo de experiência, histórico profissional e escolaridade.</li>
        <li>Dados de identificação e contato: nome, e-mail e telefone/WhatsApp, informados no momento do pagamento.</li>
      </ul>
      <h2>2. Finalidade</h2>
      <p>Os dados são utilizados <strong>exclusivamente</strong> para a geração do arquivo PDF do currículo, o processamento do pagamento e o atendimento de suporte. Seus dados <strong>não são vendidos nem compartilhados</strong> com terceiros para outras finalidades.</p>
      <h2>3. Pagamento</h2>
      <p>O pagamento é realizado no checkout da Lowify, exibido dentro do site. Os dados informados ali (nome, e-mail, telefone e dados de pagamento) são recebidos e tratados pela Lowify para processar a compra.</p>
      <h2>4. Ferramentas de medição</h2>
      <p>Utilizamos a tag do Google Ads (Google LLC), que pode usar cookies e identificadores para medir o desempenho dos nossos anúncios. O Google recebe esses dados conforme a <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">política de privacidade do Google</a>.</p>
      <p>Também usamos a análise de visitantes da Lovable, que não usa cookies, não armazena nada no seu dispositivo, não guarda endereços IP e não identifica visitantes. Ela registra as páginas visitadas, de onde o visitante veio, país, navegador, sistema operacional e tipo de dispositivo, tempo de permanência, velocidade de carregamento, erros e cliques na página. Esses registros são feitos para todos os visitantes. Os dados detalhados são mantidos por 90 dias e os resumos diários por um ano. A Lovable coleta esses dados para nós. A <a href="https://lovable.dev/privacy" target="_blank" rel="noreferrer">política de privacidade da Lovable</a> explica como ela os trata.</p>
      <h2>5. Armazenamento e segurança</h2>
      <p>Adotamos medidas técnicas e administrativas razoáveis para proteger os dados contra acessos não autorizados, perda ou alteração. Os dados são mantidos apenas pelo tempo necessário às finalidades acima ou ao cumprimento de obrigações legais.</p>
      <h2>6. Seus direitos</h2>
      <p>Como titular, você pode solicitar confirmação, acesso, correção, portabilidade, anonimização ou <strong>exclusão dos seus dados</strong>, bem como revogar consentimentos, pelo e-mail <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
      <h2>7. Contato</h2>
      <p>{company.name} — {company.address}. E-mail: <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
    </LegalPage>
  );
}
