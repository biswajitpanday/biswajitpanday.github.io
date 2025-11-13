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
} from "react-icons/fa";
import type { Project } from "@/data/portfolioData";

interface ProjectCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggleStacks: (index: number) => void;
  onOpenModal: (project: Project) => void;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isExpanded,
  onToggleStacks,
  onOpenModal,
  className = ""
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

  return (
    <div
      key={project.num}
      data-testid={`project-card-${project.num}`}
      className={`group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded border border-secondary-default/20 hover:border-secondary-default/40 performance-card flex flex-col justify-between ${className} ${CSS_ANIMATIONS.FADE_IN_UP} ${staggerClass}`}
    >
      {/* Project Image */}
      <div 
        data-testid={`project-image-${project.num}`}
        className="relative overflow-hidden rounded mb-4 group-hover:shadow-lg transition-all duration-300"
      >
        {project.isActive ? (
          <Link
            href={project.url || project.github}
            target="_blank"
            data-testid={`project-image-link-${project.num}`}
          >
            <Image
              src={displayImage}
              alt={project.title}
              width={500}
              height={300}
              className="rounded transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        ) : (
          <Image
            src={displayImage}
            alt={project.title}
            width={500}
            height={300}
            className="rounded opacity-80"
          />
        )}

        {/* Status Overlay */}
        <div className="absolute top-2 right-2">
          {project.isActive ? (
            <span
              data-testid={`project-status-active-${project.num}`}
              className="bg-green-500/90 text-white text-xs px-2 py-1 rounded backdrop-blur-sm"
            >
              Active
            </span>
          ) : (
            <div className="group/status relative">
              <span
                data-testid={`project-status-inactive-${project.num}`}
                className="bg-red-500/90 text-white text-xs px-2 py-1 rounded backdrop-blur-sm cursor-help"
                title={project.inactivationReason || "This project is no longer active"}
              >
                No Longer Active
              </span>
              {project.inactivationReason && (
                <div className="absolute top-full right-0 mt-2 w-64 p-2 bg-gray-900/95 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all duration-200 z-10 backdrop-blur-sm">
                  {project.inactivationReason}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Company and Position Pills */}
      <div 
        data-testid={`project-badges-${project.num}`}
        className="flex justify-between items-center mb-4"
      >
        {/* Left: Company Badge */}
        <div className="flex gap-2">
          {project.associatedWithCompany && (
            <span 
              data-testid={`project-company-badge-${project.num}`}
              className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full bg-secondary-default/20 border border-secondary-default/30 text-secondary-default"
            >
              <FaBuilding className="text-xs" />
              {project.associatedWithCompany}
            </span>
          )}

          {/* Open Source Badge */}
          {project.isOpenSource && (
            <span 
              data-testid={`project-opensource-badge-${project.num}`}
              className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-300"
            >
              <FaCodeBranch className="text-xs" />
              Open Source
            </span>
          )}
        </div>

        {/* Right: Position Badge */}
        <span 
          data-testid={`project-category-badge-${project.num}`}
          className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300"
        >
          {project.category}
        </span>
      </div>

      {/* Project Title */}
      <div className="mb-4">
        <h3 
          data-testid={`project-title-${project.num}`}
          className="text-lg font-bold text-white mb-2 group-hover:text-secondary-default transition-colors duration-300 leading-tight"
        >
          {project.title}
        </h3>
      </div>

      {/* Project Description */}
      <p 
        data-testid={`project-description-${project.num}`}
        className="text-white/70 text-xs leading-relaxed mb-4"
      >
        {project.shortDescription}
      </p>

      {/* Tech Stack */}
      <div 
        data-testid={`project-tech-stack-${project.num}`}
        className="mb-6"
      >
        <h4 className="text-sm font-semibold text-white/80 mb-2">
          Tech Stack
        </h4>
        <div className="flex flex-wrap gap-2">
          {displayStacks.map((stack, stackIndex) => (
            <span
              key={stackIndex}
              data-testid={`project-tech-${project.num}-${stackIndex}`}
              className="text-xs px-2 py-1 bg-secondary-default/10 text-secondary-default border border-secondary-default/30 rounded hover:bg-secondary-default/20 transition-colors duration-200"
            >
              {stack}
            </span>
          ))}
          {hasMoreStacks && (
            <button
              data-testid={`project-tech-toggle-${project.num}`}
              onClick={() => onToggleStacks(index)}
              className="text-xs px-2 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded hover:bg-blue-500/20 transition-colors duration-200"
            >
              {isExpanded
                ? "Show Less"
                : `+${project.stacks.length - 6} more`}
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div 
        data-testid={`project-actions-${project.num}`}
        className="flex gap-3 mt-auto"
      >
        {/* View Details Button */}
        <button
          data-testid={`project-details-button-${project.num}`}
          onClick={() => onOpenModal(project)}
          className="flex-1 flex items-center justify-center gap-2 bg-secondary-default/10 hover:bg-secondary-default/20 border border-secondary-default/30 text-secondary-default px-4 py-2 rounded transition-all duration-300 hover:scale-105 text-sm font-medium"
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
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded transition-all duration-300 hover:scale-105 text-sm font-medium"
          >
            <FaGithub className="text-xs" />
            <span>Source</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 