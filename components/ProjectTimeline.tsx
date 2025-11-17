"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaBuilding, FaCode, FaStar, FaClock, FaRocket } from "react-icons/fa";
import { projects, Project } from "@/data/portfolioData";
import Image from "next/image";

interface TimelineProject extends Project {
  durationMonths: number;
  yearRange: string;
}

interface ProjectTimelineProps {
  selectedTech?: string | null;
}

export default function ProjectTimeline({ selectedTech }: ProjectTimelineProps) {

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
                      <div className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md flex items-center gap-1.5 text-xs font-semibold shadow-lg shadow-purple-500/30">
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
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 128px"
                      />
                    </div>

                    {/* Project Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-secondary-default transition-colors">
                            {project.title}
                          </h3>
                          {project.subtitle && (
                            <p className="text-sm text-white/70">{project.subtitle}</p>
                          )}
                        </div>
                        {project.isActive && (
                          <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-emerald-500/40 w-fit">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active
                          </span>
                        )}
                      </div>

                      {/* Company & Role */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-xs">
                        <div className="flex items-center gap-1.5 text-white/60">
                          <FaBuilding className="text-secondary-default" />
                          <span>{project.associatedWithCompany || "Individual"}</span>
                        </div>
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

                      {/* Description */}
                      <p className="text-white/70 text-sm mb-3 line-clamp-2">
                        {project.shortDescription}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.stacks.slice(0, 8).map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-white/5 hover:bg-white/10 text-white/80 text-xs px-2.5 py-1 rounded-md border border-white/10 hover:border-secondary-default/40 transition-all duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stacks.length > 8 && (
                          <span className="text-white/50 text-xs px-2 py-1">
                            +{project.stacks.length - 8} more
                          </span>
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
