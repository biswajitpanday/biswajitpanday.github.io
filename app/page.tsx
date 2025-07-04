"use client";
import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { getMostRecentCertification } from "@/data/certificationsData";
import FeaturedCertificationCard from "@/components/FeaturedCertificationCard";
import BackgroundElements from "@/components/BackgroundElements";
import Badge from "@/components/Badge";
import Photo from "@/components/Photo";
import SocialPreviewGenerator from "@/components/SocialPreviewGenerator";

// Lazy load non-critical components
const Socials = lazy(() => import("@/components/Socials"));
const Stats = lazy(() => import("@/components/Stats"));

// Optimize icon imports - only import what we need
const FiDownload = lazy(() =>
  import("react-icons/fi").then((mod) => ({ default: mod.FiDownload }))
);
const FiCode = lazy(() =>
  import("react-icons/fi").then((mod) => ({ default: mod.FiCode }))
);
const FiCloud = lazy(() =>
  import("react-icons/fi").then((mod) => ({ default: mod.FiCloud }))
);
const FiZap = lazy(() =>
  import("react-icons/fi").then((mod) => ({ default: mod.FiZap }))
);

const SiReact = lazy(() =>
  import("react-icons/si").then((mod) => ({ default: mod.SiReact }))
);
const SiDotnet = lazy(() =>
  import("react-icons/si").then((mod) => ({ default: mod.SiDotnet }))
);
const AIIcon = lazy(() => import("@/components/icons/AIIcon"));

// Loading fallback components
const IconFallback = ({ className }: { className?: string }) => (
  <div
    className={`w-4 h-4 bg-secondary-default/30 rounded animate-pulse ${className}`}
  />
);

const ComponentFallback = ({ className }: { className?: string }) => (
  <div
    className={`bg-gradient-to-br from-[#27272c]/50 to-[#2a2a30]/50 rounded animate-pulse ${className}`}
  />
);

const Home = () => {
  const featuredCertification = getMostRecentCertification();

  return (
    <>
      <SocialPreviewGenerator 
        title="Biswajit Panday - Full-Stack .NET Developer & Cloud Solutions Expert"
        description="Expert Full-Stack .NET Developer with 10+ years experience. Specializing in scalable applications, cloud solutions with .NET, React, Azure & AWS. Microsoft Certified."
        image="https://biswajitpanday.github.io/assets/profile/profile-large.webp"
        url="https://biswajitpanday.github.io"
        type="website"
      />
      <section
        data-testid="home-page"
        className="min-h-[calc(100vh-136px)] flex flex-col justify-center relative overflow-hidden py-8 xl:py-0"
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
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center xl:text-left order-2 xl:order-none max-w-2xl"
          >
            {/* Role Badge */}
            <motion.div
              data-testid="home-role-badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.3 }}
              className="mb-6"
            >
              <Badge
                icon={
                  <Suspense fallback={<IconFallback />}>
                    <FiCode className="text-lg" />
                  </Suspense>
                }
                text={
                  <span className="flex items-center gap-2">
                    AI-Powered Full-Stack & .NET Developer
                    <Suspense fallback={<IconFallback />}>
                      <FiZap className="text-lg animate-pulse" />
                    </Suspense>
                  </span>
                }
                color="default"
              />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              data-testid="home-main-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-3xl xl:text-5xl font-bold mb-6 leading-tight"
            >
              Hi, I&apos;m <br className="hidden xl:block" />
              <span className="bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text text-transparent animate-gradient">
                Biswajit Panday
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              data-testid="home-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-lg xl:text-xl mb-8 text-white/80 leading-relaxed max-w-[600px] mx-auto xl:mx-0"
            >
              Crafting{" "}
              <span className="text-secondary-default font-semibold">
                high-performance
              </span>
              ,{" "}
              <span className="text-secondary-default font-semibold">
                scalable applications
              </span>{" "}
              with .NET, React & DevOps while integrating {" "}
              <span className="text-emerald-300 font-semibold">
                AI solutions
              </span>{" "}
              and optimizing cloud solutions on Azure & AWS.
            </motion.p>

            {/* Tech Stack Highlights */}
            <motion.div
              data-testid="home-tech-stack"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex flex-wrap justify-center xl:justify-start gap-3 mb-8"
            >
              <Badge
                icon={
                  <Suspense
                    fallback={
                      <IconFallback className="text-secondary-default" />
                    }
                  >
                    <SiDotnet className="text-secondary-default" />
                  </Suspense>
                }
                text=".NET"
                color="default"
              />
              <Badge
                icon={
                  <Suspense
                    fallback={<IconFallback className="text-blue-300" />}
                  >
                    <SiReact className="text-blue-300" />
                  </Suspense>
                }
                text="React"
                color="blue"
              />
              <Badge
                icon={
                  <Suspense
                    fallback={<IconFallback className="text-purple-300" />}
                  >
                    <FiCloud className="text-purple-300" />
                  </Suspense>
                }
                text="DevOps"
                color="purple"
              />
              <Badge
                icon={
                  <Suspense
                    fallback={<IconFallback className="text-emerald-300" />}
                  >
                    <AIIcon className="text-emerald-300" />
                  </Suspense>
                }
                text="AI Integration"
                color="emerald"
              />
            </motion.div>

            {/* Featured Certification Card */}
            {featuredCertification && (
              <motion.div
                data-testid="home-featured-certification"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="mb-6"
              >
                <FeaturedCertificationCard
                  certification={featuredCertification}
                  size="small"
                  simplified={true}
                />
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              data-testid="home-action-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-6 mb-8"
            >
              <a
                href="/assets/Biswajit_Panday_Resume.pdf"
                download="Biswajit_Panday_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="home-download-resume-link"
              >
                <Button
                  data-testid="home-download-resume-button"
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-secondary-default to-blue-500 hover:from-blue-500 hover:to-secondary-default text-primary font-semibold px-8 py-3 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Download Resume</span>
                    <Suspense fallback={<IconFallback />}>
                      <FiDownload className="text-lg group-hover:animate-bounce" />
                    </Suspense>
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
                    iconStyles="w-10 h-10 border border-secondary-default/50 rounded-full flex justify-center items-center text-secondary-default text-base hover:bg-secondary-default hover:text-primary hover:border-secondary-default hover:shadow-lg hover:shadow-secondary-default/25 transition-all duration-300 hover:scale-110"
                  />
                </Suspense>
              </div>
            </motion.div>
          </motion.div>

          {/* Photo Section */}
          <motion.div
            data-testid="home-photo-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
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

        {/* Stats Section */}
        <motion.div
          data-testid="home-stats-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-12 xl:mt-12"
        >
          <Suspense fallback={<ComponentFallback className="w-full h-32" />}>
            <Stats />
          </Suspense>
        </motion.div>
             </div>
     </section>
   </>
   );
 };

export default Home;

// I architect scalable cloud solutions and build high-performance applications using .NET, React, and cutting-edge DevOps practices.
// I tame cloud beasts, optimize code like a caffeine-fueled wizard, and craft high-performance apps with .NET, React & DevOps sorcery!
// I summon scalable clouds, bend code to my will, and forge high-performance apps with .NET, React & DevOps alchemy!
// I design scalable cloud solutions, write clean, efficient code, and build high-performance apps with .NET, React, and DevOps expertise.

// 1️⃣ Mr. Robot Style 🤖
// "I architect cloud fortresses, write code like a vigilante, and deploy high-performance apps faster than an fsociety hack. .NET, React, DevOps—no root required."

// 2️⃣ The Matrix Style 🟩
// "I see the code behind reality, crafting scalable cloud architectures and high-performance apps with .NET, React & DevOps. There is no spoon—only clean code."

// 3️⃣ Silicon Valley Style 🚀
// "I optimize cloud solutions, scale apps like Pied Piper, and write .NET & React code that actually works—no tabs vs. spaces debate needed."

// 4️⃣ Tron Style ⚡
// "I ride the grid, architecting cloud solutions and deploying high-performance .NET & React apps at light speed. DevOps is my identity disc!"

// 5️⃣ The Social Network Style 💻
// "I build scalable cloud platforms, write clean .NET & React code, and optimize performance—because a high-availability system is cooler than a billion dollars."

// 1️⃣ "Engineering Scalable Cloud Solutions & High-Performance Apps with .NET, React & DevOps." (Professional, recruiter-friendly)

// 2️⃣ "Code, Cloud & Creativity—Crafting Digital Solutions That Scale with .NET & React." (Balanced between technical and engaging)

// 3️⃣ "Turning Ideas into Scalable Software—.NET, React & DevOps Powering the Future." (Startup-friendly and innovation-driven)

// 4️⃣ "Architecting Digital Experiences—From Cloud to Code, One Scalable App at a Time." (Ideal for senior-level positioning)

// 5️⃣ "Cloud, Code & Cutting-Edge Tech—Solving Complex Problems with .NET & React." (Simple, yet powerful)
