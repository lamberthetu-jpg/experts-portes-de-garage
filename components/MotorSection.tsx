"use client";

import { useState } from "react";
import PlanifierButton from "@/components/PlanifierButton";

interface Motor {
  image: string;
  name: string;
  tagline: string;
  price: string;
  features: string[];
  idealFor: string[];
  specs: string[];
  specialFeature?: string;
}

const MOTORS: Motor[] = [
  {
    image: "/images/moteurs/moteur_maxum.jpg",
    name: "LiftMaster MAXUM",
    tagline: "Moteur commercial intensif",
    price: "3 400$",
    features: ["Jusqu'à 700 lb", "Wi-Fi myQ intégré", "20 cycles/heure"],
    idealFor: ["Garage commercial", "Entrepôt", "Atelier mécanique", "Porte industrielle"],
    specs: ["Poids max 700 lb", "Vitesse 12 po/sec", "Wi-Fi myQ", "Soft start/stop", "Batterie de secours optionnelle", "Écran LCD"],
  },
  {
    image: "/images/moteurs/moteur_lj_8900W.png",
    name: "LiftMaster LJ8900W",
    tagline: "Moteur commercial compact",
    price: "800$",
    features: ["Jusqu'à 300 lb", "Wi-Fi myQ intégré", "Installation murale"],
    idealFor: ["Petit garage commercial", "Atelier", "Porte résidentielle haut de gamme"],
    specs: ["Poids max 300 lb", "Moteur DC 12V", "Wi-Fi myQ", "Installation murale jackshaft", "Ultra silencieux"],
  },
  {
    image: "/images/moteurs/moteur_DDO8900W.png",
    name: "LiftMaster DDO8900W",
    tagline: "Moteur pour porte de quai",
    price: "À partir de 1 200$",
    features: ["50% plus rapide", "Wi-Fi myQ intégré", "Porte de quai/dock"],
    idealFor: ["Entrepôt", "Centre de distribution", "Zone de livraison", "Quai de chargement"],
    specs: ["Moteur DC 12V", "Installation murale jackshaft", "Wi-Fi myQ", "Batterie de secours optionnelle", "Fermeture automatique", "Détection d'obstacles"],
    specialFeature: "Système myQ Dock Management — suivez l'activité de vos portes en temps réel",
  },
];

export default function MotorSection() {
  const [selectedMotor, setSelectedMotor] = useState<Motor | null>(null);

  return (
    <>
      <section className="bg-[#f8f8f8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl text-brand uppercase mb-3">
              Nos moteurs de portes de garage
            </h2>
            <p className="text-gray-500 text-base">Choisissez le moteur adapté à votre porte</p>
          </div>

          {/* Category label */}
          <p className="font-heading text-sm text-gray-400 uppercase tracking-widest mb-5 text-center">
            Commercial
          </p>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOTORS.map((motor) => (
              <button
                key={motor.name}
                type="button"
                onClick={() => setSelectedMotor(motor)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden text-left group"
              >
                {/* Image area */}
                <div className="relative bg-gray-50 flex items-center justify-center h-52 p-4">
                  {/* Badge */}
                  <span className="absolute top-3 right-3 bg-brand text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    Commercial
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={motor.image}
                    alt={motor.name}
                    className="max-h-44 max-w-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="px-5 py-4">
                  <p className="font-heading text-brand text-lg uppercase leading-tight mb-0.5">
                    {motor.name}
                  </p>
                  <p className="text-gray-500 text-sm mb-3">{motor.tagline}</p>

                  {/* Key features */}
                  <ul className="flex flex-col gap-1.5 mb-4">
                    {motor.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-gray-700 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="font-bold text-brand text-lg">{motor.price}</span>
                    <span className="text-brand text-sm font-semibold group-hover:underline">
                      Voir les détails →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedMotor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMotor(null)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedMotor(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
              aria-label="Fermer"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal image */}
            <div className="bg-gray-50 flex items-center justify-center h-56 px-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedMotor.image}
                alt={selectedMotor.name}
                className="max-h-48 max-w-full object-contain"
              />
            </div>

            <div className="px-6 py-6">
              {/* Name + price */}
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="font-heading text-2xl text-brand uppercase leading-tight">
                  {selectedMotor.name}
                </h3>
                <span className="font-bold text-brand text-xl whitespace-nowrap">{selectedMotor.price}</span>
              </div>
              <p className="text-gray-500 text-sm mb-6">{selectedMotor.tagline}</p>

              {/* Ideal for */}
              <div className="mb-5">
                <p className="font-bold text-[#1a1a1a] text-sm uppercase tracking-wide mb-2">Idéal pour :</p>
                <ul className="flex flex-col gap-1.5">
                  {selectedMotor.idealFor.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs grid */}
              <div className="mb-5">
                <p className="font-bold text-[#1a1a1a] text-sm uppercase tracking-wide mb-3">Caractéristiques :</p>
                <div className="grid grid-cols-2 gap-2">
                  {selectedMotor.specs.map((spec) => (
                    <div key={spec} className="bg-[#f8f8f8] rounded-lg px-3 py-2 text-sm text-gray-700">
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              {/* Special feature */}
              {selectedMotor.specialFeature && (
                <div className="bg-brand/5 border border-brand/20 rounded-xl px-4 py-3 mb-5">
                  <p className="text-brand text-sm font-semibold">{selectedMotor.specialFeature}</p>
                </div>
              )}

              {/* CTA */}
              <PlanifierButton className="w-full bg-brand text-white font-bold py-3 px-6 rounded-xl hover:bg-brand-dark transition-colors text-sm">
                Planifier une installation
              </PlanifierButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
