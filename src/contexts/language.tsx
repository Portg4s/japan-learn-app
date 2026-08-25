import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Language = "japanese" | "korean";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "japanese",
  setLanguage: () => {},
});

const LANG_KEY = "jp-learn-lang";

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "japanese" || stored === "korean") return stored;
  } catch { /* ignore */ }
  return "japanese";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* ignore */ }
  }, []);

  // Sync with system preference changes if needed
  useEffect(() => {
    try { localStorage.setItem(LANG_KEY, language); } catch { /* ignore */ }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
