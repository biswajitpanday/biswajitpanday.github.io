"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Triangle } from "react-loader-spinner";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  
  // State for tracking loading and route changes
  const [isNavigating, setIsNavigating] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [key, setKey] = useState(0);

  // Initial setup - skip loading animation on first render
  useEffect(() => {
    // This is for tracking navigation events
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
      setShowLoader(true);
    };

    // Create a custom event for route changes
    window.addEventListener("route-change-start", handleRouteChangeStart);
    
    return () => {
      window.removeEventListener("route-change-start", handleRouteChangeStart);
    };
  }, []);

  // Handle pathname changes
  useEffect(() => {
    // If this is a navigation (not the initial load)
    if (isNavigating) {
      // Show loader for a consistent amount of time
      const loaderTimer = setTimeout(() => {
        setShowLoader(false);
        setDisplayChildren(children);
        setKey(prev => prev + 1);
        
        // Reset navigation state after everything is done
        const resetTimer = setTimeout(() => {
          setIsNavigating(false);
        }, 500);
        
        return () => clearTimeout(resetTimer);
      }, 1000); // Consistent loading time
      
      return () => clearTimeout(loaderTimer);
    } else {
      // For initial load or direct URL access
      setDisplayChildren(children);
    }
  }, [children, isNavigating]);

  // Set up click handler for internal links
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;
      
      // Only handle internal links that aren't being opened in a new tab
      const href = link.getAttribute('href');
      const isInternal = href && (
        href.startsWith('/') || 
        href.startsWith(window.location.origin)
      );
      const isNewTab = link.getAttribute('target') === '_blank';
      const isDownload = link.hasAttribute('download');
      
      if (isInternal && !isNewTab && !isDownload) {
        e.preventDefault();
        
        // Trigger the route change event
        window.dispatchEvent(new Event('route-change-start'));
        
        // Navigate after a short delay to allow the loader to show
        setTimeout(() => {
          router.push(href!);
        }, 100);
      }
    };
    
    // Attach the click handler to the document
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [router]);

  return (
    <AnimatePresence mode="wait">
      {showLoader ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Triangle
            visible={true}
            height="60"
            width="60"
            color="#00bfff"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </motion.div>
      ) : (
        <motion.div
          key={`content-${key}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {displayChildren}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;