import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Plus, Trash2, Save, ArrowLeft, Loader } from "lucide-react";
import AmenitiesSelector from "../components/AmenitiesSelector";

// Helper components for consistent styling
const Input = (props) => <input {...props} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500 transition-colors" />;
const Label = ({ children }) => <label className="block text-sm font-bold text-gray-700 mb-1">{children}</label>;
const TextArea = (props) => <textarea {...props} className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500 transition-colors" />;

const PropertyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  // --- 1. INITIAL STATE ---
  const [formData, setFormData] = useState({
    title: "", city: "", location: "",
    price: "", area: "", bedrooms: "", bathrooms: "",
    propertyType: "Residential",
    transactionType: "For Sale",
    status: "Mid Stage", // Default status
    featured: false,     // Featured flag
    mapUrl: "",
    image: "",

    amenities: [],

    about: {
      description: "",
      highlights: ""
    },

    developer: {
      name: "", logo: "", description: "",
      stats: { projects: 0, years: 0, ongoing: 0 }
    },

    configurations: [],
    compare: []
  });

  // --- 2. FETCH DATA ---
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${API_URL}/properties/${id}`);
        const data = response.data;

        setFormData({
          ...data,
          // Handle nested objects safely
          about: {
            description: data.about?.description || "",
            highlights: data.about?.highlights ? data.about.highlights.join(", ") : ""
          },
          developer: {
            name: data.developer?.name || "",
            logo: data.developer?.logo || "",
            description: data.developer?.description || "",
            stats: {
              projects: data.developer?.stats?.projects || 0,
              years: data.developer?.stats?.years || 0,
              ongoing: data.developer?.stats?.ongoing || 0
            }
          },
          // Ensure these exist to prevent crashes
          status: data.status || "Mid Stage",
          amenities: data.amenities || [],
          configurations: data.configurations || [],
          compare: data.compare || []
        });
      } catch (error) {
        console.error("Error fetching property:", error);
        alert("Failed to load property data");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // --- 3. HANDLERS ---

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDeveloperChange = (e) => {
    const { name, value } = e.target;
    if (["projects", "years", "ongoing"].includes(name)) {
      setFormData(prev => ({
        ...prev,
        developer: {
          ...prev.developer,
          stats: { ...prev.developer.stats, [name]: value }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        developer: { ...prev.developer, [name]: value }
      }));
    }
  };

  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      about: { ...prev.about, [name]: value }
    }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const newArray = [...formData[arrayName]];
    newArray[index][field] = value;
    setFormData(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const addItem = (arrayName, item) => {
    setFormData(prev => ({ ...prev, [arrayName]: [...prev[arrayName], item] }));
  };

  const removeItem = (arrayName, index) => {
    const newArray = [...formData[arrayName]];
    newArray.splice(index, 1);
    setFormData(prev => ({ ...prev, [arrayName]: newArray }));
  };

  // --- 4. SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        about: {
          description: formData.about.description,
          // Convert string back to array
          highlights: typeof formData.about.highlights === 'string'
            ? formData.about.highlights.split(',').map(h => h.trim())
            : formData.about.highlights
        }
      };

      await axios.put(`${API_URL}/properties/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Property Updated Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Failed to update property");
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader className="animate-spin text-blue-600" /></div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6 mt-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 p-6 flex items-center justify-between text-white shadow-md">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/dashboard")} className="hover:bg-blue-700 p-2 rounded-full transition">
              <ArrowLeft />
            </button>
            <h2 className="text-2xl font-bold">Edit Property</h2>
          </div>
          <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm transition">
            <Save size={20} /> Save Changes
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">

          {/* --- SECTION 1: KEY DETAILS --- */}
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xl font-bold text-gray-800">Key Details</h3>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <label htmlFor="featured" className="font-semibold text-gray-700 cursor-pointer">Mark as Featured</label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><Label>Title</Label><Input name="title" value={formData.title} onChange={handleChange} required /></div>
              <div><Label>City</Label><Input name="city" value={formData.city} onChange={handleChange} required /></div>
              <div><Label>Location / Locality</Label><Input name="location" value={formData.location} onChange={handleChange} required /></div>
              <div><Label>Main Image URL</Label><Input name="image" value={formData.image} onChange={handleChange} required /></div>

              <div><Label>Price (Numeric)</Label><Input type="number" name="price" value={formData.price} onChange={handleChange} /></div>
              <div><Label>Total Area (Sq.Ft)</Label><Input type="number" name="area" value={formData.area} onChange={handleChange} /></div>

              <div className="flex gap-4">
                <div className="w-1/2"><Label>Bedrooms</Label><Input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} /></div>
                <div className="w-1/2"><Label>Bathrooms</Label><Input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} /></div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/3">
                  <Label>Type</Label>
                  <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full border p-2.5 rounded bg-white">
                    <option>Residential</option><option>Commercial</option><option>Villa</option><option>Plot</option>
                  </select>
                </div>
                <div className="w-1/3">
                  <Label>Transaction</Label>
                  <select name="transactionType" value={formData.transactionType} onChange={handleChange} className="w-full border p-2.5 rounded bg-white">
                    <option>For Sale</option><option>For Rent</option>
                  </select>
                </div>

                {/* --- ADDED STATUS DROPDOWN HERE --- */}
                <div className="w-1/3">
                  <Label>Status</Label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border p-2.5 rounded bg-white focus:border-blue-500 outline-none"
                  >
                    <option value="Mid Stage">Mid Stage</option>
                    <option value="Near Possession">Near Possession</option>
                    <option value="Ready">Ready to Move</option>
                    <option value="New Launch">New Launch</option>
                  </select>
                </div>
                {/* ---------------------------------- */}

              </div>
            </div>
          </section>

          {/* --- SECTION 2: ABOUT & HIGHLIGHTS --- */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Description & Highlights</h3>
            <div>
              <Label>About Description</Label>
              <TextArea name="description" value={formData.about.description} onChange={handleAboutChange} rows="5" />
            </div>
            <div>
              <Label>Highlights (Comma separated)</Label>
              <Input name="highlights" value={formData.about.highlights} onChange={handleAboutChange} placeholder="e.g. 1000 Trees, Near Metro, Clubhouse" />
            </div>
            <div>
              <Label>Google Map URL</Label>
              <Input name="mapUrl" value={formData.mapUrl} onChange={handleChange} placeholder="Embed URL" />
            </div>
          </section>

          {/* --- SECTION 3: AMENITIES --- */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Amenities</h3>
            <AmenitiesSelector
              selectedAmenities={formData.amenities}
              onChange={(newAmenities) => setFormData(prev => ({ ...prev, amenities: newAmenities }))}
            />
          </section>

          {/* --- SECTION 4: DEVELOPER INFO --- */}
          <section className="space-y-6 bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 border-b border-blue-200 pb-2">Developer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><Label>Developer Name</Label><Input name="name" value={formData.developer.name} onChange={handleDeveloperChange} /></div>
              <div><Label>Logo URL</Label><Input name="logo" value={formData.developer.logo} onChange={handleDeveloperChange} /></div>
              <div className="md:col-span-2"><Label>Description</Label><TextArea name="description" value={formData.developer.description} onChange={handleDeveloperChange} rows="2" /></div>

              <div className="flex gap-4 md:col-span-2">
                <div className="w-1/3"><Label>Total Projects</Label><Input type="number" name="projects" value={formData.developer.stats.projects} onChange={handleDeveloperChange} /></div>
                <div className="w-1/3"><Label>Years Exp</Label><Input type="number" name="years" value={formData.developer.stats.years} onChange={handleDeveloperChange} /></div>
                <div className="w-1/3"><Label>Ongoing</Label><Input type="number" name="ongoing" value={formData.developer.stats.ongoing} onChange={handleDeveloperChange} /></div>
              </div>
            </div>
          </section>

          {/* --- SECTION 5: CONFIGURATIONS --- */}
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xl font-bold text-gray-800">Configurations</h3>
              <button type="button" onClick={() => addItem('configurations', { type: "", area: "", price: "", image: "" })} className="text-blue-600 font-bold flex items-center"><Plus size={18} /> Add Config</button>
            </div>
            {formData.configurations.map((config, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end bg-gray-50 p-4 rounded border">
                <div><Label>Type (2 BHK)</Label><Input value={config.type} onChange={(e) => handleArrayChange('configurations', idx, "type", e.target.value)} /></div>
                <div><Label>Area (Sq.Ft)</Label><Input value={config.area} onChange={(e) => handleArrayChange('configurations', idx, "area", e.target.value)} /></div>
                <div><Label>Price Text</Label><Input value={config.price} onChange={(e) => handleArrayChange('configurations', idx, "price", e.target.value)} /></div>
                <div><Label>Plan Image URL</Label><Input value={config.image} onChange={(e) => handleArrayChange('configurations', idx, "image", e.target.value)} /></div>
                <button type="button" onClick={() => removeItem('configurations', idx)} className="text-red-500 bg-red-50 p-2.5 rounded hover:bg-red-100"><Trash2 size={20} /></button>
              </div>
            ))}
          </section>

          {/* --- SECTION 6: COMPARE PROJECTS --- */}
          <section className="space-y-6 pb-8">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-xl font-bold text-gray-800">Compare Projects</h3>
              <button type="button" onClick={() => addItem('compare', { projectName: "", priceRange: "", location: "", status: "" })} className="text-blue-600 font-bold flex items-center"><Plus size={18} /> Add Compare</button>
            </div>
            {formData.compare.map((comp, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end bg-gray-50 p-4 rounded border">
                <div><Label>Project Name</Label><Input value={comp.projectName} onChange={(e) => handleArrayChange('compare', idx, "projectName", e.target.value)} /></div>
                <div><Label>Price Range</Label><Input value={comp.priceRange} onChange={(e) => handleArrayChange('compare', idx, "priceRange", e.target.value)} /></div>
                <div><Label>Location</Label><Input value={comp.location} onChange={(e) => handleArrayChange('compare', idx, "location", e.target.value)} /></div>
                <div><Label>Status</Label><Input value={comp.status} onChange={(e) => handleArrayChange('compare', idx, "status", e.target.value)} /></div>
                <button type="button" onClick={() => removeItem('compare', idx)} className="text-red-500 bg-red-50 p-2.5 rounded hover:bg-red-100"><Trash2 size={20} /></button>
              </div>
            ))}
          </section>

        </form>
      </div>
    </div>
  );
};

export default PropertyEdit;