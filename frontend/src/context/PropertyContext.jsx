

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // --- 1. FETCH ALL PROPERTIES & SET FEATURED ---
  const fetchProperties = async (filters = {}) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(`${API_URL}/properties?${queryParams}`);

      const allProperties = response.data;
      setProperties(allProperties);

      // FIX: Filter featured properties here immediately after fetching
      // Handles boolean true or string "true"
      const featured = allProperties.filter(
        (prop) => prop.featured === true || prop.featured === "true"
      );
      setFeaturedProperties(featured);

      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. GET SINGLE PROPERTY BY ID ---
  const getPropertyById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/properties/${id}`);
      const property = response.data;

      // FIX: Return the data with safety defaults to prevent "map undefined" errors
      return {
        ...property,
        amenities: property.amenities || [],
        configurations: property.configurations || [],
        developer: property.developer || {},
        priceTrends: property.priceTrends || [],
        compare: property.compare || [],
        images: property.images || [],
      };
    } catch (err) {
      console.error("Error fetching property:", err);
      return null;
    }
  };

  // Initial Load
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        featuredProperties, // This is now auto-populated
        loading,
        error,
        fetchProperties,
        getPropertyById,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within PropertyProvider");
  }
  return context;
};