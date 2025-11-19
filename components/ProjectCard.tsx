"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CSS_ANIMATIONS } from "@/constants";
import {
  FaGithub,
  FaBuilding,
  FaCodeBranch,
  FaExternalLinkAlt,
  FaTrophy,
  FaStar,
  FaUser,
  FaCode,
  FaCalendar,
  FaClock,
} from "react-icons/fa";
import type { Project } from "@/data/portfolioData";
import { getPrimaryMetric, getMetricBadgeClasses } from "@/utils/projectHelpers";
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

interface ProjectCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggleStacks: (index: number) => void;
  onOpenModal: (project: Project) => void;
  className?: string;
  onSkillClick?: (skill: string) => void;
  selectedSkill?: string | null;
}

const MAX_DESCRIPTION_LINES = 4;

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isExpanded,
  onToggleStacks,
  onOpenModal,
  className = "",
  onSkillClick,
  selectedSkill
}) => {
  const displayStacks = isExpanded
    ? project.stacks
    : project.stacks.slice(0, 6);
  const hasMoreStacks = project.stacks.length > 6;
  const hasGithubLink = project.github && project.github.trim() !== "";

  // Determine which image to use (thumbnail or full image)
  const displayImage = project.thumbImage || project.image;

  // Get stagger animation class based on index
  const staggerClass = index < 5 ? `animate-stagger-${index + 1}` : '';

  // Featured project gets special styling
  const isFeatured = project.isFeatured === true;

  // Get company logo and primary metric using centralized utilities
  const companyLogo = project.associatedWithCompany ? getCompanyLogo(project.associatedWithCompany) : null;
  const primaryMetric = getPrimaryMetric(project);

  // Calculate duration in months
  const durationMonths = Math.round(
    (project.endDate.getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
  );

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div
      key={project.num}
      data-testid={`project-card-${project.num}`}
      className={`group relative p-5 rounded-xl border transition-all duration-500 flex flex-col justify-between ${className} ${CSS_ANIMATIONS.FADE_IN_UP} ${staggerClass} hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1 ${isFeatured
        ? 'bg-gradient-to-br from-purple-500/5 via-[#27272c] to-[#2a2a30] border-purple-500/30 shadow-md shadow-purple-500/10 hover:border-purple-500/50 hover:shadow-purple-500/20'
        : 'bg-gradient-to-br from-[#27272c] to-[#2a2a30] border-secondary-default/20 hover:border-secondary-default/60 hover:shadow-secondary-default/20'
        }`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Project Image */}
      <div
        data-testid={`project-image-${project.num}`}
        className="relative overflow-hidden rounded-lg mb-4 group-hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-secondary-default/10 to-transparent"
        style={{
          transform: 'translateZ(20px)',
        }}
      >
        {project.isActive ? (
          <Link
            href={project.url || project.github}
            target="_blank"
            data-testid={`project-image-link-${project.num}`}
          >
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={displayImage}
                alt={`${project.title} project screenshot`}
                width={500}
                height={300}
                className="rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
              />
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary-default/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
            </div>
          </Link>
        ) : (
          <Image
            src={displayImage}
            alt={`${project.title} project screenshot`}
            width={500}
            height={300}
            className="rounded-lg opacity-80"
          />
        )}

        {/* Primary Metric Badge - Bottom Left of Image - Enhanced visibility */}
        {primaryMetric && (
          <div className="absolute bottom-2 left-2">
            <span className={`inline-flex items-center gap-1.5 ${PRIMARY_METRIC_BADGE_CLASSES} bg-gray-900/95 backdrop-blur-md shadow-lg border flex-shrink-0 ${getMetricBadgeClasses(primaryMetric.label)}`}>
              <primaryMetric.icon className="text-xs" />
              <span>{primaryMetric.text}</span>
            </span>
          </div>
        )}

        {/* Badge Overlay - Top Right Corner - Icons Only with Tooltips */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 items-end">
          {/* Featured Badge - Icon Only */}
          {isFeatured && (
            <div className="relative group/featured cursor-help">
              <div className="bg-gradient-to-r from-purple-500/95 to-pink-500/95 backdrop-blur-sm text-white p-2 rounded-md shadow-lg shadow-purple-500/30 flex items-center justify-center">
                <FaStar className="text-white text-sm" />
              </div>
              {/* Tooltip */}
              <div className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-gray-900/95 text-white text-xs rounded-md shadow-xl opacity-0 invisible group-hover/featured:opacity-100 group-hover/featured:visible transition-all duration-200 z-10 backdrop-blur-sm border border-purple-400/30 whitespace-nowrap">
                Featured Project
              </div>
            </div>
          )}

          {/* Status Badge - Icon Only */}
          {project.isActive ? (
            <div className="relative group/active cursor-help">
              <div
                data-testid={`project-status-active-${project.num}`}
                className="bg-green-500/95 text-white backdrop-blur-sm shadow-lg p-2 rounded-md flex items-center justify-center"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              </div>
              {/* Tooltip */}
              <div className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-gray-900/95 text-white text-xs rounded-md shadow-xl opacity-0 invisible group-hover/active:opacity-100 group-hover/active:visible transition-all duration-200 z-10 backdrop-blur-sm border border-green-400/30 whitespace-nowrap">
                Active Project
              </div>
            </div>
          ) : (
            <div className="group/status relative cursor-help">
              <div
                data-testid={`project-status-inactive-${project.num}`}
                className="bg-red-500/95 text-white backdrop-blur-sm shadow-lg p-2 rounded-md flex items-center justify-center"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </div>
              {/* Tooltip */}
              <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-gray-900/95 text-white text-xs rounded-md shadow-xl opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all duration-200 z-10 backdrop-blur-sm border border-red-400/30">
                {project.inactivationReason || "This project is no longer active"}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Project Title - Enhanced with Gradients */}
      <div className="mb-3">
        {/* Company Logo/Icon before Title - with tooltip */}
        <div className="flex items-center gap-2 mb-1.5">
          {project.associatedWithCompany && project.associatedWithCompany.trim() !== "" && (
            <div className="relative group/company cursor-help">
              {companyLogo ? (
                <Image
                  src={companyLogo}
                  alt={`${project.associatedWithCompany} logo`}
                  width={20}
                  height={20}
                  className="rounded-sm opacity-80 group-hover/company:opacity-100 transition-opacity"
                />
              ) : (
                <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center">
                  {project.associatedWithCompany.toLowerCase().includes('individual') || 
                   project.associatedWithCompany.toLowerCase().includes('freelance') || 
                   project.associatedWithCompany.toLowerCase().includes('personal') ? (
                    <FaUser className="text-[10px] text-blue-300" />
                  ) : (
                    <FaBuilding className="text-[10px] text-blue-300" />
                  )}
                </div>
              )}
              {/* Company Tooltip */}
              <div className="absolute left-0 top-full mt-2 px-3 py-1.5 bg-gray-900/95 text-white text-xs rounded-md shadow-xl opacity-0 invisible group-hover/company:opacity-100 group-hover/company:visible transition-all duration-200 z-[150] backdrop-blur-sm border border-white/10 whitespace-nowrap pointer-events-none">
                @ {project.associatedWithCompany}
              </div>
            </div>
          )}

          <h3
            data-testid={`project-title-${project.num}`}
            className={`font-bold transition-colors duration-300 leading-tight flex-1 ${isFeatured
              ? 'text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
              : 'text-lg bg-gradient-to-r from-emerald-400 to-gray-300 bg-clip-text text-transparent'
              }`}
          >
            {project.title}
          </h3>
        </div>

        {project.subtitle && (
          <div className="relative">
            <p className={`text-sm font-medium text-[#00BFFF] leading-relaxed ${isExpanded ? '' : 'line-clamp-2'
              }`}>
              {project.subtitle}
            </p>
            {project.subtitle.length > 100 && (
              <button
                onClick={() => onToggleStacks(index)}
                className="text-xs text-secondary-default/80 hover:text-secondary-default transition-colors mt-0.5 font-medium"
              >
                {isExpanded ? 'Show less' : 'See more'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Section - Compact layout */}
      <div className="mt-auto space-y-3">
        {/* Project Metadata - Single Consolidated Badge Row */}
        <div
          data-testid={`project-badges-${project.num}`}
        >
          {/* Single Row: All Badges Together */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Badge */}
            <span
              data-testid={`project-category-badge-${project.num}`}
              className={`inline-flex items-center gap-1.5 shadow-sm border ${CATEGORY_BADGE_CLASSES} ${getCategoryColor(project.category)}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              {project.category}
            </span>

            {/* Separator */}
            {(project.isOpenSource || (project.recognition && project.recognition.filter(r => r.approved !== false).length > 0)) && (
              <span className="text-white/30 text-xs">|</span>
            )}

            {/* Open Source Badge - Icon Only with Enhanced Tooltip */}
            {project.isOpenSource && (
              <div className="relative group/opensource" >
                <span
                  data-testid={`project-opensource-badge-${project.num}`}
                  className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-green-500/20 border border-green-500/40 hover:bg-green-500/30 transition-colors cursor-help"
                >
                  <FaCodeBranch className="text-sm text-green-300 " />
                </span>
                {/* Enhanced Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 bg-gray-900/95 text-white text-xs rounded-md shadow-xl opacity-0 invisible group-hover/opensource:opacity-100 group-hover/opensource:visible transition-all duration-200 z-10 backdrop-blur-sm border border-green-400/30 whitespace-nowrap">
                  Open Source Project
                </div>
              </div>
            )}

            {/* Separator */}
            {project.isOpenSource && project.recognition && project.recognition.filter(r => r.approved !== false).length > 0 && (
              <span className="text-white/30 text-xs">|</span>
            )}

            {/* Recognition/Awards - Counter with Tooltip */}
            {project.recognition && project.recognition.filter(r => r.approved !== false).length > 0 && (
              <div className="relative group/awards">
                <span className={`inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-400/30 text-amber-200 shadow-sm cursor-help ${RECOGNITION_BADGE_CLASSES}`}>
                  <FaTrophy className="text-[10px] text-amber-300" />
                  <span>{project.recognition.filter(r => r.approved !== false).length} {project.recognition.filter(r => r.approved !== false).length === 1 ? 'Award' : 'Awards'}</span>
                </span>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 left-0 w-64 p-3 bg-gray-900/95 backdrop-blur-sm rounded-lg border border-white/10 opacity-0 invisible group-hover/awards:opacity-100 group-hover/awards:visible transition-all duration-200 z-10 shadow-xl">
                  <div className="space-y-2">
                    {project.recognition.filter(r => r.approved !== false).map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <FaTrophy className="text-amber-300 text-xs mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-white text-xs font-semibold">{rec.title}</div>
                          {rec.description && (
                            <div className="text-white/70 text-xs mt-0.5">{rec.description}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Role Info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-white/60">
            <FaCode className="text-secondary-default" />
            <span>{project.jobRole}</span>
          </div>
        </div>

        {/* Timeline Info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          <div className="flex items-center gap-1.5 text-white/60">
            <FaCalendar className="text-blue-400" />
            <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/60">
            <FaClock className="text-emerald-400" />
            <span>{durationMonths} months</span>
          </div>
        </div>

        {/* Skills Highlighted - Minimal Tags with Centered Heading */}
        {project.skillsHighlighted && project.skillsHighlighted.length > 0 && (
          <div>
            {/* Centered heading with gradient lines */}
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary-default/40 to-secondary-default/20"></div>
              <h4 className="text-[10px] font-semibold text-secondary-default/80 uppercase tracking-wide whitespace-nowrap">
                Key Skills
              </h4>
              <div className="flex-1 h-px bg-gradient-to-r from-secondary-default/20 via-secondary-default/40 to-transparent"></div>
            </div>

            <div className="flex flex-wrap gap-1 max-h-[3.3rem] overflow-hidden">
              {project.skillsHighlighted.map((skill, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSkillClick?.(skill)}
                  className={`text-[9px] px-1.5 py-0.5 rounded bg-[#00BFFF]/10 border border-[#00BFFF]/30 text-[#00BFFF]/90 hover:bg-[#00BFFF]/20 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00BFFF]/50 ${selectedSkill?.toLowerCase() === skill.toLowerCase()
                    ? 'bg-[#00BFFF]/30 border-[#00BFFF]/60 font-semibold'
                    : ''
                    }`}
                  aria-label={`Filter projects by skill: ${skill}`}
                  aria-pressed={selectedSkill?.toLowerCase() === skill.toLowerCase()}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stacks - Compact 2-Column List */}
        <div
          data-testid={`project-tech-stack-${project.num}`}
          className="bg-gradient-to-br from-secondary-default/5 via-purple-500/5 to-blue-500/5 rounded-lg p-3 border border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-secondary-default"></span>
              Tech Stacks
            </h4>
            {hasMoreStacks && (
              <button
                data-testid={`project-tech-toggle-${project.num}`}
                onClick={() => onToggleStacks(index)}
                className="text-xs text-secondary-default hover:text-secondary-default/80 transition-colors font-medium"
              >
                {isExpanded ? "Show less" : `+${project.stacks.length - 6} more`}
              </button>
            )}
          </div>
          {/* Gradient Horizontal Line */}
          <div className="h-px bg-gradient-to-r from-transparent via-secondary-default/40 to-transparent mb-2"></div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {displayStacks.map((stack, stackIndex) => (
              <button
                key={stackIndex}
                type="button"
                data-testid={`project-tech-${project.num}-${stackIndex}`}
                onClick={() => onSkillClick?.(stack)}
                className={`flex items-center gap-1.5 text-xs cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:ring-offset-2 focus:ring-offset-[#27272c] rounded-sm ${selectedSkill?.toLowerCase() === stack.toLowerCase()
                  ? 'text-secondary-default font-bold scale-105'
                  : 'text-white/80 hover:text-secondary-default/80'
                  }`}
                aria-label={`Filter projects by ${stack}`}
                aria-pressed={selectedSkill?.toLowerCase() === stack.toLowerCase()}
              >
                <span className={`w-1 h-1 rounded-full flex-shrink-0 ${selectedSkill?.toLowerCase() === stack.toLowerCase()
                  ? 'bg-secondary-default'
                  : 'bg-secondary-default/60'
                  }`}></span>
                <span className="truncate">{stack}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div
        data-testid={`project-actions-${project.num}`}
        className="flex gap-3 mt-3"
      >
        {/* View Details Button */}
        <button
          data-testid={`project-details-button-${project.num}`}
          onClick={() => onOpenModal(project)}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-secondary-default/10 to-blue-500/10 hover:from-secondary-default/20 hover:to-blue-500/20 border border-secondary-default/30 hover:border-secondary-default/50 text-secondary-default px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/20 text-sm font-medium"
        >
          <FaExternalLinkAlt className="text-xs" />
          <span>View Details</span>
        </button>

        {/* GitHub Button */}
        {hasGithubLink && (
          <Link
            href={project.github}
            target="_blank"
            data-testid={`project-github-button-${project.num}`}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/30 hover:border-blue-500/50 text-blue-300 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 text-sm font-medium"
          >
            <FaGithub className="text-base" />
            <span>Source</span>
          </Link>
        )}
      </div>

      {/* 3D Depth Effect - Subtle Shadow Layer */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary-default/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          transform: 'translateZ(-10px)',
        }}
      />
    </div>
  );
};

export default ProjectCard;
