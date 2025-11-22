"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExclamationTriangle,
  FaLightbulb,
  FaChartLine,
  FaCode,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt
} from "react-icons/fa";
import { CaseStudy, Project } from "@/data/portfolioData";

interface CaseStudyCardProps {
  project: Project;
  caseStudy: CaseStudy;
  variant?: "compact" | "expanded";
  className?: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  project,
  caseStudy,
  variant = "compact",
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(variant === "expanded");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs text-secondary-default/80 font-medium uppercase tracking-wider">
              Case Study
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-sm text-white/60 mt-1">{project.subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                aria-label="View project"
              >
                <FaExternalLinkAlt className="text-sm" />
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.stacks.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-white/70"
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

      {/* Problem Section - Always Visible */}
      <div className="px-6 py-4 border-t border-white/10">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-red-500/20 rounded-lg shrink-0">
            <FaExclamationTriangle className="text-red-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-red-400 mb-2">The Challenge</h4>
            <p className="text-sm text-white/70 leading-relaxed">
              {caseStudy.problem.length > 200 && !isExpanded
                ? `${caseStudy.problem.slice(0, 200)}...`
                : caseStudy.problem}
            </p>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Solution Section */}
            <div className="px-6 py-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
                  <FaLightbulb className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">The Solution</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="px-6 py-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg shrink-0">
                  <FaChartLine className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2">Key Results</h4>
                  <ul className="space-y-2">
                    {caseStudy.results.slice(0, 4).map((result, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Highlights */}
            {caseStudy.technicalHighlights && caseStudy.technicalHighlights.length > 0 && (
              <div className="px-6 py-4 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg shrink-0">
                    <FaCode className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Technical Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.technicalHighlights.slice(0, 6).map((highlight, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-purple-500/10 border border-purple-500/30 rounded text-purple-300"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand/Collapse Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-3 border-t border-white/10 flex items-center justify-center gap-2 text-sm text-secondary-default/80 hover:text-secondary-default hover:bg-white/5 transition-all"
      >
        {isExpanded ? (
          <>
            <span>Show Less</span>
            <FaChevronUp className="text-xs" />
          </>
        ) : (
          <>
            <span>View Full Case Study</span>
            <FaChevronDown className="text-xs" />
          </>
        )}
      </button>
    </motion.div>
  );
};

export default CaseStudyCard;
