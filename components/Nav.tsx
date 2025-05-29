"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navigationLinks } from "@/data/navigationData";
import { useEffect } from "react";

const Nav = () => {
  const pathName = usePathname();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey) {
        const link = navigationLinks.find(
          (link) => link.shortcut?.toLowerCase() === event.key.toLowerCase()
        );
        if (link) {
          window.location.href = link.path;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav 
      className="flex gap-8" 
      role="navigation" 
      aria-label="Main navigation"
    >
      {navigationLinks.map((link) => {
        const isActive = pathName === link.path || pathName.startsWith(link.path + "/");
        
        return (
          <motion.div
            key={link.path}
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
          <Link
            href={link.path}
              className={`
                relative capitalize font-medium transition-all duration-300
                ${isActive 
                  ? "text-secondary-default border-b-2 border-secondary-default pb-1" 
                  : "text-white/80 hover:text-secondary-default border-b-2 border-transparent pb-1 hover:border-secondary-default/50"
                }
              `}
              aria-label={`Navigate to ${link.name}`}
              title={`Alt+${link.shortcut}`}
          >
              {/* Text */}
              <span className="relative">
            {link.name}
              </span>

              {/* Active shadow */}
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-secondary-default/20 rounded-full blur-sm"
                  layoutId="activeShadow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
          </Link>
          </motion.div>
        );
      })}
    </nav>
  );
};

export default Nav;
