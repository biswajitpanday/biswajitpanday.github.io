"use client";

import { Tooltip } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import WorkSliderBtns from "@/components/WorkSliderBtns";

interface Project {
  num: string;
  category: string;
  title: string;
  longDescription: string;
  shortDescription: string;
  stacks: string[];
  image: string;
  isOperational: boolean;
  isOpenSource: boolean;
  url: string;
  github: string;
  companyName: string;
  jobRole: string;
  startDate: Date;
  endDate: Date;
}

const projects: Project[] = [
  {
    num: "01",
    category: "full-stack",
    title: "Optimizely Configured Commerce",
    longDescription: "",
    shortDescription:
      "A B2B e-commerce platform providing personalized customer experience and AI-driven insights.",
    stacks: [
      "C#",
      "ASP.NET Core",
      "WCF",
      "MSSQL",
      //   "Entity Framework Core",
      //   "LINQ",
      //   "JavaScript(TypeScript)",
      //   "React",
      //   "Angular",
      //   "Node.Js",
      //   "Elastic Search",
      //   "Azure",
    ],
    image: "/assets/portfolio/optimizely.png",
    isOperational: true,
    isOpenSource: false,
    url: "https://optimizely.com",
    github: "",
    companyName: "Optimizely",
    jobRole: "Senior Developer",
    startDate: new Date(2023, 3, 1),
    endDate: new Date(),
  },
  {
    num: "01",
    category: "full-stack",
    title: "BugBusters",
    longDescription:
      "A private developer panel for internal issue tracking and collaboration, offering a secure, company-specific alternative to public Q&A platforms.",
    shortDescription: "Internal issue tracking and collaboration tool.",
    stacks: [
      "C#",
      "ASP.NET Core",
      "React",
      "Entity Framework Core",
      "TypeScript",
      "SQL Server",
    ],
    image: "/assets/portfolio/bugBusters.png",
    isOperational: true,
    isOpenSource: true,
    url: "",
    github: "https://github.com/your-repo",
    companyName: "",
    jobRole: "Lead Developer",
    startDate: new Date(2023, 4, 1),
    endDate: new Date(2023, 7, 31),
  },
  {
    num: "02",
    category: "full-stack",
    title: "Devensoft",
    longDescription:
      "Upgraded technology stacks and implemented new features for a USA-based company's M&A process management and team collaboration solution.",
    shortDescription: "M&A process management platform upgrade.",
    stacks: [
      "Angular",
      "ASP.NET Core",
      "C#",
      "JavaScript",
      "Azure DevOps",
      "SQL Server",
    ],
    image: "/assets/portfolio/devensoft.png",
    isOperational: true,
    isOpenSource: false,
    url: "https://devensoft.com",
    github: "",
    companyName: "Kaz Software",
    jobRole: "Full-Stack Developer",
    startDate: new Date(2022, 8, 1),
    endDate: new Date(2023, 2, 31),
  },
  {
    num: "03",
    category: "architecture",
    title: "Reganalytics",
    longDescription:
      "Led the upgrade of a legacy application to a Microservices architecture, deploying in Docker with multiple .NET 6, React, and Angular applications.",
    shortDescription: "Modernizing a regulatory analytics platform.",
    stacks: [
      "Node.js",
      "Angular",
      "React",
      "ASP.NET Core",
      "Microservices",
      "AWS",
      "SQL Server",
    ],
    image: "/assets/portfolio/reganalytics.png",
    isOperational: true,
    isOpenSource: false,
    url: "",
    github: "",
    companyName: "Kaz Software",
    jobRole: "Software Architect",
    startDate: new Date(2022, 1, 1),
    endDate: new Date(2022, 8, 30),
  },
  {
    num: "04",
    category: "backend",
    title: "WebEvv (Electronic Visit Verification)",
    longDescription:
      "Led backend development, deployment, and managed the delivery of a scalable electronic visit verification platform for home care management.",
    shortDescription: "Home care visit verification system.",
    stacks: [
      "AWS Lambda",
      "React",
      "ASP.NET Core",
      "DynamoDB",
      "Serverless",
      "C#",
    ],
    image: "/assets/portfolio/webevv.png",
    isOperational: true,
    isOpenSource: false,
    url: "",
    github: "",
    companyName: "Kaz Software",
    jobRole: "Backend Lead",
    startDate: new Date(2021, 8, 1),
    endDate: new Date(2022, 2, 31),
  },
  {
    num: "05",
    category: "mobile",
    title: "Alarm App (Bangladesh Red Crescent Society)",
    longDescription:
      "Developed a Flutter-based mobile app with a .NET Core backend, MySQL database, and Angular admin dashboard.",
    shortDescription: "Emergency alert and communication app.",
    stacks: ["Flutter", "Angular", "ASP.NET Core", "MySQL", "AWS Lambda", "C#"],
    image: "/assets/portfolio/alarmApp.png",
    isOperational: true,
    isOpenSource: false,
    url: "",
    github: "",
    companyName: "Kaz Software",
    jobRole: "Full-Stack Developer",
    startDate: new Date(2021, 2, 1),
    endDate: new Date(2021, 7, 31),
  },
  {
    num: "06",
    category: "backend",
    title: "Subscriber Verification System (SVS)",
    longDescription:
      "Migrated Robi's SVS from legacy .NET to .NET Core for Linux, automating deployments and optimizing API performance.",
    shortDescription: "Automated telecom subscriber verification.",
    stacks: [
      "ASP.NET Core",
      "C#",
      "Oracle Database",
      "REST APIs",
      "Linux",
      "Automation",
    ],
    image: "/assets/portfolio/robi.png",
    isOperational: true,
    isOpenSource: false,
    url: "",
    github: "",
    companyName: "Kaz Software",
    jobRole: "Senior Developer",
    startDate: new Date(2020, 3, 1),
    endDate: new Date(2021, 0, 31),
  },
  {
    num: "07",
    category: "full-stack",
    title: "JoyList",
    longDescription:
      "A social platform combining elements of Twitter, Yelp, and Facebook for users to share curated lists of experiences.",
    shortDescription: "Social platform for experience sharing.",
    stacks: ["Node.js", "hapi.js", "React", "MongoDB", "AWS", "JavaScript"],
    image: "/assets/portfolio/joylist.png",
    isOperational: true,
    isOpenSource: false,
    url: "",
    github: "",
    companyName: "Kaz Software",
    jobRole: "Full-Stack Developer",
    startDate: new Date(2020, 0, 1),
    endDate: new Date(2020, 11, 31),
  },
  {
    num: "08",
    category: "full-stack",
    title: "Shopway",
    longDescription: "A location-based e-commerce platform.",
    shortDescription: "E-commerce with location-based recommendations.",
    stacks: ["Node.js", "Angular", "MongoDB", "Flutter", "JavaScript"],
    image: "/assets/portfolio/shopway.png",
    isOperational: true,
    isOpenSource: false,
    url: "",
    github: "",
    companyName: "",
    jobRole: "Full-Stack Developer",
    startDate: new Date(2018, 5, 1),
    endDate: new Date(2020, 4, 31),
  },
];

const Portfolio = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper: { activeIndex: number }) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-secondary-default transition-all duration-500 capitalize">
                {project.category}
              </h2>
              <p className="text-white/60">
                {project.longDescription || project.shortDescription}
              </p>
              <ul className="flex gap-4">
                {project.stacks.map((item, index) => {
                  return (
                    <li key={index} className="text-secondary-default">
                      {item}
                      {index !== project.stacks.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              <div className="border border-white/20"></div>
              <div className="flex items-center gap-4">
                <Link href={project.url || project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-secondary-default" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <Link href={project.url || project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-secondary-default" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>GitHub Repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          layout="fill"
                          className="object-fill"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-secondary-default hover:bg-secondary-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
                iconsStyles=""
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
