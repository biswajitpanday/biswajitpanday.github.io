"use client";

import React from "react";
import { motion } from "framer-motion";
import { PERFORMANCE_VARIANTS } from "@/constants";

interface BadgeProps {
  icon?: React.ReactNode;
  text: React.ReactNode;
  color?: "default" | "blue" | "purple" | "emerald" | "orange";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  icon,
  text,
  color = "default",
  className = "",
}) => {
  // Color mappings for consistent styling
  const colorVariants = {
    default: {
      gradient: "from-secondary-default/10 to-transparent",
      border: "border-secondary-default/30",
      text: "text-secondary-default",
      hover: "hover:bg-secondary-default/20",
    },
    blue: {
      gradient: "from-blue-500/10 to-transparent",
      border: "border-blue-500/30",
      text: "text-blue-300",
      hover: "hover:bg-blue-500/20",
    },
    purple: {
      gradient: "from-purple-500/10 to-transparent",
      border: "border-purple-500/30",
      text: "text-purple-300",
      hover: "hover:bg-purple-500/20",
    },
    emerald: {
      gradient: "from-emerald-500/10 to-transparent",
      border: "border-emerald-500/30",
      text: "text-emerald-300",
      hover: "hover:bg-emerald-500/20",
    },
    orange: {
      gradient: "from-orange-500/10 to-transparent",
      border: "border-orange-500/30",
      text: "text-orange-300",
      hover: "hover:bg-orange-500/20",
    },
  };

  const selectedColor = colorVariants[color];

  return (
    <motion.span
      variants={PERFORMANCE_VARIANTS.cardSync}
      className={`inline-flex items-center gap-2 bg-gradient-to-r ${selectedColor.gradient} backdrop-blur-sm border ${selectedColor.border} ${selectedColor.text} px-4 py-2 rounded-full text-sm font-medium ${selectedColor.hover} transition-all duration-300 ${className}`}
    >
      {icon && <span className="text-xs">{icon}</span>}
      {text}
    </motion.span>
  );
};

export default Badge; 