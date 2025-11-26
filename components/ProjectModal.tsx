"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaGithub,
  FaExternalLinkAlt,
  FaBuilding,
  FaCode,
  FaCheckCircle,
  FaInfoCircle,
  FaQuoteLeft,
  FaTrophy,
  FaLightbulb,
  FaBriefcase,
  FaChartLine,
} from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Project } from "@/data/portfolioData";
import { useState, useEffect, useRef, useId } from "react";
import ProjectPerformanceMetrics from "@/components/ProjectPerformanceMetrics";

// Lazy load MermaidDiagram - large dependency (~500KB)
const MermaidDiagram = dynamic(() => import("@/components/MermaidDiagram"), {
  loading: () => (
    <div className="flex items-center justify-center h-48 bg-white/5 rounded-lg">
      <div className="text-white/40 text-sm">Loading diagram...</div>
    </div>
  ),
  ssr: false,
});
import { getPrimaryMetric } from "@/utils/projectHelpers";
import {
  CategoryBadge,
  OpenSourceBadge,
  StatusBadge,
  FeaturedBadge,
  PrimaryMetricBadge,
  BadgeSeparator,
  SectionHeader,
  TechStack,
  SkillsList,
  CompanyIcon,
} from "@/components/project";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}


const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "case-study" | "architecture">("overview");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalTitleId = useId();
  const tabPanelId = useId();

  // Focus management - focus close button when modal opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

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

  // Get primary metric using centralized utility
  const primaryMetric = getPrimaryMetric(project);

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
          aria-hidden="true"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
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
              {/* Single Line: Title + Badges + Close */}
              <div className="flex items-center justify-between gap-3 mb-2 flex-wrap min-h-[28px]">
                {/* Left: #num | Company | Title */}
                <h2 id={modalTitleId} className="text-base xl:text-lg font-bold flex items-center gap-2 flex-shrink-0">
                  <span className="text-secondary-default text-sm leading-none" aria-hidden="true">#{project.num}</span>
                  
                  {project.associatedWithCompany && (
                    <>
                      <span className="text-white/30 text-xs leading-none">|</span>
                      <div className="flex items-center gap-1.5">
                        <CompanyIcon company={project.associatedWithCompany} />
                        <span className="text-sm font-medium text-white/80 leading-none">
                          {project.associatedWithCompany}
                        </span>
                      </div>
                    </>
                  )}
                  
                  <span className="text-white/30 text-xs leading-none">|</span>
                  <span className={`leading-none ${
                    project.isFeatured
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-[#00BFFF] to-emerald-400 bg-clip-text text-transparent'
                  }`}>
                    {project.title}
                  </span>
                </h2>

                {/* Right: Badges + Close Button */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <CategoryBadge category={project.category} />

                  <BadgeSeparator />

                  {project.isOpenSource && (
                    <>
                      <OpenSourceBadge variant="icon" />
                      <BadgeSeparator />
                    </>
                  )}

                  {project.isFeatured && (
                    <>
                      <FeaturedBadge variant="text" />
                      <BadgeSeparator />
                    </>
                  )}

                  <StatusBadge
                    isActive={project.isActive}
                    inactivationReason={project.inactivationReason}
                  />

                  {/* Close Button */}
                  <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 transition-all duration-200 rounded-lg flex-shrink-0 ml-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f]"
                    aria-label="Close project details (Press Escape)"
                  >
                    <FaTimes className="text-sm" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Subtitle - Second Row */}
              {project.subtitle && (
                <p className="text-sm font-medium text-[#00BFFF] leading-relaxed mb-2">
                  {project.subtitle}
                </p>
              )}

              {/* Tab Buttons Row + Action Buttons */}
              <div className="flex items-center justify-between gap-3 mt-2 pt-2 border-t border-white/5 min-h-[32px]">
                {/* Left: Tab Buttons */}
                <div className="flex items-center gap-2" role="tablist" aria-label="Project details tabs">
                  <button
                    role="tab"
                    aria-selected={activeTab === "overview"}
                    aria-controls={`${tabPanelId}-overview`}
                    onClick={() => setActiveTab("overview")}
                    className={`h-8 px-3 rounded-md text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-default/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f] ${
                      activeTab === "overview"
                        ? "bg-secondary-default/20 border border-secondary-default/50 text-secondary-default"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <FaInfoCircle className="text-xs flex-shrink-0" aria-hidden="true" />
                      <span className="leading-none">Overview</span>
                    </span>
                  </button>
                  {hasCaseStudy && (
                    <button
                      role="tab"
                      aria-selected={activeTab === "case-study"}
                      aria-controls={`${tabPanelId}-case-study`}
                      onClick={() => setActiveTab("case-study")}
                      className={`h-8 px-3 rounded-md text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f] ${
                        activeTab === "case-study"
                          ? "bg-purple-500/20 border border-purple-500/50 text-purple-300"
                          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <FaLightbulb className="text-xs flex-shrink-0" aria-hidden="true" />
                        <span className="leading-none">Case Study</span>
                      </span>
                    </button>
                  )}
                  {hasArchitecture && (
                    <button
                      role="tab"
                      aria-selected={activeTab === "architecture"}
                      aria-controls={`${tabPanelId}-architecture`}
                      onClick={() => setActiveTab("architecture")}
                      className={`h-8 px-3 rounded-md text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f] ${
                        activeTab === "architecture"
                          ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300"
                          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <FiLayers className="text-xs flex-shrink-0" aria-hidden="true" />
                        <span className="leading-none">Architecture</span>
                      </span>
                    </button>
                  )}
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-2">
                  {project.url && project.url.trim() !== "" && (
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 flex items-center gap-1.5 bg-gradient-to-r from-secondary-default to-blue-500 text-white px-3 rounded-md text-xs font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:ring-offset-2 focus:ring-offset-[#1a1a1f]"
                    >
                      <FaExternalLinkAlt className="text-[10px] flex-shrink-0" />
                      <span className="leading-none">View Live</span>
                    </Link>
                  )}
                  {project.github && project.github.trim() !== "" && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-white px-3 rounded-md text-xs font-bold transition-all duration-200 border border-white/20 hover:border-secondary-default/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#1a1a1f]"
                    >
                      <FaGithub className="text-[10px] flex-shrink-0" />
                      <span className="leading-none">View Code</span>
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

                  {/* Primary Metric Badge - Bottom Left of Image */}
                  {primaryMetric && (
                    <div className="absolute bottom-3 left-3">
                      <PrimaryMetricBadge metric={primaryMetric} variant="modal" />
                    </div>
                  )}
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                  <div id={`${tabPanelId}-overview`} role="tabpanel" aria-labelledby="tab-overview" className="space-y-5">
                      {/* Description Section */}
                      <div>
                        <SectionHeader icon={FaInfoCircle} title="Project Overview" />
                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                          <p className="text-white/70 leading-relaxed text-sm">
                            {project.longDescription || project.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Key Skills Section */}
                      {project.skillsHighlighted && project.skillsHighlighted.length > 0 && (
                        <div>
                          <SectionHeader icon={FaCode} title="Key Skills" />
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="flex flex-wrap gap-2">
                              {project.skillsHighlighted.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="text-sm px-3 py-1.5 rounded-md bg-[#00BFFF]/10 border border-[#00BFFF]/30 text-[#00BFFF]/90 hover:bg-[#00BFFF]/20 transition-colors cursor-default"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Responsibilities Section - If exists */}
                      {project.responsibilities && project.responsibilities.length > 0 && (
                        <div>
                          <SectionHeader icon={FaBriefcase} title="Key Responsibilities & Achievements" />
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

                      {/* Metrics Display - If exists */}
                      {project.metrics && (
                        <div>
                          <SectionHeader icon={FaChartLine} title="Impact & Metrics" />
                          <div className="origin-top-left">
                            <ProjectPerformanceMetrics metrics={project.metrics} />
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      <TechStack
                        stacks={project.stacks}
                        columns={3}
                        expandable={false}
                        title="Technology Stack"
                      />

                      {/* Testimonials - If exists and approved */}
                      {project.testimonials && project.testimonials.filter(t => t.approved !== false).length > 0 && (
                        <div>
                          <SectionHeader icon={FaQuoteLeft} title="Testimonials" />
                          <div className="space-y-3">
                            {project.testimonials.filter(t => t.approved !== false).map((testimonial, idx) => (
                              <div
                                key={idx}
                                className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4 relative"
                              >
                                <FaQuoteLeft className="text-purple-400/30 text-2xl absolute top-3 right-3" />
                                <p className="text-sm font-medium text-white/90 leading-relaxed mb-3 relative z-10 italic">
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

                      {/* Recognition/Accolades - If exists and approved */}
                      {project.recognition && project.recognition.filter(r => r.approved !== false).length > 0 && (
                        <div>
                          <SectionHeader icon={FaTrophy} title="Accolades" />
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
                  <div id={`${tabPanelId}-case-study`} role="tabpanel" aria-labelledby="tab-case-study" className="space-y-8">
                    {/* Problem Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                          <FaInfoCircle className="text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">The Problem</h3>
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
                        <h3 className="text-xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">The Solution</h3>
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
                        <h3 className="text-xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">The Results</h3>
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
                  <div id={`${tabPanelId}-architecture`} role="tabpanel" aria-labelledby="tab-architecture" className="space-y-8">
                    {/* Architecture Diagram Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <FiLayers className="text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">Architecture Flow</h3>
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
