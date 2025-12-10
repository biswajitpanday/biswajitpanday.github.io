"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiBriefcase, FiBook } from "react-icons/fi";
import { getCertificationCounts } from "@/types/api";
import { PERFORMANCE_VARIANTS } from "@/constants";
import Link from "next/link";

interface CertificationStatsProps {
  className?: string;
}

const CertificationStats: React.FC<CertificationStatsProps> = ({ className = "" }) => {
  const certCounts = getCertificationCounts();
  
  // Stats data
  const statsData = [
    {
      icon: FiAward,
      value: certCounts.total - certCounts.upcoming,
      label: "Credentials",
      gradient: "from-secondary-default/10 to-blue-500/10"
    },
    {
      icon: FiBriefcase,
      value: certCounts.professional - (certCounts.upcoming || 0),
      label: "Professional",
      gradient: "from-blue-500/10 to-secondary-default/10"
    },
    {
      icon: FiBook,
      value: certCounts.course,
      label: "Courses",
      gradient: "from-purple-500/10 to-secondary-default/10"
    }
  ];

  return (
    <motion.div
      variants={PERFORMANCE_VARIANTS.containerSync}
      initial="hidden"
      animate="visible"
      className={`relative bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-4 ${className}`}
    >
      {/* Certificate badge in top-right corner */}
      <div className="absolute -top-2 -right-2 w-12 h-12 bg-secondary-default/20 rounded-full flex items-center justify-center border border-secondary-default/40 backdrop-blur-md">
        <FiAward className="text-secondary-default text-xl" />
      </div>
      
      <div className="flex flex-col">
        <motion.h4 
          variants={PERFORMANCE_VARIANTS.slideUpSync}
          className="text-center text-white/90 text-sm font-medium mb-3 flex items-center justify-center gap-2"
        >
          <span>My Certifications & Credentials</span>
        </motion.h4>
        
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={PERFORMANCE_VARIANTS.cardSync}
                className={`group flex items-center gap-3 bg-gradient-to-r ${stat.gradient} backdrop-blur-sm border border-secondary-default/30 py-2 px-4 rounded-lg performance-card`}
              >
                <Icon className="text-secondary-default text-xl" />
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-default text-xl font-bold">{stat.value}</span>
                  <span className="text-white/80 text-sm">{stat.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          variants={PERFORMANCE_VARIANTS.slideUpSync}
          className="flex justify-center"
        >
          <Link 
            href="/certifications" 
            className="text-secondary-default hover:text-white text-sm flex items-center justify-center transition-colors duration-300 group"
          >
            <span>View all certifications</span>
            <span className="ml-1 text-xs group-hover:ml-2 transition-all duration-300">→</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CertificationStats; 