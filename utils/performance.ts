// Performance monitoring utilities

interface MemoryInfo {
  used: number;
  total: number;
  limit: number;
}

export const performanceMonitor = {
  // Track component render times
  measureRender: (componentName: string, renderFn: () => void) => {
    if (typeof window !== 'undefined' && window.performance) {
      const start = performance.now();
      renderFn();
      const end = performance.now();
      console.log(`${componentName} render time: ${end - start}ms`);
    } else {
      renderFn();
    }
  },

  // Track bundle loading times
  measureBundleLoad: (bundleName: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      const start = performance.now();
      return {
        end: () => {
          const end = performance.now();
          console.log(`${bundleName} load time: ${end - start}ms`);
        }
      };
    }
    return { end: () => {} };
  },

  // Monitor memory usage
  getMemoryUsage: (): MemoryInfo | null => {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as unknown as { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576 * 100) / 100,
        total: Math.round(memory.totalJSHeapSize / 1048576 * 100) / 100,
        limit: Math.round(memory.jsHeapSizeLimit / 1048576 * 100) / 100,
      };
    }
    return null;
  },

  // Log performance metrics
  logMetrics: () => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Metrics');
      
      const memory = performanceMonitor.getMemoryUsage();
      if (memory) {
        console.log(`Memory Usage: ${memory.used}MB / ${memory.total}MB (Limit: ${memory.limit}MB)`);
      }

      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        console.log(`Page Load Time: ${navigation.loadEventEnd - navigation.fetchStart}ms`);
        console.log(`DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.fetchStart}ms`);
      }

      console.groupEnd();
    }
  }
};

// Bundle size analyzer
export const bundleAnalyzer = {
  // Estimate component bundle impact
  estimateComponentSize: (componentName: string, dependencies: string[]) => {
    const estimatedSizes: Record<string, number> = {
      'framer-motion': 85000,
      'react-icons': 15000,
      'react-hook-form': 25000,
      'zod': 12000,
      'next/image': 5000,
      'next/link': 2000,
    };

    const totalSize = dependencies.reduce((acc, dep) => {
      return acc + (estimatedSizes[dep] || 5000);
    }, 0);

    if (process.env.NODE_ENV === 'development') {
      console.log(`📦 ${componentName} estimated bundle impact: ${Math.round(totalSize / 1000)}KB`);
    }

    return totalSize;
  },

  // Check if bundle size exceeds thresholds
  checkBundleThresholds: (bundleSize: number, componentName: string) => {
    const WARNING_THRESHOLD = 244000; // 244KB
    const ERROR_THRESHOLD = 512000; // 512KB

    if (bundleSize > ERROR_THRESHOLD) {
      console.error(`🚨 ${componentName} bundle size (${Math.round(bundleSize / 1000)}KB) exceeds error threshold!`);
      return 'error';
    } else if (bundleSize > WARNING_THRESHOLD) {
      console.warn(`⚠️ ${componentName} bundle size (${Math.round(bundleSize / 1000)}KB) exceeds warning threshold`);
      return 'warning';
    }
    return 'ok';
  }
};

// Animation performance utilities
export const animationOptimizer = {
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  },

  // Optimize animation based on device capabilities
  getOptimalAnimationConfig: () => {
    if (typeof window === 'undefined') {
      return { duration: 0.6, ease: 'easeOut' };
    }

    const isLowEndDevice = navigator.hardwareConcurrency <= 4;

    if (animationOptimizer.prefersReducedMotion() || isLowEndDevice) {
      return {
        duration: 0.2,
        ease: 'linear',
        stagger: 0.05,
        reduced: true
      };
    }

    return {
      duration: 0.6,
      ease: 'easeOut',
      stagger: 0.1,
      reduced: false
    };
  },

  // Debounce function for performance
  debounce: <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function for performance
  throttle: <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

export default {
  performanceMonitor,
  bundleAnalyzer,
  animationOptimizer,
}; 