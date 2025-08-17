/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
export const SUPPORTED_LANGUAGES = {
  english: {
    code: 'en',
    name: 'English',
    shortName: 'EN',
    flag: '🇺🇸'
  },
  yoruba: {
    code: 'yo',
    name: 'Yorùbá',
    shortName: 'YO',
    flag: '🇳🇬'
  },
  french: {
    code: 'fr',
    name: 'Français',
    shortName: 'FR',
    flag: '🇫🇷'
  },
  spanish: {
    code: 'es',
    name: 'Español',
    shortName: 'ES',
    flag: '🇪🇸'
  },
  hausa: {
    code: 'ha',
    name: 'Hausa',
    shortName: 'HA',
    flag: '🇳🇬'
  },
  igbo: {
    code: 'ig',
    name: 'Igbo',
    shortName: 'IG',
    flag: '🇳🇬'
  }
} as const;

export type LanguageKey = keyof typeof SUPPORTED_LANGUAGES;

interface LanguageContextType {
  currentLanguage: LanguageKey;
  setLanguage: (language: LanguageKey) => void;
  availableLanguages: LanguageKey[];
  setAvailableLanguages: (languages: LanguageKey[]) => void;
  getText: (key: string, page?: string) => string;
  isLoading: boolean;
  loadLanguageData: any
  setIsLoading?:any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguages?: LanguageKey[];
}

const languageDataCache: Record<string, Record<string, any>> = {};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguages = ['english', 'yoruba'] 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageKey>('english');
  const [availableLanguages, setAvailableLanguages] = useState<LanguageKey[]>(defaultLanguages);
  const [isLoading, setIsLoading] = useState(false);

  // Load language data
  const loadLanguageData = async (language: LanguageKey, page: string): Promise<any> => {
    const cacheKey = `${language}-${page}`;
    
    if (languageDataCache[cacheKey]) {
      return languageDataCache[cacheKey];
    }

    try {
      const response = await fetch(`/data/languageData/${language}DataSet/${page}.json`);
      if (response.ok) {
        const data = await response.json();
        languageDataCache[cacheKey] = data;
        return data;
      }
    } catch (error) {
      console.warn(`Failed to load language data for ${language}/${page}:`, error);
    }

    return {};
  };

  const getText = (key: string, page: string = 'english'): string => {
    const cacheKey = `${currentLanguage}-${page}`;
    const data = languageDataCache[cacheKey];
    
    if (data && data[key]) {
      return data[key];
    }

    if (currentLanguage !== 'english') {
      const englishCacheKey = `english-${page}`;
      const englishData = languageDataCache[englishCacheKey];
      if (englishData && englishData[key]) {
        return englishData[key];
      }
    }

    return key;
  };

  const setLanguage = (language: LanguageKey) => {
    if (!availableLanguages.includes(language)) {
      console.warn(`Language ${language} is not available in current context`);
      return;
    }

    setCurrentLanguage(language);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentLanguage', language);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('currentLanguage') as LanguageKey;
      if (savedLanguage && availableLanguages.includes(savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      } else {
        localStorage.setItem('currentLanguage', currentLanguage);
      }
    }
  }, []);

  const contextValue: LanguageContextType = {
    currentLanguage,
    setLanguage,
    availableLanguages,
    setAvailableLanguages,
    getText,
    setIsLoading,
    loadLanguageData,
    isLoading
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const usePageLanguage = (pageName: string) => {
  const { currentLanguage, getText } = useLanguage();
  const [pageData, setPageData] = useState<Record<string, any>>({});
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const loadPageData = async () => {
      setIsPageLoading(true);
      try {
        const response = await fetch(`/data/languageData/${currentLanguage}DataSet/${pageName}.json`);
        if (response.ok) {
          const data = await response.json();
          setPageData(data);

          languageDataCache[`${currentLanguage}-${pageName}`] = data;
        }
      } catch (error) {
        console.warn(`Failed to load page data for ${currentLanguage}/${pageName}:`, error);
        setPageData({});
      }
      setIsPageLoading(false);
    };

    loadPageData();
  }, [currentLanguage, pageName]);

  const getPageText = (key: string): string => {
    if (pageData[key]) {
      return pageData[key];
    }
    return getText(key, pageName);
  };

  return {
    getPageText,
    pageData,
    isPageLoading
  };
};