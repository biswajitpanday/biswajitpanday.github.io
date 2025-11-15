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

// Level to color mapping
const levelToColor = {
  'Expert': 'bg-emerald-500/90 border-emerald-400',
  'Advanced': 'bg-blue-500/80 border-blue-400',
  'Intermediate': 'bg-amber-500/70 border-amber-400',
  'Familiar': 'bg-slate-500/60 border-slate-400',
};

interface SkillsHeatMapModalProps {
  onClose: () => void;
}

export default function SkillsHeatMapModal({ onClose }: SkillsHeatMapModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

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

  // Filter categories
  const displayedCategories = selectedCategory
    ? skillCategories.filter(c => c.category === selectedCategory)
    : skillCategories;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-primary border-2 border-secondary-default/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-secondary-default bg-clip-text text-transparent">
              Skills Heat Map
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <FiX className="text-2xl text-white/70 hover:text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg transition-all text-sm ${
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
                  className={`px-4 py-2 rounded-lg transition-all text-sm ${
                    selectedCategory === category
                      ? 'bg-secondary-default text-primary'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 justify-center mb-8 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500/90 border border-emerald-400 rounded" />
                <span className="text-sm text-white/80">Expert</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500/80 border border-blue-400 rounded" />
                <span className="text-sm text-white/80">Advanced</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-amber-500/70 border border-amber-400 rounded" />
                <span className="text-sm text-white/80">Intermediate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-500/60 border border-slate-400 rounded" />
                <span className="text-sm text-white/80">Familiar</span>
              </div>
            </div>

            {/* Heat Map Grid */}
            <div className="space-y-10">
              {displayedCategories.map(({ category, skills }, categoryIndex) => (
                <div key={category}>
                  <h3 className="text-xl font-semibold text-white/90 mb-4">{category}</h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                          transition={{ duration: 0.3, delay: skillIndex * 0.02 }}
                          whileHover={{ scale: 1.05 }}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className={`relative p-4 rounded-lg border-2 ${colorClass} cursor-pointer transition-all`}
                        >
                          {/* Skill Name */}
                          <div className="text-white font-semibold text-sm mb-2">{skill.name}</div>

                          {/* Experience Badge */}
                          {experience && (
                            <div className="text-xs text-white/90 mb-1">
                              {experience}+ {experience === 1 ? 'year' : 'years'}
                            </div>
                          )}

                          {/* Level Badge */}
                          <div className="text-xs text-white/80">{level}</div>

                          {/* Last Used */}
                          {lastUsed && (
                            <div className="text-xs text-white/60 mt-1">
                              {lastUsed === 'Current' ? '🟢 Current' : `Last: ${lastUsed}`}
                            </div>
                          )}

                          {/* Hover Tooltip */}
                          {hoveredSkill === skill && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute z-10 top-full left-0 mt-2 p-3 bg-primary border border-secondary-default/30 rounded-lg shadow-xl min-w-[200px]"
                            >
                              <div className="text-sm font-semibold text-white mb-1">{skill.name}</div>
                              <div className="text-xs text-white/70 space-y-1">
                                <div>Level: {level}</div>
                                {experience && <div>Experience: {experience} years</div>}
                                {lastUsed && <div>Last Used: {lastUsed}</div>}
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/10 bg-white/5">
            <p className="text-sm text-white/50 text-center">
              Click outside or press ESC to close
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
