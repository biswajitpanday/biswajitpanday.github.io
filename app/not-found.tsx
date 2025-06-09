"use client";
import Link from 'next/link';
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHome } from "react-icons/fa";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  // Handle GitHub Pages routing issues for dynamic routes
  useEffect(() => {
    // Check if this is a certification detail page
    if (pathname.includes('/certifications/')) {
      const certId = pathname.split('/').pop();
      // Store the certification ID in session storage
      if (certId) {
        sessionStorage.setItem('lastCertificationId', certId);
        // Redirect to certifications page after a short delay
        setTimeout(() => {
          router.push('/certifications');
        }, 1500);
      }
    }
    
    // Similar handling for other dynamic routes can be added here
  }, [pathname, router]);

  return (
    <div className="min-h-[calc(100vh-136px)] flex flex-col items-center justify-center text-center p-4">
      <motion.div 
        className="max-w-md w-full bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-6xl font-bold text-secondary-default mb-6">404</h2>
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-white/70 mb-8">
          {pathname.includes('/certifications/') 
            ? "Redirecting you to the certifications page..." 
            : "The page you're looking for doesn't exist or has been moved."}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded transition-colors duration-300"
          >
            <FaArrowLeft className="text-sm" />
            <span>Go Back</span>
          </button>
          
          <Link href="/">
            <span className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary-default hover:bg-secondary-default/80 text-primary rounded transition-colors duration-300">
              <FaHome className="text-sm" />
              <span>Home Page</span>
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 