"use client";
import {
  calculateFromToWithDuration,
  calculateTotalExperience,
  getDateRange,
  getDuration,
} from "@/helpers/utility";
import { timeLineItems } from "@/data/timelineData";
import Link from "next/link";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/image";
import {
  FaMapMarkedAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Career = () => {
  const totalExperience = calculateTotalExperience(timeLineItems);
  const totalCompanies = timeLineItems.length;

  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-default/5 pointer-events-none" />
      <div className="absolute top-20 right-10 w-2 h-2 bg-secondary-default rounded-full animate-ping opacity-60" />
      <div className="absolute bottom-32 left-16 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute top-1/3 left-8 w-1.5 h-1.5 bg-secondary-default rounded-full animate-bounce opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Professional Header */}
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
            <FaRocket className="text-lg animate-pulse" />
            <span>Career Timeline</span>
            <FaTrophy className="text-lg" />
          </motion.div> */}

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl xl:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Professional{" "}
            <span className="bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text text-transparent animate-gradient">
              Journey
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg xl:text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Transforming ideas into{" "}
            <span className="text-secondary-default font-semibold">
              scalable solutions
            </span>{" "}
            through innovative software engineering and{" "}
            <span className="text-secondary-default font-semibold">
              leadership excellence
            </span>
          </motion.p>

          {/* Enhanced Experience Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8"
          >
            <div className="group relative overflow-hidden bg-gradient-to-r from-secondary-default/10 to-blue-500/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded hover:bg-secondary-default/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-secondary-default text-xl group-hover:animate-pulse" />
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-default text-2xl font-bold">
                    {totalExperience}
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    Experience
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded hover:bg-secondary-default/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25">
              <div className="flex items-center gap-3">
                <FaBriefcase className="text-secondary-default text-xl group-hover:animate-pulse" />
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-default text-2xl font-bold">
                    {totalCompanies}
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    Companies
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <VerticalTimeline
            className="xl:custom-vt"
            animate={true}
            lineColor="var(--color-secondary-default)"
          >
            {timeLineItems.map((item, index) => {
              return (
                <VerticalTimelineElement
                  position={"right"}
                  className="vertical-timeline-element--work text-white/80 xl:custom-vt-element"
                  contentStyle={{
                    background:
                      "linear-gradient(135deg, #27272c 0%, #2a2a30 100%)",
                    color: "#ffffff",
                    boxShadow: "0 8px 32px rgba(0, 191, 255, 0.1)",
                    border: "1px solid var(--color-secondary-default)",
                    borderRadius: "12px",
                  }}
                  contentArrowStyle={{
                    borderRight: "7px solid var(--color-secondary-default)",
                  }}
                  date={calculateFromToWithDuration(
                    item.startDate,
                    item.endDate
                  )}
                  iconStyle={{
                    background:
                      "linear-gradient(135deg, var(--color-secondary-default), #0099cc)",
                    color: "#ffffff",
                    boxShadow: "0 4px 16px rgba(0, 191, 255, 0.3)",
                  }}
                  icon={
                    <div className="flex w-[100%] h-[100%] justify-center items-center">
                      <Image
                        src={item.icon}
                        alt={item.company}
                        width={90}
                        height={90}
                        style={{ borderRadius: "50%", padding: "5%" }}
                      />
                    </div>
                  }
                  key={index}
                  visible={true}
                >
                  <div className="flex flex-col">
                    {/* Custom Date Display for Mobile/Tablet */}
                    <div className="xl:hidden mb-4 flex flex-row justify-between items-center gap-2">
                      <span className="inline-flex items-center bg-secondary-default/30 text-secondary-default px-3 py-1.5 rounded text-xs font-medium hover:bg-secondary-default/20 transition-all duration-300">
                        {getDateRange(item.startDate, item.endDate)}
                      </span>
                      <span className="inline-flex items-center bg-secondary-default/30 text-secondary-default px-3 py-1.5 rounded text-xs font-medium hover:bg-secondary-default/20 transition-all duration-300">
                        {getDuration(item.startDate, item.endDate)}
                      </span>
                    </div>

                    {/* Header Section with Position and Job Type Tags */}
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 mb-2">
                      <div className="flex flex-col xl:flex-row xl:items-center gap-4">
                        <h3 className="vertical-timeline-element-title text-xl font-extrabold text-secondary-default text-center lg:text-left">
                          {item.position}
                        </h3>
                        <div className="flex flex-wrap gap-2 mx-auto lg:mx-0">
                          {item.jobType.map((type, index) => (
                            <span
                              key={index}
                              className="inline-flex text-xs font-bold items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 py-1 px-3 rounded hover:bg-white/10 hover:text-white hover:border-secondary-default transition-all duration-300"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="flex items-center gap-2 text-white/70 text-sm mx-auto lg:mx-0 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded">
                        <FaMapMarkedAlt className="text-secondary-default" />
                        {item.location}
                      </span>
                    </div>

                    {/* Company Section */}
                    <div className="vertical-timeline-element-subtitle text-center lg:text-left">
                      <Link
                        href={item.url}
                        className="group text-xl font-bold text-white transition-all duration-300 relative inline-block hover:text-secondary-default"
                        target="_blank"
                      >
                        {item.company}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-default transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </div>

                    {/* Modern Responsibilities Section */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-secondary-default uppercase tracking-wider mt-6 text-center lg:text-left flex items-center gap-2">
                        Key Achievements & Responsibilities
                      </h4>
                      <div className="space-y-2">
                        {item.responsibilities.map((responsibility, index) => (
                          <div
                            key={index}
                            className="flex items-baseline gap-3 group hover:bg-white/5 p-2 rounded transition-all duration-300"
                          >
                            <div className="flex-shrink-0 mt-2">
                              <FaCheckCircle className="text-secondary-default text-sm group-hover:scale-110 transition-transform duration-200" />
                            </div>
                            <p className="text-white/85 leading-relaxed text-sm group-hover:text-white transition-colors duration-200 !mt-2">
                              {responsibility}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </motion.div>
      </div>
    </section>
  );
};

export default Career;
