"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MOT_DE_PASSE = "l1a2m3B5";

type StatutLead = "nouveau" | "a_rappeler" | "job_planifie" | "complete" | "sans_suite";

interface Client {
  id: string;
  nom: string;
  telephone: string;
  courriel: string | null;
  adresse: string | null;
  ville: string;
  probleme: string;
  notes: string | null;
  statut: StatutLead;
  date_rappel: string | null;
  montant_estime: number | null;
  created_at: string;
}

const STATUT_LABELS: Record<StatutLead, string> = {
  nouveau: "Nouveau",
  a_rappeler: "À rappeler",
  job_planifie: "Job planifié",
  complete: "Complété",
  sans_suite: "Sans suite",
};

const STATUT_COLORS: Record<StatutLead, string> = {
  nouveau: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  a_rappeler: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  job_planifie: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  complete: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  sans_suite: "bg-white/[0.06] text-white/30 border-white/10",
};

const STATUT_NEXT: Record<StatutLead, StatutLead> = {
  nouveau: "a_rappeler",
  a_rappeler: "job_planifie",
  job_planifie: "complete",
  complete: "sans_suite",
  sans_suite: "nouveau",
};

const PIPELINE_ORDER: StatutLead[] = ["nouveau", "a_rappeler", "job_planifie", "complete", "sans_suite"];

type Suggestion = { adresse: string; ville: string; label: string };

function todayStr() { return new Date().toISOString().split("T")[0]; }

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-CA", { day: "numeric", month: "short" });
}

function formatRappel(dateStr: string) {
  const today = todayStr();
  const d = new Date(dateStr + "T12:00:00");
  const label = d.toLocaleDateString("fr-CA", { weekday: "short", day: "numeric", month: "short" });
  if (dateStr < today) return { label: `En retard — ${label}`, urgent: true };
  if (dateStr === today) return { label: `Aujourd'hui — ${label}`, urgent: true };
  return { label, urgent: false };
}

function AdresseInput({ value, onChange, onSelect, placeholder = "Adresse" }: {
  value: string; onChange: (v: string) => void; onSelect: (s: Suggestion) => void; placeholder?: string;
}) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(q: string) {
    onChange(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 4) { setSuggestions([]); setOpen(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q + ", Quebec, Canada")}&format=json&addressdetails=1&limit=6&countrycodes=ca`, { headers: { "Accept-Language": "fr" } });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any[] = await res.json();
        const results = data.filter(r => r.address?.road).map(r => {
          const num = r.address.house_number ?? ""; const rue = r.address.road ?? "";
          const ville = r.address.city ?? r.address.town ?? r.address.village ?? r.address.municipality ?? "";
          return { adresse: `${num} ${rue}`.trim(), ville, label: [`${num} ${rue}`.trim(), ville].filter(Boolean).join(", ") };
        }).filter(r => r.adresse && r.ville);
        setSuggestions(results); setOpen(results.length > 0);
      } catch { /* ignore */ }
    }, 400);
  }

  return (
    <div className="relative">
      <input value={value} onChange={e => handleChange(e.target.value)} onBlur={() => setTimeout(() => setOpen(false), 150)} onFocus={() => suggestions.length > 0 && setOpen(true)} placeholder={placeholder} autoComplete="off" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all" />
      {open && (
        <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-[#13131a] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden">
          {suggestions.map((s, i) => (
            <li key={i}><button type="button" onMouseDown={() => { onSelect(s); setOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-500/10 hover:text-red-400 transition-colors border-b border-white/[0.04] last:border-0"><span className="font-medium">{s.adresse}</span>{s.ville && <span className="text-gray-400 ml-1">— {s.ville}</span>}</button></li>
          ))}
        </ul>
      )}
    </div>
  );
}

const FORM_VIDE = { nom: "", telephone: "", adresse: "", ville: "", probleme: "", courriel: "", notes: "", montant_estime: "" };

export default function LeadsPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [mdp, setMdp] = useState("");
  const [mdpErreur, setMdpErreur] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtreStatut, setFiltreStatut] = useState<StatutLead | "" | "rappels">("");

  const [showAjout, setShowAjout] = useState(false);
  const [ajoutForm, setAjoutForm] = useState(FORM_VIDE);
  const [savingAjout, setSavingAjout] = useState(false);

  const [editOuvert, setEditOuvert] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<typeof FORM_VIDE>(FORM_VIDE);
  const [savingEdit, setSavingEdit] = useState(false);

  // Rappel inline
  const [rappelOuvert, setRappelOuvert] = useState<string | null>(null);

  // Menu statut dropdown
  const [statutMenuOuvert, setStatutMenuOuvert] = useState<string | null>(null);

  // Fermer le menu statut quand on clique ailleurs
  useEffect(() => {
    if (!statutMenuOuvert) return;
    const handler = () => setStatutMenuOuvert(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [statutMenuOuvert]);

  // Historique jobs par client
  interface JobRecord { id: string; date: string; statut: string; montant: number | null; notes: string | null; }
  const [jobsParTel, setJobsParTel] = useState<Record<string, JobRecord[]>>({});
  const [historiqueOuvert, setHistoriqueOuvert] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("dicter_auth") === MOT_DE_PASSE) setAuth(true);
  }, []);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    const [clientsRes, jobsRes] = await Promise.all([
      fetch("/api/clients", { cache: "no-store" }),
      fetch("/api/jobs", { cache: "no-store" }),
    ]);
    const clientsData = await clientsRes.json();
    const jobsData = await jobsRes.json();
    setClients(Array.isArray(clientsData) ? clientsData : []);
    // Grouper les jobs par téléphone
    const parTel: Record<string, JobRecord[]> = {};
    if (Array.isArray(jobsData)) {
      for (const j of jobsData) {
        if (!j.telephone) continue;
        if (!parTel[j.telephone]) parTel[j.telephone] = [];
        parTel[j.telephone].push({ id: j.id, date: j.date, statut: j.statut, montant: j.montant, notes: j.notes });
      }
    }
    setJobsParTel(parTel);
    setLoading(false);
  }, []);

  useEffect(() => { if (auth) fetchClients(); }, [auth, fetchClients]);

  function soumettreMdp(e: React.FormEvent) {
    e.preventDefault();
    if (mdp === MOT_DE_PASSE) { sessionStorage.setItem("dicter_auth", mdp); setAuth(true); }
    else setMdpErreur(true);
  }

  async function ajouterLead(e: React.FormEvent) {
    e.preventDefault();
    setSavingAjout(true);
    const res = await fetch("/api/client-rapide", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nom: ajoutForm.nom, telephone: ajoutForm.telephone, adresse: ajoutForm.adresse || undefined, ville: ajoutForm.ville, probleme: ajoutForm.probleme || "Non précisé", courriel: ajoutForm.courriel || undefined, notes: ajoutForm.notes || undefined, montant_estime: ajoutForm.montant_estime ? parseFloat(ajoutForm.montant_estime) : undefined }) });
    if (!res.ok) { alert("Erreur lors de l'ajout du lead"); setSavingAjout(false); return; }
    setAjoutForm(FORM_VIDE); setShowAjout(false);
    await fetchClients(); setSavingAjout(false);
  }

  async function changerStatut(client: Client, newStatut: StatutLead) {
    setClients(prev => prev.map(c => c.id === client.id ? { ...c, statut: newStatut } : c));
    const res = await fetch(`/api/clients/${client.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ statut: newStatut }) });
    if (!res.ok) {
      alert("Erreur de sauvegarde du statut");
      await fetchClients();
    }
  }

  async function sauvegarderRappel(clientId: string, date: string) {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, date_rappel: date || null, statut: date ? "a_rappeler" : c.statut } : c));
    const res = await fetch(`/api/clients/${clientId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ date_rappel: date || null, ...(date ? { statut: "a_rappeler" } : {}) }) });
    if (!res.ok) {
      alert("Erreur de sauvegarde du rappel");
      await fetchClients();
    }
    setRappelOuvert(null);
  }

  function ouvrirEdit(client: Client) {
    setEditOuvert(client.id);
    setEditForm({ nom: client.nom, telephone: client.telephone, adresse: client.adresse ?? "", ville: client.ville, probleme: client.probleme, courriel: client.courriel ?? "", notes: client.notes ?? "", montant_estime: client.montant_estime != null ? String(client.montant_estime) : "" });
  }

  async function sauvegarderEdit(client: Client) {
    setSavingEdit(true);
    const payload = { nom: editForm.nom, telephone: editForm.telephone, adresse: editForm.adresse || null, ville: editForm.ville, probleme: editForm.probleme, courriel: editForm.courriel || null, notes: editForm.notes || null, montant_estime: editForm.montant_estime ? parseFloat(editForm.montant_estime) : null };
    const res = await fetch(`/api/clients/${client.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) {
      alert("Erreur de sauvegarde — les modifications n'ont pas été enregistrées");
      setSavingEdit(false);
      return;
    }
    const saved: Client = await res.json();
    setClients(prev => prev.map(c => c.id === client.id ? saved : c));
    setEditOuvert(null); setSavingEdit(false);
  }

  async function supprimerClient(id: string) {
    if (!confirm("Supprimer ce client?")) return;
    setClients(prev => prev.filter(c => c.id !== id));
    const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Erreur de suppression");
      await fetchClients();
    }
  }

  function transfererVersJob(client: Client) {
    const choix = confirm("Créer une soumission d'abord?\n\nOK = Soumission\nAnnuler = Job direct");
    if (choix) {
      // Vers soumission
      sessionStorage.setItem("soumission_prefill", JSON.stringify({ client_id: client.id }));
      router.push("/admin/soumissions");
    } else {
      // Job direct
      sessionStorage.setItem("job_prefill", JSON.stringify({ client_id: client.id, nom: client.nom, telephone: client.telephone, adresse: client.adresse ?? "", ville: client.ville, montant: client.montant_estime != null ? String(client.montant_estime) : "" }));
      changerStatut(client, "job_planifie");
      router.push("/admin/jobs");
    }
  }

  if (!auth) {
    return (
      <div className="flex-1 bg-[#0b0b10] flex items-center justify-center px-4">
        <form onSubmit={soumettreMdp} className="bg-[#13131a] border border-white/[0.06] rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <p className="text-white/25 text-xs text-center mb-2 uppercase tracking-[0.15em]">Experts Portes de Garage</p>
          <h1 className="text-xl font-bold text-white mb-6 text-center">Espace admin</h1>
          <input type="password" value={mdp} onChange={e => { setMdp(e.target.value); setMdpErreur(false); }} placeholder="Mot de passe" autoFocus className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm mb-3 focus:outline-none focus:border-red-500/50 transition-all" />
          {mdpErreur && <p className="text-red-400 text-xs mb-3">Mot de passe incorrect</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-3.5 rounded-xl hover:from-red-500 hover:to-red-400 transition-all shadow-lg shadow-red-500/20">Entrer</button>
        </form>
      </div>
    );
  }

  const today = todayStr();
  const rappelsDus = clients.filter(c => c.date_rappel && c.date_rappel <= today && c.statut !== "complete" && c.statut !== "sans_suite");

  const clientsFiltres = (() => {
    if (filtreStatut === "rappels") return rappelsDus;
    if (filtreStatut) return clients.filter(c => c.statut === filtreStatut);
    // Par défaut : actifs, rappels en retard en premier
    const actifs = clients.filter(c => c.statut !== "complete" && c.statut !== "sans_suite");
    const enRetard = actifs.filter(c => c.date_rappel && c.date_rappel <= today);
    const autres = actifs.filter(c => !c.date_rappel || c.date_rappel > today);
    return [...enRetard, ...autres];
  })();

  const counts = PIPELINE_ORDER.reduce<Record<string, number>>((acc, s) => {
    acc[s] = clients.filter(c => c.statut === s).length;
    return acc;
  }, {});
  const urgents = clients.filter(c => c.statut === "nouveau" || c.statut === "a_rappeler").length;

  return (
    <div className="flex-1 bg-[#0b0b10] flex flex-col">

      {/* Barre d'actions */}
      <div className="bg-[#0b0b10]/95 backdrop-blur-sm border-b border-white/10 px-4 py-2.5 shrink-0">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <p className="text-white/50 text-xs">
            {rappelsDus.length > 0
              ? <span className="text-orange-400 font-semibold">🔔 {rappelsDus.length} rappel{rappelsDus.length > 1 ? "s" : ""} en retard</span>
              : urgents > 0 ? <span className="text-orange-400 font-semibold">{urgents} à contacter</span>
              : `${clients.length} clients`}
          </p>
          <button onClick={() => { setShowAjout(!showAjout); setEditOuvert(null); }} className="bg-red-600 text-white font-bold px-4 py-1.5 rounded-lg text-sm hover:bg-red-700 active:scale-95 transition-all">
            + Ajouter
          </button>
        </div>
      </div>

      {/* Filtres pipeline */}
      <div className="bg-white/[0.02] border-b border-white/10 px-4 py-2.5 overflow-x-auto shrink-0">
        <div className="flex gap-2 min-w-max max-w-3xl mx-auto">
          <button onClick={() => setFiltreStatut("")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${!filtreStatut ? "bg-red-600 text-white" : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"}`}>
            Actifs ({clients.filter(c => c.statut !== "complete" && c.statut !== "sans_suite").length})
          </button>
          {rappelsDus.length > 0 && (
            <button onClick={() => setFiltreStatut("rappels")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${filtreStatut === "rappels" ? "bg-orange-500 text-white" : "bg-orange-500/20 text-orange-300 hover:bg-orange-500/40"}`}>
              🔔 Rappels ({rappelsDus.length})
            </button>
          )}
          {PIPELINE_ORDER.map(s => (
            <button key={s} onClick={() => setFiltreStatut(filtreStatut === s ? "" : s)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${filtreStatut === s ? "bg-red-600 text-white" : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"}`}>
              {STATUT_LABELS[s]} ({counts[s] ?? 0})
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-4 space-y-3">

        {/* Formulaire ajout */}
        {showAjout && (
          <form onSubmit={ajouterLead} className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-5 space-y-3">
            <h2 className="font-bold text-white">Nouveau client</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(["nom", "telephone", "adresse", "ville", "probleme", "courriel"] as (keyof typeof FORM_VIDE)[]).map(key => {
                const labels: Record<string, string> = { nom: "Nom *", telephone: "Téléphone *", adresse: "Adresse", ville: "Ville *", probleme: "Problème", courriel: "Courriel" };
                const wide = key === "probleme";
                if (key === "adresse") return (
                  <div key={key}>
                    <label className="text-xs text-white/30 uppercase tracking-wide mb-1 block">Adresse</label>
                    <AdresseInput value={ajoutForm.adresse} onChange={v => setAjoutForm(f => ({ ...f, adresse: v }))} onSelect={s => setAjoutForm(f => ({ ...f, adresse: s.adresse, ville: s.ville }))} />
                  </div>
                );
                return (
                  <div key={key} className={wide ? "md:col-span-2" : ""}>
                    <label className="text-xs text-white/30 uppercase tracking-wide mb-1 block">{labels[key]}</label>
                    <input value={ajoutForm[key]} onChange={e => setAjoutForm(f => ({ ...f, [key]: e.target.value }))} required={["nom", "telephone", "ville"].includes(key)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all" />
                  </div>
                );
              })}
              <div>
                <label className="text-xs text-white/30 uppercase tracking-wide mb-1 block">Notes</label>
                <textarea value={ajoutForm.notes} onChange={e => setAjoutForm(f => ({ ...f, notes: e.target.value }))} rows={2} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 resize-none transition-all" />
              </div>
              <div>
                <label className="text-xs text-white/30 uppercase tracking-wide mb-1 block">Valeur estimée ($)</label>
                <input type="number" min="0" step="0.01" value={ajoutForm.montant_estime} onChange={e => setAjoutForm(f => ({ ...f, montant_estime: e.target.value }))} placeholder="ex: 350" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={savingAjout} className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-3 rounded-xl text-sm hover:from-red-500 hover:to-red-400 active:scale-[0.98] transition-all shadow-lg shadow-red-500/20 disabled:opacity-50">{savingAjout ? "Sauvegarde..." : "Sauvegarder"}</button>
              <button type="button" onClick={() => setShowAjout(false)} className="text-white/30 text-sm hover:text-white/60 px-3 transition-colors">Annuler</button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-center text-white/30 py-16">Chargement...</div>
        ) : clientsFiltres.length === 0 ? (
          <div className="text-center text-white/30 py-16 bg-white/[0.03] rounded-2xl border border-white/[0.06]">
            <p className="text-3xl mb-3">✅</p>
            <p className="font-semibold">Aucun lead actif</p>
            <p className="text-sm mt-1">Clique sur &quot;+ Ajouter&quot; pour en créer un</p>
          </div>
        ) : (
          clientsFiltres.map(client => {
            const rappelInfo = client.date_rappel ? formatRappel(client.date_rappel) : null;
            const enRetard = rappelInfo?.urgent ?? false;

            return (
              <div key={client.id} className={`bg-white/[0.03] rounded-2xl border shadow-sm overflow-hidden transition-all duration-150 hover:shadow-md ${client.statut === "complete" || client.statut === "sans_suite" ? "opacity-40" : ""} ${enRetard ? "border-orange-500/30 ring-1 ring-orange-500/20" : "border-white/[0.06]"}`}>

                {editOuvert !== client.id ? (
                  <>
                    <div className="p-4">
                      {/* Rappel en retard banner */}
                      {enRetard && (
                        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-lg px-3 py-1.5 mb-3 text-xs font-semibold text-orange-400">
                          🔔 {rappelInfo!.label}
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Link href={`/admin/clients/${client.id}`} className="font-bold text-white text-base truncate hover:text-red-400 transition-colors">{client.nom}</Link>
                          {client.montant_estime != null && <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">{client.montant_estime.toLocaleString("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 })}</span>}
                          <span className="text-xs text-white/20 shrink-0">{formatDate(client.created_at)}</span>
                        </div>
                        <div className="relative shrink-0 ml-2">
                          <button onClick={(e) => { e.stopPropagation(); setStatutMenuOuvert(statutMenuOuvert === client.id ? null : client.id); }} className={`text-xs font-bold px-2.5 py-1 rounded-full border transition-all active:scale-95 ${STATUT_COLORS[client.statut]}`}>
                            {STATUT_LABELS[client.statut]} ▾
                          </button>
                          {statutMenuOuvert === client.id && (
                            <div className="absolute right-0 top-full mt-1 z-50 bg-[#13131a] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden min-w-[140px]">
                              {PIPELINE_ORDER.filter(s => s !== client.statut).map(s => (
                                <button key={s} onClick={() => { changerStatut(client, s); setStatutMenuOuvert(null); }}
                                  className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-white/[0.06] transition-colors border-b border-white/[0.04] last:border-0 ${STATUT_COLORS[s].split(" ").find(c => c.startsWith("text-"))}`}>
                                  {STATUT_LABELS[s]}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <a href={`tel:${client.telephone}`} className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5 mb-2 group hover:bg-red-500/15 transition-colors">
                        <svg className="w-4 h-4 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>
                        <span className="text-red-300 font-bold text-sm">{client.telephone}</span>
                        <span className="text-red-400/50 text-xs ml-auto group-hover:text-red-300 transition-colors">Appeler →</span>
                      </a>

                      <p className="text-sm text-white/50">📍 {client.adresse ? `${client.adresse}, ` : ""}{client.ville}</p>
                      <p className="text-sm text-white/35 italic mt-0.5">{client.probleme}</p>
                      {client.notes && <p className="text-xs text-white/25 mt-1.5 bg-white/[0.03] rounded-lg px-2.5 py-1.5 italic">{client.notes}</p>}

                      {/* Historique jobs */}
                      {(() => {
                        const clientJobs = jobsParTel[client.telephone] ?? [];
                        if (clientJobs.length === 0) return null;
                        const totalRevenu = clientJobs.reduce((s, j) => s + (j.montant ?? 0), 0);
                        const fmtMontant = (n: number) => n.toLocaleString("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
                        return (
                          <div className="mt-2">
                            <button type="button" onClick={() => setHistoriqueOuvert(historiqueOuvert === client.id ? null : client.id)} className="text-xs text-blue-400 font-semibold hover:underline flex items-center gap-1">
                              {clientJobs.length} job{clientJobs.length > 1 ? "s" : ""} {totalRevenu > 0 && `· ${fmtMontant(totalRevenu)}`}
                              <svg className={`w-3 h-3 transition-transform ${historiqueOuvert === client.id ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            {historiqueOuvert === client.id && (
                              <div className="mt-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2 space-y-1.5">
                                {clientJobs.map(j => (
                                  <div key={j.id} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                      <span className={`w-2 h-2 rounded-full ${j.statut === "complete" ? "bg-green-500" : j.statut === "en_cours" ? "bg-yellow-500" : "bg-red-500"}`} />
                                      <span className="text-white/40">{new Date(j.date + "T12:00:00").toLocaleDateString("fr-CA", { day: "numeric", month: "short", year: "numeric" })}</span>
                                      {j.notes && <span className="text-white/25 italic truncate max-w-[150px]">{j.notes}</span>}
                                    </div>
                                    {j.montant != null && <span className="font-bold text-emerald-400">{fmtMontant(j.montant)}</span>}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Rappel — date non urgente */}
                      {client.date_rappel && !enRetard && (
                        <p className="text-xs text-white/25 mt-2 flex items-center gap-1">
                          📅 Rappel prévu : <span className="font-medium text-white/40">{formatRappel(client.date_rappel).label}</span>
                          <button onClick={() => setRappelOuvert(client.id)} className="ml-1 text-white/20 hover:text-red-400 transition-colors">✎</button>
                        </p>
                      )}

                      {/* Formulaire rappel inline */}
                      {rappelOuvert === client.id && (
                        <div className="mt-2 flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-xl px-3 py-2">
                          <span className="text-xs text-orange-700 font-semibold shrink-0">📅 Rappeler le</span>
                          <input type="date" defaultValue={client.date_rappel ?? ""} min={today}
                            onChange={e => { if (e.target.value) sauvegarderRappel(client.id, e.target.value); }}
                            className="admin-input flex-1 bg-transparent text-sm text-orange-300 focus:outline-none" autoFocus />
                          <button onClick={() => sauvegarderRappel(client.id, "")} className="text-xs text-white/30 hover:text-red-400 transition-colors">Effacer</button>
                          <button onClick={() => setRappelOuvert(null)} className="text-white/30 hover:text-white/60 transition-colors">✕</button>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-white/[0.06] grid grid-cols-4 divide-x divide-white/[0.06]">
                      <button onClick={() => ouvrirEdit(client)} className="flex items-center justify-center gap-1 py-3 text-xs text-white/40 hover:bg-white/[0.04] active:bg-white/[0.08] transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Modifier
                      </button>
                      <button onClick={() => setRappelOuvert(rappelOuvert === client.id ? null : client.id)} className={`flex items-center justify-center gap-1 py-3 text-xs transition-colors ${client.date_rappel ? "text-orange-400 hover:bg-orange-500/10" : "text-white/30 hover:bg-white/[0.04]"} active:bg-white/[0.08]`}>
                        📅 Rappel
                      </button>
                      <button onClick={() => transfererVersJob(client)} className="flex items-center justify-center gap-1 py-3 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10 active:bg-emerald-500/20 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Créer job
                      </button>
                      <button onClick={() => supprimerClient(client.id)} className="flex items-center justify-center gap-1 py-3 text-xs text-white/20 hover:bg-red-500/10 hover:text-red-400 active:bg-red-500/20 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Supprimer
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-white">Modifier — {client.nom}</h3>
                      <button onClick={() => setEditOuvert(null)} className="text-white/30 hover:text-white/60 text-lg transition-colors">✕</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(["nom", "telephone", "adresse", "ville", "probleme", "courriel"] as (keyof typeof FORM_VIDE)[]).map(key => {
                        const labels: Record<string, string> = { nom: "Nom", telephone: "Téléphone", adresse: "Adresse", ville: "Ville", probleme: "Problème", courriel: "Courriel" };
                        const wide = key === "probleme";
                        if (key === "adresse") return (
                          <div key={key}>
                            <label className="text-xs text-white/30 uppercase tracking-wide mb-1 block">Adresse</label>
                            <AdresseInput value={editForm.adresse} onChange={v => setEditForm(f => ({ ...f, adresse: v }))} onSelect={s => setEditForm(f => ({ ...f, adresse: s.adresse, ville: s.ville }))} />
                          </div>
                        );
                        return (
                          <div key={key} className={wide ? "md:col-span-2" : ""}>
                            <label className="text-xs text-white/30 uppercase tracking-wide mb-1 block">{labels[key]}</label>
                            <input value={editForm[key] ?? ""} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all" />
                          </div>
                        );
                      })}
                      <div>
                        <label className="text-xs text-white/30 uppercase tracking-wide mb-1 block">Notes</label>
                        <textarea value={editForm.notes ?? ""} onChange={e => setEditForm(f => ({ ...f, notes: e.target.value }))} rows={2} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 resize-none transition-all" />
                      </div>
                      <div>
                        <label className="text-xs text-white/30 uppercase tracking-wide mb-1 block">Valeur estimée ($)</label>
                        <input type="number" min="0" step="0.01" value={editForm.montant_estime} onChange={e => setEditForm(f => ({ ...f, montant_estime: e.target.value }))} placeholder="ex: 350" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-red-500/50 transition-all" />
                      </div>
                    </div>
                    <button onClick={() => sauvegarderEdit(client)} disabled={savingEdit} className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-3 rounded-xl text-sm hover:from-red-500 hover:to-red-400 active:scale-[0.98] transition-all shadow-lg shadow-red-500/20 disabled:opacity-50">
                      {savingEdit ? "Sauvegarde..." : "Sauvegarder"}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
