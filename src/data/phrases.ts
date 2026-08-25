export interface TravelPhrase {
  id: string;
  japanese: string;
  romaji: string;
  french: string;
}

export interface PhraseCategory {
  id: string;
  title: string;
  emoji: string;
  description: string;
  phrases: TravelPhrase[];
}

export const phraseCategories: PhraseCategory[] = [
  {
    id: "essentiel",
    title: "L'essentiel",
    emoji: "⭐",
    description: "Les phrases de survie avant toute chose",
    phrases: [
      { id: "ess-1", japanese: "すみません", romaji: "sumimasen", french: "Excusez-moi / Pardon" },
      { id: "ess-2", japanese: "ありがとうございます", romaji: "arigatou gozaimasu", french: "Merci beaucoup" },
      { id: "ess-3", japanese: "わかりません", romaji: "wakarimasen", french: "Je ne comprends pas" },
      { id: "ess-4", japanese: "もう いちど おねがいします", romaji: "mou ichido onegaishimasu", french: "Encore une fois, s'il vous plaît" },
      { id: "ess-5", japanese: "にほんご が はなせません", romaji: "nihongo ga hanasemasen", french: "Je ne parle pas japonais" },
      { id: "ess-6", japanese: "えいご を はなせますか", romaji: "eigo wo hanasemasu ka", french: "Parlez-vous anglais ?" },
      { id: "ess-7", japanese: "たすけて ください", romaji: "tasukete kudasai", french: "Aidez-moi, s'il vous plaît" },
      { id: "ess-8", japanese: "だいじょうぶ ですか", romaji: "daijoubu desu ka", french: "Ça va ? / Est-ce que tout va bien ?" },
    ],
  },
  {
    id: "transport",
    title: "Transport & direction",
    emoji: "🚆",
    description: "Se déplacer dans les villes japonaises",
    phrases: [
      { id: "tra-1", japanese: "えき は どこ ですか", romaji: "eki wa doko desu ka", french: "Où est la gare ?" },
      { id: "tra-2", japanese: "この でんしゃ は とうきょう に いきますか", romaji: "kono densha wa toukyou ni ikimasu ka", french: "Ce train va-t-il à Tokyo ?" },
      { id: "tra-3", japanese: "きっぷ は どこ で かえますか", romaji: "kippu wa doko de kaemasu ka", french: "Où puis-je acheter un billet ?" },
      { id: "tra-4", japanese: "つぎ の えき は なん ですか", romaji: "tsugi no eki wa nan desu ka", french: "Quelle est la prochaine station ?" },
      { id: "tra-5", japanese: "くうこう まで いきたい です", romaji: "kuukou made ikitai desu", french: "Je veux aller à l'aéroport" },
      { id: "tra-6", japanese: "ここ で おります", romaji: "koko de orimasu", french: "Je descends ici" },
      { id: "tra-7", japanese: "なんばんせん ですか", romaji: "nanbansen desu ka", french: "Quel quai ?" },
      { id: "tra-8", japanese: "みぎ と ひだり は どちら ですか", romaji: "migi to hidari wa dochira desu ka", french: "Où sont la droite et la gauche ?" },
    ],
  },
  {
    id: "hotel",
    title: "À l'hôtel",
    emoji: "🏨",
    description: "S'enregistrer et passer un bon séjour",
    phrases: [
      { id: "hot-1", japanese: "よやく して います", romaji: "yoyaku shite imasu", french: "J'ai une réservation" },
      { id: "hot-2", japanese: "チェックイン を おねがいします", romaji: "chekkuin wo onegaishimasu", french: "Le check-in, s'il vous plaît" },
      { id: "hot-3", japanese: "あさごはん は ついて いますか", romaji: "asagohan wa tsuite imasu ka", french: "Le petit-déjeuner est-il inclus ?" },
      { id: "hot-4", japanese: "にもつ を あずかって もらえますか", romaji: "nimotsu wo azukatte moraemasu ka", french: "Pouvez-vous garder mes bagages ?" },
      { id: "hot-5", japanese: "へや を かえたい です", romaji: "heya wo kaetai desu", french: "Je veux changer de chambre" },
      { id: "hot-6", japanese: "むりょう の ワイファイ は ありますか", romaji: "muryou no waifai wa arimasu ka", french: "Y a-t-il du Wi-Fi gratuit ?" },
      { id: "hot-7", japanese: "なんじ まで ですか", romaji: "nanji made desu ka", french: "Jusqu'à quelle heure ?" },
    ],
  },
  {
    id: "restaurant",
    title: "Au restaurant",
    emoji: "🍜",
    description: "Commander comme un local",
    phrases: [
      { id: "res-1", japanese: "メニュー を おねがいします", romaji: "menyuu wo onegaishimasu", french: "La carte, s'il vous plaît" },
      { id: "res-2", japanese: "おすすめ は なん ですか", romaji: "osusume wa nan desu ka", french: "Qu'est-ce que vous recommandez ?" },
      { id: "res-3", japanese: "これ を ください", romaji: "kore wo kudasai", french: "Je prends ceci, s'il vous plaît" },
      { id: "res-4", japanese: "からく しないで ください", romaji: "karaku shinaide kudasai", french: "Pas épicé, s'il vous plaît" },
      { id: "res-5", japanese: "おかいけい を おねがいします", romaji: "okaikei wo onegaishimasu", french: "L'addition, s'il vous plaît" },
      { id: "res-6", japanese: "カード で はらえますか", romaji: "kaado de haraemasu ka", french: "Puis-je payer par carte ?" },
      { id: "res-7", japanese: "アレルギー が あります", romaji: "arerugii ga arimasu", french: "J'ai une allergie" },
      { id: "res-8", japanese: "みず を ください", romaji: "mizu wo kudasai", french: "De l'eau, s'il vous plaît" },
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    emoji: "🛍️",
    description: "Acheter et demander les prix",
    phrases: [
      { id: "sho-1", japanese: "いくら ですか", romaji: "ikura desu ka", french: "Combien ça coûte ?" },
      { id: "sho-2", japanese: "これ を ください", romaji: "kore wo kudasai", french: "Je prends ceci" },
      { id: "sho-3", japanese: "しちゃく して も いいですか", romaji: "shichaku shite mo ii desu ka", french: "Puis-je l'essayer ?" },
      { id: "sho-4", japanese: "おおきい サイズ は ありますか", romaji: "ookii saizu wa arimasu ka", french: "Avez-vous une plus grande taille ?" },
      { id: "sho-5", japanese: "げんきん で はらいます", romaji: "genkin de haraimasu", french: "Je paie en espèces" },
      { id: "sho-6", japanese: "レシート を ください", romaji: "reshiito wo kudasai", french: "Le reçu, s'il vous plaît" },
      { id: "sho-7", japanese: "たかい ですね", romaji: "takai desu ne", french: "C'est cher, non ?" },
    ],
  },
  {
    id: "urgences",
    title: "Urgences",
    emoji: "🆘",
    description: "Les phrases à connaître par cœur",
    phrases: [
      { id: "urg-1", japanese: "たすけて！", romaji: "tasukete!", french: "Au secours !" },
      { id: "urg-2", japanese: "けいさつ を よんで ください", romaji: "keisatsu wo yonde kudasai", french: "Appelez la police" },
      { id: "urg-3", japanese: "びょういん は どこ ですか", romaji: "byouin wa doko desu ka", french: "Où est l'hôpital ?" },
      { id: "urg-4", japanese: "いしゃ が ひつようです", romaji: "isha ga hitsuyou desu", french: "J'ai besoin d'un médecin" },
      { id: "urg-5", japanese: "まいご に なりました", romaji: "maigo ni narimashita", french: "Je suis perdu" },
      { id: "urg-6", japanese: "パスポート を なくしました", romaji: "pasupooto wo nakushimashita", french: "J'ai perdu mon passeport" },
      { id: "urg-7", japanese: "きゅうきゅうしゃ を よんで ください", romaji: "kyuukyuusha wo yonde kudasai", french: "Appelez une ambulance" },
      { id: "urg-8", japanese: "だいじょうぶ ですか", romaji: "daijoubu desu ka", french: "Est-ce que ça va ?" },
    ],
  },
  {
    id: "social",
    title: "Rencontres & Amis",
    emoji: "🤝",
    description: "Se faire des amis japonais",
    phrases: [
      { id: "soc-1", japanese: "にほんご が すこし はなせます", romaji: "nihongo ga sukoshi hanasemasu", french: "Je parle un peu japonais" },
      { id: "soc-2", japanese: "どこ から きましたか", romaji: "doko kara kimashita ka", french: "D'où venez-vous ?" },
      { id: "soc-3", japanese: "フランス から きました", romaji: "furansu kara kimashita", french: "Je viens de France" },
      { id: "soc-4", japanese: "また あいましょう", romaji: "mata aimashou", french: "Rencontrons-nous à nouveau !" },
      { id: "soc-5", japanese: "たのしかった です", romaji: "tanoshikatta desu", french: "C'était amusant !" },
      { id: "soc-6", japanese: "なまえ は なん ですか", romaji: "namae wa nan desu ka", french: "Quel est votre nom ?" },
      { id: "soc-7", japanese: "わたし は [なまえ] です", romaji: "watashi wa [namae] desu", french: "Je m'appelle [nom]" },
      { id: "soc-8", japanese: "インスタグラム を やって いますか", romaji: "insutaguramu wo yatte imasu ka", french: "Tu es sur Instagram ?" },
    ],
  },
  {
    id: "culture",
    title: "Culture & Loisirs",
    emoji: "🎌",
    description: "Parler de ses passions au Japon",
    phrases: [
      { id: "cul-1", japanese: "すし が だいすき です", romaji: "sushi ga daisuki desu", french: "J'adore les sushis" },
      { id: "cul-2", japanese: "おてら に いきたい です", romaji: "otera ni ikitai desu", french: "Je veux visiter un temple" },
      { id: "cul-3", japanese: "おまつり は いつ ですか", romaji: "omatsuri wa itsu desu ka", french: "Quand est le festival ?" },
      { id: "cul-4", japanese: "アニメ が すき ですか", romaji: "anime ga suki desu ka", french: "Aimes-tu les animés ?" },
      { id: "cul-5", japanese: "おんせん に はいりたい", romaji: "onsen ni hairitai", french: "Je veux aller aux onsen" },
      { id: "cul-6", japanese: "しゃしん を とって も いい ですか", romaji: "shashin wo totte mo ii desu ka", french: "Puis-je prendre une photo ?" },
      { id: "cul-7", japanese: "かわいい！", romaji: "kawaii!", french: "Trop mignon !" },
      { id: "cul-8", japanese: "おいしい！", romaji: "oishii!", french: "C'est délicieux !" },
    ],
  },
  {
    id: "travail",
    title: "Au travail / business",
    emoji: "💼",
    description: "Pour un voyage d'affaires ou un stage",
    phrases: [
      { id: "wrk-1", japanese: "おつかれさまです", romaji: "otsukaresama desu", french: "Merci pour votre travail (salutation pro)" },
      { id: "wrk-2", japanese: "かいぎ は なんじ から ですか", romaji: "kaigi wa nanji kara desu ka", french: "À quelle heure commence la réunion ?" },
      { id: "wrk-3", japanese: "めいし を いただけますか", romaji: "meishi wo itadakemasu ka", french: "Puis-je avoir votre carte de visite ?" },
      { id: "wrk-4", japanese: "しつれいします", romaji: "shitsurei shimasu", french: "Excusez-moi (en entrant/sortant)" },
      { id: "wrk-5", japanese: "メール で おくります", romaji: "meeru de okurimasu", french: "Je vous l'envoie par email" },
      { id: "wrk-6", japanese: "よろしく おねがいします", romaji: "yoroshiku onegaishimasu", french: "Ravi de travailler avec vous" },
      { id: "wrk-7", japanese: "もう いちど せつめい して ください", romaji: "mou ichido setsumei shite kudasai", french: "Expliquez encore une fois, svp" },
      { id: "wrk-8", japanese: "わかりました", romaji: "wakarimashita", french: "J'ai compris" },
    ],
  },
];

export const allPhrases = phraseCategories.flatMap((c) => c.phrases);

export function getPhraseCategory(id: string): PhraseCategory | undefined {
  return phraseCategories.find((c) => c.id === id);
}
