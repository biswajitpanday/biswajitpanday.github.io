"use client";
import React, { useRef, useState } from "react";
import { Certification } from "@/data/certificationsData";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight, FiCalendar } from "react-icons/fi";
import Link from "next/link";

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

  if (sortedCertifications.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <span className="bg-gradient-to-r from-secondary-default to-blue-500 bg-clip-text text-transparent">
            Certification Journey
          </span>
        </h3>
        
        {/* Navigation arrows */}
        <div className="flex gap-2">
          <button 
            onClick={() => handleScroll("left")}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Scroll left"
          >
            <FiArrowLeft />
          </button>
          <button 
            onClick={() => handleScroll("right")}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Scroll right"
          >
            <FiArrowRight />
          </button>
        </div>
      </div>

      {/* Timeline track */}
      <div 
        className="h-1 w-full bg-white/10 rounded-full mb-2 relative overflow-hidden"
      >
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary-default to-blue-500 rounded-full"
          style={{ 
            width: `${Math.min((scrollPosition / (timelineRef.current?.scrollWidth || 1)) * 100, 100)}%` 
          }}
        />
      </div>

      {/* Timeline items */}
      <div 
        ref={timelineRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {sortedCertifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index, duration: 0.3 }}
            className="min-w-[250px] bg-white/5 border border-white/10 rounded-lg p-4 hover:border-secondary-default/30 transition-all hover:bg-white/7 flex flex-col"
          >
            <div className="relative h-28 mb-3 flex items-center justify-center">
              {cert.image ? (
                <div className="relative w-28 h-28 rounded-lg overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg bg-white/5 flex items-center justify-center">
                  <span className="text-secondary-default text-4xl">
                    {cert.name.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Issuer logo */}
              {cert.issuerLogo && (
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-white/10 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={cert.issuerLogo}
                    alt={cert.issuer}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            
            <h4 className="text-white font-medium text-sm mb-1 line-clamp-2">{cert.name}</h4>
            <div className="text-white/60 text-xs flex items-center mb-3">
              <FiCalendar className="mr-1" />
              <span>
                {new Date(cert.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short' 
                })}
              </span>
            </div>
            
            {cert.link && (
              <Link 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-auto text-secondary-default hover:text-secondary-default/80 text-xs"
              >
                View Certificate
              </Link>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Fade effect on sides */}
      <div className="absolute left-0 top-10 bottom-0 w-8 bg-gradient-to-r from-primary to-transparent pointer-events-none" />
      <div className="absolute right-0 top-10 bottom-0 w-8 bg-gradient-to-l from-primary to-transparent pointer-events-none" />
    </div>
  );
};

export default CertificationTimeline; 