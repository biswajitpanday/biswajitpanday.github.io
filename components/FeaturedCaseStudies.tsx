"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { projects, Project } from "@/data/portfolioData";
import CaseStudyCard from "./CaseStudyCard";
import ProjectModal from "./ProjectModal";

interface FeaturedCaseStudiesProps {
  maxItems?: number;
  className?: string;
}

const FeaturedCaseStudies: React.FC<FeaturedCaseStudiesProps> = ({
  maxItems = 2,
  className = ""
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get featured projects with case studies
  const featuredProjects = projects
    .filter((p) => p.caseStudy && p.isFeatured)
    .slice(0, maxItems);

  // Fallback to any projects with case studies if no featured ones
  const projectsWithCaseStudies = featuredProjects.length > 0
    ? featuredProjects
    : projects.filter((p) => p.caseStudy).slice(0, maxItems);

  if (projectsWithCaseStudies.length === 0) return null;

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`py-12 ${className}`}
      >
        {/* Section Header - Centered */}
        <div className="text-center mb-8">
          <h2 className="text-2xl xl:text-3xl font-bold mb-2 bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
            Featured Case Studies
          </h2>
          <p className="text-sm bg-gradient-to-r from-white/60 to-white/40 bg-clip-text text-transparent">
            Deep dives into problem-solving and impact
          </p>
        </div>

        {/* Case Studies Grid - Equal height cards */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {projectsWithCaseStudies.map((project, index) => (
            <motion.div
              key={project.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <CaseStudyCard
                project={project}
                caseStudy={project.caseStudy!}
                onViewDetails={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Projects Link - Centered like GitHub Activity */}
        <div className="text-center mt-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-secondary-default transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded px-2 py-1"
          >
            <FaArrowRight className="text-[10px]" aria-hidden="true" />
            <span>View all projects</span>
          </Link>
        </div>
      </motion.section>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default FeaturedCaseStudies;
