"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { navigationLinks } from "@/data/navigationData";
import { useEffect } from "react";

/**
 * Nav - Accessible main navigation component
 * WCAG 2.1 AA compliant with keyboard shortcuts and focus management
 */
const Nav = () => {
  const pathName = usePathname();
  const router = useRouter();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey) {
        const link = navigationLinks.find(
          (link) => link.shortcut?.toLowerCase() === event.key.toLowerCase()
        );
        if (link) {
          // Trigger the route change event
          window.dispatchEvent(new Event('route-change-start'));
          
          // Navigate after a short delay
          setTimeout(() => {
            router.push(link.path);
          }, 100);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);
  
  // Handle navigation with loading
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    
    // Only trigger if it's a different page
    if (pathName !== path) {
      // Trigger the route change event
      window.dispatchEvent(new Event('route-change-start'));
      
      // Navigate after a short delay
      setTimeout(() => {
        router.push(path);
      }, 100);
    }
  };

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
            onClick={(e) => handleNavClick(e, link.path)}
            className={`
              relative capitalize font-medium transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1f] rounded
              ${isActive
                ? "text-secondary-default border-b-2 border-secondary-default pb-1"
                : "text-white/80 hover:text-secondary-default border-b-2 border-transparent pb-1 hover:border-secondary-default/50"
              }
            `}
            aria-current={isActive ? "page" : undefined}
            title={`Alt+${link.shortcut}`}
          >
              {/* Text */}
              <span className="relative">
                {link.name}
              </span>

              {/* Active shadow - decorative */}
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-secondary-default/20 rounded-full blur-sm"
                  layoutId="activeShadow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
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
