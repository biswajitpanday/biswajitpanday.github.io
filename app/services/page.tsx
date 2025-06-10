"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";
import { PERFORMANCE_VARIANTS } from "@/constants";
import { FaCode, FaMobile, FaRobot } from "react-icons/fa";
import BackgroundElements from "@/components/BackgroundElements";
import SectionHeader from "@/components/SectionHeader";

const services = [
  {
    num: "01",
    title: "Web Development",
    description:
      "Creating responsive and modern websites using the latest web technologies.",
    href: "",
  },
  {
    num: "02",
    title: "Mobile Development",
    description:
      "Developing user-friendly mobile applications for both Android and iOS platforms.",
    href: "",
  },
  {
    num: "03",
    title: "Desktop Application Development",
    description:
      "Building robust and efficient desktop applications for various operating systems.",
    href: "",
  },
  {
    num: "04",
    title: "AI",
    description:
      "Implementing artificial intelligence solutions to automate and enhance business processes.",
    href: "",
  },
];

const Services = () => {
  return (
    <section className="min-h-[calc(100vh-136px)] flex flex-col relative overflow-hidden py-8">
      {/* Background Elements */}
      <BackgroundElements />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Services Header */}
        <SectionHeader
          title="Professional"
          highlightText="Services"
          description={
            <>
              Expert solutions to address your{" "}
              <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                technical challenges
              </span>{" "}
              and drive{" "}
              <span className="text-secondary-default font-semibold px-2 py-1 rounded">
                business growth
              </span>
            </>
          }
        />

        {/* Service Highlight Badges */}
        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-12 -mt-2"
        >
          <motion.span
            variants={PERFORMANCE_VARIANTS.cardSync}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-default/10 to-transparent backdrop-blur-sm border border-secondary-default/30 text-secondary-default px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary-default/20 transition-all duration-300"
          >
            <FaCode className="text-xs" />
            Web Solutions
          </motion.span>
          <motion.span
            variants={PERFORMANCE_VARIANTS.cardSync}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-transparent backdrop-blur-sm border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500/20 transition-all duration-300"
          >
            <FaMobile className="text-xs" />
            Mobile Development
          </motion.span>
          <motion.span
            variants={PERFORMANCE_VARIANTS.cardSync}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-transparent backdrop-blur-sm border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-500/20 transition-all duration-300"
          >
            <FaRobot className="text-xs" />
            AI Integration
          </motion.span>
        </motion.div>

        <motion.div
          variants={PERFORMANCE_VARIANTS.containerSync}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return (
              <motion.div
                key={index}
                variants={PERFORMANCE_VARIANTS.cardSync}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover">
                    {service.num}
                  </div>
                  <Link
                    href={service.href}
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-secondary-default transition-all
                     duration-500 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-secondary-default transition-all duration-500">
                  {service.title}
                </h2>
                <p className="text-white/60">{service.description}</p>
                <div className="border-b border-white/20 w-full"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
