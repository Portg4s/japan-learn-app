import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  Zap,
  Sparkles,
  GraduationCap,
  ArrowRight,
  ChevronRight,
  BookOpen,
  MessageSquareText,
  Grid3X3,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ManekiNeko from "@/components/ManekiNeko";
import Horangi from "@/components/Horangi";
import SakuraPetals from "@/components/SakuraPetals";
import { useLanguage } from "@/contexts/language";
import { useProgress } from "@/hooks/use-progress";
import { hiragana, katakana } from "@/data/japanese";
import { hangeul } from "@/data/korean";
import { vocabCategories, allVocabWords } from "@/data/vocabulary";
import { koreanVocabCategories, allKoreanVocabWords } from "@/data/korean";
import { grammarLessons } from "@/data/grammar";
import { koreanGrammarLessons } from "@/data/korean";
import { allPhrases } from "@/data/phrases";
import { allKoreanPhrases } from "@/data/korean";
import { buildLessonQuestions, type QuizQuestion } from "@/lib/quiz-engine";

interface HomeTabProps {
  onStartLesson: (title: string, questions: QuizQuestion[]) => void;
  onGoTo: (tab: "learn" | "quiz" | "phrases", sub?: "kana" | "vocab" | "grammar") => void;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export default function HomeTab({ onStartLesson, onGoTo }: HomeTabProps) {
  const { language } = useLanguage();
  const isKorean = language === "korean";

  const {
    progress,
    getNextToLearn,
    getNextVocabToLearn,
    getNextPhrasesToLearn,
    isGrammarCompleted,
  } = useProgress();

  // Language-specific data
  const activeVocabCategories = isKorean ? koreanVocabCategories : vocabCategories;
  const activeAllVocab = isKorean ? allKoreanVocabWords : allVocabWords;
  const activeGrammarLessons = isKorean ? koreanGrammarLessons : grammarLessons;
  const activeAllPhrases = isKorean ? allKoreanPhrases : allPhrases;
  const activeKanaList = isKorean ? hangeul : [...hiragana, ...katakana];

  // Mascot greeting based on progress
  const mascotMood = progress.streak >= 3 ? "happy" : "wave";
  const mascotMessage =
    progress.streak >= 3
      ? isKorean
        ? "매일매일 대단해요 ! Quelle régularité, 호랑이 est fier !"
        : "にちにち すごいね ! Quelle régularité !"
      : progress.streak >= 1
        ? isKorean
          ? "안녕하세요 ! Horangi te guide aujourd'hui !"
          : "こんにちは ! Prête pour la leçon du jour ?"
        : isKorean
          ? "처음 뵙겠습니다 ! Je suis Horangi, le tigre coréen !"
          : "はじめまして ! Je suis Maneki, ta guide japonaise !";

  const kanaTotal = isKorean ? hangeul.length : hiragana.length + katakana.length;
  const kanaLearned = isKorean ? progress.hiraganaLearned : progress.hiraganaLearned + progress.katakanaLearned;
  const hiraganaTotal = hiragana.length;
  const katakanaTotal = katakana.length;

  // ── Daily lesson composition ────────────────────────────────────────────────
  const daily = useMemo(() => {
    let kanaToLearn = isKorean
      ? getNextToLearn(activeKanaList, 5)
      : (() => {
          const hiraNext = getNextToLearn(hiragana, 5);
          const kataNext = getNextToLearn(katakana, 5);
          return [...hiraNext, ...kataNext]
            .sort((a, b) => (a.type === b.type ? 0 : a.type === "hiragana" ? -1 : 1))
            .slice(0, 5);
        })();
    const vocabToLearn = getNextVocabToLearn(activeAllVocab, 8);
    const phrasesToLearn = getNextPhrasesToLearn(activeAllPhrases, 4);
    const nextGrammar = activeGrammarLessons.find((g) => !isGrammarCompleted(g.id));

    const lessonReady = kanaToLearn.length + vocabToLearn.length + phrasesToLearn.length >= 4;

    return { kanaToLearn, vocabToLearn, phrasesToLearn, nextGrammar, lessonReady };
  }, [getNextToLearn, getNextVocabToLearn, getNextPhrasesToLearn, isGrammarCompleted, isKorean, activeKanaList, activeAllVocab, activeAllPhrases, activeGrammarLessons]);

  const vocabMastered = useMemo(
    () => activeAllVocab.filter((w) => progress.vocabProgress[w.id]?.mastered).length,
    [progress.vocabProgress, activeAllVocab]
  );

  const startLesson = () => {
    const questions = buildLessonQuestions({
      kanaToLearn: daily.kanaToLearn,
      vocabToLearn: daily.vocabToLearn,
      phrasesToLearn: daily.phrasesToLearn,
    });
    onStartLesson("Leçon du jour", questions);
  };

  const previewCategories = useMemo(() => {
    return activeVocabCategories
      .map((cat) => ({
        cat,
        mastered: cat.words.filter((w) => progress.vocabProgress[w.id]?.mastered).length,
      }))
      .sort((a, b) => {
        const pa = a.mastered / a.cat.words.length;
        const pb = b.mastered / b.cat.words.length;
        return pa - pb;
      })
      .slice(0, 2);
  }, [progress.vocabProgress, activeVocabCategories]);

  const phrasesLearned = progress.phrasesLearned.length;
  const grammarDone = progress.grammarCompleted.length;

  return (
    <motion.div
      className="space-y-6 relative"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <SakuraPetals count={12} />

      {/* Greeting */}
      <motion.div variants={fadeUp} className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-3">
          <Flame className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-semibold text-amber-700">
            {progress.streak} jour{progress.streak > 1 ? "s" : ""} de série
          </span>
        </div>

        {/* Mascot + speech bubble */}
        <div className="flex flex-col items-center mb-4">
          <div className="speech-bubble bg-card border border-border rounded-2xl px-4 py-2 text-sm text-foreground font-medium mb-3 shadow-sm">
            {mascotMessage}
          </div>
          <div className="cat-float">
            {isKorean ? (
              <Horangi mood={mascotMood} className="w-32 h-32" />
            ) : (
              <ManekiNeko mood={mascotMood} className="w-32 h-32" />
            )}
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-display">
          {isKorean ? "한국어를 배우자" : "日本語を学ぼう"}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          {isKorean ? "Apprends le coréen, un pas à la fois 🇰🇷" : "Apprends le japonais, un pas à la fois 🇯🇵"}
        </p>
      </motion.div>

      {/* Global progress overview */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onGoTo("learn", "kana")}
          className="bg-card border border-border rounded-2xl p-4 text-left hover:border-primary/30 transition-colors cursor-pointer"
        >
          <p className="text-sm text-muted-foreground font-medium mb-1 flex items-center gap-1">
            <Grid3X3 className="w-3.5 h-3.5" /> {isKorean ? "Hangeul" : "Kana"}
          </p>
          <p className="text-2xl font-bold text-foreground">
            {kanaLearned}
            <span className="text-sm text-muted-foreground font-normal">
              /{kanaTotal}
            </span>
          </p>
          <Progress
            value={(kanaLearned / kanaTotal) * 100}
            className="h-1.5 mt-2"
          />
        </button>

        <button
          onClick={() => onGoTo("learn", "vocab")}
          className="bg-card border border-border rounded-2xl p-4 text-left hover:border-primary/30 transition-colors cursor-pointer"
        >
          <p className="text-sm text-muted-foreground font-medium mb-1 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" /> Vocabulaire
          </p>
          <p className="text-2xl font-bold text-foreground">
            {vocabMastered}
            <span className="text-sm text-muted-foreground font-normal">
              /{activeAllVocab.length}
            </span>
          </p>
          <Progress
            value={(vocabMastered / activeAllVocab.length) * 100}
            className="h-1.5 mt-2"
          />
        </button>

        <button
          onClick={() => onGoTo("learn", "grammar")}
          className="bg-card border border-border rounded-2xl p-4 text-left hover:border-primary/30 transition-colors cursor-pointer"
        >
          <p className="text-sm text-muted-foreground font-medium mb-1 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5" /> Grammaire
          </p>
          <p className="text-2xl font-bold text-foreground">
            {grammarDone}
            <span className="text-sm text-muted-foreground font-normal">
              /{activeGrammarLessons.length}
            </span>
          </p>
          <Progress
            value={(grammarDone / activeGrammarLessons.length) * 100}
            className="h-1.5 mt-2"
          />
        </button>

        <button
          onClick={() => onGoTo("phrases")}
          className="bg-card border border-border rounded-2xl p-4 text-left hover:border-primary/30 transition-colors cursor-pointer"
        >
          <p className="text-sm text-muted-foreground font-medium mb-1 flex items-center gap-1">
            <MessageSquareText className="w-3.5 h-3.5" /> Phrases
          </p>
          <p className="text-2xl font-bold text-foreground">
            {phrasesLearned}
            <span className="text-sm text-muted-foreground font-normal">
              /{activeAllPhrases.length}
            </span>
          </p>
          <Progress
            value={(phrasesLearned / activeAllPhrases.length) * 100}
            className="h-1.5 mt-2"
          />
        </button>
      </motion.div>

      {/* XP card */}
      <motion.div
        variants={fadeUp}
        className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
          <Zap className="w-6 h-6 text-accent" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">Total XP</p>
          <p className="text-2xl font-bold text-foreground">
            {progress.totalXp}
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm text-muted-foreground">Leçons</p>
          <p className="text-xl font-bold text-foreground">
            {progress.completedLessons}
          </p>
        </div>
      </motion.div>

      {/* Leçon du jour */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-accent" />
          <h2 className="text-xl font-bold text-foreground font-display">Leçon du jour</h2>
        </div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 bg-primary/5 border-b border-border">
            <p className="text-sm text-muted-foreground">
              Un mélange quotidien pour progresser sur tous les fronts :
            </p>
          </div>

          <div className="divide-y divide-border">
            {/* Kana / Hangeul */}
            {daily.kanaToLearn.length > 0 && (
              <button
                onClick={() => onGoTo("learn", "kana")}
                className="w-full p-4 flex items-center gap-3 hover:bg-muted/40 transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Grid3X3 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {daily.kanaToLearn.length} {isKorean ? "hangeul" : "kana"} à découvrir
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {daily.kanaToLearn.map((k) => k.character).join(" ")}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            )}

            {/* Vocab preview */}
            {daily.vocabToLearn.length > 0 && (
              <button
                onClick={() => onGoTo("learn", "vocab")}
                className="w-full p-4 flex items-center gap-3 hover:bg-muted/40 transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    Nouveaux mots de vocabulaire
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {previewCategories
                      .map(({ cat }) => `${cat.emoji} ${cat.title}`)
                      .join(" · ")}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            )}

            {/* Grammar */}
            {daily.nextGrammar && (
              <button
                onClick={() => onGoTo("learn", "grammar")}
                className="w-full p-4 flex items-center gap-3 hover:bg-muted/40 transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-chart-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    Grammaire : {daily.nextGrammar.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {daily.nextGrammar.subtitle}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            )}

            {/* Phrases */}
            {daily.phrasesToLearn.length > 0 && (
              <button
                onClick={() => onGoTo("phrases")}
                className="w-full p-4 flex items-center gap-3 hover:bg-muted/40 transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center shrink-0">
                  <MessageSquareText className="w-5 h-5 text-chart-2" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    Phrases essentielles du voyage
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {daily.phrasesToLearn
                      .slice(0, 2)
                      .map((p) => p.french)
                      .join(" · ")}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            )}
          </div>

          {daily.lessonReady ? (
            <div className="p-4 border-t border-border">
              <button
                onClick={startLesson}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-5 h-5" />
                Commencer la leçon
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-6 text-center border-t border-border">
              <p className="text-muted-foreground mb-4">
                🎉 Tout est appris ! Passe un quiz pour renforcer ta mémoire.
              </p>
              <button
                onClick={() => onGoTo("quiz")}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer"
              >
                Faire un quiz
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
