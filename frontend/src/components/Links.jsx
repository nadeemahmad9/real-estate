
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const Links = () => {
    // Data Definitions
    const realEstateLinks = [
        { name: "Real Estate in Noida", url: "/properties" },
        { name: "Real Estate in Pune", url: "/properties" },
        { name: "Real Estate in Gurugram", url: "/properties" },
        { name: "Real Estate in Mumbai", url: "/properties" },
        { name: "Real Estate in Bangalore", url: "/properties" },
        { name: "Real Estate in Hyderabad", url: "/properties" },
        { name: "Real Estate in Chennai", url: "/properties" },
        { name: "Real Estate in Kolkata", url: "/properties" },
    ];

    const propertyLinks = [
        { name: "Property in Noida", url: "/properties" },
        { name: "Property in Pune", url: "/properties" },
        { name: "Property in Gurugram", url: "/properties" },
        { name: "Property in Mumbai", url: "/properties" },
        { name: "Property in Bangalore", url: "/properties" },
        { name: "Property in Delhi", url: "/properties" },
        { name: "Property in Goa", url: "/properties" },
    ];

    const developerLinks = [
        { name: "Godrej Properties", url: "/properties" },
        { name: "DLF Developer", url: "/properties" },
        { name: "Prestige Group", url: "/properties" },
        { name: "Sobha Developers", url: "/properties" },
        { name: "Tata Housing", url: "/properties" },
        { name: "Mahindra Lifespaces", url: "/properties" },
        { name: "M3M India", url: "/properties" },
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
    const initialCount = 5;

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