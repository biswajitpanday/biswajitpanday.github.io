import { fetchTestimonials, fetchCertifications } from "@/lib/api-client";
import HomeClient from "@/components/HomeClient";
import type { TestimonialData, Certification } from "@/types/api";

/**
 * Homepage - Server Component
 *
 * Fetches testimonials and featured certification from portfolio-admin API at build time (SSG).
 * Passes data to client component for interactive features.
 */
export default async function HomePage() {
  let testimonials: TestimonialData[] = [];
  let featuredCertification: Certification | null = null;

  try {
    // Fetch testimonials from admin API
    testimonials = await fetchTestimonials();

    // Fetch certifications and get the most recent featured one
    const certifications = await fetchCertifications();
    const featuredCerts = certifications
      .filter(cert => cert.featured && !cert.isUpcoming)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    featuredCertification = featuredCerts[0] || null;
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    // Fallback to defaults
    testimonials = [];
    featuredCertification = null;
  }

  return <HomeClient testimonials={testimonials} featuredCertification={featuredCertification} />;
}
