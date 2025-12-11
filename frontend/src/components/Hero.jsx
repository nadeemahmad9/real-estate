


import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Home, Building2, Building, Palmtree } from "lucide-react"; // Make sure to install lucide-react

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("Residential");
  const [transactionType, setTransactionType] = useState("For Sale");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const filters = {
      city: searchQuery,
      propertyType,
      transactionType,
    };
    navigate("/properties", { state: { filters } });
  };

  return (
    <section className="relative h-[600px] lg:h-screen min-h-[800px] w-full bg-gray-900 overflow-hidden">

      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://eics-india.com/wp-content/uploads/2024/06/7-Things-You-Need-to-Know-About-Commercial-Real-Estate.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl"
        >
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Discover your dream property <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">
              in INDIA
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            Find the perfect property from thousands of exclusive listings across top cities.
          </p>

          {/* Search Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-6 rounded-2xl shadow-2xl"
          >
            <form onSubmit={handleSearch} className="flex flex-col gap-4">

              {/* Top Row: Buy/Rent Buttons */}
              <div className="flex p-1 bg-gray-900/50 rounded-lg w-fit mx-auto sm:mx-0">
                {["For Sale", "For Rent"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTransactionType(type)}
                    className={`px-6 py-2 rounded-md text-sm sm:text-base font-semibold transition-all duration-300 ${transactionType === type
                      ? "bg-red-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {type === "For Sale" ? "BUY" : "RENT"}
                  </button>
                ))}
              </div>

              {/* Bottom Row: Inputs & Search Button */}
              <div className="flex flex-col md:flex-row gap-3">

                {/* Property Type Dropdown */}
                <div className="relative md:w-1/4 group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    {propertyType === "Residential" && <Home size={18} />}
                    {propertyType === "Commercial" && <Building2 size={18} />}
                    {propertyType === "Apartment" && <Building size={18} />}
                    {propertyType === "Villa" && <Palmtree size={18} />}
                  </div>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-lg bg-white text-gray-900 font-medium focus:ring-2 focus:ring-red-500 focus:outline-none appearance-none cursor-pointer transition-shadow"
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                  </select>
                  {/* Custom Arrow Icon */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Locality, Landmark, Project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="md:w-auto h-12 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg hover:shadow-red-600/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Search size={20} />
                  <span>SEARCH</span>
                </button>
              </div>
            </form>
          </motion.div>

          {/* Quick Stats / Trust Indicators (Optional Enhancement) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex justify-center gap-6 sm:gap-12 text-gray-300 text-sm sm:text-base font-medium"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              10k+ Listings
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Verified Agents
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;