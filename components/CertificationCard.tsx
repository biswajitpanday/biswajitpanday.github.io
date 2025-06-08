"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Certification } from "@/data/certificationsData";
import { FiAward, FiCalendar, FiExternalLink } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";

interface CertificationCardProps {
  certification: Certification;
  index: number;
  featured?: boolean;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
  index,
  featured = false,
}) => {
  const {
    name,
    issuer,
    date,
    credentialId,
    link,
    description,
    skills,
    image,
    issuerLogo,
    isUpcoming
  } = certification;

  // State for showing all skills
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 * index,
        duration: 0.4
      }
    },
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 }
    }
  };

  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });

  // Determine which skills to show
  const maxVisibleSkills = 3;
  const visibleSkills = showAllSkills 
    ? skills || []
    : (skills || []).slice(0, maxVisibleSkills);
  const hasMoreSkills = skills && skills.length > maxVisibleSkills;

  // Toggle showing all skills
  const toggleSkillsDisplay = () => {
    setShowAllSkills(!showAllSkills);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border ${
        featured
          ? "border-secondary-default/40"
          : isUpcoming 
            ? "border-dashed border-white/20" 
            : "border-white/10"
      } rounded-xl overflow-hidden transition-all duration-300 hover:border-secondary-default/30 flex flex-col`}
    >
      {/* Card Header with Image */}
      <div className="relative p-4 flex justify-center items-center h-[180px] bg-gradient-to-b from-white/[0.02] to-transparent">
        {image ? (
          <div className="relative w-full h-full max-h-[160px] rounded-lg overflow-hidden bg-white/5">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain p-2"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center">
            <FiAward className="text-4xl text-secondary-default" />
          </div>
        )}

        {/* Issuer Logo */}
        {issuerLogo && (
          <div className="absolute bottom-2 right-2 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full overflow-hidden flex items-center justify-center">
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

      {/* Card Content */}
      <div className="flex-1 p-5 pt-2 flex flex-col">
        <div className="mb-2 flex items-center text-white/70 text-sm">
          <FiCalendar className="mr-1.5" />
          <span>{formattedDate}</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1.5 line-clamp-2">{name}</h3>
        
        <div className="mb-3 text-secondary-default text-sm">
          {issuer}
        </div>
        
        {description && (
          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mt-auto">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {visibleSkills.map((skill, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            
            {hasMoreSkills && (
              <button
                onClick={toggleSkillsDisplay}
                className="text-secondary-default/80 hover:text-secondary-default text-xs transition-colors"
              >
                {showAllSkills ? "Show Less" : `+${skills.length - maxVisibleSkills} more`}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-4 pt-2 border-t border-white/5 flex justify-between items-center">
        {credentialId && (
          <div className="text-white/40 text-xs">
            ID: {credentialId.substring(0, 8)}...
          </div>
        )}
        
        {link ? (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-secondary-default hover:text-secondary-default/80 text-sm font-medium transition-colors"
          >
            View Certificate
            <FiExternalLink size={14} />
          </Link>
        ) : (
          <div className="text-white/40 text-xs italic">
            {isUpcoming ? "Coming soon" : "No certificate link"}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CertificationCard; 