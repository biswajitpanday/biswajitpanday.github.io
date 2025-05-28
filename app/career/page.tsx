"use client";
import {
  calculateFromToWithDuration,
  calculateTotalExperience,
  getDateRange,
  getDuration,
} from "@/helpers/utility";
import Link from "next/link";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/image";
import {
  FaMapMarkedAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

interface TimelineItem {
  position: string;
  startDate: Date;
  endDate: Date;
  company: string;
  location: string;
  responsibilities: string[];
  icon: string;
  url: string;
  jobType: string[];
}

const timeLineItems: TimelineItem[] = [
  {
    position: "Senior Developer",
    company: "Optimizely",
    url: "https://optimizely.com",
    startDate: new Date('2023, 3, 1'),
    endDate: new Date(),
    location: "Dhaka, Bangladesh",
    jobType: ["Full-Time", "Hybrid"],
    responsibilities: [
      "Customizing and maintaining the Optimizely Configured Commerce platform, enabling B2B clients to streamline catalog management, pricing, and ERP integrations at scale.",
      "Contributed to two successful system migrations, achieving an average cost reduction of 55% for major clients and improving deployment efficiency by reducing error rates.",
      "Mentoring developers and conducting rigorous code reviews, boosting productivity; reduced defects by 15% over the past two years.",
      "Designing and implementing scalable software architecture patterns, enhancing system reliability, and supporting seamless global deployments.",
    ],
    icon: "/assets/company-icon/opti.png",
  },
  {
    position: "Senior Software Engineer",
    company: "Kaz Software",
    url: "https://kaz.com.bd",
    startDate: new Date('2016, 5, 1'),
    endDate: new Date('2023, 2, 31'),
    location: "Dhaka, Bangladesh",
    jobType: ["Full-Time", "On-Site"],
    responsibilities: [
      "Led the modernization of legacy platforms across projects, transitioning to Microservices with ASP.NET Core and Docker, boosting performance by 10x.",
      "Designed and deployed scalable cloud solutions on AWS and Azure, cutting operational costs by 25% and improving system reliability.",
      "Optimized APIs for millions of users with load-balanced API Gateways, reducing downtime and automating deployments for 40+ services.",
      "Managed and mentored teams of 8–12, increase productivity by 20% through Agile practices and technical guidance.",
    ],
    icon: "/assets/company-icon/kaz.png",
  },
  {
    position: "Software Engineer",
    company: "Chorki Limited",
    url: "https://chorki.com",
    startDate: new Date('2015, 5, 1'),
    endDate: new Date('2016, 4, 31'),
    location: "Dhaka, Bangladesh",
    jobType: ["Full-Time", "On-Site"],
    responsibilities: [
      "Built and maintained features for web applications, focusing on front-end and API interactions.",
      "Collaborated with senior engineers to build scalable solutions for real-time notifications and data aggregation tool.",
    ],
    icon: "/assets/company-icon/chorki.png",
  },
  {
    position: "Intern",
    company: "Brain Station-23",
    url: "https://brainstation-23.com",
    startDate: new Date('2014, 8, 1'),
    endDate: new Date('2014, 11, 31'),
    location: "Dhaka, Bangladesh",
    jobType: ["Full-Time", "On-Site"],
    responsibilities: [
      "Feature implementation and Bug fixing on a Social & Professional networking site named Whooza.",
      "Actively worked on a Management Portal of Bangladesh College of Physicians and Surgeons (BCPS).",
    ],
    icon: "/assets/company-icon/brain-station-23.png",
  },
];

const Career = () => {
  const totalExperience = calculateTotalExperience(timeLineItems);
  const totalCompanies = timeLineItems.length;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.4, duration: 0.2, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col"
    >
      <div className="container mx-auto">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4">
            Professional <span className="text-secondary-default">Journey</span>
          </h1>
          <p className="text-xl text-white/80 mb-5 max-w-3xl mx-auto leading-relaxed">
            Transforming ideas into scalable solutions through innovative
            software engineering and leadership excellence
          </p>

          {/* Experience Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12">
            <div className="inline-flex items-center gap-3 bg-secondary-default/10 border border-secondary-default/80 text-primary py-0.5 px-5 rounded">
              <FaCalendarAlt className="text-secondary-default text-lg" />
              <span className="text-white font-semibold">
                <span className="text-secondary-default text-xl font-bold">
                  {totalExperience}
                </span>{" "}
                Experience
              </span>
            </div>
            <div className="inline-flex items-center gap-3 bg-secondary-default/10 border border-secondary-default/80 text-primary py-0.5 px-5 rounded">
              <FaBriefcase className="text-secondary-default text-lg" />
              <span className="text-white font-semibold">
                <span className="text-secondary-default text-xl font-bold">
                  {totalCompanies}
                </span>{" "}
                Companies
              </span>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <VerticalTimeline
          className="xl:custom-vt"
          animate={true}
          lineColor="var(--color-secondary-default)"
        >
          {timeLineItems.map((item, index) => {
            return (
              <VerticalTimelineElement
                position={"right"}
                className="vertical-timeline-element--work text-white/80 xl:custom-vt-element"
                contentStyle={{
                  background:
                    "linear-gradient(135deg, #27272c 0%, #2a2a30 100%)",
                  color: "#ffffff",
                  boxShadow: "0 8px 32px rgba(0, 191, 255, 0.1)",
                  border: "1px solid var(--color-secondary-default)",
                  borderRadius: "12px",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid var(--color-secondary-default)",
                }}
                date={calculateFromToWithDuration(item.startDate, item.endDate)}
                iconStyle={{
                  background:
                    "linear-gradient(135deg, var(--color-secondary-default), #0099cc)",
                  color: "#ffffff",
                  boxShadow: "0 4px 16px rgba(0, 191, 255, 0.3)",
                }}
                icon={
                  <div className="flex w-[100%] h-[100%] justify-center items-center">
                    <Image
                      src={item.icon}
                      alt={item.company}
                      width={90}
                      height={90}
                      style={{ borderRadius: "50%", padding: "5%" }}
                    />
                  </div>
                }
                key={index}
                visible={true}
              >
                <div className="flex flex-col">
                  {/* Custom Date Display for Mobile/Tablet */}
                  <div className="xl:hidden mb-4 flex flex-row justify-between items-center gap-2">
                    <span className="inline-flex items-center bg-secondary-default/10 border border-secondary-default/80 text-secondary-default px-3 py-1 rounded text-xs font-medium">
                      {getDateRange(item.startDate, item.endDate)}
                    </span>
                    <span 
                    className="inline-flex items-center bg-secondary-default/10 border border-secondary-default/80 text-secondary-default px-3 py-1 rounded text-xs font-medium"
                    >
                      {getDuration(item.startDate, item.endDate)}
                    </span>
                  </div>

                  {/* Header Section with Position and Job Type Tags */}
                  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 mb-2">
                    <div className="flex flex-col xl:flex-row xl:items-center gap-4">
                      <h3 className="vertical-timeline-element-title text-xl font-extrabold text-secondary-default text-center lg:text-left">
                        {item.position}
                      </h3>
                      <div className="flex flex-wrap gap-2 mx-auto lg:mx-0">
                        {item.jobType.map((type, index) => (
                          <span
                            key={index}
                            className="inline-flex text-xs font-bold items-center gap-3 bg-secondary-default/10 border text-secondary-default border-secondary-default/80 py-0.5 px-3 rounded"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="flex items-center gap-2 text-white/70 text-sm mx-auto lg:mx-0">
                      <FaMapMarkedAlt className="text-secondary-default" />
                      {item.location}
                    </span>
                  </div>

                  {/* Company Section */}
                  <div className="vertical-timeline-element-subtitle text-center lg:text-left">
                    <Link
                      href={item.url}
                      className="group text-xl font-bold text-white transition-all duration-300 relative inline-block"
                      target="_blank"
                    >
                      {item.company}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-default transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </div>

                  {/* Modern Responsibilities Section */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-secondary-default uppercase tracking-wider mt-6 text-center lg:text-left">
                      Key Achievements & Responsibilities
                    </h4>
                    <div className="space-y-1">
                      {item.responsibilities.map((responsibility, index) => (
                        <div
                          key={index}
                          className="flex items-baseline gap-3 group"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <FaCheckCircle className="text-secondary-default text-sm group-hover:scale-110 transition-transform duration-200" />
                          </div>
                          <p className="text-white/85 leading-relaxed text-sm group-hover:text-white transition-colors duration-200">
                            {responsibility}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </motion.section>
  );
};

export default Career;
