import {
  fetchTestimonials,
  fetchCertifications,
  fetchProjects,
  fetchTimeline,
  fetchSkillHierarchy,
} from "@/lib/api-client";
import HomeClient from "@/components/HomeClient";
import type { TestimonialData, Certification, Project, TimelineEntry } from "@/types/api";

interface SkillHierarchyNode {
  name: string;
  metadata?: {
    icon?: string;
    level?: string;
    yearsOfExperience?: number;
    lastUsed?: string;
  };
  children?: SkillHierarchyNode[];
}

/**
 * Homepage - Server Component
 *
 * Fetches testimonials, certifications, projects, timeline, and skills from portfolio-admin API at build time (SSG).
 * Passes data to client component for interactive features.
 */
export default async function HomePage() {
  let testimonials: TestimonialData[] = [];
  let featuredCertification: Certification | null = null;
  let projects: Project[] = [];
  let certifications: Certification[] = [];
  let timeline: TimelineEntry[] = [];
  let skillsHierarchy: SkillHierarchyNode[] = [];

  try {
    // Fetch all data from admin API in parallel
    [testimonials, certifications, projects, timeline, skillsHierarchy] = await Promise.all([
      fetchTestimonials(),
      fetchCertifications(),
      fetchProjects(),
      fetchTimeline(),
      fetchSkillHierarchy(),
    ]);

    // Get the most recent featured certification
    const featuredCerts = certifications
      .filter(cert => cert.featured && !cert.isUpcoming)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    featuredCertification = featuredCerts[0] || null;
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    // Fallback to defaults
    testimonials = [];
    featuredCertification = null;
    projects = [];
    certifications = [];
    timeline = [];
    skillsHierarchy = [];
  }

  return (
    <HomeClient
      testimonials={testimonials}
      featuredCertification={featuredCertification}
      projects={projects}
      certifications={certifications}
      timeline={timeline}
      skillsHierarchy={skillsHierarchy}
    />
  );
}
