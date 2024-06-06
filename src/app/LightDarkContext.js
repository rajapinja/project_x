// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

export const themes = {
  light: {
   //backgroundColor: '#ffffff',
    backgroundColor: 'teal',
    //textColor: '#000000',
    //textColor: '#F5F5F5',
    textColor: 'purple',
    borderColor: 'teal', // Border color   
    placeholderTextColor:"purple",
    subheading:'teal'
  },
  dark: {
    //backgroundColor: '#333333',
    backgroundColor: 'purple',
   // textColor: '#F5F5F5'
    //textColor: '#000000',
    textColor: 'teal',
    borderColor: 'purple', // Border color
    placeholderTextColor:"teal",
    subheading:'purple'
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light); // Set default theme to light

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
