// Programme thématique — thèmes 33 à 50 (niveau A2)

export const themesA2b = [
  {
    id: 't33-passe-compose-avoir-er',
    name: 'Le passé composé avec avoir : verbes en -er',
    description: 'Passé composé des verbes en -er avec avoir. Affirmation, négation, interrogation.',
    categoryId: 'conjugaison',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Hier, j\u2019___ (parler) à Marie.", options: ['ai parlé', 'suis parlé', 'a parlé', 'ai parler'], correctIndex: 0, explanation: "parler + avoir : j\u2019ai parlé." },
      { q: "Tu ___ (manger) une pomme.", options: ['as mangé', 'es mangé', 'a mangé', 'as manger'], correctIndex: 0, explanation: "tu as mangé." },
      { q: "Il ___ (travailler) beaucoup.", options: ['a travaillé', 'as travaillé', 'est travaillé', 'a travailler'], correctIndex: 0, explanation: "il a travaillé." },
      { q: "Nous ___ (regarder) un film.", options: ['avons regardé', 'sommes regardé', 'avez regardé', 'avons regarder'], correctIndex: 0, explanation: "nous avons regardé." },
      { q: "Vous ___ (chanter) à la fête.", options: ['avez chanté', 'êtes chanté', 'avons chanté', 'avez chanter'], correctIndex: 0, explanation: "vous avez chanté." },
      { q: "Ils ___ (habiter) à Lyon.", options: ['ont habité', 'sont habité', 'ont habiter', 'avez habité'], correctIndex: 0, explanation: "ils ont habité." },
      { q: "Négation : Je n\u2019___ pas mangé.", options: ['ai', 'suis', 'as', 'avons'], correctIndex: 0, explanation: "je n\u2019ai pas mangé." },
      { q: "Négation : Elle n\u2019a pas ___ (chanter).", options: ['chanté', 'chantée', 'chantés', 'chanter'], correctIndex: 0, explanation: "n\u2019a pas chanté." },
      { q: "Interrogation : ___ parlé français ? (tu)", options: ['As-tu', 'Tu as', 'As tu', 'A-tu'], correctIndex: 0, explanation: "As-tu parlé ?" },
      { q: "Interrogation : ___-vous voyagé ?", options: ['Avez', 'Avez-vous', 'Êtes', 'Avons'], correctIndex: 0, explanation: "Avez-vous voyagé ?" },
      { q: "Est-ce que tu ___ mangé ?", options: ['as', 'es', 'a', 'avons'], correctIndex: 0, explanation: "est-ce que tu as mangé ?" },
      { q: "Le participe passé des verbes en -er est en ___.", options: ['-é', '-er', '-ez', '-ée'], correctIndex: 0, explanation: "manger → mangé." },
      { q: "Elle a ___ (écouter) la radio.", options: ['écouté', 'écoutée', 'écoutés', 'écouter'], correctIndex: 0, explanation: "a écouté." },
      { q: "Nous avons ___ (danser) toute la nuit.", options: ['dansé', 'dansés', 'danser', 'dansée'], correctIndex: 0, explanation: "avons dansé." },
      { q: "J\u2019ai ___ (jouer) au tennis.", options: ['joué', 'jouer', 'jouée', 'joués'], correctIndex: 0, explanation: "j\u2019ai joué."
      }
    ]
  },
  {
    id: 't34-passe-compose-avoir-irreguliers',
    name: 'Le passé composé avec avoir : verbes irréguliers',
    description: 'Participe passé des verbes irréguliers (-ir, -re, -oir) avec avoir.',
    categoryId: 'conjugaison',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Le participe passé de « prendre » : ___.", options: ['pris', 'prenu', 'prendé', 'prit'], correctIndex: 0, explanation: "prendre → pris." },
      { q: "Le participe passé de « faire » : ___.", options: ['fait', 'fais', 'fâit', 'faire'], correctIndex: 0, explanation: "faire → fait." },
      { q: "Le participe passé de « voir » : ___.", options: ['vu', 'voi', 'voyé', 'vue'], correctIndex: 0, explanation: "voir → vu." },
      { q: "Le participe passé de « lire » : ___.", options: ['lu', 'li', 'lisé', 'lir'], correctIndex: 0, explanation: "lire → lu." },
      { q: "Le participe passé de « écrire » : ___.", options: ['écrit', 'écrive', 'écrivé', 'écri'], correctIndex: 0, explanation: "écrire → écrit." },
      { q: "Le participe passé de « dire » : ___.", options: ['dit', 'dis', 'disé', 'dise'], correctIndex: 0, explanation: "dire → dit." },
      { q: "Le participe passé de « mettre » : ___.", options: ['mis', 'met', 'metté', 'mise'], correctIndex: 0, explanation: "mettre → mis." },
      { q: "Le participe passé de « boire » : ___.", options: ['bu', 'boi', 'bué', 'boir'], correctIndex: 0, explanation: "boire → bu." },
      { q: "Le participe passé de « connaître » : ___.", options: ['connu', 'connaît', 'conne', 'conné'], correctIndex: 0, explanation: "connaître → connu." },
      { q: "Le participe passé de « recevoir » : ___.", options: ['reçu', 'recevu', 'reçoit', 'reçé'], correctIndex: 0, explanation: "recevoir → reçu." },
      { q: "Le participe passé de « pouvoir » : ___.", options: ['pu', 'pouvu', 'peut', 'poué'], correctIndex: 0, explanation: "pouvoir → pu." },
      { q: "Le participe passé de « devoir » : ___.", options: ['dû', 'devu', 'doit', 'devé'], correctIndex: 0, explanation: "devoir → dû." },
      { q: "Le participe passé de « savoir » : ___.", options: ['su', 'savu', 'sait', 'savé'], correctIndex: 0, explanation: "savoir → su." },
      { q: "Le participe passé de « vouloir » : ___.", options: ['voulu', 'voule', 'veut', 'voulé'], correctIndex: 0, explanation: "vouloir → voulu." },
      { q: "J\u2019ai ___ (prendre) le train.", options: ['pris', 'prenu', 'prit', 'prend'], correctIndex: 0, explanation: "j\u2019ai pris." },
      { q: "Il a ___ (écrire) une lettre.", options: ['écrit', 'écrire', 'écrivé', 'écri'], correctIndex: 0, explanation: "a écrit." },
      { q: "Nous avons ___ (mettre) nos manteaux.", options: ['mis', 'met', 'metté', 'mise'], correctIndex: 0, explanation: "avons mis." },
      { q: "Elle a ___ (lire) ce roman.", options: ['lu', 'li', 'lisé', 'lir'], correctIndex: 0, explanation: "a lu." },
      { q: "Ils ont ___ (boire) de l\u2019eau.", options: ['bu', 'boi', 'bué', 'boir'], correctIndex: 0, explanation: "ont bu." },
      { q: "Tu as ___ (pouvoir) venir.", options: ['pu', 'peut', 'pouvu', 'poué'], correctIndex: 0, explanation: "as pu."
      }
    ]
  },
  {
    id: 't35-passe-compose-etre',
    name: 'Le passé composé avec être : verbes de mouvement',
    description: 'Passé composé avec être des verbes de mouvement (aller, venir, partir…).',
    categoryId: 'conjugaison',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Avec l\u2019auxiliaire être, le participe passé s\u2019accorde avec ___.", options: ['le sujet', "l'objet", 'le verbe', 'rien'], correctIndex: 0, explanation: "accord avec le sujet : elle est partie." },
      { q: "Je ___ allé au cinéma. (aller)", options: ['suis', 'ai', 'as', 'es'], correctIndex: 0, explanation: "aller → être : je suis allé." },
      { q: "Tu ___ venu tôt. (venir)", options: ['es', 'as', 'a', 'est'], correctIndex: 0, explanation: "tu es venu." },
      { q: "Elle ___ partie à midi. (partir)", options: ['est', 'a', 'as', 'es'], correctIndex: 0, explanation: "elle est partie (accord au féminin)." },
      { q: "Nous ___ arrivés à l\u2019heure.", options: ['sommes', 'avons', 'êtes', 'sont'], correctIndex: 0, explanation: "nous sommes arrivés." },
      { q: "Ils ___ restés à la maison.", options: ['sont', 'ont', 'êtes', 'sommes'], correctIndex: 0, explanation: "ils sont restés." },
      { q: "Négation : Elle n\u2019___ pas venue.", options: ['est', 'a', 'as', 'es'], correctIndex: 0, explanation: "elle n\u2019est pas venue." },
      { q: "Interrogation : ___-tu parti ce matin ?", options: ['Es', 'As', 'A', 'Est'], correctIndex: 0, explanation: "es-tu parti ?" },
      { q: "Accord : Marie est ___. (partir)", options: ['partie', 'parti', 'partis', 'parties'], correctIndex: 0, explanation: "Marie (fém. sing.) → partie." },
      { q: "Accord : Elles sont ___. (venir)", options: ['venues', 'venu', 'venus', 'venue'], correctIndex: 0, explanation: "elles (fém. plur.) → venues." },
      { q: "Le verbe « monter » avec un COD prend ___.", options: ['avoir', 'être', 'rien', 'de'], correctIndex: 0, explanation: "monter sans COD → être ; avec COD → avoir (j\u2019ai monté les bagages)." },
      { q: "Nous sommes ___ tard. (arriver)", options: ['arrivés', 'arrivé', 'arrivées', 'arriver'], correctIndex: 0, explanation: "nous sommes arrivés." },
      { q: "Elle est ___ à la gare. (aller)", options: ['allée', 'allé', 'allés', 'aller'], correctIndex: 0, explanation: "elle est allée." },
      { q: "Ils sont ___ à Rome. (aller)", options: ['allés', 'allé', 'allées', 'aller'], correctIndex: 0, explanation: "ils (masc. plur.) → allés." },
      { q: "Je suis ___ de chez moi. (sortir)", options: ['sorti', 'sortie', 'sortis', 'sortir'], correctIndex: 0, explanation: "je suis sorti (sujet masculin)."
      }
    ]
  },
  {
    id: 't36-passe-compose-etre-pronominaux',
    name: 'Le passé composé avec être : verbes pronominaux',
    description: 'Passé composé des verbes pronominaux (se lever, s\u2019appeler…).',
    categoryId: 'conjugaison',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Les verbes pronominaux se conjuguent au passé composé avec ___.", options: ['être', 'avoir', 'les deux', 'être seulement au passé'], correctIndex: 0, explanation: "toujours être." },
      { q: "Je me ___ levé tôt. (levé / se lever)", options: ['suis', 'ai', 'es', 'a'], correctIndex: 0, explanation: "je me suis levé." },
      { q: "Tu t\u2019___ lavé les mains.", options: ['es', 'as', 'a', 'est'], correctIndex: 0, explanation: "tu t\u2019es lavé." },
      { q: "Elle s\u2019___ habillée.", options: ['est', 'a', 'es', 'sommes'], correctIndex: 0, explanation: "elle s\u2019est habillée." },
      { q: "Nous nous ___ couchés tard.", options: ['sommes', 'avons', 'êtes', 'sont'], correctIndex: 0, explanation: "nous nous sommes couchés." },
      { q: "Ils se ___ rencontrés à Paris.", options: ['sont', 'ont', 'êtes', 'sommes'], correctIndex: 0, explanation: "ils se sont rencontrés." },
      { q: "Accord : Elle s\u2019est ___. (réveiller)", options: ['réveillée', 'réveillé', 'réveillés', 'réveiller'], correctIndex: 0, explanation: "elle s\u2019est réveillée (accord avec le sujet)." },
      { q: "Accord : Nous nous sommes ___. (habiller, féminin)", options: ['habillées', 'habillé', 'habillés', 'habiller'], correctIndex: 0, explanation: "nous (fém. plur.) → habillées." },
      { q: "Négation : Elle ne s\u2019est pas ___. (coucher)", options: ['couchée', 'couché', 'couchés', 'coucher'], correctIndex: 0, explanation: "elle ne s\u2019est pas couchée." },
      { q: "Il s\u2019est ___ (tromper) dans ses calculs.", options: ['trompé', 'trompez', 'trompés', 'tromper'], correctIndex: 0, explanation: "il s\u2019est trompé." },
      { q: "Nous nous ___ levés très tôt.", options: ['sommes', 'avons', 'êtes', 'sont'], correctIndex: 0, explanation: "nous nous sommes levés." },
      { q: "Elle s\u2019est ___ (approcher) de la fenêtre.", options: ['approchée', 'approché', 'approchés', 'approcher'], correctIndex: 0, explanation: "elle s\u2019est approchée."
      }
    ]
  },
  {
    id: 't37-passe-compose-etre-ou-avoir',
    name: 'Le passé composé : être ou avoir ?',
    description: 'Choisir l\u2019auxiliaire correct au passé composé.',
    categoryId: 'conjugaison',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Hier, je ___ mangé à midi.", options: ['ai', 'suis', 'es', 'a'], correctIndex: 0, explanation: "manger → avoir : j\u2019ai mangé." },
      { q: "Elle ___ allée à Paris.", options: ['est', 'a', 'as', 'es'], correctIndex: 0, explanation: "aller → être : elle est allée." },
      { q: "Nous ___ visité le musée.", options: ['avons', 'sommes', 'êtes', 'sont'], correctIndex: 0, explanation: "visiter (COD) → avoir : nous avons visité." },
      { q: "Ils ___ partis en vacances.", options: ['sont', 'ont', 'êtes', 'avons'], correctIndex: 0, explanation: "partir → être : ils sont partis." },
      { q: "Tu ___ fini tes devoirs.", options: ['as', 'es', 'a', 'est'], correctIndex: 0, explanation: "finir → avoir : tu as fini." },
      { q: "Elle ___ née en 2000.", options: ['est', 'a', 'as', 'es'], correctIndex: 0, explanation: "naître → être : elle est née." },
      { q: "J\u2019___ bu un café.", options: ['ai', 'suis', 'es', 'a'], correctIndex: 0, explanation: "boire → avoir : j\u2019ai bu." },
      { q: "Nous ___ rentrés tarde.", options: ['sommes', 'avons', 'êtes', 'sont'], correctIndex: 0, explanation: "rentrer → être (sans COD) : nous sommes rentrés." },
      { q: "Il ___ monté les escaliers. (avec COD)", options: ['a', 'est', 'as', 'es'], correctIndex: 0, explanation: "monter + COD → avoir : il a monté les escaliers." },
      { q: "Elle ___ sortie de la maison.", options: ['est', 'a', 'as', 'es'], correctIndex: 0, explanation: "sortir (sans COD) → être : elle est sortie." },
      { q: "Nous ___ changé de train. (changer)", options: ['avons', 'sommes', 'êtes', 'sont'], correctIndex: 0, explanation: "changer → avoir : nous avons changé." },
      { q: "Ils ___ entrés dans la salle.", options: ['sont', 'ont', 'êtes', 'avons'], correctIndex: 0, explanation: "entrer → être : ils sont entrés." },
      { q: "Maria ___ tombée dans la rue.", options: ['est', 'a', 'as', 'es'], correctIndex: 0, explanation: "tomber → être : elle est tombée." },
      { q: "Nous ___ répondu au téléphone.", options: ['avons', 'sommes', 'êtes', 'sont'], correctIndex: 0, explanation: "répondre → avoir : nous avons répondu."
      }
    ]
  },
  {
    id: 't38-present-pc-futur',
    name: 'Présent, passé composé, futur',
    description: 'Distinguer le présent, le passé composé et le futur (proche/simple).',
    categoryId: 'conjugaison',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "« Je mange » est au : ___.", options: ['présent', 'passé composé', 'futur', 'imparfait'], correctIndex: 0, explanation: "je mange = présent." },
      { q: "« J\u2019ai mangé » est au : ___.", options: ['passé composé', 'présent', 'futur', 'plus-que-parfait'], correctIndex: 0, explanation: "avoir + participe = passé composé." },
      { q: "« Je vais manger » est au : ___.", options: ['futur proche', 'passé composé', 'présent', 'imparfait'], correctIndex: 0, explanation: "aller + infinitif = futur proche." },
      { q: "« Je mangerai » est au : ___.", options: ['futur simple', 'présent', 'passé composé', 'imparfait'], correctIndex: 0, explanation: "mangerai = futur simple." },
      { q: "Phrase au présent : ___.", options: ['Il écoute la radio', 'Il a écouté la radio', 'Il écoutera la radio', 'Il écoutait la radio'], correctIndex: 0, explanation: "il écoute = présent." },
      { q: "Phrase au passé composé : ___.", options: ['Il a écouté la radio', 'Il écoute la radio', 'Il écoutera la radio', 'Il écouterait la radio'], correctIndex: 0, explanation: "a écouté = passé composé." },
      { q: "Phrase au futur : ___.", options: ['Il écoutera la radio', 'Il écoute la radio', 'Il a écouté la radio', 'Il écoutait la radio'], correctIndex: 0, explanation: "écoutera = futur simple." },
      { q: "La marque du passé composé : l\u2019auxiliaire + ___.", options: ['participe passé', 'infinitif', 'adjectif', 'adverbe'], correctIndex: 0, explanation: "auxiliaire + participe passé." },
      { q: "La marque du futur simple : terminaison ___.", options: ['-ai, -as, -a, -ons…', '-e, -es, -e…', '-ais, -ait…', '-é'], correctIndex: 0, explanation: "futur : je parlerai, tu parleras…" },
      { q: "« Demain, nous ___ » (partir, futur simple) : ___.", options: ['partirons', 'partons', 'sommes partis', 'partions'], correctIndex: 0, explanation: "futur : nous partirons."
      }
    ]
  },
  {
    id: 't39-prepositions-temps',
    name: 'Il y a, pendant, depuis, dans',
    description: 'Les prépositions de temps : il y a, pendant, depuis, dans.',
    categoryId: 'grammaire',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Il est parti ___. (il y a un certain temps) → «___ trois jours ».", options: ["il y a", 'pendant', 'depuis', 'dans'], correctIndex: 0, explanation: "il y a + durée passée : il y a trois jours." },
      { q: "Il pleut ___ trois jours. (depuis un moment, toujours d\u2019actualité)", options: ['depuis', 'il y a', 'pendant', 'dans'], correctIndex: 0, explanation: "depuis + durée + résultat actuel." },
      { q: "J\u2019ai travaillé ___ deux heures. (durée dans le passé)", options: ['pendant', 'il y a', 'depuis', 'dans'], correctIndex: 0, explanation: "pendant + durée = pendant la durée." },
      { q: "Je pars ___ deux heures. (dans le futur)", options: ['dans', 'il y a', 'depuis', 'pendant'], correctIndex: 0, explanation: "dans + futur : dans deux heures." },
      { q: "___ qu\u2019il est parti, tout a changé. (depuis lors)", options: ['Depuis', 'Il y a', 'Pendant', 'Dans'], correctIndex: 0, explanation: "depuis que + phrase." },
      { q: "Il habite ici ___ 2010. (depuis une date)", options: ['depuis', 'il y a', 'pendant', 'dans'], correctIndex: 0, explanation: "depuis + date." },
      { q: "___ un an, il a déménagé.", options: ["Il y a", 'Depuis', 'Pendant', 'Dans'], correctIndex: 0, explanation: "il y a + durée passée." },
      { q: "Elle va partir ___ cinq minutes.", options: ['dans', 'il y a', 'depuis', 'pendant'], correctIndex: 0, explanation: "dans + futur proche." },
      { q: "Nous avons discuté ___ une heure.", options: ['pendant', 'depuis', 'il y a', 'dans'], correctIndex: 0, explanation: "pendant + durée." },
      { q: "Il travaille dans cette entreprise ___ janvier.", options: ['depuis', 'il y a', 'pendant', 'dans'], correctIndex: 0, explanation: "depuis + date de début (toujours en cours)."
      }
    ]
  },
  {
    id: 't40-interrogation',
    name: 'L\u2019interrogation',
    description: 'où, quand, comment, combien, pourquoi, que, qui, quel(s), quelle(s)…',
    categoryId: 'grammaire',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "___ tu vas ? (lieu) — À Paris.", options: ['Où', 'Quand', 'Comment', 'Pourquoi'], correctIndex: 0, explanation: "où = lieu." },
      { q: "___ viens-tu ? (moment) — Demain.", options: ['Quand', 'Où', 'Comment', 'Qui'], correctIndex: 0, explanation: "quand = temps." },
      { q: "___ ça va ? (manière)", options: ['Comment', 'Où', 'Quand', 'Combien'], correctIndex: 0, explanation: "comment = manière." },
      { q: "___ coûte ce livre ? (prix/nombre)", options: ['Combien', 'Pourquoi', 'Où', 'Quand'], correctIndex: 0, explanation: "combien = quantité/prix." },
      { q: "___ es-tu en retard ? (cause)", options: ['Pourquoi', 'Où', 'Quand', 'Quel'], correctIndex: 0, explanation: "pourquoi = cause." },
      { q: "___ c\u2019est ? (chose)", options: ['Qu\u2019est-ce que', 'Qui est-ce', 'Où', 'Combien'], correctIndex: 0, explanation: "qu\u2019est-ce que = quoi." },
      { q: "___ c\u2019est ? (personne)", options: ['Qui', 'Que', 'Quoi', 'Combien'], correctIndex: 0, explanation: "qui = personne." },
      { q: "___ livre préfères-tu ? (quel)", options: ['Quel', 'Quelle', 'Qui', 'Que'], correctIndex: 0, explanation: "quel + nom masculin singulier." },
      { q: "___ ville habites-tu ? (fem.)", options: ['Quelle', 'Quel', 'Quels', 'Quelles'], correctIndex: 0, explanation: "quelle + ville (fém. sing.)." },
      { q: "___ sont tes amis ? (masc. plur.)", options: ['Quels', 'Quelles', 'Quel', 'Quelle'], correctIndex: 0, explanation: "quels + pluriel masculin." },
      { q: "___ heures ouvre la banque ?", options: ['À quelle', 'Quel', 'Quelle', 'Quels'], correctIndex: 0, explanation: "à quelle heure." },
      { q: "___ âge as-tu ?", options: ['Quel', 'Quelle', 'Quels', 'Combien'], correctIndex: 0, explanation: "quel âge." },
      { q: "___ veux-tu ? (une chose)", options: ['Que', 'Qui', 'Où', 'Quand'], correctIndex: 0, explanation: "que veux-tu ? = quoi." },
      { q: "___ est-ce que vous faites ce soir ?", options: ['Qu\u2019', 'Qui', 'Où', 'Pourquoi'], correctIndex: 0, explanation: "qu\u2019est-ce que." },
      { q: "___ peut t\u2019aider ? (une personne)", options: ['Qui', 'Que', 'Quoi', 'Où'], correctIndex: 0, explanation: "qui peut… ?"
      }
    ]
  }
]
