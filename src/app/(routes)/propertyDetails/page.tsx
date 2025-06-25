'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Heart, Share2, MapPin, Bed, Bath, Square, Car, 
  Phone, Mail, Calendar, Camera, Play, Star, 
  Wifi, AirVent, Shield, Zap, Trees, Car as CarIcon,
  ArrowLeft, ArrowRight, ChevronDown, ChevronUp,
  MessageCircle, Calculator, Download, Eye
} from 'lucide-react';

// Mock property data
const propertyData = {
  id: 1,
  title: "Luxury Modern Villa",
  price: "$2,850,000",
  location: "Beverly Hills, CA 90210",
  type: "Villa",
  status: "For Sale",
  featured: true,
  bedrooms: 5,
  bathrooms: 4,
  area: 4500,
  garage: 3,
  yearBuilt: 2023,
  lotSize: "0.8 acres",
  description: "Discover the epitome of luxury living in this stunning modern villa, perfectly situated in the heart of Beverly Hills. This architectural masterpiece seamlessly blends contemporary design with timeless elegance, offering an unparalleled lifestyle experience.",
  fullDescription: `This exceptional property represents the pinnacle of luxury real estate, featuring cutting-edge design and premium finishes throughout. The open-concept living spaces are flooded with natural light through floor-to-ceiling windows, creating a seamless indoor-outdoor living experience.

  The gourmet kitchen boasts top-of-the-line European appliances, custom cabinetry, and a magnificent island perfect for entertaining. The master suite is a private sanctuary with panoramic city views, a spa-like ensuite, and a private terrace.

  Additional features include a state-of-the-art home theater, wine cellar, fitness center, and infinity pool with stunning city views. The property is equipped with smart home technology, ensuring convenience and security at your fingertips.`,
  images: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607688960-e095ff83135a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  ],
  amenities: [
    { icon: <Wifi className="w-5 h-5" />, name: "High-Speed Internet" },
    { icon: <AirVent className="w-5 h-5" />, name: "Central Air Conditioning" },
    { icon: <Shield className="w-5 h-5" />, name: "24/7 Security" },
    { icon: <Zap className="w-5 h-5" />, name: "Smart Home System" },
    { icon: <Trees className="w-5 h-5" />, name: "Landscaped Garden" },
    { icon: <CarIcon className="w-5 h-5" />, name: "Private Garage" }
  ],
  agent: {
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@dreamhomes.com",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 4.9,
    reviews: 127,
    experience: "8 years"
  },
  virtualTour: "https://example.com/virtual-tour",
  floorPlan: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  nearbyPlaces: [
    { name: "Beverly Hills Hotel", distance: "0.5 miles", type: "Hotel" },
    { name: "Rodeo Drive", distance: "0.8 miles", type: "Shopping" },
    { name: "Beverly Hills High School", distance: "1.2 miles", type: "School" },
    { name: "Cedars-Sinai Medical Center", distance: "2.1 miles", type: "Hospital" }
  ]
};

export default function PropertyDetails() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // GSAP refs
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Register GSAP plugins on client side only
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero section animation
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelector('.hero-content'),
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        gsap.fromTo(heroRef.current.querySelectorAll('.hero-badge'),
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "back.out(1.7)" }
        );
      }

      // Gallery animation
      if (galleryRef.current) {
        gsap.fromTo(galleryRef.current.querySelectorAll('.gallery-image'),
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 80%"
            }
          }
        );
      }

      // Details animation
      if (detailsRef.current) {
        gsap.fromTo(detailsRef.current.querySelectorAll('.detail-card'),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: detailsRef.current,
              start: "top 80%"
            }
          }
        );
      }

      // Amenities animation
      if (amenitiesRef.current) {
        gsap.fromTo(amenitiesRef.current.querySelectorAll('.amenity-item'),
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: amenitiesRef.current,
              start: "top 80%"
            }
          }
        );
      }

      // Agent card animation
      if (agentRef.current) {
        gsap.fromTo(agentRef.current,
          { opacity: 0, scale: 0.9, rotationY: 15 },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: agentRef.current,
              start: "top 80%"
            }
          }
        );
      }

    });

    return () => ctx.revert();
  }, [isClient]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyData.images.length) % propertyData.images.length);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: propertyData.title,
          text: `Check out this amazing property: ${propertyData.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Image Gallery */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={propertyData.images[currentImageIndex]}
            alt={propertyData.title}
            className="w-full h-full object-cover transition-opacity duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23f3f4f6'/%3E%3Ctext x='600' y='400' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%236b7280'%3EProperty Image%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

                 {/* Navigation Arrows */}
         <button
           onClick={prevImage}
           className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10"
           suppressHydrationWarning={true}
         >
           <ArrowLeft className="w-6 h-6" />
         </button>
         <button
           onClick={nextImage}
           className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10"
           suppressHydrationWarning={true}
         >
           <ArrowRight className="w-6 h-6" />
         </button>

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {propertyData.images.map((_, index) => (
                         <button
               key={index}
               onClick={() => setCurrentImageIndex(index)}
               className={`w-3 h-3 rounded-full transition-all duration-300 ${
                 index === currentImageIndex ? 'bg-white' : 'bg-white/50'
               }`}
               suppressHydrationWarning={true}
             />
          ))}
        </div>

        {/* Hero Content */}
        <div className="hero-content absolute inset-0 flex flex-col justify-end p-6 lg:p-12 z-10">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="hero-badge bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {propertyData.status}
              </span>
              {propertyData.featured && (
                <span className="hero-badge bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
              <span className="hero-badge bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {propertyData.type}
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              {propertyData.title}
            </h1>
            
            <div className="flex items-center gap-2 text-white/90 mb-6">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{propertyData.location}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="text-3xl lg:text-5xl font-bold text-white">
                {propertyData.price}
              </div>

              <div className="flex gap-3">
                                 <button
                   onClick={() => setIsFavorite(!isFavorite)}
                   className={`p-4 rounded-full transition-all duration-300 ${
                     isFavorite 
                       ? 'bg-red-500 text-white' 
                       : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                   }`}
                   suppressHydrationWarning={true}
                 >
                   <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                 </button>
                 <button
                   onClick={handleShare}
                   className="p-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full transition-all duration-300"
                   suppressHydrationWarning={true}
                 >
                   <Share2 className="w-6 h-6" />
                 </button>
                 <button 
                   className="px-6 py-4 bg-black text-white hover:bg-gray-900 rounded-full font-medium transition-all duration-300"
                   suppressHydrationWarning={true}
                 >
                   Schedule Tour
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={detailsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="detail-card text-center bg-white p-6 rounded-2xl shadow-lg">
              <Bed className="w-8 h-8 mx-auto mb-3 text-gray-600" />
              <div className="text-2xl font-bold text-gray-900">{propertyData.bedrooms}</div>
              <div className="text-gray-600">Bedrooms</div>
            </div>
            <div className="detail-card text-center bg-white p-6 rounded-2xl shadow-lg">
              <Bath className="w-8 h-8 mx-auto mb-3 text-gray-600" />
              <div className="text-2xl font-bold text-gray-900">{propertyData.bathrooms}</div>
              <div className="text-gray-600">Bathrooms</div>
            </div>
            <div className="detail-card text-center bg-white p-6 rounded-2xl shadow-lg">
              <Square className="w-8 h-8 mx-auto mb-3 text-gray-600" />
              <div className="text-2xl font-bold text-gray-900">{propertyData.area.toLocaleString()}</div>
              <div className="text-gray-600">Sq Ft</div>
            </div>
            <div className="detail-card text-center bg-white p-6 rounded-2xl shadow-lg">
              <Car className="w-8 h-8 mx-auto mb-3 text-gray-600" />
              <div className="text-2xl font-bold text-gray-900">{propertyData.garage}</div>
              <div className="text-gray-600">Garage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'details', label: 'Details' },
                    { id: 'amenities', label: 'Amenities' },
                    { id: 'location', label: 'Location' }
                  ].map((tab) => (
                     <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id)}
                       className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-300 ${
                         activeTab === tab.id
                           ? 'border-black text-black'
                           : 'border-transparent text-gray-500 hover:text-gray-700'
                       }`}
                       suppressHydrationWarning={true}
                     >
                       {tab.label}
                     </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Property Description</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {propertyData.description}
                    </p>
                    
                    {showFullDescription && (
                      <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {propertyData.fullDescription}
                      </div>
                    )}
                    
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="flex items-center gap-2 text-black font-medium hover:text-gray-700 transition-colors duration-300 mt-4"
                      suppressHydrationWarning={true}
                    >
                      {showFullDescription ? 'Show Less' : 'Read More'}
                      {showFullDescription ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Property Features Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Year Built</div>
                      <div className="text-lg font-semibold text-gray-900">{propertyData.yearBuilt}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Lot Size</div>
                      <div className="text-lg font-semibold text-gray-900">{propertyData.lotSize}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Property Type</div>
                      <div className="text-lg font-semibold text-gray-900">{propertyData.type}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900">Property Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900">Interior Features</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Hardwood floors throughout</li>
                        <li>• Gourmet kitchen with premium appliances</li>
                        <li>• Master suite with walk-in closet</li>
                        <li>• Home office/study room</li>
                        <li>• Fireplace in living room</li>
                        <li>• Smart home automation</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900">Exterior Features</h3>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Private swimming pool</li>
                        <li>• Landscaped gardens</li>
                        <li>• Outdoor entertainment area</li>
                        <li>• 3-car garage</li>
                        <li>• Security system</li>
                        <li>• Mountain views</li>
                      </ul>
                    </div>
                  </div>

                  {/* Floor Plan */}
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Floor Plan</h3>
                    <div className="relative">
                      <img
                        src={propertyData.floorPlan}
                        alt="Floor Plan"
                        className="w-full h-64 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23f3f4f6'/%3E%3Ctext x='400' y='200' text-anchor='middle' font-family='Arial, sans-serif' font-size='18' fill='%236b7280'%3EFloor Plan%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-lg transition-colors duration-300" suppressHydrationWarning={true}>
                        <Download className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'amenities' && (
                <div ref={amenitiesRef} className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900">Amenities & Features</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {propertyData.amenities.map((amenity, index) => (
                      <div key={index} className="amenity-item flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="text-gray-600">{amenity.icon}</div>
                        <span className="text-gray-900 font-medium">{amenity.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Virtual Tour */}
                  <div className="bg-black rounded-2xl overflow-hidden">
                    <div className="relative h-64 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                      <button className="flex items-center gap-3 text-white hover:text-gray-300 transition-colors duration-300" suppressHydrationWarning={true}>
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                          <Play className="w-8 h-8 fill-current" />
                        </div>
                        <div>
                          <div className="text-xl font-semibold">Virtual Tour</div>
                          <div className="text-gray-300">Take a 360° tour of the property</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900">Location & Nearby</h2>
                  
                  {/* Map Placeholder */}
                  <div className="h-64 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <div className="text-gray-600">Interactive Map</div>
                      <div className="text-sm text-gray-500">{propertyData.location}</div>
                    </div>
                  </div>

                  {/* Nearby Places */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Nearby Places</h3>
                    <div className="space-y-4">
                      {propertyData.nearbyPlaces.map((place, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{place.name}</div>
                            <div className="text-sm text-gray-600">{place.type}</div>
                          </div>
                          <div className="text-sm font-medium text-gray-700">{place.distance}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Agent & Actions */}
            <div className="space-y-8">
              {/* Agent Card */}
              <div ref={agentRef} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <img
                    src={propertyData.agent.image}
                    alt={propertyData.agent.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23e5e7eb'/%3E%3Ctext x='40' y='45' text-anchor='middle' font-family='Arial, sans-serif' font-size='12' fill='%236b7280'%3EAgent%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{propertyData.agent.name}</h3>
                  <p className="text-gray-600">{propertyData.agent.title}</p>
                  
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(propertyData.agent.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {propertyData.agent.rating} ({propertyData.agent.reviews} reviews)
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-1">{propertyData.agent.experience} experience</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-300" suppressHydrationWarning={true}>
                    <Phone className="w-4 h-4" />
                    Call Agent
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300" suppressHydrationWarning={true}>
                    <Mail className="w-4 h-4" />
                    Email Agent
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300" suppressHydrationWarning={true}>
                    <MessageCircle className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>

              {/* Mortgage Calculator */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Mortgage Calculator
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount</label>
                    <input
                      type="text"
                      value="$2,280,000"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      readOnly
                      suppressHydrationWarning={true}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                    <input
                      type="number"
                      defaultValue="6.5"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      suppressHydrationWarning={true}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (years)</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent" suppressHydrationWarning={true}>
                      <option value="30">30 years</option>
                      <option value="25">25 years</option>
                      <option value="20">20 years</option>
                      <option value="15">15 years</option>
                    </select>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monthly Payment:</span>
                      <span className="text-xl font-bold text-black">$14,234</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300" suppressHydrationWarning={true}>
                    <Calendar className="w-4 h-4" />
                    Schedule Viewing
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300" suppressHydrationWarning={true}>
                    <Camera className="w-4 h-4" />
                    Request Photos
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300" suppressHydrationWarning={true}>
                    <Eye className="w-4 h-4" />
                    Virtual Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section ref={galleryRef} className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Property Gallery</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyData.images.map((image, index) => (
              <div key={index} className="gallery-image relative group cursor-pointer overflow-hidden rounded-2xl">
                <img
                  src={image}
                  alt={`Property view ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='200' y='150' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3EProperty Image ${index + 1}%3C/text%3E%3C/svg%3E`;
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
