/**
 * Standardized badge size classes for consistent styling
 * across ProjectCard, ProjectTimeline, and ProjectModal
 *
 * BADGE STYLING PHILOSOPHY (Phase 8 - Updated 2025-11-19):
 * - Solid backgrounds (no gradients) for cleaner appearance
 * - Category-specific colors defined in projectConstants.ts
 * - Consistent sizing for visual hierarchy
 *
 * All badge sizes follow this convention:
 * - text-xs: Standard badges (Status, Featured, Primary Metric, Category)
 * - text-[11px]: Smaller badges (Open Source, Recognition)
 * - text-[10px]: Tiny badges (used sparingly for compact layouts)
 */

/**
 * Status badge (Active/Completed)
 * Size: Standard (text-xs) with strict h-7 (28px) height
 */
export const STATUS_BADGE_CLASSES = "h-7 text-xs px-3 py-1.5 rounded-full font-medium";

/**
 * Featured badge
 * Size: Standard (text-xs) with strict h-7 (28px) height
 */
export const FEATURED_BADGE_CLASSES = "h-7 text-xs px-2.5 py-1 rounded-md font-semibold";

/**
 * Open Source badge
 * Size: Small (text-[11px]) with strict h-7 (28px) height
 */
export const OPEN_SOURCE_BADGE_CLASSES = "h-7 text-[11px] px-2.5 py-1 rounded-md font-semibold";

/**
 * Recognition/Awards badge
 * Size: Compact (text-[10px]) with strict h-7 (28px) height - Reduced for Phase 8 refinement
 */
export const RECOGNITION_BADGE_CLASSES = "h-7 text-[10px] px-2 py-0.5 rounded-md font-semibold";

/**
 * Primary Metric badge (on image)
 * Size: Standard (text-xs) with strict h-7 (28px) height
 * Note: ProjectCard and Timeline use text-xs px-3 py-1.5
 */
export const PRIMARY_METRIC_BADGE_CLASSES = "h-7 text-xs px-3 py-1.5 rounded-full font-semibold";

/**
 * Primary Metric badge for Modal (slightly larger on hero image)
 * Size: Slightly larger (text-sm px-4 py-2) with h-8 (32px) for prominence
 */
export const PRIMARY_METRIC_BADGE_MODAL_CLASSES = "h-8 text-sm px-4 py-2 rounded-full font-semibold";

/**
 * Category badge
 * Size: Compact (text-[11px]) with strict h-7 (28px) height - Reduced for Phase 8 refinement
 */
export const CATEGORY_BADGE_CLASSES = "h-7 text-[11px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wide";

/**
 * Company badge
 * Size: Standard (text-xs) with strict h-7 (28px) height
 */
export const COMPANY_BADGE_CLASSES = "h-7 text-xs px-2.5 py-1 rounded-md font-medium";

/**
 * Key Skills badge
 * Size: Compact (text-[11px]) with strict h-7 (28px) height - Reduced for Phase 8 refinement to fit more in one line
 */
export const KEY_SKILLS_BADGE_CLASSES = "h-7 text-[11px] px-2 py-0.5 rounded-md font-medium";

/**
 * Key Skills badge for Modal (slightly larger)
 * Size: Standard (text-sm) with h-7 (28px) height
 */
export const KEY_SKILLS_BADGE_MODAL_CLASSES = "h-7 text-sm px-3 py-1.5 rounded-md font-medium";
