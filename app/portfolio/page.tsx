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
} from "react-icons/fa";
import { projects } from "@/data/portfolioData";
import { PERFORMANCE_VARIANTS } from "@/constants";
import { useState, useMemo, useEffect } from "react";
import ProjectModal from "@/components/ProjectModal";
import SearchBar from "@/components/SearchBar";
import StatsCards, { StatCard } from "@/components/StatsCards";
import FilterPanel, { FilterOption } from "@/components/FilterPanel";
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

  // Get unique values for filters - only if filter is enabled
  const categories = useMemo(() => {
    if (!isFilterEnabled) return ["All"];
    const cats = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
    return cats;
  }, [isFilterEnabled]);

  const companies = useMemo(() => {
    if (!isFilterEnabled) return ["All"];
    const comps = ["All", ...Array.from(new Set(projects.map(p => p.associatedWithCompany)))];
    return comps;
  }, [isFilterEnabled]);

  const technologies = useMemo(() => {
    if (!isFilterEnabled) return ["All"];
    const techs = ["All", ...Array.from(new Set(projects.flatMap(p => p.stacks)))];
    return techs;
  }, [isFilterEnabled]);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply search filter if search is enabled
    if (isSearchEnabled && debouncedSearch) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        project.associatedWithCompany.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        project.stacks.some(tech => 
          tech.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      );
    }

    // Apply other filters if filter is enabled
    if (isFilterEnabled) {
      if (selectedCategory !== "All") {
        filtered = filtered.filter(project => project.category === selectedCategory);
      }

      if (selectedCompany !== "All") {
        filtered = filtered.filter(project => project.associatedWithCompany === selectedCompany);
      }

      if (selectedStatus !== "All") {
        filtered = filtered.filter(project => {
          const isActive = project.isActive;
          return selectedStatus === "Active" ? isActive : !isActive;
        });
      }

      if (selectedTech !== "All") {
        filtered = filtered.filter(project => 
          project.stacks.includes(selectedTech)
        );
      }
    }

    return filtered;
  }, [debouncedSearch, selectedCategory, selectedCompany, selectedStatus, selectedTech, isSearchEnabled, isFilterEnabled]);

  // Calculate stats
  const activeProjects = projects.filter(p => p.isActive).length;

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

  // Clear all filters
  const clearAllFilters = () => {
    if (isSearchEnabled) {
      setSearchQuery("");
    }
    if (isFilterEnabled) {
      setSelectedCategory("All");
      setSelectedCompany("All");
      setSelectedStatus("All");
      setSelectedTech("All");
    }
  };

  const hasActiveFilters = Boolean((isSearchEnabled && searchQuery) || 
    (isFilterEnabled && (selectedCategory !== "All" || selectedCompany !== "All" || selectedStatus !== "All" || selectedTech !== "All")));

  // Modal handlers
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  // Stats data for StatsCards component
  const statsData: StatCard[] = [
    {
      icon: FaBriefcase,
      value: projects.length,
      label: "Total Projects",
      gradient: "from-secondary-default/10 to-blue-500/10"
    },
    {
      icon: FaRocket,
      value: activeProjects,
      label: "Active Projects",
      gradient: "from-blue-500/10 to-secondary-default/10"
    },
    {
      icon: FaSearch,
      value: filteredProjects.length,
      label: "Filtered Results",
      gradient: "from-purple-500/10 to-secondary-default/10"
    }
  ];

  // Filter options for FilterPanel component
  const filterOptions: FilterOption[] = [
    {
      label: "Category",
      value: "category",
      selected: selectedCategory,
      options: categories,
      onChange: setSelectedCategory
    },
    {
      label: "Company", 
      value: "company",
      selected: selectedCompany,
      options: companies,
      onChange: setSelectedCompany
    },
    {
      label: "Status",
      value: "status", 
      selected: selectedStatus,
      options: ["All", "Active", "Inactive"],
      onChange: setSelectedStatus
    },
    {
      label: "Technology",
      value: "technology",
      selected: selectedTech,
      options: technologies,
      onChange: setSelectedTech
    }
  ];

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

            {/* Portfolio Stats - Using StatsCards Component */}
            <StatsCards stats={statsData} />
          </motion.div>

          {/* Search and Filter Section - Using New Components */}
          {(isSearchEnabled || isFilterEnabled) && (
            <div className="mb-8">
              {/* Search Bar - Using SearchBar Component */}
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Search projects by name, technology, description..."
                className="mb-6"
              />

              {/* Filter Panel - Using FilterPanel Component */}
              <FilterPanel
                filters={filterOptions}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
                hasActiveFilters={hasActiveFilters}
                onClearAllFilters={clearAllFilters}
                resultsInfo={{
                  filtered: filteredProjects.length,
                  total: projects.length,
                  description: "projects"
                }}
              />
            </div>
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
