"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Certification } from "@/data/certificationsData";
import { FiAward, FiCalendar, FiExternalLink, FiClock } from "react-icons/fi";
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

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: featured ? 0.2 * i : 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  // Format date for display
  const formattedDate = new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      custom={index}
      className={`bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-white/20 ${
        featured ? "lg:col-span-1" : ""
      } ${isUpcoming ? "border-dashed border-secondary-default/30" : ""}`}
    >
      {/* Certificate Image */}
      <div className="relative w-full h-48 bg-gradient-to-b from-white/5 to-transparent">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-4"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FiAward className="text-6xl text-secondary-default/30" />
          </div>
        )}
        
        {/* Issuer Logo */}
        {issuerLogo && (
          <div className="absolute bottom-2 right-2 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src={issuerLogo}
              alt={issuer}
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
        )}
        
        {/* Upcoming Badge */}
        {isUpcoming && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-secondary-default/20 text-white">Upcoming</Badge>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        {/* Certificate Header */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white line-clamp-2">
              {name}
            </h3>
          </div>
          <div className="flex items-center text-secondary-default">
            <FiAward className="mr-2 text-sm" />
            <span className="text-sm">{issuer}</span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-white/70 text-sm mb-4 line-clamp-3">
            {description}
          </p>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {skills.slice(0, 3).map((skill, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-xs"
              >
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs bg-white/5"
              >
                +{skills.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Certificate Details */}
        <div className="mt-auto pt-3 border-t border-white/10">
          <div className="flex justify-between items-center mb-3">
            <div className="text-white/60 text-xs flex items-center">
              {isUpcoming ? (
                <>
                  <FiClock className="mr-1.5" />
                  <span>Expected {formattedDate}</span>
                </>
              ) : (
                <>
                  <FiCalendar className="mr-1.5" />
                  <span>Issued {formattedDate}</span>
                </>
              )}
            </div>

            {credentialId && (
              <div className="text-white/60 text-xs">
                ID: {credentialId.substring(0, 8)}...
              </div>
            )}
          </div>

          {/* Link Button */}
          {link && !isUpcoming && (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-white/5 hover:bg-white/10 text-secondary-default hover:text-secondary-default/80 py-2 px-4 rounded-md text-sm font-medium transition-colors"
            >
              View Certificate
              <FiExternalLink className="ml-2" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard; 