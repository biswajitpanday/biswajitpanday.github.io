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
import StatsCards, { StatCard } from "@/components/StatsCards";
import BackgroundElements from "@/components/BackgroundElements";
import SectionHeader from "@/components/SectionHeader";

const Career = () => {
  const totalExperience = calculateTotalExperience(timeLineItems);
  const totalCompanies = timeLineItems.length;

  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden py-8">
      {/* Enhanced Background Elements */}
      <BackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Professional Header - Using SectionHeader Component */}
        <SectionHeader
          title="Professional"
          highlightText="Journey"
          description={
            <>
              Transforming ideas into{" "}
              <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                scalable solutions
              </span>{" "}
              through innovative software engineering and{" "}
              <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                leadership excellence
              </span>
            </>
          }
        >
          {/* Career Stats */}
          <StatsCards 
            stats={[
              {
                icon: FaCalendarAlt,
                value: totalExperience,
                label: "Experience",
                gradient: "from-secondary-default/10 to-blue-500/10"
              },
              {
                icon: FaBriefcase,
                value: totalCompanies,
                label: "Companies",
                gradient: "from-blue-500/10 to-secondary-default/10"
              }
            ]} 
          />
        </SectionHeader>

        {/* Career Highlights Badges */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-12"
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
