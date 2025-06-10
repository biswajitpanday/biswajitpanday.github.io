"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCalendar, FaBuilding, FaCodeBranch, FaCode } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const start = startDate.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-secondary-default/20 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-lg shadow-secondary-default/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary-default/20 bg-secondary-default/5">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                <div className="flex items-center gap-2">
                  {project.isActive ? (
                    <span className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full border border-green-500/30">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-500/20 text-red-300 text-xs px-3 py-1 rounded-full border border-red-500/30">
                      Inactive
                    </span>
                  )}
                  {project.isOpenSource && (
                    <span className="bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-500/30">
                      <FaCodeBranch className="inline mr-1" />
                      Open Source
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/40 hover:text-secondary-default transition-colors rounded-full hover:bg-white/10"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] scrollbar-thin scrollbar-thumb-secondary-default/30 scrollbar-track-gray-800/30">
              <div className="p-6">
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg mb-6 bg-gray-800/50 border border-secondary-default/10">
                  <div className="relative w-full h-64">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
                </div>

                {/* Project Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-default mb-3">Project Description</h3>
                      <p className="text-white/80 leading-relaxed">
                        {project.longDescription || project.shortDescription}
                      </p>
                      {project.inactivationReason && (
                        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded">
                          <p className="text-red-300 text-sm">
                            <strong>Note:</strong> {project.inactivationReason}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-default mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.stacks.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-secondary-default/10 text-secondary-default border border-secondary-default/30 px-3 py-1 rounded-full text-sm hover:bg-secondary-default/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-6">
                    {/* Project Details */}
                    <div className="bg-gray-800/50 border border-secondary-default/20 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-secondary-default mb-4">Project Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <FaBuilding className="text-secondary-default" />
                          <div>
                            <p className="text-xs text-white/60">Company</p>
                            <p className="text-white font-medium">
                              {project.associatedWithCompany || "Individual"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <FaCalendar className="text-secondary-default" />
                          <div>
                            <p className="text-xs text-white/60">Duration</p>
                            <p className="text-white font-medium text-sm">
                              {formatDateRange(project.startDate, project.endDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-blue-400">
                            <FaCodeBranch />
                          </div>
                          <div>
                            <p className="text-xs text-white/60">Category</p>
                            <p className="text-white font-medium">{project.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-purple-400">
                            <FaCode />
                          </div>
                          <div>
                            <p className="text-xs text-white/60">Role</p>
                            <p className="text-white font-medium">{project.jobRole}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {project.url && (
                        <Link
                          href={project.url}
                          target="_blank"
                          className="flex items-center justify-center gap-2 w-full bg-secondary-default hover:bg-secondary-default/80 text-primary px-4 py-3 rounded-lg transition-all duration-300 font-medium shadow-md shadow-secondary-default/10"
                        >
                          <FaExternalLinkAlt />
                          <span>
                            {project.category?.toLowerCase().includes('website') || 
                             project.title?.toLowerCase().includes('website') ||
                             project.shortDescription?.toLowerCase().includes('website') ||
                             project.associatedWithCompany ? 
                             'Visit Website' : 
                             project.category?.toLowerCase().includes('app') ? 
                             'View Application' : 
                             'View Live Project'}
                          </span>
                        </Link>
                      )}
                      {project.github && project.github.trim() !== "" && (
                        <Link
                          href={project.github}
                          target="_blank"
                          className="flex items-center justify-center gap-2 w-full bg-gray-800/70 hover:bg-gray-800 text-white border border-secondary-default/20 hover:border-secondary-default/40 px-4 py-3 rounded-lg transition-all duration-300 font-medium"
                        >
                          <FaGithub />
                          <span>View Source Code</span>
                        </Link>
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