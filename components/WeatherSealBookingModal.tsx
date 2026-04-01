"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  date: string;
  timeSlot: string;
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
  date: "",
  timeSlot: "",
};

const SEAL_OPTIONS = [
  { id: "bas",      label: "Joint de bas de porte" },
  { id: "lateraux", label: "Joints latéraux et de tête" },
  { id: "reteneur", label: "Reteneur du bas" },
  { id: "inconnu",  label: "Je ne sais pas / Inspection complète" },
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

const TIME_SLOTS = ["10h00 - 11h00", "12h00 - 13h00", "15h00 - 16h00"];
const STEP_LABELS = ["Votre situation", "Mesures & prix", "Votre adresse", "Coordonnées", "Rendez-vous"];
const TOTAL_STEPS = 5;

const FR_MONTHS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const FR_MONTHS_LONG = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
const FR_DAYS_SHORT = ["Di","Lu","Ma","Me","Je","Ve","Sa"];
const FR_DAYS_LONG = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];

function toDateString(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
function formatDateFr(dateStr: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const dow = new Date(y, m - 1, d).getDay();
  return `${FR_DAYS_LONG[dow]} ${d} ${FR_MONTHS_LONG[m - 1]} ${y}`;
}

function calcTotal(seals: string[], measurements: Record<string, string>): number {
  return seals
    .filter((id) => id !== "inconnu")
    .reduce((sum, id) => {
      const ft = parseFloat(measurements[id] || "0") || 0;
      return sum + ft * (PRICE_PER_FOOT[id] || 0);
    }, 0);
}

function Calendar({ value, onChange, hasError }: { value: string; onChange: (d: string) => void; hasError: boolean }) {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const todayStr = toDateString(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  const [viewYear, setViewYear] = useState(() => todayDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => todayDate.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const canGoPrev = viewYear > todayDate.getFullYear() ||
    (viewYear === todayDate.getFullYear() && viewMonth > todayDate.getMonth());

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className={`border rounded-xl overflow-hidden bg-white ${hasError ? "border-red-400" : "border-gray-200"}`}>
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
        <button type="button" onClick={prevMonth} disabled={!canGoPrev} aria-label="Mois précédent"
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${canGoPrev ? "hover:bg-gray-200 text-gray-600" : "text-gray-300 cursor-not-allowed"}`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <span className="text-sm font-bold text-gray-800">{FR_MONTHS[viewMonth]} {viewYear}</span>
        <button type="button" onClick={nextMonth} aria-label="Mois suivant"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 border-b border-gray-100">
        {FR_DAYS_SHORT.map((d, i) => (
          <div key={d} className={`text-center text-xs font-semibold py-2 ${i === 0 || i === 6 ? "text-gray-400" : "text-gray-500"}`}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`blank-${idx}`} className="py-1.5" />;
          const dateStr = toDateString(viewYear, viewMonth, day);
          const isPast = dateStr < todayStr;
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === value;
          const col = idx % 7;
          const isWeekend = col === 0 || col === 6;
          let cls = "relative mx-auto flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium cursor-pointer transition-all select-none ";
          if (isSelected) cls += "bg-brand text-white font-bold shadow-sm";
          else if (isPast) cls += "text-gray-300 cursor-not-allowed";
          else if (isToday) cls += "border-2 border-brand text-brand font-bold hover:bg-brand/10";
          else if (isWeekend) cls += "text-gray-500 hover:bg-brand/10 hover:text-brand";
          else cls += "text-gray-700 hover:bg-brand/10 hover:text-brand";
          return (
            <div key={dateStr} className={`flex items-center justify-center py-1 ${isWeekend && !isSelected ? "bg-gray-50/60" : ""}`}>
              <span className={cls} onClick={() => { if (!isPast) onChange(dateStr); }}>{day}</span>
            </div>
          );
        })}
      </div>
      {value && (
        <div className="px-4 py-2.5 bg-brand/5 border-t border-brand/10 text-center">
          <span className="text-sm font-semibold text-brand capitalize">{formatDateFr(value)}</span>
        </div>
      )}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 transition-colors ${
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
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    update("adresse", value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  const selectSuggestion = async (placeId: string, text: string) => {
    setShowSuggestions(false);
    setSuggestions([]);
    update("adresse", text);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;
    try {
      const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=addressComponents&languageCode=fr`, {
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

  // Seals that need measurements (not "inconnu")
  const measurableSeals = form.seals.filter(id => id !== "inconnu");
  const needsColor = form.seals.some(id => COLOR_SEALS.includes(id));
  const onlyInconnu = form.seals.length > 0 && form.seals.every(id => id === "inconnu");
  const total = calcTotal(form.seals, form.measurements);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (form.seals.length === 0) errs.seals = "Sélectionnez au moins une option";
      if (!form.condition) errs.condition = "Sélectionnez la situation actuelle";
    } else if (step === 2 && !onlyInconnu) {
      measurableSeals.forEach(id => {
        const ft = parseFloat(form.measurements[id] || "0");
        if (!ft || ft <= 0) errs[`measure_${id}`] = "Entrez une mesure valide";
      });
      if (needsColor && !form.color) errs.color = "Sélectionnez une couleur";
    } else if (step === 3) {
      if (!form.codePostal.trim()) errs.codePostal = "Ce champ est requis";
      if (!form.adresse.trim()) errs.adresse = "Ce champ est requis";
      if (!form.ville.trim()) errs.ville = "Ce champ est requis";
    } else if (step === 4) {
      if (!form.nom.trim()) errs.nom = "Ce champ est requis";
      if (!form.telephone.trim()) errs.telephone = "Ce champ est requis";
      if (!form.courriel.trim()) { errs.courriel = "Ce champ est requis"; }
      else if (!/\S+@\S+\.\S+/.test(form.courriel)) { errs.courriel = "Adresse courriel invalide"; }
    } else if (step === 5) {
      if (!form.date) errs.date = "Veuillez choisir une date";
      if (!form.timeSlot) errs.timeSlot = "Veuillez choisir une plage horaire";
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
        setSubmitted(true);
      } catch {
        setSubmitError("Une erreur est survenue. Veuillez réessayer ou nous appeler au 450-558-5788.");
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
          <Image src="/images/logo_experts.png"
            alt="Experts Portes de Garage" width={140} height={46}
            className="h-9 w-auto object-contain brightness-0 invert shrink-0" />
          <span className="font-heading text-white text-sm sm:text-base leading-tight text-right uppercase">
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
            Inspection + lubrification offertes — Valeur de 125$
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
                Merci {prenom}! Nous vous contacterons pour confirmer votre rendez-vous.
              </p>
              {total > 0 && (
                <p className="text-brand font-bold text-lg mb-6">Estimation: {total.toFixed(2)} $</p>
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
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Quel(s) joint(s) souhaitez-vous remplacer?</p>
                    <p className="text-xs text-gray-400 mb-3">Sélectionnez tout ce qui s&apos;applique</p>
                    {errors.seals && <p className="text-xs text-red-500 mb-2">{errors.seals}</p>}
                    <div className="flex flex-col gap-2">
                      {SEAL_OPTIONS.map((opt) => {
                        const checked = form.seals.includes(opt.id);
                        return (
                          <button key={opt.id} type="button" onClick={() => toggleSeal(opt.id)}
                            className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 text-left transition-all ${checked ? "border-brand bg-brand/5" : "border-gray-200 hover:border-brand/40"}`}>
                            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-brand" : "border-2 border-gray-300"}`}>
                              {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <span className={`text-sm font-medium ${checked ? "text-brand" : "text-gray-700"}`}>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Quelle est la situation actuelle?</p>
                    {errors.condition && <p className="text-xs text-red-500 mb-2">{errors.condition}</p>}
                    <div className="flex flex-col gap-2">
                      {CONDITION_OPTIONS.map((opt) => {
                        const selected = form.condition === opt.id;
                        return (
                          <button key={opt.id} type="button" onClick={() => update("condition", opt.id)}
                            className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 text-left transition-all ${selected ? "border-brand bg-brand/5" : "border-gray-200 hover:border-brand/40"}`}>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${selected ? "bg-brand" : "border-2 border-gray-300"}`}>
                              {selected && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className={`text-sm font-medium ${selected ? "text-brand" : "text-gray-700"}`}>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <Field label="Informations supplémentaires (optionnel)">
                    <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)}
                      placeholder="Décrivez votre situation, le type de porte, toute information utile..."
                      rows={2} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors resize-none" />
                  </Field>
                </div>
              )}

              {/* ── Step 2 — Measurements & price ── */}
              {step === 2 && (
                <div className="flex flex-col gap-5">
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
                                    type="number"
                                    min="0"
                                    step="0.5"
                                    value={form.measurements[id] || ""}
                                    onChange={(e) => updateMeasurement(id, e.target.value)}
                                    placeholder="ex: 7"
                                    className={`w-full border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 transition-colors pr-14 ${errors[`measure_${id}`] ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-brand/20 focus:border-brand"}`}
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
                          <p className="text-xs text-gray-400 mb-3">Joints latéraux et de tête disponibles en noir ou blanc</p>
                          {errors.color && <p className="text-xs text-red-500 mb-2">{errors.color}</p>}
                          <div className="flex gap-3">
                            {[
                              { id: "noir", label: "Noir", bg: "bg-[#1a1a1a]", border: "border-[#1a1a1a]" },
                              { id: "blanc", label: "Blanc", bg: "bg-white", border: "border-gray-300" },
                            ].map((c) => {
                              const selected = form.color === c.id;
                              return (
                                <button key={c.id} type="button" onClick={() => update("color", c.id)}
                                  className={`flex-1 flex items-center gap-3 border-2 rounded-xl px-4 py-3 transition-all ${selected ? "border-brand bg-brand/5" : "border-gray-200 hover:border-brand/40"}`}>
                                  <div className={`w-6 h-6 rounded-full ${c.bg} border ${c.border} shrink-0 shadow-sm`} />
                                  <span className={`text-sm font-semibold ${selected ? "text-brand" : "text-gray-700"}`}>{c.label}</span>
                                  {selected && (
                                    <svg className="w-4 h-4 text-brand ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Live total */}
                      {total > 0 && (
                        <div className="bg-[#1a1a1a] rounded-xl p-4 flex items-center justify-between">
                          <div>
                            <p className="text-white/70 text-xs font-medium uppercase tracking-wide">Estimation totale</p>
                            <p className="text-white text-xs mt-0.5">Fournitures + installation incluses</p>
                          </div>
                          <div className="text-right">
                            <p className="text-brand font-heading text-3xl font-bold">{total.toFixed(2)}$</p>
                          </div>
                        </div>
                      )}
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
                    <input type="text" value={form.ville} onChange={(e) => update("ville", e.target.value)} placeholder="Granby" autoComplete="address-level2" className={inputCls(!!errors.ville)} />
                  </Field>
                  <Field label="Code postal" error={errors.codePostal}>
                    <input type="text" value={form.codePostal} onChange={(e) => update("codePostal", e.target.value)} placeholder="ex: J2G 3A1" autoComplete="postal-code" className={inputCls(!!errors.codePostal)} />
                  </Field>
                </div>
              )}

              {/* ── Step 4 — Contact ── */}
              {step === 4 && (
                <div className="flex flex-col gap-4">
                  <Field label="Prénom et Nom" error={errors.nom}>
                    <input type="text" value={form.nom} onChange={(e) => update("nom", e.target.value)} placeholder="Jean Tremblay" autoComplete="name" className={inputCls(!!errors.nom)} />
                  </Field>
                  <Field label="Numéro de téléphone" error={errors.telephone}>
                    <input type="tel" value={form.telephone} onChange={(e) => update("telephone", e.target.value)} placeholder="450-558-5788" autoComplete="tel" className={inputCls(!!errors.telephone)} />
                  </Field>
                  <Field label="Adresse courriel" error={errors.courriel}>
                    <input type="email" value={form.courriel} onChange={(e) => update("courriel", e.target.value)} placeholder="jean@exemple.com" autoComplete="email" className={inputCls(!!errors.courriel)} />
                  </Field>
                </div>
              )}

              {/* ── Step 5 — Date / Time ── */}
              {step === 5 && (
                <div className="flex flex-col gap-5">
                  {total > 0 && (
                    <div className="bg-brand/5 border border-brand/20 rounded-xl px-4 py-3 flex items-center justify-between">
                      <p className="text-sm text-gray-600 font-medium">Votre estimation</p>
                      <p className="text-brand font-bold text-lg">{total.toFixed(2)}$</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Date souhaitée</p>
                    {errors.date && <p className="text-xs text-red-500 mb-2">{errors.date}</p>}
                    <Calendar value={form.date} onChange={(d) => update("date", d)} hasError={!!errors.date} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Plage horaire</p>
                    {errors.timeSlot && <p className="text-xs text-red-500 mb-2">{errors.timeSlot}</p>}
                    <div className="flex flex-col gap-2.5">
                      {TIME_SLOTS.map((slot) => (
                        <button key={slot} type="button" onClick={() => update("timeSlot", slot)}
                          className={`border-2 rounded-xl py-4 px-4 text-base font-bold text-center transition-all w-full ${form.timeSlot === slot ? "border-brand bg-brand text-white shadow-md" : "border-gray-200 text-gray-700 hover:border-brand hover:text-brand"}`}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
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
                  {isSubmitting ? "Envoi en cours..." : step === TOTAL_STEPS ? "Confirmer la réservation" : "Suivant"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
