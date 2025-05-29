// Animation delays and durations
export const ANIMATION_DELAYS = {
  HEADER: 0.2,
  CONTENT: 0.4,
  CARDS: 0.6,
  STATS: 0.8,
  STAGGER: 0.1,
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 0.8,
  VERY_SLOW: 1.2,
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
  BREAKPOINTS,
  COLORS,
  FORM_VALIDATION,
  RATE_LIMIT,
  PERFORMANCE,
  BUNDLE_CONFIG,
  SEO,
  SOCIAL_LINKS,
}; 