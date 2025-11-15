"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  score: number;
  maxScore: number;
  color: "green" | "yellow" | "red";
  icon: ReactNode;
  description?: string;
}

export default function MetricCard({
  title,
  score,
  maxScore,
  color,
  icon,
  description
}: MetricCardProps) {
  const percentage = (score / maxScore) * 100;

  // Color mapping
  const colorClasses = {
    green: {
      bg: "bg-green-500/20",
      text: "text-green-400",
      ring: "stroke-green-400",
      glow: "shadow-green-500/20"
    },
    yellow: {
      bg: "bg-yellow-500/20",
      text: "text-yellow-400",
      ring: "stroke-yellow-400",
      glow: "shadow-yellow-500/20"
    },
    red: {
      bg: "bg-red-500/20",
      text: "text-red-400",
      ring: "stroke-red-400",
      glow: "shadow-red-500/20"
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6 hover:border-secondary-default/40 transition-all duration-300 hover:shadow-xl ${colors.glow} group`}
    >
      {/* Icon */}
      <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center ${colors.text} mb-4 text-2xl group-hover:scale-110 transition-transform`}>
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-white/60 mb-2">{title}</h3>

      {/* Score */}
      <div className="flex items-baseline gap-2">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-4xl font-bold ${colors.text}`}
        >
          {score}
        </motion.span>
        <span className="text-2xl text-white/40">/ {maxScore}</span>
      </div>

      {/* Circular Progress Indicator */}
      <div className="absolute top-6 right-6">
        <svg width="48" height="48" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            className={colors.ring}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 20}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
            whileInView={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - percentage / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold ${colors.text}`}>
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-white/40 mt-2">{description}</p>
      )}
    </motion.div>
  );
}
