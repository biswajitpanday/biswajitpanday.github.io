"use client";
import { motion } from "framer-motion";
import { FaCogs, FaRocket } from "react-icons/fa";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { skills1, skills2, countAllTechnologies } from "@/data/skillsData";
import { PERFORMANCE_VARIANTS } from "@/constants";
import DynamicIcon from "@/components/DynamicIcon";
import React from "react";

const Skills = () => {
  const data1 = flattenTree(skills1);
  const data2 = flattenTree(skills2);
  const totalTechnologies = countAllTechnologies();
  const totalCategories = skills1.children.length + skills2.children.length;

  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-default/5 pointer-events-none" />
      <div className="absolute top-20 left-10 w-2 h-2 bg-secondary-default rounded-full animate-ping opacity-60" />
      <div className="absolute bottom-32 right-16 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-secondary-default rounded-full animate-bounce opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Skills Header */}
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
            Technical{" "}
            <span className="bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text text-transparent animate-gradient">
              Expertise
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={PERFORMANCE_VARIANTS.slideUpSync}
            className="text-lg xl:text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            A comprehensive overview of{" "}
            <span className="text-secondary-default font-semibold">
              technologies and frameworks
            </span>{" "}
            mastered through years of hands-on experience and{" "}
            <span className="text-secondary-default font-semibold">
              continuous learning
            </span>
          </motion.p>

          {/* Skills Stats */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.containerSync}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-8"
          >
            <motion.div
              variants={PERFORMANCE_VARIANTS.cardSync}
              className="group relative overflow-hidden bg-gradient-to-r from-secondary-default/10 to-blue-500/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded performance-button"
            >
              <div className="flex items-center gap-3">
                <FaCogs className="text-secondary-default text-xl group-hover:animate-spin" />
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-default text-2xl font-bold">
                    {totalTechnologies}
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    Technologies
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
                    {totalCategories}
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    Categories
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Skills Trees */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 gap-8 mb-5"
        >
          {/* First Skills Tree */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.cardSync}
            className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded border border-secondary-default/20 hover:border-secondary-default/40 performance-card"
          >
            <TreeView
              data={data1}
              defaultExpandedIds={data1.map((node) => node.id)}
              aria-label="Core Technologies Skills Tree"
              nodeRenderer={({ element, getNodeProps, level }) => {
                const isParent = element.children.length > 0;
                const skillElement = element;
                const iconName = skillElement.metadata?.icon?.toString() || "FaCode";
                const nodeProps = getNodeProps();

                const handleClick = (e: React.MouseEvent) => {
                  if (!isParent) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  if (nodeProps.onClick) {
                    nodeProps.onClick(e);
                  }
                };

                return (
                  <motion.div
                    {...nodeProps}
                    onClick={handleClick}
                    variants={PERFORMANCE_VARIANTS.fadeInFast}
                    style={{
                      paddingLeft: 40 * (level - 1),
                      display: "flex",
                      alignItems: "center",
                    }}
                    className={
                      isParent
                        ? "text-lg font-bold leading-none text-secondary-default group hover:text-blue-400 cursor-pointer transition-all duration-300 mb-2 mt-1 hover:bg-white/5 p-2 rounded will-change-transform"
                        : "text-sm text-white/70 group hover:text-white/90 hover:bg-white/5 transition-all duration-300 mb-1 p-1 rounded cursor-default"
                    }
                  >
                    <DynamicIcon
                      iconName={iconName}
                      className={`mr-3 ${
                        isParent ? "text-secondary-default" : "text-blue-400"
                      }`}
                    />
                    <span className="select-none">{element.name}</span>
                  </motion.div>
                );
              }}
            />
          </motion.div>

          {/* Second Skills Tree */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.cardSync}
            className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded border border-secondary-default/20 hover:border-secondary-default/40 performance-card"
          >
            <TreeView
              data={data2}
              defaultExpandedIds={data2.map((node) => node.id)}
              aria-label="Tools & Methodologies Skills Tree"
              nodeRenderer={({ element, getNodeProps, level }) => {
                const isParent = element.children.length > 0;
                const skillElement = element;
                const iconName = skillElement.metadata?.icon?.toString() || "FaCode";
                const nodeProps = getNodeProps();

                const handleClick = (e: React.MouseEvent) => {
                  if (!isParent) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  if (nodeProps.onClick) {
                    nodeProps.onClick(e);
                  }
                };

                return (
                  <motion.div
                    {...nodeProps}
                    onClick={handleClick}
                    variants={PERFORMANCE_VARIANTS.fadeInFast}
                    style={{
                      paddingLeft: 40 * (level - 1),
                      display: "flex",
                      alignItems: "center",
                    }}
                    className={
                      isParent
                        ? "text-lg font-bold leading-none text-secondary-default group hover:text-blue-400 cursor-pointer transition-all duration-300 mb-2 mt-1 hover:bg-white/5 p-2 rounded will-change-transform"
                        : "text-sm text-white/70 group hover:text-white/90 hover:bg-white/5 transition-all duration-300 mb-1 p-1 rounded cursor-default"
                    }
                  >
                    <DynamicIcon
                      iconName={iconName}
                      className={`mr-3 ${
                        isParent ? "text-white" : "text-secondary-default"
                      }`}
                    />
                    <span className="select-none">{element.name}</span>
                  </motion.div>
                );
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
