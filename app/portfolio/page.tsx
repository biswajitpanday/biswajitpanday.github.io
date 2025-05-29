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
} from "react-icons/fa";
import { projects } from "@/data/portfolioData";
import { PERFORMANCE_VARIANTS } from "@/constants";
import { useState, useMemo } from "react";

const Portfolio = () => {
  const activeProjects = useMemo(
    () => projects.filter((project) => project.isActive).length,
    []
  );
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(
    new Set()
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

  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden">
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
            A collection of{" "}
            <span className="text-secondary-default font-semibold">
              innovative projects
            </span>{" "}
            showcasing expertise in full-stack development, cloud solutions, and{" "}
            <span className="text-secondary-default font-semibold">
              modern technologies
            </span>
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
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => {
            const isExpanded = expandedProjects.has(index);
            const displayStacks = isExpanded
              ? project.stacks
              : project.stacks.slice(0, 6);
            const hasMoreStacks = project.stacks.length > 6;
            const hasGithubLink =
              project.github && project.github.trim() !== "";

            return (
              <motion.div
                key={index}
                variants={PERFORMANCE_VARIANTS.cardSync}
                className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded border border-secondary-default/20 hover:border-secondary-default/40 performance-card flex flex-col justify-between"
              >
                <div className="relative">
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
                  <div className="mb-3 flex justify-between items-center gap-2">
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
                    <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary-default rounded-full"></span>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {displayStacks.map((stack, stackIndex) => (
                        <motion.span
                          key={stackIndex}
                          initial={
                            isExpanded && stackIndex >= 6
                              ? { opacity: 0, scale: 0.8 }
                              : {}
                          }
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: isExpanded ? (stackIndex - 6) * 0.05 : 0,
                            duration: 0.3,
                          }}
                          className="inline-flex text-xs font-semibold bg-secondary-default/10 backdrop-blur-sm border border-slate-600/40 text-slate-200 py-1 px-3 rounded hover:from-secondary-default/20 hover:to-blue-500/20 hover:text-secondary-default hover:border-secondary-default/50 hover:shadow-lg hover:shadow-secondary-default/20 hover:scale-105 transition-all duration-300 cursor-default select-none"
                        >
                          {stack}
                        </motion.span>
                      ))}
                    </div>

                    {/* Show More/Less Toggle */}
                    {hasMoreStacks && (
                      <button
                        onClick={() => toggleProjectStacks(index)}
                        className="text-secondary-default text-xs font-medium hover:text-blue-400 transition-colors duration-200 mt-1"
                      >
                        {isExpanded
                          ? `Show Less (-${project.stacks.length - 6} items)`
                          : `Show More (+${project.stacks.length - 6} items)`}
                      </button>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  {project.isActive && project.url && (
                    <Link
                      href={project.url}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 bg-secondary-default/10 hover:bg-secondary-default/20 text-secondary-default border border-secondary-default/30 hover:border-secondary-default/50 px-4 py-2 rounded text-sm font-medium transition-all duration-300 group/btn"
                    >
                      <FaExternalLinkAlt className="text-xs group-hover/btn:scale-110 transition-transform duration-200" />
                      <span>Explore Project</span>
                    </Link>
                  )}
                  {hasGithubLink && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded text-sm font-medium transition-all duration-300 group/btn"
                    >
                      <FaGithub className="text-xs group-hover/btn:scale-110 transition-transform duration-200" />
                      <span>Source Code</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
