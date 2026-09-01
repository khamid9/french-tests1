// Programme thématique — thèmes 41 à 54 (niveau B1 principalement)

export const themesB1 = [
  {
    id: 't41-negation',
    name: 'La négation : rien, jamais, plus, personne',
    description: 'Les négations composées : ne…rien, ne…jamais, ne…plus, ne…personne.',
    categoryId: 'grammaire',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Je ne mange ___ (aucune chose).", options: ['rien', 'jamais', 'plus', 'personne'], correctIndex: 0, explanation: "ne…rien = aucune chose." },
      { q: "Il ne va ___ au cinéma. (aucune fois)", options: ['jamais', 'rien', 'plus', 'personne'], correctIndex: 0, explanation: "ne…jamais = aucune fois." },
      { q: "Je ne fume ___. (désormais)", options: ['plus', 'jamais', 'rien', 'personne'], correctIndex: 0, explanation: "ne…plus = ne pas davantage." },
      { q: "Je ne vois ___ (aucune personne).", options: ['personne', 'rien', 'jamais', 'plus'], correctIndex: 0, explanation: "ne…personne = aucune personne." },
      { q: "Il n\u2019y a ___ dans la boîte. (aucune chose)", options: ['rien', 'personne', 'jamais', 'plus'], correctIndex: 0, explanation: "ne…rien." },
      { q: "Il n\u2019y a ___ dans la pièce. (aucune personne)", options: ['personne', 'rien', 'jamais', 'plus'], correctIndex: 0, explanation: "ne…personne." },
      { q: "Elle ne sort ___. (aucune fois)", options: ['jamais', 'plus', 'rien', 'personne'], correctIndex: 0, explanation: "ne…jamais." },
      { q: "Ordre : je ne mange plus de viande → je ne mange ___ de viande.", options: ['plus', 'jamais', 'rien', 'personne'], correctIndex: 0, explanation: "ne…plus + de." },
      { q: "« Personne » ne se construit avec le ne que devant le verbe : ___.", options: ['je ne vois personne', 'je ne vois rien', 'je ne vois plus', 'je ne vois jamais'], correctIndex: 0, explanation: "ne + verbe + personne." },
      { q: "« Rien » se place après le verbe : ___.", options: ['je ne sais rien', 'je ne rien sais', 'ne rien je sais', 'je rien ne sais'], correctIndex: 0, explanation: "ne…rien." },
      { q: "Il ne fait ___ aujourd\u2019hui. (aucune chose)", options: ['rien', 'personne', 'jamais', 'plus'], correctIndex: 0, explanation: "ne…rien." },
      { q: "Un autre exemple de ne…que : il ne parle ___ français. (seulement)", options: ['que', 'plus', 'jamais', 'rien'], correctIndex: 0, explanation: "ne…que = seulement." },
      { q: "Négation avec infinitif : ne ___ fumer. (personne ?) → interdit → ne pas fumer.", options: ['pas', 'rien', 'jamais', 'plus'], correctIndex: 0, explanation: "à l\u2019infinitif : ne pas + inf." },
      { q: "« Ne jamais » : il ne ___ ___ (jamais + rien)… → il ne dit jamais rien.", options: ['dit jamais rien', 'rien dit jamais', 'jamais rien dit', 'dit rien jamais'], correctIndex: 0, explanation: "il ne dit jamais rien (deux négations)."
      }
    ]
  },
  {
    id: 't41b-pronom-en',
    name: 'Le pronom « en »',
    description: 'Le pronom EN : une quantité (de + nom) / complément tout court.',
    categoryId: 'grammaire',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "EN remplace : ___.", options: ['de + nom (une quantité)', 'un lieu', 'une personne', 'un objet direct'], correctIndex: 0, explanation: "en remplace de + nom / une quantité." },
      { q: "J\u2019ai du pain. → J\u2019__ ai.", options: ["en", 'y', 'le', 'la'], correctIndex: 0, explanation: "en remplace « du pain »." },
      { q: "Elle boit de l\u2019eau. → Elle ___ boit.", options: ['en', 'y', 'la', 'le'], correctIndex: 0, explanation: "en remplace « de l\u2019eau »." },
      { q: "Tu as des amis. → Tu ___ as.", options: ['en', 'y', 'les', 'leur'], correctIndex: 0, explanation: "en remplace « des amis »." },
      { q: "Il revient de Paris. → Il en ___. (venir de)", options: ['revient', 'vient', 'reva', 'reviens'], correctIndex: 0, explanation: "en remplace « de Paris » : il en revient." },
      { q: "Combien de livres as-tu ? → J\u2019en ___ trois.", options: ['ai', 'as', 'a', 'suis'], correctIndex: 0, explanation: "j\u2019en ai trois." },
      { q: "Négation : Je n\u2019en ___ pas.", options: ['ai', 'a', 'as', 'suis'], correctIndex: 0, explanation: "je n\u2019en ai pas." },
      { q: "EN se place devant le verbe : elle en ___.", options: ['prend', 'en', 'a en', 'en a'], correctIndex: 0, explanation: "sujet + en + verbe : elle en prend." },
      { q: "« J\u2019en veux deux » : en = ___.", options: ['une quantité', 'un lieu', 'une personne', 'un objet précis'], correctIndex: 0, explanation: "en + nombre (quantité)." },
      { q: "Transforme : Il mange du fromage. → Il ___.", options: ['en mange', 'en manger', 'mange en', 'en le mange'], correctIndex: 0, explanation: "il en mange."
      }
    ]
  },
  {
    id: 't42-pronom-y',
    name: 'Le pronom « y »',
    description: 'Le pronom Y : un lieu (à + nom) / un complément en à.',
    categoryId: 'grammaire',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Y remplace : ___.", options: ['un lieu (à + nom)', 'une quantité', 'une personne', 'un possesseur'], correctIndex: 0, explanation: "y remplace à + lieu / à + nom." },
      { q: "Je vais à Paris. → J\u2019___ vais.", options: ['y', 'en', 'le', 'la'], correctIndex: 0, explanation: "y remplace « à Paris » : j\u2019y vais." },
      { q: "Nous allons au cinéma. → Nous ___ allons.", options: ['y', 'en', 'les', 'leur'], correctIndex: 0, explanation: "y remplace « au cinéma » : nous y allons." },
      { q: "Il pense à ses vacances. → Il ___ pense.", options: ['y', 'en', 'les', 'leur'], correctIndex: 0, explanation: "y remplace « à ses vacances » (penser à) : il y pense." },
      { q: "Elle habite à Lyon. → Elle ___ habite.", options: ['y', 'en', 'la', 'le'], correctIndex: 0, explanation: "y remplace « à Lyon » : elle y habite." },
      { q: "Négation : je n\u2019y ___ pas.", options: ['vais', 'va', 'vas', 'vont'], correctIndex: 0, explanation: "je n\u2019y vais pas." },
      { q: "Réponds : est-ce que tu vas à la fête ? — Oui, j\u2019__ vais.", options: ['y', 'en', 'le', 'la'], correctIndex: 0, explanation: "j\u2019y vais." },
      { q: "Il répond à la question. → Il ___ répond.", options: ['y', 'en', 'la', 'le'], correctIndex: 0, explanation: "répondre à + nom → y : il y répond." },
      { q: "Y se place devant le verbe : j\u2019y ___.", options: ['habite', 'habites', 'habiter', 'habite pas'], correctIndex: 0, explanation: "sujet + y + verbe : j\u2019y habite." },
      { q: "« Ça y est » signifie : ___.", options: ["c'est fait / c'est terminé", 'c\u2019est où', 'c\u2019est qui', 'c\u2019est combien'], correctIndex: 0, explanation: "ça y est = c\u2019est terminé."
      }
    ]
  },
  {
    id: 't43-pronoms-cod',
    name: 'Les pronoms compléments directs : le, la, les',
    description: 'Remplacer un COD par le, la, les.',
    categoryId: 'grammaire',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Je vois Pierre. → Je ___ vois.", options: ['le', 'la', 'les', 'lui'], correctIndex: 0, explanation: "COD masculin → le." },
      { q: "Je vois Marie. → Je ___ vois.", options: ['la', 'le', 'les', 'lui'], correctIndex: 0, explanation: "COD féminin → la." },
      { q: "Je vois les enfants. → Je ___ vois.", options: ['les', 'le', 'la', 'leur'], correctIndex: 0, explanation: "COD pluriel → les." },
      { q: "Elle achète des fleurs. → Elle ___ achète.", options: ['les', 'le', 'la', 'lui'], correctIndex: 0, explanation: "des fleurs (COD pluriel) → les." },
      { q: "Il aime ce film. → Il ___ aime.", options: ["l'", 'le', 'la', 'les'], correctIndex: 0, explanation: "l\u2019 devant voyelle." },
      { q: "Je mange la pomme. → Je ___ mange.", options: ['la', 'le', 'les', 'lui'], correctIndex: 0, explanation: "la pomme (fém.) → la." },
      { q: "Accord du participe passé avec COD placé avant : Les fleurs que j\u2019ai ___ .", options: ['achetées', 'acheté', 'achetés', 'acheter'], correctIndex: 0, explanation: "COD « que » avant → accord : achetées." },
      { q: "La phrase que j\u2019ai ___ (lire).", options: ['lue', 'lu', 'lus', 'lire'], correctIndex: 0, explanation: "la phrase (fém.) → lue." },
      { q: "J\u2019ai mangé la pomme. (COD après) → pas d\u2019accord : j\u2019ai ___.", options: ['mangé', 'mangée', 'mangés', 'manger'], correctIndex: 0, explanation: "COD après le verbe : pas d\u2019accord." },
      { q: "Le pronom COD se place ___ le verbe.", options: ['avant', 'après', 'sur', 'entre'], correctIndex: 0, explanation: "je le vois (avant)."
      }
    ]
  },
  {
    id: 't44-pronoms-coi',
    name: 'Les pronoms compléments indirects : lui, leur',
    description: 'Remplacer un COI (à + personne) par lui, leur.',
    categoryId: 'grammaire',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Je parle à Marie. → Je ___ parle.", options: ['lui', 'leur', 'la', 'le'], correctIndex: 0, explanation: "à + une personne → lui." },
      { q: "Je parle aux enfants. → Je ___ parle.", options: ['leur', 'lui', 'les', 'la'], correctIndex: 0, explanation: "à + pluriel → leur." },
      { q: "Il téléphone à Paul. → Il ___ téléphone.", options: ['lui', 'leur', 'le', 'la'], correctIndex: 0, explanation: "à une personne → lui." },
      { q: "Elle écrit à ses parents. → Elle ___ écrit.", options: ['leur', 'lui', 'les', 'la'], correctIndex: 0, explanation: "à + pluriel → leur." },
      { q: "Je donne un livre à mon frère. → Je ___ donne un livre.", options: ['lui', 'leur', 'le', 'la'], correctIndex: 0, explanation: "à une personne → lui." },
      { q: "Nous proposons un café aux invités. → Nous ___ proposons un café.", options: ['leur', 'lui', 'les', 'la'], correctIndex: 0, explanation: "aux invités → leur." },
      { q: "COI = pronom qui remplace : ___.", options: ['à + personne', 'un objet direct', 'un lieu', 'une quantité'], correctIndex: 0, explanation: "COI : complément introduit par à (une personne)." },
      { q: "Il répond à son ami. → Il ___ répond.", options: ['lui', 'leur', 'le', 'la'], correctIndex: 0, explanation: "répondre à + personne → lui." },
      { q: "Elle sourit à ses enfants. → Elle ___ sourit.", options: ['leur', 'lui', 'les', 'la'], correctIndex: 0, explanation: "à ses enfants → leur." },
      { q: "Le COI se place ___ le verbe.", options: ['avant', 'après', 'entre', 'sur'], correctIndex: 0, explanation: "je lui parle."
      }
    ]
  },
  {
    id: 't45-pronoms-toniques',
    name: 'Les pronoms toniques : moi, toi, lui…',
    description: 'Moi, toi, lui, elle, nous, vous, eux, elles.',
    categoryId: 'grammaire',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Moi, je ___ (aime) le thé. (pronom tonique)", options: ["j'aime", 'je aime', 'moi aime', 'aimer'], correctIndex: 0, explanation: "moi, j\u2019aime (tonique + sujet)." },
      { q: "C\u2019est ___ (pour moi).", options: ['à moi', 'moi', 'je', 'mon'], correctIndex: 0, explanation: "c\u2019est à moi." },
      { q: "___ et toi, nous partons.", options: ['Moi', 'Je', 'Mon', 'Me'], correctIndex: 0, explanation: "moi et toi (tonique)." },
      { q: "Ce livre est pour ___. (toi)", options: ['toi', 'tu', 'te', 'ton'], correctIndex: 0, explanation: "pour toi." },
      { q: "Il vient avec ___. (lui)", options: ['lui', 'il', 'le', 'son'], correctIndex: 0, explanation: "avec lui." },
      { q: "Elle travaille chez ___. (elle)", options: ['elle', 'il', 'la', 'sa'], correctIndex: 0, explanation: "chez elle." },
      { q: "C\u2019est pour ___. (nous)", options: ['nous', 'notre', 'nos', 'on'], correctIndex: 0, explanation: "pour nous." },
      { q: "C\u2019est pour ___. (ils, pluriel)", options: ['eux', 'ils', 'leur', 'leurs'], correctIndex: 0, explanation: "eux (tonique masculin pluriel)." },
      { q: "Le pronom tonique s\u2019emploie après une préposition : avec ___.", options: ['moi', 'je', 'mon', 'me'], correctIndex: 0, explanation: "avec moi, chez toi, pour eux…" },
      { q: "___ Marc, il est sympa. (moi, Marc)", options: ['Moi,', 'Je,', 'Mon,', 'Me,'], correctIndex: 0, explanation: "moi, Marc, je… (tonique pour insister)."
      }
    ]
  },
  {
    id: 't46-passe-immediat',
    name: 'Le passé immédiat : venir de + infinitif',
    description: 'Venir de + infinitif = action qui vient de se produire.',
    categoryId: 'conjugaison',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Le passé immédiat = ___ + infinitif.", options: ["venir de", 'aller +', 'être en train de', 'avoir'], correctIndex: 0, explanation: "venir de + infinitif." },
      { q: "Je ___ de manger.", options: ['viens', 'vais', 'suis', 'ai'], correctIndex: 0, explanation: "je viens de manger = j\u2019ai mangé il y a peu." },
      { q: "Tu ___ de partir.", options: ['viens', 'vais', 'es', 'as'], correctIndex: 0, explanation: "tu viens de partir." },
      { q: "Elle ___ de rentrer.", options: ['vient', 'viens', 'va', 'est'], correctIndex: 0, explanation: "elle vient de rentrer." },
      { q: "Nous ___ de terminer.", options: ['venons', 'venez', 'allons', 'sommes'], correctIndex: 0, explanation: "nous venons de terminer." },
      { q: "Ils ___ de sortir.", options: ['viennent', 'venons', 'vont', 'sont'], correctIndex: 0, explanation: "ils viennent de sortir." },
      { q: "Le passé immédiat exprime : ___.", options: ['une action qui vient de se produire', 'une action future', 'une habitude', 'une action en cours'], correctIndex: 0, explanation: "action récente." },
      { q: "Je viens de ___ (finir).", options: ['finir', 'fini', 'finis', 'finissait'], correctIndex: 0, explanation: "venir de + infinitif : je viens de finir."
      }
    ]
  },
  {
    id: 't47-present-continu',
    name: 'Le présent continu : être en train de',
    description: 'Être en train de + infinitif = action en cours.',
    categoryId: 'conjugaison',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Le présent continu = ___ + en train de + infinitif.", options: ['être', 'avoir', 'aller', 'faire'], correctIndex: 0, explanation: "être en train de + infinitif." },
      { q: "Je suis en train de ___ (travailler).", options: ['travailler', 'travaille', 'travaillé', 'travaillais'], correctIndex: 0, explanation: "en train de + infinitif." },
      { q: "Il est en train de ___ (dormir).", options: ['dormir', 'dort', 'dormi', 'dormais'], correctIndex: 0, explanation: "en train de dormir." },
      { q: "Nous sommes en train de ___ (manger).", options: ['manger', 'mangeons', 'mangé', 'mange'], correctIndex: 0, explanation: "en train de manger." },
      { q: "Le présent continu exprime : ___.", options: ['une action en cours au moment où on parle', 'une habitude', 'une action passée', 'une obligation'], correctIndex: 0, explanation: "action en train de se dérouler." },
      { q: "Elle est en train de ___ (écrire).", options: ["d'écrire", 'écrire', 'écrit', 'écrivait'], correctIndex: 0, explanation: "en train d\u2019écrire (élision d)." },
      { q: "Ils sont en train de ___ (jouer).", options: ['jouer', 'jouent', 'joué', 'jouaient'], correctIndex: 0, explanation: "en train de jouer."
      }
    ]
  },
  {
    id: 't48-conditionnel',
    name: 'Le conditionnel',
    description: 'Formation et emplois du conditionnel (politesse, souhait, hypothèse).',
    categoryId: 'conjugaison',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Le conditionnel présent se forme : futur du radical + terminaisons de ___.", options: ["l'imparfait", 'le présent', 'le passé composé', 'le plus-que-parfait'], correctIndex: 0, explanation: "radical futur + -ais, -ais, -ait…" },
      { q: "Je ___ (vouloir) un café, s\u2019il vous plaît. (politesse)", options: ['voudrais', 'voudrait', 'veux', 'voulons'], correctIndex: 0, explanation: "je voudrais (politesse)." },
      { q: "Tu ___ (pouvoir) m\u2019aider ?", options: ['pourrais', 'pourrai', 'peux', 'peut'], correctIndex: 0, explanation: "tu pourrais m\u2019aider ?" },
      { q: "On ___ (aimer) visiter le musée.", options: ['aimerait', 'aimera', 'aime', 'aimait'], correctIndex: 0, explanation: "on aimerait (souhait)." },
      { q: "Si j\u2019avais le temps, je ___ (voyager).", options: ['voyagerais', 'voyagerai', 'voyage', 'voyageais'], correctIndex: 0, explanation: "hypothèse : si + imparfait, conditionnel." },
      { q: "Si tu venais, ce ___ (être) super.", options: ['serait', 'sera', 'est', 'était'], correctIndex: 0, explanation: "ce serait (conditionnel)." },
      { q: "Le conditionnel de « être » : je ___.", options: ['serais', 'serai', 'suis', 'étais'], correctIndex: 0, explanation: "je serais." },
      { q: "Le conditionnel de « avoir » : j\u2019___.", options: ["aurais", 'aurai', 'ai', 'avais'], correctIndex: 0, explanation: "j\u2019aurais." },
      { q: "Le conditionnel exprime aussi une demande polie : ___.", options: ['je voudrais, je pourrais', 'je veux', 'je dois', 'je fais'], correctIndex: 0, explanation: "politesse avec conditionnel." },
      { q: "Elle ___ (partir) volontiers.", options: ['partirait', 'partira', 'part', 'partait'], correctIndex: 0, explanation: "elle partirait."
      }
    ]
  },
  {
    id: 't49-subjonctif',
    name: 'Le subjonctif',
    description: 'Formation et principaux emplois du subjonctif présent.',
    categoryId: 'conjugaison',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Après « il faut que » on emploie : ___.", options: ['le subjonctif', "l'indicatif", 'le conditionnel', 'le participe'], correctIndex: 0, explanation: "il faut que + subjonctif." },
      { q: "Il faut que je ___ (faire) mes devoirs.", options: ['fasse', 'fais', 'faisait', 'ferai'], correctIndex: 0, explanation: "subjonctif de faire : fasse." },
      { q: "Il faut que tu ___ (venir).", options: ['viennes', 'viens', 'venait', 'viendras'], correctIndex: 0, explanation: "subjonctif de venir : tu viennes." },
      { q: "Je veux qu\u2019il ___ (partir).", options: ['parte', 'part', 'partait', 'partira'], correctIndex: 0, explanation: "subjonctif de partir : parte." },
      { q: "Qu\u2019il ___ (être) content !", options: ['soit', 'est', 'était', 'serait'], correctIndex: 0, explanation: "subjonctif d\u2019être : soit." },
      { q: "J\u2019aimerais qu\u2019elle ___ (venir).", options: ['vienne', 'vient', 'venait', 'viendra'], correctIndex: 0, explanation: "subjonctif : vienne." },
      { q: "Le subjonctif suit souvent : ___.", options: ['des expressions de volonté/désir/obligation', 'des faits certains', 'des habitudes', 'des lieux'], correctIndex: 0, explanation: "vouloir que, il faut que, aimer que…" },
      { q: "Il faut que nous ___ (faire) attention.", options: ['fassions', 'faisons', 'faisaient', 'ferons'], correctIndex: 0, explanation: "subjonctif : nous fassions." },
      { q: "Il est important que tu ___ (savoir) cela.", options: ['saches', 'sais', 'savais', 'sauras'], correctIndex: 0, explanation: "subjonctif de savoir : saches." },
      { q: "Bien que je ___ (être) fatigué, je viens.", options: ['sois', 'suis', 'étais', 'serais'], correctIndex: 0, explanation: "bien que + subjonctif : sois."
      }
    ]
  },
  {
    id: 't50-indicatif',
    name: "L'indicatif",
    description: 'L\u2019emploi de l\u2019indicatif après certains verbes/expressions.',
    categoryId: 'conjugaison',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Après « je pense que » on emploie : ___.", options: ["l'indicatif", 'le subjonctif', 'le gérondif', 'le participe'], correctIndex: 0, explanation: "je pense que + indicatif (certitude)." },
      { q: "Je pense qu\u2019il ___ (venir) demain.", options: ['viendra', 'vienne', 'vienne que', 'venait'], correctIndex: 0, explanation: "penser que + indicatif futur : viendra." },
      { q: "Il est certain qu\u2019elle ___ (réussir).", options: ['réussira', 'réussisse', 'réussit', 'réussirait'], correctIndex: 0, explanation: "certain que + indicatif : réussira." },
      { q: "L\u2019indicatif exprime : ___.", options: ['un fait réel et certain', 'un souhait', 'un doute', 'une obligation'], correctIndex: 0, explanation: "indicatif = réalité." },
      { q: "Je crois que vous ___ raison.", options: ['avez', 'ayez', 'aviez', 'aurez'], correctIndex: 0, explanation: "croire que + indicatif présent : avez." },
      { q: "Le présent de l\u2019indicatif, c\u2019est : ___.", options: ['je mange, tu manges, il mange…', 'je mangeais', 'j\u2019ai mangé', 'je mangerai'], correctIndex: 0, explanation: "je mange = indicatif présent." },
      { q: "On emploie l\u2019indicatif après : ___.", options: ['« il est sûr que », « je sais que »', '« il faut que »', '« je doute que »', '« bien que »'], correctIndex: 0, explanation: "certitude → indicatif."
      }
    ]
  }
]
