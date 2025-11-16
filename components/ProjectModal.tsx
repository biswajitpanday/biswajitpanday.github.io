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
} from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/portfolioData";
import { useState, useEffect } from "react";

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
  const [activeTab, setActiveTab] = useState<"overview" | "case-study">("overview");

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[var(--z-modal)] flex items-center justify-center p-4 pt-20 pb-8"
          style={{ zIndex: 'var(--z-modal)' }}
          onClick={onClose}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl border border-secondary-default/30 rounded-2xl w-full max-w-6xl max-h-[calc(100vh-160px)] overflow-hidden shadow-2xl shadow-secondary-default/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Compact Modal Header */}
            <div className="relative p-4 border-b border-secondary-default/20 bg-gradient-to-r from-secondary-default/10 via-transparent to-secondary-default/10 flex-shrink-0">
              {/* Compact Title Row: #N | Project Title || X Button */}
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg xl:text-xl font-bold text-white flex items-center gap-3 flex-1">
                  <span className="text-secondary-default text-base">#{project.num}</span>
                  <span className="text-white/30">|</span>
                  <span className="flex-1">{project.title}</span>
                </h2>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 transition-all duration-200 rounded-full flex-shrink-0"
                  aria-label="Close modal"
                >
                  <FaTimes className="text-base" />
                </button>
              </div>

              {/* Buttons (Left) and Tags (Right) Row */}
              <div className="flex items-center justify-between gap-4 mt-3 border-t border-white/5 pt-3">
                {/* Tab Buttons - Left Side (only if case study exists) */}
                {hasCaseStudy ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 overflow-hidden ${
                        activeTab === "overview"
                          ? "bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 border border-emerald-500/40 text-white shadow-lg shadow-emerald-500/20"
                          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <FaInfoCircle className="text-sm" />
                        Overview
                      </span>
                      {activeTab === "overview" && (
                        <>
                          <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 animate-pulse" />
                          <span className="absolute inset-0 rounded-lg blur-md bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-purple-500/30 opacity-50" />
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab("case-study")}
                      className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 overflow-hidden ${
                        activeTab === "case-study"
                          ? "bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 border border-purple-500/40 text-white shadow-lg shadow-purple-500/20"
                          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <FaLightbulb className="text-sm" />
                        Case Study
                      </span>
                      {activeTab === "case-study" && (
                        <>
                          <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 animate-pulse" />
                          <span className="absolute inset-0 rounded-lg blur-md bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-purple-500/30 opacity-50" />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}

                {/* Tags - Right Side - Subtle, non-interactive appearance */}
                <div className="flex flex-wrap items-center gap-2 justify-end">
                  {/* Category Tag */}
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-gradient-to-r ${categoryStyle} opacity-80`}>
                    <FiLayers className="text-xs" />
                    {project.category}
                  </span>

                  {/* Status Tag */}
                  {project.isActive ? (
                    <span className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-300 text-xs font-medium px-2.5 py-1 rounded-md border border-green-500/40 opacity-80">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/70 text-xs font-medium px-2.5 py-1 rounded-md border border-white/20 opacity-80">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                      Completed
                    </span>
                  )}

                  {/* Open Source Tag */}
                  {project.isOpenSource && (
                    <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-md border border-blue-500/40 opacity-80">
                      <FaCodeBranch className="text-xs" />
                      Open Source
                    </span>
                  )}

                  {/* Featured Tag */}
                  {project.isFeatured && (
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-purple-500/50 shadow-md shadow-purple-500/20">
                      <FaStar className="text-xs" />
                      Featured
                    </span>
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
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - 2/3 width */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Description Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <FaInfoCircle className="text-secondary-default" />
                          <h3 className="text-xl font-bold text-white">Project Overview</h3>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                          <p className="text-white/90 leading-relaxed text-base">
                            {project.longDescription || project.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Metrics Display - If exists */}
                      {project.metrics && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <FaChartLine className="text-secondary-default" />
                            <h3 className="text-xl font-bold text-white">Impact & Metrics</h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {Object.entries(project.metrics).map(([key, value]) => {
                              if (key === "other" && Array.isArray(value)) {
                                return value.map((item, idx) => {
                                  const Icon = FaCheckCircle;
                                  return (
                                    <div
                                      key={`other-${idx}`}
                                      className="bg-gradient-to-br from-secondary-default/10 to-blue-500/10 border border-secondary-default/30 rounded-lg p-4 flex items-start gap-3 hover:scale-105 transition-transform"
                                    >
                                      <Icon className="text-secondary-default text-lg mt-1 flex-shrink-0" />
                                      <div>
                                        <p className="text-white font-semibold text-sm">{item}</p>
                                      </div>
                                    </div>
                                  );
                                });
                              }
                              if (value && typeof value === "string") {
                                const Icon = getMetricIcon(key);
                                return (
                                  <div
                                    key={key}
                                    className="bg-gradient-to-br from-secondary-default/10 to-blue-500/10 border border-secondary-default/30 rounded-lg p-4 flex items-start gap-3 hover:scale-105 transition-transform"
                                  >
                                    <Icon className="text-secondary-default text-lg mt-1 flex-shrink-0" />
                                    <div>
                                      <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
                                        {key.replace(/_/g, ' ')}
                                      </p>
                                      <p className="text-white font-semibold">{value}</p>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      )}

                      {/* Testimonials - If exists and approved */}
                      {project.testimonials && project.testimonials.filter(t => t.approved !== false).length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <FaQuoteLeft className="text-secondary-default" />
                            <h3 className="text-xl font-bold text-white">Testimonials</h3>
                          </div>
                          <div className="space-y-4">
                            {project.testimonials.filter(t => t.approved !== false).map((testimonial, idx) => (
                              <div
                                key={idx}
                                className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-5 relative"
                              >
                                <FaQuoteLeft className="text-purple-400/30 text-3xl absolute top-4 right-4" />
                                <p className="text-white/90 italic leading-relaxed mb-4 relative z-10">
                                  &ldquo;{testimonial.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-default to-blue-500 flex items-center justify-center text-white font-bold">
                                    {testimonial.author.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="text-white font-semibold text-sm">{testimonial.author}</p>
                                    <p className="text-white/60 text-xs">
                                      {testimonial.role}{testimonial.company ? ` at ${testimonial.company}` : ''}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recognition/Awards - If exists and approved */}
                      {project.recognition && project.recognition.filter(r => r.approved !== false).length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <FaTrophy className="text-secondary-default" />
                            <h3 className="text-xl font-bold text-white">Recognition & Awards</h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {project.recognition.filter(r => r.approved !== false).map((rec, idx) => (
                              <div
                                key={idx}
                                className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3"
                              >
                                <FaTrophy className="text-yellow-400 text-lg mt-1 flex-shrink-0" />
                                <div>
                                  <p className="text-white font-semibold text-sm mb-1">{rec.title}</p>
                                  <p className="text-white/70 text-xs">{rec.description}</p>
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

                      {/* Tech Stack - Enhanced with Key Technologies */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <FaCode className="text-secondary-default" />
                          <h3 className="text-xl font-bold text-white">Technology Stack</h3>
                        </div>

                        {/* Key Technologies */}
                        <div className="mb-6">
                          <p className="text-white/60 text-sm mb-3 font-medium">Key Technologies</p>
                          <div className="flex flex-wrap gap-2">
                            {keyTechnologies.map((tech, index) => (
                              <span
                                key={index}
                                className="bg-gradient-to-r from-secondary-default/20 to-blue-500/20 text-secondary-default border border-secondary-default/40 px-4 py-2 rounded-lg text-sm font-medium hover:from-secondary-default/30 hover:to-blue-500/30 hover:scale-105 transition-all duration-200 shadow-sm whitespace-nowrap"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Other Technologies */}
                        {otherTechnologies.length > 0 && (
                          <div>
                            <p className="text-white/60 text-sm mb-3 font-medium">Additional Technologies</p>
                            <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                              {otherTechnologies.map((tech, index) => (
                                <span
                                  key={index}
                                  className="bg-white/5 text-white/80 border border-white/20 px-3 py-1.5 rounded-lg text-sm hover:bg-white/10 hover:border-white/30 transition-all duration-200 whitespace-nowrap"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sidebar Info - 1/3 width */}
                    <div className="space-y-6">
                      {/* Sticky Container for Details + Buttons */}
                      <div className="sticky top-0 space-y-4">
                        {/* Project Details Card */}
                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-secondary-default/30 rounded-xl p-5 shadow-lg">
                          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <FaBuilding className="text-secondary-default" />
                            Project Details
                          </h3>
                          <div className="space-y-4">
                            {/* Company */}
                            <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                              <div className="p-2 bg-secondary-default/10 rounded-lg">
                                <FaBuilding className="text-secondary-default text-sm" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs text-white/50 font-medium uppercase tracking-wide mb-1">Company</p>
                                <p className="text-white font-semibold">
                                  {project.associatedWithCompany || "Individual Project"}
                                </p>
                              </div>
                            </div>

                            {/* Duration */}
                            <div className="flex items-start gap-3 pb-4 border-b border-white/10">
                              <div className="p-2 bg-blue-500/10 rounded-lg">
                                <FaCalendar className="text-blue-400 text-sm" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs text-white/50 font-medium uppercase tracking-wide mb-1">Duration</p>
                                <p className="text-white font-semibold text-sm">
                                  {formatDateRange(project.startDate, project.endDate)}
                                </p>
                              </div>
                            </div>

                            {/* Role */}
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-purple-500/10 rounded-lg">
                                <FaCode className="text-purple-400 text-sm" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs text-white/50 font-medium uppercase tracking-wide mb-1">Role</p>
                                <p className="text-white font-semibold">{project.jobRole}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons - Fixed Below Details */}
                        <div className="space-y-2">
                          {project.url && project.url.trim() !== "" && (
                            <Link
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-secondary-default to-blue-500 hover:from-blue-500 hover:to-secondary-default text-white px-4 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm shadow-md shadow-secondary-default/20 hover:shadow-secondary-default/40 hover:scale-105"
                            >
                              <FaExternalLinkAlt className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              <span>View Live Project</span>
                            </Link>
                          )}
                          {project.github && project.github.trim() !== "" && (
                            <Link
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-center gap-2 w-full bg-gray-800/70 hover:bg-gray-800 text-white border-2 border-secondary-default/30 hover:border-secondary-default/60 px-4 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm hover:scale-105"
                            >
                              <FaGithub className="text-base group-hover:rotate-12 transition-transform" />
                              <span>View Source Code</span>
                            </Link>
                          )}

                          {/* If no links available */}
                          {(!project.url || project.url.trim() === "") && (!project.github || project.github.trim() === "") && (
                            <div className="text-center p-3 bg-white/5 border border-white/10 rounded-lg">
                              <p className="text-white/50 text-xs">No public links available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
