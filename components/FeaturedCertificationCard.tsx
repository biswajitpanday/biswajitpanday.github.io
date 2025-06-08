"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Certification } from "@/data/certificationsData";
import { FiAward, FiCalendar, FiChevronRight } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";

interface FeaturedCertificationCardProps {
  certification: Certification;
  size?: "small" | "large";
  className?: string;
}

const FeaturedCertificationCard: React.FC<FeaturedCertificationCardProps> = ({
  certification,
  size = "large",
  className = ""
}) => {
  if (!certification) return null;

  const {
    name,
    issuer,
    date,
    description,
    skills,
    image,
    link,
    issuerLogo
  } = certification;

  const isSmall = size === "small";
  
  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: isSmall ? 'short' : 'long'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className={`bg-gradient-to-r from-secondary-default/20 to-blue-500/20 backdrop-blur-sm border border-secondary-default/30 rounded-xl overflow-hidden ${className}`}
    >
      <div className="flex flex-col md:flex-row items-center gap-6 p-6">
        <div className={`${isSmall ? "md:w-1/3" : "md:w-2/5"} flex justify-center`}>
          {image ? (
            <div className={`relative w-full ${isSmall ? "h-[180px]" : "h-[220px]"} bg-white/5 rounded-lg overflow-hidden`}>
              <Image
                src={image}
                alt={name}
                fill
                className="object-contain p-2"
              />
              
              {/* Issuer Logo */}
              {issuerLogo && (
                <div className="absolute bottom-3 right-3 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={issuerLogo}
                    alt={issuer}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={`${isSmall ? "w-[240px] h-[180px]" : "w-[280px] h-[220px]"} bg-white/5 rounded-lg flex items-center justify-center`}>
              <FiAward className="text-6xl text-secondary-default" />
            </div>
          )}
        </div>
        <div className={`${isSmall ? "md:w-2/3" : "md:w-3/5"}`}>
          <Badge variant="secondary" className="mb-3">Featured Certification</Badge>
          <h2 className={`${isSmall ? "text-xl" : "text-2xl"} font-bold mb-2`}>{name}</h2>
          <div className="flex items-center text-secondary-default mb-3">
            <FiAward className="mr-2" />
            <span>{issuer}</span>
            <span className="mx-2 text-white/30">•</span>
            <div className="flex items-center text-white/70">
              <FiCalendar className="mr-1.5" />
              <span>{formattedDate}</span>
            </div>
          </div>
          {!isSmall && description && (
            <p className="text-white/80 mb-4">{description}</p>
          )}
          
          {skills && (
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.slice(0, isSmall ? 3 : 5).map((skill, i) => (
                <Badge key={i} variant="outline" className="bg-white/10">
                  {skill}
                </Badge>
              ))}
              {skills.length > (isSmall ? 3 : 5) && (
                <Badge variant="outline" className="bg-white/5">
                  +{skills.length - (isSmall ? 3 : 5)} more
                </Badge>
              )}
            </div>
          )}
          
          {link && (
            <Link href={link} target="_blank" rel="noopener noreferrer" 
              className="inline-flex items-center bg-white/10 hover:bg-white/20 text-secondary-default hover:text-secondary-default/80 px-4 py-2 rounded-md font-medium transition-all">
              View Credential <FiChevronRight className="ml-1" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedCertificationCard; 