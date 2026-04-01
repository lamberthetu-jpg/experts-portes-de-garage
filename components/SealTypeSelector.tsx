"use client";

import { useState } from "react";

const sealTypes = [
  {
    id: "bas",
    label: "Joint de bas de porte",
    desc: "Le caoutchouc fixé au bas du panneau inférieur. Amortit le contact avec le sol et bloque les infiltrations. Le plus sollicité — et le plus souvent à remplacer.",
    detail: "Ce joint absorbe les chocs à chaque ouverture et fermeture. Il est en contact direct avec le sol, la neige et l'eau. Un joint de bas de porte usé laisse passer l'air froid, l'eau et les insectes sous la porte.",
    image: "/images/coupe-froid/joint_de_bas_de_portes_de_garage.jpg",
  },
  {
    id: "lateraux",
    label: "Joints latéraux et de tête",
    desc: "Bandes d'étanchéité le long des montants verticaux et du haut du cadre. Empêchent l'air et l'eau de s'infiltrer sur les côtés et par le dessus.",
    detail: "Les joints latéraux et de tête forment un seul et même produit qui court sur les trois côtés du cadre. Souvent négligés, leur dégradation crée des courants d'air sur toute la hauteur et la largeur de la porte — particulièrement visible en hiver.",
    image: "/images/coupe-froid/coupe_froid_de_cote.jpg",
  },
  {
    id: "reteneur",
    label: "Reteneur du bas",
    desc: "Rail en aluminium ou PVC qui retient le caoutchouc d'étanchéité en forme de U au bas de la porte. Le reteneur du bas guide et maintient le caoutchouc en place pour une étanchéité optimale et durable.",
    detail: "Rail en aluminium ou PVC qui retient le caoutchouc d'étanchéité en forme de U au bas de la porte. Le reteneur du bas guide et maintient le caoutchouc en place pour une étanchéité optimale et durable.",
    image: "/images/coupe-froid/reteneur_du_bas_porte_de_garage.jpg",
  },
];

export default function SealTypeSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-brand font-bold text-sm uppercase tracking-widest mb-2">Ce que nous remplaçons</p>
        <h2 className="font-heading text-2xl md:text-3xl text-[#1a1a1a] uppercase mb-4 leading-tight">
          Tous les types de joints — Une étanchéité complète à 360°
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Un garage vraiment étanche nécessite des joints en bon état sur tous les côtés de la porte. Cliquez sur un type pour en savoir plus.
        </p>

        <div className="flex flex-col gap-3">
          {sealTypes.map((seal) => {
            const isActive = selected === seal.id;
            return (
              <button
                key={seal.id}
                type="button"
                onClick={() => setSelected(isActive ? null : seal.id)}
                className={`w-full text-left border-2 rounded-xl px-5 py-4 transition-all ${
                  isActive
                    ? "border-brand bg-brand/5 shadow-sm"
                    : "border-gray-200 hover:border-brand/40 hover:bg-gray-50"
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between gap-3">
                  <p className={`font-bold text-sm ${isActive ? "text-brand" : "text-[#1a1a1a]"}`}>
                    {seal.label}
                  </p>
                  <svg
                    className={`w-4 h-4 shrink-0 transition-transform ${isActive ? "rotate-180 text-brand" : "text-gray-400"}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{seal.desc}</p>

                {/* Expanded */}
                {isActive && (
                  <div className="mt-4 pt-4 border-t border-brand/20 flex flex-col sm:flex-row gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={seal.image}
                      alt={seal.label}
                      className="w-full sm:w-48 h-32 object-cover rounded-lg shrink-0"
                    />
                    <p className="text-gray-700 text-sm leading-relaxed self-center">{seal.detail}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
