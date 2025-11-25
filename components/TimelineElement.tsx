"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaCheckCircle,
  FaCalendar,
  FaClock,
} from "react-icons/fa";
import {
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
  const isFeatured = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`relative md:pl-20 mb-6 ${className}`}
      data-testid={`timeline-career-${index}`}
    >
      {/* Timeline Dot - Hidden on mobile, visible on md+ */}
      <div className={`hidden md:block absolute left-6 top-6 w-5 h-5 rounded-full border-4 border-[#1a1a1f] shadow-lg ${isFeatured
          ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/30'
          : 'bg-gradient-to-br from-secondary-default to-blue-500 shadow-secondary-default/30'
        }`} />

      {/* Career Card - Matching ProjectCard design */}
      <div
        className={`group relative p-5 rounded-xl border transition-all duration-500 hover:shadow-2xl ${isFeatured
            ? 'bg-gradient-to-br from-purple-500/5 via-[#27272c] to-[#2a2a30] border-purple-500/30 shadow-md shadow-purple-500/10 hover:border-purple-500/50 hover:shadow-purple-500/20'
            : 'bg-gradient-to-br from-[#27272c] to-[#2a2a30] border-secondary-default/20 hover:border-secondary-default/60 hover:shadow-secondary-default/20'
          }`}
      >
        {/* Header Row: Title (left) + Date Info (right) */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-bold transition-colors duration-300 ${isFeatured
                ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-[#00BFFF] to-white bg-clip-text text-transparent'
              }`}>
              {item.position}
            </h3>
          </div>

          {/* Date Info Badges - Right Side (Desktop) - Contextual colors */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <div className="inline-flex items-center justify-center h-7 bg-secondary-default/10 backdrop-blur-sm Fborder border-secondary-default/30 text-secondary-default px-3 rounded-full text-xs font-medium">
              <FaCalendar className="text-[10px] mr-1.5" />
              <span>{getDateRange(item.startDate, item.endDate)}</span>
            </div>
            <div className="inline-flex items-center justify-center h-7 bg-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-[#00BFFF]/90 px-3 rounded-full text-xs font-medium">
              <FaClock className="text-[10px] mr-1.5" />
              <span>{getDuration(item.startDate, item.endDate)}</span>
            </div>
          </div>
        </div>

        {/* Company Row with Icon + Location */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Company Icon - Simple square like Project Modal */}
            <Image
              src={item.icon}
              alt={`${item.company} logo`}
              width={20}
              height={20}
              className="rounded-sm opacity-80 hover:opacity-100 transition-opacity flex-shrink-0"
            />

            {/* Company Name - Match Project Card font size */}
            <p className="text-xs text-white/60 font-medium">
              @ <Link
                href={item.url}
                className="hover:text-secondary-default transition-colors duration-300"
                target="_blank"
              >
                {item.company}
              </Link>
            </p>
          </div>

          {/* Job Type Tags + Location - Desktop */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            {/* Job Type Badges - Match CATEGORY_BADGE_CLASSES with contextual colors */}
            {item.jobType.map((type, typeIndex) => (
              <span
                key={typeIndex}
                className={`inline-flex items-center justify-center h-7 text-[11px] px-2.5 rounded-lg font-bold uppercase tracking-wide backdrop-blur-sm transition-all duration-300 ${isFeatured
                    ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20'
                    : 'bg-secondary-default/10 border border-secondary-default/30 text-secondary-default hover:bg-secondary-default/20'
                  }`}
              >
                {type}
              </span>
            ))}

            {/* Separator */}
            <span className="h-7 text-white/30 text-xs inline-flex items-center justify-center">|</span>

            {/* Location Badge - Contextual colors */}
            <div className="inline-flex items-center justify-center h-7 gap-1.5 text-white/70 text-xs bg-white/5 backdrop-blur-sm border border-white/10 px-3 rounded-full hover:bg-white/10 transition-all duration-300">
              <FaMapMarkedAlt className={`text-[10px] ${isFeatured ? 'text-purple-400' : 'text-secondary-default'}`} />
              {item.location}
            </div>
          </div>
        </div>

        {/* Date Info Badges + Job Type + Location - Mobile Only */}
        <div className="sm:hidden flex flex-wrap items-center gap-2 mb-3">
          {/* Date badges - Match STATUS_BADGE_CLASSES with contextual colors */}
          <div className={`inline-flex items-center justify-center h-7 backdrop-blur-sm px-3 rounded-full text-xs font-medium ${isFeatured
              ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300'
              : 'bg-secondary-default/10 border border-secondary-default/30 text-secondary-default'
            }`}>
            <FaCalendar className="text-[10px] mr-1.5" />
            <span>{getDateRange(item.startDate, item.endDate)}</span>
          </div>
          <div className="inline-flex items-center justify-center h-7 bg-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-[#00BFFF]/90 px-3 rounded-full text-xs font-medium">
            <FaClock className="text-[10px] mr-1.5" />
            <span>{getDuration(item.startDate, item.endDate)}</span>
          </div>

          {/* Job Type Badges - Match CATEGORY_BADGE_CLASSES with contextual colors */}
          {item.jobType.map((type, typeIndex) => (
            <span
              key={typeIndex}
              className={`inline-flex items-center justify-center h-7 text-[11px] px-2.5 rounded-lg font-bold uppercase tracking-wide backdrop-blur-sm transition-all duration-300 ${isFeatured
                  ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20'
                  : 'bg-secondary-default/10 border border-secondary-default/30 text-secondary-default hover:bg-secondary-default/20'
                }`}
            >
              {type}
            </span>
          ))}

          {/* Separator */}
          <span className="h-7 text-white/30 text-xs inline-flex items-center justify-center">|</span>

          {/* Location for mobile - Contextual colors */}
          <div className="inline-flex items-center justify-center h-7 gap-1.5 text-white/70 text-xs bg-white/5 backdrop-blur-sm border border-white/10 px-3 rounded-full">
            <FaMapMarkedAlt className={`text-[10px] ${isFeatured ? 'text-purple-400' : 'text-secondary-default'}`} />
            {item.location}
          </div>
        </div>

        {/* Responsibilities Section - Improved */}
        <div className="space-y-2 relative z-10 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-1 h-4 rounded-full ${isFeatured ? 'bg-gradient-to-b from-purple-500 to-pink-500' : 'bg-gradient-to-b from-secondary-default to-blue-500'
              }`} />
            <h4 className={`text-xs font-bold uppercase tracking-wide ${isFeatured ? 'text-purple-300' : 'text-secondary-default'
              }`}>
              Key Achievements & Responsibilities
            </h4>
          </div>
          <div className="space-y-2">
            {item.responsibilities.map((responsibility, respIndex) => (
              <motion.div
                key={respIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: respIndex * 0.05 }}
                className="flex items-start gap-3 group/item hover:bg-gradient-to-r hover:from-white/5 hover:to-transparent px-3 py-2 rounded-lg transition-all duration-300 border border-transparent hover:border-white/5"
              >
                <div className="flex-shrink-0 mt-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full group-hover/item:scale-150 transition-all duration-200 ${isFeatured
                      ? 'bg-purple-400 shadow-sm shadow-purple-400/50'
                      : 'bg-secondary-default shadow-sm shadow-secondary-default/50'
                    }`} />
                </div>
                <p className="text-white/80 leading-relaxed text-sm group-hover/item:text-white/95 transition-colors duration-200">
                  {responsibility}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineElement;
