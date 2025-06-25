'use client';

import { motion, Variants } from 'framer-motion';
import { Search, MapPin, Home as HomeIcon, Award, Users, TrendingUp } from 'lucide-react';
import { Testimonials } from './components/testimonials';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } }
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"
            animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
            animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Find Your
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dream Home
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Discover luxury properties, exclusive locations, and exceptional living experiences. 
            Your perfect home awaits.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              variants={fadeInUp}
              className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-all duration-300 flex items-center gap-2 text-lg"
            >
              <Search className="w-5 h-5" />
              Explore Properties
            </motion.button>
            <motion.button
              variants={fadeInUp}
              className="px-8 py-4 border-2 border-gray-300 text-gray-800 rounded-full font-medium hover:border-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 text-lg"
            >
              Schedule Tour
            </motion.button>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
          >
            <motion.div variants={scaleIn} className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-gray-800">500+</div>
              <div className="text-gray-600">Premium Properties</div>
            </motion.div>
            <motion.div variants={scaleIn} className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-gray-800">50+</div>
              <div className="text-gray-600">Luxury Locations</div>
            </motion.div>
            <motion.div variants={scaleIn} className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold text-gray-800">1000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked luxury homes in the most desirable locations
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
                title: "Modern Villa",
                location: "Beverly Hills, CA",
                price: "$4.2M",
                beds: 5,
                baths: 4
              },
              {
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
                title: "Luxury Penthouse",
                location: "Manhattan, NY",
                price: "$8.5M",
                beds: 4,
                baths: 3
              },
              {
                image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
                title: "Oceanfront Estate",
                location: "Malibu, CA",
                price: "$12.8M",
                beds: 6,
                baths: 5
              }
            ].map((property, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                    For Sale
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-black">{property.price}</span>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>{property.beds} beds</span>
                      <span>{property.baths} baths</span>
                    </div>
                  </div>
                  <button 
                    className="w-full py-3 bg-gray-100 hover:bg-black hover:text-white rounded-full font-medium transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience luxury real estate with our premium services
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <HomeIcon className="w-8 h-8" />,
                title: "Premium Properties",
                description: "Curated selection of luxury homes in prime locations"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Expert Guidance",
                description: "Professional real estate experts with years of experience"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Market Insights",
                description: "Real-time market data and investment opportunities"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who found their perfect property with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-all duration-300"
              >
                Start Your Search
              </button>
              <button 
                className="px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300"
              >
                Contact Agent
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}