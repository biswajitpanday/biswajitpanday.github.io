"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CSS_ANIMATIONS } from "@/constants";
import { FaGithub, FaEye } from "react-icons/fa";
import type { Project } from "@/data/portfolioData";
import { getPrimaryMetric } from "@/utils/projectHelpers";
import {
  CategoryBadge,
  OpenSourceBadge,
  RecognitionBadge,
  StatusBadgeIcon,
  FeaturedBadge,
  PrimaryMetricBadge,
  BadgeSeparator,
  BadgeRow,
  TechStack,
  ProjectSkills,
  ProjectTimeline,
  ProjectRole,
} from "@/components/project";

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
  const hasGithubLink = project.github && project.github.trim() !== "";
  const displayImage = project.thumbImage || project.image;
  const staggerClass = index < 5 ? `animate-stagger-${index + 1}` : '';
  const isFeatured = project.isFeatured === true;
  const primaryMetric = getPrimaryMetric(project);

  return (
    <article
      key={project.num}
      data-testid={`project-card-${project.num}`}
      aria-label={`${project.title} - ${project.category} project${isFeatured ? ' (Featured)' : ''}${project.isActive ? ' - Active' : ' - Completed'}`}
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
        className="relative overflow-visible rounded-lg mb-4 group-hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-secondary-default/10 to-transparent"
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
            <div className="relative rounded-lg overflow-hidden">
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
            <PrimaryMetricBadge metric={primaryMetric} />
          </div>
        )}

        {/* Badge Overlay - Top Right Corner - Icons Only with Tooltips */}
        <div className="absolute top-2 right-2 flex flex-row gap-2 items-center">
          {isFeatured && <FeaturedBadge variant="icon" />}
          <div data-testid={`project-status-${project.isActive ? 'active' : 'inactive'}-${project.num}`}>
            <StatusBadgeIcon
              isActive={project.isActive}
              inactivationReason={project.inactivationReason}
            />
          </div>
        </div>

      </div>

      {/* Project Title - Enhanced with Gradients */}
      <div className="mb-3">
        <h3
          data-testid={`project-title-${project.num}`}
          className={`font-bold transition-colors duration-300 leading-tight ${isFeatured
            ? 'text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
            : 'text-lg bg-gradient-to-r from-[#00BFFF] to-white bg-clip-text text-transparent'
            }`}
        >
          {project.title}
        </h3>

        {/* Company as inline text below title - improved contrast */}
        {project.associatedWithCompany && project.associatedWithCompany.trim() !== "" && (
          <p className="text-xs text-white/60 mt-1 font-medium">
            @ {project.associatedWithCompany}
          </p>
        )}

        {project.subtitle && (
          <div className="relative">
            <p className={`text-sm font-medium text-[#00BFFF]/80 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'
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
        <div data-testid={`project-badges-${project.num}`}>
          <BadgeRow>
            <span data-testid={`project-category-badge-${project.num}`} className="inline-flex">
              <CategoryBadge category={project.category} />
            </span>

            {(project.isOpenSource || (project.recognition && project.recognition.length > 0)) && (
              <BadgeSeparator />
            )}

            {project.isOpenSource && (
              <span data-testid={`project-opensource-badge-${project.num}`}>
                <OpenSourceBadge variant="icon" />
              </span>
            )}

            {project.isOpenSource && project.recognition && project.recognition.length > 0 && (
              <BadgeSeparator />
            )}

            {project.recognition && project.recognition.length > 0 && (
              <RecognitionBadge recognitions={project.recognition} />
            )}
          </BadgeRow>
        </div>

        {/* Role Info */}
        <ProjectRole role={project.jobRole} />

        {/* Timeline Info */}
        <ProjectTimeline startDate={project.startDate} endDate={project.endDate} />

        {/* Skills Highlighted - Expandable Display */}
        {project.skillsHighlighted && project.skillsHighlighted.length > 0 && (
          <ProjectSkills
            skills={project.skillsHighlighted}
            displayMode="expandable"
            selectedSkill={selectedSkill}
            onSkillClick={onSkillClick}
          />
        )}

        {/* Tech Stacks - Compact 2-Column List */}
        <div data-testid={`project-tech-stack-${project.num}`}>
          <TechStack
            stacks={project.stacks}
            columns={2}
            expandable
            selectedTech={selectedSkill}
            onTechClick={onSkillClick}
          />
        </div>
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div
        data-testid={`project-actions-${project.num}`}
        className="flex gap-3 mt-3"
        role="group"
        aria-label={`Actions for ${project.title}`}
      >
        {/* View Details Button */}
        <button
          data-testid={`project-details-button-${project.num}`}
          onClick={() => onOpenModal(project)}
          aria-label={`View details for ${project.title}`}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-secondary-default/10 to-blue-500/10 hover:from-secondary-default/20 hover:to-blue-500/20 border border-secondary-default/30 hover:border-secondary-default/50 text-secondary-default px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-secondary-default/20 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:ring-offset-2 focus:ring-offset-[#27272c]"
        >
          <FaEye className="text-sm" aria-hidden="true" />
          <span>View Details</span>
        </button>

        {/* GitHub Button */}
        {hasGithubLink && (
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`project-github-button-${project.num}`}
            aria-label={`View source code for ${project.title} on GitHub (opens in new tab)`}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/30 hover:border-blue-500/50 text-blue-300 px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-[#27272c]"
          >
            <FaGithub className="text-base" aria-hidden="true" />
            <span>Source</span>
          </Link>
        )}
      </div>

      {/* 3D Depth Effect - Subtle Shadow Layer */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary-default/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          transform: 'translateZ(-10px)',
        }}
        aria-hidden="true"
      />
    </article>
  );
};

export default ProjectCard;
