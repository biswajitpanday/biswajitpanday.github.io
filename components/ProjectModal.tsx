"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCalendar, FaBuilding, FaCodeBranch, FaCode, FaCheckCircle, FaInfoCircle, FaStar } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/portfolioData";

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

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
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
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl border border-secondary-default/30 rounded-2xl w-full max-w-5xl max-h-[calc(100vh-160px)] overflow-hidden shadow-2xl shadow-secondary-default/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Modal Header */}
            <div className="relative p-6 border-b border-secondary-default/20 bg-gradient-to-r from-secondary-default/10 via-transparent to-secondary-default/10">
              {/* Project Number Badge */}
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 bg-secondary-default/20 backdrop-blur-sm border border-secondary-default/40 rounded-full px-3 py-1">
                  <FaCheckCircle className="text-secondary-default text-xs" />
                  <span className="text-secondary-default font-bold text-sm">#{project.num}</span>
                </div>
              </div>

              {/* Close Button - Enhanced */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 text-white/60 hover:text-white bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 transition-all duration-200 rounded-full"
                aria-label="Close modal"
              >
                <FaTimes className="text-lg" />
              </button>

              {/* Title and Badges */}
              <div className="mt-8">
                <h2 className="text-xl xl:text-2xl font-bold text-white mb-4 pr-12">
                  {project.title}
                </h2>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Category Badge */}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r ${categoryStyle}`}>
                    <FiLayers className="text-sm" />
                    {project.category}
                  </span>

                  {/* Status Badge */}
                  {project.isActive ? (
                    <span className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-300 text-xs font-medium px-3 py-1.5 rounded-full border border-green-500/40">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Active Project
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
                      <div className="w-2 h-2 rounded-full bg-white/50" />
                      Completed
                    </span>
                  )}

                  {/* Open Source Badge */}
                  {project.isOpenSource && (
                    <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full border border-blue-500/40">
                      <FaCodeBranch />
                      Open Source
                    </span>
                  )}

                  {/* Featured Badge */}
                  {project.isFeatured && (
                    <span className="inline-flex items-center gap-1.5 bg-yellow-500/20 text-yellow-300 text-xs font-medium px-3 py-1.5 rounded-full border border-yellow-500/40">
                      <FaStar />
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(100vh-300px)] custom-scrollbar">
              <div className="p-6 pb-8">
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

                {/* Project Info Grid - Enhanced Layout */}
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
                      <div className="mb-4">
                        <p className="text-white/60 text-sm mb-3 font-medium">Key Technologies</p>
                        <div className="flex flex-wrap gap-2">
                          {keyTechnologies.map((tech, index) => (
                            <span
                              key={index}
                              className="bg-gradient-to-r from-secondary-default/20 to-blue-500/20 text-secondary-default border border-secondary-default/40 px-4 py-2 rounded-lg text-sm font-medium hover:from-secondary-default/30 hover:to-blue-500/30 hover:scale-105 transition-all duration-200 shadow-sm"
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
                          <div className="flex flex-wrap gap-2">
                            {otherTechnologies.map((tech, index) => (
                              <span
                                key={index}
                                className="bg-white/5 text-white/80 border border-white/20 px-3 py-1.5 rounded-lg text-sm hover:bg-white/10 hover:border-white/30 transition-all duration-200"
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

                    {/* Action Buttons - Compact */}
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
