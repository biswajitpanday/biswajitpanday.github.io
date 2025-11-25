"use client";
import { motion } from "framer-motion";
import { FaCogs, FaRocket, FaStar, FaCheckCircle, FaSearch } from "react-icons/fa";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { skills1, skills2, countAllTechnologies } from "@/data/skillsData";
import DynamicIcon from "@/components/DynamicIcon";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import BackgroundElements from "@/components/BackgroundElements";
import UnifiedToolbar from "@/components/UnifiedToolbar";
import { PERFORMANCE_VARIANTS } from "@/constants";
import SkillProficiencySummary from "@/components/SkillProficiencySummary";
import { useCountUp } from "@/hooks/useCountUp";

// Memoized animation variants - created once, reused everywhere
const TREE_ANIMATIONS = {
  container: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.1, duration: 0.4 }
  },
  leftCard: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.15, duration: 0.4 }
  },
  rightCard: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.15, duration: 0.4 }
  }
} as const;

// Memoized style generator
const getNodeStyle = (level: number) => ({
  paddingLeft: 40 * (level - 1),
  display: "flex" as const,
  alignItems: "center" as const,
});

// Memoized class names - Mobile optimized
const NODE_CLASSES = {
  parent: "text-base sm:text-lg font-bold leading-none group cursor-pointer transition-all duration-300 mb-1.5 sm:mb-2 mt-1 hover:bg-white/5 p-1.5 sm:p-2 rounded",
  child: "text-xs sm:text-sm text-white/70 group hover:text-white/90 hover:bg-white/5 transition-all duration-300 mb-1 p-1 rounded cursor-default",
  highlighted: "bg-secondary-default/20 border border-secondary-default/40 rounded",
  parentText: "bg-gradient-to-r from-emerald-400 to-gray-300 bg-clip-text text-transparent"
} as const;

// Helper function to filter tree data based on search query and proficiency levels
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filterTreeData = (data: any[], searchQuery: string, selectedLevels: Set<string> = new Set()): any[] => {
  const hasSearchFilter = searchQuery.trim().length > 0;
  const hasLevelFilter = selectedLevels.size > 0;

  // If no filters, return original data
  if (!hasSearchFilter && !hasLevelFilter) return data;

  const searchLower = searchQuery.toLowerCase();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterNode = (node: any): any | null => {
    const nameMatches = !hasSearchFilter || node.name.toLowerCase().includes(searchLower);
    const levelMatches = !hasLevelFilter || (node.metadata?.level && selectedLevels.has(node.metadata.level));

    if (node.children && node.children.length > 0) {
      const filteredChildren = node.children
        .map(filterNode)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((child: any) => child !== null);

      // For parent nodes: show if name matches search (when searching) OR if has matching children
      if ((hasSearchFilter && nameMatches) || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren
        };
      }
    } else {
      // For leaf nodes: must match both search (if active) AND level (if active)
      if (nameMatches && levelMatches) {
        return node;
      }
    }

    return null;
  };

  return data.map(filterNode).filter(node => node !== null);
};

type ProficiencyLevel = "Expert" | "Advanced" | "Intermediate" | "Familiar";

const Skills = () => {
  // Environment flags
  const isSearchEnabled = process.env.NEXT_PUBLIC_ENABLE_SEARCH !== 'false';

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedLevels, setSelectedLevels] = useState<Set<ProficiencyLevel>>(new Set());

  // Toggle a proficiency level filter
  const toggleLevel = useCallback((level: ProficiencyLevel) => {
    setSelectedLevels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(level)) {
        newSet.delete(level);
      } else {
        newSet.add(level);
      }
      return newSet;
    });
  }, []);

  // Clear all level filters
  const clearLevelFilters = useCallback(() => {
    setSelectedLevels(new Set());
  }, []);

  // Debounce search query - only if search is enabled
  useEffect(() => {
    if (!isSearchEnabled) return;
    
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, isSearchEnabled]);

  // Filter and flatten tree data based on search and proficiency level
  const filteredSkills1 = useMemo(() => {
    const searchTerm = isSearchEnabled ? debouncedSearch : "";
    const filtered = filterTreeData([skills1], searchTerm, selectedLevels);
    return filtered.length > 0 ? filtered[0] : { name: "Skills", children: [] };
  }, [isSearchEnabled, debouncedSearch, selectedLevels]);

  const filteredSkills2 = useMemo(() => {
    const searchTerm = isSearchEnabled ? debouncedSearch : "";
    const filtered = filterTreeData([skills2], searchTerm, selectedLevels);
    return filtered.length > 0 ? filtered[0] : { name: "Skills", children: [] };
  }, [isSearchEnabled, debouncedSearch, selectedLevels]);

  const data1 = flattenTree(filteredSkills1);
  const data2 = flattenTree(filteredSkills2);

  // Expand all tree view items by default
  const getDefaultExpandedIds = (data: typeof data1) => {
    return data.map((node) => node.id);
  };

  // Helper function to count skills by proficiency level
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countSkillsByLevel = (skillTree: any, level: string): number => {
    let count = 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const traverseNode = (node: any) => {
      if (node.metadata?.level === level) {
        count++;
      }
      if (node.children) {
        node.children.forEach(traverseNode);
      }
    };

    traverseNode(skillTree);
    return count;
  };

  // Calculate totals
  const totalTechnologies = countAllTechnologies();
  const totalCategories = (skills1.children?.length || 0) + (skills2.children?.length || 0); // Count actual main categories from both trees
  const expertCount = countSkillsByLevel(skills1, "Expert") + countSkillsByLevel(skills2, "Expert");
  const advancedCount = countSkillsByLevel(skills1, "Advanced") + countSkillsByLevel(skills2, "Advanced");
  const filteredCount = data1.length + data2.length - 2; // Subtract root nodes

  // Animated counters for stats
  const totalTechCount = useCountUp({ end: totalTechnologies, duration: 2000 });
  const totalCategoriesCount = useCountUp({ end: totalCategories, duration: 1900 });
  const expertCountUp = useCountUp({ end: expertCount, duration: 1800 });
  const advancedCountUp = useCountUp({ end: advancedCount, duration: 1700 });

  // Memoized style objects to prevent recreation
  const nodeStyles = useMemo(() => {
    const styles: Record<number, React.CSSProperties> = {};
    for (let i = 0; i <= 5; i++) { // Assuming max 5 levels
      styles[i] = getNodeStyle(i);
    }
    return styles;
  }, []);

  // Proficiency level to color bar mapping - More visible than tiny emojis
  const levelToBarColor = {
    'Expert': 'bg-gradient-to-r from-purple-500 to-pink-500',
    'Advanced': 'bg-emerald-500',
    'Intermediate': 'bg-blue-500',
    'Familiar': 'bg-slate-500',
  };

  const levelToBarWidth = {
    'Expert': 'w-full',
    'Advanced': 'w-3/4',
    'Intermediate': 'w-1/2',
    'Familiar': 'w-1/4',
  };

  // Memoized and optimized nodeRenderer with search highlighting
  // @ts-expect-error - TreeView library has complex type interface, suppressing for performance optimization
  const nodeRenderer = useCallback(({ element, getNodeProps, level }) => {
    const isParent = element.children.length > 0;
    const iconName = element.metadata?.icon || "FaCode";
    const nodeProps = getNodeProps();

    // Check if this node matches the search query for highlighting
    const isHighlighted = debouncedSearch &&
      element.name.toLowerCase().includes(debouncedSearch.toLowerCase());

    // Use pre-calculated style
    const style = nodeStyles[level] || getNodeStyle(level);

    const baseClassName = isParent ? NODE_CLASSES.parent : NODE_CLASSES.child;
    const className = isHighlighted ? `${baseClassName} ${NODE_CLASSES.highlighted}` : baseClassName;

    // Get metadata for child nodes
    const proficiencyLevel = element.metadata?.level;
    const yearsOfExperience = element.metadata?.yearsOfExperience;
    const lastUsed = element.metadata?.lastUsed;

    return (
      <div
        {...nodeProps}
        style={style}
        className={`${className} group/skill`}
      >
        {/* Main content row */}
        <div className="flex items-center flex-1 min-w-0">
          <DynamicIcon
            iconName={iconName}
            className={`mr-2.5 flex-shrink-0 ${isParent ? "text-secondary-default" : "text-secondary-default/80"}`}
          />
          <span className={`select-none ${isParent ? NODE_CLASSES.parentText : ""}`}>{element.name}</span>

          {/* Category skill count for parent nodes */}
          {isParent && element.children && element.children.length > 0 && (
            <span className="ml-2 text-xs text-white/40 font-mono">
              ({element.children.length})
            </span>
          )}

          {isHighlighted && (
            <span className="inline-flex items-center justify-center h-5 ml-2 text-[10px] bg-secondary-default/30 text-secondary-default px-1.5 rounded font-medium flex-shrink-0">
              Match
            </span>
          )}
        </div>

        {/* Right-aligned section for skill nodes - Proficiency bar + hover metadata */}
        {!isParent && proficiencyLevel && (
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            {/* Metadata badges - Hidden by default, shown on hover */}
            <div className="flex items-center gap-1.5 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-200">
              {yearsOfExperience && (
                <span className="text-[10px] text-white/60 font-mono bg-white/10 px-1.5 py-0.5 rounded">
                  {yearsOfExperience}y
                </span>
              )}
              {lastUsed && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  lastUsed === 'Current'
                    ? 'text-emerald-400 bg-emerald-500/15'
                    : 'text-white/50 bg-white/10'
                }`}>
                  {lastUsed === 'Current' ? 'Active' : lastUsed}
                </span>
              )}
            </div>

            {/* Proficiency Bar - Always visible, larger indicator */}
            <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden" title={proficiencyLevel}>
              <div
                className={`h-full rounded-full ${levelToBarColor[proficiencyLevel as keyof typeof levelToBarColor]} ${levelToBarWidth[proficiencyLevel as keyof typeof levelToBarWidth]}`}
              />
            </div>
          </div>
        )}
      </div>
    );
  }, [nodeStyles, debouncedSearch]);

  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden py-8">
      {/* Background Elements - Using BackgroundElements Component */}
      <BackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        {/* Skills Header - Left Aligned matching Project/Career/Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex-1 mb-4">
            <h1 className="text-3xl xl:text-4xl font-bold mb-2 leading-tight bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
              Technical Expertise
            </h1>
            <p className="text-sm font-medium leading-relaxed">
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                A comprehensive overview of{" "}
              </span>
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                {totalTechnologies}
              </span>
              <span className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}technologies mastered through hands-on experience
              </span>
            </p>
          </div>
        </motion.div>

        {/* Skills Stats - Inline matching Project/Career/Certifications */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-secondary-default/20 rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {/* Total Technologies */}
              <div ref={totalTechCount.ref} className="flex items-center gap-3">
                <div className="p-2 bg-[#00BFFF]/20 rounded-lg">
                  <FaCogs className="text-[#00BFFF] text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] to-[#0080FF] tabular-nums">
                    {totalTechCount.count}
                  </div>
                  <div className="text-xs text-white/60">Technologies</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/10"></div>

              {/* Total Categories */}
              <div ref={totalCategoriesCount.ref} className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <FaRocket className="text-emerald-400 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tabular-nums">
                    {totalCategoriesCount.count}
                  </div>
                  <div className="text-xs text-white/60">Categories</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-white/10"></div>

              {/* Expert Skills */}
              <div ref={expertCountUp.ref} className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                  <FaStar className="text-fuchsia-400 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tabular-nums">
                    {expertCountUp.count}
                  </div>
                  <div className="text-xs text-white/60">Expert</div>
                </div>
              </div>

              <div className="hidden lg:block w-px h-10 bg-white/10"></div>

              {/* Advanced Skills */}
              <div ref={advancedCountUp.ref} className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <FaCheckCircle className="text-green-400 text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 tabular-nums">
                    {advancedCountUp.count}
                  </div>
                  <div className="text-xs text-white/60">Advanced</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Proficiency Summary - Compact Heat Map */}
        <SkillProficiencySummary />

        {/* Search Toolbar with Level Filters */}
        <UnifiedToolbar
          showSearch={isSearchEnabled}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search technologies, frameworks, tools..."
        >
          {/* Proficiency Level Filters - Right side of search */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Expert Filter */}
            <button
              onClick={() => toggleLevel("Expert")}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-all duration-200 border ${
                selectedLevels.has("Expert")
                  ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-fuchsia-500/60 text-fuchsia-300"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-fuchsia-500/10 hover:border-fuchsia-500/30 hover:text-fuchsia-400"
              }`}
            >
              <span>🟣</span>
              <span className="hidden sm:inline">Expert</span>
              <span className="text-[10px] opacity-70">({expertCount})</span>
            </button>

            {/* Advanced Filter */}
            <button
              onClick={() => toggleLevel("Advanced")}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-all duration-200 border ${
                selectedLevels.has("Advanced")
                  ? "bg-emerald-500/30 border-emerald-500/60 text-emerald-300"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400"
              }`}
            >
              <span>🟢</span>
              <span className="hidden sm:inline">Advanced</span>
              <span className="text-[10px] opacity-70">({advancedCount})</span>
            </button>

            {/* Intermediate Filter */}
            <button
              onClick={() => toggleLevel("Intermediate")}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-all duration-200 border ${
                selectedLevels.has("Intermediate")
                  ? "bg-blue-500/30 border-blue-500/60 text-blue-300"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400"
              }`}
            >
              <span>🔵</span>
              <span className="hidden sm:inline">Interm.</span>
              <span className="text-[10px] opacity-70">({countSkillsByLevel(skills1, "Intermediate") + countSkillsByLevel(skills2, "Intermediate")})</span>
            </button>

            {/* Familiar Filter */}
            <button
              onClick={() => toggleLevel("Familiar")}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-all duration-200 border ${
                selectedLevels.has("Familiar")
                  ? "bg-slate-500/30 border-slate-500/60 text-slate-300"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-slate-500/10 hover:border-slate-500/30 hover:text-slate-400"
              }`}
            >
              <span>⚪</span>
              <span className="hidden sm:inline">Familiar</span>
              <span className="text-[10px] opacity-70">({countSkillsByLevel(skills1, "Familiar") + countSkillsByLevel(skills2, "Familiar")})</span>
            </button>

            {/* Clear Filters */}
            {selectedLevels.size > 0 && (
              <button
                onClick={clearLevelFilters}
                className="flex items-center gap-0.5 px-2 py-1 rounded text-[11px] font-medium transition-all duration-200 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
              >
                <span>✕</span>
              </button>
            )}
          </div>
        </UnifiedToolbar>

        {/* No Results */}
        {(debouncedSearch || selectedLevels.size > 0) && filteredCount === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 mb-8"
          >
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 max-w-md mx-auto">
              <FaSearch className="text-4xl text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Technologies Found</h3>
              <p className="text-white/60 mb-4">
                {debouncedSearch && selectedLevels.size > 0
                  ? "Try adjusting your search or level filters."
                  : debouncedSearch
                    ? "Try searching for different keywords."
                    : "Try selecting different proficiency levels."}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  clearLevelFilters();
                }}
                className="bg-secondary-default hover:bg-secondary-default/80 text-primary px-4 py-2 rounded transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Skills Trees */}
        {((!debouncedSearch && selectedLevels.size === 0) || filteredCount > 0) && (
          <motion.div
            initial={TREE_ANIMATIONS.container.initial}
            animate={TREE_ANIMATIONS.container.animate}
            transition={TREE_ANIMATIONS.container.transition}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
          >
            {/* First Skills Tree */}
            {data1.length > 1 && (
              <motion.div
                initial={TREE_ANIMATIONS.leftCard.initial}
                animate={TREE_ANIMATIONS.leftCard.animate}
                transition={TREE_ANIMATIONS.leftCard.transition}
                className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-4 sm:p-6 rounded-lg sm:rounded-xl border border-secondary-default/20 hover:border-secondary-default/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-default/10"
              >
                <TreeView
                  data={data1}
                  defaultExpandedIds={getDefaultExpandedIds(data1)}
                  aria-label="Core Technologies Skills Tree"
                  nodeRenderer={nodeRenderer}
                />
              </motion.div>
            )}

            {/* Second Skills Tree */}
            {data2.length > 1 && (
              <motion.div
                initial={TREE_ANIMATIONS.rightCard.initial}
                animate={TREE_ANIMATIONS.rightCard.animate}
                transition={TREE_ANIMATIONS.rightCard.transition}
                className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-4 sm:p-6 rounded-lg sm:rounded-xl border border-secondary-default/20 hover:border-secondary-default/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-default/10"
              >
                <TreeView
                  data={data2}
                  defaultExpandedIds={getDefaultExpandedIds(data2)}
                  aria-label="Tools & Methodologies Skills Tree"
                  nodeRenderer={nodeRenderer}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
