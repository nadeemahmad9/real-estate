
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AddPropertyForm from "./AddPropertyForm";
import {
  Plus, Edit, Trash2, MapPin, Search, LayoutList, ArrowLeft, Loader, Home, Building
} from "lucide-react";

const Dashboard = () => {
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // 'list' or 'add'
  const [searchTerm, setSearchTerm] = useState("");

  // --- 1. FETCH PROPERTIES ---
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/properties`);
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await axios.delete(`${API_URL}/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(properties.filter(p => p._id !== id));
      alert("Property deleted successfully");
    } catch (err) {
      alert("Failed to delete property");
    }
  };

  // --- 3. FILTER LOGIC ---
  const filteredProperties = properties.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <LayoutList className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              Admin Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1 ml-1">
              Manage your real estate inventory
            </p>
          </div>

          <button
            onClick={() => setView(view === 'list' ? 'add' : 'list')}
            className={`
              w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-xl shadow-lg transition-transform active:scale-95 font-bold text-white
              ${view === 'add' ? "bg-gray-700 hover:bg-gray-800" : "bg-red-600 hover:bg-red-700"}
            `}
          >
            {view === 'add' ? (
              <> <ArrowLeft size={20} className="mr-2" /> Back to List </>
            ) : (
              <> <Plus size={20} className="mr-2" /> Add Property </>
            )}
          </button>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        {view === 'add' ? (
          /* ADD FORM VIEW */
          <div className="animate-fade-in-up">
            <AddPropertyForm
              onSuccess={() => {
                setView('list');
                fetchProperties();
              }}
              onCancel={() => setView('list')}
            />
          </div>
        ) : (
          /* LIST VIEW */
          <div className="space-y-6">

            {/* Search Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search by title, city, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 text-gray-500">
                <Loader className="animate-spin text-blue-600 mb-4" size={40} />
                <p>Loading properties...</p>
              </div>
            ) : (
              <>
                {/* --- DESKTOP TABLE VIEW (Hidden on Mobile) --- */}
                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Property Details</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProperties.length > 0 ? (
                        filteredProperties.map((property) => (
                          <tr key={property._id} className="hover:bg-blue-50/50 transition-colors duration-150">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="shrink-0 h-12 w-12 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                                  <img className="h-full w-full object-cover" src={property.image} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-bold text-gray-900 line-clamp-1">{property.title}</div>
                                  <div className="text-xs text-gray-500 mt-0.5">{property.configurations?.length || 0} Configurations</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin size={14} className="mr-1.5 text-red-500 shrink-0" />
                                <span className="truncate max-w-[150px]">{property.city}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800">
                                ₹{property.price?.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {property.propertyType}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex justify-center items-center space-x-4">
                                <Link
                                  to={`/dashboard/edit/${property._id}`}
                                  className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
                                  title="Edit"
                                >
                                  <Edit size={18} />
                                </Link>
                                <button
                                  onClick={() => handleDelete(property._id)}
                                  className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                                  title="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                            <div className="flex flex-col items-center justify-center">
                              <Search size={48} className="text-gray-200 mb-4" />
                              <p className="text-lg font-medium">No properties found</p>
                              <p className="text-sm text-gray-400">Try adjusting your search terms</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* --- MOBILE CARD VIEW (Visible on Mobile) --- */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                      <div key={property._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                        {/* Image */}
                        <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight">{property.title}</h3>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold whitespace-nowrap ml-2">
                                ₹{property.price?.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mt-2">
                              <MapPin size={12} className="mr-1 text-red-500" />
                              {property.city}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Building size={12} className="mr-1 text-blue-500" />
                              {property.propertyType}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex justify-end gap-3 mt-3 border-t border-gray-100 pt-3">
                            <Link
                              to={`/dashboard/edit/${property._id}`}
                              className="flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md active:bg-blue-100"
                            >
                              <Edit size={14} className="mr-1" /> Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(property._id)}
                              className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-md active:bg-red-100"
                            >
                              <Trash2 size={14} className="mr-1" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                      <p className="text-gray-500">No properties found matching "{searchTerm}"</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;