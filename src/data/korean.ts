import type { VocabWord, VocabCategory } from "./vocabulary";
import type { GrammarExample, GrammarLesson } from "./grammar";
import type { TravelPhrase, PhraseCategory } from "./phrases";

// ── Korean Alphabet (Hangeul 한글) ────────────────────────────────────────────
// We reuse the Kana interface with type "hangeul"
export interface HangeulChar {
  character: string;
  romaji: string; // romanized pronunciation
  row: string;
  rowLabel: string;
  type: "hangeul";
}

// ── Basic Consonants (자음) ───────────────────────────────────────────────────
const basicConsonants: HangeulChar[] = [
  { character: "ㄱ", romaji: "g/k", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㄴ", romaji: "n", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㄷ", romaji: "d/t", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㄹ", romaji: "r/l", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㅁ", romaji: "m", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㅂ", romaji: "b/p", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㅅ", romaji: "s", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㅇ", romaji: "ng/-", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㅈ", romaji: "j", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㅊ", romaji: "ch", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㅋ", romaji: "k", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㅌ", romaji: "t", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㅍ", romaji: "p", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
  { character: "ㅎ", romaji: "h", row: "basic-consonants", rowLabel: "Consonnes", type: "hangeul" },
];

// ── Basic Vowels (모음) ───────────────────────────────────────────────────────
const basicVowels: HangeulChar[] = [
  { character: "ㅏ", romaji: "a", row: "basic-vowels", rowLabel: "Voyelles", type: "hangeul" },
  { character: "ㅑ", romaji: "ya", row: "basic-vowels", rowLabel: "Voyelles", type: "hangeul" },
  { character: "ㅓ", romaji: "eo", row: "basic-vowels", rowLabel: "Voyelles", type: "hangeul" },
  { character: "ㅕ", romaji: "yeo", row: "basic-vowels", rowLabel: "Voyelles", type: "hangeul" },
  { character: "ㅗ", romaji: "o", row: "basic-vowels", rowLabel: "Voyelles", type: "hangeul" },
  { character: "ㅛ", romaji: "yo", row: "basic-vowels", rowLabel: "Voyelles", type: "hangeul" },
  { character: "ㅜ", romaji: "u", row: "basic-vowels", rowLabel: "Voyelles", type: "hangeul" },
  { character: "ㅠ", romaji: "yu", row: "basic-vowels", rowLabel: "Voyelles", type: "hangeul" },
  { character: "ㅡ", romaji: "eu", row: "basic-vowels", rowLabel: "Voyelles", type: "hangeul" },
  { character: "ㅣ", romaji: "i", row: "basic-vowels", rowLabel: "Voyelles", type: "hangeul" },
];

// ── Double Consonants (쌍자음) ─────────────────────────────────────────────────
const doubleConsonants: HangeulChar[] = [
  { character: "ㄲ", romaji: "kk", row: "double-consonants", rowLabel: "Cons. doubles", type: "hangeul" },
  { character: "ㄸ", romaji: "tt", row: "double-consonants", rowLabel: "Cons. doubles", type: "hangeul" },
  { character: "ㅃ", romaji: "pp", row: "double-consonants", rowLabel: "Cons. doubles", type: "hangeul" },
  { character: "ㅆ", romaji: "ss", row: "double-consonants", rowLabel: "Cons. doubles", type: "hangeul" },
  { character: "ㅉ", romaji: "jj", row: "double-consonants", rowLabel: "Cons. doubles", type: "hangeul" },
];

// ── Compound Vowels (복합 모음) ────────────────────────────────────────────────
const compoundVowels: HangeulChar[] = [
  { character: "ㅐ", romaji: "ae", row: "compound-vowels", rowLabel: "Voy. composées", type: "hangeul" },
  { character: "ㅒ", romaji: "yae", row: "compound-vowels", rowLabel: "Voy. composées", type: "hangeul" },
  { character: "ㅔ", romaji: "e", row: "compound-vowels", rowLabel: "Voy. composées", type: "hangeul" },
  { character: "ㅖ", romaji: "ye", row: "compound-vowels", rowLabel: "Voy. composées", type: "hangeul" },
  { character: "ㅘ", romaji: "wa", row: "compound-vowels", rowLabel: "Voy. composées", type: "hangeul" },
  { character: "ㅙ", romaji: "wae", row: "compound-vowels", rowLabel: "Voy. composées", type: "hangeul" },
  { character: "ㅚ", romaji: "oe", row: "compound-vowels", rowLabel: "Voy. composées", type: "hangeul" },
  { character: "ㅝ", romaji: "wo", row: "compound-vowels", rowLabel: "Voy. composées", type: "hangeul" },
  { character: "ㅞ", romaji: "we", row: "compound-vowels", rowLabel: "Voy. composées", type: "hangeul" },
  { character: "ㅟ", romaji: "wi", row: "compound-vowels", rowLabel: "Voy. composées", type: "hangeul" },
  { character: "ㅢ", romaji: "ui", row: "compound-vowels", rowLabel: "Voy. composées", type: "hangeul" },
];

// ── Combined: all hangeul ─────────────────────────────────────────────────────
export const hangeul: HangeulChar[] = [
  ...basicConsonants,
  ...basicVowels,
  ...doubleConsonants,
  ...compoundVowels,
];

// Row display order
export const hangeulRows = ["basic-consonants", "basic-vowels", "double-consonants", "compound-vowels"];
export const hangeulRowOrder = hangeulRows;

export const hangeulRowLabels: Record<string, string> = {
  "basic-consonants": "ㄱ Consonnes de base",
  "basic-vowels": "ㅏ Voyelles de base",
  "double-consonants": "ㄲ Consonnes doubles",
  "compound-vowels": "ㅐ Voyelles composées",
};

export const hangeulRowMnemonics: Record<string, string> = {
  "basic-consonants": "Les 14 consonnes de base. ㄱ (g) ressemble à un crochet, ㄴ (n) à un nez de profil, ㅁ (m) à une bouche carrée !",
  "basic-vowels": "Les 10 voyelles simples. Un trait vertical pour l'homme (ㅣ=i), un trait horizontal pour la terre (ㅡ=eu). Le point devenu petit trait indique le y (ㅏ=a → ㅑ=ya).",
  "double-consonants": "Les consonnes tendues (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ). Même forme que la simple mais doublée. Prononce avec plus de tension !",
  "compound-vowels": "Combinaison de deux voyelles : ㅗ+ㅏ=ㅘ (wa), ㅜ+ㅓ=ㅝ (wo). La règle : on lit de gauche à droite et de haut en bas.",
};

export function getHangeulByRow(row: string): HangeulChar[] {
  return hangeul.filter((h) => h.row === row);
}

export function getHangeulByRomaji(romaji: string): HangeulChar | undefined {
  return hangeul.find((h) => h.romaji === romaji);
}

// ── Korean Vocabulary ─────────────────────────────────────────────────────────
const koreanVocab: VocabCategory[] = [
  {
    id: "salutations",
    title: "Salutations",
    emoji: "👋",
    description: "Les bases pour commencer toute conversation",
    words: [
      { id: "kr-sal-1", japanese: "안녕하세요", romaji: "annyeonghaseyo", french: "Bonjour (poli)" },
      { id: "kr-sal-2", japanese: "안녕", romaji: "annyeong", french: "Salut (informel)" },
      { id: "kr-sal-3", japanese: "감사합니다", romaji: "gamsahamnida", french: "Merci beaucoup" },
      { id: "kr-sal-4", japanese: "고맙습니다", romaji: "gomapseumnida", french: "Merci (formel)" },
      { id: "kr-sal-5", japanese: "죄송합니다", romaji: "joesonghamnida", french: "Je suis désolé" },
      { id: "kr-sal-6", japanese: "미안해요", romaji: "mianhaeyo", french: "Désolé (poli)" },
      { id: "kr-sal-7", japanese: "네", romaji: "ne", french: "Oui" },
      { id: "kr-sal-8", japanese: "아니요", romaji: "aniyo", french: "Non" },
      { id: "kr-sal-9", japanese: "안녕히 계세요", romaji: "annyeonghi gyeseyo", french: "Au revoir (à celui qui reste)" },
      { id: "kr-sal-10", japanese: "안녕히 가세요", romaji: "annyeonghi gaseyo", french: "Au revoir (à celui qui part)" },
      { id: "kr-sal-11", japanese: "처음 뵙겠습니다", romaji: "cheoeum boepgetseumnida", french: "Enchanté" },
      { id: "kr-sal-12", japanese: "천만에요", romaji: "cheonmaneyo", french: "De rien" },
    ],
  },
  {
    id: "nombres",
    title: "Nombres",
    emoji: "🔢",
    description: "Compter en coréen (système sino-coréen)",
    words: [
      { id: "kr-num-1", japanese: "일", romaji: "il", french: "Un (1)" },
      { id: "kr-num-2", japanese: "이", romaji: "i", french: "Deux (2)" },
      { id: "kr-num-3", japanese: "삼", romaji: "sam", french: "Trois (3)" },
      { id: "kr-num-4", japanese: "사", romaji: "sa", french: "Quatre (4)" },
      { id: "kr-num-5", japanese: "오", romaji: "o", french: "Cinq (5)" },
      { id: "kr-num-6", japanese: "육", romaji: "yuk", french: "Six (6)" },
      { id: "kr-num-7", japanese: "칠", romaji: "chil", french: "Sept (7)" },
      { id: "kr-num-8", japanese: "팔", romaji: "pal", french: "Huit (8)" },
      { id: "kr-num-9", japanese: "구", romaji: "gu", french: "Neuf (9)" },
      { id: "kr-num-10", japanese: "십", romaji: "sip", french: "Dix (10)" },
      { id: "kr-num-11", japanese: "백", romaji: "baek", french: "Cent (100)" },
      { id: "kr-num-12", japanese: "천", romaji: "cheon", french: "Mille (1000)" },
    ],
  },
  {
    id: "nourriture",
    title: "Nourriture",
    emoji: "🍜",
    description: "Commander et apprécier la cuisine coréenne",
    words: [
      { id: "kr-foo-1", japanese: "밥", romaji: "bap", french: "Riz / repas" },
      { id: "kr-foo-2", japanese: "물", romaji: "mul", french: "Eau" },
      { id: "kr-foo-3", japanese: "차", romaji: "cha", french: "Thé" },
      { id: "kr-foo-4", japanese: "커피", romaji: "keopi", french: "Café" },
      { id: "kr-foo-5", japanese: "빵", romaji: "ppang", french: "Pain" },
      { id: "kr-foo-6", japanese: "생선", romaji: "saengseon", french: "Poisson" },
      { id: "kr-foo-7", japanese: "고기", romaji: "gogi", french: "Viande" },
      { id: "kr-foo-8", japanese: "야채", romaji: "yachae", french: "Légumes" },
      { id: "kr-foo-9", japanese: "과일", romaji: "gwail", french: "Fruits" },
      { id: "kr-foo-10", japanese: "계란", romaji: "gyeran", french: "Œuf" },
      { id: "kr-foo-11", japanese: "라면", romaji: "ramyeon", french: "Ramen (nouilles)" },
      { id: "kr-foo-12", japanese: "김치", romaji: "gimchi", french: "Kimchi" },
    ],
  },
  {
    id: "famille",
    title: "Famille",
    emoji: "👨‍👩‍👧‍👦",
    description: "Parler de sa famille et des autres",
    words: [
      { id: "kr-fam-1", japanese: "가족", romaji: "gajok", french: "Famille" },
      { id: "kr-fam-2", japanese: "어머니", romaji: "eomeoni", french: "Mère" },
      { id: "kr-fam-3", japanese: "아버지", romaji: "abeoji", french: "Père" },
      { id: "kr-fam-4", japanese: "언니", romaji: "eonni", french: "Grande sœur (d'une femme)" },
      { id: "kr-fam-5", japanese: "오빠", romaji: "oppa", french: "Grand frère (d'une femme)" },
      { id: "kr-fam-6", japanese: "누나", romaji: "nuna", french: "Grande sœur (d'un homme)" },
      { id: "kr-fam-7", japanese: "형", romaji: "hyeong", french: "Grand frère (d'un homme)" },
      { id: "kr-fam-8", japanese: "동생", romaji: "dongsaeng", french: "Petit frère / sœur" },
      { id: "kr-fam-9", japanese: "아이", romaji: "ai", french: "Enfant" },
      { id: "kr-fam-10", japanese: "친구", romaji: "chingu", french: "Ami" },
      { id: "kr-fam-11", japanese: "저", romaji: "jeo", french: "Je / moi (poli)" },
      { id: "kr-fam-12", japanese: "나", romaji: "na", french: "Je / moi (informel)" },
    ],
  },
  {
    id: "couleurs",
    title: "Couleurs",
    emoji: "🎨",
    description: "Décrire le monde qui t'entoure",
    words: [
      { id: "kr-col-1", japanese: "빨간색", romaji: "ppalgansaek", french: "Rouge" },
      { id: "kr-col-2", japanese: "파란색", romaji: "paransaek", french: "Bleu" },
      { id: "kr-col-3", japanese: "노란색", romaji: "noransaek", french: "Jaune" },
      { id: "kr-col-4", japanese: "초록색", romaji: "choroksaek", french: "Vert" },
      { id: "kr-col-5", japanese: "하얀색", romaji: "hayansaek", french: "Blanc" },
      { id: "kr-col-6", japanese: "검은색", romaji: "geomeunsaek", french: "Noir" },
      { id: "kr-col-7", japanese: "갈색", romaji: "galsaek", french: "Marron" },
      { id: "kr-col-8", japanese: "보라색", romaji: "borasaek", french: "Violet" },
      { id: "kr-col-9", japanese: "주황색", romaji: "juhwangsaek", french: "Orange" },
      { id: "kr-col-10", japanese: "분홍색", romaji: "bunhongsaek", french: "Rose" },
      { id: "kr-col-11", japanese: "회색", romaji: "hoesaek", french: "Gris" },
      { id: "kr-col-12", japanese: "남색", romaji: "namsaek", french: "Bleu marine" },
    ],
  },
  {
    id: "temps",
    title: "Temps & Jours",
    emoji: "⏰",
    description: "Se repérer dans le temps",
    words: [
      { id: "kr-tim-1", japanese: "오늘", romaji: "oneul", french: "Aujourd'hui" },
      { id: "kr-tim-2", japanese: "내일", romaji: "naeil", french: "Demain" },
      { id: "kr-tim-3", japanese: "어제", romaji: "eoje", french: "Hier" },
      { id: "kr-tim-4", japanese: "지금", romaji: "jigeum", french: "Maintenant" },
      { id: "kr-tim-5", japanese: "아침", romaji: "achim", french: "Matin" },
      { id: "kr-tim-6", japanese: "점심", romaji: "jeomsim", french: "Midi / déjeuner" },
      { id: "kr-tim-7", japanese: "저녁", romaji: "jeonyeok", french: "Soir" },
      { id: "kr-tim-8", japanese: "시간", romaji: "sigan", french: "Temps / heure" },
      { id: "kr-tim-9", japanese: "매일", romaji: "maeil", french: "Tous les jours" },
      { id: "kr-tim-10", japanese: "주말", romaji: "jumal", french: "Le week-end" },
      { id: "kr-tim-11", japanese: "월요일", romaji: "woryoil", french: "Lundi" },
      { id: "kr-tim-12", japanese: "일요일", romaji: "iryoil", french: "Dimanche" },
    ],
  },
  {
    id: "voyage",
    title: "Voyage & Transport",
    emoji: "✈️",
    description: "L'essentiel pour se déplacer en Corée",
    words: [
      { id: "kr-tra-1", japanese: "공항", romaji: "gonghang", french: "Aéroport" },
      { id: "kr-tra-2", japanese: "역", romaji: "yeok", french: "Gare / station" },
      { id: "kr-tra-3", japanese: "지하철", romaji: "jihacheol", french: "Métro" },
      { id: "kr-tra-4", japanese: "버스", romaji: "beoseu", french: "Bus" },
      { id: "kr-tra-5", japanese: "택시", romaji: "taeksi", french: "Taxi" },
      { id: "kr-tra-6", japanese: "호텔", romaji: "hotel", french: "Hôtel" },
      { id: "kr-tra-7", japanese: "표", romaji: "pyo", french: "Billet" },
      { id: "kr-tra-8", japanese: "여권", romaji: "yeogwon", french: "Passeport" },
      { id: "kr-tra-9", japanese: "지도", romaji: "jido", french: "Carte (plan)" },
      { id: "kr-tra-10", japanese: "도시", romaji: "dosi", french: "Ville" },
      { id: "kr-tra-11", japanese: "길", romaji: "gil", french: "Route / chemin" },
      { id: "kr-tra-12", japanese: "여행", romaji: "yeohaeng", french: "Voyage" },
    ],
  },
  {
    id: "quotidien",
    title: "Vie quotidienne",
    emoji: "🏠",
    description: "Les objets et lieux de tous les jours",
    words: [
      { id: "kr-dai-1", japanese: "집", romaji: "jip", french: "Maison" },
      { id: "kr-dai-2", japanese: "방", romaji: "bang", french: "Chambre / pièce" },
      { id: "kr-dai-3", japanese: "학교", romaji: "hakgyo", french: "École" },
      { id: "kr-dai-4", japanese: "일", romaji: "il", french: "Travail" },
      { id: "kr-dai-5", japanese: "돈", romaji: "don", french: "Argent" },
      { id: "kr-dai-6", japanese: "책", romaji: "chaek", french: "Livre" },
      { id: "kr-dai-7", japanese: "전화", romaji: "jeonhwa", french: "Téléphone" },
      { id: "kr-dai-8", japanese: "자동차", romaji: "jadongcha", french: "Voiture" },
      { id: "kr-dai-9", japanese: "시계", romaji: "sigye", french: "Montre / horloge" },
      { id: "kr-dai-10", japanese: "가방", romaji: "gabang", french: "Sac" },
      { id: "kr-dai-11", japanese: "신발", romaji: "sinbal", french: "Chaussures" },
      { id: "kr-dai-12", japanese: "옷", romaji: "ot", french: "Vêtements" },
    ],
  },
  {
    id: "corps",
    title: "Le corps",
    emoji: "🦶",
    description: "Décrire son corps et sa santé",
    words: [
      { id: "kr-bod-1", japanese: "머리", romaji: "meori", french: "Tête" },
      { id: "kr-bod-2", japanese: "눈", romaji: "nun", french: "Œil" },
      { id: "kr-bod-3", japanese: "코", romaji: "ko", french: "Nez" },
      { id: "kr-bod-4", japanese: "입", romaji: "ip", french: "Bouche" },
      { id: "kr-bod-5", japanese: "귀", romaji: "gwi", french: "Oreille" },
      { id: "kr-bod-6", japanese: "손", romaji: "son", french: "Main" },
      { id: "kr-bod-7", japanese: "발", romaji: "bal", french: "Pied" },
      { id: "kr-bod-8", japanese: "팔", romaji: "pal", french: "Bras" },
      { id: "kr-bod-9", japanese: "다리", romaji: "dari", french: "Jambe" },
      { id: "kr-bod-10", japanese: "배", romaji: "bae", french: "Ventre" },
      { id: "kr-bod-11", japanese: "목", romaji: "mok", french: "Cou" },
      { id: "kr-bod-12", japanese: "이", romaji: "i", french: "Dent" },
    ],
  },
  {
    id: "adjectifs",
    title: "Adjectifs courants",
    emoji: "✨",
    description: "Les adjectifs du quotidien",
    words: [
      { id: "kr-adj-1", japanese: "좋다", romaji: "jota", french: "Bon / être bien" },
      { id: "kr-adj-2", japanese: "나쁘다", romaji: "nappeuda", french: "Mauvais" },
      { id: "kr-adj-3", japanese: "크다", romaji: "keuda", french: "Grand" },
      { id: "kr-adj-4", japanese: "작다", romaji: "jakda", french: "Petit" },
      { id: "kr-adj-5", japanese: "많다", romaji: "manta", french: "Beaucoup" },
      { id: "kr-adj-6", japanese: "적다", romaji: "jeokda", french: "Peu" },
      { id: "kr-adj-7", japanese: "빠르다", romaji: "ppareuda", french: "Rapide" },
      { id: "kr-adj-8", japanese: "느리다", romaji: "neurida", french: "Lent" },
      { id: "kr-adj-9", japanese: "비싸다", romaji: "bissada", french: "Cher (coûteux)" },
      { id: "kr-adj-10", japanese: "싸다", romaji: "ssada", french: "Bon marché" },
      { id: "kr-adj-11", japanese: "덥다", romaji: "deopda", french: "Chaud (temps)" },
      { id: "kr-adj-12", japanese: "춥다", romaji: "chupda", french: "Froid (temps)" },
    ],
  },
  {
    id: "verbes",
    title: "Verbes essentiels",
    emoji: "🏃",
    description: "Les verbes les plus utiles au quotidien",
    words: [
      { id: "kr-ver-1", japanese: "하다", romaji: "hada", french: "Faire" },
      { id: "kr-ver-2", japanese: "가다", romaji: "gada", french: "Aller" },
      { id: "kr-ver-3", japanese: "오다", romaji: "oda", french: "Venir" },
      { id: "kr-ver-4", japanese: "먹다", romaji: "meokda", french: "Manger" },
      { id: "kr-ver-5", japanese: "마시다", romaji: "masida", french: "Boire" },
      { id: "kr-ver-6", japanese: "보다", romaji: "boda", french: "Voir / regarder" },
      { id: "kr-ver-7", japanese: "듣다", romaji: "deutda", french: "Écouter" },
      { id: "kr-ver-8", japanese: "말하다", romaji: "malhada", french: "Parler" },
      { id: "kr-ver-9", japanese: "읽다", romaji: "ikda", french: "Lire" },
      { id: "kr-ver-10", japanese: "쓰다", romaji: "sseuda", french: "Écrire" },
      { id: "kr-ver-11", japanese: "사다", romaji: "sada", french: "Acheter" },
      { id: "kr-ver-12", japanese: "자다", romaji: "jada", french: "Dormir" },
    ],
  },
];

export const koreanVocabCategories = koreanVocab;
export const allKoreanVocabWords: VocabWord[] = koreanVocab.flatMap((c) => c.words);

// ── Korean Grammar ────────────────────────────────────────────────────────────
export const koreanGrammarLessons: GrammarLesson[] = [
  {
    id: "ordre-mots",
    title: "L'ordre des mots",
    subtitle: "Sujet + Objet + Verbe",
    level: "débutant",
    explanation:
      "Comme en japonais, le coréen place le verbe TOUJOURS à la fin. La particule 은/는 marque le thème : « 저는 학생입니다 » = « Je suis étudiant ». C'est le squelette de la phrase coréenne.",
    examples: [
      { japanese: "저는 학생입니다", romaji: "jeoneun haksaeng-imnida", french: "Je suis étudiant." },
      { japanese: "이것은 책입니다", romaji: "igeoseun chaeg-imnida", french: "C'est un livre." },
      { japanese: "한국어는 재미있습니다", romaji: "hangugeoneun jaemiitseumnida", french: "Le coréen est intéressant." },
    ],
    tip: "은/는 après une consonne, 는 après une voyelle : 책은, 저는. Facile à retenir !",
  },
  {
    id: "particule-eul-reul",
    title: "을/를 — L'objet",
    subtitle: "La particule d'objet",
    level: "débutant",
    explanation:
      "을/를 marque l'objet de l'action : « 밥을 먹어요 » = « Je mange du riz ». 을 après une consonne, 를 après une voyelle. C'est l'équivalent exact du を japonais.",
    examples: [
      { japanese: "밥을 먹어요", romaji: "babeul meogeoyo", french: "Je mange du riz." },
      { japanese: "물을 마셔요", romaji: "mureul masyeoyo", french: "Je bois de l'eau." },
      { japanese: "영화를 봐요", romaji: "yeonghwareul bwayo", french: "Je regarde un film." },
    ],
    tip: "Consonne → 을, Voyelle → 를. 밥을, 영화를. Tu verras cette particule partout !",
  },
  {
    id: "particule-e",
    title: "에 — Destination et temps",
    subtitle: "Aller quelque part",
    level: "débutant",
    explanation:
      "에 indique la destination ou le moment : « 학교에 가요 » = « Je vais à l'école », « 3시에 만나요 » = « On se voit à 3h ». Une seule particule pour le lieu et le temps !",
    examples: [
      { japanese: "학교에 가요", romaji: "hakgyoe gayo", french: "Je vais à l'école." },
      { japanese: "한국에 가고 싶어요", romaji: "hanguke gago sipeoyo", french: "Je veux aller en Corée." },
      { japanese: "아침에 커피를 마셔요", romaji: "achime keopireul masyeoyo", french: "Je bois du café le matin." },
    ],
    tip: "에 = destination (à) OU moment. Un seul mot pour deux usages, très économique !",
  },
  {
    id: "eo-yo",
    title: "Le présent poli : 아/어요",
    subtitle: "La forme de base polie",
    level: "débutant",
    explanation:
      "Pour conjuguer un verbe au présent poli, on ajoute 아요 ou 어요 selon la voyelle du radical. Si la dernière voyelle est ㅏ ou ㅗ → 아요, sinon → 어요. 하다 devient 해요 (irrégulier).",
    examples: [
      { japanese: "먹어요", romaji: "meogeoyo", french: "Je mange (poli)" },
      { japanese: "가요", romaji: "gayo", french: "Je vais (poli)" },
      { japanese: "공부해요", romaji: "gongbuhaeyo", french: "J'étudie (poli)" },
    ],
    tip: "ㅏ/ㅗ dans le radical → 아요 (가다→가요). Sinon → 어요 (먹다→먹어요). 하다 → 해요.",
  },
  {
    id: "negation",
    title: "La négation : 안",
    subtitle: "Dire « ne pas »",
    level: "essentiel",
    explanation:
      "Pour nier un verbe ou un adjectif en coréen, il suffit de placer 안 avant. C'est aussi simple que ça : « 안 먹어요 » = « je ne mange pas ». Il existe aussi la forme en -지 않다, plus formelle.",
    examples: [
      { japanese: "안 먹어요", romaji: "an meogeoyo", french: "Je ne mange pas." },
      { japanese: "안 가요", romaji: "an gayo", french: "Je ne vais pas." },
      { japanese: "안 좋아요", romaji: "an joayo", french: "Ce n'est pas bon." },
    ],
    tip: "안 se place juste avant le verbe. Aussi simple que ça. « 안 » + verbe = négation !",
  },
  {
    id: "passe",
    title: "Le passé : 았/었어요",
    subtitle: "Parler de ce qui est arrivé",
    level: "essentiel",
    explanation:
      "Pour le passé poli, on ajoute 았어요 ou 었어요. Même règle que le présent : ㅏ/ㅗ → 았어요, sinon → 었어요. 하다 → 했어요. Pour « être » (이다), on utilise 였어요.",
    examples: [
      { japanese: "어제 뭐 했어요?", romaji: "eoje mwo haesseoyo?", french: "Qu'as-tu fait hier ?" },
      { japanese: "밥을 먹었어요", romaji: "babeul meogeosseoyo", french: "J'ai mangé du riz." },
      { japanese: "영화를 봤어요", romaji: "yeonghwareul bwasseoyo", french: "J'ai regardé un film." },
    ],
    tip: "Même voyelle qu'au présent + ㅆ어요 : 가요→갔어요, 먹어요→먹었어요. 하다→했어요.",
  },
  {
    id: "futur",
    title: "Le futur : (으)ㄹ 거예요",
    subtitle: "Parler de ses projets",
    level: "essentiel",
    explanation:
      "Le futur poli se forme avec (으)ㄹ 거예요. Après une consonne → 을 거예요, après une voyelle → ㄹ 거예요. C'est l'équivalent de « je vais... » ou « je ferai... » en français.",
    examples: [
      { japanese: "내일 갈 거예요", romaji: "naeil gal geoyeyo", french: "J'irai demain." },
      { japanese: "뭐 먹을 거예요?", romaji: "mwo meogeul geoyeyo?", french: "Que vas-tu manger ?" },
      { japanese: "한국어를 공부할 거예요", romaji: "hangugeoreul gongbuhal geoyeyo", french: "J'étudierai le coréen." },
    ],
    tip: "Voyelle → ㄹ 거예요 (가다→갈 거예요). Consonne → 을 거예요 (먹다→먹을 거예요).",
  },
  {
    id: "vouloir",
    title: "Exprimer ses envies : 고 싶다",
    subtitle: "Dire « je veux »",
    level: "essentiel",
    explanation:
      "고 싶다 attaché au radical du verbe exprime le désir : « 먹고 싶어요 » = « je veux manger ». C'est le même principe que たい en japonais. Pour un objet qu'on veut, on utilise 갖고 싶다 (littéralement « vouloir posséder »).",
    examples: [
      { japanese: "한국에 가고 싶어요", romaji: "hanguke gago sipeoyo", french: "Je veux aller en Corée." },
      { japanese: "비빔밥을 먹고 싶어요", romaji: "bibimbabeul meokgo sipeoyo", french: "Je veux manger un bibimbap." },
      { japanese: "그 책을 갖고 싶어요", romaji: "geu chaegeul gatgo sipeoyo", french: "Je veux ce livre." },
    ],
    tip: "Verbe (radical) + 고 싶다 = vouloir faire. N'oublie pas de conjuguer 싶다 (싶어요) !",
  },
  {
    id: "si",
    title: "Si... alors : (으)면",
    subtitle: "Les conditions",
    level: "essentiel",
    explanation:
      "La forme en (으)면 exprime « si » : « 가면 » = « si je vais ». Consonne → 으면, voyelle → 면. Très courant dans les conversations quotidiennes pour faire des hypothèses ou donner des conseils.",
    examples: [
      { japanese: "한국에 가면 뭐 할 거예요?", romaji: "hanguke gamyeon mwo hal geoyeyo?", french: "Si tu vas en Corée, que feras-tu ?" },
      { japanese: "비가 오면 안 가요", romaji: "biga omyeon an gayo", french: "S'il pleut, je n'irai pas." },
      { japanese: "시간이 있으면 같이 가요", romaji: "sigani isseumyeon gachi gayo", french: "Si tu as le temps, allons-y ensemble." },
    ],
    tip: "Voyelle → 면, Consonne → 으면. 가다→가면, 먹다→먹으면. Simple !",
  },
  {
    id: "honorifique",
    title: "Le registre honorifique : 시",
    subtitle: "Parler avec respect",
    level: "essentiel",
    explanation:
      "Le coréen a un système de politesse très développé. Le suffixe 시 (devenant 세요 dans les formes polies) s'utilise pour honorer le sujet : « 가세요 » = « allez » (à une personne âgée/supérieure). Toujours utiliser avec les inconnus !",
    examples: [
      { japanese: "어디 가세요?", romaji: "eodi gaseyo?", french: "Où allez-vous ? (poli)" },
      { japanese: "앉으세요", romaji: "anjeuseyo", french: "Asseyez-vous, s'il vous plaît." },
      { japanese: "드세요", romaji: "deuseyo", french: "Mangez / buvez (forme honorifique de 먹다/마시다)." },
    ],
    tip: "세요 est la forme honorifique de 아/어요. Tu l'utilises avec des inconnus ou des aînés. Ne l'oublie pas en Corée !",
  },
  {
    id: "compteurs",
    title: "Les classificateurs numéraux",
    subtitle: "Compter en coréen",
    level: "essentiel",
    explanation:
      "Le coréen utilise un système coréen natif pour les petits nombres (하나, 둘, 셋...) et des classificateurs : 명 pour les personnes, 개 pour les objets, 마리 pour les animaux, 잔 pour les verres, 병 pour les bouteilles, 장 pour les feuilles/pages.",
    examples: [
      { japanese: "두 명 주세요", romaji: "du myeong juseyo", french: "Deux personnes, s'il vous plaît." },
      { japanese: "사과 세 개", romaji: "sagwa se gae", french: "Trois pommes." },
      { japanese: "커피 한 잔", romaji: "keopi han jan", french: "Un café (un verre de café)." },
    ],
    tip: "Nombres natifs coréens : 하나(1), 둘(2), 셋(3), 넷(4), 다섯(5). Devant un classificateur : 한, 두, 세, 네, 다섯.",
  },
  {
    id: "locations",
    title: "위, 아래, 앞, 뒤 — Positions",
    subtitle: "Se repérer dans l'espace",
    level: "essentiel",
    explanation:
      "Les mots de position se placent après le nom avec 에 : « 책상 위에 » = « sur le bureau », « 의자 아래에 » = « sous la chaise ». Pratique pour décrire où se trouvent les choses !",
    examples: [
      { japanese: "책상 위에 있어요", romaji: "chaeksang wie isseoyo", french: "C'est sur le bureau." },
      { japanese: "은행은 병원 앞에 있어요", romaji: "eunhaengeun byeongwon ape isseoyo", french: "La banque est devant l'hôpital." },
      { japanese: "고양이가 소파 뒤에 있어요", romaji: "goyangiga sopa dwie isseoyo", french: "Le chat est derrière le canapé." },
    ],
    tip: "위 = dessus, 아래/밑 = dessous, 앞 = devant, 뒤 = derrière, 옆 = à côté. Toujours avec 에 !",
  },
  {
    id: "etre-avoir",
    title: "있다 et 없다 : être et ne pas être",
    subtitle: "« Il y a » et « il n'y a pas »",
    level: "essentiel",
    explanation:
      "있다 signifie à la fois « être (quelque part) » et « avoir ». 없다 signifie « ne pas être présent » et « ne pas avoir ». « 저는 책이 있어요 » = « j'ai un livre » (littéralement : « à moi, un livre existe »).",
    examples: [
      { japanese: "화장실이 어디에 있어요?", romaji: "hwajangsiri eodie isseoyo?", french: "Où sont les toilettes ?" },
      { japanese: "시간이 없어요", romaji: "sigani eopseoyo", french: "Je n'ai pas le temps." },
      { japanese: "질문이 있어요", romaji: "jilmuni isseoyo", french: "J'ai une question." },
    ],
    tip: "Le sujet de 있다/없다 prend 이/가, PAS 을/를. 돈이 없어요 = je n'ai pas d'argent.",
  },
  {
    id: "pouvoir",
    title: "Pouvoir : (으)ㄹ 수 있다",
    subtitle: "Exprimer la capacité",
    level: "essentiel",
    explanation:
      "(으)ㄹ 수 있다 = pouvoir faire. (으)ㄹ 수 없다 = ne pas pouvoir. « 한국어를 할 수 있어요? » = « Parlez-vous coréen ? ». Une des constructions les plus utiles !",
    examples: [
      { japanese: "한국어를 할 수 있어요?", romaji: "hangugeoreul hal su isseoyo?", french: "Parlez-vous coréen ?" },
      { japanese: "여기서 사진을 찍을 수 있어요?", romaji: "yeogiseo sajineul jjigeul su isseoyo?", french: "Puis-je prendre une photo ici ?" },
      { japanese: "카드로 계산할 수 있어요?", romaji: "kadeuro gyesanhal su isseoyo?", french: "Puis-je payer par carte ?" },
    ],
    tip: "(으)ㄹ 수 있어요 = je peux, (으)ㄹ 수 없어요 = je ne peux pas. Garde cette structure en tête !",
  },
];

// ── Korean Travel Phrases ─────────────────────────────────────────────────────
export const koreanPhraseCategories: PhraseCategory[] = [
  {
    id: "essentiel",
    title: "L'essentiel",
    emoji: "⭐",
    description: "Les phrases de survie en Corée",
    phrases: [
      { id: "kr-ess-1", japanese: "실례합니다", romaji: "sillyehamnida", french: "Excusez-moi" },
      { id: "kr-ess-2", japanese: "감사합니다", romaji: "gamsahamnida", french: "Merci beaucoup" },
      { id: "kr-ess-3", japanese: "이해하지 못해요", romaji: "ihaehaji mothaeyo", french: "Je ne comprends pas" },
      { id: "kr-ess-4", japanese: "다시 한 번 말해 주세요", romaji: "dasi han beon malhae juseyo", french: "Encore une fois, s'il vous plaît" },
      { id: "kr-ess-5", japanese: "한국어를 못 해요", romaji: "hangugeoreul mot haeyo", french: "Je ne parle pas coréen" },
      { id: "kr-ess-6", japanese: "영어 할 수 있어요?", romaji: "yeongeo hal su isseoyo?", french: "Parlez-vous anglais ?" },
      { id: "kr-ess-7", japanese: "도와주세요", romaji: "dowajuseyo", french: "Aidez-moi, s'il vous plaît" },
      { id: "kr-ess-8", japanese: "괜찮아요?", romaji: "gwaenchanayo?", french: "Ça va ?" },
    ],
  },
  {
    id: "transport",
    title: "Transport & direction",
    emoji: "🚆",
    description: "Se déplacer dans les villes coréennes",
    phrases: [
      { id: "kr-tra-1", japanese: "지하철역이 어디예요?", romaji: "jihacheoryeogi eodiyeyo?", french: "Où est la station de métro ?" },
      { id: "kr-tra-2", japanese: "서울역에 가 주세요", romaji: "seoullyeoge ga juseyo", french: "Emmenez-moi à la gare de Séoul" },
      { id: "kr-tra-3", japanese: "표는 어디서 사요?", romaji: "pyoneun eodiseo sayo?", french: "Où puis-je acheter un billet ?" },
      { id: "kr-tra-4", japanese: "다음 역은 어디예요?", romaji: "daeum yeogeun eodiyeyo?", french: "Quelle est la prochaine station ?" },
      { id: "kr-tra-5", japanese: "공항까지 가고 싶어요", romaji: "gonghangkkaji gago sipeoyo", french: "Je veux aller à l'aéroport" },
      { id: "kr-tra-6", japanese: "여기서 내릴게요", romaji: "yeogiseo naerilgeyo", french: "Je descends ici" },
      { id: "kr-tra-7", japanese: "몇 번 출구예요?", romaji: "myeot beon chulguyeyo?", french: "Quelle sortie ?" },
      { id: "kr-tra-8", japanese: "왼쪽으로 가 주세요", romaji: "oenjjogeuro ga juseyo", french: "Allez à gauche" },
    ],
  },
  {
    id: "hotel",
    title: "À l'hôtel",
    emoji: "🏨",
    description: "S'enregistrer et passer un bon séjour",
    phrases: [
      { id: "kr-hot-1", japanese: "예약했어요", romaji: "yeyakaesseoyo", french: "J'ai une réservation" },
      { id: "kr-hot-2", japanese: "체크인 해 주세요", romaji: "chekeuin hae juseyo", french: "Le check-in, s'il vous plaît" },
      { id: "kr-hot-3", japanese: "아침 식사가 포함돼 있어요?", romaji: "achim siksaga pohamdwae isseoyo?", french: "Le petit-déjeuner est-il inclus ?" },
      { id: "kr-hot-4", japanese: "짐을 맡아 주실 수 있어요?", romaji: "jimeul mata jusil su isseoyo?", french: "Pouvez-vous garder mes bagages ?" },
      { id: "kr-hot-5", japanese: "방을 바꾸고 싶어요", romaji: "bangeul bakkugo sipeoyo", french: "Je veux changer de chambre" },
      { id: "kr-hot-6", japanese: "무료 와이파이가 있어요?", romaji: "muryo waipaiga isseoyo?", french: "Y a-t-il du Wi-Fi gratuit ?" },
      { id: "kr-hot-7", japanese: "몇 시까지예요?", romaji: "myeot sikkajiyeyo?", french: "Jusqu'à quelle heure ?" },
    ],
  },
  {
    id: "restaurant",
    title: "Au restaurant",
    emoji: "🍜",
    description: "Commander comme un local",
    phrases: [
      { id: "kr-res-1", japanese: "메뉴 주세요", romaji: "menyu juseyo", french: "La carte, s'il vous plaît" },
      { id: "kr-res-2", japanese: "뭐가 맛있어요?", romaji: "mwoga masisseoyo?", french: "Qu'est-ce qui est bon ?" },
      { id: "kr-res-3", japanese: "이거 주세요", romaji: "igeo juseyo", french: "Je prends ceci, s'il vous plaît" },
      { id: "kr-res-4", japanese: "맵지 않게 해 주세요", romaji: "maepji anke hae juseyo", french: "Pas épicé, s'il vous plaît" },
      { id: "kr-res-5", japanese: "계산서 주세요", romaji: "gyesanseo juseyo", french: "L'addition, s'il vous plaît" },
      { id: "kr-res-6", japanese: "카드 돼요?", romaji: "kadeu dwaeyo?", french: "Puis-je payer par carte ?" },
      { id: "kr-res-7", japanese: "알레르기가 있어요", romaji: "allereugiga isseoyo", french: "J'ai une allergie" },
      { id: "kr-res-8", japanese: "물 주세요", romaji: "mul juseyo", french: "De l'eau, s'il vous plaît" },
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    emoji: "🛍️",
    description: "Acheter et demander les prix",
    phrases: [
      { id: "kr-sho-1", japanese: "얼마예요?", romaji: "eolmayeyo?", french: "Combien ça coûte ?" },
      { id: "kr-sho-2", japanese: "이거 주세요", romaji: "igeo juseyo", french: "Je prends ceci" },
      { id: "kr-sho-3", japanese: "입어 봐도 돼요?", romaji: "ibeo bwado dwaeyo?", french: "Puis-je l'essayer ?" },
      { id: "kr-sho-4", japanese: "더 큰 사이즈 있어요?", romaji: "deo keun saijeu isseoyo?", french: "Avez-vous une plus grande taille ?" },
      { id: "kr-sho-5", japanese: "현금으로 계산할게요", romaji: "hyeongeumeuro gyesanhalgeyo", french: "Je paie en espèces" },
      { id: "kr-sho-6", japanese: "영수증 주세요", romaji: "yeongsujeung juseyo", french: "Le reçu, s'il vous plaît" },
      { id: "kr-sho-7", japanese: "비싸네요!", romaji: "bissaneyo!", french: "C'est cher !" },
    ],
  },
  {
    id: "urgences",
    title: "Urgences",
    emoji: "🆘",
    description: "Les phrases à connaître par cœur",
    phrases: [
      { id: "kr-urg-1", japanese: "살려주세요!", romaji: "sallyeojuseyo!", french: "Au secours !" },
      { id: "kr-urg-2", japanese: "경찰을 불러 주세요", romaji: "gyeongchareul bulleo juseyo", french: "Appelez la police" },
      { id: "kr-urg-3", japanese: "병원이 어디예요?", romaji: "byeongwoni eodiyeyo?", french: "Où est l'hôpital ?" },
      { id: "kr-urg-4", japanese: "의사가 필요해요", romaji: "uisaga piryohaeyo", french: "J'ai besoin d'un médecin" },
      { id: "kr-urg-5", japanese: "길을 잃었어요", romaji: "gireul ireosseoyo", french: "Je suis perdu" },
      { id: "kr-urg-6", japanese: "여권을 잃어버렸어요", romaji: "yeogwoneul ireobeoryeosseoyo", french: "J'ai perdu mon passeport" },
      { id: "kr-urg-7", japanese: "구급차를 불러 주세요", romaji: "gugeupchareul bulleo juseyo", french: "Appelez une ambulance" },
      { id: "kr-urg-8", japanese: "괜찮아요?", romaji: "gwaenchanayo?", french: "Est-ce que ça va ?" },
    ],
  },
  {
    id: "social",
    title: "Rencontres & Amis",
    emoji: "🤝",
    description: "Se faire des amis coréens",
    phrases: [
      { id: "kr-soc-1", japanese: "한국어를 조금 할 수 있어요", romaji: "hangugeoreul jogeum hal su isseoyo", french: "Je parle un peu coréen" },
      { id: "kr-soc-2", japanese: "어디에서 왔어요?", romaji: "eodieseo wasseoyo?", french: "D'où venez-vous ?" },
      { id: "kr-soc-3", japanese: "프랑스에서 왔어요", romaji: "peurangseueseo wasseoyo", french: "Je viens de France" },
      { id: "kr-soc-4", japanese: "또 만나요!", romaji: "tto mannayo!", french: "À bientôt !" },
      { id: "kr-soc-5", japanese: "재미있었어요!", romaji: "jaemiisseosseoyo!", french: "C'était amusant !" },
      { id: "kr-soc-6", japanese: "이름이 뭐예요?", romaji: "ireumi mwoyeyo?", french: "Quel est votre nom ?" },
      { id: "kr-soc-7", japanese: "저는 [이름]이에요", romaji: "jeoneun [ireum]ieyo", french: "Je m'appelle [nom]" },
      { id: "kr-soc-8", japanese: "인스타그램 해요?", romaji: "inseutageuraem haeyo?", french: "Tu es sur Instagram ?" },
    ],
  },
  {
    id: "culture",
    title: "Culture & Loisirs",
    emoji: "🎌",
    description: "Parler de ses passions en Corée",
    phrases: [
      { id: "kr-cul-1", japanese: "불고기가 정말 좋아요", romaji: "bulgogiga jeongmal joayo", french: "J'adore le bulgogi" },
      { id: "kr-cul-2", japanese: "경복궁에 가고 싶어요", romaji: "gyeongbokgunge gago sipeoyo", french: "Je veux visiter le palais Gyeongbokgung" },
      { id: "kr-cul-3", japanese: "축제는 언제예요?", romaji: "chukjeneun eonjeyeyo?", french: "Quand est le festival ?" },
      { id: "kr-cul-4", japanese: "K-팝 좋아해요?", romaji: "keipap joahaeyo?", french: "Aimes-tu la K-pop ?" },
      { id: "kr-cul-5", japanese: "찜질방에 가고 싶어요", romaji: "jjimjilbange gago sipeoyo", french: "Je veux aller au jjimjilbang" },
      { id: "kr-cul-6", japanese: "사진 찍어도 돼요?", romaji: "sajin jjigeodo dwaeyo?", french: "Puis-je prendre une photo ?" },
      { id: "kr-cul-7", japanese: "귀여워요!", romaji: "gwiyeowoyo!", french: "Trop mignon !" },
      { id: "kr-cul-8", japanese: "맛있어요!", romaji: "masisseoyo!", french: "C'est délicieux !" },
    ],
  },
  {
    id: "travail",
    title: "Au travail / business",
    emoji: "💼",
    description: "Pour un voyage d'affaires en Corée",
    phrases: [
      { id: "kr-wrk-1", japanese: "수고하셨습니다", romaji: "sugohasyeotseumnida", french: "Merci pour votre travail" },
      { id: "kr-wrk-2", japanese: "회의는 몇 시부터예요?", romaji: "hoeineun myeot sibuteoyeyo?", french: "À quelle heure commence la réunion ?" },
      { id: "kr-wrk-3", japanese: "명함을 받을 수 있을까요?", romaji: "myeonghameul badeul su isseulkkayo?", french: "Puis-je avoir votre carte de visite ?" },
      { id: "kr-wrk-4", japanese: "실례합니다", romaji: "sillyehamnida", french: "Excusez-moi (en entrant/sortant)" },
      { id: "kr-wrk-5", japanese: "이메일로 보낼게요", romaji: "imeillo bonaelgeyo", french: "Je vous l'envoie par email" },
      { id: "kr-wrk-6", japanese: "잘 부탁드립니다", romaji: "jal butakdeurimnida", french: "Ravi de travailler avec vous" },
      { id: "kr-wrk-7", japanese: "다시 한 번 설명해 주세요", romaji: "dasi han beon seolmyeonghae juseyo", french: "Expliquez encore une fois, svp" },
      { id: "kr-wrk-8", japanese: "알겠습니다", romaji: "algetseumnida", french: "J'ai compris" },
    ],
  },
];

export const allKoreanPhrases = koreanPhraseCategories.flatMap((c) => c.phrases);
