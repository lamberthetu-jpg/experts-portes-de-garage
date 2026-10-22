import Script from "next/script";
import { GA4_ID, GOOGLE_ADS_ID, WEBSITE_CALL } from "@/lib/gtag";
import { PHONE_DISPLAY } from "@/lib/config";
import { PHONE_ANNONCES_DISPLAY, SCRIPT_DETECTION } from "@/lib/suivi";

/** Balise Google (gtag.js) pour Google Ads + GA4 : conversions, remarketing et trafic. */
export default function GoogleTag() {
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
// Venu d'une annonce : le numéro de transfert de Google sonnera sur la ligne des annonces (lib/suivi.ts).
var egAnnonce = ${SCRIPT_DETECTION};
gtag('config', '${WEBSITE_CALL}', { phone_conversion_number: egAnnonce ? '${PHONE_ANNONCES_DISPLAY}' : '${PHONE_DISPLAY}' });${GA4_ID ? `
gtag('config', '${GA4_ID}');` : ""}`}
      </Script>
    </>
  );
}
