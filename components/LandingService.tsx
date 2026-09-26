import Image from "next/image";
import RappelForm, { type SourceRappel } from "@/components/RappelForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/config";
import { LANDING, prix } from "@/lib/landing-granby";

/**
 * Page d'atterrissage Google Ads, commune a tous les services.
 *
 * La structure (appel en haut, reassurance, problemes, prix, etapes,
 * qui vient chez vous, zone, FAQ, formulaire) est la meme partout. Seul
 * le contenu change : c'est ce qui fait qu'une recherche « ressort cassé »
 * atterrit sur une page qui parle de ressorts.
 *
 * Les donnees d'affaires (prix, rayon, villes, NEQ) viennent de
 * `LANDING` : les memes pour toutes les pages.
 */

export type Carte = { titre: string; texte: string };

export type IconeReassurance = "horloge" | "garantie" | "outil" | "diagnostic";

export type ContenuLanding = {
  /** Page d'origine, reprise dans le courriel de rappel et les conversions. */
  source: SourceRappel;
  /** Texte de la barre rouge collee en haut. */
  barre: string;
  h1: string;
  intro: string;
  altHero: string;
  /** Exactement trois arguments sous le hero. */
  reassurance: { icone: IconeReassurance; titre: string; texte: string }[];
  problemesTitre: string;
  /** Cartes cliquables qui appellent directement. */
  problemes: Carte[];
  /** Encadre de securite sous les problemes. Absent = masque. */
  securite?: string;
  /** Deuxieme bloc (signes d'usure, reparer ou remplacer...). Absent = masque. */
  voieB?: { titre: string; intro: string; items: Carte[]; miseAuPoint: boolean };
  /**
   * Questions propres a la page. La premiere passe avant la garantie
   * et les paiements, les autres apres.
   */
  faq: { q: string; r: string }[];
  /** Section en plus, placée juste après le deuxième bloc (ex. les moteurs). */
  sectionEnPlus?: React.ReactNode;
};

export default function LandingService({ contenu: c }: { contenu: ContenuLanding }) {
  const aDesPrix =
    LANDING.prixMinimum !== null ||
    LANDING.tauxHoraire !== null ||
    LANDING.prixUrgence !== null;

  const lienRdv = LANDING.lienRendezVous ?? "#rappel";

  return (
    <div className="pb-20 md:pb-0">
      {/* ── Barre du haut ──────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-brand text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2 text-sm">
          <span className="truncate font-medium">{c.barre}</span>
          <a href={PHONE_HREF} data-cta="entete" className="shrink-0 whitespace-nowrap font-bold tabular-nums hover:underline">
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100svh-40px)] items-end overflow-hidden bg-neutral-950 md:min-h-[620px] md:items-center">
        {LANDING.photoHero ? (
          <>
            <Image
              src={LANDING.photoHero}
              alt={c.altHero}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[70%_center]"
            />
            {/* Dégradé progressif plutôt qu'un voile uniforme : sombre là où
                est le texte (en bas sur cellulaire, à gauche sur ordinateur),
                la scène reste visible ailleurs. */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/25 md:bg-gradient-to-r md:from-neutral-950/95 md:via-neutral-950/70 md:to-neutral-950/10"
            />
          </>
        ) : (
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#5a0000_0%,transparent_60%),radial-gradient(ellipse_at_bottom_right,#2a0000_0%,transparent_55%)]"
          />
        )}

        <div className="relative mx-auto w-full max-w-5xl px-5 pb-12 pt-24 md:py-24">
          <div className="max-w-2xl">
            <h1 className="font-heading text-[2rem] uppercase leading-[1.02] tracking-[0.01em] text-white sm:text-[2.75rem] md:text-[3.1rem]">
              {c.h1}
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
              {c.intro}
            </p>

            {/* Aiguillage : l’urgence garde le poids visuel */}
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
              <a
                href={PHONE_HREF}
                data-cta="hero"
                className="group inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-brand py-3.5 pl-3.5 pr-6 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-colors hover:bg-brand-dark active:scale-[0.99] sm:w-auto"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <PhoneIcon className="h-[18px] w-[18px]" />
                </span>
                <span className="whitespace-nowrap font-heading text-lg uppercase tracking-wide sm:text-xl">
                  C’est urgent : <span className="tabular-nums">{PHONE_DISPLAY}</span>
                </span>
              </a>

              <a
                href={lienRdv}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-[15px] font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white sm:justify-start"
              >
                <CalendarIcon className="h-4 w-4" />
                Ça peut attendre : je vous rappelle
              </a>
            </div>

            <p className="mt-9 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-white/60">
              {LANDING.heuresReponse && (
                <>
                  <span>{LANDING.heuresReponse}</span>
                  <span aria-hidden className="text-white/30">·</span>
                </>
              )}
              <span>Prix dit avant les travaux</span>
              <span aria-hidden className="text-white/30">·</span>
              <span>Granby, Bromont, Cowansville, Waterloo et {LANDING.rayonKm} km autour</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Réassurance ────────────────────────────────────────────────── */}
      <section className="relative z-10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_24px_-18px_rgba(0,0,0,0.25)]">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-gray-200 sm:py-12">
          {c.reassurance.map((r) => (
            <Reassurance key={r.titre} icone={r.icone} titre={r.titre} texte={r.texte} />
          ))}
        </div>
      </section>

      {/* ── VOIE A : bris urgents ──────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <h2 className="font-heading text-3xl uppercase sm:text-4xl">{c.problemesTitre}</h2>
        <p className="mt-2 text-gray-600">Touchez votre problème pour m’appeler tout de suite.</p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.problemes.map((b) => (
            <a
              key={b.titre}
              href={PHONE_HREF}
              data-cta="probleme"
              className="group rounded-2xl border border-gray-200 bg-white p-5 transition-[border-color,box-shadow] hover:border-gray-300 hover:shadow-[0_8px_24px_-16px_rgba(0,0,0,0.35)]"
            >
              <h3 className="font-bold text-gray-900 group-hover:text-brand">{b.titre}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{b.texte}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                <PhoneIcon className="h-4 w-4" /> Appeler
              </span>
            </a>
          ))}
        </div>

        {c.securite && (
          <p className="mt-6 rounded-xl border-l-4 border-brand bg-brand/5 p-4 text-sm leading-relaxed text-gray-800">
            <strong>Sécurité :</strong> {c.securite}
          </p>
        )}
      </section>

      {/* ── Avis Google (masqué tant qu’il n’y a pas de vrais avis) ────── */}
      {LANDING.avis.length > 0 && (
        <section className="border-y border-gray-100 bg-white">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
            <h2 className="font-heading text-3xl uppercase sm:text-4xl">Ce que mes clients en disent</h2>
            <p className="mt-2 text-gray-600">Avis laissés sur ma fiche Google.</p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {LANDING.avis.slice(0, 3).map((a, i) => (
                <blockquote
                  key={i}
                  className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.35)]"
                >
                  <p className="text-lg leading-none tracking-[0.15em] text-[#F5B400]" aria-label={`${a.etoiles} étoiles sur 5`}>
                    {"★".repeat(a.etoiles)}
                    <span className="text-gray-200">{"★".repeat(5 - a.etoiles)}</span>
                  </p>
                  <p className="mt-3 flex-1 leading-relaxed text-gray-700">«&nbsp;{a.texte}&nbsp;»</p>
                  <footer className="mt-4 text-sm font-semibold text-gray-500">
                    {a.prenom}
                    {a.ville && <>, {a.ville}</>}
                  </footer>
                </blockquote>
              ))}
            </div>
            {LANDING.lienAvisGoogle && (
              <a
                href={LANDING.lienAvisGoogle}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-semibold text-brand underline underline-offset-2"
              >
                Voir tous les avis sur Google
              </a>
            )}
          </div>
        </section>
      )}

      {/* ── VOIE B : travaux planifiés ─────────────────────────────────── */}
      {c.voieB && (
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
          <h2 className="font-heading text-3xl uppercase sm:text-4xl">
            {c.voieB.titre}
          </h2>
          <p className="mt-2 max-w-2xl text-gray-600">
            {c.voieB.intro}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.voieB.items.map((t) => (
              <div key={t.titre} className="rounded-2xl border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-gray-900">{t.titre}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{t.texte}</p>
              </div>
            ))}
          </div>

          {/* Encadré entretien : le produit d’appel de la voie B */}
          {c.voieB.miseAuPoint && (
          <div className="mt-8 rounded-2xl border-2 border-brand/20 bg-white p-6 sm:p-8">
            <h3 className="font-heading text-2xl uppercase text-brand">
              Mise au point complète
              {LANDING.miseAuPoint.prix !== null && <> : {prix(LANDING.miseAuPoint.prix)}</>}
            </h3>
            <p className="mt-3 leading-relaxed text-gray-700">
              Je vérifie et j’ajuste la tension des ressorts, je lubrifie, je serre la quincaillerie,
              je teste l’équilibrage et l’inversion de sécurité, et je vous dis ce qui est en train
              de s’user.
            </p>
            <p className="mt-3 leading-relaxed text-gray-700">
              Ça prend environ {LANDING.miseAuPoint.minutes} minutes. C’est ce qui évite le ressort
              qui casse un matin de janvier, et c’est bien moins cher qu’une urgence.
            </p>
            <a
              href={lienRdv}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-bold text-white transition-colors hover:bg-brand-dark"
            >
              <CalendarIcon className="h-5 w-5" /> Réserver une mise au point
            </a>
          </div>
          )}
        </div>
      </section>
      )}

      {c.sectionEnPlus}

      {/* ── Prix ───────────────────────────────────────────────────────── */}
      {aDesPrix && (
        <section className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
          <h2 className="font-heading text-3xl uppercase sm:text-4xl">Combien ça coûte</h2>

          {/* La garantie est l’argument le plus fort de la page : elle enleve
              tout le risque de l’appel. Elle passe avant les chiffres. */}
          <p className="mt-5 rounded-2xl border-2 border-brand bg-brand/5 p-5 text-lg font-bold leading-relaxed text-gray-900 sm:text-xl">
            Si je ne suis pas capable de réparer votre porte, vous ne payez rien.
          </p>

          <dl className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
            {LANDING.prixMinimum !== null && (
              <LignePrix
                titre="Frais minimum"
                montant={prix(LANDING.prixMinimum)}
                detail="Pour une petite affaire réglée sur place : un ajustement, un capteur mal aligné, une télécommande à reprogrammer."
              />
            )}
            {LANDING.tauxHoraire !== null && (
              <LignePrix
                titre="Taux horaire"
                montant={`${prix(LANDING.tauxHoraire)}/h`}
                detail="Pour la plupart des réparations : ressorts, câbles, rouleaux, ouvre-porte. Les pièces sont en sus, et je vous dis le prix avant de les installer."
              />
            )}
            {LANDING.prixUrgence !== null && (
              <LignePrix
                titre="Sortie d’urgence"
                montant={prix(LANDING.prixUrgence)}
                detail="Quand vous ne pouvez pas attendre et que je laisse tout tomber pour me rendre chez vous tout de suite, en dehors de ma route de la journée. Comprend la première heure sur place, ensuite 145 $/h. Si votre porte peut attendre à demain, vous payez le taux horaire normal."
              />
            )}
          </dl>

          <p className="mt-6 leading-relaxed text-gray-600">
            Le prix exact est confirmé sur place avant que je touche à quoi que ce soit.
            Vous savez ce que ça coûte avant que je commence.
          </p>
        </section>
      )}

      {/* ── Comment ça marche ──────────────────────────────────────────── */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
          <h2 className="font-heading text-3xl uppercase sm:text-4xl">Comment ça marche</h2>
          <ol className="mt-7 grid gap-6 sm:grid-cols-3">
            <Etape n={1} titre="Vous appelez">
              Je réponds moi-même. Décrivez-moi le bruit ou ce que vous voyez, je sais
              généralement de quoi il s’agit en deux minutes.
            </Etape>
            <Etape n={2} titre="Je passe">
              Souvent la même journée. Je vérifie sur place et je vous donne le prix ferme
              avant de commencer.
            </Etape>
            <Etape n={3} titre="Je répare">
              La plupart des réparations se règlent en une visite, entre 45 minutes et 2 heures.
            </Etape>
          </ol>
        </div>
      </section>

      {/* ── Qui vient chez vous ────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[220px_1fr]">
          {LANDING.photoLambert ? (
            <Image
              src={LANDING.photoLambert}
              alt="Lambert Hétu, Experts Portes de Garage"
              width={220}
              height={220}
              className="mx-auto rounded-2xl object-cover"
            />
          ) : (
            <div className="mx-auto flex h-[180px] w-[180px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-4 text-center text-xs text-gray-400 md:h-[220px] md:w-[220px]">
              Votre photo ici
            </div>
          )}

          <div>
            <h2 className="font-heading text-3xl uppercase sm:text-4xl">Moi, Lambert Hétu</h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              C’est moi qui réponds au téléphone et c’est moi qui me présente chez vous. Pas de
              répartiteur, pas de sous-traitant, pas de vendeur qui essaie de vous refiler une
              porte neuve.
            </p>
            <p className="mt-3 leading-relaxed text-gray-700">
              Je suis de Granby. Je vous explique ce qui est brisé, je vous montre la pièce, et je
              vous dis honnêtement ce qui peut attendre et ce qui ne peut pas.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Entreprise enregistrée au Québec, NEQ {LANDING.neq}.
            </p>
          </div>
        </div>
      </section>

      {/* ── Zone desservie ─────────────────────────────────────────────── */}
      <section className="bg-muted">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <h2 className="font-heading text-2xl uppercase sm:text-3xl">Zone desservie</h2>
          <p className="mt-3 leading-relaxed text-gray-700">{LANDING.villes.join(", ")}.</p>
          <p className="mt-3 text-gray-600">
            Pas certain si vous êtes dans la zone?{" "}
            <a href={PHONE_HREF} data-cta="zone" className="font-semibold text-brand underline underline-offset-2">
              Appelez, je vais vous le dire tout de suite.
            </a>
          </p>
        </div>
      </section>

      {/* ── FAQ (accordéon natif, aucun JavaScript) ────────────────────── */}
      <section className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <h2 className="font-heading text-3xl uppercase sm:text-4xl">Questions fréquentes</h2>
        <div className="mt-7 divide-y divide-gray-200 border-y border-gray-200">
          {LANDING.faq.soirEtFinDeSemaine && (
            <Question q="Vous venez le soir ou la fin de semaine?">
              {LANDING.faq.soirEtFinDeSemaine}
            </Question>
          )}
          {c.faq.slice(0, 1).map((f) => (
            <Question key={f.q} q={f.q}>{f.r}</Question>
          ))}
          {LANDING.faq.garantie && (
            <Question q="Est-ce que la réparation est garantie?">{LANDING.faq.garantie}</Question>
          )}
          {LANDING.faq.paiements && (
            <Question q="Quels paiements acceptez-vous?">{LANDING.faq.paiements}</Question>
          )}
          {c.faq.slice(1).map((f) => (
            <Question key={f.q} q={f.q}>{f.r}</Question>
          ))}
          {LANDING.lienRendezVous && (
            <Question q="Est-ce que je peux réserver en ligne sans appeler?">
              Oui. Choisissez votre plage horaire directement, vous recevez la confirmation par courriel.
            </Question>
          )}
        </div>
      </section>

      {/* ── Formulaire (plan B) ────────────────────────────────────────── */}
      <section id="rappel" className="scroll-mt-14 bg-muted">
        <div className="mx-auto max-w-xl px-5 py-16 sm:py-20">
          <h2 className="font-heading text-3xl uppercase sm:text-4xl">Écrivez-moi</h2>
          <p className="mt-2 mb-6 text-gray-600">
            Je vous rappelle. Trois champs, ça prend 20 secondes.
          </p>
          <RappelForm source={c.source} />
        </div>
      </section>

      {/* ── Pied de page légal ─────────────────────────────────────────── */}
      <footer className="bg-neutral-900 py-8 text-center text-sm text-white/60">
        <p className="font-semibold text-white/80">Experts Portes de Garage</p>
        <p className="mt-1">Granby, Québec · NEQ {LANDING.neq}</p>
        <p className="mt-1">
          <a href={PHONE_HREF} className="hover:text-white">{PHONE_DISPLAY}</a>
        </p>
      </footer>

      {/* ── Barre d’appel collée en bas (mobile) ───────────────────────── */}
      <a
        href={PHONE_HREF}
        data-cta="barre_mobile"
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-3 bg-brand py-4 font-heading text-lg uppercase tracking-wide text-white shadow-[0_-4px_20px_rgba(0,0,0,0.25)] md:hidden"
      >
        <PhoneIcon className="h-5 w-5" />
        Appeler maintenant : {PHONE_DISPLAY}
      </a>
    </div>
  );
}

/* ─── Petits composants ─────────────────────────────────────────────────── */

/** Icônes au trait, même épaisseur, pour les trois arguments sous le hero. */
const ICONES: Record<IconeReassurance, string> = {
  horloge: "M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  garantie: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  outil: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085",
  diagnostic: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
};

function Reassurance({ icone, titre, texte }: { icone: IconeReassurance; titre: string; texte: string }) {
  return (
    <div className="flex items-start gap-4 sm:px-8 sm:first:pl-0 sm:last:pr-0">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/[0.07] text-brand">
        <svg className="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
          <path strokeLinecap="round" strokeLinejoin="round" d={ICONES[icone]} />
        </svg>
      </span>
      <div className="pt-0.5">
        <p className="text-[17px] font-bold leading-snug text-gray-900">{titre}</p>
        <p className="mt-1 text-sm leading-relaxed text-gray-500">{texte}</p>
      </div>
    </div>
  );
}

function LignePrix({
  titre,
  montant,
  detail,
}: {
  titre: string;
  montant: string;
  detail: string;
}) {
  return (
    <div className="py-5">
      <div className="flex items-baseline justify-between gap-4">
        <dt className="font-bold text-gray-900">{titre}</dt>
        <dd className="shrink-0 font-heading text-xl tabular-nums text-brand">{montant}</dd>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{detail}</p>
    </div>
  );
}

function Etape({ n, titre, children }: { n: number; titre: string; children: React.ReactNode }) {
  return (
    <li className="rounded-2xl bg-white p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-heading text-lg text-white">
        {n}
      </span>
      <h3 className="mt-4 font-bold text-gray-900">{titre}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{children}</p>
    </li>
  );
}

function Question({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
        {q}
        <span className="shrink-0 text-brand transition-transform group-open:rotate-45">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </summary>
      <p className="mt-3 leading-relaxed text-gray-600">{children}</p>
    </details>
  );
}

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function CalendarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
