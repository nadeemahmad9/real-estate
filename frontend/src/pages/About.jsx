import React from "react";
import { motion } from "framer-motion";
// 1. Consolidated imports and included Clock here
import {
    CheckCircle, Users, Trophy, Building2, ArrowRight, Clock
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Links from "../components/Links";

const About = () => {
    const stats = [
        { label: "Years of Experience", value: "12+", icon: Clock },
        { label: "Happy Families", value: "15K+", icon: Users },
        { label: "Projects Delivered", value: "500+", icon: Building2 },
        { label: "Awards Won", value: "25+", icon: Trophy },
    ];

    // REMOVED: The custom 'Clock' const was causing the crash. 
    // We now use the one imported from 'lucide-react'.

    return (
        <>
            <Navbar />
            <div className="bg-white min-h-screen pt-22 font-sans">

                {/* --- HERO SECTION --- */}
                <section className="relative py-24 bg-gray-900 overflow-hidden">
                    <div className="absolute inset-0 bg-red-600/10 z-0"></div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-4xl md:text-6xl font-bold text-white mb-6"
                        >
                            Redefining <span className="text-red-600">Real Estate</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto"
                        >
                            We are InvestoXpert. Your trusted partner in finding not just a house, but a place you can call home.
                        </motion.p>
                    </div>
                </section>

                {/* --- OUR STORY SECTION --- */}
                <section className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row items-center gap-12">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="lg:w-1/2"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80"
                                    alt="Our Team"
                                    className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="lg:w-1/2"
                            >
                                <p className="text-red-600 font-bold tracking-widest uppercase mb-2">Who We Are</p>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Building Trust, <br /> Delivering Excellence.
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    InvestoXpert is one of India's fastest-growing real estate consultancy firms. We bridge the gap between property buyers and developers by offering transparent, data-driven, and customer-centric solutions.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    Whether you are looking for a luxury apartment, a commercial space, or an affordable home, our team of experts ensures a seamless experience from site visits to possession.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {["100% Transparency", "Verified Listings", "Loan Assistance", "Post-Sales Support"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle className="text-red-600 w-5 h-5" />
                                            <span className="font-semibold text-gray-800">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- STATS SECTION --- */}
                <section className="bg-gray-900 py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {stats.map((stat, index) => (
                                <div key={index} className="p-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                                        <stat.icon size={24} />
                                    </div>
                                    <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                                    <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- MISSION & VISION --- */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">We don't just sell properties; we build lasting relationships based on trust and integrity.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Integrity", desc: "We adhere to the highest ethical standards in all our dealings." },
                                { title: "Customer First", desc: "Your satisfaction is our top priority. We listen, understand, and deliver." },
                                { title: "Innovation", desc: "Using technology to make property buying simple, fast, and secure." }
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-red-600"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{card.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- CTA SECTION --- */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="bg-red-600 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to find your dream home?</h2>
                                <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">Connect with our experts today and get exclusive deals on top properties.</p>
                                <button className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                                    Contact Us Now <ArrowRight size={20} />
                                </button>
                            </div>
                            {/* Abstract circles bg */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
                        </div>
                    </div>
                </section>

            </div>
            <Links />
            <Footer />
        </>
    );
};

export default About;