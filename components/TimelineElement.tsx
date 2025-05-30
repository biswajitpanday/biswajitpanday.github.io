"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import {
  calculateFromToWithDuration,
  getDateRange,
  getDuration,
} from "@/helpers/utility";

interface TimelineItem {
  icon: string;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate: Date;
  url: string;
  jobType: string[];
  responsibilities: string[];
}

interface TimelineElementProps {
  item: TimelineItem;
  index: number;
  className?: string;
}

const TimelineElement: React.FC<TimelineElementProps> = ({
  item,
  index,
  className = ""
}) => {
  return (
    <VerticalTimelineElement
      position={"right"}
      className={`vertical-timeline-element--work text-white/80 xl:custom-vt-element ${className}`}
      contentStyle={{
        background:
          "linear-gradient(135deg, rgba(39, 39, 44, 0.95) 0%, rgba(42, 42, 48, 0.95) 100%)",
        color: "#ffffff",
        boxShadow: "0 20px 40px rgba(0, 191, 255, 0.1), 0 0 20px rgba(0, 191, 255, 0.05)",
        border: "1px solid rgba(0, 191, 255, 0.3)",
        borderRadius: "16px",
        backdropFilter: "blur(20px)",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(0, 191, 255, 0.8)",
      }}
      date={calculateFromToWithDuration(
        item.startDate,
        item.endDate
      )}
      iconStyle={{
        background:
          "linear-gradient(135deg, var(--color-secondary-default), #0099cc)",
        color: "#ffffff",
        boxShadow: "0 8px 32px rgba(0, 191, 255, 0.4), 0 0 20px rgba(0, 191, 255, 0.2)",
        border: "3px solid rgba(255, 255, 255, 0.1)",
      }}
      icon={
        <div className="flex w-[100%] h-[100%] justify-center items-center p-1">
          <div className="relative overflow-hidden rounded-full">
            <Image
              src={item.icon}
              alt={item.company}
              width={90}
              height={90}
              className="rounded-full object-cover"
              style={{ filter: "brightness(1.1) contrast(1.1)" }}
            />
            {/* Subtle overlay for better integration */}
            <div className="absolute inset-0 bg-secondary-default/10 rounded-full" />
          </div>
        </div>
      }
      key={index}
      visible={true}
    >
      <div className="flex flex-col relative">
        {/* Custom Date Display for Mobile/Tablet with Enhanced Design */}
        <div className="xl:hidden mb-6 flex flex-row justify-between items-center gap-3">
          <span className="inline-flex items-center bg-gradient-to-r from-secondary-default/20 to-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-secondary-default px-4 py-2 rounded-full text-xs font-medium hover:bg-secondary-default/30 transition-all duration-300 shadow-lg">
            {getDateRange(item.startDate, item.endDate)}
          </span>
          <span className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-blue-500/10 backdrop-blur-sm border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-xs font-medium hover:bg-blue-500/30 transition-all duration-300 shadow-lg">
            {getDuration(item.startDate, item.endDate)}
          </span>
        </div>

        {/* Enhanced Header Section with Position and Job Type Tags */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-4 relative z-10">
          <div className="flex flex-col xl:flex-row xl:items-center gap-4">
            <h3 className="vertical-timeline-element-title text-2xl font-extrabold text-white text-center lg:text-left hover:text-secondary-default transition-colors duration-300">
              {item.position}
            </h3>
            <div className="flex flex-wrap gap-2 mx-auto lg:mx-0">
              {item.jobType.map((type, typeIndex) => (
                <span
                  key={typeIndex}
                  className="inline-flex text-xs font-bold items-center gap-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 text-white/80 py-2 px-4 rounded-full hover:bg-white/20 hover:text-white hover:border-secondary-default hover:scale-105 transition-all duration-300 shadow-md"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
          <span className="flex items-center gap-3 text-white/70 text-sm mx-auto lg:mx-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 shadow-md">
            <FaMapMarkedAlt className="text-secondary-default" />
            {item.location}
          </span>
        </div>

        {/* Enhanced Company Section */}
        <div className="vertical-timeline-element-subtitle text-center lg:text-left mb-6 relative z-10">
          <Link
            href={item.url}
            className="group text-xl font-bold text-white transition-all duration-300 relative inline-block hover:text-secondary-default hover:scale-105"
            target="_blank"
          >
            <span className="relative z-10">{item.company}</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary-default to-blue-400 transition-all duration-300 group-hover:w-full"></span>
            {/* Subtle glow effect */}
            <span className="absolute inset-0 bg-secondary-default/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
          </Link>
        </div>

        {/* Enhanced Responsibilities Section with Better Visual Hierarchy */}
        <div className="space-y-3 relative z-10">
          <h4 className="text-sm font-semibold text-secondary-default uppercase tracking-wider text-center lg:text-left flex items-center gap-2 justify-center lg:justify-start">
            <FaCheckCircle className="text-xs" />
            Key Achievements & Responsibilities
          </h4>
          <div className="space-y-3">
            {item.responsibilities.map((responsibility, respIndex) => (
              <motion.div
                key={respIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: respIndex * 0.1 }}
                className="flex items-start gap-4 group hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent p-3 rounded-lg transition-all duration-300 border border-transparent hover:border-white/10"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-secondary-default rounded-full group-hover:scale-125 transition-transform duration-200 shadow-lg shadow-secondary-default/50" />
                </div>
                <p className="text-white/85 leading-relaxed text-sm group-hover:text-white transition-colors duration-200">
                  {responsibility}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

export default TimelineElement; 