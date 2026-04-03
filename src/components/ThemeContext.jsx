import { createContext, useContext } from 'react';

const ThemeContext = createContext();
const orphanovaLogo = '/brands/orphanova-lens.png';

export function ThemeProvider({ children }) {
  const theme = 'dark';
  const toggleTheme = () => {};

  const getLogo = () => {
    return orphanovaLogo;
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
