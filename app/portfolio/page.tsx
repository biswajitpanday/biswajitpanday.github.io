"use client";

import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaRocket,
} from "react-icons/fa";
import { projects } from "@/data/portfolioData";
import { PERFORMANCE_VARIANTS } from "@/constants";
import { useState } from "react";
import ProjectModal from "@/components/ProjectModal";
import StatsCards, { StatCard } from "@/components/StatsCards";
import BackgroundElements from "@/components/BackgroundElements";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import PortfolioFilter from "@/components/PortfolioFilter";
import type { Project } from "@/data/portfolioData";

const Portfolio = () => {
  // Environment flags
  const isSearchEnabled = process.env.NEXT_PUBLIC_ENABLE_SEARCH !== 'false';
  const isFilterEnabled = process.env.NEXT_PUBLIC_ENABLE_FILTER !== 'false';

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  
  // Modal State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            description={
              <>
                Explore my journey through{" "}
                <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                  innovative projects
                </span>{" "}
                and{" "}
                <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                  cutting-edge technologies
                </span>
              </>
            }
          >
            <StatsCards stats={statsData} />
          </SectionHeader>

          {/* Filter Section */}
          {(isSearchEnabled || isFilterEnabled) && (
            <div className="mb-8">
              <PortfolioFilter
                projects={projects}
                onFilterChange={setFilteredProjects}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Search projects by name, technology, description..."
                resultsInfo={{
                  filtered: filteredProjects.length,
                  total: projects.length,
                  description: "projects"
                }}
              />
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
                  onClick={() => setSearchQuery("")}
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
