"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { PERFORMANCE_VARIANTS } from "@/constants";

interface SectionHeaderProps {
  title: string;
  highlightText: string;
  description: string | ReactNode;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  gradientClass?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  highlightText,
  description,
  children,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  gradientClass = "from-secondary-default via-blue-400 to-secondary-default"
}) => {
  return (
    <motion.div
      variants={PERFORMANCE_VARIANTS.containerSync}
      initial="hidden"
      animate="visible"
      className={`text-center mb-6 ${className}`}
    >
      {/* Main Heading */}
      <motion.h1
        variants={PERFORMANCE_VARIANTS.slideUpSync}
        className={`text-3xl xl:text-5xl font-bold text-white mb-4 leading-tight ${titleClassName}`}
      >
        {title}{" "}
        <span className={`bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent animate-gradient`}>
          {highlightText}
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={PERFORMANCE_VARIANTS.slideUpSync}
        className={`text-lg xl:text-xl text-white/80 mb-6 max-w-4xl mx-auto leading-relaxed ${descriptionClassName}`}
      >
        {description}
      </motion.p>

      {/* Additional Content (Stats, etc.) */}
      {children}
    </motion.div>
  );
};

export default SectionHeader; 