import LandingService, { type ContenuLanding } from "@/components/LandingService";

/** Contenu de /reparation-porte-garage-granby : la page generale. */
const CONTENU: ContenuLanding = {
  source: "granby",
  barre: "Réparation de porte de garage · Granby",
  h1: "Réparation de porte de garage à Granby et environs",
  intro:
    "Bris urgent réparé le jour même, ou rendez-vous à votre convenance pour une porte " +
    "qui force, qui est bruyante ou qui ferme mal. Prix donné avant de commencer.",
  altHero: "Technicien en réparation de porte de garage à Granby",
  reassurance: [
    { icone: "horloge", titre: "Le jour même", texte: "Dans la plupart des cas." },
    { icone: "garantie", titre: "Pas réparée, pas payée", texte: "Si je ne peux pas la réparer, vous ne payez rien." },
    { icone: "outil", titre: "Pièces dans le camion", texte: "Ressorts, câbles, roulettes." },
  ],
  problemesTitre: "Les problèmes que je règle",
  problemes: [
    { titre: "Ressort cassé", texte: "Un gros « bang » et la porte ne lève plus. La réparation la plus fréquente." },
    { titre: "Câble sorti ou brisé", texte: "La porte penche d’un côté ou reste croche." },
    { titre: "Porte débarrée du rail", texte: "Elle est sortie de sa track et refuse de bouger." },
    { titre: "Ouvre-porte qui ne répond plus", texte: "Moteur, engrenage, télécommande ou capteurs." },
    { titre: "Roulettes et charnières usées", texte: "Porte bruyante, qui force ou qui accroche." },
    { titre: "Porte qui ne ferme pas complètement", texte: "Souvent les yeux électriques ou l’ajustement." },
  ],
  securite:
    "un ressort de torsion est sous très forte tension. Si le vôtre est cassé, ne forcez pas " +
    "la porte à la main et n’essayez pas de la lever : appelez-moi.",
  voieB: {
    titre: "Votre porte fonctionne, mais pas comme avant?",
    intro:
      "Ce sont les affaires qu’on repousse jusqu’à ce que ça casse un matin d’hiver. " +
      "La plupart se règlent en une visite planifiée, à votre horaire.",
    items: [
      { titre: "Porte bruyante", texte: "Grincement, cognement, vibration. Presque toujours des roulettes, des charnières ou un manque de lubrification." },
      { titre: "Porte lourde ou qui force", texte: "Le moteur peine, la porte remonte croche. Les ressorts perdent de la tension bien avant de casser." },
      { titre: "Porte qui ferme mal", texte: "Elle laisse passer l’air, la neige ou les souris. Souvent les coupe-froid ou l’ajustement du bas de porte." },
      { titre: "Ouvre-porte capricieux", texte: "Il faut appuyer deux fois, la télécommande a une portée de cinq pieds, le clavier ne répond plus." },
      { titre: "Panneau ou section abîmée", texte: "Un coup de bumper, un panneau bossé. Souvent remplaçable sans changer la porte au complet." },
      { titre: "Isolation et coupe-froid", texte: "Garage froid, courant d’air. Remplacer les joints coûte une fraction d’une porte neuve." },
    ],
    miseAuPoint: true,
  },
  faq: [
    {
      q: "Combien de temps pour la réparation?",
      r: "La plupart des ressorts et des câbles se font en une visite, entre 45 minutes et 2 heures.",
    },
    {
      q: "Ma porte a 20 ans, est-ce que ça vaut la peine de la réparer?",
      r:
        "Souvent oui. Un ressort ou des câbles coûtent une fraction d’une porte neuve. Je vous le " +
        "dis franchement sur place si ce n’est pas rentable.",
    },
    {
      q: "Ma porte est bruyante mais elle fonctionne. Ça peut attendre?",
      r:
        "Généralement oui, mais le bruit est un signe d’usure. Des roulettes ou des charnières " +
        "usées finissent par tirer sur les câbles et les ressorts. Une visite planifiée " +
        "maintenant coûte pas mal moins cher qu’une urgence en janvier.",
    },
  ],
};

export default function LandingGranby() {
  return <LandingService contenu={CONTENU} />;
}
