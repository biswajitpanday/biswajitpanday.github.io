"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaLinkedin } from "react-icons/fa";

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
  linkedinUrl?: string;
  /** Controls visibility - true = visible on public site, false = admin preview only */
  shouldPublish?: boolean;
  /** Marks this as sample/demo data that should be replaced with real testimonials */
  isSampleData?: boolean;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number; // in milliseconds
  className?: string;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  autoPlayInterval = 6000,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, autoPlayInterval, testimonials.length]);

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`py-12 ${className}`}
    >
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl xl:text-3xl font-bold mb-2 bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
          What People Say
        </h2>
        <p className="text-sm text-white/60">
          Feedback from colleagues and collaborators
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-xl p-8 md:p-12">
        {/* Quote Icon */}
        <div className="absolute top-6 left-6 text-secondary-default/20">
          <FaQuoteLeft className="text-4xl md:text-5xl" />
        </div>

        {/* Testimonial Content */}
        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Quote */}
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 italic">
                "{currentTestimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex flex-col items-center gap-3">
                {/* Avatar */}
                {currentTestimonial.image ? (
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.author}
                    className="w-16 h-16 rounded-full border-2 border-secondary-default/50 object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary-default/30 to-blue-500/30 border-2 border-secondary-default/50 flex items-center justify-center">
                    <span className="text-2xl font-bold text-secondary-default">
                      {currentTestimonial.author.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Name & Role */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <h4 className="text-lg font-semibold text-white">
                      {currentTestimonial.author}
                    </h4>
                    {currentTestimonial.linkedinUrl && (
                      <a
                        href={currentTestimonial.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        aria-label={`${currentTestimonial.author}'s LinkedIn`}
                      >
                        <FaLinkedin className="text-lg" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-white/60">
                    {currentTestimonial.role}
                    {currentTestimonial.company && (
                      <span className="text-secondary-default/80"> @ {currentTestimonial.company}</span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        {testimonials.length > 1 && (
          <>
            <button
              onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary-default/50 text-white/60 hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="text-lg" />
            </button>
            <button
              onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary-default/50 text-white/60 hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="text-lg" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 bg-gradient-to-r from-secondary-default to-blue-500"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-play indicator */}
        {testimonials.length > 1 && (
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`text-xs px-2 py-1 rounded ${
                isAutoPlaying
                  ? "text-secondary-default/60"
                  : "text-white/40"
              }`}
              aria-label={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
            >
              {isAutoPlaying ? "●" : "○"}
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default TestimonialsCarousel;
