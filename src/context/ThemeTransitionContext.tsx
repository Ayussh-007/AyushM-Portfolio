"use client";

import React, { createContext, useContext } from "react";
import { useTheme as useNextTheme } from "next-themes";

interface ThemeContextType {
  isTransitioning: boolean;
  toggleWithAnimation: (event: React.MouseEvent) => void;
}

const ThemeTransitionContext = createContext<ThemeContextType | null>(null);

export function ThemeTransitionProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useNextTheme();

  const toggleWithAnimation = () => {
    const targetTheme = theme === "dark" ? "light" : "dark";
    setTheme(targetTheme);
  };

  return (
    <ThemeTransitionContext.Provider value={{ isTransitioning: false, toggleWithAnimation }}>
      {children}
    </ThemeTransitionContext.Provider>
  );
}

export const useThemeTransition = () => {
  return useContext(ThemeTransitionContext);
};
