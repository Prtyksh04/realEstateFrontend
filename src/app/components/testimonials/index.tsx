'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Tech Executive",
    location: "Beverly Hills, CA",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    content: "DreamHomes made finding our perfect family home effortless. Their attention to detail and understanding of luxury living is unmatched. We couldn't be happier with our new Beverly Hills estate.",
    propertyType: "Family Estate"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Investment Banker",
    location: "Manhattan, NY",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "The team's market expertise and professional service exceeded all expectations. They guided us through every step of acquiring our Manhattan penthouse with remarkable precision and care.",
    propertyType: "Luxury Penthouse"
  },
  {
    id: 3,
    name: "Emily Thompson",
    role: "Creative Director",
    location: "Malibu, CA",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "From our first meeting to closing day, DreamHomes demonstrated unparalleled professionalism. Our oceanfront home in Malibu is everything we dreamed of and more.",
    propertyType: "Oceanfront Villa"
  }
];

export const Testimonials = () => {
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);

    // Only import and use GSAP on the client side
    const initAnimations = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Title animation
        gsap.fromTo(titleRef.current, 
          { 
            opacity: 0, 
            y: 60 
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Cards stagger animation
        gsap.fromTo(".testimonial-card",
          {
            opacity: 0,
            y: 80,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Subtle floating animation for cards (reduced movement)
        gsap.to(".testimonial-card", {
          y: -5,
          duration: 3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.4
        });

      }, sectionRef);

      return () => ctx.revert();
    };

    if (isClient) {
      initAnimations();
    }
  }, [isClient]);

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why thousands trust us with their most important investment decisions
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-black/5 rounded-full flex items-center justify-center">
                <Quote className="w-5 h-5 text-gray-400" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 leading-relaxed mb-6 text-base">
                &quot;{testimonial.content}&quot;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              {/* Property Type Badge */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                  {testimonial.propertyType}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 pt-8">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-all duration-300 flex items-center gap-2 relative z-10">
              Join Our Happy Clients
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-800 rounded-full font-medium hover:border-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 relative z-10">
              Read More Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
