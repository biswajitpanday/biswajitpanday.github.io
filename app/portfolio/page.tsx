"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLink } from "react-icons/fa";
import { projects } from "@/data/portfolioData";

const Portfolio = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.2, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#27272c] p-6 rounded-xl flex flex-col justify-between"
            >
              <div className="relative">
                {project.isActive ? (
                  <Link href={project.url || project.github} target="_blank">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="rounded mb-4"
                    />
                  </Link>
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="rounded mb-4"
                  />
                )}
                {project.associatedWithCompany && (
                  <div
                    className="absolute top-4 -left-6 bg-primary/80 text-secondary-default px-3 py-1 rounded 
                      text-xs text-center font-bold border border-secondary-default -rotate-45"
                    title={`Associated with - ${project.associatedWithCompany}`}
                  >
                    {project.associatedWithCompany}
                  </div>
                )}

                {project.isOpenSource && (
                  <div
                    className="absolute top-4 -left-6 bg-primary/80 text-secondary-default px-3 py-1 rounded text-xs 
                      text-center font-bold border border-secondary-default -rotate-45 flex items-center gap-x-2"
                    title="Open Source"
                  >
                    <FaGithub /> Open Source
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2 flex justify-between items-center">
                  {project.title}
                  {!project.isActive && (
                    <span
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded ml-2"
                      title={project.inactivationReason}
                    >
                      Inactive
                    </span>
                  )}
                  {project.url && (
                    <Link
                      href={project.url}
                      target="_blank"
                      className="text-right w-[20px] h-[20px] rounded-full bg-white 
                      hover:bg-secondary-default transition-all duration-500 flex 
                        justify-center items-center hover:rotate-45 mt-1"
                    >
                      <FaLink className="text-primary text-3xl font-bold p-1" />
                    </Link>
                  )}
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      className="text-right w-[20px] h-[20px] rounded-full bg-white 
                      hover:bg-secondary-default transition-all duration-500 flex 
                        justify-center items-center hover:rotate-45 mt-1"
                    >
                      <FaGithub className="text-primary text-3xl font-bold p-1" />
                    </Link>
                  )}
                </h3>
                <p className="text-white/60 text-sm text-justify mb-4">
                  {project.longDescription || project.shortDescription}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {project.stacks.map((stack, index) => (
                    <li
                      key={index}
                      className="inline-flex text-xs font-bold bg-secondary-default text-primary py-0.5 px-2 rounded"
                    >
                      {stack}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
