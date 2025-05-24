import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the AuthContext
const AuthContext = createContext<any>(null);

// 2. AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(localStorage.getItem('user') || null);

  // On mount, check localStorage for an existing user (or token)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Example login - store user info and token in localStorage
  const login = (userData: any) => {
    // userData could be something like: { token, refreshToken, userInfo }
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Example logout - remove user info from localStorage
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Could handle refresh token logic here (e.g., if token is expired)
  // For example:
  // useEffect(() => {
  //   if (user?.tokenExpired) {
  //     // call refresh token endpoint, update localStorage, setUser...
  //   }
  // }, [user]);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

// 3. Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
