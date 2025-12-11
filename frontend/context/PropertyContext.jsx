"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const PropertyContext = createContext()

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([])
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_URL = "http://localhost:5000/api"

  // Fetch all properties
  const fetchProperties = async (filters = {}) => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams(filters).toString()
      const response = await axios.get(`${API_URL}/properties?${queryParams}`)
      setProperties(response.data)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching properties:", err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch featured properties
  const fetchFeaturedProperties = async () => {
    try {
      const response = await axios.get(`${API_URL}/properties/featured`)
      setFeaturedProperties(response.data)
    } catch (err) {
      console.error("Error fetching featured properties:", err)
    }
  }

  // Get property by ID
  const getPropertyById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/properties/${id}`)
      return response.data
    } catch (err) {
      console.error("Error fetching property:", err)
      return null
    }
  }

  useEffect(() => {
    fetchProperties()
    fetchFeaturedProperties()
  }, [])

  return (
    <PropertyContext.Provider
      value={{
        properties,
        featuredProperties,
        loading,
        error,
        fetchProperties,
        fetchFeaturedProperties,
        getPropertyById,
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export const useProperty = () => {
  const context = useContext(PropertyContext)
  if (!context) {
    throw new Error("useProperty must be used within PropertyProvider")
  }
  return context
}
