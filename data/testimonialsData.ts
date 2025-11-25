import { Testimonial } from "@/components/TestimonialsCarousel";

/**
 * Testimonials Data
 *
 * Replace these sample testimonials with real ones from:
 * - LinkedIn recommendations
 * - Email feedback from colleagues
 * - Client testimonials
 *
 * To add a new testimonial:
 * 1. Copy one of the objects below
 * 2. Update all fields with real data
 * 3. Optionally add a linkedinUrl for verification
 * 4. Add a profile image path (optional)
 */
export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Biswajit is an exceptional developer who consistently delivers high-quality solutions. His work on SpireWiz transformed our development workflow, saving our team countless hours every week.",
    author: "Sample Colleague",
    role: "Engineering Manager",
    company: "Tech Company",
    // image: "/assets/testimonials/colleague1.webp",
    // linkedinUrl: "https://linkedin.com/in/..."
    shouldPublish: true, // Set to false to hide from public site
    isSampleData: true,  // Replace with real testimonials
  },
  {
    id: "2",
    quote: "Working with Biswajit was a pleasure. His deep expertise in .NET and cloud architecture helped us modernize our legacy systems while maintaining zero downtime. Highly recommend!",
    author: "Sample Manager",
    role: "Director of Engineering",
    company: "Enterprise Corp",
    // image: "/assets/testimonials/manager1.webp",
    // linkedinUrl: "https://linkedin.com/in/..."
    shouldPublish: true,
    isSampleData: true,
  },
  {
    id: "3",
    quote: "Biswajit's technical leadership on our React migration project was invaluable. He not only delivered excellent code but also mentored junior developers, elevating the entire team's capabilities.",
    author: "Sample Team Lead",
    role: "Senior Developer",
    company: "Software Solutions",
    // image: "/assets/testimonials/lead1.webp",
    // linkedinUrl: "https://linkedin.com/in/..."
    shouldPublish: true,
    isSampleData: true,
  }
];

/**
 * Instructions for adding real testimonials:
 *
 * 1. Request LinkedIn recommendations from:
 *    - Previous managers
 *    - Colleagues you worked closely with
 *    - Clients (if applicable)
 *
 * 2. For each testimonial, get:
 *    - Written permission to use the quote
 *    - Their preferred title/role
 *    - Company name (or omit if preferred)
 *    - Profile photo (optional)
 *    - LinkedIn profile URL (optional, for credibility)
 *
 * 3. Keep quotes concise (2-3 sentences max)
 *
 * 4. Focus on specific achievements/skills mentioned
 */

export default testimonials;
