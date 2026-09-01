// Programme thématique — thèmes 65 à 69 (hypothèse, articulateurs, conjonctions) + thème 70 traductions

export const themesB1c = [
  {
    id: 't65-conditionnelles',
    name: 'Les propositions conditionnelles (si)',
    description: 'Si + présent → futur ; si + imparfait → conditionnel ; si + plus-que-parfait → conditionnel passé.',
    categoryId: 'grammaire',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Si + présent → ___ (conséquence).", options: ['futur', 'imparfait', 'subjonctif', 'impératif'], correctIndex: 0, explanation: "si tu viens, je viendrai." },
      { q: "Si tu viens, je ___ (venir) aussi.", options: ['viendrai', 'viens', 'venais', 'vienne'], correctIndex: 0, explanation: "si + présent → futur : viendrai." },
      { q: "Si j\u2019avais le temps, je ___ (voyager).", options: ['voyagerais', 'voyagerai', 'voyage', 'voyageais'], correctIndex: 0, explanation: "si + imparfait → conditionnel : voyagerais." },
      { q: "Si j\u2019avais su, je ___ (être) venu.", options: ['serais', 'suis', 'étais', 'serai'], correctIndex: 0, explanation: "si + pqp → conditionnel passé : serais." },
      { q: "Si elle est libre, elle ___ (venir).", options: ['viendra', 'viendrait', 'vient', 'venait'], correctIndex: 0, explanation: "si + présent → futur : viendra." },
      { q: "Si on ___ (manger) mieux, on serait en forme.", options: ['mangeait', 'mangeons', 'manger', 'mange'], correctIndex: 0, explanation: "si + imparfait : mangeait." },
      { q: "La structure réelle : si + présent + futur. La structure hypothétique : si + imparfait + ___.", options: ['conditionnel présent', 'futur', 'subjonctif', 'impératif'], correctIndex: 0, explanation: "conditionnel présent."
      }
    ]
  },
  {
    id: 't66-articulateurs',
    name: 'Les articulateurs du discours',
    description: 'D\u2019abord, ensuite, enfin ; mais, or ; en effet, pourtant.',
    categoryId: 'expression',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Pour ordonner une suite : ___.", options: ['d\u2019abord, ensuite, enfin', 'mais, or', 'car, puisque', 'alors que'], correctIndex: 0, explanation: "articulateurs d\u2019ordre." },
      { q: "___ nous allons au musée. (introduction)", options: ['D\u2019abord', 'Enfin', 'Pourtant', 'En effet'], correctIndex: 0, explanation: "d\u2019abord (premier élément)." },
      { q: "Il pleut, ___ on sort quand même. (opposition)", options: ['pourtant', 'donc', 'et', 'car'], correctIndex: 0, explanation: "pourtant (opposition)." },
      { q: "Il est intelligent, ___ il travaille. (raison)", options: ['en effet', 'mais', 'ou', 'donc'], correctIndex: 0, explanation: "en effet (justification)." },
      { q: "Je voulais venir, ___ j\u2019étais malade. (opposition)", options: ['mais', 'donc', 'et', 'car'], correctIndex: 0, explanation: "mais (opposition)." },
      { q: "L\u2019articulateur de conclusion : ___.", options: ['enfin / en conclusion', 'd\u2019abord', 'ensuite', 'cependant'], correctIndex: 0, explanation: "enfin, en conclusion."
      }
    ]
  },
  {
    id: 't67-prepositions-temps',
    name: 'Les prépositions de temps',
    description: 'Dans, pendant, depuis, il y a, à, en.',
    categoryId: 'grammaire',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Je pars ___ deux jours. (dans le futur, d\u2019ici)", options: ['dans', 'pendant', 'depuis', 'il y a'], correctIndex: 0, explanation: "dans + durée future." },
      { q: "J\u2019habite ici ___ 2010. (depuis quand)", options: ['depuis', 'dans', 'pendant', 'il y a'], correctIndex: 0, explanation: "depuis (point de départ)." },
      { q: "J\u2019ai attendu ___ deux heures. (durée)", options: ['pendant', 'il y a', 'dans', 'sous'], correctIndex: 0, explanation: "pendant (durée)." },
      { q: "Il est parti ___ deux heures. (il y a, moment)", options: ['il y a', 'pendant', 'depuis', 'dans'], correctIndex: 0, explanation: "il y a + période révolue." },
      { q: "Rendez-vous ___ trois heures. (futur)", options: ['dans', 'pendant', 'depuis', 'il y a'], correctIndex: 0, explanation: "dans (future)." },
      { q: "Elle travaille ___ ce matin. (depuis quand)", options: ['depuis', 'pendant', 'il y a', 'dans'], correctIndex: 0, explanation: "depuis ce matin (continuité)." },
      { q: "Nous sommes restés ___ une semaine. (durée)", options: ['pendant', 'dans', 'depuis', 'il y a'], correctIndex: 0, explanation: "pendant une semaine."
      }
    ]
  },
  {
    id: 't68-conjonctions',
    name: 'Les conjonctions de subordination',
    description: 'Que, quand, lorsque, si, parce que, bien que, pour que.',
    categoryId: 'grammaire',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Une conjonction de subordination introduit : ___.", options: ['une subordonnée', 'un nom', 'un adjectif', 'un adverbe'], correctIndex: 0, explanation: "elle lie une subordonnée à la principale." },
      { q: "Je pense ___ tu as raison. (conjonction)", options: ['que', 'qui', 'dont', 'où'], correctIndex: 0, explanation: "que (subordonnée complétive)." },
      { q: "Je viendrai ___ j\u2019aurai fini.", options: ['quand', 'qui', 'dont', 'où'], correctIndex: 0, explanation: "quand (temporelle)." },
      { q: "___ tu sois sage, tu auras un cadeau. (condition)", options: ['Si', 'Que', 'Qui', 'Dont'], correctIndex: 0, explanation: "si (conditionnelle)." },
      { q: "Bien ___ il fasse froid, on sort. (concession)", options: ['que', 'qui', 'quand', 'où'], correctIndex: 0, explanation: "bien que (concession + subjonctif)." },
      { q: "La subordonnée relative commence souvent par : ___.", options: ['qui, que, dont, où', 'si, quand, parce que', 'et, ou, mais', 'un verbe'], correctIndex: 0, explanation: "pronoms relatifs." }
    ]
  },
  {
    id: 't69-hypothese',
    name: "L'expression de l'hypothèse",
    description: 'Si, au cas où, à condition que, en cas de, sans + infinitif.',
    categoryId: 'expression',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "___, appelle-moi. (hypothèse, si jamais)", options: ['Au cas où', 'À condition que', 'En cas de', 'Sans'], correctIndex: 0, explanation: "au cas où (éventualité)." },
      { q: "Au cas où tu ___ un problème. (au cas où + conditionnel)", options: ['aurais', 'as', 'avais', 'aies'], correctIndex: 0, explanation: "au cas où + conditionnel : aurais." },
      { q: "___ pluie, annulons. (si + nom) → en cas de", options: ['En cas de', 'Au cas où', 'À condition', 'Sans'], correctIndex: 0, explanation: "en cas de + nom." },
      { q: "Tu réussiras ___ tu travailles. (condition)", options: ['à condition que', 'en cas de', 'au cas où', 'bien que'], correctIndex: 0, explanation: "à condition que + subjonctif." },
      { q: "Sans ___ (travailler), on ne réussit pas.", options: ['travailler', 'travaille', 'travaillé', 'travailleur'], correctIndex: 0, explanation: "sans + infinitif." },
      { q: "L\u2019hypothèse irréelle : si + plus-que-parfait + ___.", options: ['conditionnel passé', 'futur', 'présent', 'subjonctif'], correctIndex: 0, explanation: "si j\u2019avais su, j\u2019aurais…"
      }
    ]
  },
  {
    id: 't70-traduction-a1',
    name: 'Traduction A1',
    description: 'Traduire des phrases simples du français vers la langue apprenante (niveau A1).',
    categoryId: 'traduction',
    level: 'A1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "« Bonjour, comment allez-vous ? » — Qu\u2019est-ce que cela signifie ?", options: ['Bonjour, comment allez-vous ?', 'Bonsoir, qui êtes-vous ?', 'Salut, où allez-vous ?', 'Bonjour, que voulez-vous ?'], correctIndex: 0, explanation: "Salutation quotidienne polie." },
      { q: "« Je m\u2019appelle Marie. » — Marie est ___.", options: ['mon prénom', 'mon nom de famille', 'mon adresse', 'mon âge'], correctIndex: 0, explanation: "« je m\u2019appelle » = mon prénom." },
      { q: "« Où habitez-vous ? » — Qu\u2019est-ce qu\u2019on vous demande ?", options: ['votre lieu de résidence', 'votre âge', 'votre goût', 'votre métier'], correctIndex: 0, explanation: "où habitez-vous = lieu de résidence." },
      { q: "Traduisez un merci en français : ___.", options: ['merci', 'bonjour', 'au revoir', 's\u2019il vous plaît'], correctIndex: 0, explanation: "merci = thank you." },
      { q: "« Je voudrais un café, s\u2019il vous plaît. » — C\u2019est : ___.", options: ['une demande polie', 'un ordre', 'une question', 'une excuse'], correctIndex: 0, explanation: "demande polie." },
      { q: "« Combien ça coûte ? » — On parle de : ___.", options: ['prix', 'temps', 'personne', 'lieu'], correctIndex: 0, explanation: "combien ça coûte = prix." },
      { q: "« Au revoir » se dit quand on ___.", options: ['part', 'arrive', 'mange', 'dort'], correctIndex: 0, explanation: "au revoir = à la séparation."
      }
    ]
  },
  {
    id: 't70-traduction-a2',
    name: 'Traduction A2',
    description: 'Traduire des phrases simples du français vers la langue apprenante (niveau A2).',
    categoryId: 'traduction',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "« Quel temps fait-il ? » — On demande : ___.", options: ['la météo', 'l\u2019heure', 'la date', 'le prix'], correctIndex: 0, explanation: "le temps qu\u2019il fait = la météo." },
      { q: "« J\u2019ai faim. » signifie : ___.", options: ["j'ai besoin de manger", 'j\u2019ai soif', 'j\u2019ai sommeil', 'j\u2019ai chaud'], correctIndex: 0, explanation: "avoir faim = besoin de manger." },
      { q: "« Je préfère le thé au café. » — Lequel je préfère ?", options: ['le thé', 'le café', 'le chocolat', 'le lait'], correctIndex: 0, explanation: "préférer le thé au café = thé > café." },
      { q: "« Il est en train de manger. » signifie qu\u2019il ___.", options: ["est en train de manger (en ce moment)", 'a mangé hier', 'mangera demain', 'n\u2019aime pas manger'], correctIndex: 0, explanation: "présent continu." },
      { q: "« Je vais partir demain. » — Quand ?", options: ['demain', 'hier', 'aujourd\u2019hui', 'maintenant'], correctIndex: 0, explanation: "demain (futur proche)." },
      { q: "« Il fait beau aujourd\u2019hui. » signifie : ___.", options: ['il fait beau / le temps est agréable', 'il pleut', 'il neige', 'il fait froid'], correctIndex: 0, explanation: "il fait beau = beau temps." }
    ]
  },
  {
    id: 't70-traduction-b1',
    name: 'Traduction B1',
    description: 'Traduire des phrases du français vers la langue apprenante (niveau B1).',
    categoryId: 'traduction',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "« Si j\u2019avais le temps, je voyagerais. » — Il s\u2019agit : ___.", options: ['d\u2019une hypothèse non réalisée', 'd\u2019un fait certain', 'd\u2019un ordre', 'd\u2019une habitude'], correctIndex: 0, explanation: "si + imparfait → conditionnel : hypothèse." },
      { q: "« Il aurait pu venir. » — il exprime : ___.", options: ['un regret / possibilité passée', 'un futur proche', 'une certitude', 'un ordre'], correctIndex: 0, explanation: "conditionnel passé = possibilité/regret." },
      { q: "« Bien qu\u2019il pleuve, nous sortons. » — Introduit : ___.", options: ['une concession', 'une cause', 'une conséquence', 'un but'], correctIndex: 0, explanation: "bien que = concession + subjonctif." },
      { q: "« Le livre que je lis est intéressant. » — « que » remplace : ___.", options: ['COD', 'sujet', 'lieu', 'temps'], correctIndex: 0, explanation: "que = pronom relatif COD." },
      { q: "« Il a dit qu\u2019il viendrait. » — Le verbe au conditionnel exprime : ___.", options: ['un futur dans le passé', 'un présent', 'un regret', 'un ordre'], correctIndex: 0, explanation: "futur dans le passé (discours indirect)." },
      { q: "« En travaillant, tu réussiras. » — « en travaillant » = ___.", options: ['gérondif (manière)', 'participe passé', 'infinitif', 'impératif'], correctIndex: 0, explanation: "en + participe présent = gérondif."
      }
    ]
  },
  {
    id: 't70-traduction-b2',
    name: 'Traduction B2',
    description: 'Traduire des phrases complexes du français vers la langue apprenante (niveau B2).',
    categoryId: 'traduction',
    level: 'B2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "« Il aurait été préférable qu\u2019elle vînt. » — Mode employé après « il aurait été préférable que » : ___.", options: ['subjonctif', 'indicatif', 'conditionnel', 'impératif'], correctIndex: 0, explanation: "préférable que + subjonctif." },
      { q: "« Quoiqu\u2019il fasse froid, il sortit. » — « quoique » exprime : ___.", options: ['concession', 'cause', 'conséquence', 'but'], correctIndex: 0, explanation: "quoique = concession + subjonctif." },
      { q: "« Il prit la décision qu\u2019il jugeait la plus sage. » — Le verbe au passé simple rapporte : ___.", options: ['un fait ponctuel du récit', 'une habitude', 'une action en cours', 'un futur'], correctIndex: 0, explanation: "passé simple = fait ponctuel." },
      { q: "« N\u2019eût été son aide, j\u2019aurais échoué. » — Exprime : ___.", options: ['une hypothèse contraire au réel (sans son aide)', 'un fait certain', 'une question', 'un ordre'], correctIndex: 0, explanation: "n\u2019eût été = sans… (contrefactuelle)." },
      { q: "« Il n\u2019en demeure pas moins que… » signifie : ___.", options: ['il reste vrai que…', 'il est faux que…', 'je doute que…', 'il est certain que…'], correctIndex: 0, explanation: "il n\u2019en demeure pas moins que = cela reste vrai." },
      { q: "« Soit dit en passant » introduit : ___.", options: ['une remarque au passage', 'une conclusion', 'un exemple', 'une cause'], correctIndex: 0, explanation: "soit dit en passant = au passage."
      }
    ]
  }
]
