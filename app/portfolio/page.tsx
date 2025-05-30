"use client";

import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaRocket,
} from "react-icons/fa";
import { projects } from "@/data/portfolioData";
import { PERFORMANCE_VARIANTS } from "@/constants";
import { useState, useMemo, useEffect } from "react";
import ProjectModal from "@/components/ProjectModal";
import SearchBar from "@/components/SearchBar";
import StatsCards, { StatCard } from "@/components/StatsCards";
import FilterPanel, { FilterOption } from "@/components/FilterPanel";
import BackgroundElements from "@/components/BackgroundElements";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
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
    const comps = ["All", ...Array.from(new Set(projects.map(p => p.associatedWithCompany).filter(company => company && company.trim() !== "")))];
    return comps;
  }, [isFilterEnabled]);

  const technologies = useMemo(() => {
    if (!isFilterEnabled) return ["All"];
    const techs = ["All", ...Array.from(new Set(projects.flatMap(p => p.stacks).filter(tech => tech && tech.trim() !== "")))];
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
      icon: FaRocket,
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
        {/* Background Elements - Using BackgroundElements Component */}
        <BackgroundElements />

        <div className="container mx-auto px-4 relative z-10">
          {/* Portfolio Header - Using SectionHeader Component */}
          <SectionHeader
            title="My"
            highlightText="Portfolio"
            description="Explore my journey through innovative projects and cutting-edge technologies"
          >
            <StatsCards stats={statsData} />
          </SectionHeader>

          {/* Search and Filter Section */}
          {(isSearchEnabled || isFilterEnabled) && (
            <div className="mb-8 space-y-6">
              {/* Search Bar */}
              {isSearchEnabled && (
                <div className="w-full">
                  <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    placeholder="Search projects by name, technology, description..."
                  />
                </div>
              )}

              {/* Filter Panel */}
              {isFilterEnabled && (
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
              )}
            </div>
          )}

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 max-w-md mx-auto">
                <FaRocket className="text-4xl text-white/40 mx-auto mb-4" />
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

          {/* Projects Grid - Using ProjectCard Component */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.containerSync}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.num}
                project={project}
                index={index}
                isExpanded={expandedProjects.has(index)}
                onToggleStacks={toggleProjectStacks}
                onOpenModal={openProjectModal}
              />
            ))}
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
