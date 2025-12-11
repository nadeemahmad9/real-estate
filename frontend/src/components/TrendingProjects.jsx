
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useProperty } from "../context/PropertyContext"
import PropertyCard from "./PropertyCard"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react" // Using clean icons

const TrendingProjects = () => {
  const { featuredProperties, loading } = useProperty()
  const [currentIndex, setCurrentIndex] = useState(0)

  // DEBUG: Check what data is actually coming in
  useEffect(() => {
    console.log("TrendingProjects Data:", featuredProperties);
  }, [featuredProperties]);

  const itemsPerSlide = 3

  // SAFETY CHECK: Handle empty or undefined data
  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-custom text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    )
  }

  if (!featuredProperties || featuredProperties.length === 0) {
    return (
      <section className="py-16 bg-white text-center">
        <p className="text-gray-500">No trending projects available at the moment.</p>
      </section>
    );
  }

  // Calculate slides only if we have data
  const totalSlides = Math.ceil(featuredProperties.length / itemsPerSlide)

  // Prevent NaN errors if totalSlides is 0
  const safeNext = () => {
    if (totalSlides > 1) {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }
  }

  const safePrev = () => {
    if (totalSlides > 1) {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    }
  }

  // Slice data for the current slide
  const visibleProperties = featuredProperties.slice(
    currentIndex * itemsPerSlide,
    currentIndex * itemsPerSlide + itemsPerSlide
  )

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container-custom">
        <p className="section-subtitle text-gray-600">DISCOVER</p>
        <h2 className="section-title mb-12">TRENDING PROJECTS</h2>

        <div className="relative">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {visibleProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6">

            {/* Slider Arrows Group */}
            {totalSlides > 1 && (
              <div className="flex gap-3">
                <button
                  onClick={safePrev}
                  className="w-12 h-12 rounded-full border border-gray-300 text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 flex items-center justify-center transition-all duration-300 shadow-sm"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={safeNext}
                  className="w-12 h-12 rounded-full border border-gray-300 text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 flex items-center justify-center transition-all duration-300 shadow-sm"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}

            {/* View All Button */}
            <Link to="/properties">
              <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 font-bold text-sm tracking-wide shadow-lg transition-transform transform hover:-translate-y-0.5">
                VIEW ALL
              </button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}

export default TrendingProjects