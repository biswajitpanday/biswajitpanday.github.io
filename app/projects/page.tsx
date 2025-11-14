"use client";

import { motion } from "framer-motion";
import {
  FaRocket,
  FaCode,
  FaCogs,
  FaLaptopCode,
  FaGlobe
} from "react-icons/fa";
import { projects, getFeaturedProjects } from "@/data/portfolioData";
import { useState } from "react";
import ProjectModal from "@/components/ProjectModal";
import StatsCards from "@/components/StatsCards";
import BackgroundElements from "@/components/BackgroundElements";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import ProjectsFilter from "@/components/ProjectsFilter";
import Badge from "@/components/Badge";
import ErrorBoundary from "@/components/ErrorBoundary";
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
  const featuredProjects = getFeaturedProjects();
  // const inactiveProjects = projects.filter(p => !p.isActive).length;

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
        {/* Enhanced Projects Header - Using SectionHeader Component */}
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
          {/* Projects Stats */}
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
              // {
              //   icon: FaCogs,
              //   value: inactiveProjects,
              //   label: "Archived Projects",
              //   gradient: "from-purple-500/10 to-blue-500/10"
              // }
            ]} 
          />
        </SectionHeader>

        {/* Project Highlights Badges */}
        <motion.div
          data-testid="projects-badges"
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-8 -mt-2"
        >
          <Badge
            icon={<FaLaptopCode className="text-xs" />}
            text="Full-Stack Projects"
            color="default"
            testId="badge-fullstack-projects"
          />
          <Badge
            icon={<FaRocket className="text-xs" />}
            text="AI-Enhanced Solutions"
            color="emerald"
            testId="badge-ai-solutions"
          />
          <Badge
            icon={<FaGlobe className="text-xs" />}
            text="Enterprise Applications"
            color="blue"
            testId="badge-enterprise-applications"
          />
          <Badge
            icon={<FaCogs className="text-xs" />}
            text="Automation Tools"
            color="purple"
            testId="badge-automation-tools"
          />
        </motion.div>

        {/* Project Filtering */}
        {isFilterEnabled && (
          <div data-testid="projects-filter-section">
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

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && !searchQuery && (
          <motion.div
            variants={PERFORMANCE_VARIANTS.containerSync}
            initial="hidden"
            animate="visible"
            className="mt-8 mb-12"
          >
            <div className="mb-6">
              <h2 className="text-2xl xl:text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <FaRocket className="text-secondary-default" />
                Featured Projects
              </h2>
              <p className="text-white/70 text-sm">
                Highlighted projects showcasing AI integration, scalability, and measurable business impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.num}
                  project={project}
                  index={index}
                  isExpanded={expandedProjects.has(index)}
                  onToggleStacks={toggleProjectStacks}
                  onOpenModal={openProjectModal}
                  className="border-secondary-default/40 shadow-lg shadow-secondary-default/10"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* All Projects Heading */}
        {featuredProjects.length > 0 && !searchQuery && (
          <div className="mb-6 mt-12">
            <h2 className="text-2xl xl:text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <FaCode className="text-blue-400" />
              All Projects
            </h2>
            <p className="text-white/70 text-sm">
              Complete portfolio of {projects.length} projects across various technologies and domains
            </p>
          </div>
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