

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Plus, Trash2, Save, X } from "lucide-react";
import AmenitiesSelector from "../components/AmenitiesSelector";

const AddPropertyForm = ({ onSuccess, onCancel }) => {
    const { token } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    const [priceInput, setPriceInput] = useState("");
    const [priceUnit, setPriceUnit] = useState("Lakh");

    const [formData, setFormData] = useState({
        title: "", city: "", location: "",
        image: "", propertyType: "Residential", transactionType: "For Sale",
        mapUrl: "", amenities: [],
        about: { description: "", highlights: "" },
        developer: { name: "", logo: "", description: "", projects: 0, years: 0, ongoing: 0 },
        configurations: [{ type: "2 BHK", area: "", price: "", image: "" }],
        featured: false,
        status: "Mid Stage",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDeveloperChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, developer: { ...prev.developer, [name]: value } }));
    };

    const handleAboutChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, about: { ...prev.about, [name]: value } }));
    };

    const handleConfigChange = (index, e) => {
        const { name, value } = e.target;
        const newConfigs = [...formData.configurations];
        newConfigs[index][name] = value;
        setFormData(prev => ({ ...prev, configurations: newConfigs }));
    };

    const addConfig = () => setFormData(prev => ({ ...prev, configurations: [...prev.configurations, { type: "", area: "", price: "", image: "" }] }));

    const removeConfig = (index) => {
        const newConfigs = formData.configurations.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, configurations: newConfigs }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let numericPrice = parseFloat(priceInput);
            if (isNaN(numericPrice)) {
                alert("Please enter a valid price number");
                setLoading(false);
                return;
            }

            if (priceUnit === "Lakh") numericPrice *= 100000;
            else if (priceUnit === "Cr") numericPrice *= 10000000;
            else if (priceUnit === "Thousand") numericPrice *= 1000;

            const payload = {
                ...formData,
                price: numericPrice,
                currency: "₹",
                about: {
                    description: formData.about.description,
                    highlights: formData.about.highlights ? formData.about.highlights.split(',').map(h => h.trim()) : []
                },
                developer: {
                    ...formData.developer,
                    stats: {
                        projects: Number(formData.developer.projects),
                        years: Number(formData.developer.years),
                        ongoing: Number(formData.developer.ongoing)
                    }
                }
            };

            await axios.post(`${API_URL}/properties`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Property Added Successfully!");
            if (onSuccess) onSuccess();

        } catch (err) {
            console.error(err);
            alert("Error adding property");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800">Add New Property</h2>
                <button onClick={onCancel} className="text-gray-500 hover:text-red-500">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="title" placeholder="Property Title" onChange={handleChange} className="border p-2 rounded" required />
                    <input name="city" placeholder="City" onChange={handleChange} className="border p-2 rounded" required />
                    <input name="location" placeholder="Locality" onChange={handleChange} className="border p-2 rounded" required />

                    <div className="flex gap-2">
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Price (e.g. 1.5)"
                            value={priceInput}
                            onChange={(e) => setPriceInput(e.target.value)}
                            className="border p-2 rounded w-2/3 focus:outline-none focus:border-blue-500"
                            required
                        />
                        <select
                            value={priceUnit}
                            onChange={(e) => setPriceUnit(e.target.value)}
                            className="border p-2 rounded w-1/3 bg-gray-50 cursor-pointer focus:outline-none focus:border-blue-500"
                        >
                            <option value="Lakh">Lakh</option>
                            <option value="Cr">Crore</option>
                            <option value="Thousand">Thousand</option>
                            <option value="Unit">Flat (No Unit)</option>
                        </select>
                    </div>

                    <input name="image" placeholder="Main Image URL" onChange={handleChange} className="border p-2 rounded md:col-span-2" required />
                </div>

                <div className="bg-gray-50 p-4 rounded border">
                    <div className="flex justify-between mb-2">
                        <h3 className="font-bold">Configurations</h3>
                        <button type="button" onClick={addConfig} className="text-blue-600 flex items-center text-sm"><Plus size={16} /> Add</button>
                    </div>
                    {formData.configurations.map((config, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
                            <input name="type" placeholder="Type (2 BHK)" value={config.type} onChange={(e) => handleConfigChange(index, e)} className="border p-1 rounded" />
                            <input name="area" placeholder="Area" value={config.area} onChange={(e) => handleConfigChange(index, e)} className="border p-1 rounded" />
                            <input name="price" placeholder="Price Text (e.g. 1.2 Cr)" value={config.price} onChange={(e) => handleConfigChange(index, e)} className="border p-1 rounded" />
                            <input name="image" placeholder="Plan URL" value={config.image} onChange={(e) => handleConfigChange(index, e)} className="border p-1 rounded" />
                            {index > 0 && <button type="button" onClick={() => removeConfig(index)} className="text-red-500"><Trash2 size={16} /></button>}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded border">
                    <h3 className="md:col-span-2 font-bold">Developer</h3>
                    <input name="name" placeholder="Name" onChange={handleDeveloperChange} className="border p-2 rounded" />
                    <input name="logo" placeholder="Logo URL" onChange={handleDeveloperChange} className="border p-2 rounded" />
                    <textarea name="description" placeholder="Description" onChange={handleDeveloperChange} className="border p-2 rounded md:col-span-2" rows="2" />
                    <div className="flex gap-2 md:col-span-2">
                        <input type="number" name="projects" placeholder="Projects" onChange={handleDeveloperChange} className="border p-2 rounded w-full" />
                        <input type="number" name="years" placeholder="Years" onChange={handleDeveloperChange} className="border p-2 rounded w-full" />
                        <input type="number" name="ongoing" placeholder="Ongoing" onChange={handleDeveloperChange} className="border p-2 rounded w-full" />
                    </div>
                </div>


                <AmenitiesSelector selectedAmenities={formData.amenities} onChange={(newAm) => setFormData(prev => ({ ...prev, amenities: newAm }))} />

                <textarea name="description" placeholder="Full Property Description" onChange={handleAboutChange} className="w-full border p-2 rounded" rows="4" />
                <input name="highlights" placeholder="Highlights (comma separated)" onChange={handleAboutChange} className="w-full border p-2 rounded" />
                <input name="mapUrl" placeholder="Google Map Embed URL" onChange={handleChange} className="w-full border p-2 rounded" />

                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 flex justify-center items-center gap-2">
                    <Save size={20} /> {loading ? "Saving..." : "Save Property"}
                </button>
                <div className="flex items-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="w-5 h-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="text-gray-700 font-bold">
                        Mark as Featured / Trending
                    </label>
                </div>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="Mid Stage">Mid Stage</option>
                    <option value="Near Possession">Near Possession</option>
                    <option value="Ready">Ready to Move</option>
                    <option value="New Launch">New Launch</option>
                </select>
            </form>
        </div>
    );
};

export default AddPropertyForm;