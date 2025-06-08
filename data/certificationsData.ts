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
    image: "/assets/certifications/azure-fundamentals.png",
    category: "Professional",
    issuerLogo: "/assets/logos/microsoft.png"
  },
  {
    id: 2,
    name: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    date: "2025-06",
    description: "Planning to achieve this certification, demonstrating ability to design, build, test, and maintain cloud applications and services on Microsoft Azure.",
    skills: ["Azure App Service", "Azure Functions", "Azure Storage", "Azure Cosmos DB", "Azure Security"],
    featured: false,
    image: "/assets/certifications/azure-developer-associate.png",
    category: "Professional",
    isUpcoming: true,
    issuerLogo: "/assets/logos/microsoft.png"
  },
  
  // LinkedIn Learning Certifications (Cloud & Azure)
  {
    id: 3,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 1 Cloud Concepts",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/microsoft-azure-fundamentals-az-900-cert-prep-1-cloud-concepts",
    description: "Preparation for AZ-900 certification covering cloud computing concepts, models, and services.",
    skills: ["Cloud Computing", "Microsoft Azure", "IaaS", "PaaS", "SaaS"],
    featured: false,
    image: "/assets/certifications/az-900-cert-prep-1.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin-learning.png"
  },
  {
    id: 4,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 2 Azure Architecture and Security",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/microsoft-azure-fundamentals-az-900-cert-prep-2-azure-architecture-and-security",
    description: "Preparation for AZ-900 certification covering Azure architecture components and security features.",
    skills: ["Azure Architecture", "Azure Security", "Cloud Security"],
    featured: false,
    image: "/assets/certifications/az-900-cert-prep-2.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin-learning.png"
  },
  {
    id: 5,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 3 Azure Services",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/microsoft-azure-fundamentals-az-900-cert-prep-3-azure-services",
    description: "Preparation for AZ-900 certification covering the core Azure services and products.",
    skills: ["Azure Services", "Cloud Computing", "Azure Solutions"],
    featured: false,
    image: "/assets/certifications/az-900-cert-prep-3.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin-learning.png"
  },
  {
    id: 6,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 4 Azure Management and Governance",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/microsoft-azure-fundamentals-az-900-cert-prep-4-azure-management-and-governance",
    description: "Preparation for AZ-900 certification covering Azure management and governance capabilities.",
    skills: ["Azure Management", "Azure Governance", "Cost Management"],
    featured: false,
    image: "/assets/certifications/az-900-cert-prep-4.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin-learning.png"
  },
  
  // LinkedIn Learning Certifications (AI & Development)
  {
    id: 7,
    name: "AI Automation with Anthropic Claude API's Agentic Computer Use",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/ai-automation-with-anthropic-claude-api-s-agentic-computer-use",
    description: "Learned how to use Anthropic's Claude AI assistant APIs to build agentic applications that can perform computer tasks.",
    skills: ["AI Productivity", "Application Programming Interfaces (API)", "Automation", "Generative AI"],
    featured: true,
    image: "/assets/certifications/claude-api-automation.png",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin-learning.png"
  },
  {
    id: 8,
    name: "C# & .NET: Programming",
    issuer: "LinkedIn Learning",
    date: "2021-04",
    link: "https://www.linkedin.com/learning/c-sharp-dot-net-programming",
    description: "Comprehensive course covering C# programming fundamentals within the .NET ecosystem.",
    skills: ["ASP.NET MVC", "ASP.NET Web API", ".NET", ".NET Core", "Programming", ".NET Framework", "REST APIs", "Object-Oriented Programming (OOP)", "C#", "Clean code", "Visual Studio"],
    featured: false,
    image: "/assets/certifications/csharp-dotnet-programming.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin-learning.png"
  },
  {
    id: 9,
    name: "Advanced Design Patterns: Design Principles",
    issuer: "LinkedIn Learning",
    date: "2024-03",
    link: "https://www.linkedin.com/learning/advanced-design-patterns-design-principles",
    description: "Explored fundamental object-oriented design principles like encapsulation, inheritance, polymorphism, and SOLID principles.",
    skills: ["Software Design Patterns", "Java", "Object-Oriented Programming"],
    featured: false,
    image: "/assets/certifications/advanced-design-patterns.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin-learning.png"
  },
  {
    id: 10,
    name: "Software Architecture: Domain-Driven Design",
    issuer: "LinkedIn Learning",
    date: "2024-02",
    link: "https://www.linkedin.com/learning/software-architecture-domain-driven-design",
    description: "Learned DDD architectural approaches for agile environments and microservices architecture.",
    skills: ["Domain-Driven Design (DDD)", "Software Architecture", "Microservices"],
    featured: false,
    image: "/assets/certifications/domain-driven-design.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin-learning.png"
  },
  {
    id: 11,
    name: "Git from Scratch",
    issuer: "LinkedIn Learning",
    date: "2023-09",
    link: "https://www.linkedin.com/learning/git-from-scratch",
    description: "Covered Git version control fundamentals and best practices for collaborative development.",
    skills: ["Git", "Version Control", "Software Development"],
    featured: false,
    image: "/assets/certifications/git-from-scratch.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin-learning.png"
  },
  {
    id: 12,
    name: "Learning BigQuery",
    issuer: "LinkedIn Learning",
    date: "2023-11",
    link: "https://www.linkedin.com/learning/learning-bigquery",
    description: "Explored Google BigQuery for large-scale data analytics and SQL querying.",
    skills: ["BigQuery", "Data Analytics", "SQL", "Cloud Computing"],
    featured: false,
    image: "/assets/certifications/learning-bigquery.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin-learning.png"
  },
  {
    id: 13,
    name: "C#: Design Patterns Part 1",
    issuer: "LinkedIn Learning",
    date: "2022-06",
    link: "https://www.linkedin.com/learning/certificates/e1725d9d8c545e555beba7a1a610682e21d8fddf119afe619a80acf8adbd79e7",
    description: "Covered essential design patterns implementation in C# including creational and structural patterns.",
    skills: ["C#", "Design Patterns", "Software Architecture"],
    featured: false,
    image: "/assets/certifications/csharp-design-patterns-1.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/linkedin-learning.png"
  },
  
  // Pluralsight Certifications
  {
    id: 14,
    name: "C# Design Patterns",
    issuer: "Pluralsight",
    date: "2020-06",
    description: "Mastered common design patterns implementation in C# for building maintainable and scalable applications.",
    skills: ["C#", "Design Patterns", "SOLID Principles"],
    featured: false,
    image: "/assets/certifications/csharp-design-patterns.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
  },
  {
    id: 15,
    name: "Building Cloud Native Solutions for Azure with Visual Studio",
    issuer: "Pluralsight",
    date: "2020-05",
    description: "Learned techniques for developing cloud-native applications using Visual Studio and Azure services.",
    skills: ["Azure", "Cloud-Native", "Visual Studio", ".NET"],
    featured: false,
    image: "/assets/certifications/cloud-native-azure.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
  },
  {
    id: 16,
    name: "C# Generics",
    issuer: "Pluralsight",
    date: "2020-04",
    description: "Deep dive into C# generics for type-safe, reusable code patterns.",
    skills: ["C#", "Generics", ".NET"],
    featured: false,
    image: "/assets/certifications/csharp-generics.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
  },
  {
    id: 17,
    name: "Docker and Kubernetes: The Big Picture",
    issuer: "Pluralsight",
    date: "2021-02",
    description: "Overview of container technologies and orchestration with Docker and Kubernetes.",
    skills: ["Docker", "Kubernetes", "Containerization", "DevOps"],
    featured: false,
    image: "/assets/certifications/docker-kubernetes.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
  },
  {
    id: 18,
    name: "NPM Playbook",
    issuer: "Pluralsight",
    date: "2019-11",
    description: "Comprehensive guide to Node Package Manager for JavaScript development.",
    skills: ["NPM", "JavaScript", "Node.js"],
    featured: false,
    image: "/assets/certifications/npm-playbook.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
  },
  {
    id: 19,
    name: "Object-Oriented Programming Fundamentals in C#",
    issuer: "Pluralsight",
    date: "2019-08",
    description: "Fundamentals of OOP concepts and implementation in C#.",
    skills: ["C#", "Object-Oriented Programming", "Software Design"],
    featured: false,
    image: "/assets/certifications/oop-csharp.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
  },
  {
    id: 20,
    name: "React: The Big Picture",
    issuer: "Pluralsight",
    date: "2020-07",
    description: "Overview of React library, its ecosystem, and core concepts for front-end development.",
    skills: ["React", "JavaScript", "Front-End Development"],
    featured: false,
    image: "/assets/certifications/react-big-picture.jpg",
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
  },
  
  // Other Training
  {
    id: 21,
    name: "The Media Tech Challenge - Bootcamp 2019",
    issuer: "DW Akademie",
    date: "2019-03",
    link: "https://photos.google.com/share/AF1QipMfjpDJc24HF7qmJqWPpPze2C33m1_aqmi2BVmrnkP3jFOzSzcQ2ZX8Lr9PV2Xerg/photo/AF1QipOFmYBWp3wf3WkERvzrw8mvDTZVUD9deZMCVSH8?key=OVBSQXBFZW8zcnYybUpIVVFmeVVCaXg5c0tLWXFn",
    description: "Intensive bootcamp focused on media technology solutions and development.",
    skills: ["Media Technology", "Software Development", "Innovation"],
    featured: false,
    image: "/assets/certifications/media-tech-challenge.jpg",
    category: "Training",
    issuerLogo: "/assets/logos/dw-akademie.png"
  },
  {
    id: 22,
    name: "Training Program on OOP (MVC) PHP with CodeIgniter Framework",
    issuer: "BASIS",
    date: "2013-04",
    description: "Comprehensive training on object-oriented PHP development using the CodeIgniter MVC framework.",
    skills: ["Software Development Methodologies", "PHP", "CodeIgniter", "MVC"],
    featured: false,
    image: "/assets/certifications/php-codeigniter.jpg",
    category: "Training",
    issuerLogo: "/assets/logos/basis.png"
  }
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