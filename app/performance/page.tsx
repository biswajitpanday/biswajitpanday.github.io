import PerformanceMetrics from "@/components/PerformanceMetrics";
import SocialPreviewGenerator from "@/components/SocialPreviewGenerator";

export const metadata = {
  title: "Performance Metrics",
  description: "Real-time performance metrics, Core Web Vitals, and Lighthouse scores for Biswajit Panday's portfolio. Demonstrating commitment to web performance optimization and best practices.",
  keywords: ["Web Performance", "Core Web Vitals", "Lighthouse", "Performance Optimization", "LCP", "CLS", "INP", "Page Speed"],
};

export default function PerformancePage() {
  return (
    <>
      <SocialPreviewGenerator
        title="Performance Metrics - Biswajit Panday"
        description="Real-time performance metrics with 100/100 Lighthouse scores. See how I optimize for speed, SEO, and user experience."
        image="https://biswajitpanday.github.io/assets/profile/profile-large.webp"
        url="https://biswajitpanday.github.io/performance"
        type="website"
      />

      {/* Performance Metrics Dashboard */}
      <PerformanceMetrics />
    </>
  );
}
