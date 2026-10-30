"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const MOT_DE_PASSE = "l1a2m3B5";

interface Client {
  id: string;
  nom: string;
  telephone: string;
  courriel: string | null;
  adresse: string | null;
  ville: string;
  statut: string;
  montant_estime: number | null;
  created_at: string;
}

interface TimelineItem {
  type: "job" | "facture" | "soumission" | "note";
  date: string;
  data: Record<string, unknown>;
}

interface Counts {
  jobs: number;
  factures: number;
  soumissions: number;
  notes: number;
}

function fmt(n: number) {
  return n.toLocaleString("fr-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-CA", { day: "numeric", month: "short", year: "numeric" });
}

const TYPE_ICON: Record<string, { color: string; label: string }> = {
  job: { color: "bg-red-500/15 text-red-400 border-red-500/30", label: "Job" },
  facture: { color: "bg-amber-500/15 text-amber-400 border-amber-500/30", label: "Facture" },
  soumission: { color: "bg-blue-500/15 text-blue-400 border-blue-500/30", label: "Soumission" },
  note: { color: "bg-white/[0.06] text-white/40 border-white/10", label: "Note" },
};

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [authed, setAuthed] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [counts, setCounts] = useState<Counts>({ jobs: 0, factures: 0, soumissions: 0, notes: 0 });
  const [loading, setLoading] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [filterType, setFilterType] = useState<string>("tous");

  useEffect(() => {
    if (sessionStorage.getItem("dicter_auth") === MOT_DE_PASSE) setAuthed(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/clients/${id}/timeline`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setClient(data.client);
        setTimeline(data.timeline);
        setCounts(data.counts);
      }
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [id]);

  useEffect(() => { if (authed) fetchData(); }, [authed, fetchData]);

  if (!authed) return null;

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!newNote.trim()) return;
    setSavingNote(true);
    try {
      await fetch("/api/admin/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: id, contenu: newNote.trim() }),
      });
      setNewNote("");
      fetchData();
    } catch { /* ignore */ }
    finally { setSavingNote(false); }
  }

  async function deleteNote(noteId: string) {
    try {
      await fetch("/api/admin/notes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: noteId }),
      });
      fetchData();
    } catch { /* ignore */ }
  }

  const filteredTimeline = filterType === "tous" ? timeline : timeline.filter(t => t.type === filterType);

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <div className="px-6 pt-6 pb-2">
        <Link href="/admin/leads" className="text-white/25 text-xs hover:text-white/50 transition-colors flex items-center gap-1 mb-3">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Retour aux clients
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2 flex flex-col gap-5">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/10 border-t-red-500 rounded-full animate-spin" />
          </div>
        ) : client ? (
          <>
            {/* Client header */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-bold text-xl tracking-tight">{client.nom}</h1>
                  {client.adresse && (
                    <p className="text-white/30 text-sm mt-1">{client.adresse}, {client.ville}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {/* Quick actions */}
                  <a
                    href={`tel:${client.telephone}`}
                    className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition-all"
                    title="Appeler"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                  <a
                    href={`sms:${client.telephone}`}
                    className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-all"
                    title="SMS"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </a>
                  {client.adresse && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${client.adresse}, ${client.ville}, QC`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
                      title="Naviguer"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </a>
                  )}
                  {client.courriel && (
                    <a
                      href={`mailto:${client.courriel}`}
                      className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 hover:bg-amber-500/20 transition-all"
                      title="Email"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Contact details */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2 text-white/40">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {client.telephone}
                </div>
                {client.courriel && (
                  <div className="flex items-center gap-2 text-white/40">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {client.courriel}
                  </div>
                )}
                <div className="flex items-center gap-2 text-white/25 text-xs">
                  Client depuis {formatDate(client.created_at)}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Soumissions", value: counts.soumissions, color: "text-blue-400" },
                { label: "Jobs", value: counts.jobs, color: "text-red-400" },
                { label: "Factures", value: counts.factures, color: "text-amber-400" },
                { label: "Notes", value: counts.notes, color: "text-white/50" },
              ].map(s => (
                <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-white/25 text-[10px] font-medium uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Add note */}
            <form onSubmit={addNote} className="flex gap-2">
              <input
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-red-500/50 text-sm transition-all"
                placeholder="Ajouter une note..."
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
              />
              <button
                type="submit"
                disabled={savingNote || !newNote.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-bold hover:from-red-500 hover:to-red-400 transition-all disabled:opacity-50 shrink-0"
              >
                {savingNote ? "..." : "Ajouter"}
              </button>
            </form>

            {/* Timeline filter */}
            <div className="flex items-center gap-2">
              {["tous", "soumission", "job", "facture", "note"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterType === f ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-white/30 hover:text-white/50"
                  }`}
                >
                  {f === "tous" ? "Tous" : TYPE_ICON[f]?.label ?? f}
                </button>
              ))}
            </div>

            {/* Timeline */}
            {filteredTimeline.length === 0 ? (
              <p className="text-white/20 text-center py-10 text-sm">Aucun historique</p>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-white/[0.06]" />

                <div className="flex flex-col gap-3">
                  {filteredTimeline.map((item, i) => {
                    const style = TYPE_ICON[item.type];
                    const d = item.data;
                    return (
                      <div key={i} className="flex gap-3 relative">
                        {/* Dot */}
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 z-10 ${style.color}`}>
                          {item.type === "job" && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                          {item.type === "facture" && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>}
                          {item.type === "soumission" && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                          {item.type === "note" && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>}
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${style.color}`}>
                              {style.label}
                            </span>
                            <span className="text-white/20 text-[10px]">{formatDate(item.date)}</span>
                          </div>

                          {item.type === "job" && (
                            <>
                              <p className="text-sm text-white/70">{String(d.adresse)}, {String(d.ville)} — <span className={d.statut === "complete" ? "text-emerald-400" : d.statut === "en_cours" ? "text-amber-400" : "text-red-400"}>{String(d.statut)}</span></p>
                              {d.montant && <p className="text-emerald-400 text-sm font-bold mt-1">{fmt(Number(d.montant))}</p>}
                              {d.notes && <p className="text-white/20 text-xs mt-1 italic">{String(d.notes)}</p>}
                            </>
                          )}

                          {item.type === "facture" && (
                            <>
                              <p className="text-sm text-white/70">
                                Facture — {String(d.statut)}
                              </p>
                              <p className={`text-sm font-bold mt-1 ${d.statut === "payee" ? "text-emerald-400" : "text-amber-400"}`}>
                                {fmt(Number(d.montant))}
                              </p>
                            </>
                          )}

                          {item.type === "soumission" && (
                            <>
                              <p className="text-sm text-white/70">
                                {String(d.numero)} — {String(d.statut)}
                              </p>
                              {Array.isArray(d.options) && (
                                <div className="flex gap-2 mt-1">
                                  {(d.options as { nom: string; total: number }[]).map((opt, oi) => (
                                    <span key={oi} className="text-xs text-white/30">{opt.nom}: <span className="text-white/50 font-bold">{fmt(opt.total)}</span></span>
                                  ))}
                                </div>
                              )}
                            </>
                          )}

                          {item.type === "note" && (
                            <div className="flex items-start justify-between">
                              <p className="text-sm text-white/50">{String(d.contenu)}</p>
                              <button
                                onClick={() => deleteNote(String(d.id))}
                                className="shrink-0 ml-2 text-white/10 hover:text-red-400 transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-white/30 text-center py-20">Client introuvable</p>
        )}
      </div>
    </div>
  );
}
