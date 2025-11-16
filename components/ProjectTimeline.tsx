"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendar, FaBuilding, FaCode, FaFilter, FaStar, FaClock } from "react-icons/fa";
import { projects, Project } from "@/data/portfolioData";
import Image from "next/image";

interface TimelineProject extends Project {
  durationMonths: number;
  yearRange: string;
}

const companyColors = {
  "Optimizely": "from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-300",
  "Kaz Software": "from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-300",
  "Brain Station-23": "from-emerald-500/20 to-green-500/20 border-emerald-500/40 text-emerald-300",
  "Chorki Limited": "from-orange-500/20 to-red-500/20 border-orange-500/40 text-orange-300",
  "Individual": "from-secondary-default/20 to-blue-500/20 border-secondary-default/40 text-secondary-default",
  "": "from-gray-500/20 to-slate-500/20 border-gray-500/40 text-gray-300",
};

export default function ProjectTimeline() {
  const [selectedCompany, setSelectedCompany] = useState<string>("All");
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"timeline" | "list">("timeline");

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

  // Extract unique companies and technologies
  const companies = useMemo(() => {
    const comps = new Set(projects.map((p) => p.associatedWithCompany).filter(c => c !== ""));
    return ["All", ...Array.from(comps).sort()];
  }, []);

  const allTechnologies = useMemo(() => {
    const techs = new Set(projects.flatMap((p) => p.stacks));
    return ["All", ...Array.from(techs).sort()];
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    let filtered = timelineProjects;

    if (selectedCompany !== "All") {
      filtered = filtered.filter((p) => p.associatedWithCompany === selectedCompany);
    }

    if (selectedTech !== "All") {
      filtered = filtered.filter((p) => p.stacks.includes(selectedTech));
    }

    return filtered;
  }, [timelineProjects, selectedCompany, selectedTech]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalMonths = filteredProjects.reduce((sum, p) => sum + p.durationMonths, 0);
    const activeCount = filteredProjects.filter((p) => p.isActive).length;
    const featuredCount = filteredProjects.filter((p) => p.isFeatured).length;
    const companiesCount = new Set(
      filteredProjects.map((p) => p.associatedWithCompany).filter(c => c !== "")
    ).size;

    return {
      total: filteredProjects.length,
      totalMonths,
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
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-secondary-default/10 to-blue-500/10 border border-secondary-default/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaCode className="text-secondary-default" />
            <p className="text-xs text-white/60 font-medium">Total Projects</p>
          </div>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaClock className="text-emerald-400" />
            <p className="text-xs text-white/60 font-medium">Active Projects</p>
          </div>
          <p className="text-2xl font-bold text-emerald-300">{stats.activeCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaStar className="text-purple-400" />
            <p className="text-xs text-white/60 font-medium">Featured</p>
          </div>
          <p className="text-2xl font-bold text-purple-300">{stats.featuredCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaBuilding className="text-blue-400" />
            <p className="text-xs text-white/60 font-medium">Companies</p>
          </div>
          <p className="text-2xl font-bold text-blue-300">{stats.companiesCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaCalendar className="text-orange-400" />
            <p className="text-xs text-white/60 font-medium">Total Duration</p>
          </div>
          <p className="text-2xl font-bold text-orange-300">
            {Math.round(stats.totalMonths / 12)}y
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-secondary-default" />
          <h3 className="text-lg font-bold text-white">Filter Timeline</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Company Filter */}
          <div>
            <label className="text-xs text-white/60 font-medium mb-2 block">
              Company
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-secondary-default/40"
            >
              {companies.map((comp) => (
                <option key={comp} value={comp} className="bg-gray-900">
                  {comp}
                </option>
              ))}
            </select>
          </div>

          {/* Technology Filter */}
          <div>
            <label className="text-xs text-white/60 font-medium mb-2 block">
              Technology
            </label>
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-secondary-default/40"
            >
              {allTechnologies.slice(0, 50).map((tech) => (
                <option key={tech} value={tech} className="bg-gray-900">
                  {tech}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div>
            <label className="text-xs text-white/60 font-medium mb-2 block">
              View Mode
            </label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as "timeline" | "list")}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-secondary-default/40"
            >
              <option value="timeline" className="bg-gray-900">Timeline View</option>
              <option value="list" className="bg-gray-900">List View</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-white/60 text-sm">
          Showing {filteredProjects.length} of {timelineProjects.length} projects
        </p>
        {(selectedCompany !== "All" || selectedTech !== "All") && (
          <button
            onClick={() => {
              setSelectedCompany("All");
              setSelectedTech("All");
            }}
            className="text-sm text-secondary-default hover:text-secondary-default/80 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Timeline or List View */}
      <AnimatePresence mode="wait">
        {viewMode === "timeline" ? (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary-default via-blue-500 to-purple-500" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.num}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative pl-20"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-secondary-default to-blue-500 border-4 border-gray-900 shadow-lg shadow-secondary-default/30" />

                  {/* Project Card */}
                  <div
                    className={`bg-gradient-to-br ${
                      companyColors[project.associatedWithCompany] || companyColors[""]
                    } border rounded-xl p-6 hover:scale-102 transition-transform duration-200`}
                  >
                    <div className="flex items-start gap-6">
                      {/* Project Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-white/10">
                        <Image
                          src={project.thumbImage || project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Project Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">
                              {project.title}
                            </h3>
                            {project.subtitle && (
                              <p className="text-sm text-white/70">{project.subtitle}</p>
                            )}
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            {project.isFeatured && (
                              <span className="inline-flex items-center gap-1 bg-purple-500/30 text-purple-300 text-xs font-semibold px-2 py-1 rounded border border-purple-500/50">
                                <FaStar className="text-xs" />
                                Featured
                              </span>
                            )}
                            {project.isActive && (
                              <span className="inline-flex items-center gap-1 bg-green-500/30 text-green-300 text-xs font-semibold px-2 py-1 rounded border border-green-500/50">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Active
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Company & Role */}
                        <div className="flex items-center gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-2">
                            <FaBuilding className="text-white/40" />
                            <span className="text-white/80">
                              {project.associatedWithCompany || "Individual"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaCode className="text-white/40" />
                            <span className="text-white/80">{project.jobRole}</span>
                          </div>
                        </div>

                        {/* Timeline Info */}
                        <div className="flex items-center gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-2">
                            <FaCalendar className="text-white/40" />
                            <span className="text-white/80">
                              {formatDate(project.startDate)} - {formatDate(project.endDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaClock className="text-white/40" />
                            <span className="text-white/80">
                              {project.durationMonths} months
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-white/70 text-sm mb-3 line-clamp-2">
                          {project.shortDescription}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {project.stacks.slice(0, 6).map((tech, idx) => (
                            <span
                              key={idx}
                              className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded border border-white/20"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.stacks.length > 6 && (
                            <span className="text-white/60 text-xs px-2 py-1">
                              +{project.stacks.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.num}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                className={`bg-gradient-to-br ${
                  companyColors[project.associatedWithCompany] || companyColors[""]
                } border rounded-xl p-5 hover:scale-105 transition-transform duration-200`}
              >
                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-white/10 mb-4">
                  <Image
                    src={project.thumbImage || project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                  {project.title}
                </h3>

                <div className="flex items-center gap-2 mb-2 text-xs">
                  <FaCalendar className="text-white/40" />
                  <span className="text-white/70">{project.yearRange}</span>
                </div>

                <div className="flex items-center gap-2 mb-3 text-xs">
                  <FaBuilding className="text-white/40" />
                  <span className="text-white/70">
                    {project.associatedWithCompany || "Individual"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.stacks.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stacks.length > 3 && (
                    <span className="text-white/60 text-xs px-2 py-1">
                      +{project.stacks.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
