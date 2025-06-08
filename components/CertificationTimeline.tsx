"use client";
import React, { useRef, useState, useEffect } from "react";
import { Certification } from "@/data/certificationsData";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight, FiCalendar, FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import { PERFORMANCE_VARIANTS } from "@/constants";

interface CertificationTimelineProps {
  certifications: Certification[];
  className?: string;
}

const CertificationTimeline: React.FC<CertificationTimelineProps> = ({
  certifications,
  className = ""
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const sortedCertifications = [...certifications]
    .filter(cert => !cert.isUpcoming)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleScroll = (direction: "left" | "right") => {
    if (timelineRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      timelineRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
      
      setScrollPosition(timelineRef.current.scrollLeft + scrollAmount);
    }
  };

  const updateScrollPosition = () => {
    if (timelineRef.current) {
      setScrollPosition(timelineRef.current.scrollLeft);
    }
  };

  // Update scroll position on mount and on window resize
  useEffect(() => {
    const handleResize = () => updateScrollPosition();
    window.addEventListener('resize', handleResize);
    updateScrollPosition();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (sortedCertifications.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      <div className="flex justify-between items-center mb-3">
        <motion.h3 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-base font-bold flex items-center gap-2"
        >
          <span className="inline-block w-2 h-8 bg-gradient-to-b from-secondary-default to-blue-500 rounded-full" />
          <span className="bg-gradient-to-r from-secondary-default to-blue-500 bg-clip-text text-transparent">
            Certification Journey
          </span>
        </motion.h3>
        
        {/* Navigation arrows */}
        <motion.div 
          variants={PERFORMANCE_VARIANTS.fadeInFast}
          initial="hidden"
          animate="visible"
          className="flex gap-2"
        >
          <button 
            onClick={() => handleScroll("left")}
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary-default/30 rounded-full p-1.5 text-white/70 hover:text-secondary-default transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-secondary-default/50"
            aria-label="Scroll left"
          >
            <FiArrowLeft size={14} />
          </button>
          <button 
            onClick={() => handleScroll("right")}
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary-default/30 rounded-full p-1.5 text-white/70 hover:text-secondary-default transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-secondary-default/50"
            aria-label="Scroll right"
          >
            <FiArrowRight size={14} />
          </button>
        </motion.div>
      </div>

      {/* Timeline track with animated gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-full mb-3 relative overflow-hidden backdrop-blur-sm">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ 
            width: `${Math.min((scrollPosition / ((timelineRef.current?.scrollWidth || 1) - (timelineRef.current?.clientWidth || 0))) * 100, 100)}%`
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary-default via-blue-500 to-secondary-default rounded-full shadow-glow"
        />
      </div>

      {/* Timeline items */}
      <div 
        ref={timelineRef}
        className="flex gap-3 overflow-x-auto pb-3 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onScroll={updateScrollPosition}
      >
        {sortedCertifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            variants={PERFORMANCE_VARIANTS.cardSync}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              y: -5, 
              boxShadow: "0 5px 15px rgba(0, 191, 255, 0.15)", 
              transition: { duration: 0.2 } 
            }}
            custom={index}
            className="min-w-[200px] max-w-[220px] bg-gradient-to-b from-white/8 to-white/3 border border-white/10 rounded-lg p-3 hover:border-secondary-default/30 transition-all duration-300 flex flex-col shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              {/* Year indicator - moved to top-left */}
              <div className="text-[10px] text-secondary-default/70 font-mono bg-white/5 px-1.5 py-0.5 rounded">
                {new Date(cert.date).getFullYear()}
              </div>
              
              {/* Link to certificate */}
              {cert.link && (
                <Link 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary-default hover:text-secondary-default/80 text-xs flex items-center gap-1 group transition-all duration-300 p-1 hover:bg-secondary-default/10 rounded"
                >
                  <FiExternalLink size={12} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
            
            <div className="relative h-[68px] mb-3 flex items-center justify-center">
              {/* Subtle glow effect behind image */}
              <div className="absolute inset-0 bg-secondary-default/5 rounded-lg blur-md" />
              
              {cert.image ? (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10 bg-white/5 z-10 group">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary-default/0 to-blue-500/0 group-hover:from-secondary-default/10 group-hover:to-blue-500/10 transition-all duration-300" />
                </div>
              ) : (
                <div className="relative w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 z-10">
                  <span className="text-secondary-default text-2xl">
                    {cert.name.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Issuer logo with animation */}
              {cert.issuerLogo && (
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }} 
                  transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                  className="absolute bottom-0 right-0 w-7 h-7 bg-white/10 rounded-full overflow-hidden flex items-center justify-center border border-white/10 shadow-md"
                >
                  <Image
                    src={cert.issuerLogo}
                    alt={cert.issuer}
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                </motion.div>
              )}
            </div>
            
            <h4 className="text-white font-medium text-xs mb-2 line-clamp-2 h-[32px]">{cert.name}</h4>
            
            <div className="flex justify-between items-center mt-auto">
              <div className="text-white/60 text-xs flex items-center bg-white/5 px-1.5 py-0.5 rounded-full">
                <FiCalendar className="mr-1" size={10} />
                <span>
                  {new Date(cert.date).toLocaleDateString('en-US', { 
                    month: 'short' 
                  })}
                </span>
              </div>
              
              <span className="text-xs text-secondary-default/80">{cert.issuer}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Fade effect on sides with improved gradients */}
      <div className="absolute left-0 top-10 bottom-0 w-8 bg-gradient-to-r from-primary via-primary/90 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-10 bottom-0 w-8 bg-gradient-to-l from-primary via-primary/90 to-transparent pointer-events-none z-10" />
      
      {/* Animated dots to show scrolling is available */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-1">
        {[0, 1, 2].map((dot, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.2
            }}
            className="w-1 h-1 rounded-full bg-secondary-default/50"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default CertificationTimeline;

// Add styles in a Next.js safe way
if (typeof document !== 'undefined') {
  const id = 'timeline-styles';
  if (!document.getElementById(id)) {
    const styleElement = document.createElement('style');
    styleElement.id = id;
    styleElement.innerHTML = `
      .shadow-glow {
        box-shadow: 0 0 8px rgba(0, 191, 255, 0.2);
      }
      
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(styleElement);
  }
} 