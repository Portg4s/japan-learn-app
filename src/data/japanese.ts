export interface Kana {
  character: string;
  romaji: string;
  row: string;
  rowLabel: string;
  type: "hiragana" | "katakana" | "hangeul";
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  characters: Kana[];
  type: "learn" | "review" | "quiz";
}

// ── Hiragana Gojūon ──────────────────────────────────────────────────────────
export const hiragana: Kana[] = [
  // あ行 (a-row)
  { character: "あ", romaji: "a", row: "a", rowLabel: "あ", type: "hiragana" },
  { character: "い", romaji: "i", row: "a", rowLabel: "あ", type: "hiragana" },
  { character: "う", romaji: "u", row: "a", rowLabel: "あ", type: "hiragana" },
  { character: "え", romaji: "e", row: "a", rowLabel: "あ", type: "hiragana" },
  { character: "お", romaji: "o", row: "a", rowLabel: "あ", type: "hiragana" },
  // か行 (ka-row)
  { character: "か", romaji: "ka", row: "ka", rowLabel: "か", type: "hiragana" },
  { character: "き", romaji: "ki", row: "ka", rowLabel: "か", type: "hiragana" },
  { character: "く", romaji: "ku", row: "ka", rowLabel: "か", type: "hiragana" },
  { character: "け", romaji: "ke", row: "ka", rowLabel: "か", type: "hiragana" },
  { character: "こ", romaji: "ko", row: "ka", rowLabel: "か", type: "hiragana" },
  // さ行 (sa-row)
  { character: "さ", romaji: "sa", row: "sa", rowLabel: "さ", type: "hiragana" },
  { character: "し", romaji: "shi", row: "sa", rowLabel: "さ", type: "hiragana" },
  { character: "す", romaji: "su", row: "sa", rowLabel: "さ", type: "hiragana" },
  { character: "せ", romaji: "se", row: "sa", rowLabel: "さ", type: "hiragana" },
  { character: "そ", romaji: "so", row: "sa", rowLabel: "さ", type: "hiragana" },
  // た行 (ta-row)
  { character: "た", romaji: "ta", row: "ta", rowLabel: "た", type: "hiragana" },
  { character: "ち", romaji: "chi", row: "ta", rowLabel: "た", type: "hiragana" },
  { character: "つ", romaji: "tsu", row: "ta", rowLabel: "た", type: "hiragana" },
  { character: "て", romaji: "te", row: "ta", rowLabel: "た", type: "hiragana" },
  { character: "と", romaji: "to", row: "ta", rowLabel: "た", type: "hiragana" },
  // な行 (na-row)
  { character: "な", romaji: "na", row: "na", rowLabel: "な", type: "hiragana" },
  { character: "に", romaji: "ni", row: "na", rowLabel: "な", type: "hiragana" },
  { character: "ぬ", romaji: "nu", row: "na", rowLabel: "な", type: "hiragana" },
  { character: "ね", romaji: "ne", row: "na", rowLabel: "な", type: "hiragana" },
  { character: "の", romaji: "no", row: "na", rowLabel: "な", type: "hiragana" },
  // は行 (ha-row)
  { character: "は", romaji: "ha", row: "ha", rowLabel: "は", type: "hiragana" },
  { character: "ひ", romaji: "hi", row: "ha", rowLabel: "は", type: "hiragana" },
  { character: "ふ", romaji: "fu", row: "ha", rowLabel: "は", type: "hiragana" },
  { character: "へ", romaji: "he", row: "ha", rowLabel: "は", type: "hiragana" },
  { character: "ほ", romaji: "ho", row: "ha", rowLabel: "は", type: "hiragana" },
  // ま行 (ma-row)
  { character: "ま", romaji: "ma", row: "ma", rowLabel: "ま", type: "hiragana" },
  { character: "み", romaji: "mi", row: "ma", rowLabel: "ま", type: "hiragana" },
  { character: "む", romaji: "mu", row: "ma", rowLabel: "ま", type: "hiragana" },
  { character: "め", romaji: "me", row: "ma", rowLabel: "ま", type: "hiragana" },
  { character: "も", romaji: "mo", row: "ma", rowLabel: "ま", type: "hiragana" },
  // や行 (ya-row)
  { character: "や", romaji: "ya", row: "ya", rowLabel: "や", type: "hiragana" },
  { character: "ゆ", romaji: "yu", row: "ya", rowLabel: "や", type: "hiragana" },
  { character: "よ", romaji: "yo", row: "ya", rowLabel: "や", type: "hiragana" },
  // ら行 (ra-row)
  { character: "ら", romaji: "ra", row: "ra", rowLabel: "ら", type: "hiragana" },
  { character: "り", romaji: "ri", row: "ra", rowLabel: "ら", type: "hiragana" },
  { character: "る", romaji: "ru", row: "ra", rowLabel: "ら", type: "hiragana" },
  { character: "れ", romaji: "re", row: "ra", rowLabel: "ら", type: "hiragana" },
  { character: "ろ", romaji: "ro", row: "ra", rowLabel: "ら", type: "hiragana" },
  // わ行 (wa-row)
  { character: "わ", romaji: "wa", row: "wa", rowLabel: "わ", type: "hiragana" },
  { character: "を", romaji: "wo", row: "wa", rowLabel: "わ", type: "hiragana" },
  // ん (n)
  { character: "ん", romaji: "n", row: "n", rowLabel: "ん", type: "hiragana" },

  // ── Dakuten ゛ (hiragana) ─────────────────────────────────────────────────
  // が行 (ga-row)
  { character: "が", romaji: "ga", row: "g", rowLabel: "が", type: "hiragana" },
  { character: "ぎ", romaji: "gi", row: "g", rowLabel: "が", type: "hiragana" },
  { character: "ぐ", romaji: "gu", row: "g", rowLabel: "が", type: "hiragana" },
  { character: "げ", romaji: "ge", row: "g", rowLabel: "が", type: "hiragana" },
  { character: "ご", romaji: "go", row: "g", rowLabel: "が", type: "hiragana" },
  // ざ行 (za-row)
  { character: "ざ", romaji: "za", row: "z", rowLabel: "ざ", type: "hiragana" },
  { character: "じ", romaji: "ji", row: "z", rowLabel: "ざ", type: "hiragana" },
  { character: "ず", romaji: "zu", row: "z", rowLabel: "ざ", type: "hiragana" },
  { character: "ぜ", romaji: "ze", row: "z", rowLabel: "ざ", type: "hiragana" },
  { character: "ぞ", romaji: "zo", row: "z", rowLabel: "ざ", type: "hiragana" },
  // だ行 (da-row)
  { character: "だ", romaji: "da", row: "d", rowLabel: "だ", type: "hiragana" },
  { character: "ぢ", romaji: "ji", row: "d", rowLabel: "だ", type: "hiragana" },
  { character: "づ", romaji: "zu", row: "d", rowLabel: "だ", type: "hiragana" },
  { character: "で", romaji: "de", row: "d", rowLabel: "だ", type: "hiragana" },
  { character: "ど", romaji: "do", row: "d", rowLabel: "だ", type: "hiragana" },
  // ば行 (ba-row)
  { character: "ば", romaji: "ba", row: "b", rowLabel: "ば", type: "hiragana" },
  { character: "び", romaji: "bi", row: "b", rowLabel: "ば", type: "hiragana" },
  { character: "ぶ", romaji: "bu", row: "b", rowLabel: "ば", type: "hiragana" },
  { character: "べ", romaji: "be", row: "b", rowLabel: "ば", type: "hiragana" },
  { character: "ぼ", romaji: "bo", row: "b", rowLabel: "ば", type: "hiragana" },

  // ── Handakuten ゜ (hiragana) ───────────────────────────────────────────────
  // ぱ行 (pa-row)
  { character: "ぱ", romaji: "pa", row: "p", rowLabel: "ぱ", type: "hiragana" },
  { character: "ぴ", romaji: "pi", row: "p", rowLabel: "ぱ", type: "hiragana" },
  { character: "ぷ", romaji: "pu", row: "p", rowLabel: "ぱ", type: "hiragana" },
  { character: "ぺ", romaji: "pe", row: "p", rowLabel: "ぱ", type: "hiragana" },
  { character: "ぽ", romaji: "po", row: "p", rowLabel: "ぱ", type: "hiragana" },

  // ── Yōon 拗音 (hiragana combinations) ──────────────────────────────────────
  // きゃ行 (kya-row)
  { character: "きゃ", romaji: "kya", row: "kya", rowLabel: "きゃ", type: "hiragana" },
  { character: "きゅ", romaji: "kyu", row: "kya", rowLabel: "きゃ", type: "hiragana" },
  { character: "きょ", romaji: "kyo", row: "kya", rowLabel: "きゃ", type: "hiragana" },
  // しゃ行 (sha-row)
  { character: "しゃ", romaji: "sha", row: "sha", rowLabel: "しゃ", type: "hiragana" },
  { character: "しゅ", romaji: "shu", row: "sha", rowLabel: "しゃ", type: "hiragana" },
  { character: "しょ", romaji: "sho", row: "sha", rowLabel: "しゃ", type: "hiragana" },
  // ちゃ行 (cha-row)
  { character: "ちゃ", romaji: "cha", row: "cha", rowLabel: "ちゃ", type: "hiragana" },
  { character: "ちゅ", romaji: "chu", row: "cha", rowLabel: "ちゃ", type: "hiragana" },
  { character: "ちょ", romaji: "cho", row: "cha", rowLabel: "ちゃ", type: "hiragana" },
  // にゃ行 (nya-row)
  { character: "にゃ", romaji: "nya", row: "nya", rowLabel: "にゃ", type: "hiragana" },
  { character: "にゅ", romaji: "nyu", row: "nya", rowLabel: "にゃ", type: "hiragana" },
  { character: "にょ", romaji: "nyo", row: "nya", rowLabel: "にゃ", type: "hiragana" },
  // ひゃ行 (hya-row)
  { character: "ひゃ", romaji: "hya", row: "hya", rowLabel: "ひゃ", type: "hiragana" },
  { character: "ひゅ", romaji: "hyu", row: "hya", rowLabel: "ひゃ", type: "hiragana" },
  { character: "ひょ", romaji: "hyo", row: "hya", rowLabel: "ひゃ", type: "hiragana" },
  // みゃ行 (mya-row)
  { character: "みゃ", romaji: "mya", row: "mya", rowLabel: "みゃ", type: "hiragana" },
  { character: "みゅ", romaji: "myu", row: "mya", rowLabel: "みゃ", type: "hiragana" },
  { character: "みょ", romaji: "myo", row: "mya", rowLabel: "みゃ", type: "hiragana" },
  // りゃ行 (rya-row)
  { character: "りゃ", romaji: "rya", row: "rya", rowLabel: "りゃ", type: "hiragana" },
  { character: "りゅ", romaji: "ryu", row: "rya", rowLabel: "りゃ", type: "hiragana" },
  { character: "りょ", romaji: "ryo", row: "rya", rowLabel: "りゃ", type: "hiragana" },
  // ぎゃ行 (gya-row — dakuten)
  { character: "ぎゃ", romaji: "gya", row: "gya", rowLabel: "ぎゃ", type: "hiragana" },
  { character: "ぎゅ", romaji: "gyu", row: "gya", rowLabel: "ぎゃ", type: "hiragana" },
  { character: "ぎょ", romaji: "gyo", row: "gya", rowLabel: "ぎゃ", type: "hiragana" },
  // じゃ行 (ja-row — dakuten)
  { character: "じゃ", romaji: "ja", row: "ja", rowLabel: "じゃ", type: "hiragana" },
  { character: "じゅ", romaji: "ju", row: "ja", rowLabel: "じゃ", type: "hiragana" },
  { character: "じょ", romaji: "jo", row: "ja", rowLabel: "じゃ", type: "hiragana" },
  // びゃ行 (bya-row — dakuten)
  { character: "びゃ", romaji: "bya", row: "bya", rowLabel: "びゃ", type: "hiragana" },
  { character: "びゅ", romaji: "byu", row: "bya", rowLabel: "びゃ", type: "hiragana" },
  { character: "びょ", romaji: "byo", row: "bya", rowLabel: "びゃ", type: "hiragana" },
  // ぴゃ行 (pya-row — handakuten)
  { character: "ぴゃ", romaji: "pya", row: "pya", rowLabel: "ぴゃ", type: "hiragana" },
  { character: "ぴゅ", romaji: "pyu", row: "pya", rowLabel: "ぴゃ", type: "hiragana" },
  { character: "ぴょ", romaji: "pyo", row: "pya", rowLabel: "ぴゃ", type: "hiragana" },
];

// ── Katakana Gojūon ──────────────────────────────────────────────────────────
export const katakana: Kana[] = [
  // ア行 (a-row)
  { character: "ア", romaji: "a", row: "a", rowLabel: "ア", type: "katakana" },
  { character: "イ", romaji: "i", row: "a", rowLabel: "ア", type: "katakana" },
  { character: "ウ", romaji: "u", row: "a", rowLabel: "ア", type: "katakana" },
  { character: "エ", romaji: "e", row: "a", rowLabel: "ア", type: "katakana" },
  { character: "オ", romaji: "o", row: "a", rowLabel: "ア", type: "katakana" },
  // カ行 (ka-row)
  { character: "カ", romaji: "ka", row: "ka", rowLabel: "カ", type: "katakana" },
  { character: "キ", romaji: "ki", row: "ka", rowLabel: "カ", type: "katakana" },
  { character: "ク", romaji: "ku", row: "ka", rowLabel: "カ", type: "katakana" },
  { character: "ケ", romaji: "ke", row: "ka", rowLabel: "カ", type: "katakana" },
  { character: "コ", romaji: "ko", row: "ka", rowLabel: "カ", type: "katakana" },
  // サ行 (sa-row)
  { character: "サ", romaji: "sa", row: "sa", rowLabel: "サ", type: "katakana" },
  { character: "シ", romaji: "shi", row: "sa", rowLabel: "サ", type: "katakana" },
  { character: "ス", romaji: "su", row: "sa", rowLabel: "サ", type: "katakana" },
  { character: "セ", romaji: "se", row: "sa", rowLabel: "サ", type: "katakana" },
  { character: "ソ", romaji: "so", row: "sa", rowLabel: "サ", type: "katakana" },
  // タ行 (ta-row)
  { character: "タ", romaji: "ta", row: "ta", rowLabel: "タ", type: "katakana" },
  { character: "チ", romaji: "chi", row: "ta", rowLabel: "タ", type: "katakana" },
  { character: "ツ", romaji: "tsu", row: "ta", rowLabel: "タ", type: "katakana" },
  { character: "テ", romaji: "te", row: "ta", rowLabel: "タ", type: "katakana" },
  { character: "ト", romaji: "to", row: "ta", rowLabel: "タ", type: "katakana" },
  // ナ行 (na-row)
  { character: "ナ", romaji: "na", row: "na", rowLabel: "ナ", type: "katakana" },
  { character: "ニ", romaji: "ni", row: "na", rowLabel: "ナ", type: "katakana" },
  { character: "ヌ", romaji: "nu", row: "na", rowLabel: "ナ", type: "katakana" },
  { character: "ネ", romaji: "ne", row: "na", rowLabel: "ナ", type: "katakana" },
  { character: "ノ", romaji: "no", row: "na", rowLabel: "ナ", type: "katakana" },
  // ハ行 (ha-row)
  { character: "ハ", romaji: "ha", row: "ha", rowLabel: "ハ", type: "katakana" },
  { character: "ヒ", romaji: "hi", row: "ha", rowLabel: "ハ", type: "katakana" },
  { character: "フ", romaji: "fu", row: "ha", rowLabel: "ハ", type: "katakana" },
  { character: "ヘ", romaji: "he", row: "ha", rowLabel: "ハ", type: "katakana" },
  { character: "ホ", romaji: "ho", row: "ha", rowLabel: "ハ", type: "katakana" },
  // マ行 (ma-row)
  { character: "マ", romaji: "ma", row: "ma", rowLabel: "マ", type: "katakana" },
  { character: "ミ", romaji: "mi", row: "ma", rowLabel: "マ", type: "katakana" },
  { character: "ム", romaji: "mu", row: "ma", rowLabel: "マ", type: "katakana" },
  { character: "メ", romaji: "me", row: "ma", rowLabel: "マ", type: "katakana" },
  { character: "モ", romaji: "mo", row: "ma", rowLabel: "マ", type: "katakana" },
  // ヤ行 (ya-row)
  { character: "ヤ", romaji: "ya", row: "ya", rowLabel: "ヤ", type: "katakana" },
  { character: "ユ", romaji: "yu", row: "ya", rowLabel: "ヤ", type: "katakana" },
  { character: "ヨ", romaji: "yo", row: "ya", rowLabel: "ヤ", type: "katakana" },
  // ラ行 (ra-row)
  { character: "ラ", romaji: "ra", row: "ra", rowLabel: "ラ", type: "katakana" },
  { character: "リ", romaji: "ri", row: "ra", rowLabel: "ラ", type: "katakana" },
  { character: "ル", romaji: "ru", row: "ra", rowLabel: "ラ", type: "katakana" },
  { character: "レ", romaji: "re", row: "ra", rowLabel: "ラ", type: "katakana" },
  { character: "ロ", romaji: "ro", row: "ra", rowLabel: "ラ", type: "katakana" },
  // ワ行 (wa-row)
  { character: "ワ", romaji: "wa", row: "wa", rowLabel: "ワ", type: "katakana" },
  { character: "ヲ", romaji: "wo", row: "wa", rowLabel: "ワ", type: "katakana" },
  // ン (n)
  { character: "ン", romaji: "n", row: "n", rowLabel: "ン", type: "katakana" },

  // ── Dakuten ゛ (katakana) ─────────────────────────────────────────────────
  { character: "ガ", romaji: "ga", row: "g", rowLabel: "ガ", type: "katakana" },
  { character: "ギ", romaji: "gi", row: "g", rowLabel: "ガ", type: "katakana" },
  { character: "グ", romaji: "gu", row: "g", rowLabel: "ガ", type: "katakana" },
  { character: "ゲ", romaji: "ge", row: "g", rowLabel: "ガ", type: "katakana" },
  { character: "ゴ", romaji: "go", row: "g", rowLabel: "ガ", type: "katakana" },
  { character: "ザ", romaji: "za", row: "z", rowLabel: "ザ", type: "katakana" },
  { character: "ジ", romaji: "ji", row: "z", rowLabel: "ザ", type: "katakana" },
  { character: "ズ", romaji: "zu", row: "z", rowLabel: "ザ", type: "katakana" },
  { character: "ゼ", romaji: "ze", row: "z", rowLabel: "ザ", type: "katakana" },
  { character: "ゾ", romaji: "zo", row: "z", rowLabel: "ザ", type: "katakana" },
  { character: "ダ", romaji: "da", row: "d", rowLabel: "ダ", type: "katakana" },
  { character: "ヂ", romaji: "ji", row: "d", rowLabel: "ダ", type: "katakana" },
  { character: "ヅ", romaji: "zu", row: "d", rowLabel: "ダ", type: "katakana" },
  { character: "デ", romaji: "de", row: "d", rowLabel: "ダ", type: "katakana" },
  { character: "ド", romaji: "do", row: "d", rowLabel: "ダ", type: "katakana" },
  { character: "バ", romaji: "ba", row: "b", rowLabel: "バ", type: "katakana" },
  { character: "ビ", romaji: "bi", row: "b", rowLabel: "バ", type: "katakana" },
  { character: "ブ", romaji: "bu", row: "b", rowLabel: "バ", type: "katakana" },
  { character: "ベ", romaji: "be", row: "b", rowLabel: "バ", type: "katakana" },
  { character: "ボ", romaji: "bo", row: "b", rowLabel: "バ", type: "katakana" },

  // ── Handakuten ゜ (katakana) ──────────────────────────────────────────────
  { character: "パ", romaji: "pa", row: "p", rowLabel: "パ", type: "katakana" },
  { character: "ピ", romaji: "pi", row: "p", rowLabel: "パ", type: "katakana" },
  { character: "プ", romaji: "pu", row: "p", rowLabel: "パ", type: "katakana" },
  { character: "ペ", romaji: "pe", row: "p", rowLabel: "パ", type: "katakana" },
  { character: "ポ", romaji: "po", row: "p", rowLabel: "パ", type: "katakana" },

  // ── Yōon 拗音 (katakana combinations) ─────────────────────────────────────
  { character: "キャ", romaji: "kya", row: "kya", rowLabel: "キャ", type: "katakana" },
  { character: "キュ", romaji: "kyu", row: "kya", rowLabel: "キャ", type: "katakana" },
  { character: "キョ", romaji: "kyo", row: "kya", rowLabel: "キャ", type: "katakana" },
  { character: "シャ", romaji: "sha", row: "sha", rowLabel: "シャ", type: "katakana" },
  { character: "シュ", romaji: "shu", row: "sha", rowLabel: "シャ", type: "katakana" },
  { character: "ショ", romaji: "sho", row: "sha", rowLabel: "シャ", type: "katakana" },
  { character: "チャ", romaji: "cha", row: "cha", rowLabel: "チャ", type: "katakana" },
  { character: "チュ", romaji: "chu", row: "cha", rowLabel: "チャ", type: "katakana" },
  { character: "チョ", romaji: "cho", row: "cha", rowLabel: "チャ", type: "katakana" },
  { character: "ニャ", romaji: "nya", row: "nya", rowLabel: "ニャ", type: "katakana" },
  { character: "ニュ", romaji: "nyu", row: "nya", rowLabel: "ニャ", type: "katakana" },
  { character: "ニョ", romaji: "nyo", row: "nya", rowLabel: "ニャ", type: "katakana" },
  { character: "ヒャ", romaji: "hya", row: "hya", rowLabel: "ヒャ", type: "katakana" },
  { character: "ヒュ", romaji: "hyu", row: "hya", rowLabel: "ヒャ", type: "katakana" },
  { character: "ヒョ", romaji: "hyo", row: "hya", rowLabel: "ヒャ", type: "katakana" },
  { character: "ミャ", romaji: "mya", row: "mya", rowLabel: "ミャ", type: "katakana" },
  { character: "ミュ", romaji: "myu", row: "mya", rowLabel: "ミャ", type: "katakana" },
  { character: "ミョ", romaji: "myo", row: "mya", rowLabel: "ミャ", type: "katakana" },
  { character: "リャ", romaji: "rya", row: "rya", rowLabel: "リャ", type: "katakana" },
  { character: "リュ", romaji: "ryu", row: "rya", rowLabel: "リャ", type: "katakana" },
  { character: "リョ", romaji: "ryo", row: "rya", rowLabel: "リャ", type: "katakana" },
  { character: "ギャ", romaji: "gya", row: "gya", rowLabel: "ギャ", type: "katakana" },
  { character: "ギュ", romaji: "gyu", row: "gya", rowLabel: "ギャ", type: "katakana" },
  { character: "ギョ", romaji: "gyo", row: "gya", rowLabel: "ギャ", type: "katakana" },
  { character: "ジャ", romaji: "ja", row: "ja", rowLabel: "ジャ", type: "katakana" },
  { character: "ジュ", romaji: "ju", row: "ja", rowLabel: "ジャ", type: "katakana" },
  { character: "ジョ", romaji: "jo", row: "ja", rowLabel: "ジャ", type: "katakana" },
  { character: "ビャ", romaji: "bya", row: "bya", rowLabel: "ビャ", type: "katakana" },
  { character: "ビュ", romaji: "byu", row: "bya", rowLabel: "ビャ", type: "katakana" },
  { character: "ビョ", romaji: "byo", row: "bya", rowLabel: "ビャ", type: "katakana" },
  { character: "ピャ", romaji: "pya", row: "pya", rowLabel: "ピャ", type: "katakana" },
  { character: "ピュ", romaji: "pyu", row: "pya", rowLabel: "ピャ", type: "katakana" },
  { character: "ピョ", romaji: "pyo", row: "pya", rowLabel: "ピャ", type: "katakana" },
];

// ── Row definitions ──────────────────────────────────────────────────────────
const basicRows = ["a", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa"];
const dakutenRows = ["g", "z", "d", "b"];
const handakutenRows = ["p"];
const yoonRows = [
  "kya", "sha", "cha", "nya", "hya", "mya", "rya",
  "gya", "ja", "bya", "pya",
];

// Row display order — grouped by category
export const rowOrder = [...basicRows, ...dakutenRows, ...handakutenRows, ...yoonRows];

export const hiraganaRows = rowOrder;
export const katakanaRows = rowOrder;

export function getKanaByRow(kanaList: Kana[], row: string): Kana[] {
  return kanaList.filter((k) => k.row === row);
}

export function getKanaByRomaji(kanaList: Kana[], romaji: string): Kana | undefined {
  return kanaList.find((k) => k.romaji === romaji);
}

// Section labels for grouping rows visually
export const rowSections: Record<string, string> = {
  g: "Dakuten ゛",
  p: "Handakuten ゜",
  kya: "Yōon 拗音",
};

// Display labels per row
export const rowLabels: Record<string, string> = {
  a: "あ / ア",
  ka: "か / カ",
  sa: "さ / サ",
  ta: "た / タ",
  na: "な / ナ",
  ha: "は / ハ",
  ma: "ま / マ",
  ya: "や / ヤ",
  ra: "ら / ラ",
  wa: "わ / ワ",
  g: "が / ガ",
  z: "ざ / ザ",
  d: "だ / ダ",
  b: "ば / バ",
  p: "ぱ / パ",
  kya: "きゃ / キャ",
  sha: "しゃ / シャ",
  cha: "ちゃ / チャ",
  nya: "にゃ / ニャ",
  hya: "ひゃ / ヒャ",
  mya: "みゃ / ミャ",
  rya: "りゃ / リャ",
  gya: "ぎゃ / ギャ",
  ja: "じゃ / ジャ",
  bya: "びゃ / ビャ",
  pya: "ぴゃ / ピャ",
};

// Mnemonic tips for each row (in French)
export const rowMnemonics: Record<string, string> = {
  a: "La rangée あ — ce sont les voyelles de base. Pense à « Ah ! »",
  ka: "La rangée か — comme un « K » qui coupe. Le trait ressemble à une épée.",
  sa: "La rangée さ — comme un sourire « S ». Regarde la courbe douce.",
  ta: "La rangée た — le « T » traverse. Remarque la barre horizontale.",
  na: "La rangée な — le « N » noue. Les caractères ont une boucle.",
  ha: "La rangée は — le « H » souffle. Une ligne et une boucle.",
  ma: "La rangée ま — le « M » murmure. Formes arrondies et douces.",
  ya: "La rangée や — le « Y » est petit. Seulement 3 caractères !",
  ra: "La rangée ら — le « R » roule. Ne pas confondre avec ち et さ.",
  wa: "La rangée わ — le « W » termine. La fin du tableau de base.",
  g: "Le dakuten ゛ transforme K→G : か (ka) → が (ga). Voix vibrante !",
  z: "Le dakuten sur S donne Z : さ (sa) → ざ (za). Le son s'adoucit.",
  d: "Le dakuten sur T donne D : た (ta) → だ (da). Un « D » qui frappe.",
  b: "Le dakuten sur H donne B : は (ha) → ば (ba). Attention, le son change !",
  p: "Le handakuten ゜ (petit cercle) transforme H→P. Seulement sur la rangée H !",
  kya: "き combiné avec un petit ゃ → きゃ (kya). Le き se lit en une syllabe.",
  sha: "し combiné avec un petit ゃ → しゃ (sha). Le « sh » s'étend.",
  cha: "ち + petit ゃ = ちゃ (cha). Comme « tchat » en français.",
  nya: "に + petit ゃ = にゃ (nya). Le « n » se lie. Comme un miaulement !",
  hya: "ひ + petit ゃ = ひゃ (hya). Souffle doux, semi-voyelle.",
  mya: "み + petit ゃ = みゃ (mya). Le « m » suivi du y.",
  rya: "り + petit ゃ = りゃ (rya). Le « r » enchaîné. Roule bien la langue !",
  gya: "ぎ + petit ゃ = ぎゃ (gya). Dakuten + yōon : le son est voisé.",
  ja: "じ + petit ゃ = じゃ (ja). Le « j » français, mais avec un petit ゃ.",
  bya: "び + petit ゃ = びゃ (bya). Dakuten sur le H, puis yōon.",
  pya: "ぴ + petit ゃ = ぴゃ (pya). Handakuten PUIS yōon. Double transformation !",
};
