"use client";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { navigationLinks } from "@/data/navigationData";
import { useState } from "react";

const MobileNav = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const logoVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };
  
  // Handle navigation with loading
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsOpen(false);
    
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="relative p-2 rounded text-secondary-default cursor-pointer 
                     hover:bg-white/5 transition-all duration-300 group"
          aria-label="Open mobile navigation menu"
          onClick={() => setIsOpen(true)}
        >
          <motion.div
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <CiMenuFries className="text-2xl group-hover:text-secondary-hover" />
          </motion.div>
        </button>
      </SheetTrigger>
      
      <SheetContent 
        className="flex flex-col items-center text-center bg-primary/95 backdrop-blur-sm border-l border-white/10"
        side="right"
        hideCloseButton
        style={{ zIndex: 100 }}
      >
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Navigation links for mobile devices. Contains links to main pages of the website.
        </SheetDescription>
        
        {/* Close Button */}
        <div className="absolute top-6 right-6 z-10">
          <SheetClose asChild>
            <button
              className="p-2 rounded text-white/70 hover:text-secondary-default 
                         hover:bg-white/5 transition-all duration-300"
              aria-label="Close mobile navigation menu"
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoClose className="text-xl" />
              </motion.div>
            </button>
          </SheetClose>
        </div>

        {/* Logo */}
        <motion.div 
          className="mt-16 mb-12"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <Link href="/" onClick={(e) => handleNavClick(e, "/")}>
            <motion.h1 
              className="text-4xl font-semibold hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Panday<span className="text-secondary-default">.</span>
            </motion.h1>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <motion.nav 
          className="flex flex-col gap-4 w-full px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <AnimatePresence>
            {navigationLinks.map((link, index) => {
              const isActive = pathName === link.path || pathName.startsWith(link.path + "/");
              
              return (
                <motion.div
                  key={link.path}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <Link
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={`
                      relative flex items-center justify-center px-6 py-4
                      text-lg font-medium transition-all duration-300 group overflow-hidden
                      ${isActive 
                        ? "text-secondary-default border-b-2 border-secondary-default" 
                        : "text-white/80 hover:text-secondary-default border-b-2 border-transparent hover:border-secondary-default/50"
                      }
                    `}
                    aria-label={`Navigate to ${link.name}`}
                  >
                    {/* Text */}
                    <span className="capitalize font-medium relative z-10">
                      {link.name}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute right-4 w-2 h-2 bg-secondary-default rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 20,
                          delay: index * 0.1 
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.nav>

        {/* Footer info */}
        <motion.div 
          className="mt-auto mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p className="text-white/50 text-sm">
            Swipe or tap outside to close
          </p>
          <motion.div 
            className="mt-2 text-xs text-white/30"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨ Built with passion
          </motion.div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
