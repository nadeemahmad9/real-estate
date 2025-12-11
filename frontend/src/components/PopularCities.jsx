

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PopularCities = () => {
  const navigate = useNavigate();
  const cities = ["Noida", "Gurugram", "Delhi", "Mumbai", "Bangalore", "Pune"];

  const cityImages = {
    Noida: "https://www.constructionweekonline.in/cloud/2023/03/15/noida.jpg",
    Gurugram: "https://www.herohomes.in/images/projects/gurugram/render/central-green-views.jpg",
    Delhi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaGl8ZW58MHx8MHx8fDA%3D",
    Mumbai: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=800&fit=crop",
    Bangalore: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&h=800&fit=crop",
    Pune: "https://media2.thrillophilia.com/images/photos/000/181/349/original/1574514106_1520591304_Shinde-Chhatri.jpg.jpg?w=753&h=450&dpr=1.5",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-red-600 tracking-widest uppercase mb-2">Explore</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Popular Cities
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {cities.map((city) => (
            <motion.div
              key={city}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onClick={() => navigate("/properties", { state: { filters: { city } } })}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg h-64 md:h-80 lg:h-96"
            >
              {/* Image */}
              <img
                src={cityImages[city] || "/placeholder.svg"}
                alt={city}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"></div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-center transform transition-transform duration-300 group-hover:-translate-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                  {city}
                </h3>
                <p className="text-red-400 text-xs font-medium uppercase tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  View Properties →
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCities;