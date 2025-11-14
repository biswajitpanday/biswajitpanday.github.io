"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes, FaExternalLinkAlt, FaCode, FaBriefcase, FaAward } from "react-icons/fa";
import { projects } from "@/data/portfolioData";
import { skills1, skills2 } from "@/data/skillsData";
import { certifications } from "@/data/certificationsData";
import Link from "next/link";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "project" | "skill" | "page" | "certification";
  url: string;
  category?: string;
  icon: React.ReactNode;
}

// Prepare searchable data
const prepareSearchableData = (): SearchResult[] => {
  const results: SearchResult[] = [];

  // Add projects
  projects.forEach((project) => {
    results.push({
      id: `project-${project.num}`,
      title: project.title,
      description: project.shortDescription,
      type: "project",
      url: "/projects",
      category: project.category,
      icon: <FaBriefcase className="text-secondary-default" />
    });
  });

  // Add certifications
  certifications.filter(cert => !cert.isUpcoming).forEach((cert) => {
    results.push({
      id: `certification-${cert.id}`,
      title: cert.name,
      description: cert.description || `${cert.category} certification by ${cert.issuer}`,
      type: "certification",
      url: "/certifications",
      category: cert.category,
      icon: <FaAward className="text-blue-400" />
    });
  });

  // Add skills from both trees
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addSkillsRecursively = (skillNode: any, prefix = "") => {
    if (skillNode.children && skillNode.children.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      skillNode.children.forEach((child: any) => {
        addSkillsRecursively(child, prefix ? `${prefix} > ${skillNode.name}` : skillNode.name);
      });
    } else {
      results.push({
        id: `skill-${skillNode.name}`,
        title: skillNode.name,
        description: `Technology under ${prefix}`,
        type: "skill",
        url: "/skills",
        category: prefix,
        icon: <FaCode className="text-blue-400" />
      });
    }
  };

  skills1.children?.forEach((category) => addSkillsRecursively(category));
  skills2.children?.forEach((category) => addSkillsRecursively(category));

  // Add pages
  const pages = [
    { name: "Home", url: "/", description: "Welcome page with overview and introduction" },
    { name: "Projects", url: "/projects", description: "Showcase of projects and work experience" },
    { name: "Skills", url: "/skills", description: "Technical expertise and technologies" },
    { name: "Career", url: "/career", description: "Professional journey and experience timeline" },
    { name: "Certifications", url: "/certifications", description: "Professional certifications and courses completed" },
    { name: "Contact", url: "/contact", description: "Get in touch and contact information" },
  ];

  pages.forEach((page) => {
    results.push({
      id: `page-${page.name}`,
      title: page.name,
      description: page.description,
      type: "page",
      url: page.url,
      icon: <FaExternalLinkAlt className="text-green-400" />
    });
  });

  return results;
};

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  // Memoize searchable data to prevent recreation on every render
  const searchableData = useMemo(() => prepareSearchableData(), []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Filter results based on search query
  const filteredResults = useMemo(() => {
    if (!debouncedSearch.trim()) return [];

    const searchLower = debouncedSearch.toLowerCase();
    
    // Score-based relevance sorting
    return searchableData
      .map(item => {
        // Calculate relevance score
        let score = 0;
        
        // Exact title match gets highest score
        if (item.title.toLowerCase() === searchLower) {
          score += 100;
        }
        // Title starts with search term
        else if (item.title.toLowerCase().startsWith(searchLower)) {
          score += 80;
        }
        // Title contains search term
        else if (item.title.toLowerCase().includes(searchLower)) {
          score += 60;
        }
        
        // Description contains search term
        if (item.description.toLowerCase().includes(searchLower)) {
          score += 40;
        }
        
        // Category matches
        if (item.category?.toLowerCase().includes(searchLower)) {
          score += 30;
        }
        
        // Return item with score if it matches
        return score > 0 ? { ...item, score } : null;
      })
      .filter((item): item is SearchResult & { score: number } => item !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Limit to 10 results
  }, [debouncedSearch, searchableData]);

  const handleResultClick = () => {
    onClose();
    // Navigation will be handled by Link component
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Group results by type
  const groupedResults = useMemo(() => {
    const grouped = {
      page: [] as typeof filteredResults,
      project: [] as typeof filteredResults,
      certification: [] as typeof filteredResults,
      skill: [] as typeof filteredResults,
    };
    
    filteredResults.forEach(result => {
      grouped[result.type as keyof typeof grouped].push(result);
    });
    
    return grouped;
  }, [filteredResults]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[var(--z-search)] flex items-start justify-center pt-20"
          style={{ zIndex: 'var(--z-search)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-secondary-default/20 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden shadow-lg shadow-secondary-default/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-default" />
                <input
                  type="text"
                  placeholder="Search projects, skills, certifications, pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-gray-800/50 border border-secondary-default/20 text-white placeholder:text-white/40 pl-10 pr-4 py-3 rounded focus:border-secondary-default/50 focus:ring-secondary-default/20 transition-all duration-300"
                  autoFocus
                />
              </div>
              <button
                onClick={onClose}
                className="p-3 text-white/40 hover:text-secondary-default transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {debouncedSearch && filteredResults.length === 0 && (
                <div className="text-center py-8">
                  <FaSearch className="text-4xl text-secondary-default/40 mx-auto mb-4" />
                  <p className="text-white/60">
                    No results found for &ldquo;{debouncedSearch}&rdquo;
                  </p>
                </div>
              )}

              {filteredResults.length > 0 && (
                <div className="space-y-4">
                  <p className="text-sm text-secondary-default mb-4">
                    Found {filteredResults.length} results for &ldquo;{debouncedSearch}&rdquo;
                  </p>
                  
                  {/* Pages */}
                  {groupedResults.page.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs text-secondary-default/80 uppercase font-semibold mb-2 px-1">Pages</h3>
                      <div className="space-y-2">
                        {groupedResults.page.map(renderSearchResult)}
                      </div>
                    </div>
                  )}
                  
                  {/* Projects */}
                  {groupedResults.project.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs text-secondary-default/80 uppercase font-semibold mb-2 px-1">Projects</h3>
                      <div className="space-y-2">
                        {groupedResults.project.map(renderSearchResult)}
                      </div>
                    </div>
                  )}
                  
                  {/* Certifications */}
                  {groupedResults.certification.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs text-secondary-default/80 uppercase font-semibold mb-2 px-1">Certifications</h3>
                      <div className="space-y-2">
                        {groupedResults.certification.map(renderSearchResult)}
                      </div>
                    </div>
                  )}
                  
                  {/* Skills */}
                  {groupedResults.skill.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-xs text-secondary-default/80 uppercase font-semibold mb-2 px-1">Skills</h3>
                      <div className="space-y-2">
                        {groupedResults.skill.map(renderSearchResult)}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!debouncedSearch && (
                <div className="text-center py-8">
                  <FaSearch className="text-4xl text-secondary-default/40 mx-auto mb-4" />
                  <p className="text-white/60 mb-4">
                    Start typing to search across projects, skills, certifications, and pages
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button 
                      onClick={() => setSearchQuery("react")}
                      className="px-3 py-1 text-sm bg-secondary-default/10 hover:bg-secondary-default/20 border border-secondary-default/30 text-secondary-default rounded-full transition-colors"
                    >
                      React
                    </button>
                    <button 
                      onClick={() => setSearchQuery("azure")}
                      className="px-3 py-1 text-sm bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full transition-colors"
                    >
                      Azure
                    </button>
                    <button 
                      onClick={() => setSearchQuery("certification")}
                      className="px-3 py-1 text-sm bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full transition-colors"
                    >
                      Certifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search Tips */}
            <div className="mt-6 pt-4 border-t border-secondary-default/20">
              <p className="text-xs text-white/40 text-center">
                Press <kbd className="bg-gray-800/70 px-2 py-1 rounded text-secondary-default border border-secondary-default/20">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  
  // Helper function to render a search result
  function renderSearchResult(result: SearchResult & { score?: number }) {
    return (
      <Link
        key={result.id}
        href={result.url}
        onClick={() => handleResultClick()}
        className="block p-4 bg-gray-800/50 hover:bg-gray-800/80 border border-secondary-default/20 hover:border-secondary-default/50 rounded transition-all duration-300 group"
      >
        <div className="flex items-start gap-3">
          <div className="mt-1">{result.icon}</div>
          <div className="flex-1">
            <h3 className="text-white font-medium group-hover:text-secondary-default transition-colors">
              {result.title}
            </h3>
            <p className="text-sm text-white/60 mt-1">
              {result.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-secondary-default/20 text-secondary-default px-2 py-1 rounded border border-secondary-default/30">
                {result.type}
              </span>
              {result.category && (
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30">
                  {result.category}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

export default GlobalSearch; 