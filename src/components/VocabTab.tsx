import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Speech, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Hanko from "@/components/Hanko";
import { useLanguage } from "@/contexts/language";
import { useProgress } from "@/hooks/use-progress";
import { speak } from "@/lib/speech";
import { vocabCategories, allVocabWords, type VocabCategory } from "@/data/vocabulary";
import { koreanVocabCategories, allKoreanVocabWords } from "@/data/korean";
import { buildVocabQuestions, type QuizQuestion } from "@/lib/quiz-engine";

interface VocabTabProps {
  onStartQuiz: (title: string, questions: QuizQuestion[]) => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function VocabTab({ onStartQuiz }: VocabTabProps) {
  const { language } = useLanguage();
  const isKorean = language === "korean";
  const { progress, isVocabMastered } = useProgress();
  const [expanded, setExpanded] = useState<string | null>(null);

  const activeCategories = isKorean ? koreanVocabCategories : vocabCategories;
  const activeAllWords = isKorean ? allKoreanVocabWords : allVocabWords;

  const masteredTotal = activeAllWords.filter(
    (w) => progress.vocabProgress[w.id]?.mastered
  ).length;

  const startCategoryQuiz = (cat: VocabCategory) => {
    onStartQuiz(
      `Quiz : ${cat.emoji} ${cat.title}`,
      buildVocabQuestions(cat.words, Math.min(12, cat.words.length * 2))
    );
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
          <h2 className="text-2xl font-bold text-foreground font-display">Vocabulaire</h2>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Mots maîtrisés</span>
            <span className="font-semibold text-foreground">
              {masteredTotal}/{activeAllWords.length}
            </span>
          </div>
          <Progress value={(masteredTotal / activeAllWords.length) * 100} className="h-2.5" />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div variants={fadeUp} className="space-y-3">
        {activeCategories.map((cat) => {
          const isExpanded = expanded === cat.id;
          const mastered = cat.words.filter((w) => isVocabMastered(w.id)).length;

          return (
            <div key={cat.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(isExpanded ? null : cat.id)}
                className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-xl shrink-0">
                  {cat.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{cat.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {cat.description} · {cat.words.length} mots
                  </p>
                  <Progress
                    value={(mastered / cat.words.length) * 100}
                    className="h-1.5 mt-1.5"
                  />
                </div>
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
                    <div className="px-4 pb-4">
                      <div className="divide-y divide-border border-y border-border">
                        {cat.words.map((w) => (
                          <div
                            key={w.id}
                            className="py-3 flex items-center gap-3"
                          >
                            <button
                              onClick={() => speak(w.japanese, isKorean ? "ko-KR" : "ja-JP")}
                              className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                              aria-label={`Écouter ${w.japanese}`}
                            >
                              <Speech className="w-4 h-4 text-primary" />
                            </button>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-foreground">
                                {w.japanese}
                                {w.kanji && (
                                  <span className="text-muted-foreground font-normal ml-2 text-sm">
                                    {w.kanji}
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-foreground/80 font-medium">
                                {w.french}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {w.romaji}
                              </p>
                            </div>
                            {isVocabMastered(w.id) && (
                              <Hanko label="完" className="w-7 h-7 text-xs shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => startCategoryQuiz(cat)}
                        className="mt-3 w-full py-2.5 rounded-xl border border-primary/30 bg-primary/5 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Zap className="w-4 h-4" />
                        Quiz sur ce thème
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
