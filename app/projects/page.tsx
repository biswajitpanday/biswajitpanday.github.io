"use client";

import { motion } from "framer-motion";
import {
  FaRocket,
  FaCode,
  FaCogs,
  FaGlobe,
  FaTh,
  FaClock
} from "react-icons/fa";
import { projects, getFeaturedProjects } from "@/data/portfolioData";
import { useState } from "react";
import ProjectModal from "@/components/ProjectModal";
import BackgroundElements from "@/components/BackgroundElements";
import ProjectCard from "@/components/ProjectCard";
import ProjectsFilter from "@/components/ProjectsFilter";
import ErrorBoundary from "@/components/ErrorBoundary";
import { PERFORMANCE_VARIANTS } from "@/constants";
import type { Project } from "@/data/portfolioData";
import { useCountUp } from "@/hooks/useCountUp";
import ProjectTimeline from "@/components/ProjectTimeline";
import TimelineFilter from "@/components/TimelineFilter";

const Projects = () => {
  // Environment flags
  const isFilterEnabled = process.env.NEXT_PUBLIC_ENABLE_FILTER !== 'false';

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");

  // Modal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate stats
  const activeProjects = projects.filter(p => p.isActive).length;
  const featuredProjects = getFeaturedProjects();
  // const inactiveProjects = projects.filter(p => !p.isActive).length;

  // Animated counters for stats dashboard
  const totalCount = useCountUp({ end: projects.length, duration: 2000 });
  const featuredCount = useCountUp({ end: featuredProjects.length, duration: 1800, start: 0 });
  const hoursSavedCount = useCountUp({ end: 32, duration: 2200, suffix: "+" });
  const clientsCount = useCountUp({ end: 20, duration: 2000, suffix: "+" });

  // Toggle project stacks display
  const toggleProjectStacks = (projectIndex: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectIndex)) {
      newExpanded.delete(projectIndex);
    } else {
      newExpanded.add(projectIndex);
    }
    setExpandedProjects(newExpanded);
  };

  // Modal handlers
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  // Handle skill filter
  const handleSkillFilter = (skill: string) => {
    if (selectedSkill === skill) {
      // Clear filter
      setSelectedSkill(null);
      setFilteredProjects(projects);
    } else {
      // Apply filter
      setSelectedSkill(skill);
      const filtered = projects.filter(project =>
        project.stacks.some(stack => stack.toLowerCase() === skill.toLowerCase()) ||
        project.skillsHighlighted?.some(s => s.toLowerCase() === skill.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
    // Clear search when filtering by skill
    setSearchQuery("");
  };

  return (
    <section 
      data-testid="projects-page"
      className="min-h-screen relative overflow-hidden py-8"
    >
      {/* Enhanced Background Elements */}
      <BackgroundElements 
        floatingDots={[
          {
            size: "md",
            color: "secondary",
            animation: "ping",
            position: { top: "25%", right: "10%" },
            opacity: 60
          },
          {
            size: "sm",
            color: "blue",
            animation: "pulse",
            position: { bottom: "20%", right: "30%" },
            opacity: 40
          }
        ]}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Compact Projects Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
          data-testid="projects-header"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            {/* Title Section */}
            <div className="flex-1">
              <h1 className="text-3xl xl:text-4xl font-bold mb-2 leading-tight bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
                My Projects
              </h1>
              <p className="text-sm font-medium leading-relaxed">
                <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  A showcase of my technical expertise through{" "}
                </span>
                <span className="text-lg font-bold bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                  {projects.length}
                </span>
                <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}completed and ongoing projects
                </span>
              </p>
            </div>

            {/* Inline Compact Stats */}
            <div className="flex flex-wrap gap-2.5">
              <div 
                data-testid="stat-total-projects"
                className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] border border-secondary-default/30 rounded-lg px-3.5 py-2.5 hover:scale-[1.02] hover:border-secondary-default/60 hover:-translate-y-0.5 transition-all duration-500 shadow-md shadow-secondary-default/10 hover:shadow-xl hover:shadow-secondary-default/30"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary-default to-blue-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative p-2 bg-gradient-to-br from-secondary-default/20 to-blue-500/20 rounded-lg group-hover:from-secondary-default/30 group-hover:to-blue-500/30 transition-all border border-secondary-default/30">
                      <FaCode className="text-secondary-default text-lg" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text text-transparent">{projects.length}</div>
                    <div className="text-[10px] text-white/60 font-medium tracking-wide">Total Projects</div>
                  </div>
                </div>
              </div>
              <div 
                data-testid="stat-active-projects"
                className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] border border-emerald-500/30 rounded-lg px-3.5 py-2.5 hover:scale-[1.02] hover:border-emerald-500/60 hover:-translate-y-0.5 transition-all duration-500 shadow-md shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/30"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative p-2 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg group-hover:from-emerald-500/30 group-hover:to-blue-500/30 transition-all border border-emerald-500/30">
                      <FaRocket className="text-emerald-400 text-lg" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">{activeProjects}</div>
                    <div className="text-[10px] text-white/60 font-medium tracking-wide">Active Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Unified Toolbar: View Toggle + Search/Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative bg-gradient-to-br from-gray-900/70 to-gray-950/70 backdrop-blur-sm border border-secondary-default/20 rounded-lg p-3 mb-6 shadow-md z-[110]"
          data-testid="projects-toolbar"
        >
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
            {/* View Mode Toggle - Compact */}
            <div className="flex gap-2 shrink-0">
              <button
                data-testid="view-mode-grid"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-secondary-default to-blue-500 text-white shadow-md"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                <FaTh className="text-xs" />
                Grid
              </button>
              <button
                data-testid="view-mode-timeline"
                onClick={() => setViewMode("timeline")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  viewMode === "timeline"
                    ? "bg-gradient-to-r from-secondary-default to-blue-500 text-white shadow-md"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                <FaClock className="text-xs" />
                Timeline
              </button>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-8 bg-white/10"></div>

            {/* Search and Filter - Integrated for Grid View */}
            {isFilterEnabled && viewMode === "grid" && (
              <div className="flex-1">
                <ProjectsFilter
                  projects={projects}
                  onFilterChange={setFilteredProjects}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  resultsInfo={{
                    filtered: filteredProjects.length,
                    total: projects.length,
                    description: "projects"
                  }}
                />
              </div>
            )}

            {/* Timeline Filters - Integrated for Timeline View */}
            {viewMode === "timeline" && (
              <TimelineFilter
                selectedSkill={selectedSkill}
                onSkillChange={setSelectedSkill}
                projects={projects}
              />
            )}
          </div>
        </motion.div>

        {/* Timeline View */}
        {viewMode === "timeline" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            data-testid="timeline-view"
          >
            <ProjectTimeline
              selectedTech={selectedSkill}
              onOpenModal={openProjectModal}
            />
          </motion.div>
        )}

        {/* Grid View Content */}
        {viewMode === "grid" && (
          <>

        {/* Compact Impact Metrics */}
        {!searchQuery && (
          <motion.div
            variants={PERFORMANCE_VARIANTS.containerSync}
            initial="hidden"
            animate="visible"
            className="mt-8 mb-8"
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-lg p-4">
              <div className="flex flex-wrap items-center justify-center gap-6">
                {/* Total Projects */}
                <div ref={totalCount.ref} className="flex items-center gap-3">
                  <div className="p-2 bg-[#00BFFF]/20 rounded-lg">
                    <FaCode className="text-[#00BFFF] text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#0080FF] tabular-nums">{totalCount.count}</div>
                    <div className="text-xs text-white/60">Total Projects</div>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-white/10"></div>

                {/* Featured Count */}
                <div ref={featuredCount.ref} className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <FaRocket className="text-purple-400 text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tabular-nums">{featuredCount.count}</div>
                    <div className="text-xs text-white/60">Featured</div>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-white/10"></div>

                {/* Hours Saved */}
                <div ref={hoursSavedCount.ref} className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <FaRocket className="text-emerald-400 text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tabular-nums">{hoursSavedCount.count}</div>
                    <div className="text-xs text-white/60">Hours Saved</div>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-white/10"></div>

                {/* Clients Served */}
                <div ref={clientsCount.ref} className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <FaGlobe className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-secondary-default tabular-nums">{clientsCount.count}</div>
                    <div className="text-xs text-white/60">Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filter Indicator */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-blue-500/10 border border-emerald-500/30 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 flex-1">
              <FaCogs className="text-emerald-400 text-lg" />
              <span className="text-white font-medium">
                Filtered by skill:
              </span>
              <span className="bg-gradient-to-r from-emerald-500/30 to-purple-500/30 text-white px-3 py-1 rounded-md font-bold border border-emerald-400/50">
                {selectedSkill}
              </span>
              <span className="text-white/60 text-sm">
                ({filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'})
              </span>
            </div>
            <button
              onClick={() => handleSkillFilter(selectedSkill)}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-all duration-200 border border-red-500/40 hover:border-red-500/60"
            >
              <span className="text-sm font-medium">Clear Filter</span>
            </button>
          </motion.div>
        )}

        {/* Projects Grid */}
        <ErrorBoundary section="projects">
          <div 
            data-testid="projects-grid"
            className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.num}
                project={project}
                index={index}
                isExpanded={expandedProjects.has(index)}
                onToggleStacks={toggleProjectStacks}
                onOpenModal={openProjectModal}
                onSkillClick={handleSkillFilter}
                selectedSkill={selectedSkill}
              />
            ))}
          </div>
        </ErrorBoundary>

        {/* Show when no projects match the filter */}
        {filteredProjects.length === 0 && (
          <motion.div
            data-testid="projects-no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FaCogs className="mx-auto text-4xl text-white/30 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-white/70">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
          </>
        )}

        {/* Project Details Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeProjectModal}
        />
      </div>
    </section>
  );
};

export default Projects; 