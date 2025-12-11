
import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("adminToken"))
  const [loading, setLoading] = useState(true)

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
    setLoading(false)
  }, [token])

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      })
      setToken(response.data.token)
      setUser(response.data.user)
      localStorage.setItem("adminToken", response.data.token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      })
      setToken(response.data.token)
      setUser(response.data.user)
      localStorage.setItem("adminToken", response.data.token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("adminToken")
    delete axios.defaults.headers.common["Authorization"]
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
