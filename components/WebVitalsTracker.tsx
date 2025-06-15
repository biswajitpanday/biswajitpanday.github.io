"use client";

import { useEffect } from 'react';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Web Vitals tracking for performance monitoring
const WebVitalsTracker = () => {
  useEffect(() => {
    // Only track in production
    if (process.env.NODE_ENV !== 'production') return;

    // Simple performance tracking without external dependencies
    const trackPerformance = () => {
      // Track page load time
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          console.log('Page Load Time:', loadTime);
          
          // Track to Google Analytics if available
          if (window.gtag) {
            window.gtag('event', 'page_load_time', {
              event_category: 'Performance',
              value: Math.round(loadTime),
            });
          }
        }
      }
    };

    // Track performance after page load
    if (document.readyState === 'complete') {
      trackPerformance();
    } else {
      window.addEventListener('load', trackPerformance);
    }

    return () => {
      window.removeEventListener('load', trackPerformance);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitalsTracker; 