export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
  description?: string;
  skills?: string[];
  featured: boolean;
  image?: string;
  category: "Professional" | "Course" | "Training";
  isUpcoming?: boolean;
  issuerLogo?: string;
  status?: "Active" | "Expired" | "Upcoming";
  onlineVerifiable?: boolean;
  certificationNumber?: string;
}


export const certifications: Certification[] = [
  // Professional Certifications (Featured)
  {
    id: 1,
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    date: "2024-12",
    credentialId: "733CAA4F32A38510",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/biswajitpanday/733CAA4F32A38510",
    description: "Validated fundamental knowledge of cloud concepts, Azure services, Azure workloads, security and privacy in Azure, as well as Azure pricing and support.",
    skills: ["Cloud Computing", "Microsoft Azure", "Azure DevOps Services"],
    featured: true,
    image: "/assets/certificates/microsoft-certified-fundamentals-badge.svg",
    category: "Professional",
    issuerLogo: "/assets/logos/microsoft.png",
    status: "Active",
    onlineVerifiable: true,
    certificationNumber: "EDV661-807157"
  },
  {
    id: 2,
    name: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    date: "2025-06",
    description: "Planning to achieve this certification, demonstrating ability to design, build, test, and maintain cloud applications and services on Microsoft Azure.",
    skills: ["Azure App Service", "Azure Functions", "Azure Storage", "Azure Cosmos DB", "Azure Security"],
    featured: false,
    image: "/assets/certificates/microsoft-certified-associate-badge.svg",
    category: "Professional",
    isUpcoming: true,
    issuerLogo: "/assets/logos/microsoft.png",
    status: "Upcoming"
  },
  
  // LinkedIn Learning Certifications (Cloud & Azure)
  {
    id: 3,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 1 Cloud Concepts",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/b38946730810fd16bf9393b882fd6ba6405eafb0ab278f8a554b8e6d105e4c01?trk=share_certificate",
    description: "Preparation for AZ-900 certification covering cloud computing concepts, models, and services.",
    skills: ["Cloud Computing", "Microsoft Azure", "IaaS", "PaaS", "SaaS"],
    featured: false,
    image: "/assets/certificates/AZ-900_Cert_Prep-1.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 4,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 2 Azure Architecture and Security",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/29630430a80d2cc7fa742381da7a93f542fe0b6d6eb72f53350044f8bc511311?trk=share_certificate",
    description: "Preparation for AZ-900 certification covering Azure architecture components and security features.",
    skills: ["Azure Architecture", "Azure Security", "Cloud Security"],
    featured: false,
    image: "/assets/certificates/AZ-900_Cert_Prep-2.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 5,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 3 Azure Services",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/c02c3d84b3ce5f3e8d4d5ca40d8fa3ae853ed5ad90b8573ec5d6d3e19a8f1e1a?trk=share_certificate",
    description: "Preparation for AZ-900 certification covering the core Azure services and products.",
    skills: ["Azure Services", "Cloud Computing", "Azure Solutions"],
    featured: false,
    image: "/assets/certificates/AZ-900_Cert_Prep-3.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 6,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 4 Azure Management and Governance",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/1a2687046392f7ca9ef323dd6958ed6507dd5e950c6c9d41dd389761fdc1ccec?trk=share_certificate",
    description: "Preparation for AZ-900 certification covering Azure management and governance capabilities.",
    skills: ["Azure Management", "Azure Governance", "Cost Management"],
    featured: false,
    image: "/assets/certificates/AZ-900_Cert_Prep-4.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png",
    status: "Active",
    onlineVerifiable: true
  },
  
  // LinkedIn Learning Certifications (AI & Development)
  {
    id: 7,
    name: "AI Automation with Anthropic Claude API's Agentic Computer Use",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/3e42cd0c6527e43cd261f09aaa0df0e01bb0c6a2918920f58b8813cdec3285ba?trk=share_certificate",
    description: "Learned how to use Anthropic's Claude AI assistant APIs to build agentic applications that can perform computer tasks.",
    skills: ["AI Productivity", "Automation", "Application Programming Interfaces (API)", "Generative AI"],
    featured: true,
    image: "/assets/certificates/ai-automation-with-antropic-claude-api.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 8,
    name: "C# & .NET: Programming",
    issuer: "LinkedIn Learning",
    date: "2021-04",
    link: "https://www.linkedin.com/learning/certificates/f06b7d25ae718aab106abe4a89e90a9642a401dd0180a30e34a0c4a9a6848692?trk=share_certificate",
    description: "Comprehensive course covering C# programming fundamentals within the .NET ecosystem.",
    skills: ["ASP.NET MVC", "ASP.NET Web API", ".NET", ".NET Core", "Programming", ".NET Framework", "REST APIs", "Object-Oriented Programming (OOP)", "C#", "Clean code", "Visual Studio"],
    featured: false,
    image: "/assets/certificates/c-sharp-and-dot-net.png",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 9,
    name: "Advanced Design Patterns: Design Principles",
    issuer: "LinkedIn Learning",
    date: "2024-03",
    link: "https://www.linkedin.com/learning/certificates/b8e80a85b07e115f46e3615ccd7cdb40f3b2eeaf37e9d07ac030ca2edf1b29f5?trk=share_certificate",
    description: "Explored fundamental object-oriented design principles like encapsulation, inheritance, polymorphism, and SOLID principles.",
    skills: ["Software Design Patterns", "Java", "Object-Oriented Programming"],
    featured: false,
    image: "/assets/certificates/advanced-design-patterns.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 10,
    name: "Software Architecture: Domain-Driven Design",
    issuer: "LinkedIn Learning",
    date: "2024-02",
    link: "https://www.linkedin.com/learning/certificates/66602a246a32525b7d000e517701c43333db58dbf6f42ae7b9cf3da7b72b88f5?trk=share_certificate",
    description: "Learned DDD architectural approaches for agile environments and microservices architecture.",
    skills: ["Domain-Driven Design (DDD)", "Software Architecture", "Microservices"],
    featured: false,
    image: "/assets/certificates/domain-driven-design.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 11,
    name: "Git from Scratch",
    issuer: "LinkedIn Learning",
    date: "2023-09",
    link: "https://www.linkedin.com/learning/certificates/f1686ddc92a1117ace713d1365d0c69382583959ec0bd5a88f251755a71acd5a?trk=share_certificate",
    description: "Covered Git version control fundamentals and best practices for collaborative development.",
    skills: ["Git", "Version Control", "Software Development"],
    featured: false,
    image: "/assets/certificates/git-from-scratch.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 12,
    name: "Learning BigQuery",
    issuer: "LinkedIn Learning",
    date: "2023-11",
    link: "https://www.linkedin.com/learning/certificates/24c4bbac905d8789d28f655fe8153c002ed5c33330898eb08b47b752e3f239e8?trk=share_certificate",
    description: "Explored Google BigQuery for large-scale data analytics and SQL querying.",
    skills: ["BigQuery", "Data Analytics", "SQL", "Cloud Computing"],
    featured: false,
    image: "/assets/certificates/learning-bigquery.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 13,
    name: "C#: Design Patterns Part 1",
    issuer: "LinkedIn Learning",
    date: "2022-06",
    link: "https://www.linkedin.com/learning/certificates/e1725d9d8c545e555beba7a1a610682e21d8fddf119afe619a80acf8adbd79e7?trk=share_certificate",
    description: "Covered essential design patterns implementation in C# including creational and structural patterns.",
    skills: ["C#", "Design Patterns", "Software Architecture"],
    featured: false,
    image: "/assets/certificates/csharp-design-patterns-1.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png",
    status: "Active",
    onlineVerifiable: true
  },
  
  // Pluralsight Certifications
  {
    id: 14,
    name: "C# Design Patterns",
    issuer: "Pluralsight",
    date: "2020-06",
    link: "https://app.pluralsight.com/profile/biswajit-panday",
    description: "Mastered common design patterns implementation in C# for building maintainable and scalable applications.",
    skills: ["C#", "Design Patterns", "SOLID Principles"],
    featured: false,
    image: "/assets/certificates/Pluralsight_Design-patterns-overview_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 15,
    name: "Building Cloud Native Solutions for Azure with Visual Studio",
    issuer: "Pluralsight",
    date: "2020-05",
    link: "https://app.pluralsight.com/profile/biswajit-panday",
    description: "Learned techniques for developing cloud-native applications using Visual Studio and Azure services.",
    skills: ["Azure", "Cloud-Native", "Visual Studio", ".NET"],
    featured: false,
    image: "/assets/certificates/Building-cloud-native-solutions-azure-visual-studio_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 16,
    name: "C# Generics",
    issuer: "Pluralsight",
    date: "2020-04",
    link: "https://app.pluralsight.com/profile/biswajit-panday",
    description: "Deep dive into C# generics for type-safe, reusable code patterns.",
    skills: ["C#", "Generics", ".NET"],
    featured: false,
    image: "/assets/certificates/Csharp-generics_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 17,
    name: "Docker and Kubernetes: The Big Picture",
    issuer: "Pluralsight",
    date: "2021-02",
    link: "https://app.pluralsight.com/profile/biswajit-panday",
    description: "Overview of container technologies and orchestration with Docker and Kubernetes.",
    skills: ["Docker", "Kubernetes", "Containerization", "DevOps"],
    featured: false,
    image: "/assets/certificates/Docker and Kubernetes The Big Picture_Certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 18,
    name: "NPM Playbook",
    issuer: "Pluralsight",
    date: "2019-11",
    link: "https://app.pluralsight.com/profile/biswajit-panday",
    description: "Comprehensive guide to Node Package Manager for JavaScript development.",
    skills: ["NPM", "JavaScript", "Node.js"],
    featured: false,
    image: "/assets/certificates/Npm-playbook_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 19,
    name: "Object-Oriented Programming Fundamentals in C#",
    issuer: "Pluralsight",
    date: "2019-08",
    link: "https://app.pluralsight.com/profile/biswajit-panday",
    description: "Fundamentals of OOP concepts and implementation in C#.",
    skills: ["C#", "Object-Oriented Programming", "Software Design"],
    featured: false,
    image: "/assets/certificates/Object-oriented-programming-fundamentals-csharp_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  {
    id: 20,
    name: "React: The Big Picture",
    issuer: "Pluralsight",
    date: "2020-07",
    link: "https://app.pluralsight.com/profile/biswajit-panday",
    description: "Overview of React library, its ecosystem, and core concepts for front-end development.",
    skills: ["React", "JavaScript", "Front-End Development"],
    featured: false,
    image: "/assets/certificates/React-big-picture_certificate.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.webp",
    status: "Active",
    onlineVerifiable: true
  },
  
  // Other Training
  // {
  //   id: 21,
  //   name: "The Media Tech Challenge - Bootcamp 2019",
  //   issuer: "DW Akademie",
  //   date: "2019-03",
  //   link: "https://photos.google.com/share/AF1QipMfjpDJc24HF7qmJqWPpPze2C33m1_aqmi2BVmrnkP3jFOzSzcQ2ZX8Lr9PV2Xerg/photo/AF1QipOFmYBWp3wf3WkERvzrw8mvDTZVUD9deZMCVSH8?key=OVBSQXBFZW8zcnYybUpIVVFmeVVCaXg5c0tLWXFn",
  //   description: "Intensive bootcamp focused on media technology solutions and development.",
  //   skills: ["Media Technology", "Software Development", "Innovation"],
  //   featured: false,
  //   image: "/assets/certificates/media-tech-challenge.jpg",
  //   category: "Training",
  //   issuerLogo: "/assets/logos/dw-akademie.png",
  //   status: "Active"
  // },
  // {
  //   id: 22,
  //   name: "Training Program on OOP (MVC) PHP with CodeIgniter Framework",
  //   issuer: "BASIS",
  //   date: "2013-04",
  //   description: "Comprehensive training on object-oriented PHP development using the CodeIgniter MVC framework.",
  //   skills: ["Software Development Methodologies", "PHP", "CodeIgniter", "MVC"],
  //   featured: false,
  //   image: "/assets/certificates/php-codeigniter.jpg",
  //   category: "Training",
  //   issuerLogo: "/assets/logos/basis.png",
  //   status: "Active"
  // }
];

// Helper function to get featured certifications
export const getFeaturedCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.featured);
};

// Helper function to get professional certifications
export const getProfessionalCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.category === "Professional");
};

// Helper function to get course certifications
export const getCourseCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.category === "Course");
};

// Helper function to get training certifications
export const getTrainingCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.category === "Training");
};

// Helper function to get upcoming certifications
export const getUpcomingCertifications = (): Certification[] => {
  return certifications.filter(cert => cert.isUpcoming);
};

// Get the most recent certification (for banner)
export const getMostRecentCertification = (): Certification => {
  return certifications
    .filter(cert => cert.featured && !cert.isUpcoming)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
};

// Get total certification counts by category
export const getCertificationCounts = () => {
  return {
    total: certifications.length,
    professional: getProfessionalCertifications().length,
    course: getCourseCertifications().length,
    training: getTrainingCertifications().length,
    upcoming: getUpcomingCertifications().length
  };
}; 