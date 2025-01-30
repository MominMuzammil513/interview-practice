import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // For prop validation
import api from "../services/api.js"; // Import the API service

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [loading, setLoading] = useState(true); // Track loading state

  // Check if the user is already authenticated (e.g., on page refresh)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Validate the token (you can call a backend endpoint for this)
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register a new user
  const register = async (userData) => {
    const response = await api.registerUser(userData);
    localStorage.setItem("token", response.token); // Store the token in localStorage
    setUser(response.user);
    setIsAuthenticated(true);
  };

  // Login a user
  const login = async (userData) => {
    const response = await api.loginUser(userData);
    localStorage.setItem("token", response.token); // Store the token in localStorage
    setUser(response.user);
    setIsAuthenticated(true);
  };

  // Logout the user
  const logout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Add PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);