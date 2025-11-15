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

// Level to color mapping
const levelToColor = {
  'Expert': 'bg-emerald-500/90 border-emerald-400 text-white',
  'Advanced': 'bg-blue-500/80 border-blue-400 text-white',
  'Intermediate': 'bg-amber-500/70 border-amber-400 text-white',
  'Familiar': 'bg-slate-500/60 border-slate-400 text-white',
};

const levelToIcon = {
  'Expert': '🟢',
  'Advanced': '🔵',
  'Intermediate': '🟡',
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
        transition={{ duration: 0.5 }}
        className="mb-8 bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-xl p-6"
      >
        <h3 className="text-2xl font-semibold mb-4 text-white/90">Proficiency Overview</h3>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-4 text-center"
          >
            <div className="text-3xl mb-1">{levelToIcon.Expert}</div>
            <div className="text-2xl font-bold text-emerald-400 mb-1">{expertCount}</div>
            <div className="text-xs text-white/60">Expert</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 text-center"
          >
            <div className="text-3xl mb-1">{levelToIcon.Advanced}</div>
            <div className="text-2xl font-bold text-blue-400 mb-1">{advancedCount}</div>
            <div className="text-xs text-white/60">Advanced</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-amber-500/10 border border-amber-400/30 rounded-lg p-4 text-center"
          >
            <div className="text-3xl mb-1">{levelToIcon.Intermediate}</div>
            <div className="text-2xl font-bold text-amber-400 mb-1">{intermediateCount}</div>
            <div className="text-xs text-white/60">Intermediate</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-slate-500/10 border border-slate-400/30 rounded-lg p-4 text-center"
          >
            <div className="text-3xl mb-1">{levelToIcon.Familiar}</div>
            <div className="text-2xl font-bold text-slate-400 mb-1">{familiarCount}</div>
            <div className="text-xs text-white/60">Familiar</div>
          </motion.div>
        </div>

        {/* Mini Heat Map Grid - Top 12 Skills */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-white/70 mb-3">Top Skills</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {topSkills.map((skill, index) => {
              const level = skill.metadata?.level || 'Familiar';
              const colorClass = levelToColor[level];
              const experience = skill.metadata?.yearsOfExperience;

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  className={`relative px-3 py-2 rounded-lg border-2 ${colorClass} text-center text-xs font-semibold transition-transform hover:scale-105`}
                  title={`${skill.name} - ${level}${experience ? ` (${experience}+ years)` : ''}`}
                >
                  <div className="truncate">{skill.name}</div>
                  {experience && (
                    <div className="text-[10px] opacity-80 mt-0.5">{experience}y</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* View Full Heat Map Button */}
        <div className="text-center">
          <button
            onClick={() => setShowFullHeatMap(true)}
            className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-secondary-default to-blue-500 text-primary rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
          >
            View Full Skills Heat Map →
          </button>
        </div>
      </motion.section>

      {/* Full Heat Map Modal */}
      {showFullHeatMap && (
        <SkillsHeatMapModal onClose={() => setShowFullHeatMap(false)} />
      )}
    </>
  );
}
