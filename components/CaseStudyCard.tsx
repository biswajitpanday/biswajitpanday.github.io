"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaExclamationTriangle,
  FaArrowRight
} from "react-icons/fa";
import { CaseStudy, Project } from "@/data/portfolioData";

interface CaseStudyCardProps {
  project: Project;
  caseStudy: CaseStudy;
  onViewDetails?: () => void;
  className?: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  project,
  caseStudy,
  onViewDetails,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-xl overflow-hidden h-full flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div>
          <span className="text-xs text-secondary-default/80 font-medium uppercase tracking-wider">
            Case Study
          </span>
          <h3 className="text-xl font-bold mt-1 bg-gradient-to-r from-[#00BFFF] to-white bg-clip-text text-transparent">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-sm font-medium text-[#00BFFF]/80 mt-1">{project.subtitle}</p>
          )}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.stacks.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-[#00BFFF]/10 border border-[#00BFFF]/30 rounded text-[#00BFFF]/90"
            >
              {tech}
            </span>
          ))}
          {project.stacks.length > 4 && (
            <span className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-white/50">
              +{project.stacks.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Problem Section - Always Visible, grows to fill space */}
      <div className="px-6 py-4 border-t border-white/10 flex-1">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-red-500/20 rounded-lg shrink-0">
            <FaExclamationTriangle className="text-red-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2">The Challenge</h4>
            <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
              {caseStudy.problem}
            </p>
          </div>
        </div>
      </div>

      {/* View Full Case Study Button - Opens Modal */}
      <button
        onClick={onViewDetails}
        className="w-full px-6 py-3 border-t border-white/10 flex items-center justify-center gap-2 text-sm text-secondary-default/80 hover:text-secondary-default hover:bg-white/5 transition-all mt-auto group"
      >
        <span>View Full Case Study</span>
        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};

export default CaseStudyCard;
