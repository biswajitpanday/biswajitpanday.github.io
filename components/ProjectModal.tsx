"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaGithub,
  FaExternalLinkAlt,
  FaCalendar,
  FaBuilding,
  FaCodeBranch,
  FaCode,
  FaCheckCircle,
  FaInfoCircle,
  FaStar,
  FaQuoteLeft,
  FaTrophy,
  FaRocket,
  FaUsers,
  FaChartLine,
  FaLightbulb,
  FaDownload,
  FaBriefcase,
} from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/portfolioData";
import { useState, useEffect } from "react";
import MermaidDiagram from "@/components/MermaidDiagram";
import ProjectPerformanceMetrics from "@/components/ProjectPerformanceMetrics";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

// Category color mapping
const categoryColors = {
  "Full-Stack": "from-purple-500/20 to-blue-500/20 border-purple-500/30 text-purple-300",
  "Frontend": "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300",
  "Backend": "from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-300",
  "Mobile": "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300",
  "Windows App": "from-cyan-500/20 to-teal-500/20 border-cyan-500/30 text-cyan-300",
};

// Metric icon mapping
const getMetricIcon = (key: string) => {
  switch (key) {
    case "efficiency": return FaRocket;
    case "users": return FaUsers;
    case "performance": return FaChartLine;
    case "revenue": return FaChartLine;
    case "downloads": return FaDownload;
    case "github_stars": return FaStar;
    default: return FaCheckCircle;
  }
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "case-study" | "architecture">("overview");

  // Deep linking support - update URL when modal opens
  useEffect(() => {
    if (isOpen && project) {
      const params = new URLSearchParams(window.location.search);
      params.set('project', project.num.toString());
      window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    } else if (!isOpen) {
      // Remove project param when closing
      const params = new URLSearchParams(window.location.search);
      params.delete('project');
      const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
      window.history.pushState({}, '', newUrl);
    }
  }, [isOpen, project]);

  if (!project) return null;

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const start = startDate.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });

    // Check if endDate is current date (ongoing project)
    const now = new Date();
    const isOngoing = Math.abs(endDate.getTime() - now.getTime()) < 24 * 60 * 60 * 1000; // Within 24 hours

    if (isOngoing) {
      return `${start} - Present`;
    }

    const end = endDate.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
    return `${start} - ${end}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Get category styling
  const categoryStyle = categoryColors[project.category] || categoryColors["Full-Stack"];

  // Split technologies into key and other
  const keyTechnologies = project.stacks.slice(0, 6);
  const otherTechnologies = project.stacks.slice(6);

  // Check if has case study
  const hasCaseStudy = project.caseStudy !== undefined;

  // Check if has architecture diagram
  const hasArchitecture = project.caseStudy?.architectureDiagram !== undefined;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[150] flex items-center justify-center p-4 pt-20 pb-8"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
            className={`backdrop-blur-xl rounded-2xl w-full max-w-6xl max-h-[calc(100vh-160px)] overflow-hidden shadow-2xl flex flex-col ${
              project.isFeatured
                ? "bg-gradient-to-br from-purple-900/30 via-gray-900/95 to-blue-900/30 border border-purple-500/30 shadow-purple-500/20"
                : "bg-gradient-to-br from-gray-900/95 to-gray-950/95 border border-secondary-default/30 shadow-secondary-default/20"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ultra-Compact Modal Header */}
            <div className="relative px-4 py-3 border-b border-secondary-default/20 bg-gradient-to-r from-secondary-default/5 via-transparent to-secondary-default/5 flex-shrink-0">
              {/* Single Row: Title + Badges (right-aligned) + Close Button */}
              <div className="flex items-center justify-between gap-3">
                {/* Left: Title */}
                <h2 className="text-base xl:text-lg font-bold text-white flex items-center gap-2 flex-shrink-0">
                  <span className="text-secondary-default text-sm">#{project.num}</span>
                  <span className="text-white/30 text-xs">|</span>
                  <span>{project.title}</span>
                </h2>

                {/* Right: Badges + Close Button */}
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {/* Company Badge - Subtle with @ prefix */}
                  {project.associatedWithCompany && (
                    <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-gray-800/50 border border-white/20 text-white/90 font-medium">
                      <FaBuilding className="text-[10px] text-white/50" />
                      <span className="text-white/50">@</span>
                      <span>{project.associatedWithCompany}</span>
                    </span>
                  )}

                  {/* Category Badge */}
                  <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-bold uppercase tracking-wide bg-gradient-to-r shadow-sm border ${
                    project.category === "Full-Stack" ? "from-emerald-500/20 to-cyan-500/20 border-emerald-500/40 text-emerald-300" :
                    project.category === "Frontend" ? "from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-300" :
                    project.category === "Backend" ? "from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-300" :
                    project.category === "Mobile" ? "from-orange-500/20 to-red-500/20 border-orange-500/40 text-orange-300" :
                    project.category === "Windows App" ? "from-yellow-500/20 to-orange-500/20 border-yellow-500/40 text-yellow-300" :
                    "from-gray-500/20 to-gray-600/20 border-gray-500/40 text-gray-300"
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {project.category}
                  </span>

                  {/* Divider */}
                  <span className="text-white/30 text-xs">|</span>

                  {/* Open Source Badge */}
                  {project.isOpenSource && (
                    <>
                      <span className="inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md bg-gradient-to-r from-green-500/25 to-emerald-500/25 border border-green-500/50 text-green-200 font-semibold">
                        <FaCodeBranch className="text-[9px]" />
                        <span>Open Source</span>
                      </span>
                      <span className="text-white/30 text-xs">|</span>
                    </>
                  )}

                  {/* Featured Badge */}
                  {project.isFeatured && (
                    <>
                      <span className="inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md bg-gradient-to-r from-purple-500/25 to-pink-500/25 border border-purple-500/50 text-purple-200 font-semibold">
                        <FaStar className="text-[9px]" />
                        <span>Featured</span>
                      </span>
                      <span className="text-white/30 text-xs">|</span>
                    </>
                  )}

                  {/* Status Badge */}
                  {project.isActive ? (
                    <span className="inline-flex items-center gap-1 bg-green-500/90 text-white text-[10px] font-medium px-2 py-1 rounded-full">
                      <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-red-500/90 text-white text-[10px] font-medium px-2 py-1 rounded-full">
                      Completed
                    </span>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="p-1.5 text-white/60 hover:text-white bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 transition-all duration-200 rounded-lg flex-shrink-0 ml-1"
                    aria-label="Close modal"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Tab Buttons Row + Action Buttons */}
              <div className="flex items-center justify-between gap-3 mt-2 pt-2 border-t border-white/5">
                {/* Left: Tab Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                      activeTab === "overview"
                        ? "bg-secondary-default/20 border border-secondary-default/50 text-secondary-default"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <FaInfoCircle className="text-xs" />
                      Overview
                    </span>
                  </button>
                  {hasCaseStudy && (
                    <button
                      onClick={() => setActiveTab("case-study")}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                        activeTab === "case-study"
                          ? "bg-purple-500/20 border border-purple-500/50 text-purple-300"
                          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <FaLightbulb className="text-xs" />
                        Case Study
                      </span>
                    </button>
                  )}
                  {hasArchitecture && (
                    <button
                      onClick={() => setActiveTab("architecture")}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                        activeTab === "architecture"
                          ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300"
                          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <FiLayers className="text-xs" />
                        Architecture
                      </span>
                    </button>
                  )}
                </div>

                {/* Right: Action Buttons */}
                <div className="flex gap-2">
                  {project.url && project.url.trim() !== "" && (
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-gradient-to-r from-secondary-default to-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-bold hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      <FaExternalLinkAlt className="text-[10px]" />
                      View Live
                    </Link>
                  )}
                  {project.github && project.github.trim() !== "" && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 border border-white/20 hover:border-secondary-default/50"
                    >
                      <FaGithub className="text-[10px]" />
                      View Code
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              <div className="p-6 pb-6">
                {/* Project Image - Enhanced */}
                <div className="relative overflow-hidden rounded-xl mb-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-secondary-default/20 shadow-lg">
                  <div className="relative w-full h-64 md:h-80 lg:h-96">
                    <Image
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      fill
                      className="object-contain rounded-xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl pointer-events-none" />
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                  <div className="space-y-5">
                      {/* Project Details Bar - Compact Info */}
                      <div className="bg-gradient-to-r from-secondary-default/10 via-purple-500/5 to-blue-500/10 border border-secondary-default/20 rounded-lg p-3">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center text-xs">
                          {/* Company */}
                          <div className="flex items-center gap-1.5">
                            <FaBuilding className="text-secondary-default text-xs" />
                            <span className="text-white/50 font-medium">Company:</span>
                            <span className="text-white font-semibold">
                              {project.associatedWithCompany || "Individual Project"}
                            </span>
                          </div>
                          
                          <span className="text-white/20">|</span>
                          
                          {/* Duration */}
                          <div className="flex items-center gap-1.5">
                            <FaCalendar className="text-blue-400 text-xs" />
                            <span className="text-white/50 font-medium">Duration:</span>
                            <span className="text-white font-semibold text-xs">
                              {formatDateRange(project.startDate, project.endDate)}
                            </span>
                          </div>
                          
                          <span className="text-white/20">|</span>
                          
                          {/* Role */}
                          <div className="flex items-center gap-1.5">
                            <FaCode className="text-purple-400 text-xs" />
                            <span className="text-white/50 font-medium">Role:</span>
                            <span className="text-white font-semibold">{project.jobRole}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FaInfoCircle className="text-secondary-default text-sm" />
                          <h3 className="text-lg font-bold text-white">Project Overview</h3>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                          <p className="text-white/70 leading-relaxed text-sm">
                            {project.longDescription || project.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Responsibilities Section - If exists */}
                      {project.responsibilities && project.responsibilities.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <FaBriefcase className="text-secondary-default text-sm" />
                            <h3 className="text-lg font-bold text-white">Key Responsibilities & Achievements</h3>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <ul className="space-y-2.5">
                              {project.responsibilities.map((responsibility, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2.5 text-white/80 leading-relaxed text-sm"
                                >
                                  <span className="text-secondary-default mt-1 flex-shrink-0 text-xs">▸</span>
                                  <span>{responsibility}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Metrics Display - If exists - Much More Compact */}
                      {project.metrics && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <FaChartLine className="text-secondary-default text-xs" />
                            <h3 className="text-sm font-bold text-white">Impact & Metrics</h3>
                          </div>
                          <div className="scale-90 origin-top-left -ml-2">
                            <ProjectPerformanceMetrics metrics={project.metrics} />
                          </div>
                        </div>
                      )}

                      {/* Tech Stack - Matching Timeline Card Style (List Format) */}
                      <div className="bg-gradient-to-br from-secondary-default/5 via-purple-500/5 to-blue-500/5 rounded-lg p-4 border border-white/10">
                        <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide flex items-center gap-2">
                          <FaCode className="text-secondary-default text-sm" />
                          <span className="w-1 h-1 rounded-full bg-secondary-default"></span>
                          Technology Stack
                        </h4>
                        
                        {/* Grid List Format - Like Timeline Card */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5">
                          {[...keyTechnologies, ...otherTechnologies].map((tech, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-xs text-white/80"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                index < keyTechnologies.length 
                                  ? 'bg-secondary-default' 
                                  : 'bg-secondary-default/40'
                              }`}></span>
                              <span className="truncate">{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Testimonials - If exists and approved */}
                      {project.testimonials && project.testimonials.filter(t => t.approved !== false).length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <FaQuoteLeft className="text-secondary-default text-sm" />
                            <h3 className="text-lg font-bold text-white">Testimonials</h3>
                          </div>
                          <div className="space-y-3">
                            {project.testimonials.filter(t => t.approved !== false).map((testimonial, idx) => (
                              <div
                                key={idx}
                                className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4 relative"
                              >
                                <FaQuoteLeft className="text-purple-400/30 text-2xl absolute top-3 right-3" />
                                <p className="text-sm font-medium bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-relaxed mb-3 relative z-10 italic">
                                  &ldquo;{testimonial.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-default to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                                    {testimonial.author.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="text-white font-semibold text-xs">{testimonial.author}</p>
                                    <p className="text-white/60 text-[10px]">
                                      {testimonial.role}{testimonial.company ? ` at ${testimonial.company}` : ''}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Inactivation Reason - If exists (now positive message) */}
                      {project.inactivationReason && !project.isActive && (
                        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-5">
                          <div className="flex items-start gap-3">
                            <FaCheckCircle className="text-blue-400 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-blue-300 font-semibold mb-1">Project Status</p>
                              <p className="text-blue-200/90 text-sm leading-relaxed">
                                {project.inactivationReason}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Recognition/Awards - If exists and approved */}
                      {project.recognition && project.recognition.filter(r => r.approved !== false).length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <FaTrophy className="text-secondary-default text-sm" />
                            <h3 className="text-lg font-bold text-white">Recognition & Awards</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {project.recognition.filter(r => r.approved !== false).map((rec, idx) => (
                              <div
                                key={idx}
                                className="bg-gradient-to-br from-purple-500/15 via-emerald-500/15 to-secondary-default/15 border border-purple-500/40 rounded-lg p-3 flex items-start gap-2.5"
                              >
                                <FaTrophy className="text-purple-400 text-sm mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-white font-semibold text-xs mb-0.5">{rec.title}</p>
                                  <p className="text-white/70 text-[10px] leading-relaxed">{rec.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}

                {/* Case Study Tab */}
                {activeTab === "case-study" && project.caseStudy && (
                  <div className="space-y-8">
                    {/* Problem Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                          <FaInfoCircle className="text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">The Problem</h3>
                      </div>
                      <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
                        <p className="text-white/90 leading-relaxed">{project.caseStudy.problem}</p>
                      </div>
                    </div>

                    {/* Solution Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <FaLightbulb className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">The Solution</h3>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
                        <p className="text-white/90 leading-relaxed mb-4">{project.caseStudy.solution}</p>

                        {/* Technical Highlights */}
                        {project.caseStudy.technicalHighlights && project.caseStudy.technicalHighlights.length > 0 && (
                          <div className="mt-6">
                            <p className="text-white/80 font-semibold mb-3 text-sm">Technical Highlights:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {project.caseStudy.technicalHighlights.map((highlight, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <FaCheckCircle className="text-blue-400 mt-0.5 flex-shrink-0 text-sm" />
                                  <span className="text-white/80 text-sm">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Results Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <FaChartLine className="text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">The Results</h3>
                      </div>
                      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
                        <div className="grid grid-cols-1 gap-3">
                          {project.caseStudy.results.map((result, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-white/5 rounded-lg p-3">
                              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <FaCheckCircle className="text-green-400 text-sm" />
                              </div>
                              <p className="text-white/90 leading-relaxed flex-1">{result}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Architecture Tab */}
                {activeTab === "architecture" && project.caseStudy?.architectureDiagram && (
                  <div className="space-y-8">
                    {/* Architecture Diagram Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <FiLayers className="text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Architecture Flow</h3>
                      </div>
                      <MermaidDiagram chart={project.caseStudy.architectureDiagram} />
                    </div>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
