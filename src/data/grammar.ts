export interface GrammarExample {
  japanese: string;
  romaji: string;
  french: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  subtitle: string;
  level: "débutant" | "essentiel";
  explanation: string;
  examples: GrammarExample[];
  tip: string;
}

export const grammarLessons: GrammarLesson[] = [
  {
    id: "ordre-mots",
    title: "L'ordre des mots",
    subtitle: "Sujet + Objet + Verbe",
    level: "débutant",
    explanation:
      "En japonais, le verbe se place TOUJOURS à la fin de la phrase. La particule は (se prononce « wa ») marque le thème ou le sujet de la phrase. C'est le point de départ de presque toutes les phrases : « A は B です » = « A est B ».",
    examples: [
      { japanese: "わたし は がくせい です", romaji: "watashi wa gakusei desu", french: "Je suis étudiant." },
      { japanese: "これ は ほん です", romaji: "kore wa hon desu", french: "C'est un livre." },
      { japanese: "にほんご は おもしろい です", romaji: "nihongo wa omoshiroi desu", french: "Le japonais est intéressant." },
    ],
    tip: "は se prononce « wa » quand c'est une particule ! Ne dis jamais « ha » ici.",
  },
  {
    id: "questions-ka",
    title: "Poser des questions",
    subtitle: "La particule か",
    level: "débutant",
    explanation:
      "Pour transformer une phrase en question, il suffit d'ajouter か à la fin. Aucun mot interrogatif n'est nécessaire, et le ton monte légèrement comme en français. La réponse polie commence souvent par はい (oui) ou いいえ (non).",
    examples: [
      { japanese: "がくせい ですか", romaji: "gakusei desu ka", french: "Es-tu étudiant ?" },
      { japanese: "これ は ほん ですか", romaji: "kore wa hon desu ka", french: "Est-ce un livre ?" },
      { japanese: "にほんじん ですか", romaji: "nihonjin desu ka", french: "Es-tu japonais ?" },
    ],
    tip: "か en fin de phrase = point d'interrogation. Simple et très pratique !",
  },
  {
    id: "particule-no",
    title: "La particule の",
    subtitle: "La possession",
    level: "débutant",
    explanation:
      "の relie deux noms : « A の B » signifie « le B de A ». C'est l'équivalent du « de » français. Il sert pour la possession (mon livre), mais aussi pour décrire (la nourriture japonaise) ou indiquer l'origine.",
    examples: [
      { japanese: "わたし の ほん", romaji: "watashi no hon", french: "mon livre (le livre de moi)" },
      { japanese: "にほん の たべもの", romaji: "nihon no tabemono", french: "la nourriture japonaise" },
      { japanese: "おとうと の くるま", romaji: "otouto no kuruma", french: "la voiture de mon frère" },
    ],
    tip: "の est LA particule de liaison. Si tu hésites entre deux noms, の les relie !",
  },
  {
    id: "particules-ni-de",
    title: "に et で",
    subtitle: "Destination et moyen",
    level: "débutant",
    explanation:
      "に indique la destination ou le lieu d'existence : « aller À ». で indique le moyen ou le lieu de l'action : « PAR le train », « DANS le parc ». C'est la distinction la plus utile pour voyager !",
    examples: [
      { japanese: "がっこう に いきます", romaji: "gakkou ni ikimasu", french: "Je vais à l'école." },
      { japanese: "でんしゃ で いきます", romaji: "densha de ikimasu", french: "J'y vais en train." },
      { japanese: "こうえん で あそびます", romaji: "kouen de asobimasu", french: "Je joue dans le parc." },
    ],
    tip: "Mémorise : に = vers / destination, で = par / moyen.",
  },
  {
    id: "verbes-masu",
    title: "Les verbes en -ます",
    subtitle: "La forme polie",
    level: "essentiel",
    explanation:
      "La forme polie du verbe (celle qu'on utilise avec les inconnus et au quotidien) se termine par ます. Le verbe reste en fin de phrase. を marque l'objet de l'action : « Je mange QUOI ? Des sushis. »",
    examples: [
      { japanese: "すし を たべます", romaji: "sushi wo tabemasu", french: "Je mange des sushis." },
      { japanese: "えき に いきます", romaji: "eki ni ikimasu", french: "Je vais à la gare." },
      { japanese: "みず を のみます", romaji: "mizu wo nomimasu", french: "Je bois de l'eau." },
    ],
    tip: "たべる → たべます, いく → いきます, のむ → のみます. La terminaison ます signale la politesse.",
  },
  {
    id: "adjectifs-i",
    title: "Les adjectifs en い",
    subtitle: "Décrire les choses",
    level: "essentiel",
    explanation:
      "Les adjectifs en -い se placent directement avant le nom qu'ils décrivent : « おいしい すし » = « des sushis délicieux ». Ils sont l'un des piliers du vocabulaire de description. Avec です, ils forment une phrase complète.",
    examples: [
      { japanese: "おいしい すし", romaji: "oishii sushi", french: "des sushis délicieux" },
      { japanese: "たかい ホテル", romaji: "takai hoteru", french: "un hôtel cher" },
      { japanese: "あたらしい でんしゃ", romaji: "atarashii densha", french: "un train neuf" },
    ],
    tip: "L'adjectif se met avant le nom, comme en français : たかいホテル = hôtel cher.",
  },
  {
    id: "arimasu-imasu",
    title: "あります et います",
    subtitle: "Dire « il y a »",
    level: "essentiel",
    explanation:
      "Pour dire « il y a », on choisit selon la chose : あります pour les objets et les choses, います pour les êtres vivants (personnes, animaux). Le sujet est marqué par la particule が. La négation remplace le dernier す par せん.",
    examples: [
      { japanese: "ねこ が います", romaji: "neko ga imasu", french: "Il y a un chat." },
      { japanese: "ほん が あります", romaji: "hon ga arimasu", french: "Il y a un livre." },
      { japanese: "おかね が ありません", romaji: "okane ga arimasen", french: "Il n'y a pas d'argent." },
    ],
    tip: "Simple : あります = choses, います = êtres vivants. Ne te trompe plus !",
  },
  {
    id: "politesse-kudasai",
    title: "La politesse : ください",
    subtitle: "Demander poliment",
    level: "essentiel",
    explanation:
      "ください signifie « s'il vous plaît, donnez-moi ». C'est LA formule indispensable au restaurant et en voyage : « みず を ください » = « de l'eau, s'il vous plaît ». Pour demander une action, on utilise la forme en -て + ください : « attendez, s'il vous plaît ».",
    examples: [
      { japanese: "みず を ください", romaji: "mizu wo kudasai", french: "De l'eau, s'il vous plaît." },
      { japanese: "まって ください", romaji: "matte kudasai", french: "Attendez, s'il vous plaît." },
      { japanese: "チェックイン を おねがいします", romaji: "chekkuin wo onegaishimasu", french: "Je voudrais faire le check-in." },
    ],
    tip: "おねがいします est la version plus formelle de ください. Les deux sont très polis.",
  },
  {
    id: "forme-te",
    title: "La forme en -て",
    subtitle: "Connecter les actions",
    level: "essentiel",
    explanation:
      "La forme en -te est le couteau suisse du japonais. Elle sert à : 1) faire une demande polie (て + ください), 2) relier deux actions, 3) exprimer une action en cours (て + います). Les terminaisons varient selon le groupe du verbe : -む/-ぶ/-ぬ → んで, -く → いて, -ぐ → いで, -る/-う/-つ → って.",
    examples: [
      { japanese: "たべて ください", romaji: "tabete kudasai", french: "Mangez, s'il vous plaît." },
      { japanese: "まって います", romaji: "matte imasu", french: "Je suis en train d'attendre." },
      { japanese: "よんで ください", romaji: "yonde kudasai", french: "Lisez, s'il vous plaît." },
    ],
    tip: "Pense au verbe danser : たべる → たべて (comme 'te' de 'danse')",
  },
  {
    id: "passe",
    title: "Le passé",
    subtitle: "ました et でした",
    level: "essentiel",
    explanation:
      "Pour mettre un verbe au passé poli, remplace ます par ました. Pour un nom ou un adjectif-na, remplace です par でした. C'est aussi simple que ça ! La négation au passé utilise ませんでした.",
    examples: [
      { japanese: "すし を たべました", romaji: "sushi wo tabemashita", french: "J'ai mangé des sushis." },
      { japanese: "がくせい でした", romaji: "gakusei deshita", french: "J'étais étudiant." },
      { japanese: "たべませんでした", romaji: "tabemasen deshita", french: "Je n'ai pas mangé." },
    ],
    tip: "ます → ました, です → でした. Tu retiens juste le suffixe た.",
  },
  {
    id: "negation",
    title: "La négation",
    subtitle: "ません et じゃない",
    level: "essentiel",
    explanation:
      "Il y a deux négations principales : la forme polie avec ません (verbes) et la forme neutre avec ない. Pour les noms et adjectifs-na au neutre, on utilise じゃない. Pour les adjectifs en -い, on remplace le い final par くない.",
    examples: [
      { japanese: "わかりません", romaji: "wakarimasen", french: "Je ne comprends pas." },
      { japanese: "がくせい じゃない", romaji: "gakusei janai", french: "Je ne suis pas étudiant." },
      { japanese: "おいしくない", romaji: "oishikunai", french: "Ce n'est pas bon." },
    ],
    tip: "Poli = ません, neutre = ない. Les deux sont essentiels au quotidien.",
  },
  {
    id: "comparaisons",
    title: "Les comparaisons",
    subtitle: "より et ほうが",
    level: "essentiel",
    explanation:
      "Pour comparer deux choses, on utilise より (plus que) et ほうが (est plus). « A は B より おおきい » = « A est plus grand que B ». « A の ほうが B より おいしい » = « A est meilleur que B ». C'est très utile pour faire du shopping ou commander !",
    examples: [
      { japanese: "これ より あれ が やすい", romaji: "kore yori are ga yasui", french: "Celui-là est moins cher que celui-ci." },
      { japanese: "にほん の ほうが フランス より ちいさい", romaji: "nihon no hou ga furansu yori chiisai", french: "Le Japon est plus petit que la France." },
      { japanese: "この みせ の ほうが やすい です", romaji: "kono mise no hou ga yasui desu", french: "Ce magasin est moins cher." },
    ],
    tip: "より = marqueur de comparaison (comme 'than' en anglais).",
  },
  {
    id: "vouloir",
    title: "Exprimer ses envies",
    subtitle: "たい et ほしい",
    level: "essentiel",
    explanation:
      "Pour dire « je veux faire X », on attache たい à la base du verbe : たべる → たべたい. Pour un objet qu'on veut, on utilise ほしい après l'objet marqué par が. La négation se fait en たくない et ほしくない.",
    examples: [
      { japanese: "すし が たべたい", romaji: "sushi ga tabetai", french: "Je veux manger des sushis." },
      { japanese: "あたらしい くるま が ほしい", romaji: "atarashii kuruma ga hoshii", french: "Je veux une nouvelle voiture." },
      { japanese: "にほん に いきたい です", romaji: "nihon ni ikitai desu", french: "Je veux aller au Japon." },
    ],
    tip: "たい pour les verbes (actions), ほしい pour les noms (objets).",
  },
  {
    id: "conditionnel",
    title: "Si... alors",
    subtitle: "たら et ば",
    level: "essentiel",
    explanation:
      "La forme en たら est la plus simple pour exprimer une condition. On l'obtient en ajoutant ら au passé neutre du verbe : たべた → たべたら (si je mange). C'est très utilisé au quotidien pour faire des hypothèses ou donner des conseils.",
    examples: [
      { japanese: "にほん に いったら、すし を たべたい", romaji: "nihon ni ittara, sushi wo tabetai", french: "Si je vais au Japon, je veux manger des sushis." },
      { japanese: "あめ が ふったら、いきません", romaji: "ame ga futtara, ikimasen", french: "S'il pleut, je n'irai pas." },
      { japanese: "やすかったら、かいます", romaji: "yasukattara, kaimasu", french: "Si c'est bon marché, je l'achète." },
    ],
    tip: "たら = la forme en た du verbe + ら. Facile à construire.",
  },
];

export function getGrammarLesson(id: string): GrammarLesson | undefined {
  return grammarLessons.find((g) => g.id === id);
}
