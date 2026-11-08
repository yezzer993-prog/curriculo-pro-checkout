import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

const CHECKOUT_URL = "https://pay.lowify.com.br/checkout";
const PRODUCT_ID = "lHO2WM";

export function buildLowifyUrl(currentSearch = "") {
  const url = new URL(CHECKOUT_URL);
  new URLSearchParams(currentSearch).forEach((value, key) => url.searchParams.set(key, value));
  url.searchParams.set("product_id", PRODUCT_ID);
  return url.toString();
}

export function LowifyCheckout() {
  const [src, setSrc] = useState("");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setSrc(buildLowifyUrl(window.location.search)); }, []);

  return <div className="relative w-full flex-1 min-h-0">
    {!loaded && <div className="absolute inset-0 flex items-center justify-center text-muted-foreground"><LoaderCircle className="animate-spin" size={32} /></div>}
    {src && <iframe src={src} title="Checkout de pagamento" className="w-full h-full border-0 rounded-md bg-background" onLoad={() => setLoaded(true)} allow="payment; clipboard-write" />}
  </div>;
}
