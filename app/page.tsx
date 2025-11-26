"use client";
import { lazy, Suspense, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { getMostRecentCertification } from "@/data/certificationsData";
import { testimonials } from "@/data/testimonialsData";
import FeaturedCertificationCard from "@/components/FeaturedCertificationCard";
import BackgroundElements from "@/components/BackgroundElements";
import Badge from "@/components/Badge";
import Photo from "@/components/Photo";
import SocialPreviewGenerator from "@/components/SocialPreviewGenerator";
import { trackResumeDownload } from "@/lib/analytics";

// Import critical above-the-fold icons directly (no lazy loading)
import { FiDownload, FiCode, FiCloud, FiZap } from "react-icons/fi";
import { SiReact, SiDotnet } from "react-icons/si";
import { RiRobot3Fill } from "react-icons/ri";

// Lazy load only non-critical below-the-fold components
const Socials = lazy(() => import("@/components/Socials"));
const ByTheNumbersDashboard = lazy(() => import("@/components/ByTheNumbersDashboard"));
const TestimonialsCarousel = lazy(() => import("@/components/TestimonialsCarousel"));
const FeaturedCaseStudies = lazy(() => import("@/components/FeaturedCaseStudies"));
const InteractiveDemos = lazy(() => import("@/components/InteractiveDemos"));

// Loading fallback components
const ComponentFallback = ({ className }: { className?: string }) => (
  <div
    className={`bg-gradient-to-br from-[#27272c]/50 to-[#2a2a30]/50 rounded animate-pulse ${className}`}
  />
);

const Home = () => {
  const featuredCertification = getMostRecentCertification();

  // Track if component is mounted (client-side) for conditional animations
  const [isMounted, setIsMounted] = useState(false);
  const [pageLoadTime, setPageLoadTime] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    setPageLoadTime(Date.now());
  }, []);

  // Handle resume download tracking
  const handleResumeDownload = () => {
    const timeOnPage = Math.floor((Date.now() - pageLoadTime) / 1000); // seconds
    trackResumeDownload('Homepage Hero', {
      timeOnPage,
      pageUrl: window.location.href,
      referrer: document.referrer,
    });
  };

  return (
    <>
      <SocialPreviewGenerator
        title="Biswajit Panday - Senior .NET Architect & AI Solutions Engineer"
        description="Senior full-stack developer with 10+ years specializing in .NET, React, and cloud solutions. Built SpireWiz, an AI tool achieving 80-90% efficiency gains for development teams at Optimizely. Microsoft Certified."
        image="https://biswajitpanday.github.io/assets/profile/profile-large.webp"
        url="https://biswajitpanday.github.io"
        type="website"
      />
      <section
        data-testid="home-page"
        className="min-h-[calc(100vh-136px)] flex flex-col justify-center relative overflow-hidden py-8 xl:py-0 pb-12 xl:pb-16"
      >
      {/* Enhanced Background Elements */}
      <BackgroundElements
        floatingDots={[
          {
            size: "md",
            color: "secondary",
            animation: "ping",
            position: { top: "5rem", right: "2.5rem" },
            opacity: 60,
          },
          {
            size: "sm",
            color: "blue",
            animation: "pulse",
            position: { bottom: "8rem", right: "16rem" },
            opacity: 40,
          },
          {
            size: "md",
            color: "secondary",
            animation: "bounce",
            position: { top: "33.333333%", left: "2rem" },
            opacity: 50,
          },
        ]}
      />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-secondary-default/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-center xl:justify-between gap-8 xl:gap-16 xl:pt-8 xl:pb-8">
          {/* Content Section */}
          <motion.div
            data-testid="home-content"
            initial={isMounted ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center xl:text-left order-2 xl:order-none max-w-2xl"
          >
            {/* Role Badge */}
            <motion.div
              data-testid="home-role-badge"
              initial={isMounted ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMounted ? 0.05 : 0, duration: 0.3 }}
              className="mb-6"
            >
              <Badge
                icon={<FiCode className="text-lg" />}
                text={
                  <span className="flex items-center gap-2">
                    Senior .NET Architect & AI Solutions Engineer
                    <FiZap className="text-lg animate-pulse" />
                  </span>
                }
                color="default"
              />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              data-testid="home-main-heading"
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMounted ? 0.1 : 0, duration: 0.3 }}
              className="text-3xl xl:text-4xl font-bold mb-6 leading-tight"
            >
              Hi, I&apos;m <br className="hidden xl:block" />
              <span className="bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
                Biswajit Panday
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              data-testid="home-description"
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMounted ? 0.15 : 0, duration: 0.3 }}
              className="text-base xl:text-lg mb-8 text-white/80 leading-relaxed max-w-[600px] mx-auto xl:mx-0"
            >
              Senior full-stack developer specializing in{" "}
              <span className="text-secondary-default font-semibold">
                .NET, React, and cloud solutions
              </span>{" "}
              with 10+ years of experience. I build{" "}
              <span className="text-secondary-default font-semibold">
                scalable enterprise applications
              </span>{" "}
              and integrate modern technologies—recently developed{" "}
              <span className="text-emerald-400 font-semibold">
                SpireWiz
              </span>, an AI tool that reduced merge effort by{" "}
              <span className="text-emerald-400 font-semibold">
                80-90%
              </span>{" "}
              for development teams at Optimizely.
            </motion.p>

            {/* Tech Stack Highlights */}
            <motion.div
              data-testid="home-tech-stack"
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMounted ? 0.2 : 0, duration: 0.3 }}
              className="flex flex-wrap justify-center xl:justify-start gap-3 mb-8"
            >
              <Badge
                icon={<SiDotnet className="text-secondary-default" />}
                text=".NET"
                color="default"
              />
              <Badge
                icon={<SiReact className="text-secondary-default" />}
                text="React"
                color="default"
              />
              <Badge
                icon={<FiCloud className="text-secondary-default" />}
                text="DevOps"
                color="default"
              />
              <Badge
                icon={<RiRobot3Fill className="text-emerald-400" />}
                text="AI Integration"
                color="emerald"
              />
            </motion.div>

            {/* Featured Certification Card */}
            {featuredCertification && (
              <motion.div
                data-testid="home-featured-certification"
                initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isMounted ? 0.25 : 0, duration: 0.3 }}
                className="mb-6"
              >
                <FeaturedCertificationCard
                  certification={featuredCertification}
                  size="small"
                  simplified={true}
                  headingLevel={2}
                />
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              data-testid="home-action-buttons"
              initial={isMounted ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMounted ? 0.3 : 0, duration: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-6 mb-2"
            >
              <a
                href="/assets/Biswajit_Panday_Resume.pdf"
                download="Biswajit_Panday_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeDownload}
                data-testid="home-download-resume-link"
              >
                <Button
                  data-testid="home-download-resume-button"
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-secondary-default to-blue-500 hover:from-blue-500 hover:to-secondary-default text-primary font-semibold px-8 py-3 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Download Resume</span>
                    <FiDownload className="text-lg group-hover:animate-bounce" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-secondary-default opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </a>

              <div
                data-testid="home-social-links"
                className="flex items-center gap-4"
              >
                <Suspense
                  fallback={<ComponentFallback className="w-40 h-10" />}
                >
                  <Socials
                    containerStyles="flex gap-4"
                    iconStyles="w-11 h-11 border border-secondary-default/50 rounded-full flex justify-center items-center text-secondary-default text-base hover:bg-secondary-default hover:text-primary hover:border-secondary-default hover:shadow-lg hover:shadow-secondary-default/25 transition-all duration-300 hover:scale-110"
                  />
                </Suspense>
              </div>
            </motion.div>
          </motion.div>

          {/* Photo Section */}
          <motion.div
            data-testid="home-photo-section"
            initial={isMounted ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: isMounted ? 0.1 : 0, duration: 0.4 }}
            className="order-1 xl:order-none relative"
          >
            <div className="relative">
              {/* Enhanced Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-default/20 to-blue-500/20 rounded-full blur-3xl scale-110 animate-pulse" />
              <div className="absolute -inset-4 bg-gradient-to-tr from-secondary-default/5 to-blue-500/5 rounded-full blur-xl scale-105" />
              <div data-testid="home-photo-container" className="relative z-10">
                <Photo />
              </div>
            </div>
          </motion.div>
        </div>

        {/* By The Numbers Dashboard - Primary Stats Display */}
        <Suspense fallback={<ComponentFallback className="w-full h-64" />}>
          <ByTheNumbersDashboard />
        </Suspense>

        {/* Testimonials Carousel - Real LinkedIn Recommendations */}
        <Suspense fallback={<ComponentFallback className="w-full h-64" />}>
          <TestimonialsCarousel testimonials={testimonials} />
        </Suspense>

        {/* Featured Case Studies */}
        <Suspense fallback={<ComponentFallback className="w-full h-96" />}>
          <FeaturedCaseStudies maxItems={2} />
        </Suspense>

        {/* Interactive Demos - Live Projects */}
        <Suspense fallback={<ComponentFallback className="w-full h-96" />}>
          <InteractiveDemos />
        </Suspense>
      </div>
    </section>
   </>
   );
 };

export default Home;
