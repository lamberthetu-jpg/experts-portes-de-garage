import Script from "next/script";
import { GA4_ID, GOOGLE_ADS_ID, WEBSITE_CALL } from "@/lib/gtag";

/** Balise Google (gtag.js) pour Google Ads + GA4 : conversions, remarketing et trafic. */
export default function GoogleTag({ numeros }: { numeros: Record<"google" | "meta" | "organic", string> }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');
// Le numéro affiché (ligne de la provenance, lib/suivi.ts) : le transfert d'appel de Google le remplace et y sonne.
var egNumeros = ${JSON.stringify(numeros)};
gtag('config', '${WEBSITE_CALL}', { phone_conversion_number: egNumeros[window.egLigne] || egNumeros.organic });${GA4_ID ? `
gtag('config', '${GA4_ID}');` : ""}`}
      </Script>
    </>
  );
}
