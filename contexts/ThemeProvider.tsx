/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("light");

  // Updates DOM class and localStorage
  const updateBodyClass = (newTheme: Theme) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    updateBodyClass(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // On first load: apply user preference or default theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    if (storedTheme) {
      setThemeState(storedTheme);
      updateBodyClass(storedTheme);
    } else {
      const currentHour = new Date().getHours();
      const autoDark = currentHour >= 18 || currentHour < 6;
      const defaultTheme: Theme = autoDark ? "dark" : "light";

      setThemeState(defaultTheme);
      updateBodyClass(defaultTheme);
      localStorage.setItem("theme", defaultTheme);
    }
  }, []);

  // Monitor time every minute to auto-switch at 6 PM
  useEffect(() => {
    const checkTimeAndAutoSwitch = () => {
      const hour = new Date().getHours();
      const shouldBeDark = hour >= 18 || hour < 6;

      if (shouldBeDark && theme !== "dark") {
        setTheme("dark");
      }
      if (!shouldBeDark && theme !== "light") {
        setTheme("light");
      }
    };
checkTimeAndAutoSwitch()
    // const interval = setInterval(checkTimeAndAutoSwitch, 60000); // every minute
    // return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
