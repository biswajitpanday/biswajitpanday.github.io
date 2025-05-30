"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FaGithub,
  FaBriefcase,
  FaRocket,
  FaBuilding,
  FaCodeBranch,
  FaExternalLinkAlt,
  FaSearch,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import { projects } from "@/data/portfolioData";
import { PERFORMANCE_VARIANTS } from "@/constants";
import { useState, useMemo, useEffect } from "react";
import ProjectModal from "@/components/ProjectModal";
import type { Project } from "@/data/portfolioData";

const Portfolio = () => {
  // Environment flags
  const isSearchEnabled = process.env.NEXT_PUBLIC_ENABLE_SEARCH !== 'false';
  const isFilterEnabled = process.env.NEXT_PUBLIC_ENABLE_FILTER !== 'false';

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Modal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(
    new Set()
  );

  // Debounce search query - only if search is enabled
  useEffect(() => {
    if (!isSearchEnabled) return;
    
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, isSearchEnabled]);

  // Extract unique values for filters - only if filter is enabled
  const categories = useMemo(() => {
    if (!isFilterEnabled) return ["All"];
    const cats = [...new Set(projects.map(p => p.category))];
    return ["All", ...cats];
  }, [isFilterEnabled]);

  const companies = useMemo(() => {
    if (!isFilterEnabled) return ["All"];
    const comps = [...new Set(projects.map(p => p.associatedWithCompany).filter(c => c))];
    return ["All", ...comps];
  }, [isFilterEnabled]);

  const technologies = useMemo(() => {
    if (!isFilterEnabled) return ["All"];
    const techs = [...new Set(projects.flatMap(p => p.stacks))].sort();
    return ["All", ...techs];
  }, [isFilterEnabled]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Text search - only if search is enabled
      if (isSearchEnabled && debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        const matchesSearch = 
          project.title.toLowerCase().includes(searchLower) ||
          project.shortDescription.toLowerCase().includes(searchLower) ||
          project.longDescription.toLowerCase().includes(searchLower) ||
          project.stacks.some(stack => stack.toLowerCase().includes(searchLower)) ||
          project.associatedWithCompany.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Filters - only if filter is enabled
      if (isFilterEnabled) {
        // Category filter
        if (selectedCategory !== "All" && project.category !== selectedCategory) {
          return false;
        }

        // Company filter
        if (selectedCompany !== "All" && project.associatedWithCompany !== selectedCompany) {
          return false;
        }

        // Status filter
        if (selectedStatus !== "All") {
          if (selectedStatus === "Active" && !project.isActive) return false;
          if (selectedStatus === "Inactive" && project.isActive) return false;
        }

        // Technology filter
        if (selectedTech !== "All" && !project.stacks.includes(selectedTech)) {
          return false;
        }
      }

      return true;
    });
  }, [isSearchEnabled, isFilterEnabled, debouncedSearch, selectedCategory, selectedCompany, selectedStatus, selectedTech]);

  const activeProjects = useMemo(
    () => projects.filter((project) => project.isActive).length,
    []
  );

  const toggleProjectStacks = (projectIndex: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectIndex)) {
      newExpanded.delete(projectIndex);
    } else {
      newExpanded.add(projectIndex);
    }
    setExpandedProjects(newExpanded);
  };

  const clearAllFilters = () => {
    if (isSearchEnabled) setSearchQuery("");
    if (isFilterEnabled) {
      setSelectedCategory("All");
      setSelectedCompany("All");
      setSelectedStatus("All");
      setSelectedTech("All");
    }
  };

  const hasActiveFilters = (isSearchEnabled && searchQuery) || 
    (isFilterEnabled && (selectedCategory !== "All" || selectedCompany !== "All" || selectedStatus !== "All" || selectedTech !== "All"));

  // Modal handlers
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden py-8">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-default/5 pointer-events-none" />
        <div className="absolute top-20 left-10 w-2 h-2 bg-secondary-default rounded-full animate-ping opacity-60" />
        <div className="absolute bottom-32 right-16 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-secondary-default rounded-full animate-bounce opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Portfolio Header */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.containerSync}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            {/* Main Heading */}
            <motion.h1
              variants={PERFORMANCE_VARIANTS.slideUpSync}
              className="text-4xl xl:text-6xl font-bold text-white mb-6 leading-tight"
            >
              My{" "}
              <span className="bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text text-transparent animate-gradient">
                Portfolio
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={PERFORMANCE_VARIANTS.slideUpSync}
              className="text-lg xl:text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Explore my journey through innovative projects and cutting-edge
              technologies
            </motion.p>

            {/* Portfolio Stats */}
            <motion.div
              variants={PERFORMANCE_VARIANTS.containerSync}
              className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-8"
            >
              <motion.div
                variants={PERFORMANCE_VARIANTS.cardSync}
                className="group relative overflow-hidden bg-gradient-to-r from-secondary-default/10 to-blue-500/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded performance-button"
              >
                <div className="flex items-center gap-3">
                  <FaBriefcase className="text-secondary-default text-xl group-hover:animate-pulse" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-secondary-default text-2xl font-bold">
                      {projects.length}
                    </span>
                    <span className="text-white/80 text-sm font-medium">
                      Total Projects
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={PERFORMANCE_VARIANTS.cardSync}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded performance-button"
              >
                <div className="flex items-center gap-3">
                  <FaRocket className="text-secondary-default text-xl group-hover:animate-pulse" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-secondary-default text-2xl font-bold">
                      {activeProjects}
                    </span>
                    <span className="text-white/80 text-sm font-medium">
                      Active Projects
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={PERFORMANCE_VARIANTS.cardSync}
                className="group relative overflow-hidden bg-gradient-to-r from-purple-500/10 to-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded performance-button"
              >
                <div className="flex items-center gap-3">
                  <FaSearch className="text-secondary-default text-xl group-hover:animate-pulse" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-secondary-default text-2xl font-bold">
                      {filteredProjects.length}
                    </span>
                    <span className="text-white/80 text-sm font-medium">
                      Filtered Results
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Search and Filter Section */}
          {(isSearchEnabled || isFilterEnabled) && (
            <motion.div
              variants={PERFORMANCE_VARIANTS.containerSync}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              {/* Search Bar */}
              {isSearchEnabled && (
                <motion.div
                  variants={PERFORMANCE_VARIANTS.cardSync}
                  className="relative mb-6"
                >
                  <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search projects by name, technology, description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 pl-12 pr-4 py-3 rounded focus:border-secondary-default/50 focus:ring-secondary-default/20 transition-all duration-300"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Filter Toggle */}
              {isFilterEnabled && (
                <motion.div
                  variants={PERFORMANCE_VARIANTS.cardSync}
                  className="flex items-center justify-between mb-4"
                >
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 bg-secondary-default/10 hover:bg-secondary-default/20 border border-secondary-default/30 text-secondary-default px-4 py-2 rounded transition-all duration-300"
                  >
                    <FaFilter />
                    <span>Filters</span>
                    <span className="text-xs bg-secondary-default/20 px-2 py-1 rounded">
                      {showFilters ? 'Hide' : 'Show'}
                    </span>
                  </button>

                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded transition-all duration-300"
                    >
                      <FaTimes />
                      <span>Clear All</span>
                    </button>
                  )}
                </motion.div>
              )}

              {/* Filter Options */}
              {isFilterEnabled && showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white/5 border border-white/10 rounded"
                >
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded focus:border-secondary-default/50 transition-all duration-300"
                    >
                      {categories.map(category => (
                        <option key={category} value={category} className="bg-primary text-white">
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Company Filter */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Company</label>
                    <select
                      value={selectedCompany}
                      onChange={(e) => setSelectedCompany(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded focus:border-secondary-default/50 transition-all duration-300"
                    >
                      {companies.map(company => (
                        <option key={company} value={company} className="bg-primary text-white">
                          {company}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded focus:border-secondary-default/50 transition-all duration-300"
                    >
                      <option value="All" className="bg-primary text-white">All</option>
                      <option value="Active" className="bg-primary text-white">Active</option>
                      <option value="Inactive" className="bg-primary text-white">Inactive</option>
                    </select>
                  </div>

                  {/* Technology Filter */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Technology</label>
                    <select
                      value={selectedTech}
                      onChange={(e) => setSelectedTech(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 rounded focus:border-secondary-default/50 transition-all duration-300"
                    >
                      {technologies.map(tech => (
                        <option key={tech} value={tech} className="bg-primary text-white">
                          {tech}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Results Info */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-secondary-default/10 border border-secondary-default/30 rounded"
            >
              <p className="text-secondary-default">
                Showing <span className="font-bold">{filteredProjects.length}</span> of{" "}
                <span className="font-bold">{projects.length}</span> projects
                {debouncedSearch && (
                  <span> matching &ldquo;<span className="font-semibold">{debouncedSearch}</span>&rdquo;</span>
                )}
              </p>
            </motion.div>
          )}

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 max-w-md mx-auto">
                <FaSearch className="text-4xl text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
                <p className="text-white/60 mb-4">
                  Try adjusting your search criteria or clearing filters to see more results.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-secondary-default hover:bg-secondary-default/80 text-primary px-4 py-2 rounded transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}

          {/* Projects Grid */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.containerSync}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, index) => {
              const isExpanded = expandedProjects.has(index);
              const displayStacks = isExpanded
                ? project.stacks
                : project.stacks.slice(0, 6);
              const hasMoreStacks = project.stacks.length > 6;
              const hasGithubLink =
                project.github && project.github.trim() !== "";

              return (
                <motion.div
                  key={project.num}
                  variants={PERFORMANCE_VARIANTS.cardSync}
                  className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded border border-secondary-default/20 hover:border-secondary-default/40 performance-card flex flex-col justify-between"
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden rounded mb-4 group-hover:shadow-lg transition-all duration-300">
                    {project.isActive ? (
                      <Link
                        href={project.url || project.github}
                        target="_blank"
                      >
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
                    <div className="absolute top-2 right-2">
                      {project.isActive ? (
                        <span className="bg-green-500/90 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-500/90 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                          No Longer Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Company and Position Pills */}
                  <div className="flex justify-between items-center mb-4">
                    {/* Left: Company Badge */}
                    <div className="flex gap-2">
                      {project.associatedWithCompany && (
                        <span className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full bg-secondary-default/20 border border-secondary-default/30 text-secondary-default">
                          <FaBuilding className="text-xs" />
                          {project.associatedWithCompany}
                        </span>
                      )}

                      {/* Open Source Badge */}
                      {project.isOpenSource && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-300">
                          <FaCodeBranch className="text-xs" />
                          Open Source
                        </span>
                      )}
                    </div>

                    {/* Right: Position Badge */}
                    <span className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Title */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-secondary-default transition-colors duration-300 leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  {/* Project Description */}
                  <p className="text-white/70 text-xs leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white/80 mb-2">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {displayStacks.map((stack, stackIndex) => (
                        <span
                          key={stackIndex}
                          className="text-xs px-2 py-1 bg-secondary-default/10 text-secondary-default border border-secondary-default/30 rounded hover:bg-secondary-default/20 transition-colors duration-200"
                        >
                          {stack}
                        </span>
                      ))}
                      {hasMoreStacks && (
                        <button
                          onClick={() => toggleProjectStacks(index)}
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
                  <div className="flex gap-3 mt-auto">
                    {/* View Details Button */}
                    <button
                      onClick={() => openProjectModal(project)}
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
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 px-4 py-2 rounded transition-all duration-300 hover:scale-105 text-sm font-medium"
                      >
                        <FaGithub className="text-xs" />
                        <span>Source</span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />
    </>
  );
};

export default Portfolio;
