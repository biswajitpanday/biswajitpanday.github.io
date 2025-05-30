"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { PERFORMANCE_VARIANTS } from "@/constants";

export interface StatCard {
  icon: IconType;
  value: string | number;
  label: string;
  gradient?: string;
  iconColor?: string;
}

interface StatsCardsProps {
  stats: StatCard[];
  className?: string;
}

const StatsCards: React.FC<StatsCardsProps> = ({ 
  stats, 
  className = "" 
}) => {
  const defaultGradients = [
    "from-secondary-default/10 to-blue-500/10",
    "from-blue-500/10 to-secondary-default/10", 
    "from-purple-500/10 to-secondary-default/10",
    "from-green-500/10 to-secondary-default/10",
    "from-orange-500/10 to-secondary-default/10"
  ];

  return (
    <motion.div
      variants={PERFORMANCE_VARIANTS.containerSync}
      className={`flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-8 ${className}`}
    >
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        const gradient = stat.gradient || defaultGradients[index % defaultGradients.length];
        const iconColor = stat.iconColor || "text-secondary-default";

        return (
          <motion.div
            key={`${stat.label}-${index}`}
            variants={PERFORMANCE_VARIANTS.cardSync}
            className={`group relative overflow-hidden bg-gradient-to-r ${gradient} backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded performance-button`}
          >
            <div className="flex items-center gap-3">
              <IconComponent 
                className={`${iconColor} text-xl group-hover:animate-pulse`} 
              />
              <div className="flex items-baseline gap-2">
                <span className="text-secondary-default text-2xl font-bold">
                  {stat.value}
                </span>
                <span className="text-white/80 text-sm font-medium">
                  {stat.label}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StatsCards; 