"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { skills1 } from '@/data/skillsData';

// Skill interface matching skillsData structure
interface SkillNode {
  name: string;
  metadata?: {
    icon: string;
    level?: "Expert" | "Advanced" | "Intermediate" | "Familiar";
    yearsOfExperience?: number;
    lastUsed?: string;
  };
  children?: SkillNode[];
}

// Updated level to color mapping with glassmorphism theme
const levelToColor = {
  'Expert': 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 border-emerald-500/50 backdrop-blur-sm',
  'Advanced': 'bg-gradient-to-br from-blue-500/20 to-blue-600/30 border-blue-500/50 backdrop-blur-sm',
  'Intermediate': 'bg-gradient-to-br from-purple-500/20 to-purple-600/30 border-purple-500/50 backdrop-blur-sm',
  'Familiar': 'bg-gradient-to-br from-slate-500/20 to-slate-600/30 border-slate-500/50 backdrop-blur-sm',
};

const levelToTextColor = {
  'Expert': 'text-emerald-400',
  'Advanced': 'text-blue-400',
  'Intermediate': 'text-purple-400', // Changed from amber
  'Familiar': 'text-slate-400',
};

interface SkillsHeatMapModalProps {
  onClose: () => void;
}

export default function SkillsHeatMapModal({ onClose }: SkillsHeatMapModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  // Proficiency level filter state (all selected by default)
  const [selectedLevels, setSelectedLevels] = useState<Set<string>>(
    new Set(['Expert', 'Advanced', 'Intermediate', 'Familiar'])
  );

  // Toggle level selection
  const toggleLevel = (level: string) => {
    const newLevels = new Set(selectedLevels);
    if (newLevels.has(level)) {
      newLevels.delete(level);
    } else {
      newLevels.add(level);
    }
    setSelectedLevels(newLevels);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Extract all skills with metadata
  const extractSkills = (node: SkillNode): { category: string; skills: SkillNode[] }[] => {
    const categories: { category: string; skills: SkillNode[] }[] = [];

    if (node.children) {
      node.children.forEach(categoryNode => {
        if (categoryNode.children) {
          const skillsWithMetadata = categoryNode.children.filter(
            skill => skill.metadata && (skill.metadata.level || skill.metadata.yearsOfExperience)
          );

          if (skillsWithMetadata.length > 0) {
            categories.push({
              category: categoryNode.name,
              skills: skillsWithMetadata
            });
          }
        }
      });
    }

    return categories;
  };

  const skillCategories = extractSkills(skills1);

  // Filter categories and skills by proficiency level
  const displayedCategories = (selectedCategory
    ? skillCategories.filter(c => c.category === selectedCategory)
    : skillCategories
  ).map(({ category, skills }) => ({
    category,
    skills: skills.filter(skill => {
      const level = skill.metadata?.level || 'Familiar';
      return selectedLevels.has(level);
    })
  })).filter(({ skills }) => skills.length > 0); // Remove empty categories

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal - Matching ProjectModal structure */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl border border-secondary-default/30 rounded-2xl w-full max-w-6xl max-h-[calc(100vh-160px)] overflow-hidden shadow-2xl shadow-secondary-default/20 flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - flex-shrink-0 prevents header from scrolling */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-default/20 bg-gradient-to-r from-secondary-default/10 via-transparent to-secondary-default/10 flex-shrink-0">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-secondary-default bg-clip-text text-transparent">
              Skills Heat Map
            </h2>
            <button
              onClick={onClose}
              className="p-2.5 text-white/60 hover:text-white bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 transition-all duration-200 rounded-full"
              aria-label="Close modal"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="overflow-y-auto custom-scrollbar px-6 py-6 flex-1">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-lg transition-all text-xs ${
                  selectedCategory === null
                    ? 'bg-secondary-default text-primary'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                All Categories
              </button>
              {skillCategories.map(({ category }) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg transition-all text-xs ${
                    selectedCategory === category
                      ? 'bg-secondary-default text-primary'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Proficiency Level Filter with Checkboxes */}
            <div className="flex flex-wrap gap-4 justify-center mb-6 pb-4 border-b border-white/10">
              <button
                onClick={() => toggleLevel('Expert')}
                className="flex items-center gap-2 cursor-pointer group transition-all hover:scale-105"
              >
                <div className="relative w-5 h-5 bg-emerald-500/90 border border-emerald-500 rounded flex items-center justify-center">
                  {selectedLevels.has('Expert') && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {!selectedLevels.has('Expert') && (
                    <div className="absolute inset-0 bg-black/60 rounded" />
                  )}
                </div>
                <span className="text-xs text-white/70 group-hover:text-white transition-colors">Expert</span>
              </button>
              <button
                onClick={() => toggleLevel('Advanced')}
                className="flex items-center gap-2 cursor-pointer group transition-all hover:scale-105"
              >
                <div className="relative w-5 h-5 bg-blue-500/90 border border-blue-500 rounded flex items-center justify-center">
                  {selectedLevels.has('Advanced') && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {!selectedLevels.has('Advanced') && (
                    <div className="absolute inset-0 bg-black/60 rounded" />
                  )}
                </div>
                <span className="text-xs text-white/70 group-hover:text-white transition-colors">Advanced</span>
              </button>
              <button
                onClick={() => toggleLevel('Intermediate')}
                className="flex items-center gap-2 cursor-pointer group transition-all hover:scale-105"
              >
                <div className="relative w-5 h-5 bg-purple-500/90 border border-purple-500 rounded flex items-center justify-center">
                  {selectedLevels.has('Intermediate') && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {!selectedLevels.has('Intermediate') && (
                    <div className="absolute inset-0 bg-black/60 rounded" />
                  )}
                </div>
                <span className="text-xs text-white/70 group-hover:text-white transition-colors">Intermediate</span>
              </button>
              <button
                onClick={() => toggleLevel('Familiar')}
                className="flex items-center gap-2 cursor-pointer group transition-all hover:scale-105"
              >
                <div className="relative w-5 h-5 bg-slate-500/70 border border-slate-500 rounded flex items-center justify-center">
                  {selectedLevels.has('Familiar') && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {!selectedLevels.has('Familiar') && (
                    <div className="absolute inset-0 bg-black/60 rounded" />
                  )}
                </div>
                <span className="text-xs text-white/70 group-hover:text-white transition-colors">Familiar</span>
              </button>
            </div>

            {/* Heat Map Grid */}
            <div className="space-y-8">
              {displayedCategories.map(({ category, skills }) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-white/90 mb-4">{category}</h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {skills.map((skill, skillIndex) => {
                      const level = skill.metadata?.level || 'Familiar';
                      const colorClass = levelToColor[level];
                      const experience = skill.metadata?.yearsOfExperience;
                      const lastUsed = skill.metadata?.lastUsed;

                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: skillIndex * 0.015 }}
                          whileHover={{ scale: 1.05 }}
                          className="relative group"
                        >
                          <div
                            className={`p-3 rounded-lg border-2 ${colorClass} cursor-pointer transition-all`}
                          >
                            {/* Skill Name */}
                            <div className="text-white font-semibold text-sm mb-1.5">{skill.name}</div>

                            {/* Experience Badge */}
                            {experience && (
                              <div className="text-xs text-white/80 mb-1">
                                {experience}+ {experience === 1 ? 'year' : 'years'}
                              </div>
                            )}

                            {/* Level Badge */}
                            <div className="text-xs text-white/70">{level}</div>

                            {/* Last Used */}
                            {lastUsed && (
                              <div className="text-xs text-white/60 mt-1">
                                {lastUsed === 'Current' ? '🟢 Current' : `Last: ${lastUsed}`}
                              </div>
                            )}
                          </div>

                          {/* Fixed Tooltip - Shows ABOVE with proper z-index */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                            <div className="bg-gray-900/95 backdrop-blur-sm border border-secondary-default/40 rounded-lg px-3 py-2 shadow-xl min-w-[180px]">
                              <div className="text-xs font-semibold text-white mb-1.5">{skill.name}</div>
                              <div className="text-[10px] text-white/70 space-y-0.5">
                                <div>Level: <span className={levelToTextColor[level]}>{level}</span></div>
                                {experience && <div>Experience: {experience} years</div>}
                                {lastUsed && <div>Last Used: {lastUsed}</div>}
                              </div>
                              {/* Tooltip Arrow */}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                                <div className="border-4 border-transparent border-t-gray-900/95"></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer - flex-shrink-0 prevents footer from scrolling */}
          <div className="px-6 py-3 border-t border-secondary-default/20 bg-white/5 flex-shrink-0">
            <p className="text-xs text-white/40 text-center">
              Press ESC or click outside to close
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
