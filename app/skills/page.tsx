import { fetchSkillHierarchy } from "@/lib/api-client";
import SkillsClient from "@/components/SkillsClient";

/**
 * Skills Page - Server Component
 *
 * Fetches skill hierarchy from portfolio-admin API at build time (SSG).
 * Passes data to client component for interactive tree views.
 */
export default async function SkillsPage() {
  let skillsHierarchy: any[] = [];

  try {
    // Fetch skill hierarchy from admin API at build time
    skillsHierarchy = await fetchSkillHierarchy();
  } catch (error) {
    console.error('Failed to fetch skills:', error);
    // Fallback to empty array
    skillsHierarchy = [];
  }

  return <SkillsClient skillsHierarchy={skillsHierarchy} />;
}
