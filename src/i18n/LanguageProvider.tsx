import { createContext, useContext, useEffect, useState } from "react";
import { dictionaries, type Dict, type Lang } from "./dictionaries";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: dictionaries.en,
});

const STORAGE_KEY = "robotai-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Read the stored preference after hydration to avoid SSR mismatches.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "zh" || stored === "en") {
      setLangState(stored);
      return;
    }
    if (navigator.language?.toLowerCase().startsWith("zh")) setLangState("zh");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  return useContext(LanguageContext);
}

/** Shorthand for components that only need the dictionary. */
export function useT() {
  return useContext(LanguageContext).t;
}
