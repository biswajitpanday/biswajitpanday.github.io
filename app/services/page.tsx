"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";
import { PERFORMANCE_VARIANTS } from "@/constants";

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
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
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
