"use client";
import React from "react";
import { motion } from "framer-motion";
import { Certification } from "@/data/certificationsData";
import Image from "next/image";
import { FiClock, FiTarget, FiChevronRight } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface UpcomingCertificationProps {
  certification: Certification;
  index: number;
}

const UpcomingCertification: React.FC<UpcomingCertificationProps> = ({
  certification,
  index
}) => {
  const {
    name,
    issuer,
    date,
    description,
    skills,
    image,
    issuerLogo
  } = certification;

  // Format expected date
  const expectedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      className="relative bg-gradient-to-r from-blue-500/5 to-secondary-default/5 backdrop-blur-sm border border-dashed border-secondary-default/30 rounded-xl overflow-hidden"
    >
      {/* Progress indicator */}
      <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-secondary-default to-blue-500 rounded-full" style={{ width: '35%' }} />
      
      <div className="flex flex-col md:flex-row p-5 gap-5">
        {/* Left section with image */}
        <div className="md:w-1/4 flex justify-center items-center">
          <div className="relative w-full h-32 flex justify-center items-center">
            {image ? (
              <div className="relative w-32 h-32 bg-white/5 rounded-full overflow-hidden border-2 border-secondary-default/20">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-contain p-3 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ) : (
              <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center border-2 border-secondary-default/20">
                <FiTarget className="text-5xl text-secondary-default/70" />
              </div>
            )}
            
            {/* Issuer Logo */}
            {issuerLogo && (
              <div className="absolute -bottom-2 right-1/3 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full overflow-hidden flex items-center justify-center border border-white/10">
                <Image
                  src={issuerLogo}
                  alt={issuer}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Middle section with details */}
        <div className="md:w-3/4 flex flex-col justify-center">
          <div className="flex items-center mb-2">
            <Badge variant="secondary" className="bg-secondary-default/20 text-white mr-2">Upcoming</Badge>
            <div className="flex items-center text-white/60 text-sm">
              <FiClock className="mr-1.5" />
              <span>Expected {expectedDate}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
          
          <div className="flex items-center mb-3 text-sm text-secondary-default">
            <span>{issuer}</span>
          </div>
          
          {description && (
            <p className="text-white/70 text-sm mb-3 line-clamp-2">{description}</p>
          )}
          
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {skills.slice(0, 4).map((skill, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs border-secondary-default/30"
                >
                  {skill}
                </Badge>
              ))}
              {skills.length > 4 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-white/5"
                >
                  +{skills.length - 4}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        {/* Action side - optional future link */}
        <div className="absolute top-3 right-3">
          <Link href="#" className="text-secondary-default/70 hover:text-secondary-default transition-colors">
            <FiChevronRight />
          </Link>
        </div>
        
        {/* Bottom progress text */}
        <div className="absolute bottom-2 right-3 text-xs text-white/40">
          In progress
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingCertification; 