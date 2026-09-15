export type Language = "fr" | "en" | "it";
export type Localized = Record<Language, string>;
export const l = (fr: string, en: string, it: string): Localized => ({
  fr,
  en,
  it,
});
export const zoneIds = [
  "home",
  "profile",
  "stack",
  "work",
  "journey",
  "contact",
] as const;
export type ZoneId = (typeof zoneIds)[number];
export const labels: Record<ZoneId, Localized> = {
  home: l("Accueil", "Home", "Inizio"),
  profile: l("Profil", "Profile", "Profilo"),
  stack: l("Stack", "Stack", "Stack"),
  work: l("Projets", "Projects", "Progetti"),
  journey: l("Parcours", "Journey", "Percorso"),
  contact: l("Contact", "Contact", "Contatti"),
};
export const copy = {
  portfolio: l(
    "Portfolio de Mohamed Arfaoui",
    "Mohamed Arfaoui Portfolio",
    "Portfolio di Mohamed Arfaoui",
  ),
  discipline: l(
    "conception &\ndéveloppement logiciel",
    "software design\n& development",
    "progettazione &\nsviluppo software",
  ),
  study: l(
    "BUT Informatique, IUT Annecy",
    "Computer science, IUT Annecy",
    "Informatica, IUT Annecy",
  ),
  homeNote: l(
    "Des applications web aux outils métier.",
    "From web applications to business software.",
    "Dalle applicazioni web al software gestionale.",
  ),
  hint: l(
    "Glisser pour explorer, Défiler pour zoomer",
    "Drag to explore, Scroll to zoom",
    "Trascina per esplorare, Usa la rotella per lo zoom",
  ),
  touchHint: l(
    "Glisser pour explorer, Pincer pour zoomer",
    "Drag to explore, Pinch to zoom",
    "Trascina per esplorare, Usa due dita per lo zoom",
  ),
  navigation: l("Destinations", "Destinations", "Destinazioni"),
  recenter: l("Recentrer", "Recenter", "Ricentra"),
  day: l("Jour", "Day", "Giorno"),
  night: l("Nuit", "Night", "Notte"),
  theme: l("Changer de thème", "Change theme", "Cambia tema"),
  language: l("Langue", "Language", "Lingua"),
  profileTitle: l(
    "Le logiciel,\ncôté pratique.",
    "Software,\nin practice.",
    "Il software,\nin pratica.",
  ),
  bio: l(
    "Étudiant en troisième année de BUT Informatique à l’IUT d’Annecy, je développe des applications web, des logiciels et des outils métier.",
    "I’m a third-year computer science student at IUT Annecy. I develop web applications, software and business tools.",
    "Studio al terzo anno del BUT Informatique all’IUT di Annecy. Sviluppo applicazioni web, software e strumenti gestionali.",
  ),
  profileBody: l(
    "Je travaille sur les interfaces, le serveur et les bases de données. Mes projets utilisent notamment C#/.NET, React et Vue.js.",
    "I work on interfaces, server code and databases. My projects use C#/.NET, React and Vue.js, among other technologies.",
    "Mi occupo delle interfacce, del codice server e dei database. Nei miei progetti uso, tra gli altri, C#/.NET, React e Vue.js.",
  ),
  education: l("Formation", "Education", "Formazione"),
  course: l(
    "Parcours A: réalisation d’applications",
    "Pathway A: application development",
    "Percorso A: sviluppo di applicazioni",
  ),
  languages: l("Langues", "Languages", "Lingue"),
  spoken: l(
    "Français, anglais, italien, arabe",
    "French, English, Italian, Arabic",
    "Francese, inglese, italiano, arabo",
  ),
  location: l("Ancrage", "Based in", "Dove sono"),
  stackTitle: l(
    "Matière\nà construire.",
    "Tools for\nbuilding.",
    "Strumenti\nper costruire.",
  ),
  skills: l("Savoir-faire", "In practice", "Competenze"),
  workSubtitle: l(
    "Applications, systèmes & expérimentations",
    "Applications, systems & experiments",
    "Applicazioni, sistemi e sperimentazioni",
  ),
  workTitle: l("Projets", "Selected work", "Progetti"),
  firstSuffix: l("er", "st", "°"),
  open: l("Lire le projet", "View project", "Scopri il progetto"),
  professional: l(
    "Stage full-stack",
    "Full-stack internship",
    "Tirocinio full-stack",
  ),
  voice: l(
    "La voix\ncomme interface.",
    "Voice as\nan interface.",
    "La voce\ncome interfaccia.",
  ),
  ongoing: l("En développement", "In development", "In sviluppo"),
  regional: l("1er régional", "1st regionally", "1° regionale"),
  paris: l("26e à Paris", "26th in Paris", "26° a Parigi"),
  olympiad: l(
    "Olympiades de Sciences de l’Ingénieur",
    "French Engineering Olympiad",
    "Olimpiadi francesi di ingegneria",
  ),
  evolution: l(
    "Une application, deux étapes.",
    "One application, two stages.",
    "Un’applicazione, due fasi.",
  ),
  journeyTitle: l(
    "Études et\nexpériences.",
    "Education and\nexperience.",
    "Studi ed\nesperienze.",
  ),
  journeySubtitle: l(
    "Formation / concours / expérience",
    "Education / achievement / experience",
    "Formazione / concorsi / esperienza",
  ),
  contactTitle: l(
    "Restons\nen contact.",
    "Let’s stay\nin touch.",
    "Restiamo\nin contatto.",
  ),
  email: l("Écrire", "Email", "Scrivimi"),
  cv: l("CV", "CV", "CV"),
  studyMode: l(
    "Formation initiale, 2024-2027",
    "Full-time degree, 2024-2027",
    "Corso a tempo pieno, 2024-2027",
  ),
  projectNavigation: l(
    "Choisir un projet",
    "Choose a project",
    "Scegli un progetto",
  ),
  close: l("Fermer", "Close", "Chiudi"),
  context: l("Le contexte", "Context", "Il contesto"),
  implementation: l("La réalisation", "Implementation", "La realizzazione"),
  role: l("Ma contribution", "My contribution", "Il mio contributo"),
  decisions: l("Choix techniques", "Technical choices", "Scelte tecniche"),
  lessons: l("Retour d’expérience", "Reflection", "Riflessioni"),
  result: l("Le résultat", "Outcome", "Il risultato"),
  source: l("Liens", "Links", "Link"),
  frontend: l("Code frontend", "Frontend source", "Codice frontend"),
  backend: l("Code backend", "Backend source", "Codice backend"),
  showcase: l(
    "Dépôt de présentation",
    "Showcase repository",
    "Repository di presentazione",
  ),
  website: l("Voir l’application", "Visit application", "Apri l’applicazione"),
  article: l("Article du lycée", "School article", "Articolo del liceo"),
  video: l(
    "Démonstration du projet",
    "Project demonstration",
    "Dimostrazione del progetto",
  ),
  returnWork: l("Retour aux projets", "Back to work", "Torna ai progetti"),
  zoomIn: l("Agrandir", "Zoom in", "Ingrandisci"),
  zoomOut: l("Réduire", "Zoom out", "Riduci"),
  skip: l(
    "Aller à la destination active",
    "Skip to current destination",
    "Vai alla destinazione attiva",
  ),
};
export const contact = {
  email: "yassin.arfaouii@gmail.com",
  github: "https://github.com/Arfaoumo",
  linkedin: "https://www.linkedin.com/in/mohamed-y-arfaoui",
  cv: "/assets/CV_Mohamed_Arfaoui.pdf",
};
export interface Project {
  id: string;
  title: string;
  status: "ready";
  year?: string;
  context: Localized;
  summary: Localized;
  implementation: Localized;
  role?: Localized;
  result?: Localized;
  technicalDecisions?: Localized;
  lessons?: Localized;
  stack: string[];
  image?: string;
  alt?: Localized;
  video?: string;
  links: { label: Localized; url: string }[];
  composition: "designet" | "lumora" | "iot" | "cube" | "software";
}
export const projects: Project[] = [
  {
    id: "designet",
    title: "Designet ERP",
    status: "ready",
    year: "2026",
    composition: "designet",
    context: l(
      "Stage full-stack, Designet Web Agency, avril–juin 2026",
      "Full-stack internship, Designet Web Agency, April–June 2026",
      "Tirocinio full-stack, Designet Web Agency, aprile–giugno 2026",
    ),
    summary: l(
      "Un outil métier pour relier ventes, achats, stocks, clients et fournisseurs.",
      "Business software connecting sales, purchasing, inventory, customers and suppliers.",
      "Un gestionale che collega vendite, acquisti, inventario, clienti e fornitori.",
    ),
    implementation: l(
      "L’ERP repose sur une architecture MERN : React pour les interfaces, Node.js et Express pour le serveur, MongoDB pour les données. Le contrôle d’accès par rôles organise les permissions ; les tableaux de bord permettent de consulter les données métier.",
      "The ERP uses a MERN architecture: React interfaces, a Node.js and Express server, and MongoDB for data. Role-based access controls permissions; dashboards make business data accessible.",
      "L’ERP adotta un’architettura MERN: interfacce React, server Node.js ed Express e dati in MongoDB. Il controllo degli accessi per ruoli gestisce i permessi; le dashboard consentono di consultare i dati aziendali.",
    ),
    role: l(
      "Développement full-stack, conception d’API REST, authentification JWT et génération de rapports automatisés.",
      "Full-stack development, REST API design, JWT authentication and automated reporting.",
      "Sviluppo full-stack, progettazione di API REST, autenticazione JWT e report automatizzati.",
    ),
    result: l(
      "L’ERP a été déployé.",
      "The ERP has been deployed.",
      "L’ERP è stato messo online.",
    ),
    stack: ["React", "Node.js", "Express", "MongoDB", "JavaScript"],
    image: "erp",
    alt: l(
      "Écran de connexion de Designet ERP",
      "Designet ERP sign-in screen",
      "Schermata di accesso a Designet ERP",
    ),
    links: [
      { label: copy.frontend, url: "https://github.com/Arfaoumo/ERP_Frontend" },
      { label: copy.backend, url: "https://github.com/Arfaoumo/ERP_Backend" },
    ],
  },
  {
    id: "lumora",
    title: "Lumora",
    status: "ready",
    composition: "lumora",
    context: copy.ongoing,
    summary: l(
      "Une aventure narrative où la voix devient le principal moyen d’interaction.",
      "A narrative adventure with voice as its main way of interacting.",
      "Un’avventura narrativa in cui la voce è il principale mezzo di interazione.",
    ),
    implementation: l(
      "L’application utilise React, Node.js et SQL. L’API Gemini sert à la narration. Capacitor et Tauri permettent de proposer l’application sur plusieurs plateformes.",
      "The application uses React, Node.js and SQL. The Gemini API handles narration. Capacitor and Tauri let the application run on multiple platforms.",
      "L’applicazione usa React, Node.js e SQL. L’API Gemini gestisce la narrazione. Capacitor e Tauri permettono di usare l’applicazione su più piattaforme.",
    ),
    stack: ["React", "Node.js", "SQL", "Capacitor", "Tauri", "JavaScript"],
    links: [
      {
        label: copy.showcase,
        url: "https://github.com/Arfaoumo/Lumora-Showcase",
      },
    ],
  },
  {
    id: "iot",
    title: "IoT Laser Target",
    status: "ready",
    year: "2023–2024",
    composition: "iot",
    context: copy.olympiad,
    summary: l(
      "Relier une cible laser de biathlon à une interface web pour suivre les performances en temps réel.",
      "Connecting a biathlon laser target to a web interface for real-time performance tracking.",
      "Collegare un bersaglio laser da biathlon a un’interfaccia web per seguire le prestazioni in tempo reale.",
    ),
    implementation: l(
      "Le système relie matériel physique, traitement des données et interface web. Le projet utilise PHP, Python, JSON et SQL.",
      "The system connects physical hardware, data processing and a web interface. The project uses PHP, Python, JSON and SQL.",
      "Il sistema collega hardware fisico, elaborazione dei dati e interfaccia web. Il progetto usa PHP, Python, JSON e SQL.",
    ),
    role: l(
      "Traitement backend, conception de la base SQL, suivi des performances et traitement des données en temps réel.",
      "Backend processing, SQL database design, performance logs and real-time data processing.",
      "Elaborazione backend, progettazione del database SQL, registri delle prestazioni ed elaborazione dei dati in tempo reale.",
    ),
    result: l(
      "1er au concours régional des Olympiades de Sciences de l’Ingénieur ; 26e à Paris.",
      "1st in the regional Engineering Olympiad; 26th in Paris.",
      "1° al concorso regionale delle Olimpiadi di ingegneria; 26° a Parigi.",
    ),
    stack: ["PHP", "Python", "SQL"],
    image: "olympiad",
    alt: l(
      "Remise du premier prix régional des Olympiades, équipe du lycée Louis Lachenal sur scène",
      "Louis Lachenal team on stage receiving the regional first prize",
      "La squadra del liceo Louis Lachenal sul palco riceve il primo premio regionale",
    ),
    video: "/assets/simo.mp4",
    links: [
      {
        label: copy.article,
        url: "https://www.lycee-louis-lachenal.fr/fr/olympiades-des-sciences-de-lingenieur-2024-concours-academique-des-eleves-de-sti2d-du-lycee",
      },
    ],
  },
  {
    id: "cubebike",
    title: "CubeBike",
    status: "ready",
    composition: "cube",
    context: l(
      "Projet universitaire, application web",
      "University project, web application",
      "Progetto universitario, applicazione web",
    ),
    summary: l(
      "Recréer le site d’un fabricant de vélos, puis le reprendre avec Vue.js.",
      "Recreating a bicycle manufacturer’s website, then rebuilding it with Vue.js.",
      "Ricreare il sito di un produttore di biciclette, poi rifarlo con Vue.js.",
    ),
    implementation: l(
      "La première version est construite avec PHP et SQL. L’application a ensuite été modernisée avec Vue.js.",
      "The first version was built with PHP and SQL. The application was then modernised with Vue.js.",
      "La prima versione è stata realizzata con PHP e SQL. L’applicazione è stata poi modernizzata con Vue.js.",
    ),
    stack: ["Vue.js", "PHP", "SQL", "JavaScript"],
    image: "cube",
    alt: l(
      "Page d’accueil CubeBike avec catalogue de vélos",
      "CubeBike homepage and bicycle catalogue",
      "Homepage CubeBike con catalogo di biciclette",
    ),
    links: [
      {
        label: copy.website,
        url: "https://cube-app-project-perso.vercel.app/",
      },
    ],
  },
];
export const experiences = [
  {
    year: "2021–2024",
    title: l(
      "Bac STI2D, SIN",
      "Baccalaureate, STI2D / SIN",
      "Baccalauréat, STI2D / SIN",
    ),
    place: l(
      "Lycée Louis Lachenal, Argonay",
      "Lycée Louis Lachenal, Argonay",
      "Lycée Louis Lachenal, Argonay",
    ),
    text: l(
      "Systèmes d’information et numérique. Baccalauréat obtenu avec mention.",
      "Information and digital systems. Baccalaureate awarded with honours.",
      "Sistemi informativi e digitali. Baccalauréat conseguito con menzione.",
    ),
  },
  {
    year: "2023–2024",
    title: copy.olympiad,
    place: l(
      "1er régional, 26e à Paris",
      "1st regionally, 26th in Paris",
      "1° regionale, 26° a Parigi",
    ),
    text: l(
      "Participation aux Olympiades de Sciences de l’Ingénieur.",
      "Participation in the French Engineering Olympiad.",
      "Partecipazione alle Olimpiadi francesi di ingegneria.",
    ),
  },
  {
    year: "2024-2027",
    title: l("BUT Informatique", "BUT, Computer science", "BUT, Informatica"),
    place: l(
      "IUT Annecy, formation initiale",
      "IUT Annecy, full-time degree",
      "IUT Annecy, corso a tempo pieno",
    ),
    text: l(
      "Parcours A : réalisation d’applications. Troisième année en 2026 ; fin de formation prévue en 2027.",
      "Pathway A: application development. Third year in 2026; expected completion in 2027.",
      "Percorso A: sviluppo di applicazioni. Terzo anno nel 2026; conclusione prevista nel 2027.",
    ),
  },
  {
    year: "2026",
    title: l(
      "Stage full-stack",
      "Full-stack internship",
      "Tirocinio full-stack",
    ),
    place: l(
      "Designet Web Agency, avril–juin",
      "Designet Web Agency, April–June",
      "Designet Web Agency, aprile–giugno",
    ),
    text: l(
      "Expérience professionnelle en développement d’applications métier.",
      "Professional experience developing business applications.",
      "Esperienza professionale nello sviluppo di applicazioni gestionali.",
    ),
  },
];
export const technologies = [
  "C#",
  ".NET",
  "React",
  "Vue.js",
  "JavaScript",
  "Node.js",
  "Express",
  "Python",
  "PHP",
  "PostgreSQL",
  "SQL",
  "MongoDB",
  "Git",
  "Azure",
  "Capacitor",
  "Tauri",
];
export const skills = [
  {
    title: l(
      "Architecture et interfaces",
      "Architecture and interfaces",
      "Architettura e interfacce",
    ),
    text: l(
      "Full-stack, interfaces React / Vue.js",
      "Full-stack, React / Vue.js interfaces",
      "Full-stack, interfacce React / Vue.js",
    ),
  },
  {
    title: l("Serveur et accès", "Server and access", "Server e accessi"),
    text: l(
      "API REST, JWT, permissions par rôles",
      "REST APIs, JWT, role-based permissions",
      "API REST, JWT, permessi per ruoli",
    ),
  },
  {
    title: l(
      "Données et traitement",
      "Data processing",
      "Elaborazione dei dati",
    ),
    text: l(
      "SQL / MongoDB, traitement en temps réel",
      "SQL / MongoDB, real-time processing",
      "SQL / MongoDB, elaborazione in tempo reale",
    ),
  },
];
