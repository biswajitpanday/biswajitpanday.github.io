"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { 
  FaGithub, 
  FaLinkedin, 
  FaBars,
  FaTimes,
  FaSearch,
  FaMedium
} from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import MobileNav from "./MobileNav";
import GlobalSearch from "./GlobalSearch";

// Header navigation links with correct mapping
const NAVIGATION_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Career", href: "/career" },
  { name: "Projects", href: "/projects" },
  { name: "Certifications", href: "/certifications" },
  { name: "Skills", href: "/skills" },
  { name: "Contact", href: "/contact" },
];

// Social media links
const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/biswajitpanday", icon: FaGithub },
  { name: "Medium", href: "https://medium.com/@biswajitpanday", icon: FaMedium },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/biswajitpanday", icon: FaLinkedin },
];

export default function Header() {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isSearchEnabled = process.env.NEXT_PUBLIC_ENABLE_SEARCH !== 'false';

  // Helper to check if a path is active (exact match or starts with path + '/')
  const isPathActive = (path: string) => {
    // Special case for legacy portfolio URLs redirecting to projects
    if (path === '/projects' && pathname.startsWith('/portfolio')) {
      return true;
    }
    return pathname === path || (path !== '/' && pathname.startsWith(path + '/'));
  };

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Global keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    if (!isSearchEnabled) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchEnabled]);

  return (
    <>
      <header 
        data-testid="main-header"
        className="fixed top-0 left-0 w-full transition-all duration-300 backdrop-blur-md z-[var(--z-header)]"
        style={{ zIndex: 'var(--z-header)' }}
      >
        <div className={`w-full ${isSticky ? 'border-b border-secondary-default/20 bg-bg-default/80 shadow-sm' : 'bg-transparent'}`}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link 
                href="/" 
                data-testid="header-logo"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <h1 className="text-2xl font-semibold">
                  Panday<span className="text-secondary-default">.</span>
                </h1>
              </Link>

              {/* Desktop Navigation */}
              <nav 
                data-testid="desktop-navigation"
                className="hidden md:hidden lg:flex items-center space-x-1"
              >
                {NAVIGATION_ITEMS.map((item) => {
                  const isActive = isPathActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      data-testid={`nav-link-${item.name.toLowerCase()}`}
                      className={`px-3 py-2 text-base font-medium rounded-md transition-colors relative group ${
                        isActive
                          ? "text-secondary-default"
                          : "text-text-primary hover:text-secondary-default"
                      }`}
                    >
                      {item.name}
                      <span 
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-secondary-default transform transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                        style={{ transformOrigin: 'left' }}
                      ></span>
                    </Link>
                  );
                })}
              </nav>

              {/* Right side actions (social, search, etc.) */}
              <div 
                data-testid="header-actions"
                className="flex items-center space-x-2"
              >
                {/* Search Button - Conditionally Rendered */}
                {isSearchEnabled && (
                  <button
                    data-testid="search-button"
                    onClick={() => setIsSearchOpen(true)}
                    className="flex items-center gap-2 bg-primary-light/20 hover:bg-primary-light/30 border border-border-light hover:border-secondary-default/30 text-text-primary hover:text-secondary-default px-3 py-1.5 rounded-md transition-all duration-300"
                    title="Search (Ctrl+K)"
                    aria-label="Open search"
                  >
                    <FaSearch className="text-sm" />
                    <span className="text-sm hidden sm:inline-block">Search</span>
                    <kbd className="hidden sm:inline-block bg-primary-light/30 text-xs px-2 py-0.5 rounded">
                      ⌘K
                    </kbd>
                  </button>
                )}

                {/* Social Links */}
                <div 
                  data-testid="social-links"
                  className="hidden md:flex items-center space-x-1"
                >
                  {SOCIAL_LINKS.map((social) => (
                    <Button
                      key={social.name}
                      variant="ghost"
                      size="icon"
                      asChild
                      className="hover:text-secondary-default"
                    >
                      <Link 
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        aria-label={social.name}
                        data-testid={`social-link-${social.name.toLowerCase()}`}
                      >
                        <social.icon className="w-4 h-4" />
                      </Link>
                    </Button>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:flex lg:hidden items-center">
                  <Button
                    data-testid="mobile-menu-button"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-transparent hover:text-secondary-default focus:bg-transparent"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  >
                    {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <MobileNav 
              navigationItems={NAVIGATION_ITEMS} 
              socialLinks={SOCIAL_LINKS} 
              currentPath={pathname}
              isPathActive={isPathActive}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Modal - Conditionally Rendered */}
      {isSearchEnabled && (
        <GlobalSearch 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
        />
      )}
      
      {/* Spacer to push content below fixed header */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}
