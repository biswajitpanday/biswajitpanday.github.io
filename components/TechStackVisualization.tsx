"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaStar, FaClock, FaChartBar } from "react-icons/fa";
import { skills1, skills2 } from "@/data/skillsData";

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

interface FlatSkill {
  name: string;
  category: string;
  level: "Expert" | "Advanced" | "Intermediate" | "Familiar";
  yearsOfExperience: number;
  lastUsed: string;
  icon: string;
}

const levelColors = {
  Expert: "from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-300",
  Advanced: "from-emerald-500/20 to-green-500/20 border-emerald-500/40 text-emerald-300",
  Intermediate: "from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-300",
  Familiar: "from-gray-500/20 to-slate-500/20 border-gray-500/40 text-gray-300",
};

const levelOrder = {
  Expert: 4,
  Advanced: 3,
  Intermediate: 2,
  Familiar: 1,
};

export default function TechStackVisualization() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"level" | "experience" | "name">("level");

  // Flatten all skills with their categories
  const flattenSkills = (skillTree: SkillNode, parentCategory = ""): FlatSkill[] => {
    const result: FlatSkill[] = [];

    if (skillTree.children) {
      skillTree.children.forEach((category) => {
        const categoryName = category.name;

        if (category.children) {
          category.children.forEach((skill) => {
            if (skill.metadata && skill.metadata.level) {
              result.push({
                name: skill.name,
                category: categoryName,
                level: skill.metadata.level,
                yearsOfExperience: skill.metadata.yearsOfExperience || 0,
                lastUsed: skill.metadata.lastUsed || "N/A",
                icon: skill.metadata.icon,
              });
            }
            // Handle nested skills (e.g., Azure services, AWS services)
            if (skill.children) {
              skill.children.forEach((nestedSkill) => {
                if (nestedSkill.metadata && nestedSkill.metadata.level) {
                  result.push({
                    name: nestedSkill.name,
                    category: categoryName,
                    level: nestedSkill.metadata.level,
                    yearsOfExperience: nestedSkill.metadata.yearsOfExperience || 0,
                    lastUsed: nestedSkill.metadata.lastUsed || "N/A",
                    icon: nestedSkill.metadata.icon,
                  });
                }
              });
            }
          });
        }
      });
    }

    return result;
  };

  const allSkills = useMemo(() => {
    return [...flattenSkills(skills1), ...flattenSkills(skills2)];
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(allSkills.map((s) => s.category));
    return ["All", ...Array.from(cats).sort()];
  }, [allSkills]);

  const filteredSkills = useMemo(() => {
    let filtered = allSkills;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((s) => s.category === selectedCategory);
    }

    if (selectedLevel !== "All") {
      filtered = filtered.filter((s) => s.level === selectedLevel);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "level") {
        return levelOrder[b.level] - levelOrder[a.level];
      } else if (sortBy === "experience") {
        return b.yearsOfExperience - a.yearsOfExperience;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [allSkills, selectedCategory, selectedLevel, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: allSkills.length,
      expert: allSkills.filter((s) => s.level === "Expert").length,
      advanced: allSkills.filter((s) => s.level === "Advanced").length,
      intermediate: allSkills.filter((s) => s.level === "Intermediate").length,
      avgExperience:
        allSkills.reduce((sum, s) => sum + s.yearsOfExperience, 0) /
        allSkills.length,
    };
  }, [allSkills]);

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-secondary-default/10 to-blue-500/10 border border-secondary-default/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaChartBar className="text-secondary-default" />
            <p className="text-xs text-white/60 font-medium">Total Skills</p>
          </div>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaStar className="text-purple-400" />
            <p className="text-xs text-white/60 font-medium">Expert</p>
          </div>
          <p className="text-2xl font-bold text-purple-300">{stats.expert}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaStar className="text-emerald-400" />
            <p className="text-xs text-white/60 font-medium">Advanced</p>
          </div>
          <p className="text-2xl font-bold text-emerald-300">{stats.advanced}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaStar className="text-blue-400" />
            <p className="text-xs text-white/60 font-medium">Intermediate</p>
          </div>
          <p className="text-2xl font-bold text-blue-300">{stats.intermediate}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaClock className="text-orange-400" />
            <p className="text-xs text-white/60 font-medium">Avg Experience</p>
          </div>
          <p className="text-2xl font-bold text-orange-300">
            {stats.avgExperience.toFixed(1)}y
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-secondary-default" />
          <h3 className="text-lg font-bold text-white">Filter & Sort</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="text-xs text-white/60 font-medium mb-2 block">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-secondary-default/40"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-gray-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <label className="text-xs text-white/60 font-medium mb-2 block">
              Proficiency Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-secondary-default/40"
            >
              <option value="All" className="bg-gray-900">All Levels</option>
              <option value="Expert" className="bg-gray-900">Expert</option>
              <option value="Advanced" className="bg-gray-900">Advanced</option>
              <option value="Intermediate" className="bg-gray-900">Intermediate</option>
              <option value="Familiar" className="bg-gray-900">Familiar</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-xs text-white/60 font-medium mb-2 block">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-secondary-default/40"
            >
              <option value="level" className="bg-gray-900">Proficiency Level</option>
              <option value="experience" className="bg-gray-900">Years of Experience</option>
              <option value="name" className="bg-gray-900">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/60 text-sm">
            Showing {filteredSkills.length} of {allSkills.length} skills
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${selectedLevel}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                className={`bg-gradient-to-br ${
                  levelColors[skill.level]
                } border rounded-xl p-4 hover:scale-105 transition-transform duration-200`}
              >
                <div className="space-y-3">
                  {/* Skill Name & Level */}
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">
                      {skill.name}
                    </h4>
                    <p className="text-xs opacity-80">{skill.level}</p>
                  </div>

                  {/* Category */}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <p className="text-xs text-white/60">{skill.category}</p>
                  </div>

                  {/* Experience & Last Used */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <FaClock className="opacity-60" />
                      <span className="opacity-80">
                        {skill.yearsOfExperience}y exp
                      </span>
                    </div>
                    <div className="opacity-60">Last: {skill.lastUsed}</div>
                  </div>

                  {/* Proficiency Bar */}
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (levelOrder[skill.level] / 4) * 100
                        }%`,
                      }}
                      transition={{ delay: index * 0.02 + 0.2, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-secondary-default to-blue-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
