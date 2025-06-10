"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface NavigationItem {
  name: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface MobileNavUpdatedProps {
  navigationItems: NavigationItem[];
  socialLinks: SocialLink[];
  currentPath: string;
  isPathActive?: (path: string) => boolean;
  onClose: () => void;
}

export default function MobileNavUpdated({
  navigationItems,
  socialLinks,
  currentPath,
  isPathActive,
  onClose,
}: MobileNavUpdatedProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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
    <div className="fixed inset-0 z-[var(--z-mobile-nav)]" style={{ zIndex: 'var(--z-mobile-nav)' }}>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="fixed top-0 right-0 h-[100vh] w-full max-w-xs bg-gradient-to-br from-[#1e1e24] to-[#27272f] border-l border-secondary-default/20 shadow-lg overflow-y-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-secondary-default/10 to-transparent opacity-40 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-t from-secondary-default/10 to-transparent opacity-30 pointer-events-none rounded-full blur-xl"></div>
          
          <div className="relative z-10 p-6">
            <div className="flex justify-between items-center mb-8">
              <motion.h2 
                className="text-xl font-semibold text-white"
                variants={itemVariants}
              >
                Menu
              </motion.h2>
              <motion.button
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-secondary-default transition-colors"
                onClick={onClose}
                variants={itemVariants}
                aria-label="Close menu"
              >
                <FaTimes className="w-5 h-5" />
              </motion.button>
            </div>

            <nav className="mb-10">
              <ul className="space-y-3">
                {navigationItems.map((item) => {
                  const isActive = checkIsActive(item.href);
                  return (
                    <motion.li key={item.name} variants={itemVariants}>
                      <Link
                        href={item.href}
                        className={`flex items-center py-3 px-4 text-base font-medium rounded-md transition-all duration-300 relative overflow-hidden group ${
                          isActive
                            ? "bg-secondary-default/10 text-secondary-default"
                            : "text-white/80 hover:bg-white/5 hover:text-secondary-default"
                        }`}
                        onClick={onClose}
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

            <motion.div variants={itemVariants} className="mt-auto pt-6 border-t border-white/10">
              <h3 className="text-sm font-medium text-white/50 mb-4">Connect</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 text-white/70 hover:text-secondary-default hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-secondary-default/30 hover:shadow-glow"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
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