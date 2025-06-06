"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import { PERFORMANCE_VARIANTS } from "@/constants";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch?: () => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
  showResults?: boolean;
  resultsText?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  placeholder = "Search...",
  className = "",
  debounceMs = 300,
  showResults = false,
  resultsText = "",
}) => {
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Check if search is enabled via environment variable
  const isSearchEnabled = process.env.NEXT_PUBLIC_ENABLE_SEARCH !== 'false';

  // Debounce search query
  useEffect(() => {
    if (!isSearchEnabled) return;
    
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs, isSearchEnabled]);

  // Handle clear search
  const handleClearSearch = () => {
    onSearchChange("");
    if (onClearSearch) {
      onClearSearch();
    }
  };

  // Don't render if search is disabled
  if (!isSearchEnabled) {
    return null;
  }

  return (
    <motion.div
      variants={PERFORMANCE_VARIANTS.containerSync}
      initial="hidden"
      animate="visible"
      className={`mb-8 ${className}`}
    >
      <motion.div
        variants={PERFORMANCE_VARIANTS.cardSync}
        className="relative max-w-2xl mx-auto"
      >
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 pl-12 pr-4 py-3 rounded focus:border-secondary-default/50 focus:ring-secondary-default/20 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </motion.div>

      {/* Search Results Info */}
      {showResults && debouncedSearch && resultsText && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4"
        >
          <span className="inline-flex items-center gap-2 bg-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-secondary-default px-4 py-2 rounded text-sm font-medium">
            <FaSearch className="text-xs" />
            {resultsText}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar; 