import Link from "next/link";

/**
 * Ce bloc contenait 4 temoignages inventes (faux noms) et une note de
 * « 4.8 » presentee comme « Base sur nos avis Google », alors que la fiche
 * Google reelle n'affiche qu'un seul avis. Les deux ont ete retires.
 *
 * A la place : des engagements verifiables, plus l'invitation a laisser un
 * vrai avis. Le bouton pointe sur /avis, la meme page que le code QR des
 * cartes d'affaires, pour que les clics soient comptes au meme endroit.
 *
 * Quand il y aura une dizaine de vrais avis, on pourra remettre un bloc de
 * temoignages avec la vraie note.
 */

const ENGAGEMENTS = [
  {
    titre: "Réparé le jour même",
    texte:
      "Dans la plupart des cas je passe la journée même. Les ressorts, câbles et roulettes les plus courants sont déjà dans le camion.",
    icone: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    titre: "Pas réparée, pas payée",
    texte:
      "Si je ne suis pas capable de réparer votre porte, vous ne payez rien. C’est aussi simple que ça.",
    icone: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    titre: "Le prix avant de commencer",
    texte:
      "Frais minimum de 125 $, taux horaire de 170 $, pièces en sus. Vous savez à quoi vous attendre avant que je touche à quoi que ce soit.",
    icone: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m-6 4h6m-6 4h4M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" />
    ),
  },
];

export default function ReviewsSlider() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <ul className="flex flex-col gap-4">
        {ENGAGEMENTS.map((e) => (
          <li
            key={e.titre}
            className="flex items-start gap-4 bg-white border-2 border-brand/15 rounded-2xl px-6 py-5 shadow-sm"
          >
            <span className="flex-shrink-0 w-11 h-11 rounded-full bg-brand/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-brand"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                {e.icone}
              </svg>
            </span>
            <div>
              <p className="font-heading text-brand text-lg uppercase leading-tight">{e.titre}</p>
              <p className="text-gray-700 leading-relaxed text-[0.95rem] mt-1">{e.texte}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-10 py-8 flex flex-col items-center gap-3 w-full max-w-xs text-center">
          <svg className="w-10 h-10" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#4285F4" d="M46.145 24.5c0-1.546-.138-3.032-.395-4.455H24v8.42h12.445c-.537 2.9-2.17 5.36-4.627 7.01v5.824h7.49c4.383-4.038 6.837-9.987 6.837-16.8z" />
            <path fill="#34A853" d="M24 47c6.24 0 11.47-2.07 15.293-5.606l-7.49-5.823C29.71 37.24 27.02 38 24 38c-6.014 0-11.104-4.063-12.923-9.528H3.35v6.014C7.154 42.533 15.02 47 24 47z" />
            <path fill="#FBBC05" d="M11.077 28.472A14.48 14.48 0 0110.5 24c0-1.557.267-3.07.577-4.472V13.514H3.35A23.018 23.018 0 001 24c0 3.713.888 7.225 2.35 10.486l7.727-6.014z" />
            <path fill="#EA4335" d="M24 10c3.39 0 6.434 1.165 8.83 3.455l6.617-6.617C35.464 3.14 30.234 1 24 1 15.02 1 7.154 5.467 3.35 13.514l7.727 6.014C12.896 14.063 17.986 10 24 10z" />
          </svg>

          <p className="font-heading text-xl uppercase text-[#1a1a1a] leading-tight">
            Vous avez fait affaire avec moi?
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Un avis Google prend 30 secondes et ça aide énormément un travailleur autonome.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link
            href="/avis"
            className="bg-brand text-white font-bold px-6 py-3 rounded-lg text-center hover:bg-brand-dark transition-colors"
          >
            Laisser un avis
          </Link>
          <a
            href="https://share.google/cHYazBuCaEQWOsKhq"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-brand text-brand font-bold px-6 py-3 rounded-lg text-center hover:bg-brand hover:text-white transition-colors"
          >
            Voir la fiche Google
          </a>
        </div>
      </div>
    </div>
  );
}
