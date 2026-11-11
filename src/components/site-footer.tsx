import { Link } from "@tanstack/react-router";

export const company = {
  name: "ADS FLOW LTDA",
  cnpj: "59.765.052/0001-00",
  address: "Rua Serra de Botucatu, 878, Sala 1503 - Vila Gomes Cardim, São Paulo - SP, CEP: 03317-000",
  email: "adsflowltdaiasnetworking@gmail.com",
};

export function SiteFooter() {
  return (
    <footer className="mt-10 w-full border-t border-border bg-card/60 px-4 py-8 text-center text-xs text-muted-foreground">
      <nav className="mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium">
        <Link to="/termos" className="text-foreground hover:text-primary">Termos de Uso</Link>
        <Link to="/privacidade" className="text-foreground hover:text-primary">Política de Privacidade</Link>
        <Link to="/reembolso" className="text-foreground hover:text-primary">Política de Reembolso</Link>
      </nav>
      <p className="font-semibold text-foreground">{company.name} — CNPJ: {company.cnpj}</p>
      <p className="mt-1">{company.address}</p>
      <p className="mt-1">Suporte: <a href={`mailto:${company.email}`} className="text-primary underline break-all">{company.email}</a></p>
      <p className="mt-3">© {new Date().getFullYear()} CurrículoPro. Todos os direitos reservados.</p>
    </footer>
  );
}
