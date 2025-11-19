"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaBuilding, FaCode, FaStar, FaClock, FaExternalLinkAlt, FaGithub, FaCodeBranch, FaTrophy, FaRocket } from "react-icons/fa";
import { projects, Project } from "@/data/portfolioData";
import Image from "next/image";
import Link from "next/link";
import { getPrimaryMetric, getMetricBadgeClassesLight } from "@/utils/projectHelpers";
import { getCategoryColor, getCompanyLogo } from "@/constants/projectConstants";
import {
  STATUS_BADGE_CLASSES,
  FEATURED_BADGE_CLASSES,
  OPEN_SOURCE_BADGE_CLASSES,
  RECOGNITION_BADGE_CLASSES,
  PRIMARY_METRIC_BADGE_CLASSES,
  CATEGORY_BADGE_CLASSES,
  COMPANY_BADGE_CLASSES,
} from "@/constants/badgeSizes";

interface TimelineProject extends Project {
  durationMonths: number;
  yearRange: string;
}

interface ProjectTimelineProps {
  selectedTech?: string | null;
  onOpenModal?: (project: Project) => void;
}

export default function ProjectTimeline({ selectedTech, onOpenModal }: ProjectTimelineProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());

  // Toggle project stacks display
  const toggleProjectStacks = (projectNum: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectNum)) {
      newExpanded.delete(projectNum);
    } else {
      newExpanded.add(projectNum);
    }
    setExpandedProjects(newExpanded);
  };

  // Toggle description expansion
  const toggleDescription = (projectNum: number) => {
    const newExpanded = new Set(expandedDescriptions);
    if (newExpanded.has(projectNum)) {
      newExpanded.delete(projectNum);
    } else {
      newExpanded.add(projectNum);
    }
    setExpandedDescriptions(newExpanded);
  };

  // Process projects for timeline
  const timelineProjects = useMemo(() => {
    return projects.map((project) => {
      const durationMonths = Math.round(
        (project.endDate.getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
      );
      const startYear = project.startDate.getFullYear();
      const endYear = project.endDate.getFullYear();
      const yearRange = startYear === endYear ? `${startYear}` : `${startYear} - ${endYear}`;

      return {
        ...project,
        durationMonths,
        yearRange,
      };
    }).sort((a, b) => b.startDate.getTime() - a.startDate.getTime()); // Most recent first
  }, []);

  // Filter projects based on selected technology
  const filteredProjects = useMemo(() => {
    if (!selectedTech) return timelineProjects;
    return timelineProjects.filter((p) => p.stacks.includes(selectedTech));
  }, [timelineProjects, selectedTech]);

  // Calculate statistics with proper duration calculation (non-overlapping)
  const stats = useMemo(() => {
    const activeCount = filteredProjects.filter((p) => p.isActive).length;
    const featuredCount = filteredProjects.filter((p) => p.isFeatured).length;
    const companiesCount = new Set(
      filteredProjects.map((p) => p.associatedWithCompany).filter(c => c !== "")
    ).size;

    // Calculate total duration by finding earliest start and latest end date
    if (filteredProjects.length === 0) {
      return { total: 0, totalYears: 0, activeCount: 0, featuredCount: 0, companiesCount: 0 };
    }

    const sortedByDate = [...filteredProjects].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const earliestStart = sortedByDate[0].startDate;
    const latestEnd = sortedByDate.reduce((latest, p) => 
      p.endDate.getTime() > latest.getTime() ? p.endDate : latest, 
      sortedByDate[0].endDate
    );
    
    const totalMonths = Math.round(
      (latestEnd.getTime() - earliestStart.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    const totalYears = Math.round(totalMonths / 12 * 10) / 10; // Round to 1 decimal

    return {
      total: filteredProjects.length,
      totalYears,
      activeCount,
      featuredCount,
      companiesCount,
    };
  }, [filteredProjects]);

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="space-y-6" data-testid="project-timeline">
      {/* Compact Statistics Bar - Matching header style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-lg p-4"
      >
        <div className="flex flex-wrap items-center justify-center gap-6">
          {/* Total Projects */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary-default/20 rounded-lg">
              <FaCode className="text-secondary-default text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-default to-blue-500 tabular-nums">{stats.total}</div>
              <div className="text-xs text-white/60">Total Projects</div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-white/10"></div>

          {/* Active Projects */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <FaRocket className="text-emerald-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 tabular-nums">{stats.activeCount}</div>
              <div className="text-xs text-white/60">Active</div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-white/10"></div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <FaStar className="text-purple-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tabular-nums">{stats.featuredCount}</div>
              <div className="text-xs text-white/60">Featured</div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-white/10"></div>

          {/* Companies */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FaBuilding className="text-blue-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 tabular-nums">{stats.companiesCount}</div>
              <div className="text-xs text-white/60">Companies</div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-white/10"></div>

          {/* Timeline Span */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <FaCalendar className="text-orange-400 text-xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 tabular-nums">{stats.totalYears}y</div>
              <div className="text-xs text-white/60">Timeline Span</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Summary */}
      {selectedTech && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-white/60">
            Showing {filteredProjects.length} of {timelineProjects.length} projects with <span className="text-secondary-default font-semibold">{selectedTech}</span>
          </p>
        </div>
      )}

      {/* Timeline View */}
      <div className="relative">
        {/* Timeline Line - Hidden on mobile, visible on md+ */}
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary-default via-blue-500 to-purple-500" />

        {/* Timeline Items */}
        <div className="space-y-6">
          {filteredProjects.map((project, index) => {
            const isFeatured = project.isFeatured === true;
            const primaryMetric = getPrimaryMetric(project);
            const isDescriptionExpanded = expandedDescriptions.has(project.num);

            return (
              <motion.div
                key={project.num}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative md:pl-20"
                data-testid={`timeline-project-${project.num}`}
              >
                {/* Timeline Dot - Hidden on mobile */}
                <div className="hidden md:block absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-secondary-default to-blue-500 border-4 border-[#1a1a1f] shadow-lg shadow-secondary-default/30" />

                {/* Project Card - Matching ProjectCard design */}
                <div
                  className={`group relative p-5 rounded-xl border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1 ${
                    isFeatured
                      ? 'bg-gradient-to-br from-purple-500/5 via-[#27272c] to-[#2a2a30] border-purple-500/30 shadow-md shadow-purple-500/10 hover:border-purple-500/50 hover:shadow-purple-500/20'
                      : 'bg-gradient-to-br from-[#27272c] to-[#2a2a30] border-secondary-default/20 hover:border-secondary-default/60 hover:shadow-secondary-default/20'
                  }`}
                >
                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute top-2 left-2 z-10">
                      <div className={`bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white flex items-center gap-1.5 shadow-lg shadow-purple-500/30 ${FEATURED_BADGE_CLASSES}`}>
                        <FaStar className="text-white text-xs" />
                        <span>Featured</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Project Image */}
                    <div className="relative w-full md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-secondary-default/10 to-transparent">
                      <Image
                        src={project.thumbImage || project.image}
                        alt={`${project.title} project screenshot`}
                        fill
                        className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 128px"
                      />
                    </div>

                    {/* Project Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-secondary-default transition-colors">
                            {project.title}
                          </h3>
                          {project.subtitle && (
                            <p className="text-sm font-medium bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-relaxed mb-2">
                              {project.subtitle}
                            </p>
                          )}

                           {/* Project Metadata - Restructured for Better Clarity */}
                           <div className="space-y-2 mb-2">
                             {/* Row 1: Category (Primary) + Company (if exists) */}
                             <div className="flex flex-wrap items-center gap-2">
                               {/* Category Badge - Large, Prominent with Icon-like styling */}
                               <span className={`inline-flex items-center gap-1.5 bg-gradient-to-r shadow-sm border ${CATEGORY_BADGE_CLASSES} ${getCategoryColor(project.category)}`}>
                                 <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                 {project.category}
                               </span>
 
                               {/* Company Badge - Subtle, with "at" prefix for context */}
                               {project.associatedWithCompany && project.associatedWithCompany.trim() !== "" && (
                                 <span className={`inline-flex items-center gap-1.5 bg-gray-800/50 border border-white/20 text-white/90 ${COMPANY_BADGE_CLASSES}`}>
                                   <FaBuilding className="text-[10px] text-white/50" />
                                   <span className="text-white/50">@</span>
                                   {getCompanyLogo(project.associatedWithCompany) && (
                                     <Image
                                       src={getCompanyLogo(project.associatedWithCompany)!}
                                       alt={`${project.associatedWithCompany} logo`}
                                       width={14}
                                       height={14}
                                       className="rounded-sm"
                                     />
                                   )}
                                   <span>{project.associatedWithCompany}</span>
                                 </span>
                               )}
                             </div>
 
                             {/* Row 2: Special Badges (Open Source + Recognition/Awards) */}
                             {(project.isOpenSource || (project.recognition && project.recognition.filter(r => r.approved !== false).length > 0)) && (
                               <div className="flex flex-wrap items-center gap-2">
                                 {/* Open Source Badge */}
                                 {project.isOpenSource && (
                                   <span className={`inline-flex items-center gap-1.5 bg-gradient-to-r from-green-500/25 to-emerald-500/25 border border-green-500/50 text-green-200 shadow-sm shadow-green-500/20 ${OPEN_SOURCE_BADGE_CLASSES}`}>
                                     <FaCodeBranch className="text-[10px]" />
                                     <span>Open Source</span>
                                   </span>
                                 )}

                                 {/* Recognition/Awards Badges - Gold/Trophy styling */}
                                 {project.recognition && project.recognition.filter(r => r.approved !== false).length > 0 && (
                                   <>
                                     {project.recognition.filter(r => r.approved !== false).slice(0, 2).map((rec, idx) => (
                                       <span
                                         key={idx}
                                         className={`inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 border border-amber-400/50 text-amber-200 shadow-sm shadow-amber-500/20 ${RECOGNITION_BADGE_CLASSES}`}
                                         title={rec.description}
                                       >
                                         <FaTrophy className="text-[10px] text-amber-300" />
                                         <span>{rec.title}</span>
                                       </span>
                                     ))}
                                   </>
                                 )}
                               </div>
                             )}
                           </div>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center justify-end">
                          {/* Primary Metric - Compact Inline Badge */}
                          {primaryMetric && (
                            <span className={`inline-flex items-center gap-1.5 backdrop-blur-sm shadow-md border flex-shrink-0 ${PRIMARY_METRIC_BADGE_CLASSES} ${getMetricBadgeClassesLight(primaryMetric.label)}`}>
                              <primaryMetric.icon className="text-xs" />
                              <span>{primaryMetric.text}</span>
                            </span>
                          )}

                          {/* Divider */}
                          {primaryMetric && <span className="text-white/30 text-xs">|</span>}

                          {/* Active/Completed Status Badge */}
                          {project.isActive ? (
                            <span className={`inline-flex items-center gap-1.5 bg-green-500/90 text-white backdrop-blur-sm shadow-md flex-shrink-0 ${STATUS_BADGE_CLASSES}`}>
                              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              Active
                            </span>
                          ) : (
                            <div className="group/status relative">
                              <span className={`inline-flex items-center gap-1.5 bg-red-500/90 text-white backdrop-blur-sm shadow-md cursor-help flex-shrink-0 ${STATUS_BADGE_CLASSES}`}>
                                Completed
                              </span>
                              {project.inactivationReason && (
                                <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-gray-900/95 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all duration-200 z-10 backdrop-blur-sm border border-white/10">
                                  {project.inactivationReason}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Role Info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-xs">
                        <div className="flex items-center gap-1.5 text-white/60">
                          <FaCode className="text-secondary-default" />
                          <span>{project.jobRole}</span>
                        </div>
                      </div>

                      {/* Timeline Info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-xs">
                        <div className="flex items-center gap-1.5 text-white/60">
                          <FaCalendar className="text-blue-400" />
                          <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/60">
                          <FaClock className="text-emerald-400" />
                          <span>{project.durationMonths} months</span>
                        </div>
                      </div>

                      {/* Description - Expandable */}
                      <div className="text-white/70 text-sm mb-3">
                        {!isDescriptionExpanded && project.shortDescription.length > 150 ? (
                          <>
                            {project.shortDescription.slice(0, 150)}...{' '}
                            <button
                              onClick={() => toggleDescription(project.num)}
                              className="text-secondary-default hover:text-secondary-default/80 transition-colors font-medium inline underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:ring-offset-2 focus:ring-offset-[#27272c] rounded-sm"
                              aria-label="Expand project description"
                            >
                              See more
                            </button>
                          </>
                        ) : (
                          <>
                            {project.shortDescription}
                            {isDescriptionExpanded && project.shortDescription.length > 150 && (
                              <>
                                {' '}
                                <button
                                  onClick={() => toggleDescription(project.num)}
                                  className="text-secondary-default hover:text-secondary-default/80 transition-colors font-medium inline underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:ring-offset-2 focus:ring-offset-[#27272c] rounded-sm"
                                  aria-label="Collapse project description"
                                >
                                  Show less
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>

                      {/* Skills Highlighted */}
                      {project.skillsHighlighted && project.skillsHighlighted.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs font-semibold text-secondary-default/80 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-secondary-default"></span>
                            Key Skills
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.skillsHighlighted.map((skill, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-md transition-all duration-200 bg-gradient-to-r from-emerald-500/20 via-purple-500/20 to-purple-500/20 text-emerald-300 border border-emerald-500/40 hover:from-emerald-500/30 hover:via-purple-500/30 hover:to-purple-500/30"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                       {/* Tech Stack - Expandable with 3 columns */}
                       <div className="bg-gradient-to-br from-secondary-default/5 via-purple-500/5 to-blue-500/5 rounded-lg p-3 border border-white/10 mb-3">
                         <div className="flex items-center justify-between mb-2">
                           <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wide flex items-center gap-1.5">
                             <span className="w-1 h-1 rounded-full bg-secondary-default"></span>
                             Tech Stack
                           </h4>
                           {project.stacks.length > 9 && (
                             <button
                               onClick={() => toggleProjectStacks(project.num)}
                               className="text-xs text-secondary-default hover:text-secondary-default/80 transition-colors font-medium"
                             >
                               {expandedProjects.has(project.num) ? "Show less" : `+${project.stacks.length - 9} more`}
                             </button>
                           )}
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-1">
                           {(expandedProjects.has(project.num) ? project.stacks : project.stacks.slice(0, 9)).map((stack, stackIndex) => (
                             <div
                               key={stackIndex}
                               className="flex items-center gap-1.5 text-xs text-white/80"
                             >
                               <span className="w-1 h-1 rounded-full bg-secondary-default/60 flex-shrink-0"></span>
                               <span className="truncate">{stack}</span>
                             </div>
                           ))}
                         </div>
                       </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2 border-t border-white/10">
                        {/* View Details Button */}
                        {onOpenModal && (
                          <button
                            onClick={() => onOpenModal(project)}
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-secondary-default/10 to-blue-500/10 hover:from-secondary-default/20 hover:to-blue-500/20 border border-secondary-default/30 hover:border-secondary-default/50 text-secondary-default px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/20 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:ring-offset-2 focus:ring-offset-[#27272c]"
                          >
                            <FaExternalLinkAlt className="text-xs" />
                            <span>View Details</span>
                          </button>
                        )}

                        {/* GitHub Button */}
                        {project.github && project.github.trim() !== "" && (
                          <Link
                            href={project.github}
                            target="_blank"
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/30 hover:border-blue-500/50 text-blue-300 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-[#27272c]"
                          >
                            <FaGithub className="text-sm" />
                            <span>Source</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
