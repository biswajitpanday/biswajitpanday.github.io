"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import { FaGithub, FaLink } from "react-icons/fa";

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
      "LINQ",
      "Entity Framework Core",
      "TypeScript",
      "React",
      "Angular",
      "Node.Js",
      "Azure",
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
    github: "https://github.com/biswajitpanday/BugBusters",
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
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#27272c] p-6 rounded-xl flex flex-col justify-between"
            >
              <div>
                <Link href={project.url || project.github} target="_blank">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                </Link>
                <h3 className="text-xl font-bold mb-2 text-outline text-transparent group-hover:text-outline-hover flex justify-between">
                  {project.title}
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
                <p className="text-white/60 mb-4">
                  {project.longDescription || project.shortDescription}
                </p>
                <ul className="flex flex-wrap gap-2 mb-4">
                  {project.stacks.map((stack, index) => (
                    // <li
                    //   key={index}
                    //   className="text-xs font-bold bg-secondary-default text-primary py-1 px-2 rounded"
                    // >
                    //   {stack}
                    // </li>
                    <li
                      key={index}
                      className="inline-flex text-xs font-bold bg-secondary-default text-primary py-1 px-2 rounded"
                    >
                      {stack}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-4"></div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
