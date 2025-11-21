"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CSS_ANIMATIONS } from "@/constants";
import Image from "next/image";
import { Certification } from "@/data/certificationsData";
import { FiAward, FiCalendar, FiExternalLink, FiKey, FiCheck, FiActivity, FiHash } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dynamic from "next/dynamic";

// Dynamic import of lightbox for better performance and to avoid SSR issues
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

// Only import styles on client-side and only once
const importLightboxStyles = () => {
  if (typeof window !== 'undefined') {
    import("yet-another-react-lightbox/styles.css");
  }
};

interface CertificationCardProps {
  certification: Certification;
  featured?: boolean;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  certification,
  featured = false,
}) => {
  // Import lightbox styles on component mount (client-side only)
  React.useEffect(() => {
    importLightboxStyles();
  }, []);
  
  const {
    name,
    issuer,
    date,
    credentialId,
    link,
    description,
    skills,
    image,
    thumbImage,
    issuerLogo,
    isUpcoming,
    status,
    onlineVerifiable,
    certificationNumber
  } = certification;

  // State for showing all skills
  const [showAllSkills, setShowAllSkills] = useState(false);
  // State for lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
  
  // Determine which image to use (thumbnail or full image)
  const displayImage = thumbImage || image;

  return (
    <>
      <div
        data-testid={`certification-card-${certification.name.replace(/\s+/g, '-').toLowerCase()}`}
        className={`group relative p-5 rounded-xl border transition-all duration-500 flex flex-col hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1 ${
          featured
            ? 'bg-gradient-to-br from-purple-500/5 via-[#27272c] to-[#2a2a30] border-purple-500/30 shadow-md shadow-purple-500/10 hover:border-purple-500/50 hover:shadow-purple-500/20'
            : isUpcoming
              ? 'bg-gradient-to-br from-[#27272c] to-[#2a2a30] border-dashed border-white/20 hover:border-white/30'
              : 'bg-gradient-to-br from-[#27272c] to-[#2a2a30] border-secondary-default/20 hover:border-secondary-default/60 hover:shadow-secondary-default/20'
        } performance-card ${CSS_ANIMATIONS.FADE_IN_UP}`}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Header with Image */}
        <div
          data-testid={`certification-image-container-${certification.name.replace(/\s+/g, '-').toLowerCase()}`}
          className="relative mb-4 flex justify-center items-center h-[180px] rounded-lg overflow-hidden bg-gradient-to-br from-secondary-default/10 to-transparent group-hover:shadow-2xl transition-all duration-500"
          style={{
            transform: 'translateZ(20px)',
          }}
        >
          {displayImage ? (
            <div 
              data-testid={`certification-image-${certification.name.replace(/\s+/g, '-').toLowerCase()}`}
              className="relative w-full h-full max-h-[160px] rounded-lg overflow-hidden bg-white/5 cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            >
              <Image
                src={displayImage}
                alt={`${name} certificate`}
                fill
                className="object-contain p-2 transition-transform duration-300 hover:scale-105"
              />
              
              {/* Subtle indicator to show the image is clickable */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors duration-300 opacity-0 hover:opacity-100">
                <span className="text-white text-xs px-2 py-1 bg-black/50 rounded-md">Click to enlarge</span>
              </div>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center">
              <FiAward className="text-4xl text-secondary-default" />
            </div>
          )}

          {/* Issuer Logo */}
          {issuerLogo && (
            <div 
              data-testid={`certification-issuer-logo-${certification.name.replace(/\s+/g, '-').toLowerCase()}`}
              className="absolute bottom-2 right-2 w-10 h-10 bg-white/10 backdrop-blur-md rounded overflow-hidden flex items-center justify-center border border-white/20 shadow-glow"
            >
              <Image
                src={issuerLogo}
                alt={`${issuer} logo`}
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Card Content */}
        <div
          data-testid={`certification-content-${certification.name.replace(/\s+/g, '-').toLowerCase()}`}
          className="flex-1 flex flex-col"
        >
          <div className="mb-3 flex items-center justify-between">
            <div 
              data-testid={`certification-date-${certification.name.replace(/\s+/g, '-').toLowerCase()}`}
              className="flex items-center text-white/70 text-sm"
            >
              <FiCalendar className="mr-1.5" />
              <span>{formattedDate}</span>
            </div>
            
            {/* Status indicators with tooltips */}
            <div 
              data-testid={`certification-status-indicators-${certification.name.replace(/\s+/g, '-').toLowerCase()}`}
              className="flex gap-1.5"
            >
              {status && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        data-testid={`certification-status-${certification.name.replace(/\s+/g, '-').toLowerCase()}`}
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          status === "Active" 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        <FiActivity size={12} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="z-[100]">
                      <p className="text-xs">{status} Certification</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {onlineVerifiable && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        data-testid={`certification-verifiable-${certification.name.replace(/\s+/g, '-').toLowerCase()}`}
                        className="w-5 h-5 rounded-full bg-secondary-default/20 text-secondary-default flex items-center justify-center"
                      >
                        <FiCheck size={12} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="z-[100]">
                      <p className="text-xs">Online Verifiable</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>

          <h3
            data-testid={`certification-title-${certification.name.replace(/\s+/g, '-').toLowerCase()}`}
            className={`text-lg font-bold mb-2 line-clamp-2 transition-colors duration-300 leading-tight ${
              featured
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-emerald-400 to-gray-300 bg-clip-text text-transparent'
            }`}
          >
            {name}
          </h3>

          {/* Issuer as inline text - matching Project Page pattern */}
          <div
            data-testid={`certification-issuer-${certification.name.replace(/\s+/g, '-').toLowerCase()}`}
            className="mb-3 text-xs text-white/60 font-medium"
          >
            @ {issuer}
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
              <h4 className="text-sm font-semibold bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {visibleSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center justify-center h-7 text-[11px] px-2 bg-[#00BFFF]/10 text-[#00BFFF]/90 border border-[#00BFFF]/30 rounded-md font-medium hover:bg-[#00BFFF]/20 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
                {hasMoreSkills && (
                  <button
                    onClick={toggleSkillsDisplay}
                    className="inline-flex items-center justify-center h-7 text-[11px] px-2 bg-secondary-default/10 text-secondary-default border border-secondary-default/30 rounded-md font-medium hover:bg-secondary-default/20 transition-all duration-300"
                  >
                    {showAllSkills ? "Show Less" : `+${skills.length - maxVisibleSkills} more`}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="mt-3 pt-3 border-t border-white/10">
          {!isMicrosoftCert && credentialId && (
            <div className="text-white/40 text-xs mb-3">
              ID: {credentialId.substring(0, 8)}...
            </div>
          )}

          <div className="flex gap-3">
            {link && onlineVerifiable !== false ? (
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-secondary-default/10 to-blue-500/10 hover:from-secondary-default/20 hover:to-blue-500/20 border border-secondary-default/30 hover:border-secondary-default/50 text-secondary-default px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-secondary-default/20 text-sm font-medium"
              >
                <FiExternalLink className="text-sm" />
                <span>View Certificate</span>
              </Link>
            ) : (
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 hover:to-transparent border border-white/20 hover:border-white/30 text-white/70 hover:text-white px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg text-sm font-medium"
              >
                <FiExternalLink className="text-sm" />
                <span>View Image</span>
              </button>
            )}
          </div>
        </div>

        {/* 3D Depth Effect - Subtle Shadow Layer */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary-default/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
          style={{
            transform: 'translateZ(-10px)',
          }}
        />

        {/* Lightbox for full-size image view */}
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={[{ src: image || '' }]}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
          }}
          controller={{
            closeOnBackdropClick: true,
            closeOnPullDown: true,
          }}
        />
      </div>
    </>
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