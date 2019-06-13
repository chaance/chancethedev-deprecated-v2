import React, { useContext } from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { ThemeContext } from '@emotion/core';
import theme from '../lib/theme';

export const ThemeToggleContext = React.createContext({
  toggle: () => {},
});

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [themeMode, setThemeMode] = React.useState('light');
  const toggle = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };
  return (
    <ThemeToggleContext.Provider value={{ toggle }}>
      <EmotionThemeProvider theme={{ ...theme, mode: themeMode }}>
        {children}
      </EmotionThemeProvider>
      ;
    </ThemeToggleContext.Provider>
  );
};

export default ThemeProvider;
