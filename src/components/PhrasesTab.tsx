import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Circle, MessageSquareText, Speech, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/language";
import { useProgress } from "@/hooks/use-progress";
import { speak } from "@/lib/speech";
import { phraseCategories, allPhrases, type PhraseCategory } from "@/data/phrases";
import { koreanPhraseCategories, allKoreanPhrases } from "@/data/korean";
import { buildPhraseQuestions, type QuizQuestion } from "@/lib/quiz-engine";

interface PhrasesTabProps {
  onStartQuiz: (title: string, questions: QuizQuestion[]) => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function PhrasesTab({ onStartQuiz }: PhrasesTabProps) {
  const { language } = useLanguage();
  const isKorean = language === "korean";
  const { isPhraseLearned, markPhraseLearned } = useProgress();
  const [expanded, setExpanded] = useState<string | null>(null);

  const activeCategories = isKorean ? koreanPhraseCategories : phraseCategories;
  const activeAllPhrases = isKorean ? allKoreanPhrases : allPhrases;
  const subheaderText = isKorean
    ? "Les phrases indispensables pour ton voyage en Corée 🇰🇷"
    : "Les phrases indispensables pour ton voyage au Japon 🇯🇵";

  const learnedTotal = activeAllPhrases.filter((p) =>
    isPhraseLearned(p.id)
  ).length;

  const startCategoryQuiz = (cat: PhraseCategory) => {
    onStartQuiz(
      `Quiz : ${cat.emoji} ${cat.title}`,
      buildPhraseQuestions(cat.phrases, Math.min(8, cat.phrases.length))
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
          <MessageSquareText className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            Phrases de voyage
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {subheaderText}
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Phrases apprises</span>
            <span className="font-semibold text-foreground">
              {learnedTotal}/{activeAllPhrases.length}
            </span>
          </div>
          <Progress value={(learnedTotal / activeAllPhrases.length) * 100} className="h-2.5" />
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div variants={fadeUp} className="space-y-3">
        {activeCategories.map((cat) => {
          const isExpanded = expanded === cat.id;
          const learned = cat.phrases.filter((p) =>
            isPhraseLearned(p.id)
          ).length;

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
                    {cat.description} · {cat.phrases.length} phrases
                  </p>
                  <Progress
                    value={(learned / cat.phrases.length) * 100}
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
                        {cat.phrases.map((p) => {
                          const learnedPhrase = isPhraseLearned(p.id);
                          return (
                            <div key={p.id} className="py-3 flex items-center gap-3">
                              <button
                                onClick={() => speak(p.japanese, isKorean ? "ko-KR" : "ja-JP")}
                                className="w-9 h-9 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                                aria-label={`Écouter ${p.japanese}`}
                              >
                                <Speech className="w-4 h-4 text-primary" />
                              </button>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-foreground">
                                  {p.japanese}
                                </p>
                                <p className="text-sm text-foreground/80 font-medium">
                                  {p.french}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {p.romaji}
                                </p>
                              </div>
                              <button
                                onClick={() => markPhraseLearned(p)}
                                disabled={learnedPhrase}
                                title={
                                  learnedPhrase
                                    ? "Phrase apprise"
                                    : "Marquer comme apprise"
                                }
                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                                  learnedPhrase
                                    ? "bg-accent text-accent-foreground"
                                    : "border-2 border-border text-transparent hover:border-accent/60 hover:text-accent/60"
                                }`}
                                aria-label="Marquer comme apprise"
                              >
                                {learnedPhrase ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <Circle className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          );
                        })}
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
