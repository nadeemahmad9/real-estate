import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => {
    const contactInfo = [
        {
            icon: MapPin,
            title: "Our Office",
            details: "3rd Floor, Riana Aurelia, Plot 93-94, Sector 136, Noida, UP 201305",
        },
        {
            icon: Phone,
            title: "Phone Number",
            details: "+91 98800 83870",
            action: "tel:+919880083870",
        },
        {
            icon: Mail,
            title: "Email Address",
            details: "info@investoxpert.com",
            action: "mailto:info@investoxpert.com",
        },
        {
            icon: Clock,
            title: "Working Hours",
            details: "Mon - Sat: 9:30 AM - 6:30 PM",
        },
    ];

    return (
        <>
            <div className="bg-gray-50 min-h-screen pt-22">

                {/* Header Section */}
                <div className="bg-gray-900 text-white py-20 text-center">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto px-4"
                    >
                        Have a question about a property? Want to list with us?
                        Our team of experts is ready to help you with all your real estate needs.
                    </motion.p>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Left Column: Contact Form */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                        <input type="text" placeholder="John" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                        <input type="text" placeholder="Doe" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-colors" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                        <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                                        <input type="number" placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-colors" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                    <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-colors cursor-pointer">
                                        <option>General Inquiry</option>
                                        <option>Buy Property</option>
                                        <option>Sell Property</option>
                                        <option>Career</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                    <textarea rows="4" placeholder="How can we help you?" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-colors"></textarea>
                                </div>

                                <button type="button" className="w-full bg-red-600 text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1">
                                    <Send size={20} /> Send Message
                                </button>
                            </form>
                        </motion.div>

                        {/* Right Column: Info & Map */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* Info Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {contactInfo.map((item, index) => (
                                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                                            <item.icon className="text-red-600" size={24} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                        {item.action ? (
                                            <a href={item.action} className="text-gray-600 hover:text-red-600 transition-colors text-sm">
                                                {item.details}
                                            </a>
                                        ) : (
                                            <p className="text-gray-600 text-sm leading-relaxed">{item.details}</p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-gray-200 rounded-2xl h-80 overflow-hidden shadow-inner relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.1617260589!2d77.3999948753239!3d28.534857475718225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce62955555555%3A0x1234567890!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Office Location"
                                    className="grayscale hover:grayscale-0 transition-all duration-500"
                                ></iframe>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;