import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("adminUser");

      if (savedUser && savedUser !== "undefined") {
        return JSON.parse(savedUser);
      }
      return null;
    } catch (error) {

      console.error("Failed to parse user data:", error);
      localStorage.removeItem("adminUser");
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("adminToken");
    return (savedToken && savedToken !== "undefined") ? savedToken : null;
  });

  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // Clean up headers if no token
      delete axios.defaults.headers.common["Authorization"];
    }
    setLoading(false);
  }, [token]);

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });

      const { token: newToken, user: newUser } = response.data;

      setToken(newToken);
      setUser(newUser);

      localStorage.setItem("adminToken", newToken);
      localStorage.setItem("adminUser", JSON.stringify(newUser));

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE:", response.data);

      const token = response.data.token;


      const userData = response.data.user || response.data.admin || response.data.data?.user;

      if (!userData) {
        console.error("User data missing in response!");
        alert("Login successful but user data missing.");
        return;
      }

      setToken(token);
      setUser(userData);

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(userData));

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return response.data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error.response?.data || error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};