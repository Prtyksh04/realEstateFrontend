'use client';

import { motion, Variants } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send, User, MessageCircle, Home, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    description: "Available 24/7 for your convenience"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    details: ["info@dreamhomes.com", "support@dreamhomes.com"],
    description: "We'll respond within 2 hours"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Address",
    details: ["123 Luxury Avenue", "Beverly Hills, CA 90210"],
    description: "Visit our flagship office"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Hours",
    details: ["Mon - Fri: 9:00 AM - 7:00 PM", "Sat - Sun: 10:00 AM - 5:00 PM"],
    description: "Extended hours available"
  }
];

const offices = [
  {
    city: "Beverly Hills",
    address: "123 Luxury Avenue, Beverly Hills, CA 90210",
    phone: "+1 (555) 123-4567",
    email: "beverlyhills@dreamhomes.com",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    city: "Manhattan",
    address: "456 Park Avenue, New York, NY 10022",
    phone: "+1 (555) 234-5678",
    email: "manhattan@dreamhomes.com",
    image: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    city: "Miami",
    address: "789 Ocean Drive, Miami, FL 33139",
    phone: "+1 (555) 345-6789",
    email: "miami@dreamhomes.com",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    propertyType: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // GSAP refs
  const heroRef = useRef<HTMLDivElement>(null);
  const contactCardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const officesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Hero section animation
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelector('h1'), 
          { opacity: 0, y: 100, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
        );
        
        gsap.fromTo(heroRef.current.querySelector('p'), 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
        );

        // Floating background elements
        gsap.to(heroRef.current.querySelectorAll('.floating-bg'), {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          rotation: "random(-5, 5)",
          duration: "random(3, 6)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.5
        });
      }

      // Contact cards animation
      if (contactCardsRef.current) {
        gsap.fromTo(contactCardsRef.current.querySelectorAll('.contact-card'),
          { opacity: 0, y: 80, rotationX: 45 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: contactCardsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Card hover animations
        contactCardsRef.current.querySelectorAll('.contact-card').forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.05, y: -10, duration: 0.3, ease: "power2.out" });
            gsap.to(card.querySelector('.contact-icon'), { 
              rotation: 360, 
              scale: 1.2, 
              duration: 0.5, 
              ease: "elastic.out(1, 0.5)" 
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
            gsap.to(card.querySelector('.contact-icon'), { 
              rotation: 0, 
              scale: 1, 
              duration: 0.3, 
              ease: "power2.out" 
            });
          });
        });
      }

      // Form animation
      if (formRef.current) {
        gsap.fromTo(formRef.current.querySelectorAll('.form-field'),
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%"
            }
          }
        );

        // Form submit button pulse
        const submitBtn = formRef.current.querySelector('.submit-btn');
        if (submitBtn) {
          gsap.to(submitBtn, {
            scale: 1.02,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          });
        }
      }

      // Map animation
      if (mapRef.current) {
        gsap.fromTo(mapRef.current,
          { opacity: 0, x: 50, rotationY: 45 },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 80%"
            }
          }
        );

        // Map pin bounce
        const mapPin = mapRef.current.querySelector('.map-pin');
        if (mapPin) {
          gsap.to(mapPin, {
            y: -10,
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
          });
        }
      }

      // Offices animation
      if (officesRef.current) {
        gsap.fromTo(officesRef.current.querySelectorAll('.office-card'),
          { opacity: 0, y: 100, rotationX: 30 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: officesRef.current,
              start: "top 80%"
            }
          }
        );

        // Office card hover effects
        officesRef.current.querySelectorAll('.office-card').forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
              scale: 1.03, 
              y: -15, 
              rotationY: 5,
              duration: 0.4, 
              ease: "power2.out" 
            });
            gsap.to(card.querySelector('img'), { 
              scale: 1.1, 
              duration: 0.6, 
              ease: "power2.out" 
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
              scale: 1, 
              y: 0, 
              rotationY: 0,
              duration: 0.4, 
              ease: "power2.out" 
            });
            gsap.to(card.querySelector('img'), { 
              scale: 1, 
              duration: 0.6, 
              ease: "power2.out" 
            });
          });
        });
      }

    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        propertyType: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-bg absolute top-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="floating-bg absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ready to find your dream home? We're here to help you every step of the way. 
            Contact our expert team today.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={contactCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="contact-card bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="contact-icon inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-full mb-6">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{info.title}</h3>
                <div className="space-y-2 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 font-medium text-sm">{detail}</p>
                  ))}
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        {/* Contact Form */}
            <div ref={formRef} className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Have a question about a property or need personalized assistance? 
                  Fill out the form below and we'll get back to you promptly.
                </p>
              </div>

              <div>
                {isSubmitted && (
                  <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">
                      Message sent successfully! We'll be in touch soon.
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-300"
                          placeholder="John Doe"
                          suppressHydrationWarning={true}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-300"
                          placeholder="john@example.com"
                          suppressHydrationWarning={true}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-300"
                        placeholder="+1 (555) 123-4567"
                        suppressHydrationWarning={true}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                      Property Interest
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-300 appearance-none"
                        suppressHydrationWarning={true}
                      >
                        <option value="">Select property type</option>
                        <option value="villa">Villa</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="estate">Estate</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="apartment">Apartment</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                                  <div className="form-field">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-300"
                      placeholder="How can we help you?"
                      suppressHydrationWarning={true}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-300 resize-none"
                        placeholder="Tell us about your dream home or any questions you have..."
                        suppressHydrationWarning={true}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="submit-btn w-full bg-black text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    suppressHydrationWarning={true}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Location Info */}
            <div ref={mapRef} className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Visit Our Office
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Come see us in person at our flagship Beverly Hills location. 
                  Our team is ready to help you find your perfect home.
                </p>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-80 bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Office location map"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f3f4f6'/%3E%3Ctext x='400' y='300' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%236b7280'%3EMap Loading...%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg text-center">
                    <MapPin className="map-pin w-8 h-8 text-black mx-auto mb-2" />
                    <p className="text-black font-medium">Beverly Hills Office</p>
                    <p className="text-gray-700 text-sm">123 Luxury Avenue</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">info@dreamhomes.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Mon-Fri 9AM-7PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Locations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find us in the most prestigious locations across the country
            </p>
          </div>

          <div ref={officesRef} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {offices.map((office, index) => (
              <div
                key={index}
                className="office-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={office.image}
                    alt={`${office.city} office`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e5e7eb'/%3E%3Ctext x='200' y='150' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3E${office.city} Office%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  {office.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                        Main Office
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{office.city}</h3>
                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                      <span className="leading-relaxed">{office.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{office.email}</span>
                    </div>
                  </div>
                  <button 
                    className="w-full py-3 bg-gray-100 hover:bg-black hover:text-white rounded-lg font-medium transition-all duration-300"
                    suppressHydrationWarning={true}
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
