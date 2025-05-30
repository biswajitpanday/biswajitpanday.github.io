"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import GlobalSearch from "./GlobalSearch";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="py-8 xl:py-12 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <Link href={"/"}>
            <h1 className="text-4xl font-semibold">
              Panday<span className="text-secondary-default">.</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-8">
            <Nav />
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary-default/30 text-white/70 hover:text-white px-3 py-2 rounded transition-all duration-300"
              title="Search (Ctrl+K)"
            >
              <FaSearch className="text-sm" />
              <span className="text-sm">Search</span>
              <kbd className="hidden sm:inline-block bg-white/10 text-xs px-2 py-1 rounded">
                ⌘K
              </kbd>
            </button>

            <Link href={"/contact"}>
              <Button variant="outline" className="custom-button">Hire Me</Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="xl:hidden flex items-center gap-4">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary-default/30 text-white/70 hover:text-white rounded transition-all duration-300"
              title="Search"
            >
              <FaSearch className="text-sm" />
            </button>
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Header;
