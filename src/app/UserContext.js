// UserContext.js
import React, { createContext, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

// User Context
const UserContext = createContext();
//Theme Context
const ThemeContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, role, setRole }}>
      <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
        {children}
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

// const RadioButton = () => {
//   const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

//   const handleSelect = (option) => {
//     setIsDarkTheme(option === 'Dark');
//   };

//   return (
//     <View style={styles.radioContainer}>
//       <TouchableOpacity style={styles.radioOption} onPress={() => handleSelect('Light')}>
//         <Text style={styles.optionText}>Light</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.radioOption} onPress={() => handleSelect('Dark')}>
//         <Text style={styles.optionText}>Dark</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

export const useUserContext = () => useContext(UserContext);

