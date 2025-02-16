"use client";
import { calculateFromTo } from "@/helpers/utility";
import Link from "next/link";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/image";
import { FaMapMarkedAlt } from "react-icons/fa";

interface TimelineItem {
  position: string;
  startDate: Date;
  endDate: Date;
  company: string;
  location: string;
  responsibilites: string[];
  icon: string;
  url: string;
}

const timeLineItems: TimelineItem[] = [
  {
    position: "Senior Developer",
    company: "Optimizely",
    url: "https://optimizely.com",
    startDate: new Date(2023, 3, 1),
    endDate: new Date(),
    location: "Dhaka, Bangladesh",
    responsibilites: [
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
    startDate: new Date(2016, 5, 1),
    endDate: new Date(2023, 2, 31),
    location: "Dhaka, Bangladesh",
    responsibilites: [
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
    startDate: new Date(2015, 5, 1),
    endDate: new Date(2016, 4, 31),
    location: "Dhaka, Bangladesh",
    responsibilites: [
      "Built and maintained features for web applications, focusing on front-end and API interactions.",
      "Collaborated with senior engineers to build scalable solutions for real-time notifications and data aggregation tool.",
    ],
    icon: "/assets/company-icon/kaz.png",
  },
  {
    position: "Intern",
    company: "Brain Station-23",
    url: "https://brainstation-23.com",
    startDate: new Date(2014, 8, 1),
    endDate: new Date(2014, 11, 31),
    location: "Dhaka, Bangladesh",
    responsibilites: [
      "Feature implementation and Bug fixing on a Social & Professional networking site named Whooza.",
      "Actively worked on a Management Portal of Bangladesh College of Physicians and Surgeons (BCPS).",
    ],
    icon: "/assets/company-icon/brain-station-23.png",
  },
];

const Career = () => {
  return (
    <div>
      <VerticalTimeline className="xl:custom-vt">
        {timeLineItems.map((item, index) => {
          return (
            <VerticalTimelineElement
              position={"right"}
              className="vertical-timeline-element--work text-white/80 xl:custom-vt-element"
              contentStyle={{
                background: "#27272c",
                color: "text-white",
                boxShadow: "none",
                border: "1px solid var(--color-secondary-default)",
              }}
              contentArrowStyle={{
                borderRight: "7px solid  var(--color-secondary-default)",
              }}
              date={calculateFromTo(item.startDate, item.endDate)}
              iconStyle={{
                background: "#27272c",
                color: "var(--color-primary-default)",
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
            >
              <h3 className="vertical-timeline-element-title text-2xl font-extrabold text-secondary-default flex w-full justify-between">
                {item.position}
                <span className="flex items-center gap-2 text-end text-sm text-white/80">
                  <FaMapMarkedAlt />
                  {item.location}
                </span>
              </h3>
              <h4 className="vertical-timeline-element-subtitle flex w-full justify-between">
                <Link
                  href={item.url}
                  className="hover:text-secondary-default text-xl text-start"
                  target="_blank"
                >
                  {item.company}
                </Link>
              </h4>
              <ul className="list-disc ps-5 custom-list-disc">
                {item.responsibilites.map((responsibility, index) => {
                  return <li key={index}>{responsibility}</li>;
                })}
              </ul>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
};

export default Career;
