"use client";
import { motion } from "framer-motion";
import { FaCogs, FaRocket, FaSearch, FaTimes } from "react-icons/fa";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { skills1, skills2, countAllTechnologies } from "@/data/skillsData";
import { PERFORMANCE_VARIANTS } from "@/constants";
import DynamicIcon from "@/components/DynamicIcon";
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
  
  const totalTechnologies = countAllTechnologies();
  const totalCategories = skills1.children.length + skills2.children.length;
  const filteredCount = data1.length + data2.length - 2; // Subtract root nodes

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

          {/* Skills Stats */}
          <motion.div
            variants={PERFORMANCE_VARIANTS.containerSync}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-8"
          >
            <motion.div 
              variants={PERFORMANCE_VARIANTS.cardSync}
              className="group relative overflow-hidden bg-gradient-to-r from-secondary-default/10 to-blue-500/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded performance-button"
            >
              <div className="flex items-center gap-3">
                <FaCogs className="text-secondary-default text-xl group-hover:animate-pulse" />
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-default text-2xl font-bold">
                    {totalTechnologies}
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    Technologies
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={PERFORMANCE_VARIANTS.cardSync}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded performance-button"
            >
              <div className="flex items-center gap-3">
                <FaRocket className="text-secondary-default text-xl group-hover:animate-pulse" />
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-default text-2xl font-bold">
                    {totalCategories}
                  </span>
                  <span className="text-white/80 text-sm font-medium">
                    Categories
                  </span>
                </div>
              </div>
            </motion.div>

            {isSearchEnabled && debouncedSearch && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                variants={PERFORMANCE_VARIANTS.cardSync}
                className="group relative overflow-hidden bg-gradient-to-r from-purple-500/10 to-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-primary py-2 px-6 rounded performance-button"
              >
                <div className="flex items-center gap-3">
                  <FaSearch className="text-secondary-default text-xl group-hover:animate-pulse" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-secondary-default text-2xl font-bold">
                      {filteredCount}
                    </span>
                    <span className="text-white/80 text-sm font-medium">
                      Found
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Search Section */}
        {isSearchEnabled && (
          <motion.div
            variants={PERFORMANCE_VARIANTS.containerSync}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.div
              variants={PERFORMANCE_VARIANTS.cardSync}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search technologies, frameworks, tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 pl-12 pr-4 py-3 rounded focus:border-secondary-default/50 focus:ring-secondary-default/20 transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Search Results Info */}
            {debouncedSearch && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
              >
                <p className="text-secondary-default">
                  {filteredCount > 0 ? (
                    <>
                      Found <span className="font-bold">{filteredCount}</span> technologies matching{" "}
                      <span className="font-semibold">&ldquo;{debouncedSearch}&rdquo;</span>
                    </>
                  ) : (
                    <>
                      No technologies found matching{" "}
                      <span className="font-semibold">&ldquo;{debouncedSearch}&rdquo;</span>
                    </>
                  )}
                </p>
              </motion.div>
            )}
          </motion.div>
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
                onClick={clearSearch}
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
