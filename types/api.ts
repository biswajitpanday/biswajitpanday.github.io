/**
 * API Response Types
 *
 * TypeScript types matching the portfolio-admin API responses.
 * These types are used when fetching data from the deployed API.
 */

// ==================== ENUMS ====================

export interface Enums {
  projectCategories: string[];
  companies: string[];
  jobRoles: string[];
  certCategories: string[];
  certStatuses: string[];
  skillLevels: string[];
  jobTypes: string[];
  blogCategories: string[];
}

// ==================== PROJECTS ====================

export interface ProjectMetrics {
  efficiency?: string;
  users?: string;
  revenue?: string;
  performance?: string;
  downloads?: string;
  github_stars?: string;
  other?: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  linkedinUrl?: string;
  approved?: boolean;
  shouldPublish?: boolean;
  isSampleData?: boolean;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  architectureDiagram?: string;
  results: string[];
  technicalHighlights?: string[];
}

export interface Recognition {
  title: string;
  description: string;
  icon?: string;
  approved?: boolean;
  shouldPublish?: boolean;
  isSampleData?: boolean;
}

export interface Project {
  _id: string;
  id?: string;
  num: number;
  category: string;
  title: string;
  subtitle?: string;
  longDescription: string;
  shortDescription: string;
  stacks: string[];
  image: string;
  thumbImage?: string;
  isActive: boolean;
  isOpenSource: boolean;
  isFeatured?: boolean;
  isLegacy?: boolean;
  url: string;
  github: string;
  associatedWithCompany: string;
  jobRole: string;
  startDate: string;
  endDate: string;
  inactivationReason?: string | null;
  responsibilities?: string[];
  metrics?: ProjectMetrics;
  testimonials?: Testimonial[];
  caseStudy?: CaseStudy;
  recognition?: Recognition[];
  skillsHighlighted?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// ==================== CERTIFICATIONS ====================

export interface Certification {
  _id: string;
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
  description?: string;
  skills?: string[];
  featured: boolean;
  showByDefault?: boolean;
  image?: string;
  thumbImage?: string;
  category: string;
  isUpcoming?: boolean;
  issuerLogo?: string;
  status?: string;
  onlineVerifiable?: boolean;
  certificationNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// ==================== SKILLS ====================

export interface SkillItem {
  _id: string;
  id: string;
  name: string;
  level: string;
  yearsOfExperience?: number;
  lastUsed?: string;
  icon?: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface SkillCategory {
  _id: string;
  id: string;
  name: string;
  icon?: string;
  order: number;
  skills?: SkillItem[];
  children?: SkillCategory[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// ==================== TIMELINE ====================

export interface TimelineEntry {
  _id: string;
  id?: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
  icon?: string;
  url?: string;
  jobType: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// ==================== TESTIMONIALS ====================

export interface TestimonialData {
  _id: string;
  id?: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  linkedinUrl?: string;
  shouldPublish: boolean;
  isSampleData?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// ==================== BLOG ====================

export interface BlogPost {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  coverImage?: string;
  publishedAt?: string;
  updatedAt?: string;
  isPublished: boolean;
  readingTime?: number;
  createdAt?: string;
  __v?: number;
}
