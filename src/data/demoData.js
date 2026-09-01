// Demo data — real French quiz content used when no live backend is configured.
// This mirrors what would live in the database (see supabase/schema.sql).

export const demoCategories = [
  { id: 'grammaire', name: 'Grammaire', color: '#6366f1', icon: '✏️' },
  { id: 'vocabulaire', name: 'Vocabulaire', color: '#10b981', icon: '📚' },
  { id: 'conjugaison', name: 'Conjugaison', color: '#f59e0b', icon: '🔄' },
  { id: 'vocabulaire-basique', name: 'Vocabulaire de base', color: '#14b8a6', icon: '🔤' },
  { id: 'articles', name: 'Articles et prépositions', color: '#ec4899', icon: '🔗' },
  { id: 'expression', name: 'Expression et communication', color: '#f97316', icon: '💬' },
  { id: 'traduction', name: 'Traduction', color: '#06b6d4', icon: '🌐' }
]

export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1']

// Each question: text, options, correctIndex, explanation
export const demoQuestions = {
  'test-present': [
    {
      q: "Je ___ (manger) une pomme.",
      options: ['mange', 'manges', 'mangent', 'mangeons'],
      correctIndex: 0,
      explanation: "Avec « Je », on conjugue à la 1e personne du singulier : je mange."
    },
    {
      q: "Tu ___ (parler) français.",
      options: ['parle', 'parles', 'parlons', 'parlez'],
      correctIndex: 1,
      explanation: "Avec « Tu », on utilise la 2e personne du singulier : tu parles."
    },
    {
      q: "Nous ___ (finir) nos devoirs.",
      options: ['finissons', 'finissez', 'finis', 'finissent'],
      correctIndex: 0,
      explanation: "« Nous » se conjugue en -ons : nous finissons."
    },
    {
      q: "Ils ___ (regarder) la télévision.",
      options: ['regardons', 'regardent', 'regarderez', 'regarde'],
      correctIndex: 1,
      explanation: "« Ils » (3e personne du pluriel) se conjugue en -ent : ils regardent."
    },
    {
      q: "Elle ___ (avoir) deux frères.",
      options: ['a', 'as', 'avons', 'ont'],
      correctIndex: 0,
      explanation: "Le verbe avoir à la 3e personne du singulier : elle a."
    },
    {
      q: "Vous ___ (être) très gentils.",
      options: ['êtes', 'est', 'sont', 'serons'],
      correctIndex: 0,
      explanation: "« Vous » avec le verbe être se conjugue en « êtes »."
    },
    {
      q: "Nous ___ (aller) au marché samedi.",
      options: ['allons', 'allez', 'vont', 'allâmes'],
      correctIndex: 0,
      explanation: "« Nous » avec aller se conjugue en « allons »."
    },
    {
      q: "Je ___ (faire) mes exercices.",
      options: ['fais', 'fait', 'faisons', 'ferez'],
      correctIndex: 0,
      explanation: "« Je » avec faire se conjugue en « fais »."
    },
    {
      q: "Les enfants ___ (jouer) dans le parc.",
      options: ['joue', 'jouent', 'jouons', 'jouerez'],
      correctIndex: 1,
      explanation: "Le sujet « les enfants » est pluriel, donc : ils jouent."
    },
    {
      q: "Mon père ___ (lire) le journal.",
      options: ['lit', 'lisent', 'lis', 'lirons'],
      correctIndex: 0,
      explanation: "« Il » avec lire se conjugue en « lit »."
    },
    // Questions additionnelles - 20 au total
    {
      q: "Tu ___ (vivre) à Paris.",
      options: ['vis', 'vises', 'vit', 'vive'],
      correctIndex: 1,
      explanation: "Avec « Tu », on conjugue à la 2e personne du singulier : tu vis."
    },
    {
      q: "Nous ___ (habiter) près de la mer.",
      options: ['habitons', 'habitez', 'habitons', 'habitent'],
      correctIndex: 0,
      explanation: "« Nous » se conjugue en -ons : nous habitons."
    },
    {
      q: "Vous ___ (vouloir) venir ce soir?",
      options: ['voulez', 'voua', 'voulons', 'veux'],
      correctIndex: 0,
      explanation: "Avec « Vous », on utilise la 2e personne du pluriel: vous voulez."
    },
    {
      q: "Ils ___ (parler) anglais couramment.",
      options: ['parlent', 'parle', 'parler', 'parlais'],
      correctIndex: 0,
      explanation: "« Ils » (3e personne du pluriel) : ils parlent."
    },
    {
      q: "Elles ___ (manger) ensemble.",
      options: ['mangent', 'mange', 'mangeront', 'mangeais'],
      correctIndex: 0,
      explanation: "« Elles » (3e personne du pluriel féminin) : elles mangent."
    },
    {
      q: "On ___ (pouvoir) aider.",
      options: ['peut', 'peut-on', 'peutons', 'peutent'],
      correctIndex: 0,
      explanation: "« On » avec pouvoir : on peut."
    },
    {
      q: "Je ___ (devoir) terminer ce travail.",
      options: ['dois', 'doit', 'devons', 'doit-on'],
      correctIndex: 0,
      explanation: "« Je » avec devoir: je dois."
    },
    {
      q: "Tu ___ (vouloir) m'aider?",
      options: ['veux', 'veux-tu', 'veuxons', 'veut'],
      correctIndex: 0,
      explanation: "« Tu » avec vouloir: tu veux."
    },
    {
      q: "Nous ___ (pouvoir) y aller.",
      options: ['pouvons', 'peuvent', 'peut', 'pouvoir'],
      correctIndex: 0,
      explanation: "« Nous » avec pouvoir: nous pouvons."
    },
    {
      q: "Ils ___ (devoir) partir tôt.",
      options: ['doivent', 'doit', 'devons', 'doit-on'],
      correctIndex: 0,
      explanation: "« Ils » avec devoir: ils doivent."
    }
  ],
  'test-passe-compose': [
    {
      q: "Hier, je ___ (aller) au cinéma.",
      options: ['suis allé', 'vais', 'suis allée', 'allais'],
      correctIndex: 0,
      explanation: "« Aller » se conjugue au passé composé avec l'auxiliaire être : je suis allé."
    },
    {
      q: "Elle ___ (manger) une pizza.",
      options: ['a mangé', 'mangé', 'est mangée', 'a mange'],
      correctIndex: 0,
      explanation: "« Manger » prend l'auxiliaire avoir : elle a mangé."
    },
    {
      q: "Nous ___ (partir) très tôt.",
      options: ['sommes partis', 'avons parti', 'sommes parti', 'étions déjà parti'],
      correctIndex: 0,
      explanation: "« Partir » prend être ; avec « nous » on s'accorde : nous sommes partis."
    },
    {
      q: "Ils ___ (finir) le travail.",
      options: ['ont fini', 'sont finis', 'ont finit', 'finirent'],
      correctIndex: 0,
      explanation: "« Finir » prend avoir au passé composé: ils ont fini."
    },
    {
      q: "Tu ___ (voir) ce film ?",
      options: ['as vu', 'es vu', 'a vu', 'vois'],
      correctIndex: 0,
      explanation: "« Voir » prend avoir : tu as vu. Le participe passé « vu » ne s'accorde pas ici (COD après le verbe)."
    },
    {
      q: "On utilise le passé composé pour…",
      options: [
        "parler d'une action terminée dans le passé",
        "parler d'une action en cours",
        'parler du futur',
        'donner un ordre'
      ],
      correctIndex: 0,
      explanation: "Le passé composé exprime une action achevée dans le passé."
    },
    {
      q: "Elle ___ (venir) nous voir.",
      options: ['est venue', 'a venu', 'est venu', 'venait'],
      correctIndex: 0,
      explanation: "« Venir » prend être et s'accorde : elle est venue."
    },
    {
      q: "Nous ___ (prendre) le train.",
      options: ['avons pris', 'sommes pris', 'avons prit', 'prenions'],
      correctIndex: 0,
      explanation: "« Prendre »prend avoir : nous avons pris."
    },
    {
      q: "J'___ (écrire) une lettre.",
      options: ['ai écrit', 'suis écrit', 'ai écrite', 'écrivais'],
      correctIndex: 0,
      explanation: "« Écrire » prend avoir : j'ai écrit. Accord possible si le COD est placé avant."
    },
    {
      q: "Completez : « Il ___ (descendre) les escaliers ». (auxiliaire avoir)",
      options: ['a descendu', 'est descendu', 'descendait', 'descend'],
      correctIndex: 0,
      explanation: "Avec un COD direct (« les escaliers »), « descendre » prend avoir: il a descendu."
    },
    // Questions additionnelles - 20 au total
    {
      q: "Elle ___ (prendre) le train.",
      options: ['a pris', 'a prise', 'a prit', 'prend'],
      correctIndex: 0,
      explanation: "« Prendre »prend avoir: elle a pris."
    },
    {
      q: "Nous ___ (mettre) les clés.",
      options: ['avons mis', 'sommes mis', 'avons mis', 'mettrons'],
      correctIndex: 0,
      explanation: "« Mettre »prend avoir: nous avons mis."
    },
    {
      q: "Ils ___ (revenir) hier.",
      options: ['sont revenus', 'ont revenus', 'ont revenu', 'reviennent'],
      correctIndex: 0,
      explanation: "« Revenir »prend être:ils sont revenus."
    },
    {
      q: "Tu ___ (connaître) cette personne?",
      options: ['connais', 'connaît', 'connaissons', 'connaissent'],
      correctIndex: 0,
      explanation: "Savoir vs connaître - « tu connais »."
    },
    {
      q: "Elle ___ (rire) toute la soirée.",
      options: ['a ri', 'a rit', 'a ri', 'rit'],
      correctIndex: 0,
      explanation: "« Rire »prend avoir: elle a ri."
    },
    {
      q: "On ___ (pouvoir) venir?",
      options: ['peut-on', 'peut', 'peuvent', 'peutons'],
      correctIndex: 0,
      explanation: "« On »avec pouvoir: on peut."
    },
    {
      q: "Je ___ (devoir) partir.",
      options: ['dois', 'doit', 'devons', 'font'],
      correctIndex: 0,
      explanation: "« Je »avec devoir: je dois."
    },
    {
      q: "Vous ___ (savoir) la réponse?",
      options: ['savez', 'sais', 'savez', 'connaissez'],
      correctIndex: 0,
      explanation: "« Vous »avec savoir: vous savez."
    },
    {
      q: "Ils ___ (pouvoir) faire cela?",
      options: ['peuvent', 'peut', 'peuvent-on', 'peut-on'],
      correctIndex: 0,
      explanation: "« Ils »avec pouvoir: ils peuvent."
    },
    {
      q: "Elle ___ (devoir) s'excuser.",
      options: ['doit', 'doit-on', 'doivent', 'doit s'excuser'],
      correctIndex: 0,
      explanation: "« Elle »avec devoir: elle doit."
    }
  ],
  'test-vocabulaire-maison': [
    {
      q: "Comment dit-on « home » en français ?",
      options: ['maison', 'école', 'voiture', 'chien'],
      correctIndex: 0,
      explanation: "« House / home » se traduit par « la maison »."
    },
    {
      q: "Comment dit-on « kitchen » en français ?",
      options: ['la cuisine', 'la chambre', 'le salon', 'le jardin'],
      correctIndex: 0,
      explanation: "« Kitchen » = « la cuisine »."
    },
    {
      q: "Comment dit-on « bathroom » en français ?",
      options: ['la salle de bains', 'le garage', "l'escalier", 'le toit'],
      correctIndex: 0,
      explanation: "« Bathroom » = « la salle de bains »."
    },
    {
      q: "Comment dit-on « window » en français ?",
      options: ['la fenêtre', 'la porte', 'le mur', 'le sol'],
      correctIndex: 0,
      explanation: "« Window » = « la fenêtre »."
    },
    {
      q: "Comment dit-on « chair » en français ?",
      options: ['la chaise', 'la table', 'le lit', 'le canapé'],
      correctIndex: 0,
      explanation: "« Chair » = « la chaise »."
    },
    {
      q: "Comment dit-on « bed » en français ?",
      options: ['le lit', 'l' + 'armoire', 'le tapis', 'le miroir'],
      correctIndex: 0,
      explanation: "« Bed » = « le lit »."
    },
    {
      q: "Comment dit-on « garden » en français ?",
      options: ['le jardin', 'le garage', 'la cave', 'le balcon'],
      correctIndex: 0,
      explanation: "« Garden » = « le jardin »."
    },
    {
      q: "Comment dit-on « staircase » en français ?",
      options: ['l' + 'escalier', 'l' + 'étage', 'la porte', 'le toit'],
      correctIndex: 0,
      explanation: "« Staircase » = « l'escalier »."
    },
    {
      q: "Comment dit-on « living room » en français ?",
      options: ['le salon', 'la cuisine', 'la salle à manger', 'le couloir'],
      correctIndex: 0,
      explanation: "« Living room » = « le salon »."
    },
    {
      q: "Comment dit-on « wall » en français ?",
      options: ['le mur', 'le toit', 'la porte', 'la clé'],
      correctIndex: 0,
      explanation: "« Wall » = « le mur »."
    },
    // Questions additionnelles - 20 au total
    {
      q: "Comment dit-on « roof » en français ?",
      options: ['le toit', 'le mur', 'la fenêtre', 'la porte'],
      correctIndex: 0,
      explanation: "« Roof » = « le toit »."
    },
    {
      q: "Comment dit-on « door » en français ?",
      options: ['la porte', 'la fenêtre', 'le mur', 'le sol'],
      correctIndex: 0,
      explanation: "« Door » = « la porte »."
    },
    {
      q: "Comment dit-on « garden » en français ?",
      options: ['le jardin', 'le garage', 'la cave', 'le balcon'],
      correctIndex: 0,
      explanation: "« Garden » = « le jardin ». (répétition pour mémorisation)"
    },
    {
      q: "Comment dit-on « garage » en français ?",
      options: ['le garage', 'le jardin', 'le toit', 'la cave'],
      correctIndex: 0,
      explanation: "« Garage » = « le garage »."
    },
    {
      q: "Comment dit-on « basement » en français ?",
      options: ['la cave', 'le grenier', 'le toit', 'le jardin'],
      correctIndex: 0,
      explanation: "« Basement » = « la cave »."
    },
    {
      q: "Comment dit-on « garden gate » en français ?",
      options: 'la porte du jardin',
      correctIndex: 0,
      explanation: "« Garden gate » = « la porte du jardin »."
    },
    {
      q: "Comment dit-on « garden hose » en français ?",
      options: 'le tuyau d\'arrosage',
      correctIndex: 0,
      explanation: "« Garden hose » = « le tuyau d\'arrosage »."
    },
    {
      q: "Comment dit-on « mailbox » en français ?",
      options: 'la boîte aux lettres',
      correctIndex: 0,
      explanation: "« Mailbox » = « la boîte aux lettres »."
    }
  ],
  'test-articles': [
    {
      q: "___ chat dort sur le canapé. (le chat est déjà connu)",
      options: ['Le', 'Un', 'Des', 'Une'],
      correctIndex: 0,
      explanation: "On utilise l'article défini « le » pour un élément déjà connu."
    },
    {
      q: "J'ai acheté ___ pommes au marché.",
      options: ['des', 'les', 'un', 'la'],
      correctIndex: 0,
      explanation: "« Des » est l'article indéfini pluriel."
    },
    {
      q: "Elle est ___ médecin.",
      options: ['médecin', 'un médecin', 'une médecin', 'des médecin'],
      correctIndex: 1,
      explanation: "Pour une profession sans déterminant après « être », on peut mettre « un »: elle est un médecin (ou « elle est médecin »)."
    },
    {
      q: "___ eau est fraîche. (parler de toute l'eau en général)",
      options: ["L'", 'La', 'Le', 'Les'],
      correctIndex: 0,
      explanation: "« Eau » est féminin et commence par une voyelle, donc : l'eau."
    },
    {
      q: "Completez : « J'aime ___ chocolat. » (en général)",
      options: ['le', 'un', 'des', 'les'],
      correctIndex: 0,
      explanation: "Pour parler de manière générale, on utilise l'article défini: j'aime le chocolat."
    },
    {
      q: "___ enfants jouent dans la cour. (des enfants précis)",
      options: ['Les', 'Des', 'Un', 'Le'],
      correctIndex: 0,
      explanation: "« Les » avec un groupe précis déjà identifié."
    },
    {
      q: "Je voudrais ___ café, s'il vous plaît.",
      options: ['un', 'le', 'des', 'la'],
      correctIndex: 0,
      explanation: "« Un » article indéfini pour une quantité non précise d'une unité."
    },
    {
      q: "Completez : « ___ amis de Paul » (les amis en général de Paul).",
      options: ['Les', 'Des', 'Un', 'Le'],
      correctIndex: 0,
      explanation: "Possession/général: « les amis de Paul »."
    },
    {
      q: "Il prend ___ bus tous les matins.",
      options: ['le', 'un', 'des', 'les'],
      correctIndex: 0,
      explanation: "« Le » défini pour une habitude régulière précise."
    },
    {
      q: "Completez : « C'est ___ très belle journée. »",
      options: ['une', 'un', 'les', 'des'],
      correctIndex: 0,
      explanation: "« Journée » est féminin singulier: une belle journée."
    },
    // Questions additionnelles - 20 au total
    {
      q: "___ livre est intéressant. (vous connaissez le livre)",
      options: ['Le', 'Un', 'Des', 'Une'],
      correctIndex: 0,
      explanation: "Utilisation de l'article défini pour un élément connu."
    },
    {
      q: "J'ai trouvé ___ stylo par terre.",
      options: ['un', 'une', 'des', 'le'],
      correctIndex: 0,
      explanation: "Article indéfini singulier masculin: « un stylo »."
    },
    {
      q: "Elle boit ___ lait tous les matins.",
      options: ['le', 'la', 'un', 'des'],
      correctIndex: 0,
      explanation: "« Lait » est masculin et commence par consonne: le lait."
    },
    {
      q: "Nous avons visité ___ château l'année dernière.",
      options: ['le', 'un', 'des', 'une'],
      correctIndex: 0,
      explanation: "Article défini masculin singulier: le château."
    },
    {
      q: "J'ai acheté ___ pommes et ___ poires.",
      options: ['des', 'des'],
      correctIndex: 0,
      explanation: "Articles indéfinis pluriels: des pommes et des poires."
    },
    {
      q: "Elle est ___ médecin et ___ infirmière.",
      options: ['un médecin', 'une infirmière'],
      correctIndex: 0,
      explanation: "Mixte genre: un médecin (masculin), une infirmière (féminin)."
    },
    {
      q: "___ eau et ___ vin sont des boissons.",
      options: ["L'", 'du'],
      correctIndex: 0,
      explanation: "Articles partitifs pour les liquides: de l'eau et du vin."
    },
    {
      q: "Il préfère ___ café au thé.",
      options: ['le'],
      correctIndex: 0,
      explanation: "Article défini masculine singulier: le café."
    }
  ],
  'test-vocabulaire-aliments': [
    {
      q: "Comment dit-on « bread » en français ?",
      options: ['le pain', 'le fromage', 'le beurre', 'le lait'],
      correctIndex: 0,
      explanation: "« Bread » = « le pain »."
    },
    {
      q: "Comment dit-on « cheese » en français ?",
      options: ['le fromage', 'le pain', 'le sucre', 'le sel'],
      correctIndex: 0,
      explanation: "« Cheese » = « le fromage »."
    },
    {
      q: "Comment dit-on « milk » en français ?",
      options: ['le lait', 'le café', 'le vin', "l'eau"],
      correctIndex: 0,
      explanation: "« Milk » = « le lait »."
    },
    {
      q: "Comment dit-on « water » en français ?",
      options: ["l'eau", 'le jus', 'la bière', 'le thé'],
      correctIndex: 0,
      explanation: "« Water » = « l'eau »."
    },
    {
      q: "Comment dit-on « apple » en français ?",
      options: ['la pomme', 'la poire', 'l' + 'orange', 'la banane'],
      correctIndex: 0,
      explanation: "« Apple » = « la pomme »."
    },
    {
      q: "Comment dit-on « egg » en français ?",
      options: ["l'œuf", 'la viande', 'le poisson', 'le riz'],
      correctIndex: 0,
      explanation: "« Egg » = « l'œuf »."
    },
    {
      q: "Comment dit-on « chicken » en français ?",
      options: ['le poulet', 'le bœuf', 'le cochon', 'le mouton'],
      correctIndex: 0,
      explanation: "« Chicken » = « le poulet »."
    },
    {
      q: "Comment dit-on « sugar » en français ?",
      options: ['le sucre', 'le sel', 'le miel', "l'huile"],
      correctIndex: 0,
      explanation: "« Sugar » = « le sucre »."
    },
    {
      q: "Comment dit-on « salt » en français ?",
      options: ['le sel', 'le sucre', 'le poivre', 'la moutarde'],
      correctIndex: 0,
      explanation: "« Salt » = « le sel »."
    },
    {
      q: "Comment dit-on « dessert » en français ?",
      options: ['le dessert', "l'entrée", 'le plat', 'le repas'],
      correctIndex: 0,
      explanation: "« Dessert » = « le dessert »."
    },
    // Questions additionnelles - 20 au total
    {
      q: "Comment dit-on « butter » en français ?",
      options: ['le beurre', 'le fromage', 'le pain', 'le sel'],
      correctIndex: 0,
      explanation: "« Butter » = « le beurre »."
    },
    {
      q: "Comment dit-on « meat » en français ?",
      options: ['la viande', 'le poisson', 'le poulet', 'le bœuf'],
      correctIndex: 0,
      explanation: "« Meat » = « la viande »."
    },
    {
      q: "Comment dit-on « fish» en français ?",
      options: ['le poisson', 'la viande', 'le poulet', 'le bœuf'],
      correctIndex: 0,
      explanation: "« Fish » = « le poisson »."
    },
    {
      q: "Comment dit-on « fruit » en français ?",
      options: 'le fruit',
      correctIndex: 0,
      explanation: "« Fruit » = « le fruit »."
    },
    {
      q: "Comment dit-on « vegetable » en français ?",
      options: 'le légume',
      correctIndex: 0,
      explanation: "« Vegetable » = « le légume »."
    },
    {
      q: "Comment dit-on « salad » en français ?",
      options: 'la salade',
      correctIndex: 0,
      explanation: "« Salad » = « la salade»."
    },
    {
      q: "Comment dit-on « sandwich » en français ?",
      options: 'le sandwich',
      correctIndex: 0,
      explanation: "« Sandwich » = « le sandwich». (mot emprunté)"
    },
    {
      q: "Comment dit-on « pizza » en français ?",
      options: 'la pizza',
      correctIndex: 0,
      explanation: "« Pizza » = « la pizza». (mot italien gardé)"
    },
    {
      q: "Comment dit-on « salad dressing » en français ?",
      options: 'la vinaigrette',
      correctIndex: 0,
      explanation: "« Salad dressing » = « la vinaigrette»."
    }
  ]
}