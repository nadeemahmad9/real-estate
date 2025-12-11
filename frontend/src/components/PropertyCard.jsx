
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin,
  Share2,
  BarChart2,
  Star,
  Home,
  Maximize,
  BedDouble,
  ArrowRight
} from "lucide-react";

const PropertyCard = ({ property }) => {
  // Helper to determine status color (kept from your code)
  const getStatusColor = (status) => {
    switch (status) {
      case "Ready to Move": return "bg-green-500";
      case "Mid Stage": return "bg-blue-500";
      case "New Launch": return "bg-yellow-500";
      default: return "bg-gray-400";
    }
  };

  const getStatusWidth = (status) => {
    switch (status) {
      case "Ready to Move": return 100;
      case "Mid Stage": return 66;
      case "New Launch": return 33;
      default: return 10;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
    >

      {/* --- Image Section --- */}
      <div className="relative h-64 overflow-hidden group bg-gray-100">
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {property.featured && (
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              TRENDING
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button className="bg-white/90 p-2 rounded-full text-gray-600 hover:text-red-500 hover:bg-white shadow-sm transition-colors" title="Compare">
            <BarChart2 size={18} />
          </button>
          <button className="bg-white/90 p-2 rounded-full text-gray-600 hover:text-blue-500 hover:bg-white shadow-sm transition-colors" title="Share">
            <Share2 size={18} />
          </button>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

        {/* Transaction Type Badge (Bottom Right on Image) */}
        <div className="absolute bottom-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm text-white backdrop-blur-md ${property.transactionType === "For Rent" ? "bg-purple-600/80" : "bg-blue-600/80"
            }`}>
            {property.transactionType || "For Sale"}
          </span>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-5 flex flex-col flex-grow">

        {/* Title & Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight hover:text-red-600 transition-colors cursor-pointer line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center bg-green-50 px-2 py-1 rounded text-xs font-bold text-green-700 border border-green-100 shrink-0 ml-2">
            {property.rating || "5.0"} <Star size={10} className="ml-1 fill-current" />
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-extrabold text-red-600 font-sans tracking-tight">
            {property.currency} {property.price?.toLocaleString()}
          </p>
        </div>

        {/* Details Grid - Clean 2x2 Layout */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-5">
          <div className="flex items-center gap-2" title="Location">
            <MapPin size={16} className="text-gray-400 shrink-0" />
            <span className="truncate">{property.location}, {property.city}</span>
          </div>
          <div className="flex items-center gap-2" title="Property Type">
            <Home size={16} className="text-gray-400 shrink-0" />
            <span>{property.propertyType || "Residential"}</span>
          </div>
          <div className="flex items-center gap-2" title="Area">
            <Maximize size={16} className="text-gray-400 shrink-0" />
            <span>{property.area} Sq.Ft</span>
          </div>
          <div className="flex items-center gap-2" title="Configuration">
            <BedDouble size={16} className="text-gray-400 shrink-0" />
            <span>{property.bedrooms} Beds</span>
          </div>
        </div>

        {/* Progress Bar (Construction Status) */}
        <div className="mt-auto mb-5">
          <div className="flex justify-between items-end mb-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
            <span className="text-xs font-bold text-gray-800">{property.status}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full transition-all duration-1000 ease-out ${getStatusColor(property.status)}`}
              style={{ width: `${getStatusWidth(property.status)}%` }}
            ></div>
          </div>
        </div>

        {/* CTA Button */}
        <Link to={`/property/${property._id}`}>
          <button className="group w-full py-3 rounded-lg border-2 border-red-500 text-red-600 font-bold text-sm uppercase tracking-wide hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
            View Details
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>

      </div>
    </motion.div>
  );
};

export default PropertyCard;