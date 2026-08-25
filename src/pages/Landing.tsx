import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, Home, Grid3X3, GraduationCap, MessageSquareText, Moon, Sun, Download, ChevronDown, Check, Mic } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ManekiNeko from "@/components/ManekiNeko";
import Horangi from "@/components/Horangi";
import { useProgress } from "@/hooks/use-progress";
import { usePwaInstall } from "@/hooks/use-pwa-install";
import { LanguageProvider, useLanguage, type Language } from "@/contexts/language";
import HomeTab from "@/components/HomeTab";
import KanaTab from "@/components/KanaTab";
import VocabTab from "@/components/VocabTab";
import GrammarTab from "@/components/GrammarTab";
import PhrasesTab from "@/components/PhrasesTab";
import PronounceTab from "@/components/PronounceTab";
import QuizTab, { type QuizSession } from "@/components/QuizTab";
import type { QuizQuestion } from "@/lib/quiz-engine";

type AppTab = "home" | "learn" | "quiz" | "phrases" | "pronounce";
type LearnSub = "kana" | "vocab" | "grammar";

const DARK_KEY = "jp-learn-dark";

function getInitialDark(): boolean {
  try {
    const stored = localStorage.getItem(DARK_KEY);
    if (stored !== null) return stored === "true";
  } catch { /* ignore */ }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function LandingInner() {
  const { progress } = useProgress();
  const { canInstall, isInstalled, install } = usePwaInstall();
  const { language, setLanguage } = useLanguage();
  const [dark, setDark] = useState(getInitialDark);

  // Sync dark mode and language to document element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-language", language);
    try { localStorage.setItem(DARK_KEY, String(dark)); } catch { /* ignore */ }
  }, [dark, language]);

  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const [learnSub, setLearnSub] = useState<LearnSub>("kana");
  const [session, setSession] = useState<QuizSession | null>(null);
  const [quizKey, setQuizKey] = useState(0);
  const [langOpen, setLangOpen] = useState(false);

  const startQuiz = useCallback(
    (title: string, questions: QuizQuestion[]) => {
      setSession({ title, questions });
      setQuizKey((k) => k + 1);
      setActiveTab("quiz");
    },
    []
  );

  const changeSession = useCallback((s: QuizSession | null) => {
    setSession(s);
    setQuizKey((k) => k + 1);
  }, []);

  const goTo = useCallback(
    (tab: AppTab, sub?: LearnSub) => {
      if (sub) setLearnSub(sub);
      setActiveTab(tab);
    },
    []
  );

  const titleText = language === "japanese" ? "日本語ラボ" : "한국어랩";

  const navItems: { tab: AppTab; label: string; icon: React.ReactNode }[] = [
    { tab: "home", label: "Accueil", icon: <Home className="w-5 h-5" /> },
    { tab: "learn", label: "Apprendre", icon: <Grid3X3 className="w-5 h-5" /> },
    { tab: "quiz", label: "Quiz", icon: <GraduationCap className="w-5 h-5" /> },
    { tab: "phrases", label: "Phrases", icon: <MessageSquareText className="w-5 h-5" /> },
    { tab: "pronounce", label: "Parler", icon: <Mic className="w-5 h-5" /> },
  ];

  const learnTabs: { sub: LearnSub; label: string }[] = [
    { sub: "kana", label: "Kana" },
    { sub: "vocab", label: "Vocabulaire" },
    { sub: "grammar", label: "Grammaire" },
  ];

  return (
    <div className="min-h-screen app-bg">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {language === "japanese" ? (
              <ManekiNeko mood="happy" className="w-9 h-9 drop-shadow-sm" />
            ) : (
              <Horangi mood="happy" className="w-9 h-9 drop-shadow-sm" />
            )}
            <span className="font-bold text-foreground text-lg font-display tracking-wide">
              {titleText}
            </span>
            {/* Language dropdown */}
            <div className="relative ml-1">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors cursor-pointer text-sm font-medium"
              >
                <span className="text-base">{language === "japanese" ? "🇯🇵" : "🇰🇷"}</span>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {language === "japanese" ? "日本語" : "한국어"}
                </span>
                <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setLangOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 z-50 bg-card border border-border rounded-xl shadow-lg overflow-hidden min-w-[160px]"
                    >
                      {([
                        { lang: "japanese" as Language, flag: "🇯🇵", label: "日本語", sub: "Japonais" },
                        { lang: "korean" as Language, flag: "🇰🇷", label: "한국어", sub: "Coréen" },
                      ]).map(({ lang, flag, label, sub }) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setLangOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted/60 transition-colors cursor-pointer ${
                            language === lang ? "bg-muted/40" : ""
                          }`}
                        >
                          <span className="text-xl">{flag}</span>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">{label}</p>
                            <p className="text-xs text-muted-foreground">{sub}</p>
                          </div>
                          {language === lang && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {canInstall && !isInstalled && (
              <button
                onClick={install}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Download className="w-3 h-3" />
                Installer
              </button>
            )}
            <button
              onClick={() => setDark((d) => !d)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
              aria-label={dark ? "Mode clair" : "Mode sombre"}
            >
              {dark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
            </button>
            <Badge variant="secondary" className="gap-1 font-semibold">
              <Flame className={`w-3.5 h-3.5 ${progress.streak > 0 ? "streak-flame" : "text-amber-500"}`} />
              {progress.streak}
            </Badge>
            <Badge variant="secondary" className="gap-1 font-semibold">
              <Zap className="w-3.5 h-3.5 text-accent" />
              {progress.totalXp} XP
            </Badge>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-28">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <HomeTab
              key="home"
              onStartLesson={startQuiz}
              onGoTo={goTo}
            />
          )}

          {activeTab === "learn" && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex bg-muted rounded-xl p-1 gap-1 sticky top-[60px] z-30">
                {learnTabs.map(({ sub, label }) => (
                  <button
                    key={sub}
                    onClick={() => setLearnSub(sub)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                      learnSub === sub
                        ? "bg-card text-foreground shadow-sm border border-border"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {learnSub === "kana" && (
                  <div key="kana">
                    <KanaTab onStartQuiz={startQuiz} />
                  </div>
                )}
                {learnSub === "vocab" && (
                  <div key="vocab">
                    <VocabTab onStartQuiz={startQuiz} />
                  </div>
                )}
                {learnSub === "grammar" && (
                  <div key="grammar">
                    <GrammarTab />
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === "quiz" && (
            <QuizTab
              key={`quiz-${quizKey}`}
              session={session}
              onSessionChange={changeSession}
              onGoToLearn={() => goTo("learn", learnSub)}
            />
          )}

          {activeTab === "phrases" && (
            <div key="phrases">
              <PhrasesTab onStartQuiz={startQuiz} />
            </div>
          )}

          {activeTab === "pronounce" && (
            <div key="pronounce">
              <PronounceTab />
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-t border-border" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="max-w-2xl mx-auto px-1 py-2 flex justify-around">
          {navItems.map(({ tab, label, icon }) => (
            <button
              key={tab}
              onClick={() => goTo(tab)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all cursor-pointer ${
                activeTab === tab
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {icon}
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default function Landing() {
  return (
    <LanguageProvider>
      <LandingInner />
    </LanguageProvider>
  );
}
