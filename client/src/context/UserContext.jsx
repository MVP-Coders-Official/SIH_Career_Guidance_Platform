// import React, { createContext, useContext, useState, useEffect } from 'react';

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     const saved = localStorage.getItem('careersync-theme');
//     return saved ? JSON.parse(saved) : false;
//   });

//   useEffect(() => {
//     localStorage.setItem('careersync-theme', JSON.stringify(isDarkMode));
//     document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
//   }, [isDarkMode]);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const value = {
//     isDarkMode,
//     toggleTheme
//   };

//   return (
//     <ThemeContext.Provider value={value}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// }


// import React, { createContext, useContext, useState, useEffect } from 'react';

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Example: store user in localStorage
//   useEffect(() => {
//     const savedUser = localStorage.getItem('careersync-user');
//     if (savedUser) setUser(JSON.parse(savedUser));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('careersync-user', JSON.stringify(user));
//   }, [user]);

//   const login = (userData) => setUser(userData);
//   const logout = () => setUser(null);

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// }


import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);         // 👈 added
  const [quizResults, setQuizResults] = useState(null);  // 👈 added

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('careersync-user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('careersync-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('careersync-user');
    }
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const updateUser = (userData) => setUser(userData);

  return (
    <UserContext.Provider value={{ 
      user, login, logout, updateUser,
      loading, setLoading,       // 👈 now available
      quizResults, setQuizResults // 👈 now available
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
