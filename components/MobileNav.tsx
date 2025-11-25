"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTimes, FaChevronDown } from "react-icons/fa";

/**
 * MobileNav - Accessible mobile navigation drawer
 * WCAG 2.1 AA compliant with focus management and keyboard navigation
 */

interface NavigationItem {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface MobileNavProps {
  navigationItems: NavigationItem[];
  socialLinks: SocialLink[];
  currentPath: string;
  isPathActive?: (path: string) => boolean;
  onClose: () => void;
}

export default function MobileNav({
  navigationItems,
  socialLinks,
  currentPath,
  isPathActive,
  onClose,
}: MobileNavProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle Escape key to close menu
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Lock body scroll and set up keyboard handlers when menu is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    // Focus the close button when menu opens for accessibility
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Check if a path is active
  const checkIsActive = (path: string) => {
    if (isPathActive) {
      return isPathActive(path);
    }
    return currentPath === path;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div
      data-testid="mobile-nav-overlay"
      className="fixed inset-0 z-[var(--z-mobile-nav)]"
      style={{ zIndex: 'var(--z-mobile-nav)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      >
        <motion.div
          data-testid="mobile-nav-menu"
          className="fixed top-0 right-0 h-[100vh] w-full max-w-xs bg-gradient-to-br from-[#1e1e24] to-[#27272f] border-l border-secondary-default/20 shadow-lg overflow-y-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative elements - hidden from screen readers */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-secondary-default/10 to-transparent opacity-40 pointer-events-none" aria-hidden="true"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-t from-secondary-default/10 to-transparent opacity-30 pointer-events-none rounded-full blur-xl" aria-hidden="true"></div>
          
          <div className="relative z-10 p-6">
            <div className="flex justify-between items-center mb-8">
              <motion.h2 
                className="text-xl font-semibold text-white"
                variants={itemVariants}
              >
                Menu
              </motion.h2>
              <motion.button
                ref={closeButtonRef}
                data-testid="mobile-nav-close"
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-secondary-default transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e24]"
                onClick={onClose}
                variants={itemVariants}
                aria-label="Close navigation menu"
              >
                <FaTimes className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </div>

            <nav 
              data-testid="mobile-nav-navigation"
              className="mb-10"
            >
              <ul className="space-y-3">
                {navigationItems.map((item) => {
                  const hasActiveChild = item.dropdown?.some((child) => checkIsActive(child.href));
                  const isActive = checkIsActive(item.href) || hasActiveChild;

                  // Render dropdown item
                  if (item.dropdown) {
                    return (
                      <motion.li key={item.name} variants={itemVariants}>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                          data-testid={`mobile-nav-link-${item.name.toLowerCase()}`}
                          className={`flex items-center justify-between w-full py-3 px-4 text-base font-medium rounded-md transition-all duration-300 relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e24] ${
                            isActive
                              ? "bg-secondary-default/10 text-secondary-default"
                              : "text-white/80 hover:bg-white/5 hover:text-secondary-default"
                          }`}
                          aria-expanded={openDropdown === item.name}
                          aria-haspopup="true"
                        >
                          <span className="relative z-10">{item.name}</span>
                          <FaChevronDown className={`relative z-10 text-xs transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} />

                          {/* Active indicator */}
                          {isActive && (
                            <>
                              <span className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-default rounded-r"></span>
                              <span className="absolute inset-0 bg-secondary-default/5 rounded-md"></span>
                            </>
                          )}
                        </button>

                        {/* Dropdown items */}
                        {openDropdown === item.name && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 ml-4 space-y-2"
                          >
                            {item.dropdown.map((dropdownItem) => {
                              const isDropdownActive = checkIsActive(dropdownItem.href);
                              return (
                                <li key={dropdownItem.name}>
                                  <Link
                                    href={dropdownItem.href}
                                    className={`flex items-center py-2 px-4 text-sm font-medium rounded-md transition-all duration-300 relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e24] ${
                                      isDropdownActive
                                        ? "bg-secondary-default/10 text-secondary-default"
                                        : "text-white/70 hover:bg-white/5 hover:text-secondary-default"
                                    }`}
                                    onClick={onClose}
                                    aria-current={isDropdownActive ? "page" : undefined}
                                  >
                                    <span className="relative z-10">{dropdownItem.name}</span>

                                    {/* Active indicator */}
                                    {isDropdownActive && (
                                      <>
                                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-default rounded-r"></span>
                                        <span className="absolute inset-0 bg-secondary-default/5 rounded-md"></span>
                                      </>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </motion.li>
                    );
                  }

                  // Render regular link
                  return (
                    <motion.li key={item.name} variants={itemVariants}>
                      <Link
                        href={item.href}
                        data-testid={`mobile-nav-link-${item.name.toLowerCase()}`}
                        className={`flex items-center py-3 px-4 text-base font-medium rounded-md transition-all duration-300 relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e24] ${
                          isActive
                            ? "bg-secondary-default/10 text-secondary-default"
                            : "text-white/80 hover:bg-white/5 hover:text-secondary-default"
                        }`}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="relative z-10">{item.name}</span>

                        {/* Active indicator */}
                        {isActive && (
                          <>
                            <span className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-default rounded-r"></span>
                            <span className="absolute inset-0 bg-secondary-default/5 rounded-md"></span>
                          </>
                        )}

                        {/* Hover effect */}
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-secondary-default transform transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`} style={{ transformOrigin: 'left' }}></span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div 
              variants={itemVariants} 
              className="mt-auto pt-6 border-t border-white/10"
            >
              <h3 className="text-sm font-medium text-white/50 mb-4">Connect</h3>
              <div 
                data-testid="mobile-nav-social-links"
                className="flex space-x-4"
              >
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`mobile-social-link-${social.name.toLowerCase()}`}
                    className="p-2 rounded-full bg-white/5 text-white/70 hover:text-secondary-default hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-secondary-default/30 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e24]"
                    aria-label={`Visit ${social.name} profile (opens in new tab)`}
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 mb-4 text-center">
                <p className="text-xs text-white/40">
                  © {new Date().getFullYear()} Biswajit Panday
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 