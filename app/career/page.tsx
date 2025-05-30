"use client";
import {
  calculateTotalExperience,
} from "@/helpers/utility";
import { timeLineItems } from "@/data/timelineData";
import { PERFORMANCE_VARIANTS } from "@/constants";
import {
  VerticalTimeline,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaRocket,
  FaAward,
} from "react-icons/fa";
import { motion } from "framer-motion";
import TimelineElement from "@/components/TimelineElement";

const Career = () => {
  const totalExperience = calculateTotalExperience(timeLineItems);
  const totalCompanies = timeLineItems.length;

  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden py-8">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-default/5 pointer-events-none" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-3 h-3 bg-secondary-default rounded-full animate-ping opacity-60" />
      <div className="absolute bottom-32 left-16 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute top-1/3 left-8 w-2 h-2 bg-secondary-default rounded-full animate-bounce opacity-50" />
      <div className="absolute top-1/2 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30" />
      <div className="absolute bottom-1/4 right-8 w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Professional Header */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          {/* Main Heading with Enhanced Animation */}
          <motion.h1
            variants={PERFORMANCE_VARIANTS.slideUpSync}
            className="text-4xl xl:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Professional{" "}
            <span className="bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text text-transparent animate-gradient bg-300% animate-gradient-x">
              Journey
            </span>
          </motion.h1>

          {/* Enhanced Description */}
          <motion.p
            variants={PERFORMANCE_VARIANTS.slideUpSync}
            className="text-lg xl:text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Transforming ideas into{" "}
            <span className="text-secondary-default font-semibold bg-secondary-default/10 px-2 py-1 rounded">
              scalable solutions
            </span>{" "}
            through innovative software engineering and{" "}
            <span className="text-secondary-default font-semibold bg-secondary-default/10 px-2 py-1 rounded">
              leadership excellence
            </span>
          </motion.p>

          {/* Enhanced Experience Stats with Glassmorphism */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.containerSync}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-8"
          >
            <motion.div 
              variants={PERFORMANCE_VARIANTS.cardSync}
              className="group relative overflow-hidden bg-gradient-to-r from-secondary-default/10 to-blue-500/10 backdrop-blur-xl border border-secondary-default/30 text-primary py-4 px-8 rounded-xl performance-button hover:scale-105 transition-all duration-300"
            >
              {/* Glassmorphism glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-default/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-secondary-default/20 rounded-full">
                  <FaCalendarAlt className="text-secondary-default text-xl group-hover:animate-pulse" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-secondary-default text-3xl font-bold leading-none">
                    {totalExperience}
                  </span>
                  <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                    Experience
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={PERFORMANCE_VARIANTS.cardSync}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-secondary-default/10 backdrop-blur-xl border border-secondary-default/30 text-primary py-4 px-8 rounded-xl performance-button hover:scale-105 transition-all duration-300"
            >
              {/* Glassmorphism glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <FaBriefcase className="text-secondary-default text-xl group-hover:animate-pulse" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-secondary-default text-3xl font-bold leading-none">
                    {totalCompanies}
                  </span>
                  <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                    Companies
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Career Highlights Badges */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.containerSync}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <motion.span
              variants={PERFORMANCE_VARIANTS.cardSync}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-default/10 to-transparent backdrop-blur-sm border border-secondary-default/30 text-secondary-default px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary-default/20 transition-all duration-300"
            >
              <FaAward className="text-xs" />
              Full-Stack Leadership
            </motion.span>
            <motion.span
              variants={PERFORMANCE_VARIANTS.cardSync}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-transparent backdrop-blur-sm border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500/20 transition-all duration-300"
            >
              <FaRocket className="text-xs" />
              Innovation Driver
            </motion.span>
            <motion.span
              variants={PERFORMANCE_VARIANTS.cardSync}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-transparent backdrop-blur-sm border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-500/20 transition-all duration-300"
            >
              <FaBriefcase className="text-xs" />
              Team Builder
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Enhanced Timeline with Better Animation */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.fadeInFast}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Timeline Background Gradient */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-default/5 to-transparent pointer-events-none rounded-3xl" /> */}
          
          <VerticalTimeline
            className="xl:custom-vt"
            animate={true}
            lineColor="var(--color-secondary-default)"
          >
            {timeLineItems.map((item, index) => (
              <TimelineElement
                key={index}
                item={item}
                index={index}
              />
            ))}
          </VerticalTimeline>
        </motion.div>
      </div>
    </section>
  );
};

export default Career;
