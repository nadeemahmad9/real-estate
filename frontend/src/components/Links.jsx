
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const Links = () => {
    // Data Definitions
    const realEstateLinks = [
        { name: "Real Estate in Noida", url: "/real-estate-in-noida" },
        { name: "Real Estate in Pune", url: "/real-estate-in-pune" },
        { name: "Real Estate in Gurugram", url: "/real-estate-in-gurugram" },
        { name: "Real Estate in Mumbai", url: "/real-estate-in-mumbai" },
        { name: "Real Estate in Bangalore", url: "/real-estate-in-bangalore" },
        { name: "Real Estate in Hyderabad", url: "/real-estate-in-hyderabad" },
        { name: "Real Estate in Chennai", url: "/real-estate-in-chennai" },
        { name: "Real Estate in Kolkata", url: "/real-estate-in-kolkata" },
    ];

    const propertyLinks = [
        { name: "Property in Noida", url: "/property-in-noida" },
        { name: "Property in Pune", url: "/property-in-pune" },
        { name: "Property in Gurugram", url: "/property-in-gurugram" },
        { name: "Property in Mumbai", url: "/property-in-mumbai" },
        { name: "Property in Bangalore", url: "/property-in-bangalore" },
        { name: "Property in Delhi", url: "/property-in-delhi" },
        { name: "Property in Goa", url: "/property-in-goa" },
    ];

    const developerLinks = [
        { name: "Godrej Properties", url: "/godrej-properties" },
        { name: "DLF Developer", url: "/dlf-developer" },
        { name: "Prestige Group", url: "/prestige-group" },
        { name: "Sobha Developers", url: "/sobha-developers-ltd" },
        { name: "Tata Housing", url: "/tata-housing-group" },
        { name: "Mahindra Lifespaces", url: "/mahindra-developers" },
        { name: "M3M India", url: "/m3m-india" },
    ];

    return (
        <section className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800 font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Heading */}
                <h3 className="text-xl font-bold text-white mb-12 pl-4 border-l-4 border-red-600">
                    Most Popular Links
                </h3>

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 items-start">
                    <LinkSection title="Real Estate In India" links={realEstateLinks} />
                    <LinkSection title="Property In India" links={propertyLinks} />
                    <LinkSection title="Top Developers" links={developerLinks} />
                </div>

            </div>
        </section>
    );
};

// --- SUB COMPONENT (Handles the Toggle Logic) ---
const LinkSection = ({ title, links }) => {
    const [showAll, setShowAll] = useState(false);
    const initialCount = 5; // How many links to show initially

    const displayedLinks = showAll ? links : links.slice(0, initialCount);

    return (
        <div className="flex flex-col h-full">
            {/* Section Title */}
            <h5 className="text-base font-bold text-white relative inline-block mb-6">
                {title}
                <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-red-600 rounded-full"></span>
            </h5>

            {/* Links List */}
            <div className="flex flex-col space-y-4 grow">
                {displayedLinks.map((link, idx) => (
                    <Link
                        key={idx}
                        to={link.url}
                        className="text-sm text-gray-400 hover:text-red-500 transition-all hover:translate-x-1 duration-200 inline-block w-fit"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Toggle Button */}
            {links.length > initialCount && (
                <div className="mt-6 pt-2">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-xs font-bold text-red-600 hover:text-red-400 flex items-center focus:outline-none uppercase tracking-wide transition-colors"
                    >
                        {showAll ? (
                            <>Show Less <ChevronUp size={14} className="ml-1" /></>
                        ) : (
                            <>View All <ChevronDown size={14} className="ml-1" /></>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Links;