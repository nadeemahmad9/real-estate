
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AddPropertyForm from "./AddPropertyForm"; // Import the component we made above
import {
  Plus, Edit, Trash2, MapPin, Search, LayoutList, ArrowLeft, Loader
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
    <div className="min-h-screen bg-gray-100 p-6 mt-25">
      <div className="max-w-7xl mx-auto">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <LayoutList className="text-blue-600" /> Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Manage all your real estate listings here</p>
          </div>

          {/* TOGGLE BUTTON */}
          <button
            onClick={() => setView(view === 'list' ? 'add' : 'list')}
            className={`
              flex items-center px-6 py-3 rounded-lg shadow-md transition-all font-bold text-white
              ${view === 'add' ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"}
            `}
          >
            {view === 'add' ? (
              <> <ArrowLeft size={20} className="mr-2" /> Back to List </>
            ) : (
              <> <Plus size={20} className="mr-2" /> Add New Property </>
            )}
          </button>
        </div>

        {/* --- CONDITIONAL RENDERING --- */}

        {view === 'add' ? (
          /* VIEW 1: ADD PROPERTY FORM */
          <div className="animate-fadeIn">
            <AddPropertyForm
              onSuccess={() => {
                setView('list');    // Go back to list
                fetchProperties();  // Refresh data from DB
              }}
              onCancel={() => setView('list')}
            />
          </div>
        ) : (
          /* VIEW 2: PROPERTY LIST */
          <div className="space-y-6">

            {/* Search Bar */}
            <div className="relative bg-white p-4 rounded-lg shadow-sm">
              <Search className="absolute left-7 top-7 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search properties by title or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-blue-600" size={40} />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Property</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProperties.length > 0 ? (
                      filteredProperties.map((property) => (
                        <tr key={property._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded object-cover" src={property.image} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                <div className="text-xs text-gray-500">{property.configurations?.length || 0} Configs</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 flex items-center">
                              <MapPin size={14} className="mr-1 text-gray-400" />
                              {property.city}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              ₹{property.price.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {property.propertyType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                            <div className="flex justify-center space-x-3">
                              <Link
                                to={`/dashboard/edit/${property._id}`}
                                className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded hover:bg-blue-100 transition"
                              >
                                <Edit size={18} />
                              </Link>
                              <button
                                onClick={() => handleDelete(property._id)}
                                className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded hover:bg-red-100 transition"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                          No properties found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;