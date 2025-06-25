'use client';

import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter, MapPin, Bed, Bath, Square, Heart, X, ChevronDown, SlidersHorizontal } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const properties = [
  {
    id: 1,
    title: "Modern Villa Paradise",
    location: "Beverly Hills, CA",
    price: "$4,200,000",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    beds: 5,
    baths: 4,
    sqft: 4500,
    type: "Villa",
    status: "For Sale",
    featured: true
  },
  {
    id: 2,
    title: "Luxury Penthouse Suite",
    location: "Manhattan, NY",
    price: "$8,500,000",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: "Penthouse",
    status: "For Sale",
    featured: true
  },
  {
    id: 3,
    title: "Oceanfront Estate",
    location: "Malibu, CA",
    price: "$12,800,000",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    beds: 6,
    baths: 5,
    sqft: 6800,
    type: "Estate",
    status: "For Sale",
    featured: false
  },
  {
    id: 4,
    title: "Contemporary Townhouse",
    location: "San Francisco, CA",
    price: "$2,900,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    beds: 3,
    baths: 2,
    sqft: 2400,
    type: "Townhouse",
    status: "For Rent",
    featured: false
  },
  {
    id: 5,
    title: "Mountain View Cabin",
    location: "Aspen, CO",
    price: "$5,600,000",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    beds: 4,
    baths: 3,
    sqft: 3800,
    type: "Cabin",
    status: "For Sale",
    featured: true
  },
  {
    id: 6,
    title: "Urban Loft Apartment",
    location: "Brooklyn, NY",
    price: "$1,800,000",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    beds: 2,
    baths: 2,
    sqft: 1600,
    type: "Apartment",
    status: "For Sale",
    featured: false
  },
  {
    id: 7,
    title: "Luxury Beach House",
    location: "Miami, FL",
    price: "$7,200,000",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    beds: 5,
    baths: 4,
    sqft: 4200,
    type: "House",
    status: "For Sale",
    featured: true
  },
  {
    id: 8,
    title: "Historic Manor",
    location: "Charleston, SC",
    price: "$3,400,000",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    beds: 6,
    baths: 4,
    sqft: 5200,
    type: "Manor",
    status: "For Sale",
    featured: false
  }
];

const filterOptions = {
  priceRanges: [
    { label: "Under $1M", min: 0, max: 1000000 },
    { label: "$1M - $3M", min: 1000000, max: 3000000 },
    { label: "$3M - $5M", min: 3000000, max: 5000000 },
    { label: "$5M - $10M", min: 5000000, max: 10000000 },
    { label: "Above $10M", min: 10000000, max: Infinity }
  ],
  propertyTypes: ["Villa", "Penthouse", "Estate", "Townhouse", "Cabin", "Apartment", "House", "Manor"],
  bedrooms: [1, 2, 3, 4, 5, 6],
  bathrooms: [1, 2, 3, 4, 5],
  statuses: ["For Sale", "For Rent"]
};

export default function Properties() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceRange: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    status: ""
  });
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (propertyId: number) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType as keyof typeof prev] === value ? "" : value
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: "",
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
      status: ""
    });
    setSearchTerm("");
  };

  const filteredProperties = properties.filter(property => {
    // Search term filter
    if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !property.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Property type filter
    if (filters.propertyType && property.type !== filters.propertyType) {
      return false;
    }

    // Bedrooms filter
    if (filters.bedrooms && property.beds.toString() !== filters.bedrooms) {
      return false;
    }

    // Bathrooms filter
    if (filters.bathrooms && property.baths.toString() !== filters.bathrooms) {
      return false;
    }

    // Status filter
    if (filters.status && property.status !== filters.status) {
      return false;
    }

    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
            animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-6xl font-bold mb-6"
          >
            Luxury Properties
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Discover exceptional homes in the world's most desirable locations
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors duration-300"
                suppressHydrationWarning={true}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-6 right-6 z-50">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-900 transition-colors duration-300"
              suppressHydrationWarning={true}
            >
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar */}
          <motion.aside
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className={`
              fixed lg:sticky top-0 left-0 z-40 w-80 h-screen lg:h-auto bg-white rounded-2xl shadow-xl p-6 overflow-y-auto
              transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            {/* Mobile Close Button */}
            <div className="lg:hidden flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Filters</h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                suppressHydrationWarning={true}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  suppressHydrationWarning={true}
                >
                  Clear All
                </button>
              </div>

              {/* Property Type */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Property Type</h4>
                <div className="space-y-2">
                  {filterOptions.propertyTypes.map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.propertyType === type}
                        onChange={() => handleFilterChange('propertyType', type)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        suppressHydrationWarning={true}
                      />
                      <span className="ml-3 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {filterOptions.priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === range.label}
                        onChange={() => handleFilterChange('priceRange', range.label)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        suppressHydrationWarning={true}
                      />
                      <span className="ml-3 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Bedrooms</h4>
                <div className="grid grid-cols-3 gap-2">
                  {filterOptions.bedrooms.map((beds) => (
                    <button
                      key={beds}
                      onClick={() => handleFilterChange('bedrooms', beds.toString())}
                      className={`
                        p-2 text-sm rounded-lg border transition-colors duration-300
                        ${filters.bedrooms === beds.toString()
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }
                      `}
                      suppressHydrationWarning={true}
                    >
                      {beds}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Bathrooms</h4>
                <div className="grid grid-cols-3 gap-2">
                  {filterOptions.bathrooms.map((baths) => (
                    <button
                      key={baths}
                      onClick={() => handleFilterChange('bathrooms', baths.toString())}
                      className={`
                        p-2 text-sm rounded-lg border transition-colors duration-300
                        ${filters.bathrooms === baths.toString()
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }
                      `}
                      suppressHydrationWarning={true}
                    >
                      {baths}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Status</h4>
                <div className="space-y-2">
                  {filterOptions.statuses.map((status) => (
                    <label key={status} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={filters.status === status}
                        onChange={() => handleFilterChange('status', status)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        suppressHydrationWarning={true}
                      />
                      <span className="ml-3 text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredProperties.length} Properties Found
                </h2>
                <p className="text-gray-600 mt-1">
                  {searchTerm && `Results for "${searchTerm}"`}
                </p>
              </div>
              
              <div className="hidden lg:flex items-center gap-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2"
                  suppressHydrationWarning={true}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Properties Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  variants={scaleIn}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        ${property.status === 'For Sale' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-500 text-white'
                        }
                      `}>
                        {property.status}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {property.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Heart Icon */}
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300"
                      suppressHydrationWarning={true}
                    >
                      <Heart 
                        className={`w-5 h-5 transition-colors duration-300 ${
                          favorites.includes(property.id) 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </button>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                    <p className="text-gray-600 mb-3 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-black">{property.price}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {property.type}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{property.beds} beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.baths} baths</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="w-4 h-4" />
                        <span>{property.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>

                    <button 
                      className="w-full py-3 bg-gray-100 hover:bg-black hover:text-white rounded-full font-medium transition-all duration-300"
                      suppressHydrationWarning={true}
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* No Results */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors duration-300"
                  suppressHydrationWarning={true}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
