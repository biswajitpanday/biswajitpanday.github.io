"use client";
import { motion } from "framer-motion";
import { FaCogs, FaRocket, FaSearch, FaCode, FaDatabase, FaCloud } from "react-icons/fa";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { skills1, skills2, countAllTechnologies } from "@/data/skillsData";
import DynamicIcon from "@/components/DynamicIcon";
import StatsCards, { StatCard } from "@/components/StatsCards";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import BackgroundElements from "@/components/BackgroundElements";
import SectionHeader from "@/components/SectionHeader";
import SkillsFilter from "@/components/SkillsFilter";
import { PERFORMANCE_VARIANTS } from "@/constants";

// Memoized animation variants - created once, reused everywhere
const TREE_ANIMATIONS = {
  container: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2, duration: 0.8 }
  },
  leftCard: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.4, duration: 0.6 }
  },
  rightCard: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.4, duration: 0.6 }
  }
} as const;

// Memoized style generator
const getNodeStyle = (level: number) => ({
  paddingLeft: 40 * (level - 1),
  display: "flex" as const,
  alignItems: "center" as const,
});

// Memoized class names
const NODE_CLASSES = {
  parent: "text-lg font-bold leading-none text-white group hover:text-secondary-default cursor-pointer transition-all duration-300 mb-2 mt-1 hover:bg-white/5 p-2 rounded",
  child: "text-sm text-white/70 group hover:text-white/90 hover:bg-white/5 transition-all duration-300 mb-1 p-1 rounded cursor-default",
  highlighted: "bg-secondary-default/20 border border-secondary-default/40 rounded"
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
  
  // Calculate totals
  const totalTechnologies = countAllTechnologies();
  const totalCategories = skills1.children.length + skills2.children.length; // Count actual main categories from both trees
  const filteredCount = data1.length + data2.length - 2; // Subtract root nodes

  // Stats data for StatsCards component
  const statsData: StatCard[] = [
    {
      icon: FaCogs,
      value: totalTechnologies,
      label: "Technologies",
      gradient: "from-secondary-default/10 to-blue-500/10"
    },
    {
      icon: FaRocket,
      value: totalCategories,
      label: "Categories",
      gradient: "from-blue-500/10 to-secondary-default/10"
    },
    ...(isSearchEnabled && debouncedSearch ? [{
      icon: FaSearch,
      value: filteredCount,
      label: "Found",
      gradient: "from-purple-500/10 to-secondary-default/10"
    }] : [])
  ];

  // Memoized style objects to prevent recreation
  const nodeStyles = useMemo(() => {
    const styles: Record<number, React.CSSProperties> = {};
    for (let i = 0; i <= 5; i++) { // Assuming max 5 levels
      styles[i] = getNodeStyle(i);
    }
    return styles;
  }, []);

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
    
    return (
      <div
        {...nodeProps}
        style={style}
        className={className}
      >
        <DynamicIcon 
          iconName={iconName} 
          className={`mr-3 ${isParent ? "text-white" : "text-secondary-default"}`}
        />
        <span className="select-none">{element.name}</span>
        {isHighlighted && (
          <span className="ml-2 text-xs bg-secondary-default/30 text-secondary-default px-2 py-1 rounded">
            Match
          </span>
        )}
      </div>
    );
  }, [nodeStyles, debouncedSearch]);

  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden py-8">
      {/* Background Elements - Using BackgroundElements Component */}
      <BackgroundElements />

      <div className="container mx-auto px-4 relative z-10">
        {/* Skills Header - Using SectionHeader Component */}
        <SectionHeader
          title="Technical"
          highlightText="Expertise"
          description={
            <>
              A comprehensive overview of{" "}
              <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                technologies and frameworks
              </span>{" "}
              mastered through years of{" "}
              <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                hands-on experience
              </span>{" "}
              and continuous learning
            </>
          }
        >
          <StatsCards stats={statsData} />
        </SectionHeader>

        {/* Skill Highlight Badges */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-12 -mt-2"
        >
          <motion.span
            variants={PERFORMANCE_VARIANTS.cardSync}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-default/10 to-transparent backdrop-blur-sm border border-secondary-default/30 text-secondary-default px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary-default/20 transition-all duration-300"
          >
            <FaCode className="text-xs" />
            Full-Stack Development
          </motion.span>
          <motion.span
            variants={PERFORMANCE_VARIANTS.cardSync}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-transparent backdrop-blur-sm border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500/20 transition-all duration-300"
          >
            <FaDatabase className="text-xs" />
            Database Architecture
          </motion.span>
          <motion.span
            variants={PERFORMANCE_VARIANTS.cardSync}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-transparent backdrop-blur-sm border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-500/20 transition-all duration-300"
          >
            <FaCloud className="text-xs" />
            Cloud Infrastructure
          </motion.span>
        </motion.div>

        {/* Search Section - Using SkillsFilter Component */}
        <SkillsFilter
          searchQuery={searchQuery}
          onSearchChange={(value) => setSearchQuery(value)}
          onClearSearch={() => setSearchQuery("")}
          placeholder="Search technologies, frameworks, tools..."
          showResults={true}
          resultsText={debouncedSearch ? (
            filteredCount > 0 ? 
              `Found ${filteredCount} technologies matching "${debouncedSearch}"` :
              `No technologies found matching "${debouncedSearch}"`
          ) : ""}
        />

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
            className="grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 gap-8"
          >
            {/* First Skills Tree */}
            {data1.length > 1 && (
              <motion.div
                initial={TREE_ANIMATIONS.leftCard.initial}
                animate={TREE_ANIMATIONS.leftCard.animate}
                transition={TREE_ANIMATIONS.leftCard.transition}
                className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded-xl border border-secondary-default/20 hover:border-secondary-default/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-default/10 hover:scale-[1.02]"
              >
                <TreeView
                  data={data1}
                  defaultExpandedIds={data1.map((node) => node.id)}
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
                className="group relative bg-gradient-to-br from-[#27272c] to-[#2a2a30] p-6 rounded-xl border border-secondary-default/20 hover:border-secondary-default/40 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-default/10 hover:scale-[1.02]"
              >
                <TreeView
                  data={data2}
                  defaultExpandedIds={data2.map((node) => node.id)}
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
