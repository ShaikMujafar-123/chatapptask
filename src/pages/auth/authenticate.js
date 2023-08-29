import { createContext, useContext } from "react";

// Create an AuthContext using createContext
const AuthContext = createContext(null);

// Create an AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  

  // Provide the authentication state and functions to child components
  return (
    <AuthContext.Provider >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access authentication context
export const useAuth = () => {
  return useContext(AuthContext); // Use useContext to access AuthContext
};