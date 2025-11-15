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

  // Featured project gets special styling
  const isFeatured = project.isFeatured === true;

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
      className={`group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded-xl border ${
        isFeatured
          ? 'border-secondary-default/40 shadow-lg shadow-secondary-default/10'
          : 'border-secondary-default/20'
      } hover:border-secondary-default/60 transition-all duration-500 flex flex-col justify-between ${className} ${CSS_ANIMATIONS.FADE_IN_UP} ${staggerClass} hover:scale-[1.02] hover:shadow-2xl hover:shadow-secondary-default/20 hover:-translate-y-1`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Featured Badge - Top Right Corner */}
      {isFeatured && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-bold animate-pulse">
            <FaStar className="text-white" />
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

        {/* Primary Metric Badge - Bottom Left of Image */}
        {primaryMetric && (
          <div className="absolute bottom-2 left-2">
            <div className="bg-gradient-to-r from-secondary-default/90 to-blue-500/90 text-white px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg flex items-center gap-2 text-xs font-bold">
              <primaryMetric.icon className="text-sm" />
              <span>{primaryMetric.text}</span>
            </div>
          </div>
        )}
      </div>

      {/* Company and Category Pills */}
      <div
        data-testid={`project-badges-${project.num}`}
        className="flex justify-between items-center mb-4 gap-2 flex-wrap"
      >
        {/* Left: Company Badge */}
        <div className="flex gap-2 flex-wrap">
          {project.associatedWithCompany && (
            <span
              data-testid={`project-company-badge-${project.num}`}
              className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-secondary-default/20 to-blue-500/20 border border-secondary-default/40 text-secondary-default hover:from-secondary-default/30 hover:to-blue-500/30 transition-all duration-300"
            >
              <FaBuilding className="text-xs" />
              {project.associatedWithCompany}
            </span>
          )}

          {/* Open Source Badge */}
          {project.isOpenSource && (
            <span
              data-testid={`project-opensource-badge-${project.num}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 text-green-300 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300"
            >
              <FaCodeBranch className="text-xs" />
              Open Source
            </span>
          )}
        </div>

        {/* Right: Category Badge */}
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
          className={`text-lg font-bold mb-2 group-hover:text-secondary-default transition-colors duration-300 leading-tight ${
            isFeatured ? 'text-xl text-white' : 'text-white'
          }`}
        >
          {project.title}
        </h3>
      </div>

      {/* Project Description */}
      <p
        data-testid={`project-description-${project.num}`}
        className="text-white/70 text-sm leading-relaxed mb-4"
      >
        {project.shortDescription}
      </p>

      {/* Recognition/Awards - If exists */}
      {project.recognition && project.recognition.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {project.recognition.slice(0, 2).map((rec, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300"
              title={rec.description}
            >
              <FaTrophy className="text-xs" />
              <span className="font-medium">{rec.title}</span>
            </div>
          ))}
        </div>
      )}

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
              className="text-xs px-3 py-1.5 bg-secondary-default/10 text-secondary-default border border-secondary-default/30 rounded-lg hover:bg-secondary-default/20 hover:scale-105 transition-all duration-200 font-medium"
            >
              {stack}
            </span>
          ))}
          {hasMoreStacks && (
            <button
              data-testid={`project-tech-toggle-${project.num}`}
              onClick={() => onToggleStacks(index)}
              className="text-xs px-3 py-1.5 bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 hover:scale-105 transition-all duration-200 font-medium"
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
