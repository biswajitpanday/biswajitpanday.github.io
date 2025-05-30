"use client";
import { motion } from "framer-motion";
import { FaCogs, FaRocket, FaSearch } from "react-icons/fa";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { skills1, skills2, countAllTechnologies } from "@/data/skillsData";
import { PERFORMANCE_VARIANTS } from "@/constants";
import DynamicIcon from "@/components/DynamicIcon";
import SearchBar from "@/components/SearchBar";
import StatsCards, { StatCard } from "@/components/StatsCards";
import React, { useCallback, useMemo, useState, useEffect } from "react";

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
  const totalCategories = 2; // Two main categories: Frontend/Backend and Tools/Platforms
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

  const clearSearch = () => {
    if (isSearchEnabled) {
      setSearchQuery("");
    }
  };

  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-default/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Skills Header */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          {/* Main Heading */}
          <motion.h1
            variants={PERFORMANCE_VARIANTS.slideUpSync}
            className="text-4xl xl:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Technical{" "}
            <span className="bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text text-transparent animate-gradient">
              Expertise
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={PERFORMANCE_VARIANTS.slideUpSync}
            className="text-lg xl:text-xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            A comprehensive overview of{" "}
            <span className="text-secondary-default font-semibold">
              technologies and frameworks
            </span>{" "}
            mastered through years of hands-on experience and{" "}
            <span className="text-secondary-default font-semibold">
              continuous learning
            </span>
          </motion.p>

          {/* Skills Stats - Using StatsCards Component */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.containerSync}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-8"
          >
            <StatsCards stats={statsData} />
          </motion.div>
        </motion.div>

        {/* Search Section - Using SearchBar Component */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={clearSearch}
          placeholder="Search technologies, frameworks, tools..."
          showResults={true}
          resultsText={debouncedSearch ? (
            filteredCount > 0 ? 
              `Found ${filteredCount} technologies matching "${debouncedSearch}"` :
              `No technologies found matching "${debouncedSearch}"`
          ) : ""}
        />

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
