
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Richa Khurana",
      role: "Homeowner",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      testimonial:
        "InvestoXpert made finding my dream home incredibly simple. Their transparency and expert guidance throughout the buying process were truly commendable.",
      rating: 5,
    },
    {
      name: "Amit Kumar Singh",
      role: "Investor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      testimonial: "The team's market knowledge is impressive. They helped me identify high-growth investment opportunities that have already appreciated significantly.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "First-time Buyer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      testimonial: "I was nervous about buying my first flat, but their patient support made it easy. They handled all the paperwork seamlessly. Highly recommended!",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-red-600 tracking-widest uppercase mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full relative group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-gray-100 group-hover:text-red-50 transition-colors duration-300">
                <Quote size={48} fill="currentColor" />
              </div>

              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full p-0.5 bg-linear-to-r from-red-500 to-red-600">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover border-2 border-white"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 leading-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex text-yellow-400 mb-4 text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < testimonial.rating ? "fill-current" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 text-sm leading-relaxed italic grow">
                "{testimonial.testimonial}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;