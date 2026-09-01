// Russian knowledge base for the pre-test "theme explanation" modal.
// Curated detailed explanations for the main grammar/conjugation topics. Keyed by test id.
// When a test has no entry here, buildTopic falls back to the auto-derived French content
// (never empty). Content is intentionally pedagogical and written for Russian speakers.

export const topicRu = {
  'test-present': {
    intro: 'Правила настоящего времени французских глаголов (présent de l\'indicatif).',
    rules: [
      'Настоящее время (présent) используется для действий, происходящих сейчас, привычек и общих фактов.',
      'Глаголы I группы (на -er): je mange, tu manges, il/elle mange, nous mangeons, vous mangez, ils/elles mangent.',
      'Глаголы II группы (на -ir): je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent.',
      'Окончания I группы: -e, -es, -e, -ons, -ez, -ent. Окончания II группы: -is, -is, -it, -issons, -issez, -issent.'
    ],
    whenToUse: [
      'Действие происходит в настоящий момент: «Je mange une pomme» — я сейчас ем яблоко.',
      'Привычка или регулярное действие: «Tu parles français» — ты говоришь по-французски (обычно).',
      'Общий факт или состояние: «Elle a deux frères» — у неё два брата.'
    ],
    examples: [
      { question: 'Je ___ (manger) une pomme. → Je mange', answer: 'mange', explanation: 'С подлежащим «je» (1 л. ед. ч.) у глаголов на -er окончание -e: je mange.' },
      { question: 'Nous ___ (finir) nos devoirs. → Nous finissons', answer: 'finissons', explanation: 'С «nous» у глаголов на -ir окончание -issons: nous finissons.' },
      { question: 'Ils ___ (regarder) la télévision. → Ils regardent', answer: 'regardent', explanation: 'С «ils» (3 л. мн. ч.) окончание -ent: ils regardent.' }
    ]
  },
  'test-passe-compose': {
    intro: 'Правила прошедшего завершённого времени passé composé (avoir / être + participe passé).',
    rules: [
      'Passé composé — прошедшее завершённое время, образуется: вспомогательный глагол (avoir или être) + participe passé.',
      'Большинство глаголов используют avoir: j\'ai mangé, tu as vu, il a fini.',
      'avoir + participe: manger → mangé, finir → fini, prendre → pris, voir → vu, écrire → écrit.',
      'être используется с глаголами движения (aller, venir, partir, arriver…) и возвратными: je suis allé, elle est venue, nous sommes partis.',
      'С être participe passé согласуется с подлежащим в роде и числе: elle est venue, ils sont partis.'
    ],
    whenToUse: [
      'Завершённое действие в прошлом: «Hier, je suis allé au cinéma» — вчера я сходил в кино.',
      'Действие, случившееся один раз и закончившееся: «Elle a mangé une pizza» — она съела пиццу.',
      'С avoir participe не изменяется, если дополнение стоит после глагола: «J\'ai vu ce film».'
    ],
    examples: [
      { question: 'Hier, je ___ (aller) au cinéma. → je suis allé', answer: 'suis allé', explanation: 'aller — глагол движения, требуют être: je suis allé.' },
      { question: 'Elle ___ (manger) une pizza. → elle a mangé', answer: 'a mangé', explanation: 'manger образует passé composé с avoir: elle a mangé.' },
      { question: 'Nous ___ (partir) très tôt. → nous sommes partis', answer: 'sommes partis', explanation: 'partir с être и согласуется: nous sommes partis.' }
    ]
  },
  'test-articles': {
    intro: 'Определённый и неопределённый артикль во французском: le/la/les и un/une/des.',
    rules: [
      'Определённый артикль (le, la, les, l\') — предмет уже известен или конкретный: le chat, la pomme, les enfants.',
      'Неопределённый артикль (un, une, des) — предмет неопределённый, «какой-то»: un chat, une pomme, des pommes.',
      'Перед словом, начинающимся с гласной/немой h, le/la → l\': l\'eau, l\'ami.',
      'Артикль «le» (определённый) также используется для обобщения: «J\'aime le chocolat» — я люблю шоколад вообще.'
    ],
    whenToUse: [
      '«Le/La/Les» — когда собеседник уже знает, о чём речь: «Le chat dort» — тот самый кот спит.',
      '«Un/Une/Des» — когда вводим новый предмет: «J\'ai acheté des pommes» — я купил (какие-то) яблоки.',
      'Обобщение без подсчёта: «J\'aime la musique» — я люблю музыку.'
    ],
    examples: [
      { question: '___ chat dort sur le canapé (кот уже известен). → Le', answer: 'Le', explanation: 'Определённый артикль le, т.к. кот конкретный/известный.' },
      { question: 'J\'ai acheté ___ pommes au marché. → des', answer: 'des', explanation: 'Неопределённый артикль множественного числа des.' },
      { question: '___ eau est fraîche. → L\'', answer: 'L\'', explanation: 'eau — женского рода и начинается с гласной, поэтому l\'.' }
    ]
  },
  'test-vocabulaire-maison': {
    intro: 'Словарный запас по теме «дом»: комнаты, мебель и части здания.',
    rules: [
      'Тема — слова по теме «дом»: la maison (дом), la cuisine (кухня), la chambre (спальня), le salon (гостиная), le jardin (сад).',
      'Важно запоминать род существительных: la salle de bains (ж.), le mur (м.), la fenêtre (ж.), l\'escalier (м.).'
    ],
    whenToUse: [
      'Слова используются для описания дома: комнаты, предметы мебели, части здания.',
      'Запоминайте артикль вместе с существительным — он задаёт род.'
    ],
    examples: [
      { question: '«Home» по-французски: ___', answer: 'maison', explanation: 'maison — «дом» (ж. р.).' },
      { question: '«Kitchen» по-французски: ___', answer: 'la cuisine', explanation: 'cuisine — «кухня».' },
      { question: '«Window» по-французски: ___', answer: 'la fenêtre', explanation: 'fenêtre — «окно» (ж. р.).' }
    ]
  },
  'test-vocabulaire-aliments': {
    intro: 'Словарный запас по теме «продукты питания».',
    rules: [
      'Тема — продукты питания: le pain (хлеб), le lait (молоко), l\'eau (вода), la pomme (яблоко), le fromage (сыр).',
      'Запоминайте род каждого слова: la pomme (ж.), l\'œuf (м.), le sucre (м.), la viande (ж.).'
    ],
    whenToUse: [
      'Слова нужны в магазине, кафе и за столом: названия продуктов и блюд.',
      'Артикль определяет род: le pain, la pomme.'
    ],
    examples: [
      { question: '«Bread» по-французски: ___', answer: 'le pain', explanation: 'pain — «хлеб» (м. р.).' },
      { question: '«Cheese» по-французски: ___', answer: 'le fromage', explanation: 'fromage — «сыр» (м. р.).' },
      { question: '«Milk» по-французски: ___', answer: 'le lait', explanation: 'lait — «молоко» (м. р.).' }
    ]
  },
  't04-verbes-er': {
    intro: 'Спряжение правильных глаголов I группы (на -er) в настоящем времени.',
    rules: [
      'Глаголы I группы заканчиваются на -er (parler, manger, regarder, travailler).',
      'Спряжение в présent: je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent.',
      'Окончания: -e, -es, -e, -ons, -ez, -ent. Основа остаётся неизменной у правильных -er глаголов.'
    ],
    whenToUse: [
      'Для действий в настоящем времени с глаголами на -er: «Je parle français».',
      'Это самая большая и регулярная группа французских глаголов.'
    ],
    examples: [
      { question: 'Je ___ (parler) français. → Je parle', answer: 'parle', explanation: 'с «je» окончание -e: je parle.' },
      { question: 'Nous ___ (travailler) ensemble. → Nous travaillons', answer: 'travaillons', explanation: 'с «nous» окончание -ons: nous travaillons.' }
    ]
  },
  't15-verbes-irreguliers': {
    intro: 'Спряжение основных неправильных глаголов французского языка (être, avoir, aller, faire).',
    rules: [
      'Неправильные глаголы не подчиняются стандартным окончаниям — их спряжения нужно запоминать.',
      'Être: je suis, tu es, il est, nous sommes, vous êtes, ils sont.',
      'Avoir: j\'ai, tu as, il a, nous avons, vous avez, ils ont.',
      'Aller: je vais, tu vas, il va, nous allons, vous allez, ils vont.',
      'Faire: je fais, tu fais, il fait, nous faisons, vous faites, ils font.'
    ],
    whenToUse: [
      'Être и avoir — вспомогательные глаголы и образуют прошедшее время.',
      'Aller, faire — очень частотные глаголы, использующиеся постоянно.'
    ],
    examples: [
      { question: 'Je ___ français (être). → je suis', answer: 'suis', explanation: '1 л. ед. ч. être: je suis.' },
      { question: 'Nous ___ deux frères (avoir). → nous avons', answer: 'avons', explanation: '1 л. мн. ч. avoir: nous avons.' }
    ]
  },
  't26-partitifs': {
    intro: 'Частичный артикль (du, de la, des, de l\') для неопределённого количества вещества.',
    rules: [
      'Частичный артикль (du, de la, des, de l\') обозначает неопределённое количество вещества/продукта.',
      'du + существительное м. р.: du pain (немного хлеба), de la + ж. р.: de la confiture, des + мн. ч.: des légumes.',
      'Перед гласной: de l\'eau, de l\'huile.',
      'В отрицании и после выражений количества частичный артикль → de: «Je ne mange pas de pain», «un verre de lait».'
    ],
    whenToUse: [
      'Говорим о части вещества без точного количества: «Je veux du café».',
      'С продуктами: du fromage, de la soupe, des fruits.'
    ],
    examples: [
      { question: 'Je voudrais ___ café. → du', answer: 'du', explanation: 'café м. р., неопределённое количество → du.' },
      { question: 'Elle boit ___ eau. → de l\'', answer: 'de l\'', explanation: 'eau ж. р., начинается с гласной → de l\'.' }
    ]
  },
  't30-verbes-ir': {
    intro: 'Спряжение глаголов II группы (на -ir) в настоящем времени.',
    rules: [
      'Глаголы II группы заканчиваются на -ir (finir, choisir, réussir, grandir).',
      'Спряжение в présent: je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent.',
      'Окончания: -is, -is, -it, -issons, -issez, -issent. Между основой и окончанием во мн. ч. появляется -ss-.'
    ],
    whenToUse: [
      'Для действий в настоящем времени с глаголами на -ir: «Nous finissons nos devoirs».',
      'Отличайте II группу от неправильных -ir глаголов (partir, venir) — они спрягаются иначе.'
    ],
    examples: [
      { question: 'Je ___ (finir) mon travail. → Je finis', answer: 'finis', explanation: 'с «je» окончание -is: je finis.' },
      { question: 'Ils ___ (choisir) un film. → Ils choisissent', answer: 'choisissent', explanation: 'с «ils» окончание -issent: ils choisissent.' }
    ]
  },
  't32-futur-proche': {
    intro: 'Ближайшее будущее время futur proche: aller + инфинитив.',
    rules: [
      'Futur proche (ближайшее будущее) образуется: aller (в présent) + инфинитив.',
      'Je vais manger, tu vas manger, il va manger, nous allons manger, vous allez manger, ils vont manger.',
      'Показывает действие, которое произойдёт в ближайшем будущем.'
    ],
    whenToUse: [
      'План или намерение на ближайшее время: «Je vais faire mes devoirs».',
      'Действие, которое вот-вот произойдёт: «Il va pleuvoir» — сейчас пойдёт дождь.'
    ],
    examples: [
      { question: 'Je ___ (manger) bientôt. → Je vais manger', answer: 'vais manger', explanation: 'aller в présent (vais) + инфинитив manger.' },
      { question: 'Nous ___ (partir) demain. → Nous allons partir', answer: 'allons partir', explanation: 'aller (allons) + инфинитив partir.' }
    ]
  },
  't33-passe-compose-avoir-er': {
    intro: 'Passé composé с вспомогательным avoir для глаголов на -er.',
    rules: [
      'Passé composé с avoir для глаголов на -er: j\'ai + participe passé (основа+é).',
      'manger → j\'ai mangé, parler → j\'ai parlé, travailler → j\'ai travaillé.',
      'Вспомогательный глагол avoir спрягается в présent: j\'ai, tu as, il a, nous avons, vous avez, ils ont.'
    ],
    whenToUse: [
      'Завершённое действие в прошлом: «J\'ai mangé une pomme».',
      'Большинство -er глаголов образуют passé composé с avoir.'
    ],
    examples: [
      { question: 'Hier, j\'___ (manger) une salade. → j\'ai mangé', answer: 'ai mangé', explanation: 'avoir (j\'ai) + participe mangé.' },
      { question: 'Ils ___ (parler) longtemps. → ils ont parlé', answer: 'ont parlé', explanation: 'avoir (ils ont) + parlé.' }
    ]
  },
  't35-passe-compose-etre': {
    intro: 'Passé composé с вспомогательным être: глаголы движения и возвратные.',
    rules: [
      'Passé composé с être для глаголов движения: aller, venir, partir, arriver, entrer, sortir, monter, descendre, naître, mourir…',
      'Форма: être в présent + participe passé.',
      'С être participe согласуется с подлежащим в роде и числе: elle est venue, ils sont partis, elles sont parties.'
    ],
    whenToUse: [
      'Глаголы движения/перемещения: «Je suis allé au marché».',
      'Согласование обязательное: «Marie est allée», «Paul et Marc sont partis».'
    ],
    examples: [
      { question: 'Elle ___ (venir) nous voir. → elle est venue', answer: 'est venue', explanation: 'venir с être + согласование ж. р.: venue.' },
      { question: 'Ils ___ (partir) tôt. → ils sont partis', answer: 'sont partis', explanation: 'partir с être + согласование м. р. мн. ч.: partis.' }
    ]
  },
  't38-present-pc-futur': {
    intro: 'Сравнение трёх времён: présent, passé composé и futur proche.',
    rules: [
      'Présent — сейчас/привычка: je mange.',
      'Passé composé — завершённое прошлое: j\'ai mangé.',
      'Futur proche — ближайшее будущее: je vais manger.'
    ],
    whenToUse: [
      'Выбор времени зависит от момента действия: настоящее / прошлое / будущее.',
      'Маркеры времени подсказывают: hier (вчера) → passé composé, demain (завтра) → futur, aujourd\'hui (сегодня) → présent.'
    ],
    examples: [
      { question: 'Aujourd\'hui je ___ une pomme (présent). → mange', answer: 'mange', explanation: 'présent с aujourd\'hui.' },
      { question: 'Hier je ___ une pomme (passé composé). → ai mangé', answer: 'ai mangé', explanation: 'прошедшее с hier: avoir + mangé.' }
    ]
  }
}
