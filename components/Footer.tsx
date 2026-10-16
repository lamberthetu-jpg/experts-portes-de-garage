import Link from "next/link";
import PlanifierButton from "@/components/PlanifierButton";
import CopyrightYear from "@/components/CopyrightYear";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";

const serviceLinks = [
  { href: "/reparation-urgente-de-porte-de-garage", label: "Réparation urgente 24/7" },
  { href: "/installation-de-nouvelle-porte-de-garage", label: "Nouvelle installation" },
  { href: "/reparation-ouvre-porte-de-garage", label: "Ouvre-porte de garage" },
];

const companyLinks = [
  { href: "/a-propos", label: "À propos" },
  { href: "/carriere", label: "Carrières" },
  { href: "/politique-de-confidentialite", label: "Confidentialité" },
];

const blogLinks = [
  { href: "/blog/ressort-porte-de-garage-brise", label: "Ressort brisé — quoi faire?" },
  { href: "/blog/cout-reparation-porte-garage-quebec", label: "Prix des réparations 2026" },
  { href: "/blog/entretien-porte-garage-hiver-quebec", label: "Entretien hivernal" },
  { href: "/blog/signes-porte-garage-besoin-entretien", label: "7 signes d'usure urgents" },
  { href: "/blog", label: "Tous les articles →" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-400">
      {/* Pre-footer CTA strip */}
      <div className="bg-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-heading text-white text-lg md:text-xl uppercase tracking-wide text-center sm:text-left">
            Besoin d&apos;un expert maintenant?
          </p>
          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="bg-white text-brand font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
            <PlanifierButton className="border-2 border-white text-white font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-white hover:text-brand transition-colors">
              Planifier une visite
            </PlanifierButton>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="font-heading text-red-500 text-xl tracking-tight block mb-4 uppercase"
          >
            Experts Portes de Garage
          </Link>
          <p className="text-sm leading-relaxed text-gray-400 mb-5">
            Service local de réparation de portes de garage — Granby &amp; régions.
            Résultats garantis dès la première visite.
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-brand text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-brand-dark transition-colors"
          >
            {PHONE_DISPLAY}
          </a>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-heading text-white text-sm uppercase tracking-widest mb-5">
            Services
          </h3>
          <ul className="flex flex-col gap-2.5">
            {serviceLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Blogue */}
        <div>
          <h3 className="font-heading text-white text-sm uppercase tracking-widest mb-5">
            Blogue
          </h3>
          <ul className="flex flex-col gap-2.5">
            {blogLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Entreprise */}
        <div>
          <h3 className="font-heading text-white text-sm uppercase tracking-widest mb-5">
            Entreprise
          </h3>
          <ul className="flex flex-col gap-2.5">
            {companyLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-heading text-white text-sm uppercase tracking-widest mb-5">
            Contact
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a
                href={PHONE_HREF}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href="mailto:info@expertsportesdegarage.ca"
                className="text-gray-400 hover:text-white transition-colors break-all"
              >
                info@expertsportesdegarage.ca
              </a>
            </li>
            <li className="text-gray-400">Granby &amp; régions, Québec</li>
            <li className="text-gray-400 text-xs mt-1">
              Service d&apos;urgence disponible<br />7 jours sur 7, 24h/24
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-400">
        © <CopyrightYear /> Experts Portes de Garage. Tous droits réservés.
      </div>
    </footer>
  );
}
