"use client";
import { lazy, Suspense, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import type { Certification, TestimonialData, Project, TimelineEntry } from "@/types/api";
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
import { FiDownload, FiCode, FiCloud, FiZap, FiBriefcase, FiGlobe, FiUsers, FiEye, FiMail, FiAward, FiArrowRight } from "react-icons/fi";
import { SiReact, SiDotnet, SiPython, SiOpenai } from "react-icons/si";
import { RiRobot3Fill } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbPlane } from "react-icons/tb";
import Link from "next/link";

interface SkillNode {
  name: string;
  metadata?: {
    icon: string;
    level?: "Expert" | "Advanced" | "Intermediate" | "Familiar";
    yearsOfExperience?: number;
    lastUsed?: string;
  };
  children?: SkillNode[];
}

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
const GitHubActivityGraph = lazy(() => import("@/components/GitHubActivityGraph"));
const MediumBlogPreview = lazy(() => import("@/components/MediumBlogPreview"));

// Loading fallback components
const ComponentFallback = ({ className }: { className?: string }) => (
  <div
    className={`bg-gray-800/50 rounded animate-pulse ${className}`}
  />
);

interface HomeClientProps {
  testimonials: TestimonialData[];
  featuredCertification: Certification | null;
  projects: Project[];
  certifications: Certification[];
  timeline: TimelineEntry[];
  skills1: SkillNode;
  skills2: SkillNode;
  portfolioMetadata?: {
    displaySettings?: {
      showLookingForSection?: boolean;
    };
  };
}

const HomeClient = ({
  testimonials,
  featuredCertification,
  projects,
  certifications,
  timeline,
  skills1,
  skills2,
  portfolioMetadata,
}: HomeClientProps) => {
  const [pageLoadTime, setPageLoadTime] = useState(0);

  useEffect(() => {
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
        description="Senior .NET Architect with 10+ years delivering mid to enterprise grade platforms. Currently at Optimizely, delivering solutions for global enterprise clients. Built SpireWiz, an AI tool achieving 80% time reduction and $180K annual business value. Microsoft Certified."
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
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center xl:text-left order-2 xl:order-none max-w-2xl"
            >
              {/* Role Badge - Purple/Pink accent with readable white text */}
              <div
                data-testid="home-role-badge"
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 via-pink-500/15 to-purple-500/10 backdrop-blur-sm border border-purple-500/40 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-500/25 transition-all duration-300">
                  <FiCode className="text-lg text-purple-400" />
                  <span className="text-white">Senior .NET Architect & AI Solutions Engineer</span>
                  <FiZap className="text-lg text-pink-400 animate-pulse" />
                </span>
              </div>

              {/* Main Heading */}
              <h1
                data-testid="home-main-heading"
                className="text-3xl xl:text-4xl font-bold mb-4 leading-tight"
              >
                Hi, I&apos;m <br className="hidden xl:block" />
                <span className="bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
                  Biswajit Panday
                </span>
              </h1>

              {/* Typing Animation Tagline */}
              <div
                data-testid="home-typing-tagline"
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
              </div>

              {/* About Me Summary - Recruiter-focused with key highlights */}
              <p
                data-testid="home-description"
                className="text-white/70 text-base leading-relaxed max-w-2xl mb-6 mx-auto xl:mx-0"
              >
                Senior .NET Architect with{" "}
                <span className="text-[#00BFFF] font-medium">10+ years</span> delivering mid
                to enterprise grade applications. Currently at{" "}
                <span className="text-[#00BFFF] font-medium">Optimizely</span> serving
                global enterprise clients. Passionate about AI integration—built{" "}
                <span className="text-[#00BFFF] font-medium">SpireWiz</span> achieving{" "}
                <span className="text-emerald-400 font-medium">80% </span>{" "} efficiency gains. {" "} 
                <span className="text-purple-400 font-medium">~$180K </span> annual value, and {" "}
                <span className="text-purple-400 font-medium">600+</span> {" "}
                developer hours saved annually. {" "}
                <span className="text-[#00BFFF] font-medium">Microsoft Certified</span>.
              </p>

              {/* Tech Stack Highlights - Compact badges with gradient icons */}
              <div
                data-testid="home-tech-stack"
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
              </div>

              {/* Featured Certification Card */}
              {featuredCertification && (
                <div
                  data-testid="home-featured-certification"
                  className="mb-6"
                >
                  <FeaturedCertificationCard
                    certification={featuredCertification}
                    size="small"
                    simplified={true}
                    headingLevel={2}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div
                data-testid="home-action-buttons"
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
              </div>
            </motion.div>

            {/* Photo Section */}
            <div
              data-testid="home-photo-section"
              className="order-1 xl:order-none relative flex items-center justify-center"
            >
              <div className="relative w-[300px] h-[300px] xl:w-[506px] xl:h-[506px]">
                {/* Subtle Glow Effect - now has proper parent size */}
                <div className="absolute inset-0 bg-secondary-default/10 rounded-full blur-3xl scale-110 animate-pulse" />
                <div data-testid="home-photo-container" className="relative z-10 w-full h-full">
                  <Photo />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="hidden xl:flex justify-center mt-8">
            <ScrollIndicator targetId="spirewiz-featured" />
          </div>

          {/* SpireWiz Featured Achievement Section */}
          <motion.section
            id="spirewiz-featured"
            data-testid="home-spirewiz-featured"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="py-12"
          >
            {/* Section Badge */}
            <div className="flex items-center gap-2 mb-6">
              <FiAward className="text-yellow-500 text-xl" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-yellow-500">Featured Achievement</h2>
            </div>

            {/* Card Container */}
            <div className="bg-gray-900/50 backdrop-blur-sm border-2 border-purple-500/30 rounded-xl p-5 sm:p-6 relative overflow-hidden">
              {/* Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent pointer-events-none" aria-hidden="true" />

              <div className="relative z-10">
                {/* Title */}
                <h3 className="text-2xl xl:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  SpireWiz: AI-Powered Blueprint Upgrade Automation
                </h3>

                {/* Description */}
                <p className="text-white/80 text-base leading-relaxed mb-6">
                  AI-powered automation tool that eliminates manual Git merge conflicts during Optimizely
                  platform upgrades. Uses GPT-4o with custom merge rules and professional terminal UI.
                </p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {/* Metric 1 - Time Saved */}
                  <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 rounded-lg p-4 text-center hover:border-emerald-500/50 transition-all">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">80%</div>
                    <div className="text-sm text-white/60">Time Reduction</div>
                    <div className="text-xs text-white/40 mt-1">(40h → 8h per cycle)</div>
                  </div>

                  {/* Metric 2 - Enterprise Clients */}
                  <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-lg p-4 text-center hover:border-purple-500/50 transition-all">
                    <div className="text-3xl font-bold text-purple-400 mb-1">25+</div>
                    <div className="text-sm text-white/60">Enterprise Clients</div>
                    <div className="text-xs text-white/40 mt-1">Served annually</div>
                  </div>

                  {/* Metric 3 - Business Value */}
                  <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-lg p-4 text-center hover:border-cyan-500/50 transition-all">
                    <div className="text-3xl font-bold text-cyan-400 mb-1">$180K</div>
                    <div className="text-sm text-white/60">Annual Business Value</div>
                    <div className="text-xs text-white/40 mt-1">(800+ hours saved)</div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-sm text-white/50">Tech Stack:</span>
                  <Badge icon={<SiPython className="text-[#3776AB]" />} text="Python 3.10+" color="default" size="compact" />
                  <Badge icon={<SiOpenai className="text-emerald-400" />} text="GPT-4o" color="emerald" size="compact" />
                  <Badge icon={<RiRobot3Fill className="text-purple-400" />} text="AI Merge" color="purple" size="compact" />
                  <Badge text="Textual TUI" color="default" size="compact" />
                  <Badge text="PyInstaller" color="neutral" size="compact" />
                </div>

                {/* CTA */}
                <div className="text-center sm:text-left">
                  <Link href="/projects#spirewiz">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/40 hover:border-purple-500/60 rounded-lg transition-all duration-300 text-sm text-purple-400 font-medium group">
                      <span>View Case Study</span>
                      <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* What I'm Looking For - Enhanced Card (Controlled by Admin Portal) */}
          {portfolioMetadata?.displaySettings?.showLookingForSection && (
            <motion.section
              id="what-looking-for"
              data-testid="home-looking-for"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="py-12"
            >
              {/* Section Header - Outside Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl xl:text-3xl font-bold mb-2 bg-gradient-to-r from-[#00BFFF] to-[#0080FF] bg-clip-text text-transparent">
                    What I&apos;m Looking For
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3" aria-hidden="true">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <span className="text-sm text-emerald-400 font-medium">Currently Open to Opportunities</span>
                  </div>
                </div>
                <a href="/contact">
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-default/10 to-purple-500/10 hover:from-secondary-default/20 hover:to-purple-500/20 border border-secondary-default/30 hover:border-secondary-default/50 rounded-lg transition-all duration-300 text-sm text-secondary-default font-medium group">
                    <FiMail className="text-base group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <span>Get in Touch</span>
                  </button>
                </a>
              </div>

              {/* Card Container */}
              <div className="bg-gray-900/50 border border-secondary-default/20 rounded-xl p-6 relative overflow-hidden">
                {/* Subtle Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5 pointer-events-none" aria-hidden="true" />

                <div className="relative z-10">
                  {/* Compact Pills - Grid Layout with Icon Left, Text Right */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* Senior .NET / Full-Stack */}
                    <div className="flex items-center gap-3 bg-white/10 border border-[#00BFFF]/30 rounded-lg p-3 hover:bg-white/15 hover:border-[#00BFFF]/50 transition-all group">
                      <FiBriefcase className="text-[#00BFFF] text-xl flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <p className="text-white font-medium text-sm">Senior .NET / Full-Stack</p>
                    </div>

                    {/* Remote / Hybrid */}
                    <div className="flex items-center gap-3 bg-white/10 border border-emerald-400/30 rounded-lg p-3 hover:bg-white/15 hover:border-emerald-400/50 transition-all group">
                      <FiGlobe className="text-emerald-400 text-xl flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <p className="text-white font-medium text-sm">Remote / Hybrid</p>
                    </div>

                    {/* Visa Sponsorship */}
                    <div className="flex items-center gap-3 bg-white/10 border border-purple-400/30 rounded-lg p-3 hover:bg-white/15 hover:border-purple-400/50 transition-all group">
                      <TbPlane className="text-purple-400 text-xl flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <p className="text-white font-medium text-sm">Visa Sponsorship</p>
                    </div>

                    {/* Enterprise Scale */}
                    <div className="flex items-center gap-3 bg-white/10 border border-[#00BFFF]/30 rounded-lg p-3 hover:bg-white/15 hover:border-[#00BFFF]/50 transition-all group">
                      <HiOutlineBuildingOffice2 className="text-[#00BFFF] text-xl flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <p className="text-white font-medium text-sm">Enterprise Scale</p>
                    </div>

                    {/* AI/ML Integration */}
                    <div className="flex items-center gap-3 bg-white/10 border border-emerald-400/30 rounded-lg p-3 hover:bg-white/15 hover:border-emerald-400/50 transition-all group">
                      <RiRobot3Fill className="text-emerald-400 text-xl flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <p className="text-white font-medium text-sm">AI/ML Integration</p>
                    </div>

                    {/* Growth-Oriented Teams */}
                    <div className="flex items-center gap-3 bg-white/10 border border-purple-400/30 rounded-lg p-3 hover:bg-white/15 hover:border-purple-400/50 transition-all group">
                      <FiUsers className="text-purple-400 text-xl flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <p className="text-white font-medium text-sm">Growth-Oriented Teams</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* By The Numbers Dashboard - Primary Stats Display */}
          <Suspense fallback={<ComponentFallback className="w-full h-24" />}>
            <ByTheNumbersDashboard
              projects={projects}
              certifications={certifications}
              timeline={timeline}
              skills1={skills1}
              skills2={skills2}
            />
          </Suspense>

          {/* GitHub Activity - Shows Active Development (MOVED UP for visibility) */}
          <Suspense fallback={<ComponentFallback className="w-full h-64" />}>
            <GitHubActivityGraph />
          </Suspense>

          {/* Testimonials Carousel - Real LinkedIn Recommendations */}
          <Suspense fallback={<ComponentFallback className="w-full h-64" />}>
            <TestimonialsCarousel testimonials={testimonials} />
          </Suspense>

          {/* Medium Blog Preview - Latest Articles */}
          <Suspense fallback={<ComponentFallback className="w-full h-64" />}>
            <MediumBlogPreview maxPosts={3} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default HomeClient;
