"use client";
import CertificateCard from "@/components/CertificateCard";
import { motion } from "framer-motion";

export interface Certificate {
  title: string;
  author: string;
  publishDate: Date | null;
  provider: CertificateProvider;
  issueDate: Date;
  link: string | null;
  expiresOn: Date | null;
  description: string;
  isFeatured: boolean;
  skillsCovered: string[];
  image: string;
  providerImage: string;
  isPaid: boolean;
}

enum CertificateProvider {
  Microsoft = "Microsoft",
  Google = "Google",
  AWS = "AWS",
  Coursera = "Coursera",
  Udemy = "Udemy",
  LinkedIn = "LinkedIn",
  Pluralsight = "Pluralsight",
  Others = "Others",
}

const certificates: Certificate[] = [
  {
    title: "Microsoft Certified: Azure Fundamentals",
    author: "",
    publishDate: null,
    provider: CertificateProvider.Microsoft,
    issueDate: new Date("2024-12-24"),
    link: "https://learn.microsoft.com/en-us/users/biswajitpanday/credentials/733caa4f32a38510",
    expiresOn: null,
    description: "",
    isFeatured: true,
    skillsCovered: ["Azure", "Azure DevOps Services", "Cloud Computing"],
    image: "/assets/certificates/microsoft-certified-fundamentals-badge.svg",
    providerImage: "/assets/company-icon/microsoft.svg",
    isPaid: true,
  },
  {
    title: "C# & .NET: Programming",
    author: "Alexander Zanfir",
    publishDate: new Date("2016-06-01"),
    provider: CertificateProvider.LinkedIn,
    issueDate: new Date("2021-04-30"),
    link: "https://www.linkedin.com/learning/certificates/f06b7d25ae718aab106abe4a89e90a9642a401dd0180a30e34a0c4a9a6848692?trk=backfilled_certificate",
    expiresOn: null,
    description: "",
    isFeatured: false,
    skillsCovered: [".NET Framework", "C#"],
    image: "/assets/certificates/csharpdotnet.png",
    providerImage: "/assets/company-icon/linkedin.svg",
    isPaid: false,
  },
  {
    title: "C#: Design Patterns Part 1",
    author: "Richard Goforth",
    publishDate: new Date("2020-10-15"),
    provider: CertificateProvider.LinkedIn,
    issueDate: new Date("2022-06-21"),
    link: "https://www.linkedin.com/learning/certificates/e1725d9d8c545e555beba7a1a610682e21d8fddf119afe619a80acf8adbd79e7?trk=share_certificate",
    expiresOn: null,
    description: "",
    isFeatured: false,
    skillsCovered: ["Software Design Pattern", "C#"],
    image: "/assets/certificates/csharpdesignpattern.jpg",
    providerImage: "/assets/company-icon/linkedin.svg",
    isPaid: false,
  },

  {
    title: "Advanced Design Patterns: Design Principles",
    author: "Eric Freeman",
    publishDate: new Date("2020-03-23"),
    provider: CertificateProvider.LinkedIn,
    issueDate: new Date("2022-07-12"),
    link: "https://www.linkedin.com/learning/certificates/b8e80a85b07e115f46e3615ccd7cdb40f3b2eeaf37e9d07ac030ca2edf1b29f5?trk=share_certificate",
    expiresOn: null,
    description: "",
    isFeatured: false,
    skillsCovered: ["Software Design Pattern", "Java"],
    image: "/assets/certificates/advanced_design_pattern.jpg",
    providerImage: "/assets/company-icon/linkedin.svg",
    isPaid: false,
  },
  {
    title: "Software Architecture: Domain-Driven Design",
    author: "Allen Holub",
    publishDate: new Date("2019-09-18"),
    provider: CertificateProvider.LinkedIn,
    issueDate: new Date("2024-02-12"),
    link: "https://www.linkedin.com/learning/certificates/66602a246a32525b7d000e517701c43333db58dbf6f42ae7b9cf3da7b72b88f5?trk=share_certificate",
    expiresOn: null,
    description: "",
    isFeatured: false,
    skillsCovered: ["Domain-Driven Design (DDD)"],
    image: "/assets/certificates/software_architecture_ddd.jpg",
    providerImage: "/assets/company-icon/linkedin.svg",
    isPaid: false,
  },

  {
    title: "AI Automation with Anthropic Claude API's Agentic Computer Use",
    author: "Ray Villalobos",
    publishDate: new Date("2025-01-01"),
    provider: CertificateProvider.LinkedIn,
    issueDate: new Date("2024-11-30"),
    link: "https://www.linkedin.com/learning/certificates/3e42cd0c6527e43cd261f09aaa0df0e01bb0c6a2918920f58b8813cdec3285ba?trk=share_certificate",
    expiresOn: null,
    description: "",
    isFeatured: false,
    skillsCovered: [
      "AI Productivity",
      "Generative AI",
      "Automation",
      "Application Programming Interfaces (APIs)",
    ],
    image: "/assets/certificates/Anthropic.jpg",
    providerImage: "/assets/company-icon/linkedin.svg",
    isPaid: false,
  },
  {
    title: "Learning BigQuery",
    author: "Kishan Iyer",
    publishDate: new Date("2022-28-07"),
    provider: CertificateProvider.LinkedIn,
    issueDate: new Date("2025-01-03"),
    link: "https://www.linkedin.com/learning/certificates/24c4bbac905d8789d28f655fe8153c002ed5c33330898eb08b47b752e3f239e8?trk=share_certificate",
    expiresOn: null,
    description: "",
    isFeatured: false,
    skillsCovered: ["Google BigQuery"],
    image: "/assets/certificates/BigQuery.jpg",
    providerImage: "/assets/company-icon/linkedin.svg",
    isPaid: false,
  },
  {
    title: "Microsoft Azure Developer: Create Azure App Service Web Apps",
    author: "Mike Pfeiffer",
    publishDate: null,
    provider: CertificateProvider.Pluralsight,
    issueDate: new Date("2021-02-28"),
    link: null,
    expiresOn: null,
    description: "",
    isFeatured: false,
    skillsCovered: ["Azure", "Azure App Service", "Web Apps"],
    image: "/assets/certificates/ps_azure_app_service.png",
    providerImage: "/assets/company-icon/pluralsight.svg",
    isPaid: false,
  },
];

const Certifications = () => {
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={index}
              index={index}
              certificate={certificate}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Certifications;
