"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLink } from "react-icons/fa";

interface Project {
  inactivationReason: string | undefined;
  num: number;
  category: "full-stack" | "front-end" | "back-end" | "mobile";
  title: string;
  longDescription: string;
  shortDescription: string;
  stacks: string[];
  image: string;
  isActive: boolean;
  isOpenSource: boolean;
  url: string;
  github: string;
  associatedWithCompany:
    | "Brain Station-23"
    | "Chorki Limited"
    | "Kaz Software"
    | "Optimizely"
    | "Individual"
    | "";
  jobRole:
    | "Senior Developer"
    | "Senior Software Engineer"
    | "Software Engineer"
    | "Associate Software Engineer"
    | "Intern"
    | "Freelancer";
  startDate: Date;
  endDate: Date;
}

const projects: Project[] = [
  {
    num: 1,
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
    isActive: true,
    isOpenSource: false,
    url: "https://optimizely.com",
    github: "",
    associatedWithCompany: "Optimizely",
    jobRole: "Senior Developer",
    startDate: new Date(2023, 3, 1),
    endDate: new Date(),
    inactivationReason: undefined,
  },
  {
    num: 2,
    category: "full-stack",
    title: "BugBusters",
    longDescription:
      "A private developer panel for internal issue tracking and collaboration, offering a secure, company-specific alternative to public Q&A platforms.",
    shortDescription: "Internal issue tracking and collaboration tool.",
    stacks: [
      "C#",
      ".Net 7",
      "Entity Framework Core",
      "MSSQL",
      "JWT",
      "React v18",
      "TypeScript",
      "Clean Architecture",
    ],
    image: "/assets/portfolio/bugBusters.png",
    isActive: true,
    isOpenSource: true,
    url: "",
    github: "https://github.com/biswajitpanday/BugBusters",
    associatedWithCompany: "",
    jobRole: "Freelancer",
    startDate: new Date(2023, 4, 1),
    endDate: new Date(2023, 7, 31),
    inactivationReason: undefined,
  },
  {
    num: 3,
    category: "full-stack",
    title: "Devensoft",
    longDescription:
      "Upgraded technology stacks and implemented new features for a USA-based company's M&A process management and team collaboration solution.",
    shortDescription: "M&A process management platform upgrade.",
    stacks: [
      "C#",
      "ASP.NET",
      "ASP.NET MVC",
      "MSSQL",
      "LINQ",
      "TypeScript",
      "Angular",
      "Azure DevOps",
    ],
    image: "/assets/portfolio/devensoft.png",
    isActive: true,
    isOpenSource: false,
    url: "https://devensoft.com",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Senior Software Engineer",
    startDate: new Date(2022, 8, 1),
    endDate: new Date(2023, 2, 31),
    inactivationReason: undefined,
  },
  {
    num: 4,
    category: "full-stack",
    title: "Reganalytics",
    longDescription:
      "Led the upgrade of a legacy application to a Microservices architecture, deploying in Docker with multiple .NET 6, React, and Angular applications.",
    shortDescription: "Modernizing a regulatory analytics platform.",
    stacks: [
      "C#",
      ".NET 6",
      "Web API",
      "MSSQL",
      "Entity Framework Core",
      "Node.js",
      "TypeScript",
      "React",
      "Angular",
      "Docker",
      "AWS",
      "Microservices",
    ],
    image: "/assets/portfolio/reganalytics.png",
    isActive: true,
    isOpenSource: false,
    url: "http://www.reganalytics.com",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Senior Software Engineer",
    startDate: new Date(2022, 1, 1),
    endDate: new Date(2022, 8, 30),
    inactivationReason: undefined,
  },
  {
    num: 5,
    category: "back-end",
    title: "WebEvv (Electronic Visit Verification)",
    longDescription:
      "Led backend development, deployment, and managed the delivery of a scalable electronic visit verification platform for home care management.",
    shortDescription: "Home care visit verification system.",
    stacks: [
      "C#",
      "ASP.NET Core 3.1",
      "DynamoDB",
      "Customized ORM",
      "TypeScript",
      "React",
      "Flutter",
      "AWS",
      "Serverless",
      "Clean Architecture",
    ],
    image: "/assets/portfolio/webevv.png",
    isActive: true,
    isOpenSource: false,
    url: "https://www.webevv.com",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Software Engineer",
    startDate: new Date(2021, 8, 1),
    endDate: new Date(2022, 2, 31),
    inactivationReason: undefined,
  },
  {
    num: 6,
    category: "back-end",
    title: "Alarm App (Bangladesh Red Crescent Society)",
    longDescription:
      "Led the development of a Flutter-based mobile app for the Bangladesh Red Crescent Society (BDRCS), with a backend and an Angular admin dashboard. Designed and deployed the system on AWS, ensuring scalability and best software practices.",
    shortDescription: "Emergency alert and communication app.",
    stacks: [
      "C#",
      "NET 5",
      "Entity Framework Core",
      "MySQL",
      "Angular",
      "AWS S3",
      "AWS Lambda",
      "AWS RDS",
      "AWS CloudFormation",
      "Serverless",
    ],
    image: "/assets/portfolio/alarmApp.png",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Software Engineer",
    startDate: new Date(2021, 2, 1),
    endDate: new Date(2021, 7, 31),
    inactivationReason: "This Project is no longer operational.",
  },
  {
    num: 7,
    category: "back-end",
    title: "Subscriber Verification System (SVS)",
    longDescription:
      "Led the modernization of Robi's Subscriber Verification System (SVS), migrating a legacy .NET app to .NET Core for Linux deployment, improving performance, and ensuring scalability. Developed key features, automated deployments across 40+ servers, and optimized API performance for millions of users.",
    shortDescription:
      "A telecommunications platform optimized for API performance, serving millions of users with seamless and reliable services.",
    stacks: [
      "C#",
      "ASP.NET Core 2.2",
      "Entity Framework",
      "JavaScript",
      "JQuery",
      "Oracle Database",
      "REST APIs",
      "Linux",
      "Automation",
    ],
    image: "/assets/portfolio/robi.png",
    isActive: true,
    isOpenSource: false,
    url: "https://www.robi.com.bd/en",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Software Engineer",
    startDate: new Date(2020, 3, 1),
    endDate: new Date(2021, 0, 31),
    inactivationReason: undefined,
  },
  {
    num: 8,
    category: "full-stack",
    title: "JoyList",
    longDescription:
      "Led the development and deployment of JoyList, a scalable platform combining elements of Twitter, Yelp, and Facebook for users to share curated lists of favorite experiences.",
    shortDescription: "Social platform for experience sharing.",
    stacks: [
      "TypeScript",
      "Node.js",
      "hapi.js",
      "React",
      "MongoDB",
      "AWS EC2",
      "AWS S3",
      "AWS Cloud Formation",
    ],
    image: "/assets/portfolio/joylist.png",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Software Engineer",
    startDate: new Date(2020, 0, 1),
    endDate: new Date(2020, 11, 31),
    inactivationReason: "This Project is no longer operational.",
  },
  {
    num: 9,
    category: "full-stack",
    title: "Shopway",
    longDescription:
      "Contributed to the development of a location-based e-commerce platform, working on both frontend and backend as a full-stack developer.",
    shortDescription: "A location-based e-commerce platform.",
    stacks: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "Angular",
      "MongoDB",
      "Mongoose",
      "Flutter",
    ],
    image: "/assets/portfolio/shopway.png",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Individual",
    jobRole: "Freelancer",
    startDate: new Date(2018, 5, 1),
    endDate: new Date(2020, 4, 31),
    inactivationReason: "This Project is no longer operational.",
  },
  {
    num: 10,
    category: "full-stack",
    title: "EnCue",
    longDescription:
      "Contributed to the development of a live concert audience engagement application for a USA-based company, collaborating on both frontend and backend as a full-stack developer.",
    shortDescription: "",
    stacks: [
      "C#",
      "ASP.NET WebAPI 2",
      "Entity Framework",
      "LINQ",
      "MSSQL",
      "JavaScript",
      "Angular.Js",
      "AWS EC2",
      "AWS S3",
      "Xamarin",
    ],
    image: "/assets/portfolio/encue.png",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Associate Software Engineer",
    startDate: new Date(2017, 1, 1),
    endDate: new Date(2019, 9, 30),
    inactivationReason: "This Project is no longer operational.",
  },
  {
    num: 11,
    category: "full-stack",
    title: "OpiGateWay",
    longDescription:
      "Contributed to the development of an IVR system for VRI Gateway, collaborating on both frontend and backend as a full-stack developer.",
    shortDescription: "",
    stacks: [
      "C#",
      "ASP.NET Web API",
      "Entity Framework",
      "Angular.Js",
      "Electron",
      "MongoDb",
      "Twilio Voice",
    ],
    image: "/assets/portfolio/opiGateWay.png",
    isActive: true,
    isOpenSource: false,
    url: "https://opi.vrigateway.com",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Software Engineer",
    startDate: new Date(2018, 3, 1),
    endDate: new Date(2018, 7, 30),
    inactivationReason: undefined,
  },
  {
    num: 12,
    category: "full-stack",
    title: "here'n'now",
    longDescription:
      "Contributed to the development of a live engagement app, working on both frontend and backend as a full-stack developer.",
    shortDescription: "No Longer Operational",
    stacks: [
      "C#",
      "ASP.NET Web API",
      "LINQ",
      "Entity Framework",
      "Angular.Js",
      "MSSQL",
      "Xamarin",
      "Firebase",
    ],
    image: "/assets/portfolio/hnn.png",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Associate Software Engineer",
    startDate: new Date(2018, 2, 1),
    endDate: new Date(2018, 10, 30),
    inactivationReason: "This Project is no longer operational.",
  },
  {
    num: 13,
    category: "full-stack",
    title: "reezcom",
    longDescription:
      "ReezCom is a communication platform for apartments, offices, and towers, enabling fast and efficient interaction with management for emergencies and other needs.",
    shortDescription: "",
    stacks: ["C#", "ASP.NET Core", "Android", "Entity Framework Core", "MSSQL"],
    image: "/assets/portfolio/reezcom.png",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Individual",
    jobRole: "Freelancer",
    startDate: new Date(),
    endDate: new Date(),
    inactivationReason: "This Project is no longer operational.",
  },
  {
    num: 14,
    category: "full-stack",
    title: "dobi",
    longDescription:
      "Dobi is an online laundry service in Bangladesh, offering home pickup and delivery for wash, iron, or both, along with bulk laundry solutions for hotels, hospitals, and transport services.",
    shortDescription: "",
    stacks: ["C#", "ASP.NET Core", "Angular.Js", "Entity Framework", "MSSQL"],
    image: "/assets/portfolio/dobi.png",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Individual",
    jobRole: "Freelancer",
    startDate: new Date(),
    endDate: new Date(),
    inactivationReason: "This Project is no longer operational.",
  },
  {
    num: 15,
    category: "full-stack",
    title: "World Tax Analyzer (WTA)",
    longDescription:
      "Contributed to various parts of the World Tax Analyzer (WTA) application, a comprehensive platform offering tax rules, rates, treaty information, and more, as a full-stack developer.",
    shortDescription: "",
    stacks: ["C#", "ASP.NET MVC", "Knockout.Js", "MSSQL", "Link To SQL"],
    image: "/assets/portfolio/regfollower.png",
    isActive: true,
    isOpenSource: false,
    url: "https://www.reganalytics.com/world-tax-analyzer-wta",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Associate Software Engineer",
    startDate: new Date(2016, 9, 1),
    endDate: new Date(2019, 5, 30),
    inactivationReason: undefined,
  },
  {
    num: 16,
    category: "full-stack",
    title: "Transfer Pricing Analyzer (TPA)",
    longDescription:
      "Contributed to various parts of the Transfer Pricing Analyzer (TPA) application, providing an overview of transfer pricing regulations and tools for FAR analysis and BEPS, as a full-stack developer.",
    shortDescription: "",
    stacks: ["C#", "ASP.NET MVC", "Knockout.Js", "MSSQL", "Link To SQL"],
    image: "/assets/portfolio/regfollower.png",
    isActive: true,
    isOpenSource: false,
    url: "https://www.reganalytics.com/tpa",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Associate Software Engineer",
    startDate: new Date(2016, 9, 1),
    endDate: new Date(2019, 5, 30),
    inactivationReason: undefined,
  },
  {
    num: 17,
    category: "full-stack",
    title: "Reganalytics Auth",
    longDescription: "",
    shortDescription:
      "Developed a Centralized Token Based Authentication system for handling internal product's authentication.",
    stacks: [
      "C#",
      "ASP.NET MVC",
      "ASP.NET Web API",
      "Entity Framework",
      "MSSQL",
    ],
    image: "/assets/portfolio/reganalytics.png",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Kaz Software",
    jobRole: "Associate Software Engineer",
    startDate: new Date(2016, 11, 1),
    endDate: new Date(2017, 3, 30),
    inactivationReason: "This Project is running internally.",
  },
  {
    num: 18,
    category: "full-stack",
    title: "Notification Hub",
    longDescription: "",
    shortDescription:
      "Built a notification service that delivered targeted notifications based on device type (Android, iOS, Windows, Desktop).",
    stacks: [
      "JavaScript",
      "RabbitMQ",
      "Socket.io",
      "Node.js",
      "MongoDB",
      "GCM",
    ],
    image: "/assets/portfolio/chorki.png",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Chorki Limited",
    jobRole: "Software Engineer",
    startDate: new Date(2015, 6, 1),
    endDate: new Date(2015, 10, 31),
    inactivationReason: "This Project is no longer operational.",
  },
  {
    num: 19,
    category: "full-stack",
    title: "News Aggregator",
    longDescription: "",
    shortDescription:
      "Developed a system to scrape, aggregate, and store news from multiple sources for further processing.",
    stacks: ["JavaScript", "Node.js", "Express.js", "MySQL"],
    image: "/assets/portfolio/chorki.png",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Chorki Limited",
    jobRole: "Software Engineer",
    startDate: new Date(),
    endDate: new Date(),
    inactivationReason: "This Project is no longer operational.",
  },
  {
    num: 21,
    category: "full-stack",
    title: "Whooza",
    longDescription: "",
    shortDescription:
      "Contributed to the development of an MVP for a platform combining social and professional networking features, working on both frontend and backend as a full-stack developer.",
    stacks: [
      "JavaScript",
      "AngularJs",
      "Socket.io",
      "Node.js",
      "MongoDB",
      "HTML",
      "CSS",
    ],
    image: "/assets/portfolio/placeholderImage.jpg",
    isActive: false,
    isOpenSource: false,
    url: "",
    github: "",
    associatedWithCompany: "Brain Station-23",
    jobRole: "Intern",
    startDate: new Date(2014, 8, 1),
    endDate: new Date(2014, 10, 31),
    inactivationReason: "This Project is no longer operational.",
  },
  {
    num: 22,
    category: "full-stack",
    title: "BCPS Management Portal",
    longDescription: "",
    shortDescription:
      "Worked as a team player to implement new features and fixing bugs in new and existing features of the Management Portal of Bangladesh College of Physicians and Surgeons (BCPS)",
    stacks: ["C#", "ASP.NET MVC", "Entity Framework", "MSSQL", "HTML", "CSS"],
    image: "/assets/portfolio/bcps.png",
    isActive: true,
    isOpenSource: false,
    url: "https://brainstation-23.com/portfolio-bcps/",
    github: "",
    associatedWithCompany: "Brain Station-23",
    jobRole: "Intern",
    startDate: new Date(2014, 11, 1),
    endDate: new Date(2014, 11, 31),
    inactivationReason: undefined,
  },
];

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
