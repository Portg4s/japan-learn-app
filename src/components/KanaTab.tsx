import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Speech, Zap, Pencil } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Hanko from "@/components/Hanko";
import KanaWritingTab from "@/components/KanaWritingTab";
import { useLanguage } from "@/contexts/language";
import { useProgress } from "@/hooks/use-progress";
import { speak } from "@/lib/speech";
import { hiragana, katakana, rowOrder, rowLabels, rowMnemonics, rowSections, getKanaByRow, type Kana } from "@/data/japanese";
import { hangeul, hangeulRowOrder, hangeulRowLabels, hangeulRowMnemonics, getHangeulByRow } from "@/data/korean";
import { buildKanaQuestions, type QuizQuestion } from "@/lib/quiz-engine";

type KanaType = "hiragana" | "katakana" | "hangeul";

interface KanaTabProps {
  onStartQuiz: (title: string, questions: QuizQuestion[]) => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export default function KanaTab({ onStartQuiz }: KanaTabProps) {
  const { language } = useLanguage();
  const isKorean = language === "korean";
  const { progress, isKanaMastered } = useProgress();

  const [kanaType, setKanaType] = useState<KanaType>("hiragana");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedChar, setSelectedChar] = useState<Kana | null>(null);
  const [writingChar, setWritingChar] = useState<Kana | null>(null);

  // Data selectors
  const allChars: Kana[] = isKorean ? hangeul as Kana[] : (kanaType === "hiragana" ? hiragana : katakana);
  const rows = isKorean ? hangeulRowOrder : rowOrder;
  const labels = isKorean ? hangeulRowLabels : rowLabels;
  const mnemonics = isKorean ? hangeulRowMnemonics : rowMnemonics;

  const getCharsByRow = (row: string): Kana[] => {
    if (isKorean) return getHangeulByRow(row) as Kana[];
    return getKanaByRow(allChars, row);
  };

  const totalChars = allChars.length;
  const masteredChars = isKorean
    ? progress.hiraganaLearned
    : kanaType === "hiragana"
      ? progress.hiraganaLearned
      : progress.katakanaLearned;

  const startRowQuiz = (row: string) => {
    const chars = getCharsByRow(row);
    const label = labels[row] || row;
    onStartQuiz(`Quiz ${label}`, buildKanaQuestions(chars, Math.min(10, chars.length * 2)));
  };

  return (
    <motion.div
      className="space-y-6"
      variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground font-display">
            {isKorean ? "Hangeul 한글" : "Apprendre"}
          </h2>
        </div>
        {/* Toggle: Hiragana/Katakana or Hangeul */}
        {!isKorean ? (
          <div className="flex bg-muted rounded-xl p-1 gap-1">
            {(["hiragana", "katakana"] as KanaType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setKanaType(type);
                  setExpandedRow(null);
                }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  kanaType === type
                    ? "bg-card text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {type === "hiragana" ? "ひらがな Hiragana" : "カタカナ Katakana"}
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-muted rounded-xl p-1">
            <div className="py-2.5 rounded-lg text-sm font-semibold text-center bg-card text-foreground shadow-sm border border-border">
              한글 Hangeul — L'alphabet coréen
            </div>
          </div>
        )}
      </motion.div>

      {/* Progress bar */}
      <motion.div variants={fadeUp} className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progression</span>
          <span className="font-semibold text-foreground">
            {masteredChars}/{totalChars} maîtrisés
          </span>
        </div>
        <Progress
          value={(masteredChars / totalChars) * 100}
          className="h-2.5"
        />
      </motion.div>

      {/* Rows */}
      <motion.div variants={fadeUp} className="space-y-3">
        {rows.map((row) => {
          const chars = getCharsByRow(row);
          if (chars.length === 0) return null;
          const isExpanded = expandedRow === row;
          const mastered = chars.filter((c) => isKanaMastered(c)).length;
          const firstChar = chars[0];
          const sectionLabel = isKorean ? undefined : rowSections[row];

          return (
            <React.Fragment key={row}>
              {sectionLabel && (
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 pt-3 pb-0.5">
                  {sectionLabel}
                </div>
              )}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedRow(isExpanded ? null : row)}
                className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-primary">
                    {firstChar?.character}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{labels[row] || row}</p>
                  <p className="text-xs text-muted-foreground">
                    {mastered}/{chars.length} maîtrisés
                  </p>
                </div>
                <Progress value={(mastered / chars.length) * 100} className="w-16 h-1.5" />
                <ArrowRight
                  className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-2">
                      <p className="text-xs text-muted-foreground italic mb-3">
                        💡 {mnemonics[row]}
                      </p>
                    </div>
                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-5 gap-2">
                        {chars.map((k) => (
                          <button
                            key={k.romaji}
                            onClick={() => setSelectedChar(k)}
                            className={`relative aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer group ${
                              isKanaMastered(k)
                                ? "border-accent/50 bg-accent/5"
                                : "border-border hover:border-primary/30 bg-muted/30"
                            }`}
                          >
                            {isKanaMastered(k) && (
                              <Hanko label="完" className="absolute -top-2 -right-2 w-5 h-5 text-[9px]" />
                            )}
                            <span className="text-2xl sm:text-3xl font-bold text-foreground group-hover:scale-110 transition-transform">
                              {k.character}
                            </span>
                            <span className="text-[10px] text-muted-foreground mt-1">
                              {k.romaji}
                            </span>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => startRowQuiz(row)}
                        className="mt-3 w-full py-2.5 rounded-xl border border-primary/30 bg-primary/5 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Zap className="w-4 h-4" />
                        Quiz sur cette rangée
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </React.Fragment>
          );
        })}
      </motion.div>

      {/* Character modal */}
      <AnimatePresence>
        {selectedChar && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedChar(null)}
          >
            <motion.div
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-xl"
              variants={scaleIn}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-28 h-28 mx-auto bg-primary/5 rounded-2xl flex items-center justify-center mb-4 border border-primary/10">
                  <span className="text-6xl font-bold text-primary">
                    {selectedChar.character}
                  </span>
                </div>
                <p className="text-3xl font-semibold text-foreground mb-1">
                  {selectedChar.romaji}
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
                  <Badge variant="secondary" className="text-sm">
                    {selectedChar.type === "hangeul"
                      ? `Hangeul — ${labels[selectedChar.row] || selectedChar.row}`
                      : `${selectedChar.type === "hiragana" ? "Hiragana" : "Katakana"} — ${rowLabels[selectedChar.row]}`}
                  </Badge>
                  {isKanaMastered(selectedChar) && (
                    <Hanko label="完" className="w-9 h-9 text-sm" />
                  )}
                </div>
                <button
                  onClick={() => speak(selectedChar.character, isKorean ? "ko-KR" : "ja-JP")}
                  className="w-full py-2.5 rounded-xl border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2 font-medium cursor-pointer mb-2"
                >
                  <Speech className="w-4 h-4" />
                  Écouter la prononciation
                </button>
                <button
                  onClick={() => { setSelectedChar(null); setWritingChar(selectedChar); }}
                  className="w-full py-2.5 rounded-xl border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 font-medium cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                  S'entraîner à l'écrire
                </button>
              </div>
              <button
                onClick={() => setSelectedChar(null)}
                className="mt-3 w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Writing mode */}
      <AnimatePresence>
        {writingChar && (
          <KanaWritingTab
            kana={writingChar}
            onClose={() => setWritingChar(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
