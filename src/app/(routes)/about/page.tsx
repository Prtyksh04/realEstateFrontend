'use client';

import { motion, Variants } from 'framer-motion';
import { Users, Award, TrendingUp, Heart, Shield, Target, Star, MapPin, Phone, Mail } from 'lucide-react';

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

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const teamMembers = [
  {
    name: "Sarah Johnson",
    position: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&q=80",
    bio: "15+ years in luxury real estate with a passion for finding perfect homes for families.",
    contact: { phone: "+1 (555) 123-4567", email: "sarah@dreamhomes.com" }
  },
  {
    name: "Michael Chen",
    position: "Head of Sales",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Expert in high-end property sales with a track record of $500M+ in transactions.",
    contact: { phone: "+1 (555) 234-5678", email: "michael@dreamhomes.com" }
  },
  {
    name: "Emily Rodriguez",
    position: "Lead Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Interior design specialist helping clients visualize their dream home potential.",
    contact: { phone: "+1 (555) 345-6789", email: "emily@dreamhomes.com" }
  },
  {
    name: "David Thompson",
    position: "Market Analyst",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Data-driven insights specialist providing accurate market valuations and trends.",
    contact: { phone: "+1 (555) 456-7890", email: "david@dreamhomes.com" }
  }
];

const companyValues = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Client-Centered",
    description: "Your dreams and needs are at the heart of everything we do. We listen, understand, and deliver."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Trust & Integrity",
    description: "Built on honesty and transparency, we maintain the highest ethical standards in every transaction."
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Excellence",
    description: "We strive for perfection in service delivery, ensuring exceptional results for every client."
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Innovation",
    description: "Leveraging cutting-edge technology and modern approaches to revolutionize real estate."
  }
];

const stats = [
  { number: "15+", label: "Years Experience" },
  { number: "2000+", label: "Happy Clients" },
  { number: "$2B+", label: "Properties Sold" },
  { number: "50+", label: "Awards Won" }
];

export default function AboutUs() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-80 h-80 bg-purple-200/15 rounded-full blur-3xl"
            animate={{ y: [0, 40, 0], rotate: [360, 180, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            About
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DreamHomes
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            For over 15 years, we've been more than just a real estate company. We're dream makers, 
            home finders, and trusted advisors dedicated to turning your property aspirations into reality.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={scaleIn} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <button 
              className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-all duration-300 text-lg"
              suppressHydrationWarning={true}
            >
              Meet Our Team
            </button>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2009 by Sarah Johnson, DreamHomes began with a simple mission: 
                  to revolutionize the real estate experience by putting clients first and 
                  leveraging technology to make property transactions seamless.
                </p>
                <p>
                  What started as a small boutique agency has grown into one of the most 
                  trusted names in luxury real estate, serving clients across premium 
                  locations nationwide. Our success is built on relationships, integrity, 
                  and an unwavering commitment to excellence.
                </p>
                <p>
                  Today, we continue to innovate and set new standards in the industry, 
                  combining traditional values with modern technology to deliver 
                  exceptional results for every client.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80"
                alt="Modern office space"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Award className="w-16 h-16 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide us in every interaction and transaction
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to exceeding your expectations
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{member.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Mail className="w-4 h-4" />
                      <span>{member.contact.email}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              To redefine the real estate experience by combining unparalleled expertise, 
              cutting-edge technology, and genuine care to help every client find not just 
              a house, but their perfect home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-all duration-300"
                suppressHydrationWarning={true}
              >
                Start Your Journey
              </button>
              <button 
                className="px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300"
                suppressHydrationWarning={true}
              >
                Contact Us Today
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
