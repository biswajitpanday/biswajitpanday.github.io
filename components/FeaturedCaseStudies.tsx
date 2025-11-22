"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { projects } from "@/data/portfolioData";
import CaseStudyCard from "./CaseStudyCard";

interface FeaturedCaseStudiesProps {
  maxItems?: number;
  className?: string;
}

const FeaturedCaseStudies: React.FC<FeaturedCaseStudiesProps> = ({
  maxItems = 2,
  className = ""
}) => {
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
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`py-12 ${className}`}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl xl:text-3xl font-bold mb-2 bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
            Featured Case Studies
          </h2>
          <p className="text-sm text-white/60">
            Deep dives into problem-solving and impact
          </p>
        </div>
        <Link
          href="/projects"
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-secondary-default/80 hover:text-secondary-default border border-secondary-default/30 hover:border-secondary-default/50 rounded-lg transition-all group"
        >
          <span>View All Projects</span>
          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Case Studies Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {projectsWithCaseStudies.map((project, index) => (
          <motion.div
            key={project.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <CaseStudyCard
              project={project}
              caseStudy={project.caseStudy!}
              variant="compact"
            />
          </motion.div>
        ))}
      </div>

      {/* Mobile View All Link */}
      <div className="flex sm:hidden justify-center mt-6">
        <Link
          href="/projects"
          className="flex items-center gap-2 px-4 py-2 text-sm text-secondary-default/80 hover:text-secondary-default border border-secondary-default/30 hover:border-secondary-default/50 rounded-lg transition-all group"
        >
          <span>View All Projects</span>
          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.section>
  );
};

export default FeaturedCaseStudies;
