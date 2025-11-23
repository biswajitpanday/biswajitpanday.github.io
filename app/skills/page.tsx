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

// Helper function to filter tree data based on search query
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filterTreeData = (data: any[], searchQuery: string): any[] => {
  if (!searchQuery.trim()) return data;
  
  const searchLower = searchQuery.toLowerCase();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filterNode = (node: any): any | null => {
    const nameMatches = node.name.toLowerCase().includes(searchLower);
    
    if (node.children && node.children.length > 0) {
      const filteredChildren = node.children
        .map(filterNode)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((child: any) => child !== null);
      
      if (nameMatches || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren
        };
      }
    } else if (nameMatches) {
      return node;
    }
    
    return null;
  };
  
  return data.map(filterNode).filter(node => node !== null);
};

const Skills = () => {
  // Environment flags
  const isSearchEnabled = process.env.NEXT_PUBLIC_ENABLE_SEARCH !== 'false';

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search query - only if search is enabled
  useEffect(() => {
    if (!isSearchEnabled) return;
    
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, isSearchEnabled]);

  // Filter and flatten tree data based on search
  const filteredSkills1 = useMemo(() => {
    const searchTerm = isSearchEnabled ? debouncedSearch : "";
    const filtered = filterTreeData([skills1], searchTerm);
    return filtered.length > 0 ? filtered[0] : { name: "Skills", children: [] };
  }, [isSearchEnabled, debouncedSearch]);

  const filteredSkills2 = useMemo(() => {
    const searchTerm = isSearchEnabled ? debouncedSearch : "";
    const filtered = filterTreeData([skills2], searchTerm);
    return filtered.length > 0 ? filtered[0] : { name: "Skills", children: [] };
  }, [isSearchEnabled, debouncedSearch]);

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

  // Proficiency level to icon mapping - Synchronized with Proficiency Overview
  const levelToIcon = {
    'Expert': '🟣',
    'Advanced': '🟢',
    'Intermediate': '🔵',
    'Familiar': '⚪',
  };

  const levelToTextColor = {
    'Expert': 'text-purple-400',
    'Advanced': 'text-emerald-400',
    'Intermediate': 'text-blue-400',
    'Familiar': 'text-slate-400',
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
        className={className}
      >
        <div className="flex items-center flex-1 min-w-0">
          <DynamicIcon
            iconName={iconName}
            className={`mr-3 flex-shrink-0 ${isParent ? "text-secondary-default" : "text-secondary-default"}`}
          />
          <span className={`select-none ${isParent ? NODE_CLASSES.parentText : ""}`}>{element.name}</span>

          {/* Category skill count for parent nodes */}
          {isParent && element.children && element.children.length > 0 && (
            <span className="ml-2 text-xs text-white/40 font-mono">
              ({element.children.length} {element.children.length === 1 ? 'skill' : 'skills'})
            </span>
          )}

          {/* Proficiency Level Indicator - Colored emoji circles */}
          {!isParent && proficiencyLevel && (
            <span className="ml-2 text-sm flex-shrink-0" title={proficiencyLevel}>
              {levelToIcon[proficiencyLevel as keyof typeof levelToIcon] || '⚪'}
            </span>
          )}

          {isHighlighted && (
            <span className="inline-flex items-center justify-center h-7 ml-2 text-xs bg-secondary-default/30 text-secondary-default px-2 rounded-md font-medium flex-shrink-0">
              Match
            </span>
          )}
        </div>

        {/* Metadata badges for child nodes */}
        {!isParent && (yearsOfExperience || lastUsed) && (
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            {/* Years of Experience */}
            {yearsOfExperience && (
              <span className="text-[10px] text-white/50 font-mono bg-white/5 px-1.5 py-0.5 rounded">
                {yearsOfExperience}y
              </span>
            )}

            {/* Last Used */}
            {lastUsed && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                lastUsed === 'Current'
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-white/40 bg-white/5'
              }`}>
                {lastUsed === 'Current' ? '🟢' : lastUsed}
              </span>
            )}
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
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <FaStar className="text-purple-400 text-xl" />
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

        {/* Search Toolbar - Matching other pages' styling */}
        <UnifiedToolbar
          showSearch={isSearchEnabled}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search technologies, frameworks, tools..."
        />

        {/* Search Results Info */}
        {isSearchEnabled && debouncedSearch && (
          <div className="text-center text-sm text-white/60 mb-4">
            {filteredCount > 0
              ? `Found ${filteredCount} technologies matching "${debouncedSearch}"`
              : `No technologies found matching "${debouncedSearch}"`}
          </div>
        )}

        {/* No Results */}
        {isSearchEnabled && debouncedSearch && filteredCount === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 mb-8"
          >
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 max-w-md mx-auto">
              <FaSearch className="text-4xl text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Technologies Found</h3>
              <p className="text-white/60 mb-4">
                Try searching for different keywords or clear the search to see all technologies.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="bg-secondary-default hover:bg-secondary-default/80 text-primary px-4 py-2 rounded transition-all duration-300"
              >
                Clear Search
              </button>
            </div>
          </motion.div>
        )}

        {/* Skills Trees */}
        {(!debouncedSearch || filteredCount > 0) && (
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
