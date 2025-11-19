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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);

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

  return (
    <div
      key={project.num}
      data-testid={`project-card-${project.num}`}
      className={`group relative p-5 rounded-xl border transition-all duration-500 flex flex-col justify-between ${className} ${CSS_ANIMATIONS.FADE_IN_UP} ${staggerClass} hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1 ${
        isFeatured
          ? 'bg-gradient-to-br from-purple-500/5 via-[#27272c] to-[#2a2a30] border-purple-500/30 shadow-md shadow-purple-500/10 hover:border-purple-500/50 hover:shadow-purple-500/20'
          : 'bg-gradient-to-br from-[#27272c] to-[#2a2a30] border-secondary-default/20 hover:border-secondary-default/60 hover:shadow-secondary-default/20'
      }`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Featured Badge - Top Left Corner - Purple gradient */}
      {isFeatured && (
        <div className="absolute top-2 left-2 z-10">
          <div className={`bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white flex items-center gap-1.5 shadow-lg shadow-purple-500/30 ${FEATURED_BADGE_CLASSES}`}>
            <FaStar className="text-white text-xs" />
            <span>Featured</span>
          </div>
        </div>
      )}

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

        {/* Primary Metric Badge - Bottom Left of Image */}
        {primaryMetric && (
          <div className="absolute bottom-2 left-2">
            <span className={`inline-flex items-center gap-1.5 ${PRIMARY_METRIC_BADGE_CLASSES} backdrop-blur-md shadow-lg border flex-shrink-0 ${getMetricBadgeClasses(primaryMetric.label)}`}>
              <primaryMetric.icon className="text-xs" />
              <span>{primaryMetric.text}</span>
            </span>
          </div>
        )}

        {/* Status Overlay - Top Right */}
        <div className="absolute top-2 right-2">
          {project.isActive ? (
            <span
              data-testid={`project-status-active-${project.num}`}
              className={`bg-green-500/90 text-white backdrop-blur-sm shadow-lg flex items-center gap-1.5 ${STATUS_BADGE_CLASSES}`}
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Active
            </span>
          ) : (
            <div className="group/status relative">
              <span
                data-testid={`project-status-inactive-${project.num}`}
                className={`bg-red-500/90 text-white backdrop-blur-sm cursor-help shadow-lg ${STATUS_BADGE_CLASSES}`}
                title={project.inactivationReason || "This project is no longer active"}
              >
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

      {/* Project Title - Enhanced */}
      <div className="mb-3">
        <h3
          data-testid={`project-title-${project.num}`}
          className={`font-bold group-hover:text-secondary-default transition-colors duration-300 leading-tight ${
            isFeatured ? 'text-xl text-white' : 'text-lg text-white'
          } ${project.subtitle ? 'mb-1.5' : 'mb-2'}`}
        >
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-sm font-medium bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-relaxed">
            {project.subtitle}
          </p>
        )}
      </div>

      {/* Project Description - Clamped to 3 lines with inline expand */}
      <div className="mb-4">
        <p
          data-testid={`project-description-${project.num}`}
          className="text-white/70 text-sm leading-relaxed"
        >
          {!isDescriptionExpanded && project.shortDescription.length > 100 ? (
            <>
              {project.shortDescription.slice(0, 100)}...{' '}
              <button
                onClick={() => setIsDescriptionExpanded(true)}
                className="text-secondary-default hover:text-secondary-default/80 transition-colors font-medium inline underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:ring-offset-2 focus:ring-offset-[#1a1a1f] rounded-sm"
                aria-label="Expand project description"
              >
                See more
              </button>
            </>
          ) : (
            <>
              {project.shortDescription}
              {isDescriptionExpanded && project.shortDescription.length > 100 && (
                <>
                  {' '}
                  <button
                    onClick={() => setIsDescriptionExpanded(false)}
                    className="text-secondary-default hover:text-secondary-default/80 transition-colors font-medium inline underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:ring-offset-2 focus:ring-offset-[#1a1a1f] rounded-sm"
                    aria-label="Collapse project description"
                  >
                    Show less
                  </button>
                </>
              )}
            </>
          )}
        </p>
      </div>

      {/* Bottom Section - Fixed layout from bottom: Buttons -> Tech Stack -> Key Skills -> Tags */}
      <div className="mt-auto">
        {/* Project Metadata - Restructured for Better Clarity (Matching Timeline) */}
        <div 
          data-testid={`project-badges-${project.num}`}
          className="space-y-2 mb-3"
        >
          {/* Row 1: Category (Primary) + Company (if exists) */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Badge - Large, Prominent with Icon-like styling */}
            <span
              data-testid={`project-category-badge-${project.num}`}
              className={`inline-flex items-center gap-1.5 bg-gradient-to-r shadow-sm border ${CATEGORY_BADGE_CLASSES} ${getCategoryColor(project.category)}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              {project.category}
            </span>

            {/* Company Badge - Subtle, with "at" prefix for context */}
            {project.associatedWithCompany && (
              <span
                data-testid={`project-company-badge-${project.num}`}
                className={`inline-flex items-center gap-1.5 bg-gray-800/50 border border-white/20 text-white/90 ${COMPANY_BADGE_CLASSES}`}
              >
                <FaBuilding className="text-[10px] text-white/50" />
                <span className="text-white/50">@</span>
                {companyLogo && (
                  <Image
                    src={companyLogo}
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
                <span
                  data-testid={`project-opensource-badge-${project.num}`}
                  className={`inline-flex items-center gap-1.5 bg-gradient-to-r from-green-500/25 to-emerald-500/25 border border-green-500/50 text-green-200 shadow-sm shadow-green-500/20 ${OPEN_SOURCE_BADGE_CLASSES}`}
                >
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

        {/* Skills Highlighted */}
        {project.skillsHighlighted && project.skillsHighlighted.length > 0 && (
          <div className="mb-3">
            <h4 className="text-xs font-semibold text-secondary-default/80 mb-1.5 uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-secondary-default"></span>
              Key Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.skillsHighlighted.map((skill, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSkillClick?.(skill)}
                  className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-[#1a1a1f] ${
                    selectedSkill?.toLowerCase() === skill.toLowerCase()
                      ? 'bg-gradient-to-r from-emerald-500/40 via-purple-500/40 to-purple-500/40 text-white border-2 border-emerald-400 shadow-lg shadow-emerald-500/30 scale-105'
                      : 'bg-gradient-to-r from-emerald-500/20 via-purple-500/20 to-purple-500/20 text-emerald-300 border border-emerald-500/40 hover:from-emerald-500/30 hover:via-purple-500/30 hover:to-purple-500/30'
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

        {/* Tech Stack - Compact 2-Column List */}
        <div
          data-testid={`project-tech-stack-${project.num}`}
          className="bg-gradient-to-br from-secondary-default/5 via-purple-500/5 to-blue-500/5 rounded-lg p-3 border border-white/10 mb-3"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-secondary-default"></span>
              Tech Stack
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
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {displayStacks.map((stack, stackIndex) => (
              <button
                key={stackIndex}
                type="button"
                data-testid={`project-tech-${project.num}-${stackIndex}`}
                onClick={() => onSkillClick?.(stack)}
                className={`flex items-center gap-1.5 text-xs cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:ring-offset-2 focus:ring-offset-[#27272c] rounded-sm ${
                  selectedSkill?.toLowerCase() === stack.toLowerCase()
                    ? 'text-secondary-default font-bold scale-105'
                    : 'text-white/80 hover:text-secondary-default/80'
                }`}
                aria-label={`Filter projects by ${stack}`}
                aria-pressed={selectedSkill?.toLowerCase() === stack.toLowerCase()}
              >
                <span className={`w-1 h-1 rounded-full flex-shrink-0 ${
                  selectedSkill?.toLowerCase() === stack.toLowerCase()
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
        className="flex gap-3"
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
