"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FaGithub,
  FaLink,
  FaBriefcase,
  FaRocket,
  FaBuilding,
} from "react-icons/fa";
import { projects } from "@/data/portfolioData";
import { useState } from "react";

const Portfolio = () => {
  const activeProjects = projects.filter((project) => project.isActive).length;
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

  // Function to get company-specific colors
  const getCompanyColors = (company: string) => {
    const colorMap: Record<
      string,
      { bg: string; border: string; text: string; hover: string }
    > = {
      Optimizely: {
        bg: "bg-gradient-to-r from-sky-500 to-sky-600",
        border: "border-sky-500/50",
        text: "text-sky-300",
        hover: "hover:bg-sky-500/30 hover:border-sky-400",
      },
      "Kaz Software": {
        bg: "bg-gradient-to-r from-violet-500 to-violet-600",
        border: "border-violet-500/50",
        text: "text-violet-300",
        hover: "hover:bg-violet-500/30 hover:border-violet-400",
      },
      Individual: {
        bg: "bg-gradient-to-r from-teal-500 to-teal-600",
        border: "border-teal-500/50",
        text: "text-teal-300",
        hover: "hover:bg-teal-500/30 hover:border-teal-400",
      },
      "Chorki Limited": {
        bg: "bg-gradient-to-r from-amber-500 to-amber-600",
        border: "border-amber-500/50",
        text: "text-amber-300",
        hover: "hover:bg-amber-500/30 hover:border-amber-400",
      },
      "Brain Station-23": {
        bg: "bg-gradient-to-r from-pink-500 to-pink-600",
        border: "border-pink-500/50",
        text: "text-pink-300",
        hover: "hover:bg-pink-500/30 hover:border-pink-400",
      },
      "": {
        bg: "bg-gradient-to-r from-slate-500 to-slate-600",
        border: "border-slate-500/50",
        text: "text-slate-300",
        hover: "hover:bg-slate-500/30 hover:border-slate-400",
      },
    };

    return colorMap[company] || colorMap[""];
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
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-secondary-default px-4 py-2 rounded-full text-sm font-medium mb-6 hover:bg-secondary-default/20 transition-all duration-300"
          >
            <FaCode className="text-lg animate-pulse" />
            <span>Project Showcase</span>
            <FaRocket className="text-lg" />
          </motion.div> */}

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl xl:text-6xl font-bold text-white mb-6 leading-tight"
          >
            My{" "}
            <span className="bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text text-transparent animate-gradient">
              Portfolio
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-8"
          >
            <div className="group relative overflow-hidden bg-gradient-to-r from-secondary-default/10 to-blue-500/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded hover:bg-secondary-default/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25">
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
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded hover:bg-secondary-default/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25">
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
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => {
            const isExpanded = expandedProjects.has(index);
            const displayStacks = isExpanded
              ? project.stacks
              : project.stacks.slice(0, 6);
            const hasMoreStacks = project.stacks.length > 6;

            return (
              <motion.div
              key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded border border-secondary-default/20 hover:border-secondary-default/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-default/10 hover:scale-[1.02] flex flex-col justify-between"
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
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                {project.associatedWithCompany && (
                  <div
                          className={`${
                            getCompanyColors(project.associatedWithCompany).bg
                          } ${
                            getCompanyColors(project.associatedWithCompany)
                              .border
                          } ${
                            getCompanyColors(project.associatedWithCompany).text
                          } backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border ${
                            getCompanyColors(project.associatedWithCompany)
                              .hover
                          } transition-all duration-300 shadow-lg`}
                        >
                          <FaBuilding className="text-xs" />
                    {project.associatedWithCompany}
                  </div>
                )}

                {project.isOpenSource && (
                        <div className="bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-green-400/50 shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                          <FaGithub className="text-xs" />
                          Open Source
                  </div>
                )}
                    </div>

                    {/* Action Buttons Overlay */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {project.url && (
                    <Link
                      href={project.url}
                      target="_blank"
                          className="w-8 h-8 rounded-full bg-secondary-default/90 backdrop-blur-sm hover:bg-secondary-default transition-all duration-300 flex justify-center items-center hover:scale-110 shadow-lg"
                    >
                          <FaLink className="text-primary text-sm" />
                    </Link>
                  )}
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                          className="w-8 h-8 rounded-full bg-secondary-default/90 backdrop-blur-sm hover:bg-secondary-default transition-all duration-300 flex justify-center items-center hover:scale-110 shadow-lg"
                    >
                          <FaGithub className="text-primary text-sm" />
                    </Link>
                  )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-3">
                    {/* Title and Status */}
                    <div className="flex justify-between items-start gap-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-secondary-default transition-colors duration-300">
                        {project.title}
                </h3>
                      {!project.isActive && (
                        <span
                          className="bg-red-500/20 border border-red-500/40 text-red-400 text-xs px-2 py-1 rounded-full font-medium flex-shrink-0"
                          title={project.inactivationReason}
                        >
                          Inactive
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                  {project.longDescription || project.shortDescription}
                </p>

                    {/* Interactive Tech Stack */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
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
                            className="inline-flex text-xs font-semibold bg-gradient-to-r from-slate-700/80 to-slate-800/80 backdrop-blur-sm border border-slate-600/40 text-slate-200 py-1.5 px-3 rounded hover:from-secondary-default/20 hover:to-blue-500/20 hover:text-secondary-default hover:border-secondary-default/50 hover:shadow-lg hover:shadow-secondary-default/20 hover:scale-105 transition-all duration-300 cursor-default select-none"
                    >
                      {stack}
                          </motion.span>
                        ))}
                      </div>

                      {/* Interactive Toggle Button */}
                      {hasMoreStacks && (
                        <button
                          onClick={() => toggleProjectStacks(index)}
                          className="inline-flex text-xs font-semibold bg-gradient-to-r from-secondary-default/15 to-blue-500/15 border border-secondary-default/40 text-secondary-default py-1.5 px-3 rounded hover:from-secondary-default/25 hover:to-blue-500/25 hover:border-secondary-default/60 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/20 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                        >
                          {isExpanded
                            ? "Show less"
                            : `+${project.stacks.length - 6} more technologies`}
                        </button>
                      )}
              </div>
            </div>
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
