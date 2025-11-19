/**
 * Category color mapping for project badges
 * Used across ProjectCard, ProjectTimeline, and ProjectModal
 *
 * Each category has a consistent gradient background with border and text colors
 */
export const CATEGORY_COLORS: Record<string, string> = {
  "Full-Stack": "from-emerald-500/20 to-cyan-500/20 border-emerald-500/40 text-emerald-300",
  "Frontend": "from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-300",
  "Backend": "from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-300",
  "Mobile": "from-orange-500/20 to-red-500/20 border-orange-500/40 text-orange-300",
  "Windows App": "from-yellow-500/20 to-orange-500/20 border-yellow-500/40 text-yellow-300",
};

/**
 * Helper function to get category color classes
 * Provides fallback for unknown categories
 *
 * @param category - Project category
 * @returns Tailwind CSS class string
 */
export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || "from-gray-500/20 to-gray-600/20 border-gray-500/40 text-gray-300";
}

/**
 * Company logo path mapping
 * Used for displaying company logos in project badges
 */
export const COMPANY_LOGOS: Record<string, string> = {
  "Brain Station-23": "/assets/company-icon/webp/brain-station-23.webp",
  "Chorki Limited": "/assets/company-icon/webp/chorki.webp",
  "Kaz Software": "/assets/company-icon/webp/kaz.webp",
  "Optimizely": "/assets/company-icon/webp/opti.webp",
};

/**
 * Helper function to get company logo path
 * Returns null if company has no logo
 *
 * @param company - Company name
 * @returns Logo path or null
 */
export function getCompanyLogo(company: string): string | null {
  return COMPANY_LOGOS[company] || null;
}
