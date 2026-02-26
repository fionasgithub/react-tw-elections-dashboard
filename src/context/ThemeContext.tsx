/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

export type ThemePreference = 'system' | 'light' | 'dark';

interface ThemeContextValue {
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  preference: 'system',
  setPreference: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => {
    return (localStorage.getItem('theme') as ThemePreference) || 'system';
  });

  const setPreference = (pref: ThemePreference) => {
    setPreferenceState(pref);
    localStorage.setItem('theme', pref);
  };

  useEffect(() => {
    const applyTheme = (isDark: boolean) => {
      document.documentElement.classList.toggle('dark', isDark);
    };

    if (preference === 'dark') {
      applyTheme(true);
      return;
    }

    if (preference === 'light') {
      applyTheme(false);
      return;
    }

    // system: follow OS preference
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    applyTheme(mq.matches);

    const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [preference]);

  return (
    <ThemeContext.Provider value={{ preference, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
};
