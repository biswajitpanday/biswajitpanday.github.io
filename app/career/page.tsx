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
import BackgroundElements from "@/components/BackgroundElements";
import SectionHeader from "@/components/SectionHeader";
import StatsCards from "@/components/StatsCards";
import Badge from "@/components/Badge";

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
            className="flex flex-wrap justify-center gap-3 mb-12 -mt-2"
          >
            <Badge
              icon={<FaAward className="text-xs" />}
              text="Full-Stack Leadership"
              color="default"
            />
            <Badge
              icon={<FaRocket className="text-xs" />}
              text="Innovation Driver"
              color="blue"
            />
            <Badge
              icon={<FaBriefcase className="text-xs" />}
              text="Team Builder"
              color="purple"
            />
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
