"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiFilter, FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { skills1, skills2 } from "@/data/skillsData";

// Define a type for the skill node structure
interface SkillNode {
  name: string;
  metadata?: { icon: string };
  children?: SkillNode[];
}

interface SkillsFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  placeholder?: string;
  showResults?: boolean;
  resultsText?: string;
}

// Helper function to extract skills from the skills tree data
const extractSkillsFromTree = (node: SkillNode, skillsList: string[] = []): string[] => {
  if (node.name && node.name !== "Skills") {
    skillsList.push(node.name);
  }
  
  if (node.children && node.children.length > 0) {
    node.children.forEach((child: SkillNode) => {
      extractSkillsFromTree(child, skillsList);
    });
  }
  
  return skillsList;
};

const SkillsFilter: React.FC<SkillsFilterProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  placeholder = "Search technologies, frameworks, tools...",
  showResults = false,
  resultsText = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);
  
  // Extract categories and technologies
  const categories = [
    ...skills1.children.map(c => c.name),
    ...skills2.children.map(c => c.name)
  ].sort();
  
  // Extract all individual skills/technologies
  const allSkills = [
    ...extractSkillsFromTree(skills1),
    ...extractSkillsFromTree(skills2)
  ]
  .filter((skill, index, self) => self.indexOf(skill) === index) // Remove duplicates
  .filter(skill => !categories.includes(skill)) // Remove categories from technologies list
  .sort();
  
  // Toggle filter panel
  const toggleFilterPanel = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Check if any filter is active
  const hasActiveFilters = Boolean(searchQuery || selectedCategory || selectedTechnology);
  
  // Reset all filters
  const resetFilters = () => {
    onClearSearch();
    setSelectedCategory(null);
    setSelectedTechnology(null);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    
    // Reset specific filters when using the search box
    if (e.target.value) {
      setSelectedCategory(null);
      setSelectedTechnology(null);
    }
  };
  
  // When a category is selected, clear other filters
  const handleCategorySelect = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    setSelectedTechnology(null);
    onSearchChange(newCategory || "");
  };
  
  // When a technology is selected, clear other filters
  const handleTechnologySelect = (technology: string) => {
    const newTechnology = selectedTechnology === technology ? null : technology;
    setSelectedTechnology(newTechnology);
    setSelectedCategory(null);
    onSearchChange(newTechnology || "");
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden mb-8"
    >
      {/* Search and Filter Bar */}
      <div className="p-4 flex flex-col sm:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">
            <FiSearch />
          </div>
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-secondary-default/50 focus:border-secondary-default/50"
          />
          {searchQuery && (
            <button 
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
            >
              <FiX />
            </button>
          )}
        </div>
        
        {/* Filter Toggle Button */}
        <Button
          variant="outline"
          onClick={toggleFilterPanel}
          className={`shrink-0 flex items-center gap-2 ${isExpanded ? 'bg-secondary-default/10 border-secondary-default/50' : ''}`}
        >
          <FiFilter className={isExpanded ? 'text-secondary-default' : 'text-white/70'} />
          <span>Filters</span>
          <FiChevronDown className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
        
        {/* Reset Button (only shown when filters are active) */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="shrink-0 text-white/70 hover:text-white"
          >
            Reset
          </Button>
        )}
      </div>

      {/* Results text */}
      {showResults && resultsText && (
        <div className="px-4 pb-2">
          <p className="text-sm text-secondary-default/80">{resultsText}</p>
        </div>
      )}
      
      {/* Expanded Filter Panel */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="px-4 pb-4 border-t border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {/* Categories Filter */}
            <div>
              <h4 className="text-white/70 text-sm mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer ${selectedCategory === category ? 'bg-secondary-default text-primary' : 'text-white/70 hover:text-white'}`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Technologies Filter */}
            <div>
              <h4 className="text-white/70 text-sm mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary-default/20 scrollbar-track-white/5">
                {allSkills.map(technology => (
                  <Badge
                    key={technology}
                    variant={selectedTechnology === technology ? "default" : "outline"}
                    className={`cursor-pointer ${selectedTechnology === technology ? 'bg-secondary-default text-primary' : 'text-white/70 hover:text-white'}`}
                    onClick={() => handleTechnologySelect(technology)}
                  >
                    {technology}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="px-4 pb-4 flex flex-wrap gap-2 items-center">
          <span className="text-white/50 text-xs">Active filters:</span>
          {selectedCategory && (
            <Badge 
              className="bg-secondary-default/20 text-white border border-secondary-default/30 flex items-center gap-1"
            >
              Category: {selectedCategory}
              <FiX 
                className="cursor-pointer" 
                onClick={() => {
                  setSelectedCategory(null);
                  onSearchChange("");
                }}
                size={12}
              />
            </Badge>
          )}
          {selectedTechnology && (
            <Badge 
              className="bg-secondary-default/20 text-white border border-secondary-default/30 flex items-center gap-1"
            >
              Technology: {selectedTechnology}
              <FiX 
                className="cursor-pointer" 
                onClick={() => {
                  setSelectedTechnology(null);
                  onSearchChange("");
                }}
                size={12}
              />
            </Badge>
          )}
          {searchQuery && !selectedCategory && !selectedTechnology && (
            <Badge 
              className="bg-secondary-default/20 text-white border border-secondary-default/30 flex items-center gap-1"
            >
              Search: {searchQuery}
              <FiX 
                className="cursor-pointer" 
                onClick={onClearSearch}
                size={12}
              />
            </Badge>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SkillsFilter;