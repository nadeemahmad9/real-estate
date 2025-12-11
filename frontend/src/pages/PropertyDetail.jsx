
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star, MapPin, Share2, BarChart2, Phone, ChevronDown, ChevronUp, CheckCircle
} from "lucide-react";
import { useProperty } from "../context/PropertyContext";
import Footer from "../components/Footer";

const AccordionItem = ({ title, id, isOpen, onClick, children }) => (
  <div id={id} className="border-b border-gray-200 py-4">
    <button className="flex justify-between items-center w-full text-left focus:outline-none" onClick={onClick}>
      <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">{title}</h3>
      {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
    </button>
    {isOpen && <div className="mt-4 text-gray-600 text-sm leading-relaxed animate-fadeIn">{children}</div>}
  </div>
);

const PropertyDetail = () => {
  const { id } = useParams();
  const { getPropertyById } = useProperty();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openSections, setOpenSections] = useState({
    about: true,
    configuration: true,
    amenities: true,
    locality: true,
    developer: false,
    compare: false
  });

  const [activeConfigTab, setActiveConfigTab] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      const data = await getPropertyById(id);
      if (data) {
        setProperty(data);
        if (data.configurations && data.configurations.length > 0) {
          setActiveConfigTab(data.configurations[0].type);
        }
      }
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  const toggleSection = (section) => setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));

  if (loading) return <div className="flex h-screen justify-center items-center">Loading...</div>;
  if (!property) return <div className="flex h-screen justify-center items-center">Property not found</div>;

  const activeConfig = property.configurations?.find(c => c.type === activeConfigTab);

  return (
    <main className="bg-white font-sans text-gray-800 mt-20">

      {/* Sticky Header for Quick Navigation */}
      <div className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex space-x-8 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            {['about', 'configuration', 'amenities', 'locality', 'developer'].map(item => (
              <li key={item}>
                <a href={`#${item}`} className="hover:text-red-600 transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumbs */}
        <div className="flex items-center text-xs text-gray-500 mb-6 flex-wrap gap-1">
          <Link to="/properties" className="hover:text-red-500">Properties</Link>
          <ChevronDown className="w-3 h-3 -rotate-90" />
          <span className="text-gray-700 font-medium">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN (Main Content) */}
          <div className="lg:col-span-2 space-y-8">

            {/* Title & Header */}
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{property.title}</h1>
                <div className="flex space-x-3 text-gray-400">
                  <BarChart2 className="w-6 h-6 hover:text-red-500 cursor-pointer transition-colors" />
                  <Share2 className="w-6 h-6 hover:text-red-500 cursor-pointer transition-colors" />
                </div>
              </div>
              <div className="flex items-center mt-3 space-x-4">
                <div className="flex items-center bg-green-50 px-2 py-1 rounded border border-green-100">
                  <span className="text-sm font-bold text-green-700 mr-1">{property.rating || 5.0}</span>
                  <Star className="w-3 h-3 text-green-700 fill-current" />
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1 text-red-500" />
                  {property.location}, {property.city}
                </div>
              </div>
            </div>

            {/* Price & CTA Box */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="mb-4 sm:mb-0">
                <p className="text-gray-500 text-xs uppercase font-bold">Starting Price</p>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
                  <span className="text-xl mr-1 font-medium">{property.currency}</span>
                  {property.price?.toLocaleString()}
                </h3>
              </div>
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-red-700 flex items-center font-bold tracking-wide transition-transform hover:-translate-y-0.5">
                <Phone className="w-4 h-4 mr-2" /> INSTANT CALL BACK
              </button>
            </div>

            {/* Image Gallery */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img src={property.image} alt={property.title} className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700" />
            </div>

            {/* ---------------- ACCORDION SECTIONS ---------------- */}

            {/* 1. ABOUT PROPERTY (Fixed) */}
            <AccordionItem title="About" id="about" isOpen={openSections.about} onClick={() => toggleSection("about")}>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {property.about?.description || property.description || "No description available."}
              </div>

              {/* Highlights */}
              {property.about?.highlights?.length > 0 && (
                <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-bold text-blue-800 uppercase mb-3">Project Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                    {property.about.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start text-sm text-blue-900">
                        <CheckCircle className="w-4 h-4 mr-2 text-blue-500 mt-0.5 shrink-0" />
                        {hl}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AccordionItem>

            {/* 2. CONFIGURATIONS */}
            <AccordionItem title="Configuration" id="configuration" isOpen={openSections.configuration} onClick={() => toggleSection("configuration")}>
              {property.configurations?.length > 0 ? (
                <>
                  <div className="flex border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
                    {property.configurations.map((config) => (
                      <button
                        key={config.type}
                        onClick={() => setActiveConfigTab(config.type)}
                        className={`px-6 py-3 text-sm font-bold transition-colors border-b-2 whitespace-nowrap ${activeConfigTab === config.type
                          ? "border-red-600 text-red-600"
                          : "border-transparent text-gray-500 hover:text-gray-800"
                          }`}
                      >
                        {config.type}
                      </button>
                    ))}
                  </div>

                  {activeConfig && (
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 flex flex-col items-center text-center">
                      {activeConfig.image ? (
                        <img src={activeConfig.image} alt={activeConfig.type} className="h-48 object-contain mb-4 hover:scale-110 transition-transform" />
                      ) : (
                        <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400 mb-4 rounded">No Plan Image</div>
                      )}
                      <h4 className="text-lg font-bold text-gray-900">{activeConfig.type} • {activeConfig.area}</h4>
                      <p className="text-red-600 font-extrabold text-xl mt-2">{activeConfig.price}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 italic">No configurations available.</p>
              )}
            </AccordionItem>

            {/* 4. LOCATION */}
            <AccordionItem title="Location" id="locality" isOpen={openSections.locality} onClick={() => toggleSection("locality")}>
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <iframe
                  src={`https://maps.google.com/maps?q=${property.title}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex="0"
                  className="rounded-lg"
                ></iframe>
              </div>
            </AccordionItem>

            {/* 5. DEVELOPER (Fixed) */}
            <AccordionItem title="Developer" id="developer" isOpen={openSections.developer} onClick={() => toggleSection("developer")}>
              {property.developer?.name ? (
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-1/4 border p-4 rounded-lg bg-white flex items-center justify-center">
                    <img src={property.developer.logo || "/placeholder-logo.png"} alt={property.developer.name} className="max-w-full max-h-24 object-contain" />
                  </div>
                  <div className="w-full md:w-3/4">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{property.developer.name}</h4>

                    <div className="flex gap-8 mb-4 border-b pb-4">
                      <div><span className="block text-2xl font-bold text-red-600">{property.developer.stats?.projects || 0}</span><span className="text-xs text-gray-500 font-bold uppercase">Projects</span></div>
                      <div><span className="block text-2xl font-bold text-red-600">{property.developer.stats?.years || 0}</span><span className="text-xs text-gray-500 font-bold uppercase">Years</span></div>
                      <div><span className="block text-2xl font-bold text-red-600">{property.developer.stats?.ongoing || 0}</span><span className="text-xs text-gray-500 font-bold uppercase">Ongoing</span></div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {property.developer.description || "No developer description available."}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">No developer information linked.</p>
              )}
            </AccordionItem>

          </div>

          {/* RIGHT COLUMN (Lead Form) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-1 text-center">Interested?</h4>
              <p className="text-gray-500 text-center text-sm mb-6">Fill the form to get a callback</p>

              <form className="space-y-4">
                <input type="text" placeholder="Name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white transition-colors" />
                <div className="flex gap-2">
                  <select className="w-1/3 bg-gray-50 border border-gray-200 rounded-lg px-2 text-sm text-gray-600 focus:outline-none focus:border-red-500">
                    <option>+91</option>
                    <option>+1</option>
                  </select>
                  <input type="number" placeholder="Phone" className="w-2/3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white transition-colors" />
                </div>
                <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white transition-colors" />
                <textarea rows="3" placeholder="Message (optional)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:bg-white transition-colors"></textarea>

                <button type="button" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-md transition-transform transform active:scale-95 flex items-center justify-center gap-2">
                  <Share2 size={18} /> Send Request
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PropertyDetail;