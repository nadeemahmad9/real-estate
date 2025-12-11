import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight } from "lucide-react";


const blogData = [
    {
        id: 1,
        title: "Top 10 Emerging Real Estate Hotspots in India (2024)",
        date: "March 15, 2024",
        author: "Amit Verma",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
        excerpt: "Discover the cities and neighborhoods that are poised for massive appreciation in the coming year.",
        category: "Market Trends"
    },
    {
        id: 2,
        title: "A Beginner's Guide to Home Loans & Interest Rates",
        date: "March 12, 2024",
        author: "Priya Das",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
        excerpt: "Navigating the world of finance? Here is everything you need to know about securing the best home loan rates.",
        category: "Finance"
    },
    {
        id: 3,
        title: "Smart Homes: The Future of Luxury Living",
        date: "March 10, 2024",
        author: "Rahul Sharma",
        image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&q=80",
        excerpt: "From voice-controlled lighting to automated security, see how technology is reshaping modern homes.",
        category: "Lifestyle"
    },
    {
        id: 4,
        title: "Commercial vs Residential: Where to Invest?",
        date: "March 08, 2024",
        author: "Vikram Singh",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        excerpt: "Analyzing the pros and cons of both sectors to help you make an informed investment decision.",
        category: "Investment"
    },
    {
        id: 5,
        title: "Vastu Shastra Tips for a Prosperous Home",
        date: "March 05, 2024",
        author: "Anjali Gupta",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        excerpt: "Simple Vastu tips to bring positive energy, health, and wealth into your new living space.",
        category: "Tips & Guides"
    },
    {
        id: 6,
        title: "Understanding Property Taxes in Noida",
        date: "March 01, 2024",
        author: "Investo Team",
        image: "https://www.acegroupindia.com/blog/wp-content/uploads/2022/12/Image-1.jpg",
        excerpt: "A comprehensive breakdown of property tax calculations and payment methods in Noida.",
        category: "Legal"
    }
];

const Blog = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsVisible, setItemsVisible] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsVisible(1);
            else if (window.innerWidth < 1024) setItemsVisible(2);
            else setItemsVisible(3);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalItems = blogData.length;
    const maxIndex = totalItems - itemsVisible;

    const nextSlide = () => {
        if (currentIndex >= maxIndex) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex === 0) {
            setCurrentIndex(maxIndex);
        } else {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    return (
        <>
            <div className="bg-gray-50 min-h-screen font-sans mt-20">

                <section className="bg-gray-900 text-white py-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-red-600/10 z-0"></div>
                    <div className="relative z-10 container mx-auto px-4">
                        <p className="text-red-500 text-xs font-bold tracking-[0.2em] uppercase mb-3">Knowledge Hub</p>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">News & Insights</h1>
                        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                            Stay ahead with the latest market trends, investment tips, and expert advice.
                        </p>
                    </div>
                </section>

                <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex justify-between items-end mb-8 px-2">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
                            <div className="w-12 h-1 bg-red-600 mt-1.5 rounded-full"></div>
                        </div>

                        <div className="flex gap-2">
                            <button onClick={prevSlide} className="p-2 rounded-full border border-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300">
                                <ChevronLeft size={18} />
                            </button>
                            <button onClick={nextSlide} className="p-2 rounded-full border border-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden relative -mx-4 px-4 py-4">
                        <motion.div
                            className="flex gap-0"
                            animate={{ x: `-${currentIndex * (100 / itemsVisible)}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {blogData.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="px-3 flex-shrink-0"
                                    style={{ flex: `0 0 ${100 / itemsVisible}%` }}
                                >
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden h-full flex flex-col group cursor-pointer transition-all duration-300"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide text-red-600 shadow-sm">
                                                {blog.category}
                                            </span>
                                        </div>

                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex items-center text-[11px] text-gray-400 mb-3 space-x-3 font-medium uppercase tracking-wide">
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={12} className="text-red-500" />
                                                    {blog.date}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <User size={12} className="text-red-500" />
                                                    {blog.author}
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
                                                {blog.title}
                                            </h3>

                                            <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3 flex-grow">
                                                {blog.excerpt}
                                            </p>

                                            <div className="flex items-center text-red-600 font-bold text-xs uppercase tracking-wide mt-auto group/link">
                                                Read More
                                                <ArrowRight size={14} className="ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

            </div>

        </>
    );
};

export default Blog;