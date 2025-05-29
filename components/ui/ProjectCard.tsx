import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaLink, FaBuilding } from 'react-icons/fa';

interface ProjectCardProps {
  project: {
    title: string;
    shortDescription: string;
    longDescription?: string;
    image: string;
    stacks: string[];
    url?: string;
    github: string;
    isActive: boolean;
    isOpenSource?: boolean;
    associatedWithCompany?: string;
    inactivationReason?: string;
  };
  index: number;
  expandedProjects: Set<number>;
  onToggleStacks: (index: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  expandedProjects,
  onToggleStacks,
}) => {
  const isExpanded = expandedProjects.has(index);
  const displayStacks = isExpanded ? project.stacks : project.stacks.slice(0, 6);
  const hasMoreStacks = project.stacks.length > 6;

  // Function to get company-specific colors
  const getCompanyColors = (company: string) => {
    const colorMap: Record<
      string,
      { bg: string; border: string; text: string; hover: string }
    > = {
      Optimizely: {
        bg: "bg-gradient-to-r from-sky-500 to-sky-600",
        border: "border-sky-500/50",
        text: "text-sky-300",
        hover: "hover:bg-sky-500/30 hover:border-sky-400",
      },
      "Kaz Software": {
        bg: "bg-gradient-to-r from-violet-500 to-violet-600",
        border: "border-violet-500/50",
        text: "text-violet-300",
        hover: "hover:bg-violet-500/30 hover:border-violet-400",
      },
      Individual: {
        bg: "bg-gradient-to-r from-teal-500 to-teal-600",
        border: "border-teal-500/50",
        text: "text-teal-300",
        hover: "hover:bg-teal-500/30 hover:border-teal-400",
      },
      "Chorki Limited": {
        bg: "bg-gradient-to-r from-amber-500 to-amber-600",
        border: "border-amber-500/50",
        text: "text-amber-300",
        hover: "hover:bg-amber-500/30 hover:border-amber-400",
      },
      "Brain Station-23": {
        bg: "bg-gradient-to-r from-pink-500 to-pink-600",
        border: "border-pink-500/50",
        text: "text-pink-300",
        hover: "hover:bg-pink-500/30 hover:border-pink-400",
      },
      "": {
        bg: "bg-gradient-to-r from-slate-500 to-slate-600",
        border: "border-slate-500/50",
        text: "text-slate-300",
        hover: "hover:bg-slate-500/30 hover:border-slate-400",
      },
    };

    return colorMap[company] || colorMap[""];
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
      className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded border border-secondary-default/20 hover:border-secondary-default/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-default/10 hover:scale-[1.02] flex flex-col justify-between will-change-transform"
    >
      <div className="relative">
        {/* Project Image */}
        <div className="relative overflow-hidden rounded mb-4 group-hover:shadow-lg transition-all duration-300">
          {project.isActive ? (
            <Link href={project.url || project.github} target="_blank">
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                className="rounded transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={300}
              className="rounded opacity-80"
            />
          )}

          {/* Status Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {project.associatedWithCompany && (
              <div
                className={`${
                  getCompanyColors(project.associatedWithCompany).bg
                } ${
                  getCompanyColors(project.associatedWithCompany).border
                } ${
                  getCompanyColors(project.associatedWithCompany).text
                } backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border ${
                  getCompanyColors(project.associatedWithCompany).hover
                } transition-all duration-300 shadow-lg`}
              >
                <FaBuilding className="text-xs" />
                {project.associatedWithCompany}
              </div>
            )}

            {project.isOpenSource && (
              <div className="bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-green-400/50 shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                <FaGithub className="text-xs" />
                Open Source
              </div>
            )}
          </div>

          {/* Action Buttons Overlay */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                className="w-8 h-8 rounded-full bg-secondary-default/90 backdrop-blur-sm hover:bg-secondary-default transition-all duration-300 flex justify-center items-center hover:scale-110 shadow-lg"
              >
                <FaLink className="text-primary text-sm" />
              </Link>
            )}
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                className="w-8 h-8 rounded-full bg-secondary-default/90 backdrop-blur-sm hover:bg-secondary-default transition-all duration-300 flex justify-center items-center hover:scale-110 shadow-lg"
              >
                <FaGithub className="text-primary text-sm" />
              </Link>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-3">
          {/* Title and Status */}
          <div className="flex justify-between items-start gap-3">
            <h3 className="text-xl font-bold text-white group-hover:text-secondary-default transition-colors duration-300">
              {project.title}
            </h3>
            {!project.isActive && (
              <span
                className="bg-red-500/20 border border-red-500/40 text-red-400 text-xs px-2 py-1 rounded-full font-medium flex-shrink-0"
                title={project.inactivationReason}
              >
                Inactive
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
            {project.longDescription || project.shortDescription}
          </p>

          {/* Interactive Tech Stack */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {displayStacks.map((stack, stackIndex) => (
                <motion.span
                  key={stackIndex}
                  initial={
                    isExpanded && stackIndex >= 6
                      ? { opacity: 0, scale: 0.8 }
                      : {}
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: isExpanded ? (stackIndex - 6) * 0.05 : 0,
                    duration: 0.3,
                  }}
                  className="inline-flex text-xs font-semibold bg-gradient-to-r from-slate-700/80 to-slate-800/80 backdrop-blur-sm border border-slate-600/40 text-slate-200 py-1.5 px-3 rounded hover:from-secondary-default/20 hover:to-blue-500/20 hover:text-secondary-default hover:border-secondary-default/50 hover:shadow-lg hover:shadow-secondary-default/20 hover:scale-105 transition-all duration-300 cursor-default select-none"
                >
                  {stack}
                </motion.span>
              ))}
            </div>

            {/* Interactive Toggle Button */}
            {hasMoreStacks && (
              <button
                onClick={() => onToggleStacks(index)}
                className="inline-flex text-xs font-semibold bg-gradient-to-r from-secondary-default/15 to-blue-500/15 border border-secondary-default/40 text-secondary-default py-1.5 px-3 rounded hover:from-secondary-default/25 hover:to-blue-500/25 hover:border-secondary-default/60 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/20 transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                {isExpanded
                  ? "Show less"
                  : `+${project.stacks.length - 6} more technologies`}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 