// Programme thématique — thèmes 51 à 64 (niveaux B1/B2)

export const themesB1b = [
  {
    id: 't51-subj-ou-ind',
    name: 'Subjonctif ou indicatif',
    description: 'Choisir entre le subjonctif et l\u2019indicatif selon l\u2019expression.',
    categoryId: 'conjugaison',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Je suis sûr qu\u2019il ___ (venir).", options: ['viendra', 'vienne', 'venait', 'viens'], correctIndex: 0, explanation: "sûr que + indicatif : viendra." },
      { q: "Il est possible qu\u2019il ___ (venir).", options: ['vienne', 'viendra', 'venait', 'viendrait'], correctIndex: 0, explanation: "possible que + subjonctif : vienne." },
      { q: "Je doute qu\u2019elle ___ (partir).", options: ['parte', 'part', 'partait', 'partira'], correctIndex: 0, explanation: "douter que + subjonctif : parte." },
      { q: "Il est évident qu\u2019elle ___ (avoir) raison.", options: ['a', 'ait', 'avait', 'aurait'], correctIndex: 0, explanation: "évident que + indicatif : a." },
      { q: "Bien qu\u2019il ___ (pleuvoir), nous sortons.", options: ['pleuve', 'pleut', 'pleuvait', 'pleuvra'], correctIndex: 0, explanation: "bien que + subjonctif : pleuve." },
      { q: "Je pense qu\u2019il ___ (être) à la maison.", options: ['est', 'soit', 'était', 'serait'], correctIndex: 0, explanation: "penser que + indicatif : est." },
      { q: "Pour que tu ___ (réussir), il faut travailler.", options: ['réussisses', 'réussis', 'réussissais', 'réussiras'], correctIndex: 0, explanation: "pour que + subjonctif : réussisses." },
      { q: "Avant qu\u2019il ne ___ (partir).", options: ['parte', 'part', 'partait', 'partira'], correctIndex: 0, explanation: "avant que + subjonctif : parte." },
      { q: "Il est probable qu\u2019il ___ (pleuvoir).", options: ['pleuve', 'pleut', 'pleuvait', 'pleuvra'], correctIndex: 0, explanation: "probable que + subjonctif : pleuve." },
      { q: "Le fait que tu ___ (être) là me fait plaisir.", options: ['sois', 'es', 'étais', 'serais'], correctIndex: 0, explanation: "le fait que + subjonctif : sois."
      }
    ]
  },
  {
    id: 't52-gerondif',
    name: 'Le gérondif',
    description: 'En + participe présent : manière, simultanéité, condition.',
    categoryId: 'conjugaison',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Le gérondif = ___.", options: ['en + participe présent', 'avoir + participe', 'être + participe', 'radical + -ais'], correctIndex: 0, explanation: "en + -ant : en marchant." },
      { q: "Elle parle ___ (rire).", options: ['en riant', 'riant', 'a ri', 'rit'], correctIndex: 0, explanation: "en riant (manière)." },
      { q: "Il travaille ___ (écouter) la musique.", options: ['en écoutant', 'écoutant', 'a écouté', 'écoute'], correctIndex: 0, explanation: "en écoutant (simultanéité)." },
      { q: "Le gérondif de « faire » : ___.", options: ['en faisant', 'faisant', 'fait', 'fera'], correctIndex: 0, explanation: "en faisant." },
      { q: "Le gérondif exprime souvent : ___.", options: ['la manière ou la simultanéité', 'une obligation', 'un passé', 'un ordre'], correctIndex: 0, explanation: "manière et simultanéité." },
      { q: "___, tu réussiras. (en travaillant)", options: ['En travaillant', 'Travaillant', 'Travaillé', 'Tu travailles'], correctIndex: 0, explanation: "en travaillant." },
      { q: "Le participe présent se forme : nous + -ons … → ___.", options: ['-ant', '-é', '-ais', '-er'], correctIndex: 0, explanation: "nous faisons → faisant." },
      { q: "Il s\u2019est blessé ___ (jouer) au foot.", options: ['en jouant', 'jouant', 'a joué', 'joue'], correctIndex: 0, explanation: "en jouant."
      }
    ]
  },
  {
    id: 't53-participe-present',
    name: 'Le participe présent',
    description: 'Le participe présent en -ant et son emploi.',
    categoryId: 'conjugaison',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Le participe présent de « chanter » : ___.", options: ['chantant', 'chanté', 'chante', 'chanter'], correctIndex: 0, explanation: "chantant." },
      { q: "Le participe présent est invariable : ___.", options: ['vrai', 'faux, il s\u2019accorde', 'variable en genre seulement', 'variable en nombre seulement'], correctIndex: 0, explanation: "le participe présent est invariable." },
      { q: "De « venir » : ___.", options: ['venant', 'venu', 'vient', 'venir'], correctIndex: 0, explanation: "venant." },
      { q: "De « être » : ___.", options: ['étant', 'été', 'est', 'être'], correctIndex: 0, explanation: "étant." },
      { q: "De « avoir » : ___.", options: ['ayant', 'eu', 'a', 'avoir'], correctIndex: 0, explanation: "ayant." },
      { q: "Le participe présent exprime : ___.", options: ['une action en même temps qu\u2019une autre', 'un passé révolu', 'un ordre', 'un souhait'], correctIndex: 0, explanation: "simultanéité (courant, je courrais…)." },
      { q: "En français, le gérondif = « en » + participe présent. Le participe présent sans « en » : ___.", options: ['il existe seul (ex. fatigant)', 'n\u2019existe pas', 'est toujours invariable', 'est masculin'], correctIndex: 0, explanation: "fatigant, intéressant sont des participes présents employés sans en."
      }
    ]
  },
  {
    id: 't54-imparfait',
    name: "L'imparfait",
    description: 'Formation et emplois de l\u2019imparfait (habitude, description, durée).',
    categoryId: 'conjugaison',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "L\u2019imparfait se forme : radical « nous » du présent + terminaisons ___.", options: ["-ais, -ais, -ait, -ions, -iez, -aient", '-é, -ée, -és', '-er, -ir, -re', '-ant'], correctIndex: 0, explanation: "il mangeait." },
      { q: "Quand j\u2019étais petit, je ___ (jouer) au ballon. (habitude)", options: ['jouais', 'joue', 'jouait', 'jouerai'], correctIndex: 0, explanation: "imparfait d\u2019habitude : jouais." },
      { q: "Il ___ (être) fatigué ce jour-là. (description)", options: ['était', 'est', 'a été', 'sera'], correctIndex: 0, explanation: "imparfait de description : était." },
      { q: "Nous ___ (manger) ensemble chaque dimanche.", options: ['mangions', 'mangeons', 'mangeâmes', 'mangerons'], correctIndex: 0, explanation: "mangions (habitude)." },
      { q: "L\u2019imparfait exprime : ___.", options: ['une habitude, une description, une durée', 'une action ponctuelle future', 'un ordre', 'une certitude récente'], correctIndex: 0, explanation: "contextes d\u2019imparfait." },
      { q: "Verbe « faire » à l\u2019imparfait (il) : ___.", options: ['faisait', 'fait', 'fit', 'fera'], correctIndex: 0, explanation: "faisait." },
      { q: "Verbe « avoir » imparfait : j\u2019___.", options: ['avais', 'ai', 'eus', 'aurai'], correctIndex: 0, explanation: "j\u2019avais." },
      { q: "Verbe « parler » imparfait (elles) : ___.", options: ['parlaient', 'parlent', 'parlèrent', 'parleront'], correctIndex: 0, explanation: "parlaient."
      }
    ]
  },
  {
    id: 't55-plus-que-parfait',
    name: 'Le plus-que-parfait',
    description: 'Imparfait de avoir/être + participe passé.',
    categoryId: 'conjugaison',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Le plus-que-parfait = ___ + participe passé.", options: ['imparfait de avoir/être', 'présent de avoir', 'passé composé', 'conditionnel'], correctIndex: 0, explanation: "j\u2019avais mangé." },
      { q: "J\u2019___ fini mon travail quand tu es arrivé.", options: ['avais', 'ai', 'aurai', 'eus'], correctIndex: 0, explanation: "j\u2019avais fini (antériorité)." },
      { q: "Quand je suis arrivé, elle ___ déjà partie.", options: ['était', 'est', 'sera', 'soit'], correctIndex: 0, explanation: "elle était déjà partie (être)." },
      { q: "Le plus-que-parfait exprime : ___.", options: ['une action antérieure à une autre action passée', 'une action future', 'une habitude', 'un ordre'], correctIndex: 0, explanation: "antériorité dans le passé." },
      { q: "Nous ___ mangé avant de sortir.", options: ['avions', 'avons', 'avons mangé', 'aurions'], correctIndex: 0, explanation: "nous avions mangé." },
      { q: "Ils ___ (être) absents.", options: ['avaient été', 'ont été', 'sont', 'seront'], correctIndex: 0, explanation: "avaient été." },
      { q: "Tu ___ (faire) tes devoirs.", options: ['avais fait', 'as fait', 'fais', 'feras'], correctIndex: 0, explanation: "tu avais fait."
      }
    ]
  },
  {
    id: 't56-futur-anterieur',
    name: 'Le futur antérieur',
    description: 'Futur de avoir/être + participe passé : action future antérieure.',
    categoryId: 'conjugaison',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Le futur antérieur = ___ + participe passé.", options: ['futur de avoir/être', 'présent de avoir', 'passé composé', 'conditionnel'], correctIndex: 0, explanation: "j\u2019aurai mangé." },
      { q: "Quand tu arriveras, j\u2019___ déjà fini.", options: ['aurai', 'ai', 'avais', 'eus'], correctIndex: 0, explanation: "j\u2019aurai déjà fini." },
      { q: "Le futur antérieur exprime : ___.", options: ['une action future antérieure à une autre', 'un passé révolu', 'une habitude', 'un ordre'], correctIndex: 0, explanation: "action qui sera terminée avant une autre future." },
      { q: "Elle sera ___ (partir) avant minuit.", options: ['partie', 'parti', 'partis', 'partir'], correctIndex: 0, explanation: "elle sera partie (être + accord)." },
      { q: "Nous ___ (arriver) avant toi.", options: ['serons arrivés', 'sommes arrivés', 'étaient arrivés', 'seront arrivés'], correctIndex: 0, explanation: "serons arrivés." },
      { q: "Tu ___ (finir) ce travail demain.", options: ['auras fini', 'a fini', 'avais fini', 'fini'], correctIndex: 0, explanation: "tu auras fini."
      }
    ]
  },
  {
    id: 't57-conditionnel-passe',
    name: 'Le conditionnel passé',
    description: 'Conditionnel de avoir/être + participe passé : regret, hypothèse, politesse.',
    categoryId: 'conjugaison',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Le conditionnel passé = ___ + participe passé.", options: ['conditionnel de avoir/être', 'présent de avoir', 'indicatif', 'impératif'], correctIndex: 0, explanation: "j\u2019aurais mangé." },
      { q: "J\u2019___ aimé venir. (regret)", options: ['aurais', 'ai', 'avais', 'aurai'], correctIndex: 0, explanation: "j\u2019aurais aimé (regret)." },
      { q: "Si j\u2019avais su, je ___ venu.", options: ['serais', 'suis', 'étais', 'serai'], correctIndex: 0, explanation: "je serais venu (hypothèse passée)." },
      { q: "Le conditionnel passé exprime : ___.", options: ['un regret, une hypothèse non réalisée', 'un fait certain', 'un ordre', 'une habitude'], correctIndex: 0, explanation: "regret/hypothèse." },
      { q: "Nous ___ pu vous aider.", options: ['aurions', 'avons', 'avions', 'aurons'], correctIndex: 0, explanation: "nous aurions pu." },
      { q: "Elle ___ (venir) si elle avait eu le temps.", options: ['serait venue', 'est venue', 'était venue', 'vient'], correctIndex: 0, explanation: "serait venue (accord)."}, 
      { q: "J\u2019aurais ___ (faire) autrement.", options: ['fait', 'fais', 'faites', 'faire'], correctIndex: 0, explanation: "j\u2019aurais fait."
      }
    ]
  },
  {
    id: 't58-passif',
    name: 'La voix passive',
    description: 'Être + participe passé : transformation active → passive.',
    categoryId: 'grammaire',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "La voix passive = ___ + participe passé.", options: ['être', 'avoir', 'venir de', 'en train de'], correctIndex: 0, explanation: "être + participe passé." },
      { q: "Le chat mange la souris → la souris est ___ par le chat.", options: ['mangée', 'mangé', 'mangés', 'manger'], correctIndex: 0, explanation: "accord : la souris (fém.) → mangée." },
      { q: "Au passif, le sujet de la phrase active devient : ___.", options: ["le complément d'agent (par + personne)", 'le COD', 'un lieu', 'un adverbe'], correctIndex: 0, explanation: "par le chat." },
      { q: "Le livre ___ (lire) par les élèves.", options: ['est lu', 'est lue', 'lit', 'a lu'], correctIndex: 0, explanation: "est lu (livre masc.)." },
      { q: "La voix passive se concentre sur : ___.", options: ['l\u2019action et ce qui la subit', 'celui qui agit', 'le lieu', 'le temps'], correctIndex: 0, explanation: "forme passive met l\u2019accent sur l\u2019objet." },
      { q: "La maison a été ___ (construire) en 2000.", options: ['construite', 'construit', 'construits', 'construire'], correctIndex: 0, explanation: "a été construite (accord, maison fém.)." },
      { q: "Transforme : On vend des fruits → des fruits sont ___.", options: ['vendus', 'vendu', 'vendues', 'vendre'], correctIndex: 0, explanation: "des fruits (masc. plur.) → vendus."
      }
    ]
  },
  {
    id: 't59-discours',
    name: 'Le discours direct et indirect',
    description: 'Transformer le discours direct en indirect.',
    categoryId: 'grammaire',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Il dit : « Je viens » → Il dit qu\u2019il ___.", options: ['vient', 'venait', 'viendra', 'vienne'], correctIndex: 0, explanation: "présent → présent avec verbe au présent : vient." },
      { q: "Elle a dit : « Je viens » → Elle a dit qu\u2019elle ___.", options: ['venait', 'vient', 'viendra', 'vienne'], correctIndex: 0, explanation: "passé → imparfait : venait." },
      { q: "Il a dit : « Je suis fatigué » → Il a dit qu\u2019il ___ fatigué.", options: ['était', 'est', 'sera', 'soit'], correctIndex: 0, explanation: "présent → imparfait : était." },
      { q: "Elle demande : « Où vas-tu ? » → Elle demande où je ___.", options: ['vais', 'allais', 'irai', 'aille'], correctIndex: 0, explanation: "discours indirect interrogatif." },
      { q: "« Je » au discours indirect devient : ___.", options: ['il / elle', 'nous', 'vous', 'tu'], correctIndex: 0, explanation: "il/elle." },
      { q: "Il m\u2019a dit : « Ferme la porte » → Il m\u2019a demandé de ___ la porte.", options: ['fermer', 'ferme', 'fermé', 'fermions'], correctIndex: 0, explanation: "demander de + infinitif." },
      { q: "Elle dit : « Demain » → Elle dit que le lendemain… (temps modifié : demain → ___).", options: ['le lendemain', 'aujourd\u2019hui', 'hier', 'maintenant'], correctIndex: 0, explanation: "demain → le lendemain."
      }
    ]
  },
  {
    id: 't60-adverbes',
    name: 'Les adverbes',
    description: 'Adverbes de manière, de temps et de lieu.',
    categoryId: 'grammaire',
    level: 'A2',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "L\u2019adverbe de manière se forme souvent : ___ + -ment.", options: ["féminin de l'adjectif", 'le verbe', 'le nom', 'le participe'], correctIndex: 0, explanation: "lentement, difficilement." },
      { q: "Complète l\u2019adverbe : rapide → ___.", options: ['rapidement', 'rapide', 'rapid', 'rapidementment'], correctIndex: 0, explanation: "rapidement." },
      { q: "Un adverbe de temps : ___.", options: ['aujourd\u2019hui', 'ici', 'dehors', 'vite'], correctIndex: 0, explanation: "aujourd\u2019hui (temps)." },
      { q: "Un adverbe de lieu : ___.", options: ['ici', 'maintenant', 'souvent', 'bien'], correctIndex: 0, explanation: "ici (lieu)." },
      { q: "Un adverbe de manière : ___.", options: ['bien', 'hier', 'là', 'demain'], correctIndex: 0, explanation: "bien (manière)." },
      { q: "L\u2019adverbe peut modifier : ___.", options: ['un verbe, un adjectif ou un autre adverbe', 'uniquement un nom', 'uniquement un pronom', 'rien'], correctIndex: 0, explanation: "il marche vite ; très rapide." },
      { q: "Complète : il parle ___. (lent)", options: ['lentement', 'lent', 'lente', 'lernt'], correctIndex: 0, explanation: "lentement."
      }
    ]
  },
  {
    id: 't61-pronoms-relatifs',
    name: 'Les pronoms relatifs : qui, que, dont, où',
    description: 'Remplacer un antécédent par un pronom relatif.',
    categoryId: 'grammaire',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Le livre ___ est sur la table est à moi. (sujet)", options: ['qui', 'que', 'dont', 'où'], correctIndex: 0, explanation: "qui (sujet)." },
      { q: "Le livre ___ je lis est intéressant. (COD)", options: ['que', 'qui', 'dont', 'où'], correctIndex: 0, explanation: "que (COD)." },
      { q: "La ville ___ je suis né. (lieu)", options: ['où', 'qui', 'que', 'dont'], correctIndex: 0, explanation: "où (lieu/temps)." },
      { q: "Qui = ___ ; que = ___.", options: ['sujet / COD', 'COD / sujet', 'lieu / temps', 'possesseur / lieu'], correctIndex: 0, explanation: "qui : sujet, que : COD." },
      { q: "Le film ___ je parle est génial. (parler de)", options: ['dont', 'que', 'qui', 'où'], correctIndex: 0, explanation: "dont (parler de → dont)." },
      { q: "La maison ___ il habite. (habiter à)", options: ['où', 'qui', 'que', 'dont'], correctIndex: 0, explanation: "où (habiter à → où)." },
      { q: "La personne ___ m\u2019a aidé. (sujet)", options: ['qui', 'que', 'dont', 'où'], correctIndex: 0, explanation: "qui (sujet)." },
      { q: "Le jour ___ je suis arrivé. (temps)", options: ['où', 'qui', 'que', 'dont'], correctIndex: 0, explanation: "où (temps)."
      }
    ]
  },
  {
    id: 't62-expression-cause',
    name: "L'expression de la cause",
    description: 'Parce que, car, comme, à cause de, grâce à, puisque.',
    categoryId: 'grammaire',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "La cause : ___ (parce que / car / puisque) + proposition.", options: ['parce que', 'pour', 'afin de', 'malgré'], correctIndex: 0, explanation: "parce que exprime la cause." },
      { q: "___ il pleut, je reste à la maison. (cause en tête)", options: ['Comme', 'Malgré', 'Pour', 'Bien que'], correctIndex: 0, explanation: "comme il pleut… (cause en début)." },
      { q: "Je suis en retard ___ le trafic. (cause, nom)", options: ["à cause du", 'afin du', 'malgré le', 'pour le'], correctIndex: 0, explanation: "à cause de + nom (cause négative)." },
      { q: "Il a réussi ___ son travail. (cause positive)", options: ['grâce à', 'à cause de', 'malgré', 'pour'], correctIndex: 0, explanation: "grâce à (cause positive)." },
      { q: "« Car » introduit : ___.", options: ['une explication', 'une conséquence', 'un but', 'une opposition'], correctIndex: 0, explanation: "car = explication/cause." },
      { q: "Puisque tu es là, ___ m\u2019aider.", options: ['aide', 'pour aider', 'afin d\u2019aider', 'à cause de'], correctIndex: 0, explanation: "puisque tu es là, aide-moi (cause évidente)." },
      { q: "L\u2019opposé de « grâce à » (cause négative) : ___.", options: ["à cause de", 'parce que', 'car', 'puisque'], correctIndex: 0, explanation: "à cause de."
      }
    ]
  },
  {
    id: 't63-consequence',
    name: "L'expression de la conséquence",
    description: 'Donc, alors, ainsi, c\u2019est pourquoi, de sorte que, au point que.',
    categoryId: 'grammaire',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Il pleut, ___ nous sortons le parapluie. (conséquence)", options: ['donc', 'parce que', 'pour', 'bien que'], correctIndex: 0, explanation: "donc (conséquence)." },
      { q: "Le voyage est long, c\u2019est ___ il a pris le train.", options: ['pourquoi', 'pour', 'afin que', 'parce que'], correctIndex: 0, explanation: "c\u2019est pourquoi (conséquence)." },
      { q: "Il a tellement travaillé ___ il réussit.", options: ['que', 'parce qu\u2019', 'pour', 'bien qu\u2019'], correctIndex: 0, explanation: "tellement… que (conséquence)." },
      { q: "« Alors » peut exprimer : ___.", options: ['la conséquence', 'la cause', 'le but', 'l\u2019opposition'], correctIndex: 0, explanation: "alors = conséquence." },
      { q: "Il est trop fatigué ___ il dort.", options: ['pour que', 'donc', 'parce que', 'afin que'], correctIndex: 0, explanation: "trop… pour que (conséquence)." },
      { q: "La conséquence répond à la question : ___.", options: ['« quel résultat ? »', '« pourquoi ? »', '« où ? »', '« quand ? »'], correctIndex: 0, explanation: "résultat."
      }
    ]
  },
  {
    id: 't64-but',
    name: "L'expression du but",
    description: 'Pour, afin de, dans le but de, pour que + subjonctif.',
    categoryId: 'grammaire',
    level: 'B1',
    strictMode: false,
    timer: false,
    shuffle: true,
    questions: [
      { q: "Je travaille ___ réussir. (but, infinitif)", options: ['pour', 'parce que', 'bien que', 'à cause de'], correctIndex: 0, explanation: "pour + infinitif (but)." },
      { q: "Il économise ___ acheter une voiture.", options: ['afin de', 'à cause de', 'pendant', 'à partir de'], correctIndex: 0, explanation: "afin de + infinitif (but)." },
      { q: "On ouvre la fenêtre ___ il fasse moins chaud. (pour que + subjonctif)", options: ['pour qu\u2019', 'afin de', 'à cause de', 'puisque'], correctIndex: 0, explanation: "pour que + subjonctif." },
      { q: "Le but répond à la question : ___.", options: ['« dans quel but ? »', '« pourquoi ? (cause) »', '« où ? »', '« quand ? »'], correctIndex: 0, explanation: "dans quel but." },
      { q: "Après « pour que » on emploie : ___.", options: ['le subjonctif', "l'indicatif", 'le conditionnel', 'le participe'], correctIndex: 0, explanation: "pour que + subjonctif." },
      { q: "Elle parle fort ___ être entendue.", options: ['afin d\u2019', 'à cause d\u2019', 'bien qu\u2019', 'à partir d\u2019'], correctIndex: 0, explanation: "afin d\u2019 + infinitif." },
      { q: "Distingue : « parce que » = cause, « pour » = ___.", options: ['but', 'conséquence', 'opposition', 'condition'], correctIndex: 0, explanation: "pour = but."
      }
    ]
  }
]
