
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 font-sans ${scrolled
        ? "bg-gray-900/95 backdrop-blur-md shadow-lg py-2"
        : "bg-gray-900 py-4"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* --- LOGO --- */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-32 sm:w-40 transition-transform group-hover:scale-105">
              <img
                src="https://www.investoxpert.com/_next/image?url=%2FIX-white-logo.png&w=384&q=75"
                alt="InvestoXpert"
                className="w-full h-14 object-contain"
                // Fallback if image fails, show text
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden text-2xl font-bold text-white">
                Investo<span className="text-red-600">Xpert</span>
              </span>
            </div>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-300 hover:text-red-500 relative group ${location.pathname === link.path ? "text-red-500" : "text-gray-300"
                  }`}
              >
                {link.name}
                {/* Underline Animation */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* --- RIGHT SIDE ACTIONS --- */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+919880083870"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <Phone size={18} className="text-red-600" />
              <span>+91 98800 83870</span>
            </a>
            <Link to="/contact">
              <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-red-900/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
                Post Property
              </button>
            </Link>
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800 border-t border-gray-700 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg font-medium transition-colors ${location.pathname === link.path ? "text-red-500" : "text-gray-300"
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="w-full h-px bg-gray-700 my-2"></div>

              <a href="tel:+919880083870" className="flex items-center gap-2 text-gray-300">
                <Phone size={18} className="text-red-500" /> +91 98800 83870
              </a>

              <Link to="/contact" className="w-full">
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold shadow-md">
                  Post Property
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;