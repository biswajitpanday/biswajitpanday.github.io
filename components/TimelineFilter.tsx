"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import type { Project } from "@/data/portfolioData";

interface TimelineFilterProps {
  selectedSkill: string | null;
  onSkillChange: (skill: string | null) => void;
  projects: Project[];
}

const TimelineFilter: React.FC<TimelineFilterProps> = ({
  selectedSkill,
  onSkillChange,
  projects,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get all unique technologies
  const technologies = Array.from(new Set(projects.flatMap(p => p.stacks))).sort();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (tech: string | null) => {
    onSkillChange(tech);
    setIsOpen(false);
  };

  return (
    <div className="flex-1 relative" ref={dropdownRef} data-testid="timeline-filter-skill">
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-9 bg-gray-800/50 border border-secondary-default/20 rounded-lg px-3 text-xs text-white hover:border-secondary-default/50 focus:outline-none focus:ring-1 focus:ring-secondary-default/50 focus:border-secondary-default/50 transition-all duration-200 flex items-center justify-between"
      >
        <span className={selectedSkill ? "text-white" : "text-white/70"}>
          {selectedSkill || "All Technologies"}
        </span>
        <FiChevronDown className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-md border border-secondary-default/30 rounded-lg shadow-2xl z-[120] max-h-64 overflow-y-auto custom-scrollbar"
          >
            {/* "All Technologies" Option */}
            <button
              onClick={() => handleSelect(null)}
              className={`w-full text-left px-4 py-2.5 text-xs transition-all duration-200 ${
                !selectedSkill
                  ? "bg-secondary-default/20 text-secondary-default font-semibold"
                  : "text-white/80 hover:bg-white/5 hover:text-white"
              }`}
            >
              All Technologies
            </button>

            {/* Divider */}
            <div className="border-t border-white/10 my-1" />

            {/* Technology Options */}
            {technologies.map((tech) => (
              <button
                key={tech}
                onClick={() => handleSelect(tech)}
                className={`w-full text-left px-4 py-2.5 text-xs transition-all duration-200 ${
                  selectedSkill === tech
                    ? "bg-secondary-default/20 text-secondary-default font-semibold border-l-2 border-secondary-default"
                    : "text-white/80 hover:bg-white/5 hover:text-white hover:border-l-2 hover:border-secondary-default/50"
                }`}
              >
                {tech}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelineFilter;
