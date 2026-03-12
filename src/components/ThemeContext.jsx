import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const theme = 'dark';

  const toggleTheme = () => {};

  const getLogo = () => {
    return theme === 'dark'
      ? 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690a1389568b31dc5bffd62d/ee6ddf117_ChatGPTImageNov12202509_01_55PM.png'
      : 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/690a1389568b31dc5bffd62d/af115b481_OrphaNovaHealthcareStartupLogo4.png';
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getLogo }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}