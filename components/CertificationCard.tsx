"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Certification } from "@/data/certificationsData";
import { FiAward, FiCalendar, FiExternalLink, FiKey, FiCheck, FiActivity, FiHash } from "react-icons/fi";
import { PERFORMANCE_VARIANTS } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    isUpcoming,
    status,
    onlineVerifiable,
    certificationNumber
  } = certification;

  // State for showing all skills
  const [showAllSkills, setShowAllSkills] = useState(false);

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

  // Check if it's a Microsoft certification
  const isMicrosoftCert = issuer === "Microsoft";

  return (
    <motion.div
      variants={PERFORMANCE_VARIANTS.cardSync}
      initial="hidden"
      animate="visible"
      className={`group relative bg-gradient-to-b from-white/5 to-white/[0.02] backdrop-blur-sm border ${
        featured
          ? "border-secondary-default/40"
          : isUpcoming 
            ? "border-dashed border-white/20" 
            : "border-white/10"
      } rounded-xl overflow-hidden transition-all duration-300 hover:border-secondary-default/30 hover:-translate-y-1 flex flex-col`}
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
          <div className="absolute bottom-2 right-2 w-10 h-10 bg-white/10 backdrop-blur-md rounded overflow-hidden flex items-center justify-center border border-white/20 shadow-glow">
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
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center text-white/70 text-sm">
            <FiCalendar className="mr-1.5" />
            <span>{formattedDate}</span>
          </div>
          
          {/* Status indicators with tooltips */}
          <div className="flex gap-1.5">
            {status && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      status === "Active" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-white/10 text-white/60"
                    }`}>
                      <FiActivity size={12} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{status} Certification</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {onlineVerifiable && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-5 h-5 rounded-full bg-secondary-default/20 text-secondary-default flex items-center justify-center">
                      <FiCheck size={12} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Online Verifiable</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-1.5 line-clamp-2 group-hover:text-secondary-default transition-colors duration-300">{name}</h3>
        
        <div className="mb-3 text-secondary-default text-sm">
          {issuer}
        </div>
        
        {/* Credential ID for Microsoft certifications */}
        {isMicrosoftCert && credentialId && (
          <div className="flex items-center text-white/60 text-xs mb-3 bg-white/5 p-2 rounded">
            <FiKey className="mr-1.5 text-secondary-default" />
            <span className="mr-1 font-medium">Credential ID:</span>
            <span className="font-mono">{credentialId}</span>
          </div>
        )}
        
        {/* Certification Number if available */}
        {certificationNumber && (
          <div className="flex items-center text-white/60 text-xs mb-3 bg-white/5 p-2 rounded">
            <FiHash className="mr-1.5 text-secondary-default" />
            <span className="mr-1 font-medium">Certification Number:</span>
            <span className="font-mono">{certificationNumber}</span>
          </div>
        )}
        
        {description && !isMicrosoftCert && (
          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mt-auto mb-4">
            <h4 className="text-sm font-semibold text-white/80 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {visibleSkills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-secondary-default/10 text-secondary-default border border-secondary-default/30 rounded hover:bg-secondary-default/20 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
              {hasMoreSkills && (
                <button
                  onClick={toggleSkillsDisplay}
                  className="text-xs px-2 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded hover:bg-blue-500/20 transition-colors duration-200"
                >
                  {showAllSkills ? "Show Less" : `+${skills.length - maxVisibleSkills} more`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="p-4 pt-2 border-t border-white/5">
        {!isMicrosoftCert && credentialId && (
          <div className="text-white/40 text-xs mb-3">
            ID: {credentialId.substring(0, 8)}...
          </div>
        )}
        
        <div className="flex gap-3">
          {link && (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-secondary-default/10 hover:bg-secondary-default/20 border border-secondary-default/30 text-secondary-default px-4 py-2 rounded transition-all duration-300 hover:scale-105 text-sm font-medium"
            >
              <FiExternalLink className="text-xs" />
              <span>View Certificate</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;

// Add CSS for shadow glow in a Next.js safe way
if (typeof document !== 'undefined') {
  // Check if the style already exists to avoid duplicates
  const id = 'certification-card-styles';
  if (!document.getElementById(id)) {
    const styleElement = document.createElement('style');
    styleElement.id = id;
    styleElement.innerHTML = `
      .shadow-glow {
        box-shadow: 0 0 8px rgba(0, 191, 255, 0.2);
      }
    `;
    document.head.appendChild(styleElement);
  }
} 