-- ============================================================================
-- Schéma Supabase — Experts Portes de Garage (CRM + réservations)
-- Reconstruit à partir du code le 4 juillet 2026, après suppression du projet
-- Supabase original.
--
-- PAS ENCORE APPLIQUÉ. Quand tu seras prêt à réactiver la base de données :
--   1. Ouvre le projet Supabase → SQL Editor → colle tout ce fichier → Run
--   2. Ajoute dans Vercel :
--        SUPABASE_URL              (Settings → Data API → Project URL)
--        SUPABASE_SERVICE_ROLE_KEY (Settings → API Keys → service_role)
--   3. Redéploie le site
-- ============================================================================

-- Clients / leads (formulaires publics + CRM)
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  telephone text not null unique,   -- requis : les upserts font onConflict: "telephone"
  courriel text,
  adresse text,
  ville text,
  code_postal text,
  probleme text,
  notes text,
  statut text default 'nouveau',    -- nouveau | a_rappeler | job_planifie | complete | sans_suite
  date_rappel date,
  montant_estime numeric,
  created_at timestamptz not null default now()
);

-- Rendez-vous pris via les formulaires du site
create table if not exists rendez_vous (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  service text,
  date date,
  heure text,                       -- ex. "10h00 - 11h00"
  statut text default 'en_attente',
  google_event_id text,
  numero_soumission text,
  created_at timestamptz not null default now()
);

-- Soumissions générées par le formulaire coupe-froid (PDF)
create table if not exists soumissions (
  id uuid primary key default gen_random_uuid(),
  rendez_vous_id uuid references rendez_vous(id) on delete cascade,
  numero text,
  items jsonb default '[]'::jsonb,
  sous_total numeric,
  tps numeric,
  tvq numeric,
  total numeric,
  created_at timestamptz not null default now()
);

-- Soumissions CRM (Good/Better/Best, créées dans l'admin)
create table if not exists soumissions_crm (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete set null,
  numero text,                      -- format S-2026-0001, généré par l'API
  statut text default 'brouillon',  -- brouillon | envoyee | acceptee | ...
  options jsonb default '[]'::jsonb,
  option_choisie integer,           -- index de l'option choisie dans options[]
  notes text,
  created_at timestamptz not null default now()
);

-- Jobs planifiés (calendrier admin + job costing)
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete set null,
  soumission_id uuid references soumissions_crm(id) on delete set null,
  nom text,
  telephone text,
  adresse text,
  ville text,
  date date,
  heure text,
  statut text default 'a_faire',    -- a_faire | en_cours | complete
  notes text,
  montant numeric,
  couts jsonb default '[]'::jsonb,  -- job costing : [{ description, montant }]
  created_at timestamptz not null default now()
);

-- Factures (admin)
create table if not exists factures (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete set null,
  client_id uuid references clients(id) on delete set null,
  soumission_id uuid references soumissions_crm(id) on delete set null,
  nom text,
  telephone text,
  adresse text,
  ville text,
  description text,
  montant numeric,
  statut text default 'brouillon',  -- brouillon | envoyee | payee
  created_at timestamptz not null default now()
);

-- Notes libres sur un client (fiche client)
create table if not exists notes_client (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  contenu text,
  created_at timestamptz not null default now()
);

-- Checklists réutilisables (admin)
create table if not exists checklists (
  id uuid primary key default gen_random_uuid(),
  nom text,
  items jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- Inventaire (admin)
create table if not exists inventaire (
  id uuid primary key default gen_random_uuid(),
  nom text,
  categorie text,
  quantite numeric default 0,
  seuil_min numeric default 2,
  prix_unitaire numeric default 0,
  notes text,
  created_at timestamptz not null default now()
);

-- Index pour les requêtes du CRM
create index if not exists idx_rendez_vous_client on rendez_vous(client_id);
create index if not exists idx_jobs_client on jobs(client_id);
create index if not exists idx_jobs_date on jobs(date);
create index if not exists idx_factures_client on factures(client_id);
create index if not exists idx_soumissions_crm_client on soumissions_crm(client_id);
create index if not exists idx_notes_client_client on notes_client(client_id);

-- Le code serveur utilise la clé service_role (qui contourne RLS).
-- On active RLS sans policy : la clé publique anon ne peut donc rien lire/écrire.
alter table clients enable row level security;
alter table rendez_vous enable row level security;
alter table soumissions enable row level security;
alter table soumissions_crm enable row level security;
alter table jobs enable row level security;
alter table factures enable row level security;
alter table notes_client enable row level security;
alter table checklists enable row level security;
alter table inventaire enable row level security;
