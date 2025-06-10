"use client";

import { motion } from "framer-motion";
import {
  FaRocket,
  FaCode,
  FaCogs,
  FaLaptopCode,
  FaGlobe
} from "react-icons/fa";
import { projects } from "@/data/portfolioData";
import { useState } from "react";
import ProjectModal from "@/components/ProjectModal";
import StatsCards from "@/components/StatsCards";
import BackgroundElements from "@/components/BackgroundElements";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import PortfolioFilter from "@/components/PortfolioFilter";
import Badge from "@/components/Badge";
import { PERFORMANCE_VARIANTS } from "@/constants";
import type { Project } from "@/data/portfolioData";

const Projects = () => {
  // Environment flags
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
  const inactiveProjects = projects.filter(p => !p.isActive).length;

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

  return (
    <section className="min-h-screen relative overflow-hidden py-8">
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
        {/* Enhanced Portfolio Header - Using SectionHeader Component */}
        <SectionHeader
          title="My"
          highlightText="Projects"
          description={
            <>
              A showcase of my{" "}
              <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                technical expertise
              </span>{" "}
              through a diverse range of completed and ongoing projects
            </>
          }
        >
          {/* Portfolio Stats */}
          <StatsCards 
            stats={[
              {
                icon: FaCode,
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
                icon: FaCogs,
                value: inactiveProjects,
                label: "Archived Projects",
                gradient: "from-purple-500/10 to-blue-500/10"
              }
            ]} 
          />
        </SectionHeader>

        {/* Project Highlights Badges */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-8 -mt-2"
        >
          <Badge
            icon={<FaLaptopCode className="text-xs" />}
            text="Full-Stack Projects"
            color="default"
          />
          <Badge
            icon={<FaRocket className="text-xs" />}
            text="Innovative Solutions"
            color="blue"
          />
          <Badge
            icon={<FaGlobe className="text-xs" />}
            text="Web Applications"
            color="purple"
          />
        </motion.div>

        {/* Project Filtering */}
        {isFilterEnabled && (
          <PortfolioFilter 
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
        )}

        {/* Projects Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
        </div>

        {/* Show when no projects match the filter */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FaCogs className="mx-auto text-4xl text-white/30 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-white/70">Try adjusting your search or filter criteria</p>
          </motion.div>
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