'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Heart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Properties', href: '/properties' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Template', href: '/propertyDetails' },
  { name: 'Luxury', href: '#' },
  { name: 'Rentals', href: '#' },
  { name: 'Services', href: '#' },
];

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 }
  })
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/50 border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-black">DreamHomes</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-black transition-colors duration-300 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Search className="w-5 h-5 text-gray-700 hover:text-black transition-colors duration-300 cursor-pointer" />
              <Heart className="w-5 h-5 text-gray-700 hover:text-black transition-colors duration-300 cursor-pointer" />
            </div>
            <button className="md:hidden p-2">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <motion.nav
        className="sticky top-0 z-50 backdrop-blur-md bg-white/50 border-b border-gray-200/50"
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-black">DreamHomes</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={itemVariants}
                >
                  <Link 
                    href={item.href}
                    className="text-gray-700 hover:text-black transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <Search className="w-5 h-5 text-gray-700 hover:text-black transition-colors duration-300 cursor-pointer" />
              <Heart className="w-5 h-5 text-gray-700 hover:text-black transition-colors duration-300 cursor-pointer" />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-black transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <Search className="w-5 h-5 text-gray-700" />
                <Heart className="w-5 h-5 text-gray-700" />
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
