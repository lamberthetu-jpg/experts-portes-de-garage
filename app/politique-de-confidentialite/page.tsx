import type { Metadata } from "next";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Experts Portes de Garage",
  description:
    "Quels renseignements Experts Portes de Garage recueille, pourquoi, avec qui ils sont partagés et comment exercer vos droits.",
  alternates: { canonical: "/politique-de-confidentialite" },
};

const MISE_A_JOUR = "15 octobre 2026";

function Section({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-heading text-xl text-gray-900 mb-3">{titre}</h2>
      <div className="space-y-3 text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}

export default function PolitiqueConfidentialite() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="font-heading text-3xl sm:text-4xl text-gray-900">Politique de confidentialité</h1>
      <p className="mt-3 text-sm text-gray-500">Dernière mise à jour : {MISE_A_JOUR}</p>

      <Section titre="Qui sommes-nous">
        <p>
          Experts Portes de Garage est une entreprise individuelle de Granby (Québec), exploitée par Lambert Hétu
          (NEQ 2281545188). Elle répare et entretient des portes de garage résidentielles.
        </p>
        <p>
          La personne responsable de la protection des renseignements personnels est Lambert Hétu. Pour toute question
          ou demande : <a className="text-brand underline" href="mailto:info@expertsportesdegarage.ca">info@expertsportesdegarage.ca</a>{" "}
          ou <a className="text-brand underline" href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
        </p>
      </Section>

      <Section titre="Ce que nous recueillons">
        <p>Seulement ce qu'il faut pour vous rendre le service :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>votre nom, votre numéro de téléphone et votre courriel;</li>
          <li>l'adresse où se trouve la porte de garage;</li>
          <li>la description du problème et, s'il y a lieu, les photos que vous nous envoyez;</li>
          <li>le contenu de nos échanges par texto; les appels faits au {PHONE_DISPLAY} peuvent être enregistrés pour le suivi de votre dossier;</li>
          <li>les renseignements que vous remplissez dans un formulaire de réservation sur notre site ou sur Facebook.</li>
        </ul>
        <p>Nous ne recueillons jamais vos renseignements bancaires par ces moyens.</p>
      </Section>

      <Section titre="Pourquoi nous les utilisons">
        <ul className="list-disc pl-6 space-y-1">
          <li>vous rappeler et fixer un rendez-vous;</li>
          <li>nous rendre chez vous et faire le travail demandé;</li>
          <li>vous envoyer une soumission, une facture ou un rappel lié à votre service;</li>
          <li>tenir nos dossiers comptables, comme la loi l'exige.</li>
        </ul>
        <p>Nous ne vendons pas vos renseignements et nous ne les louons à personne.</p>
      </Section>

      <Section titre="Avec qui ils sont partagés">
        <p>
          Pour fonctionner, nous utilisons des fournisseurs qui hébergent ou transmettent certains renseignements pour
          notre compte : hébergement du site et de la base de données (Vercel, Supabase), envoi de courriels (Resend),
          téléphone et textos (Twilio), et publicité (Google et Meta, si vous nous joignez par une de leurs annonces).
        </p>
        <p>
          Certains de ces fournisseurs conservent les données à l'extérieur du Québec, notamment aux États-Unis. Ils
          n'ont le droit de s'en servir que pour nous rendre leur service.
        </p>
      </Section>

      <Section titre="Témoins et mesure de la publicité">
        <p>
          Notre site utilise des témoins (cookies) de Google pour savoir si une annonce a mené à un appel ou à une
          demande. Vous pouvez les bloquer dans les réglages de votre navigateur; le site continue de fonctionner.
        </p>
        <p>
          Nous utilisons aussi nos propres témoins (eg_ft et eg_n, 90 jours) pour savoir comment vous nous avez trouvés :
          annonce Google, Facebook ou Instagram, ou autrement. Ils retiennent la page d’arrivée et les paramètres du lien
          suivi (utm, gclid, fbclid), et le numéro de téléphone affiché en dépend. Si vous nous écrivez ou nous appelez,
          cette provenance est notée à votre dossier dans notre logiciel de gestion (Vitryne). Ces témoins ne sont transmis à aucun autre tiers.
        </p>
      </Section>

      <Section titre="Combien de temps nous les gardons">
        <p>
          Le temps nécessaire pour vous servir et respecter nos obligations comptables et fiscales (en général 6 ans pour
          les factures). Les demandes qui ne mènent à aucun service sont supprimées après 2 ans.
        </p>
      </Section>

      <Section titre="Vos droits">
        <p>
          Vous pouvez demander à consulter vos renseignements, à les faire corriger ou à les faire supprimer lorsque la
          loi le permet, et retirer votre consentement en tout temps. Écrivez à{" "}
          <a className="text-brand underline" href="mailto:info@expertsportesdegarage.ca">info@expertsportesdegarage.ca</a>.
          Nous répondons dans un délai de 30 jours.
        </p>
        <p>
          Si vous n'êtes pas satisfait de notre réponse, vous pouvez vous adresser à la Commission d'accès à
          l'information du Québec.
        </p>
      </Section>
    </div>
  );
}
