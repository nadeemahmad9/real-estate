


import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useProperty } from "../context/PropertyContext"
import PropertyCard from "../components/PropertyCard"
import Footer from "../components/Footer"
import { Helmet } from "react-helmet"
import { Filter, X } from "lucide-react"

const Properties = () => {
  const location = useLocation()
  const { properties, fetchProperties, loading } = useProperty()
  const [filters, setFilters] = useState(location.state?.filters || {})
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    fetchProperties(filters)
  }, [filters])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }, // Faster stagger for smaller cards
    },
  }

  // Common Filter Component to reuse for Mobile and Desktop
  const FilterContent = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">City</label>
        <input
          type="text"
          placeholder="Search city..."
          value={filters.city || ""}
          onChange={(e) => handleFilterChange("city", e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-red-600 bg-gray-50 focus:bg-white transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Property Type</label>
        <select
          value={filters.propertyType || ""}
          onChange={(e) => handleFilterChange("propertyType", e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-red-600 bg-gray-50 focus:bg-white transition-colors cursor-pointer"
        >
          <option value="">All Types</option>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Apartment</option>
          <option>Villa</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Transaction Type</label>
        <select
          value={filters.transactionType || ""}
          onChange={(e) => handleFilterChange("transactionType", e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-red-600 bg-gray-50 focus:bg-white transition-colors cursor-pointer"
        >
          <option value="">All</option>
          <option>For Sale</option>
          <option>For Rent</option>
        </select>
      </div>

      <button
        onClick={() => {
          setFilters({})
          setShowMobileFilters(false)
        }}
        className="w-full mt-4 bg-gray-900 text-white text-sm py-2 rounded hover:bg-gray-800 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Properties for Sale & Rent - InvestoXpert</title>
        <meta name="description" content="Browse thousands of properties for sale and rent in India." />
      </Helmet>

      <div className="bg-gray-50 min-h-screen pt-4 pb-12">
        <div className="container-custom px-4 sm:px-6">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Available Properties</h1>
              <p className="text-sm text-gray-500 mt-1">Found {properties.length} listings</p>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center justify-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter size={16} /> Filters
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* Desktop Sidebar (Hidden on Mobile) */}
            <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                  <Filter size={18} className="text-red-600" />
                  <h3 className="font-bold text-gray-800">Filter Properties</h3>
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Mobile Sidebar (Drawer) */}
            <AnimatePresence>
              {showMobileFilters && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
                    onClick={() => setShowMobileFilters(false)}
                    className="fixed inset-0 bg-black z-40 lg:hidden"
                  />
                  <motion.div
                    initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                    transition={{ type: "tween" }}
                    className="fixed top-0 right-0 h-full w-80 bg-white z-50 p-6 shadow-2xl overflow-y-auto lg:hidden"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold">Filters</h3>
                      <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-full">
                        <X size={20} />
                      </button>
                    </div>
                    <FilterContent />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Properties Grid */}
            <div className="flex-1 w-full">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="bg-white h-80 rounded-xl shadow-sm animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-t-xl" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : properties.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Filter size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">No properties found</h3>
                  <p className="text-gray-500 mt-1">Try adjusting your filters or search criteria.</p>
                  <button onClick={() => setFilters({})} className="mt-4 text-red-600 font-medium hover:underline">
                    Clear all filters
                  </button>
                </div>
              ) : (
                <motion.div
                  // Updated Grid Classes for smaller cards:
                  // sm:grid-cols-2 -> 2 cards on tablet
                  // xl:grid-cols-3 -> 3 cards on desktop (Makes them smaller)
                  // gap-4 -> tighter spacing
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Properties