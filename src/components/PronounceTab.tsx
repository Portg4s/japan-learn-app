import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  Check,
  X,
  RotateCcw,
  ArrowRight,
  MessageSquareText,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { speak } from "@/lib/speech";
import {
  isRecognitionSupported,
  pronounceCheck,
  type MatchResult,
} from "@/lib/pronunciation";
import { useLanguage } from "@/contexts/language";

interface PromptItem {
  id: string;
  text: string;
  lang: string;
  hint: string;
}

const PROMPTS: PromptItem[] = [
  // Japanese
  { id: "jp-hi", text: "こんにちは", lang: "ja-JP", hint: "Bonjour" },
  { id: "jp-thanks", text: "ありがとう", lang: "ja-JP", hint: "Merci" },
  { id: "jp-sorry", text: "すみません", lang: "ja-JP", hint: "Excusez-moi / Pardon" },
  { id: "jp-good", text: "おいしい", lang: "ja-JP", hint: "C'est délicieux" },
  { id: "jp-where", text: "トイレはどこですか", lang: "ja-JP", hint: "Où sont les toilettes ?" },
  { id: "jp-please", text: "お願いします", lang: "ja-JP", hint: "S'il vous plaît" },
  { id: "jp-water", text: "お水をください", lang: "ja-JP", hint: "De l'eau s'il vous plaît" },
  { id: "jp-name", text: "私の名前はです", lang: "ja-JP", hint: "Je m'appelle…" },
  // Korean
  { id: "kr-hi", text: "안녕하세요", lang: "ko-KR", hint: "Bonjour" },
  { id: "kr-thanks", text: "감사합니다", lang: "ko-KR", hint: "Merci" },
  { id: "kr-sorry", text: "죄송합니다", lang: "ko-KR", hint: "Je suis désolé(e)" },
  { id: "kr-good", text: "맛있어요", lang: "ko-KR", hint: "C'est délicieux" },
  { id: "kr-where", text: "화장실이 어디예요", lang: "ko-KR", hint: "Où sont les toilettes ?" },
  { id: "kr-please", text: "부탁합니다", lang: "ko-KR", hint: "S'il vous plaît" },
  { id: "kr-water", text: "물 주세요", lang: "ko-KR", hint: "De l'eau s'il vous plaît" },
  { id: "kr-name", text: "제 이름은 이에요", lang: "ko-KR", hint: "Je m'appelle…" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function PronounceTab() {
  const { language } = useLanguage();
  const isKoreanLang = language === "korean";

  const activePrompts = PROMPTS.filter((p) =>
    isKoreanLang ? p.lang === "ko-KR" : p.lang === "ja-JP"
  );

  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "listening" | "done" | "error">("idle");
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scores, setScores] = useState<number[]>([]);

  const current = activePrompts[index] ?? null;
  const supported = isRecognitionSupported();
  const completedCount = scores.length;
  const avgScore =
    scores.length > 0
      ? Math.round(
          (scores.reduce((a, b) => a + b, 0) / scores.length) * 100
        )
      : 0;

  const handleListen = useCallback(async () => {
    if (!current) return;
    setStatus("listening");
    setError(null);
    setResult(null);
    try {
      const match = await pronounceCheck(current.text, current.lang);
      setResult(match);
      setStatus("done");
      setScores((prev) => [...prev, match.score]);
    } catch (e: any) {
      setError(e.message ?? "Une erreur est survenue.");
      setStatus("error");
    }
  }, [current]);

  const nextPrompt = useCallback(() => {
    const next = index + 1;
    if (next < activePrompts.length) {
      setIndex(next);
      setStatus("idle");
      setResult(null);
      setError(null);
    }
  }, [index, activePrompts.length]);

  const resetExercise = () => {
    setIndex(0);
    setStatus("idle");
    setResult(null);
    setError(null);
    setScores([]);
  };

  if (!supported) {
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
            <h2 className="text-2xl font-bold text-foreground font-display">Prononciation</h2>
          </div>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-8 text-center"
        >
          <MicOff className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-foreground mb-2">
            Micro non disponible
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            La reconnaissance vocale n'est pas supportée par ton navigateur ou
            nécessite une connexion sécurisée (HTTPS). Ouvre l'app sur ton
            téléphone avec Chrome ou Safari pour utiliser cette fonctionnalité.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // All done
  if (scores.length === activePrompts.length && status === "done") {
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
            <h2 className="text-2xl font-bold text-foreground font-display">Prononciation</h2>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="bg-card border border-border rounded-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4"
          >
            {avgScore >= 80 ? (
              <span className="text-4xl">🎉</span>
            ) : avgScore >= 60 ? (
              <span className="text-4xl">👏</span>
            ) : (
              <span className="text-4xl">💪</span>
            )}
          </motion.div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Exercice terminé !
          </h3>
          <p className="text-muted-foreground mb-2">
            Score moyen de prononciation
          </p>
          <p className="text-4xl font-bold text-primary mb-4">{avgScore}%</p>
          <Progress value={avgScore} className="h-3 max-w-xs mx-auto mb-6" />
          <button
            onClick={resetExercise}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Recommencer
          </button>
        </motion.div>
      </motion.div>
    );
  }

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
          <h2 className="text-2xl font-bold text-foreground font-display">Prononciation</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Parle dans le micro pour t'entraîner à prononcer. L'app vérifie ta
          prononciation et te donne un score.
        </p>
        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Phrase {index + 1}/{activePrompts.length}
            </span>
            <span className="font-semibold text-foreground">
              {completedCount} validée{completedCount > 1 ? "s" : ""}
            </span>
          </div>
          <Progress
            value={((index + 1) / activePrompts.length) * 100}
            className="h-2"
          />
        </div>
      </motion.div>

      {current && (
        <motion.div variants={fadeUp}>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Prompt display */}
            <div className="p-6 sm:p-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Prononce cette phrase :
              </p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <p className="text-3xl sm:text-4xl font-bold text-foreground">
                  {current.text}
                </p>
                <button
                  onClick={() => speak(current.text, current.lang)}
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Écouter la prononciation correcte"
                >
                  <Volume2 className="w-5 h-5 text-primary" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                💡 {current.hint}
              </p>
            </div>

            {/* Recording button */}
            {status === "idle" || status === "error" ? (
              <div className="px-6 pb-6 flex flex-col items-center">
                <button
                  onClick={handleListen}
                  className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Parler maintenant"
                >
                  <Mic className="w-8 h-8" />
                </button>
                <p className="text-xs text-muted-foreground mt-3">
                  Appuie et parle
                </p>
                {error && (
                  <p className="text-sm text-red-500 mt-2 text-center max-w-xs">
                    {error}
                  </p>
                )}
              </div>
            ) : status === "listening" ? (
              <div className="px-6 pb-6 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg animate-pulse">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm font-medium text-red-500 mt-3 animate-pulse">
                  Écoute en cours… Parle maintenant !
                </p>
              </div>
            ) : null}

            {/* Result */}
            <AnimatePresence>
              {result && status === "done" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-border pt-4 space-y-4">
                    {/* What was heard */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Ce que le micro a entendu :
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {result.spoken || (
                          <span className="text-muted-foreground italic">
                            (rien détecté)
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Character comparison */}
                    {result.charMap.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Comparaison caractère par caractère :
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {result.charMap.map((c, i) => (
                            <span
                              key={i}
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${
                                c.ok
                                  ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                                  : "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400"
                              }`}
                              title={`Attendu: ${c.expected}, Reçu: ${c.char}`}
                            >
                              {c.char}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Score */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center ${
                          result.pass
                            ? "bg-green-100 dark:bg-green-950/30"
                            : "bg-amber-100 dark:bg-amber-950/20"
                        }`}
                      >
                        {result.pass ? (
                          <Check className="w-7 h-7 text-green-600 dark:text-green-400" />
                        ) : (
                          <X className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">
                          Score : {Math.round(result.score * 100)}%
                        </p>
                        <Progress
                          value={result.score * 100}
                          className={`h-2 mt-1 ${
                            result.pass
                              ? "[&>div]:bg-green-500"
                              : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={handleListen}
                        className="flex-1 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Réessayer
                      </button>
                      <button
                        onClick={nextPrompt}
                        className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
                      >
                        {index + 1 >= activePrompts.length
                          ? "Terminer"
                          : "Phrase suivante"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
