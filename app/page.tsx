"use client";
import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiDownload, FiCode, FiCloud, FiZap } from "react-icons/fi";
import { SiReact, SiDotnet } from "react-icons/si";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col justify-center relative overflow-hidden py-8 xl:py-0">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary-default/5 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-center xl:justify-between gap-8 xl:gap-16 xl:pt-8 xl:pb-16">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center xl:text-left order-2 xl:order-none max-w-2xl"
          >
            {/* Role Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-secondary-default/10 backdrop-blur-sm border border-secondary-default/30 text-secondary-default px-4 py-2 rounded text-sm font-medium mb-6 hover:bg-secondary-default/20 transition-all duration-300"
            >
              <FiCode className="text-lg" />
              <span>Full-Stack .NET Developer</span>
              <FiZap className="text-lg animate-pulse" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl xl:text-6xl font-bold mb-6 leading-tight"
            >
              Hi, I&apos;m <br className="hidden xl:block" />
              <span className="bg-gradient-to-r from-secondary-default via-blue-400 to-secondary-default bg-clip-text text-transparent animate-gradient">
                Biswajit Panday
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
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
              with .NET, React & DevOps while optimizing cloud solutions on
              Azure & AWS.
            </motion.p>

            {/* Tech Stack Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap justify-center xl:justify-start gap-3 mb-8"
            >
              {[
                { icon: SiDotnet, text: ".NET Core" },
                { icon: SiReact, text: "React" },
                { icon: FiCloud, text: "DevOps" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white/70 px-3 py-1.5 rounded text-sm hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <tech.icon className="text-secondary-default" />
                  <span>{tech.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-6 mb-8"
            >
              <Link
                href="/assets/Biswajit_Panday_Resume.Net.pdf"
                download="Biswajit_Panday_Resume.Net.pdf"
                passHref
                target="_blank"
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-secondary-default to-blue-500 hover:from-blue-500 hover:to-secondary-default text-primary font-semibold px-8 py-3 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-secondary-default/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Download Resume</span>
                    <FiDownload className="text-lg group-hover:animate-bounce" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-secondary-default opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>

              <div className="flex items-center gap-4">
                <Socials
                  containerStyles="flex gap-4"
                  iconStyles="w-10 h-10 border border-secondary-default/50 rounded-full flex justify-center items-center text-secondary-default text-base hover:bg-secondary-default hover:text-primary hover:border-secondary-default hover:shadow-lg hover:shadow-secondary-default/25 transition-all duration-300 hover:scale-110"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="order-1 xl:order-none relative"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-default/20 to-blue-500/20 rounded-full blur-3xl scale-110 animate-pulse" />
              <div className="relative z-10">
                <Photo />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 xl:mt-24"
        >
          <Stats />
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-secondary-default rounded-full animate-ping opacity-60" />
      <div className="absolute bottom-32 right-16 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40" />
      <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-secondary-default rounded-full animate-bounce opacity-50" />
    </section>
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
