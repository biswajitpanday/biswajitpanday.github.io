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

// Helper function to convert PDF path to image path (temporary solution until actual images are created)
const pdfToImagePath = (pdfPath: string): string => {
  // For now, we'll return the same path, but in a real implementation, 
  // this could point to a png/jpg version or a PDF thumbnail
  return pdfPath;
};

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
    link: "https://www.linkedin.com/learning/certificates/2df28c8de6caea3e8c3db8be8d6ff1e9118daaa20b4f3eb3b33f9a3580eae1e4",
    description: "Preparation for AZ-900 certification covering cloud computing concepts, models, and services.",
    skills: ["Cloud Computing", "Microsoft Azure", "IaaS", "PaaS", "SaaS"],
    featured: false,
    image: pdfToImagePath("/assets/certifications/az-900-cert-prep-1.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png"
  },
  {
    id: 4,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 2 Azure Architecture and Security",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/1bc0bf8aafefc1a43af5b9f5cb6fa5c07c2ee01d0e7ba6ef0e94fbf24e5b45af",
    description: "Preparation for AZ-900 certification covering Azure architecture components and security features.",
    skills: ["Azure Architecture", "Azure Security", "Cloud Security"],
    featured: false,
    image: pdfToImagePath("/assets/certifications/az-900-cert-prep-2.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png"
  },
  {
    id: 5,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 3 Azure Services",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/63c5b48b2c17cea7a9c9af693ed52bef1f2f5c1d6a4923e0b0f19fef48d55089",
    description: "Preparation for AZ-900 certification covering the core Azure services and products.",
    skills: ["Azure Services", "Cloud Computing", "Azure Solutions"],
    featured: false,
    image: pdfToImagePath("/assets/certifications/az-900-cert-prep-3.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png"
  },
  {
    id: 6,
    name: "Microsoft Azure Fundamentals (AZ-900) Cert Prep: 4 Azure Management and Governance",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/27af8a98bc2f1e6d5ac74b3d5d10d99c7be4a4fd93d8ba3f4d6a94bd46f40950",
    description: "Preparation for AZ-900 certification covering Azure management and governance capabilities.",
    skills: ["Azure Management", "Azure Governance", "Cost Management"],
    featured: false,
    image: pdfToImagePath("/assets/certifications/az-900-cert-prep-4.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png"
  },
  
  // LinkedIn Learning Certifications (AI & Development)
  {
    id: 7,
    name: "AI Automation with Anthropic Claude API's Agentic Computer Use",
    issuer: "LinkedIn Learning",
    date: "2024-11",
    link: "https://www.linkedin.com/learning/certificates/ba7d40a1f7aae8c1e1b5fec17022e2d51953bcb4fc5f35fcc3bb9aa70c85b19e",
    description: "Learned how to use Anthropic's Claude AI assistant APIs to build agentic applications that can perform computer tasks.",
    skills: ["AI Productivity", "Application Programming Interfaces (API)", "Automation", "Generative AI"],
    featured: true,
    image: pdfToImagePath("/assets/certifications/claude-api-automation.png"),
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png"
  },
  {
    id: 8,
    name: "C# & .NET: Programming",
    issuer: "LinkedIn Learning",
    date: "2021-04",
    link: "https://www.linkedin.com/learning/certificates/df3f3d9c4a5f22f95ac66ef4af4d4f98e92c83b09c9ffbdf2afe7dc1d0d6b9b5",
    description: "Comprehensive course covering C# programming fundamentals within the .NET ecosystem.",
    skills: ["ASP.NET MVC", "ASP.NET Web API", ".NET", ".NET Core", "Programming", ".NET Framework", "REST APIs", "Object-Oriented Programming (OOP)", "C#", "Clean code", "Visual Studio"],
    featured: false,
    image: pdfToImagePath("/assets/certifications/csharp-dotnet-programming.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png"
  },
  {
    id: 9,
    name: "Advanced Design Patterns: Design Principles",
    issuer: "LinkedIn Learning",
    date: "2024-03",
    link: "https://www.linkedin.com/learning/certificates/e0bd6dee07fd3df41c8fd57ed78a51b6e5fdb24fa2d48d2ae01c9f5ba98a9271",
    description: "Explored fundamental object-oriented design principles like encapsulation, inheritance, polymorphism, and SOLID principles.",
    skills: ["Software Design Patterns", "Java", "Object-Oriented Programming"],
    featured: false,
    image: pdfToImagePath("/assets/certifications/advanced-design-patterns.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png"
  },
  {
    id: 10,
    name: "Software Architecture: Domain-Driven Design",
    issuer: "LinkedIn Learning",
    date: "2024-02",
    link: "https://www.linkedin.com/learning/certificates/ac4f5a9c51ba3e2c8e66d28bea62a1efa95bb7ccc3c3a67c3baaea8bc8cec3fb",
    description: "Learned DDD architectural approaches for agile environments and microservices architecture.",
    skills: ["Domain-Driven Design (DDD)", "Software Architecture", "Microservices"],
    featured: false,
    image: pdfToImagePath("/assets/certifications/domain-driven-design.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png"
  },
  {
    id: 11,
    name: "Git from Scratch",
    issuer: "LinkedIn Learning",
    date: "2023-09",
    link: "https://www.linkedin.com/learning/certificates/8a0de69242bbb9c1a33ab2ff96d8ccd7a5fa4a9b02517f89584a88e32aca3ff5",
    description: "Covered Git version control fundamentals and best practices for collaborative development.",
    skills: ["Git", "Version Control", "Software Development"],
    featured: false,
    image: pdfToImagePath("/assets/certifications/git-from-scratch.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png"
  },
  {
    id: 12,
    name: "Learning BigQuery",
    issuer: "LinkedIn Learning",
    date: "2023-11",
    link: "https://www.linkedin.com/learning/certificates/7fa0f20bf1a8d3a99e15f67ba2aa5c25e28f4fe0dafc41c0dc0f5e1c9c84ad9c",
    description: "Explored Google BigQuery for large-scale data analytics and SQL querying.",
    skills: ["BigQuery", "Data Analytics", "SQL", "Cloud Computing"],
    featured: false,
    image: pdfToImagePath("/assets/certifications/learning-bigquery.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png"
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
    image: pdfToImagePath("/assets/certifications/csharp-design-patterns-1.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/linkedin.png"
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
    image: pdfToImagePath("/assets/certifications/csharp-design-patterns.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
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
    image: pdfToImagePath("/assets/certifications/cloud-native-azure.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
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
    image: pdfToImagePath("/assets/certifications/csharp-generics.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
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
    image: pdfToImagePath("/assets/certifications/docker-kubernetes.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
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
    image: pdfToImagePath("/assets/certifications/npm-playbook.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
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
    image: pdfToImagePath("/assets/certifications/oop-csharp.jpg"),
    category: "Course",
    issuerLogo: "/assets/logos/pluralsight.png"
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
    image: pdfToImagePath("/assets/certifications/react-big-picture.jpg"),
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
    image: pdfToImagePath("/assets/certifications/media-tech-challenge.jpg"),
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
    image: pdfToImagePath("/assets/certifications/php-codeigniter.jpg"),
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