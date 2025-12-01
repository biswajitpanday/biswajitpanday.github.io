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
import TypingAnimation from "@/components/TypingAnimation";
import FloatingCodeSymbols from "@/components/FloatingCodeSymbols";
import ScrollIndicator from "@/components/ScrollIndicator";

// Import critical above-the-fold icons directly (no lazy loading)
import { FiDownload, FiCode, FiCloud, FiZap, FiBriefcase, FiGlobe, FiUsers, FiEye } from "react-icons/fi";
import { SiReact, SiDotnet } from "react-icons/si";
import { RiRobot3Fill } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbPlane } from "react-icons/tb";

// Typing animation phrases
const HERO_PHRASES = [
  "I build scalable enterprise systems",
  "I integrate AI to boost productivity",
  "I architect cloud-native solutions",
  "I transform legacy into modern",
];

// Lazy load only non-critical below-the-fold components
const Socials = lazy(() => import("@/components/Socials"));
const ByTheNumbersDashboard = lazy(() => import("@/components/ByTheNumbersDashboard"));
const TestimonialsCarousel = lazy(() => import("@/components/TestimonialsCarousel"));
const FeaturedCaseStudies = lazy(() => import("@/components/FeaturedCaseStudies"));
const GitHubActivityGraph = lazy(() => import("@/components/GitHubActivityGraph"));

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

      {/* Floating Code Symbols Background */}
      <FloatingCodeSymbols symbolCount={12} />

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
            {/* Role Badge - Purple/Pink accent with readable white text */}
            <motion.div
              data-testid="home-role-badge"
              initial={isMounted ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMounted ? 0.05 : 0, duration: 0.3 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 via-pink-500/15 to-purple-500/10 backdrop-blur-sm border border-purple-500/40 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-500/25 transition-all duration-300">
                <FiCode className="text-lg text-purple-400" />
                <span className="text-white">Senior .NET Architect & AI Solutions Engineer</span>
                <FiZap className="text-lg text-pink-400 animate-pulse" />
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              data-testid="home-main-heading"
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMounted ? 0.1 : 0, duration: 0.3 }}
              className="text-3xl xl:text-4xl font-bold mb-4 leading-tight"
            >
              Hi, I&apos;m <br className="hidden xl:block" />
              <span className="bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
                Biswajit Panday
              </span>
            </motion.h1>

            {/* Typing Animation Tagline */}
            <motion.div
              data-testid="home-typing-tagline"
              initial={isMounted ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMounted ? 0.12 : 0, duration: 0.3 }}
              className="h-8 mb-6 flex items-center justify-center xl:justify-start"
            >
              <span className="text-lg xl:text-xl font-light">
                <TypingAnimation
                  phrases={HERO_PHRASES}
                  typingSpeed={60}
                  deletingSpeed={40}
                  pauseDuration={2500}
                  className="bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
                  cursorClassName="bg-gradient-to-b from-emerald-400 to-purple-400"
                />
              </span>
            </motion.div>

            {/* About Me Summary - Recruiter-focused with key highlights */}
            <motion.p
              data-testid="home-description"
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMounted ? 0.15 : 0, duration: 0.3 }}
              className="text-white/70 text-base leading-relaxed max-w-2xl mb-6 mx-auto xl:mx-0"
            >
              Senior .NET Architect with{" "}
              <span className="text-[#00BFFF] font-medium">10+ years</span> building
              enterprise B2B platforms. Currently at{" "}
              <span className="text-[#00BFFF] font-medium">Optimizely</span> serving
              global enterprise clients. Passionate about AI integration—built{" "}
              <span className="text-[#00BFFF] font-medium">SpireWiz</span> achieving{" "}
              <span className="text-emerald-400 font-medium">80% efficiency gains</span>.{" "}
              <span className="text-[#00BFFF] font-medium">Microsoft Certified</span>.
            </motion.p>

            {/* Tech Stack Highlights - Compact badges with gradient icons */}
            <motion.div
              data-testid="home-tech-stack"
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMounted ? 0.2 : 0, duration: 0.3 }}
              className="flex flex-wrap justify-center xl:justify-start gap-2 mb-8"
            >
              <Badge
                icon={<SiDotnet className="text-[#00BFFF]" />}
                text=".NET"
                color="default"
                size="compact"
              />
              <Badge
                icon={<SiReact className="text-[#00BFFF]" />}
                text="React"
                color="default"
                size="compact"
              />
              <Badge
                icon={<FiCloud className="text-purple-400" />}
                text="DevOps"
                color="purple"
                size="compact"
              />
              <Badge
                icon={<RiRobot3Fill className="text-emerald-400" />}
                text="AI Integration"
                color="emerald"
                size="compact"
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
              <div className="flex flex-col sm:flex-row items-center gap-3">
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
                    className="group relative overflow-hidden bg-gradient-to-r from-[#00BFFF] via-blue-500 to-purple-500 hover:from-purple-500 hover:via-blue-500 hover:to-[#00BFFF] text-white font-semibold px-6 py-3 rounded transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <FiDownload className="text-lg group-hover:animate-bounce" aria-hidden="true" />
                      <span>Download Resume</span>
                      <span className="text-xs opacity-70">PDF</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-[#00BFFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </a>
                <a
                  href="/assets/Biswajit_Panday_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="home-view-resume-link"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#00BFFF]/30 text-[#00BFFF] hover:bg-[#00BFFF]/10 hover:border-[#00BFFF]/50 px-6 py-3 rounded transition-all duration-300"
                  >
                    <FiEye className="text-lg mr-2" aria-hidden="true" />
                    View Resume
                  </Button>
                </a>
              </div>

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

            {/* Availability Status - Recruiter-focused */}
            <motion.div
              data-testid="home-availability-status"
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMounted ? 0.35 : 0, duration: 0.3 }}
              className="mt-6 flex items-center justify-center xl:justify-start gap-2 text-xs text-white/70"
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>
                Open to Senior .NET / Full-Stack roles
                <span className="hidden sm:inline"> • Remote Welcome • Visa Sponsorship Preferred</span>
              </span>
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

        {/* Scroll Indicator */}
        <div className="hidden xl:flex justify-center mt-8">
          <ScrollIndicator targetId="stats-dashboard" />
        </div>

        {/* By The Numbers Dashboard - Primary Stats Display */}
        <div id="stats-dashboard">
          <Suspense fallback={<ComponentFallback className="w-full h-64" />}>
            <ByTheNumbersDashboard />
          </Suspense>
        </div>

        {/* Testimonials Carousel - Real LinkedIn Recommendations */}
        <Suspense fallback={<ComponentFallback className="w-full h-64" />}>
          <TestimonialsCarousel testimonials={testimonials} />
        </Suspense>

        {/* Featured Case Studies */}
        <Suspense fallback={<ComponentFallback className="w-full h-96" />}>
          <FeaturedCaseStudies maxItems={2} />
        </Suspense>

        {/* GitHub Activity - Shows Active Development */}
        <Suspense fallback={<ComponentFallback className="w-full h-64" />}>
          <GitHubActivityGraph />
        </Suspense>

        {/* What I'm Looking For - Compact Pills */}
        <motion.section
          data-testid="home-looking-for"
          initial={isMounted ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 pb-8"
        >
          <h2 className="text-lg font-medium mb-4 text-white/80 text-center">What I&apos;m Looking For</h2>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-colors">
              <FiBriefcase className="text-[#00BFFF]" aria-hidden="true" />
              Senior .NET / Full-Stack
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-colors">
              <FiGlobe className="text-emerald-400" aria-hidden="true" />
              Remote / Hybrid
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-colors">
              <TbPlane className="text-purple-400" aria-hidden="true" />
              Visa Sponsorship
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-colors">
              <HiOutlineBuildingOffice2 className="text-[#00BFFF]" aria-hidden="true" />
              Enterprise Scale
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-colors">
              <RiRobot3Fill className="text-emerald-400" aria-hidden="true" />
              AI/ML Integration
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-colors">
              <FiUsers className="text-purple-400" aria-hidden="true" />
              Growth-Oriented Teams
            </span>
          </div>
        </motion.section>
      </div>
    </section>
   </>
   );
 };

export default Home;
