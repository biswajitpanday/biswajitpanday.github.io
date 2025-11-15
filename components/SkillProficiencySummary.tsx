"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills1 } from '@/data/skillsData';
import SkillsHeatMapModal from './SkillsHeatMapModal';

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

// Updated level to color mapping (replaced amber with purple/cyan)
const levelToColor = {
  'Expert': 'bg-emerald-500/90 border-emerald-500 text-white',
  'Advanced': 'bg-blue-500/90 border-blue-500 text-white',
  'Intermediate': 'bg-purple-500/90 border-purple-500 text-white', // Changed from amber
  'Familiar': 'bg-slate-500/70 border-slate-500 text-white',
};

const levelToGradient = {
  'Expert': 'from-emerald-500/20 to-emerald-500/10 border-emerald-500/40',
  'Advanced': 'from-blue-500/20 to-blue-500/10 border-blue-500/40',
  'Intermediate': 'from-purple-500/20 to-purple-500/10 border-purple-500/40', // Changed from amber
  'Familiar': 'from-slate-500/20 to-slate-500/10 border-slate-500/40',
};

const levelToTextColor = {
  'Expert': 'text-emerald-400',
  'Advanced': 'text-blue-400',
  'Intermediate': 'text-purple-400', // Changed from amber
  'Familiar': 'text-slate-400',
};

const levelToIcon = {
  'Expert': '🟢',
  'Advanced': '🔵',
  'Intermediate': '🟣', // Changed from 🟡
  'Familiar': '⚪',
};

export default function SkillProficiencySummary() {
  const [showFullHeatMap, setShowFullHeatMap] = useState(false);

  // Extract all skills with metadata
  const extractSkills = (node: SkillNode): SkillNode[] => {
    let allSkills: SkillNode[] = [];

    if (node.children) {
      node.children.forEach(categoryNode => {
        if (categoryNode.children) {
          const skillsWithMetadata = categoryNode.children.filter(
            skill => skill.metadata && skill.metadata.level
          );
          allSkills = [...allSkills, ...skillsWithMetadata];
        }
      });
    }

    return allSkills;
  };

  const allSkills = extractSkills(skills1);

  // Count by proficiency level
  const expertCount = allSkills.filter(s => s.metadata?.level === 'Expert').length;
  const advancedCount = allSkills.filter(s => s.metadata?.level === 'Advanced').length;
  const intermediateCount = allSkills.filter(s => s.metadata?.level === 'Intermediate').length;
  const familiarCount = allSkills.filter(s => s.metadata?.level === 'Familiar').length;

  // Get top 12 skills (prioritize Expert, then Advanced, then by years of experience)
  const topSkills = allSkills
    .sort((a, b) => {
      const levelOrder = { 'Expert': 4, 'Advanced': 3, 'Intermediate': 2, 'Familiar': 1 };
      const aLevel = levelOrder[a.metadata?.level || 'Familiar'];
      const bLevel = levelOrder[b.metadata?.level || 'Familiar'];

      if (aLevel !== bLevel) return bLevel - aLevel;

      const aYears = a.metadata?.yearsOfExperience || 0;
      const bYears = b.metadata?.yearsOfExperience || 0;
      return bYears - aYears;
    })
    .slice(0, 12);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl border border-secondary-default/30 rounded-xl p-4 shadow-lg shadow-secondary-default/10"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white/90">Proficiency Overview</h3>
          <button
            onClick={() => setShowFullHeatMap(true)}
            className="text-xs px-3 py-1.5 bg-gradient-to-r from-secondary-default/20 to-blue-500/20 border border-secondary-default/40 text-secondary-default rounded-lg hover:bg-secondary-default/30 transition-all"
          >
            View Full Heat Map →
          </button>
        </div>

        {/* Compact Stats Cards */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`bg-gradient-to-br ${levelToGradient.Expert} rounded-lg p-2 text-center`}
          >
            <div className="text-xl mb-0.5">{levelToIcon.Expert}</div>
            <div className={`text-xl font-bold ${levelToTextColor.Expert}`}>{expertCount}</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Expert</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className={`bg-gradient-to-br ${levelToGradient.Advanced} rounded-lg p-2 text-center`}
          >
            <div className="text-xl mb-0.5">{levelToIcon.Advanced}</div>
            <div className={`text-xl font-bold ${levelToTextColor.Advanced}`}>{advancedCount}</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Advanced</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={`bg-gradient-to-br ${levelToGradient.Intermediate} rounded-lg p-2 text-center`}
          >
            <div className="text-xl mb-0.5">{levelToIcon.Intermediate}</div>
            <div className={`text-xl font-bold ${levelToTextColor.Intermediate}`}>{intermediateCount}</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Intermidate</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className={`bg-gradient-to-br ${levelToGradient.Familiar} rounded-lg p-2 text-center`}
          >
            <div className="text-xl mb-0.5">{levelToIcon.Familiar}</div>
            <div className={`text-xl font-bold ${levelToTextColor.Familiar}`}>{familiarCount}</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Familiar</div>
          </motion.div>
        </div>

        {/* Compact Mini Heat Map Grid - Top 12 Skills */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5">
          {topSkills.map((skill, index) => {
            const level = skill.metadata?.level || 'Familiar';
            const colorClass = levelToColor[level];
            const experience = skill.metadata?.yearsOfExperience;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.03 }}
                className="relative group"
              >
                <div
                  className={`relative px-2 py-1.5 rounded-md border ${colorClass} text-center text-[11px] font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/20 cursor-pointer`}
                >
                  <div className="truncate">{skill.name}</div>
                  {experience && (
                    <div className="text-[9px] opacity-80 mt-0.5">{experience}y</div>
                  )}
                </div>

                {/* Fixed Tooltip - Shows ABOVE, better opacity, higher z-index */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  <div className="bg-gray-900/95 backdrop-blur-sm border border-secondary-default/40 rounded-lg px-3 py-2 shadow-xl min-w-[150px]">
                    <div className="text-xs font-semibold text-white mb-1">{skill.name}</div>
                    <div className="text-[10px] text-white/70 space-y-0.5">
                      <div>Level: <span className={levelToTextColor[level]}>{level}</span></div>
                      {experience && <div>Experience: {experience} years</div>}
                      {skill.metadata?.lastUsed && <div>Last Used: {skill.metadata.lastUsed}</div>}
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
      </motion.section>

      {/* Full Heat Map Modal */}
      {showFullHeatMap && (
        <SkillsHeatMapModal onClose={() => setShowFullHeatMap(false)} />
      )}
    </>
  );
}
