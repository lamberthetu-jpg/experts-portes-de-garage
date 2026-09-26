"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PHONE_DISPLAY } from "@/lib/config";
import { track } from "@vercel/analytics";
import { gtagConversion } from "@/lib/gtag";

interface WeatherSealBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  seals: string[];
  condition: string;
  notes: string;
  measurements: Record<string, string>;
  color: string;
  codePostal: string;
  adresse: string;
  ville: string;
  nom: string;
  telephone: string;
  courriel: string;
  wantQuote: boolean;
  measureConfirmed: boolean;
}

const EMPTY_FORM: FormData = {
  seals: [],
  condition: "",
  notes: "",
  measurements: {},
  color: "",
  codePostal: "",
  adresse: "",
  ville: "",
  nom: "",
  telephone: "",
  courriel: "",
  wantQuote: false,
  measureConfirmed: false,
};

const SEAL_OPTIONS = [
  { id: "bas",      label: "Joint de bas de porte",            desc: "La bande de caoutchouc au bas de votre porte qui touche le sol — empêche l'air, l'eau et les insectes d'entrer." },
  { id: "lateraux", label: "Joints latéraux et de tête",       desc: "Les bandes sur les côtés et en haut du cadre de porte — scellent les espaces entre la porte et le garage." },
  { id: "reteneur", label: "Reteneur du bas",                  desc: "La pièce en aluminium ou en plastique fixée au bas de la porte qui retient le joint en caoutchouc en place." },
  { id: "inconnu",  label: "Je ne sais pas / Inspection complète", desc: "Notre technicien inspecte tout et vous recommande ce qui doit être remplacé — sans frais cachés." },
];

const CONDITION_OPTIONS = [
  { id: "craquele",    label: "Craquelé ou durci" },
  { id: "decolle",     label: "Décollé ou arraché" },
  { id: "infiltration",label: "Infiltrations d'air ou d'eau" },
  { id: "insectes",    label: "Insectes ou nuisibles" },
  { id: "autre",       label: "Autre / Je ne sais pas" },
];

// Price per linear foot (installation included)
const PRICE_PER_FOOT: Record<string, number> = {
  bas:      5,
  lateraux: 7,
  reteneur: 10,
};

const SEAL_LABELS: Record<string, string> = {
  bas:      "Joint de bas de porte",
  lateraux: "Joints latéraux et de tête",
  reteneur: "Reteneur du bas",
};

// Seals that have a color option
const COLOR_SEALS = ["lateraux"];

const STEP_LABELS = ["Votre situation", "Mesures & prix", "Votre adresse", "Coordonnées"];
const TOTAL_STEPS = 4;

function calcTotal(seals: string[], measurements: Record<string, string>): number {
  return seals
    .filter((id) => id !== "inconnu")
    .reduce((sum, id) => {
      const ft = parseFloat(measurements[id] || "0") || 0;
      return sum + ft * (PRICE_PER_FOOT[id] || 0);
    }, 0);
}

function inputCls(hasError: boolean) {
  return `w-full border rounded-lg px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 transition-colors ${
    hasError ? "border-red-400 focus:ring-red-200 focus:border-red-400" : "border-gray-200 focus:ring-brand/20 focus:border-brand"
  }`;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function WeatherSealBookingModal({ isOpen, onClose }: WeatherSealBookingModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [suggestions, setSuggestions] = useState<{ placeId: string; text: string; secondary: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [addressVerified, setAddressVerified] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const measureRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const wsTelephoneRef = useRef<HTMLInputElement>(null);
  const wsCourrielRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) { setStep(1); setSubmitted(false); setIsSubmitting(false); setSubmitError(""); setErrors({}); setForm(EMPTY_FORM); setSuggestions([]); }
  }, [isOpen]);

  const fetchSuggestions = useCallback(async (input: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey || input.length < 3) { setSuggestions([]); return; }
    try {
      const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Goog-Api-Key": apiKey },
        body: JSON.stringify({ input, regionCode: "CA", languageCode: "fr" }),
      });
      const data = await res.json();
      const items = (data.suggestions || []).map((s: { placePrediction: { placeId: string; text: { text: string }; structuredFormat: { mainText: { text: string }; secondaryText: { text: string } } } }) => ({
        placeId: s.placePrediction.placeId,
        text: s.placePrediction.structuredFormat.mainText.text,
        secondary: s.placePrediction.structuredFormat.secondaryText.text,
      }));
      setSuggestions(items);
      setShowSuggestions(items.length > 0);
    } catch { setSuggestions([]); }
  }, []);

  const handleAdresseChange = (value: string) => {
    setForm(f => ({ ...f, adresse: value, ville: "", codePostal: "" }));
    setErrors(e => ({ ...e, adresse: "", ville: "", codePostal: "" }));
    setAddressVerified(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  const selectSuggestion = async (placeId: string, text: string) => {
    setShowSuggestions(false);
    setSuggestions([]);
    update("adresse", text);
    setAddressVerified(true);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;
    try {
      const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=addressComponents,location&languageCode=fr`, {
        headers: { "X-Goog-Api-Key": apiKey },
      });
      const place = await res.json();
      let streetNumber = "", route = "", city = "", postalCode = "";
      for (const c of (place.addressComponents || [])) {
        if (c.types.includes("street_number")) streetNumber = c.longText;
        if (c.types.includes("route")) route = c.longText;
        if (c.types.includes("locality")) city = c.longText;
        if (c.types.includes("postal_code")) postalCode = c.longText;
      }
      if (streetNumber || route) setForm(f => ({ ...f, adresse: `${streetNumber} ${route}`.trim() }));
      if (city) setForm(f => ({ ...f, ville: city }));
      if (postalCode) setForm(f => ({ ...f, codePostal: postalCode }));

      if (place.location) {
        const dist = haversineKm(place.location.latitude, place.location.longitude, 45.3972, -72.7330);
        if (dist > 45) {
          setErrors(e => ({ ...e, adresse: `Cette adresse est à ${Math.round(dist)} km de Granby — hors de notre zone de service (45 km max). Appelez-nous au 438-808-9604.` }));
        }
      }
    } catch { /* keep typed value */ }
  };

  if (!isOpen) return null;

  const update = (field: keyof FormData, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  const toggleSeal = (id: string) => {
    setForm(f => {
      const seals = f.seals.includes(id) ? f.seals.filter(s => s !== id) : [...f.seals, id];
      return { ...f, seals };
    });
    setErrors(e => ({ ...e, seals: "" }));
  };

  const updateMeasurement = (id: string, value: string) => {
    setForm(f => ({ ...f, measurements: { ...f.measurements, [id]: value } }));
    setErrors(e => ({ ...e, [`measure_${id}`]: "" }));
  };

  const focusNextMeasure = (currentId: string) => {
    const measurable = form.seals.filter(s => s !== "inconnu");
    const idx = measurable.indexOf(currentId);
    if (idx !== -1 && idx < measurable.length - 1) {
      measureRefs.current[measurable[idx + 1]]?.focus();
    }
  };

  // Seals that need measurements (not "inconnu")
  const measurableSeals = form.seals.filter(id => id !== "inconnu");
  const needsColor = form.seals.some(id => COLOR_SEALS.includes(id));
  const onlyInconnu = form.seals.length > 0 && form.seals.every(id => id === "inconnu");
  const hasCustomColor = needsColor && form.color !== "" && form.color !== "noir" && form.color !== "blanc";
  const total = calcTotal(form.seals, form.measurements);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (form.seals.length === 0) errs.seals = "Sélectionnez au moins une option";
    } else if (step === 2 && !onlyInconnu) {
      measurableSeals.forEach(id => {
        const ft = parseFloat(form.measurements[id] || "0");
        if (!ft || ft <= 0) errs[`measure_${id}`] = "Entrez une mesure valide";
      });
      if (needsColor && (!form.color || form.color === "__autre__")) errs.color = "Sélectionnez ou précisez une couleur";
      if (!form.measureConfirmed) errs.measureConfirmed = "Vous devez confirmer l'exactitude de vos mesures pour continuer";
    } else if (step === 3) {
      if (!form.adresse.trim()) {
        errs.adresse = "Ce champ est requis";
      } else if (!addressVerified) {
        errs.adresse = "Veuillez sélectionner une adresse dans la liste pour valider.";
      }
      if (!form.codePostal.trim()) errs.codePostal = "Ce champ est requis";
      if (!form.ville.trim()) errs.ville = "Ce champ est requis";
    } else if (step === 4) {
      if (!form.nom.trim()) errs.nom = "Ce champ est requis";
      if (!form.telephone.trim()) {
        errs.telephone = "Ce champ est requis";
      } else if (!/^[\d\s\-().+]{10,}$/.test(form.telephone.trim()) || form.telephone.replace(/\D/g, "").length < 10) {
        errs.telephone = "Entrez un numéro de téléphone valide (ex: 438-808-9604)";
      }
      if (!form.courriel.trim()) { errs.courriel = "Ce champ est requis"; }
      else if (!/\S+@\S+\.\S+/.test(form.courriel)) { errs.courriel = "Adresse courriel invalide"; }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
    } else {
      setIsSubmitting(true);
      setSubmitError("");
      try {
        const res = await fetch("/api/booking-coupe-froid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        track("demande_rappel", { formulaire: "coupe_froid" });
        gtagConversion("demande_rappel");
        setSubmitted(true);
      } catch {
        setSubmitError(`Une erreur est survenue. Veuillez réessayer ou nous appeler au ${PHONE_DISPLAY}.`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const prenom = form.nom.trim().split(/\s+/)[0] || "vous";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="bg-brand px-6 py-4 flex items-center justify-between gap-4">
          <span className="font-heading text-white text-sm sm:text-base leading-tight uppercase">
            Remplacement de coupe-froid
          </span>
          <button onClick={onClose} aria-label="Fermer" className="text-white/70 hover:text-white transition-colors shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="bg-brand-dark px-6 py-2.5">
          <p className="text-white/90 text-sm text-center font-medium">
            Visite d&apos;installation — contrat signé sur place
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-9 h-9 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl text-brand uppercase mb-3">Demande envoyée!</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                Merci {prenom}! Nous vous contacterons rapidement pour planifier la date d&apos;installation. Notre technicien se présentera avec les matériaux et le contrat.
              </p>
              {total > 0 && !hasCustomColor && (
                <p className="text-brand font-bold text-lg mb-6">Estimation: {(total * 1.14975).toFixed(2)} $ <span className="text-sm font-normal text-gray-400">(taxes incluses)</span></p>
              )}
              <button onClick={onClose} className="bg-brand text-white font-bold px-10 py-3 rounded-lg hover:bg-brand-dark transition-colors">
                Fermer
              </button>
            </div>
          ) : (
            <>
              {/* Step indicators */}
              <div className="flex items-start gap-0.5 mb-6">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
                  <div key={s} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      s === step ? "bg-brand text-white" : s < step ? "bg-brand/20 text-brand" : "bg-gray-100 text-gray-400"
                    }`}>
                      {s < step ? (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : s}
                    </div>
                    <span className={`text-[8px] font-semibold text-center leading-tight ${s === step ? "text-brand" : "text-gray-400"}`}>
                      {STEP_LABELS[s - 1]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-7">
                <div className="h-full bg-brand rounded-full transition-all duration-500 ease-out" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
              </div>

              {/* ── Step 1 — Seal selection ── */}
              {step === 1 && (
                <div className="flex flex-col gap-5">
                  {/* Intro: 3 types of seals with images */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Les 3 types de coupe-froid</p>
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {[
                        { img: "/images/coupe-froid/joint_de_bas_de_portes_de_garage.jpg", label: "Joint de bas", desc: "Bande de caoutchouc qui touche le sol" },
                        { img: "/images/coupe-froid/coupe_froid_de_cote.jpg", label: "Joints latéraux", desc: "Bandes sur les côtés et en haut" },
                        { img: "/images/coupe-froid/reteneur_du_bas_porte_de_garage.jpg", label: "Reteneur du bas", desc: "Pièce en aluminium ou plastique au bas de la porte" },
                      ].map((item) => (
                        <div key={item.label} className="flex flex-col rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                          <div className="relative w-full aspect-[4/3] bg-gray-100">
                            <Image src={item.img} alt={item.label} fill className="object-cover" sizes="120px" />
                          </div>
                          <div className="px-2 py-2">
                            <p className="text-[11px] font-bold text-gray-800 leading-tight">{item.label}</p>
                            <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Quel(s) joint(s) souhaitez-vous remplacer?</p>
                    <p className="text-xs text-gray-400 mb-3">Sélectionnez tout ce qui s&apos;applique</p>
                    {errors.seals && <p className="text-xs text-red-500 mb-2">{errors.seals}</p>}
                    <div className="flex flex-col gap-2">
                      {SEAL_OPTIONS.map((opt) => {
                        const checked = form.seals.includes(opt.id);
                        return (
                          <button key={opt.id} type="button" onClick={() => toggleSeal(opt.id)}
                            className={`flex items-start gap-3 border-2 rounded-xl px-4 py-3 text-left transition-all ${checked ? "border-brand bg-brand/5" : "border-gray-200 hover:border-brand/40"}`}>
                            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${checked ? "bg-brand" : "border-2 border-gray-300"}`}>
                              {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <div>
                              <p className={`text-sm font-semibold ${checked ? "text-brand" : "text-gray-700"}`}>{opt.label}</p>
                              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{opt.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 2 — Measurements & price ── */}
              {step === 2 && (
                <div className="flex flex-col gap-5">
                  {!onlyInconnu && (
                    <div className="bg-amber-50 border border-amber-300 rounded-xl px-4 py-3 flex gap-3">
                      <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      <div>
                        <p className="text-sm font-bold text-amber-800">Mesurez avec précision</p>
                        <p className="text-xs text-amber-700 leading-relaxed mt-0.5">La commande sera faite selon vos mesures. <strong>En cas d&apos;erreur de votre part</strong>, les matériaux commandés ne pourront être retournés et les frais demeurent à votre charge.</p>
                      </div>
                    </div>
                  )}
                  {onlyInconnu ? (
                    <div className="bg-brand/5 border border-brand/20 rounded-xl p-5 text-center">
                      <svg className="w-10 h-10 text-brand mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <p className="font-semibold text-brand mb-1">Inspection complète incluse</p>
                      <p className="text-gray-500 text-sm">Notre technicien prendra toutes les mesures sur place et vous fournira un prix détaillé avant de commencer.</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Entrez les mesures en pieds linéaires</p>
                        <p className="text-xs text-gray-400 mb-4">Le prix avec installation est calculé automatiquement.</p>
                        <div className="flex flex-col gap-4">
                          {measurableSeals.map((id) => (
                            <div key={id}>
                              <div className="flex items-center justify-between mb-1.5">
                                <label className="text-sm font-semibold text-gray-700">{SEAL_LABELS[id]}</label>
                                <span className="text-xs text-gray-400 font-medium">{PRICE_PER_FOOT[id]}$ / pied</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="relative flex-1">
                                  <input
                                    ref={(el) => { measureRefs.current[id] = el; }}
                                    type="number"
                                    inputMode="decimal"
                                    enterKeyHint="next"
                                    min="0"
                                    step="0.5"
                                    value={form.measurements[id] || ""}
                                    onChange={(e) => updateMeasurement(id, e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); focusNextMeasure(id); } }}
                                    placeholder="ex: 7"
                                    className={`w-full border rounded-lg px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 transition-colors pr-14 ${errors[`measure_${id}`] ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-brand/20 focus:border-brand"}`}
                                  />
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">pieds</span>
                                </div>
                                {parseFloat(form.measurements[id] || "0") > 0 && (
                                  <div className="shrink-0 bg-brand/10 rounded-lg px-3 py-2 text-center min-w-[70px]">
                                    <p className="text-brand font-bold text-sm">{(parseFloat(form.measurements[id]) * PRICE_PER_FOOT[id]).toFixed(2)}$</p>
                                  </div>
                                )}
                              </div>
                              {errors[`measure_${id}`] && <p className="text-xs text-red-500 mt-1">{errors[`measure_${id}`]}</p>}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Color picker — only for lateraux / tete */}
                      {needsColor && (
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-1">Couleur du coupe-froid</p>
                          <p className="text-xs text-gray-400 mb-3">Joints latéraux et de tête disponibles en noir, blanc ou autre</p>
                          {errors.color && <p className="text-xs text-red-500 mb-2">{errors.color}</p>}
                          <div className="flex gap-3 mb-3">
                            {[
                              { id: "noir", label: "Noir", bg: "bg-[#1a1a1a]", border: "border-[#1a1a1a]" },
                              { id: "blanc", label: "Blanc", bg: "bg-white", border: "border-gray-300" },
                              { id: "autre", label: "Autre", bg: "bg-gradient-to-br from-red-400 via-yellow-300 to-blue-400", border: "border-gray-300" },
                            ].map((c) => {
                              const isAutre = c.id === "autre";
                              const selected = isAutre
                                ? form.color !== "noir" && form.color !== "blanc" && form.color !== ""
                                : form.color === c.id;
                              return (
                                <button key={c.id} type="button"
                                  onClick={() => update("color", isAutre ? "__autre__" : c.id)}
                                  className={`flex-1 flex items-center gap-2 border-2 rounded-xl px-3 py-3 transition-all ${selected ? "border-brand bg-brand/5" : "border-gray-200 hover:border-brand/40"}`}>
                                  <div className={`w-6 h-6 rounded-full ${c.bg} border ${c.border} shrink-0 shadow-sm`} />
                                  <span className={`text-sm font-semibold ${selected ? "text-brand" : "text-gray-700"}`}>{c.label}</span>
                                  {selected && (
                                    <svg className="w-4 h-4 text-brand ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          {form.color !== "noir" && form.color !== "blanc" && form.color !== "" && (
                            <input
                              type="text"
                              placeholder="Précisez la couleur souhaitée..."
                              value={form.color === "__autre__" ? "" : form.color}
                              onChange={(e) => update("color", e.target.value || "__autre__")}
                              autoFocus
                              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                            />
                          )}
                        </div>
                      )}

                      {/* Custom color — price unknown */}
                      {hasCustomColor && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                          <p className="font-semibold mb-0.5">Prix à confirmer</p>
                          <p className="text-xs text-amber-700 leading-relaxed">Le prix des joints latéraux dépend de la couleur — notre technicien vous confirmera le montant exact lors du rendez-vous.</p>
                        </div>
                      )}

                      {/* Live total */}
                      {total > 0 && !hasCustomColor && (
                        <div className="bg-[#1a1a1a] rounded-xl p-4">
                          <div className="flex flex-col gap-1.5 mb-3">
                            <div className="flex items-center justify-between">
                              <p className="text-white/60 text-xs">Sous-total</p>
                              <p className="text-white/80 text-xs font-medium">{total.toFixed(2)} $</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-white/60 text-xs">TPS (5%)</p>
                              <p className="text-white/80 text-xs font-medium">{(total * 0.05).toFixed(2)} $</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-white/60 text-xs">TVQ (9,975%)</p>
                              <p className="text-white/80 text-xs font-medium">{(total * 0.09975).toFixed(2)} $</p>
                            </div>
                            <div className="border-t border-white/10 mt-1 pt-2 flex items-center justify-between">
                              <p className="text-white/70 text-xs font-semibold uppercase tracking-wide">Estimation totale (taxes incluses)</p>
                              <p className="text-brand font-heading text-2xl font-bold">{(total * 1.14975).toFixed(2)} $</p>
                            </div>
                          </div>
                          <p className="text-white/40 text-[10px]">Fournitures + installation incluses</p>
                        </div>
                      )}
                      {/* Measure confirmation checkbox */}
                      <button type="button" onClick={() => setForm(f => ({ ...f, measureConfirmed: !f.measureConfirmed }))}
                        className={`flex items-start gap-3 border-2 rounded-xl px-4 py-3 text-left transition-all w-full ${form.measureConfirmed ? "border-brand bg-brand/5" : errors.measureConfirmed ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-brand/40"}`}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${form.measureConfirmed ? "bg-brand" : "border-2 border-gray-300"}`}>
                          {form.measureConfirmed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${form.measureConfirmed ? "text-brand" : errors.measureConfirmed ? "text-red-600" : "text-gray-700"}`}>Je confirme l&apos;exactitude de mes mesures</p>
                          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">Je comprends que la commande sera faite selon ces mesures et qu&apos;Experts Portes de Garage ne peut être tenu responsable en cas d&apos;erreur de ma part.</p>
                        </div>
                      </button>
                      {errors.measureConfirmed && <p className="text-xs text-red-500 -mt-3">{errors.measureConfirmed}</p>}
                    </>
                  )}
                </div>
              )}

              {/* ── Step 3 — Address ── */}
              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <Field label="Adresse complète" error={errors.adresse}>
                    <div className="relative">
                      <input
                        type="text"
                        value={form.adresse}
                        onChange={(e) => handleAdresseChange(e.target.value)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                        placeholder="123 rue Principale"
                        autoComplete="off"
                        className={inputCls(!!errors.adresse)}
                      />
                      {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                          {suggestions.map((s) => (
                            <li key={s.placeId}>
                              <button
                                type="button"
                                onMouseDown={() => selectSuggestion(s.placeId, s.text)}
                                className="w-full text-left px-4 py-3 hover:bg-brand/5 flex flex-col gap-0.5 border-b border-gray-100 last:border-0"
                              >
                                <span className="text-sm font-semibold text-gray-800">{s.text}</span>
                                <span className="text-xs text-gray-400">{s.secondary}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Field>
                  <Field label="Ville" error={errors.ville}>
                    <input type="text" value={form.ville} readOnly placeholder="Rempli automatiquement" className={`${inputCls(!!errors.ville)} bg-gray-50 text-gray-500 cursor-default`} />
                  </Field>
                  <Field label="Code postal" error={errors.codePostal}>
                    <input type="text" value={form.codePostal} readOnly placeholder="Rempli automatiquement" className={`${inputCls(!!errors.codePostal)} bg-gray-50 text-gray-500 cursor-default`} />
                  </Field>
                </div>
              )}

              {/* ── Step 4 — Contact ── */}
              {step === 4 && (
                <div className="flex flex-col gap-4">
                  <Field label="Prénom et Nom" error={errors.nom}>
                    <input type="text" enterKeyHint="next" value={form.nom} onChange={(e) => update("nom", e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); wsTelephoneRef.current?.focus(); } }} placeholder="Jean Tremblay" autoComplete="name" className={inputCls(!!errors.nom)} />
                  </Field>
                  <Field label="Numéro de téléphone" error={errors.telephone}>
                    <input ref={wsTelephoneRef} type="tel" enterKeyHint="next" value={form.telephone} onChange={(e) => update("telephone", e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); wsCourrielRef.current?.focus(); } }} placeholder="438-808-9604" autoComplete="tel" className={inputCls(!!errors.telephone)} />
                  </Field>
                  <Field label="Adresse courriel" error={errors.courriel}>
                    <input ref={wsCourrielRef} type="email" enterKeyHint="done" value={form.courriel} onChange={(e) => update("courriel", e.target.value)} placeholder="jean@exemple.com" autoComplete="email" className={inputCls(!!errors.courriel)} />
                  </Field>

                  {total > 0 && !hasCustomColor && (
                    <div className="bg-brand/5 border border-brand/20 rounded-xl px-4 py-3 flex items-center justify-between">
                      <p className="text-sm text-gray-600 font-medium">Votre estimation</p>
                      <p className="text-brand font-bold text-lg">{(total * 1.14975).toFixed(2)} $ <span className="text-xs font-normal text-gray-400">taxes incl.</span></p>
                    </div>
                  )}

                  {/* Quote option */}
                  {total > 0 && !hasCustomColor && (
                    <button type="button" onClick={() => setForm(f => ({ ...f, wantQuote: !f.wantQuote }))}
                      className={`flex items-start gap-3 border-2 rounded-xl px-4 py-3 text-left transition-all w-full ${form.wantQuote ? "border-brand bg-brand/5" : "border-gray-200 hover:border-brand/40"}`}>
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${form.wantQuote ? "bg-brand" : "border-2 border-gray-300"}`}>
                        {form.wantQuote && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${form.wantQuote ? "text-brand" : "text-gray-700"}`}>Je suis prêt à commander — recevoir ma soumission PDF</p>
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">Vous recevrez une soumission PDF ({(total * 1.14975).toFixed(2)} $ taxes incluses) pour approuver et payer par Interac avant la visite d&apos;installation.</p>
                      </div>
                    </button>
                  )}
                </div>
              )}

              {/* Navigation */}
              {submitError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mt-6">{submitError}</p>
              )}
              <div className={`flex items-center mt-4 ${step > 1 ? "justify-between" : "justify-end"}`}>
                {step > 1 && (
                  <button type="button" onClick={() => setStep(s => s - 1)}
                    disabled={isSubmitting}
                    className="text-sm font-semibold text-gray-400 hover:text-brand transition-colors flex items-center gap-1 disabled:opacity-50">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    Retour
                  </button>
                )}
                <button type="button" onClick={handleNext}
                  disabled={isSubmitting}
                  className="bg-brand text-white font-bold px-7 py-3 rounded-lg hover:bg-brand-dark transition-colors text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? "Envoi en cours..." : step === TOTAL_STEPS ? "Envoyer ma demande" : "Suivant"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
