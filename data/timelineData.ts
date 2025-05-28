export interface TimelineItem {
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

export const timeLineItems: TimelineItem[] = [
  {
    position: "Senior Developer",
    company: "Optimizely",
    url: "https://optimizely.com",
    startDate: new Date(2023, 3, 1),
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
    startDate: new Date(2016, 5, 1),
    endDate: new Date(2023, 2, 31),
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
    startDate: new Date(2015, 5, 1),
    endDate: new Date(2016, 4, 31),
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
    startDate: new Date(2014, 8, 1),
    endDate: new Date(2014, 11, 31),
    location: "Dhaka, Bangladesh",
    jobType: ["Full-Time", "On-Site"],
    responsibilities: [
      "Feature implementation and Bug fixing on a Social & Professional networking site named Whooza.",
      "Actively worked on a Management Portal of Bangladesh College of Physicians and Surgeons (BCPS).",
    ],
    icon: "/assets/company-icon/brain-station-23.png",
  },
]; 