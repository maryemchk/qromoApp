import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  signup: (
    email: string, 
    password: string, 
    businessName: string, 
    businessType: string, 
    location: string,
    phoneNumber: string
  ) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);

  const signup = (
    email: string, 
    password: string, 
    businessName: string, 
    businessType: string, 
    location: string,
    phoneNumber: string
  ) => {
    // Implement your sign-up logic here (e.g., API call or local storage)
    // For now, we simply set the user as logged in and log the details.
    console.log(`User signed up with: 
                 ${email}, 
                 ${businessName}, 
                 ${businessType}, 
                 ${location}, 
                 ${phoneNumber}`);
    setIsLoggedIn(true);
  };

  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
