// Animation delays and durations - Optimized for performance
export const ANIMATION_DELAYS = {
  NONE: 0,
  MINIMAL: 0.1,
  HEADER: 0.1,
  CONTENT: 0.1,
  CARDS: 0.1,
  STATS: 0.1,
  STAGGER: 0.05,
} as const;

export const ANIMATION_DURATIONS = {
  INSTANT: 0.2,
  FAST: 0.3,
  NORMAL: 0.4,
  SLOW: 0.6,
  VERY_SLOW: 0.8,
} as const;

// Performance-optimized animation variants
export const PERFORMANCE_VARIANTS = {
  // Fast entry animations
  fadeInFast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: ANIMATION_DURATIONS.FAST, ease: "easeOut" }
    }
  },

  // Synchronous slide animations
  slideUpSync: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: ANIMATION_DURATIONS.NORMAL, ease: "easeOut" }
    }
  },

  // Container for staggered children
  containerSync: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: ANIMATION_DURATIONS.FAST,
        staggerChildren: ANIMATION_DELAYS.STAGGER,
        delayChildren: ANIMATION_DELAYS.MINIMAL,
      },
    },
  },

  // Card animations
  cardSync: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_DURATIONS.NORMAL,
        ease: "easeOut",
      },
    },
  },
} as const;

// Lightweight animation variants for better performance
export const LIGHTWEIGHT_VARIANTS = {
  // Simple fade in - minimal processing
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  // Simple slide up - reduced complexity
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  // Simple slide in from left
  slideLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  // Simple slide in from right
  slideRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  // Button hover - minimal animation
  buttonHover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" }
  }
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

// Color constants
export const COLORS = {
  PRIMARY: '#1c1c22',
  SECONDARY: '#00BFFF',
  SECONDARY_HOVER: '#00e187',
  WHITE: '#ffffff',
  TRANSPARENT: 'transparent',
} as const;

// Form validation constants
export const FORM_VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MIN_MESSAGE_LENGTH: 10,
  MIN_PHONE_LENGTH: 10,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Rate limiting constants
export const RATE_LIMIT = {
  MAX_ATTEMPTS: 3,
  WINDOW_MS: 60000, // 1 minute
  BLOCK_DURATION_MS: 300000, // 5 minutes
} as const;

// Performance constants
export const PERFORMANCE = {
  LAZY_LOAD_THRESHOLD: '200px',
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
} as const;

// Bundle optimization
export const BUNDLE_CONFIG = {
  CHUNK_SIZE_WARNING: 244000, // 244KB
  MAX_INITIAL_CHUNK_SIZE: 512000, // 512KB
} as const;

// SEO constants
export const SEO = {
  DEFAULT_TITLE: "Panday's Portfolio",
  DEFAULT_DESCRIPTION: "Portfolio of Biswajit Panday - Full-Stack .NET Developer",
  SITE_URL: "https://biswajitpanday.github.io",
  AUTHOR: "Biswajit Panday",
} as const;

// Social media links
export const SOCIAL_LINKS = {
  GITHUB: "https://github.com/biswajitpanday",
  LINKEDIN: "https://linkedin.com/in/biswajitpanday",
  EMAIL: "biswajitmailid@gmail.com",
  PHONE: "+880 1681642502",
  SKYPE: "biswajit_panday",
} as const;

export default {
  ANIMATION_DELAYS,
  ANIMATION_DURATIONS,
  PERFORMANCE_VARIANTS,
  LIGHTWEIGHT_VARIANTS,
  BREAKPOINTS,
  COLORS,
  FORM_VALIDATION,
  RATE_LIMIT,
  PERFORMANCE,
  BUNDLE_CONFIG,
  SEO,
  SOCIAL_LINKS,
}; 