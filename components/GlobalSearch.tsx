"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes, FaExternalLinkAlt, FaCode, FaBriefcase } from "react-icons/fa";
import { projects } from "@/data/portfolioData";
import { skills1, skills2 } from "@/data/skillsData";
import Link from "next/link";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: "project" | "skill" | "page";
  url: string;
  category?: string;
  icon: React.ReactNode;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

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

  // Prepare searchable data
  const searchableData = useMemo(() => {
    const results: SearchResult[] = [];

    // Add projects
    projects.forEach((project) => {
      results.push({
        id: `project-${project.num}`,
        title: project.title,
        description: project.shortDescription,
        type: "project",
        url: "/portfolio",
        category: project.category,
        icon: <FaBriefcase className="text-secondary-default" />
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

    skills1.children.forEach((category) => addSkillsRecursively(category));
    skills2.children.forEach((category) => addSkillsRecursively(category));

    // Add pages
    const pages = [
      { name: "Home", url: "/", description: "Welcome page with overview and introduction" },
      { name: "Portfolio", url: "/portfolio", description: "Showcase of projects and work experience" },
      { name: "Skills", url: "/skills", description: "Technical expertise and technologies" },
      { name: "Career", url: "/career", description: "Professional journey and experience timeline" },
      { name: "Resume", url: "/resume", description: "Detailed resume and qualifications" },
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
  }, []);

  // Filter results based on search query
  const filteredResults = useMemo(() => {
    if (!debouncedSearch.trim()) return [];

    const searchLower = debouncedSearch.toLowerCase();
    return searchableData.filter((item) =>
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.category?.toLowerCase().includes(searchLower)
    ).slice(0, 10); // Limit to 10 results
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className="bg-gradient-to-br from-[#27272c] to-[#2a2a30] border border-secondary-default/20 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search projects, skills, pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 pl-12 pr-4 py-3 rounded focus:border-secondary-default/50 focus:ring-secondary-default/20 transition-all duration-300"
                  autoFocus
                />
              </div>
              <button
                onClick={onClose}
                className="p-3 text-white/40 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {debouncedSearch && filteredResults.length === 0 && (
                <div className="text-center py-8">
                  <FaSearch className="text-4xl text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">
                    No results found for &ldquo;{debouncedSearch}&rdquo;
                  </p>
                </div>
              )}

              {filteredResults.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-white/60 mb-4">
                    Found {filteredResults.length} results for &ldquo;{debouncedSearch}&rdquo;
                  </p>
                  {filteredResults.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      onClick={() => handleResultClick()}
                      className="block p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary-default/30 rounded transition-all duration-300 group"
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
                            <span className="text-xs bg-secondary-default/20 text-secondary-default px-2 py-1 rounded">
                              {result.type}
                            </span>
                            {result.category && (
                              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                                {result.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {!debouncedSearch && (
                <div className="text-center py-8">
                  <FaSearch className="text-4xl text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">
                    Start typing to search across projects, skills, and pages
                  </p>
                </div>
              )}
            </div>

            {/* Search Tips */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-xs text-white/40 text-center">
                Press <kbd className="bg-white/10 px-2 py-1 rounded text-white/60">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearch; 