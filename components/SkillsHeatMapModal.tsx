"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FaTh, FaReact, FaServer, FaSitemap, FaCode, FaDatabase, FaTasks, FaTools, FaDocker, FaAws, FaNodeJs, FaPython, FaJava, FaAngular, FaVuejs } from 'react-icons/fa';
import { SiDotnet, SiMicrosoftazure, SiKubernetes, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiTypescript, SiNextdotjs, SiExpress, SiNestjs, SiGraphql, SiRabbitmq, SiElasticsearch, SiKafka } from 'react-icons/si';
import DynamicIcon from '@/components/DynamicIcon';
import { skills1, skills2 } from '@/data/skillsData';

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
  'Expert': 'bg-gradient-to-br from-purple-500/20 to-purple-600/30 border-purple-500/50 backdrop-blur-sm',
  'Advanced': 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 border-emerald-500/50 backdrop-blur-sm',
  'Intermediate': 'bg-gradient-to-br from-blue-500/20 to-blue-600/30 border-blue-500/50 backdrop-blur-sm',
  'Familiar': 'bg-gradient-to-br from-slate-500/20 to-slate-600/30 border-slate-500/50 backdrop-blur-sm',
};

const levelToTextColor = {
  'Expert': 'text-purple-400',
  'Advanced': 'text-emerald-400',
  'Intermediate': 'text-blue-400',
  'Familiar': 'text-slate-400',
};

const levelOrder = {
  'Expert': 4,
  'Advanced': 3,
  'Intermediate': 2,
  'Familiar': 1,
};

// Category icon mapping
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'All Categories': FaTh,
  'Frameworks': FaReact,
  'Backend Runtime & Platforms': FaServer,
  'Architectures/Patterns': FaSitemap,
  'Programming Languages': FaCode,
  'Databases': FaDatabase,
  'Agile Methodologies': FaTasks,
  'Other Skills': FaTools,
};

// Technology icon mapping - comprehensive list
const getTechnologyIcon = (techName: string) => {
  const iconMap: Record<string, string> = {
    // .NET Technologies
    'ASP.NET Core': 'SiDotnet',
    'ASP.NET MVC': 'SiDotnet',
    '.NET Core/.NET 6/7/8/9': 'SiDotnet',
    'C#': 'TbBrandCSharp',

    // JavaScript/TypeScript Frameworks
    'React': 'FaReact',
    'Next.js': 'SiNextdotjs',
    'Angular': 'FaAngular',
    'Vue.js': 'FaVuejs',
    'Express.js': 'SiExpress',
    'Node.js': 'FaNodeJs',
    'NestJS': 'SiNestjs',
    'Blazor': 'SiDotnet',

    // Languages
    'JavaScript': 'FaJs',
    'TypeScript': 'SiTypescript',
    'Python': 'FaPython',
    'Java': 'FaJava',

    // Cloud & Infrastructure
    'Azure': 'SiMicrosoftazure',
    'AWS': 'FaAws',
    'Docker': 'FaDocker',
    'Kubernetes': 'SiKubernetes',

    // Databases
    'MongoDB': 'SiMongodb',
    'PostgreSQL': 'SiPostgresql',
    'MySQL': 'SiMysql',
    'SQL Server': 'FaDatabase',
    'Redis': 'SiRedis',
    'DynamoDB': 'FaDatabase',
    'CosmosDB': 'FaDatabase',

    // Message Queues & APIs
    'RabbitMQ': 'SiRabbitmq',
    'Kafka': 'SiKafka',
    'GraphQL': 'SiGraphql',
    'REST API Design': 'FaCode',
    'LINQ': 'FaCode',

    // Search
    'Elasticsearch': 'SiElasticsearch',

    // Patterns & Methodologies
    'Domain Driven Design': 'FaSitemap',
    'Microservices': 'FaSitemap',
    'CQRS': 'FaSitemap',
    'Serverless': 'FaServer',
    'Event Sourcing': 'FaSitemap',
    'Agile': 'FaTasks',
    'Scrum': 'FaTasks',
    'Kanban': 'FaTasks',
  };

  return iconMap[techName] || 'FaCode'; // Default icon
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

  // Recursively extract all skills from a subtree
  const extractAllSkills = (node: SkillNode): SkillNode[] => {
    let allSkills: SkillNode[] = [];

    // If this node has level metadata, it's a skill
    if (node.metadata?.level || node.metadata?.yearsOfExperience) {
      allSkills.push(node);
    }

    // Recursively process children
    if (node.children) {
      node.children.forEach(childNode => {
        allSkills = [...allSkills, ...extractAllSkills(childNode)];
      });
    }

    return allSkills;
  };

  // Extract skills grouped by top-level category
  const extractSkills = (node: SkillNode): { category: string; skills: SkillNode[] }[] => {
    const categories: { category: string; skills: SkillNode[] }[] = [];

    if (node.children) {
      node.children.forEach(categoryNode => {
        // Recursively extract all skills from this category (handles nested structures)
        const skillsInCategory = extractAllSkills(categoryNode);

        if (skillsInCategory.length > 0) {
          categories.push({
            category: categoryNode.name,
            skills: skillsInCategory
          });
        }
      });
    }

    return categories;
  };

  // Merge categories from both skill trees
  const skillCategories = [...extractSkills(skills1), ...extractSkills(skills2)];

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

  // Calculate total filtered skills count
  const totalFilteredSkills = displayedCategories.reduce((sum, { skills }) => sum + skills.length, 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
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
          className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 backdrop-blur-xl border border-secondary-default/30 rounded-xl sm:rounded-2xl w-full max-w-6xl max-h-[calc(100vh-80px)] sm:max-h-[calc(100vh-160px)] overflow-hidden shadow-2xl shadow-secondary-default/20 flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - flex-shrink-0 prevents header from scrolling, mobile optimized */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-secondary-default/20 bg-gradient-to-r from-secondary-default/10 via-transparent to-secondary-default/10 flex-shrink-0">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-secondary-default bg-clip-text text-transparent">
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

          {/* Scrollable Content Area - Mobile optimized spacing */}
          <div className="overflow-y-auto custom-scrollbar px-3 sm:px-6 py-4 sm:py-6 flex-1">
            {/* Compact Filter Section - Single Line, mobile optimized */}
            <div className="bg-white/5 backdrop-blur-sm border border-secondary-default/20 rounded-lg p-2 sm:p-3 mb-4 sm:mb-6">
              <div className="flex flex-wrap items-center gap-3">
                {/* Category Dropdown */}
                <select
                  value={selectedCategory || 'All Categories'}
                  onChange={(e) => setSelectedCategory(e.target.value === 'All Categories' ? null : e.target.value)}
                  className="h-9 bg-gradient-to-br from-[#27272c] to-[#2a2a30] border border-secondary-default/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-secondary-default/50 focus:border-secondary-default/60 transition-all duration-300 [&>option]:bg-gray-900 [&>option]:text-white"
                >
                  <option value="All Categories">🎨 All Categories</option>
                  {skillCategories.map(({ category }) => {
                    // Use emoji as prefix since we can't render React icons in option tags
                    const iconMap: Record<string, string> = {
                      'Frameworks': '⚛️',
                      'Backend Runtime & Platforms': '🖥️',
                      'Architectures/Patterns': '🏗️',
                      'Programming Languages': '💻',
                      'Databases': '💾',
                      'Agile Methodologies': '📋',
                      'Other Skills': '🛠️',
                    };
                    return (
                      <option key={category} value={category}>
                        {iconMap[category] || '•'} {category}
                      </option>
                    );
                  })}
                </select>

                {/* Separator */}
                <div className="hidden sm:block w-px h-8 bg-white/10"></div>

                {/* Proficiency Level Checkboxes */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => toggleLevel('Expert')}
                    className="flex items-center gap-1.5 cursor-pointer group transition-all hover:scale-105"
                  >
                    <div className="relative w-4 h-4 bg-purple-500/90 border border-purple-500 rounded flex items-center justify-center">
                      {selectedLevels.has('Expert') && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="flex items-center gap-1.5 cursor-pointer group transition-all hover:scale-105"
                  >
                    <div className="relative w-4 h-4 bg-emerald-500/90 border border-emerald-500 rounded flex items-center justify-center">
                      {selectedLevels.has('Advanced') && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="flex items-center gap-1.5 cursor-pointer group transition-all hover:scale-105"
                  >
                    <div className="relative w-4 h-4 bg-blue-500/90 border border-blue-500 rounded flex items-center justify-center">
                      {selectedLevels.has('Intermediate') && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="flex items-center gap-1.5 cursor-pointer group transition-all hover:scale-105"
                  >
                    <div className="relative w-4 h-4 bg-slate-500/70 border border-slate-500 rounded flex items-center justify-center">
                      {selectedLevels.has('Familiar') && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              </div>
            </div>

            {/* Heat Map Grid - Mobile optimized spacing */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              {displayedCategories.map(({ category, skills }) => {
                const CategoryIcon = categoryIcons[category] || FaCode;

                return (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-3">
                    <CategoryIcon className="text-secondary-default text-base" />
                    <h3 className="text-base font-semibold text-white/90">{category}</h3>
                    <span className="text-xs text-white/40">({skills.length})</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2">
                    {skills.map((skill, skillIndex) => {
                      const level = skill.metadata?.level || 'Familiar';
                      const colorClass = levelToColor[level];
                      const experience = skill.metadata?.yearsOfExperience;
                      const lastUsed = skill.metadata?.lastUsed;
                      const iconName = getTechnologyIcon(skill.name);

                      // Determine if skill is in first row for smart tooltip positioning
                      const isInFirstRow = skillIndex < 4; // 4 columns in lg breakpoint

                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: skillIndex * 0.015 }}
                          className="relative group"
                        >
                          <div
                            className={`p-2 rounded-lg border ${colorClass} cursor-pointer transition-all`}
                          >
                            {/* Skill Name with Icon and Experience */}
                            <div className="flex items-center justify-between gap-1.5 mb-1">
                              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                <DynamicIcon iconName={iconName} className="text-sm flex-shrink-0" />
                                <div className="text-white font-semibold text-xs truncate">{skill.name}</div>
                              </div>
                              {experience && (
                                <span className="text-[10px] text-white/60 flex-shrink-0">{experience}y</span>
                              )}
                            </div>

                            {/* Compact Info Row - Level and Last Used */}
                            <div className="flex items-center justify-between text-[10px] text-white/70 mb-1">
                              <span>{level}</span>
                              {lastUsed && (
                                <span className="text-white/60">
                                  {lastUsed === 'Current' ? '🟢' : `${lastUsed}`}
                                </span>
                              )}
                            </div>

                            {/* Proficiency Bar - Thinner */}
                            <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${(levelOrder[level] / 4) * 100}%`,
                                }}
                                transition={{ delay: skillIndex * 0.015 + 0.2, duration: 0.5 }}
                                className="h-full bg-gradient-to-r from-secondary-default to-blue-500"
                              />
                            </div>
                          </div>

                          {/* Enhanced Tooltip - Smart Positioning */}
                          <div className={`absolute ${isInFirstRow ? 'top-full mt-3' : 'bottom-full mb-3'} left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-[9999]`}>
                            <div className="bg-gradient-to-br from-gray-900 to-gray-950 backdrop-blur-md border-2 border-secondary-default/50 rounded-lg px-3 py-2.5 shadow-2xl shadow-secondary-default/30 w-max max-w-[200px]">
                              {/* Technology Name with Icon */}
                              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                <DynamicIcon iconName={iconName} className="text-base text-secondary-default flex-shrink-0" />
                                <div className="text-sm font-bold text-white">{skill.name}</div>
                              </div>

                              {/* Info Grid */}
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-[11px] gap-2">
                                  <span className="text-white/60">Level:</span>
                                  <span className={`font-semibold ${levelToTextColor[level]}`}>{level}</span>
                                </div>
                                {experience && (
                                  <div className="flex items-center justify-between text-[11px] gap-2">
                                    <span className="text-white/60">Experience:</span>
                                    <span className="font-semibold text-white">{experience} {experience === 1 ? 'year' : 'years'}</span>
                                  </div>
                                )}
                                {lastUsed && (
                                  <div className="flex items-center justify-between text-[11px] gap-2">
                                    <span className="text-white/60">Last Used:</span>
                                    <span className="font-semibold text-emerald-400">
                                      {lastUsed === 'Current' ? '🟢 Current' : lastUsed}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Tooltip Arrow - Dynamic Direction */}
                              <div className={`absolute ${isInFirstRow ? 'bottom-full mb-px' : 'top-full mt-px'} left-1/2 transform -translate-x-1/2`}>
                                <div className={`border-[6px] border-transparent ${isInFirstRow ? 'border-b-secondary-default/50' : 'border-t-secondary-default/50'}`}></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* Footer - flex-shrink-0 prevents footer from scrolling, mobile optimized */}
          <div className="px-4 sm:px-6 py-2 sm:py-3 border-t border-secondary-default/20 bg-white/5 flex-shrink-0">
            <p className="text-[10px] sm:text-xs text-white/40 text-center">
              Press ESC or click outside to close
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
