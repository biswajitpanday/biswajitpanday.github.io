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
  FaChartLine,
  FaUsers,
  FaStar,
  FaRocket,
} from "react-icons/fa";
import type { Project } from "@/data/portfolioData";

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

  // Company logo mapping
  const getCompanyLogo = (company: string) => {
    const logoMap: Record<string, string> = {
      "Brain Station-23": "/assets/company-icon/webp/brain-station-23.webp",
      "Chorki Limited": "/assets/company-icon/webp/chorki.webp",
      "Kaz Software": "/assets/company-icon/webp/kaz.webp",
      "Optimizely": "/assets/company-icon/webp/opti.webp",
    };
    return logoMap[company] || null;
  };

  const companyLogo = project.associatedWithCompany ? getCompanyLogo(project.associatedWithCompany) : null;

  // Get primary metric for display
  const getPrimaryMetric = () => {
    if (project.metrics?.efficiency) return { icon: FaRocket, text: project.metrics.efficiency, label: "Efficiency" };
    if (project.metrics?.users) return { icon: FaUsers, text: project.metrics.users, label: "Impact" };
    if (project.metrics?.performance) return { icon: FaChartLine, text: project.metrics.performance, label: "Performance" };
    if (project.metrics?.revenue) return { icon: FaChartLine, text: project.metrics.revenue, label: "Cost Savings" };
    if (project.metrics?.downloads) return { icon: FaUsers, text: project.metrics.downloads, label: "Downloads" };
    return null;
  };

  const primaryMetric = getPrimaryMetric();

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
          <div className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md flex items-center gap-1.5 text-xs font-semibold shadow-lg shadow-purple-500/30">
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

        {/* Status Overlay */}
        <div className="absolute top-2 right-2">
          {project.isActive ? (
            <span
              data-testid={`project-status-active-${project.num}`}
              className="bg-green-500/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-medium shadow-lg flex items-center gap-1.5"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Active
            </span>
          ) : (
            <div className="group/status relative">
              <span
                data-testid={`project-status-inactive-${project.num}`}
                className="bg-red-500/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm cursor-help font-medium shadow-lg"
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

        {/* Primary Metric Badge - Bottom Left of Image - Enhanced */}
        {primaryMetric && (
          <div className="absolute bottom-2 left-2">
            <div className="bg-gradient-to-r from-secondary-default to-blue-500 text-white px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-xl shadow-secondary-default/40 flex items-center gap-2 text-xs font-bold border border-white/20">
              <primaryMetric.icon className="text-sm" />
              <span>{primaryMetric.text}</span>
            </div>
          </div>
        )}
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
              <span
                onClick={() => setIsDescriptionExpanded(true)}
                className="text-secondary-default hover:text-secondary-default/80 transition-colors font-medium cursor-pointer inline"
              >
                See more
              </span>
            </>
          ) : (
            <>
              {project.shortDescription}
              {isDescriptionExpanded && project.shortDescription.length > 100 && (
                <>
                  {' '}
                  <span
                    onClick={() => setIsDescriptionExpanded(false)}
                    className="text-secondary-default hover:text-secondary-default/80 transition-colors font-medium cursor-pointer inline"
                  >
                    Show less
                  </span>
                </>
              )}
            </>
          )}
        </p>
      </div>

      {/* Bottom Section - Fixed layout from bottom: Buttons -> Tech Stack -> Key Skills -> Tags */}
      <div className="mt-auto">
        {/* Compact Tags Row */}
        <div
          data-testid={`project-badges-${project.num}`}
          className="flex items-center gap-1.5 flex-wrap mb-3"
        >
          {/* Company Badge */}
          {project.associatedWithCompany && (
            <span
              data-testid={`project-company-badge-${project.num}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded bg-secondary-default/10 border border-secondary-default/30 text-secondary-default/90"
            >
              {companyLogo ? (
                <Image
                  src={companyLogo}
                  alt={`${project.associatedWithCompany} logo`}
                  width={16}
                  height={16}
                  className="rounded-sm"
                />
              ) : (
                <FaBuilding className="text-xs" />
              )}
              {project.associatedWithCompany}
            </span>
          )}

          {/* Category Badge */}
          <span
            data-testid={`project-category-badge-${project.num}`}
            className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-gradient-to-r from-secondary-default/10 via-purple-500/10 to-emerald-500/10 border border-secondary-default/30 text-secondary-default"
          >
            {project.category}
          </span>

          {/* Open Source Badge */}
          {project.isOpenSource && (
            <span
              data-testid={`project-opensource-badge-${project.num}`}
              className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded bg-green-500/10 border border-green-500/30 text-green-300/90"
            >
              <FaCodeBranch className="text-xs" />
              Open Source
            </span>
          )}

          {/* Recognition/Awards - Inline with tags */}
          {project.recognition && project.recognition.filter(r => r.approved !== false).length > 0 && (
            <>
              {project.recognition.filter(r => r.approved !== false).slice(0, 2).map((rec, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-gradient-to-r from-purple-500/15 via-emerald-500/15 to-secondary-default/15 border border-purple-500/40 text-purple-300"
                  title={rec.description}
                >
                  <FaTrophy className="text-xs" />
                  <span className="font-medium">{rec.title}</span>
                </span>
              ))}
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
                  onClick={() => onSkillClick?.(skill)}
                  className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-md transition-all duration-200 cursor-pointer ${
                    selectedSkill?.toLowerCase() === skill.toLowerCase()
                      ? 'bg-gradient-to-r from-emerald-500/40 via-purple-500/40 to-purple-500/40 text-white border-2 border-emerald-400 shadow-lg shadow-emerald-500/30 scale-105'
                      : 'bg-gradient-to-r from-emerald-500/20 via-purple-500/20 to-purple-500/20 text-emerald-300 border border-emerald-500/40 hover:from-emerald-500/30 hover:via-purple-500/30 hover:to-purple-500/30'
                  }`}
                >
                  {skill}
                </span>
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
              <div
                key={stackIndex}
                data-testid={`project-tech-${project.num}-${stackIndex}`}
                onClick={() => onSkillClick?.(stack)}
                className={`flex items-center gap-1.5 text-xs cursor-pointer transition-all duration-200 ${
                  selectedSkill?.toLowerCase() === stack.toLowerCase()
                    ? 'text-secondary-default font-bold scale-105'
                    : 'text-white/80 hover:text-secondary-default/80'
                }`}
              >
                <span className={`w-1 h-1 rounded-full flex-shrink-0 ${
                  selectedSkill?.toLowerCase() === stack.toLowerCase()
                    ? 'bg-secondary-default'
                    : 'bg-secondary-default/60'
                }`}></span>
                <span className="truncate">{stack}</span>
              </div>
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
